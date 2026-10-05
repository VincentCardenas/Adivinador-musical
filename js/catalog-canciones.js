/*
 * Catálogo: Canciones famosas (570 pistas en 11 géneros).
 * Por género: rock, pop, rap y hip-hop, reggaetón, regional mexicano, baladas, electrónica, cumbia, salsa,
 * metal y K-pop (sin bachata). La época se elige aparte en el inicio (filtro `era` de themes.js, según `year`).
 * `franchise` es el artista (respuesta del modo Clásico) y `lang` el idioma (es / en / de / ko) para el filtro
 * del inicio: con "Español" o "Inglés" solo entran esas; las de otros idiomas (coreano, alemán) suenan con
 * "Todos", y las instrumentales no llevan `lang` y entran con cualquier opción.
 * Fuentes, en el orden en que se prueban: `am(id…)` es el ID fijo de una canción en Apple Music,
 * `disco(id, título)` la busca dentro de un álbum y `busca(artista, canción)` la busca en Apple filtrada
 * por artista (para Canciones, sources.js acepta ahí "(feat. …)", "(Remastered …)" y parecidos, pero
 * nunca versiones en vivo, covers ni remixes).
 */
(function (AM) {
  'use strict';

  const apple = (o) => Object.assign({ type: 'itunes' }, o);
  // Primero la tienda de México y, si ahí no está, la de Estados Unidos.
  const am = (...ids) => ids.flatMap((id) => [apple({ song: id, country: 'mx' }), apple({ song: id })]);
  const disco = (album, match) => [apple({ album: album, match: match, country: 'mx' }), apple({ album: album, match: match })];
  const busca = (artista, cancion, otros) => {
    const o = { term: artista + ' ' + cancion, artist: artista, match: [cancion].concat(otros || []) };
    return [apple(Object.assign({ country: 'mx' }, o)), apple(o)];
  };

  AM.CATEGORIES.push(
    { id: 'song-rock', theme: 'canciones', label: 'Rock', icon: '🎸' },
    { id: 'song-pop', theme: 'canciones', label: 'Pop', icon: '💖' },
    { id: 'song-rap', theme: 'canciones', label: 'Rap y hip-hop', icon: '🎙️' },
    { id: 'song-reggaeton', theme: 'canciones', label: 'Reggaetón', icon: '🔥' },
    { id: 'song-regional', theme: 'canciones', label: 'Regional mexicano', icon: '🤠' },
    { id: 'song-baladas', theme: 'canciones', label: 'Baladas', icon: '🌹' },
    { id: 'song-electronica', theme: 'canciones', label: 'Electrónica', icon: '🎛️' },
    { id: 'song-cumbia', theme: 'canciones', label: 'Cumbia', icon: '🪗' },
    { id: 'song-salsa', theme: 'canciones', label: 'Salsa', icon: '💃' },
    { id: 'song-metal', theme: 'canciones', label: 'Metal', icon: '🤘' },
    { id: 'song-kpop', theme: 'canciones', label: 'K-pop', icon: '💜' },
  );

  AM.CATALOG.push(
    /* ───────────── Rock (50) ───────────── */
    {
      id: 'song-la-bamba', cat: 'song-rock', franchise: 'Ritchie Valens', game: 'La Bamba',
      title: 'La Bamba', year: 1958, lang: 'es',
      sources: [apple({ song: 439413921, country: 'mx' })],
    },
    {
      id: 'song-i-can-t-get-no-satisfaction', cat: 'song-rock', franchise: 'The Rolling Stones', game: '(I Can\'t Get No) Satisfaction',
      title: '(I Can\'t Get No) Satisfaction', year: 1965, lang: 'en',
      sources: [apple({ song: 1440743544, country: 'mx' })],
    },
    {
      id: 'song-hey-jude', cat: 'song-rock', franchise: 'The Beatles', game: 'Hey Jude',
      title: 'Hey Jude', year: 1968, lang: 'en',
      sources: [apple({ song: 1441133277, country: 'mx' })],
    },
    {
      id: 'song-let-it-be', cat: 'song-rock', franchise: 'The Beatles', game: 'Let It Be',
      title: 'Let It Be', year: 1970, lang: 'en',
      sources: busca('The Beatles', 'Let It Be'),
    },
    {
      id: 'song-oye-como-va', cat: 'song-rock', franchise: 'Santana', game: 'Oye cómo va',
      title: 'Oye cómo va', year: 1970, lang: 'es',
      sources: [apple({ song: 324767777, country: 'mx' })],
    },
    {
      id: 'song-stairway-to-heaven', cat: 'song-rock', franchise: 'Led Zeppelin', game: 'Stairway to Heaven',
      title: 'Stairway to Heaven', year: 1971, lang: 'en',
      sources: [apple({ song: 580708180, country: 'mx' })],
    },
    {
      id: 'song-bohemian-rhapsody', cat: 'song-rock', franchise: 'Queen', game: 'Bohemian Rhapsody',
      title: 'Bohemian Rhapsody', year: 1975, lang: 'en',
      sources: [apple({ song: 6781027645, country: 'mx' })],
    },
    {
      id: 'song-hotel-california', cat: 'song-rock', franchise: 'Eagles', game: 'Hotel California',
      title: 'Hotel California', year: 1976, lang: 'en',
      sources: [apple({ song: 635770202, country: 'mx' })],
    },
    {
      id: 'song-don-t-stop-me-now', cat: 'song-rock', franchise: 'Queen', game: 'Don\'t Stop Me Now',
      title: 'Don\'t Stop Me Now', year: 1978, lang: 'en',
      sources: busca('Queen', 'Don\'t Stop Me Now'),
    },
    {
      id: 'song-another-one-bites-the-dust', cat: 'song-rock', franchise: 'Queen', game: 'Another One Bites the Dust',
      title: 'Another One Bites the Dust', year: 1980, lang: 'en',
      sources: [apple({ song: 6781027662, country: 'mx' })],
    },
    {
      id: 'song-back-in-black', cat: 'song-rock', franchise: 'AC/DC', game: 'Back in Black',
      title: 'Back in Black', year: 1980, lang: 'en',
      sources: busca('AC/DC', 'Back in Black'),
    },
    {
      id: 'song-la-chica-de-ayer', cat: 'song-rock', franchise: 'Nacha Pop', game: 'La chica de ayer',
      title: 'La chica de ayer', year: 1980, lang: 'es',
      sources: [apple({ song: 693253157, country: 'mx' })],
    },
    {
      id: 'song-don-t-stop-believin', cat: 'song-rock', franchise: 'Journey', game: 'Don\'t Stop Believin\'',
      title: 'Don\'t Stop Believin\'', year: 1981, lang: 'en',
      sources: [apple({ song: 466738077, country: 'mx' })],
    },
    {
      id: 'song-africa', cat: 'song-rock', franchise: 'Toto', game: 'Africa',
      title: 'Africa', year: 1982, lang: 'en',
      sources: [apple({ song: 1297035514, country: 'mx' })],
    },
    {
      id: 'song-eye-of-the-tiger', cat: 'song-rock', franchise: 'Survivor', game: 'Eye of the Tiger',
      title: 'Eye of the Tiger', year: 1982, lang: 'en',
      sources: [apple({ song: 309539748, country: 'mx' })],
    },
    {
      id: 'song-every-breath-you-take', cat: 'song-rock', franchise: 'The Police', game: 'Every Breath You Take',
      title: 'Every Breath You Take', year: 1983, lang: 'en',
      sources: [apple({ song: 1452859708, country: 'mx' })],
    },
    {
      id: 'song-lobo-hombre-en-paris', cat: 'song-rock', franchise: 'La Unión', game: 'Lobo-hombre en París',
      title: 'Lobo-hombre en París', year: 1984, lang: 'es',
      sources: [apple({ song: 1268516049, country: 'mx' })],
    },
    {
      id: 'song-devuelveme-a-mi-chica', cat: 'song-rock', franchise: 'Hombres G', game: 'Devuélveme a mi chica',
      title: 'Devuélveme a mi chica', year: 1985, lang: 'es',
      sources: [apple({ song: 131366748, country: 'mx' })],
    },
    {
      id: 'song-el-baile-de-los-que-sobran', cat: 'song-rock', franchise: 'Los Prisioneros', game: 'El baile de los que sobran',
      title: 'El baile de los que sobran', year: 1986, lang: 'es',
      sources: [apple({ song: 714026688, country: 'mx' })],
    },
    {
      id: 'song-livin-on-a-prayer', cat: 'song-rock', franchise: 'Bon Jovi', game: 'Livin\' on a Prayer',
      title: 'Livin\' on a Prayer', year: 1986, lang: 'en',
      sources: [apple({ song: 1422955211, country: 'mx' })],
    },
    {
      id: 'song-persiana-americana', cat: 'song-rock', franchise: 'Soda Stereo', game: 'Persiana americana',
      title: 'Persiana americana', year: 1986, lang: 'es',
      sources: [apple({ song: 321882520, country: 'mx' })],
    },
    {
      id: 'song-sweet-child-o-mine', cat: 'song-rock', franchise: 'Guns N\' Roses', game: 'Sweet Child O\' Mine',
      title: 'Sweet Child O\' Mine', year: 1987, lang: 'en',
      sources: [apple({ song: 1377826892, country: 'mx' })],
    },
    {
      id: 'song-en-la-ciudad-de-la-furia', cat: 'song-rock', franchise: 'Soda Stereo', game: 'En la ciudad de la furia',
      title: 'En la ciudad de la furia', year: 1988, lang: 'es',
      sources: busca('Soda Stereo', 'En la ciudad de la furia'),
    },
    {
      id: 'song-la-negra-tomasa', cat: 'song-rock', franchise: 'Caifanes', game: 'La negra Tomasa',
      title: 'La negra Tomasa', year: 1988, lang: 'es',
      sources: busca('Caifanes', 'La negra Tomasa'),
    },
    {
      id: 'song-de-musica-ligera', cat: 'song-rock', franchise: 'Soda Stereo', game: 'De música ligera',
      title: 'De música ligera', year: 1990, lang: 'es',
      sources: [apple({ song: 251525826, country: 'mx' })],
    },
    {
      id: 'song-entre-dos-tierras', cat: 'song-rock', franchise: 'Héroes del Silencio', game: 'Entre dos tierras',
      title: 'Entre dos tierras', year: 1990, lang: 'es',
      sources: [apple({ song: 697634977, country: 'mx' })],
    },
    {
      id: 'song-rayando-el-sol', cat: 'song-rock', franchise: 'Maná', game: 'Rayando el sol',
      title: 'Rayando el sol', year: 1990, lang: 'es',
      sources: busca('Maná', 'Rayando el sol'),
    },
    {
      id: 'song-hacer-el-amor-con-otro', cat: 'song-rock', franchise: 'Alejandra Guzmán', game: 'Hacer el amor con otro',
      title: 'Hacer el amor con otro', year: 1991, lang: 'es',
      sources: [apple({ song: 1443611526, country: 'mx' })],
    },
    {
      id: 'song-losing-my-religion', cat: 'song-rock', franchise: 'R.E.M.', game: 'Losing My Religion',
      title: 'Losing My Religion', year: 1991, lang: 'en',
      sources: [apple({ song: 1442996689, country: 'mx' })],
    },
    {
      id: 'song-november-rain', cat: 'song-rock', franchise: 'Guns N\' Roses', game: 'November Rain',
      title: 'November Rain', year: 1991, lang: 'en',
      sources: busca('Guns N\' Roses', 'November Rain'),
    },
    {
      id: 'song-smells-like-teen-spirit', cat: 'song-rock', franchise: 'Nirvana', game: 'Smells Like Teen Spirit',
      title: 'Smells Like Teen Spirit', year: 1991, lang: 'en',
      sources: [apple({ song: 1586895442, country: 'mx' })],
    },
    {
      id: 'song-creep', cat: 'song-rock', franchise: 'Radiohead', game: 'Creep',
      title: 'Creep', year: 1992, lang: 'en',
      sources: [apple({ song: 1097862231, country: 'mx' })],
    },
    {
      id: 'song-oye-mi-amor', cat: 'song-rock', franchise: 'Maná', game: 'Oye mi amor',
      title: 'Oye mi amor', year: 1992, lang: 'es',
      sources: [apple({ song: 571814073, country: 'mx' })],
    },
    {
      id: 'song-matador', cat: 'song-rock', franchise: 'Los Fabulosos Cadillacs', game: 'Matador',
      title: 'Matador', year: 1993, lang: 'es',
      sources: [apple({ song: 297921308, country: 'mx' })],
    },
    {
      id: 'song-lamento-boliviano', cat: 'song-rock', franchise: 'Enanitos Verdes', game: 'Lamento boliviano',
      title: 'Lamento boliviano', year: 1994, lang: 'es',
      sources: [apple({ song: 721632344, country: 'mx' })],
    },
    {
      id: 'song-zombie', cat: 'song-rock', franchise: 'The Cranberries', game: 'Zombie',
      title: 'Zombie', year: 1994, lang: 'en',
      sources: [apple({ song: 1762669878, country: 'mx' })],
    },
    {
      id: 'song-wonderwall', cat: 'song-rock', franchise: 'Oasis', game: 'Wonderwall',
      title: 'Wonderwall', year: 1995, lang: 'en',
      sources: [apple({ song: 433401745, country: 'mx' })],
    },
    {
      id: 'song-chilanga-banda', cat: 'song-rock', franchise: 'Café Tacvba', game: 'Chilanga banda',
      title: 'Chilanga banda', year: 1996, lang: 'es',
      sources: [apple({ song: 397724888, country: 'mx' })],
    },
    {
      id: 'song-la-flaca', cat: 'song-rock', franchise: 'Jarabe de Palo', game: 'La flaca',
      title: 'La flaca', year: 1996, lang: 'es',
      sources: [apple({ song: 726298588, country: 'mx' })],
    },
    {
      id: 'song-all-star', cat: 'song-rock', franchise: 'Smash Mouth', game: 'All Star',
      title: 'All Star', year: 1999, lang: 'en',
      sources: [apple({ song: 1440517537, country: 'mx' })],
    },
    {
      id: 'song-corazon-espinado', cat: 'song-rock', franchise: 'Santana y Maná', game: 'Corazón espinado',
      title: 'Corazón espinado', year: 1999, lang: 'es',
      sources: [apple({ song: 422304407, country: 'mx' })],
    },
    {
      id: 'song-mariposa-traicionera', cat: 'song-rock', franchise: 'Maná', game: 'Mariposa traicionera',
      title: 'Mariposa traicionera', year: 2002, lang: 'es',
      sources: [apple({ song: 258906401, country: 'mx' })],
    },
    {
      id: 'song-eres', cat: 'song-rock', franchise: 'Café Tacvba', game: 'Eres',
      title: 'Eres', year: 2003, lang: 'es',
      sources: [apple({ song: 1444184596, country: 'mx' })],
    },
    {
      id: 'song-seven-nation-army', cat: 'song-rock', franchise: 'The White Stripes', game: 'Seven Nation Army',
      title: 'Seven Nation Army', year: 2003, lang: 'en',
      sources: [apple({ song: 1533513537, country: 'mx' })],
    },
    {
      id: 'song-boulevard-of-broken-dreams', cat: 'song-rock', franchise: 'Green Day', game: 'Boulevard of Broken Dreams',
      title: 'Boulevard of Broken Dreams', year: 2004, lang: 'en',
      sources: [apple({ song: 1161539476, country: 'mx' })],
    },
    {
      id: 'song-la-camisa-negra', cat: 'song-rock', franchise: 'Juanes', game: 'La camisa negra',
      title: 'La camisa negra', year: 2004, lang: 'es',
      sources: [apple({ song: 1492138460, country: 'mx' })],
    },
    {
      id: 'song-mr-brightside', cat: 'song-rock', franchise: 'The Killers', game: 'Mr. Brightside',
      title: 'Mr. Brightside', year: 2004, lang: 'en',
      sources: [apple({ song: 1440717826, country: 'mx' })],
    },
    {
      id: 'song-viva-la-vida', cat: 'song-rock', franchise: 'Coldplay', game: 'Viva la Vida',
      title: 'Viva la Vida', year: 2008, lang: 'en',
      sources: [apple({ song: 1122773680, country: 'mx' })],
    },
    {
      id: 'song-labios-rotos', cat: 'song-rock', franchise: 'Zoé', game: 'Labios rotos',
      title: 'Labios rotos', year: 2011, lang: 'es',
      sources: [apple({ song: 713647605, country: 'mx' })],
    },
    {
      id: 'song-radioactive', cat: 'song-rock', franchise: 'Imagine Dragons', game: 'Radioactive',
      title: 'Radioactive', year: 2012, lang: 'en',
      sources: [apple({ song: 904500508, country: 'mx' })],
    },
    /* ───────────── Pop (70) ───────────── */
    {
      id: 'song-un-rayo-de-sol', cat: 'song-pop', franchise: 'Los Diablos', game: 'Un rayo de sol',
      title: 'Un rayo de sol', year: 1970, lang: 'es',
      sources: [apple({ song: 1837717425, country: 'mx' })],
    },
    {
      id: 'song-no-tengo-dinero', cat: 'song-pop', franchise: 'Juan Gabriel', game: 'No tengo dinero',
      title: 'No tengo dinero', year: 1971, lang: 'es',
      sources: [apple({ song: 1444974195, country: 'mx' })],
    },
    {
      id: 'song-superstition', cat: 'song-pop', franchise: 'Stevie Wonder', game: 'Superstition',
      title: 'Superstition', year: 1972, lang: 'en',
      sources: [apple({ song: 1440757545, country: 'mx' })],
    },
    {
      id: 'song-por-que-te-vas', cat: 'song-pop', franchise: 'Jeanette', game: 'Por qué te vas',
      title: 'Por qué te vas', year: 1974, lang: 'es',
      sources: [apple({ song: 157403073, country: 'mx' })],
    },
    {
      id: 'song-dancing-queen', cat: 'song-pop', franchise: 'ABBA', game: 'Dancing Queen',
      title: 'Dancing Queen', year: 1976, lang: 'en',
      sources: [apple({ song: 1530392860, country: 'mx' })],
    },
    {
      id: 'song-stayin-alive', cat: 'song-pop', franchise: 'Bee Gees', game: 'Stayin\' Alive',
      title: 'Stayin\' Alive', year: 1977, lang: 'en',
      sources: [apple({ song: 1442259185, country: 'mx' })],
    },
    {
      id: 'song-i-will-survive', cat: 'song-pop', franchise: 'Gloria Gaynor', game: 'I Will Survive',
      title: 'I Will Survive', year: 1978, lang: 'en',
      sources: [apple({ song: 1443875398, country: 'mx' })],
    },
    {
      id: 'song-september', cat: 'song-pop', franchise: 'Earth, Wind & Fire', game: 'September',
      title: 'September', year: 1978, lang: 'en',
      sources: [apple({ song: 1099293333, country: 'mx' })],
    },
    {
      id: 'song-y-m-c-a', cat: 'song-pop', franchise: 'Village People', game: 'Y.M.C.A.',
      title: 'Y.M.C.A.', year: 1978, lang: 'en',
      sources: [apple({ song: 1452863525, country: 'mx' })],
    },
    {
      id: 'song-maldita-primavera', cat: 'song-pop', franchise: 'Yuri', game: 'Maldita primavera',
      title: 'Maldita primavera', year: 1981, lang: 'es',
      sources: [apple({ song: 713506313, country: 'mx' })],
    },
    {
      id: 'song-billie-jean', cat: 'song-pop', franchise: 'Michael Jackson', game: 'Billie Jean',
      title: 'Billie Jean', year: 1982, lang: 'en',
      sources: [apple({ song: 1883770432, country: 'mx' })],
    },
    {
      id: 'song-girls-just-want-to-have-fun', cat: 'song-pop', franchise: 'Cyndi Lauper', game: 'Girls Just Want to Have Fun',
      title: 'Girls Just Want to Have Fun', year: 1983, lang: 'en',
      sources: [apple({ song: 324761990, country: 'mx' })],
    },
    {
      id: 'song-sweet-dreams-are-made-of-this', cat: 'song-pop', franchise: 'Eurythmics', game: 'Sweet Dreams (Are Made of This)',
      title: 'Sweet Dreams (Are Made of This)', year: 1983, lang: 'en',
      sources: [apple({ song: 1752002002, country: 'mx' })],
    },
    {
      id: 'song-ni-tu-ni-nadie', cat: 'song-pop', franchise: 'Alaska y Dinarama', game: 'Ni tú ni nadie',
      title: 'Ni tú ni nadie', year: 1984, lang: 'es',
      sources: [apple({ song: 1758772527, country: 'mx' })],
    },
    {
      id: 'song-wake-me-up-before-you-go-go', cat: 'song-pop', franchise: 'Wham!', game: 'Wake Me Up Before You Go-Go',
      title: 'Wake Me Up Before You Go-Go', year: 1984, lang: 'en',
      sources: [apple({ song: 1466274459, country: 'mx' })],
    },
    {
      id: 'song-take-on-me', cat: 'song-pop', franchise: 'a-ha', game: 'Take On Me',
      title: 'Take On Me', year: 1985, lang: 'en',
      sources: [apple({ song: 368555810, country: 'mx' })],
    },
    {
      id: 'song-hijo-de-la-luna', cat: 'song-pop', franchise: 'Mecano', game: 'Hijo de la luna',
      title: 'Hijo de la luna', year: 1986, lang: 'es',
      sources: [apple({ song: 1559520587, country: 'mx' })],
    },
    {
      id: 'song-i-wanna-dance-with-somebody', cat: 'song-pop', franchise: 'Whitney Houston', game: 'I Wanna Dance with Somebody',
      title: 'I Wanna Dance with Somebody', year: 1987, lang: 'en',
      sources: [apple({ song: 840431935, country: 'mx' })],
    },
    {
      id: 'song-never-gonna-give-you-up', cat: 'song-pop', franchise: 'Rick Astley', game: 'Never Gonna Give You Up',
      title: 'Never Gonna Give You Up', year: 1987, lang: 'en',
      sources: [apple({ song: 1559523359, country: 'mx' })],
    },
    {
      id: 'song-tu-y-yo-somos-uno-mismo', cat: 'song-pop', franchise: 'Timbiriche', game: 'Tú y yo somos uno mismo',
      title: 'Tú y yo somos uno mismo', year: 1987, lang: 'es',
      sources: [apple({ song: 1443564447, country: 'mx' })],
    },
    {
      id: 'song-like-a-prayer', cat: 'song-pop', franchise: 'Madonna', game: 'Like a Prayer',
      title: 'Like a Prayer', year: 1989, lang: 'en',
      sources: [apple({ song: 329064713, country: 'mx' })],
    },
    {
      id: 'song-macarena', cat: 'song-pop', franchise: 'Los del Río', game: 'Macarena',
      title: 'Macarena', year: 1993, lang: 'es',
      sources: [apple({ song: 401452726, country: 'mx' })],
    },
    {
      id: 'song-estoy-aqui', cat: 'song-pop', franchise: 'Shakira', game: 'Estoy aquí',
      title: 'Estoy aquí', year: 1995, lang: 'es',
      sources: [apple({ song: 193662167, country: 'mx' })],
    },
    {
      id: 'song-maria', cat: 'song-pop', franchise: 'Ricky Martin', game: 'María',
      title: 'María', year: 1995, lang: 'es',
      sources: [apple({ song: 187288293, country: 'mx' })],
    },
    {
      id: 'song-piel-morena', cat: 'song-pop', franchise: 'Thalía', game: 'Piel morena',
      title: 'Piel morena', year: 1995, lang: 'es',
      sources: [apple({ song: 724555920, country: 'mx' })],
    },
    {
      id: 'song-wannabe', cat: 'song-pop', franchise: 'Spice Girls', game: 'Wannabe',
      title: 'Wannabe', year: 1996, lang: 'en',
      sources: [apple({ song: 1551249273, country: 'mx' })],
    },
    {
      id: 'song-corazon-partio', cat: 'song-pop', franchise: 'Alejandro Sanz', game: 'Corazón partío',
      title: 'Corazón partío', year: 1997, lang: 'es',
      sources: [apple({ song: 150324727, country: 'mx' })],
    },
    {
      id: 'song-baby-one-more-time', cat: 'song-pop', franchise: 'Britney Spears', game: '...Baby One More Time',
      title: '...Baby One More Time', year: 1998, lang: 'en',
      sources: [apple({ song: 273143820, country: 'mx' })],
    },
    {
      id: 'song-believe', cat: 'song-pop', franchise: 'Cher', game: 'Believe',
      title: 'Believe', year: 1998, lang: 'en',
      sources: [apple({ song: 73273491, country: 'mx' })],
    },
    {
      id: 'song-i-want-it-that-way', cat: 'song-pop', franchise: 'Backstreet Boys', game: 'I Want It That Way',
      title: 'I Want It That Way', year: 1999, lang: 'en',
      sources: [apple({ song: 945192053, country: 'mx' })],
    },
    {
      id: 'song-livin-la-vida-loca', cat: 'song-pop', franchise: 'Ricky Martin', game: 'Livin\' la Vida Loca',
      title: 'Livin\' la Vida Loca', year: 1999, lang: 'en',
      sources: [apple({ song: 262218645, country: 'mx' })],
    },
    {
      id: 'song-me-gustas-tu', cat: 'song-pop', franchise: 'Manu Chao', game: 'Me gustas tú',
      title: 'Me gustas tú', year: 2001, lang: 'es',
      sources: [apple({ song: 1699431226, country: 'mx' })],
    },
    {
      id: 'song-complicated', cat: 'song-pop', franchise: 'Avril Lavigne', game: 'Complicated',
      title: 'Complicated', year: 2002, lang: 'en',
      sources: [apple({ song: 315025823, country: 'mx' })],
    },
    {
      id: 'song-crazy-in-love', cat: 'song-pop', franchise: 'Beyoncé', game: 'Crazy in Love',
      title: 'Crazy in Love', year: 2003, lang: 'en',
      sources: [apple({ song: 250776858, country: 'mx' })],
    },
    {
      id: 'song-rosas', cat: 'song-pop', franchise: 'La Oreja de Van Gogh', game: 'Rosas',
      title: 'Rosas', year: 2003, lang: 'es',
      sources: [apple({ song: 280862234, country: 'mx' })],
    },
    {
      id: 'song-toxic', cat: 'song-pop', franchise: 'Britney Spears', game: 'Toxic',
      title: 'Toxic', year: 2003, lang: 'en',
      sources: [apple({ song: 262218467, country: 'mx' })],
    },
    {
      id: 'song-rebelde', cat: 'song-pop', franchise: 'RBD', game: 'Rebelde',
      title: 'Rebelde', year: 2004, lang: 'es',
      sources: [apple({ song: 1529353094, country: 'mx' })],
    },
    {
      id: 'song-la-tortura', cat: 'song-pop', franchise: 'Shakira', game: 'La tortura',
      title: 'La tortura', year: 2005, lang: 'es',
      sources: [apple({ song: 1374532360, country: 'mx' })],
    },
    {
      id: 'song-hips-don-t-lie', cat: 'song-pop', franchise: 'Shakira', game: 'Hips Don\'t Lie',
      title: 'Hips Don\'t Lie', year: 2006, lang: 'en',
      sources: [apple({ song: 287620241, country: 'mx' })],
    },
    {
      id: 'song-rehab', cat: 'song-pop', franchise: 'Amy Winehouse', game: 'Rehab',
      title: 'Rehab', year: 2006, lang: 'en',
      sources: [apple({ song: 1738071274, country: 'mx' })],
    },
    {
      id: 'song-umbrella', cat: 'song-pop', franchise: 'Rihanna', game: 'Umbrella',
      title: 'Umbrella', year: 2007, lang: 'en',
      sources: [apple({ song: 1441154437, country: 'mx' })],
    },
    {
      id: 'song-poker-face', cat: 'song-pop', franchise: 'Lady Gaga', game: 'Poker Face',
      title: 'Poker Face', year: 2008, lang: 'en',
      sources: [apple({ song: 1443286882, country: 'mx' })],
    },
    {
      id: 'song-i-gotta-feeling', cat: 'song-pop', franchise: 'Black Eyed Peas', game: 'I Gotta Feeling',
      title: 'I Gotta Feeling', year: 2009, lang: 'en',
      sources: [apple({ song: 1440773907, country: 'mx' })],
    },
    {
      id: 'song-rolling-in-the-deep', cat: 'song-pop', franchise: 'Adele', game: 'Rolling in the Deep',
      title: 'Rolling in the Deep', year: 2010, lang: 'en',
      sources: [apple({ song: 1544491233, country: 'mx' })],
    },
    {
      id: 'song-call-me-maybe', cat: 'song-pop', franchise: 'Carly Rae Jepsen', game: 'Call Me Maybe',
      title: 'Call Me Maybe', year: 2011, lang: 'en',
      sources: [apple({ song: 1442997912, country: 'mx' })],
    },
    {
      id: 'song-somebody-that-i-used-to-know', cat: 'song-pop', franchise: 'Gotye', game: 'Somebody That I Used to Know',
      title: 'Somebody That I Used to Know', year: 2011, lang: 'en',
      sources: [apple({ song: 1440754487, country: 'mx' })],
    },
    {
      id: 'song-happy', cat: 'song-pop', franchise: 'Pharrell Williams', game: 'Happy',
      title: 'Happy', year: 2013, lang: 'en',
      sources: [apple({ song: 863835363, country: 'mx' })],
    },
    {
      id: 'song-royals', cat: 'song-pop', franchise: 'Lorde', game: 'Royals',
      title: 'Royals', year: 2013, lang: 'en',
      sources: [apple({ song: 1594982922, country: 'mx' })],
    },
    {
      id: 'song-bailando', cat: 'song-pop', franchise: 'Enrique Iglesias', game: 'Bailando',
      title: 'Bailando', year: 2014, lang: 'es',
      sources: [apple({ song: 1440820189, country: 'mx' })],
    },
    {
      id: 'song-shake-it-off', cat: 'song-pop', franchise: 'Taylor Swift', game: 'Shake It Off',
      title: 'Shake It Off', year: 2014, lang: 'en',
      sources: [apple({ song: 1445888394, country: 'mx' })],
    },
    {
      id: 'song-uptown-funk', cat: 'song-pop', franchise: 'Mark Ronson y Bruno Mars', game: 'Uptown Funk',
      title: 'Uptown Funk', year: 2014, lang: 'en',
      sources: [apple({ song: 1061352782, country: 'mx' })],
    },
    {
      id: 'song-hasta-la-raiz', cat: 'song-pop', franchise: 'Natalia Lafourcade', game: 'Hasta la raíz',
      title: 'Hasta la raíz', year: 2015, lang: 'es',
      sources: [apple({ song: 1055384375, country: 'mx' })],
    },
    {
      id: 'song-la-bicicleta', cat: 'song-pop', franchise: 'Carlos Vives y Shakira', game: 'La bicicleta',
      title: 'La bicicleta', year: 2016, lang: 'es',
      sources: [apple({ song: 1299332776, country: 'mx' })],
    },
    {
      id: 'song-havana', cat: 'song-pop', franchise: 'Camila Cabello', game: 'Havana',
      title: 'Havana', year: 2017, lang: 'en',
      sources: [apple({ song: 1321217032, country: 'mx' })],
    },
    {
      id: 'song-shape-of-you', cat: 'song-pop', franchise: 'Ed Sheeran', game: 'Shape of You',
      title: 'Shape of You', year: 2017, lang: 'en',
      sources: [apple({ song: 1193701392, country: 'mx' })],
    },
    {
      id: 'song-bad-guy', cat: 'song-pop', franchise: 'Billie Eilish', game: 'bad guy',
      title: 'bad guy', year: 2019, lang: 'en',
      sources: [apple({ song: 1450695739, country: 'mx' })],
    },
    {
      id: 'song-blinding-lights', cat: 'song-pop', franchise: 'The Weeknd', game: 'Blinding Lights',
      title: 'Blinding Lights', year: 2019, lang: 'en',
      sources: [apple({ song: 1499386265, country: 'mx' })],
    },
    {
      id: 'song-heat-waves', cat: 'song-pop', franchise: 'Glass Animals', game: 'Heat Waves',
      title: 'Heat Waves', year: 2020, lang: 'en',
      sources: [apple({ song: 1681997803, country: 'mx' })],
    },
    {
      id: 'song-levitating', cat: 'song-pop', franchise: 'Dua Lipa', game: 'Levitating',
      title: 'Levitating', year: 2020, lang: 'en',
      sources: [apple({ song: 1552269073, country: 'mx' })],
    },
    {
      id: 'song-save-your-tears', cat: 'song-pop', franchise: 'The Weeknd', game: 'Save Your Tears',
      title: 'Save Your Tears', year: 2020, lang: 'en',
      sources: [apple({ song: 1505683980, country: 'mx' })],
    },
    {
      id: 'song-drivers-license', cat: 'song-pop', franchise: 'Olivia Rodrigo', game: 'drivers license',
      title: 'drivers license', year: 2021, lang: 'en',
      sources: [apple({ song: 1560735480, country: 'mx' })],
    },
    {
      id: 'song-stay', cat: 'song-pop', franchise: 'The Kid LAROI y Justin Bieber', game: 'STAY',
      title: 'STAY', year: 2021, lang: 'en',
      sources: [apple({ song: 1574968888, country: 'mx' })],
    },
    {
      id: 'song-anti-hero', cat: 'song-pop', franchise: 'Taylor Swift', game: 'Anti-Hero',
      title: 'Anti-Hero', year: 2022, lang: 'en',
      sources: [apple({ song: 1689131533, country: 'mx' })],
    },
    {
      id: 'song-as-it-was', cat: 'song-pop', franchise: 'Harry Styles', game: 'As It Was',
      title: 'As It Was', year: 2022, lang: 'en',
      sources: [apple({ song: 1615585008, country: 'mx' })],
    },
    {
      id: 'song-kill-bill', cat: 'song-pop', franchise: 'SZA', game: 'Kill Bill',
      title: 'Kill Bill', year: 2022, lang: 'en',
      sources: [apple({ song: 1658650488, country: 'mx' })],
    },
    {
      id: 'song-unholy', cat: 'song-pop', franchise: 'Sam Smith y Kim Petras', game: 'Unholy',
      title: 'Unholy', year: 2022, lang: 'en',
      sources: [apple({ song: 1649325659, country: 'mx' })],
    },
    {
      id: 'song-flowers', cat: 'song-pop', franchise: 'Miley Cyrus', game: 'Flowers',
      title: 'Flowers', year: 2023, lang: 'en',
      sources: [apple({ song: 1702906535, country: 'mx' })],
    },
    {
      id: 'song-beautiful-things', cat: 'song-pop', franchise: 'Benson Boone', game: 'Beautiful Things',
      title: 'Beautiful Things', year: 2024, lang: 'en',
      sources: [apple({ song: 1724488124, country: 'mx' })],
    },
    {
      id: 'song-birds-of-a-feather', cat: 'song-pop', franchise: 'Billie Eilish', game: 'BIRDS OF A FEATHER',
      title: 'BIRDS OF A FEATHER', year: 2024, lang: 'en',
      sources: [apple({ song: 1739659142, country: 'mx' })],
    },
    {
      id: 'song-espresso', cat: 'song-pop', franchise: 'Sabrina Carpenter', game: 'Espresso',
      title: 'Espresso', year: 2024, lang: 'en',
      sources: [apple({ song: 1752214923, country: 'mx' })],
    },
    /* ───────────── Rap y hip-hop (50) ───────────── */
    {
      id: 'song-walk-this-way', cat: 'song-rap', franchise: 'Run-DMC', game: 'Walk This Way',
      title: 'Walk This Way', year: 1986, lang: 'en',
      sources: [...am(254344996, 1568741066), ...busca('Run-DMC', 'Walk This Way')],
    },
    {
      id: 'song-ice-ice-baby', cat: 'song-rap', franchise: 'Vanilla Ice', game: 'Ice Ice Baby',
      title: 'Ice Ice Baby', year: 1990, lang: 'en',
      sources: [...am(716691562), ...busca('Vanilla Ice', 'Ice Ice Baby')],
    },
    {
      id: 'song-u-can-t-touch-this', cat: 'song-rap', franchise: 'MC Hammer', game: 'U Can\'t Touch This',
      title: 'U Can\'t Touch This', year: 1990, lang: 'en',
      sources: [...am(724430402), ...busca('MC Hammer', 'U Can\'t Touch This')],
    },
    {
      id: 'song-baby-got-back', cat: 'song-rap', franchise: 'Sir Mix-a-Lot', game: 'Baby Got Back',
      title: 'Baby Got Back', year: 1992, lang: 'en',
      sources: [...am(1440811075, 702464341), ...busca('Sir Mix-a-Lot', 'Baby Got Back')],
    },
    {
      id: 'song-it-was-a-good-day', cat: 'song-rap', franchise: 'Ice Cube', game: 'It Was a Good Day',
      title: 'It Was a Good Day', year: 1992, lang: 'en',
      sources: [...am(1440858804, 725863347), ...busca('Ice Cube', 'It Was a Good Day')],
    },
    {
      id: 'song-jump-around', cat: 'song-rap', franchise: 'House of Pain', game: 'Jump Around',
      title: 'Jump Around', year: 1992, lang: 'en',
      sources: [...am(1604628161, 1616079470), ...busca('House of Pain', 'Jump Around')],
    },
    {
      id: 'song-c-r-e-a-m', cat: 'song-rap', franchise: 'Wu-Tang Clan', game: 'C.R.E.A.M.',
      title: 'C.R.E.A.M.', year: 1993, lang: 'en',
      sources: [...am(269843734, 1746566980), ...busca('Wu-Tang Clan', 'C.R.E.A.M.', ['C.R.E.A.M. (Cash Rules Everything Around Me)'])],
    },
    {
      id: 'song-juicy', cat: 'song-rap', franchise: 'The Notorious B.I.G.', game: 'Juicy',
      title: 'Juicy', year: 1994, lang: 'en',
      sources: [...am(204669680, 1555620964), ...busca('Notorious B.I.G.', 'Juicy')],
    },
    {
      id: 'song-sabotage', cat: 'song-rap', franchise: 'Beastie Boys', game: 'Sabotage',
      title: 'Sabotage', year: 1994, lang: 'en',
      sources: [...am(724771987, 716575698), ...busca('Beastie Boys', 'Sabotage')],
    },
    {
      id: 'song-california-love', cat: 'song-rap', franchise: '2Pac', game: 'California Love',
      title: 'California Love', year: 1995, lang: 'en',
      sources: [...am(1440764598), ...busca('2Pac', 'California Love')],
    },
    {
      id: 'song-gangsta-s-paradise', cat: 'song-rap', franchise: 'Coolio', game: 'Gangsta\'s Paradise',
      title: 'Gangsta\'s Paradise', year: 1995, lang: 'en',
      sources: [apple({ song: 1827554491, country: 'mx' })],
    },
    {
      id: 'song-ready-or-not', cat: 'song-rap', franchise: 'Fugees', game: 'Ready or Not',
      title: 'Ready or Not', year: 1996, lang: 'en',
      sources: [...am(281701718), ...busca('Fugees', 'Ready or Not')],
    },
    {
      id: 'song-comprendes-mendes', cat: 'song-rap', franchise: 'Control Machete', game: '¿Comprendes Mendes?',
      title: '¿Comprendes Mendes?', year: 1996, lang: 'es',
      sources: [...am(1595217250, 1444102032), ...busca('Control Machete', '¿Comprendes Mendes?')],
    },
    {
      id: 'song-gettin-jiggy-wit-it', cat: 'song-rap', franchise: 'Will Smith', game: 'Gettin\' Jiggy wit It',
      title: 'Gettin\' Jiggy wit It', year: 1997, lang: 'en',
      sources: [...am(161525098, 163357660), ...busca('Will Smith', 'Gettin\' Jiggy wit It')],
    },
    {
      id: 'song-changes', cat: 'song-rap', franchise: '2Pac', game: 'Changes',
      title: 'Changes', year: 1998, lang: 'en',
      sources: [...am(1440764593), ...busca('2Pac', 'Changes')],
    },
    {
      id: 'song-still-d-r-e', cat: 'song-rap', franchise: 'Dr. Dre', game: 'Still D.R.E.',
      title: 'Still D.R.E.', year: 1999, lang: 'en',
      sources: [...am(1440782870, 1444156738), ...busca('Dr. Dre', 'Still D.R.E.')],
    },
    {
      id: 'song-537-c-u-b-a', cat: 'song-rap', franchise: 'Orishas', game: '537 C.U.B.A.',
      title: '537 C.U.B.A.', year: 2000, lang: 'es',
      sources: [...am(726239027), ...busca('Orishas', '537 C.U.B.A.')],
    },
    {
      id: 'song-ms-jackson', cat: 'song-rap', franchise: 'OutKast', game: 'Ms. Jackson',
      title: 'Ms. Jackson', year: 2000, lang: 'en',
      sources: [...am(255836745, 1536616111), ...busca('OutKast', 'Ms. Jackson')],
    },
    {
      id: 'song-the-real-slim-shady', cat: 'song-rap', franchise: 'Eminem', game: 'The Real Slim Shady',
      title: 'The Real Slim Shady', year: 2000, lang: 'en',
      sources: [...am(1440866926), ...busca('Eminem', 'The Real Slim Shady')],
    },
    {
      id: 'song-get-ur-freak-on', cat: 'song-rap', franchise: 'Missy Elliott', game: 'Get Ur Freak On',
      title: 'Get Ur Freak On', year: 2001, lang: 'en',
      sources: [...am(83134182, 83134409, 1744424333), ...busca('Missy Elliott', 'Get Ur Freak On')],
    },
    {
      id: 'song-hot-in-herre', cat: 'song-rap', franchise: 'Nelly', game: 'Hot in Herre',
      title: 'Hot in Herre', year: 2002, lang: 'en',
      sources: [...am(1440770037), ...busca('Nelly', 'Hot in Herre')],
    },
    {
      id: 'song-lose-yourself', cat: 'song-rap', franchise: 'Eminem', game: 'Lose Yourself',
      title: 'Lose Yourself', year: 2002, lang: 'en',
      sources: [apple({ song: 1440903439, country: 'mx' })],
    },
    {
      id: 'song-till-i-collapse', cat: 'song-rap', franchise: 'Eminem', game: 'Till I Collapse',
      title: 'Till I Collapse', year: 2002, lang: 'en',
      sources: [...am(1440903814, 1625004750), ...busca('Eminem', 'Till I Collapse')],
    },
    {
      id: 'song-without-me', cat: 'song-rap', franchise: 'Eminem', game: 'Without Me',
      title: 'Without Me', year: 2002, lang: 'en',
      sources: [...am(1440903693), ...busca('Eminem', 'Without Me')],
    },
    {
      id: 'song-frijolero', cat: 'song-rap', franchise: 'Molotov', game: 'Frijolero',
      title: 'Frijolero', year: 2003, lang: 'es',
      sources: [...am(1443501905, 5241683), ...busca('Molotov', 'Frijolero')],
    },
    {
      id: 'song-hey-ya', cat: 'song-rap', franchise: 'OutKast', game: 'Hey Ya!',
      title: 'Hey Ya!', year: 2003, lang: 'en',
      sources: [apple({ song: 889958963, country: 'mx' })],
    },
    {
      id: 'song-in-da-club', cat: 'song-rap', franchise: '50 Cent', game: 'In da Club',
      title: 'In da Club', year: 2003, lang: 'en',
      sources: [...am(1440841857, 1440907550), ...busca('50 Cent', 'In da Club')],
    },
    {
      id: 'song-no-hay-manera', cat: 'song-rap', franchise: 'Akwid', game: 'No hay manera',
      title: 'No hay manera', year: 2003, lang: 'es',
      sources: [...am(1505576837, 1596968793), ...busca('Akwid', 'No hay manera')],
    },
    {
      id: 'song-where-is-the-love', cat: 'song-rap', franchise: 'Black Eyed Peas', game: 'Where Is the Love?',
      title: 'Where Is the Love?', year: 2003, lang: 'en',
      sources: [...am(1615142635), ...busca('Black Eyed Peas', 'Where Is the Love?')],
    },
    {
      id: 'song-drop-it-like-it-s-hot', cat: 'song-rap', franchise: 'Snoop Dogg', game: 'Drop It Like It\'s Hot',
      title: 'Drop It Like It\'s Hot', year: 2004, lang: 'en',
      sources: [...am(1440795310, 1445287610), ...busca('Snoop Dogg', 'Drop It Like It\'s Hot')],
    },
    {
      id: 'song-yeah', cat: 'song-rap', franchise: 'Usher', game: 'Yeah!',
      title: 'Yeah!', year: 2004, lang: 'en',
      sources: [apple({ song: 386153478, country: 'mx' })],
    },
    {
      id: 'song-gold-digger', cat: 'song-rap', franchise: 'Kanye West', game: 'Gold Digger',
      title: 'Gold Digger', year: 2005, lang: 'en',
      sources: [...am(1440669054, 1440763833), ...busca('Kanye West', 'Gold Digger')],
    },
    {
      id: 'song-stronger', cat: 'song-rap', franchise: 'Kanye West', game: 'Stronger',
      title: 'Stronger', year: 2007, lang: 'en',
      sources: [...am(1451902446, 1442846328), ...busca('Kanye West', 'Stronger')],
    },
    {
      id: 'song-empire-state-of-mind', cat: 'song-rap', franchise: 'JAY-Z', game: 'Empire State of Mind',
      title: 'Empire State of Mind', year: 2009, lang: 'en',
      sources: [...am(1440932750, 1440750745), ...busca('JAY-Z', 'Empire State of Mind')],
    },
    {
      id: 'song-can-t-hold-us', cat: 'song-rap', franchise: 'Macklemore y Ryan Lewis', game: 'Can\'t Hold Us',
      title: 'Can\'t Hold Us', year: 2011, lang: 'en',
      sources: [...am(560097694), ...busca('Macklemore', 'Can\'t Hold Us')],
    },
    {
      id: 'song-latinoamerica', cat: 'song-rap', franchise: 'Calle 13', game: 'Latinoamérica',
      title: 'Latinoamérica', year: 2011, lang: 'es',
      sources: [...am(401208560, 401265183), ...busca('Calle 13', 'Latinoamérica')],
    },
    {
      id: 'song-super-bass', cat: 'song-rap', franchise: 'Nicki Minaj', game: 'Super Bass',
      title: 'Super Bass', year: 2011, lang: 'en',
      sources: [...am(1539774201, 1440910489), ...busca('Nicki Minaj', 'Super Bass')],
    },
    {
      id: 'song-es-epico', cat: 'song-rap', franchise: 'Canserbero', game: 'Es épico',
      title: 'Es épico', year: 2012, lang: 'es',
      sources: [...am(1527697555), ...busca('Canserbero', 'Es épico')],
    },
    {
      id: 'song-rap-god', cat: 'song-rap', franchise: 'Eminem', game: 'Rap God',
      title: 'Rap God', year: 2013, lang: 'en',
      sources: [...am(1440820081, 1440863086), ...busca('Eminem', 'Rap God')],
    },
    {
      id: 'song-hotline-bling', cat: 'song-rap', franchise: 'Drake', game: 'Hotline Bling',
      title: 'Hotline Bling', year: 2015, lang: 'en',
      sources: [...am(1440843974, 1440841730), ...busca('Drake', 'Hotline Bling')],
    },
    {
      id: 'song-see-you-again', cat: 'song-rap', franchise: 'Wiz Khalifa', game: 'See You Again',
      title: 'See You Again', year: 2015, lang: 'en',
      sources: [...am(966411602, 1029609244), ...busca('Wiz Khalifa', 'See You Again')],
    },
    {
      id: 'song-bodak-yellow', cat: 'song-rap', franchise: 'Cardi B', game: 'Bodak Yellow',
      title: 'Bodak Yellow', year: 2017, lang: 'en',
      sources: [...am(1368156577), ...busca('Cardi B', 'Bodak Yellow')],
    },
    {
      id: 'song-humble', cat: 'song-rap', franchise: 'Kendrick Lamar', game: 'HUMBLE.',
      title: 'HUMBLE.', year: 2017, lang: 'en',
      sources: [...am(1440881684), ...busca('Kendrick Lamar', 'HUMBLE.')],
    },
    {
      id: 'song-rockstar', cat: 'song-rap', franchise: 'Post Malone', game: 'rockstar',
      title: 'rockstar', year: 2017, lang: 'en',
      sources: [...am(1373516920, 1373506170), ...busca('Post Malone', 'rockstar')],
    },
    {
      id: 'song-god-s-plan', cat: 'song-rap', franchise: 'Drake', game: 'God\'s Plan',
      title: 'God\'s Plan', year: 2018, lang: 'en',
      sources: [...am(1418213269), ...busca('Drake', 'God\'s Plan')],
    },
    {
      id: 'song-lucid-dreams', cat: 'song-rap', franchise: 'Juice WRLD', game: 'Lucid Dreams',
      title: 'Lucid Dreams', year: 2018, lang: 'en',
      sources: [...am(1407165118, 1603907058), ...busca('Juice WRLD', 'Lucid Dreams')],
    },
    {
      id: 'song-sicko-mode', cat: 'song-rap', franchise: 'Travis Scott', game: 'SICKO MODE',
      title: 'SICKO MODE', year: 2018, lang: 'en',
      sources: [...am(1421242781), ...busca('Travis Scott', 'SICKO MODE')],
    },
    {
      id: 'song-old-town-road', cat: 'song-rap', franchise: 'Lil Nas X', game: 'Old Town Road',
      title: 'Old Town Road', year: 2019, lang: 'en',
      sources: [apple({ song: 1456313177, country: 'mx' })],
    },
    {
      id: 'song-rene', cat: 'song-rap', franchise: 'Residente', game: 'René',
      title: 'René', year: 2020, lang: 'es',
      sources: [...am(1500087286), ...busca('Residente', 'René')],
    },
    {
      id: 'song-not-like-us', cat: 'song-rap', franchise: 'Kendrick Lamar', game: 'Not Like Us',
      title: 'Not Like Us', year: 2024, lang: 'en',
      sources: [...am(1744776167), ...busca('Kendrick Lamar', 'Not Like Us')],
    },
    /* ───────────── Reggaetón (50) ───────────── */
    {
      id: 'song-pa-que-retozen', cat: 'song-reggaeton', franchise: 'Tego Calderón', game: 'Pa\' que retozen',
      title: 'Pa\' que retozen', year: 2002, lang: 'es',
      sources: busca('Tego Calderón', 'Pa\' que retozen'),
    },
    {
      id: 'song-dile', cat: 'song-reggaeton', franchise: 'Don Omar', game: 'Dile',
      title: 'Dile', year: 2003, lang: 'es',
      sources: busca('Don Omar', 'Dile'),
    },
    {
      id: 'song-pobre-diabla', cat: 'song-reggaeton', franchise: 'Don Omar', game: 'Pobre diabla',
      title: 'Pobre diabla', year: 2003, lang: 'es',
      sources: busca('Don Omar', 'Pobre diabla'),
    },
    {
      id: 'song-quiero-bailar', cat: 'song-reggaeton', franchise: 'Ivy Queen', game: 'Quiero bailar',
      title: 'Quiero bailar', year: 2003, lang: 'es',
      sources: busca('Ivy Queen', 'Quiero bailar'),
    },
    {
      id: 'song-gasolina', cat: 'song-reggaeton', franchise: 'Daddy Yankee', game: 'Gasolina',
      title: 'Gasolina', year: 2004, lang: 'es',
      sources: [apple({ song: 6781413547, country: 'mx' })],
    },
    {
      id: 'song-lo-que-paso-paso', cat: 'song-reggaeton', franchise: 'Daddy Yankee', game: 'Lo que pasó, pasó',
      title: 'Lo que pasó, pasó', year: 2004, lang: 'es',
      sources: busca('Daddy Yankee', 'Lo que pasó, pasó'),
    },
    {
      id: 'song-atrevete-te-te', cat: 'song-reggaeton', franchise: 'Calle 13', game: 'Atrévete-te-te',
      title: 'Atrévete-te-te', year: 2005, lang: 'es',
      sources: busca('Calle 13', 'Atrévete-te-te'),
    },
    {
      id: 'song-rakata', cat: 'song-reggaeton', franchise: 'Wisin & Yandel', game: 'Rakata',
      title: 'Rakata', year: 2005, lang: 'es',
      sources: [apple({ song: 1467933609, country: 'mx' })],
    },
    {
      id: 'song-te-quiero', cat: 'song-reggaeton', franchise: 'Flex', game: 'Te quiero',
      title: 'Te quiero', year: 2007, lang: 'es',
      sources: [apple({ song: 1605253237, country: 'mx' })],
    },
    {
      id: 'song-salio-el-sol', cat: 'song-reggaeton', franchise: 'Don Omar', game: 'Salió el sol',
      title: 'Salió el sol', year: 2009, lang: 'es',
      sources: busca('Don Omar', 'Salió el sol'),
    },
    {
      id: 'song-danza-kuduro', cat: 'song-reggaeton', franchise: 'Don Omar', game: 'Danza Kuduro',
      title: 'Danza Kuduro', year: 2010, lang: 'es',
      sources: [apple({ song: 1440781761, country: 'mx' })],
    },
    {
      id: 'song-limbo', cat: 'song-reggaeton', franchise: 'Daddy Yankee', game: 'Limbo',
      title: 'Limbo', year: 2012, lang: 'es',
      sources: busca('Daddy Yankee', 'Limbo'),
    },
    {
      id: 'song-ay-vamos', cat: 'song-reggaeton', franchise: 'J Balvin', game: 'Ay vamos',
      title: 'Ay vamos', year: 2014, lang: 'es',
      sources: busca('J Balvin', 'Ay vamos'),
    },
    {
      id: 'song-mi-vecinita', cat: 'song-reggaeton', franchise: 'Plan B', game: 'Mi vecinita',
      title: 'Mi vecinita', year: 2014, lang: 'es',
      sources: busca('Plan B', 'Mi vecinita'),
    },
    {
      id: 'song-el-perdon', cat: 'song-reggaeton', franchise: 'Nicky Jam y Enrique Iglesias', game: 'El perdón',
      title: 'El perdón', year: 2015, lang: 'es',
      sources: busca('Nicky Jam', 'El perdón'),
    },
    {
      id: 'song-ginza', cat: 'song-reggaeton', franchise: 'J Balvin', game: 'Ginza',
      title: 'Ginza', year: 2015, lang: 'es',
      sources: busca('J Balvin', 'Ginza'),
    },
    {
      id: 'song-chantaje', cat: 'song-reggaeton', franchise: 'Shakira y Maluma', game: 'Chantaje',
      title: 'Chantaje', year: 2016, lang: 'es',
      sources: [apple({ song: 1234665569, country: 'mx' })],
    },
    {
      id: 'song-hasta-el-amanecer', cat: 'song-reggaeton', franchise: 'Nicky Jam', game: 'Hasta el amanecer',
      title: 'Hasta el amanecer', year: 2016, lang: 'es',
      sources: [apple({ song: 1189391898, country: 'mx' })],
    },
    {
      id: 'song-me-rehuso', cat: 'song-reggaeton', franchise: 'Danny Ocean', game: 'Me rehúso',
      title: 'Me rehúso', year: 2016, lang: 'es',
      sources: [apple({ song: 1248528301, country: 'mx' })],
    },
    {
      id: 'song-otra-vez', cat: 'song-reggaeton', franchise: 'Zion & Lennox', game: 'Otra vez',
      title: 'Otra vez', year: 2016, lang: 'es',
      sources: busca('Zion', 'Otra vez'),
    },
    {
      id: 'song-corazon', cat: 'song-reggaeton', franchise: 'Maluma', game: 'Corazón',
      title: 'Corazón', year: 2017, lang: 'es',
      sources: busca('Maluma', 'Corazón'),
    },
    {
      id: 'song-criminal', cat: 'song-reggaeton', franchise: 'Natti Natasha y Ozuna', game: 'Criminal',
      title: 'Criminal', year: 2017, lang: 'es',
      sources: busca('Natti Natasha', 'Criminal'),
    },
    {
      id: 'song-despacito', cat: 'song-reggaeton', franchise: 'Luis Fonsi y Daddy Yankee', game: 'Despacito',
      title: 'Despacito', year: 2017, lang: 'es',
      sources: [apple({ song: 1447401620, country: 'mx' })],
    },
    {
      id: 'song-felices-los-4', cat: 'song-reggaeton', franchise: 'Maluma', game: 'Felices los 4',
      title: 'Felices los 4', year: 2017, lang: 'es',
      sources: [apple({ song: 1377817652, country: 'mx' })],
    },
    {
      id: 'song-mayores', cat: 'song-reggaeton', franchise: 'Becky G y Bad Bunny', game: 'Mayores',
      title: 'Mayores', year: 2017, lang: 'es',
      sources: busca('Becky G', 'Mayores'),
    },
    {
      id: 'song-mi-gente', cat: 'song-reggaeton', franchise: 'J Balvin', game: 'Mi gente',
      title: 'Mi gente', year: 2017, lang: 'es',
      sources: [apple({ song: 1444327839, country: 'mx' })],
    },
    {
      id: 'song-se-preparo', cat: 'song-reggaeton', franchise: 'Ozuna', game: 'Se preparó',
      title: 'Se preparó', year: 2017, lang: 'es',
      sources: busca('Ozuna', 'Se preparó'),
    },
    {
      id: 'song-dura', cat: 'song-reggaeton', franchise: 'Daddy Yankee', game: 'Dura',
      title: 'Dura', year: 2018, lang: 'es',
      sources: busca('Daddy Yankee', 'Dura'),
    },
    {
      id: 'song-taki-taki', cat: 'song-reggaeton', franchise: 'DJ Snake', game: 'Taki Taki',
      title: 'Taki Taki', year: 2018, lang: 'es',
      sources: busca('DJ Snake', 'Taki Taki'),
    },
    {
      id: 'song-callaita', cat: 'song-reggaeton', franchise: 'Bad Bunny', game: 'Callaíta',
      title: 'Callaíta', year: 2019, lang: 'es',
      sources: busca('Bad Bunny', 'Callaíta'),
    },
    {
      id: 'song-china', cat: 'song-reggaeton', franchise: 'Anuel AA, Daddy Yankee y Karol G', game: 'China',
      title: 'China', year: 2019, lang: 'es',
      sources: [apple({ song: 1473307010, country: 'mx' })],
    },
    {
      id: 'song-con-calma', cat: 'song-reggaeton', franchise: 'Daddy Yankee', game: 'Con calma',
      title: 'Con calma', year: 2019, lang: 'es',
      sources: [apple({ song: 1449106558, country: 'mx' })],
    },
    {
      id: 'song-la-playa', cat: 'song-reggaeton', franchise: 'Myke Towers', game: 'La playa',
      title: 'La playa', year: 2019, lang: 'es',
      sources: busca('Myke Towers', 'La playa'),
    },
    {
      id: 'song-otro-trago', cat: 'song-reggaeton', franchise: 'Sech', game: 'Otro trago',
      title: 'Otro trago', year: 2019, lang: 'es',
      sources: busca('Sech', 'Otro trago'),
    },
    {
      id: 'song-tusa', cat: 'song-reggaeton', franchise: 'Karol G y Nicki Minaj', game: 'Tusa',
      title: 'Tusa', year: 2019, lang: 'es',
      sources: busca('Karol G', 'Tusa'),
    },
    {
      id: 'song-bichota', cat: 'song-reggaeton', franchise: 'Karol G', game: 'Bichota',
      title: 'Bichota', year: 2020, lang: 'es',
      sources: busca('Karol G', 'Bichota'),
    },
    {
      id: 'song-dakiti', cat: 'song-reggaeton', franchise: 'Bad Bunny y Jhay Cortez', game: 'Dákiti',
      title: 'Dákiti', year: 2020, lang: 'es',
      sources: [apple({ song: 1542103620, country: 'mx' })],
    },
    {
      id: 'song-hawai', cat: 'song-reggaeton', franchise: 'Maluma', game: 'Hawái',
      title: 'Hawái', year: 2020, lang: 'es',
      sources: [apple({ song: 1528029632, country: 'mx' })],
    },
    {
      id: 'song-la-noche-de-anoche', cat: 'song-reggaeton', franchise: 'Bad Bunny y Rosalía', game: 'La noche de anoche',
      title: 'La noche de anoche', year: 2020, lang: 'es',
      sources: [apple({ song: 1542103215, country: 'mx' })],
    },
    {
      id: 'song-safaera', cat: 'song-reggaeton', franchise: 'Bad Bunny', game: 'Safaera',
      title: 'Safaera', year: 2020, lang: 'es',
      sources: busca('Bad Bunny', 'Safaera'),
    },
    {
      id: 'song-yo-perreo-sola', cat: 'song-reggaeton', franchise: 'Bad Bunny', game: 'Yo perreo sola',
      title: 'Yo perreo sola', year: 2020, lang: 'es',
      sources: busca('Bad Bunny', 'Yo perreo sola'),
    },
    {
      id: 'song-pepas', cat: 'song-reggaeton', franchise: 'Farruko', game: 'Pepas',
      title: 'Pepas', year: 2021, lang: 'es',
      sources: busca('Farruko', 'Pepas'),
    },
    {
      id: 'song-todo-de-ti', cat: 'song-reggaeton', franchise: 'Rauw Alejandro', game: 'Todo de ti',
      title: 'Todo de ti', year: 2021, lang: 'es',
      sources: busca('Rauw Alejandro', 'Todo de ti'),
    },
    {
      id: 'song-feliz-cumpleanos-ferxxo', cat: 'song-reggaeton', franchise: 'Feid', game: 'Feliz cumpleaños Ferxxo',
      title: 'Feliz cumpleaños Ferxxo', year: 2022, lang: 'es',
      sources: busca('Feid', 'Feliz cumpleaños Ferxxo'),
    },
    {
      id: 'song-me-porto-bonito', cat: 'song-reggaeton', franchise: 'Bad Bunny', game: 'Me porto bonito',
      title: 'Me porto bonito', year: 2022, lang: 'es',
      sources: busca('Bad Bunny', 'Me porto bonito'),
    },
    {
      id: 'song-provenza', cat: 'song-reggaeton', franchise: 'Karol G', game: 'Provenza',
      title: 'Provenza', year: 2022, lang: 'es',
      sources: [apple({ song: 1670245875, country: 'mx' })],
    },
    {
      id: 'song-quevedo-bzrp-music-sessions-vol-52', cat: 'song-reggaeton', franchise: 'Bizarrap y Quevedo', game: 'Quevedo: Bzrp Music Sessions, Vol. 52',
      title: 'Quevedo: Bzrp Music Sessions, Vol. 52', year: 2022, lang: 'es',
      sources: [apple({ song: 1632746802, country: 'mx' })],
    },
    {
      id: 'song-titi-me-pregunto', cat: 'song-reggaeton', franchise: 'Bad Bunny', game: 'Tití me preguntó',
      title: 'Tití me preguntó', year: 2022, lang: 'es',
      sources: [apple({ song: 1622045635, country: 'mx' })],
    },
    {
      id: 'song-tqg', cat: 'song-reggaeton', franchise: 'Karol G y Shakira', game: 'TQG',
      title: 'TQG', year: 2023, lang: 'es',
      sources: [apple({ song: 1670245868, country: 'mx' })],
    },
    {
      id: 'song-dtmf', cat: 'song-reggaeton', franchise: 'Bad Bunny', game: 'DtMF',
      title: 'DtMF', year: 2025, lang: 'es',
      sources: busca('Bad Bunny', 'DtMF'),
    },
    /* ───────────── Regional mexicano (50) ───────────── */
    {
      id: 'song-amorcito-corazon', cat: 'song-regional', franchise: 'Pedro Infante', game: 'Amorcito corazón',
      title: 'Amorcito corazón', year: 1948, lang: 'es',
      sources: busca('Pedro Infante', 'Amorcito corazón'),
    },
    {
      id: 'song-mexico-lindo-y-querido', cat: 'song-regional', franchise: 'Jorge Negrete', game: 'México lindo y querido',
      title: 'México lindo y querido', year: 1950, lang: 'es',
      sources: busca('Jorge Negrete', 'México lindo y querido'),
    },
    {
      id: 'song-cien-anos', cat: 'song-regional', franchise: 'Pedro Infante', game: 'Cien años',
      title: 'Cien años', year: 1953, lang: 'es',
      sources: busca('Pedro Infante', 'Cien años'),
    },
    {
      id: 'song-caminos-de-guanajuato', cat: 'song-regional', franchise: 'José Alfredo Jiménez', game: 'Caminos de Guanajuato',
      title: 'Caminos de Guanajuato', year: 1955, lang: 'es',
      sources: busca('José Alfredo Jiménez', 'Caminos de Guanajuato'),
    },
    {
      id: 'song-cucurrucucu-paloma', cat: 'song-regional', franchise: 'Lola Beltrán', game: 'Cucurrucucú paloma',
      title: 'Cucurrucucú paloma', year: 1965, lang: 'es',
      sources: busca('Lola Beltrán', 'Cucurrucucú paloma'),
    },
    {
      id: 'song-sombras', cat: 'song-regional', franchise: 'Javier Solís', game: 'Sombras',
      title: 'Sombras', year: 1965, lang: 'es',
      sources: busca('Javier Solís', 'Sombras'),
    },
    {
      id: 'song-contrabando-y-traicion', cat: 'song-regional', franchise: 'Los Tigres del Norte', game: 'Contrabando y traición',
      title: 'Contrabando y traición', year: 1972, lang: 'es',
      sources: busca('Los Tigres del Norte', 'Contrabando y traición'),
    },
    {
      id: 'song-volver-volver', cat: 'song-regional', franchise: 'Vicente Fernández', game: 'Volver, volver',
      title: 'Volver, volver', year: 1972, lang: 'es',
      sources: busca('Vicente Fernández', 'Volver, volver'),
    },
    {
      id: 'song-el-rey', cat: 'song-regional', franchise: 'Vicente Fernández', game: 'El Rey',
      title: 'El Rey', year: 1973, lang: 'es',
      sources: [apple({ song: 322076425, country: 'mx' })],
    },
    {
      id: 'song-amor-eterno', cat: 'song-regional', franchise: 'Rocío Dúrcal', game: 'Amor eterno',
      title: 'Amor eterno', year: 1984, lang: 'es',
      sources: [apple({ song: 322289901, country: 'mx' })],
    },
    {
      id: 'song-la-jaula-de-oro', cat: 'song-regional', franchise: 'Los Tigres del Norte', game: 'La jaula de oro',
      title: 'La jaula de oro', year: 1984, lang: 'es',
      sources: busca('Los Tigres del Norte', 'La jaula de oro'),
    },
    {
      id: 'song-la-puerta-negra', cat: 'song-regional', franchise: 'Los Tigres del Norte', game: 'La puerta negra',
      title: 'La puerta negra', year: 1985, lang: 'es',
      sources: busca('Los Tigres del Norte', 'La puerta negra'),
    },
    {
      id: 'song-mujeres-divinas', cat: 'song-regional', franchise: 'Vicente Fernández', game: 'Mujeres divinas',
      title: 'Mujeres divinas', year: 1987, lang: 'es',
      sources: busca('Vicente Fernández', 'Mujeres divinas'),
    },
    {
      id: 'song-tu-carcel', cat: 'song-regional', franchise: 'Los Bukis', game: 'Tu cárcel',
      title: 'Tu cárcel', year: 1987, lang: 'es',
      sources: busca('Los Bukis', 'Tu cárcel'),
    },
    {
      id: 'song-por-tu-maldito-amor', cat: 'song-regional', franchise: 'Vicente Fernández', game: 'Por tu maldito amor',
      title: 'Por tu maldito amor', year: 1989, lang: 'es',
      sources: busca('Vicente Fernández', 'Por tu maldito amor'),
    },
    {
      id: 'song-nieves-de-enero', cat: 'song-regional', franchise: 'Chalino Sánchez', game: 'Nieves de enero',
      title: 'Nieves de enero', year: 1990, lang: 'es',
      sources: busca('Chalino Sánchez', 'Nieves de enero'),
    },
    {
      id: 'song-la-culebra', cat: 'song-regional', franchise: 'Banda Machos', game: 'La culebra',
      title: 'La culebra', year: 1993, lang: 'es',
      sources: busca('Banda Machos', 'La culebra'),
    },
    {
      id: 'song-lastima-que-seas-ajena', cat: 'song-regional', franchise: 'Vicente Fernández', game: 'Lástima que seas ajena',
      title: 'Lástima que seas ajena', year: 1993, lang: 'es',
      sources: busca('Vicente Fernández', 'Lástima que seas ajena'),
    },
    {
      id: 'song-mi-vida-eres-tu', cat: 'song-regional', franchise: 'Los Temerarios', game: 'Mi vida eres tú',
      title: 'Mi vida eres tú', year: 1993, lang: 'es',
      sources: busca('Los Temerarios', 'Mi vida eres tú'),
    },
    {
      id: 'song-que-no-quede-huella', cat: 'song-regional', franchise: 'Bronco', game: 'Que no quede huella',
      title: 'Que no quede huella', year: 1993, lang: 'es',
      sources: busca('Bronco', 'Que no quede huella'),
    },
    {
      id: 'song-como-quien-pierde-una-estrella', cat: 'song-regional', franchise: 'Alejandro Fernández', game: 'Como quien pierde una estrella',
      title: 'Como quien pierde una estrella', year: 1995, lang: 'es',
      sources: busca('Alejandro Fernández', 'Como quien pierde una estrella'),
    },
    {
      id: 'song-la-chona', cat: 'song-regional', franchise: 'Los Tucanes de Tijuana', game: 'La chona',
      title: 'La chona', year: 1995, lang: 'es',
      sources: busca('Los Tucanes de Tijuana', 'La chona'),
    },
    {
      id: 'song-jefe-de-jefes', cat: 'song-regional', franchise: 'Los Tigres del Norte', game: 'Jefe de jefes',
      title: 'Jefe de jefes', year: 1997, lang: 'es',
      sources: busca('Los Tigres del Norte', 'Jefe de jefes'),
    },
    {
      id: 'song-por-mujeres-como-tu', cat: 'song-regional', franchise: 'Pepe Aguilar', game: 'Por mujeres como tú',
      title: 'Por mujeres como tú', year: 1998, lang: 'es',
      sources: busca('Pepe Aguilar', 'Por mujeres como tú'),
    },
    {
      id: 'song-secreto-de-amor', cat: 'song-regional', franchise: 'Joan Sebastian', game: 'Secreto de amor',
      title: 'Secreto de amor', year: 2000, lang: 'es',
      sources: busca('Joan Sebastian', 'Secreto de amor'),
    },
    {
      id: 'song-y-llegaste-tu', cat: 'song-regional', franchise: 'Banda El Recodo', game: 'Y llegaste tú',
      title: 'Y llegaste tú', year: 2006, lang: 'es',
      sources: busca('Banda El Recodo', 'Y llegaste tú'),
    },
    {
      id: 'song-la-gran-senora', cat: 'song-regional', franchise: 'Jenni Rivera', game: 'La gran señora',
      title: 'La gran señora', year: 2009, lang: 'es',
      sources: busca('Jenni Rivera', 'La gran señora'),
    },
    {
      id: 'song-llamada-de-mi-ex', cat: 'song-regional', franchise: 'La Arrolladora Banda El Limón', game: 'Llamada de mi ex',
      title: 'Llamada de mi ex', year: 2011, lang: 'es',
      sources: busca('La Arrolladora Banda El Limón', 'Llamada de mi ex'),
    },
    {
      id: 'song-corrido-de-juanito', cat: 'song-regional', franchise: 'Calibre 50', game: 'Corrido de Juanito',
      title: 'Corrido de Juanito', year: 2014, lang: 'es',
      sources: busca('Calibre 50', 'Corrido de Juanito'),
    },
    {
      id: 'song-el-color-de-tus-ojos', cat: 'song-regional', franchise: 'Banda MS', game: 'El color de tus ojos',
      title: 'El color de tus ojos', year: 2014, lang: 'es',
      sources: busca('Banda MS', 'El color de tus ojos'),
    },
    {
      id: 'song-el-karma', cat: 'song-regional', franchise: 'Ariel Camacho y Los Plebes del Rancho', game: 'El karma',
      title: 'El karma', year: 2014, lang: 'es',
      sources: busca('Ariel Camacho', 'El karma'),
    },
    {
      id: 'song-mi-razon-de-ser', cat: 'song-regional', franchise: 'Banda MS', game: 'Mi razón de ser',
      title: 'Mi razón de ser', year: 2015, lang: 'es',
      sources: busca('Banda MS', 'Mi razón de ser'),
    },
    {
      id: 'song-hermosa-experiencia', cat: 'song-regional', franchise: 'Banda MS', game: 'Hermosa experiencia',
      title: 'Hermosa experiencia', year: 2016, lang: 'es',
      sources: busca('Banda MS', 'Hermosa experiencia'),
    },
    {
      id: 'song-te-hubieras-ido-antes', cat: 'song-regional', franchise: 'Julión Álvarez', game: 'Te hubieras ido antes',
      title: 'Te hubieras ido antes', year: 2016, lang: 'es',
      sources: busca('Julión Álvarez', 'Te hubieras ido antes'),
    },
    {
      id: 'song-adios-amor', cat: 'song-regional', franchise: 'Christian Nodal', game: 'Adiós amor',
      title: 'Adiós amor', year: 2017, lang: 'es',
      sources: busca('Christian Nodal', 'Adiós amor'),
    },
    {
      id: 'song-siempre-te-voy-a-querer', cat: 'song-regional', franchise: 'Calibre 50', game: 'Siempre te voy a querer',
      title: 'Siempre te voy a querer', year: 2017, lang: 'es',
      sources: busca('Calibre 50', 'Siempre te voy a querer'),
    },
    {
      id: 'song-de-los-besos-que-te-di', cat: 'song-regional', franchise: 'Christian Nodal', game: 'De los besos que te di',
      title: 'De los besos que te di', year: 2018, lang: 'es',
      sources: busca('Christian Nodal', 'De los besos que te di'),
    },
    {
      id: 'song-amor-tumbado', cat: 'song-regional', franchise: 'Natanael Cano', game: 'Amor tumbado',
      title: 'Amor tumbado', year: 2019, lang: 'es',
      sources: busca('Natanael Cano', 'Amor tumbado'),
    },
    {
      id: 'song-el-toxico', cat: 'song-regional', franchise: 'Grupo Firme y Carin León', game: 'El tóxico',
      title: 'El tóxico', year: 2020, lang: 'es',
      sources: busca('Grupo Firme', 'El tóxico'),
    },
    {
      id: 'song-ya-superame', cat: 'song-regional', franchise: 'Grupo Firme', game: 'Ya supérame',
      title: 'Ya supérame', year: 2020, lang: 'es',
      sources: busca('Grupo Firme', 'Ya supérame'),
    },
    {
      id: 'song-botella-tras-botella', cat: 'song-regional', franchise: 'Gera MX y Christian Nodal', game: 'Botella tras botella',
      title: 'Botella tras botella', year: 2021, lang: 'es',
      sources: busca('Gera MX', 'Botella tras botella'),
    },
    {
      id: 'song-bebe-dame', cat: 'song-regional', franchise: 'Fuerza Regida y Grupo Frontera', game: 'Bebe dame',
      title: 'Bebe dame', year: 2022, lang: 'es',
      sources: busca('Fuerza Regida', 'Bebe dame'),
    },
    {
      id: 'song-primera-cita', cat: 'song-regional', franchise: 'Carin León', game: 'Primera cita',
      title: 'Primera cita', year: 2022, lang: 'es',
      sources: busca('Carin León', 'Primera cita'),
    },
    {
      id: 'song-el-azul', cat: 'song-regional', franchise: 'Junior H y Peso Pluma', game: 'El Azul',
      title: 'El Azul', year: 2023, lang: 'es',
      sources: [apple({ song: 1670252659, country: 'mx' })],
    },
    {
      id: 'song-ella-baila-sola', cat: 'song-regional', franchise: 'Eslabon Armado y Peso Pluma', game: 'Ella baila sola',
      title: 'Ella baila sola', year: 2023, lang: 'es',
      sources: [apple({ song: 1684857373, country: 'mx' })],
    },
    {
      id: 'song-jugaste-y-sufri', cat: 'song-regional', franchise: 'Eslabon Armado y DannyLux', game: 'Jugaste y sufrí',
      title: 'Jugaste y sufrí', year: 2023, lang: 'es',
      sources: busca('Eslabon Armado', 'Jugaste y sufrí'),
    },
    {
      id: 'song-prc', cat: 'song-regional', franchise: 'Peso Pluma y Natanael Cano', game: 'PRC',
      title: 'PRC', year: 2023, lang: 'es',
      sources: busca('Peso Pluma', 'PRC'),
    },
    {
      id: 'song-rosa-pastel', cat: 'song-regional', franchise: 'Peso Pluma y Jasiel Núñez', game: 'Rosa pastel',
      title: 'Rosa pastel', year: 2023, lang: 'es',
      sources: busca('Peso Pluma', 'Rosa pastel'),
    },
    {
      id: 'song-tqm', cat: 'song-regional', franchise: 'Fuerza Regida', game: 'TQM',
      title: 'TQM', year: 2023, lang: 'es',
      sources: busca('Fuerza Regida', 'TQM'),
    },
    {
      id: 'song-la-diabla', cat: 'song-regional', franchise: 'Xavi', game: 'La diabla',
      title: 'La diabla', year: 2024, lang: 'es',
      sources: [apple({ song: 1769098206, country: 'mx' })],
    },
    /* ───────────── Baladas (50) ───────────── */
    {
      id: 'song-can-t-help-falling-in-love', cat: 'song-baladas', franchise: 'Elvis Presley', game: 'Can\'t Help Falling in Love',
      title: 'Can\'t Help Falling in Love', year: 1961, lang: 'en',
      sources: [apple({ song: 1291058002, country: 'mx' })],
    },
    {
      id: 'song-unchained-melody', cat: 'song-baladas', franchise: 'The Righteous Brothers', game: 'Unchained Melody',
      title: 'Unchained Melody', year: 1965, lang: 'en',
      sources: busca('Righteous Brothers', 'Unchained Melody'),
    },
    {
      id: 'song-yo-soy-aquel', cat: 'song-baladas', franchise: 'Raphael', game: 'Yo soy aquel',
      title: 'Yo soy aquel', year: 1966, lang: 'es',
      sources: [apple({ song: 700056228, country: 'mx' })],
    },
    {
      id: 'song-what-a-wonderful-world', cat: 'song-baladas', franchise: 'Louis Armstrong', game: 'What a Wonderful World',
      title: 'What a Wonderful World', year: 1967, lang: 'en',
      sources: [apple({ song: 1442245075, country: 'mx' })],
    },
    {
      id: 'song-my-way', cat: 'song-baladas', franchise: 'Frank Sinatra', game: 'My Way',
      title: 'My Way', year: 1969, lang: 'en',
      sources: [apple({ song: 1440858717, country: 'mx' })],
    },
    {
      id: 'song-el-triste', cat: 'song-baladas', franchise: 'José José', game: 'El Triste',
      title: 'El Triste', year: 1970, lang: 'es',
      sources: [apple({ song: 1249008755, country: 'mx' })],
    },
    {
      id: 'song-gracias-a-la-vida', cat: 'song-baladas', franchise: 'Mercedes Sosa', game: 'Gracias a la vida',
      title: 'Gracias a la vida', year: 1971, lang: 'es',
      sources: [apple({ song: 1887649769, country: 'mx' })],
    },
    {
      id: 'song-imagine', cat: 'song-baladas', franchise: 'John Lennon', game: 'Imagine',
      title: 'Imagine', year: 1971, lang: 'en',
      sources: [apple({ song: 1440853776, country: 'mx' })],
    },
    {
      id: 'song-libre', cat: 'song-baladas', franchise: 'Nino Bravo', game: 'Libre',
      title: 'Libre', year: 1972, lang: 'es',
      sources: [apple({ song: 1444117550, country: 'mx' })],
    },
    {
      id: 'song-eres-tu', cat: 'song-baladas', franchise: 'Mocedades', game: 'Eres tú',
      title: 'Eres tú', year: 1973, lang: 'es',
      sources: [apple({ song: 254527213, country: 'mx' })],
    },
    {
      id: 'song-gavilan-o-paloma', cat: 'song-baladas', franchise: 'José José', game: 'Gavilán o paloma',
      title: 'Gavilán o paloma', year: 1977, lang: 'es',
      sources: [apple({ song: 183296514, country: 'mx' })],
    },
    {
      id: 'song-how-deep-is-your-love', cat: 'song-baladas', franchise: 'Bee Gees', game: 'How Deep Is Your Love',
      title: 'How Deep Is Your Love', year: 1977, lang: 'en',
      sources: busca('Bee Gees', 'How Deep Is Your Love'),
    },
    {
      id: 'song-me-olvide-de-vivir', cat: 'song-baladas', franchise: 'Julio Iglesias', game: 'Me olvidé de vivir',
      title: 'Me olvidé de vivir', year: 1978, lang: 'es',
      sources: busca('Julio Iglesias', 'Me olvidé de vivir'),
    },
    {
      id: 'song-vivir-asi-es-morir-de-amor', cat: 'song-baladas', franchise: 'Camilo Sesto', game: 'Vivir así es morir de amor',
      title: 'Vivir así es morir de amor', year: 1978, lang: 'es',
      sources: [apple({ song: 313154080, country: 'mx' })],
    },
    {
      id: 'song-almohada', cat: 'song-baladas', franchise: 'José José', game: 'Almohada',
      title: 'Almohada', year: 1980, lang: 'es',
      sources: busca('José José', 'Almohada'),
    },
    {
      id: 'song-hey', cat: 'song-baladas', franchise: 'Julio Iglesias', game: 'Hey',
      title: 'Hey', year: 1980, lang: 'es',
      sources: [apple({ song: 1637480435, country: 'mx' })],
    },
    {
      id: 'song-perdoname', cat: 'song-baladas', franchise: 'Camilo Sesto', game: 'Perdóname',
      title: 'Perdóname', year: 1980, lang: 'es',
      sources: busca('Camilo Sesto', 'Perdóname'),
    },
    {
      id: 'song-endless-love', cat: 'song-baladas', franchise: 'Diana Ross y Lionel Richie', game: 'Endless Love',
      title: 'Endless Love', year: 1981, lang: 'en',
      sources: busca('Diana Ross', 'Endless Love'),
    },
    {
      id: 'song-la-gata-bajo-la-lluvia', cat: 'song-baladas', franchise: 'Rocío Dúrcal', game: 'La gata bajo la lluvia',
      title: 'La gata bajo la lluvia', year: 1981, lang: 'es',
      sources: busca('Rocío Dúrcal', 'La gata bajo la lluvia'),
    },
    {
      id: 'song-total-eclipse-of-the-heart', cat: 'song-baladas', franchise: 'Bonnie Tyler', game: 'Total Eclipse of the Heart',
      title: 'Total Eclipse of the Heart', year: 1983, lang: 'en',
      sources: [apple({ song: 675798126, country: 'mx' })],
    },
    {
      id: 'song-querida', cat: 'song-baladas', franchise: 'Juan Gabriel', game: 'Querida',
      title: 'Querida', year: 1984, lang: 'es',
      sources: [apple({ song: 1592349440, country: 'mx' })],
    },
    {
      id: 'song-greatest-love-of-all', cat: 'song-baladas', franchise: 'Whitney Houston', game: 'Greatest Love of All',
      title: 'Greatest Love of All', year: 1985, lang: 'en',
      sources: busca('Whitney Houston', 'Greatest Love of All'),
    },
    {
      id: 'song-hasta-que-te-conoci', cat: 'song-baladas', franchise: 'Juan Gabriel', game: 'Hasta que te conocí',
      title: 'Hasta que te conocí', year: 1986, lang: 'es',
      sources: busca('Juan Gabriel', 'Hasta que te conocí'),
    },
    {
      id: 'song-toda-la-vida', cat: 'song-baladas', franchise: 'Emmanuel', game: 'Toda la vida',
      title: 'Toda la vida', year: 1986, lang: 'es',
      sources: busca('Emmanuel', 'Toda la vida'),
    },
    {
      id: 'song-ahora-te-puedes-marchar', cat: 'song-baladas', franchise: 'Luis Miguel', game: 'Ahora te puedes marchar',
      title: 'Ahora te puedes marchar', year: 1987, lang: 'es',
      sources: busca('Luis Miguel', 'Ahora te puedes marchar'),
    },
    {
      id: 'song-lo-que-no-fue-no-sera', cat: 'song-baladas', franchise: 'José José', game: 'Lo que no fue no será',
      title: 'Lo que no fue no será', year: 1987, lang: 'es',
      sources: busca('José José', 'Lo que no fue no será'),
    },
    {
      id: 'song-la-incondicional', cat: 'song-baladas', franchise: 'Luis Miguel', game: 'La incondicional',
      title: 'La incondicional', year: 1988, lang: 'es',
      sources: [apple({ song: 101069172, country: 'mx' })],
    },
    {
      id: 'song-everything-i-do-i-do-it-for-you', cat: 'song-baladas', franchise: 'Bryan Adams', game: '(Everything I Do) I Do It for You',
      title: '(Everything I Do) I Do It for You', year: 1991, lang: 'en',
      sources: busca('Bryan Adams', '(Everything I Do) I Do It for You'),
    },
    {
      id: 'song-i-will-always-love-you', cat: 'song-baladas', franchise: 'Whitney Houston', game: 'I Will Always Love You',
      title: 'I Will Always Love You', year: 1992, lang: 'en',
      sources: [apple({ song: 388151901, country: 'mx' })],
    },
    {
      id: 'song-hero', cat: 'song-baladas', franchise: 'Mariah Carey', game: 'Hero',
      title: 'Hero', year: 1993, lang: 'en',
      sources: busca('Mariah Carey', 'Hero'),
    },
    {
      id: 'song-historia-de-taxi', cat: 'song-baladas', franchise: 'Ricardo Arjona', game: 'Historia de taxi',
      title: 'Historia de taxi', year: 1993, lang: 'es',
      sources: busca('Ricardo Arjona', 'Historia de taxi'),
    },
    {
      id: 'song-la-soledad', cat: 'song-baladas', franchise: 'Laura Pausini', game: 'La soledad',
      title: 'La soledad', year: 1993, lang: 'es',
      sources: busca('Laura Pausini', 'La soledad'),
    },
    {
      id: 'song-amiga-mia', cat: 'song-baladas', franchise: 'Alejandro Sanz', game: 'Amiga mía',
      title: 'Amiga mía', year: 1997, lang: 'es',
      sources: busca('Alejandro Sanz', 'Amiga mía'),
    },
    {
      id: 'song-my-heart-will-go-on', cat: 'song-baladas', franchise: 'Celine Dion', game: 'My Heart Will Go On',
      title: 'My Heart Will Go On', year: 1997, lang: 'en',
      sources: [apple({ song: 205745391, country: 'mx' })],
    },
    {
      id: 'song-i-don-t-want-to-miss-a-thing', cat: 'song-baladas', franchise: 'Aerosmith', game: 'I Don\'t Want to Miss a Thing',
      title: 'I Don\'t Want to Miss a Thing', year: 1998, lang: 'en',
      sources: busca('Aerosmith', 'I Don\'t Want to Miss a Thing'),
    },
    {
      id: 'song-si-no-te-hubieras-ido', cat: 'song-baladas', franchise: 'Marco Antonio Solís', game: 'Si no te hubieras ido',
      title: 'Si no te hubieras ido', year: 1999, lang: 'es',
      sources: busca('Marco Antonio Solís', 'Si no te hubieras ido'),
    },
    {
      id: 'song-azul', cat: 'song-baladas', franchise: 'Cristian Castro', game: 'Azul',
      title: 'Azul', year: 2001, lang: 'es',
      sources: busca('Cristian Castro', 'Azul'),
    },
    {
      id: 'song-heroe', cat: 'song-baladas', franchise: 'Enrique Iglesias', game: 'Héroe',
      title: 'Héroe', year: 2001, lang: 'es',
      sources: busca('Enrique Iglesias', 'Héroe'),
    },
    {
      id: 'song-sin-miedo-a-nada', cat: 'song-baladas', franchise: 'Alex Ubago', game: 'Sin miedo a nada',
      title: 'Sin miedo a nada', year: 2001, lang: 'es',
      sources: [apple({ song: 36223322, country: 'mx' })],
    },
    {
      id: 'song-entra-en-mi-vida', cat: 'song-baladas', franchise: 'Sin Bandera', game: 'Entra en mi vida',
      title: 'Entra en mi vida', year: 2002, lang: 'es',
      sources: busca('Sin Bandera', 'Entra en mi vida'),
    },
    {
      id: 'song-amor-del-bueno', cat: 'song-baladas', franchise: 'Reyli Barba', game: 'Amor del bueno',
      title: 'Amor del bueno', year: 2004, lang: 'es',
      sources: [apple({ song: 1637480172, country: 'mx' })],
    },
    {
      id: 'song-yo-quisiera', cat: 'song-baladas', franchise: 'Reik', game: 'Yo quisiera',
      title: 'Yo quisiera', year: 2005, lang: 'es',
      sources: busca('Reik', 'Yo quisiera'),
    },
    {
      id: 'song-coleccionista-de-canciones', cat: 'song-baladas', franchise: 'Camila', game: 'Coleccionista de canciones',
      title: 'Coleccionista de canciones', year: 2006, lang: 'es',
      sources: busca('Camila', 'Coleccionista de canciones'),
    },
    {
      id: 'song-todo-cambio', cat: 'song-baladas', franchise: 'Camila', game: 'Todo cambió',
      title: 'Todo cambió', year: 2006, lang: 'es',
      sources: [apple({ song: 1637480169, country: 'mx' })],
    },
    {
      id: 'song-mientes', cat: 'song-baladas', franchise: 'Camila', game: 'Mientes',
      title: 'Mientes', year: 2010, lang: 'es',
      sources: [apple({ song: 351106320, country: 'mx' })],
    },
    {
      id: 'song-someone-like-you', cat: 'song-baladas', franchise: 'Adele', game: 'Someone Like You',
      title: 'Someone Like You', year: 2011, lang: 'en',
      sources: busca('Adele', 'Someone Like You'),
    },
    {
      id: 'song-all-of-me', cat: 'song-baladas', franchise: 'John Legend', game: 'All of Me',
      title: 'All of Me', year: 2013, lang: 'en',
      sources: busca('John Legend', 'All of Me'),
    },
    {
      id: 'song-perfect', cat: 'song-baladas', franchise: 'Ed Sheeran', game: 'Perfect',
      title: 'Perfect', year: 2017, lang: 'en',
      sources: busca('Ed Sheeran', 'Perfect'),
    },
    {
      id: 'song-shallow', cat: 'song-baladas', franchise: 'Lady Gaga y Bradley Cooper', game: 'Shallow',
      title: 'Shallow', year: 2018, lang: 'en',
      sources: [apple({ song: 1434371887, country: 'mx' })],
    },
    {
      id: 'song-die-with-a-smile', cat: 'song-baladas', franchise: 'Lady Gaga y Bruno Mars', game: 'Die With A Smile',
      title: 'Die With A Smile', year: 2024, lang: 'en',
      sources: [apple({ song: 1792667027, country: 'mx' })],
    },
    /* ───────────── Electrónica (50) ───────────── */
    {
      id: 'song-what-is-love', cat: 'song-electronica', franchise: 'Haddaway', game: 'What Is Love',
      title: 'What Is Love', year: 1993, lang: 'en',
      sources: busca('Haddaway', 'What Is Love'),
    },
    {
      id: 'song-firestarter', cat: 'song-electronica', franchise: 'The Prodigy', game: 'Firestarter',
      title: 'Firestarter', year: 1996, lang: 'en',
      sources: busca('Prodigy', 'Firestarter'),
    },
    {
      id: 'song-around-the-world', cat: 'song-electronica', franchise: 'Daft Punk', game: 'Around the World',
      title: 'Around the World', year: 1997, lang: 'en',
      sources: busca('Daft Punk', 'Around the World'),
    },
    {
      id: 'song-barbie-girl', cat: 'song-electronica', franchise: 'Aqua', game: 'Barbie Girl',
      title: 'Barbie Girl', year: 1997, lang: 'en',
      sources: [apple({ song: 1440768563, country: 'mx' })],
    },
    {
      id: 'song-blue-da-ba-dee', cat: 'song-electronica', franchise: 'Eiffel 65', game: 'Blue (Da Ba Dee)',
      title: 'Blue (Da Ba Dee)', year: 1998, lang: 'en',
      sources: [apple({ song: 257425447, country: 'mx' })],
    },
    {
      id: 'song-music-sounds-better-with-you', cat: 'song-electronica', franchise: 'Stardust', game: 'Music Sounds Better with You',
      title: 'Music Sounds Better with You', year: 1998, lang: 'en',
      sources: busca('Stardust', 'Music Sounds Better with You'),
    },
    {
      id: 'song-the-rockafeller-skank', cat: 'song-electronica', franchise: 'Fatboy Slim', game: 'The Rockafeller Skank',
      title: 'The Rockafeller Skank', year: 1998, lang: 'en',
      sources: busca('Fatboy Slim', 'The Rockafeller Skank'),
    },
    {
      id: 'song-better-off-alone', cat: 'song-electronica', franchise: 'Alice Deejay', game: 'Better Off Alone',
      title: 'Better Off Alone', year: 1999, lang: 'en',
      sources: busca('Alice Deejay', 'Better Off Alone'),
    },
    {
      id: 'song-hey-boy-hey-girl', cat: 'song-electronica', franchise: 'The Chemical Brothers', game: 'Hey Boy Hey Girl',
      title: 'Hey Boy Hey Girl', year: 1999, lang: 'en',
      sources: busca('Chemical Brothers', 'Hey Boy Hey Girl'),
    },
    {
      id: 'song-porcelain', cat: 'song-electronica', franchise: 'Moby', game: 'Porcelain',
      title: 'Porcelain', year: 1999, lang: 'en',
      sources: busca('Moby', 'Porcelain'),
    },
    {
      id: 'song-sandstorm', cat: 'song-electronica', franchise: 'Darude', game: 'Sandstorm',
      title: 'Sandstorm', year: 1999,
      sources: busca('Darude', 'Sandstorm'),
    },
    {
      id: 'song-one-more-time', cat: 'song-electronica', franchise: 'Daft Punk', game: 'One More Time',
      title: 'One More Time', year: 2000, lang: 'en',
      sources: busca('Daft Punk', 'One More Time'),
    },
    {
      id: 'song-harder-better-faster-stronger', cat: 'song-electronica', franchise: 'Daft Punk', game: 'Harder, Better, Faster, Stronger',
      title: 'Harder, Better, Faster, Stronger', year: 2001, lang: 'en',
      sources: busca('Daft Punk', 'Harder, Better, Faster, Stronger'),
    },
    {
      id: 'song-mas', cat: 'song-electronica', franchise: 'Kinky', game: 'Más',
      title: 'Más', year: 2002, lang: 'es',
      sources: busca('Kinky', 'Más'),
    },
    {
      id: 'song-satisfaction', cat: 'song-electronica', franchise: 'Benny Benassi', game: 'Satisfaction',
      title: 'Satisfaction', year: 2002, lang: 'en',
      sources: busca('Benny Benassi', 'Satisfaction'),
    },
    {
      id: 'song-call-on-me', cat: 'song-electronica', franchise: 'Eric Prydz', game: 'Call on Me',
      title: 'Call on Me', year: 2004, lang: 'en',
      sources: busca('Eric Prydz', 'Call on Me'),
    },
    {
      id: 'song-baila-mi-corazon', cat: 'song-electronica', franchise: 'Belanova', game: 'Baila mi corazón',
      title: 'Baila mi corazón', year: 2005, lang: 'es',
      sources: busca('Belanova', 'Baila mi corazón'),
    },
    {
      id: 'song-everytime-we-touch', cat: 'song-electronica', franchise: 'Cascada', game: 'Everytime We Touch',
      title: 'Everytime We Touch', year: 2005, lang: 'en',
      sources: busca('Cascada', 'Everytime We Touch'),
    },
    {
      id: 'song-tijuana-makes-me-happy', cat: 'song-electronica', franchise: 'Nortec Collective: Bostich + Fussible', game: 'Tijuana Makes Me Happy',
      title: 'Tijuana Makes Me Happy', year: 2005, lang: 'en',
      sources: busca('Bostich', 'Tijuana Makes Me Happy'),
    },
    {
      id: 'song-ghosts-n-stuff', cat: 'song-electronica', franchise: 'deadmau5', game: 'Ghosts \'n\' Stuff',
      title: 'Ghosts \'n\' Stuff', year: 2008, lang: 'en',
      sources: busca('deadmau5', 'Ghosts \'n\' Stuff'),
    },
    {
      id: 'song-memories', cat: 'song-electronica', franchise: 'David Guetta', game: 'Memories',
      title: 'Memories', year: 2009, lang: 'en',
      sources: busca('David Guetta', 'Memories'),
    },
    {
      id: 'song-scary-monsters-and-nice-sprites', cat: 'song-electronica', franchise: 'Skrillex', game: 'Scary Monsters and Nice Sprites',
      title: 'Scary Monsters and Nice Sprites', year: 2010, lang: 'en',
      sources: busca('Skrillex', 'Scary Monsters and Nice Sprites'),
    },
    {
      id: 'song-bangarang', cat: 'song-electronica', franchise: 'Skrillex', game: 'Bangarang',
      title: 'Bangarang', year: 2011, lang: 'en',
      sources: busca('Skrillex', 'Bangarang'),
    },
    {
      id: 'song-feel-so-close', cat: 'song-electronica', franchise: 'Calvin Harris', game: 'Feel So Close',
      title: 'Feel So Close', year: 2011, lang: 'en',
      sources: busca('Calvin Harris', 'Feel So Close'),
    },
    {
      id: 'song-levels', cat: 'song-electronica', franchise: 'Avicii', game: 'Levels',
      title: 'Levels', year: 2011, lang: 'en',
      sources: busca('Avicii', 'Levels'),
    },
    {
      id: 'song-titanium', cat: 'song-electronica', franchise: 'David Guetta', game: 'Titanium',
      title: 'Titanium', year: 2011, lang: 'en',
      sources: busca('David Guetta', 'Titanium'),
    },
    {
      id: 'song-clarity', cat: 'song-electronica', franchise: 'Zedd', game: 'Clarity',
      title: 'Clarity', year: 2012, lang: 'en',
      sources: busca('Zedd', 'Clarity'),
    },
    {
      id: 'song-don-t-you-worry-child', cat: 'song-electronica', franchise: 'Swedish House Mafia', game: 'Don\'t You Worry Child',
      title: 'Don\'t You Worry Child', year: 2012, lang: 'en',
      sources: busca('Swedish House Mafia', 'Don\'t You Worry Child'),
    },
    {
      id: 'song-animals', cat: 'song-electronica', franchise: 'Martin Garrix', game: 'Animals',
      title: 'Animals', year: 2013,
      sources: busca('Martin Garrix', 'Animals'),
    },
    {
      id: 'song-get-lucky', cat: 'song-electronica', franchise: 'Daft Punk', game: 'Get Lucky',
      title: 'Get Lucky', year: 2013, lang: 'en',
      sources: [apple({ song: 617154366, country: 'mx' })],
    },
    {
      id: 'song-hey-brother', cat: 'song-electronica', franchise: 'Avicii', game: 'Hey Brother',
      title: 'Hey Brother', year: 2013, lang: 'en',
      sources: busca('Avicii', 'Hey Brother'),
    },
    {
      id: 'song-red-lights', cat: 'song-electronica', franchise: 'Tiësto', game: 'Red Lights',
      title: 'Red Lights', year: 2013, lang: 'en',
      sources: busca('Tiësto', 'Red Lights'),
    },
    {
      id: 'song-this-is-what-it-feels-like', cat: 'song-electronica', franchise: 'Armin van Buuren', game: 'This Is What It Feels Like',
      title: 'This Is What It Feels Like', year: 2013, lang: 'en',
      sources: busca('Armin van Buuren', 'This Is What It Feels Like'),
    },
    {
      id: 'song-turn-down-for-what', cat: 'song-electronica', franchise: 'DJ Snake y Lil Jon', game: 'Turn Down for What',
      title: 'Turn Down for What', year: 2013, lang: 'en',
      sources: busca('DJ Snake', 'Turn Down for What'),
    },
    {
      id: 'song-wake-me-up', cat: 'song-electronica', franchise: 'Avicii', game: 'Wake Me Up',
      title: 'Wake Me Up', year: 2013, lang: 'en',
      sources: [apple({ song: 1440872929, country: 'mx' })],
    },
    {
      id: 'song-firestone', cat: 'song-electronica', franchise: 'Kygo', game: 'Firestone',
      title: 'Firestone', year: 2014, lang: 'en',
      sources: busca('Kygo', 'Firestone'),
    },
    {
      id: 'song-prayer-in-c', cat: 'song-electronica', franchise: 'Robin Schulz', game: 'Prayer in C',
      title: 'Prayer in C', year: 2014, lang: 'en',
      sources: busca('Robin Schulz', 'Prayer in C'),
    },
    {
      id: 'song-summer', cat: 'song-electronica', franchise: 'Calvin Harris', game: 'Summer',
      title: 'Summer', year: 2014, lang: 'en',
      sources: busca('Calvin Harris', 'Summer'),
    },
    {
      id: 'song-the-nights', cat: 'song-electronica', franchise: 'Avicii', game: 'The Nights',
      title: 'The Nights', year: 2014, lang: 'en',
      sources: busca('Avicii', 'The Nights'),
    },
    {
      id: 'song-faded', cat: 'song-electronica', franchise: 'Alan Walker', game: 'Faded',
      title: 'Faded', year: 2015, lang: 'en',
      sources: busca('Alan Walker', 'Faded'),
    },
    {
      id: 'song-lean-on', cat: 'song-electronica', franchise: 'Major Lazer', game: 'Lean On',
      title: 'Lean On', year: 2015, lang: 'en',
      sources: busca('Major Lazer', 'Lean On'),
    },
    {
      id: 'song-alone', cat: 'song-electronica', franchise: 'Marshmello', game: 'Alone',
      title: 'Alone', year: 2016,
      sources: busca('Marshmello', 'Alone'),
    },
    {
      id: 'song-closer', cat: 'song-electronica', franchise: 'The Chainsmokers', game: 'Closer',
      title: 'Closer', year: 2016, lang: 'en',
      sources: busca('Chainsmokers', 'Closer'),
    },
    {
      id: 'song-don-t-let-me-down', cat: 'song-electronica', franchise: 'The Chainsmokers', game: 'Don\'t Let Me Down',
      title: 'Don\'t Let Me Down', year: 2016, lang: 'en',
      sources: busca('Chainsmokers', 'Don\'t Let Me Down'),
    },
    {
      id: 'song-this-is-what-you-came-for', cat: 'song-electronica', franchise: 'Calvin Harris', game: 'This Is What You Came For',
      title: 'This Is What You Came For', year: 2016, lang: 'en',
      sources: busca('Calvin Harris', 'This Is What You Came For'),
    },
    {
      id: 'song-it-ain-t-me', cat: 'song-electronica', franchise: 'Kygo y Selena Gomez', game: 'It Ain\'t Me',
      title: 'It Ain\'t Me', year: 2017, lang: 'en',
      sources: busca('Kygo', 'It Ain\'t Me'),
    },
    {
      id: 'song-happier', cat: 'song-electronica', franchise: 'Marshmello y Bastille', game: 'Happier',
      title: 'Happier', year: 2018, lang: 'en',
      sources: busca('Marshmello', 'Happier'),
    },
    {
      id: 'song-one-kiss', cat: 'song-electronica', franchise: 'Calvin Harris y Dua Lipa', game: 'One Kiss',
      title: 'One Kiss', year: 2018, lang: 'en',
      sources: busca('Calvin Harris', 'One Kiss'),
    },
    {
      id: 'song-nathy-peluso-bzrp-music-sessions-vol-36', cat: 'song-electronica', franchise: 'Bizarrap y Nathy Peluso', game: 'Nathy Peluso: Bzrp Music Sessions, Vol. 36',
      title: 'Nathy Peluso: Bzrp Music Sessions, Vol. 36', year: 2020, lang: 'es',
      sources: busca('Bizarrap', 'Nathy Peluso: Bzrp Music Sessions, Vol. 36'),
    },
    {
      id: 'song-shakira-bzrp-music-sessions-vol-53', cat: 'song-electronica', franchise: 'Bizarrap y Shakira', game: 'Shakira: Bzrp Music Sessions, Vol. 53',
      title: 'Shakira: Bzrp Music Sessions, Vol. 53', year: 2023, lang: 'es',
      sources: [apple({ song: 1731060236, country: 'mx' })],
    },
    /* ───────────── Cumbia (50) ───────────── */
    {
      id: 'song-colombia-tierra-querida', cat: 'song-cumbia', franchise: 'Lucho Bermúdez', game: 'Colombia tierra querida',
      title: 'Colombia tierra querida', year: 1954, lang: 'es',
      sources: am(1632630292),
    },
    {
      id: 'song-el-mudo', cat: 'song-cumbia', franchise: 'La Sonora Santanera', game: 'El mudo',
      title: 'El mudo', year: 1964, lang: 'es',
      sources: am(316933565, 505165406),
    },
    {
      id: 'song-tiburon-a-la-vista', cat: 'song-cumbia', franchise: 'Mike Laure', game: 'Tiburón a la vista',
      title: 'Tiburón a la vista', year: 1964, lang: 'es',
      sources: am(1495528839),
    },
    {
      id: 'song-la-cosecha-de-mujeres', cat: 'song-cumbia', franchise: 'Mike Laure', game: 'La cosecha de mujeres',
      title: 'La cosecha de mujeres', year: 1965, lang: 'es',
      sources: am(1495528857),
    },
    {
      id: 'song-la-boa', cat: 'song-cumbia', franchise: 'La Sonora Santanera', game: 'La boa',
      title: 'La boa', year: 1966, lang: 'es',
      sources: disco(1088909284, 'La Boa'),
    },
    {
      id: 'song-la-danza-de-los-mirlos', cat: 'song-cumbia', franchise: 'Los Mirlos', game: 'La danza de los mirlos',
      title: 'La danza de los mirlos', year: 1973, lang: 'es',
      sources: am(265131176, 1249035947),
    },
    {
      id: 'song-cumbia-sampuesana', cat: 'song-cumbia', franchise: 'Aniceto Molina', game: 'Cumbia sampuesana',
      title: 'Cumbia sampuesana', year: 1975, lang: 'es',
      sources: am(1575799596),
    },
    {
      id: 'song-lamento-de-amor', cat: 'song-cumbia', franchise: 'Rigo Tovar', game: 'Lamento de amor',
      title: 'Lamento de amor', year: 1976, lang: 'es',
      sources: am(1457618739),
    },
    {
      id: 'song-mi-matamoros-querido', cat: 'song-cumbia', franchise: 'Rigo Tovar', game: 'Mi Matamoros querido',
      title: 'Mi Matamoros querido', year: 1977, lang: 'es',
      sources: am(1691934750),
    },
    {
      id: 'song-quien-pompo', cat: 'song-cumbia', franchise: 'Chico Che y La Crisis', game: 'Quién pompó',
      title: 'Quién pompó', year: 1980, lang: 'es',
      sources: am(379518328),
    },
    {
      id: 'song-mi-cucu', cat: 'song-cumbia', franchise: 'La Sonora Dinamita', game: 'Mi cucu',
      title: 'Mi cucu', year: 1983, lang: 'es',
      sources: am(746531260, 39926407),
    },
    {
      id: 'song-se-me-perdio-la-cadenita', cat: 'song-cumbia', franchise: 'La Sonora Dinamita', game: 'Se me perdió la cadenita',
      title: 'Se me perdió la cadenita', year: 1983, lang: 'es',
      sources: am(1444385729, 1146993191),
    },
    {
      id: 'song-que-nadie-sepa-mi-sufrir', cat: 'song-cumbia', franchise: 'La Sonora Dinamita', game: 'Que nadie sepa mi sufrir',
      title: 'Que nadie sepa mi sufrir', year: 1984, lang: 'es',
      sources: am(1444265704),
    },
    {
      id: 'song-baila-esta-cumbia', cat: 'song-cumbia', franchise: 'Selena', game: 'Baila esta cumbia',
      title: 'Baila esta cumbia', year: 1990, lang: 'es',
      sources: am(721260699),
    },
    {
      id: 'song-juana-la-cubana', cat: 'song-cumbia', franchise: 'Fito Olivares', game: 'Juana la cubana',
      title: 'Juana la cubana', year: 1990, lang: 'es',
      sources: am(582323417),
    },
    {
      id: 'song-sergio-el-bailador', cat: 'song-cumbia', franchise: 'Bronco', game: 'Sergio el bailador',
      title: 'Sergio el bailador', year: 1990, lang: 'es',
      sources: am(190278395),
    },
    {
      id: 'song-como-la-flor', cat: 'song-cumbia', franchise: 'Selena', game: 'Como la flor',
      title: 'Como la flor', year: 1992, lang: 'es',
      sources: [...disco(714819386, 'Como la Flor'), ...busca('Selena', 'Como la flor')],
    },
    {
      id: 'song-la-carcacha', cat: 'song-cumbia', franchise: 'Selena', game: 'La carcacha',
      title: 'La carcacha', year: 1992, lang: 'es',
      sources: [...disco(714819386, 'La Carcacha'), ...busca('Selena', 'La carcacha')],
    },
    {
      id: 'song-no-debes-jugar', cat: 'song-cumbia', franchise: 'Selena', game: 'No debes jugar',
      title: 'No debes jugar', year: 1993, lang: 'es',
      sources: am(714819646, 724566122),
    },
    {
      id: 'song-amor-prohibido', cat: 'song-cumbia', franchise: 'Selena', game: 'Amor prohibido',
      title: 'Amor prohibido', year: 1994, lang: 'es',
      sources: [apple({ song: 1443857141, country: 'mx' })],
    },
    {
      id: 'song-bidi-bidi-bom-bom', cat: 'song-cumbia', franchise: 'Selena', game: 'Bidi Bidi Bom Bom',
      title: 'Bidi Bidi Bom Bom', year: 1994, lang: 'es',
      sources: am(1440827910),
    },
    {
      id: 'song-el-chico-del-apartamento-512', cat: 'song-cumbia', franchise: 'Selena', game: 'El chico del apartamento 512',
      title: 'El chico del apartamento 512', year: 1994, lang: 'es',
      sources: am(725211261, 721289260),
    },
    {
      id: 'song-fotos-y-recuerdos', cat: 'song-cumbia', franchise: 'Selena', game: 'Fotos y recuerdos',
      title: 'Fotos y recuerdos', year: 1994, lang: 'es',
      sources: am(721289397),
    },
    {
      id: 'song-si-una-vez', cat: 'song-cumbia', franchise: 'Selena', game: 'Si una vez',
      title: 'Si una vez', year: 1994, lang: 'es',
      sources: busca('Selena', 'Si una vez'),
    },
    {
      id: 'song-techno-cumbia', cat: 'song-cumbia', franchise: 'Selena', game: 'Techno cumbia',
      title: 'Techno cumbia', year: 1994, lang: 'es',
      sources: am(714819768),
    },
    {
      id: 'song-entrega-de-amor', cat: 'song-cumbia', franchise: 'Los Ángeles Azules', game: 'Entrega de amor',
      title: 'Entrega de amor', year: 1995, lang: 'es',
      sources: disco(1443507634, 'Entrega de Amor'),
    },
    {
      id: 'song-17-anos', cat: 'song-cumbia', franchise: 'Los Ángeles Azules', game: '17 años',
      title: '17 años', year: 1996, lang: 'es',
      sources: am(1443654306, 1371136672),
    },
    {
      id: 'song-como-te-voy-a-olvidar', cat: 'song-cumbia', franchise: 'Los Ángeles Azules', game: 'Cómo te voy a olvidar',
      title: 'Cómo te voy a olvidar', year: 1996, lang: 'es',
      sources: [...am(1776937779), ...disco(1455576080, 'Cómo Te Voy a Olvidar')],
    },
    {
      id: 'song-el-liston-de-tu-pelo', cat: 'song-cumbia', franchise: 'Los Ángeles Azules', game: 'El listón de tu pelo',
      title: 'El listón de tu pelo', year: 1996, lang: 'es',
      sources: am(1443555130, 1371136548),
    },
    {
      id: 'song-juventud', cat: 'song-cumbia', franchise: 'Los Ángeles Azules', game: 'Juventud',
      title: 'Juventud', year: 1997, lang: 'es',
      sources: am(1443654187, 1443489006),
    },
    {
      id: 'song-mi-nina-mujer', cat: 'song-cumbia', franchise: 'Los Ángeles Azules', game: 'Mi niña mujer',
      title: 'Mi niña mujer', year: 1997, lang: 'es',
      sources: am(1443531390),
    },
    {
      id: 'song-nunca-me-faltes', cat: 'song-cumbia', franchise: 'Antonio Ríos', game: 'Nunca me faltes',
      title: 'Nunca me faltes', year: 1999, lang: 'es',
      sources: am(718975090, 300743719),
    },
    {
      id: 'song-mentirosa', cat: 'song-cumbia', franchise: 'Ráfaga', game: 'Mentirosa',
      title: 'Mentirosa', year: 2000, lang: 'es',
      sources: disco(292205980, 'Mentirosa'),
    },
    {
      id: 'song-aunque-no-sea-conmigo', cat: 'song-cumbia', franchise: 'Celso Piña y Café Tacvba', game: 'Aunque no sea conmigo',
      title: 'Aunque no sea conmigo', year: 2001, lang: 'es',
      sources: am(1116228776),
    },
    {
      id: 'song-azucar', cat: 'song-cumbia', franchise: 'Kumbia Kings', game: 'Azúcar',
      title: 'Azúcar', year: 2001, lang: 'es',
      sources: am(724500303),
    },
    {
      id: 'song-cumbia-sobre-el-rio', cat: 'song-cumbia', franchise: 'Celso Piña', game: 'Cumbia sobre el río',
      title: 'Cumbia sobre el río', year: 2001, lang: 'es',
      sources: am(1489872779, 308821943),
    },
    {
      id: 'song-fuiste-mala', cat: 'song-cumbia', franchise: 'Kumbia Kings', game: 'Fuiste mala',
      title: 'Fuiste mala', year: 2003, lang: 'es',
      sources: am(724436675),
    },
    {
      id: 'song-na-na-na-dulce-nina', cat: 'song-cumbia', franchise: 'Kumbia Kings', game: 'Na na na (Dulce niña)',
      title: 'Na na na (Dulce niña)', year: 2004, lang: 'es',
      sources: am(724385728),
    },
    {
      id: 'song-chiquilla', cat: 'song-cumbia', franchise: 'A.B. Quintanilla III y los Kumbia All Starz', game: 'Chiquilla',
      title: 'Chiquilla', year: 2006, lang: 'es',
      sources: am(714574105),
    },
    {
      id: 'song-fuego', cat: 'song-cumbia', franchise: 'Bomba Estéreo', game: 'Fuego',
      title: 'Fuego', year: 2008, lang: 'es',
      sources: busca('Bomba Estéreo', 'Fuego'),
    },
    {
      id: 'song-la-cumbia-del-mole', cat: 'song-cumbia', franchise: 'Lila Downs', game: 'La cumbia del mole',
      title: 'La cumbia del mole', year: 2008, lang: 'es',
      sources: am(714016022, 1501782968),
    },
    {
      id: 'song-motor-y-motivo', cat: 'song-cumbia', franchise: 'Grupo 5', game: 'Motor y motivo',
      title: 'Motor y motivo', year: 2012, lang: 'es',
      sources: am(1462180018),
    },
    {
      id: 'song-las-maravillas-de-la-vida', cat: 'song-cumbia', franchise: 'Los Ángeles Azules y Carla Morrison', game: 'Las maravillas de la vida',
      title: 'Las maravillas de la vida', year: 2018, lang: 'es',
      sources: am(1455580474),
    },
    {
      id: 'song-mis-sentimientos', cat: 'song-cumbia', franchise: 'Los Ángeles Azules y Ximena Sariñana', game: 'Mis sentimientos',
      title: 'Mis sentimientos', year: 2018, lang: 'es',
      sources: am(1455580481),
    },
    {
      id: 'song-nunca-es-suficiente', cat: 'song-cumbia', franchise: 'Los Ángeles Azules y Natalia Lafourcade', game: 'Nunca es suficiente',
      title: 'Nunca es suficiente', year: 2018, lang: 'es',
      sources: [apple({ song: 1370211920, country: 'mx' })],
    },
    {
      id: 'song-amor-a-primera-vista', cat: 'song-cumbia', franchise: 'Los Ángeles Azules, Belinda y Lalo Ebratt', game: 'Amor a primera vista',
      title: 'Amor a primera vista', year: 2019, lang: 'es',
      sources: [...am(1800818689), ...disco(1465661989, 'Amor a Primera Vista')],
    },
    {
      id: 'song-no-se-va', cat: 'song-cumbia', franchise: 'Grupo Frontera', game: 'No se va',
      title: 'No se va', year: 2022, lang: 'es',
      sources: am(1660305293),
    },
    {
      id: 'song-un-x100to', cat: 'song-cumbia', franchise: 'Grupo Frontera y Bad Bunny', game: 'Un x100to',
      title: 'Un x100to', year: 2023, lang: 'es',
      sources: [apple({ song: 1682500319, country: 'mx' })],
    },
    {
      id: 'song-el-cumbion', cat: 'song-cumbia', franchise: 'Grupo Cañaveral y Joey Montana', game: 'El cumbión',
      title: 'El cumbión', year: 2024, lang: 'es',
      sources: am(1745574456),
    },
    {
      id: 'song-te-vas', cat: 'song-cumbia', franchise: 'Américo y Vicentico', game: 'Te vas',
      title: 'Te vas', year: 2024, lang: 'es',
      sources: am(1781933464),
    },
    /* ───────────── Salsa (50) ───────────── */
    {
      id: 'song-bemba-colora', cat: 'song-salsa', franchise: 'Celia Cruz', game: 'Bemba colorá',
      title: 'Bemba colorá', year: 1966, lang: 'es',
      sources: busca('Celia Cruz', 'Bemba colorá'),
    },
    {
      id: 'song-che-che-cole', cat: 'song-salsa', franchise: 'Willie Colón y Héctor Lavoe', game: 'Che Che Colé',
      title: 'Che Che Colé', year: 1969, lang: 'es',
      sources: am(1464288855, 1466318446),
    },
    {
      id: 'song-quitate-tu', cat: 'song-salsa', franchise: 'Fania All-Stars', game: 'Quítate tú',
      title: 'Quítate tú', year: 1971, lang: 'es',
      sources: am(461045668),
    },
    {
      id: 'song-sonido-bestial', cat: 'song-salsa', franchise: 'Richie Ray y Bobby Cruz', game: 'Sonido bestial',
      title: 'Sonido bestial', year: 1971, lang: 'es',
      sources: am(1814700395),
    },
    {
      id: 'song-aguanile', cat: 'song-salsa', franchise: 'Willie Colón y Héctor Lavoe', game: 'Aguanile',
      title: 'Aguanile', year: 1972, lang: 'es',
      sources: am(1464288947, 1464286730),
    },
    {
      id: 'song-calle-luna-calle-sol', cat: 'song-salsa', franchise: 'Willie Colón y Héctor Lavoe', game: 'Calle Luna, Calle Sol',
      title: 'Calle Luna, Calle Sol', year: 1973, lang: 'es',
      sources: busca('Willie Colón', 'Calle Luna, Calle Sol'),
    },
    {
      id: 'song-todo-tiene-su-final', cat: 'song-salsa', franchise: 'Willie Colón y Héctor Lavoe', game: 'Todo tiene su final',
      title: 'Todo tiene su final', year: 1973, lang: 'es',
      sources: busca('Willie Colón', 'Todo tiene su final'),
    },
    {
      id: 'song-el-nazareno', cat: 'song-salsa', franchise: 'Ismael Rivera', game: 'El Nazareno',
      title: 'El Nazareno', year: 1974, lang: 'es',
      sources: busca('Ismael Rivera', 'El Nazareno'),
    },
    {
      id: 'song-quimbara', cat: 'song-salsa', franchise: 'Celia Cruz y Johnny Pacheco', game: 'Quimbara',
      title: 'Quimbara', year: 1974, lang: 'es',
      sources: busca('Celia Cruz', 'Quimbara'),
    },
    {
      id: 'song-el-preso', cat: 'song-salsa', franchise: 'Fruko y sus Tesos', game: 'El preso',
      title: 'El preso', year: 1975, lang: 'es',
      sources: am(6562210),
    },
    {
      id: 'song-lloraras', cat: 'song-salsa', franchise: 'Oscar D\'León', game: 'Llorarás',
      title: 'Llorarás', year: 1975, lang: 'es',
      sources: [...disco(1495470816, 'Llorarás'), ...am(1455665401)],
    },
    {
      id: 'song-un-verano-en-nueva-york', cat: 'song-salsa', franchise: 'El Gran Combo de Puerto Rico', game: 'Un verano en Nueva York',
      title: 'Un verano en Nueva York', year: 1975, lang: 'es',
      sources: am(285743051),
    },
    {
      id: 'song-periodico-de-ayer', cat: 'song-salsa', franchise: 'Héctor Lavoe', game: 'Periódico de ayer',
      title: 'Periódico de ayer', year: 1976, lang: 'es',
      sources: am(1464286725, 1784537356),
    },
    {
      id: 'song-pablo-pueblo', cat: 'song-salsa', franchise: 'Willie Colón y Rubén Blades', game: 'Pablo Pueblo',
      title: 'Pablo Pueblo', year: 1977, lang: 'es',
      sources: busca('Willie Colón', 'Pablo Pueblo'),
    },
    {
      id: 'song-buscando-guayaba', cat: 'song-salsa', franchise: 'Willie Colón y Rubén Blades', game: 'Buscando guayaba',
      title: 'Buscando guayaba', year: 1978, lang: 'es',
      sources: am(1464957240, 1464288193),
    },
    {
      id: 'song-el-cantante', cat: 'song-salsa', franchise: 'Héctor Lavoe', game: 'El cantante',
      title: 'El cantante', year: 1978, lang: 'es',
      sources: busca('Héctor Lavoe', 'El cantante'),
    },
    {
      id: 'song-pedro-navaja', cat: 'song-salsa', franchise: 'Rubén Blades', game: 'Pedro Navaja',
      title: 'Pedro Navaja', year: 1978, lang: 'es',
      sources: [apple({ song: 1464290722, country: 'mx' })],
    },
    {
      id: 'song-plastico', cat: 'song-salsa', franchise: 'Willie Colón y Rubén Blades', game: 'Plástico',
      title: 'Plástico', year: 1978, lang: 'es',
      sources: am(1712393990, 1579606238),
    },
    {
      id: 'song-idilio', cat: 'song-salsa', franchise: 'Willie Colón', game: 'Idilio',
      title: 'Idilio', year: 1983, lang: 'es',
      sources: am(374542161, 324727767),
    },
    {
      id: 'song-juanito-alimana', cat: 'song-salsa', franchise: 'Héctor Lavoe', game: 'Juanito Alimaña',
      title: 'Juanito Alimaña', year: 1983, lang: 'es',
      sources: busca('Héctor Lavoe', 'Juanito Alimaña'),
    },
    {
      id: 'song-me-libere', cat: 'song-salsa', franchise: 'El Gran Combo de Puerto Rico', game: 'Me liberé',
      title: 'Me liberé', year: 1983, lang: 'es',
      sources: am(1697217405),
    },
    {
      id: 'song-cali-pachanguero', cat: 'song-salsa', franchise: 'Grupo Niche', game: 'Cali pachanguero',
      title: 'Cali pachanguero', year: 1984, lang: 'es',
      sources: am(1750353645, 1712818699),
    },
    {
      id: 'song-decisiones', cat: 'song-salsa', franchise: 'Rubén Blades', game: 'Decisiones',
      title: 'Decisiones', year: 1984, lang: 'es',
      sources: am(396454159, 298187940),
    },
    {
      id: 'song-la-cura', cat: 'song-salsa', franchise: 'Frankie Ruiz', game: 'La cura',
      title: 'La cura', year: 1985, lang: 'es',
      sources: busca('Frankie Ruiz', 'La cura'),
    },
    {
      id: 'song-rebelion', cat: 'song-salsa', franchise: 'Joe Arroyo', game: 'Rebelión',
      title: 'Rebelión', year: 1986, lang: 'es',
      sources: am(64324643, 72282917),
    },
    {
      id: 'song-tu-me-quemas', cat: 'song-salsa', franchise: 'Eddie Santiago', game: 'Tú me quemas',
      title: 'Tú me quemas', year: 1986, lang: 'es',
      sources: am(1622432051, 1605843465),
    },
    {
      id: 'song-desnudate-mujer', cat: 'song-salsa', franchise: 'Frankie Ruiz', game: 'Desnúdate mujer',
      title: 'Desnúdate mujer', year: 1987, lang: 'es',
      sources: am(1752901977, 1601324590),
    },
    {
      id: 'song-gotas-de-lluvia', cat: 'song-salsa', franchise: 'Grupo Niche', game: 'Gotas de lluvia',
      title: 'Gotas de lluvia', year: 1987, lang: 'es',
      sources: am(260756793, 251568849),
    },
    {
      id: 'song-lluvia', cat: 'song-salsa', franchise: 'Eddie Santiago', game: 'Lluvia',
      title: 'Lluvia', year: 1987, lang: 'es',
      sources: busca('Eddie Santiago', 'Lluvia'),
    },
    {
      id: 'song-en-barranquilla-me-quedo', cat: 'song-salsa', franchise: 'Joe Arroyo', game: 'En Barranquilla me quedo',
      title: 'En Barranquilla me quedo', year: 1988, lang: 'es',
      sources: am(1450272459),
    },
    {
      id: 'song-el-gran-varon', cat: 'song-salsa', franchise: 'Willie Colón', game: 'El gran varón',
      title: 'El gran varón', year: 1989, lang: 'es',
      sources: am(1436559567, 1470543552),
    },
    {
      id: 'song-una-aventura', cat: 'song-salsa', franchise: 'Grupo Niche', game: 'Una aventura',
      title: 'Una aventura', year: 1989, lang: 'es',
      sources: am(260756283),
    },
    {
      id: 'song-la-noche', cat: 'song-salsa', franchise: 'Joe Arroyo', game: 'La noche',
      title: 'La noche', year: 1990, lang: 'es',
      sources: am(250549426),
    },
    {
      id: 'song-amores-como-el-nuestro', cat: 'song-salsa', franchise: 'Jerry Rivera', game: 'Amores como el nuestro',
      title: 'Amores como el nuestro', year: 1992, lang: 'es',
      sources: am(205697170, 374541074),
    },
    {
      id: 'song-cuenta-conmigo', cat: 'song-salsa', franchise: 'Jerry Rivera', game: 'Cuenta conmigo',
      title: 'Cuenta conmigo', year: 1992, lang: 'es',
      sources: am(279752663),
    },
    {
      id: 'song-ese-hombre', cat: 'song-salsa', franchise: 'La India', game: 'Ese hombre',
      title: 'Ese hombre', year: 1994, lang: 'es',
      sources: am(1697424175, 1444087150),
    },
    {
      id: 'song-te-conozco-bien', cat: 'song-salsa', franchise: 'Marc Anthony', game: 'Te conozco bien',
      title: 'Te conozco bien', year: 1995, lang: 'es',
      sources: busca('Marc Anthony', 'Te conozco bien'),
    },
    {
      id: 'song-contra-la-corriente', cat: 'song-salsa', franchise: 'Marc Anthony', game: 'Contra la corriente',
      title: 'Contra la corriente', year: 1997, lang: 'es',
      sources: busca('Marc Anthony', 'Contra la corriente'),
    },
    {
      id: 'song-i-like-it-like-that', cat: 'song-salsa', franchise: 'Tito Nieves', game: 'I Like It Like That',
      title: 'I Like It Like That', year: 1997, lang: 'en',
      sources: am(1443775070),
    },
    {
      id: 'song-la-vida-es-un-carnaval', cat: 'song-salsa', franchise: 'Celia Cruz', game: 'La vida es un carnaval',
      title: 'La vida es un carnaval', year: 1998, lang: 'es',
      sources: am(1696227174, 1445663595),
    },
    {
      id: 'song-y-hubo-alguien', cat: 'song-salsa', franchise: 'Marc Anthony', game: 'Y hubo alguien',
      title: 'Y hubo alguien', year: 1999, lang: 'es',
      sources: busca('Marc Anthony', 'Y hubo alguien'),
    },
    {
      id: 'song-la-negra-tiene-tumbao', cat: 'song-salsa', franchise: 'Celia Cruz', game: 'La negra tiene tumbao',
      title: 'La negra tiene tumbao', year: 2001, lang: 'es',
      sources: am(722525293),
    },
    {
      id: 'song-que-alguien-me-diga', cat: 'song-salsa', franchise: 'Gilberto Santa Rosa', game: 'Que alguien me diga',
      title: 'Que alguien me diga', year: 2001, lang: 'es',
      sources: am(171830031),
    },
    {
      id: 'song-tengo-ganas', cat: 'song-salsa', franchise: 'Victor Manuelle', game: 'Tengo ganas',
      title: 'Tengo ganas', year: 2001, lang: 'es',
      sources: am(264713155),
    },
    {
      id: 'song-rie-y-llora', cat: 'song-salsa', franchise: 'Celia Cruz', game: 'Ríe y llora',
      title: 'Ríe y llora', year: 2003, lang: 'es',
      sources: am(168404788),
    },
    {
      id: 'song-tu-amor-me-hace-bien', cat: 'song-salsa', franchise: 'Marc Anthony', game: 'Tu amor me hace bien',
      title: 'Tu amor me hace bien', year: 2004, lang: 'es',
      sources: busca('Marc Anthony', 'Tu amor me hace bien'),
    },
    {
      id: 'song-valio-la-pena', cat: 'song-salsa', franchise: 'Marc Anthony', game: 'Valió la pena',
      title: 'Valió la pena', year: 2004, lang: 'es',
      sources: [...am(201265571), ...disco(201265551, 'Valió la Pena')],
    },
    {
      id: 'song-ahora-quien', cat: 'song-salsa', franchise: 'Marc Anthony', game: 'Ahora quién',
      title: 'Ahora quién', year: 2006, lang: 'es',
      sources: am(323764744),
    },
    {
      id: 'song-flor-palida', cat: 'song-salsa', franchise: 'Marc Anthony', game: 'Flor pálida',
      title: 'Flor pálida', year: 2013, lang: 'es',
      sources: busca('Marc Anthony', 'Flor pálida'),
    },
    {
      id: 'song-vivir-mi-vida', cat: 'song-salsa', franchise: 'Marc Anthony', game: 'Vivir mi vida',
      title: 'Vivir mi vida', year: 2013, lang: 'es',
      sources: [apple({ song: 668743167, country: 'mx' })],
    },
    /* ───────────── Metal (50) ───────────── */
    {
      id: 'song-iron-man', cat: 'song-metal', franchise: 'Black Sabbath', game: 'Iron Man',
      title: 'Iron Man', year: 1970, lang: 'en',
      sources: busca('Black Sabbath', 'Iron Man'),
    },
    {
      id: 'song-paranoid', cat: 'song-metal', franchise: 'Black Sabbath', game: 'Paranoid',
      title: 'Paranoid', year: 1970, lang: 'en',
      sources: busca('Black Sabbath', 'Paranoid'),
    },
    {
      id: 'song-ace-of-spades', cat: 'song-metal', franchise: 'Motörhead', game: 'Ace of Spades',
      title: 'Ace of Spades', year: 1980, lang: 'en',
      sources: busca('Motörhead', 'Ace of Spades'),
    },
    {
      id: 'song-breaking-the-law', cat: 'song-metal', franchise: 'Judas Priest', game: 'Breaking the Law',
      title: 'Breaking the Law', year: 1980, lang: 'en',
      sources: busca('Judas Priest', 'Breaking the Law'),
    },
    {
      id: 'song-crazy-train', cat: 'song-metal', franchise: 'Ozzy Osbourne', game: 'Crazy Train',
      title: 'Crazy Train', year: 1980, lang: 'en',
      sources: busca('Ozzy Osbourne', 'Crazy Train'),
    },
    {
      id: 'song-los-rockeros-van-al-infierno', cat: 'song-metal', franchise: 'Barón Rojo', game: 'Los rockeros van al infierno',
      title: 'Los rockeros van al infierno', year: 1982, lang: 'es',
      sources: busca('Barón Rojo', 'Los rockeros van al infierno'),
    },
    {
      id: 'song-run-to-the-hills', cat: 'song-metal', franchise: 'Iron Maiden', game: 'Run to the Hills',
      title: 'Run to the Hills', year: 1982, lang: 'en',
      sources: busca('Iron Maiden', 'Run to the Hills'),
    },
    {
      id: 'song-holy-diver', cat: 'song-metal', franchise: 'Dio', game: 'Holy Diver',
      title: 'Holy Diver', year: 1983, lang: 'en',
      sources: busca('Dio', 'Holy Diver'),
    },
    {
      id: 'song-the-trooper', cat: 'song-metal', franchise: 'Iron Maiden', game: 'The Trooper',
      title: 'The Trooper', year: 1983, lang: 'en',
      sources: busca('Iron Maiden', 'The Trooper'),
    },
    {
      id: 'song-rock-you-like-a-hurricane', cat: 'song-metal', franchise: 'Scorpions', game: 'Rock You Like a Hurricane',
      title: 'Rock You Like a Hurricane', year: 1984, lang: 'en',
      sources: busca('Scorpions', 'Rock You Like a Hurricane'),
    },
    {
      id: 'song-we-re-not-gonna-take-it', cat: 'song-metal', franchise: 'Twisted Sister', game: 'We\'re Not Gonna Take It',
      title: 'We\'re Not Gonna Take It', year: 1984, lang: 'en',
      sources: busca('Twisted Sister', 'We\'re Not Gonna Take It'),
    },
    {
      id: 'song-master-of-puppets', cat: 'song-metal', franchise: 'Metallica', game: 'Master of Puppets',
      title: 'Master of Puppets', year: 1986, lang: 'en',
      sources: busca('Metallica', 'Master of Puppets'),
    },
    {
      id: 'song-raining-blood', cat: 'song-metal', franchise: 'Slayer', game: 'Raining Blood',
      title: 'Raining Blood', year: 1986, lang: 'en',
      sources: busca('Slayer', 'Raining Blood'),
    },
    {
      id: 'song-the-final-countdown', cat: 'song-metal', franchise: 'Europe', game: 'The Final Countdown',
      title: 'The Final Countdown', year: 1986, lang: 'en',
      sources: busca('Europe', 'The Final Countdown'),
    },
    {
      id: 'song-pour-some-sugar-on-me', cat: 'song-metal', franchise: 'Def Leppard', game: 'Pour Some Sugar on Me',
      title: 'Pour Some Sugar on Me', year: 1987, lang: 'en',
      sources: busca('Def Leppard', 'Pour Some Sugar on Me'),
    },
    {
      id: 'song-one', cat: 'song-metal', franchise: 'Metallica', game: 'One',
      title: 'One', year: 1988, lang: 'en',
      sources: busca('Metallica', 'One'),
    },
    {
      id: 'song-kickstart-my-heart', cat: 'song-metal', franchise: 'Mötley Crüe', game: 'Kickstart My Heart',
      title: 'Kickstart My Heart', year: 1989, lang: 'en',
      sources: busca('Mötley Crüe', 'Kickstart My Heart'),
    },
    {
      id: 'song-cowboys-from-hell', cat: 'song-metal', franchise: 'Pantera', game: 'Cowboys from Hell',
      title: 'Cowboys from Hell', year: 1990, lang: 'en',
      sources: busca('Pantera', 'Cowboys from Hell'),
    },
    {
      id: 'song-la-leyenda-del-hada-y-el-mago', cat: 'song-metal', franchise: 'Rata Blanca', game: 'La leyenda del hada y el mago',
      title: 'La leyenda del hada y el mago', year: 1990, lang: 'es',
      sources: busca('Rata Blanca', 'La leyenda del hada y el mago'),
    },
    {
      id: 'song-mujer-amante', cat: 'song-metal', franchise: 'Rata Blanca', game: 'Mujer amante',
      title: 'Mujer amante', year: 1990, lang: 'es',
      sources: busca('Rata Blanca', 'Mujer amante'),
    },
    {
      id: 'song-enter-sandman', cat: 'song-metal', franchise: 'Metallica', game: 'Enter Sandman',
      title: 'Enter Sandman', year: 1991, lang: 'en',
      sources: busca('Metallica', 'Enter Sandman'),
    },
    {
      id: 'song-nothing-else-matters', cat: 'song-metal', franchise: 'Metallica', game: 'Nothing Else Matters',
      title: 'Nothing Else Matters', year: 1991, lang: 'en',
      sources: busca('Metallica', 'Nothing Else Matters'),
    },
    {
      id: 'song-fear-of-the-dark', cat: 'song-metal', franchise: 'Iron Maiden', game: 'Fear of the Dark',
      title: 'Fear of the Dark', year: 1992, lang: 'en',
      sources: busca('Iron Maiden', 'Fear of the Dark'),
    },
    {
      id: 'song-killing-in-the-name', cat: 'song-metal', franchise: 'Rage Against the Machine', game: 'Killing in the Name',
      title: 'Killing in the Name', year: 1992, lang: 'en',
      sources: busca('Rage Against the Machine', 'Killing in the Name'),
    },
    {
      id: 'song-symphony-of-destruction', cat: 'song-metal', franchise: 'Megadeth', game: 'Symphony of Destruction',
      title: 'Symphony of Destruction', year: 1992, lang: 'en',
      sources: busca('Megadeth', 'Symphony of Destruction'),
    },
    {
      id: 'song-walk', cat: 'song-metal', franchise: 'Pantera', game: 'Walk',
      title: 'Walk', year: 1992, lang: 'en',
      sources: busca('Pantera', 'Walk'),
    },
    {
      id: 'song-du-hast', cat: 'song-metal', franchise: 'Rammstein', game: 'Du hast',
      title: 'Du hast', year: 1997, lang: 'de',
      sources: busca('Rammstein', 'Du hast'),
    },
    {
      id: 'song-freak-on-a-leash', cat: 'song-metal', franchise: 'Korn', game: 'Freak on a Leash',
      title: 'Freak on a Leash', year: 1998, lang: 'en',
      sources: busca('Korn', 'Freak on a Leash'),
    },
    {
      id: 'song-molinos-de-viento', cat: 'song-metal', franchise: 'Mägo de Oz', game: 'Molinos de viento',
      title: 'Molinos de viento', year: 1998, lang: 'es',
      sources: busca('Mägo de Oz', 'Molinos de viento'),
    },
    {
      id: 'song-down-with-the-sickness', cat: 'song-metal', franchise: 'Disturbed', game: 'Down with the Sickness',
      title: 'Down with the Sickness', year: 2000, lang: 'en',
      sources: busca('Disturbed', 'Down with the Sickness'),
    },
    {
      id: 'song-fiesta-pagana', cat: 'song-metal', franchise: 'Mägo de Oz', game: 'Fiesta pagana',
      title: 'Fiesta pagana', year: 2000, lang: 'es',
      sources: busca('Mägo de Oz', 'Fiesta pagana'),
    },
    {
      id: 'song-in-the-end', cat: 'song-metal', franchise: 'Linkin Park', game: 'In the End',
      title: 'In the End', year: 2000, lang: 'en',
      sources: [apple({ song: 590431785, country: 'mx' })],
    },
    {
      id: 'song-last-resort', cat: 'song-metal', franchise: 'Papa Roach', game: 'Last Resort',
      title: 'Last Resort', year: 2000, lang: 'en',
      sources: busca('Papa Roach', 'Last Resort'),
    },
    {
      id: 'song-one-step-closer', cat: 'song-metal', franchise: 'Linkin Park', game: 'One Step Closer',
      title: 'One Step Closer', year: 2000, lang: 'en',
      sources: busca('Linkin Park', 'One Step Closer'),
    },
    {
      id: 'song-rollin', cat: 'song-metal', franchise: 'Limp Bizkit', game: 'Rollin\'',
      title: 'Rollin\' (Air Raid Vehicle)', year: 2000, lang: 'en',
      sources: busca('Limp Bizkit', 'Rollin\' (Air Raid Vehicle)', ['Rollin\'']),
    },
    {
      id: 'song-aerials', cat: 'song-metal', franchise: 'System of a Down', game: 'Aerials',
      title: 'Aerials', year: 2001, lang: 'en',
      sources: busca('System of a Down', 'Aerials'),
    },
    {
      id: 'song-chop-suey', cat: 'song-metal', franchise: 'System of a Down', game: 'Chop Suey!',
      title: 'Chop Suey!', year: 2001, lang: 'en',
      sources: busca('System of a Down', 'Chop Suey!'),
    },
    {
      id: 'song-sonne', cat: 'song-metal', franchise: 'Rammstein', game: 'Sonne',
      title: 'Sonne', year: 2001, lang: 'de',
      sources: busca('Rammstein', 'Sonne'),
    },
    {
      id: 'song-toxicity', cat: 'song-metal', franchise: 'System of a Down', game: 'Toxicity',
      title: 'Toxicity', year: 2001, lang: 'en',
      sources: busca('System of a Down', 'Toxicity'),
    },
    {
      id: 'song-i-stand-alone', cat: 'song-metal', franchise: 'Godsmack', game: 'I Stand Alone',
      title: 'I Stand Alone', year: 2002, lang: 'en',
      sources: busca('Godsmack', 'I Stand Alone'),
    },
    {
      id: 'song-bring-me-to-life', cat: 'song-metal', franchise: 'Evanescence', game: 'Bring Me to Life',
      title: 'Bring Me to Life', year: 2003, lang: 'en',
      sources: busca('Evanescence', 'Bring Me to Life'),
    },
    {
      id: 'song-faint', cat: 'song-metal', franchise: 'Linkin Park', game: 'Faint',
      title: 'Faint', year: 2003, lang: 'en',
      sources: busca('Linkin Park', 'Faint'),
    },
    {
      id: 'song-numb', cat: 'song-metal', franchise: 'Linkin Park', game: 'Numb',
      title: 'Numb', year: 2003, lang: 'en',
      sources: busca('Linkin Park', 'Numb'),
    },
    {
      id: 'song-duality', cat: 'song-metal', franchise: 'Slipknot', game: 'Duality',
      title: 'Duality', year: 2004, lang: 'en',
      sources: busca('Slipknot', 'Duality'),
    },
    {
      id: 'song-b-y-o-b', cat: 'song-metal', franchise: 'System of a Down', game: 'B.Y.O.B.',
      title: 'B.Y.O.B.', year: 2005, lang: 'en',
      sources: busca('System of a Down', 'B.Y.O.B.'),
    },
    {
      id: 'song-bat-country', cat: 'song-metal', franchise: 'Avenged Sevenfold', game: 'Bat Country',
      title: 'Bat Country', year: 2005, lang: 'en',
      sources: busca('Avenged Sevenfold', 'Bat Country'),
    },
    {
      id: 'song-psychosocial', cat: 'song-metal', franchise: 'Slipknot', game: 'Psychosocial',
      title: 'Psychosocial', year: 2008, lang: 'en',
      sources: busca('Slipknot', 'Psychosocial'),
    },
    {
      id: 'song-can-you-feel-my-heart', cat: 'song-metal', franchise: 'Bring Me the Horizon', game: 'Can You Feel My Heart',
      title: 'Can You Feel My Heart', year: 2013, lang: 'en',
      sources: busca('Bring Me the Horizon', 'Can You Feel My Heart'),
    },
    {
      id: 'song-hail-to-the-king', cat: 'song-metal', franchise: 'Avenged Sevenfold', game: 'Hail to the King',
      title: 'Hail to the King', year: 2013, lang: 'en',
      sources: busca('Avenged Sevenfold', 'Hail to the King'),
    },
    {
      id: 'song-mary-on-a-cross', cat: 'song-metal', franchise: 'Ghost', game: 'Mary on a Cross',
      title: 'Mary on a Cross', year: 2019, lang: 'en',
      sources: busca('Ghost', 'Mary on a Cross'),
    },
    /* ───────────── K-pop (50) ───────────── */
    {
      id: 'song-gee', cat: 'song-kpop', franchise: 'Girls\' Generation', game: 'Gee',
      title: 'Gee', year: 2009, lang: 'ko',
      sources: [...am(854911644), ...busca('Girls\' Generation', 'Gee')],
    },
    {
      id: 'song-sorry-sorry', cat: 'song-kpop', franchise: 'SUPER JUNIOR', game: 'Sorry, Sorry',
      title: 'Sorry, Sorry', year: 2009, lang: 'ko',
      sources: [...am(854890251), ...busca('SUPER JUNIOR', 'Sorry, Sorry')],
    },
    {
      id: 'song-fantastic-baby', cat: 'song-kpop', franchise: 'BIGBANG', game: 'FANTASTIC BABY',
      title: 'FANTASTIC BABY', year: 2012, lang: 'ko',
      sources: [...am(1337452979, 1337456885), ...busca('BIGBANG', 'FANTASTIC BABY')],
    },
    {
      id: 'song-gangnam-style', cat: 'song-kpop', franchise: 'PSY', game: 'Gangnam Style',
      title: 'Gangnam Style', year: 2012, lang: 'ko',
      sources: [...am(1445144527), ...busca('PSY', 'Gangnam Style')],
    },
    {
      id: 'song-gentleman', cat: 'song-kpop', franchise: 'PSY', game: 'Gentleman',
      title: 'Gentleman', year: 2013, lang: 'ko',
      sources: [...am(1445151352), ...busca('PSY', 'Gentleman')],
    },
    {
      id: 'song-growl', cat: 'song-kpop', franchise: 'EXO', game: 'Growl',
      title: 'Growl', year: 2013, lang: 'ko',
      sources: [...am(854908245), ...busca('EXO', 'Growl')],
    },
    {
      id: 'song-bang-bang-bang', cat: 'song-kpop', franchise: 'BIGBANG', game: 'BANG BANG BANG',
      title: 'BANG BANG BANG', year: 2015, lang: 'ko',
      sources: [...am(1313176083), ...busca('BIGBANG', 'BANG BANG BANG')],
    },
    {
      id: 'song-boombayah', cat: 'song-kpop', franchise: 'BLACKPINK', game: 'BOOMBAYAH',
      title: 'BOOMBAYAH', year: 2016, lang: 'ko',
      sources: [...am(1315917630), ...busca('BLACKPINK', 'BOOMBAYAH')],
    },
    {
      id: 'song-cheer-up', cat: 'song-kpop', franchise: 'TWICE', game: 'CHEER UP',
      title: 'CHEER UP', year: 2016, lang: 'ko',
      sources: [...am(1555389973), ...busca('TWICE', 'CHEER UP')],
    },
    {
      id: 'song-tt', cat: 'song-kpop', franchise: 'TWICE', game: 'TT',
      title: 'TT', year: 2016, lang: 'ko',
      sources: [...am(1555401122, 1555396349), ...busca('TWICE', 'TT')],
    },
    {
      id: 'song-dna', cat: 'song-kpop', franchise: 'BTS', game: 'DNA',
      title: 'DNA', year: 2017, lang: 'ko',
      sources: [...am(1596529066, 1598730623), ...busca('BTS', 'DNA')],
    },
    {
      id: 'song-spring-day', cat: 'song-kpop', franchise: 'BTS', game: 'Spring Day',
      title: 'Spring Day', year: 2017, lang: 'ko',
      sources: [...am(1596529381), ...busca('BTS', 'Spring Day')],
    },
    {
      id: 'song-ddu-du-ddu-du', cat: 'song-kpop', franchise: 'BLACKPINK', game: 'DDU-DU DDU-DU',
      title: 'DDU-DU DDU-DU', year: 2018, lang: 'ko',
      sources: [...am(1551479993), ...busca('BLACKPINK', 'DDU-DU DDU-DU')],
    },
    {
      id: 'song-fake-love', cat: 'song-kpop', franchise: 'BTS', game: 'FAKE LOVE',
      title: 'FAKE LOVE', year: 2018, lang: 'ko',
      sources: [...am(1598660938), ...busca('BTS', 'FAKE LOVE')],
    },
    {
      id: 'song-idol', cat: 'song-kpop', franchise: 'BTS', game: 'IDOL',
      title: 'IDOL', year: 2018, lang: 'ko',
      sources: [...am(1598730980), ...busca('BTS', 'IDOL')],
    },
    {
      id: 'song-lo-siento', cat: 'song-kpop', franchise: 'SUPER JUNIOR', game: 'Lo Siento',
      title: 'Lo Siento', year: 2018, lang: 'ko',
      sources: [...am(1370929503), ...busca('SUPER JUNIOR', 'Lo Siento')],
    },
    {
      id: 'song-love-shot', cat: 'song-kpop', franchise: 'EXO', game: 'Love Shot',
      title: 'Love Shot', year: 2018, lang: 'ko',
      sources: [...am(1446231541), ...busca('EXO', 'Love Shot')],
    },
    {
      id: 'song-solo', cat: 'song-kpop', franchise: 'JENNIE', game: 'SOLO',
      title: 'SOLO', year: 2018, lang: 'ko',
      sources: [...am(1441819350), ...busca('JENNIE', 'SOLO')],
    },
    {
      id: 'song-what-is-love-twice', cat: 'song-kpop', franchise: 'TWICE', game: 'What is Love?',
      title: 'What is Love?', year: 2018, lang: 'ko',
      sources: [...am(1555390083, 1555401611), ...busca('TWICE', 'What is Love?')],
    },
    {
      id: 'song-boy-with-luv', cat: 'song-kpop', franchise: 'BTS', game: 'Boy With Luv',
      title: 'Boy With Luv (feat. Halsey)', year: 2019, lang: 'ko',
      sources: [...am(1599172208, 1627575407), ...busca('BTS', 'Boy With Luv (feat. Halsey)')],
    },
    {
      id: 'song-dalla-dalla', cat: 'song-kpop', franchise: 'ITZY', game: 'DALLA DALLA',
      title: 'DALLA DALLA', year: 2019, lang: 'ko',
      sources: [...am(1608248898), ...busca('ITZY', 'DALLA DALLA')],
    },
    {
      id: 'song-fancy', cat: 'song-kpop', franchise: 'TWICE', game: 'FANCY',
      title: 'FANCY', year: 2019, lang: 'ko',
      sources: [...am(1555390187), ...busca('TWICE', 'FANCY')],
    },
    {
      id: 'song-kill-this-love', cat: 'song-kpop', franchise: 'BLACKPINK', game: 'Kill This Love',
      title: 'Kill This Love', year: 2019, lang: 'ko',
      sources: [...am(1551479992, 1458318149), ...busca('BLACKPINK', 'Kill This Love')],
    },
    {
      id: 'song-psycho', cat: 'song-kpop', franchise: 'Red Velvet', game: 'Psycho',
      title: 'Psycho', year: 2019, lang: 'ko',
      sources: [...am(1491888506), ...busca('Red Velvet', 'Psycho')],
    },
    {
      id: 'song-dynamite', cat: 'song-kpop', franchise: 'BTS', game: 'Dynamite',
      title: 'Dynamite', year: 2020, lang: 'en',
      sources: [apple({ song: 1596532400, country: 'mx' })],
    },
    {
      id: 'song-god-s-menu', cat: 'song-kpop', franchise: 'Stray Kids', game: 'God\'s Menu',
      title: 'God\'s Menu', year: 2020, lang: 'ko',
      sources: [...am(1608257484), ...busca('Stray Kids', 'God\'s Menu')],
    },
    {
      id: 'song-how-you-like-that', cat: 'song-kpop', franchise: 'BLACKPINK', game: 'How You Like That',
      title: 'How You Like That', year: 2020, lang: 'ko',
      sources: [...am(1520233767, 1533366876), ...busca('BLACKPINK', 'How You Like That')],
    },
    {
      id: 'song-butter', cat: 'song-kpop', franchise: 'BTS', game: 'Butter',
      title: 'Butter', year: 2021, lang: 'en',
      sources: [...am(1598666350), ...busca('BTS', 'Butter')],
    },
    {
      id: 'song-lalisa', cat: 'song-kpop', franchise: 'LISA', game: 'LALISA',
      title: 'LALISA', year: 2021, lang: 'ko',
      sources: [...am(1584836387), ...busca('LISA', 'LALISA')],
    },
    {
      id: 'song-money', cat: 'song-kpop', franchise: 'LISA', game: 'MONEY',
      title: 'MONEY', year: 2021, lang: 'en',
      sources: [...am(1584836391), ...busca('LISA', 'MONEY')],
    },
    {
      id: 'song-next-level', cat: 'song-kpop', franchise: 'aespa', game: 'Next Level',
      title: 'Next Level', year: 2021, lang: 'ko',
      sources: [...am(1567326688), ...busca('aespa', 'Next Level')],
    },
    {
      id: 'song-antifragile', cat: 'song-kpop', franchise: 'LE SSERAFIM', game: 'ANTIFRAGILE',
      title: 'ANTIFRAGILE', year: 2022, lang: 'ko',
      sources: [...am(1647830390, 1682502298), ...busca('LE SSERAFIM', 'ANTIFRAGILE')],
    },
    {
      id: 'song-ditto', cat: 'song-kpop', franchise: 'NewJeans', game: 'Ditto',
      title: 'Ditto', year: 2022, lang: 'ko',
      sources: [...am(1657231962), ...busca('NewJeans', 'Ditto')],
    },
    {
      id: 'song-hype-boy', cat: 'song-kpop', franchise: 'NewJeans', game: 'Hype Boy',
      title: 'Hype Boy', year: 2022, lang: 'ko',
      sources: [...am(1635469851), ...busca('NewJeans', 'Hype Boy')],
    },
    {
      id: 'song-love-dive', cat: 'song-kpop', franchise: 'IVE', game: 'LOVE DIVE',
      title: 'LOVE DIVE', year: 2022, lang: 'ko',
      sources: [...am(1616804152), ...busca('IVE', 'LOVE DIVE')],
    },
    {
      id: 'song-maniac', cat: 'song-kpop', franchise: 'Stray Kids', game: 'MANIAC',
      title: 'MANIAC', year: 2022, lang: 'ko',
      sources: [...am(1609666702), ...busca('Stray Kids', 'MANIAC')],
    },
    {
      id: 'song-pink-venom', cat: 'song-kpop', franchise: 'BLACKPINK', game: 'Pink Venom',
      title: 'Pink Venom', year: 2022, lang: 'ko',
      sources: [...am(1639174482, 1644440670), ...busca('BLACKPINK', 'Pink Venom')],
    },
    {
      id: 'song-shut-down', cat: 'song-kpop', franchise: 'BLACKPINK', game: 'Shut Down',
      title: 'Shut Down', year: 2022, lang: 'ko',
      sources: [...am(1644440674), ...busca('BLACKPINK', 'Shut Down')],
    },
    {
      id: 'song-tomboy', cat: 'song-kpop', franchise: '(G)I-DLE', game: 'TOMBOY',
      title: 'TOMBOY', year: 2022, lang: 'ko',
      sources: [...am(1802621240, 1611504817), ...busca('i-dle', 'TOMBOY')],
    },
    {
      id: 'song-flower', cat: 'song-kpop', franchise: 'JISOO', game: 'FLOWER',
      title: 'FLOWER', year: 2023, lang: 'ko',
      sources: [...am(1679414587, 1678664649), ...busca('JISOO', 'FLOWER')],
    },
    {
      id: 'song-i-am', cat: 'song-kpop', franchise: 'IVE', game: 'I AM',
      title: 'I AM', year: 2023, lang: 'ko',
      sources: [...am(1680047366), ...busca('IVE', 'I AM')],
    },
    {
      id: 'song-like-crazy', cat: 'song-kpop', franchise: 'Jimin', game: 'Like Crazy',
      title: 'Like Crazy', year: 2023, lang: 'ko',
      sources: [...am(1676947244), ...busca('Jimin', 'Like Crazy')],
    },
    {
      id: 'song-perfect-night', cat: 'song-kpop', franchise: 'LE SSERAFIM', game: 'Perfect Night',
      title: 'Perfect Night', year: 2023, lang: 'en',
      sources: [...am(1712731159), ...busca('LE SSERAFIM', 'Perfect Night')],
    },
    {
      id: 'song-queencard', cat: 'song-kpop', franchise: '(G)I-DLE', game: 'Queencard',
      title: 'Queencard', year: 2023, lang: 'ko',
      sources: [...am(1802620989, 1684674427), ...busca('i-dle', 'Queencard')],
    },
    {
      id: 'song-s-class', cat: 'song-kpop', franchise: 'Stray Kids', game: 'S-Class',
      title: 'S-Class', year: 2023, lang: 'ko',
      sources: [...am(1686489691), ...busca('Stray Kids', 'S-Class')],
    },
    {
      id: 'song-seven', cat: 'song-kpop', franchise: 'Jung Kook', game: 'Seven',
      title: 'Seven', year: 2023, lang: 'en',
      sources: [...am(1709555102, 1697147752), ...busca('Jung Kook', 'Seven')],
    },
    {
      id: 'song-super', cat: 'song-kpop', franchise: 'SEVENTEEN', game: 'Super',
      title: 'Super', year: 2023, lang: 'ko',
      sources: [...am(1681324047), ...busca('SEVENTEEN', 'Super')],
    },
    {
      id: 'song-super-shy', cat: 'song-kpop', franchise: 'NewJeans', game: 'Super Shy',
      title: 'Super Shy', year: 2023, lang: 'ko',
      sources: [...am(1695951897), ...busca('NewJeans', 'Super Shy')],
    },
    {
      id: 'song-apt', cat: 'song-kpop', franchise: 'ROSÉ y Bruno Mars', game: 'APT.',
      title: 'APT.', year: 2024, lang: 'en',
      sources: [apple({ song: 1771105935, country: 'mx' })],
    },
    {
      id: 'song-supernova', cat: 'song-kpop', franchise: 'aespa', game: 'Supernova',
      title: 'Supernova', year: 2024, lang: 'ko',
      sources: [...am(1770545875, 1781140575, 1773694544), ...busca('aespa', 'Supernova')],
    },
  );

  // Señuelos: aparecen como opciones incorrectas y en el buscador de Experto.
  AM.EXTRA_GAMES.push(
    { theme: 'canciones', franchise: 'Queen', game: 'We Will Rock You', lang: 'en' },
    { theme: 'canciones', franchise: 'Queen', game: 'Somebody to Love', lang: 'en' },
    { theme: 'canciones', franchise: 'Michael Jackson', game: 'Beat It', lang: 'en' },
    { theme: 'canciones', franchise: 'Michael Jackson', game: 'Thriller', lang: 'en' },
    { theme: 'canciones', franchise: 'Michael Jackson', game: 'Smooth Criminal', lang: 'en' },
    { theme: 'canciones', franchise: 'Madonna', game: 'Material Girl', lang: 'en' },
    { theme: 'canciones', franchise: 'Madonna', game: 'Vogue', lang: 'en' },
    { theme: 'canciones', franchise: 'ABBA', game: 'Mamma Mia', lang: 'en' },
    { theme: 'canciones', franchise: 'ABBA', game: 'Waterloo', lang: 'en' },
    { theme: 'canciones', franchise: 'The Beatles', game: 'Yesterday', lang: 'en' },
    { theme: 'canciones', franchise: 'Taylor Swift', game: 'Love Story', lang: 'en' },
    { theme: 'canciones', franchise: 'Taylor Swift', game: 'Blank Space', lang: 'en' },
    { theme: 'canciones', franchise: 'Lady Gaga', game: 'Bad Romance', lang: 'en' },
    { theme: 'canciones', franchise: 'Lady Gaga', game: 'Just Dance', lang: 'en' },
    { theme: 'canciones', franchise: 'Britney Spears', game: 'Oops!... I Did It Again', lang: 'en' },
    { theme: 'canciones', franchise: 'Billie Eilish', game: 'Ocean Eyes', lang: 'en' },
    { theme: 'canciones', franchise: 'Billie Eilish', game: 'Happier Than Ever', lang: 'en' },
    { theme: 'canciones', franchise: 'The Weeknd', game: 'Starboy', lang: 'en' },
    { theme: 'canciones', franchise: 'Adele', game: 'Hello', lang: 'en' },
    { theme: 'canciones', franchise: 'Coldplay', game: 'Yellow', lang: 'en' },
    { theme: 'canciones', franchise: 'Coldplay', game: 'Fix You', lang: 'en' },
    { theme: 'canciones', franchise: 'Bon Jovi', game: 'It\'s My Life', lang: 'en' },
    { theme: 'canciones', franchise: 'Imagine Dragons', game: 'Believer', lang: 'en' },
    { theme: 'canciones', franchise: 'Dua Lipa', game: 'Don\'t Start Now', lang: 'en' },
    { theme: 'canciones', franchise: 'Olivia Rodrigo', game: 'good 4 u', lang: 'en' },
    { theme: 'canciones', franchise: 'Harry Styles', game: 'Watermelon Sugar', lang: 'en' },
    { theme: 'canciones', franchise: 'Miley Cyrus', game: 'Wrecking Ball', lang: 'en' },
    { theme: 'canciones', franchise: 'Rihanna', game: 'Diamonds', lang: 'en' },
    { theme: 'canciones', franchise: 'Beyoncé', game: 'Halo', lang: 'en' },
    { theme: 'canciones', franchise: 'Beyoncé', game: 'Single Ladies', lang: 'en' },
    { theme: 'canciones', franchise: 'Nirvana', game: 'Come as You Are', lang: 'en' },
    { theme: 'canciones', franchise: 'Oasis', game: 'Don\'t Look Back in Anger', lang: 'en' },
    { theme: 'canciones', franchise: 'Backstreet Boys', game: 'Everybody (Backstreet\'s Back)', lang: 'en' },
    { theme: 'canciones', franchise: 'Spice Girls', game: 'Say You\'ll Be There', lang: 'en' },
    { theme: 'canciones', franchise: 'Elvis Presley', game: 'Jailhouse Rock', lang: 'en' },
    { theme: 'canciones', franchise: 'Bruno Mars', game: 'Just the Way You Are', lang: 'en' },
    { theme: 'canciones', franchise: 'Bruno Mars', game: '24K Magic', lang: 'en' },
    { theme: 'canciones', franchise: 'Sabrina Carpenter', game: 'Please Please Please', lang: 'en' },
    { theme: 'canciones', franchise: 'Celine Dion', game: 'It\'s All Coming Back to Me Now', lang: 'en' },
    { theme: 'canciones', franchise: 'Shakira', game: 'Ojos así', lang: 'es' },
    { theme: 'canciones', franchise: 'Shakira', game: 'Ciega, sordomuda', lang: 'es' },
    { theme: 'canciones', franchise: 'Shakira', game: 'Antología', lang: 'es' },
    { theme: 'canciones', franchise: 'Juan Gabriel', game: 'Así fue', lang: 'es' },
    { theme: 'canciones', franchise: 'Luis Miguel', game: 'Suave', lang: 'es' },
    { theme: 'canciones', franchise: 'Maná', game: 'Clavado en un bar', lang: 'es' },
    { theme: 'canciones', franchise: 'Maná', game: 'En el muelle de San Blas', lang: 'es' },
    { theme: 'canciones', franchise: 'Bad Bunny', game: 'Ojitos lindos', lang: 'es' },
    { theme: 'canciones', franchise: 'Karol G', game: 'Mañana será bonito', lang: 'es' },
    { theme: 'canciones', franchise: 'Juanes', game: 'A Dios le pido', lang: 'es' },
    { theme: 'canciones', franchise: 'Café Tacvba', game: 'Las flores', lang: 'es' },
    { theme: 'canciones', franchise: 'Ricky Martin', game: 'Vuelve', lang: 'es' },
    { theme: 'canciones', franchise: 'Ricky Martin', game: 'La copa de la vida', lang: 'es' },
    { theme: 'canciones', franchise: 'Mecano', game: 'Me colé en una fiesta', lang: 'es' },
    { theme: 'canciones', franchise: 'Thalía', game: 'Amor a la mexicana', lang: 'es' },
    { theme: 'canciones', franchise: 'RBD', game: 'Sálvame', lang: 'es' },
    { theme: 'canciones', franchise: 'Natalia Lafourcade', game: 'En el 2000', lang: 'es' },
    { theme: 'canciones', franchise: 'Rosalía', game: 'Malamente', lang: 'es' },
  );
})(window.AM = window.AM || {});
