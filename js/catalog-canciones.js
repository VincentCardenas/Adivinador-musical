/*
 * Catálogo: Canciones famosas (1816 pistas en 12 géneros).
 * Por género: rock, pop, rap y hip-hop, reggaetón, regional mexicano, baladas, electrónica, cumbia, salsa,
 * metal, K-pop y country (sin bachata). La época se elige aparte en el inicio (filtro `era` de themes.js, según `year`).
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
    { id: 'song-country', theme: 'canciones', label: 'Country', icon: '🪕' },
  );
  // Géneros nuevos: a quien ya tenía elegidos todos los demás le aparecen elegidos (ver loadCats en app.js).
  AM.NEW_CATEGORIES = (AM.NEW_CATEGORIES || []).concat(['song-country']);

  AM.CATALOG.push(
    /* ───────────── Rock (200) ───────────── */
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
    {
      id: 'song-johnny-b-goode', cat: 'song-rock', franchise: 'Chuck Berry', game: 'Johnny B. Goode',
      title: 'Johnny B. Goode', year: 1958, lang: 'en',
      sources: busca('Chuck Berry', 'Johnny B. Goode'),
    },
    {
      id: 'song-come-together', cat: 'song-rock', franchise: 'The Beatles', game: 'Come Together',
      title: 'Come Together', year: 1969, lang: 'en',
      sources: busca('The Beatles', 'Come Together'),
    },
    {
      id: 'song-have-you-ever-seen-the-rain', cat: 'song-rock', franchise: 'Creedence Clearwater Revival', game: 'Have You Ever Seen the Rain?',
      title: 'Have You Ever Seen the Rain?', year: 1970, lang: 'en',
      sources: busca('Creedence Clearwater Revival', 'Have You Ever Seen the Rain?'),
    },
    {
      id: 'song-smoke-on-the-water', cat: 'song-rock', franchise: 'Deep Purple', game: 'Smoke on the Water',
      title: 'Smoke on the Water', year: 1972, lang: 'en',
      sources: busca('Deep Purple', 'Smoke on the Water'),
    },
    {
      id: 'song-dream-on', cat: 'song-rock', franchise: 'Aerosmith', game: 'Dream On',
      title: 'Dream On', year: 1973, lang: 'en',
      sources: busca('Aerosmith', 'Dream On'),
    },
    {
      id: 'song-we-will-rock-you', cat: 'song-rock', franchise: 'Queen', game: 'We Will Rock You',
      title: 'We Will Rock You', year: 1977, lang: 'en',
      sources: busca('Queen', 'We Will Rock You'),
    },
    {
      id: 'song-we-are-the-champions', cat: 'song-rock', franchise: 'Queen', game: 'We Are the Champions',
      title: 'We Are the Champions', year: 1977, lang: 'en',
      sources: busca('Queen', 'We Are the Champions'),
    },
    {
      id: 'song-another-brick-in-the-wall-pt-2', cat: 'song-rock', franchise: 'Pink Floyd', game: 'Another Brick in the Wall, Pt. 2',
      title: 'Another Brick in the Wall, Pt. 2', year: 1979, lang: 'en',
      sources: busca('Pink Floyd', 'Another Brick in the Wall, Pt. 2'),
    },
    {
      id: 'song-i-love-rock-n-roll', cat: 'song-rock', franchise: 'Joan Jett & the Blackhearts', game: 'I Love Rock \'n Roll',
      title: 'I Love Rock \'n Roll', year: 1981, lang: 'en',
      sources: busca('Joan Jett & the Blackhearts', 'I Love Rock \'n Roll'),
    },
    {
      id: 'song-should-i-stay-or-should-i-go', cat: 'song-rock', franchise: 'The Clash', game: 'Should I Stay or Should I Go',
      title: 'Should I Stay or Should I Go', year: 1982, lang: 'en',
      sources: busca('The Clash', 'Should I Stay or Should I Go'),
    },
    {
      id: 'song-jump-van-halen', cat: 'song-rock', franchise: 'Van Halen', game: 'Jump',
      title: 'Jump', year: 1984, lang: 'en',
      sources: busca('Van Halen', 'Jump'),
    },
    {
      id: 'song-demoliendo-hoteles', cat: 'song-rock', franchise: 'Charly García', game: 'Demoliendo hoteles',
      title: 'Demoliendo hoteles', year: 1984, lang: 'es',
      sources: busca('Charly García', 'Demoliendo hoteles'),
    },
    {
      id: 'song-tratame-suavemente', cat: 'song-rock', franchise: 'Soda Stereo', game: 'Trátame suavemente',
      title: 'Trátame suavemente', year: 1984, lang: 'es',
      sources: busca('Soda Stereo', 'Trátame suavemente'),
    },
    {
      id: 'song-triste-cancion', cat: 'song-rock', franchise: 'El Tri', game: 'Triste canción',
      title: 'Triste canción', year: 1984, lang: 'es',
      sources: busca('El Tri', 'Triste canción'),
    },
    {
      id: 'song-cuando-pase-el-temblor', cat: 'song-rock', franchise: 'Soda Stereo', game: 'Cuando pase el temblor',
      title: 'Cuando pase el temblor', year: 1985, lang: 'es',
      sources: busca('Soda Stereo', 'Cuando pase el temblor'),
    },
    {
      id: 'song-you-give-love-a-bad-name', cat: 'song-rock', franchise: 'Bon Jovi', game: 'You Give Love a Bad Name',
      title: 'You Give Love a Bad Name', year: 1986, lang: 'en',
      sources: busca('Bon Jovi', 'You Give Love a Bad Name'),
    },
    {
      id: 'song-welcome-to-the-jungle', cat: 'song-rock', franchise: 'Guns N\' Roses', game: 'Welcome to the Jungle',
      title: 'Welcome to the Jungle', year: 1987, lang: 'en',
      sources: busca('Guns N\' Roses', 'Welcome to the Jungle'),
    },
    {
      id: 'song-paradise-city', cat: 'song-rock', franchise: 'Guns N\' Roses', game: 'Paradise City',
      title: 'Paradise City', year: 1987, lang: 'en',
      sources: busca('Guns N\' Roses', 'Paradise City'),
    },
    {
      id: 'song-guitarras-blancas', cat: 'song-rock', franchise: 'Los Enanitos Verdes', game: 'Guitarras blancas',
      title: 'Guitarras blancas', year: 1988, lang: 'es',
      sources: busca('Los Enanitos Verdes', 'Guitarras blancas'),
    },
    {
      id: 'song-maldito-duende', cat: 'song-rock', franchise: 'Héroes del Silencio', game: 'Maldito duende',
      title: 'Maldito duende', year: 1990, lang: 'es',
      sources: busca('Héroes del Silencio', 'Maldito duende'),
    },
    {
      id: 'song-tren-al-sur', cat: 'song-rock', franchise: 'Los Prisioneros', game: 'Tren al sur',
      title: 'Tren al sur', year: 1990, lang: 'es',
      sources: busca('Los Prisioneros', 'Tren al sur'),
    },
    {
      id: 'song-under-the-bridge', cat: 'song-rock', franchise: 'Red Hot Chili Peppers', game: 'Under the Bridge',
      title: 'Under the Bridge', year: 1991, lang: 'en',
      sources: busca('Red Hot Chili Peppers', 'Under the Bridge'),
    },
    {
      id: 'song-alive-pearl-jam', cat: 'song-rock', franchise: 'Pearl Jam', game: 'Alive',
      title: 'Alive', year: 1991, lang: 'en',
      sources: busca('Pearl Jam', 'Alive'),
    },
    {
      id: 'song-come-as-you-are', cat: 'song-rock', franchise: 'Nirvana', game: 'Come as You Are',
      title: 'Come as You Are', year: 1991, lang: 'en',
      sources: busca('Nirvana', 'Come as You Are'),
    },
    {
      id: 'song-no-dejes-que', cat: 'song-rock', franchise: 'Caifanes', game: 'No dejes que...',
      title: 'No dejes que...', year: 1992, lang: 'es',
      sources: busca('Caifanes', 'No dejes que...'),
    },
    {
      id: 'song-el-amor-despues-del-amor', cat: 'song-rock', franchise: 'Fito Páez', game: 'El amor después del amor',
      title: 'El amor después del amor', year: 1992, lang: 'es',
      sources: busca('Fito Páez', 'El amor después del amor'),
    },
    {
      id: 'song-linger', cat: 'song-rock', franchise: 'The Cranberries', game: 'Linger',
      title: 'Linger', year: 1993, lang: 'en',
      sources: busca('The Cranberries', 'Linger'),
    },
    {
      id: 'song-afuera', cat: 'song-rock', franchise: 'Caifanes', game: 'Afuera',
      title: 'Afuera', year: 1994, lang: 'es',
      sources: busca('Caifanes', 'Afuera'),
    },
    {
      id: 'song-la-ingrata', cat: 'song-rock', franchise: 'Café Tacvba', game: 'La ingrata',
      title: 'La ingrata', year: 1994, lang: 'es',
      sources: busca('Café Tacvba', 'La ingrata'),
    },
    {
      id: 'song-el-baile-y-el-salon', cat: 'song-rock', franchise: 'Café Tacvba', game: 'El baile y el salón',
      title: 'El baile y el salón', year: 1994, lang: 'es',
      sources: busca('Café Tacvba', 'El baile y el salón'),
    },
    {
      id: 'song-las-piedras-rodantes', cat: 'song-rock', franchise: 'El Tri', game: 'Las piedras rodantes',
      title: 'Las piedras rodantes', year: 1994, lang: 'es',
      sources: busca('El Tri', 'Las piedras rodantes'),
    },
    {
      id: 'song-basket-case', cat: 'song-rock', franchise: 'Green Day', game: 'Basket Case',
      title: 'Basket Case', year: 1994, lang: 'en',
      sources: busca('Green Day', 'Basket Case'),
    },
    {
      id: 'song-la-chispa-adecuada', cat: 'song-rock', franchise: 'Héroes del Silencio', game: 'La chispa adecuada',
      title: 'La chispa adecuada', year: 1995, lang: 'es',
      sources: busca('Héroes del Silencio', 'La chispa adecuada'),
    },
    {
      id: 'song-don-t-look-back-in-anger', cat: 'song-rock', franchise: 'Oasis', game: 'Don\'t Look Back in Anger',
      title: 'Don\'t Look Back in Anger', year: 1995, lang: 'en',
      sources: busca('Oasis', 'Don\'t Look Back in Anger'),
    },
    {
      id: 'song-song-2', cat: 'song-rock', franchise: 'Blur', game: 'Song 2',
      title: 'Song 2', year: 1997, lang: 'en',
      sources: busca('Blur', 'Song 2'),
    },
    {
      id: 'song-gimme-the-power', cat: 'song-rock', franchise: 'Molotov', game: 'Gimme the Power',
      title: 'Gimme the Power', year: 1997, lang: 'es',
      sources: busca('Molotov', 'Gimme the Power'),
    },
    {
      id: 'song-californication', cat: 'song-rock', franchise: 'Red Hot Chili Peppers', game: 'Californication',
      title: 'Californication', year: 1999, lang: 'en',
      sources: busca('Red Hot Chili Peppers', 'Californication'),
    },
    {
      id: 'song-luz-de-dia', cat: 'song-rock', franchise: 'Los Enanitos Verdes', game: 'Luz de día',
      title: 'Luz de día', year: 1999, lang: 'es',
      sources: busca('Los Enanitos Verdes', 'Luz de día'),
    },
    {
      id: 'song-it-s-my-life-bon-jovi', cat: 'song-rock', franchise: 'Bon Jovi', game: 'It\'s My Life',
      title: 'It\'s My Life', year: 2000, lang: 'en',
      sources: busca('Bon Jovi', 'It\'s My Life'),
    },
    {
      id: 'song-clocks-coldplay', cat: 'song-rock', franchise: 'Coldplay', game: 'Clocks',
      title: 'Clocks', year: 2002, lang: 'en',
      sources: busca('Coldplay', 'Clocks'),
    },
    {
      id: 'song-american-idiot', cat: 'song-rock', franchise: 'Green Day', game: 'American Idiot',
      title: 'American Idiot', year: 2004, lang: 'en',
      sources: busca('Green Day', 'American Idiot'),
    },
    {
      id: 'song-somebody-told-me', cat: 'song-rock', franchise: 'The Killers', game: 'Somebody Told Me',
      title: 'Somebody Told Me', year: 2004, lang: 'en',
      sources: busca('The Killers', 'Somebody Told Me'),
    },
    {
      id: 'song-the-pretender', cat: 'song-rock', franchise: 'Foo Fighters', game: 'The Pretender',
      title: 'The Pretender', year: 2007, lang: 'en',
      sources: busca('Foo Fighters', 'The Pretender'),
    },
    {
      id: 'song-uprising-muse', cat: 'song-rock', franchise: 'Muse', game: 'Uprising',
      title: 'Uprising', year: 2009, lang: 'en',
      sources: busca('Muse', 'Uprising'),
    },
    {
      id: 'song-beggin-maneskin', cat: 'song-rock', franchise: 'Måneskin', game: 'Beggin\'',
      title: 'Beggin\'', year: 2017, lang: 'en',
      sources: busca('Måneskin', 'Beggin\''),
    },
    {
      id: 'song-black-hole-sun', cat: 'song-rock', franchise: 'Soundgarden', game: 'Black Hole Sun',
      title: 'Black Hole Sun', year: 1994, lang: 'en',
      sources: busca('Soundgarden', 'Black Hole Sun'),
    },
    {
      id: 'song-learn-to-fly', cat: 'song-rock', franchise: 'Foo Fighters', game: 'Learn to Fly',
      title: 'Learn to Fly', year: 1999, lang: 'en',
      sources: busca('Foo Fighters', 'Learn to Fly'),
    },
    {
      id: 'song-sex-on-fire', cat: 'song-rock', franchise: 'Kings of Leon', game: 'Sex on Fire',
      title: 'Sex on Fire', year: 2008, lang: 'en',
      sources: busca('Kings of Leon', 'Sex on Fire'),
    },
    {
      id: 'song-do-i-wanna-know', cat: 'song-rock', franchise: 'Arctic Monkeys', game: 'Do I Wanna Know?',
      title: 'Do I Wanna Know?', year: 2013, lang: 'en',
      sources: busca('Arctic Monkeys', 'Do I Wanna Know?'),
    },
    {
      id: 'song-believer-imagine-dragons', cat: 'song-rock', franchise: 'Imagine Dragons', game: 'Believer',
      title: 'Believer', year: 2017, lang: 'en',
      sources: busca('Imagine Dragons', 'Believer'),
    },
    {
      id: 'song-nada-personal', cat: 'song-rock', franchise: 'Soda Stereo', game: 'Nada personal',
      title: 'Nada personal', year: 1985, lang: 'es',
      sources: busca('Soda Stereo', 'Nada personal'),
    },
    {
      id: 'song-profugos', cat: 'song-rock', franchise: 'Soda Stereo', game: 'Prófugos',
      title: 'Prófugos', year: 1986, lang: 'es',
      sources: busca('Soda Stereo', 'Prófugos'),
    },
    {
      id: 'song-signos', cat: 'song-rock', franchise: 'Soda Stereo', game: 'Signos',
      title: 'Signos', year: 1986, lang: 'es',
      sources: busca('Soda Stereo', 'Signos'),
    },
    {
      id: 'song-en-remolinos', cat: 'song-rock', franchise: 'Soda Stereo', game: 'En remolinos',
      title: 'En remolinos', year: 1992, lang: 'es',
      sources: busca('Soda Stereo', 'En remolinos'),
    },
    {
      id: 'song-juegos-de-seduccion', cat: 'song-rock', franchise: 'Soda Stereo', game: 'Juegos de seducción',
      title: 'Juegos de seducción', year: 1985, lang: 'es',
      sources: busca('Soda Stereo', 'Juegos de seducción'),
    },
    {
      id: 'song-zoom-soda', cat: 'song-rock', franchise: 'Soda Stereo', game: 'Zoom',
      title: 'Zoom', year: 1995, lang: 'es',
      sources: busca('Soda Stereo', 'Zoom'),
    },
    {
      id: 'song-primavera-0', cat: 'song-rock', franchise: 'Soda Stereo', game: 'Primavera 0',
      title: 'Primavera 0', year: 1992, lang: 'es',
      sources: busca('Soda Stereo', 'Primavera 0'),
    },
    {
      id: 'song-ella-uso-mi-cabeza', cat: 'song-rock', franchise: 'Soda Stereo', game: 'Ella usó mi cabeza como un revólver',
      title: 'Ella usó mi cabeza como un revólver', year: 1995, lang: 'es',
      sources: busca('Soda Stereo', 'Ella usó mi cabeza como un revólver'),
    },
    {
      id: 'song-crimen-cerati', cat: 'song-rock', franchise: 'Gustavo Cerati', game: 'Crimen',
      title: 'Crimen', year: 2006, lang: 'es',
      sources: busca('Gustavo Cerati', 'Crimen'),
    },
    {
      id: 'song-puente-cerati', cat: 'song-rock', franchise: 'Gustavo Cerati', game: 'Puente',
      title: 'Puente', year: 1999, lang: 'es',
      sources: busca('Gustavo Cerati', 'Puente'),
    },
    {
      id: 'song-adios-cerati', cat: 'song-rock', franchise: 'Gustavo Cerati', game: 'Adiós',
      title: 'Adiós', year: 2006, lang: 'es',
      sources: busca('Gustavo Cerati', 'Adiós'),
    },
    {
      id: 'song-deja-vu-cerati', cat: 'song-rock', franchise: 'Gustavo Cerati', game: 'Déjà vu',
      title: 'Déjà vu', year: 2009, lang: 'es',
      sources: busca('Gustavo Cerati', 'Déjà vu'),
    },
    {
      id: 'song-la-celula-que-explota', cat: 'song-rock', franchise: 'Caifanes', game: 'La célula que explota',
      title: 'La célula que explota', year: 1990, lang: 'es',
      sources: busca('Caifanes', 'La célula que explota'),
    },
    {
      id: 'song-viento-caifanes', cat: 'song-rock', franchise: 'Caifanes', game: 'Viento',
      title: 'Viento', year: 1988, lang: 'es',
      sources: busca('Caifanes', 'Viento'),
    },
    {
      id: 'song-matenme-porque-me-muero', cat: 'song-rock', franchise: 'Caifanes', game: 'Mátenme porque me muero',
      title: 'Mátenme porque me muero', year: 1988, lang: 'es',
      sources: busca('Caifanes', 'Mátenme porque me muero'),
    },
    {
      id: 'song-los-dioses-ocultos', cat: 'song-rock', franchise: 'Caifanes', game: 'Los dioses ocultos',
      title: 'Los dioses ocultos', year: 1990, lang: 'es',
      sources: busca('Caifanes', 'Los dioses ocultos'),
    },
    {
      id: 'song-nubes-caifanes', cat: 'song-rock', franchise: 'Caifanes', game: 'Nubes',
      title: 'Nubes', year: 1992, lang: 'es',
      sources: busca('Caifanes', 'Nubes'),
    },
    {
      id: 'song-te-lo-pido-por-favor-jaguares', cat: 'song-rock', franchise: 'Jaguares', game: 'Te lo pido por favor',
      title: 'Te lo pido por favor', year: 2002, lang: 'es',
      sources: busca('Jaguares', 'Te lo pido por favor'),
    },
    {
      id: 'song-sirena-varada', cat: 'song-rock', franchise: 'Héroes del Silencio', game: 'Sirena varada',
      title: 'Sirena varada', year: 1993, lang: 'es',
      sources: busca('Héroes del Silencio', 'Sirena varada'),
    },
    {
      id: 'song-heroe-de-leyenda', cat: 'song-rock', franchise: 'Héroes del Silencio', game: 'Héroe de leyenda',
      title: 'Héroe de leyenda', year: 1987, lang: 'es',
      sources: busca('Héroes del Silencio', 'Héroe de leyenda'),
    },
    {
      id: 'song-mar-adentro-heroes', cat: 'song-rock', franchise: 'Héroes del Silencio', game: 'Mar adentro',
      title: 'Mar adentro', year: 1988, lang: 'es',
      sources: busca('Héroes del Silencio', 'Mar adentro'),
    },
    {
      id: 'song-flor-de-loto-heroes', cat: 'song-rock', franchise: 'Héroes del Silencio', game: 'Flor de loto',
      title: 'Flor de loto', year: 1993, lang: 'es',
      sources: busca('Héroes del Silencio', 'Flor de loto'),
    },
    {
      id: 'song-avalancha-heroes', cat: 'song-rock', franchise: 'Héroes del Silencio', game: 'Avalancha',
      title: 'Avalancha', year: 1995, lang: 'es',
      sources: busca('Héroes del Silencio', 'Avalancha'),
    },
    {
      id: 'song-lady-blue-bunbury', cat: 'song-rock', franchise: 'Bunbury', game: 'Lady Blue',
      title: 'Lady Blue', year: 2002, lang: 'es',
      sources: busca('Bunbury', 'Lady Blue'),
    },
    {
      id: 'song-infinito-bunbury', cat: 'song-rock', franchise: 'Bunbury', game: 'Infinito',
      title: 'Infinito', year: 1999, lang: 'es',
      sources: busca('Bunbury', 'Infinito'),
    },
    {
      id: 'song-frente-a-frente-bunbury', cat: 'song-rock', franchise: 'Bunbury', game: 'Frente a frente',
      title: 'Frente a frente', year: 2010, lang: 'es',
      sources: busca('Bunbury', 'Frente a frente'),
    },
    {
      id: 'song-la-muralla-verde', cat: 'song-rock', franchise: 'Los Enanitos Verdes', game: 'La muralla verde',
      title: 'La muralla verde', year: 1986, lang: 'es',
      sources: busca('Los Enanitos Verdes', 'La muralla verde'),
    },
    {
      id: 'song-por-el-resto', cat: 'song-rock', franchise: 'Los Enanitos Verdes', game: 'Por el resto',
      title: 'Por el resto', year: 1987, lang: 'es',
      sources: busca('Los Enanitos Verdes', 'Por el resto'),
    },
    {
      id: 'song-te-vi-en-un-tren', cat: 'song-rock', franchise: 'Los Enanitos Verdes', game: 'Te vi en un tren',
      title: 'Te vi en un tren', year: 1987, lang: 'es',
      sources: busca('Los Enanitos Verdes', 'Te vi en un tren'),
    },
    {
      id: 'song-cada-vez-que-te-digo-adios', cat: 'song-rock', franchise: 'Los Enanitos Verdes', game: 'Cada vez que te digo adiós',
      title: 'Cada vez que te digo adiós', year: 1986, lang: 'es',
      sources: busca('Los Enanitos Verdes', 'Cada vez que te digo adiós'),
    },
    {
      id: 'song-vasos-vacios', cat: 'song-rock', franchise: 'Los Fabulosos Cadillacs', game: 'Vasos vacíos',
      title: 'Vasos vacíos', year: 1988, lang: 'es',
      sources: busca('Los Fabulosos Cadillacs', 'Vasos vacíos'),
    },
    {
      id: 'song-siguiendo-la-luna', cat: 'song-rock', franchise: 'Los Fabulosos Cadillacs', game: 'Siguiendo la luna',
      title: 'Siguiendo la luna', year: 1992, lang: 'es',
      sources: busca('Los Fabulosos Cadillacs', 'Siguiendo la luna'),
    },
    {
      id: 'song-mal-bicho', cat: 'song-rock', franchise: 'Los Fabulosos Cadillacs', game: 'Mal bicho',
      title: 'Mal bicho', year: 1995, lang: 'es',
      sources: busca('Los Fabulosos Cadillacs', 'Mal bicho'),
    },
    {
      id: 'song-calaveras-y-diablitos', cat: 'song-rock', franchise: 'Los Fabulosos Cadillacs', game: 'Calaveras y diablitos',
      title: 'Calaveras y diablitos', year: 1997, lang: 'es',
      sources: busca('Los Fabulosos Cadillacs', 'Calaveras y diablitos'),
    },
    {
      id: 'song-manuel-santillan', cat: 'song-rock', franchise: 'Los Fabulosos Cadillacs', game: 'Manuel Santillán, El León',
      title: 'Manuel Santillán, El León', year: 1992, lang: 'es',
      sources: busca('Los Fabulosos Cadillacs', 'Manuel Santillán, El León'),
    },
    {
      id: 'song-la-guitarra-decadentes', cat: 'song-rock', franchise: 'Los Auténticos Decadentes', game: 'La guitarra',
      title: 'La guitarra', year: 1995, lang: 'es',
      sources: busca('Los Auténticos Decadentes', 'La guitarra'),
    },
    {
      id: 'song-loco-tu-forma-de-ser', cat: 'song-rock', franchise: 'Los Auténticos Decadentes', game: 'Loco (tu forma de ser)',
      title: 'Loco (tu forma de ser)', year: 1989, lang: 'es',
      sources: busca('Los Auténticos Decadentes', 'Loco (tu forma de ser)'),
    },
    {
      id: 'song-un-osito-de-peluche', cat: 'song-rock', franchise: 'Los Auténticos Decadentes', game: 'Un osito de peluche de Taiwán',
      title: 'Un osito de peluche de Taiwán', year: 2003, lang: 'es',
      sources: busca('Los Auténticos Decadentes', 'Un osito de peluche de Taiwán'),
    },
    {
      id: 'song-no-me-importa-el-dinero', cat: 'song-rock', franchise: 'Los Auténticos Decadentes', game: 'No me importa el dinero',
      title: 'No me importa el dinero', year: 2000, lang: 'es',
      sources: busca('Los Auténticos Decadentes', 'No me importa el dinero'),
    },
    {
      id: 'song-irresponsables-babasonicos', cat: 'song-rock', franchise: 'Babasónicos', game: 'Irresponsables',
      title: 'Irresponsables', year: 2003, lang: 'es',
      sources: busca('Babasónicos', 'Irresponsables'),
    },
    {
      id: 'song-putita-babasonicos', cat: 'song-rock', franchise: 'Babasónicos', game: 'Putita',
      title: 'Putita', year: 2003, lang: 'es',
      sources: busca('Babasónicos', 'Putita'),
    },
    {
      id: 'song-el-colmo-babasonicos', cat: 'song-rock', franchise: 'Babasónicos', game: 'El colmo',
      title: 'El colmo', year: 2005, lang: 'es',
      sources: busca('Babasónicos', 'El colmo'),
    },
    {
      id: 'song-mariposa-tecknicolor', cat: 'song-rock', franchise: 'Fito Páez', game: 'Mariposa tecknicolor',
      title: 'Mariposa tecknicolor', year: 1994, lang: 'es',
      sources: busca('Fito Páez', 'Mariposa tecknicolor'),
    },
    {
      id: 'song-circo-beat', cat: 'song-rock', franchise: 'Fito Páez', game: 'Circo Beat',
      title: 'Circo Beat', year: 1994, lang: 'es',
      sources: busca('Fito Páez', 'Circo Beat'),
    },
    {
      id: 'song-al-lado-del-camino', cat: 'song-rock', franchise: 'Fito Páez', game: 'Al lado del camino',
      title: 'Al lado del camino', year: 1999, lang: 'es',
      sources: busca('Fito Páez', 'Al lado del camino'),
    },
    {
      id: 'song-hablando-a-tu-corazon', cat: 'song-rock', franchise: 'Charly García', game: 'Hablando a tu corazón',
      title: 'Hablando a tu corazón', year: 1986, lang: 'es',
      sources: busca('Charly García', 'Hablando a tu corazón'),
    },
    {
      id: 'song-no-voy-en-tren', cat: 'song-rock', franchise: 'Charly García', game: 'No voy en tren',
      title: 'No voy en tren', year: 1987, lang: 'es',
      sources: busca('Charly García', 'No voy en tren'),
    },
    {
      id: 'song-cerca-de-la-revolucion', cat: 'song-rock', franchise: 'Charly García', game: 'Cerca de la revolución',
      title: 'Cerca de la revolución', year: 1984, lang: 'es',
      sources: busca('Charly García', 'Cerca de la revolución'),
    },
    {
      id: 'song-flaca-calamaro', cat: 'song-rock', franchise: 'Andrés Calamaro', game: 'Flaca',
      title: 'Flaca', year: 1997, lang: 'es',
      sources: busca('Andrés Calamaro', 'Flaca'),
    },
    {
      id: 'song-mil-horas-abuelos', cat: 'song-rock', franchise: 'Los Abuelos de la Nada', game: 'Mil horas',
      title: 'Mil horas', year: 1983, lang: 'es',
      sources: busca('Los Abuelos de la Nada', 'Mil horas'),
    },
    {
      id: 'song-te-quiero-igual-calamaro', cat: 'song-rock', franchise: 'Andrés Calamaro', game: 'Te quiero igual',
      title: 'Te quiero igual', year: 1999, lang: 'es',
      sources: busca('Andrés Calamaro', 'Te quiero igual'),
    },
    {
      id: 'song-loco-calamaro', cat: 'song-rock', franchise: 'Andrés Calamaro', game: 'Loco',
      title: 'Loco', year: 1997, lang: 'es',
      sources: busca('Andrés Calamaro', 'Loco'),
    },
    {
      id: 'song-sin-documentos', cat: 'song-rock', franchise: 'Los Rodríguez', game: 'Sin documentos',
      title: 'Sin documentos', year: 1993, lang: 'es',
      sources: busca('Los Rodríguez', 'Sin documentos'),
    },
    {
      id: 'song-para-no-olvidar', cat: 'song-rock', franchise: 'Los Rodríguez', game: 'Para no olvidar',
      title: 'Para no olvidar', year: 1995, lang: 'es',
      sources: busca('Los Rodríguez', 'Para no olvidar'),
    },
    {
      id: 'song-mucho-mejor-rodriguez', cat: 'song-rock', franchise: 'Los Rodríguez', game: 'Mucho mejor',
      title: 'Mucho mejor', year: 1995, lang: 'es',
      sources: busca('Los Rodríguez', 'Mucho mejor'),
    },
    {
      id: 'song-estrechez-de-corazon', cat: 'song-rock', franchise: 'Los Prisioneros', game: 'Estrechez de corazón',
      title: 'Estrechez de corazón', year: 1990, lang: 'es',
      sources: busca('Los Prisioneros', 'Estrechez de corazón'),
    },
    {
      id: 'song-la-voz-de-los-80', cat: 'song-rock', franchise: 'Los Prisioneros', game: 'La voz de los \'80',
      title: 'La voz de los \'80', year: 1984, lang: 'es',
      sources: busca('Los Prisioneros', 'La voz de los \'80'),
    },
    {
      id: 'song-sexo-prisioneros', cat: 'song-rock', franchise: 'Los Prisioneros', game: 'Sexo',
      title: 'Sexo', year: 1986, lang: 'es',
      sources: busca('Los Prisioneros', 'Sexo'),
    },
    {
      id: 'song-un-amor-violento', cat: 'song-rock', franchise: 'Los Tres', game: 'Un amor violento',
      title: 'Un amor violento', year: 1991, lang: 'es',
      sources: busca('Los Tres', 'Un amor violento'),
    },
    {
      id: 'song-dejate-caer', cat: 'song-rock', franchise: 'Los Tres', game: 'Déjate caer',
      title: 'Déjate caer', year: 1995, lang: 'es',
      sources: busca('Los Tres', 'Déjate caer'),
    },
    {
      id: 'song-llueve-sobre-la-ciudad', cat: 'song-rock', franchise: 'Los Bunkers', game: 'Llueve sobre la ciudad',
      title: 'Llueve sobre la ciudad', year: 2005, lang: 'es',
      sources: busca('Los Bunkers', 'Llueve sobre la ciudad'),
    },
    {
      id: 'song-twist-and-shout', cat: 'song-rock', franchise: 'The Beatles', game: 'Twist and Shout',
      title: 'Twist and Shout', year: 1963, lang: 'en',
      sources: busca('The Beatles', 'Twist and Shout'),
    },
    {
      id: 'song-a-hard-days-night', cat: 'song-rock', franchise: 'The Beatles', game: 'A Hard Day\'s Night',
      title: 'A Hard Day\'s Night', year: 1964, lang: 'en',
      sources: busca('The Beatles', 'A Hard Day\'s Night'),
    },
    {
      id: 'song-help-beatles', cat: 'song-rock', franchise: 'The Beatles', game: 'Help!',
      title: 'Help!', year: 1965, lang: 'en',
      sources: busca('The Beatles', 'Help!'),
    },
    {
      id: 'song-yesterday-beatles', cat: 'song-rock', franchise: 'The Beatles', game: 'Yesterday',
      title: 'Yesterday', year: 1965, lang: 'en',
      sources: busca('The Beatles', 'Yesterday'),
    },
    {
      id: 'song-paint-it-black', cat: 'song-rock', franchise: 'The Rolling Stones', game: 'Paint It, Black',
      title: 'Paint It, Black', year: 1966, lang: 'en',
      sources: busca('The Rolling Stones', 'Paint It, Black'),
    },
    {
      id: 'song-sympathy-for-the-devil', cat: 'song-rock', franchise: 'The Rolling Stones', game: 'Sympathy for the Devil',
      title: 'Sympathy for the Devil', year: 1968, lang: 'en',
      sources: busca('The Rolling Stones', 'Sympathy for the Devil'),
    },
    {
      id: 'song-start-me-up', cat: 'song-rock', franchise: 'The Rolling Stones', game: 'Start Me Up',
      title: 'Start Me Up', year: 1981, lang: 'en',
      sources: busca('The Rolling Stones', 'Start Me Up'),
    },
    {
      id: 'song-light-my-fire', cat: 'song-rock', franchise: 'The Doors', game: 'Light My Fire',
      title: 'Light My Fire', year: 1967, lang: 'en',
      sources: busca('The Doors', 'Light My Fire'),
    },
    {
      id: 'song-break-on-through', cat: 'song-rock', franchise: 'The Doors', game: 'Break On Through (To the Other Side)',
      title: 'Break On Through (To the Other Side)', year: 1967, lang: 'en',
      sources: busca('The Doors', 'Break On Through (To the Other Side)'),
    },
    {
      id: 'song-purple-haze', cat: 'song-rock', franchise: 'Jimi Hendrix', game: 'Purple Haze',
      title: 'Purple Haze', year: 1967, lang: 'en',
      sources: busca('Jimi Hendrix', 'Purple Haze'),
    },
    {
      id: 'song-baba-oriley', cat: 'song-rock', franchise: 'The Who', game: 'Baba O\'Riley',
      title: 'Baba O\'Riley', year: 1971, lang: 'en',
      sources: busca('The Who', 'Baba O\'Riley'),
    },
    {
      id: 'song-whole-lotta-love', cat: 'song-rock', franchise: 'Led Zeppelin', game: 'Whole Lotta Love',
      title: 'Whole Lotta Love', year: 1969, lang: 'en',
      sources: busca('Led Zeppelin', 'Whole Lotta Love'),
    },
    {
      id: 'song-immigrant-song', cat: 'song-rock', franchise: 'Led Zeppelin', game: 'Immigrant Song',
      title: 'Immigrant Song', year: 1970, lang: 'en',
      sources: busca('Led Zeppelin', 'Immigrant Song'),
    },
    {
      id: 'song-black-dog', cat: 'song-rock', franchise: 'Led Zeppelin', game: 'Black Dog',
      title: 'Black Dog', year: 1971, lang: 'en',
      sources: busca('Led Zeppelin', 'Black Dog'),
    },
    {
      id: 'song-wish-you-were-here', cat: 'song-rock', franchise: 'Pink Floyd', game: 'Wish You Were Here',
      title: 'Wish You Were Here', year: 1975, lang: 'en',
      sources: busca('Pink Floyd', 'Wish You Were Here'),
    },
    {
      id: 'song-money-pink-floyd', cat: 'song-rock', franchise: 'Pink Floyd', game: 'Money',
      title: 'Money', year: 1973, lang: 'en',
      sources: busca('Pink Floyd', 'Money'),
    },
    {
      id: 'song-comfortably-numb', cat: 'song-rock', franchise: 'Pink Floyd', game: 'Comfortably Numb',
      title: 'Comfortably Numb', year: 1979, lang: 'en',
      sources: busca('Pink Floyd', 'Comfortably Numb'),
    },
    {
      id: 'song-under-pressure', cat: 'song-rock', franchise: 'Queen y David Bowie', game: 'Under Pressure',
      title: 'Under Pressure', year: 1981, lang: 'en',
      sources: busca('Queen y David Bowie', 'Under Pressure'),
    },
    {
      id: 'song-radio-ga-ga', cat: 'song-rock', franchise: 'Queen', game: 'Radio Ga Ga',
      title: 'Radio Ga Ga', year: 1984, lang: 'en',
      sources: busca('Queen', 'Radio Ga Ga'),
    },
    {
      id: 'song-somebody-to-love-queen', cat: 'song-rock', franchise: 'Queen', game: 'Somebody to Love',
      title: 'Somebody to Love', year: 1976, lang: 'en',
      sources: busca('Queen', 'Somebody to Love'),
    },
    {
      id: 'song-highway-to-hell', cat: 'song-rock', franchise: 'AC/DC', game: 'Highway to Hell',
      title: 'Highway to Hell', year: 1979, lang: 'en',
      sources: busca('AC/DC', 'Highway to Hell'),
    },
    {
      id: 'song-thunderstruck', cat: 'song-rock', franchise: 'AC/DC', game: 'Thunderstruck',
      title: 'Thunderstruck', year: 1990, lang: 'en',
      sources: busca('AC/DC', 'Thunderstruck'),
    },
    {
      id: 'song-you-shook-me-all-night-long', cat: 'song-rock', franchise: 'AC/DC', game: 'You Shook Me All Night Long',
      title: 'You Shook Me All Night Long', year: 1980, lang: 'en',
      sources: busca('AC/DC', 'You Shook Me All Night Long'),
    },
    {
      id: 'song-roxanne', cat: 'song-rock', franchise: 'The Police', game: 'Roxanne',
      title: 'Roxanne', year: 1978, lang: 'en',
      sources: busca('The Police', 'Roxanne'),
    },
    {
      id: 'song-message-in-a-bottle', cat: 'song-rock', franchise: 'The Police', game: 'Message in a Bottle',
      title: 'Message in a Bottle', year: 1979, lang: 'en',
      sources: busca('The Police', 'Message in a Bottle'),
    },
    {
      id: 'song-sultans-of-swing', cat: 'song-rock', franchise: 'Dire Straits', game: 'Sultans of Swing',
      title: 'Sultans of Swing', year: 1978, lang: 'en',
      sources: busca('Dire Straits', 'Sultans of Swing'),
    },
    {
      id: 'song-money-for-nothing', cat: 'song-rock', franchise: 'Dire Straits', game: 'Money for Nothing',
      title: 'Money for Nothing', year: 1985, lang: 'en',
      sources: busca('Dire Straits', 'Money for Nothing'),
    },
    {
      id: 'song-with-or-without-you', cat: 'song-rock', franchise: 'U2', game: 'With or Without You',
      title: 'With or Without You', year: 1987, lang: 'en',
      sources: busca('U2', 'With or Without You'),
    },
    {
      id: 'song-sunday-bloody-sunday', cat: 'song-rock', franchise: 'U2', game: 'Sunday Bloody Sunday',
      title: 'Sunday Bloody Sunday', year: 1983, lang: 'en',
      sources: busca('U2', 'Sunday Bloody Sunday'),
    },
    {
      id: 'song-beautiful-day-u2', cat: 'song-rock', franchise: 'U2', game: 'Beautiful Day',
      title: 'Beautiful Day', year: 2000, lang: 'en',
      sources: busca('U2', 'Beautiful Day'),
    },
    {
      id: 'song-shiny-happy-people', cat: 'song-rock', franchise: 'R.E.M.', game: 'Shiny Happy People',
      title: 'Shiny Happy People', year: 1991, lang: 'en',
      sources: busca('R.E.M.', 'Shiny Happy People'),
    },
    {
      id: 'song-patience-gnr', cat: 'song-rock', franchise: 'Guns N\' Roses', game: 'Patience',
      title: 'Patience', year: 1988, lang: 'en',
      sources: busca('Guns N\' Roses', 'Patience'),
    },
    {
      id: 'song-knockin-on-heavens-door', cat: 'song-rock', franchise: 'Guns N\' Roses', game: 'Knockin\' on Heaven\'s Door',
      title: 'Knockin\' on Heaven\'s Door', year: 1991, lang: 'en',
      sources: busca('Guns N\' Roses', 'Knockin\' on Heaven\'s Door'),
    },
    {
      id: 'song-everlong', cat: 'song-rock', franchise: 'Foo Fighters', game: 'Everlong',
      title: 'Everlong', year: 1997, lang: 'en',
      sources: busca('Foo Fighters', 'Everlong'),
    },
    {
      id: 'song-best-of-you', cat: 'song-rock', franchise: 'Foo Fighters', game: 'Best of You',
      title: 'Best of You', year: 2005, lang: 'en',
      sources: busca('Foo Fighters', 'Best of You'),
    },
    {
      id: 'song-supermassive-black-hole', cat: 'song-rock', franchise: 'Muse', game: 'Supermassive Black Hole',
      title: 'Supermassive Black Hole', year: 2006, lang: 'en',
      sources: busca('Muse', 'Supermassive Black Hole'),
    },
    {
      id: 'song-knights-of-cydonia', cat: 'song-rock', franchise: 'Muse', game: 'Knights of Cydonia',
      title: 'Knights of Cydonia', year: 2006, lang: 'en',
      sources: busca('Muse', 'Knights of Cydonia'),
    },
    {
      id: 'song-i-bet-you-look-good', cat: 'song-rock', franchise: 'Arctic Monkeys', game: 'I Bet You Look Good on the Dancefloor',
      title: 'I Bet You Look Good on the Dancefloor', year: 2005, lang: 'en',
      sources: busca('Arctic Monkeys', 'I Bet You Look Good on the Dancefloor'),
    },
    {
      id: 'song-505-arctic-monkeys', cat: 'song-rock', franchise: 'Arctic Monkeys', game: '505',
      title: '505', year: 2007, lang: 'en',
      sources: busca('Arctic Monkeys', '505'),
    },
    /* ───────────── Pop (200) ───────────── */
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
    {
      id: 'song-thriller', cat: 'song-pop', franchise: 'Michael Jackson', game: 'Thriller',
      title: 'Thriller', year: 1982, lang: 'en',
      sources: busca('Michael Jackson', 'Thriller'),
    },
    {
      id: 'song-material-girl', cat: 'song-pop', franchise: 'Madonna', game: 'Material Girl',
      title: 'Material Girl', year: 1984, lang: 'en',
      sources: busca('Madonna', 'Material Girl'),
    },
    {
      id: 'song-vogue', cat: 'song-pop', franchise: 'Madonna', game: 'Vogue',
      title: 'Vogue', year: 1990, lang: 'en',
      sources: busca('Madonna', 'Vogue'),
    },
    {
      id: 'song-mamma-mia', cat: 'song-pop', franchise: 'ABBA', game: 'Mamma Mia',
      title: 'Mamma Mia', year: 1975, lang: 'en',
      sources: busca('ABBA', 'Mamma Mia'),
    },
    {
      id: 'song-salome', cat: 'song-pop', franchise: 'Chayanne', game: 'Salomé',
      title: 'Salomé', year: 1998, lang: 'es',
      sources: busca('Chayanne', 'Salomé'),
    },
    {
      id: 'song-torero', cat: 'song-pop', franchise: 'Chayanne', game: 'Torero',
      title: 'Torero', year: 2002, lang: 'es',
      sources: busca('Chayanne', 'Torero'),
    },
    {
      id: 'song-y-yo-sigo-aqui', cat: 'song-pop', franchise: 'Paulina Rubio', game: 'Y yo sigo aquí',
      title: 'Y yo sigo aquí', year: 2000, lang: 'es',
      sources: busca('Paulina Rubio', 'Y yo sigo aquí'),
    },
    {
      id: 'song-ni-una-sola-palabra', cat: 'song-pop', franchise: 'Paulina Rubio', game: 'Ni una sola palabra',
      title: 'Ni una sola palabra', year: 2006, lang: 'es',
      sources: busca('Paulina Rubio', 'Ni una sola palabra'),
    },
    {
      id: 'song-limon-y-sal', cat: 'song-pop', franchise: 'Julieta Venegas', game: 'Limón y sal',
      title: 'Limón y sal', year: 2006, lang: 'es',
      sources: busca('Julieta Venegas', 'Limón y sal'),
    },
    {
      id: 'song-me-voy', cat: 'song-pop', franchise: 'Julieta Venegas', game: 'Me voy',
      title: 'Me voy', year: 2006, lang: 'es',
      sources: busca('Julieta Venegas', 'Me voy'),
    },
    {
      id: 'song-rosa-pastel-belanova', cat: 'song-pop', franchise: 'Belanova', game: 'Rosa pastel',
      title: 'Rosa pastel', year: 2005, lang: 'es',
      sources: busca('Belanova', 'Rosa pastel'),
    },
    {
      id: 'song-por-ti-belanova', cat: 'song-pop', franchise: 'Belanova', game: 'Por ti',
      title: 'Por ti', year: 2005, lang: 'es',
      sources: busca('Belanova', 'Por ti'),
    },
    {
      id: 'song-don-miranda', cat: 'song-pop', franchise: 'Miranda!', game: 'Don',
      title: 'Don', year: 2004, lang: 'es',
      sources: busca('Miranda!', 'Don'),
    },
    {
      id: 'song-perfecta-miranda', cat: 'song-pop', franchise: 'Miranda!', game: 'Perfecta',
      title: 'Perfecta', year: 2007, lang: 'es',
      sources: busca('Miranda!', 'Perfecta'),
    },
    {
      id: 'song-perdon-perdon', cat: 'song-pop', franchise: 'Ha*Ash', game: 'Perdón, perdón',
      title: 'Perdón, perdón', year: 2014, lang: 'es',
      sources: busca('Ha*Ash', 'Perdón, perdón'),
    },
    {
      id: 'song-lo-aprendi-de-ti', cat: 'song-pop', franchise: 'Ha*Ash', game: 'Lo aprendí de ti',
      title: 'Lo aprendí de ti', year: 2014, lang: 'es',
      sources: busca('Ha*Ash', 'Lo aprendí de ti'),
    },
    {
      id: 'song-corre-jesse-joy', cat: 'song-pop', franchise: 'Jesse & Joy', game: '¡Corre!',
      title: '¡Corre!', year: 2011, lang: 'es',
      sources: busca('Jesse & Joy', '¡Corre!'),
    },
    {
      id: 'song-bad-romance', cat: 'song-pop', franchise: 'Lady Gaga', game: 'Bad Romance',
      title: 'Bad Romance', year: 2009, lang: 'en',
      sources: busca('Lady Gaga', 'Bad Romance'),
    },
    {
      id: 'song-firework', cat: 'song-pop', franchise: 'Katy Perry', game: 'Firework',
      title: 'Firework', year: 2010, lang: 'en',
      sources: busca('Katy Perry', 'Firework'),
    },
    {
      id: 'song-roar', cat: 'song-pop', franchise: 'Katy Perry', game: 'Roar',
      title: 'Roar', year: 2013, lang: 'en',
      sources: busca('Katy Perry', 'Roar'),
    },
    {
      id: 'song-just-the-way-you-are', cat: 'song-pop', franchise: 'Bruno Mars', game: 'Just the Way You Are',
      title: 'Just the Way You Are', year: 2010, lang: 'en',
      sources: busca('Bruno Mars', 'Just the Way You Are'),
    },
    {
      id: 'song-24k-magic', cat: 'song-pop', franchise: 'Bruno Mars', game: '24K Magic',
      title: '24K Magic', year: 2016, lang: 'en',
      sources: busca('Bruno Mars', '24K Magic'),
    },
    {
      id: 'song-blank-space', cat: 'song-pop', franchise: 'Taylor Swift', game: 'Blank Space',
      title: 'Blank Space', year: 2014, lang: 'en',
      sources: busca('Taylor Swift', 'Blank Space'),
    },
    {
      id: 'song-cruel-summer', cat: 'song-pop', franchise: 'Taylor Swift', game: 'Cruel Summer',
      title: 'Cruel Summer', year: 2019, lang: 'en',
      sources: busca('Taylor Swift', 'Cruel Summer'),
    },
    {
      id: 'song-dont-start-now', cat: 'song-pop', franchise: 'Dua Lipa', game: 'Don\'t Start Now',
      title: 'Don\'t Start Now', year: 2019, lang: 'en',
      sources: busca('Dua Lipa', 'Don\'t Start Now'),
    },
    {
      id: 'song-7-rings', cat: 'song-pop', franchise: 'Ariana Grande', game: '7 rings',
      title: '7 rings', year: 2019, lang: 'en',
      sources: busca('Ariana Grande', '7 rings'),
    },
    {
      id: 'song-baby-justin-bieber', cat: 'song-pop', franchise: 'Justin Bieber', game: 'Baby',
      title: 'Baby', year: 2010, lang: 'en',
      sources: busca('Justin Bieber', 'Baby'),
    },
    {
      id: 'song-sugar-maroon-5', cat: 'song-pop', franchise: 'Maroon 5', game: 'Sugar',
      title: 'Sugar', year: 2014, lang: 'en',
      sources: busca('Maroon 5', 'Sugar'),
    },
    {
      id: 'song-chandelier', cat: 'song-pop', franchise: 'Sia', game: 'Chandelier',
      title: 'Chandelier', year: 2014, lang: 'en',
      sources: busca('Sia', 'Chandelier'),
    },
    {
      id: 'song-please-please-please', cat: 'song-pop', franchise: 'Sabrina Carpenter', game: 'Please Please Please',
      title: 'Please Please Please', year: 2024, lang: 'en',
      sources: busca('Sabrina Carpenter', 'Please Please Please'),
    },
    {
      id: 'song-hoy-no-me-puedo-levantar', cat: 'song-pop', franchise: 'Mecano', game: 'Hoy no me puedo levantar',
      title: 'Hoy no me puedo levantar', year: 1981, lang: 'es',
      sources: busca('Mecano', 'Hoy no me puedo levantar'),
    },
    {
      id: 'song-barco-a-venus', cat: 'song-pop', franchise: 'Mecano', game: 'Barco a Venus',
      title: 'Barco a Venus', year: 1983, lang: 'es',
      sources: busca('Mecano', 'Barco a Venus'),
    },
    {
      id: 'song-cruz-de-navajas', cat: 'song-pop', franchise: 'Mecano', game: 'Cruz de navajas',
      title: 'Cruz de navajas', year: 1986, lang: 'es',
      sources: busca('Mecano', 'Cruz de navajas'),
    },
    {
      id: 'song-la-fuerza-del-destino', cat: 'song-pop', franchise: 'Mecano', game: 'La fuerza del destino',
      title: 'La fuerza del destino', year: 1988, lang: 'es',
      sources: busca('Mecano', 'La fuerza del destino'),
    },
    {
      id: 'song-mujer-contra-mujer', cat: 'song-pop', franchise: 'Mecano', game: 'Mujer contra mujer',
      title: 'Mujer contra mujer', year: 1988, lang: 'es',
      sources: busca('Mecano', 'Mujer contra mujer'),
    },
    {
      id: 'song-un-ano-mas', cat: 'song-pop', franchise: 'Mecano', game: 'Un año más',
      title: 'Un año más', year: 1988, lang: 'es',
      sources: busca('Mecano', 'Un año más'),
    },
    {
      id: 'song-amante-bandido', cat: 'song-pop', franchise: 'Miguel Bosé', game: 'Amante bandido',
      title: 'Amante bandido', year: 1984, lang: 'es',
      sources: busca('Miguel Bosé', 'Amante bandido'),
    },
    {
      id: 'song-morenamia', cat: 'song-pop', franchise: 'Miguel Bosé', game: 'Morenamía',
      title: 'Morenamía', year: 2001, lang: 'es',
      sources: busca('Miguel Bosé', 'Morenamía'),
    },
    {
      id: 'song-si-tu-no-vuelves', cat: 'song-pop', franchise: 'Miguel Bosé', game: 'Si tú no vuelves',
      title: 'Si tú no vuelves', year: 1993, lang: 'es',
      sources: busca('Miguel Bosé', 'Si tú no vuelves'),
    },
    {
      id: 'song-a-quien-le-importa-alaska', cat: 'song-pop', franchise: 'Alaska y Dinarama', game: '¿A quién le importa?',
      title: '¿A quién le importa?', year: 1986, lang: 'es',
      sources: busca('Alaska y Dinarama', '¿A quién le importa?'),
    },
    {
      id: 'song-marta-tiene-un-marcapasos', cat: 'song-pop', franchise: 'Hombres G', game: 'Marta tiene un marcapasos',
      title: 'Marta tiene un marcapasos', year: 1986, lang: 'es',
      sources: busca('Hombres G', 'Marta tiene un marcapasos'),
    },
    {
      id: 'song-voy-a-pasarmelo-bien', cat: 'song-pop', franchise: 'Hombres G', game: 'Voy a pasármelo bien',
      title: 'Voy a pasármelo bien', year: 1989, lang: 'es',
      sources: busca('Hombres G', 'Voy a pasármelo bien'),
    },
    {
      id: 'song-te-quiero-hombres-g', cat: 'song-pop', franchise: 'Hombres G', game: 'Te quiero',
      title: 'Te quiero', year: 1986, lang: 'es',
      sources: busca('Hombres G', 'Te quiero'),
    },
    {
      id: 'song-con-todos-menos-conmigo', cat: 'song-pop', franchise: 'Timbiriche', game: 'Con todos menos conmigo',
      title: 'Con todos menos conmigo', year: 1987, lang: 'es',
      sources: busca('Timbiriche', 'Con todos menos conmigo'),
    },
    {
      id: 'song-besos-de-ceniza', cat: 'song-pop', franchise: 'Timbiriche', game: 'Besos de ceniza',
      title: 'Besos de ceniza', year: 1987, lang: 'es',
      sources: busca('Timbiriche', 'Besos de ceniza'),
    },
    {
      id: 'song-princesa-tibetana', cat: 'song-pop', franchise: 'Timbiriche', game: 'Princesa tibetana',
      title: 'Princesa tibetana', year: 1990, lang: 'es',
      sources: busca('Timbiriche', 'Princesa tibetana'),
    },
    {
      id: 'song-bazar-flans', cat: 'song-pop', franchise: 'Flans', game: 'Bazar',
      title: 'Bazar', year: 1985, lang: 'es',
      sources: busca('Flans', 'Bazar'),
    },
    {
      id: 'song-no-controles-flans', cat: 'song-pop', franchise: 'Flans', game: 'No controles',
      title: 'No controles', year: 1985, lang: 'es',
      sources: busca('Flans', 'No controles'),
    },
    {
      id: 'song-las-mil-y-una-noches', cat: 'song-pop', franchise: 'Flans', game: 'Las mil y una noches',
      title: 'Las mil y una noches', year: 1986, lang: 'es',
      sources: busca('Flans', 'Las mil y una noches'),
    },
    {
      id: 'song-como-te-va-mi-amor', cat: 'song-pop', franchise: 'Pandora', game: '¿Cómo te va mi amor?',
      title: '¿Cómo te va mi amor?', year: 1985, lang: 'es',
      sources: busca('Pandora', '¿Cómo te va mi amor?'),
    },
    {
      id: 'song-reina-de-corazones', cat: 'song-pop', franchise: 'Alejandra Guzmán', game: 'Reina de corazones',
      title: 'Reina de corazones', year: 1991, lang: 'es',
      sources: busca('Alejandra Guzmán', 'Reina de corazones'),
    },
    {
      id: 'song-eternamente-bella', cat: 'song-pop', franchise: 'Alejandra Guzmán', game: 'Eternamente bella',
      title: 'Eternamente bella', year: 1990, lang: 'es',
      sources: busca('Alejandra Guzmán', 'Eternamente bella'),
    },
    {
      id: 'song-miralo-miralo', cat: 'song-pop', franchise: 'Alejandra Guzmán', game: 'Míralo, míralo',
      title: 'Míralo, míralo', year: 1993, lang: 'es',
      sources: busca('Alejandra Guzmán', 'Míralo, míralo'),
    },
    {
      id: 'song-pelo-suelto', cat: 'song-pop', franchise: 'Gloria Trevi', game: 'Pelo suelto',
      title: 'Pelo suelto', year: 1991, lang: 'es',
      sources: busca('Gloria Trevi', 'Pelo suelto'),
    },
    {
      id: 'song-dr-psiquiatra', cat: 'song-pop', franchise: 'Gloria Trevi', game: 'Dr. Psiquiatra',
      title: 'Dr. Psiquiatra', year: 1989, lang: 'es',
      sources: busca('Gloria Trevi', 'Dr. Psiquiatra'),
    },
    {
      id: 'song-todos-me-miran', cat: 'song-pop', franchise: 'Gloria Trevi', game: 'Todos me miran',
      title: 'Todos me miran', year: 2006, lang: 'es',
      sources: busca('Gloria Trevi', 'Todos me miran'),
    },
    {
      id: 'song-con-los-ojos-cerrados', cat: 'song-pop', franchise: 'Gloria Trevi', game: 'Con los ojos cerrados',
      title: 'Con los ojos cerrados', year: 1992, lang: 'es',
      sources: busca('Gloria Trevi', 'Con los ojos cerrados'),
    },
    {
      id: 'song-el-ultimo-adios-paulina', cat: 'song-pop', franchise: 'Paulina Rubio', game: 'El último adiós',
      title: 'El último adiós', year: 2000, lang: 'es',
      sources: busca('Paulina Rubio', 'El último adiós'),
    },
    {
      id: 'song-te-quise-tanto-paulina', cat: 'song-pop', franchise: 'Paulina Rubio', game: 'Te quise tanto',
      title: 'Te quise tanto', year: 2004, lang: 'es',
      sources: busca('Paulina Rubio', 'Te quise tanto'),
    },
    {
      id: 'song-causa-y-efecto', cat: 'song-pop', franchise: 'Paulina Rubio', game: 'Causa y efecto',
      title: 'Causa y efecto', year: 2009, lang: 'es',
      sources: busca('Paulina Rubio', 'Causa y efecto'),
    },
    {
      id: 'song-mio-paulina', cat: 'song-pop', franchise: 'Paulina Rubio', game: 'Mío',
      title: 'Mío', year: 1992, lang: 'es',
      sources: busca('Paulina Rubio', 'Mío'),
    },
    {
      id: 'song-amor-a-la-mexicana-thalia', cat: 'song-pop', franchise: 'Thalía', game: 'Amor a la mexicana',
      title: 'Amor a la mexicana', year: 1997, lang: 'es',
      sources: busca('Thalía', 'Amor a la mexicana'),
    },
    {
      id: 'song-entre-el-mar-y-una-estrella', cat: 'song-pop', franchise: 'Thalía', game: 'Entre el mar y una estrella',
      title: 'Entre el mar y una estrella', year: 2000, lang: 'es',
      sources: busca('Thalía', 'Entre el mar y una estrella'),
    },
    {
      id: 'song-arrasando-thalia', cat: 'song-pop', franchise: 'Thalía', game: 'Arrasando',
      title: 'Arrasando', year: 2000, lang: 'es',
      sources: busca('Thalía', 'Arrasando'),
    },
    {
      id: 'song-a-quien-le-importa-thalia', cat: 'song-pop', franchise: 'Thalía', game: '¿A quién le importa?',
      title: '¿A quién le importa?', year: 2002, lang: 'es',
      sources: busca('Thalía', '¿A quién le importa?'),
    },
    {
      id: 'song-azucar-amargo-fey', cat: 'song-pop', franchise: 'Fey', game: 'Azúcar amargo',
      title: 'Azúcar amargo', year: 1996, lang: 'es',
      sources: busca('Fey', 'Azúcar amargo'),
    },
    {
      id: 'song-media-naranja-fey', cat: 'song-pop', franchise: 'Fey', game: 'Media naranja',
      title: 'Media naranja', year: 1995, lang: 'es',
      sources: busca('Fey', 'Media naranja'),
    },
    {
      id: 'song-muevelo-fey', cat: 'song-pop', franchise: 'Fey', game: 'Muévelo',
      title: 'Muévelo', year: 1996, lang: 'es',
      sources: busca('Fey', 'Muévelo'),
    },
    {
      id: 'song-la-calle-de-las-sirenas', cat: 'song-pop', franchise: 'Kabah', game: 'La calle de las sirenas',
      title: 'La calle de las sirenas', year: 1996, lang: 'es',
      sources: busca('Kabah', 'La calle de las sirenas'),
    },
    {
      id: 'song-al-pasar-kabah', cat: 'song-pop', franchise: 'Kabah', game: 'Al pasar',
      title: 'Al pasar', year: 1996, lang: 'es',
      sources: busca('Kabah', 'Al pasar'),
    },
    {
      id: 'song-vive-kabah', cat: 'song-pop', franchise: 'Kabah', game: 'Vive',
      title: 'Vive', year: 1996, lang: 'es',
      sources: busca('Kabah', 'Vive'),
    },
    {
      id: 'song-enloqueceme-ov7', cat: 'song-pop', franchise: 'OV7', game: 'Enloquéceme',
      title: 'Enloquéceme', year: 2000, lang: 'es',
      sources: busca('OV7', 'Enloquéceme'),
    },
    {
      id: 'song-shabadabada-ov7', cat: 'song-pop', franchise: 'OV7', game: 'Shabadabada',
      title: 'Shabadabada', year: 2000, lang: 'es',
      sources: busca('OV7', 'Shabadabada'),
    },
    {
      id: 'song-mirame-a-los-ojos-ov7', cat: 'song-pop', franchise: 'OV7', game: 'Mírame a los ojos',
      title: 'Mírame a los ojos', year: 1997, lang: 'es',
      sources: busca('OV7', 'Mírame a los ojos'),
    },
    {
      id: 'song-la-playa-oreja', cat: 'song-pop', franchise: 'La Oreja de Van Gogh', game: 'La playa',
      title: 'La playa', year: 2000, lang: 'es',
      sources: busca('La Oreja de Van Gogh', 'La playa'),
    },
    {
      id: 'song-cuidate-oreja', cat: 'song-pop', franchise: 'La Oreja de Van Gogh', game: 'Cuídate',
      title: 'Cuídate', year: 2000, lang: 'es',
      sources: busca('La Oreja de Van Gogh', 'Cuídate'),
    },
    {
      id: 'song-puedes-contar-conmigo', cat: 'song-pop', franchise: 'La Oreja de Van Gogh', game: 'Puedes contar conmigo',
      title: 'Puedes contar conmigo', year: 2003, lang: 'es',
      sources: busca('La Oreja de Van Gogh', 'Puedes contar conmigo'),
    },
    {
      id: 'song-20-de-enero', cat: 'song-pop', franchise: 'La Oreja de Van Gogh', game: '20 de enero',
      title: '20 de enero', year: 2003, lang: 'es',
      sources: busca('La Oreja de Van Gogh', '20 de enero'),
    },
    {
      id: 'song-jueves-oreja', cat: 'song-pop', franchise: 'La Oreja de Van Gogh', game: 'Jueves',
      title: 'Jueves', year: 2008, lang: 'es',
      sources: busca('La Oreja de Van Gogh', 'Jueves'),
    },
    {
      id: 'song-sin-ti-no-soy-nada', cat: 'song-pop', franchise: 'Amaral', game: 'Sin ti no soy nada',
      title: 'Sin ti no soy nada', year: 2002, lang: 'es',
      sources: busca('Amaral', 'Sin ti no soy nada'),
    },
    {
      id: 'song-el-universo-sobre-mi', cat: 'song-pop', franchise: 'Amaral', game: 'El universo sobre mí',
      title: 'El universo sobre mí', year: 2005, lang: 'es',
      sources: busca('Amaral', 'El universo sobre mí'),
    },
    {
      id: 'song-zapatillas-el-canto', cat: 'song-pop', franchise: 'El Canto del Loco', game: 'Zapatillas',
      title: 'Zapatillas', year: 2005, lang: 'es',
      sources: busca('El Canto del Loco', 'Zapatillas'),
    },
    {
      id: 'song-la-madre-de-jose', cat: 'song-pop', franchise: 'El Canto del Loco', game: 'La madre de José',
      title: 'La madre de José', year: 2003, lang: 'es',
      sources: busca('El Canto del Loco', 'La madre de José'),
    },
    {
      id: 'song-tu-calorro-estopa', cat: 'song-pop', franchise: 'Estopa', game: 'Tu calorro',
      title: 'Tu calorro', year: 1999, lang: 'es',
      sources: busca('Estopa', 'Tu calorro'),
    },
    {
      id: 'song-por-la-raja-de-tu-falda', cat: 'song-pop', franchise: 'Estopa', game: 'Por la raja de tu falda',
      title: 'Por la raja de tu falda', year: 1999, lang: 'es',
      sources: busca('Estopa', 'Por la raja de tu falda'),
    },
    {
      id: 'song-vino-tinto-estopa', cat: 'song-pop', franchise: 'Estopa', game: 'Vino tinto',
      title: 'Vino tinto', year: 2001, lang: 'es',
      sources: busca('Estopa', 'Vino tinto'),
    },
    {
      id: 'song-caminando-por-la-vida', cat: 'song-pop', franchise: 'Melendi', game: 'Caminando por la vida',
      title: 'Caminando por la vida', year: 2005, lang: 'es',
      sources: busca('Melendi', 'Caminando por la vida'),
    },
    {
      id: 'song-volverte-a-ver-juanes', cat: 'song-pop', franchise: 'Juanes', game: 'Volverte a ver',
      title: 'Volverte a ver', year: 2004, lang: 'es',
      sources: busca('Juanes', 'Volverte a ver'),
    },
    {
      id: 'song-es-por-ti-juanes', cat: 'song-pop', franchise: 'Juanes', game: 'Es por ti',
      title: 'Es por ti', year: 2002, lang: 'es',
      sources: busca('Juanes', 'Es por ti'),
    },
    {
      id: 'song-me-enamora-juanes', cat: 'song-pop', franchise: 'Juanes', game: 'Me enamora',
      title: 'Me enamora', year: 2007, lang: 'es',
      sources: busca('Juanes', 'Me enamora'),
    },
    {
      id: 'song-si-te-vas-shakira', cat: 'song-pop', franchise: 'Shakira', game: 'Si te vas',
      title: 'Si te vas', year: 1998, lang: 'es',
      sources: busca('Shakira', 'Si te vas'),
    },
    {
      id: 'song-ojos-asi-shakira', cat: 'song-pop', franchise: 'Shakira', game: 'Ojos así',
      title: 'Ojos así', year: 1998, lang: 'es',
      sources: busca('Shakira', 'Ojos así'),
    },
    {
      id: 'song-ciega-sordomuda-shakira', cat: 'song-pop', franchise: 'Shakira', game: 'Ciega, sordomuda',
      title: 'Ciega, sordomuda', year: 1998, lang: 'es',
      sources: busca('Shakira', 'Ciega, sordomuda'),
    },
    {
      id: 'song-inevitable-shakira', cat: 'song-pop', franchise: 'Shakira', game: 'Inevitable',
      title: 'Inevitable', year: 1998, lang: 'es',
      sources: busca('Shakira', 'Inevitable'),
    },
    {
      id: 'song-suerte-shakira', cat: 'song-pop', franchise: 'Shakira', game: 'Suerte',
      title: 'Suerte', year: 2001, lang: 'es',
      sources: busca('Shakira', 'Suerte'),
    },
    {
      id: 'song-andar-conmigo-julieta', cat: 'song-pop', franchise: 'Julieta Venegas', game: 'Andar conmigo',
      title: 'Andar conmigo', year: 2003, lang: 'es',
      sources: busca('Julieta Venegas', 'Andar conmigo'),
    },
    {
      id: 'song-eres-para-mi-julieta', cat: 'song-pop', franchise: 'Julieta Venegas', game: 'Eres para mí',
      title: 'Eres para mí', year: 2006, lang: 'es',
      sources: busca('Julieta Venegas', 'Eres para mí'),
    },
    {
      id: 'song-en-el-2000-natalia', cat: 'song-pop', franchise: 'Natalia Lafourcade', game: 'En el 2000',
      title: 'En el 2000', year: 2002, lang: 'es',
      sources: busca('Natalia Lafourcade', 'En el 2000'),
    },
    {
      id: 'song-holiday-madonna', cat: 'song-pop', franchise: 'Madonna', game: 'Holiday',
      title: 'Holiday', year: 1983, lang: 'en',
      sources: busca('Madonna', 'Holiday'),
    },
    {
      id: 'song-lucky-star-madonna', cat: 'song-pop', franchise: 'Madonna', game: 'Lucky Star',
      title: 'Lucky Star', year: 1983, lang: 'en',
      sources: busca('Madonna', 'Lucky Star'),
    },
    {
      id: 'song-papa-dont-preach', cat: 'song-pop', franchise: 'Madonna', game: 'Papa Don\'t Preach',
      title: 'Papa Don\'t Preach', year: 1986, lang: 'en',
      sources: busca('Madonna', 'Papa Don\'t Preach'),
    },
    {
      id: 'song-la-isla-bonita', cat: 'song-pop', franchise: 'Madonna', game: 'La Isla Bonita',
      title: 'La Isla Bonita', year: 1986, lang: 'en',
      sources: busca('Madonna', 'La Isla Bonita'),
    },
    {
      id: 'song-hung-up-madonna', cat: 'song-pop', franchise: 'Madonna', game: 'Hung Up',
      title: 'Hung Up', year: 2005, lang: 'en',
      sources: busca('Madonna', 'Hung Up'),
    },
    {
      id: 'song-bad-michael-jackson', cat: 'song-pop', franchise: 'Michael Jackson', game: 'Bad',
      title: 'Bad', year: 1987, lang: 'en',
      sources: busca('Michael Jackson', 'Bad'),
    },
    {
      id: 'song-man-in-the-mirror', cat: 'song-pop', franchise: 'Michael Jackson', game: 'Man in the Mirror',
      title: 'Man in the Mirror', year: 1987, lang: 'en',
      sources: busca('Michael Jackson', 'Man in the Mirror'),
    },
    {
      id: 'song-black-or-white', cat: 'song-pop', franchise: 'Michael Jackson', game: 'Black or White',
      title: 'Black or White', year: 1991, lang: 'en',
      sources: busca('Michael Jackson', 'Black or White'),
    },
    {
      id: 'song-faith-george-michael', cat: 'song-pop', franchise: 'George Michael', game: 'Faith',
      title: 'Faith', year: 1987, lang: 'en',
      sources: busca('George Michael', 'Faith'),
    },
    {
      id: 'song-1999-prince', cat: 'song-pop', franchise: 'Prince', game: '1999',
      title: '1999', year: 1982, lang: 'en',
      sources: busca('Prince', '1999'),
    },
    {
      id: 'song-kiss-prince', cat: 'song-pop', franchise: 'Prince', game: 'Kiss',
      title: 'Kiss', year: 1986, lang: 'en',
      sources: busca('Prince', 'Kiss'),
    },
    {
      id: 'song-how-will-i-know', cat: 'song-pop', franchise: 'Whitney Houston', game: 'How Will I Know',
      title: 'How Will I Know', year: 1985, lang: 'en',
      sources: busca('Whitney Houston', 'How Will I Know'),
    },
    {
      id: 'song-i-have-nothing', cat: 'song-pop', franchise: 'Whitney Houston', game: 'I Have Nothing',
      title: 'I Have Nothing', year: 1992, lang: 'en',
      sources: busca('Whitney Houston', 'I Have Nothing'),
    },
    {
      id: 'song-oops-i-did-it-again', cat: 'song-pop', franchise: 'Britney Spears', game: 'Oops!... I Did It Again',
      title: 'Oops!... I Did It Again', year: 2000, lang: 'en',
      sources: busca('Britney Spears', 'Oops!... I Did It Again'),
    },
    {
      id: 'song-stronger-britney', cat: 'song-pop', franchise: 'Britney Spears', game: 'Stronger',
      title: 'Stronger', year: 2000, lang: 'en',
      sources: busca('Britney Spears', 'Stronger'),
    },
    {
      id: 'song-im-a-slave-4-u', cat: 'song-pop', franchise: 'Britney Spears', game: 'I\'m a Slave 4 U',
      title: 'I\'m a Slave 4 U', year: 2001, lang: 'en',
      sources: busca('Britney Spears', 'I\'m a Slave 4 U'),
    },
    {
      id: 'song-genie-in-a-bottle', cat: 'song-pop', franchise: 'Christina Aguilera', game: 'Genie in a Bottle',
      title: 'Genie in a Bottle', year: 1999, lang: 'en',
      sources: busca('Christina Aguilera', 'Genie in a Bottle'),
    },
    {
      id: 'song-fighter-christina', cat: 'song-pop', franchise: 'Christina Aguilera', game: 'Fighter',
      title: 'Fighter', year: 2002, lang: 'en',
      sources: busca('Christina Aguilera', 'Fighter'),
    },
    {
      id: 'song-everybody-backstreet', cat: 'song-pop', franchise: 'Backstreet Boys', game: 'Everybody (Backstreet\'s Back)',
      title: 'Everybody (Backstreet\'s Back)', year: 1997, lang: 'en',
      sources: busca('Backstreet Boys', 'Everybody (Backstreet\'s Back)'),
    },
    {
      id: 'song-as-long-as-you-love-me', cat: 'song-pop', franchise: 'Backstreet Boys', game: 'As Long as You Love Me',
      title: 'As Long as You Love Me', year: 1997, lang: 'en',
      sources: busca('Backstreet Boys', 'As Long as You Love Me'),
    },
    {
      id: 'song-bye-bye-bye', cat: 'song-pop', franchise: '*NSYNC', game: 'Bye Bye Bye',
      title: 'Bye Bye Bye', year: 2000, lang: 'en',
      sources: busca('*NSYNC', 'Bye Bye Bye'),
    },
    {
      id: 'song-its-gonna-be-me', cat: 'song-pop', franchise: '*NSYNC', game: 'It\'s Gonna Be Me',
      title: 'It\'s Gonna Be Me', year: 2000, lang: 'en',
      sources: busca('*NSYNC', 'It\'s Gonna Be Me'),
    },
    {
      id: 'song-say-my-name-destiny', cat: 'song-pop', franchise: 'Destiny\'s Child', game: 'Say My Name',
      title: 'Say My Name', year: 1999, lang: 'en',
      sources: busca('Destiny\'s Child', 'Say My Name'),
    },
    {
      id: 'song-survivor-destiny', cat: 'song-pop', franchise: 'Destiny\'s Child', game: 'Survivor',
      title: 'Survivor', year: 2001, lang: 'en',
      sources: busca('Destiny\'s Child', 'Survivor'),
    },
    {
      id: 'song-sexyback-justin', cat: 'song-pop', franchise: 'Justin Timberlake', game: 'SexyBack',
      title: 'SexyBack', year: 2006, lang: 'en',
      sources: busca('Justin Timberlake', 'SexyBack'),
    },
    {
      id: 'song-mirrors-justin', cat: 'song-pop', franchise: 'Justin Timberlake', game: 'Mirrors',
      title: 'Mirrors', year: 2013, lang: 'en',
      sources: busca('Justin Timberlake', 'Mirrors'),
    },
    {
      id: 'song-teenage-dream-katy', cat: 'song-pop', franchise: 'Katy Perry', game: 'Teenage Dream',
      title: 'Teenage Dream', year: 2010, lang: 'en',
      sources: busca('Katy Perry', 'Teenage Dream'),
    },
    {
      id: 'song-dark-horse-katy', cat: 'song-pop', franchise: 'Katy Perry', game: 'Dark Horse',
      title: 'Dark Horse', year: 2013, lang: 'en',
      sources: busca('Katy Perry', 'Dark Horse'),
    },
    {
      id: 'song-locked-out-of-heaven', cat: 'song-pop', franchise: 'Bruno Mars', game: 'Locked Out of Heaven',
      title: 'Locked Out of Heaven', year: 2012, lang: 'en',
      sources: busca('Bruno Mars', 'Locked Out of Heaven'),
    },
    {
      id: 'song-thats-what-i-like', cat: 'song-pop', franchise: 'Bruno Mars', game: 'That\'s What I Like',
      title: 'That\'s What I Like', year: 2016, lang: 'en',
      sources: busca('Bruno Mars', 'That\'s What I Like'),
    },
    {
      id: 'song-set-fire-to-the-rain', cat: 'song-pop', franchise: 'Adele', game: 'Set Fire to the Rain',
      title: 'Set Fire to the Rain', year: 2011, lang: 'en',
      sources: busca('Adele', 'Set Fire to the Rain'),
    },
    {
      id: 'song-vampire-olivia', cat: 'song-pop', franchise: 'Olivia Rodrigo', game: 'vampire',
      title: 'vampire', year: 2023, lang: 'en',
      sources: busca('Olivia Rodrigo', 'vampire'),
    },
    /* ───────────── Rap y hip-hop (200) ───────────── */
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
    {
      id: 'song-the-message', cat: 'song-rap', franchise: 'Grandmaster Flash and The Furious Five', game: 'The Message',
      title: 'The Message', year: 1982, lang: 'en',
      sources: busca('Grandmaster Flash', 'The Message'),
    },
    {
      id: 'song-rappers-delight', cat: 'song-rap', franchise: 'The Sugarhill Gang', game: 'Rapper\'s Delight',
      title: 'Rapper\'s Delight', year: 1979, lang: 'en',
      sources: busca('The Sugarhill Gang', 'Rapper\'s Delight'),
    },
    {
      id: 'song-the-next-episode', cat: 'song-rap', franchise: 'Dr. Dre', game: 'The Next Episode',
      title: 'The Next Episode', year: 1999, lang: 'en',
      sources: busca('Dr. Dre', 'The Next Episode'),
    },
    {
      id: 'song-gin-and-juice', cat: 'song-rap', franchise: 'Snoop Dogg', game: 'Gin and Juice',
      title: 'Gin and Juice', year: 1993, lang: 'en',
      sources: busca('Snoop Dogg', 'Gin and Juice'),
    },
    {
      id: 'song-hypnotize', cat: 'song-rap', franchise: 'The Notorious B.I.G.', game: 'Hypnotize',
      title: 'Hypnotize', year: 1997, lang: 'en',
      sources: busca('The Notorious B.I.G.', 'Hypnotize'),
    },
    {
      id: 'song-big-poppa', cat: 'song-rap', franchise: 'The Notorious B.I.G.', game: 'Big Poppa',
      title: 'Big Poppa', year: 1994, lang: 'en',
      sources: busca('The Notorious B.I.G.', 'Big Poppa'),
    },
    {
      id: 'song-dear-mama', cat: 'song-rap', franchise: '2Pac', game: 'Dear Mama',
      title: 'Dear Mama', year: 1995, lang: 'en',
      sources: busca('2Pac', 'Dear Mama'),
    },
    {
      id: 'song-hit-em-up', cat: 'song-rap', franchise: '2Pac', game: 'Hit \'Em Up',
      title: 'Hit \'Em Up', year: 1996, lang: 'en',
      sources: busca('2Pac', 'Hit \'Em Up'),
    },
    {
      id: 'song-x-gon-give-it-to-ya', cat: 'song-rap', franchise: 'DMX', game: 'X Gon\' Give It to Ya',
      title: 'X Gon\' Give It to Ya', year: 2003, lang: 'en',
      sources: busca('DMX', 'X Gon\' Give It to Ya'),
    },
    {
      id: 'song-ruff-ryders-anthem', cat: 'song-rap', franchise: 'DMX', game: 'Ruff Ryders\' Anthem',
      title: 'Ruff Ryders\' Anthem', year: 1998, lang: 'en',
      sources: busca('DMX', 'Ruff Ryders\' Anthem'),
    },
    {
      id: 'song-candy-shop', cat: 'song-rap', franchise: '50 Cent', game: 'Candy Shop',
      title: 'Candy Shop', year: 2005, lang: 'en',
      sources: busca('50 Cent', 'Candy Shop'),
    },
    {
      id: 'song-21-questions', cat: 'song-rap', franchise: '50 Cent', game: '21 Questions',
      title: '21 Questions', year: 2003, lang: 'en',
      sources: busca('50 Cent', '21 Questions'),
    },
    {
      id: 'song-stan', cat: 'song-rap', franchise: 'Eminem', game: 'Stan',
      title: 'Stan', year: 2000, lang: 'en',
      sources: busca('Eminem', 'Stan'),
    },
    {
      id: 'song-mockingbird', cat: 'song-rap', franchise: 'Eminem', game: 'Mockingbird',
      title: 'Mockingbird', year: 2004, lang: 'en',
      sources: busca('Eminem', 'Mockingbird'),
    },
    {
      id: 'song-99-problems', cat: 'song-rap', franchise: 'JAY-Z', game: '99 Problems',
      title: '99 Problems', year: 2003, lang: 'en',
      sources: busca('JAY-Z', '99 Problems'),
    },
    {
      id: 'song-heartless', cat: 'song-rap', franchise: 'Kanye West', game: 'Heartless',
      title: 'Heartless', year: 2008, lang: 'en',
      sources: busca('Kanye West', 'Heartless'),
    },
    {
      id: 'song-power-kanye', cat: 'song-rap', franchise: 'Kanye West', game: 'POWER',
      title: 'POWER', year: 2010, lang: 'en',
      sources: busca('Kanye West', 'POWER'),
    },
    {
      id: 'song-break-ya-neck', cat: 'song-rap', franchise: 'Busta Rhymes', game: 'Break Ya Neck',
      title: 'Break Ya Neck', year: 2001, lang: 'en',
      sources: busca('Busta Rhymes', 'Break Ya Neck'),
    },
    {
      id: 'song-dilemma', cat: 'song-rap', franchise: 'Nelly', game: 'Dilemma',
      title: 'Dilemma', year: 2002, lang: 'en',
      sources: busca('Nelly', 'Dilemma'),
    },
    {
      id: 'song-lean-back', cat: 'song-rap', franchise: 'Terror Squad', game: 'Lean Back',
      title: 'Lean Back', year: 2004, lang: 'en',
      sources: busca('Terror Squad', 'Lean Back'),
    },
    {
      id: 'song-low-flo-rida', cat: 'song-rap', franchise: 'Flo Rida', game: 'Low',
      title: 'Low', year: 2007, lang: 'en',
      sources: busca('Flo Rida', 'Low'),
    },
    {
      id: 'song-live-your-life', cat: 'song-rap', franchise: 'T.I.', game: 'Live Your Life',
      title: 'Live Your Life', year: 2008, lang: 'en',
      sources: busca('T.I.', 'Live Your Life'),
    },
    {
      id: 'song-a-milli', cat: 'song-rap', franchise: 'Lil Wayne', game: 'A Milli',
      title: 'A Milli', year: 2008, lang: 'en',
      sources: busca('Lil Wayne', 'A Milli'),
    },
    {
      id: 'song-lollipop', cat: 'song-rap', franchise: 'Lil Wayne', game: 'Lollipop',
      title: 'Lollipop', year: 2008, lang: 'en',
      sources: busca('Lil Wayne', 'Lollipop'),
    },
    {
      id: 'song-one-dance', cat: 'song-rap', franchise: 'Drake', game: 'One Dance',
      title: 'One Dance', year: 2016, lang: 'en',
      sources: busca('Drake', 'One Dance'),
    },
    {
      id: 'song-alright-kendrick', cat: 'song-rap', franchise: 'Kendrick Lamar', game: 'Alright',
      title: 'Alright', year: 2015, lang: 'en',
      sources: busca('Kendrick Lamar', 'Alright'),
    },
    {
      id: 'song-swimming-pools', cat: 'song-rap', franchise: 'Kendrick Lamar', game: 'Swimming Pools (Drank)',
      title: 'Swimming Pools (Drank)', year: 2012, lang: 'en',
      sources: busca('Kendrick Lamar', 'Swimming Pools'),
    },
    {
      id: 'song-dna-kendrick', cat: 'song-rap', franchise: 'Kendrick Lamar', game: 'DNA.',
      title: 'DNA.', year: 2017, lang: 'en',
      sources: busca('Kendrick Lamar', 'DNA.'),
    },
    {
      id: 'song-circles-post-malone', cat: 'song-rap', franchise: 'Post Malone', game: 'Circles',
      title: 'Circles', year: 2019, lang: 'en',
      sources: busca('Post Malone', 'Circles'),
    },
    {
      id: 'song-sunflower', cat: 'song-rap', franchise: 'Post Malone y Swae Lee', game: 'Sunflower',
      title: 'Sunflower', year: 2018, lang: 'en',
      sources: busca('Post Malone', 'Sunflower'),
    },
    {
      id: 'song-goosebumps-travis', cat: 'song-rap', franchise: 'Travis Scott', game: 'Goosebumps',
      title: 'Goosebumps', year: 2016, lang: 'en',
      sources: busca('Travis Scott', 'Goosebumps'),
    },
    {
      id: 'song-mask-off', cat: 'song-rap', franchise: 'Future', game: 'Mask Off',
      title: 'Mask Off', year: 2017, lang: 'en',
      sources: busca('Future', 'Mask Off'),
    },
    {
      id: 'song-bad-and-boujee', cat: 'song-rap', franchise: 'Migos', game: 'Bad and Boujee',
      title: 'Bad and Boujee', year: 2016, lang: 'en',
      sources: busca('Migos', 'Bad and Boujee'),
    },
    {
      id: 'song-i-like-it-cardi-b', cat: 'song-rap', franchise: 'Cardi B', game: 'I Like It',
      title: 'I Like It', year: 2018, lang: 'en',
      sources: busca('Cardi B', 'I Like It'),
    },
    {
      id: 'song-savage-megan', cat: 'song-rap', franchise: 'Megan Thee Stallion', game: 'Savage',
      title: 'Savage', year: 2020, lang: 'en',
      sources: busca('Megan Thee Stallion', 'Savage'),
    },
    {
      id: 'song-say-so', cat: 'song-rap', franchise: 'Doja Cat', game: 'Say So',
      title: 'Say So', year: 2019, lang: 'en',
      sources: busca('Doja Cat', 'Say So'),
    },
    {
      id: 'song-first-class', cat: 'song-rap', franchise: 'Jack Harlow', game: 'First Class',
      title: 'First Class', year: 2022, lang: 'en',
      sources: busca('Jack Harlow', 'First Class'),
    },
    {
      id: 'song-todas-mueren-por-mi', cat: 'song-rap', franchise: 'Cartel de Santa', game: 'Todas mueren por mí',
      title: 'Todas mueren por mí', year: 2002, lang: 'es',
      sources: busca('Cartel de Santa', 'Todas mueren por mí'),
    },
    {
      id: 'song-extasis-cartel', cat: 'song-rap', franchise: 'Cartel de Santa', game: 'Éxtasis',
      title: 'Éxtasis', year: 2012, lang: 'es',
      sources: busca('Cartel de Santa', 'Éxtasis'),
    },
    {
      id: 'song-leve-cartel', cat: 'song-rap', franchise: 'Cartel de Santa', game: 'Leve',
      title: 'Leve', year: 2016, lang: 'es',
      sources: busca('Cartel de Santa', 'Leve'),
    },
    {
      id: 'song-bombos-y-tarolas', cat: 'song-rap', franchise: 'Cartel de Santa', game: 'Bombos y tarolas',
      title: 'Bombos y tarolas', year: 2010, lang: 'es',
      sources: busca('Cartel de Santa', 'Bombos y tarolas'),
    },
    {
      id: 'song-maquiavelico', cat: 'song-rap', franchise: 'Canserbero', game: 'Maquiavélico',
      title: 'Maquiavélico', year: 2012, lang: 'es',
      sources: busca('Canserbero', 'Maquiavélico'),
    },
    {
      id: 'song-querer-querernos', cat: 'song-rap', franchise: 'Canserbero', game: 'Querer querernos',
      title: 'Querer querernos', year: 2012, lang: 'es',
      sources: busca('Canserbero', 'Querer querernos'),
    },
    {
      id: 'song-asi-soy-santa-fe', cat: 'song-rap', franchise: 'Santa Fe Klan', game: 'Así soy',
      title: 'Así soy', year: 2020, lang: 'es',
      sources: busca('Santa Fe Klan', 'Así soy'),
    },
    {
      id: 'song-debo-entender', cat: 'song-rap', franchise: 'Santa Fe Klan', game: 'Debo entender',
      title: 'Debo entender', year: 2020, lang: 'es',
      sources: busca('Santa Fe Klan', 'Debo entender'),
    },
    {
      id: 'song-dance-crip', cat: 'song-rap', franchise: 'Trueno', game: 'Dance Crip',
      title: 'Dance Crip', year: 2021, lang: 'es',
      sources: busca('Trueno', 'Dance Crip'),
    },
    {
      id: 'song-canguro-wos', cat: 'song-rap', franchise: 'Wos', game: 'Canguro',
      title: 'Canguro', year: 2019, lang: 'es',
      sources: busca('Wos', 'Canguro'),
    },
    {
      id: 'song-goteo-duki', cat: 'song-rap', franchise: 'Duki', game: 'Goteo',
      title: 'Goteo', year: 2019, lang: 'es',
      sources: busca('Duki', 'Goteo'),
    },
    {
      id: 'song-she-dont-give-a-fo', cat: 'song-rap', franchise: 'Duki', game: 'She Don\'t Give a FO',
      title: 'She Don\'t Give a FO', year: 2017, lang: 'es',
      sources: busca('Duki', 'She Don\'t Give a FO'),
    },
    {
      id: 'song-loca-khea', cat: 'song-rap', franchise: 'Khea, Duki y Cazzu', game: 'Loca',
      title: 'Loca', year: 2017, lang: 'es',
      sources: busca('Khea', 'Loca'),
    },
    {
      id: 'song-si-senor-control-machete', cat: 'song-rap', franchise: 'Control Machete', game: 'Sí, señor',
      title: 'Sí, señor', year: 1999, lang: 'es',
      sources: busca('Control Machete', 'Sí, señor'),
    },
    {
      id: 'song-asi-son-mis-dias', cat: 'song-rap', franchise: 'Control Machete', game: 'Así son mis días',
      title: 'Así son mis días', year: 1997, lang: 'es',
      sources: busca('Control Machete', 'Así son mis días'),
    },
    {
      id: 'song-cumbia-poder', cat: 'song-rap', franchise: 'Control Machete', game: 'Cumbia poder',
      title: 'Cumbia poder', year: 1999, lang: 'es',
      sources: busca('Control Machete', 'Cumbia poder'),
    },
    {
      id: 'song-el-arte-del-engano', cat: 'song-rap', franchise: 'Cartel de Santa', game: 'El arte del engaño',
      title: 'El arte del engaño', year: 2008, lang: 'es',
      sources: busca('Cartel de Santa', 'El arte del engaño'),
    },
    {
      id: 'song-la-pelotona', cat: 'song-rap', franchise: 'Cartel de Santa', game: 'La pelotona',
      title: 'La pelotona', year: 2002, lang: 'es',
      sources: busca('Cartel de Santa', 'La pelotona'),
    },
    {
      id: 'song-asereje-hiphop-cartel', cat: 'song-rap', franchise: 'Cartel de Santa', game: 'Si te vienen a contar',
      title: 'Si te vienen a contar', year: 2014, lang: 'es',
      sources: busca('Cartel de Santa', 'Si te vienen a contar'),
    },
    {
      id: 'song-suena-mamalona', cat: 'song-rap', franchise: 'Cartel de Santa', game: 'Suena mamalona',
      title: 'Suena mamalona', year: 2014, lang: 'es',
      sources: busca('Cartel de Santa', 'Suena mamalona'),
    },
    {
      id: 'song-policeman-cartel', cat: 'song-rap', franchise: 'Cartel de Santa', game: 'Los mensajes del WhatsApp',
      title: 'Los mensajes del WhatsApp', year: 2014, lang: 'es',
      sources: busca('Cartel de Santa', 'Los mensajes del WhatsApp'),
    },
    {
      id: 'song-somos-callejeros', cat: 'song-rap', franchise: 'C-Kan', game: 'Somos callejeros',
      title: 'Somos callejeros', year: 2012, lang: 'es',
      sources: busca('C-Kan', 'Somos callejeros'),
    },
    {
      id: 'song-vuelve-c-kan', cat: 'song-rap', franchise: 'C-Kan', game: 'Vuelve',
      title: 'Vuelve', year: 2012, lang: 'es',
      sources: busca('C-Kan', 'Vuelve'),
    },
    {
      id: 'song-esta-vida-me-encanta', cat: 'song-rap', franchise: 'C-Kan', game: 'Esta vida me encanta',
      title: 'Esta vida me encanta', year: 2013, lang: 'es',
      sources: busca('C-Kan', 'Esta vida me encanta'),
    },
    {
      id: 'song-un-par-de-balas', cat: 'song-rap', franchise: 'C-Kan', game: 'Un par de balas',
      title: 'Un par de balas', year: 2014, lang: 'es',
      sources: busca('C-Kan', 'Un par de balas'),
    },
    {
      id: 'song-rueda-aleman', cat: 'song-rap', franchise: 'Alemán', game: 'Rucón',
      title: 'Rucón', year: 2018, lang: 'es',
      sources: busca('Alemán', 'Rucón'),
    },
    {
      id: 'song-rolemos-otro', cat: 'song-rap', franchise: 'Alemán', game: 'Rolemos otro',
      title: 'Rolemos otro', year: 2016, lang: 'es',
      sources: busca('Alemán', 'Rolemos otro'),
    },
    {
      id: 'song-pues-que-pues', cat: 'song-rap', franchise: 'Alemán', game: 'Pues que pues',
      title: 'Pues que pues', year: 2016, lang: 'es',
      sources: busca('Alemán', 'Pues que pues'),
    },
    {
      id: 'song-gran-vida-aleman', cat: 'song-rap', franchise: 'Alemán', game: 'Gran vida',
      title: 'Gran vida', year: 2019, lang: 'es',
      sources: busca('Alemán', 'Gran vida'),
    },
    {
      id: 'song-peligroso-gera-mx', cat: 'song-rap', franchise: 'Gera MX', game: 'Peligroso',
      title: 'Peligroso', year: 2019, lang: 'es',
      sources: busca('Gera MX', 'Peligroso'),
    },
    {
      id: 'song-los-no-pertenecen', cat: 'song-rap', franchise: 'Gera MX', game: 'Los no pertenecen',
      title: 'Los no pertenecen', year: 2017, lang: 'es',
      sources: busca('Gera MX', 'Los no pertenecen'),
    },
    {
      id: 'song-no-veo-nada-gera', cat: 'song-rap', franchise: 'Gera MX', game: 'No veo nada',
      title: 'No veo nada', year: 2017, lang: 'es',
      sources: busca('Gera MX', 'No veo nada'),
    },
    {
      id: 'song-se-me-olvida-gera', cat: 'song-rap', franchise: 'Gera MX', game: 'Se me olvida',
      title: 'Se me olvida', year: 2021, lang: 'es',
      sources: busca('Gera MX', 'Se me olvida'),
    },
    {
      id: 'song-soledad-santa-fe', cat: 'song-rap', franchise: 'Santa Fe Klan', game: 'Soledad',
      title: 'Soledad', year: 2021, lang: 'es',
      sources: busca('Santa Fe Klan', 'Soledad'),
    },
    {
      id: 'song-mar-y-tierra', cat: 'song-rap', franchise: 'Santa Fe Klan', game: 'Mar y tierra',
      title: 'Mar y tierra', year: 2022, lang: 'es',
      sources: busca('Santa Fe Klan', 'Mar y tierra'),
    },
    {
      id: 'song-te-ire-a-buscar', cat: 'song-rap', franchise: 'Santa Fe Klan', game: 'Te iré a buscar',
      title: 'Te iré a buscar', year: 2021, lang: 'es',
      sources: busca('Santa Fe Klan', 'Te iré a buscar'),
    },
    {
      id: 'song-cuidando-el-territorio', cat: 'song-rap', franchise: 'Santa Fe Klan y Calibre 50', game: 'Cuidando el territorio',
      title: 'Cuidando el territorio', year: 2021, lang: 'es',
      sources: busca('Santa Fe Klan y Calibre 50', 'Cuidando el territorio'),
    },
    {
      id: 'song-efectos-vocales-nach', cat: 'song-rap', franchise: 'Nach', game: 'Efectos vocales',
      title: 'Efectos vocales', year: 2008, lang: 'es',
      sources: busca('Nach', 'Efectos vocales'),
    },
    {
      id: 'song-manifiesto-nach', cat: 'song-rap', franchise: 'Nach', game: 'Manifiesto',
      title: 'Manifiesto', year: 2008, lang: 'es',
      sources: busca('Nach', 'Manifiesto'),
    },
    {
      id: 'song-el-idioma-de-los-dioses', cat: 'song-rap', franchise: 'Nach', game: 'El idioma de los dioses',
      title: 'El idioma de los dioses', year: 2011, lang: 'es',
      sources: busca('Nach', 'El idioma de los dioses'),
    },
    {
      id: 'song-chico-problematico-nach', cat: 'song-rap', franchise: 'Nach', game: 'Chico problemático',
      title: 'Chico problemático', year: 2003, lang: 'es',
      sources: busca('Nach', 'Chico problemático'),
    },
    {
      id: 'song-amor-libre-nach', cat: 'song-rap', franchise: 'Nach', game: 'Amor libre',
      title: 'Amor libre', year: 2008, lang: 'es',
      sources: busca('Nach', 'Amor libre'),
    },
    {
      id: 'song-cantando-violadores', cat: 'song-rap', franchise: 'Violadores del Verso', game: 'Cantando',
      title: 'Cantando', year: 2006, lang: 'es',
      sources: busca('Violadores del Verso', 'Cantando'),
    },
    {
      id: 'song-vivir-para-contarlo', cat: 'song-rap', franchise: 'Violadores del Verso', game: 'Vivir para contarlo',
      title: 'Vivir para contarlo', year: 2006, lang: 'es',
      sources: busca('Violadores del Verso', 'Vivir para contarlo'),
    },
    {
      id: 'song-ballantines-violadores', cat: 'song-rap', franchise: 'Violadores del Verso', game: 'Ballantines',
      title: 'Ballantines', year: 2001, lang: 'es',
      sources: busca('Violadores del Verso', 'Ballantines'),
    },
    {
      id: 'song-maximo-exponente', cat: 'song-rap', franchise: 'Violadores del Verso', game: 'Máximo exponente',
      title: 'Máximo exponente', year: 2001, lang: 'es',
      sources: busca('Violadores del Verso', 'Máximo exponente'),
    },
    {
      id: 'song-javier-ibarra-kaseo', cat: 'song-rap', franchise: 'Kase.O', game: 'Yemen',
      title: 'Yemen', year: 2016, lang: 'es',
      sources: busca('Kase.O', 'Yemen'),
    },
    {
      id: 'song-mitad-y-mitad-kaseo', cat: 'song-rap', franchise: 'Kase.O', game: 'Mitad y mitad',
      title: 'Mitad y mitad', year: 2016, lang: 'es',
      sources: busca('Kase.O', 'Mitad y mitad'),
    },
    {
      id: 'song-mazas-y-catapultas', cat: 'song-rap', franchise: 'Kase.O', game: 'Mazas y catapultas',
      title: 'Mazas y catapultas', year: 2016, lang: 'es',
      sources: busca('Kase.O', 'Mazas y catapultas'),
    },
    {
      id: 'song-el-circulo-kaseo', cat: 'song-rap', franchise: 'Kase.O', game: 'Esto no para',
      title: 'Esto no para', year: 2015, lang: 'es',
      sources: busca('Kase.O', 'Esto no para'),
    },
    {
      id: 'song-ringui-dingui-sfdk', cat: 'song-rap', franchise: 'SFDK', game: 'Ringui Dingui',
      title: 'Ringui Dingui', year: 2021, lang: 'es',
      sources: busca('SFDK', 'Ringui Dingui'),
    },
    {
      id: 'song-el-liricista-en-el-tejado', cat: 'song-rap', franchise: 'SFDK', game: 'El liricista en el tejado',
      title: 'El liricista en el tejado', year: 2005, lang: 'es',
      sources: busca('SFDK', 'El liricista en el tejado'),
    },
    {
      id: 'song-donde-esta-wally-sfdk', cat: 'song-rap', franchise: 'SFDK', game: '¿Dónde está Wifly?',
      title: '¿Dónde está Wifly?', year: 2003, lang: 'es',
      sources: busca('SFDK', '¿Dónde está Wifly?'),
    },
    {
      id: 'song-agua-pasada-sfdk', cat: 'song-rap', franchise: 'SFDK', game: 'Agua pasada',
      title: 'Agua pasada', year: 2014, lang: 'es',
      sources: busca('SFDK', 'Agua pasada'),
    },
    {
      id: 'song-jeremias-17-5', cat: 'song-rap', franchise: 'Canserbero', game: 'Jeremías 17-5',
      title: 'Jeremías 17-5', year: 2012, lang: 'es',
      sources: busca('Canserbero', 'Jeremías 17-5'),
    },
    {
      id: 'song-pensando-en-ti-canserbero', cat: 'song-rap', franchise: 'Canserbero', game: 'Pensando en ti',
      title: 'Pensando en ti', year: 2010, lang: 'es',
      sources: busca('Canserbero', 'Pensando en ti'),
    },
    {
      id: 'song-mundo-de-piedra', cat: 'song-rap', franchise: 'Canserbero', game: 'Mundo de piedra',
      title: 'Mundo de piedra', year: 2012, lang: 'es',
      sources: busca('Canserbero', 'Mundo de piedra'),
    },
    {
      id: 'song-stupid-love-story', cat: 'song-rap', franchise: 'Canserbero', game: 'Stupid Love Story',
      title: 'Stupid Love Story', year: 2011, lang: 'es',
      sources: busca('Canserbero', 'Stupid Love Story'),
    },
    {
      id: 'song-guia-para-la-accion', cat: 'song-rap', franchise: 'Canserbero', game: 'Guía para la acción',
      title: 'Guía para la acción', year: 2010, lang: 'es',
      sources: busca('Canserbero', 'Guía para la acción'),
    },
    {
      id: 'song-la-muerte-residente', cat: 'song-rap', franchise: 'Residente', game: 'La cátedra',
      title: 'La cátedra', year: 2017, lang: 'es',
      sources: busca('Residente', 'La cátedra'),
    },
    {
      id: 'song-bellacoso-residente', cat: 'song-rap', franchise: 'Residente y Bad Bunny', game: 'Bellacoso',
      title: 'Bellacoso', year: 2019, lang: 'es',
      sources: busca('Residente y Bad Bunny', 'Bellacoso'),
    },
    {
      id: 'song-hijos-del-canaveral', cat: 'song-rap', franchise: 'Residente', game: 'Hijos del cañaveral',
      title: 'Hijos del cañaveral', year: 2017, lang: 'es',
      sources: busca('Residente', 'Hijos del cañaveral'),
    },
    {
      id: 'song-flow-hp-residente', cat: 'song-rap', franchise: 'Residente', game: 'Flow HP',
      title: 'Flow HP', year: 2021, lang: 'es',
      sources: busca('Residente', 'Flow HP'),
    },
    {
      id: 'song-bizarrap-residente-sesion', cat: 'song-rap', franchise: 'Bizarrap y Residente', game: 'Residente: Bzrp Music Sessions, Vol. 49',
      title: 'Residente: Bzrp Music Sessions, Vol. 49', year: 2022, lang: 'es',
      sources: busca('Bizarrap y Residente', 'Residente: Bzrp Music Sessions, Vol. 49'),
    },
    {
      id: 'song-arrancarmelo-wos', cat: 'song-rap', franchise: 'Wos', game: 'Arrancármelo',
      title: 'Arrancármelo', year: 2022, lang: 'es',
      sources: busca('Wos', 'Arrancármelo'),
    },
    {
      id: 'song-melocoton-wos', cat: 'song-rap', franchise: 'Wos', game: 'Melón vino',
      title: 'Melón vino', year: 2019, lang: 'es',
      sources: busca('Wos', 'Melón vino'),
    },
    {
      id: 'song-terraza-wos', cat: 'song-rap', franchise: 'Wos', game: 'Terraza',
      title: 'Terraza', year: 2019, lang: 'es',
      sources: busca('Wos', 'Terraza'),
    },
    {
      id: 'song-purpura-wos', cat: 'song-rap', franchise: 'Wos', game: 'Púrpura',
      title: 'Púrpura', year: 2018, lang: 'es',
      sources: busca('Wos', 'Púrpura'),
    },
    {
      id: 'song-mami-chula-trueno', cat: 'song-rap', franchise: 'Trueno y Nicki Nicole', game: 'Mamichula',
      title: 'Mamichula', year: 2020, lang: 'es',
      sources: busca('Trueno y Nicki Nicole', 'Mamichula'),
    },
    {
      id: 'song-atrevido-trueno', cat: 'song-rap', franchise: 'Trueno', game: 'Atrevido',
      title: 'Atrevido', year: 2020, lang: 'es',
      sources: busca('Trueno', 'Atrevido'),
    },
    {
      id: 'song-tranky-funky-trueno', cat: 'song-rap', franchise: 'Trueno', game: 'Tranky Funky',
      title: 'Tranky Funky', year: 2023, lang: 'es',
      sources: busca('Trueno', 'Tranky Funky'),
    },
    {
      id: 'song-mal-beco-duki', cat: 'song-rap', franchise: 'Duki', game: 'Malbec',
      title: 'Malbec', year: 2021, lang: 'es',
      sources: busca('Duki', 'Malbec'),
    },
    {
      id: 'song-si-te-sentis-sola', cat: 'song-rap', franchise: 'Duki', game: 'Si te sentís sola',
      title: 'Si te sentís sola', year: 2018, lang: 'es',
      sources: busca('Duki', 'Si te sentís sola'),
    },
    {
      id: 'song-hijo-de-la-noche', cat: 'song-rap', franchise: 'Duki, Ysy A y Neo Pistea', game: 'Hijo de la noche',
      title: 'Hijo de la noche', year: 2018, lang: 'es',
      sources: busca('Duki, Ysy A y Neo Pistea', 'Hijo de la noche'),
    },
    {
      id: 'song-tumbando-el-club', cat: 'song-rap', franchise: 'Neo Pistea', game: 'Tumbando el club (Remix)',
      title: 'Tumbando el club (Remix)', year: 2019, lang: 'es',
      sources: busca('Neo Pistea', 'Tumbando el club (Remix)'),
    },
    {
      id: 'song-nena-maldicion-paulo', cat: 'song-rap', franchise: 'Paulo Londra', game: 'Nena maldición',
      title: 'Nena maldición', year: 2018, lang: 'es',
      sources: busca('Paulo Londra', 'Nena maldición'),
    },
    {
      id: 'song-adan-y-eva-paulo', cat: 'song-rap', franchise: 'Paulo Londra', game: 'Adán y Eva',
      title: 'Adán y Eva', year: 2018, lang: 'es',
      sources: busca('Paulo Londra', 'Adán y Eva'),
    },
    {
      id: 'song-tal-vez-paulo', cat: 'song-rap', franchise: 'Paulo Londra', game: 'Tal vez',
      title: 'Tal vez', year: 2019, lang: 'es',
      sources: busca('Paulo Londra', 'Tal vez'),
    },
    {
      id: 'song-chica-paranormal', cat: 'song-rap', franchise: 'Paulo Londra', game: 'Chica paranormal',
      title: 'Chica paranormal', year: 2018, lang: 'es',
      sources: busca('Paulo Londra', 'Chica paranormal'),
    },
    {
      id: 'song-quien-manda-aqui-mala', cat: 'song-rap', franchise: 'Mala Rodríguez', game: '¿Quién manda aquí?',
      title: '¿Quién manda aquí?', year: 2003, lang: 'es',
      sources: busca('Mala Rodríguez', '¿Quién manda aquí?'),
    },
    {
      id: 'song-tengo-un-trato-mala', cat: 'song-rap', franchise: 'Mala Rodríguez', game: 'Tengo un trato',
      title: 'Tengo un trato', year: 2000, lang: 'es',
      sources: busca('Mala Rodríguez', 'Tengo un trato'),
    },
    {
      id: 'song-por-la-noche-mala', cat: 'song-rap', franchise: 'Mala Rodríguez', game: 'Por la noche',
      title: 'Por la noche', year: 2006, lang: 'es',
      sources: busca('Mala Rodríguez', 'Por la noche'),
    },
    {
      id: 'song-1977-ana-tijoux', cat: 'song-rap', franchise: 'Ana Tijoux', game: '1977',
      title: '1977', year: 2009, lang: 'es',
      sources: busca('Ana Tijoux', '1977'),
    },
    {
      id: 'song-shock-ana-tijoux', cat: 'song-rap', franchise: 'Ana Tijoux', game: 'Shock',
      title: 'Shock', year: 2011, lang: 'es',
      sources: busca('Ana Tijoux', 'Shock'),
    },
    {
      id: 'song-antipatriarca-ana-tijoux', cat: 'song-rap', franchise: 'Ana Tijoux', game: 'Antipatriarca',
      title: 'Antipatriarca', year: 2014, lang: 'es',
      sources: busca('Ana Tijoux', 'Antipatriarca'),
    },
    {
      id: 'song-el-solitario-portavoz', cat: 'song-rap', franchise: 'Portavoz', game: 'El otro Chile',
      title: 'El otro Chile', year: 2012, lang: 'es',
      sources: busca('Portavoz', 'El otro Chile'),
    },
    {
      id: 'song-donde-empieza-rels-b', cat: 'song-rap', franchise: 'Rels B', game: 'A mí',
      title: 'A mí', year: 2019, lang: 'es',
      sources: busca('Rels B', 'A mí'),
    },
    {
      id: 'song-como-dormiste-rels-b', cat: 'song-rap', franchise: 'Rels B', game: 'cómo dormiste?',
      title: 'cómo dormiste?', year: 2022, lang: 'es',
      sources: busca('Rels B', 'cómo dormiste?'),
    },
    {
      id: 'song-buenos-genes-rels-b', cat: 'song-rap', franchise: 'Rels B', game: 'Buenos genes',
      title: 'Buenos genes', year: 2018, lang: 'es',
      sources: busca('Rels B', 'Buenos genes'),
    },
    {
      id: 'song-rincon-flakko-milo-j', cat: 'song-rap', franchise: 'Milo J', game: 'Rara vez',
      title: 'Rara vez', year: 2023, lang: 'es',
      sources: busca('Milo J', 'Rara vez'),
    },
    {
      id: 'song-milagrosa-milo-j', cat: 'song-rap', franchise: 'Milo J', game: 'Milagrosa',
      title: 'Milagrosa', year: 2022, lang: 'es',
      sources: busca('Milo J', 'Milagrosa'),
    },
    {
      id: 'song-sesion-milo-j-bizarrap', cat: 'song-rap', franchise: 'Bizarrap y Milo J', game: 'Milo J: Bzrp Music Sessions, Vol. 57',
      title: 'Milo J: Bzrp Music Sessions, Vol. 57', year: 2023, lang: 'es',
      sources: busca('Bizarrap y Milo J', 'Milo J: Bzrp Music Sessions, Vol. 57'),
    },
    {
      id: 'song-wapo-traketero-nicki', cat: 'song-rap', franchise: 'Nicki Nicole', game: 'Wapo traketero',
      title: 'Wapo traketero', year: 2019, lang: 'es',
      sources: busca('Nicki Nicole', 'Wapo traketero'),
    },
    {
      id: 'song-ny-state-of-mind', cat: 'song-rap', franchise: 'Nas', game: 'N.Y. State of Mind',
      title: 'N.Y. State of Mind', year: 1994, lang: 'en',
      sources: busca('Nas', 'N.Y. State of Mind'),
    },
    {
      id: 'song-if-i-ruled-the-world', cat: 'song-rap', franchise: 'Nas y Lauryn Hill', game: 'If I Ruled the World (Imagine That)',
      title: 'If I Ruled the World (Imagine That)', year: 1996, lang: 'en',
      sources: busca('Nas y Lauryn Hill', 'If I Ruled the World (Imagine That)'),
    },
    {
      id: 'song-shimmy-shimmy-ya', cat: 'song-rap', franchise: 'Ol\' Dirty Bastard', game: 'Shimmy Shimmy Ya',
      title: 'Shimmy Shimmy Ya', year: 1995, lang: 'en',
      sources: busca('Ol\' Dirty Bastard', 'Shimmy Shimmy Ya'),
    },
    {
      id: 'song-reppin-time', cat: 'song-rap', franchise: 'Jim Jones', game: 'We Fly High',
      title: 'We Fly High', year: 2006, lang: 'en',
      sources: busca('Jim Jones', 'We Fly High'),
    },
    {
      id: 'song-in-paris-jayz-kanye', cat: 'song-rap', franchise: 'JAY-Z y Kanye West', game: 'Ni**as in Paris',
      title: 'Ni**as in Paris', year: 2011, lang: 'en',
      sources: busca('JAY-Z y Kanye West', 'Ni**as in Paris'),
    },
    {
      id: 'song-no-church-in-the-wild', cat: 'song-rap', franchise: 'JAY-Z y Kanye West', game: 'No Church in the Wild',
      title: 'No Church in the Wild', year: 2011, lang: 'en',
      sources: busca('JAY-Z y Kanye West', 'No Church in the Wild'),
    },
    {
      id: 'song-hard-knock-life', cat: 'song-rap', franchise: 'JAY-Z', game: 'Hard Knock Life (Ghetto Anthem)',
      title: 'Hard Knock Life (Ghetto Anthem)', year: 1998, lang: 'en',
      sources: busca('JAY-Z', 'Hard Knock Life (Ghetto Anthem)'),
    },
    {
      id: 'song-p-i-m-p-50-cent', cat: 'song-rap', franchise: '50 Cent', game: 'P.I.M.P.',
      title: 'P.I.M.P.', year: 2003, lang: 'en',
      sources: busca('50 Cent', 'P.I.M.P.'),
    },
    {
      id: 'song-many-men-50-cent', cat: 'song-rap', franchise: '50 Cent', game: 'Many Men (Wish Death)',
      title: 'Many Men (Wish Death)', year: 2003, lang: 'en',
      sources: busca('50 Cent', 'Many Men (Wish Death)'),
    },
    {
      id: 'song-my-name-is-eminem', cat: 'song-rap', franchise: 'Eminem', game: 'My Name Is',
      title: 'My Name Is', year: 1999, lang: 'en',
      sources: busca('Eminem', 'My Name Is'),
    },
    {
      id: 'song-cleanin-out-my-closet', cat: 'song-rap', franchise: 'Eminem', game: 'Cleanin\' Out My Closet',
      title: 'Cleanin\' Out My Closet', year: 2002, lang: 'en',
      sources: busca('Eminem', 'Cleanin\' Out My Closet'),
    },
    {
      id: 'song-sing-for-the-moment', cat: 'song-rap', franchise: 'Eminem', game: 'Sing for the Moment',
      title: 'Sing for the Moment', year: 2002, lang: 'en',
      sources: busca('Eminem', 'Sing for the Moment'),
    },
    {
      id: 'song-money-trees-kendrick', cat: 'song-rap', franchise: 'Kendrick Lamar', game: 'Money Trees',
      title: 'Money Trees', year: 2012, lang: 'en',
      sources: busca('Kendrick Lamar', 'Money Trees'),
    },
    {
      id: 'song-bitch-dont-kill-my-vibe', cat: 'song-rap', franchise: 'Kendrick Lamar', game: 'Bitch, Don\'t Kill My Vibe',
      title: 'Bitch, Don\'t Kill My Vibe', year: 2012, lang: 'en',
      sources: busca('Kendrick Lamar', 'Bitch, Don\'t Kill My Vibe'),
    },
    {
      id: 'song-no-role-modelz-j-cole', cat: 'song-rap', franchise: 'J. Cole', game: 'No Role Modelz',
      title: 'No Role Modelz', year: 2014, lang: 'en',
      sources: busca('J. Cole', 'No Role Modelz'),
    },
    {
      id: 'song-middle-child-j-cole', cat: 'song-rap', franchise: 'J. Cole', game: 'MIDDLE CHILD',
      title: 'MIDDLE CHILD', year: 2019, lang: 'en',
      sources: busca('J. Cole', 'MIDDLE CHILD'),
    },
    {
      id: 'song-goya-travis-scott', cat: 'song-rap', franchise: 'Travis Scott', game: 'Antidote',
      title: 'Antidote', year: 2015, lang: 'en',
      sources: busca('Travis Scott', 'Antidote'),
    },
    {
      id: 'song-highest-in-the-room', cat: 'song-rap', franchise: 'Travis Scott', game: 'HIGHEST IN THE ROOM',
      title: 'HIGHEST IN THE ROOM', year: 2019, lang: 'en',
      sources: busca('Travis Scott', 'HIGHEST IN THE ROOM'),
    },
    {
      id: 'song-congratulations-post', cat: 'song-rap', franchise: 'Post Malone', game: 'Congratulations',
      title: 'Congratulations', year: 2016, lang: 'en',
      sources: busca('Post Malone', 'Congratulations'),
    },
    {
      id: 'song-white-iverson', cat: 'song-rap', franchise: 'Post Malone', game: 'White Iverson',
      title: 'White Iverson', year: 2015, lang: 'en',
      sources: busca('Post Malone', 'White Iverson'),
    },
    /* ───────────── Reggaetón (100) ───────────── */
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
    {
      id: 'song-dale-don-dale', cat: 'song-reggaeton', franchise: 'Don Omar', game: 'Dale Don Dale',
      title: 'Dale Don Dale', year: 2003, lang: 'es',
      sources: busca('Don Omar', 'Dale Don Dale'),
    },
    {
      id: 'song-baila-morena', cat: 'song-reggaeton', franchise: 'Héctor & Tito', game: 'Baila morena',
      title: 'Baila morena', year: 2004, lang: 'es',
      sources: busca('Héctor & Tito', 'Baila morena'),
    },
    {
      id: 'song-rompe', cat: 'song-reggaeton', franchise: 'Daddy Yankee', game: 'Rompe',
      title: 'Rompe', year: 2005, lang: 'es',
      sources: busca('Daddy Yankee', 'Rompe'),
    },
    {
      id: 'song-ella-me-levanto', cat: 'song-reggaeton', franchise: 'Daddy Yankee', game: 'Ella me levantó',
      title: 'Ella me levantó', year: 2007, lang: 'es',
      sources: busca('Daddy Yankee', 'Ella me levantó'),
    },
    {
      id: 'song-llamado-de-emergencia', cat: 'song-reggaeton', franchise: 'Daddy Yankee', game: 'Llamado de emergencia',
      title: 'Llamado de emergencia', year: 2008, lang: 'es',
      sources: busca('Daddy Yankee', 'Llamado de emergencia'),
    },
    {
      id: 'song-mayor-que-yo', cat: 'song-reggaeton', franchise: 'Luny Tunes', game: 'Mayor que yo',
      title: 'Mayor que yo', year: 2005, lang: 'es',
      sources: busca('Luny Tunes', 'Mayor que yo'),
    },
    {
      id: 'song-noche-de-sexo', cat: 'song-reggaeton', franchise: 'Wisin & Yandel', game: 'Noche de sexo',
      title: 'Noche de sexo', year: 2005, lang: 'es',
      sources: busca('Wisin & Yandel', 'Noche de sexo'),
    },
    {
      id: 'song-pam-pam', cat: 'song-reggaeton', franchise: 'Wisin & Yandel', game: 'Pam Pam',
      title: 'Pam Pam', year: 2006, lang: 'es',
      sources: busca('Wisin & Yandel', 'Pam Pam'),
    },
    {
      id: 'song-sexy-movimiento', cat: 'song-reggaeton', franchise: 'Wisin & Yandel', game: 'Sexy movimiento',
      title: 'Sexy movimiento', year: 2007, lang: 'es',
      sources: busca('Wisin & Yandel', 'Sexy movimiento'),
    },
    {
      id: 'song-abusadora', cat: 'song-reggaeton', franchise: 'Wisin & Yandel', game: 'Abusadora',
      title: 'Abusadora', year: 2009, lang: 'es',
      sources: busca('Wisin & Yandel', 'Abusadora'),
    },
    {
      id: 'song-5-letras', cat: 'song-reggaeton', franchise: 'Alexis & Fido', game: '5 letras',
      title: '5 letras', year: 2007, lang: 'es',
      sources: busca('Alexis & Fido', '5 letras'),
    },
    {
      id: 'song-una-en-un-millon', cat: 'song-reggaeton', franchise: 'Alexis & Fido', game: 'Una en un millón',
      title: 'Una en un millón', year: 2016, lang: 'es',
      sources: busca('Alexis & Fido', 'Una en un millón'),
    },
    {
      id: 'song-fanatica-sensual', cat: 'song-reggaeton', franchise: 'Plan B', game: 'Fanática sensual',
      title: 'Fanática sensual', year: 2014, lang: 'es',
      sources: busca('Plan B', 'Fanática sensual'),
    },
    {
      id: 'song-candy-plan-b', cat: 'song-reggaeton', franchise: 'Plan B', game: 'Candy',
      title: 'Candy', year: 2013, lang: 'es',
      sources: busca('Plan B', 'Candy'),
    },
    {
      id: 'song-si-no-le-contesto', cat: 'song-reggaeton', franchise: 'Plan B', game: 'Si no le contesto',
      title: 'Si no le contesto', year: 2010, lang: 'es',
      sources: busca('Plan B', 'Si no le contesto'),
    },
    {
      id: 'song-yo-voy', cat: 'song-reggaeton', franchise: 'Zion & Lennox', game: 'Yo voy',
      title: 'Yo voy', year: 2004, lang: 'es',
      sources: busca('Zion & Lennox', 'Yo voy'),
    },
    {
      id: 'song-ven-bailalo', cat: 'song-reggaeton', franchise: 'Ángel & Khriz', game: 'Ven báilalo',
      title: 'Ven báilalo', year: 2004, lang: 'es',
      sources: busca('Ángel & Khriz', 'Ven báilalo'),
    },
    {
      id: 'song-el-amor-tito', cat: 'song-reggaeton', franchise: 'Tito El Bambino', game: 'El amor',
      title: 'El amor', year: 2009, lang: 'es',
      sources: busca('Tito El Bambino', 'El amor'),
    },
    {
      id: 'song-siente-el-boom', cat: 'song-reggaeton', franchise: 'Tito El Bambino', game: 'Siente el boom',
      title: 'Siente el boom', year: 2006, lang: 'es',
      sources: busca('Tito El Bambino', 'Siente el boom'),
    },
    {
      id: 'song-el-doctorado', cat: 'song-reggaeton', franchise: 'Tony Dize', game: 'El doctorado',
      title: 'El doctorado', year: 2009, lang: 'es',
      sources: busca('Tony Dize', 'El doctorado'),
    },
    {
      id: 'song-down-rkm-ken-y', cat: 'song-reggaeton', franchise: 'R.K.M & Ken-Y', game: 'Down',
      title: 'Down', year: 2006, lang: 'es',
      sources: busca('R.K.M & Ken-Y', 'Down'),
    },
    {
      id: 'song-me-matas-rkm', cat: 'song-reggaeton', franchise: 'R.K.M & Ken-Y', game: 'Me matas',
      title: 'Me matas', year: 2006, lang: 'es',
      sources: busca('R.K.M & Ken-Y', 'Me matas'),
    },
    {
      id: 'song-la-pregunta', cat: 'song-reggaeton', franchise: 'J Álvarez', game: 'La pregunta',
      title: 'La pregunta', year: 2011, lang: 'es',
      sources: busca('J Álvarez', 'La pregunta'),
    },
    {
      id: 'song-passion-whine', cat: 'song-reggaeton', franchise: 'Farruko', game: 'Passion Whine',
      title: 'Passion Whine', year: 2014, lang: 'es',
      sources: busca('Farruko', 'Passion Whine'),
    },
    {
      id: 'song-chillax', cat: 'song-reggaeton', franchise: 'Farruko', game: 'Chillax',
      title: 'Chillax', year: 2016, lang: 'es',
      sources: busca('Farruko', 'Chillax'),
    },
    {
      id: 'song-travesuras-nicky', cat: 'song-reggaeton', franchise: 'Nicky Jam', game: 'Travesuras',
      title: 'Travesuras', year: 2014, lang: 'es',
      sources: busca('Nicky Jam', 'Travesuras'),
    },
    {
      id: 'song-x-nicky-jam', cat: 'song-reggaeton', franchise: 'Nicky Jam y J Balvin', game: 'X',
      title: 'X', year: 2018, lang: 'es',
      sources: busca('Nicky Jam', 'X'),
    },
    {
      id: 'song-6-am', cat: 'song-reggaeton', franchise: 'J Balvin', game: '6 AM',
      title: '6 AM', year: 2014, lang: 'es',
      sources: busca('J Balvin', '6 AM'),
    },
    {
      id: 'song-bobo-j-balvin', cat: 'song-reggaeton', franchise: 'J Balvin', game: 'Bobo',
      title: 'Bobo', year: 2016, lang: 'es',
      sources: busca('J Balvin', 'Bobo'),
    },
    {
      id: 'song-rojo-j-balvin', cat: 'song-reggaeton', franchise: 'J Balvin', game: 'Rojo',
      title: 'Rojo', year: 2020, lang: 'es',
      sources: busca('J Balvin', 'Rojo'),
    },
    {
      id: 'song-borro-cassette', cat: 'song-reggaeton', franchise: 'Maluma', game: 'Borró cassette',
      title: 'Borró cassette', year: 2015, lang: 'es',
      sources: busca('Maluma', 'Borró cassette'),
    },
    {
      id: 'song-sobrio-maluma', cat: 'song-reggaeton', franchise: 'Maluma', game: 'Sobrio',
      title: 'Sobrio', year: 2021, lang: 'es',
      sources: busca('Maluma', 'Sobrio'),
    },
    {
      id: 'song-dile-que-tu-me-quieres', cat: 'song-reggaeton', franchise: 'Ozuna', game: 'Dile que tú me quieres',
      title: 'Dile que tú me quieres', year: 2016, lang: 'es',
      sources: busca('Ozuna', 'Dile que tú me quieres'),
    },
    {
      id: 'song-tu-foto-ozuna', cat: 'song-reggaeton', franchise: 'Ozuna', game: 'Tu foto',
      title: 'Tu foto', year: 2017, lang: 'es',
      sources: busca('Ozuna', 'Tu foto'),
    },
    {
      id: 'song-caramelo-ozuna', cat: 'song-reggaeton', franchise: 'Ozuna', game: 'Caramelo',
      title: 'Caramelo', year: 2020, lang: 'es',
      sources: busca('Ozuna', 'Caramelo'),
    },
    {
      id: 'song-chambea', cat: 'song-reggaeton', franchise: 'Bad Bunny', game: 'Chambea',
      title: 'Chambea', year: 2017, lang: 'es',
      sources: busca('Bad Bunny', 'Chambea'),
    },
    {
      id: 'song-amorfoda', cat: 'song-reggaeton', franchise: 'Bad Bunny', game: 'Amorfoda',
      title: 'Amorfoda', year: 2018, lang: 'es',
      sources: busca('Bad Bunny', 'Amorfoda'),
    },
    {
      id: 'song-moscu-mule', cat: 'song-reggaeton', franchise: 'Bad Bunny', game: 'Moscú Mule',
      title: 'Moscú Mule', year: 2022, lang: 'es',
      sources: busca('Bad Bunny', 'Moscú Mule'),
    },
    {
      id: 'song-monaco-bad-bunny', cat: 'song-reggaeton', franchise: 'Bad Bunny', game: 'Monaco',
      title: 'Monaco', year: 2023, lang: 'es',
      sources: busca('Bad Bunny', 'Monaco'),
    },
    {
      id: 'song-mi-cama', cat: 'song-reggaeton', franchise: 'Karol G', game: 'Mi cama',
      title: 'Mi cama', year: 2018, lang: 'es',
      sources: busca('Karol G', 'Mi cama'),
    },
    {
      id: 'song-cairo-karol-g', cat: 'song-reggaeton', franchise: 'Karol G', game: 'Cairo',
      title: 'Cairo', year: 2022, lang: 'es',
      sources: busca('Karol G', 'Cairo'),
    },
    {
      id: 'song-amargura', cat: 'song-reggaeton', franchise: 'Karol G', game: 'Amargura',
      title: 'Amargura', year: 2023, lang: 'es',
      sources: busca('Karol G', 'Amargura'),
    },
    {
      id: 'song-desesperados', cat: 'song-reggaeton', franchise: 'Rauw Alejandro y Chencho Corleone', game: 'Desesperados',
      title: 'Desesperados', year: 2021, lang: 'es',
      sources: busca('Rauw Alejandro', 'Desesperados'),
    },
    {
      id: 'song-punto-40', cat: 'song-reggaeton', franchise: 'Rauw Alejandro', game: 'Punto 40',
      title: 'Punto 40', year: 2022, lang: 'es',
      sources: busca('Rauw Alejandro', 'Punto 40'),
    },
    {
      id: 'song-normal-feid', cat: 'song-reggaeton', franchise: 'Feid', game: 'Normal',
      title: 'Normal', year: 2022, lang: 'es',
      sources: busca('Feid', 'Normal'),
    },
    {
      id: 'song-yandel-150', cat: 'song-reggaeton', franchise: 'Yandel y Feid', game: 'Yandel 150',
      title: 'Yandel 150', year: 2022, lang: 'es',
      sources: busca('Yandel', 'Yandel 150'),
    },
    {
      id: 'song-luna-feid', cat: 'song-reggaeton', franchise: 'Feid', game: 'Luna',
      title: 'Luna', year: 2023, lang: 'es',
      sources: busca('Feid', 'Luna'),
    },
    {
      id: 'song-lala-myke-towers', cat: 'song-reggaeton', franchise: 'Myke Towers', game: 'LALA',
      title: 'LALA', year: 2023, lang: 'es',
      sources: busca('Myke Towers', 'LALA'),
    },
    {
      id: 'song-una-lady-como-tu', cat: 'song-reggaeton', franchise: 'Manuel Turizo', game: 'Una Lady Como Tú',
      title: 'Una Lady Como Tú', year: 2016, lang: 'es',
      sources: busca('Manuel Turizo', 'Una Lady Como Tú'),
    },
    {
      id: 'song-hola-perdida', cat: 'song-reggaeton', franchise: 'Luck Ra', game: 'Hola perdida',
      title: 'Hola perdida', year: 2024, lang: 'es',
      sources: busca('Luck Ra', 'Hola perdida'),
    },
    /* ───────────── Regional mexicano (100) ───────────── */
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
    {
      id: 'song-si-nos-dejan', cat: 'song-regional', franchise: 'José Alfredo Jiménez', game: 'Si nos dejan',
      title: 'Si nos dejan', year: 1966, lang: 'es',
      sources: busca('José Alfredo Jiménez', 'Si nos dejan'),
    },
    {
      id: 'song-ella-jose-alfredo', cat: 'song-regional', franchise: 'José Alfredo Jiménez', game: 'Ella',
      title: 'Ella', year: 1950, lang: 'es',
      sources: busca('José Alfredo Jiménez', 'Ella'),
    },
    {
      id: 'song-fallaste-corazon', cat: 'song-regional', franchise: 'Pedro Infante', game: 'Fallaste corazón',
      title: 'Fallaste corazón', year: 1954, lang: 'es',
      sources: busca('Pedro Infante', 'Fallaste corazón'),
    },
    {
      id: 'song-esclavo-y-amo', cat: 'song-regional', franchise: 'Javier Solís', game: 'Esclavo y amo',
      title: 'Esclavo y amo', year: 1962, lang: 'es',
      sources: busca('Javier Solís', 'Esclavo y amo'),
    },
    {
      id: 'song-albur-de-amor', cat: 'song-regional', franchise: 'Antonio Aguilar', game: 'Albur de amor',
      title: 'Albur de amor', year: 1980, lang: 'es',
      sources: busca('Antonio Aguilar', 'Albur de amor'),
    },
    {
      id: 'song-tristes-recuerdos', cat: 'song-regional', franchise: 'Antonio Aguilar', game: 'Tristes recuerdos',
      title: 'Tristes recuerdos', year: 1991, lang: 'es',
      sources: busca('Antonio Aguilar', 'Tristes recuerdos'),
    },
    {
      id: 'song-a-mi-manera-chente', cat: 'song-regional', franchise: 'Vicente Fernández', game: 'A mi manera',
      title: 'A mi manera', year: 1983, lang: 'es',
      sources: busca('Vicente Fernández', 'A mi manera'),
    },
    {
      id: 'song-aca-entre-nos', cat: 'song-regional', franchise: 'Vicente Fernández', game: 'Acá entre nos',
      title: 'Acá entre nos', year: 1992, lang: 'es',
      sources: busca('Vicente Fernández', 'Acá entre nos'),
    },
    {
      id: 'song-estos-celos', cat: 'song-regional', franchise: 'Vicente Fernández', game: 'Estos celos',
      title: 'Estos celos', year: 2007, lang: 'es',
      sources: busca('Vicente Fernández', 'Estos celos'),
    },
    {
      id: 'song-se-me-olvido-otra-vez', cat: 'song-regional', franchise: 'Juan Gabriel', game: 'Se me olvidó otra vez',
      title: 'Se me olvidó otra vez', year: 1974, lang: 'es',
      sources: busca('Juan Gabriel', 'Se me olvidó otra vez'),
    },
    {
      id: 'song-golpes-en-el-corazon', cat: 'song-regional', franchise: 'Los Tigres del Norte', game: 'Golpes en el corazón',
      title: 'Golpes en el corazón', year: 1995, lang: 'es',
      sources: busca('Los Tigres del Norte', 'Golpes en el corazón'),
    },
    {
      id: 'song-la-mesa-del-rincon', cat: 'song-regional', franchise: 'Los Tigres del Norte', game: 'La mesa del rincón',
      title: 'La mesa del rincón', year: 1997, lang: 'es',
      sources: busca('Los Tigres del Norte', 'La mesa del rincón'),
    },
    {
      id: 'song-el-tucanazo', cat: 'song-regional', franchise: 'Los Tucanes de Tijuana', game: 'El tucanazo',
      title: 'El tucanazo', year: 1995, lang: 'es',
      sources: busca('Los Tucanes de Tijuana', 'El tucanazo'),
    },
    {
      id: 'song-con-zapatos-de-tacon', cat: 'song-regional', franchise: 'Bronco', game: 'Con zapatos de tacón',
      title: 'Con zapatos de tacón', year: 1989, lang: 'es',
      sources: busca('Bronco', 'Con zapatos de tacón'),
    },
    {
      id: 'song-eres-un-sueno-temerarios', cat: 'song-regional', franchise: 'Los Temerarios', game: 'Eres un sueño',
      title: 'Eres un sueño', year: 1996, lang: 'es',
      sources: busca('Los Temerarios', 'Eres un sueño'),
    },
    {
      id: 'song-ven-porque-te-necesito', cat: 'song-regional', franchise: 'Los Temerarios', game: 'Ven porque te necesito',
      title: 'Ven porque te necesito', year: 1990, lang: 'es',
      sources: busca('Los Temerarios', 'Ven porque te necesito'),
    },
    {
      id: 'song-quiereme-bukis', cat: 'song-regional', franchise: 'Los Bukis', game: 'Quiéreme',
      title: 'Quiéreme', year: 1992, lang: 'es',
      sources: busca('Los Bukis', 'Quiéreme'),
    },
    {
      id: 'song-y-todo-para-que', cat: 'song-regional', franchise: 'Intocable', game: '¿Y todo para qué?',
      title: '¿Y todo para qué?', year: 1997, lang: 'es',
      sources: busca('Intocable', '¿Y todo para qué?'),
    },
    {
      id: 'song-fuerte-no-soy', cat: 'song-regional', franchise: 'Intocable', game: 'Fuerte no soy',
      title: 'Fuerte no soy', year: 2001, lang: 'es',
      sources: busca('Intocable', 'Fuerte no soy'),
    },
    {
      id: 'song-ensename-a-olvidarte', cat: 'song-regional', franchise: 'Intocable', game: 'Enséñame a olvidarte',
      title: 'Enséñame a olvidarte', year: 2000, lang: 'es',
      sources: busca('Intocable', 'Enséñame a olvidarte'),
    },
    {
      id: 'song-sentimientos-de-carton', cat: 'song-regional', franchise: 'Grupo Duelo', game: 'Sentimientos de cartón',
      title: 'Sentimientos de cartón', year: 2010, lang: 'es',
      sources: busca('Grupo Duelo', 'Sentimientos de cartón'),
    },
    {
      id: 'song-a-chillar-a-otra-parte', cat: 'song-regional', franchise: 'Pesado', game: 'A chillar a otra parte',
      title: 'A chillar a otra parte', year: 2004, lang: 'es',
      sources: busca('Pesado', 'A chillar a otra parte'),
    },
    {
      id: 'song-ojala-que-te-mueras', cat: 'song-regional', franchise: 'Pesado', game: 'Ojalá que te mueras',
      title: 'Ojalá que te mueras', year: 2007, lang: 'es',
      sources: busca('Pesado', 'Ojalá que te mueras'),
    },
    {
      id: 'song-te-presumo', cat: 'song-regional', franchise: 'Banda El Recodo', game: 'Te presumo',
      title: 'Te presumo', year: 2008, lang: 'es',
      sources: busca('Banda El Recodo', 'Te presumo'),
    },
    {
      id: 'song-pena-tras-pena', cat: 'song-regional', franchise: 'Banda El Recodo', game: 'Pena tras pena',
      title: 'Pena tras pena', year: 1999, lang: 'es',
      sources: busca('Banda El Recodo', 'Pena tras pena'),
    },
    {
      id: 'song-el-ruido-de-tus-zapatos', cat: 'song-regional', franchise: 'La Arrolladora Banda El Limón', game: 'El ruido de tus zapatos',
      title: 'El ruido de tus zapatos', year: 2013, lang: 'es',
      sources: busca('La Arrolladora Banda El Limón', 'El ruido de tus zapatos'),
    },
    {
      id: 'song-sobre-mis-pies', cat: 'song-regional', franchise: 'La Arrolladora Banda El Limón', game: 'Sobre mis pies',
      title: 'Sobre mis pies', year: 2007, lang: 'es',
      sources: busca('La Arrolladora Banda El Limón', 'Sobre mis pies'),
    },
    {
      id: 'song-belleza-de-cantina', cat: 'song-regional', franchise: 'Los Cardenales de Nuevo León', game: 'Belleza de cantina',
      title: 'Belleza de cantina', year: 2000, lang: 'es',
      sources: busca('Los Cardenales de Nuevo León', 'Belleza de cantina'),
    },
    {
      id: 'song-aguanta-corazon', cat: 'song-regional', franchise: 'Los Invasores de Nuevo León', game: 'Aguanta corazón',
      title: 'Aguanta corazón', year: 1987, lang: 'es',
      sources: busca('Los Invasores de Nuevo León', 'Aguanta corazón'),
    },
    {
      id: 'song-tragos-amargos', cat: 'song-regional', franchise: 'Ramón Ayala', game: 'Tragos amargos',
      title: 'Tragos amargos', year: 1980, lang: 'es',
      sources: busca('Ramón Ayala', 'Tragos amargos'),
    },
    {
      id: 'song-casas-de-madera', cat: 'song-regional', franchise: 'Ramón Ayala', game: 'Casas de madera',
      title: 'Casas de madera', year: 1998, lang: 'es',
      sources: busca('Ramón Ayala', 'Casas de madera'),
    },
    {
      id: 'song-alma-enamorada', cat: 'song-regional', franchise: 'Chalino Sánchez', game: 'Alma enamorada',
      title: 'Alma enamorada', year: 1992, lang: 'es',
      sources: busca('Chalino Sánchez', 'Alma enamorada'),
    },
    {
      id: 'song-vete-ya', cat: 'song-regional', franchise: 'Valentín Elizalde', game: 'Vete ya',
      title: 'Vete ya', year: 2003, lang: 'es',
      sources: busca('Valentín Elizalde', 'Vete ya'),
    },
    {
      id: 'song-como-me-duele', cat: 'song-regional', franchise: 'Valentín Elizalde', game: 'Como me duele',
      title: 'Como me duele', year: 2005, lang: 'es',
      sources: busca('Valentín Elizalde', 'Como me duele'),
    },
    {
      id: 'song-soy-asi-valentin', cat: 'song-regional', franchise: 'Valentín Elizalde', game: 'Soy así',
      title: 'Soy así', year: 2005, lang: 'es',
      sources: busca('Valentín Elizalde', 'Soy así'),
    },
    {
      id: 'song-inolvidable-jenni', cat: 'song-regional', franchise: 'Jenni Rivera', game: 'Inolvidable',
      title: 'Inolvidable', year: 2007, lang: 'es',
      sources: busca('Jenni Rivera', 'Inolvidable'),
    },
    {
      id: 'song-no-llega-el-olvido', cat: 'song-regional', franchise: 'Jenni Rivera', game: 'No llega el olvido',
      title: 'No llega el olvido', year: 2009, lang: 'es',
      sources: busca('Jenni Rivera', 'No llega el olvido'),
    },
    {
      id: 'song-terrenal-julion', cat: 'song-regional', franchise: 'Julión Álvarez', game: 'Terrenal',
      title: 'Terrenal', year: 2010, lang: 'es',
      sources: busca('Julión Álvarez', 'Terrenal'),
    },
    {
      id: 'song-el-amor-de-su-vida', cat: 'song-regional', franchise: 'Julión Álvarez', game: 'El amor de su vida',
      title: 'El amor de su vida', year: 2015, lang: 'es',
      sources: busca('Julión Álvarez', 'El amor de su vida'),
    },
    {
      id: 'song-si-te-pudiera-mentir', cat: 'song-regional', franchise: 'Calibre 50', game: 'Si te pudiera mentir',
      title: 'Si te pudiera mentir', year: 2018, lang: 'es',
      sources: busca('Calibre 50', 'Si te pudiera mentir'),
    },
    {
      id: 'song-no-te-contaron-mal', cat: 'song-regional', franchise: 'Christian Nodal', game: 'No te contaron mal',
      title: 'No te contaron mal', year: 2018, lang: 'es',
      sources: busca('Christian Nodal', 'No te contaron mal'),
    },
    {
      id: 'song-segun-quien', cat: 'song-regional', franchise: 'Carin León y Maluma', game: 'Según quién',
      title: 'Según quién', year: 2023, lang: 'es',
      sources: busca('Carin León', 'Según quién'),
    },
    {
      id: 'song-la-boda-del-huitlacoche', cat: 'song-regional', franchise: 'Carin León', game: 'La boda del Huitlacoche',
      title: 'La boda del Huitlacoche', year: 2022, lang: 'es',
      sources: busca('Carin León', 'La boda del Huitlacoche'),
    },
    {
      id: 'song-lady-gaga-peso-pluma', cat: 'song-regional', franchise: 'Peso Pluma, Gabito Ballesteros y Junior H', game: 'LADY GAGA',
      title: 'LADY GAGA', year: 2023, lang: 'es',
      sources: busca('Peso Pluma', 'LADY GAGA'),
    },
    {
      id: 'song-mi-bello-angel', cat: 'song-regional', franchise: 'Natanael Cano', game: 'Mi bello ángel',
      title: 'Mi bello ángel', year: 2023, lang: 'es',
      sources: busca('Natanael Cano', 'Mi bello ángel'),
    },
    {
      id: 'song-fin-de-semana-junior-h', cat: 'song-regional', franchise: 'Junior H y Oscar Maydon', game: 'Fin de semana',
      title: 'Fin de semana', year: 2023, lang: 'es',
      sources: busca('Junior H', 'Fin de semana'),
    },
    {
      id: 'song-el-gordo-trae-el-mando', cat: 'song-regional', franchise: 'Chino Pacas', game: 'El Gordo Trae El Mando',
      title: 'El Gordo Trae El Mando', year: 2023, lang: 'es',
      sources: busca('Chino Pacas', 'El Gordo Trae El Mando'),
    },
    {
      id: 'song-que-vuelvas', cat: 'song-regional', franchise: 'Carin León y Grupo Frontera', game: 'Que vuelvas',
      title: 'Que vuelvas', year: 2022, lang: 'es',
      sources: busca('Carin León', 'Que vuelvas'),
    },
    {
      id: 'song-harley-quinn', cat: 'song-regional', franchise: 'Fuerza Regida y Marshmello', game: 'HARLEY QUINN',
      title: 'HARLEY QUINN', year: 2023, lang: 'es',
      sources: busca('Fuerza Regida', 'HARLEY QUINN'),
    },
    {
      id: 'song-corazon-de-oro', cat: 'song-regional', franchise: 'Los Tigres del Norte', game: 'Corazón de oro',
      title: 'Corazón de oro', year: 1988, lang: 'es',
      sources: busca('Los Tigres del Norte', 'Corazón de oro'),
    },
    /* ───────────── Baladas (200) ───────────── */
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
    {
      id: 'song-un-beso-y-una-flor', cat: 'song-baladas', franchise: 'Nino Bravo', game: 'Un beso y una flor',
      title: 'Un beso y una flor', year: 1972, lang: 'es',
      sources: busca('Nino Bravo', 'Un beso y una flor'),
    },
    {
      id: 'song-el-gato-que-esta-triste-y-azul', cat: 'song-baladas', franchise: 'Roberto Carlos', game: 'El gato que está triste y azul',
      title: 'El gato que está triste y azul', year: 1972, lang: 'es',
      sources: busca('Roberto Carlos', 'El gato que está triste y azul'),
    },
    {
      id: 'song-amigo-roberto-carlos', cat: 'song-baladas', franchise: 'Roberto Carlos', game: 'Amigo',
      title: 'Amigo', year: 1977, lang: 'es',
      sources: busca('Roberto Carlos', 'Amigo'),
    },
    {
      id: 'song-algo-de-mi', cat: 'song-baladas', franchise: 'Camilo Sesto', game: 'Algo de mí',
      title: 'Algo de mí', year: 1971, lang: 'es',
      sources: busca('Camilo Sesto', 'Algo de mí'),
    },
    {
      id: 'song-jamas-camilo-sesto', cat: 'song-baladas', franchise: 'Camilo Sesto', game: 'Jamás',
      title: 'Jamás', year: 1975, lang: 'es',
      sources: busca('Camilo Sesto', 'Jamás'),
    },
    {
      id: 'song-40-y-20', cat: 'song-baladas', franchise: 'José José', game: '40 y 20',
      title: '40 y 20', year: 1992, lang: 'es',
      sources: busca('José José', '40 y 20'),
    },
    {
      id: 'song-desesperado-jose-jose', cat: 'song-baladas', franchise: 'José José', game: 'Desesperado',
      title: 'Desesperado', year: 1982, lang: 'es',
      sources: busca('José José', 'Desesperado'),
    },
    {
      id: 'song-vamos-a-darnos-tiempo', cat: 'song-baladas', franchise: 'José José', game: 'Vamos a darnos tiempo',
      title: 'Vamos a darnos tiempo', year: 1981, lang: 'es',
      sources: busca('José José', 'Vamos a darnos tiempo'),
    },
    {
      id: 'song-abrazame-muy-fuerte', cat: 'song-baladas', franchise: 'Juan Gabriel', game: 'Abrázame muy fuerte',
      title: 'Abrázame muy fuerte', year: 2000, lang: 'es',
      sources: busca('Juan Gabriel', 'Abrázame muy fuerte'),
    },
    {
      id: 'song-yo-no-naci-para-amar', cat: 'song-baladas', franchise: 'Juan Gabriel', game: 'Yo no nací para amar',
      title: 'Yo no nací para amar', year: 1980, lang: 'es',
      sources: busca('Juan Gabriel', 'Yo no nací para amar'),
    },
    {
      id: 'song-costumbres-rocio-durcal', cat: 'song-baladas', franchise: 'Rocío Dúrcal', game: 'Costumbres',
      title: 'Costumbres', year: 1985, lang: 'es',
      sources: busca('Rocío Dúrcal', 'Costumbres'),
    },
    {
      id: 'song-como-yo-te-amo', cat: 'song-baladas', franchise: 'Raphael', game: 'Como yo te amo',
      title: 'Como yo te amo', year: 1980, lang: 'es',
      sources: busca('Raphael', 'Como yo te amo'),
    },
    {
      id: 'song-todo-se-derrumbo-dentro-de-mi', cat: 'song-baladas', franchise: 'Emmanuel', game: 'Todo se derrumbó dentro de mí',
      title: 'Todo se derrumbó dentro de mí', year: 1980, lang: 'es',
      sources: busca('Emmanuel', 'Todo se derrumbó dentro de mí'),
    },
    {
      id: 'song-para-amarnos-mas', cat: 'song-baladas', franchise: 'Manuel Mijares', game: 'Para amarnos más',
      title: 'Para amarnos más', year: 1989, lang: 'es',
      sources: busca('Manuel Mijares', 'Para amarnos más'),
    },
    {
      id: 'song-el-privilegio-de-amar', cat: 'song-baladas', franchise: 'Manuel Mijares y Lucero', game: 'El privilegio de amar',
      title: 'El privilegio de amar', year: 1998, lang: 'es',
      sources: busca('Manuel Mijares', 'El privilegio de amar'),
    },
    {
      id: 'song-tengo-todo-excepto-a-ti', cat: 'song-baladas', franchise: 'Luis Miguel', game: 'Tengo todo excepto a ti',
      title: 'Tengo todo excepto a ti', year: 1990, lang: 'es',
      sources: busca('Luis Miguel', 'Tengo todo excepto a ti'),
    },
    {
      id: 'song-culpable-o-no', cat: 'song-baladas', franchise: 'Luis Miguel', game: 'Culpable o no',
      title: 'Culpable o no', year: 1988, lang: 'es',
      sources: busca('Luis Miguel', 'Culpable o no'),
    },
    {
      id: 'song-entregate-luis-miguel', cat: 'song-baladas', franchise: 'Luis Miguel', game: 'Entrégate',
      title: 'Entrégate', year: 1990, lang: 'es',
      sources: busca('Luis Miguel', 'Entrégate'),
    },
    {
      id: 'song-hasta-que-me-olvides', cat: 'song-baladas', franchise: 'Luis Miguel', game: 'Hasta que me olvides',
      title: 'Hasta que me olvides', year: 1993, lang: 'es',
      sources: busca('Luis Miguel', 'Hasta que me olvides'),
    },
    {
      id: 'song-nunca-voy-a-olvidarte', cat: 'song-baladas', franchise: 'Cristian Castro', game: 'Nunca voy a olvidarte',
      title: 'Nunca voy a olvidarte', year: 1993, lang: 'es',
      sources: busca('Cristian Castro', 'Nunca voy a olvidarte'),
    },
    {
      id: 'song-por-amarte-asi', cat: 'song-baladas', franchise: 'Cristian Castro', game: 'Por amarte así',
      title: 'Por amarte así', year: 1999, lang: 'es',
      sources: busca('Cristian Castro', 'Por amarte así'),
    },
    {
      id: 'song-tan-enamorados', cat: 'song-baladas', franchise: 'Ricardo Montaner', game: 'Tan enamorados',
      title: 'Tan enamorados', year: 1988, lang: 'es',
      sources: busca('Ricardo Montaner', 'Tan enamorados'),
    },
    {
      id: 'song-me-va-a-extranar', cat: 'song-baladas', franchise: 'Ricardo Montaner', game: 'Me va a extrañar',
      title: 'Me va a extrañar', year: 1989, lang: 'es',
      sources: busca('Ricardo Montaner', 'Me va a extrañar'),
    },
    {
      id: 'song-besame-montaner', cat: 'song-baladas', franchise: 'Ricardo Montaner', game: 'Bésame',
      title: 'Bésame', year: 2001, lang: 'es',
      sources: busca('Ricardo Montaner', 'Bésame'),
    },
    {
      id: 'song-te-amo-franco-de-vita', cat: 'song-baladas', franchise: 'Franco De Vita', game: 'Te amo',
      title: 'Te amo', year: 1988, lang: 'es',
      sources: busca('Franco De Vita', 'Te amo'),
    },
    {
      id: 'song-un-buen-perdedor', cat: 'song-baladas', franchise: 'Franco De Vita', game: 'Un buen perdedor',
      title: 'Un buen perdedor', year: 1984, lang: 'es',
      sources: busca('Franco De Vita', 'Un buen perdedor'),
    },
    {
      id: 'song-tu-de-que-vas', cat: 'song-baladas', franchise: 'Franco De Vita', game: 'Tú de qué vas',
      title: 'Tú de qué vas', year: 2004, lang: 'es',
      sources: busca('Franco De Vita', 'Tú de qué vas'),
    },
    {
      id: 'song-dejaria-todo', cat: 'song-baladas', franchise: 'Chayanne', game: 'Dejaría todo',
      title: 'Dejaría todo', year: 1998, lang: 'es',
      sources: busca('Chayanne', 'Dejaría todo'),
    },
    {
      id: 'song-un-siglo-sin-ti', cat: 'song-baladas', franchise: 'Chayanne', game: 'Un siglo sin ti',
      title: 'Un siglo sin ti', year: 2003, lang: 'es',
      sources: busca('Chayanne', 'Un siglo sin ti'),
    },
    {
      id: 'song-si-tu-supieras', cat: 'song-baladas', franchise: 'Alejandro Fernández', game: 'Si tú supieras',
      title: 'Si tú supieras', year: 1997, lang: 'es',
      sources: busca('Alejandro Fernández', 'Si tú supieras'),
    },
    {
      id: 'song-me-dedique-a-perderte', cat: 'song-baladas', franchise: 'Alejandro Fernández', game: 'Me dediqué a perderte',
      title: 'Me dediqué a perderte', year: 2004, lang: 'es',
      sources: busca('Alejandro Fernández', 'Me dediqué a perderte'),
    },
    {
      id: 'song-kilometros-sin-bandera', cat: 'song-baladas', franchise: 'Sin Bandera', game: 'Kilómetros',
      title: 'Kilómetros', year: 2002, lang: 'es',
      sources: busca('Sin Bandera', 'Kilómetros'),
    },
    {
      id: 'song-que-lloro', cat: 'song-baladas', franchise: 'Sin Bandera', game: 'Que lloro',
      title: 'Que lloro', year: 2003, lang: 'es',
      sources: busca('Sin Bandera', 'Que lloro'),
    },
    {
      id: 'song-noviembre-sin-ti', cat: 'song-baladas', franchise: 'Reik', game: 'Noviembre sin ti',
      title: 'Noviembre sin ti', year: 2005, lang: 'es',
      sources: busca('Reik', 'Noviembre sin ti'),
    },
    {
      id: 'song-sabes-reik', cat: 'song-baladas', franchise: 'Reik', game: 'Sabes',
      title: 'Sabes', year: 2006, lang: 'es',
      sources: busca('Reik', 'Sabes'),
    },
    {
      id: 'song-creo-en-ti', cat: 'song-baladas', franchise: 'Reik', game: 'Creo en ti',
      title: 'Creo en ti', year: 2011, lang: 'es',
      sources: busca('Reik', 'Creo en ti'),
    },
    {
      id: 'song-besame-camila', cat: 'song-baladas', franchise: 'Camila', game: 'Bésame',
      title: 'Bésame', year: 2010, lang: 'es',
      sources: busca('Camila', 'Bésame'),
    },
    {
      id: 'song-te-dejo-en-libertad', cat: 'song-baladas', franchise: 'Ha*Ash', game: 'Te dejo en libertad',
      title: 'Te dejo en libertad', year: 2011, lang: 'es',
      sources: busca('Ha*Ash', 'Te dejo en libertad'),
    },
    {
      id: 'song-ecos-de-amor', cat: 'song-baladas', franchise: 'Jesse & Joy', game: 'Ecos de amor',
      title: 'Ecos de amor', year: 2015, lang: 'es',
      sources: busca('Jesse & Joy', 'Ecos de amor'),
    },
    {
      id: 'song-en-cambio-no', cat: 'song-baladas', franchise: 'Laura Pausini', game: 'En cambio no',
      title: 'En cambio no', year: 2008, lang: 'es',
      sources: busca('Laura Pausini', 'En cambio no'),
    },
    {
      id: 'song-se-fue-laura-pausini', cat: 'song-baladas', franchise: 'Laura Pausini', game: 'Se fue',
      title: 'Se fue', year: 1994, lang: 'es',
      sources: busca('Laura Pausini', 'Se fue'),
    },
    {
      id: 'song-because-you-loved-me', cat: 'song-baladas', franchise: 'Celine Dion', game: 'Because You Loved Me',
      title: 'Because You Loved Me', year: 1996, lang: 'en',
      sources: busca('Celine Dion', 'Because You Loved Me'),
    },
    {
      id: 'song-your-song', cat: 'song-baladas', franchise: 'Elton John', game: 'Your Song',
      title: 'Your Song', year: 1970, lang: 'en',
      sources: busca('Elton John', 'Your Song'),
    },
    {
      id: 'song-careless-whisper', cat: 'song-baladas', franchise: 'George Michael', game: 'Careless Whisper',
      title: 'Careless Whisper', year: 1984, lang: 'en',
      sources: busca('George Michael', 'Careless Whisper'),
    },
    {
      id: 'song-against-all-odds', cat: 'song-baladas', franchise: 'Phil Collins', game: 'Against All Odds (Take a Look at Me Now)',
      title: 'Against All Odds (Take a Look at Me Now)', year: 1984, lang: 'en',
      sources: busca('Phil Collins', 'Against All Odds'),
    },
    {
      id: 'song-tears-in-heaven', cat: 'song-baladas', franchise: 'Eric Clapton', game: 'Tears in Heaven',
      title: 'Tears in Heaven', year: 1992, lang: 'en',
      sources: busca('Eric Clapton', 'Tears in Heaven'),
    },
    {
      id: 'song-a-thousand-years', cat: 'song-baladas', franchise: 'Christina Perri', game: 'A Thousand Years',
      title: 'A Thousand Years', year: 2011, lang: 'en',
      sources: busca('Christina Perri', 'A Thousand Years'),
    },
    {
      id: 'song-stay-with-me', cat: 'song-baladas', franchise: 'Sam Smith', game: 'Stay With Me',
      title: 'Stay With Me', year: 2014, lang: 'en',
      sources: busca('Sam Smith', 'Stay With Me'),
    },
    {
      id: 'song-someone-you-loved', cat: 'song-baladas', franchise: 'Lewis Capaldi', game: 'Someone You Loved',
      title: 'Someone You Loved', year: 2018, lang: 'en',
      sources: busca('Lewis Capaldi', 'Someone You Loved'),
    },
    {
      id: 'song-traitor', cat: 'song-baladas', franchise: 'Olivia Rodrigo', game: 'traitor',
      title: 'traitor', year: 2021, lang: 'en',
      sources: busca('Olivia Rodrigo', 'traitor'),
    },
    {
      id: 'song-amada-amante', cat: 'song-baladas', franchise: 'Roberto Carlos', game: 'Amada amante',
      title: 'Amada amante', year: 1971, lang: 'es',
      sources: busca('Roberto Carlos', 'Amada amante'),
    },
    {
      id: 'song-detalles-roberto-carlos', cat: 'song-baladas', franchise: 'Roberto Carlos', game: 'Detalles',
      title: 'Detalles', year: 1971, lang: 'es',
      sources: busca('Roberto Carlos', 'Detalles'),
    },
    {
      id: 'song-cama-y-mesa', cat: 'song-baladas', franchise: 'Roberto Carlos', game: 'Cama y mesa',
      title: 'Cama y mesa', year: 1981, lang: 'es',
      sources: busca('Roberto Carlos', 'Cama y mesa'),
    },
    {
      id: 'song-melina-camilo-sesto', cat: 'song-baladas', franchise: 'Camilo Sesto', game: 'Melina',
      title: 'Melina', year: 1975, lang: 'es',
      sources: busca('Camilo Sesto', 'Melina'),
    },
    {
      id: 'song-quieres-ser-mi-amante', cat: 'song-baladas', franchise: 'Camilo Sesto', game: '¿Quieres ser mi amante?',
      title: '¿Quieres ser mi amante?', year: 1974, lang: 'es',
      sources: busca('Camilo Sesto', '¿Quieres ser mi amante?'),
    },
    {
      id: 'song-si-me-dejas-ahora', cat: 'song-baladas', franchise: 'José José', game: 'Si me dejas ahora',
      title: 'Si me dejas ahora', year: 1979, lang: 'es',
      sources: busca('José José', 'Si me dejas ahora'),
    },
    {
      id: 'song-amar-y-querer', cat: 'song-baladas', franchise: 'José José', game: 'Amar y querer',
      title: 'Amar y querer', year: 1977, lang: 'es',
      sources: busca('José José', 'Amar y querer'),
    },
    {
      id: 'song-preso-jose-jose', cat: 'song-baladas', franchise: 'José José', game: 'Preso',
      title: 'Preso', year: 1981, lang: 'es',
      sources: busca('José José', 'Preso'),
    },
    {
      id: 'song-payaso-jose-jose', cat: 'song-baladas', franchise: 'José José', game: 'Payaso',
      title: 'Payaso', year: 1983, lang: 'es',
      sources: busca('José José', 'Payaso'),
    },
    {
      id: 'song-seria-capaz-jose-jose', cat: 'song-baladas', franchise: 'José José', game: '¿Y quién puede ser?',
      title: '¿Y quién puede ser?', year: 1986, lang: 'es',
      sources: busca('José José', '¿Y quién puede ser?'),
    },
    {
      id: 'song-no-vale-la-pena', cat: 'song-baladas', franchise: 'Juan Gabriel', game: 'No vale la pena',
      title: 'No vale la pena', year: 1983, lang: 'es',
      sources: busca('Juan Gabriel', 'No vale la pena'),
    },
    {
      id: 'song-pero-que-necesidad', cat: 'song-baladas', franchise: 'Juan Gabriel', game: 'Pero qué necesidad',
      title: 'Pero qué necesidad', year: 1994, lang: 'es',
      sources: busca('Juan Gabriel', 'Pero qué necesidad'),
    },
    {
      id: 'song-fue-un-placer-conocerte', cat: 'song-baladas', franchise: 'Rocío Dúrcal', game: 'Fue un placer conocerte',
      title: 'Fue un placer conocerte', year: 1977, lang: 'es',
      sources: busca('Rocío Dúrcal', 'Fue un placer conocerte'),
    },
    {
      id: 'song-vestida-de-azucar', cat: 'song-baladas', franchise: 'Gloria Trevi', game: 'Vestida de azúcar',
      title: 'Vestida de azúcar', year: 2011, lang: 'es',
      sources: busca('Gloria Trevi', 'Vestida de azúcar'),
    },
    {
      id: 'song-no-querias-lastimarme', cat: 'song-baladas', franchise: 'Gloria Trevi', game: 'No querías lastimarme',
      title: 'No querías lastimarme', year: 2013, lang: 'es',
      sources: busca('Gloria Trevi', 'No querías lastimarme'),
    },
    {
      id: 'song-bella-manuel-mijares', cat: 'song-baladas', franchise: 'Manuel Mijares', game: 'Bella',
      title: 'Bella', year: 1986, lang: 'es',
      sources: busca('Manuel Mijares', 'Bella'),
    },
    {
      id: 'song-soldado-del-amor', cat: 'song-baladas', franchise: 'Manuel Mijares', game: 'Soldado del amor',
      title: 'Soldado del amor', year: 1988, lang: 'es',
      sources: busca('Manuel Mijares', 'Soldado del amor'),
    },
    {
      id: 'song-fria-como-el-viento', cat: 'song-baladas', franchise: 'Luis Miguel', game: 'Fría como el viento',
      title: 'Fría como el viento', year: 1988, lang: 'es',
      sources: busca('Luis Miguel', 'Fría como el viento'),
    },
    {
      id: 'song-involvidable-luis-miguel', cat: 'song-baladas', franchise: 'Luis Miguel', game: 'Inolvidable',
      title: 'Inolvidable', year: 1991, lang: 'es',
      sources: busca('Luis Miguel', 'Inolvidable'),
    },
    {
      id: 'song-no-se-tu-luis-miguel', cat: 'song-baladas', franchise: 'Luis Miguel', game: 'No sé tú',
      title: 'No sé tú', year: 1991, lang: 'es',
      sources: busca('Luis Miguel', 'No sé tú'),
    },
    {
      id: 'song-por-debajo-de-la-mesa', cat: 'song-baladas', franchise: 'Luis Miguel', game: 'Por debajo de la mesa',
      title: 'Por debajo de la mesa', year: 1997, lang: 'es',
      sources: busca('Luis Miguel', 'Por debajo de la mesa'),
    },
    {
      id: 'song-la-media-vuelta', cat: 'song-baladas', franchise: 'Luis Miguel', game: 'La media vuelta',
      title: 'La media vuelta', year: 1994, lang: 'es',
      sources: busca('Luis Miguel', 'La media vuelta'),
    },
    {
      id: 'song-amarte-es-un-placer', cat: 'song-baladas', franchise: 'Luis Miguel', game: 'Amarte es un placer',
      title: 'Amarte es un placer', year: 1999, lang: 'es',
      sources: busca('Luis Miguel', 'Amarte es un placer'),
    },
    {
      id: 'song-volver-a-amar-cristian', cat: 'song-baladas', franchise: 'Cristian Castro', game: 'Volver a amar',
      title: 'Volver a amar', year: 1999, lang: 'es',
      sources: busca('Cristian Castro', 'Volver a amar'),
    },
    {
      id: 'song-lloran-las-rosas', cat: 'song-baladas', franchise: 'Cristian Castro', game: 'Lloran las rosas',
      title: 'Lloran las rosas', year: 1997, lang: 'es',
      sources: busca('Cristian Castro', 'Lloran las rosas'),
    },
    {
      id: 'song-yo-queria-cristian', cat: 'song-baladas', franchise: 'Cristian Castro', game: 'Yo quería',
      title: 'Yo quería', year: 2001, lang: 'es',
      sources: busca('Cristian Castro', 'Yo quería'),
    },
    {
      id: 'song-que-me-alcance-la-vida', cat: 'song-baladas', franchise: 'Sin Bandera', game: 'Que me alcance la vida',
      title: 'Que me alcance la vida', year: 2006, lang: 'es',
      sources: busca('Sin Bandera', 'Que me alcance la vida'),
    },
    {
      id: 'song-te-vi-venir-sin-bandera', cat: 'song-baladas', franchise: 'Sin Bandera', game: 'Te vi venir',
      title: 'Te vi venir', year: 2002, lang: 'es',
      sources: busca('Sin Bandera', 'Te vi venir'),
    },
    {
      id: 'song-something-beatles', cat: 'song-baladas', franchise: 'The Beatles', game: 'Something',
      title: 'Something', year: 1969, lang: 'en',
      sources: busca('The Beatles', 'Something'),
    },
    {
      id: 'song-the-long-and-winding-road', cat: 'song-baladas', franchise: 'The Beatles', game: 'The Long and Winding Road',
      title: 'The Long and Winding Road', year: 1970, lang: 'en',
      sources: busca('The Beatles', 'The Long and Winding Road'),
    },
    {
      id: 'song-all-you-need-is-love', cat: 'song-baladas', franchise: 'The Beatles', game: 'All You Need Is Love',
      title: 'All You Need Is Love', year: 1967, lang: 'en',
      sources: busca('The Beatles', 'All You Need Is Love'),
    },
    {
      id: 'song-piano-man-billy-joel', cat: 'song-baladas', franchise: 'Billy Joel', game: 'Piano Man',
      title: 'Piano Man', year: 1973, lang: 'en',
      sources: busca('Billy Joel', 'Piano Man'),
    },
    {
      id: 'song-just-the-way-you-are-joel', cat: 'song-baladas', franchise: 'Billy Joel', game: 'Just the Way You Are',
      title: 'Just the Way You Are', year: 1977, lang: 'en',
      sources: busca('Billy Joel', 'Just the Way You Are'),
    },
    {
      id: 'song-honesty-billy-joel', cat: 'song-baladas', franchise: 'Billy Joel', game: 'Honesty',
      title: 'Honesty', year: 1978, lang: 'en',
      sources: busca('Billy Joel', 'Honesty'),
    },
    {
      id: 'song-tiny-dancer-elton', cat: 'song-baladas', franchise: 'Elton John', game: 'Tiny Dancer',
      title: 'Tiny Dancer', year: 1971, lang: 'en',
      sources: busca('Elton John', 'Tiny Dancer'),
    },
    {
      id: 'song-rocket-man-elton', cat: 'song-baladas', franchise: 'Elton John', game: 'Rocket Man (I Think It\'s Going to Be a Long, Long Time)',
      title: 'Rocket Man (I Think It\'s Going to Be a Long, Long Time)', year: 1972, lang: 'en',
      sources: busca('Elton John', 'Rocket Man (I Think It\'s Going to Be a Long, Long Time)'),
    },
    {
      id: 'song-candle-in-the-wind', cat: 'song-baladas', franchise: 'Elton John', game: 'Candle in the Wind',
      title: 'Candle in the Wind', year: 1973, lang: 'en',
      sources: busca('Elton John', 'Candle in the Wind'),
    },
    {
      id: 'song-goodbye-yellow-brick-road', cat: 'song-baladas', franchise: 'Elton John', game: 'Goodbye Yellow Brick Road',
      title: 'Goodbye Yellow Brick Road', year: 1973, lang: 'en',
      sources: busca('Elton John', 'Goodbye Yellow Brick Road'),
    },
    {
      id: 'song-dont-let-the-sun-go-down', cat: 'song-baladas', franchise: 'Elton John', game: 'Don\'t Let the Sun Go Down on Me',
      title: 'Don\'t Let the Sun Go Down on Me', year: 1974, lang: 'en',
      sources: busca('Elton John', 'Don\'t Let the Sun Go Down on Me'),
    },
    {
      id: 'song-sorry-seems-to-be', cat: 'song-baladas', franchise: 'Elton John', game: 'Sorry Seems to Be the Hardest Word',
      title: 'Sorry Seems to Be the Hardest Word', year: 1976, lang: 'en',
      sources: busca('Elton John', 'Sorry Seems to Be the Hardest Word'),
    },
    {
      id: 'song-bridge-over-troubled-water', cat: 'song-baladas', franchise: 'Simon & Garfunkel', game: 'Bridge over Troubled Water',
      title: 'Bridge over Troubled Water', year: 1970, lang: 'en',
      sources: busca('Simon & Garfunkel', 'Bridge over Troubled Water'),
    },
    {
      id: 'song-the-sound-of-silence-sg', cat: 'song-baladas', franchise: 'Simon & Garfunkel', game: 'The Sound of Silence',
      title: 'The Sound of Silence', year: 1965, lang: 'en',
      sources: busca('Simon & Garfunkel', 'The Sound of Silence'),
    },
    {
      id: 'song-make-it-with-you', cat: 'song-baladas', franchise: 'Bread', game: 'Make It with You',
      title: 'Make It with You', year: 1970, lang: 'en',
      sources: busca('Bread', 'Make It with You'),
    },
    {
      id: 'song-if-bread', cat: 'song-baladas', franchise: 'Bread', game: 'If',
      title: 'If', year: 1971, lang: 'en',
      sources: busca('Bread', 'If'),
    },
    {
      id: 'song-without-you-nilsson', cat: 'song-baladas', franchise: 'Harry Nilsson', game: 'Without You',
      title: 'Without You', year: 1971, lang: 'en',
      sources: busca('Harry Nilsson', 'Without You'),
    },
    {
      id: 'song-killing-me-softly', cat: 'song-baladas', franchise: 'Roberta Flack', game: 'Killing Me Softly with His Song',
      title: 'Killing Me Softly with His Song', year: 1973, lang: 'en',
      sources: busca('Roberta Flack', 'Killing Me Softly with His Song'),
    },
    {
      id: 'song-the-first-time-ever', cat: 'song-baladas', franchise: 'Roberta Flack', game: 'The First Time Ever I Saw Your Face',
      title: 'The First Time Ever I Saw Your Face', year: 1972, lang: 'en',
      sources: busca('Roberta Flack', 'The First Time Ever I Saw Your Face'),
    },
    {
      id: 'song-you-are-so-beautiful', cat: 'song-baladas', franchise: 'Joe Cocker', game: 'You Are So Beautiful',
      title: 'You Are So Beautiful', year: 1974, lang: 'en',
      sources: busca('Joe Cocker', 'You Are So Beautiful'),
    },
    {
      id: 'song-three-times-a-lady', cat: 'song-baladas', franchise: 'Commodores', game: 'Three Times a Lady',
      title: 'Three Times a Lady', year: 1978, lang: 'en',
      sources: busca('Commodores', 'Three Times a Lady'),
    },
    {
      id: 'song-sail-on-commodores', cat: 'song-baladas', franchise: 'Commodores', game: 'Sail On',
      title: 'Sail On', year: 1979, lang: 'en',
      sources: busca('Commodores', 'Sail On'),
    },
    {
      id: 'song-easy-commodores', cat: 'song-baladas', franchise: 'Commodores', game: 'Easy',
      title: 'Easy', year: 1977, lang: 'en',
      sources: busca('Commodores', 'Easy'),
    },
    {
      id: 'song-hello-lionel-richie', cat: 'song-baladas', franchise: 'Lionel Richie', game: 'Hello',
      title: 'Hello', year: 1983, lang: 'en',
      sources: busca('Lionel Richie', 'Hello'),
    },
    {
      id: 'song-truly-lionel-richie', cat: 'song-baladas', franchise: 'Lionel Richie', game: 'Truly',
      title: 'Truly', year: 1982, lang: 'en',
      sources: busca('Lionel Richie', 'Truly'),
    },
    {
      id: 'song-say-you-say-me', cat: 'song-baladas', franchise: 'Lionel Richie', game: 'Say You, Say Me',
      title: 'Say You, Say Me', year: 1985, lang: 'en',
      sources: busca('Lionel Richie', 'Say You, Say Me'),
    },
    {
      id: 'song-stuck-on-you-lionel', cat: 'song-baladas', franchise: 'Lionel Richie', game: 'Stuck on You',
      title: 'Stuck on You', year: 1984, lang: 'en',
      sources: busca('Lionel Richie', 'Stuck on You'),
    },
    {
      id: 'song-penny-lover-lionel', cat: 'song-baladas', franchise: 'Lionel Richie', game: 'Penny Lover',
      title: 'Penny Lover', year: 1983, lang: 'en',
      sources: busca('Lionel Richie', 'Penny Lover'),
    },
    {
      id: 'song-i-just-called-to-say', cat: 'song-baladas', franchise: 'Stevie Wonder', game: 'I Just Called to Say I Love You',
      title: 'I Just Called to Say I Love You', year: 1984, lang: 'en',
      sources: busca('Stevie Wonder', 'I Just Called to Say I Love You'),
    },
    {
      id: 'song-lately-stevie-wonder', cat: 'song-baladas', franchise: 'Stevie Wonder', game: 'Lately',
      title: 'Lately', year: 1980, lang: 'en',
      sources: busca('Stevie Wonder', 'Lately'),
    },
    {
      id: 'song-overjoyed-stevie', cat: 'song-baladas', franchise: 'Stevie Wonder', game: 'Overjoyed',
      title: 'Overjoyed', year: 1985, lang: 'en',
      sources: busca('Stevie Wonder', 'Overjoyed'),
    },
    {
      id: 'song-ribbon-in-the-sky', cat: 'song-baladas', franchise: 'Stevie Wonder', game: 'Ribbon in the Sky',
      title: 'Ribbon in the Sky', year: 1982, lang: 'en',
      sources: busca('Stevie Wonder', 'Ribbon in the Sky'),
    },
    {
      id: 'song-open-arms-journey', cat: 'song-baladas', franchise: 'Journey', game: 'Open Arms',
      title: 'Open Arms', year: 1981, lang: 'en',
      sources: busca('Journey', 'Open Arms'),
    },
    {
      id: 'song-faithfully-journey', cat: 'song-baladas', franchise: 'Journey', game: 'Faithfully',
      title: 'Faithfully', year: 1983, lang: 'en',
      sources: busca('Journey', 'Faithfully'),
    },
    {
      id: 'song-waiting-for-a-girl', cat: 'song-baladas', franchise: 'Foreigner', game: 'Waiting for a Girl Like You',
      title: 'Waiting for a Girl Like You', year: 1981, lang: 'en',
      sources: busca('Foreigner', 'Waiting for a Girl Like You'),
    },
    {
      id: 'song-i-want-to-know-what-love-is', cat: 'song-baladas', franchise: 'Foreigner', game: 'I Want to Know What Love Is',
      title: 'I Want to Know What Love Is', year: 1984, lang: 'en',
      sources: busca('Foreigner', 'I Want to Know What Love Is'),
    },
    {
      id: 'song-hard-to-say-im-sorry', cat: 'song-baladas', franchise: 'Chicago', game: 'Hard to Say I\'m Sorry',
      title: 'Hard to Say I\'m Sorry', year: 1982, lang: 'en',
      sources: busca('Chicago', 'Hard to Say I\'m Sorry'),
    },
    {
      id: 'song-youre-the-inspiration', cat: 'song-baladas', franchise: 'Chicago', game: 'You\'re the Inspiration',
      title: 'You\'re the Inspiration', year: 1984, lang: 'en',
      sources: busca('Chicago', 'You\'re the Inspiration'),
    },
    {
      id: 'song-if-you-leave-me-now', cat: 'song-baladas', franchise: 'Chicago', game: 'If You Leave Me Now',
      title: 'If You Leave Me Now', year: 1976, lang: 'en',
      sources: busca('Chicago', 'If You Leave Me Now'),
    },
    {
      id: 'song-in-the-air-tonight', cat: 'song-baladas', franchise: 'Phil Collins', game: 'In the Air Tonight',
      title: 'In the Air Tonight', year: 1981, lang: 'en',
      sources: busca('Phil Collins', 'In the Air Tonight'),
    },
    {
      id: 'song-one-more-night-phil', cat: 'song-baladas', franchise: 'Phil Collins', game: 'One More Night',
      title: 'One More Night', year: 1985, lang: 'en',
      sources: busca('Phil Collins', 'One More Night'),
    },
    {
      id: 'song-a-groovy-kind-of-love', cat: 'song-baladas', franchise: 'Phil Collins', game: 'A Groovy Kind of Love',
      title: 'A Groovy Kind of Love', year: 1988, lang: 'en',
      sources: busca('Phil Collins', 'A Groovy Kind of Love'),
    },
    {
      id: 'song-do-you-remember-phil', cat: 'song-baladas', franchise: 'Phil Collins', game: 'Do You Remember?',
      title: 'Do You Remember?', year: 1989, lang: 'en',
      sources: busca('Phil Collins', 'Do You Remember?'),
    },
    {
      id: 'song-heaven-bryan-adams', cat: 'song-baladas', franchise: 'Bryan Adams', game: 'Heaven',
      title: 'Heaven', year: 1984, lang: 'en',
      sources: busca('Bryan Adams', 'Heaven'),
    },
    {
      id: 'song-please-forgive-me', cat: 'song-baladas', franchise: 'Bryan Adams', game: 'Please Forgive Me',
      title: 'Please Forgive Me', year: 1993, lang: 'en',
      sources: busca('Bryan Adams', 'Please Forgive Me'),
    },
    {
      id: 'song-straight-from-the-heart', cat: 'song-baladas', franchise: 'Bryan Adams', game: 'Straight from the Heart',
      title: 'Straight from the Heart', year: 1983, lang: 'en',
      sources: busca('Bryan Adams', 'Straight from the Heart'),
    },
    {
      id: 'song-have-you-ever-really-loved', cat: 'song-baladas', franchise: 'Bryan Adams', game: 'Have You Ever Really Loved a Woman?',
      title: 'Have You Ever Really Loved a Woman?', year: 1995, lang: 'en',
      sources: busca('Bryan Adams', 'Have You Ever Really Loved a Woman?'),
    },
    {
      id: 'song-all-out-of-love', cat: 'song-baladas', franchise: 'Air Supply', game: 'All Out of Love',
      title: 'All Out of Love', year: 1980, lang: 'en',
      sources: busca('Air Supply', 'All Out of Love'),
    },
    {
      id: 'song-making-love-out-of-nothing', cat: 'song-baladas', franchise: 'Air Supply', game: 'Making Love Out of Nothing at All',
      title: 'Making Love Out of Nothing at All', year: 1983, lang: 'en',
      sources: busca('Air Supply', 'Making Love Out of Nothing at All'),
    },
    {
      id: 'song-lost-in-love-air-supply', cat: 'song-baladas', franchise: 'Air Supply', game: 'Lost in Love',
      title: 'Lost in Love', year: 1980, lang: 'en',
      sources: busca('Air Supply', 'Lost in Love'),
    },
    {
      id: 'song-even-the-nights-are-better', cat: 'song-baladas', franchise: 'Air Supply', game: 'Even the Nights Are Better',
      title: 'Even the Nights Are Better', year: 1982, lang: 'en',
      sources: busca('Air Supply', 'Even the Nights Are Better'),
    },
    {
      id: 'song-here-i-am-air-supply', cat: 'song-baladas', franchise: 'Air Supply', game: 'Here I Am (Just When I Thought I Was Over You)',
      title: 'Here I Am (Just When I Thought I Was Over You)', year: 1981, lang: 'en',
      sources: busca('Air Supply', 'Here I Am (Just When I Thought I Was Over You)'),
    },
    {
      id: 'song-when-a-man-loves-a-woman-bolton', cat: 'song-baladas', franchise: 'Michael Bolton', game: 'When a Man Loves a Woman',
      title: 'When a Man Loves a Woman', year: 1991, lang: 'en',
      sources: busca('Michael Bolton', 'When a Man Loves a Woman'),
    },
    {
      id: 'song-how-am-i-supposed-to-live', cat: 'song-baladas', franchise: 'Michael Bolton', game: 'How Am I Supposed to Live Without You',
      title: 'How Am I Supposed to Live Without You', year: 1989, lang: 'en',
      sources: busca('Michael Bolton', 'How Am I Supposed to Live Without You'),
    },
    {
      id: 'song-time-love-and-tenderness', cat: 'song-baladas', franchise: 'Michael Bolton', game: 'Time, Love and Tenderness',
      title: 'Time, Love and Tenderness', year: 1991, lang: 'en',
      sources: busca('Michael Bolton', 'Time, Love and Tenderness'),
    },
    {
      id: 'song-said-i-loved-you', cat: 'song-baladas', franchise: 'Michael Bolton', game: 'Said I Loved You...But I Lied',
      title: 'Said I Loved You...But I Lied', year: 1993, lang: 'en',
      sources: busca('Michael Bolton', 'Said I Loved You...But I Lied'),
    },
    {
      id: 'song-have-i-told-you-lately', cat: 'song-baladas', franchise: 'Rod Stewart', game: 'Have I Told You Lately',
      title: 'Have I Told You Lately', year: 1993, lang: 'en',
      sources: busca('Rod Stewart', 'Have I Told You Lately'),
    },
    {
      id: 'song-i-dont-want-to-talk-about-it', cat: 'song-baladas', franchise: 'Rod Stewart', game: 'I Don\'t Want to Talk About It',
      title: 'I Don\'t Want to Talk About It', year: 1975, lang: 'en',
      sources: busca('Rod Stewart', 'I Don\'t Want to Talk About It'),
    },
    {
      id: 'song-youre-in-my-heart', cat: 'song-baladas', franchise: 'Rod Stewart', game: 'You\'re in My Heart (The Final Acclaim)',
      title: 'You\'re in My Heart (The Final Acclaim)', year: 1977, lang: 'en',
      sources: busca('Rod Stewart', 'You\'re in My Heart (The Final Acclaim)'),
    },
    {
      id: 'song-forever-young-rod', cat: 'song-baladas', franchise: 'Rod Stewart', game: 'Forever Young',
      title: 'Forever Young', year: 1988, lang: 'en',
      sources: busca('Rod Stewart', 'Forever Young'),
    },
    {
      id: 'song-always-atlantic-starr', cat: 'song-baladas', franchise: 'Atlantic Starr', game: 'Always',
      title: 'Always', year: 1987, lang: 'en',
      sources: busca('Atlantic Starr', 'Always'),
    },
    {
      id: 'song-save-the-best-for-last', cat: 'song-baladas', franchise: 'Vanessa Williams', game: 'Save the Best for Last',
      title: 'Save the Best for Last', year: 1991, lang: 'en',
      sources: busca('Vanessa Williams', 'Save the Best for Last'),
    },
    {
      id: 'song-un-break-my-heart', cat: 'song-baladas', franchise: 'Toni Braxton', game: 'Un-Break My Heart',
      title: 'Un-Break My Heart', year: 1996, lang: 'en',
      sources: busca('Toni Braxton', 'Un-Break My Heart'),
    },
    {
      id: 'song-breathe-again-toni', cat: 'song-baladas', franchise: 'Toni Braxton', game: 'Breathe Again',
      title: 'Breathe Again', year: 1993, lang: 'en',
      sources: busca('Toni Braxton', 'Breathe Again'),
    },
    {
      id: 'song-i-swear-all-4-one', cat: 'song-baladas', franchise: 'All-4-One', game: 'I Swear',
      title: 'I Swear', year: 1994, lang: 'en',
      sources: busca('All-4-One', 'I Swear'),
    },
    {
      id: 'song-i-can-love-you-like-that', cat: 'song-baladas', franchise: 'All-4-One', game: 'I Can Love You Like That',
      title: 'I Can Love You Like That', year: 1995, lang: 'en',
      sources: busca('All-4-One', 'I Can Love You Like That'),
    },
    {
      id: 'song-end-of-the-road-boyz', cat: 'song-baladas', franchise: 'Boyz II Men', game: 'End of the Road',
      title: 'End of the Road', year: 1992, lang: 'en',
      sources: busca('Boyz II Men', 'End of the Road'),
    },
    {
      id: 'song-ill-make-love-to-you', cat: 'song-baladas', franchise: 'Boyz II Men', game: 'I\'ll Make Love to You',
      title: 'I\'ll Make Love to You', year: 1994, lang: 'en',
      sources: busca('Boyz II Men', 'I\'ll Make Love to You'),
    },
    {
      id: 'song-on-bended-knee-boyz', cat: 'song-baladas', franchise: 'Boyz II Men', game: 'On Bended Knee',
      title: 'On Bended Knee', year: 1994, lang: 'en',
      sources: busca('Boyz II Men', 'On Bended Knee'),
    },
    {
      id: 'song-one-sweet-day', cat: 'song-baladas', franchise: 'Mariah Carey y Boyz II Men', game: 'One Sweet Day',
      title: 'One Sweet Day', year: 1995, lang: 'en',
      sources: busca('Mariah Carey y Boyz II Men', 'One Sweet Day'),
    },
    {
      id: 'song-vision-of-love', cat: 'song-baladas', franchise: 'Mariah Carey', game: 'Vision of Love',
      title: 'Vision of Love', year: 1990, lang: 'en',
      sources: busca('Mariah Carey', 'Vision of Love'),
    },
    {
      id: 'song-without-you-mariah', cat: 'song-baladas', franchise: 'Mariah Carey', game: 'Without You',
      title: 'Without You', year: 1993, lang: 'en',
      sources: busca('Mariah Carey', 'Without You'),
    },
    /* ───────────── Electrónica (211) ───────────── */
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
    {
      id: 'song-the-model', cat: 'song-electronica', franchise: 'Kraftwerk', game: 'The Model',
      title: 'The Model', year: 1978, lang: 'en',
      sources: busca('Kraftwerk', 'The Model'),
    },
    {
      id: 'song-blue-monday', cat: 'song-electronica', franchise: 'New Order', game: 'Blue Monday',
      title: 'Blue Monday', year: 1983, lang: 'en',
      sources: busca('New Order', 'Blue Monday'),
    },
    {
      id: 'song-enjoy-the-silence', cat: 'song-electronica', franchise: 'Depeche Mode', game: 'Enjoy the Silence',
      title: 'Enjoy the Silence', year: 1990, lang: 'en',
      sources: busca('Depeche Mode', 'Enjoy the Silence'),
    },
    {
      id: 'song-rhythm-is-a-dancer', cat: 'song-electronica', franchise: 'Snap!', game: 'Rhythm Is a Dancer',
      title: 'Rhythm Is a Dancer', year: 1992, lang: 'en',
      sources: busca('Snap!', 'Rhythm Is a Dancer'),
    },
    {
      id: 'song-the-rhythm-of-the-night', cat: 'song-electronica', franchise: 'Corona', game: 'The Rhythm of the Night',
      title: 'The Rhythm of the Night', year: 1993, lang: 'en',
      sources: busca('Corona', 'The Rhythm of the Night'),
    },
    {
      id: 'song-scatman', cat: 'song-electronica', franchise: 'Scatman John', game: 'Scatman (Ski-Ba-Bop-Ba-Dop-Bop)',
      title: 'Scatman (Ski-Ba-Bop-Ba-Dop-Bop)', year: 1994, lang: 'en',
      sources: busca('Scatman John', 'Scatman'),
    },
    {
      id: 'song-children', cat: 'song-electronica', franchise: 'Robert Miles', game: 'Children',
      title: 'Children', year: 1995,
      sources: busca('Robert Miles', 'Children'),
    },
    {
      id: 'song-insomnia', cat: 'song-electronica', franchise: 'Faithless', game: 'Insomnia',
      title: 'Insomnia', year: 1995, lang: 'en',
      sources: busca('Faithless', 'Insomnia'),
    },
    {
      id: 'song-breathe-prodigy', cat: 'song-electronica', franchise: 'The Prodigy', game: 'Breathe',
      title: 'Breathe', year: 1996, lang: 'en',
      sources: busca('The Prodigy', 'Breathe'),
    },
    {
      id: 'song-9-pm-till-i-come', cat: 'song-electronica', franchise: 'ATB', game: '9 PM (Till I Come)',
      title: '9 PM (Till I Come)', year: 1998, lang: 'en',
      sources: busca('ATB', '9 PM (Till I Come)'),
    },
    {
      id: 'song-boom-boom-boom-boom', cat: 'song-electronica', franchise: 'Vengaboys', game: 'Boom, Boom, Boom, Boom!!',
      title: 'Boom, Boom, Boom, Boom!!', year: 1998, lang: 'en',
      sources: busca('Vengaboys', 'Boom, Boom, Boom, Boom!!'),
    },
    {
      id: 'song-we-like-to-party', cat: 'song-electronica', franchise: 'Vengaboys', game: 'We Like to Party!',
      title: 'We Like to Party!', year: 1998, lang: 'en',
      sources: busca('Vengaboys', 'We Like to Party!'),
    },
    {
      id: 'song-for-an-angel', cat: 'song-electronica', franchise: 'Paul van Dyk', game: 'For an Angel',
      title: 'For an Angel', year: 1998,
      sources: busca('Paul van Dyk', 'For an Angel'),
    },
    {
      id: 'song-lady-hear-me-tonight', cat: 'song-electronica', franchise: 'Modjo', game: 'Lady (Hear Me Tonight)',
      title: 'Lady (Hear Me Tonight)', year: 2000, lang: 'en',
      sources: busca('Modjo', 'Lady (Hear Me Tonight)'),
    },
    {
      id: 'song-played-a-live', cat: 'song-electronica', franchise: 'Safri Duo', game: 'Played-A-Live (The Bongo Song)',
      title: 'Played-A-Live (The Bongo Song)', year: 2000,
      sources: busca('Safri Duo', 'Played-A-Live'),
    },
    {
      id: 'song-lamour-toujours', cat: 'song-electronica', franchise: 'Gigi D\'Agostino', game: 'L\'Amour Toujours',
      title: 'L\'Amour Toujours', year: 1999, lang: 'en',
      sources: busca('Gigi D\'Agostino', 'L\'Amour Toujours'),
    },
    {
      id: 'song-adagio-for-strings', cat: 'song-electronica', franchise: 'Tiësto', game: 'Adagio for Strings',
      title: 'Adagio for Strings', year: 2004,
      sources: busca('Tiësto', 'Adagio for Strings'),
    },
    {
      id: 'song-world-hold-on', cat: 'song-electronica', franchise: 'Bob Sinclar', game: 'World, Hold On',
      title: 'World, Hold On', year: 2006, lang: 'en',
      sources: busca('Bob Sinclar', 'World, Hold On'),
    },
    {
      id: 'song-love-generation', cat: 'song-electronica', franchise: 'Bob Sinclar', game: 'Love Generation',
      title: 'Love Generation', year: 2005, lang: 'en',
      sources: busca('Bob Sinclar', 'Love Generation'),
    },
    {
      id: 'song-put-your-hands-up-for-detroit', cat: 'song-electronica', franchise: 'Fedde Le Grand', game: 'Put Your Hands Up for Detroit',
      title: 'Put Your Hands Up for Detroit', year: 2006, lang: 'en',
      sources: busca('Fedde Le Grand', 'Put Your Hands Up for Detroit'),
    },
    {
      id: 'song-infinity-2008', cat: 'song-electronica', franchise: 'Guru Josh Project', game: 'Infinity 2008',
      title: 'Infinity 2008', year: 2008, lang: 'en',
      sources: busca('Guru Josh Project', 'Infinity 2008'),
    },
    {
      id: 'song-day-n-nite-crookers', cat: 'song-electronica', franchise: 'Kid Cudi', game: 'Day \'n\' Nite (Crookers Remix)',
      title: 'Day \'n\' Nite (Crookers Remix)', year: 2008, lang: 'en',
      sources: busca('Kid Cudi', 'Day \'n\' Nite'),
    },
    {
      id: 'song-stereo-love', cat: 'song-electronica', franchise: 'Edward Maya y Vika Jigulina', game: 'Stereo Love',
      title: 'Stereo Love', year: 2009, lang: 'en',
      sources: busca('Edward Maya', 'Stereo Love'),
    },
    {
      id: 'song-hot-inna', cat: 'song-electronica', franchise: 'Inna', game: 'Hot',
      title: 'Hot', year: 2008, lang: 'en',
      sources: busca('Inna', 'Hot'),
    },
    {
      id: 'song-we-no-speak-americano', cat: 'song-electronica', franchise: 'Yolanda Be Cool y DCUP', game: 'We No Speak Americano',
      title: 'We No Speak Americano', year: 2010, lang: 'it',
      sources: busca('Yolanda Be Cool', 'We No Speak Americano'),
    },
    {
      id: 'song-one-your-name', cat: 'song-electronica', franchise: 'Swedish House Mafia', game: 'One (Your Name)',
      title: 'One (Your Name)', year: 2010, lang: 'en',
      sources: busca('Swedish House Mafia', 'One'),
    },
    {
      id: 'song-take-over-control', cat: 'song-electronica', franchise: 'Afrojack', game: 'Take Over Control',
      title: 'Take Over Control', year: 2010, lang: 'en',
      sources: busca('Afrojack', 'Take Over Control'),
    },
    {
      id: 'song-barbra-streisand', cat: 'song-electronica', franchise: 'Duck Sauce', game: 'Barbra Streisand',
      title: 'Barbra Streisand', year: 2010, lang: 'en',
      sources: busca('Duck Sauce', 'Barbra Streisand'),
    },
    {
      id: 'song-loca-people', cat: 'song-electronica', franchise: 'Sak Noel', game: 'Loca People',
      title: 'Loca People', year: 2011, lang: 'en',
      sources: busca('Sak Noel', 'Loca People'),
    },
    {
      id: 'song-calling-lose-my-mind', cat: 'song-electronica', franchise: 'Alesso y Sebastian Ingrosso', game: 'Calling (Lose My Mind)',
      title: 'Calling (Lose My Mind)', year: 2012, lang: 'en',
      sources: busca('Alesso', 'Calling'),
    },
    {
      id: 'song-million-voices', cat: 'song-electronica', franchise: 'Otto Knows', game: 'Million Voices',
      title: 'Million Voices', year: 2012, lang: 'en',
      sources: busca('Otto Knows', 'Million Voices'),
    },
    {
      id: 'song-pursuit-of-happiness-remix', cat: 'song-electronica', franchise: 'Steve Aoki', game: 'Pursuit of Happiness (Remix)',
      title: 'Pursuit of Happiness (Remix)', year: 2012, lang: 'en',
      sources: busca('Steve Aoki', 'Pursuit of Happiness'),
    },
    {
      id: 'song-spaceman-hardwell', cat: 'song-electronica', franchise: 'Hardwell', game: 'Spaceman',
      title: 'Spaceman', year: 2012, lang: 'en',
      sources: busca('Hardwell', 'Spaceman'),
    },
    {
      id: 'song-tremor', cat: 'song-electronica', franchise: 'Dimitri Vegas & Like Mike y Martin Garrix', game: 'Tremor',
      title: 'Tremor', year: 2014,
      sources: busca('Dimitri Vegas & Like Mike', 'Tremor'),
    },
    {
      id: 'song-tsunami-dvbbs', cat: 'song-electronica', franchise: 'DVBBS y Borgeous', game: 'Tsunami',
      title: 'Tsunami', year: 2013,
      sources: busca('DVBBS', 'Tsunami'),
    },
    {
      id: 'song-gecko-overdrive', cat: 'song-electronica', franchise: 'Oliver Heldens y Becky Hill', game: 'Gecko (Overdrive)',
      title: 'Gecko (Overdrive)', year: 2014, lang: 'en',
      sources: busca('Oliver Heldens', 'Gecko'),
    },
    {
      id: 'song-runaway-u-and-i', cat: 'song-electronica', franchise: 'Galantis', game: 'Runaway (U & I)',
      title: 'Runaway (U & I)', year: 2014, lang: 'en',
      sources: busca('Galantis', 'Runaway'),
    },
    {
      id: 'song-where-are-u-now', cat: 'song-electronica', franchise: 'Jack Ü y Justin Bieber', game: 'Where Are Ü Now',
      title: 'Where Are Ü Now', year: 2015, lang: 'en',
      sources: busca('Jack Ü', 'Where Are Ü Now'),
    },
    {
      id: 'song-ocean-drive', cat: 'song-electronica', franchise: 'Duke Dumont', game: 'Ocean Drive',
      title: 'Ocean Drive', year: 2015, lang: 'en',
      sources: busca('Duke Dumont', 'Ocean Drive'),
    },
    {
      id: 'song-more-than-you-know', cat: 'song-electronica', franchise: 'Axwell /\\ Ingrosso', game: 'More Than You Know',
      title: 'More Than You Know', year: 2017, lang: 'en',
      sources: busca('Axwell /\ Ingrosso', 'More Than You Know'),
    },
    {
      id: 'song-losing-it-fisher', cat: 'song-electronica', franchise: 'Fisher', game: 'Losing It',
      title: 'Losing It', year: 2018,
      sources: busca('Fisher', 'Losing It'),
    },
    {
      id: 'song-piece-of-your-heart', cat: 'song-electronica', franchise: 'Meduza', game: 'Piece of Your Heart',
      title: 'Piece of Your Heart', year: 2019, lang: 'en',
      sources: busca('Meduza', 'Piece of Your Heart'),
    },
    {
      id: 'song-ride-it-regard', cat: 'song-electronica', franchise: 'Regard', game: 'Ride It',
      title: 'Ride It', year: 2019, lang: 'en',
      sources: busca('Regard', 'Ride It'),
    },
    {
      id: 'song-roses-imanbek', cat: 'song-electronica', franchise: 'SAINt JHN', game: 'Roses (Imanbek Remix)',
      title: 'Roses (Imanbek Remix)', year: 2019, lang: 'en',
      sources: busca('SAINt JHN', 'Roses'),
    },
    {
      id: 'song-the-business', cat: 'song-electronica', franchise: 'Tiësto', game: 'The Business',
      title: 'The Business', year: 2020, lang: 'en',
      sources: busca('Tiësto', 'The Business'),
    },
    {
      id: 'song-do-it-to-it', cat: 'song-electronica', franchise: 'ACRAZE', game: 'Do It To It',
      title: 'Do It To It', year: 2021, lang: 'en',
      sources: busca('ACRAZE', 'Do It To It'),
    },
    {
      id: 'song-delilah-fred-again', cat: 'song-electronica', franchise: 'Fred again..', game: 'Delilah (pull me out of this)',
      title: 'Delilah (pull me out of this)', year: 2022, lang: 'en',
      sources: busca('Fred again..', 'Delilah'),
    },
    {
      id: 'song-nanana-peggy-gou', cat: 'song-electronica', franchise: 'Peggy Gou', game: '(It Goes Like) Nanana',
      title: '(It Goes Like) Nanana', year: 2023, lang: 'en',
      sources: busca('Peggy Gou', 'Nanana'),
    },
    {
      id: 'song-im-good-blue', cat: 'song-electronica', franchise: 'David Guetta y Bebe Rexha', game: 'I\'m Good (Blue)',
      title: 'I\'m Good (Blue)', year: 2022, lang: 'en',
      sources: busca('David Guetta', 'I\'m Good (Blue)'),
    },
    {
      id: 'song-where-you-are-john-summit', cat: 'song-electronica', franchise: 'John Summit y Hayla', game: 'Where You Are',
      title: 'Where You Are', year: 2023, lang: 'en',
      sources: busca('John Summit', 'Where You Are'),
    },
    {
      id: 'song-manto-estelar-moenia', cat: 'song-electronica', franchise: 'Moenia', game: 'Manto estelar',
      title: 'Manto estelar', year: 1999, lang: 'es',
      sources: busca('Moenia', 'Manto estelar'),
    },
    {
      id: 'song-no-dices-mas-moenia', cat: 'song-electronica', franchise: 'Moenia', game: 'No dices más',
      title: 'No dices más', year: 1999, lang: 'es',
      sources: busca('Moenia', 'No dices más'),
    },
    {
      id: 'song-ni-tu-ni-nadie-moenia', cat: 'song-electronica', franchise: 'Moenia', game: 'Ni tú ni nadie',
      title: 'Ni tú ni nadie', year: 2004, lang: 'es',
      sources: busca('Moenia', 'Ni tú ni nadie'),
    },
    {
      id: 'song-morir-tres-veces', cat: 'song-electronica', franchise: 'Moenia', game: 'Morir tres veces',
      title: 'Morir tres veces', year: 2006, lang: 'es',
      sources: busca('Moenia', 'Morir tres veces'),
    },
    {
      id: 'song-en-que-momento', cat: 'song-electronica', franchise: 'Moenia', game: '¿En qué momento?',
      title: '¿En qué momento?', year: 2001, lang: 'es',
      sources: busca('Moenia', '¿En qué momento?'),
    },
    {
      id: 'song-dejame-entrar-moenia', cat: 'song-electronica', franchise: 'Moenia', game: 'Déjame entrar',
      title: 'Déjame entrar', year: 1999, lang: 'es',
      sources: busca('Moenia', 'Déjame entrar'),
    },
    {
      id: 'song-estabas-ahi-moenia', cat: 'song-electronica', franchise: 'Moenia', game: 'Estabas ahí',
      title: 'Estabas ahí', year: 1997, lang: 'es',
      sources: busca('Moenia', 'Estabas ahí'),
    },
    {
      id: 'song-no-puedo-estar-sin-ti', cat: 'song-electronica', franchise: 'Moenia', game: 'No puedo estar sin ti',
      title: 'No puedo estar sin ti', year: 1997, lang: 'es',
      sources: busca('Moenia', 'No puedo estar sin ti'),
    },
    {
      id: 'song-llegaste-a-mi-moenia', cat: 'song-electronica', franchise: 'Moenia', game: 'Llegaste a mí',
      title: 'Llegaste a mí', year: 2001, lang: 'es',
      sources: busca('Moenia', 'Llegaste a mí'),
    },
    {
      id: 'song-prohibido-besar-moenia', cat: 'song-electronica', franchise: 'Moenia', game: 'Prohibido besar',
      title: 'Prohibido besar', year: 2003, lang: 'es',
      sources: busca('Moenia', 'Prohibido besar'),
    },
    {
      id: 'song-cada-que-belanova', cat: 'song-electronica', franchise: 'Belanova', game: 'Cada que...',
      title: 'Cada que...', year: 2007, lang: 'es',
      sources: busca('Belanova', 'Cada que...'),
    },
    {
      id: 'song-paso-el-tiempo-belanova', cat: 'song-electronica', franchise: 'Belanova', game: 'Paso el tiempo',
      title: 'Paso el tiempo', year: 2007, lang: 'es',
      sources: busca('Belanova', 'Paso el tiempo'),
    },
    {
      id: 'song-me-pregunto-belanova', cat: 'song-electronica', franchise: 'Belanova', game: 'Me pregunto',
      title: 'Me pregunto', year: 2005, lang: 'es',
      sources: busca('Belanova', 'Me pregunto'),
    },
    {
      id: 'song-tus-ojos-belanova', cat: 'song-electronica', franchise: 'Belanova', game: 'Tus ojos',
      title: 'Tus ojos', year: 2003, lang: 'es',
      sources: busca('Belanova', 'Tus ojos'),
    },
    {
      id: 'song-one-two-three-go', cat: 'song-electronica', franchise: 'Belanova', game: '1, 2, 3, Go!',
      title: '1, 2, 3, Go!', year: 2007, lang: 'es',
      sources: busca('Belanova', '1, 2, 3, Go!'),
    },
    {
      id: 'song-mariposas-belanova', cat: 'song-electronica', franchise: 'Belanova', game: 'Mariposas',
      title: 'Mariposas', year: 2011, lang: 'es',
      sources: busca('Belanova', 'Mariposas'),
    },
    {
      id: 'song-nada-es-igual-belanova', cat: 'song-electronica', franchise: 'Belanova', game: 'Nada de más',
      title: 'Nada de más', year: 2010, lang: 'es',
      sources: busca('Belanova', 'Nada de más'),
    },
    {
      id: 'song-no-se-que-me-das', cat: 'song-electronica', franchise: 'Fangoria', game: 'No sé qué me das',
      title: 'No sé qué me das', year: 2001, lang: 'es',
      sources: busca('Fangoria', 'No sé qué me das'),
    },
    {
      id: 'song-retorciendo-palabras', cat: 'song-electronica', franchise: 'Fangoria', game: 'Retorciendo palabras',
      title: 'Retorciendo palabras', year: 2004, lang: 'es',
      sources: busca('Fangoria', 'Retorciendo palabras'),
    },
    {
      id: 'song-miro-la-vida-pasar', cat: 'song-electronica', franchise: 'Fangoria', game: 'Miro la vida pasar',
      title: 'Miro la vida pasar', year: 2004, lang: 'es',
      sources: busca('Fangoria', 'Miro la vida pasar'),
    },
    {
      id: 'song-criticar-por-criticar', cat: 'song-electronica', franchise: 'Fangoria', game: 'Criticar por criticar',
      title: 'Criticar por criticar', year: 2006, lang: 'es',
      sources: busca('Fangoria', 'Criticar por criticar'),
    },
    {
      id: 'song-dramas-y-comedias', cat: 'song-electronica', franchise: 'Fangoria', game: 'Dramas y comedias',
      title: 'Dramas y comedias', year: 2013, lang: 'es',
      sources: busca('Fangoria', 'Dramas y comedias'),
    },
    {
      id: 'song-geometria-polifacetica', cat: 'song-electronica', franchise: 'Fangoria', game: 'Geometría polifacética',
      title: 'Geometría polifacética', year: 2016, lang: 'es',
      sources: busca('Fangoria', 'Geometría polifacética'),
    },
    {
      id: 'song-fiesta-en-el-infierno', cat: 'song-electronica', franchise: 'Fangoria', game: 'Fiesta en el infierno',
      title: 'Fiesta en el infierno', year: 2016, lang: 'es',
      sources: busca('Fangoria', 'Fiesta en el infierno'),
    },
    {
      id: 'song-espectacular-fangoria', cat: 'song-electronica', franchise: 'Fangoria', game: 'Espectacular',
      title: 'Espectacular', year: 2017, lang: 'es',
      sources: busca('Fangoria', 'Espectacular'),
    },
    {
      id: 'song-eternamente-inocente', cat: 'song-electronica', franchise: 'Fangoria', game: 'Eternamente inocente',
      title: 'Eternamente inocente', year: 2001, lang: 'es',
      sources: busca('Fangoria', 'Eternamente inocente'),
    },
    {
      id: 'song-historias-de-amor-obk', cat: 'song-electronica', franchise: 'OBK', game: 'Historias de amor',
      title: 'Historias de amor', year: 1991, lang: 'es',
      sources: busca('OBK', 'Historias de amor'),
    },
    {
      id: 'song-de-que-me-sirve-llorar', cat: 'song-electronica', franchise: 'OBK', game: 'De qué me sirve llorar',
      title: 'De qué me sirve llorar', year: 1991, lang: 'es',
      sources: busca('OBK', 'De qué me sirve llorar'),
    },
    {
      id: 'song-el-cielo-no-entiende', cat: 'song-electronica', franchise: 'OBK', game: 'El cielo no entiende',
      title: 'El cielo no entiende', year: 2000, lang: 'es',
      sources: busca('OBK', 'El cielo no entiende'),
    },
    {
      id: 'song-tu-sigue-asi-obk', cat: 'song-electronica', franchise: 'OBK', game: 'Tú sigue así',
      title: 'Tú sigue así', year: 2001, lang: 'es',
      sources: busca('OBK', 'Tú sigue así'),
    },
    {
      id: 'song-falsa-moral-obk', cat: 'song-electronica', franchise: 'OBK', game: 'Falsa moral',
      title: 'Falsa moral', year: 2001, lang: 'es',
      sources: busca('OBK', 'Falsa moral'),
    },
    {
      id: 'song-la-princesa-de-mis-suenos', cat: 'song-electronica', franchise: 'OBK', game: 'La princesa de mis sueños',
      title: 'La princesa de mis sueños', year: 1995, lang: 'es',
      sources: busca('OBK', 'La princesa de mis sueños'),
    },
    {
      id: 'song-quiereme-otra-vez', cat: 'song-electronica', franchise: 'OBK', game: 'Quiéreme otra vez',
      title: 'Quiéreme otra vez', year: 2003, lang: 'es',
      sources: busca('OBK', 'Quiéreme otra vez'),
    },
    {
      id: 'song-loco-mia-tema', cat: 'song-electronica', franchise: 'Loco Mía', game: 'Loco Mía',
      title: 'Loco Mía', year: 1989, lang: 'es',
      sources: busca('Loco Mía', 'Loco Mía'),
    },
    {
      id: 'song-rumba-samba-mambo', cat: 'song-electronica', franchise: 'Loco Mía', game: 'Rumba, samba, mambo',
      title: 'Rumba, samba, mambo', year: 1990, lang: 'es',
      sources: busca('Loco Mía', 'Rumba, samba, mambo'),
    },
    {
      id: 'song-gorbachov-locomia', cat: 'song-electronica', franchise: 'Loco Mía', game: 'Gorbachov',
      title: 'Gorbachov', year: 1991, lang: 'es',
      sources: busca('Loco Mía', 'Gorbachov'),
    },
    {
      id: 'song-asi-me-gusta-a-mi', cat: 'song-electronica', franchise: 'Chimo Bayo', game: 'Así me gusta a mí',
      title: 'Así me gusta a mí', year: 1991, lang: 'es',
      sources: busca('Chimo Bayo', 'Así me gusta a mí'),
    },
    {
      id: 'song-quimica-chimo-bayo', cat: 'song-electronica', franchise: 'Chimo Bayo', game: 'Química',
      title: 'Química', year: 1992, lang: 'es',
      sources: busca('Chimo Bayo', 'Química'),
    },
    {
      id: 'song-bombas-chimo-bayo', cat: 'song-electronica', franchise: 'Chimo Bayo', game: 'Bombas',
      title: 'Bombas', year: 1992, lang: 'es',
      sources: busca('Chimo Bayo', 'Bombas'),
    },
    {
      id: 'song-dónde-estan-sentidos', cat: 'song-electronica', franchise: 'Sentidos Opuestos', game: '¿Dónde están?',
      title: '¿Dónde están?', year: 1996, lang: 'es',
      sources: busca('Sentidos Opuestos', '¿Dónde están?'),
    },
    {
      id: 'song-amor-de-papel', cat: 'song-electronica', franchise: 'Sentidos Opuestos', game: 'Amor de papel',
      title: 'Amor de papel', year: 1998, lang: 'es',
      sources: busca('Sentidos Opuestos', 'Amor de papel'),
    },
    {
      id: 'song-fiesta-sentidos', cat: 'song-electronica', franchise: 'Sentidos Opuestos', game: 'Fiesta',
      title: 'Fiesta', year: 1999, lang: 'es',
      sources: busca('Sentidos Opuestos', 'Fiesta'),
    },
    {
      id: 'song-ardiente-tentacion', cat: 'song-electronica', franchise: 'Sentidos Opuestos', game: 'Ardiente tentación',
      title: 'Ardiente tentación', year: 1999, lang: 'es',
      sources: busca('Sentidos Opuestos', 'Ardiente tentación'),
    },
    {
      id: 'song-mirame-sentidos', cat: 'song-electronica', franchise: 'Sentidos Opuestos', game: 'Mírame',
      title: 'Mírame', year: 1996, lang: 'es',
      sources: busca('Sentidos Opuestos', 'Mírame'),
    },
    {
      id: 'song-mai-mai-kabah', cat: 'song-electronica', franchise: 'Kabah', game: 'Mai Mai',
      title: 'Mai Mai', year: 1998, lang: 'es',
      sources: busca('Kabah', 'Mai Mai'),
    },
    {
      id: 'song-antro-kabah', cat: 'song-electronica', franchise: 'Kabah', game: 'Antro',
      title: 'Antro', year: 2000, lang: 'es',
      sources: busca('Kabah', 'Antro'),
    },
    {
      id: 'song-espada-javiera-mena', cat: 'song-electronica', franchise: 'Javiera Mena', game: 'Espada',
      title: 'Espada', year: 2013, lang: 'es',
      sources: busca('Javiera Mena', 'Espada'),
    },
    {
      id: 'song-otra-era-javiera', cat: 'song-electronica', franchise: 'Javiera Mena', game: 'Otra era',
      title: 'Otra era', year: 2014, lang: 'es',
      sources: busca('Javiera Mena', 'Otra era'),
    },
    {
      id: 'song-luz-de-piedra-de-luna', cat: 'song-electronica', franchise: 'Javiera Mena', game: 'Luz de piedra de luna',
      title: 'Luz de piedra de luna', year: 2010, lang: 'es',
      sources: busca('Javiera Mena', 'Luz de piedra de luna'),
    },
    {
      id: 'song-xt4s1s-danna', cat: 'song-electronica', franchise: 'Danna Paola', game: 'XT4S1S',
      title: 'XT4S1S', year: 2022, lang: 'es',
      sources: busca('Danna Paola', 'XT4S1S'),
    },
    {
      id: 'song-1trago-danna', cat: 'song-electronica', franchise: 'Danna Paola', game: '1Trago',
      title: '1Trago', year: 2023, lang: 'es',
      sources: busca('Danna Paola', '1Trago'),
    },
    {
      id: 'song-prisionero-miranda', cat: 'song-electronica', franchise: 'Miranda!', game: 'Prisionero',
      title: 'Prisionero', year: 2007, lang: 'es',
      sources: busca('Miranda!', 'Prisionero'),
    },
    {
      id: 'song-yo-te-dire-miranda', cat: 'song-electronica', franchise: 'Miranda!', game: 'Yo te diré',
      title: 'Yo te diré', year: 2004, lang: 'es',
      sources: busca('Miranda!', 'Yo te diré'),
    },
    {
      id: 'song-traicion-miranda', cat: 'song-electronica', franchise: 'Miranda!', game: 'Traición',
      title: 'Traición', year: 2004, lang: 'es',
      sources: busca('Miranda!', 'Traición'),
    },
    {
      id: 'song-hola-miranda', cat: 'song-electronica', franchise: 'Miranda!', game: 'Hola',
      title: 'Hola', year: 2007, lang: 'es',
      sources: busca('Miranda!', 'Hola'),
    },
    {
      id: 'song-enamorada-miranda', cat: 'song-electronica', franchise: 'Miranda!', game: 'Enamorada',
      title: 'Enamorada', year: 2007, lang: 'es',
      sources: busca('Miranda!', 'Enamorada'),
    },
    {
      id: 'song-mentia-miranda', cat: 'song-electronica', franchise: 'Miranda!', game: 'Mentía',
      title: 'Mentía', year: 2009, lang: 'es',
      sources: busca('Miranda!', 'Mentía'),
    },
    {
      id: 'song-nalguita-plastilina', cat: 'song-electronica', franchise: 'Plastilina Mosh', game: 'Nalguita',
      title: 'Nalguita', year: 2003, lang: 'es',
      sources: busca('Plastilina Mosh', 'Nalguita'),
    },
    {
      id: 'song-peligroso-pop', cat: 'song-electronica', franchise: 'Plastilina Mosh', game: 'Peligroso pop',
      title: 'Peligroso pop', year: 2003, lang: 'es',
      sources: busca('Plastilina Mosh', 'Peligroso pop'),
    },
    {
      id: 'song-soun-tha-mi-primer-amor', cat: 'song-electronica', franchise: 'Kinky', game: 'Soun Tha Mi Primer Amor',
      title: 'Soun Tha Mi Primer Amor', year: 2002, lang: 'es',
      sources: busca('Kinky', 'Soun Tha Mi Primer Amor'),
    },
    {
      id: 'song-a-donde-van-los-muertos', cat: 'song-electronica', franchise: 'Kinky', game: '¿A dónde van los muertos?',
      title: '¿A dónde van los muertos?', year: 2006, lang: 'es',
      sources: busca('Kinky', '¿A dónde van los muertos?'),
    },
    {
      id: 'song-coqueta-kinky', cat: 'song-electronica', franchise: 'Kinky', game: 'Coqueta',
      title: 'Coqueta', year: 2006, lang: 'es',
      sources: busca('Kinky', 'Coqueta'),
    },
    {
      id: 'song-hasta-quemarnos', cat: 'song-electronica', franchise: 'Kinky', game: 'Hasta quemarnos',
      title: 'Hasta quemarnos', year: 2008, lang: 'es',
      sources: busca('Kinky', 'Hasta quemarnos'),
    },
    {
      id: 'song-tijuana-sound-machine', cat: 'song-electronica', franchise: 'Nortec Collective', game: 'Tijuana Sound Machine',
      title: 'Tijuana Sound Machine', year: 2008, lang: 'es',
      sources: busca('Nortec Collective', 'Tijuana Sound Machine'),
    },
    {
      id: 'song-polaris-nortec', cat: 'song-electronica', franchise: 'Nortec Collective', game: 'Polaris',
      title: 'Polaris', year: 2005, lang: 'es',
      sources: busca('Nortec Collective', 'Polaris'),
    },
    {
      id: 'song-tengo-la-voz', cat: 'song-electronica', franchise: 'Nortec Collective', game: 'Tengo la voz',
      title: 'Tengo la voz', year: 2008, lang: 'es',
      sources: busca('Nortec Collective', 'Tengo la voz'),
    },
    {
      id: 'song-sesion-villano-bizarrap', cat: 'song-electronica', franchise: 'Bizarrap y Villano Antillano', game: 'Villano Antillano: Bzrp Music Sessions, Vol. 51',
      title: 'Villano Antillano: Bzrp Music Sessions, Vol. 51', year: 2022, lang: 'es',
      sources: busca('Bizarrap y Villano Antillano', 'Villano Antillano: Bzrp Music Sessions, Vol. 51'),
    },
    {
      id: 'song-sesion-tiago-bizarrap', cat: 'song-electronica', franchise: 'Bizarrap y Tiago PZK', game: 'Tiago PZK: Bzrp Music Sessions, Vol. 48',
      title: 'Tiago PZK: Bzrp Music Sessions, Vol. 48', year: 2021, lang: 'es',
      sources: busca('Bizarrap y Tiago PZK', 'Tiago PZK: Bzrp Music Sessions, Vol. 48'),
    },
    {
      id: 'song-sesion-snow-bizarrap', cat: 'song-electronica', franchise: 'Bizarrap y Snow Tha Product', game: 'Snow Tha Product: Bzrp Music Sessions, Vol. 39',
      title: 'Snow Tha Product: Bzrp Music Sessions, Vol. 39', year: 2021, lang: 'es',
      sources: busca('Bizarrap y Snow Tha Product', 'Snow Tha Product: Bzrp Music Sessions, Vol. 39'),
    },
    {
      id: 'song-sesion-anuel-bizarrap', cat: 'song-electronica', franchise: 'Bizarrap y Anuel AA', game: 'Anuel AA: Bzrp Music Sessions, Vol. 46',
      title: 'Anuel AA: Bzrp Music Sessions, Vol. 46', year: 2021, lang: 'es',
      sources: busca('Bizarrap y Anuel AA', 'Anuel AA: Bzrp Music Sessions, Vol. 46'),
    },
    {
      id: 'song-sesion-eladio-bizarrap', cat: 'song-electronica', franchise: 'Bizarrap y Eladio Carrión', game: 'Eladio Carrión: Bzrp Music Sessions, Vol. 40',
      title: 'Eladio Carrión: Bzrp Music Sessions, Vol. 40', year: 2021, lang: 'es',
      sources: busca('Bizarrap y Eladio Carrión', 'Eladio Carrión: Bzrp Music Sessions, Vol. 40'),
    },
    {
      id: 'song-sesion-nicky-jam-bizarrap', cat: 'song-electronica', franchise: 'Bizarrap y Nicky Jam', game: 'Nicky Jam: Bzrp Music Sessions, Vol. 41',
      title: 'Nicky Jam: Bzrp Music Sessions, Vol. 41', year: 2021, lang: 'es',
      sources: busca('Bizarrap y Nicky Jam', 'Nicky Jam: Bzrp Music Sessions, Vol. 41'),
    },
    {
      id: 'song-sesion-morfy-bizarrap', cat: 'song-electronica', franchise: 'Bizarrap y Morad', game: 'Morad: Bzrp Music Sessions, Vol. 47',
      title: 'Morad: Bzrp Music Sessions, Vol. 47', year: 2021, lang: 'es',
      sources: busca('Bizarrap y Morad', 'Morad: Bzrp Music Sessions, Vol. 47'),
    },
    {
      id: 'song-dispara-nicki-nicole', cat: 'song-electronica', franchise: 'Nicki Nicole y Milo J', game: 'DISPARA ***',
      title: 'DISPARA ***', year: 2023, lang: 'es',
      sources: busca('Nicki Nicole y Milo J', 'DISPARA ***'),
    },
    {
      id: 'song-ojo-blindado-sumo', cat: 'song-electronica', franchise: 'Sumo', game: 'El ojo blindado',
      title: 'El ojo blindado', year: 1987, lang: 'es',
      sources: busca('Sumo', 'El ojo blindado'),
    },
    {
      id: 'song-el-tiempo-es-dinero', cat: 'song-electronica', franchise: 'Soda Stereo', game: 'El tiempo es dinero',
      title: 'El tiempo es dinero', year: 1984, lang: 'es',
      sources: busca('Soda Stereo', 'El tiempo es dinero'),
    },
    {
      id: 'song-claroscuro-la-ley', cat: 'song-electronica', franchise: 'La Ley', game: 'El duelo',
      title: 'El duelo', year: 1995, lang: 'es',
      sources: busca('La Ley', 'El duelo'),
    },
    {
      id: 'song-dia-cero-la-ley', cat: 'song-electronica', franchise: 'La Ley', game: 'Día cero',
      title: 'Día cero', year: 1995, lang: 'es',
      sources: busca('La Ley', 'Día cero'),
    },
    {
      id: 'song-aqui-la-ley', cat: 'song-electronica', franchise: 'La Ley', game: 'Aquí',
      title: 'Aquí', year: 2000, lang: 'es',
      sources: busca('La Ley', 'Aquí'),
    },
    {
      id: 'song-mentira-la-ley', cat: 'song-electronica', franchise: 'La Ley', game: 'Mentira',
      title: 'Mentira', year: 2001, lang: 'es',
      sources: busca('La Ley', 'Mentira'),
    },
    {
      id: 'song-fuera-de-mi-la-ley', cat: 'song-electronica', franchise: 'La Ley', game: 'Fuera de mí',
      title: 'Fuera de mí', year: 2000, lang: 'es',
      sources: busca('La Ley', 'Fuera de mí'),
    },
    {
      id: 'song-sensacion-del-bloque', cat: 'song-electronica', franchise: 'De La Ghetto y Randy', game: 'Sensación del bloque',
      title: 'Sensación del bloque', year: 2006, lang: 'es',
      sources: busca('De La Ghetto y Randy', 'Sensación del bloque'),
    },
    {
      id: 'song-los-aparatos-el-alfa', cat: 'song-electronica', franchise: 'El Alfa', game: 'Los aparatos',
      title: 'Los aparatos', year: 2022, lang: 'es',
      sources: busca('El Alfa', 'Los aparatos'),
    },
    {
      id: 'song-curazao-el-alfa', cat: 'song-electronica', franchise: 'El Alfa', game: 'Curazao',
      title: 'Curazao', year: 2021, lang: 'es',
      sources: busca('El Alfa', 'Curazao'),
    },
    {
      id: 'song-singapur-el-alfa', cat: 'song-electronica', franchise: 'El Alfa', game: 'Singapur',
      title: 'Singapur', year: 2020, lang: 'es',
      sources: busca('El Alfa', 'Singapur'),
    },
    {
      id: 'song-este-ritmo-se-baila-asi', cat: 'song-electronica', franchise: 'Chayanne', game: 'Este ritmo se baila así',
      title: 'Este ritmo se baila así', year: 1988, lang: 'es',
      sources: busca('Chayanne', 'Este ritmo se baila así'),
    },
    {
      id: 'song-provocame-chayanne', cat: 'song-electronica', franchise: 'Chayanne', game: 'Provócame',
      title: 'Provócame', year: 1992, lang: 'es',
      sources: busca('Chayanne', 'Provócame'),
    },
    {
      id: 'song-boom-boom-chayanne', cat: 'song-electronica', franchise: 'Chayanne', game: 'Boom boom',
      title: 'Boom boom', year: 2000, lang: 'es',
      sources: busca('Chayanne', 'Boom boom'),
    },
    {
      id: 'song-fiesta-en-america', cat: 'song-electronica', franchise: 'Chayanne', game: 'Fiesta en América',
      title: 'Fiesta en América', year: 1987, lang: 'es',
      sources: busca('Chayanne', 'Fiesta en América'),
    },
    {
      id: 'song-lo-dejaria-todo-dance', cat: 'song-electronica', franchise: 'Chayanne', game: 'Caprichosa',
      title: 'Caprichosa', year: 2003, lang: 'es',
      sources: busca('Chayanne', 'Caprichosa'),
    },
    {
      id: 'song-suavemente-elvis-crespo', cat: 'song-electronica', franchise: 'Elvis Crespo', game: 'Suavemente',
      title: 'Suavemente', year: 1998, lang: 'es',
      sources: busca('Elvis Crespo', 'Suavemente'),
    },
    {
      id: 'song-pintame-elvis-crespo', cat: 'song-electronica', franchise: 'Elvis Crespo', game: 'Píntame',
      title: 'Píntame', year: 1999, lang: 'es',
      sources: busca('Elvis Crespo', 'Píntame'),
    },
    {
      id: 'song-tu-sonrisa-elvis', cat: 'song-electronica', franchise: 'Elvis Crespo', game: 'Tu sonrisa',
      title: 'Tu sonrisa', year: 1998, lang: 'es',
      sources: busca('Elvis Crespo', 'Tu sonrisa'),
    },
    {
      id: 'song-la-vida-es-un-carnaval-dance', cat: 'song-electronica', franchise: 'Celia Cruz', game: 'Yo viviré (I Will Survive)',
      title: 'Yo viviré (I Will Survive)', year: 1998, lang: 'es',
      sources: busca('Celia Cruz', 'Yo viviré (I Will Survive)'),
    },
    {
      id: 'song-que-le-den-candela', cat: 'song-electronica', franchise: 'Celia Cruz', game: 'Que le den candela',
      title: 'Que le den candela', year: 1998, lang: 'es',
      sources: busca('Celia Cruz', 'Que le den candela'),
    },
    {
      id: 'song-carnaval-maluma', cat: 'song-electronica', franchise: 'Maluma', game: 'Carnaval',
      title: 'Carnaval', year: 2014, lang: 'es',
      sources: busca('Maluma', 'Carnaval'),
    },
    {
      id: 'song-technologic-daft', cat: 'song-electronica', franchise: 'Daft Punk', game: 'Technologic',
      title: 'Technologic', year: 2005, lang: 'en',
      sources: busca('Daft Punk', 'Technologic'),
    },
    {
      id: 'song-digital-love-daft', cat: 'song-electronica', franchise: 'Daft Punk', game: 'Digital Love',
      title: 'Digital Love', year: 2001, lang: 'en',
      sources: busca('Daft Punk', 'Digital Love'),
    },
    {
      id: 'song-da-funk-daft', cat: 'song-electronica', franchise: 'Daft Punk', game: 'Da Funk',
      title: 'Da Funk', year: 1995, lang: 'en',
      sources: busca('Daft Punk', 'Da Funk'),
    },
    {
      id: 'song-sweet-nothing-calvin', cat: 'song-electronica', franchise: 'Calvin Harris y Florence Welch', game: 'Sweet Nothing',
      title: 'Sweet Nothing', year: 2012, lang: 'en',
      sources: busca('Calvin Harris y Florence Welch', 'Sweet Nothing'),
    },
    {
      id: 'song-i-need-your-love-calvin', cat: 'song-electronica', franchise: 'Calvin Harris y Ellie Goulding', game: 'I Need Your Love',
      title: 'I Need Your Love', year: 2012, lang: 'en',
      sources: busca('Calvin Harris y Ellie Goulding', 'I Need Your Love'),
    },
    {
      id: 'song-blame-calvin-harris', cat: 'song-electronica', franchise: 'Calvin Harris y John Newman', game: 'Blame',
      title: 'Blame', year: 2014, lang: 'en',
      sources: busca('Calvin Harris y John Newman', 'Blame'),
    },
    {
      id: 'song-without-you-avicii', cat: 'song-electronica', franchise: 'Avicii y Sandro Cavazza', game: 'Without You',
      title: 'Without You', year: 2017, lang: 'en',
      sources: busca('Avicii y Sandro Cavazza', 'Without You'),
    },
    {
      id: 'song-sos-avicii', cat: 'song-electronica', franchise: 'Avicii y Aloe Blacc', game: 'SOS',
      title: 'SOS', year: 2019, lang: 'en',
      sources: busca('Avicii y Aloe Blacc', 'SOS'),
    },
    {
      id: 'song-waiting-for-love-avicii', cat: 'song-electronica', franchise: 'Avicii', game: 'Waiting for Love',
      title: 'Waiting for Love', year: 2015, lang: 'en',
      sources: busca('Avicii', 'Waiting for Love'),
    },
    {
      id: 'song-play-hard-guetta', cat: 'song-electronica', franchise: 'David Guetta, Ne-Yo y Akon', game: 'Play Hard',
      title: 'Play Hard', year: 2012, lang: 'en',
      sources: busca('David Guetta, Ne-Yo y Akon', 'Play Hard'),
    },
    {
      id: 'song-without-you-guetta', cat: 'song-electronica', franchise: 'David Guetta y Usher', game: 'Without You',
      title: 'Without You', year: 2011, lang: 'en',
      sources: busca('David Guetta y Usher', 'Without You'),
    },
    {
      id: 'song-when-love-takes-over', cat: 'song-electronica', franchise: 'David Guetta y Kelly Rowland', game: 'When Love Takes Over',
      title: 'When Love Takes Over', year: 2009, lang: 'en',
      sources: busca('David Guetta y Kelly Rowland', 'When Love Takes Over'),
    },
    {
      id: 'song-galvanize-chemical', cat: 'song-electronica', franchise: 'The Chemical Brothers', game: 'Galvanize',
      title: 'Galvanize', year: 2005, lang: 'en',
      sources: busca('The Chemical Brothers', 'Galvanize'),
    },
    {
      id: 'song-block-rockin-beats', cat: 'song-electronica', franchise: 'The Chemical Brothers', game: 'Block Rockin\' Beats',
      title: 'Block Rockin\' Beats', year: 1997, lang: 'en',
      sources: busca('The Chemical Brothers', 'Block Rockin\' Beats'),
    },
    {
      id: 'song-praise-you-fatboy', cat: 'song-electronica', franchise: 'Fatboy Slim', game: 'Praise You',
      title: 'Praise You', year: 1998, lang: 'en',
      sources: busca('Fatboy Slim', 'Praise You'),
    },
    /* ───────────── Cumbia (100) ───────────── */
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
    {
      id: 'song-la-pava-congona', cat: 'song-cumbia', franchise: 'Andrés Landero', game: 'La pava congona',
      title: 'La pava congona', year: 1970, lang: 'es',
      sources: busca('Andrés Landero', 'La pava congona'),
    },
    {
      id: 'song-el-ausente-pastor', cat: 'song-cumbia', franchise: 'Pastor López', game: 'El ausente',
      title: 'El ausente', year: 1980, lang: 'es',
      sources: busca('Pastor López', 'El ausente'),
    },
    {
      id: 'song-golpe-con-golpe', cat: 'song-cumbia', franchise: 'Pastor López', game: 'Golpe con golpe',
      title: 'Golpe con golpe', year: 1979, lang: 'es',
      sources: busca('Pastor López', 'Golpe con golpe'),
    },
    {
      id: 'song-traicionera-pastor', cat: 'song-cumbia', franchise: 'Pastor López', game: 'Traicionera',
      title: 'Traicionera', year: 1978, lang: 'es',
      sources: busca('Pastor López', 'Traicionera'),
    },
    {
      id: 'song-la-colegiala', cat: 'song-cumbia', franchise: 'Rodolfo Aicardi', game: 'La colegiala',
      title: 'La colegiala', year: 1980, lang: 'es',
      sources: busca('Rodolfo Aicardi', 'La colegiala'),
    },
    {
      id: 'song-carinito-aicardi', cat: 'song-cumbia', franchise: 'Rodolfo Aicardi', game: 'Cariñito',
      title: 'Cariñito', year: 1979, lang: 'es',
      sources: busca('Rodolfo Aicardi', 'Cariñito'),
    },
    {
      id: 'song-elsa-los-destellos', cat: 'song-cumbia', franchise: 'Los Destellos', game: 'Elsa',
      title: 'Elsa', year: 1970, lang: 'es',
      sources: busca('Los Destellos', 'Elsa'),
    },
    {
      id: 'song-cumbia-de-los-pajaritos', cat: 'song-cumbia', franchise: 'Cuarteto Continental', game: 'Cumbia de los pajaritos',
      title: 'Cumbia de los pajaritos', year: 1980, lang: 'es',
      sources: busca('Cuarteto Continental', 'Cumbia de los pajaritos'),
    },
    {
      id: 'song-capullo-y-sorullo', cat: 'song-cumbia', franchise: 'La Sonora Dinamita', game: 'Capullo y sorullo',
      title: 'Capullo y sorullo', year: 1986, lang: 'es',
      sources: busca('La Sonora Dinamita', 'Capullo y sorullo'),
    },
    {
      id: 'song-escandalo-dinamita', cat: 'song-cumbia', franchise: 'La Sonora Dinamita', game: 'Escándalo',
      title: 'Escándalo', year: 1989, lang: 'es',
      sources: busca('La Sonora Dinamita', 'Escándalo'),
    },
    {
      id: 'song-mil-horas-dinamita', cat: 'song-cumbia', franchise: 'La Sonora Dinamita', game: 'Mil horas',
      title: 'Mil horas', year: 1990, lang: 'es',
      sources: busca('La Sonora Dinamita', 'Mil horas'),
    },
    {
      id: 'song-oye-dinamita', cat: 'song-cumbia', franchise: 'La Sonora Dinamita', game: 'Oye',
      title: 'Oye', year: 1990, lang: 'es',
      sources: busca('La Sonora Dinamita', 'Oye'),
    },
    {
      id: 'song-maruja-dinamita', cat: 'song-cumbia', franchise: 'La Sonora Dinamita', game: 'Maruja',
      title: 'Maruja', year: 1985, lang: 'es',
      sources: busca('La Sonora Dinamita', 'Maruja'),
    },
    {
      id: 'song-de-quen-chon', cat: 'song-cumbia', franchise: 'Chico Che y La Crisis', game: 'De quén chón',
      title: 'De quén chón', year: 1988, lang: 'es',
      sources: busca('Chico Che y La Crisis', 'De quén chón'),
    },
    {
      id: 'song-el-colesterol', cat: 'song-cumbia', franchise: 'Fito Olivares', game: 'El colesterol',
      title: 'El colesterol', year: 1994, lang: 'es',
      sources: busca('Fito Olivares', 'El colesterol'),
    },
    {
      id: 'song-la-guera-salome', cat: 'song-cumbia', franchise: 'Fito Olivares', game: 'La güera Salomé',
      title: 'La güera Salomé', year: 1991, lang: 'es',
      sources: busca('Fito Olivares', 'La güera Salomé'),
    },
    {
      id: 'song-buscandola-los-bybys', cat: 'song-cumbia', franchise: 'Los Bybys', game: 'Buscándola',
      title: 'Buscándola', year: 1991, lang: 'es',
      sources: busca('Los Bybys', 'Buscándola'),
    },
    {
      id: 'song-un-sueno-angeles-de-charly', cat: 'song-cumbia', franchise: 'Los Ángeles de Charly', game: 'Un sueño',
      title: 'Un sueño', year: 2000, lang: 'es',
      sources: busca('Los Ángeles de Charly', 'Un sueño'),
    },
    {
      id: 'song-amor-secreto-angeles', cat: 'song-cumbia', franchise: 'Los Ángeles de Charly', game: 'Amor secreto',
      title: 'Amor secreto', year: 2000, lang: 'es',
      sources: busca('Los Ángeles de Charly', 'Amor secreto'),
    },
    {
      id: 'song-me-volvi-a-acordar-de-ti', cat: 'song-cumbia', franchise: 'Los Ángeles de Charly', game: 'Me volví a acordar de ti',
      title: 'Me volví a acordar de ti', year: 1999, lang: 'es',
      sources: busca('Los Ángeles de Charly', 'Me volví a acordar de ti'),
    },
    {
      id: 'song-tiene-espinas-el-rosal', cat: 'song-cumbia', franchise: 'Grupo Cañaveral', game: 'Tiene espinas el rosal',
      title: 'Tiene espinas el rosal', year: 1996, lang: 'es',
      sources: busca('Grupo Cañaveral', 'Tiene espinas el rosal'),
    },
    {
      id: 'song-no-te-voy-a-perdonar', cat: 'song-cumbia', franchise: 'Grupo Cañaveral', game: 'No te voy a perdonar',
      title: 'No te voy a perdonar', year: 1997, lang: 'es',
      sources: busca('Grupo Cañaveral', 'No te voy a perdonar'),
    },
    {
      id: 'song-hasta-el-cielo-lloro', cat: 'song-cumbia', franchise: 'Grupo Cañaveral', game: 'Hasta el cielo lloro',
      title: 'Hasta el cielo lloro', year: 1998, lang: 'es',
      sources: busca('Grupo Cañaveral', 'Hasta el cielo lloro'),
    },
    {
      id: 'song-todo-me-gusta-de-ti', cat: 'song-cumbia', franchise: 'Aarón y su Grupo Ilusión', game: 'Todo me gusta de ti',
      title: 'Todo me gusta de ti', year: 2001, lang: 'es',
      sources: busca('Aarón y su Grupo Ilusión', 'Todo me gusta de ti'),
    },
    {
      id: 'song-el-baile-de-la-ranita', cat: 'song-cumbia', franchise: 'Rayito Colombiano', game: 'El baile de la ranita',
      title: 'El baile de la ranita', year: 1998, lang: 'es',
      sources: busca('Rayito Colombiano', 'El baile de la ranita'),
    },
    {
      id: 'song-muchachita-consentida', cat: 'song-cumbia', franchise: 'Rayito Colombiano', game: 'Muchachita consentida',
      title: 'Muchachita consentida', year: 2001, lang: 'es',
      sources: busca('Rayito Colombiano', 'Muchachita consentida'),
    },
    {
      id: 'song-ay-el-amor-askis', cat: 'song-cumbia', franchise: 'Los Askis', game: '¡Ay! El amor',
      title: '¡Ay! El amor', year: 1999, lang: 'es',
      sources: busca('Los Askis', '¡Ay! El amor'),
    },
    {
      id: 'song-amor-regresa-askis', cat: 'song-cumbia', franchise: 'Los Askis', game: 'Amor regresa',
      title: 'Amor regresa', year: 1999, lang: 'es',
      sources: busca('Los Askis', 'Amor regresa'),
    },
    {
      id: 'song-vienes-y-te-vas', cat: 'song-cumbia', franchise: 'Los Askis', game: 'Vienes y te vas',
      title: 'Vienes y te vas', year: 2001, lang: 'es',
      sources: busca('Los Askis', 'Vienes y te vas'),
    },
    {
      id: 'song-llorar-socios-del-ritmo', cat: 'song-cumbia', franchise: 'Los Socios del Ritmo', game: 'Llorar',
      title: 'Llorar', year: 1999, lang: 'es',
      sources: busca('Los Socios del Ritmo', 'Llorar'),
    },
    {
      id: 'song-amor-de-mis-amores', cat: 'song-cumbia', franchise: 'Margarita la Diosa de la Cumbia', game: 'Amor de mis amores',
      title: 'Amor de mis amores', year: 1997, lang: 'es',
      sources: busca('Margarita la Diosa de la Cumbia', 'Amor de mis amores'),
    },
    {
      id: 'song-mi-bombon-margarita', cat: 'song-cumbia', franchise: 'Margarita la Diosa de la Cumbia', game: 'Mi bombón',
      title: 'Mi bombón', year: 2004, lang: 'es',
      sources: busca('Margarita la Diosa de la Cumbia', 'Mi bombón'),
    },
    {
      id: 'song-una-rafaga-de-amor', cat: 'song-cumbia', franchise: 'Ráfaga', game: 'Una ráfaga de amor',
      title: 'Una ráfaga de amor', year: 1999, lang: 'es',
      sources: busca('Ráfaga', 'Una ráfaga de amor'),
    },
    {
      id: 'song-luna-rafaga', cat: 'song-cumbia', franchise: 'Ráfaga', game: 'Luna',
      title: 'Luna', year: 1998, lang: 'es',
      sources: busca('Ráfaga', 'Luna'),
    },
    {
      id: 'song-no-me-arrepiento-de-este-amor', cat: 'song-cumbia', franchise: 'Gilda', game: 'No me arrepiento de este amor',
      title: 'No me arrepiento de este amor', year: 1996, lang: 'es',
      sources: busca('Gilda', 'No me arrepiento de este amor'),
    },
    {
      id: 'song-fuiste-gilda', cat: 'song-cumbia', franchise: 'Gilda', game: 'Fuiste',
      title: 'Fuiste', year: 1995, lang: 'es',
      sources: busca('Gilda', 'Fuiste'),
    },
    {
      id: 'song-se-me-ha-perdido-un-corazon', cat: 'song-cumbia', franchise: 'Gilda', game: 'Se me ha perdido un corazón',
      title: 'Se me ha perdido un corazón', year: 1997, lang: 'es',
      sources: busca('Gilda', 'Se me ha perdido un corazón'),
    },
    {
      id: 'song-se-te-ve-la-tanga', cat: 'song-cumbia', franchise: 'Damas Gratis', game: 'Se te ve la tanga',
      title: 'Se te ve la tanga', year: 2000, lang: 'es',
      sources: busca('Damas Gratis', 'Se te ve la tanga'),
    },
    {
      id: 'song-me-vas-a-extranar-damas', cat: 'song-cumbia', franchise: 'Damas Gratis', game: 'Me vas a extrañar',
      title: 'Me vas a extrañar', year: 2018, lang: 'es',
      sources: busca('Damas Gratis', 'Me vas a extrañar'),
    },
    {
      id: 'song-los-duenos-del-pabellon', cat: 'song-cumbia', franchise: 'Damas Gratis', game: 'Los dueños del pabellón',
      title: 'Los dueños del pabellón', year: 2001, lang: 'es',
      sources: busca('Damas Gratis', 'Los dueños del pabellón'),
    },
    {
      id: 'song-yo-tomo-licor', cat: 'song-cumbia', franchise: 'Amar Azul', game: 'Yo tomo licor',
      title: 'Yo tomo licor', year: 1997, lang: 'es',
      sources: busca('Amar Azul', 'Yo tomo licor'),
    },
    {
      id: 'song-el-polvito-del-amor', cat: 'song-cumbia', franchise: 'Amar Azul', game: 'El polvito del amor',
      title: 'El polvito del amor', year: 1998, lang: 'es',
      sources: busca('Amar Azul', 'El polvito del amor'),
    },
    {
      id: 'song-porque-te-amo-la-cumbia', cat: 'song-cumbia', franchise: 'La Cumbia', game: 'Porque te amo',
      title: 'Porque te amo', year: 1997, lang: 'es',
      sources: busca('La Cumbia', 'Porque te amo'),
    },
    {
      id: 'song-una-calle-me-separa', cat: 'song-cumbia', franchise: 'Néstor en Bloque', game: 'Una calle me separa',
      title: 'Una calle me separa', year: 2006, lang: 'es',
      sources: busca('Néstor en Bloque', 'Una calle me separa'),
    },
    {
      id: 'song-deja-de-llorar-polaco', cat: 'song-cumbia', franchise: 'El Polaco', game: 'Deja de llorar',
      title: 'Deja de llorar', year: 2007, lang: 'es',
      sources: busca('El Polaco', 'Deja de llorar'),
    },
    {
      id: 'song-la-cumbia-de-los-trapos', cat: 'song-cumbia', franchise: 'Yerba Brava', game: 'La cumbia de los trapos',
      title: 'La cumbia de los trapos', year: 2001, lang: 'es',
      sources: busca('Yerba Brava', 'La cumbia de los trapos'),
    },
    {
      id: 'song-el-bombon-palmeras', cat: 'song-cumbia', franchise: 'Los Palmeras', game: 'El bombón',
      title: 'El bombón', year: 2006, lang: 'es',
      sources: busca('Los Palmeras', 'El bombón'),
    },
    {
      id: 'song-olvidala-palmeras', cat: 'song-cumbia', franchise: 'Los Palmeras', game: 'Olvídala',
      title: 'Olvídala', year: 2007, lang: 'es',
      sources: busca('Los Palmeras', 'Olvídala'),
    },
    {
      id: 'song-un-finde-ke-personajes', cat: 'song-cumbia', franchise: 'Ke Personajes, Big One y FMK', game: 'Un finde',
      title: 'Un finde', year: 2023, lang: 'es',
      sources: busca('Ke Personajes', 'Un finde'),
    },
    {
      id: 'song-pobre-corazon-ke-personajes', cat: 'song-cumbia', franchise: 'Ke Personajes y Onda Sabanera', game: 'Pobre corazón',
      title: 'Pobre corazón', year: 2023, lang: 'es',
      sources: busca('Ke Personajes', 'Pobre corazón'),
    },
    /* ───────────── Salsa (100) ───────────── */
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
    {
      id: 'song-indestructible-barretto', cat: 'song-salsa', franchise: 'Ray Barretto', game: 'Indestructible',
      title: 'Indestructible', year: 1973, lang: 'es',
      sources: busca('Ray Barretto', 'Indestructible'),
    },
    {
      id: 'song-asi-se-compone-un-son', cat: 'song-salsa', franchise: 'Ismael Miranda', game: 'Así se compone un son',
      title: 'Así se compone un son', year: 1973, lang: 'es',
      sources: busca('Ismael Miranda', 'Así se compone un son'),
    },
    {
      id: 'song-ausencia-hector-lavoe', cat: 'song-salsa', franchise: 'Willie Colón y Héctor Lavoe', game: 'Ausencia',
      title: 'Ausencia', year: 1973, lang: 'es',
      sources: busca('Héctor Lavoe', 'Ausencia'),
    },
    {
      id: 'song-triste-y-vacia', cat: 'song-salsa', franchise: 'Héctor Lavoe', game: 'Triste y vacía',
      title: 'Triste y vacía', year: 1975, lang: 'es',
      sources: busca('Héctor Lavoe', 'Triste y vacía'),
    },
    {
      id: 'song-escandalo-hector-lavoe', cat: 'song-salsa', franchise: 'Héctor Lavoe', game: 'Escándalo',
      title: 'Escándalo', year: 1988, lang: 'es',
      sources: busca('Héctor Lavoe', 'Escándalo'),
    },
    {
      id: 'song-anacaona-cheo', cat: 'song-salsa', franchise: 'Cheo Feliciano', game: 'Anacaona',
      title: 'Anacaona', year: 1971, lang: 'es',
      sources: busca('Cheo Feliciano', 'Anacaona'),
    },
    {
      id: 'song-el-raton-cheo', cat: 'song-salsa', franchise: 'Cheo Feliciano', game: 'El ratón',
      title: 'El ratón', year: 1974, lang: 'es',
      sources: busca('Cheo Feliciano', 'El ratón'),
    },
    {
      id: 'song-brujeria-gran-combo', cat: 'song-salsa', franchise: 'El Gran Combo de Puerto Rico', game: 'Brujería',
      title: 'Brujería', year: 1977, lang: 'es',
      sources: busca('El Gran Combo de Puerto Rico', 'Brujería'),
    },
    {
      id: 'song-ojos-chinos', cat: 'song-salsa', franchise: 'El Gran Combo de Puerto Rico', game: 'Ojos chinos',
      title: 'Ojos chinos', year: 1964, lang: 'es',
      sources: busca('El Gran Combo de Puerto Rico', 'Ojos chinos'),
    },
    {
      id: 'song-amame-gran-combo', cat: 'song-salsa', franchise: 'El Gran Combo de Puerto Rico', game: 'Ámame',
      title: 'Ámame', year: 1989, lang: 'es',
      sources: busca('El Gran Combo de Puerto Rico', 'Ámame'),
    },
    {
      id: 'song-trampolin-gran-combo', cat: 'song-salsa', franchise: 'El Gran Combo de Puerto Rico', game: 'Trampolín',
      title: 'Trampolín', year: 1984, lang: 'es',
      sources: busca('El Gran Combo de Puerto Rico', 'Trampolín'),
    },
    {
      id: 'song-no-hay-cama-pa-tanta-gente', cat: 'song-salsa', franchise: 'El Gran Combo de Puerto Rico', game: 'No hay cama pa\' tanta gente',
      title: 'No hay cama pa\' tanta gente', year: 1988, lang: 'es',
      sources: busca('El Gran Combo de Puerto Rico', 'No hay cama pa\' tanta gente'),
    },
    {
      id: 'song-fuego-en-el-23', cat: 'song-salsa', franchise: 'Sonora Ponceña', game: 'Fuego en el 23',
      title: 'Fuego en el 23', year: 1969, lang: 'es',
      sources: busca('Sonora Ponceña', 'Fuego en el 23'),
    },
    {
      id: 'song-yambeque', cat: 'song-salsa', franchise: 'Sonora Ponceña', game: 'Yambeqúe',
      title: 'Yambeqúe', year: 1976, lang: 'es',
      sources: busca('Sonora Ponceña', 'Yambeqúe'),
    },
    {
      id: 'song-boranda-poncena', cat: 'song-salsa', franchise: 'Sonora Ponceña', game: 'Boranda',
      title: 'Boranda', year: 1977, lang: 'es',
      sources: busca('Sonora Ponceña', 'Boranda'),
    },
    {
      id: 'song-con-los-pobres-estoy', cat: 'song-salsa', franchise: 'Roberto Roena', game: 'Con los pobres estoy',
      title: 'Con los pobres estoy', year: 1970, lang: 'es',
      sources: busca('Roberto Roena', 'Con los pobres estoy'),
    },
    {
      id: 'song-marejada-feliz', cat: 'song-salsa', franchise: 'Roberto Roena', game: 'Marejada feliz',
      title: 'Marejada feliz', year: 1976, lang: 'es',
      sources: busca('Roberto Roena', 'Marejada feliz'),
    },
    {
      id: 'song-como-te-hago-entender', cat: 'song-salsa', franchise: 'Roberto Roena', game: 'Cómo te hago entender',
      title: 'Cómo te hago entender', year: 1982, lang: 'es',
      sources: busca('Roberto Roena', 'Cómo te hago entender'),
    },
    {
      id: 'song-el-muneco-de-la-ciudad', cat: 'song-salsa', franchise: 'Bobby Valentín', game: 'El muñeco de la ciudad',
      title: 'El muñeco de la ciudad', year: 1975, lang: 'es',
      sources: busca('Bobby Valentín', 'El muñeco de la ciudad'),
    },
    {
      id: 'song-la-boda-de-ella', cat: 'song-salsa', franchise: 'Bobby Valentín', game: 'La boda de ella',
      title: 'La boda de ella', year: 1978, lang: 'es',
      sources: busca('Bobby Valentín', 'La boda de ella'),
    },
    {
      id: 'song-detalles-oscar-dleon', cat: 'song-salsa', franchise: 'Oscar D\'León', game: 'Detalles',
      title: 'Detalles', year: 1979, lang: 'es',
      sources: busca('Oscar D\'León', 'Detalles'),
    },
    {
      id: 'song-ven-morena-oscar', cat: 'song-salsa', franchise: 'Oscar D\'León', game: 'Ven morena',
      title: 'Ven morena', year: 1980, lang: 'es',
      sources: busca('Oscar D\'León', 'Ven morena'),
    },
    {
      id: 'song-melao-de-cana', cat: 'song-salsa', franchise: 'Oscar D\'León', game: 'Melao de caña',
      title: 'Melao de caña', year: 1979, lang: 'es',
      sources: busca('Oscar D\'León', 'Melao de caña'),
    },
    {
      id: 'song-tu-con-el', cat: 'song-salsa', franchise: 'Frankie Ruiz', game: 'Tú con él',
      title: 'Tú con él', year: 1985, lang: 'es',
      sources: busca('Frankie Ruiz', 'Tú con él'),
    },
    {
      id: 'song-mi-libertad', cat: 'song-salsa', franchise: 'Frankie Ruiz', game: 'Mi libertad',
      title: 'Mi libertad', year: 1992, lang: 'es',
      sources: busca('Frankie Ruiz', 'Mi libertad'),
    },
    {
      id: 'song-puerto-rico-frankie', cat: 'song-salsa', franchise: 'Frankie Ruiz', game: 'Puerto Rico',
      title: 'Puerto Rico', year: 1987, lang: 'es',
      sources: busca('Frankie Ruiz', 'Puerto Rico'),
    },
    {
      id: 'song-ven-devorame-otra-vez', cat: 'song-salsa', franchise: 'Lalo Rodríguez', game: 'Ven, devórame otra vez',
      title: 'Ven, devórame otra vez', year: 1988, lang: 'es',
      sources: busca('Lalo Rodríguez', 'Ven, devórame otra vez'),
    },
    {
      id: 'song-yo-no-se-manana', cat: 'song-salsa', franchise: 'Luis Enrique', game: 'Yo no sé mañana',
      title: 'Yo no sé mañana', year: 2009, lang: 'es',
      sources: busca('Luis Enrique', 'Yo no sé mañana'),
    },
    {
      id: 'song-date-un-chance', cat: 'song-salsa', franchise: 'Luis Enrique', game: 'Date un chance',
      title: 'Date un chance', year: 1989, lang: 'es',
      sources: busca('Luis Enrique', 'Date un chance'),
    },
    {
      id: 'song-mi-media-mitad', cat: 'song-salsa', franchise: 'Rey Ruiz', game: 'Mi media mitad',
      title: 'Mi media mitad', year: 1994, lang: 'es',
      sources: busca('Rey Ruiz', 'Mi media mitad'),
    },
    {
      id: 'song-no-me-acostumbro', cat: 'song-salsa', franchise: 'Rey Ruiz', game: 'No me acostumbro',
      title: 'No me acostumbro', year: 1992, lang: 'es',
      sources: busca('Rey Ruiz', 'No me acostumbro'),
    },
    {
      id: 'song-conciencia', cat: 'song-salsa', franchise: 'Gilberto Santa Rosa', game: 'Conciencia',
      title: 'Conciencia', year: 1991, lang: 'es',
      sources: busca('Gilberto Santa Rosa', 'Conciencia'),
    },
    {
      id: 'song-vivir-sin-ella', cat: 'song-salsa', franchise: 'Gilberto Santa Rosa', game: 'Vivir sin ella',
      title: 'Vivir sin ella', year: 1990, lang: 'es',
      sources: busca('Gilberto Santa Rosa', 'Vivir sin ella'),
    },
    {
      id: 'song-perdoname-santa-rosa', cat: 'song-salsa', franchise: 'Gilberto Santa Rosa', game: 'Perdóname',
      title: 'Perdóname', year: 1990, lang: 'es',
      sources: busca('Gilberto Santa Rosa', 'Perdóname'),
    },
    {
      id: 'song-la-agarro-bajando', cat: 'song-salsa', franchise: 'Gilberto Santa Rosa', game: 'La agarro bajando',
      title: 'La agarro bajando', year: 2001, lang: 'es',
      sources: busca('Gilberto Santa Rosa', 'La agarro bajando'),
    },
    {
      id: 'song-dile-a-ella', cat: 'song-salsa', franchise: 'Victor Manuelle', game: 'Dile a ella',
      title: 'Dile a ella', year: 1997, lang: 'es',
      sources: busca('Victor Manuelle', 'Dile a ella'),
    },
    {
      id: 'song-he-tratado', cat: 'song-salsa', franchise: 'Victor Manuelle', game: 'He tratado',
      title: 'He tratado', year: 1997, lang: 'es',
      sources: busca('Victor Manuelle', 'He tratado'),
    },
    {
      id: 'song-apiadate-de-mi', cat: 'song-salsa', franchise: 'Victor Manuelle', game: 'Apiádate de mí',
      title: 'Apiádate de mí', year: 1994, lang: 'es',
      sources: busca('Victor Manuelle', 'Apiádate de mí'),
    },
    {
      id: 'song-cara-de-nino', cat: 'song-salsa', franchise: 'Jerry Rivera', game: 'Cara de niño',
      title: 'Cara de niño', year: 1993, lang: 'es',
      sources: busca('Jerry Rivera', 'Cara de niño'),
    },
    {
      id: 'song-que-hay-de-malo', cat: 'song-salsa', franchise: 'Jerry Rivera', game: 'Qué hay de malo',
      title: 'Qué hay de malo', year: 1993, lang: 'es',
      sources: busca('Jerry Rivera', 'Qué hay de malo'),
    },
    {
      id: 'song-sin-sentimiento', cat: 'song-salsa', franchise: 'Grupo Niche', game: 'Sin sentimiento',
      title: 'Sin sentimiento', year: 1990, lang: 'es',
      sources: busca('Grupo Niche', 'Sin sentimiento'),
    },
    {
      id: 'song-busca-por-dentro', cat: 'song-salsa', franchise: 'Grupo Niche', game: 'Busca por dentro',
      title: 'Busca por dentro', year: 1990, lang: 'es',
      sources: busca('Grupo Niche', 'Busca por dentro'),
    },
    {
      id: 'song-nuestro-sueno', cat: 'song-salsa', franchise: 'Grupo Niche', game: 'Nuestro sueño',
      title: 'Nuestro sueño', year: 1989, lang: 'es',
      sources: busca('Grupo Niche', 'Nuestro sueño'),
    },
    {
      id: 'song-oiga-mire-vea', cat: 'song-salsa', franchise: 'Guayacán Orquesta', game: 'Oiga, mire, vea',
      title: 'Oiga, mire, vea', year: 1991, lang: 'es',
      sources: busca('Guayacán Orquesta', 'Oiga, mire, vea'),
    },
    {
      id: 'song-cada-dia-que-pasa', cat: 'song-salsa', franchise: 'Guayacán Orquesta', game: 'Cada día que pasa',
      title: 'Cada día que pasa', year: 1993, lang: 'es',
      sources: busca('Guayacán Orquesta', 'Cada día que pasa'),
    },
    {
      id: 'song-tania-fruko', cat: 'song-salsa', franchise: 'Fruko y sus Tesos', game: 'Tania',
      title: 'Tania', year: 1974, lang: 'es',
      sources: busca('Fruko y sus Tesos', 'Tania'),
    },
    {
      id: 'song-los-charcos', cat: 'song-salsa', franchise: 'Fruko y sus Tesos', game: 'Los charcos',
      title: 'Los charcos', year: 1975, lang: 'es',
      sources: busca('Fruko y sus Tesos', 'Los charcos'),
    },
    {
      id: 'song-senora-de-madrugada', cat: 'song-salsa', franchise: 'Tito Rojas', game: 'Señora de madrugada',
      title: 'Señora de madrugada', year: 1993, lang: 'es',
      sources: busca('Tito Rojas', 'Señora de madrugada'),
    },
    {
      id: 'song-siempre-sere', cat: 'song-salsa', franchise: 'Tito Rojas', game: 'Siempre seré',
      title: 'Siempre seré', year: 1992, lang: 'es',
      sources: busca('Tito Rojas', 'Siempre seré'),
    },
    {
      id: 'song-micaela-sonora-carruseles', cat: 'song-salsa', franchise: 'Sonora Carruseles', game: 'Micaela',
      title: 'Micaela', year: 1998, lang: 'es',
      sources: busca('Sonora Carruseles', 'Micaela'),
    },
    /* ───────────── Metal (205) ───────────── */
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
    {
      id: 'song-war-pigs', cat: 'song-metal', franchise: 'Black Sabbath', game: 'War Pigs',
      title: 'War Pigs', year: 1970, lang: 'en',
      sources: busca('Black Sabbath', 'War Pigs'),
    },
    {
      id: 'song-highway-star', cat: 'song-metal', franchise: 'Deep Purple', game: 'Highway Star',
      title: 'Highway Star', year: 1972, lang: 'en',
      sources: busca('Deep Purple', 'Highway Star'),
    },
    {
      id: 'song-painkiller', cat: 'song-metal', franchise: 'Judas Priest', game: 'Painkiller',
      title: 'Painkiller', year: 1990, lang: 'en',
      sources: busca('Judas Priest', 'Painkiller'),
    },
    {
      id: 'song-living-after-midnight', cat: 'song-metal', franchise: 'Judas Priest', game: 'Living After Midnight',
      title: 'Living After Midnight', year: 1980, lang: 'en',
      sources: busca('Judas Priest', 'Living After Midnight'),
    },
    {
      id: 'song-youve-got-another-thing-comin', cat: 'song-metal', franchise: 'Judas Priest', game: 'You\'ve Got Another Thing Comin\'',
      title: 'You\'ve Got Another Thing Comin\'', year: 1982, lang: 'en',
      sources: busca('Judas Priest', 'You\'ve Got Another Thing Comin\''),
    },
    {
      id: 'song-the-number-of-the-beast', cat: 'song-metal', franchise: 'Iron Maiden', game: 'The Number of the Beast',
      title: 'The Number of the Beast', year: 1982, lang: 'en',
      sources: busca('Iron Maiden', 'The Number of the Beast'),
    },
    {
      id: 'song-wasted-years', cat: 'song-metal', franchise: 'Iron Maiden', game: 'Wasted Years',
      title: 'Wasted Years', year: 1986, lang: 'en',
      sources: busca('Iron Maiden', 'Wasted Years'),
    },
    {
      id: 'song-hallowed-be-thy-name', cat: 'song-metal', franchise: 'Iron Maiden', game: 'Hallowed Be Thy Name',
      title: 'Hallowed Be Thy Name', year: 1982, lang: 'en',
      sources: busca('Iron Maiden', 'Hallowed Be Thy Name'),
    },
    {
      id: 'song-bark-at-the-moon', cat: 'song-metal', franchise: 'Ozzy Osbourne', game: 'Bark at the Moon',
      title: 'Bark at the Moon', year: 1983, lang: 'en',
      sources: busca('Ozzy Osbourne', 'Bark at the Moon'),
    },
    {
      id: 'song-mr-crowley', cat: 'song-metal', franchise: 'Ozzy Osbourne', game: 'Mr. Crowley',
      title: 'Mr. Crowley', year: 1980, lang: 'en',
      sources: busca('Ozzy Osbourne', 'Mr. Crowley'),
    },
    {
      id: 'song-rainbow-in-the-dark', cat: 'song-metal', franchise: 'Dio', game: 'Rainbow in the Dark',
      title: 'Rainbow in the Dark', year: 1983, lang: 'en',
      sources: busca('Dio', 'Rainbow in the Dark'),
    },
    {
      id: 'song-cum-on-feel-the-noize', cat: 'song-metal', franchise: 'Quiet Riot', game: 'Cum On Feel the Noize',
      title: 'Cum On Feel the Noize', year: 1983, lang: 'en',
      sources: busca('Quiet Riot', 'Cum On Feel the Noize'),
    },
    {
      id: 'song-wind-of-change', cat: 'song-metal', franchise: 'Scorpions', game: 'Wind of Change',
      title: 'Wind of Change', year: 1990, lang: 'en',
      sources: busca('Scorpions', 'Wind of Change'),
    },
    {
      id: 'song-18-and-life', cat: 'song-metal', franchise: 'Skid Row', game: '18 and Life',
      title: '18 and Life', year: 1989, lang: 'en',
      sources: busca('Skid Row', '18 and Life'),
    },
    {
      id: 'song-youth-gone-wild', cat: 'song-metal', franchise: 'Skid Row', game: 'Youth Gone Wild',
      title: 'Youth Gone Wild', year: 1989, lang: 'en',
      sources: busca('Skid Row', 'Youth Gone Wild'),
    },
    {
      id: 'song-here-i-go-again', cat: 'song-metal', franchise: 'Whitesnake', game: 'Here I Go Again',
      title: 'Here I Go Again', year: 1987, lang: 'en',
      sources: busca('Whitesnake', 'Here I Go Again'),
    },
    {
      id: 'song-seek-and-destroy', cat: 'song-metal', franchise: 'Metallica', game: 'Seek & Destroy',
      title: 'Seek & Destroy', year: 1983, lang: 'en',
      sources: busca('Metallica', 'Seek & Destroy'),
    },
    {
      id: 'song-fade-to-black', cat: 'song-metal', franchise: 'Metallica', game: 'Fade to Black',
      title: 'Fade to Black', year: 1984, lang: 'en',
      sources: busca('Metallica', 'Fade to Black'),
    },
    {
      id: 'song-for-whom-the-bell-tolls', cat: 'song-metal', franchise: 'Metallica', game: 'For Whom the Bell Tolls',
      title: 'For Whom the Bell Tolls', year: 1984, lang: 'en',
      sources: busca('Metallica', 'For Whom the Bell Tolls'),
    },
    {
      id: 'song-sad-but-true', cat: 'song-metal', franchise: 'Metallica', game: 'Sad but True',
      title: 'Sad but True', year: 1991, lang: 'en',
      sources: busca('Metallica', 'Sad but True'),
    },
    {
      id: 'song-peace-sells', cat: 'song-metal', franchise: 'Megadeth', game: 'Peace Sells',
      title: 'Peace Sells', year: 1986, lang: 'en',
      sources: busca('Megadeth', 'Peace Sells'),
    },
    {
      id: 'song-holy-wars', cat: 'song-metal', franchise: 'Megadeth', game: 'Holy Wars... The Punishment Due',
      title: 'Holy Wars... The Punishment Due', year: 1990, lang: 'en',
      sources: busca('Megadeth', 'Holy Wars'),
    },
    {
      id: 'song-a-tout-le-monde', cat: 'song-metal', franchise: 'Megadeth', game: 'A Tout Le Monde',
      title: 'A Tout Le Monde', year: 1994, lang: 'en',
      sources: busca('Megadeth', 'A Tout Le Monde'),
    },
    {
      id: 'song-south-of-heaven', cat: 'song-metal', franchise: 'Slayer', game: 'South of Heaven',
      title: 'South of Heaven', year: 1988, lang: 'en',
      sources: busca('Slayer', 'South of Heaven'),
    },
    {
      id: 'song-madhouse-anthrax', cat: 'song-metal', franchise: 'Anthrax', game: 'Madhouse',
      title: 'Madhouse', year: 1985, lang: 'en',
      sources: busca('Anthrax', 'Madhouse'),
    },
    {
      id: 'song-roots-bloody-roots', cat: 'song-metal', franchise: 'Sepultura', game: 'Roots Bloody Roots',
      title: 'Roots Bloody Roots', year: 1996, lang: 'en',
      sources: busca('Sepultura', 'Roots Bloody Roots'),
    },
    {
      id: 'song-refuse-resist', cat: 'song-metal', franchise: 'Sepultura', game: 'Refuse/Resist',
      title: 'Refuse/Resist', year: 1993, lang: 'en',
      sources: busca('Sepultura', 'Refuse/Resist'),
    },
    {
      id: 'song-cemetery-gates', cat: 'song-metal', franchise: 'Pantera', game: 'Cemetery Gates',
      title: 'Cemetery Gates', year: 1990, lang: 'en',
      sources: busca('Pantera', 'Cemetery Gates'),
    },
    {
      id: 'song-5-minutes-alone', cat: 'song-metal', franchise: 'Pantera', game: '5 Minutes Alone',
      title: '5 Minutes Alone', year: 1994, lang: 'en',
      sources: busca('Pantera', '5 Minutes Alone'),
    },
    {
      id: 'song-deutschland-rammstein', cat: 'song-metal', franchise: 'Rammstein', game: 'Deutschland',
      title: 'Deutschland', year: 2019, lang: 'de',
      sources: busca('Rammstein', 'Deutschland'),
    },
    {
      id: 'song-feuer-frei', cat: 'song-metal', franchise: 'Rammstein', game: 'Feuer frei!',
      title: 'Feuer frei!', year: 2001, lang: 'de',
      sources: busca('Rammstein', 'Feuer frei!'),
    },
    {
      id: 'song-ich-will', cat: 'song-metal', franchise: 'Rammstein', game: 'Ich will',
      title: 'Ich will', year: 2001, lang: 'de',
      sources: busca('Rammstein', 'Ich will'),
    },
    {
      id: 'song-the-beautiful-people', cat: 'song-metal', franchise: 'Marilyn Manson', game: 'The Beautiful People',
      title: 'The Beautiful People', year: 1996, lang: 'en',
      sources: busca('Marilyn Manson', 'The Beautiful People'),
    },
    {
      id: 'song-sweet-dreams-manson', cat: 'song-metal', franchise: 'Marilyn Manson', game: 'Sweet Dreams (Are Made of This)',
      title: 'Sweet Dreams (Are Made of This)', year: 1995, lang: 'en',
      sources: busca('Marilyn Manson', 'Sweet Dreams'),
    },
    {
      id: 'song-blind-korn', cat: 'song-metal', franchise: 'Korn', game: 'Blind',
      title: 'Blind', year: 1994, lang: 'en',
      sources: busca('Korn', 'Blind'),
    },
    {
      id: 'song-falling-away-from-me', cat: 'song-metal', franchise: 'Korn', game: 'Falling Away from Me',
      title: 'Falling Away from Me', year: 1999, lang: 'en',
      sources: busca('Korn', 'Falling Away from Me'),
    },
    {
      id: 'song-change-deftones', cat: 'song-metal', franchise: 'Deftones', game: 'Change (In the House of Flies)',
      title: 'Change (In the House of Flies)', year: 2000, lang: 'en',
      sources: busca('Deftones', 'Change'),
    },
    {
      id: 'song-my-own-summer', cat: 'song-metal', franchise: 'Deftones', game: 'My Own Summer (Shove It)',
      title: 'My Own Summer (Shove It)', year: 1997, lang: 'en',
      sources: busca('Deftones', 'My Own Summer'),
    },
    {
      id: 'song-break-stuff', cat: 'song-metal', franchise: 'Limp Bizkit', game: 'Break Stuff',
      title: 'Break Stuff', year: 1999, lang: 'en',
      sources: busca('Limp Bizkit', 'Break Stuff'),
    },
    {
      id: 'song-my-way-limp-bizkit', cat: 'song-metal', franchise: 'Limp Bizkit', game: 'My Way',
      title: 'My Way', year: 2001, lang: 'en',
      sources: busca('Limp Bizkit', 'My Way'),
    },
    {
      id: 'song-wait-and-bleed', cat: 'song-metal', franchise: 'Slipknot', game: 'Wait and Bleed',
      title: 'Wait and Bleed', year: 1999, lang: 'en',
      sources: busca('Slipknot', 'Wait and Bleed'),
    },
    {
      id: 'song-before-i-forget', cat: 'song-metal', franchise: 'Slipknot', game: 'Before I Forget',
      title: 'Before I Forget', year: 2004, lang: 'en',
      sources: busca('Slipknot', 'Before I Forget'),
    },
    {
      id: 'song-the-sound-of-silence-disturbed', cat: 'song-metal', franchise: 'Disturbed', game: 'The Sound of Silence',
      title: 'The Sound of Silence', year: 2015, lang: 'en',
      sources: busca('Disturbed', 'The Sound of Silence'),
    },
    {
      id: 'song-stricken', cat: 'song-metal', franchise: 'Disturbed', game: 'Stricken',
      title: 'Stricken', year: 2005, lang: 'en',
      sources: busca('Disturbed', 'Stricken'),
    },
    {
      id: 'song-nightmare-avenged', cat: 'song-metal', franchise: 'Avenged Sevenfold', game: 'Nightmare',
      title: 'Nightmare', year: 2010, lang: 'en',
      sources: busca('Avenged Sevenfold', 'Nightmare'),
    },
    {
      id: 'song-afterlife-avenged', cat: 'song-metal', franchise: 'Avenged Sevenfold', game: 'Afterlife',
      title: 'Afterlife', year: 2007, lang: 'en',
      sources: busca('Avenged Sevenfold', 'Afterlife'),
    },
    {
      id: 'song-wish-i-had-an-angel', cat: 'song-metal', franchise: 'Nightwish', game: 'Wish I Had an Angel',
      title: 'Wish I Had an Angel', year: 2004, lang: 'en',
      sources: busca('Nightwish', 'Wish I Had an Angel'),
    },
    {
      id: 'song-nemo-nightwish', cat: 'song-metal', franchise: 'Nightwish', game: 'Nemo',
      title: 'Nemo', year: 2004, lang: 'en',
      sources: busca('Nightwish', 'Nemo'),
    },
    {
      id: 'song-i-want-out', cat: 'song-metal', franchise: 'Helloween', game: 'I Want Out',
      title: 'I Want Out', year: 1988, lang: 'en',
      sources: busca('Helloween', 'I Want Out'),
    },
    {
      id: 'song-maldito-sea-tu-nombre', cat: 'song-metal', franchise: 'Ángeles del Infierno', game: 'Maldito sea tu nombre',
      title: 'Maldito sea tu nombre', year: 1984, lang: 'es',
      sources: busca('Ángeles del Infierno', 'Maldito sea tu nombre'),
    },
    {
      id: 'song-guante-de-piel', cat: 'song-metal', franchise: 'Rata Blanca', game: 'Guante de piel',
      title: 'Guante de piel', year: 1988, lang: 'es',
      sources: busca('Rata Blanca', 'Guante de piel'),
    },
    {
      id: 'song-el-sueno-de-la-gitana', cat: 'song-metal', franchise: 'Rata Blanca', game: 'El sueño de la gitana',
      title: 'El sueño de la gitana', year: 1988, lang: 'es',
      sources: busca('Rata Blanca', 'El sueño de la gitana'),
    },
    {
      id: 'song-chico-callejero', cat: 'song-metal', franchise: 'Rata Blanca', game: 'Chico callejero',
      title: 'Chico callejero', year: 1988, lang: 'es',
      sources: busca('Rata Blanca', 'Chico callejero'),
    },
    {
      id: 'song-dias-duros-rata', cat: 'song-metal', franchise: 'Rata Blanca', game: 'Días duros',
      title: 'Días duros', year: 1990, lang: 'es',
      sources: busca('Rata Blanca', 'Días duros'),
    },
    {
      id: 'song-guerrero-del-arco-iris', cat: 'song-metal', franchise: 'Rata Blanca', game: 'Guerrero del arco iris',
      title: 'Guerrero del arco iris', year: 1991, lang: 'es',
      sources: busca('Rata Blanca', 'Guerrero del arco iris'),
    },
    {
      id: 'song-la-boca-del-lobo', cat: 'song-metal', franchise: 'Rata Blanca', game: 'La boca del lobo',
      title: 'La boca del lobo', year: 1991, lang: 'es',
      sources: busca('Rata Blanca', 'La boca del lobo'),
    },
    {
      id: 'song-volviendo-a-casa', cat: 'song-metal', franchise: 'Rata Blanca', game: 'Volviendo a casa',
      title: 'Volviendo a casa', year: 2002, lang: 'es',
      sources: busca('Rata Blanca', 'Volviendo a casa'),
    },
    {
      id: 'song-talisman-rata', cat: 'song-metal', franchise: 'Rata Blanca', game: 'Talismán',
      title: 'Talismán', year: 2008, lang: 'es',
      sources: busca('Rata Blanca', 'Talismán'),
    },
    {
      id: 'song-aun-estas-en-mis-suenos', cat: 'song-metal', franchise: 'Rata Blanca', game: 'Aún estás en mis sueños',
      title: 'Aún estás en mis sueños', year: 2005, lang: 'es',
      sources: busca('Rata Blanca', 'Aún estás en mis sueños'),
    },
    {
      id: 'song-baron-rojo-tema', cat: 'song-metal', franchise: 'Barón Rojo', game: 'Barón Rojo',
      title: 'Barón Rojo', year: 1981, lang: 'es',
      sources: busca('Barón Rojo', 'Barón Rojo'),
    },
    {
      id: 'song-larga-vida-al-rock', cat: 'song-metal', franchise: 'Barón Rojo', game: 'Larga vida al rock and roll',
      title: 'Larga vida al rock and roll', year: 1981, lang: 'es',
      sources: busca('Barón Rojo', 'Larga vida al rock and roll'),
    },
    {
      id: 'song-resistire-baron', cat: 'song-metal', franchise: 'Barón Rojo', game: 'Resistiré',
      title: 'Resistiré', year: 1982, lang: 'es',
      sources: busca('Barón Rojo', 'Resistiré'),
    },
    {
      id: 'song-cuerdas-de-acero', cat: 'song-metal', franchise: 'Barón Rojo', game: 'Cuerdas de acero',
      title: 'Cuerdas de acero', year: 1985, lang: 'es',
      sources: busca('Barón Rojo', 'Cuerdas de acero'),
    },
    {
      id: 'song-hijos-de-cain', cat: 'song-metal', franchise: 'Barón Rojo', game: 'Hijos de Caín',
      title: 'Hijos de Caín', year: 1985, lang: 'es',
      sources: busca('Barón Rojo', 'Hijos de Caín'),
    },
    {
      id: 'song-con-botas-sucias', cat: 'song-metal', franchise: 'Barón Rojo', game: 'Con botas sucias',
      title: 'Con botas sucias', year: 1981, lang: 'es',
      sources: busca('Barón Rojo', 'Con botas sucias'),
    },
    {
      id: 'song-casi-me-mato', cat: 'song-metal', franchise: 'Barón Rojo', game: 'Casi me mato',
      title: 'Casi me mato', year: 1983, lang: 'es',
      sources: busca('Barón Rojo', 'Casi me mato'),
    },
    {
      id: 'song-tierra-de-vandalos', cat: 'song-metal', franchise: 'Barón Rojo', game: 'Tierra de vándalos',
      title: 'Tierra de vándalos', year: 1985, lang: 'es',
      sources: busca('Barón Rojo', 'Tierra de vándalos'),
    },
    {
      id: 'song-sombras-en-la-oscuridad', cat: 'song-metal', franchise: 'Ángeles del Infierno', game: 'Sombras en la oscuridad',
      title: 'Sombras en la oscuridad', year: 1985, lang: 'es',
      sources: busca('Ángeles del Infierno', 'Sombras en la oscuridad'),
    },
    {
      id: 'song-al-otro-lado-del-silencio', cat: 'song-metal', franchise: 'Ángeles del Infierno', game: 'Al otro lado del silencio',
      title: 'Al otro lado del silencio', year: 1986, lang: 'es',
      sources: busca('Ángeles del Infierno', 'Al otro lado del silencio'),
    },
    {
      id: 'song-si-tu-no-estas-aqui-angeles', cat: 'song-metal', franchise: 'Ángeles del Infierno', game: 'Si tú no estás aquí',
      title: 'Si tú no estás aquí', year: 1988, lang: 'es',
      sources: busca('Ángeles del Infierno', 'Si tú no estás aquí'),
    },
    {
      id: 'song-con-las-botas-puestas', cat: 'song-metal', franchise: 'Ángeles del Infierno', game: 'Con las botas puestas',
      title: 'Con las botas puestas', year: 1984, lang: 'es',
      sources: busca('Ángeles del Infierno', 'Con las botas puestas'),
    },
    {
      id: 'song-unidos-por-el-rock', cat: 'song-metal', franchise: 'Ángeles del Infierno', game: 'Unidos por el rock',
      title: 'Unidos por el rock', year: 1984, lang: 'es',
      sources: busca('Ángeles del Infierno', 'Unidos por el rock'),
    },
    {
      id: 'song-fuera-de-la-ley', cat: 'song-metal', franchise: 'Ángeles del Infierno', game: 'Fuera de la ley',
      title: 'Fuera de la ley', year: 1985, lang: 'es',
      sources: busca('Ángeles del Infierno', 'Fuera de la ley'),
    },
    {
      id: 'song-la-danza-del-fuego', cat: 'song-metal', franchise: 'Mägo de Oz', game: 'La danza del fuego',
      title: 'La danza del fuego', year: 2000, lang: 'es',
      sources: busca('Mägo de Oz', 'La danza del fuego'),
    },
    {
      id: 'song-hasta-que-el-cuerpo-aguante', cat: 'song-metal', franchise: 'Mägo de Oz', game: 'Hasta que el cuerpo aguante',
      title: 'Hasta que el cuerpo aguante', year: 2000, lang: 'es',
      sources: busca('Mägo de Oz', 'Hasta que el cuerpo aguante'),
    },
    {
      id: 'song-la-costa-del-silencio', cat: 'song-metal', franchise: 'Mägo de Oz', game: 'La costa del silencio',
      title: 'La costa del silencio', year: 2003, lang: 'es',
      sources: busca('Mägo de Oz', 'La costa del silencio'),
    },
    {
      id: 'song-gaia-mago-de-oz', cat: 'song-metal', franchise: 'Mägo de Oz', game: 'Gaia',
      title: 'Gaia', year: 2003, lang: 'es',
      sources: busca('Mägo de Oz', 'Gaia'),
    },
    {
      id: 'song-el-cantar-de-la-luna', cat: 'song-metal', franchise: 'Mägo de Oz', game: 'El cantar de la luna oscura',
      title: 'El cantar de la luna oscura', year: 1998, lang: 'es',
      sources: busca('Mägo de Oz', 'El cantar de la luna oscura'),
    },
    {
      id: 'song-finisterra-mago', cat: 'song-metal', franchise: 'Mägo de Oz', game: 'Finisterra',
      title: 'Finisterra', year: 2000, lang: 'es',
      sources: busca('Mägo de Oz', 'Finisterra'),
    },
    {
      id: 'song-hoy-toca-ser-feliz', cat: 'song-metal', franchise: 'Mägo de Oz', game: 'Hoy toca ser feliz',
      title: 'Hoy toca ser feliz', year: 2005, lang: 'es',
      sources: busca('Mägo de Oz', 'Hoy toca ser feliz'),
    },
    {
      id: 'song-diabulus-in-musica-mago', cat: 'song-metal', franchise: 'Mägo de Oz', game: 'Diabulus in musica',
      title: 'Diabulus in musica', year: 2005, lang: 'es',
      sources: busca('Mägo de Oz', 'Diabulus in musica'),
    },
    {
      id: 'song-va-a-estallar-el-obus', cat: 'song-metal', franchise: 'Obús', game: 'Va a estallar el obús',
      title: 'Va a estallar el obús', year: 1981, lang: 'es',
      sources: busca('Obús', 'Va a estallar el obús'),
    },
    {
      id: 'song-dinero-dinero-obus', cat: 'song-metal', franchise: 'Obús', game: 'Dinero, dinero',
      title: 'Dinero, dinero', year: 1982, lang: 'es',
      sources: busca('Obús', 'Dinero, dinero'),
    },
    {
      id: 'song-vamos-muy-bien', cat: 'song-metal', franchise: 'Obús', game: 'Vamos muy bien',
      title: 'Vamos muy bien', year: 1984, lang: 'es',
      sources: busca('Obús', 'Vamos muy bien'),
    },
    {
      id: 'song-te-visitara-la-muerte', cat: 'song-metal', franchise: 'Obús', game: 'Te visitará la muerte',
      title: 'Te visitará la muerte', year: 1984, lang: 'es',
      sources: busca('Obús', 'Te visitará la muerte'),
    },
    {
      id: 'song-pesadilla-nuclear', cat: 'song-metal', franchise: 'Obús', game: 'Pesadilla nuclear',
      title: 'Pesadilla nuclear', year: 1981, lang: 'es',
      sources: busca('Obús', 'Pesadilla nuclear'),
    },
    {
      id: 'song-sangre-de-reyes', cat: 'song-metal', franchise: 'Tierra Santa', game: 'Sangre de reyes',
      title: 'Sangre de reyes', year: 2001, lang: 'es',
      sources: busca('Tierra Santa', 'Sangre de reyes'),
    },
    {
      id: 'song-legendario-tierra-santa', cat: 'song-metal', franchise: 'Tierra Santa', game: 'Legendario',
      title: 'Legendario', year: 1999, lang: 'es',
      sources: busca('Tierra Santa', 'Legendario'),
    },
    {
      id: 'song-tierras-de-leyenda', cat: 'song-metal', franchise: 'Tierra Santa', game: 'Tierras de leyenda',
      title: 'Tierras de leyenda', year: 2000, lang: 'es',
      sources: busca('Tierra Santa', 'Tierras de leyenda'),
    },
    {
      id: 'song-la-cancion-del-pirata', cat: 'song-metal', franchise: 'Tierra Santa', game: 'La canción del pirata',
      title: 'La canción del pirata', year: 2000, lang: 'es',
      sources: busca('Tierra Santa', 'La canción del pirata'),
    },
    {
      id: 'song-pegaso-tierra-santa', cat: 'song-metal', franchise: 'Tierra Santa', game: 'Pegaso',
      title: 'Pegaso', year: 2001, lang: 'es',
      sources: busca('Tierra Santa', 'Pegaso'),
    },
    {
      id: 'song-las-walkirias', cat: 'song-metal', franchise: 'Tierra Santa', game: 'Las walkirias',
      title: 'Las walkirias', year: 2003, lang: 'es',
      sources: busca('Tierra Santa', 'Las walkirias'),
    },
    {
      id: 'song-si-amaneciera-saratoga', cat: 'song-metal', franchise: 'Saratoga', game: 'Si amaneciera',
      title: 'Si amaneciera', year: 2005, lang: 'es',
      sources: busca('Saratoga', 'Si amaneciera'),
    },
    {
      id: 'song-maldito-corazon-saratoga', cat: 'song-metal', franchise: 'Saratoga', game: 'Maldito corazón',
      title: 'Maldito corazón', year: 2005, lang: 'es',
      sources: busca('Saratoga', 'Maldito corazón'),
    },
    {
      id: 'song-vientos-de-guerra', cat: 'song-metal', franchise: 'Saratoga', game: 'Vientos de guerra',
      title: 'Vientos de guerra', year: 1999, lang: 'es',
      sources: busca('Saratoga', 'Vientos de guerra'),
    },
    {
      id: 'song-perro-traidor', cat: 'song-metal', franchise: 'Saratoga', game: 'Perro traidor',
      title: 'Perro traidor', year: 2000, lang: 'es',
      sources: busca('Saratoga', 'Perro traidor'),
    },
    {
      id: 'song-las-puertas-del-cielo', cat: 'song-metal', franchise: 'Saratoga', game: 'Las puertas del cielo',
      title: 'Las puertas del cielo', year: 2002, lang: 'es',
      sources: busca('Saratoga', 'Las puertas del cielo'),
    },
    {
      id: 'song-tu-mismo-warcry', cat: 'song-metal', franchise: 'WarCry', game: 'Tú mismo',
      title: 'Tú mismo', year: 2002, lang: 'es',
      sources: busca('WarCry', 'Tú mismo'),
    },
    {
      id: 'song-hoy-gano-yo-warcry', cat: 'song-metal', franchise: 'WarCry', game: 'Hoy gano yo',
      title: 'Hoy gano yo', year: 2002, lang: 'es',
      sources: busca('WarCry', 'Hoy gano yo'),
    },
    {
      id: 'song-capitan-lawrence', cat: 'song-metal', franchise: 'WarCry', game: 'Capitán Lawrence',
      title: 'Capitán Lawrence', year: 2002, lang: 'es',
      sources: busca('WarCry', 'Capitán Lawrence'),
    },
    {
      id: 'song-aire-warcry', cat: 'song-metal', franchise: 'WarCry', game: 'Aire',
      title: 'Aire', year: 2004, lang: 'es',
      sources: busca('WarCry', 'Aire'),
    },
    {
      id: 'song-nana-warcry', cat: 'song-metal', franchise: 'WarCry', game: 'Nana',
      title: 'Nana', year: 2004, lang: 'es',
      sources: busca('WarCry', 'Nana'),
    },
    {
      id: 'song-la-vida-en-un-beso', cat: 'song-metal', franchise: 'WarCry', game: 'La vida en un beso',
      title: 'La vida en un beso', year: 2006, lang: 'es',
      sources: busca('WarCry', 'La vida en un beso'),
    },
    {
      id: 'song-torquemada-avalanch', cat: 'song-metal', franchise: 'Avalanch', game: 'Torquemada',
      title: 'Torquemada', year: 1999, lang: 'es',
      sources: busca('Avalanch', 'Torquemada'),
    },
    {
      id: 'song-lucero-avalanch', cat: 'song-metal', franchise: 'Avalanch', game: 'Lucero',
      title: 'Lucero', year: 2003, lang: 'es',
      sources: busca('Avalanch', 'Lucero'),
    },
    {
      id: 'song-xana-avalanch', cat: 'song-metal', franchise: 'Avalanch', game: 'Xana',
      title: 'Xana', year: 2001, lang: 'es',
      sources: busca('Avalanch', 'Xana'),
    },
    {
      id: 'song-pelayo-avalanch', cat: 'song-metal', franchise: 'Avalanch', game: 'Pelayo',
      title: 'Pelayo', year: 1999, lang: 'es',
      sources: busca('Avalanch', 'Pelayo'),
    },
    {
      id: 'song-hijo-de-la-luna-stravaganzza', cat: 'song-metal', franchise: 'Stravaganzza', game: 'Hijo de la luna',
      title: 'Hijo de la luna', year: 2006, lang: 'es',
      sources: busca('Stravaganzza', 'Hijo de la luna'),
    },
    {
      id: 'song-escudo-y-espada', cat: 'song-metal', franchise: 'Kraken', game: 'Escudo y espada',
      title: 'Escudo y espada', year: 1987, lang: 'es',
      sources: busca('Kraken', 'Escudo y espada'),
    },
    {
      id: 'song-muere-libre-kraken', cat: 'song-metal', franchise: 'Kraken', game: 'Muere libre',
      title: 'Muere libre', year: 1987, lang: 'es',
      sources: busca('Kraken', 'Muere libre'),
    },
    {
      id: 'song-lenguaje-de-mi-piel', cat: 'song-metal', franchise: 'Kraken', game: 'Lenguaje de mi piel',
      title: 'Lenguaje de mi piel', year: 1993, lang: 'es',
      sources: busca('Kraken', 'Lenguaje de mi piel'),
    },
    {
      id: 'song-vestido-de-cristal', cat: 'song-metal', franchise: 'Kraken', game: 'Vestido de cristal',
      title: 'Vestido de cristal', year: 1989, lang: 'es',
      sources: busca('Kraken', 'Vestido de cristal'),
    },
    {
      id: 'song-destruccion-hermetica', cat: 'song-metal', franchise: 'Hermética', game: 'Destrucción',
      title: 'Destrucción', year: 1989, lang: 'es',
      sources: busca('Hermética', 'Destrucción'),
    },
    {
      id: 'song-victimas-del-vaciamiento', cat: 'song-metal', franchise: 'Hermética', game: 'Víctimas del vaciamiento',
      title: 'Víctimas del vaciamiento', year: 1994, lang: 'es',
      sources: busca('Hermética', 'Víctimas del vaciamiento'),
    },
    {
      id: 'song-soy-de-la-esquina', cat: 'song-metal', franchise: 'Hermética', game: 'Soy de la esquina',
      title: 'Soy de la esquina', year: 1991, lang: 'es',
      sources: busca('Hermética', 'Soy de la esquina'),
    },
    {
      id: 'song-tu-medicina-hermetica', cat: 'song-metal', franchise: 'Hermética', game: 'Tu medicina',
      title: 'Tu medicina', year: 1991, lang: 'es',
      sources: busca('Hermética', 'Tu medicina'),
    },
    {
      id: 'song-del-camionero', cat: 'song-metal', franchise: 'Hermética', game: 'Del camionero',
      title: 'Del camionero', year: 1994, lang: 'es',
      sources: busca('Hermética', 'Del camionero'),
    },
    {
      id: 'song-sintoma-de-la-infeccion', cat: 'song-metal', franchise: 'Malón', game: 'Síntoma de la infección',
      title: 'Síntoma de la infección', year: 1995, lang: 'es',
      sources: busca('Malón', 'Síntoma de la infección'),
    },
    {
      id: 'song-castigador-por-herencia', cat: 'song-metal', franchise: 'Malón', game: 'Castigador por herencia',
      title: 'Castigador por herencia', year: 1995, lang: 'es',
      sources: busca('Malón', 'Castigador por herencia'),
    },
    {
      id: 'song-gato-negro-malon', cat: 'song-metal', franchise: 'Malón', game: 'Gato negro',
      title: 'Gato negro', year: 1996, lang: 'es',
      sources: busca('Malón', 'Gato negro'),
    },
    {
      id: 'song-el-nuevo-camino-animal', cat: 'song-metal', franchise: 'A.N.I.M.A.L.', game: 'El nuevo camino del hombre',
      title: 'El nuevo camino del hombre', year: 1996, lang: 'es',
      sources: busca('A.N.I.M.A.L.', 'El nuevo camino del hombre'),
    },
    {
      id: 'song-lejos-de-casa-animal', cat: 'song-metal', franchise: 'A.N.I.M.A.L.', game: 'Lejos de casa',
      title: 'Lejos de casa', year: 1996, lang: 'es',
      sources: busca('A.N.I.M.A.L.', 'Lejos de casa'),
    },
    {
      id: 'song-loco-pro-animal', cat: 'song-metal', franchise: 'A.N.I.M.A.L.', game: 'Loco pro',
      title: 'Loco pro', year: 1998, lang: 'es',
      sources: busca('A.N.I.M.A.L.', 'Loco pro'),
    },
    {
      id: 'song-solo-por-ser-indios', cat: 'song-metal', franchise: 'A.N.I.M.A.L.', game: 'Sólo por ser indios',
      title: 'Sólo por ser indios', year: 1994, lang: 'es',
      sources: busca('A.N.I.M.A.L.', 'Sólo por ser indios'),
    },
    {
      id: 'song-se-vos-almafuerte', cat: 'song-metal', franchise: 'Almafuerte', game: 'Sé vos',
      title: 'Sé vos', year: 1998, lang: 'es',
      sources: busca('Almafuerte', 'Sé vos'),
    },
    {
      id: 'song-a-vos-amigo', cat: 'song-metal', franchise: 'Almafuerte', game: 'A vos amigo',
      title: 'A vos amigo', year: 1999, lang: 'es',
      sources: busca('Almafuerte', 'A vos amigo'),
    },
    {
      id: 'song-toro-y-pampa', cat: 'song-metal', franchise: 'Almafuerte', game: 'Toro y pampa',
      title: 'Toro y pampa', year: 2006, lang: 'es',
      sources: busca('Almafuerte', 'Toro y pampa'),
    },
    {
      id: 'song-matando-gueros', cat: 'song-metal', franchise: 'Brujería', game: 'Matando güeros',
      title: 'Matando güeros', year: 1993, lang: 'es',
      sources: busca('Brujería', 'Matando güeros'),
    },
    {
      id: 'song-la-migra-brujeria', cat: 'song-metal', franchise: 'Brujería', game: 'La migra',
      title: 'La migra', year: 1995, lang: 'es',
      sources: busca('Brujería', 'La migra'),
    },
    {
      id: 'song-colas-de-rata', cat: 'song-metal', franchise: 'Brujería', game: 'Colas de rata',
      title: 'Colas de rata', year: 1995, lang: 'es',
      sources: busca('Brujería', 'Colas de rata'),
    },
    {
      id: 'song-raza-odiada', cat: 'song-metal', franchise: 'Brujería', game: 'Raza odiada (Pito Wilson)',
      title: 'Raza odiada (Pito Wilson)', year: 1995, lang: 'es',
      sources: busca('Brujería', 'Raza odiada (Pito Wilson)'),
    },
    {
      id: 'song-america-resorte', cat: 'song-metal', franchise: 'Resorte', game: 'América',
      title: 'América', year: 1997, lang: 'es',
      sources: busca('Resorte', 'América'),
    },
    {
      id: 'song-puro-rock-resorte', cat: 'song-metal', franchise: 'Resorte', game: 'Puro rock',
      title: 'Puro rock', year: 1999, lang: 'es',
      sources: busca('Resorte', 'Puro rock'),
    },
    {
      id: 'song-aqui-no-es-donde', cat: 'song-metal', franchise: 'Resorte', game: 'Aquí no es donde',
      title: 'Aquí no es donde', year: 1999, lang: 'es',
      sources: busca('Resorte', 'Aquí no es donde'),
    },
    {
      id: 'song-muerto-en-la-cruz', cat: 'song-metal', franchise: 'Transmetal', game: 'Muerto en la cruz',
      title: 'Muerto en la cruz', year: 1988, lang: 'es',
      sources: busca('Transmetal', 'Muerto en la cruz'),
    },
    {
      id: 'song-infierno-de-dante', cat: 'song-metal', franchise: 'Transmetal', game: 'Infierno de Dante',
      title: 'Infierno de Dante', year: 1993, lang: 'es',
      sources: busca('Transmetal', 'Infierno de Dante'),
    },
    {
      id: 'song-el-llamado-de-la-hembra', cat: 'song-metal', franchise: 'Transmetal', game: 'El llamado de la hembra',
      title: 'El llamado de la hembra', year: 1996, lang: 'es',
      sources: busca('Transmetal', 'El llamado de la hembra'),
    },
    {
      id: 'song-el-loco-luzbel', cat: 'song-metal', franchise: 'Luzbel', game: 'El loco',
      title: 'El loco', year: 1985, lang: 'es',
      sources: busca('Luzbel', 'El loco'),
    },
    {
      id: 'song-por-piedad-luzbel', cat: 'song-metal', franchise: 'Luzbel', game: 'Por piedad',
      title: 'Por piedad', year: 1986, lang: 'es',
      sources: busca('Luzbel', 'Por piedad'),
    },
    {
      id: 'song-pasaporte-al-infierno', cat: 'song-metal', franchise: 'Luzbel', game: 'Pasaporte al infierno',
      title: 'Pasaporte al infierno', year: 1986, lang: 'es',
      sources: busca('Luzbel', 'Pasaporte al infierno'),
    },
    {
      id: 'song-el-tirano-gillman', cat: 'song-metal', franchise: 'Gillman', game: 'El tirano',
      title: 'El tirano', year: 1984, lang: 'es',
      sources: busca('Gillman', 'El tirano'),
    },
    {
      id: 'song-asesino-arkangel', cat: 'song-metal', franchise: 'Arkangel', game: 'Asesino',
      title: 'Asesino', year: 1981, lang: 'es',
      sources: busca('Arkangel', 'Asesino'),
    },
    {
      id: 'song-en-la-nada-agora', cat: 'song-metal', franchise: 'Agora', game: 'En la nada',
      title: 'En la nada', year: 2004, lang: 'es',
      sources: busca('Agora', 'En la nada'),
    },
    {
      id: 'song-refugio-agora', cat: 'song-metal', franchise: 'Agora', game: 'Refugio',
      title: 'Refugio', year: 2008, lang: 'es',
      sources: busca('Agora', 'Refugio'),
    },
    {
      id: 'song-children-of-the-grave', cat: 'song-metal', franchise: 'Black Sabbath', game: 'Children of the Grave',
      title: 'Children of the Grave', year: 1971, lang: 'en',
      sources: busca('Black Sabbath', 'Children of the Grave'),
    },
    {
      id: 'song-nib-black-sabbath', cat: 'song-metal', franchise: 'Black Sabbath', game: 'N.I.B.',
      title: 'N.I.B.', year: 1970, lang: 'en',
      sources: busca('Black Sabbath', 'N.I.B.'),
    },
    {
      id: 'song-shot-in-the-dark-ozzy', cat: 'song-metal', franchise: 'Ozzy Osbourne', game: 'Shot in the Dark',
      title: 'Shot in the Dark', year: 1986, lang: 'en',
      sources: busca('Ozzy Osbourne', 'Shot in the Dark'),
    },
    {
      id: 'song-electric-eye', cat: 'song-metal', franchise: 'Judas Priest', game: 'Electric Eye',
      title: 'Electric Eye', year: 1982, lang: 'en',
      sources: busca('Judas Priest', 'Electric Eye'),
    },
    {
      id: 'song-turbo-lover', cat: 'song-metal', franchise: 'Judas Priest', game: 'Turbo Lover',
      title: 'Turbo Lover', year: 1986, lang: 'en',
      sources: busca('Judas Priest', 'Turbo Lover'),
    },
    {
      id: 'song-aces-high', cat: 'song-metal', franchise: 'Iron Maiden', game: 'Aces High',
      title: 'Aces High', year: 1984, lang: 'en',
      sources: busca('Iron Maiden', 'Aces High'),
    },
    {
      id: 'song-2-minutes-to-midnight', cat: 'song-metal', franchise: 'Iron Maiden', game: '2 Minutes to Midnight',
      title: '2 Minutes to Midnight', year: 1984, lang: 'en',
      sources: busca('Iron Maiden', '2 Minutes to Midnight'),
    },
    {
      id: 'song-battery-metallica', cat: 'song-metal', franchise: 'Metallica', game: 'Battery',
      title: 'Battery', year: 1986, lang: 'en',
      sources: busca('Metallica', 'Battery'),
    },
    {
      id: 'song-creeping-death', cat: 'song-metal', franchise: 'Metallica', game: 'Creeping Death',
      title: 'Creeping Death', year: 1984, lang: 'en',
      sources: busca('Metallica', 'Creeping Death'),
    },
    {
      id: 'song-tornado-of-souls', cat: 'song-metal', franchise: 'Megadeth', game: 'Tornado of Souls',
      title: 'Tornado of Souls', year: 1990, lang: 'en',
      sources: busca('Megadeth', 'Tornado of Souls'),
    },
    {
      id: 'song-im-broken-pantera', cat: 'song-metal', franchise: 'Pantera', game: 'I\'m Broken',
      title: 'I\'m Broken', year: 1994, lang: 'en',
      sources: busca('Pantera', 'I\'m Broken'),
    },
    /* ───────────── K-pop (100) ───────────── */
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
    {
      id: 'song-ring-ding-dong', cat: 'song-kpop', franchise: 'SHINee', game: 'Ring Ding Dong',
      title: 'Ring Ding Dong', year: 2009, lang: 'ko',
      sources: busca('SHINee', 'Ring Ding Dong'),
    },
    {
      id: 'song-lucifer-shinee', cat: 'song-kpop', franchise: 'SHINee', game: 'Lucifer',
      title: 'Lucifer', year: 2010, lang: 'ko',
      sources: busca('SHINee', 'Lucifer'),
    },
    {
      id: 'song-i-am-the-best', cat: 'song-kpop', franchise: '2NE1', game: 'I Am the Best',
      title: 'I Am the Best', year: 2011, lang: 'ko',
      sources: busca('2NE1', 'I Am the Best'),
    },
    {
      id: 'song-fire-2ne1', cat: 'song-kpop', franchise: '2NE1', game: 'FIRE',
      title: 'FIRE', year: 2009, lang: 'ko',
      sources: busca('2NE1', 'FIRE'),
    },
    {
      id: 'song-i-got-a-boy', cat: 'song-kpop', franchise: 'Girls\' Generation', game: 'I GOT A BOY',
      title: 'I GOT A BOY', year: 2013, lang: 'ko',
      sources: busca('Girls\' Generation', 'I GOT A BOY'),
    },
    {
      id: 'song-the-boys-snsd', cat: 'song-kpop', franchise: 'Girls\' Generation', game: 'The Boys',
      title: 'The Boys', year: 2011, lang: 'ko',
      sources: busca('Girls\' Generation', 'The Boys'),
    },
    {
      id: 'song-4-walls', cat: 'song-kpop', franchise: 'f(x)', game: '4 Walls',
      title: '4 Walls', year: 2015, lang: 'ko',
      sources: busca('f(x)', '4 Walls'),
    },
    {
      id: 'song-electric-shock', cat: 'song-kpop', franchise: 'f(x)', game: 'Electric Shock',
      title: 'Electric Shock', year: 2012, lang: 'ko',
      sources: busca('f(x)', 'Electric Shock'),
    },
    {
      id: 'song-nobody-wonder-girls', cat: 'song-kpop', franchise: 'Wonder Girls', game: 'Nobody',
      title: 'Nobody', year: 2008, lang: 'ko',
      sources: busca('Wonder Girls', 'Nobody'),
    },
    {
      id: 'song-touch-my-body', cat: 'song-kpop', franchise: 'SISTAR', game: 'Touch My Body',
      title: 'Touch My Body', year: 2014, lang: 'ko',
      sources: busca('SISTAR', 'Touch My Body'),
    },
    {
      id: 'song-up-and-down-exid', cat: 'song-kpop', franchise: 'EXID', game: 'Up & Down',
      title: 'Up & Down', year: 2014, lang: 'ko',
      sources: busca('EXID', 'Up & Down'),
    },
    {
      id: 'song-haru-haru', cat: 'song-kpop', franchise: 'BIGBANG', game: 'Haru Haru',
      title: 'Haru Haru', year: 2008, lang: 'ko',
      sources: busca('BIGBANG', 'Haru Haru'),
    },
    {
      id: 'song-loser-bigbang', cat: 'song-kpop', franchise: 'BIGBANG', game: 'LOSER',
      title: 'LOSER', year: 2015, lang: 'ko',
      sources: busca('BIGBANG', 'LOSER'),
    },
    {
      id: 'song-eyes-nose-lips', cat: 'song-kpop', franchise: 'TAEYANG', game: 'Eyes, Nose, Lips',
      title: 'Eyes, Nose, Lips', year: 2014, lang: 'ko',
      sources: busca('TAEYANG', 'Eyes, Nose, Lips'),
    },
    {
      id: 'song-crooked-gdragon', cat: 'song-kpop', franchise: 'G-DRAGON', game: 'Crooked',
      title: 'Crooked', year: 2013, lang: 'ko',
      sources: busca('G-DRAGON', 'Crooked'),
    },
    {
      id: 'song-blood-sweat-and-tears', cat: 'song-kpop', franchise: 'BTS', game: 'Blood Sweat & Tears',
      title: 'Blood Sweat & Tears', year: 2016, lang: 'ko',
      sources: busca('BTS', 'Blood Sweat & Tears'),
    },
    {
      id: 'song-mic-drop', cat: 'song-kpop', franchise: 'BTS', game: 'MIC Drop',
      title: 'MIC Drop', year: 2017, lang: 'ko',
      sources: busca('BTS', 'MIC Drop'),
    },
    {
      id: 'song-fire-bts', cat: 'song-kpop', franchise: 'BTS', game: 'Fire',
      title: 'Fire', year: 2016, lang: 'ko',
      sources: busca('BTS', 'Fire'),
    },
    {
      id: 'song-dope-bts', cat: 'song-kpop', franchise: 'BTS', game: 'DOPE',
      title: 'DOPE', year: 2015, lang: 'ko',
      sources: busca('BTS', 'DOPE'),
    },
    {
      id: 'song-life-goes-on-bts', cat: 'song-kpop', franchise: 'BTS', game: 'Life Goes On',
      title: 'Life Goes On', year: 2020, lang: 'ko',
      sources: busca('BTS', 'Life Goes On'),
    },
    {
      id: 'song-as-if-its-your-last', cat: 'song-kpop', franchise: 'BLACKPINK', game: 'As If It\'s Your Last',
      title: 'As If It\'s Your Last', year: 2017, lang: 'ko',
      sources: busca('BLACKPINK', 'As If It\'s Your Last'),
    },
    {
      id: 'song-playing-with-fire', cat: 'song-kpop', franchise: 'BLACKPINK', game: 'Playing with Fire',
      title: 'Playing with Fire', year: 2016, lang: 'ko',
      sources: busca('BLACKPINK', 'Playing with Fire'),
    },
    {
      id: 'song-whistle-blackpink', cat: 'song-kpop', franchise: 'BLACKPINK', game: 'Whistle',
      title: 'Whistle', year: 2016, lang: 'ko',
      sources: busca('BLACKPINK', 'Whistle'),
    },
    {
      id: 'song-lovesick-girls', cat: 'song-kpop', franchise: 'BLACKPINK', game: 'Lovesick Girls',
      title: 'Lovesick Girls', year: 2020, lang: 'ko',
      sources: busca('BLACKPINK', 'Lovesick Girls'),
    },
    {
      id: 'song-likey-twice', cat: 'song-kpop', franchise: 'TWICE', game: 'LIKEY',
      title: 'LIKEY', year: 2017, lang: 'ko',
      sources: busca('TWICE', 'LIKEY'),
    },
    {
      id: 'song-feel-special', cat: 'song-kpop', franchise: 'TWICE', game: 'Feel Special',
      title: 'Feel Special', year: 2019, lang: 'ko',
      sources: busca('TWICE', 'Feel Special'),
    },
    {
      id: 'song-i-cant-stop-me', cat: 'song-kpop', franchise: 'TWICE', game: 'I CAN\'T STOP ME',
      title: 'I CAN\'T STOP ME', year: 2020, lang: 'ko',
      sources: busca('TWICE', 'I CAN\'T STOP ME'),
    },
    {
      id: 'song-the-feels-twice', cat: 'song-kpop', franchise: 'TWICE', game: 'The Feels',
      title: 'The Feels', year: 2021, lang: 'en',
      sources: busca('TWICE', 'The Feels'),
    },
    {
      id: 'song-bad-boy-red-velvet', cat: 'song-kpop', franchise: 'Red Velvet', game: 'Bad Boy',
      title: 'Bad Boy', year: 2018, lang: 'ko',
      sources: busca('Red Velvet', 'Bad Boy'),
    },
    {
      id: 'song-red-flavor', cat: 'song-kpop', franchise: 'Red Velvet', game: 'Red Flavor',
      title: 'Red Flavor', year: 2017, lang: 'ko',
      sources: busca('Red Velvet', 'Red Flavor'),
    },
    {
      id: 'song-hip-mamamoo', cat: 'song-kpop', franchise: 'MAMAMOO', game: 'HIP',
      title: 'HIP', year: 2019, lang: 'ko',
      sources: busca('MAMAMOO', 'HIP'),
    },
    {
      id: 'song-wannabe-itzy', cat: 'song-kpop', franchise: 'ITZY', game: 'WANNABE',
      title: 'WANNABE', year: 2020, lang: 'ko',
      sources: busca('ITZY', 'WANNABE'),
    },
    {
      id: 'song-loco-itzy', cat: 'song-kpop', franchise: 'ITZY', game: 'LOCO',
      title: 'LOCO', year: 2021, lang: 'ko',
      sources: busca('ITZY', 'LOCO'),
    },
    {
      id: 'song-crown-txt', cat: 'song-kpop', franchise: 'TOMORROW X TOGETHER', game: 'CROWN',
      title: 'CROWN', year: 2019, lang: 'ko',
      sources: busca('TOMORROW X TOGETHER', 'CROWN'),
    },
    {
      id: 'song-sugar-rush-ride', cat: 'song-kpop', franchise: 'TOMORROW X TOGETHER', game: 'Sugar Rush Ride',
      title: 'Sugar Rush Ride', year: 2023, lang: 'ko',
      sources: busca('TOMORROW X TOGETHER', 'Sugar Rush Ride'),
    },
    {
      id: 'song-fever-enhypen', cat: 'song-kpop', franchise: 'ENHYPEN', game: 'FEVER',
      title: 'FEVER', year: 2021, lang: 'ko',
      sources: busca('ENHYPEN', 'FEVER'),
    },
    {
      id: 'song-bite-me-enhypen', cat: 'song-kpop', franchise: 'ENHYPEN', game: 'Bite Me',
      title: 'Bite Me', year: 2023, lang: 'ko',
      sources: busca('ENHYPEN', 'Bite Me'),
    },
    {
      id: 'song-hot-seventeen', cat: 'song-kpop', franchise: 'SEVENTEEN', game: 'HOT',
      title: 'HOT', year: 2022, lang: 'ko',
      sources: busca('SEVENTEEN', 'HOT'),
    },
    {
      id: 'song-dont-wanna-cry-seventeen', cat: 'song-kpop', franchise: 'SEVENTEEN', game: 'Don\'t Wanna Cry',
      title: 'Don\'t Wanna Cry', year: 2017, lang: 'ko',
      sources: busca('SEVENTEEN', 'Don\'t Wanna Cry'),
    },
    {
      id: 'song-thunderous-skz', cat: 'song-kpop', franchise: 'Stray Kids', game: 'Thunderous',
      title: 'Thunderous', year: 2021, lang: 'ko',
      sources: busca('Stray Kids', 'Thunderous'),
    },
    {
      id: 'song-back-door-skz', cat: 'song-kpop', franchise: 'Stray Kids', game: 'Back Door',
      title: 'Back Door', year: 2020, lang: 'ko',
      sources: busca('Stray Kids', 'Back Door'),
    },
    {
      id: 'song-bouncy-ateez', cat: 'song-kpop', franchise: 'ATEEZ', game: 'BOUNCY (K-HOT CHILLI PEPPERS)',
      title: 'BOUNCY (K-HOT CHILLI PEPPERS)', year: 2023, lang: 'ko',
      sources: busca('ATEEZ', 'BOUNCY'),
    },
    {
      id: 'song-kick-it-nct', cat: 'song-kpop', franchise: 'NCT 127', game: 'Kick It',
      title: 'Kick It', year: 2020, lang: 'ko',
      sources: busca('NCT 127', 'Kick It'),
    },
    {
      id: 'song-black-mamba-aespa', cat: 'song-kpop', franchise: 'aespa', game: 'Black Mamba',
      title: 'Black Mamba', year: 2020, lang: 'ko',
      sources: busca('aespa', 'Black Mamba'),
    },
    {
      id: 'song-drama-aespa', cat: 'song-kpop', franchise: 'aespa', game: 'Drama',
      title: 'Drama', year: 2023, lang: 'ko',
      sources: busca('aespa', 'Drama'),
    },
    {
      id: 'song-unforgiven-lesserafim', cat: 'song-kpop', franchise: 'LE SSERAFIM', game: 'UNFORGIVEN',
      title: 'UNFORGIVEN', year: 2023, lang: 'ko',
      sources: busca('LE SSERAFIM', 'UNFORGIVEN'),
    },
    {
      id: 'song-easy-lesserafim', cat: 'song-kpop', franchise: 'LE SSERAFIM', game: 'EASY',
      title: 'EASY', year: 2024, lang: 'ko',
      sources: busca('LE SSERAFIM', 'EASY'),
    },
    {
      id: 'song-omg-newjeans', cat: 'song-kpop', franchise: 'NewJeans', game: 'OMG',
      title: 'OMG', year: 2023, lang: 'ko',
      sources: busca('NewJeans', 'OMG'),
    },
    {
      id: 'song-after-like-ive', cat: 'song-kpop', franchise: 'IVE', game: 'After LIKE',
      title: 'After LIKE', year: 2022, lang: 'ko',
      sources: busca('IVE', 'After LIKE'),
    },
    {
      id: 'song-magnetic-illit', cat: 'song-kpop', franchise: 'ILLIT', game: 'Magnetic',
      title: 'Magnetic', year: 2024, lang: 'ko',
      sources: busca('ILLIT', 'Magnetic'),
    },
    /* ───────────── Country (100) ───────────── */
    {
      id: 'song-your-cheatin-heart', cat: 'song-country', franchise: 'Hank Williams', game: 'Your Cheatin\' Heart',
      title: 'Your Cheatin\' Heart', year: 1953, lang: 'en',
      sources: busca('Hank Williams', 'Your Cheatin\' Heart'),
    },
    {
      id: 'song-jambalaya-on-the-bayou', cat: 'song-country', franchise: 'Hank Williams', game: 'Jambalaya (On the Bayou)',
      title: 'Jambalaya (On the Bayou)', year: 1952, lang: 'en',
      sources: busca('Hank Williams', 'Jambalaya (On the Bayou)', ['Jambalaya']),
    },
    {
      id: 'song-folsom-prison-blues', cat: 'song-country', franchise: 'Johnny Cash', game: 'Folsom Prison Blues',
      title: 'Folsom Prison Blues', year: 1955, lang: 'en',
      sources: busca('Johnny Cash', 'Folsom Prison Blues'),
    },
    {
      id: 'song-i-walk-the-line', cat: 'song-country', franchise: 'Johnny Cash', game: 'I Walk the Line',
      title: 'I Walk the Line', year: 1956, lang: 'en',
      sources: busca('Johnny Cash', 'I Walk the Line'),
    },
    {
      id: 'song-ring-of-fire', cat: 'song-country', franchise: 'Johnny Cash', game: 'Ring of Fire',
      title: 'Ring of Fire', year: 1963, lang: 'en',
      sources: busca('Johnny Cash', 'Ring of Fire'),
    },
    {
      id: 'song-jackson', cat: 'song-country', franchise: 'Johnny Cash y June Carter', game: 'Jackson',
      title: 'Jackson', year: 1967, lang: 'en',
      sources: busca('Johnny Cash', 'Jackson'),
    },
    {
      id: 'song-crazy', cat: 'song-country', franchise: 'Patsy Cline', game: 'Crazy',
      title: 'Crazy', year: 1961, lang: 'en',
      sources: busca('Patsy Cline', 'Crazy'),
    },
    {
      id: 'song-el-paso', cat: 'song-country', franchise: 'Marty Robbins', game: 'El Paso',
      title: 'El Paso', year: 1959, lang: 'en',
      sources: busca('Marty Robbins', 'El Paso'),
    },
    {
      id: 'song-big-iron', cat: 'song-country', franchise: 'Marty Robbins', game: 'Big Iron',
      title: 'Big Iron', year: 1959, lang: 'en',
      sources: busca('Marty Robbins', 'Big Iron'),
    },
    {
      id: 'song-king-of-the-road', cat: 'song-country', franchise: 'Roger Miller', game: 'King of the Road',
      title: 'King of the Road', year: 1965, lang: 'en',
      sources: busca('Roger Miller', 'King of the Road'),
    },
    {
      id: 'song-mama-tried', cat: 'song-country', franchise: 'Merle Haggard', game: 'Mama Tried',
      title: 'Mama Tried', year: 1968, lang: 'en',
      sources: busca('Merle Haggard', 'Mama Tried'),
    },
    {
      id: 'song-stand-by-your-man', cat: 'song-country', franchise: 'Tammy Wynette', game: 'Stand by Your Man',
      title: 'Stand by Your Man', year: 1968, lang: 'en',
      sources: busca('Tammy Wynette', 'Stand by Your Man'),
    },
    {
      id: 'song-wichita-lineman', cat: 'song-country', franchise: 'Glen Campbell', game: 'Wichita Lineman',
      title: 'Wichita Lineman', year: 1968, lang: 'en',
      sources: busca('Glen Campbell', 'Wichita Lineman'),
    },
    {
      id: 'song-rhinestone-cowboy', cat: 'song-country', franchise: 'Glen Campbell', game: 'Rhinestone Cowboy',
      title: 'Rhinestone Cowboy', year: 1975, lang: 'en',
      sources: busca('Glen Campbell', 'Rhinestone Cowboy'),
    },
    {
      id: 'song-coal-miners-daughter', cat: 'song-country', franchise: 'Loretta Lynn', game: 'Coal Miner\'s Daughter',
      title: 'Coal Miner\'s Daughter', year: 1970, lang: 'en',
      sources: busca('Loretta Lynn', 'Coal Miner\'s Daughter'),
    },
    {
      id: 'song-rose-garden', cat: 'song-country', franchise: 'Lynn Anderson', game: 'Rose Garden',
      title: 'Rose Garden', year: 1970, lang: 'en',
      sources: busca('Lynn Anderson', 'Rose Garden', ['(I Never Promised You A) Rose Garden']),
    },
    {
      id: 'song-take-me-home-country-roads', cat: 'song-country', franchise: 'John Denver', game: 'Take Me Home, Country Roads',
      title: 'Take Me Home, Country Roads', year: 1971, lang: 'en',
      sources: busca('John Denver', 'Take Me Home, Country Roads'),
    },
    {
      id: 'song-jolene', cat: 'song-country', franchise: 'Dolly Parton', game: 'Jolene',
      title: 'Jolene', year: 1973, lang: 'en',
      sources: busca('Dolly Parton', 'Jolene'),
    },
    {
      id: 'song-delta-dawn', cat: 'song-country', franchise: 'Tanya Tucker', game: 'Delta Dawn',
      title: 'Delta Dawn', year: 1972, lang: 'en',
      sources: busca('Tanya Tucker', 'Delta Dawn'),
    },
    {
      id: 'song-the-most-beautiful-girl', cat: 'song-country', franchise: 'Charlie Rich', game: 'The Most Beautiful Girl',
      title: 'The Most Beautiful Girl', year: 1973, lang: 'en',
      sources: busca('Charlie Rich', 'The Most Beautiful Girl'),
    },
    {
      id: 'song-before-the-next-teardrop-falls', cat: 'song-country', franchise: 'Freddy Fender', game: 'Before the Next Teardrop Falls',
      title: 'Before the Next Teardrop Falls', year: 1975, lang: 'en',
      sources: busca('Freddy Fender', 'Before the Next Teardrop Falls'),
    },
    {
      id: 'song-blue-eyes-crying-in-the-rain', cat: 'song-country', franchise: 'Willie Nelson', game: 'Blue Eyes Crying in the Rain',
      title: 'Blue Eyes Crying in the Rain', year: 1975, lang: 'en',
      sources: busca('Willie Nelson', 'Blue Eyes Crying in the Rain'),
    },
    {
      id: 'song-convoy', cat: 'song-country', franchise: 'C.W. McCall', game: 'Convoy',
      title: 'Convoy', year: 1975, lang: 'en',
      sources: busca('C.W. McCall', 'Convoy'),
    },
    {
      id: 'song-east-bound-and-down', cat: 'song-country', franchise: 'Jerry Reed', game: 'East Bound and Down',
      title: 'East Bound and Down', year: 1977, lang: 'en',
      sources: busca('Jerry Reed', 'East Bound and Down', ['Eastbound and Down']),
    },
    {
      id: 'song-luckenbach-texas', cat: 'song-country', franchise: 'Waylon Jennings', game: 'Luckenbach, Texas',
      title: 'Luckenbach, Texas', year: 1977, lang: 'en',
      sources: busca('Waylon Jennings', 'Luckenbach, Texas', ['Luckenbach, Texas (Back to the Basics of Love)']),
    },
    {
      id: 'song-mammas-dont-let-your-babies-grow-up-to-be-cowboys', cat: 'song-country', franchise: 'Waylon Jennings y Willie Nelson', game: 'Mammas Don\'t Let Your Babies Grow Up to Be Cowboys',
      title: 'Mammas Don\'t Let Your Babies Grow Up to Be Cowboys', year: 1978, lang: 'en',
      sources: busca('Waylon Jennings', 'Mammas Don\'t Let Your Babies Grow Up to Be Cowboys', ['Mamas Don\'t Let Your Babies Grow Up to Be Cowboys']),
    },
    {
      id: 'song-the-gambler', cat: 'song-country', franchise: 'Kenny Rogers', game: 'The Gambler',
      title: 'The Gambler', year: 1978, lang: 'en',
      sources: busca('Kenny Rogers', 'The Gambler'),
    },
    {
      id: 'song-the-devil-went-down-to-georgia', cat: 'song-country', franchise: 'The Charlie Daniels Band', game: 'The Devil Went Down to Georgia',
      title: 'The Devil Went Down to Georgia', year: 1979, lang: 'en',
      sources: busca('Charlie Daniels', 'The Devil Went Down to Georgia'),
    },
    {
      id: 'song-9-to-5', cat: 'song-country', franchise: 'Dolly Parton', game: '9 to 5',
      title: '9 to 5', year: 1980, lang: 'en',
      sources: busca('Dolly Parton', '9 to 5'),
    },
    {
      id: 'song-on-the-road-again', cat: 'song-country', franchise: 'Willie Nelson', game: 'On the Road Again',
      title: 'On the Road Again', year: 1980, lang: 'en',
      sources: busca('Willie Nelson', 'On the Road Again'),
    },
    {
      id: 'song-he-stopped-loving-her-today', cat: 'song-country', franchise: 'George Jones', game: 'He Stopped Loving Her Today',
      title: 'He Stopped Loving Her Today', year: 1980, lang: 'en',
      sources: busca('George Jones', 'He Stopped Loving Her Today'),
    },
    {
      id: 'song-a-country-boy-can-survive', cat: 'song-country', franchise: 'Hank Williams Jr.', game: 'A Country Boy Can Survive',
      title: 'A Country Boy Can Survive', year: 1981, lang: 'en',
      sources: busca('Hank Williams Jr.', 'A Country Boy Can Survive'),
    },
    {
      id: 'song-elvira', cat: 'song-country', franchise: 'The Oak Ridge Boys', game: 'Elvira',
      title: 'Elvira', year: 1981, lang: 'en',
      sources: busca('Oak Ridge Boys', 'Elvira'),
    },
    {
      id: 'song-mountain-music', cat: 'song-country', franchise: 'Alabama', game: 'Mountain Music',
      title: 'Mountain Music', year: 1982, lang: 'en',
      sources: busca('Alabama', 'Mountain Music'),
    },
    {
      id: 'song-amarillo-by-morning', cat: 'song-country', franchise: 'George Strait', game: 'Amarillo by Morning',
      title: 'Amarillo by Morning', year: 1982, lang: 'en',
      sources: busca('George Strait', 'Amarillo by Morning'),
    },
    {
      id: 'song-always-on-my-mind', cat: 'song-country', franchise: 'Willie Nelson', game: 'Always on My Mind',
      title: 'Always on My Mind', year: 1982, lang: 'en',
      sources: busca('Willie Nelson', 'Always on My Mind'),
    },
    {
      id: 'song-islands-in-the-stream', cat: 'song-country', franchise: 'Kenny Rogers y Dolly Parton', game: 'Islands in the Stream',
      title: 'Islands in the Stream', year: 1983, lang: 'en',
      sources: busca('Kenny Rogers', 'Islands in the Stream'),
    },
    {
      id: 'song-guitars-cadillacs', cat: 'song-country', franchise: 'Dwight Yoakam', game: 'Guitars, Cadillacs',
      title: 'Guitars, Cadillacs', year: 1986, lang: 'en',
      sources: busca('Dwight Yoakam', 'Guitars, Cadillacs'),
    },
    {
      id: 'song-forever-and-ever-amen', cat: 'song-country', franchise: 'Randy Travis', game: 'Forever and Ever, Amen',
      title: 'Forever and Ever, Amen', year: 1987, lang: 'en',
      sources: busca('Randy Travis', 'Forever and Ever, Amen'),
    },
    {
      id: 'song-fishin-in-the-dark', cat: 'song-country', franchise: 'Nitty Gritty Dirt Band', game: 'Fishin\' in the Dark',
      title: 'Fishin\' in the Dark', year: 1987, lang: 'en',
      sources: busca('Nitty Gritty Dirt Band', 'Fishin\' in the Dark'),
    },
    {
      id: 'song-achy-breaky-heart', cat: 'song-country', franchise: 'Billy Ray Cyrus', game: 'Achy Breaky Heart',
      title: 'Achy Breaky Heart', year: 1992, lang: 'en',
      sources: busca('Billy Ray Cyrus', 'Achy Breaky Heart'),
    },
    {
      id: 'song-boot-scootin-boogie', cat: 'song-country', franchise: 'Brooks & Dunn', game: 'Boot Scootin\' Boogie',
      title: 'Boot Scootin\' Boogie', year: 1992, lang: 'en',
      sources: busca('Brooks & Dunn', 'Boot Scootin\' Boogie'),
    },
    {
      id: 'song-neon-moon', cat: 'song-country', franchise: 'Brooks & Dunn', game: 'Neon Moon',
      title: 'Neon Moon', year: 1992, lang: 'en',
      sources: busca('Brooks & Dunn', 'Neon Moon'),
    },
    {
      id: 'song-chattahoochee', cat: 'song-country', franchise: 'Alan Jackson', game: 'Chattahoochee',
      title: 'Chattahoochee', year: 1993, lang: 'en',
      sources: busca('Alan Jackson', 'Chattahoochee'),
    },
    {
      id: 'song-shouldve-been-a-cowboy', cat: 'song-country', franchise: 'Toby Keith', game: 'Should\'ve Been a Cowboy',
      title: 'Should\'ve Been a Cowboy', year: 1993, lang: 'en',
      sources: busca('Toby Keith', 'Should\'ve Been a Cowboy'),
    },
    {
      id: 'song-independence-day', cat: 'song-country', franchise: 'Martina McBride', game: 'Independence Day',
      title: 'Independence Day', year: 1994, lang: 'en',
      sources: busca('Martina McBride', 'Independence Day'),
    },
    {
      id: 'song-check-yes-or-no', cat: 'song-country', franchise: 'George Strait', game: 'Check Yes or No',
      title: 'Check Yes or No', year: 1995, lang: 'en',
      sources: busca('George Strait', 'Check Yes or No'),
    },
    {
      id: 'song-any-man-of-mine', cat: 'song-country', franchise: 'Shania Twain', game: 'Any Man of Mine',
      title: 'Any Man of Mine', year: 1995, lang: 'en',
      sources: busca('Shania Twain', 'Any Man of Mine'),
    },
    {
      id: 'song-strawberry-wine', cat: 'song-country', franchise: 'Deana Carter', game: 'Strawberry Wine',
      title: 'Strawberry Wine', year: 1996, lang: 'en',
      sources: busca('Deana Carter', 'Strawberry Wine'),
    },
    {
      id: 'song-how-do-i-live', cat: 'song-country', franchise: 'LeAnn Rimes', game: 'How Do I Live',
      title: 'How Do I Live', year: 1997, lang: 'en',
      sources: busca('LeAnn Rimes', 'How Do I Live'),
    },
    {
      id: 'song-man-i-feel-like-a-woman', cat: 'song-country', franchise: 'Shania Twain', game: 'Man! I Feel Like a Woman!',
      title: 'Man! I Feel Like a Woman!', year: 1997, lang: 'en',
      sources: busca('Shania Twain', 'Man! I Feel Like a Woman!'),
    },
    {
      id: 'song-youre-still-the-one', cat: 'song-country', franchise: 'Shania Twain', game: 'You\'re Still the One',
      title: 'You\'re Still the One', year: 1997, lang: 'en',
      sources: busca('Shania Twain', 'You\'re Still the One'),
    },
    {
      id: 'song-this-kiss', cat: 'song-country', franchise: 'Faith Hill', game: 'This Kiss',
      title: 'This Kiss', year: 1998, lang: 'en',
      sources: busca('Faith Hill', 'This Kiss'),
    },
    {
      id: 'song-wide-open-spaces', cat: 'song-country', franchise: 'The Chicks', game: 'Wide Open Spaces',
      title: 'Wide Open Spaces', year: 1998, lang: 'en',
      sources: busca('The Chicks', 'Wide Open Spaces'),
    },
    {
      id: 'song-she-thinks-my-tractors-sexy', cat: 'song-country', franchise: 'Kenny Chesney', game: 'She Thinks My Tractor\'s Sexy',
      title: 'She Thinks My Tractor\'s Sexy', year: 1999, lang: 'en',
      sources: busca('Kenny Chesney', 'She Thinks My Tractor\'s Sexy'),
    },
    {
      id: 'song-how-do-you-like-me-now', cat: 'song-country', franchise: 'Toby Keith', game: 'How Do You Like Me Now?!',
      title: 'How Do You Like Me Now?!', year: 1999, lang: 'en',
      sources: busca('Toby Keith', 'How Do You Like Me Now?!'),
    },
    {
      id: 'song-i-hope-you-dance', cat: 'song-country', franchise: 'Lee Ann Womack', game: 'I Hope You Dance',
      title: 'I Hope You Dance', year: 2000, lang: 'en',
      sources: busca('Lee Ann Womack', 'I Hope You Dance'),
    },
    {
      id: 'song-goodbye-earl', cat: 'song-country', franchise: 'The Chicks', game: 'Goodbye Earl',
      title: 'Goodbye Earl', year: 2000, lang: 'en',
      sources: busca('The Chicks', 'Goodbye Earl'),
    },
    {
      id: 'song-austin', cat: 'song-country', franchise: 'Blake Shelton', game: 'Austin',
      title: 'Austin', year: 2001, lang: 'en',
      sources: busca('Blake Shelton', 'Austin'),
    },
    {
      id: 'song-its-five-oclock-somewhere', cat: 'song-country', franchise: 'Alan Jackson y Jimmy Buffett', game: 'It\'s Five O\'Clock Somewhere',
      title: 'It\'s Five O\'Clock Somewhere', year: 2003, lang: 'en',
      sources: busca('Alan Jackson', 'It\'s Five O\'Clock Somewhere'),
    },
    {
      id: 'song-whiskey-lullaby', cat: 'song-country', franchise: 'Brad Paisley y Alison Krauss', game: 'Whiskey Lullaby',
      title: 'Whiskey Lullaby', year: 2003, lang: 'en',
      sources: busca('Brad Paisley', 'Whiskey Lullaby'),
    },
    {
      id: 'song-redneck-woman', cat: 'song-country', franchise: 'Gretchen Wilson', game: 'Redneck Woman',
      title: 'Redneck Woman', year: 2004, lang: 'en',
      sources: busca('Gretchen Wilson', 'Redneck Woman'),
    },
    {
      id: 'song-bless-the-broken-road', cat: 'song-country', franchise: 'Rascal Flatts', game: 'Bless the Broken Road',
      title: 'Bless the Broken Road', year: 2004, lang: 'en',
      sources: busca('Rascal Flatts', 'Bless the Broken Road'),
    },
    {
      id: 'song-jesus-take-the-wheel', cat: 'song-country', franchise: 'Carrie Underwood', game: 'Jesus, Take the Wheel',
      title: 'Jesus, Take the Wheel', year: 2005, lang: 'en',
      sources: busca('Carrie Underwood', 'Jesus, Take the Wheel'),
    },
    {
      id: 'song-before-he-cheats', cat: 'song-country', franchise: 'Carrie Underwood', game: 'Before He Cheats',
      title: 'Before He Cheats', year: 2005, lang: 'en',
      sources: busca('Carrie Underwood', 'Before He Cheats'),
    },
    {
      id: 'song-our-song', cat: 'song-country', franchise: 'Taylor Swift', game: 'Our Song',
      title: 'Our Song', year: 2006, lang: 'en',
      sources: busca('Taylor Swift', 'Our Song'),
    },
    {
      id: 'song-teardrops-on-my-guitar', cat: 'song-country', franchise: 'Taylor Swift', game: 'Teardrops on My Guitar',
      title: 'Teardrops on My Guitar', year: 2006, lang: 'en',
      sources: busca('Taylor Swift', 'Teardrops on My Guitar'),
    },
    {
      id: 'song-gunpowder-and-lead', cat: 'song-country', franchise: 'Miranda Lambert', game: 'Gunpowder & Lead',
      title: 'Gunpowder & Lead', year: 2007, lang: 'en',
      sources: busca('Miranda Lambert', 'Gunpowder & Lead'),
    },
    {
      id: 'song-chicken-fried', cat: 'song-country', franchise: 'Zac Brown Band', game: 'Chicken Fried',
      title: 'Chicken Fried', year: 2008, lang: 'en',
      sources: busca('Zac Brown Band', 'Chicken Fried'),
    },
    {
      id: 'song-big-green-tractor', cat: 'song-country', franchise: 'Jason Aldean', game: 'Big Green Tractor',
      title: 'Big Green Tractor', year: 2009, lang: 'en',
      sources: busca('Jason Aldean', 'Big Green Tractor'),
    },
    {
      id: 'song-need-you-now', cat: 'song-country', franchise: 'Lady A', game: 'Need You Now',
      title: 'Need You Now', year: 2009, lang: 'en',
      sources: busca('Lady A', 'Need You Now'),
    },
    {
      id: 'song-the-house-that-built-me', cat: 'song-country', franchise: 'Miranda Lambert', game: 'The House That Built Me',
      title: 'The House That Built Me', year: 2009, lang: 'en',
      sources: busca('Miranda Lambert', 'The House That Built Me'),
    },
    {
      id: 'song-stuck-like-glue', cat: 'song-country', franchise: 'Sugarland', game: 'Stuck Like Glue',
      title: 'Stuck Like Glue', year: 2010, lang: 'en',
      sources: busca('Sugarland', 'Stuck Like Glue'),
    },
    {
      id: 'song-red-solo-cup', cat: 'song-country', franchise: 'Toby Keith', game: 'Red Solo Cup',
      title: 'Red Solo Cup', year: 2011, lang: 'en',
      sources: busca('Toby Keith', 'Red Solo Cup'),
    },
    {
      id: 'song-country-girl-shake-it-for-me', cat: 'song-country', franchise: 'Luke Bryan', game: 'Country Girl (Shake It for Me)',
      title: 'Country Girl (Shake It for Me)', year: 2011, lang: 'en',
      sources: busca('Luke Bryan', 'Country Girl (Shake It for Me)'),
    },
    {
      id: 'song-springsteen', cat: 'song-country', franchise: 'Eric Church', game: 'Springsteen',
      title: 'Springsteen', year: 2011, lang: 'en',
      sources: busca('Eric Church', 'Springsteen'),
    },
    {
      id: 'song-cruise', cat: 'song-country', franchise: 'Florida Georgia Line', game: 'Cruise',
      title: 'Cruise', year: 2012, lang: 'en',
      sources: busca('Florida Georgia Line', 'Cruise'),
    },
    {
      id: 'song-wagon-wheel', cat: 'song-country', franchise: 'Darius Rucker', game: 'Wagon Wheel',
      title: 'Wagon Wheel', year: 2013, lang: 'en',
      sources: busca('Darius Rucker', 'Wagon Wheel'),
    },
    {
      id: 'song-follow-your-arrow', cat: 'song-country', franchise: 'Kacey Musgraves', game: 'Follow Your Arrow',
      title: 'Follow Your Arrow', year: 2013, lang: 'en',
      sources: busca('Kacey Musgraves', 'Follow Your Arrow'),
    },
    {
      id: 'song-girl-crush', cat: 'song-country', franchise: 'Little Big Town', game: 'Girl Crush',
      title: 'Girl Crush', year: 2014, lang: 'en',
      sources: busca('Little Big Town', 'Girl Crush'),
    },
    {
      id: 'song-tennessee-whiskey', cat: 'song-country', franchise: 'Chris Stapleton', game: 'Tennessee Whiskey',
      title: 'Tennessee Whiskey', year: 2015, lang: 'en',
      sources: busca('Chris Stapleton', 'Tennessee Whiskey'),
    },
    {
      id: 'song-die-a-happy-man', cat: 'song-country', franchise: 'Thomas Rhett', game: 'Die a Happy Man',
      title: 'Die a Happy Man', year: 2015, lang: 'en',
      sources: busca('Thomas Rhett', 'Die a Happy Man'),
    },
    {
      id: 'song-humble-and-kind', cat: 'song-country', franchise: 'Tim McGraw', game: 'Humble and Kind',
      title: 'Humble and Kind', year: 2015, lang: 'en',
      sources: busca('Tim McGraw', 'Humble and Kind'),
    },
    {
      id: 'song-body-like-a-back-road', cat: 'song-country', franchise: 'Sam Hunt', game: 'Body Like a Back Road',
      title: 'Body Like a Back Road', year: 2017, lang: 'en',
      sources: busca('Sam Hunt', 'Body Like a Back Road'),
    },
    {
      id: 'song-meant-to-be', cat: 'song-country', franchise: 'Bebe Rexha y Florida Georgia Line', game: 'Meant to Be',
      title: 'Meant to Be', year: 2017, lang: 'en',
      sources: busca('Bebe Rexha', 'Meant to Be'),
    },
    {
      id: 'song-beautiful-crazy', cat: 'song-country', franchise: 'Luke Combs', game: 'Beautiful Crazy',
      title: 'Beautiful Crazy', year: 2018, lang: 'en',
      sources: busca('Luke Combs', 'Beautiful Crazy'),
    },
    {
      id: 'song-whiskey-glasses', cat: 'song-country', franchise: 'Morgan Wallen', game: 'Whiskey Glasses',
      title: 'Whiskey Glasses', year: 2018, lang: 'en',
      sources: busca('Morgan Wallen', 'Whiskey Glasses'),
    },
    {
      id: 'song-10-000-hours', cat: 'song-country', franchise: 'Dan + Shay y Justin Bieber', game: '10,000 Hours',
      title: '10,000 Hours', year: 2019, lang: 'en',
      sources: busca('Dan + Shay', '10,000 Hours'),
    },
    {
      id: 'song-the-bones', cat: 'song-country', franchise: 'Maren Morris', game: 'The Bones',
      title: 'The Bones', year: 2019, lang: 'en',
      sources: busca('Maren Morris', 'The Bones'),
    },
    {
      id: 'song-fancy-like', cat: 'song-country', franchise: 'Walker Hayes', game: 'Fancy Like',
      title: 'Fancy Like', year: 2021, lang: 'en',
      sources: busca('Walker Hayes', 'Fancy Like'),
    },
    {
      id: 'song-buy-dirt', cat: 'song-country', franchise: 'Jordan Davis y Luke Bryan', game: 'Buy Dirt',
      title: 'Buy Dirt', year: 2021, lang: 'en',
      sources: busca('Jordan Davis', 'Buy Dirt'),
    },
    {
      id: 'song-something-in-the-orange', cat: 'song-country', franchise: 'Zach Bryan', game: 'Something in the Orange',
      title: 'Something in the Orange', year: 2022, lang: 'en',
      sources: busca('Zach Bryan', 'Something in the Orange'),
    },
    {
      id: 'song-heart-like-a-truck', cat: 'song-country', franchise: 'Lainey Wilson', game: 'Heart Like a Truck',
      title: 'Heart Like a Truck', year: 2022, lang: 'en',
      sources: busca('Lainey Wilson', 'Heart Like a Truck'),
    },
    {
      id: 'song-last-night', cat: 'song-country', franchise: 'Morgan Wallen', game: 'Last Night',
      title: 'Last Night', year: 2023, lang: 'en',
      sources: busca('Morgan Wallen', 'Last Night'),
    },
    {
      id: 'song-fast-car', cat: 'song-country', franchise: 'Luke Combs', game: 'Fast Car',
      title: 'Fast Car', year: 2023, lang: 'en',
      sources: busca('Luke Combs', 'Fast Car'),
    },
    {
      id: 'song-i-remember-everything', cat: 'song-country', franchise: 'Zach Bryan y Kacey Musgraves', game: 'I Remember Everything',
      title: 'I Remember Everything', year: 2023, lang: 'en',
      sources: busca('Zach Bryan', 'I Remember Everything'),
    },
    {
      id: 'song-need-a-favor', cat: 'song-country', franchise: 'Jelly Roll', game: 'Need a Favor',
      title: 'Need a Favor', year: 2023, lang: 'en',
      sources: busca('Jelly Roll', 'Need a Favor'),
    },
    {
      id: 'song-texas-hold-em', cat: 'song-country', franchise: 'Beyoncé', game: 'Texas Hold \'Em',
      title: 'Texas Hold \'Em', year: 2024, lang: 'en',
      sources: busca('Beyoncé', 'Texas Hold \'Em'),
    },
    {
      id: 'song-a-bar-song-tipsy', cat: 'song-country', franchise: 'Shaboozey', game: 'A Bar Song (Tipsy)',
      title: 'A Bar Song (Tipsy)', year: 2024, lang: 'en',
      sources: busca('Shaboozey', 'A Bar Song (Tipsy)'),
    },
    {
      id: 'song-i-had-some-help', cat: 'song-country', franchise: 'Post Malone y Morgan Wallen', game: 'I Had Some Help',
      title: 'I Had Some Help', year: 2024, lang: 'en',
      sources: busca('Post Malone', 'I Had Some Help'),
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
