/*
 * Resolución de fuentes: convierte una pista del catálogo en una lista ordenada
 * de "candidatos" reproducibles (preview de Apple o video de YouTube).
 *
 * La iTunes Search API se consulta con JSONP para no depender de CORS.
 */
(function (AM) {
  'use strict';

  const ITUNES = 'https://itunes.apple.com';
  const requests = new Map();  // url → Promise (evita repetir consultas)
  const resolved = new Map();  // track.id → Promise<candidatos>
  let seq = 0;

  function jsonp(url, timeoutMs) {
    if (requests.has(url)) return requests.get(url);
    const promise = new Promise((resolve, reject) => {
      const name = '__amJsonp' + (++seq);
      const script = document.createElement('script');
      let done = false;
      const finish = (fn, value) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        window[name] = function () {}; // si la respuesta llega tarde, no rompe nada
        script.remove();
        fn(value);
      };
      const timer = setTimeout(() => finish(reject, new Error('timeout')), timeoutMs || 9000);
      window[name] = (data) => finish(resolve, data);
      script.onerror = () => finish(reject, new Error('network'));
      script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + name;
      document.head.appendChild(script);
    });
    requests.set(url, promise);
    promise.catch(() => requests.delete(url));
    return promise;
  }

  /** Normaliza texto para comparar nombres de canciones. */
  function norm(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function pickSong(results, match) {
    const songs = (results || []).filter((r) => r.wrapperType === 'track' && r.previewUrl);
    if (!songs.length) return null;
    if (!match) return songs[0];
    const names = Array.isArray(match) ? match : [match];
    for (const name of names) {
      const n = norm(name);
      const tests = [(s) => s === n, (s) => s.startsWith(n), (s) => s.includes(n)];
      for (const test of tests) {
        const hit = songs.find((s) => test(norm(s.trackName)));
        if (hit) return hit;
      }
    }
    return null;
  }

  async function resolveItunes(src) {
    const country = src.country || 'us';
    if (src.song) {
      const data = await jsonp(`${ITUNES}/lookup?id=${src.song}&country=${country}`);
      return pickSong(data.results, null);
    }
    if (src.album) {
      const data = await jsonp(`${ITUNES}/lookup?id=${src.album}&entity=song&limit=200&country=${country}`);
      return pickSong(data.results, src.match);
    }
    if (src.term) {
      const data = await jsonp(`${ITUNES}/search?term=${encodeURIComponent(src.term)}&media=music&entity=song&limit=25&country=${country}`);
      let results = data.results || [];
      if (src.artist) results = results.filter((r) => norm(r.artistName).includes(norm(src.artist)));
      return pickSong(results, src.match);
    }
    return null;
  }

  function fromItunes(r) {
    return {
      kind: 'audio',
      url: r.previewUrl,
      start: 0,
      meta: {
        trackName: r.trackName,
        artist: r.artistName,
        album: r.collectionName,
        artwork: (r.artworkUrl100 || '').replace(/\d+x\d+bb/, '600x600bb'),
        link: r.trackViewUrl,
        linkLabel: 'Escuchar en Apple Music',
        source: 'Apple Music',
      },
    };
  }

  function fromYoutube(src) {
    return {
      kind: 'youtube',
      id: src.id,
      start: src.start || 0,
      meta: {
        artwork: `https://i.ytimg.com/vi/${src.id}/hqdefault.jpg`,
        link: `https://www.youtube.com/watch?v=${src.id}` + (src.start ? `&t=${src.start}s` : ''),
        linkLabel: 'Ver en YouTube',
        source: 'YouTube',
      },
    };
  }

  /**
   * Devuelve los candidatos reproducibles de una pista: primero el preview de Apple
   * (si alguna fuente de Apple responde) y después los videos de YouTube.
   */
  function resolve(track) {
    if (resolved.has(track.id)) return resolved.get(track.id);
    const promise = (async () => {
      const out = [];
      for (const src of track.sources.filter((s) => s.type === 'itunes')) {
        try {
          const hit = await resolveItunes(src);
          if (hit) { out.push(fromItunes(hit)); break; }
        } catch (e) { /* probamos la siguiente fuente */ }
      }
      for (const src of track.sources) {
        if (src.type === 'youtube') out.push(fromYoutube(src));
      }
      return out;
    })();
    resolved.set(track.id, promise);
    return promise;
  }

  /** Pide por adelantado los datos de las próximas pistas. */
  function prefetch(tracks) {
    (tracks || []).forEach((t) => {
      resolve(t).then((cands) => {
        const first = cands[0];
        if (first && first.kind === 'audio') AM.Engine.warm(first.url);
      }).catch(() => {});
    });
  }

  AM.Sources = { resolve: resolve, prefetch: prefetch, norm: norm };
})(window.AM = window.AM || {});
