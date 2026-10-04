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

  /*
   * Apple limita la API a ~20 consultas por minuto. Este "cubo de fichas" deja pasar
   * ráfagas cortas (precarga de pistas) y luego espacia las consultas.
   */
  const bucket = { tokens: 6, max: 6, refillMs: 3200, last: Date.now(), queue: [], timer: 0 };
  function throttle(fn) {
    return new Promise((resolve, reject) => {
      bucket.queue.push(() => fn().then(resolve, reject));
      pump();
    });
  }
  function pump() {
    const now = Date.now();
    const gained = Math.floor((now - bucket.last) / bucket.refillMs);
    if (gained > 0) {
      bucket.tokens = Math.min(bucket.max, bucket.tokens + gained);
      bucket.last += gained * bucket.refillMs;
    }
    while (bucket.tokens >= 1 && bucket.queue.length) {
      bucket.tokens--;
      bucket.queue.shift()();
    }
    if (bucket.queue.length && !bucket.timer) {
      bucket.timer = setTimeout(() => { bucket.timer = 0; pump(); }, bucket.refillMs);
    }
  }

  function jsonp(url, timeoutMs) {
    if (requests.has(url)) return requests.get(url);
    const promise = throttle(() => new Promise((resolve, reject) => {
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
    }));
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

  /*
   * Búsqueda libre en Apple Music, pensada para no confundirse con covers:
   * la canción tiene que llamarse como la pista y, además, el álbum tiene que ser
   * del juego o el artista tiene que ser el compositor.
   */
  const COVER_RE = /\b(cover|covers|piano|remix|remixed|lofi|lo fi|orchestral|orchestra|tribute|8 bit|8bit|chiptune|music box|acoustic|karaoke|lullaby|rendition|medley|arrangement|arranged|symphonic|reimagined|nightcore|slowed|sped up|epic version|metal version|guitar version|instrumental version|bossa|jazz version|synthwave)\b/;
  const GENERIC_TITLE_RE = /^(main theme|theme|title theme|title|title screen|opening|opening theme|overture|prologue|intro|introduction|menu|main menu|ending|ending theme|credits|staff roll)$/;

  function hintList(value) {
    return (Array.isArray(value) ? value : value ? [value] : []).map(norm).filter((x) => x.length >= 3);
  }

  /** Apellidos/nombres útiles del campo compositor ("Martin O'Donnell & Michael Salvatori" → ...). */
  function composerHints(composer) {
    return String(composer || '')
      .replace(/\(.*?\)/g, ' ')
      .split(/,|&|\by\b|\band\b|\//)
      .map((part) => norm(part).split(' ').filter(Boolean).pop() || '')
      .filter((x) => x.length >= 4);
  }

  function gameHints(track) {
    const game = String(track.game || '').replace(/\(.*?\)/g, ' ');
    const hints = [norm(game)];
    const beforeColon = norm(game.split(':')[0]);
    if (beforeColon.length >= 5) hints.push(beforeColon);
    hints.push(norm(game.replace(/^(marvel's|tom clancy's|sid meier's)\s+/i, '')));
    return Array.from(new Set(hints.filter((x) => x.length >= 3)));
  }

  function scoreHit(r, opts) {
    const tn = norm(r.trackName);
    const cn = norm(r.collectionName);
    const an = norm(r.artistName);
    let title = -1;
    opts.names.forEach((n) => {
      if (!n) return;
      const s = tn === n ? 6 : tn.startsWith(n + ' ') || tn.startsWith(n) ? 4 : tn.indexOf(n) >= 0 ? 3 : -1;
      if (s > title) title = s;
    });
    if (title < 0) return -1;
    let score = title;
    const albumGame = opts.albums.some((a) => cn.indexOf(a) >= 0);
    const albumFranchise = opts.franchise && cn.indexOf(opts.franchise) >= 0;
    if (albumGame) score += 4;
    else if (albumFranchise && !opts.generic) score += 3;
    if (/soundtrack|\bost\b|original|game music|music from/.test(cn)) score += 1;
    if (opts.artists.some((a) => an.indexOf(a) >= 0)) score += 3;
    if (COVER_RE.test(tn + ' ' + cn + ' ' + an)) score -= 8;
    if (/\(from |from "|from the video game/.test(String(r.trackName).toLowerCase())) score -= 3;
    if (opts.generic && !albumGame) score -= 4; // "Main Theme" sin álbum del juego: demasiado ambiguo
    return score;
  }

  async function resolveItunes(src, track) {
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
      const data = await jsonp(`${ITUNES}/search?term=${encodeURIComponent(src.term)}&media=music&entity=song&limit=50&country=${country}`);
      const songs = (data.results || []).filter((r) => r.wrapperType === 'track' && r.previewUrl);
      const names = hintList(src.match || (track && track.title));
      const opts = {
        names: names,
        albums: hintList(src.album_hint).concat(track ? gameHints(track) : []),
        franchise: track ? norm(track.franchise) : '',
        artists: hintList(src.artist).concat(track ? composerHints(track.composer) : []),
        generic: names.every((n) => GENERIC_TITLE_RE.test(n)),
      };
      let best = null;
      let bestScore = 7; // mínimo: título + (álbum del juego o compositor)
      songs.forEach((r) => {
        const sc = scoreHit(r, opts);
        if (sc > bestScore) { best = r; bestScore = sc; }
      });
      return best;
    }
    return null;
  }

  function fromItunes(r) {
    return {
      kind: 'audio',
      url: r.previewUrl,
      appleId: r.trackId, // para buscar su volumen en AM.LOUDNESS
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
   * Devuelve los candidatos reproducibles de una pista, en el orden en que están sus fuentes:
   * el primer preview de Apple que responda y los videos de YouTube.
   * (Así una caricatura puede poner primero su entrada en español latino de YouTube
   * y dejar el preview de Apple en inglés como respaldo.)
   */
  function resolve(track) {
    if (resolved.has(track.id)) return resolved.get(track.id);
    const promise = (async () => {
      const out = [];
      let appleFound = false;
      for (const src of track.sources) {
        if (src.type === 'youtube') {
          out.push(fromYoutube(src));
        } else if (src.type === 'itunes' && !appleFound) {
          try {
            const hit = await resolveItunes(src, track);
            if (hit) { out.push(fromItunes(hit)); appleFound = true; }
          } catch (e) { /* probamos la siguiente fuente */ }
        }
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
