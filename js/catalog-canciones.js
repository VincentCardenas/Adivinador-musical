/*
 * Catálogo: Canciones famosas (184 pistas).
 * Canciones famosas por época. `franchise` es el artista (respuesta del modo Clásico) y `lang` el idioma (es / en) para el filtro del inicio.
 * Mismo formato que catalog.js; las fuentes se prueban en el orden en que aparecen.
 */
(function (AM) {
  'use strict';

  const apple = (o) => Object.assign({ type: 'itunes' }, o);
  const yt = (id, start) => ({ type: 'youtube', id: id, start: start || 0 });

  AM.CATEGORIES.push(
    { id: 'song-70s', theme: 'canciones', label: 'Antes de 1980', icon: '📻' },
    { id: 'song-80s', theme: 'canciones', label: 'Años 80', icon: '🕺' },
    { id: 'song-90s', theme: 'canciones', label: 'Años 90', icon: '💿' },
    { id: 'song-00s', theme: 'canciones', label: '2000s', icon: '📀' },
    { id: 'song-10s', theme: 'canciones', label: '2010s', icon: '📱' },
    { id: 'song-20s', theme: 'canciones', label: '2020 en adelante', icon: '🎧' },
  );

  AM.CATALOG.push(
    /* ───────────── Antes de 1980 (29) ───────────── */
    {
      id: 'song-bohemian-rhapsody', cat: 'song-70s', franchise: 'Queen', game: 'Bohemian Rhapsody',
      title: 'Bohemian Rhapsody', year: 1975, lang: 'en',
      sources: [apple({ song: 6781027645, country: 'mx' })],
    },
    {
      id: 'song-hotel-california', cat: 'song-70s', franchise: 'Eagles', game: 'Hotel California',
      title: 'Hotel California', year: 1976, lang: 'en',
      sources: [apple({ song: 635770202, country: 'mx' })],
    },
    {
      id: 'song-stayin-alive', cat: 'song-70s', franchise: 'Bee Gees', game: 'Stayin\' Alive',
      title: 'Stayin\' Alive', year: 1977, lang: 'en',
      sources: [apple({ song: 1442259185, country: 'mx' })],
    },
    {
      id: 'song-dancing-queen', cat: 'song-70s', franchise: 'ABBA', game: 'Dancing Queen',
      title: 'Dancing Queen', year: 1976, lang: 'en',
      sources: [apple({ song: 1530392860, country: 'mx' })],
    },
    {
      id: 'song-hey-jude', cat: 'song-70s', franchise: 'The Beatles', game: 'Hey Jude',
      title: 'Hey Jude', year: 1968, lang: 'en',
      sources: [apple({ song: 1441133277, country: 'mx' })],
    },
    {
      id: 'song-imagine', cat: 'song-70s', franchise: 'John Lennon', game: 'Imagine',
      title: 'Imagine', year: 1971, lang: 'en',
      sources: [apple({ song: 1440853776, country: 'mx' })],
    },
    {
      id: 'song-i-will-survive', cat: 'song-70s', franchise: 'Gloria Gaynor', game: 'I Will Survive',
      title: 'I Will Survive', year: 1978, lang: 'en',
      sources: [apple({ song: 1443875398, country: 'mx' })],
    },
    {
      id: 'song-stairway-to-heaven', cat: 'song-70s', franchise: 'Led Zeppelin', game: 'Stairway to Heaven',
      title: 'Stairway to Heaven', year: 1971, lang: 'en',
      sources: [apple({ song: 580708180, country: 'mx' })],
    },
    {
      id: 'song-september', cat: 'song-70s', franchise: 'Earth, Wind & Fire', game: 'September',
      title: 'September', year: 1978, lang: 'en',
      sources: [apple({ song: 1099293333, country: 'mx' })],
    },
    {
      id: 'song-y-m-c-a', cat: 'song-70s', franchise: 'Village People', game: 'Y.M.C.A.',
      title: 'Y.M.C.A.', year: 1978, lang: 'en',
      sources: [apple({ song: 1452863525, country: 'mx' })],
    },
    {
      id: 'song-can-t-help-falling-in-love', cat: 'song-70s', franchise: 'Elvis Presley', game: 'Can\'t Help Falling in Love',
      title: 'Can\'t Help Falling in Love', year: 1961, lang: 'en',
      sources: [apple({ song: 1291058002, country: 'mx' })],
    },
    {
      id: 'song-what-a-wonderful-world', cat: 'song-70s', franchise: 'Louis Armstrong', game: 'What a Wonderful World',
      title: 'What a Wonderful World', year: 1967, lang: 'en',
      sources: [apple({ song: 1442245075, country: 'mx' })],
    },
    {
      id: 'song-i-can-t-get-no-satisfaction', cat: 'song-70s', franchise: 'The Rolling Stones', game: '(I Can\'t Get No) Satisfaction',
      title: '(I Can\'t Get No) Satisfaction', year: 1965, lang: 'en',
      sources: [apple({ song: 1440743544, country: 'mx' })],
    },
    {
      id: 'song-superstition', cat: 'song-70s', franchise: 'Stevie Wonder', game: 'Superstition',
      title: 'Superstition', year: 1972, lang: 'en',
      sources: [apple({ song: 1440757545, country: 'mx' })],
    },
    {
      id: 'song-my-way', cat: 'song-70s', franchise: 'Frank Sinatra', game: 'My Way',
      title: 'My Way', year: 1969, lang: 'en',
      sources: [apple({ song: 1440858717, country: 'mx' })],
    },
    {
      id: 'song-la-bamba', cat: 'song-70s', franchise: 'Ritchie Valens', game: 'La Bamba',
      title: 'La Bamba', year: 1958, lang: 'es',
      sources: [apple({ song: 439413921, country: 'mx' })],
    },
    {
      id: 'song-el-triste', cat: 'song-70s', franchise: 'José José', game: 'El Triste',
      title: 'El Triste', year: 1970, lang: 'es',
      sources: [apple({ song: 1249008755, country: 'mx' })],
    },
    {
      id: 'song-gavilan-o-paloma', cat: 'song-70s', franchise: 'José José', game: 'Gavilán o paloma',
      title: 'Gavilán o paloma', year: 1977, lang: 'es',
      sources: [apple({ song: 183296514, country: 'mx' })],
    },
    {
      id: 'song-eres-tu', cat: 'song-70s', franchise: 'Mocedades', game: 'Eres tú',
      title: 'Eres tú', year: 1973, lang: 'es',
      sources: [apple({ song: 254527213, country: 'mx' })],
    },
    {
      id: 'song-libre', cat: 'song-70s', franchise: 'Nino Bravo', game: 'Libre',
      title: 'Libre', year: 1972, lang: 'es',
      sources: [apple({ song: 1444117550, country: 'mx' })],
    },
    {
      id: 'song-por-que-te-vas', cat: 'song-70s', franchise: 'Jeanette', game: 'Por qué te vas',
      title: 'Por qué te vas', year: 1974, lang: 'es',
      sources: [apple({ song: 157403073, country: 'mx' })],
    },
    {
      id: 'song-pedro-navaja', cat: 'song-70s', franchise: 'Rubén Blades', game: 'Pedro Navaja',
      title: 'Pedro Navaja', year: 1978, lang: 'es',
      sources: [apple({ song: 1464290722, country: 'mx' })],
    },
    {
      id: 'song-oye-como-va', cat: 'song-70s', franchise: 'Santana', game: 'Oye cómo va',
      title: 'Oye cómo va', year: 1970, lang: 'es',
      sources: [apple({ song: 324767777, country: 'mx' })],
    },
    {
      id: 'song-gracias-a-la-vida', cat: 'song-70s', franchise: 'Mercedes Sosa', game: 'Gracias a la vida',
      title: 'Gracias a la vida', year: 1971, lang: 'es',
      sources: [apple({ song: 1887649769, country: 'mx' })],
    },
    {
      id: 'song-el-rey', cat: 'song-70s', franchise: 'Vicente Fernández', game: 'El Rey',
      title: 'El Rey', year: 1973, lang: 'es',
      sources: [apple({ song: 322076425, country: 'mx' })],
    },
    {
      id: 'song-un-rayo-de-sol', cat: 'song-70s', franchise: 'Los Diablos', game: 'Un rayo de sol',
      title: 'Un rayo de sol', year: 1970, lang: 'es',
      sources: [apple({ song: 1837717425, country: 'mx' })],
    },
    {
      id: 'song-vivir-asi-es-morir-de-amor', cat: 'song-70s', franchise: 'Camilo Sesto', game: 'Vivir así es morir de amor',
      title: 'Vivir así es morir de amor', year: 1978, lang: 'es',
      sources: [apple({ song: 313154080, country: 'mx' })],
    },
    {
      id: 'song-yo-soy-aquel', cat: 'song-70s', franchise: 'Raphael', game: 'Yo soy aquel',
      title: 'Yo soy aquel', year: 1966, lang: 'es',
      sources: [apple({ song: 700056228, country: 'mx' })],
    },
    {
      id: 'song-no-tengo-dinero', cat: 'song-70s', franchise: 'Juan Gabriel', game: 'No tengo dinero',
      title: 'No tengo dinero', year: 1971, lang: 'es',
      sources: [apple({ song: 1444974195, country: 'mx' })],
    },
    /* ───────────── Años 80 (30) ───────────── */
    {
      id: 'song-billie-jean', cat: 'song-80s', franchise: 'Michael Jackson', game: 'Billie Jean',
      title: 'Billie Jean', year: 1982, lang: 'en',
      sources: [apple({ song: 1883770432, country: 'mx' })],
    },
    {
      id: 'song-take-on-me', cat: 'song-80s', franchise: 'a-ha', game: 'Take On Me',
      title: 'Take On Me', year: 1985, lang: 'en',
      sources: [apple({ song: 368555810, country: 'mx' })],
    },
    {
      id: 'song-like-a-prayer', cat: 'song-80s', franchise: 'Madonna', game: 'Like a Prayer',
      title: 'Like a Prayer', year: 1989, lang: 'en',
      sources: [apple({ song: 329064713, country: 'mx' })],
    },
    {
      id: 'song-sweet-child-o-mine', cat: 'song-80s', franchise: 'Guns N\' Roses', game: 'Sweet Child O\' Mine',
      title: 'Sweet Child O\' Mine', year: 1987, lang: 'en',
      sources: [apple({ song: 1377826892, country: 'mx' })],
    },
    {
      id: 'song-livin-on-a-prayer', cat: 'song-80s', franchise: 'Bon Jovi', game: 'Livin\' on a Prayer',
      title: 'Livin\' on a Prayer', year: 1986, lang: 'en',
      sources: [apple({ song: 1422955211, country: 'mx' })],
    },
    {
      id: 'song-don-t-stop-believin', cat: 'song-80s', franchise: 'Journey', game: 'Don\'t Stop Believin\'',
      title: 'Don\'t Stop Believin\'', year: 1981, lang: 'en',
      sources: [apple({ song: 466738077, country: 'mx' })],
    },
    {
      id: 'song-africa', cat: 'song-80s', franchise: 'Toto', game: 'Africa',
      title: 'Africa', year: 1982, lang: 'en',
      sources: [apple({ song: 1297035514, country: 'mx' })],
    },
    {
      id: 'song-every-breath-you-take', cat: 'song-80s', franchise: 'The Police', game: 'Every Breath You Take',
      title: 'Every Breath You Take', year: 1983, lang: 'en',
      sources: [apple({ song: 1452859708, country: 'mx' })],
    },
    {
      id: 'song-girls-just-want-to-have-fun', cat: 'song-80s', franchise: 'Cyndi Lauper', game: 'Girls Just Want to Have Fun',
      title: 'Girls Just Want to Have Fun', year: 1983, lang: 'en',
      sources: [apple({ song: 324761990, country: 'mx' })],
    },
    {
      id: 'song-eye-of-the-tiger', cat: 'song-80s', franchise: 'Survivor', game: 'Eye of the Tiger',
      title: 'Eye of the Tiger', year: 1982, lang: 'en',
      sources: [apple({ song: 309539748, country: 'mx' })],
    },
    {
      id: 'song-never-gonna-give-you-up', cat: 'song-80s', franchise: 'Rick Astley', game: 'Never Gonna Give You Up',
      title: 'Never Gonna Give You Up', year: 1987, lang: 'en',
      sources: [apple({ song: 1559523359, country: 'mx' })],
    },
    {
      id: 'song-wake-me-up-before-you-go-go', cat: 'song-80s', franchise: 'Wham!', game: 'Wake Me Up Before You Go-Go',
      title: 'Wake Me Up Before You Go-Go', year: 1984, lang: 'en',
      sources: [apple({ song: 1466274459, country: 'mx' })],
    },
    {
      id: 'song-i-wanna-dance-with-somebody', cat: 'song-80s', franchise: 'Whitney Houston', game: 'I Wanna Dance with Somebody',
      title: 'I Wanna Dance with Somebody', year: 1987, lang: 'en',
      sources: [apple({ song: 840431935, country: 'mx' })],
    },
    {
      id: 'song-total-eclipse-of-the-heart', cat: 'song-80s', franchise: 'Bonnie Tyler', game: 'Total Eclipse of the Heart',
      title: 'Total Eclipse of the Heart', year: 1983, lang: 'en',
      sources: [apple({ song: 675798126, country: 'mx' })],
    },
    {
      id: 'song-another-one-bites-the-dust', cat: 'song-80s', franchise: 'Queen', game: 'Another One Bites the Dust',
      title: 'Another One Bites the Dust', year: 1980, lang: 'en',
      sources: [apple({ song: 6781027662, country: 'mx' })],
    },
    {
      id: 'song-sweet-dreams-are-made-of-this', cat: 'song-80s', franchise: 'Eurythmics', game: 'Sweet Dreams (Are Made of This)',
      title: 'Sweet Dreams (Are Made of This)', year: 1983, lang: 'en',
      sources: [apple({ song: 1752002002, country: 'mx' })],
    },
    {
      id: 'song-querida', cat: 'song-80s', franchise: 'Juan Gabriel', game: 'Querida',
      title: 'Querida', year: 1984, lang: 'es',
      sources: [apple({ song: 1592349440, country: 'mx' })],
    },
    {
      id: 'song-amor-eterno', cat: 'song-80s', franchise: 'Rocío Dúrcal', game: 'Amor eterno',
      title: 'Amor eterno', year: 1984, lang: 'es',
      sources: [apple({ song: 322289901, country: 'mx' })],
    },
    {
      id: 'song-la-incondicional', cat: 'song-80s', franchise: 'Luis Miguel', game: 'La incondicional',
      title: 'La incondicional', year: 1988, lang: 'es',
      sources: [apple({ song: 101069172, country: 'mx' })],
    },
    {
      id: 'song-persiana-americana', cat: 'song-80s', franchise: 'Soda Stereo', game: 'Persiana americana',
      title: 'Persiana americana', year: 1986, lang: 'es',
      sources: [apple({ song: 321882520, country: 'mx' })],
    },
    {
      id: 'song-la-chica-de-ayer', cat: 'song-80s', franchise: 'Nacha Pop', game: 'La chica de ayer',
      title: 'La chica de ayer', year: 1980, lang: 'es',
      sources: [apple({ song: 1443179510, country: 'mx' })],
    },
    {
      id: 'song-devuelveme-a-mi-chica', cat: 'song-80s', franchise: 'Hombres G', game: 'Devuélveme a mi chica',
      title: 'Devuélveme a mi chica', year: 1985, lang: 'es',
      sources: [apple({ song: 131366748, country: 'mx' })],
    },
    {
      id: 'song-ni-tu-ni-nadie', cat: 'song-80s', franchise: 'Alaska y Dinarama', game: 'Ni tú ni nadie',
      title: 'Ni tú ni nadie', year: 1984, lang: 'es',
      sources: [apple({ song: 1758772527, country: 'mx' })],
    },
    {
      id: 'song-hijo-de-la-luna', cat: 'song-80s', franchise: 'Mecano', game: 'Hijo de la luna',
      title: 'Hijo de la luna', year: 1986, lang: 'es',
      sources: [apple({ song: 1559520587, country: 'mx' })],
    },
    {
      id: 'song-lobo-hombre-en-paris', cat: 'song-80s', franchise: 'La Unión', game: 'Lobo-hombre en París',
      title: 'Lobo-hombre en París', year: 1984, lang: 'es',
      sources: [apple({ song: 1268516049, country: 'mx' })],
    },
    {
      id: 'song-ojala-que-llueva-cafe', cat: 'song-80s', franchise: 'Juan Luis Guerra', game: 'Ojalá que llueva café',
      title: 'Ojalá que llueva café', year: 1989, lang: 'es',
      sources: [apple({ song: 19468935, country: 'mx' })],
    },
    {
      id: 'song-hey', cat: 'song-80s', franchise: 'Julio Iglesias', game: 'Hey',
      title: 'Hey', year: 1980, lang: 'es',
      sources: [apple({ song: 1637480435, country: 'mx' })],
    },
    {
      id: 'song-maldita-primavera', cat: 'song-80s', franchise: 'Yuri', game: 'Maldita primavera',
      title: 'Maldita primavera', year: 1981, lang: 'es',
      sources: [apple({ song: 713506313, country: 'mx' })],
    },
    {
      id: 'song-el-baile-de-los-que-sobran', cat: 'song-80s', franchise: 'Los Prisioneros', game: 'El baile de los que sobran',
      title: 'El baile de los que sobran', year: 1986, lang: 'es',
      sources: [apple({ song: 714026688, country: 'mx' })],
    },
    {
      id: 'song-tu-y-yo-somos-uno-mismo', cat: 'song-80s', franchise: 'Timbiriche', game: 'Tú y yo somos uno mismo',
      title: 'Tú y yo somos uno mismo', year: 1987, lang: 'es',
      sources: [apple({ song: 1443564447, country: 'mx' })],
    },
    /* ───────────── Años 90 (32) ───────────── */
    {
      id: 'song-smells-like-teen-spirit', cat: 'song-90s', franchise: 'Nirvana', game: 'Smells Like Teen Spirit',
      title: 'Smells Like Teen Spirit', year: 1991, lang: 'en',
      sources: [apple({ song: 1586895442, country: 'mx' })],
    },
    {
      id: 'song-wonderwall', cat: 'song-90s', franchise: 'Oasis', game: 'Wonderwall',
      title: 'Wonderwall', year: 1995, lang: 'en',
      sources: [apple({ song: 433401745, country: 'mx' })],
    },
    {
      id: 'song-baby-one-more-time', cat: 'song-90s', franchise: 'Britney Spears', game: '...Baby One More Time',
      title: '...Baby One More Time', year: 1998, lang: 'en',
      sources: [apple({ song: 273143820, country: 'mx' })],
    },
    {
      id: 'song-wannabe', cat: 'song-90s', franchise: 'Spice Girls', game: 'Wannabe',
      title: 'Wannabe', year: 1996, lang: 'en',
      sources: [apple({ song: 1551249273, country: 'mx' })],
    },
    {
      id: 'song-i-want-it-that-way', cat: 'song-90s', franchise: 'Backstreet Boys', game: 'I Want It That Way',
      title: 'I Want It That Way', year: 1999, lang: 'en',
      sources: [apple({ song: 945192053, country: 'mx' })],
    },
    {
      id: 'song-my-heart-will-go-on', cat: 'song-90s', franchise: 'Celine Dion', game: 'My Heart Will Go On',
      title: 'My Heart Will Go On', year: 1997, lang: 'en',
      sources: [apple({ song: 205745391, country: 'mx' })],
    },
    {
      id: 'song-losing-my-religion', cat: 'song-90s', franchise: 'R.E.M.', game: 'Losing My Religion',
      title: 'Losing My Religion', year: 1991, lang: 'en',
      sources: [apple({ song: 1442996689, country: 'mx' })],
    },
    {
      id: 'song-zombie', cat: 'song-90s', franchise: 'The Cranberries', game: 'Zombie',
      title: 'Zombie', year: 1994, lang: 'en',
      sources: [apple({ song: 1762669878, country: 'mx' })],
    },
    {
      id: 'song-gangsta-s-paradise', cat: 'song-90s', franchise: 'Coolio', game: 'Gangsta\'s Paradise',
      title: 'Gangsta\'s Paradise', year: 1995, lang: 'en',
      sources: [apple({ song: 1827554491, country: 'mx' })],
    },
    {
      id: 'song-i-will-always-love-you', cat: 'song-90s', franchise: 'Whitney Houston', game: 'I Will Always Love You',
      title: 'I Will Always Love You', year: 1992, lang: 'en',
      sources: [apple({ song: 388151901, country: 'mx' })],
    },
    {
      id: 'song-livin-la-vida-loca', cat: 'song-90s', franchise: 'Ricky Martin', game: 'Livin\' la Vida Loca',
      title: 'Livin\' la Vida Loca', year: 1999, lang: 'en',
      sources: [apple({ song: 262218645, country: 'mx' })],
    },
    {
      id: 'song-barbie-girl', cat: 'song-90s', franchise: 'Aqua', game: 'Barbie Girl',
      title: 'Barbie Girl', year: 1997, lang: 'en',
      sources: [apple({ song: 1440768563, country: 'mx' })],
    },
    {
      id: 'song-blue-da-ba-dee', cat: 'song-90s', franchise: 'Eiffel 65', game: 'Blue (Da Ba Dee)',
      title: 'Blue (Da Ba Dee)', year: 1998, lang: 'en',
      sources: [apple({ song: 257425447, country: 'mx' })],
    },
    {
      id: 'song-creep', cat: 'song-90s', franchise: 'Radiohead', game: 'Creep',
      title: 'Creep', year: 1992, lang: 'en',
      sources: [apple({ song: 1097862231, country: 'mx' })],
    },
    {
      id: 'song-all-star', cat: 'song-90s', franchise: 'Smash Mouth', game: 'All Star',
      title: 'All Star', year: 1999, lang: 'en',
      sources: [apple({ song: 1440517537, country: 'mx' })],
    },
    {
      id: 'song-believe', cat: 'song-90s', franchise: 'Cher', game: 'Believe',
      title: 'Believe', year: 1998, lang: 'en',
      sources: [apple({ song: 73273491, country: 'mx' })],
    },
    {
      id: 'song-de-musica-ligera', cat: 'song-90s', franchise: 'Soda Stereo', game: 'De música ligera',
      title: 'De música ligera', year: 1990, lang: 'es',
      sources: [apple({ song: 251525826, country: 'mx' })],
    },
    {
      id: 'song-matador', cat: 'song-90s', franchise: 'Los Fabulosos Cadillacs', game: 'Matador',
      title: 'Matador', year: 1993, lang: 'es',
      sources: [apple({ song: 297921308, country: 'mx' })],
    },
    {
      id: 'song-lamento-boliviano', cat: 'song-90s', franchise: 'Enanitos Verdes', game: 'Lamento boliviano',
      title: 'Lamento boliviano', year: 1994, lang: 'es',
      sources: [apple({ song: 721632344, country: 'mx' })],
    },
    {
      id: 'song-la-flaca', cat: 'song-90s', franchise: 'Jarabe de Palo', game: 'La flaca',
      title: 'La flaca', year: 1996, lang: 'es',
      sources: [apple({ song: 726298588, country: 'mx' })],
    },
    {
      id: 'song-macarena', cat: 'song-90s', franchise: 'Los del Río', game: 'Macarena',
      title: 'Macarena', year: 1993, lang: 'es',
      sources: [apple({ song: 401452726, country: 'mx' })],
    },
    {
      id: 'song-amor-prohibido', cat: 'song-90s', franchise: 'Selena', game: 'Amor prohibido',
      title: 'Amor prohibido', year: 1994, lang: 'es',
      sources: [apple({ song: 1443857141, country: 'mx' })],
    },
    {
      id: 'song-estoy-aqui', cat: 'song-90s', franchise: 'Shakira', game: 'Estoy aquí',
      title: 'Estoy aquí', year: 1995, lang: 'es',
      sources: [apple({ song: 193662167, country: 'mx' })],
    },
    {
      id: 'song-maria', cat: 'song-90s', franchise: 'Ricky Martin', game: 'María',
      title: 'María', year: 1995, lang: 'es',
      sources: [apple({ song: 187288293, country: 'mx' })],
    },
    {
      id: 'song-suavemente', cat: 'song-90s', franchise: 'Elvis Crespo', game: 'Suavemente',
      title: 'Suavemente', year: 1998, lang: 'es',
      sources: [apple({ song: 187429633, country: 'mx' })],
    },
    {
      id: 'song-oye-mi-amor', cat: 'song-90s', franchise: 'Maná', game: 'Oye mi amor',
      title: 'Oye mi amor', year: 1992, lang: 'es',
      sources: [apple({ song: 571814073, country: 'mx' })],
    },
    {
      id: 'song-entre-dos-tierras', cat: 'song-90s', franchise: 'Héroes del Silencio', game: 'Entre dos tierras',
      title: 'Entre dos tierras', year: 1990, lang: 'es',
      sources: [apple({ song: 697634977, country: 'mx' })],
    },
    {
      id: 'song-chilanga-banda', cat: 'song-90s', franchise: 'Café Tacvba', game: 'Chilanga banda',
      title: 'Chilanga banda', year: 1996, lang: 'es',
      sources: [apple({ song: 397724888, country: 'mx' })],
    },
    {
      id: 'song-piel-morena', cat: 'song-90s', franchise: 'Thalía', game: 'Piel morena',
      title: 'Piel morena', year: 1995, lang: 'es',
      sources: [apple({ song: 724555920, country: 'mx' })],
    },
    {
      id: 'song-corazon-partio', cat: 'song-90s', franchise: 'Alejandro Sanz', game: 'Corazón partío',
      title: 'Corazón partío', year: 1997, lang: 'es',
      sources: [apple({ song: 150324727, country: 'mx' })],
    },
    {
      id: 'song-corazon-espinado', cat: 'song-90s', franchise: 'Santana y Maná', game: 'Corazón espinado',
      title: 'Corazón espinado', year: 1999, lang: 'es',
      sources: [apple({ song: 422304407, country: 'mx' })],
    },
    {
      id: 'song-hacer-el-amor-con-otro', cat: 'song-90s', franchise: 'Alejandra Guzmán', game: 'Hacer el amor con otro',
      title: 'Hacer el amor con otro', year: 1991, lang: 'es',
      sources: [apple({ song: 1443611526, country: 'mx' })],
    },
    /* ───────────── 2000s (31) ───────────── */
    {
      id: 'song-crazy-in-love', cat: 'song-00s', franchise: 'Beyoncé', game: 'Crazy in Love',
      title: 'Crazy in Love', year: 2003, lang: 'en',
      sources: [apple({ song: 250776858, country: 'mx' })],
    },
    {
      id: 'song-hey-ya', cat: 'song-00s', franchise: 'OutKast', game: 'Hey Ya!',
      title: 'Hey Ya!', year: 2003, lang: 'en',
      sources: [apple({ song: 889958963, country: 'mx' })],
    },
    {
      id: 'song-mr-brightside', cat: 'song-00s', franchise: 'The Killers', game: 'Mr. Brightside',
      title: 'Mr. Brightside', year: 2004, lang: 'en',
      sources: [apple({ song: 1440717826, country: 'mx' })],
    },
    {
      id: 'song-toxic', cat: 'song-00s', franchise: 'Britney Spears', game: 'Toxic',
      title: 'Toxic', year: 2003, lang: 'en',
      sources: [apple({ song: 262218467, country: 'mx' })],
    },
    {
      id: 'song-umbrella', cat: 'song-00s', franchise: 'Rihanna', game: 'Umbrella',
      title: 'Umbrella', year: 2007, lang: 'en',
      sources: [apple({ song: 1441154437, country: 'mx' })],
    },
    {
      id: 'song-hips-don-t-lie', cat: 'song-00s', franchise: 'Shakira', game: 'Hips Don\'t Lie',
      title: 'Hips Don\'t Lie', year: 2006, lang: 'en',
      sources: [apple({ song: 287620241, country: 'mx' })],
    },
    {
      id: 'song-poker-face', cat: 'song-00s', franchise: 'Lady Gaga', game: 'Poker Face',
      title: 'Poker Face', year: 2008, lang: 'en',
      sources: [apple({ song: 1443286882, country: 'mx' })],
    },
    {
      id: 'song-in-the-end', cat: 'song-00s', franchise: 'Linkin Park', game: 'In the End',
      title: 'In the End', year: 2000, lang: 'en',
      sources: [apple({ song: 590431785, country: 'mx' })],
    },
    {
      id: 'song-seven-nation-army', cat: 'song-00s', franchise: 'The White Stripes', game: 'Seven Nation Army',
      title: 'Seven Nation Army', year: 2003, lang: 'en',
      sources: [apple({ song: 1533513537, country: 'mx' })],
    },
    {
      id: 'song-lose-yourself', cat: 'song-00s', franchise: 'Eminem', game: 'Lose Yourself',
      title: 'Lose Yourself', year: 2002, lang: 'en',
      sources: [apple({ song: 1440903439, country: 'mx' })],
    },
    {
      id: 'song-i-gotta-feeling', cat: 'song-00s', franchise: 'Black Eyed Peas', game: 'I Gotta Feeling',
      title: 'I Gotta Feeling', year: 2009, lang: 'en',
      sources: [apple({ song: 1440773907, country: 'mx' })],
    },
    {
      id: 'song-viva-la-vida', cat: 'song-00s', franchise: 'Coldplay', game: 'Viva la Vida',
      title: 'Viva la Vida', year: 2008, lang: 'en',
      sources: [apple({ song: 1122773680, country: 'mx' })],
    },
    {
      id: 'song-boulevard-of-broken-dreams', cat: 'song-00s', franchise: 'Green Day', game: 'Boulevard of Broken Dreams',
      title: 'Boulevard of Broken Dreams', year: 2004, lang: 'en',
      sources: [apple({ song: 1161539476, country: 'mx' })],
    },
    {
      id: 'song-complicated', cat: 'song-00s', franchise: 'Avril Lavigne', game: 'Complicated',
      title: 'Complicated', year: 2002, lang: 'en',
      sources: [apple({ song: 315025823, country: 'mx' })],
    },
    {
      id: 'song-rehab', cat: 'song-00s', franchise: 'Amy Winehouse', game: 'Rehab',
      title: 'Rehab', year: 2006, lang: 'en',
      sources: [apple({ song: 1738071274, country: 'mx' })],
    },
    {
      id: 'song-yeah', cat: 'song-00s', franchise: 'Usher', game: 'Yeah!',
      title: 'Yeah!', year: 2004, lang: 'en',
      sources: [apple({ song: 386153478, country: 'mx' })],
    },
    {
      id: 'song-gasolina', cat: 'song-00s', franchise: 'Daddy Yankee', game: 'Gasolina',
      title: 'Gasolina', year: 2004, lang: 'es',
      sources: [apple({ song: 6781413547, country: 'mx' })],
    },
    {
      id: 'song-la-camisa-negra', cat: 'song-00s', franchise: 'Juanes', game: 'La camisa negra',
      title: 'La camisa negra', year: 2004, lang: 'es',
      sources: [apple({ song: 1492138460, country: 'mx' })],
    },
    {
      id: 'song-rebelde', cat: 'song-00s', franchise: 'RBD', game: 'Rebelde',
      title: 'Rebelde', year: 2004, lang: 'es',
      sources: [apple({ song: 1529353094, country: 'mx' })],
    },
    {
      id: 'song-la-tortura', cat: 'song-00s', franchise: 'Shakira', game: 'La tortura',
      title: 'La tortura', year: 2005, lang: 'es',
      sources: [apple({ song: 1374532360, country: 'mx' })],
    },
    {
      id: 'song-mariposa-traicionera', cat: 'song-00s', franchise: 'Maná', game: 'Mariposa traicionera',
      title: 'Mariposa traicionera', year: 2002, lang: 'es',
      sources: [apple({ song: 258906401, country: 'mx' })],
    },
    {
      id: 'song-eres', cat: 'song-00s', franchise: 'Café Tacvba', game: 'Eres',
      title: 'Eres', year: 2003, lang: 'es',
      sources: [apple({ song: 1444184596, country: 'mx' })],
    },
    {
      id: 'song-obsesion', cat: 'song-00s', franchise: 'Aventura', game: 'Obsesión',
      title: 'Obsesión', year: 2002, lang: 'es',
      sources: [apple({ song: 1793350873, country: 'mx' })],
    },
    {
      id: 'song-rakata', cat: 'song-00s', franchise: 'Wisin & Yandel', game: 'Rakata',
      title: 'Rakata', year: 2005, lang: 'es',
      sources: [apple({ song: 1467933609, country: 'mx' })],
    },
    {
      id: 'song-rosas', cat: 'song-00s', franchise: 'La Oreja de Van Gogh', game: 'Rosas',
      title: 'Rosas', year: 2003, lang: 'es',
      sources: [apple({ song: 280862234, country: 'mx' })],
    },
    {
      id: 'song-labios-rotos', cat: 'song-00s', franchise: 'Zoé', game: 'Labios rotos',
      title: 'Labios rotos', year: 2006, lang: 'es',
      sources: [apple({ song: 713647605, country: 'mx' })],
    },
    {
      id: 'song-amor-del-bueno', cat: 'song-00s', franchise: 'Reyli Barba', game: 'Amor del bueno',
      title: 'Amor del bueno', year: 2004, lang: 'es',
      sources: [apple({ song: 1637480172, country: 'mx' })],
    },
    {
      id: 'song-me-gustas-tu', cat: 'song-00s', franchise: 'Manu Chao', game: 'Me gustas tú',
      title: 'Me gustas tú', year: 2001, lang: 'es',
      sources: [apple({ song: 1699431226, country: 'mx' })],
    },
    {
      id: 'song-todo-cambio', cat: 'song-00s', franchise: 'Camila', game: 'Todo cambió',
      title: 'Todo cambió', year: 2006, lang: 'es',
      sources: [apple({ song: 1637480169, country: 'mx' })],
    },
    {
      id: 'song-te-quiero', cat: 'song-00s', franchise: 'Flex', game: 'Te quiero',
      title: 'Te quiero', year: 2007, lang: 'es',
      sources: [apple({ song: 1605253237, country: 'mx' })],
    },
    {
      id: 'song-sin-miedo-a-nada', cat: 'song-00s', franchise: 'Alex Ubago', game: 'Sin miedo a nada',
      title: 'Sin miedo a nada', year: 2001, lang: 'es',
      sources: [apple({ song: 36223322, country: 'mx' })],
    },
    /* ───────────── 2010s (32) ───────────── */
    {
      id: 'song-rolling-in-the-deep', cat: 'song-10s', franchise: 'Adele', game: 'Rolling in the Deep',
      title: 'Rolling in the Deep', year: 2010, lang: 'en',
      sources: [apple({ song: 1544491233, country: 'mx' })],
    },
    {
      id: 'song-uptown-funk', cat: 'song-10s', franchise: 'Mark Ronson y Bruno Mars', game: 'Uptown Funk',
      title: 'Uptown Funk', year: 2014, lang: 'en',
      sources: [apple({ song: 1061352782, country: 'mx' })],
    },
    {
      id: 'song-shape-of-you', cat: 'song-10s', franchise: 'Ed Sheeran', game: 'Shape of You',
      title: 'Shape of You', year: 2017, lang: 'en',
      sources: [apple({ song: 1193701392, country: 'mx' })],
    },
    {
      id: 'song-happy', cat: 'song-10s', franchise: 'Pharrell Williams', game: 'Happy',
      title: 'Happy', year: 2013, lang: 'en',
      sources: [apple({ song: 863835363, country: 'mx' })],
    },
    {
      id: 'song-get-lucky', cat: 'song-10s', franchise: 'Daft Punk', game: 'Get Lucky',
      title: 'Get Lucky', year: 2013, lang: 'en',
      sources: [apple({ song: 617154366, country: 'mx' })],
    },
    {
      id: 'song-shake-it-off', cat: 'song-10s', franchise: 'Taylor Swift', game: 'Shake It Off',
      title: 'Shake It Off', year: 2014, lang: 'en',
      sources: [apple({ song: 1445888394, country: 'mx' })],
    },
    {
      id: 'song-bad-guy', cat: 'song-10s', franchise: 'Billie Eilish', game: 'bad guy',
      title: 'bad guy', year: 2019, lang: 'en',
      sources: [apple({ song: 1450695739, country: 'mx' })],
    },
    {
      id: 'song-old-town-road', cat: 'song-10s', franchise: 'Lil Nas X', game: 'Old Town Road',
      title: 'Old Town Road', year: 2019, lang: 'en',
      sources: [apple({ song: 1456313177, country: 'mx' })],
    },
    {
      id: 'song-radioactive', cat: 'song-10s', franchise: 'Imagine Dragons', game: 'Radioactive',
      title: 'Radioactive', year: 2012, lang: 'en',
      sources: [apple({ song: 904500508, country: 'mx' })],
    },
    {
      id: 'song-royals', cat: 'song-10s', franchise: 'Lorde', game: 'Royals',
      title: 'Royals', year: 2013, lang: 'en',
      sources: [apple({ song: 1594982922, country: 'mx' })],
    },
    {
      id: 'song-somebody-that-i-used-to-know', cat: 'song-10s', franchise: 'Gotye', game: 'Somebody That I Used to Know',
      title: 'Somebody That I Used to Know', year: 2011, lang: 'en',
      sources: [apple({ song: 1440754487, country: 'mx' })],
    },
    {
      id: 'song-call-me-maybe', cat: 'song-10s', franchise: 'Carly Rae Jepsen', game: 'Call Me Maybe',
      title: 'Call Me Maybe', year: 2011, lang: 'en',
      sources: [apple({ song: 1442997912, country: 'mx' })],
    },
    {
      id: 'song-shallow', cat: 'song-10s', franchise: 'Lady Gaga y Bradley Cooper', game: 'Shallow',
      title: 'Shallow', year: 2018, lang: 'en',
      sources: [apple({ song: 1434371887, country: 'mx' })],
    },
    {
      id: 'song-blinding-lights', cat: 'song-10s', franchise: 'The Weeknd', game: 'Blinding Lights',
      title: 'Blinding Lights', year: 2019, lang: 'en',
      sources: [apple({ song: 1499386265, country: 'mx' })],
    },
    {
      id: 'song-wake-me-up', cat: 'song-10s', franchise: 'Avicii', game: 'Wake Me Up',
      title: 'Wake Me Up', year: 2013, lang: 'en',
      sources: [apple({ song: 1440872929, country: 'mx' })],
    },
    {
      id: 'song-havana', cat: 'song-10s', franchise: 'Camila Cabello', game: 'Havana',
      title: 'Havana', year: 2017, lang: 'en',
      sources: [apple({ song: 1321217032, country: 'mx' })],
    },
    {
      id: 'song-despacito', cat: 'song-10s', franchise: 'Luis Fonsi y Daddy Yankee', game: 'Despacito',
      title: 'Despacito', year: 2017, lang: 'es',
      sources: [apple({ song: 1447401620, country: 'mx' })],
    },
    {
      id: 'song-danza-kuduro', cat: 'song-10s', franchise: 'Don Omar', game: 'Danza Kuduro',
      title: 'Danza Kuduro', year: 2010, lang: 'es',
      sources: [apple({ song: 1440781761, country: 'mx' })],
    },
    {
      id: 'song-bailando', cat: 'song-10s', franchise: 'Enrique Iglesias', game: 'Bailando',
      title: 'Bailando', year: 2014, lang: 'es',
      sources: [apple({ song: 1440820189, country: 'mx' })],
    },
    {
      id: 'song-vivir-mi-vida', cat: 'song-10s', franchise: 'Marc Anthony', game: 'Vivir mi vida',
      title: 'Vivir mi vida', year: 2013, lang: 'es',
      sources: [apple({ song: 668743167, country: 'mx' })],
    },
    {
      id: 'song-la-bicicleta', cat: 'song-10s', franchise: 'Carlos Vives y Shakira', game: 'La bicicleta',
      title: 'La bicicleta', year: 2016, lang: 'es',
      sources: [apple({ song: 1299332776, country: 'mx' })],
    },
    {
      id: 'song-chantaje', cat: 'song-10s', franchise: 'Shakira y Maluma', game: 'Chantaje',
      title: 'Chantaje', year: 2016, lang: 'es',
      sources: [apple({ song: 1234665569, country: 'mx' })],
    },
    {
      id: 'song-mi-gente', cat: 'song-10s', franchise: 'J Balvin', game: 'Mi gente',
      title: 'Mi gente', year: 2017, lang: 'es',
      sources: [apple({ song: 1444327839, country: 'mx' })],
    },
    {
      id: 'song-hasta-el-amanecer', cat: 'song-10s', franchise: 'Nicky Jam', game: 'Hasta el amanecer',
      title: 'Hasta el amanecer', year: 2016, lang: 'es',
      sources: [apple({ song: 1189391898, country: 'mx' })],
    },
    {
      id: 'song-propuesta-indecente', cat: 'song-10s', franchise: 'Romeo Santos', game: 'Propuesta indecente',
      title: 'Propuesta indecente', year: 2013, lang: 'es',
      sources: [apple({ song: 804145428, country: 'mx' })],
    },
    {
      id: 'song-me-rehuso', cat: 'song-10s', franchise: 'Danny Ocean', game: 'Me rehúso',
      title: 'Me rehúso', year: 2016, lang: 'es',
      sources: [apple({ song: 1248528301, country: 'mx' })],
    },
    {
      id: 'song-felices-los-4', cat: 'song-10s', franchise: 'Maluma', game: 'Felices los 4',
      title: 'Felices los 4', year: 2017, lang: 'es',
      sources: [apple({ song: 1377817652, country: 'mx' })],
    },
    {
      id: 'song-nunca-es-suficiente', cat: 'song-10s', franchise: 'Los Ángeles Azules y Natalia Lafourcade', game: 'Nunca es suficiente',
      title: 'Nunca es suficiente', year: 2018, lang: 'es',
      sources: [apple({ song: 1370211920, country: 'mx' })],
    },
    {
      id: 'song-hasta-la-raiz', cat: 'song-10s', franchise: 'Natalia Lafourcade', game: 'Hasta la raíz',
      title: 'Hasta la raíz', year: 2015, lang: 'es',
      sources: [apple({ song: 1055384375, country: 'mx' })],
    },
    {
      id: 'song-china', cat: 'song-10s', franchise: 'Anuel AA y Karol G', game: 'China',
      title: 'China', year: 2019, lang: 'es',
      sources: [apple({ song: 1473307010, country: 'mx' })],
    },
    {
      id: 'song-con-calma', cat: 'song-10s', franchise: 'Daddy Yankee', game: 'Con calma',
      title: 'Con calma', year: 2019, lang: 'es',
      sources: [apple({ song: 1449106558, country: 'mx' })],
    },
    {
      id: 'song-mientes', cat: 'song-10s', franchise: 'Camila', game: 'Mientes',
      title: 'Mientes', year: 2010, lang: 'es',
      sources: [apple({ song: 351106320, country: 'mx' })],
    },
    /* ───────────── 2020 en adelante (30) ───────────── */
    {
      id: 'song-levitating', cat: 'song-20s', franchise: 'Dua Lipa', game: 'Levitating',
      title: 'Levitating', year: 2020, lang: 'en',
      sources: [apple({ song: 1552269073, country: 'mx' })],
    },
    {
      id: 'song-drivers-license', cat: 'song-20s', franchise: 'Olivia Rodrigo', game: 'drivers license',
      title: 'drivers license', year: 2021, lang: 'en',
      sources: [apple({ song: 1560735480, country: 'mx' })],
    },
    {
      id: 'song-as-it-was', cat: 'song-20s', franchise: 'Harry Styles', game: 'As It Was',
      title: 'As It Was', year: 2022, lang: 'en',
      sources: [apple({ song: 1615585008, country: 'mx' })],
    },
    {
      id: 'song-flowers', cat: 'song-20s', franchise: 'Miley Cyrus', game: 'Flowers',
      title: 'Flowers', year: 2023, lang: 'en',
      sources: [apple({ song: 1702906535, country: 'mx' })],
    },
    {
      id: 'song-anti-hero', cat: 'song-20s', franchise: 'Taylor Swift', game: 'Anti-Hero',
      title: 'Anti-Hero', year: 2022, lang: 'en',
      sources: [apple({ song: 1689131533, country: 'mx' })],
    },
    {
      id: 'song-stay', cat: 'song-20s', franchise: 'The Kid LAROI y Justin Bieber', game: 'STAY',
      title: 'STAY', year: 2021, lang: 'en',
      sources: [apple({ song: 1574968888, country: 'mx' })],
    },
    {
      id: 'song-heat-waves', cat: 'song-20s', franchise: 'Glass Animals', game: 'Heat Waves',
      title: 'Heat Waves', year: 2020, lang: 'en',
      sources: [apple({ song: 1681997803, country: 'mx' })],
    },
    {
      id: 'song-espresso', cat: 'song-20s', franchise: 'Sabrina Carpenter', game: 'Espresso',
      title: 'Espresso', year: 2024, lang: 'en',
      sources: [apple({ song: 1752214923, country: 'mx' })],
    },
    {
      id: 'song-die-with-a-smile', cat: 'song-20s', franchise: 'Lady Gaga y Bruno Mars', game: 'Die With A Smile',
      title: 'Die With A Smile', year: 2024, lang: 'en',
      sources: [apple({ song: 1792667027, country: 'mx' })],
    },
    {
      id: 'song-apt', cat: 'song-20s', franchise: 'ROSÉ y Bruno Mars', game: 'APT.',
      title: 'APT.', year: 2024, lang: 'en',
      sources: [apple({ song: 1771105935, country: 'mx' })],
    },
    {
      id: 'song-birds-of-a-feather', cat: 'song-20s', franchise: 'Billie Eilish', game: 'BIRDS OF A FEATHER',
      title: 'BIRDS OF A FEATHER', year: 2024, lang: 'en',
      sources: [apple({ song: 1739659142, country: 'mx' })],
    },
    {
      id: 'song-kill-bill', cat: 'song-20s', franchise: 'SZA', game: 'Kill Bill',
      title: 'Kill Bill', year: 2022, lang: 'en',
      sources: [apple({ song: 1658650488, country: 'mx' })],
    },
    {
      id: 'song-dynamite', cat: 'song-20s', franchise: 'BTS', game: 'Dynamite',
      title: 'Dynamite', year: 2020, lang: 'en',
      sources: [apple({ song: 1596532400, country: 'mx' })],
    },
    {
      id: 'song-beautiful-things', cat: 'song-20s', franchise: 'Benson Boone', game: 'Beautiful Things',
      title: 'Beautiful Things', year: 2024, lang: 'en',
      sources: [apple({ song: 1724488124, country: 'mx' })],
    },
    {
      id: 'song-unholy', cat: 'song-20s', franchise: 'Sam Smith y Kim Petras', game: 'Unholy',
      title: 'Unholy', year: 2022, lang: 'en',
      sources: [apple({ song: 1649325659, country: 'mx' })],
    },
    {
      id: 'song-save-your-tears', cat: 'song-20s', franchise: 'The Weeknd', game: 'Save Your Tears',
      title: 'Save Your Tears', year: 2020, lang: 'en',
      sources: [apple({ song: 1505683980, country: 'mx' })],
    },
    {
      id: 'song-dakiti', cat: 'song-20s', franchise: 'Bad Bunny y Jhay Cortez', game: 'Dákiti',
      title: 'Dákiti', year: 2020, lang: 'es',
      sources: [apple({ song: 1542103620, country: 'mx' })],
    },
    {
      id: 'song-titi-me-pregunto', cat: 'song-20s', franchise: 'Bad Bunny', game: 'Tití me preguntó',
      title: 'Tití me preguntó', year: 2022, lang: 'es',
      sources: [apple({ song: 1622045635, country: 'mx' })],
    },
    {
      id: 'song-ella-baila-sola', cat: 'song-20s', franchise: 'Eslabon Armado y Peso Pluma', game: 'Ella baila sola',
      title: 'Ella baila sola', year: 2023, lang: 'es',
      sources: [apple({ song: 1684857373, country: 'mx' })],
    },
    {
      id: 'song-tqg', cat: 'song-20s', franchise: 'Karol G y Shakira', game: 'TQG',
      title: 'TQG', year: 2023, lang: 'es',
      sources: [apple({ song: 1670245868, country: 'mx' })],
    },
    {
      id: 'song-shakira-bzrp-music-sessions-vol-53', cat: 'song-20s', franchise: 'Bizarrap y Shakira', game: 'Shakira: Bzrp Music Sessions, Vol. 53',
      title: 'Shakira: Bzrp Music Sessions, Vol. 53', year: 2023, lang: 'es',
      sources: [apple({ song: 1731060236, country: 'mx' })],
    },
    {
      id: 'song-provenza', cat: 'song-20s', franchise: 'Karol G', game: 'Provenza',
      title: 'Provenza', year: 2022, lang: 'es',
      sources: [apple({ song: 1670245875, country: 'mx' })],
    },
    {
      id: 'song-quevedo-bzrp-music-sessions-vol-52', cat: 'song-20s', franchise: 'Bizarrap y Quevedo', game: 'Quevedo: Bzrp Music Sessions, Vol. 52',
      title: 'Quevedo: Bzrp Music Sessions, Vol. 52', year: 2022, lang: 'es',
      sources: [apple({ song: 1632746802, country: 'mx' })],
    },
    {
      id: 'song-un-x100to', cat: 'song-20s', franchise: 'Grupo Frontera y Bad Bunny', game: 'Un x100to',
      title: 'Un x100to', year: 2023, lang: 'es',
      sources: [apple({ song: 1682500319, country: 'mx' })],
    },
    {
      id: 'song-hawai', cat: 'song-20s', franchise: 'Maluma', game: 'Hawái',
      title: 'Hawái', year: 2020, lang: 'es',
      sources: [apple({ song: 1528029632, country: 'mx' })],
    },
    {
      id: 'song-monotonia', cat: 'song-20s', franchise: 'Shakira y Ozuna', game: 'Monotonía',
      title: 'Monotonía', year: 2022, lang: 'es',
      sources: [apple({ song: 1731060234, country: 'mx' })],
    },
    {
      id: 'song-la-diabla', cat: 'song-20s', franchise: 'Xavi', game: 'La diabla',
      title: 'La diabla', year: 2024, lang: 'es',
      sources: [apple({ song: 1769098206, country: 'mx' })],
    },
    {
      id: 'song-la-noche-de-anoche', cat: 'song-20s', franchise: 'Bad Bunny y Rosalía', game: 'La noche de anoche',
      title: 'La noche de anoche', year: 2020, lang: 'es',
      sources: [apple({ song: 1542103215, country: 'mx' })],
    },
    {
      id: 'song-si-antes-te-hubiera-conocido', cat: 'song-20s', franchise: 'Karol G', game: 'Si antes te hubiera conocido',
      title: 'Si antes te hubiera conocido', year: 2024, lang: 'es',
      sources: [apple({ song: 1752031539, country: 'mx' })],
    },
    {
      id: 'song-el-azul', cat: 'song-20s', franchise: 'Junior H y Peso Pluma', game: 'El Azul',
      title: 'El Azul', year: 2023, lang: 'es',
      sources: [apple({ song: 1670252659, country: 'mx' })],
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
    { theme: 'canciones', franchise: 'The Beatles', game: 'Let It Be', lang: 'en' },
    { theme: 'canciones', franchise: 'The Beatles', game: 'Yesterday', lang: 'en' },
    { theme: 'canciones', franchise: 'Taylor Swift', game: 'Love Story', lang: 'en' },
    { theme: 'canciones', franchise: 'Taylor Swift', game: 'Blank Space', lang: 'en' },
    { theme: 'canciones', franchise: 'Lady Gaga', game: 'Bad Romance', lang: 'en' },
    { theme: 'canciones', franchise: 'Lady Gaga', game: 'Just Dance', lang: 'en' },
    { theme: 'canciones', franchise: 'Britney Spears', game: 'Oops!... I Did It Again', lang: 'en' },
    { theme: 'canciones', franchise: 'Billie Eilish', game: 'Ocean Eyes', lang: 'en' },
    { theme: 'canciones', franchise: 'Billie Eilish', game: 'Happier Than Ever', lang: 'en' },
    { theme: 'canciones', franchise: 'The Weeknd', game: 'Starboy', lang: 'en' },
    { theme: 'canciones', franchise: 'Adele', game: 'Someone Like You', lang: 'en' },
    { theme: 'canciones', franchise: 'Adele', game: 'Hello', lang: 'en' },
    { theme: 'canciones', franchise: 'Ed Sheeran', game: 'Perfect', lang: 'en' },
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
    { theme: 'canciones', franchise: 'Eminem', game: 'Without Me', lang: 'en' },
    { theme: 'canciones', franchise: 'Linkin Park', game: 'Numb', lang: 'en' },
    { theme: 'canciones', franchise: 'Nirvana', game: 'Come as You Are', lang: 'en' },
    { theme: 'canciones', franchise: 'Oasis', game: 'Don\'t Look Back in Anger', lang: 'en' },
    { theme: 'canciones', franchise: 'Backstreet Boys', game: 'Everybody (Backstreet\'s Back)', lang: 'en' },
    { theme: 'canciones', franchise: 'Spice Girls', game: 'Say You\'ll Be There', lang: 'en' },
    { theme: 'canciones', franchise: 'Elvis Presley', game: 'Jailhouse Rock', lang: 'en' },
    { theme: 'canciones', franchise: 'Bee Gees', game: 'How Deep Is Your Love', lang: 'en' },
    { theme: 'canciones', franchise: 'Whitney Houston', game: 'Greatest Love of All', lang: 'en' },
    { theme: 'canciones', franchise: 'Bruno Mars', game: 'Just the Way You Are', lang: 'en' },
    { theme: 'canciones', franchise: 'Bruno Mars', game: '24K Magic', lang: 'en' },
    { theme: 'canciones', franchise: 'Sabrina Carpenter', game: 'Please Please Please', lang: 'en' },
    { theme: 'canciones', franchise: 'Celine Dion', game: 'It\'s All Coming Back to Me Now', lang: 'en' },
    { theme: 'canciones', franchise: 'Shakira', game: 'Ojos así', lang: 'es' },
    { theme: 'canciones', franchise: 'Shakira', game: 'Ciega, sordomuda', lang: 'es' },
    { theme: 'canciones', franchise: 'Shakira', game: 'Antología', lang: 'es' },
    { theme: 'canciones', franchise: 'Juan Gabriel', game: 'Hasta que te conocí', lang: 'es' },
    { theme: 'canciones', franchise: 'Juan Gabriel', game: 'Así fue', lang: 'es' },
    { theme: 'canciones', franchise: 'José José', game: 'Almohada', lang: 'es' },
    { theme: 'canciones', franchise: 'José José', game: 'Lo que no fue no será', lang: 'es' },
    { theme: 'canciones', franchise: 'Luis Miguel', game: 'Ahora te puedes marchar', lang: 'es' },
    { theme: 'canciones', franchise: 'Luis Miguel', game: 'Suave', lang: 'es' },
    { theme: 'canciones', franchise: 'Maná', game: 'Rayando el sol', lang: 'es' },
    { theme: 'canciones', franchise: 'Maná', game: 'Clavado en un bar', lang: 'es' },
    { theme: 'canciones', franchise: 'Maná', game: 'En el muelle de San Blas', lang: 'es' },
    { theme: 'canciones', franchise: 'Soda Stereo', game: 'En la ciudad de la furia', lang: 'es' },
    { theme: 'canciones', franchise: 'Selena', game: 'Como la flor', lang: 'es' },
    { theme: 'canciones', franchise: 'Selena', game: 'Bidi Bidi Bom Bom', lang: 'es' },
    { theme: 'canciones', franchise: 'Bad Bunny', game: 'Me porto bonito', lang: 'es' },
    { theme: 'canciones', franchise: 'Bad Bunny', game: 'Ojitos lindos', lang: 'es' },
    { theme: 'canciones', franchise: 'Bad Bunny', game: 'Callaíta', lang: 'es' },
    { theme: 'canciones', franchise: 'Karol G', game: 'Bichota', lang: 'es' },
    { theme: 'canciones', franchise: 'Karol G', game: 'Si antes te hubiera conocido', lang: 'es' },
    { theme: 'canciones', franchise: 'Daddy Yankee', game: 'Dura', lang: 'es' },
    { theme: 'canciones', franchise: 'Daddy Yankee', game: 'Lo que pasó, pasó', lang: 'es' },
    { theme: 'canciones', franchise: 'Juanes', game: 'A Dios le pido', lang: 'es' },
    { theme: 'canciones', franchise: 'Café Tacvba', game: 'Las flores', lang: 'es' },
    { theme: 'canciones', franchise: 'Ricky Martin', game: 'Vuelve', lang: 'es' },
    { theme: 'canciones', franchise: 'Ricky Martin', game: 'La copa de la vida', lang: 'es' },
    { theme: 'canciones', franchise: 'Mecano', game: 'Me colé en una fiesta', lang: 'es' },
    { theme: 'canciones', franchise: 'Thalía', game: 'Amor a la mexicana', lang: 'es' },
    { theme: 'canciones', franchise: 'RBD', game: 'Sálvame', lang: 'es' },
    { theme: 'canciones', franchise: 'Camila', game: 'Coleccionista de canciones', lang: 'es' },
    { theme: 'canciones', franchise: 'Alejandro Sanz', game: 'Amiga mía', lang: 'es' },
    { theme: 'canciones', franchise: 'Enrique Iglesias', game: 'Héroe', lang: 'es' },
    { theme: 'canciones', franchise: 'Marc Anthony', game: 'Tu amor me hace bien', lang: 'es' },
    { theme: 'canciones', franchise: 'J Balvin', game: 'Ginza', lang: 'es' },
    { theme: 'canciones', franchise: 'Nicky Jam', game: 'El perdón', lang: 'es' },
    { theme: 'canciones', franchise: 'Romeo Santos', game: 'Eres mía', lang: 'es' },
    { theme: 'canciones', franchise: 'Natalia Lafourcade', game: 'En el 2000', lang: 'es' },
    { theme: 'canciones', franchise: 'Rosalía', game: 'Malamente', lang: 'es' },
    { theme: 'canciones', franchise: 'Peso Pluma', game: 'Rosa pastel', lang: 'es' },
    { theme: 'canciones', franchise: 'Maluma', game: 'Corazón', lang: 'es' },
    { theme: 'canciones', franchise: 'Rocío Dúrcal', game: 'La gata bajo la lluvia', lang: 'es' },
    { theme: 'canciones', franchise: 'Vicente Fernández', game: 'Volver, volver', lang: 'es' },
    { theme: 'canciones', franchise: 'Julio Iglesias', game: 'Me olvidé de vivir', lang: 'es' },
    { theme: 'canciones', franchise: 'Camilo Sesto', game: 'Perdóname', lang: 'es' },
  );
})(window.AM = window.AM || {});
