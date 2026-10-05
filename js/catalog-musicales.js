/*
 * Catálogo: Musicales (122 pistas: 102 en su grabación original y 20 en español).
 * Teatro y películas musicales por época (año del estreno del musical; `year` es el de la grabación
 * que suena y `platform` la versión: Broadway, Londres, Película, México, Madrid…). Nada de Disney,
 * que ya tiene su propio tema.
 * `franchise` es el musical (respuesta del modo Clásico) y `game` la canción (Experto y Supervivencia).
 * Cada musical va SIEMPRE con su nombre original, aunque la pista sea de una versión en español
 * ("The Phantom of the Opera", nunca "El fantasma de la ópera"). Los nombres en español solo sirven
 * para el buscador de Experto (AM.FRANCHISE_AKA).
 * `lang` (es / en) es para el selector de idioma. Las canciones de una versión en español llevan el
 * título con el que se grabaron ("Rayo rebelde") y en `aka` el original, para que el buscador acepte
 * cualquiera de los dos.
 * Mismo formato que catalog.js; las fuentes se prueban en el orden en que aparecen.
 */
(function (AM) {
  'use strict';

  const apple = (o) => Object.assign({ type: 'itunes' }, o);
  // Primero la tienda de México y, si ahí no está, la de Estados Unidos.
  const am = (song) => [apple({ song: song, country: 'mx' }), apple({ song: song })];
  const amAlbum = (album, match) => [apple({ album: album, match: match, country: 'mx' }), apple({ album: album, match: match })];

  // Otros nombres de cada musical (cómo se conoce en español): el buscador de Experto los acepta
  // para listar sus canciones ("vaselina" muestra las de Grease). Nunca se muestran como respuesta.
  AM.FRANCHISE_AKA = Object.assign(AM.FRANCHISE_AKA || {}, {
    'The Wizard of Oz': ['El mago de Oz'],
    'Singin\' in the Rain': ['Cantando bajo la lluvia', 'Singing in the Rain'],
    'West Side Story': ['Amor sin barreras'],
    'The Sound of Music': ['La novicia rebelde', 'Sonrisas y lágrimas'],
    'My Fair Lady': ['Mi bella dama'],
    'Fiddler on the Roof': ['El violinista en el tejado'],
    'Man of La Mancha': ['El hombre de La Mancha'],
    'Oklahoma!': ['Oklahoma'],
    'The King and I': ['El rey y yo'],
    'Joseph and the Amazing Technicolor Dreamcoat': ['José el soñador', 'Joseph'],
    'Jesus Christ Superstar': ['Jesucristo Superstar'],
    'Grease': ['Vaselina'],
    'The Rocky Horror Picture Show': ['Rocky Horror'],
    'The Wiz': ['El mago'],
    'Sweeney Todd': ['Sweeney Todd: El barbero demoníaco de la calle Fleet'],
    'Into the Woods': ['En el bosque'],
    'Les Misérables': ['Los miserables', 'Les Mis'],
    'The Phantom of the Opera': ['El fantasma de la ópera'],
    'Little Shop of Horrors': ['La tiendita del horror', 'La tienda de los horrores'],
    'Moulin Rouge!': ['Moulin Rouge: Amor en rojo'],
    'In the Heights': ['En el barrio'],
    'Mentiras': ['Mentiras: El musical'],
    'Legally Blonde': ['Legalmente rubia'],
    'tick, tick... BOOM!': ['Tick tick boom'],
    'The Greatest Showman': ['El gran showman'],
    'Dear Evan Hansen': ['Querido Evan Hansen'],
    'Matilda the Musical': ['Matilda', 'Matilda: El musical'],
    'Mean Girls': ['Chicas pesadas'],
    'KPop Demon Hunters': ['Las guerreras K-pop', 'K-Pop Demon Hunters'],
  });

  AM.CATEGORIES.push(
    { id: 'mus-clasicos', theme: 'musicales', label: 'Clásicos (antes de 1970)', icon: '🎩' },
    { id: 'mus-7080', theme: 'musicales', label: '70s y 80s', icon: '🪩' },
    { id: 'mus-9000', theme: 'musicales', label: '90s y 2000s', icon: '💿' },
    { id: 'mus-10s', theme: 'musicales', label: '2010 en adelante', icon: '✨' },
  );

  AM.CATALOG.push(
    /* ───────────── Clásicos (antes de 1970) (31) ───────────── */
    {
      id: 'mus-oz-over-the-rainbow', cat: 'mus-clasicos', franchise: 'The Wizard of Oz', game: 'Over the Rainbow',
      title: 'Over the Rainbow', composer: 'Judy Garland', year: 1939, platform: 'Película', lang: 'en',
      sources: [...am(1454449433), ...am(1625596075)],
    },
    {
      id: 'mus-oz-were-off-to-see-the-wizard', cat: 'mus-clasicos', franchise: 'The Wizard of Oz', game: 'We\'re Off to See the Wizard',
      title: 'We\'re Off to See the Wizard', composer: 'Judy Garland, Ray Bolger, Buddy Ebsen y Bert Lahr', year: 1939, platform: 'Película', lang: 'en',
      sources: [...am(1454449643), ...am(1625596076)],
    },
    {
      id: 'mus-singin-in-the-rain', cat: 'mus-clasicos', franchise: 'Singin\' in the Rain', game: 'Singin\' in the Rain',
      title: 'Singin\' in the Rain', composer: 'Gene Kelly', year: 1952, platform: 'Película', lang: 'en',
      aka: ['Singing in the Rain'],
      sources: [...am(548006460), ...am(335783297)],
    },
    {
      id: 'mus-wss-america', cat: 'mus-clasicos', franchise: 'West Side Story', game: 'America',
      title: 'America', composer: 'Rita Moreno, George Chakiris y elenco', year: 1961, platform: 'Película', lang: 'en',
      sources: [...am(394304025), ...am(1082284273)],
    },
    {
      id: 'mus-wss-maria', cat: 'mus-clasicos', franchise: 'West Side Story', game: 'Maria',
      title: 'Maria', composer: 'Jim Bryant', year: 1961, platform: 'Película', lang: 'en',
      sources: [...am(535188250), ...am(353754269)],
    },
    {
      id: 'mus-sound-of-music-do-re-mi', cat: 'mus-clasicos', franchise: 'The Sound of Music', game: 'Do-Re-Mi',
      title: 'Do-Re-Mi', composer: 'Julie Andrews y los niños von Trapp', year: 1965, platform: 'Película', lang: 'en',
      sources: am(1550188252),
    },
    {
      id: 'mus-sound-of-music-my-favorite-things', cat: 'mus-clasicos', franchise: 'The Sound of Music', game: 'My Favorite Things',
      title: 'My Favorite Things', composer: 'Julie Andrews', year: 1965, platform: 'Película', lang: 'en',
      sources: [...am(1550188248), ...am(1550173110)],
    },
    {
      id: 'mus-sound-of-music-edelweiss', cat: 'mus-clasicos', franchise: 'The Sound of Music', game: 'Edelweiss',
      title: 'Edelweiss', composer: 'Bill Lee y Charmian Carr', year: 1965, platform: 'Película', lang: 'en',
      sources: am(1550173281),
    },
    {
      id: 'mus-my-fair-lady-i-could-have-danced', cat: 'mus-clasicos', franchise: 'My Fair Lady', game: 'I Could Have Danced All Night',
      title: 'I Could Have Danced All Night', composer: 'Marni Nixon', year: 1964, platform: 'Película', lang: 'en',
      sources: amAlbum(158520818, 'I Could Have Danced All Night'),
    },
    {
      id: 'mus-fiddler-if-i-were-a-rich-man', cat: 'mus-clasicos', franchise: 'Fiddler on the Roof', game: 'If I Were a Rich Man',
      title: 'If I Were a Rich Man', composer: 'Chaim Topol', year: 1971, platform: 'Película', lang: 'en',
      aka: ['Si yo fuera rico'],
      sources: am(715937409),
    },
    {
      id: 'mus-fiddler-tradition', cat: 'mus-clasicos', franchise: 'Fiddler on the Roof', game: 'Tradition',
      title: 'Prologue & Main Title (Tradition)', composer: 'Chaim Topol y elenco', year: 1971, platform: 'Película', lang: 'en',
      aka: ['Tradición'],
      sources: am(715937398),
    },
    {
      id: 'mus-cabaret-cabaret', cat: 'mus-clasicos', franchise: 'Cabaret', game: 'Cabaret',
      title: 'Cabaret', composer: 'Liza Minnelli', year: 1972, platform: 'Película', lang: 'en',
      sources: am(1475841307),
    },
    {
      id: 'mus-cabaret-money-money', cat: 'mus-clasicos', franchise: 'Cabaret', game: 'Money, Money',
      title: 'Money, Money', composer: 'Liza Minnelli y Joel Grey', year: 1972, platform: 'Película', lang: 'en',
      sources: am(1475841296),
    },
    {
      id: 'mus-hello-dolly', cat: 'mus-clasicos', franchise: 'Hello, Dolly!', game: 'Hello, Dolly!',
      title: 'Hello, Dolly!', composer: 'Barbra Streisand y Louis Armstrong', year: 1969, platform: 'Película', lang: 'en',
      sources: am(1440649195),
    },
    {
      id: 'mus-funny-girl-dont-rain-on-my-parade', cat: 'mus-clasicos', franchise: 'Funny Girl', game: 'Don\'t Rain on My Parade',
      title: 'Don\'t Rain on My Parade', composer: 'Barbra Streisand', year: 1968, platform: 'Película', lang: 'en',
      sources: am(190623341),
    },
    {
      id: 'mus-hair-aquarius', cat: 'mus-clasicos', franchise: 'Hair', game: 'Aquarius',
      title: 'Aquarius', composer: 'Ronnie Dyson y elenco original', year: 1968, platform: 'Broadway', lang: 'en',
      sources: [...amAlbum(272103598, 'Aquarius'), ...am(1308679909)],
    },
    {
      id: 'mus-la-mancha-the-impossible-dream', cat: 'mus-clasicos', franchise: 'Man of La Mancha', game: 'The Impossible Dream',
      title: 'The Impossible Dream (The Quest)', composer: 'Richard Kiley', year: 1965, platform: 'Broadway', lang: 'en',
      aka: ['The Impossible Dream (The Quest)', 'El sueño imposible'],
      sources: am(1440846587),
    },
    {
      id: 'mus-oliver-consider-yourself', cat: 'mus-clasicos', franchise: 'Oliver!', game: 'Consider Yourself',
      title: 'Consider Yourself', composer: 'Elenco original de Broadway', year: 1963, platform: 'Broadway', lang: 'en',
      sources: am(602831157),
    },
    {
      id: 'mus-sonrisas-adios-adios', cat: 'mus-clasicos', franchise: 'The Sound of Music', game: 'Adiós, adiós',
      title: 'Adiós, adiós', composer: 'Los Niños de Sonrisas y Lágrimas', year: 1965, platform: 'Versión en español', lang: 'es',
      aka: ['So Long, Farewell'],
      sources: am(1715961799),
    },

    {
      id: 'mus-singin-good-morning', cat: 'mus-clasicos', franchise: 'Singin\' in the Rain', game: 'Good Morning',
      title: 'Good Morning', composer: 'Gene Kelly, Debbie Reynolds y Donald O\'Connor', year: 1952, platform: 'Película', lang: 'en',
      sources: am(548006461),
    },
    {
      id: 'mus-singin-make-em-laugh', cat: 'mus-clasicos', franchise: 'Singin\' in the Rain', game: 'Make \'Em Laugh',
      title: 'Make \'Em Laugh', composer: 'Donald O\'Connor', year: 1952, platform: 'Película', lang: 'en',
      sources: [...am(1455885757), ...am(335783384)],
    },
    {
      id: 'mus-wss-tonight', cat: 'mus-clasicos', franchise: 'West Side Story', game: 'Tonight',
      title: 'Tonight', composer: 'Jim Bryant y Marni Nixon', year: 1961, platform: 'Película', lang: 'en',
      sources: am(535188286),
    },
    {
      id: 'mus-sound-of-music-the-sound-of-music', cat: 'mus-clasicos', franchise: 'The Sound of Music', game: 'The Sound of Music',
      title: 'Prelude / The Sound of Music', composer: 'Julie Andrews', year: 1965, platform: 'Película', lang: 'en',
      sources: [...am(1550173104), ...am(1715961561)],
    },
    {
      id: 'mus-oklahoma-beautiful-mornin', cat: 'mus-clasicos', franchise: 'Oklahoma!', game: 'Oh, What a Beautiful Mornin\'',
      title: 'Oh, What a Beautiful Mornin\'', composer: 'Gordon MacRae', year: 1955, platform: 'Película', lang: 'en',
      aka: ['Oh, What a Beautiful Morning'],
      sources: am(1440787711),
    },
    {
      id: 'mus-king-and-i-shall-we-dance', cat: 'mus-clasicos', franchise: 'The King and I', game: 'Shall We Dance?',
      title: 'Shall We Dance?', composer: 'Yul Brynner, Deborah Kerr y Marni Nixon', year: 1956, platform: 'Película', lang: 'en',
      sources: [...am(716373159), ...am(1565016098)],
    },
    {
      id: 'mus-joseph-any-dream-will-do', cat: 'mus-clasicos', franchise: 'Joseph and the Amazing Technicolor Dreamcoat', game: 'Any Dream Will Do',
      title: 'Any Dream Will Do', composer: 'Jason Donovan', year: 1991, platform: 'Londres', lang: 'en',
      sources: [...am(1440739367), ...am(1843483705)],
    },
    {
      id: 'mus-fiddler-sunrise-sunset', cat: 'mus-clasicos', franchise: 'Fiddler on the Roof', game: 'Sunrise, Sunset',
      title: 'Sunrise, Sunset', composer: 'Chaim Topol, Norma Crane y elenco', year: 1971, platform: 'Película', lang: 'en',
      sources: am(715937500),
    },
    {
      id: 'mus-cabaret-maybe-this-time', cat: 'mus-clasicos', franchise: 'Cabaret', game: 'Maybe This Time',
      title: 'Maybe This Time', composer: 'Liza Minnelli', year: 1972, platform: 'Película', lang: 'en',
      sources: am(1475840931),
    },
    {
      id: 'mus-hello-dolly-sunday-clothes', cat: 'mus-clasicos', franchise: 'Hello, Dolly!', game: 'Put On Your Sunday Clothes',
      title: 'Put On Your Sunday Clothes', composer: 'Michael Crawford, Barbra Streisand y elenco', year: 1969, platform: 'Película', lang: 'en',
      sources: am(1440649060),
    },
    {
      id: 'mus-la-mancha-man-of-la-mancha', cat: 'mus-clasicos', franchise: 'Man of La Mancha', game: 'Man of La Mancha',
      title: 'Man of La Mancha (I, Don Quixote)', composer: 'Richard Kiley e Irving Jacobson', year: 1965, platform: 'Broadway', lang: 'en',
      aka: ['I, Don Quixote'],
      sources: am(1440846127),
    },
    {
      id: 'mus-sonrisas-cosas-que-me-hacen-feliz', cat: 'mus-clasicos', franchise: 'The Sound of Music', game: 'Cosas que me hacen feliz',
      title: 'Cosas que me hacen feliz', composer: 'Noemí Mazoy y Silvia Luchetti', year: 2011, platform: 'Madrid', lang: 'es',
      aka: ['My Favorite Things'],
      sources: am(1442413954),
    },

    /* ───────────── 70s y 80s (36) ───────────── */
    {
      id: 'mus-jcs-superstar', cat: 'mus-7080', franchise: 'Jesus Christ Superstar', game: 'Superstar',
      title: 'Superstar', composer: 'Murray Head', year: 1970, platform: 'Álbum original', lang: 'en',
      sources: [...amAlbum(1440808178, 'Superstar'), ...am(1576861401)],
    },
    {
      id: 'mus-jcs-i-dont-know-how-to-love-him', cat: 'mus-7080', franchise: 'Jesus Christ Superstar', game: 'I Don\'t Know How to Love Him',
      title: 'I Don\'t Know How to Love Him', composer: 'Yvonne Elliman', year: 1970, platform: 'Álbum original', lang: 'en',
      aka: ['No sé cómo amarle'],
      sources: am(1440808479),
    },
    {
      id: 'mus-grease-summer-nights', cat: 'mus-7080', franchise: 'Grease', game: 'Summer Nights',
      title: 'Summer Nights', composer: 'John Travolta y Olivia Newton-John', year: 1978, platform: 'Película', lang: 'en',
      sources: am(1440844694),
    },
    {
      id: 'mus-grease-youre-the-one-that-i-want', cat: 'mus-7080', franchise: 'Grease', game: 'You\'re the One That I Want',
      title: 'You\'re the One That I Want', composer: 'John Travolta y Olivia Newton-John', year: 1978, platform: 'Película', lang: 'en',
      sources: am(1440844700),
    },
    {
      id: 'mus-grease-greased-lightnin', cat: 'mus-7080', franchise: 'Grease', game: 'Greased Lightnin\'',
      title: 'Greased Lightnin\'', composer: 'John Travolta', year: 1978, platform: 'Película', lang: 'en',
      aka: ['Greased Lightning', 'Rayo rebelde'],
      sources: amAlbum(1440844625, 'Greased Lightnin\''),
    },
    {
      id: 'mus-grease-hopelessly-devoted', cat: 'mus-7080', franchise: 'Grease', game: 'Hopelessly Devoted to You',
      title: 'Hopelessly Devoted to You', composer: 'Olivia Newton-John', year: 1978, platform: 'Película', lang: 'en',
      sources: amAlbum(1440844625, 'Hopelessly Devoted to You'),
    },
    {
      id: 'mus-rocky-horror-time-warp', cat: 'mus-7080', franchise: 'The Rocky Horror Picture Show', game: 'Time Warp',
      title: 'The Time Warp', composer: 'Richard O\'Brien, Patricia Quinn y Nell Campbell', year: 1975, platform: 'Película', lang: 'en',
      aka: ['The Time Warp'],
      sources: [...am(1024228176), ...am(293627177)],
    },
    {
      id: 'mus-chicago-all-that-jazz', cat: 'mus-7080', franchise: 'Chicago', game: 'All That Jazz',
      title: 'Overture / And All That Jazz', composer: 'Catherine Zeta-Jones', year: 2002, platform: 'Película', lang: 'en',
      aka: ['And All That Jazz'],
      sources: am(197900055),
    },
    {
      id: 'mus-chicago-cell-block-tango', cat: 'mus-7080', franchise: 'Chicago', game: 'Cell Block Tango',
      title: 'Cell Block Tango', composer: 'Catherine Zeta-Jones y elenco', year: 2002, platform: 'Película', lang: 'en',
      sources: amAlbum(197899583, 'Cell Block Tango'),
    },
    {
      id: 'mus-annie-tomorrow', cat: 'mus-7080', franchise: 'Annie', game: 'Tomorrow',
      title: 'Tomorrow', composer: 'Aileen Quinn', year: 1982, platform: 'Película', lang: 'en',
      aka: ['Mañana'],
      sources: [...am(1595966585), ...am(1440760134)],
    },
    {
      id: 'mus-annie-hard-knock-life', cat: 'mus-7080', franchise: 'Annie', game: 'It\'s the Hard-Knock Life',
      title: 'It\'s the Hard-Knock Life', composer: 'Aileen Quinn y las huérfanas', year: 1982, platform: 'Película', lang: 'en',
      aka: ['Hard Knock Life'],
      sources: am(1595966734),
    },
    {
      id: 'mus-evita-dont-cry-for-me-argentina', cat: 'mus-7080', franchise: 'Evita', game: 'Don\'t Cry for Me Argentina',
      title: 'Don\'t Cry for Me Argentina', composer: 'Madonna', year: 1996, platform: 'Película', lang: 'en',
      aka: ['No llores por mí, Argentina'],
      sources: am(311573214),
    },
    {
      id: 'mus-cats-memory', cat: 'mus-7080', franchise: 'Cats', game: 'Memory',
      title: 'Memory', composer: 'Elaine Paige', year: 1981, platform: 'Londres', lang: 'en',
      aka: ['Memoria'],
      sources: [...am(1843481227), ...am(1843483791)],
    },
    {
      id: 'mus-les-mis-i-dreamed-a-dream', cat: 'mus-7080', franchise: 'Les Misérables', game: 'I Dreamed a Dream',
      title: 'I Dreamed a Dream', composer: 'Anne Hathaway', year: 2012, platform: 'Película', lang: 'en',
      aka: ['Soñé una vida'],
      sources: [...am(1440824454), ...am(1442461645)],
    },
    {
      id: 'mus-les-mis-one-day-more', cat: 'mus-7080', franchise: 'Les Misérables', game: 'One Day More',
      title: 'One Day More', composer: 'Elenco de la película', year: 2012, platform: 'Película', lang: 'en',
      aka: ['Un día más'],
      sources: [...am(1440824546), ...am(1442462501)],
    },
    {
      id: 'mus-les-mis-do-you-hear-the-people-sing', cat: 'mus-7080', franchise: 'Les Misérables', game: 'Do You Hear the People Sing?',
      title: 'Do You Hear the People Sing?', composer: 'Aaron Tveit, Eddie Redmayne y elenco', year: 2012, platform: 'Película', lang: 'en',
      sources: am(1440859968),
    },
    {
      id: 'mus-phantom-the-phantom-of-the-opera', cat: 'mus-7080', franchise: 'The Phantom of the Opera', game: 'The Phantom of the Opera',
      title: 'The Phantom of the Opera', composer: 'Sarah Brightman y Michael Crawford', year: 1986, platform: 'Londres', lang: 'en',
      aka: ['El fantasma de la ópera'],
      sources: [...am(1452159653), ...am(1843488694)],
    },
    {
      id: 'mus-phantom-the-music-of-the-night', cat: 'mus-7080', franchise: 'The Phantom of the Opera', game: 'The Music of the Night',
      title: 'The Music of the Night', composer: 'Michael Crawford', year: 1986, platform: 'Londres', lang: 'en',
      aka: ['La música de la noche'],
      sources: am(1452159654),
    },
    {
      id: 'mus-phantom-all-i-ask-of-you', cat: 'mus-7080', franchise: 'The Phantom of the Opera', game: 'All I Ask of You',
      title: 'All I Ask of You', composer: 'Sarah Brightman y Steve Barton', year: 1986, platform: 'Londres', lang: 'en',
      sources: amAlbum(1843488228, 'All I Ask of You'),
    },
    {
      id: 'mus-little-shop-suddenly-seymour', cat: 'mus-7080', franchise: 'Little Shop of Horrors', game: 'Suddenly Seymour',
      title: 'Suddenly, Seymour', composer: 'Rick Moranis y Ellen Greene', year: 1986, platform: 'Película', lang: 'en',
      aka: ['Suddenly, Seymour'],
      sources: am(1434903443),
    },
    {
      id: 'mus-dreamgirls-and-i-am-telling-you', cat: 'mus-7080', franchise: 'Dreamgirls', game: 'And I Am Telling You I\'m Not Going',
      title: 'And I Am Telling You I\'m Not Going', composer: 'Jennifer Hudson', year: 2006, platform: 'Película', lang: 'en',
      sources: [...am(395768530), ...am(296964879)],
    },
    {
      id: 'mus-chess-one-night-in-bangkok', cat: 'mus-7080', franchise: 'Chess', game: 'One Night in Bangkok',
      title: 'One Night in Bangkok', composer: 'Murray Head', year: 1984, platform: 'Álbum original', lang: 'en',
      sources: am(1654688410),
    },
    {
      id: 'mus-vaselina-rayo-rebelde', cat: 'mus-7080', franchise: 'Grease', game: 'Rayo rebelde',
      title: 'Rayo rebelde', composer: 'Timbiriche', year: 1984, platform: 'México', lang: 'es',
      aka: ['Greased Lightnin\'', 'Greased Lightning'],
      sources: am(1886593811),
    },
    {
      id: 'mus-jcs-getsemani', cat: 'mus-7080', franchise: 'Jesus Christ Superstar', game: 'Getsemaní',
      title: 'Getsemaní (Oración del huerto)', composer: 'Camilo Sesto', year: 1975, platform: 'Madrid', lang: 'es',
      aka: ['Getsemaní (Oración del huerto)', 'Gethsemane'],
      sources: [...am(298672802), ...am(654758743)],
    },
    {
      id: 'mus-jcs-hosanna', cat: 'mus-7080', franchise: 'Jesus Christ Superstar', game: 'Hosanna',
      title: 'Hosanna', composer: 'Camilo Sesto y elenco', year: 1975, platform: 'Madrid', lang: 'es',
      sources: am(298672791),
    },
    {
      id: 'mus-evita-no-llores-por-mi-argentina', cat: 'mus-7080', franchise: 'Evita', game: 'No llores por mí, Argentina',
      title: 'No llores por mí, Argentina', composer: 'Paloma San Basilio', year: 1980, platform: 'Madrid', lang: 'es',
      aka: ['Don\'t Cry for Me Argentina'],
      sources: [...am(362515731), ...am(1139908179)],
    },
    {
      id: 'mus-fantasma-el-fantasma-de-la-opera', cat: 'mus-7080', franchise: 'The Phantom of the Opera', game: 'El fantasma de la ópera',
      title: 'El fantasma de la ópera', composer: 'Juan Navarro e Irasema Terrazas', year: 2000, platform: 'México', lang: 'es',
      aka: ['The Phantom of the Opera'],
      sources: [...am(1645530170), ...am(1843500807)],
    },
    {
      id: 'mus-miserables-otro-dia-se-va', cat: 'mus-7080', franchise: 'Les Misérables', game: 'Otro día se va',
      title: 'Otro día se va', composer: 'Elenco original de Madrid', year: 2010, platform: 'Madrid', lang: 'es',
      aka: ['At the End of the Day'],
      sources: am(418801714),
    },
    {
      id: 'mus-miserables-amo-del-meson', cat: 'mus-7080', franchise: 'Les Misérables', game: 'Amo del mesón',
      title: 'Amo del mesón', composer: 'Elenco original de Madrid', year: 2010, platform: 'Madrid', lang: 'es',
      aka: ['Master of the House'],
      sources: am(418801720),
    },

    {
      id: 'mus-wiz-ease-on-down-the-road', cat: 'mus-7080', franchise: 'The Wiz', game: 'Ease on Down the Road',
      title: 'Ease on Down the Road', composer: 'Diana Ross y Michael Jackson', year: 1978, platform: 'Película', lang: 'en',
      sources: am(1440874523),
    },
    {
      id: 'mus-godspell-day-by-day', cat: 'mus-7080', franchise: 'Godspell', game: 'Day by Day',
      title: 'Day by Day', composer: 'Robin Lamont y elenco', year: 1971, platform: 'Off-Broadway', lang: 'en',
      sources: am(260129227),
    },
    {
      id: 'mus-chorus-line-one', cat: 'mus-7080', franchise: 'A Chorus Line', game: 'One',
      title: 'One', composer: 'Elenco original de Broadway', year: 1975, platform: 'Broadway', lang: 'en',
      aka: ['One (Singular Sensation)'],
      sources: [...am(1041504608), ...am(615210642)],
    },
    {
      id: 'mus-sweeney-todd-worst-pies', cat: 'mus-7080', franchise: 'Sweeney Todd', game: 'The Worst Pies in London',
      title: 'The Worst Pies in London', composer: 'Angela Lansbury', year: 1979, platform: 'Broadway', lang: 'en',
      sources: am(1086882656),
    },
    {
      id: 'mus-into-the-woods-prologue', cat: 'mus-7080', franchise: 'Into the Woods', game: 'Into the Woods',
      title: 'Prologue: Into the Woods', composer: 'Elenco original de Broadway', year: 1987, platform: 'Broadway', lang: 'en',
      aka: ['Prologue: Into the Woods'],
      sources: am(219237028),
    },
    {
      id: 'mus-miss-saigon-last-night-of-the-world', cat: 'mus-7080', franchise: 'Miss Saigon', game: 'The Last Night of the World',
      title: 'The Last Night of the World', composer: 'Lea Salonga y Simon Bowman', year: 1989, platform: 'Londres', lang: 'en',
      sources: [...am(1440151898), ...am(1452141765), ...am(1440831324)],
    },
    {
      id: 'mus-annie-maybe', cat: 'mus-7080', franchise: 'Annie', game: 'Maybe',
      title: 'Maybe', composer: 'Aileen Quinn', year: 1982, platform: 'Película', lang: 'en',
      sources: am(1595966908),
    },

    /* ───────────── 90s y 2000s (27) ───────────── */
    {
      id: 'mus-rent-seasons-of-love', cat: 'mus-9000', franchise: 'Rent', game: 'Seasons of Love',
      title: 'Seasons of Love', composer: 'Elenco de la película', year: 2005, platform: 'Película', lang: 'en',
      sources: am(80446140),
    },
    {
      id: 'mus-rent-take-me-or-leave-me', cat: 'mus-9000', franchise: 'Rent', game: 'Take Me or Leave Me',
      title: 'Take Me or Leave Me', composer: 'Idina Menzel y Tracie Thoms', year: 2005, platform: 'Película', lang: 'en',
      sources: am(80446511),
    },
    {
      id: 'mus-mamma-mia-mamma-mia', cat: 'mus-9000', franchise: 'Mamma Mia!', game: 'Mamma Mia',
      title: 'Mamma Mia', composer: 'Meryl Streep', year: 2008, platform: 'Película', lang: 'en',
      sources: am(1440768339),
    },
    {
      id: 'mus-mamma-mia-dancing-queen', cat: 'mus-9000', franchise: 'Mamma Mia!', game: 'Dancing Queen',
      title: 'Dancing Queen', composer: 'Meryl Streep, Julie Walters y Christine Baranski', year: 2008, platform: 'Película', lang: 'en',
      sources: [...amAlbum(1440767912, 'Dancing Queen'), ...am(1615442037)],
    },
    {
      id: 'mus-mamma-mia-lay-all-your-love-on-me', cat: 'mus-9000', franchise: 'Mamma Mia!', game: 'Lay All Your Love on Me',
      title: 'Lay All Your Love on Me', composer: 'Dominic Cooper y Amanda Seyfried', year: 2008, platform: 'Película', lang: 'en',
      aka: ['Fija tu amor en mí'],
      sources: am(1440768626),
    },
    {
      id: 'mus-moulin-rouge-come-what-may', cat: 'mus-9000', franchise: 'Moulin Rouge!', game: 'Come What May',
      title: 'Come What May', composer: 'Nicole Kidman y Ewan McGregor', year: 2001, platform: 'Película', lang: 'en',
      sources: am(1440845923),
    },
    {
      id: 'mus-moulin-rouge-lady-marmalade', cat: 'mus-9000', franchise: 'Moulin Rouge!', game: 'Lady Marmalade',
      title: 'Lady Marmalade', composer: 'Christina Aguilera, Lil\' Kim, Mýa y P!nk', year: 2001, platform: 'Película', lang: 'en',
      sources: [...am(1440845801), ...am(1633521976)],
    },
    {
      id: 'mus-wicked-defying-gravity', cat: 'mus-9000', franchise: 'Wicked', game: 'Defying Gravity',
      title: 'Defying Gravity', composer: 'Idina Menzel y Kristin Chenoweth', year: 2003, platform: 'Broadway', lang: 'en',
      aka: ['Desafiando la gravedad'],
      sources: am(1440802840),
    },
    {
      id: 'mus-wicked-popular', cat: 'mus-9000', franchise: 'Wicked', game: 'Popular',
      title: 'Popular', composer: 'Ariana Grande', year: 2024, platform: 'Película', lang: 'en',
      sources: am(1772364643),
    },
    {
      id: 'mus-wicked-what-is-this-feeling', cat: 'mus-9000', franchise: 'Wicked', game: 'What Is This Feeling?',
      title: 'What Is This Feeling?', composer: 'Ariana Grande y Cynthia Erivo', year: 2024, platform: 'Película', lang: 'en',
      sources: am(1772364620),
    },
    {
      id: 'mus-wicked-for-good', cat: 'mus-9000', franchise: 'Wicked', game: 'For Good',
      title: 'For Good', composer: 'Kristin Chenoweth e Idina Menzel', year: 2003, platform: 'Broadway', lang: 'en',
      sources: am(1440803108),
    },
    {
      id: 'mus-hairspray-good-morning-baltimore', cat: 'mus-9000', franchise: 'Hairspray', game: 'Good Morning Baltimore',
      title: 'Good Morning Baltimore', composer: 'Nikki Blonsky', year: 2007, platform: 'Película', lang: 'en',
      sources: [...am(1454446818), ...am(1454449343)],
    },
    {
      id: 'mus-hairspray-you-cant-stop-the-beat', cat: 'mus-9000', franchise: 'Hairspray', game: 'You Can\'t Stop the Beat',
      title: 'You Can\'t Stop the Beat', composer: 'Elenco de la película', year: 2007, platform: 'Película', lang: 'en',
      sources: [...am(1454446955), ...am(1454449538)],
    },
    {
      id: 'mus-in-the-heights-in-the-heights', cat: 'mus-9000', franchise: 'In the Heights', game: 'In the Heights',
      title: 'In the Heights', composer: 'Anthony Ramos y elenco', year: 2021, platform: 'Película', lang: 'en',
      sources: am(1563820977),
    },
    {
      id: 'mus-mamma-mia-va-todo-al-ganador', cat: 'mus-9000', franchise: 'Mamma Mia!', game: 'Va todo al ganador',
      title: 'Va todo al ganador', composer: 'Nina', year: 2004, platform: 'Madrid', lang: 'es',
      aka: ['The Winner Takes It All'],
      sources: am(1440848090),
    },
    {
      id: 'mus-mamma-mia-chiquitita', cat: 'mus-9000', franchise: 'Mamma Mia!', game: 'Chiquitita',
      title: 'Chiquitita', composer: 'Nina, Marta Valverde y Paula Sebastián', year: 2004, platform: 'Madrid', lang: 'es',
      sources: am(1440847475),
    },
    {
      id: 'mus-mentiras-castillos', cat: 'mus-9000', franchise: 'Mentiras', game: 'Castillos',
      title: 'Castillos', composer: 'Elenco original', year: 2009, platform: 'México', lang: 'es',
      sources: am(328877953),
    },
    {
      id: 'mus-mentiras-pobre-secretaria', cat: 'mus-9000', franchise: 'Mentiras', game: 'Pobre secretaria',
      title: 'Pobre secretaria', composer: 'Elenco original', year: 2009, platform: 'México', lang: 'es',
      sources: am(328878051),
    },
    {
      id: 'mus-hnmpl-hawaii-bombay', cat: 'mus-9000', franchise: 'Hoy no me puedo levantar', game: 'Hawaii-Bombay',
      title: 'Hawaii-Bombay', composer: 'Elenco de República Dominicana', year: 2022, platform: 'Santo Domingo', lang: 'es',
      sources: am(1648407757),
    },

    {
      id: 'mus-rent-rent', cat: 'mus-9000', franchise: 'Rent', game: 'Rent',
      title: 'Rent', composer: 'Elenco original de Broadway', year: 1996, platform: 'Broadway', lang: 'en',
      sources: am(1440844488),
    },
    {
      id: 'mus-mamma-mia-slipping-through-my-fingers', cat: 'mus-9000', franchise: 'Mamma Mia!', game: 'Slipping Through My Fingers',
      title: 'Slipping Through My Fingers', composer: 'Meryl Streep y Amanda Seyfried', year: 2008, platform: 'Película', lang: 'en',
      sources: am(1440769022),
    },
    {
      id: 'mus-legally-blonde-omigod-you-guys', cat: 'mus-9000', franchise: 'Legally Blonde', game: 'Omigod You Guys',
      title: 'Omigod You Guys', composer: 'Laura Bell Bundy y elenco', year: 2007, platform: 'Broadway', lang: 'en',
      sources: am(1270809045),
    },
    {
      id: 'mus-tick-tick-boom-louder-than-words', cat: 'mus-9000', franchise: 'tick, tick... BOOM!', game: 'Louder Than Words',
      title: 'Louder Than Words', composer: 'Andrew Garfield, Vanessa Hudgens y Joshua Henry', year: 2021, platform: 'Película', lang: 'en',
      sources: am(1590920414),
    },
    {
      id: 'mus-mamma-mia-fija-tu-amor-en-mi', cat: 'mus-9000', franchise: 'Mamma Mia!', game: 'Fija tu amor en mí',
      title: 'Fija tu amor en mí', composer: 'Mariona Castillo y Leandro Rivera', year: 2004, platform: 'Madrid', lang: 'es',
      aka: ['Lay All Your Love on Me'],
      sources: am(1440847579),
    },
    {
      id: 'mus-mentiras-me-alimento-de-ti', cat: 'mus-9000', franchise: 'Mentiras', game: 'Me alimento de ti',
      title: 'Me alimento de ti', composer: 'Elenco original', year: 2009, platform: 'México', lang: 'es',
      sources: am(328878027),
    },
    {
      id: 'mus-mentiras-tu-muneca', cat: 'mus-9000', franchise: 'Mentiras', game: 'Tu muñeca',
      title: 'Tu muñeca / No soy una muñeca', composer: 'Elenco original', year: 2009, platform: 'México', lang: 'es',
      aka: ['No soy una muñeca'],
      sources: am(328878355),
    },
    {
      id: 'mus-hnmpl-hoy-no-me-puedo-levantar', cat: 'mus-9000', franchise: 'Hoy no me puedo levantar', game: 'Hoy no me puedo levantar',
      title: 'Obertura / Hoy no me puedo levantar', composer: 'José Guillermo Cortines, Javi Grullón y elenco', year: 2022, platform: 'Santo Domingo', lang: 'es',
      sources: am(1648407749),
    },

    /* ───────────── 2010 en adelante (28) ───────────── */
    {
      id: 'mus-hamilton-alexander-hamilton', cat: 'mus-10s', franchise: 'Hamilton', game: 'Alexander Hamilton',
      title: 'Alexander Hamilton', composer: 'Elenco original de Broadway', year: 2015, platform: 'Broadway', lang: 'en',
      sources: am(1025212395),
    },
    {
      id: 'mus-hamilton-my-shot', cat: 'mus-10s', franchise: 'Hamilton', game: 'My Shot',
      title: 'My Shot', composer: 'Lin-Manuel Miranda y elenco', year: 2015, platform: 'Broadway', lang: 'en',
      sources: am(1025212411),
    },
    {
      id: 'mus-hamilton-youll-be-back', cat: 'mus-10s', franchise: 'Hamilton', game: 'You\'ll Be Back',
      title: 'You\'ll Be Back', composer: 'Jonathan Groff', year: 2015, platform: 'Broadway', lang: 'en',
      sources: am(1025212453),
    },
    {
      id: 'mus-hamilton-satisfied', cat: 'mus-10s', franchise: 'Hamilton', game: 'Satisfied',
      title: 'Satisfied', composer: 'Renée Elise Goldsberry', year: 2015, platform: 'Broadway', lang: 'en',
      sources: am(1025212459),
    },
    {
      id: 'mus-showman-this-is-me', cat: 'mus-10s', franchise: 'The Greatest Showman', game: 'This Is Me',
      title: 'This Is Me', composer: 'Keala Settle', year: 2017, platform: 'Película', lang: 'en',
      sources: [...am(1299856916), ...am(1436091877)],
    },
    {
      id: 'mus-showman-the-greatest-show', cat: 'mus-10s', franchise: 'The Greatest Showman', game: 'The Greatest Show',
      title: 'The Greatest Show', composer: 'Hugh Jackman, Keala Settle, Zac Efron y Zendaya', year: 2017, platform: 'Película', lang: 'en',
      sources: am(1299856904),
    },
    {
      id: 'mus-showman-rewrite-the-stars', cat: 'mus-10s', franchise: 'The Greatest Showman', game: 'Rewrite the Stars',
      title: 'Rewrite the Stars', composer: 'Zac Efron y Zendaya', year: 2017, platform: 'Película', lang: 'en',
      sources: am(1299856917),
    },
    {
      id: 'mus-showman-a-million-dreams', cat: 'mus-10s', franchise: 'The Greatest Showman', game: 'A Million Dreams',
      title: 'A Million Dreams', composer: 'Ziv Zaifman, Hugh Jackman y Michelle Williams', year: 2017, platform: 'Película', lang: 'en',
      sources: [...am(1299856905), ...am(1436091863)],
    },
    {
      id: 'mus-la-la-land-city-of-stars', cat: 'mus-10s', franchise: 'La La Land', game: 'City of Stars',
      title: 'City of Stars', composer: 'Ryan Gosling y Emma Stone', year: 2016, platform: 'Película', lang: 'en',
      sources: am(1440864172),
    },
    {
      id: 'mus-la-la-land-another-day-of-sun', cat: 'mus-10s', franchise: 'La La Land', game: 'Another Day of Sun',
      title: 'Another Day of Sun', composer: 'Elenco de la película', year: 2016, platform: 'Película', lang: 'en',
      sources: am(1440863663),
    },
    {
      id: 'mus-la-la-land-audition', cat: 'mus-10s', franchise: 'La La Land', game: 'Audition (The Fools Who Dream)',
      title: 'Audition (The Fools Who Dream)', composer: 'Emma Stone', year: 2016, platform: 'Película', lang: 'en',
      aka: ['The Fools Who Dream'],
      sources: am(1440864374),
    },
    {
      id: 'mus-deh-waving-through-a-window', cat: 'mus-10s', franchise: 'Dear Evan Hansen', game: 'Waving Through a Window',
      title: 'Waving Through a Window', composer: 'Ben Platt', year: 2017, platform: 'Broadway', lang: 'en',
      sources: [...am(1178259986), ...am(1440675977)],
    },
    {
      id: 'mus-deh-you-will-be-found', cat: 'mus-10s', franchise: 'Dear Evan Hansen', game: 'You Will Be Found',
      title: 'You Will Be Found', composer: 'Ben Platt y elenco', year: 2017, platform: 'Broadway', lang: 'en',
      sources: am(1440675983),
    },
    {
      id: 'mus-kpop-golden', cat: 'mus-10s', franchise: 'KPop Demon Hunters', game: 'Golden',
      title: 'Golden', composer: 'HUNTR/X', year: 2025, platform: 'Película', lang: 'en',
      aka: ['Dorada'],
      sources: am(1820264150),
    },
    {
      id: 'mus-kpop-soda-pop', cat: 'mus-10s', franchise: 'KPop Demon Hunters', game: 'Soda Pop',
      title: 'Soda Pop', composer: 'Saja Boys', year: 2025, platform: 'Película', lang: 'en',
      sources: amAlbum(1820264137, 'Soda Pop'),
    },
    {
      id: 'mus-kpop-how-its-done', cat: 'mus-10s', franchise: 'KPop Demon Hunters', game: 'How It\'s Done',
      title: 'How It\'s Done', composer: 'HUNTR/X', year: 2025, platform: 'Película', lang: 'en',
      sources: am(1820264145),
    },
    {
      id: 'mus-kpop-dorada', cat: 'mus-10s', franchise: 'KPop Demon Hunters', game: 'Dorada',
      title: 'Dorada (Golden - versión en español)', composer: 'Azul Botticher, Karin Zavala y Tatul Bernodat', year: 2025, platform: 'Doblaje en español', lang: 'es',
      aka: ['Golden'],
      sources: [...am(1834414766), ...am(1833360346)],
    },
    {
      id: 'mus-kpop-soda-pop-es', cat: 'mus-10s', franchise: 'KPop Demon Hunters', game: 'Soda Pop',
      title: 'Soda Pop (versión en español)', composer: 'Saja Boys (doblaje)', year: 2025, platform: 'Doblaje en español', lang: 'es',
      sources: am(1836298602),
    },
    {
      id: 'mus-book-of-mormon-hello', cat: 'mus-10s', franchise: 'The Book of Mormon', game: 'Hello!',
      title: 'Hello!', composer: 'Andrew Rannells, Josh Gad y elenco', year: 2011, platform: 'Broadway', lang: 'en',
      sources: am(1270791567),
    },
    {
      id: 'mus-six-ex-wives', cat: 'mus-10s', franchise: 'Six', game: 'Ex-Wives',
      title: 'Ex-Wives', composer: 'Elenco original de Six', year: 2018, platform: 'Londres', lang: 'en',
      sources: am(1465183312),
    },
    {
      id: 'mus-hadestown-all-ive-ever-known', cat: 'mus-10s', franchise: 'Hadestown', game: 'All I\'ve Ever Known',
      title: 'All I\'ve Ever Known', composer: 'Eva Noblezada y Reeve Carney', year: 2019, platform: 'Broadway', lang: 'en',
      sources: am(1466351191),
    },
    {
      id: 'mus-beetlejuice-say-my-name', cat: 'mus-10s', franchise: 'Beetlejuice', game: 'Say My Name',
      title: 'Say My Name', composer: 'Alex Brightman, Sophia Anne Caruso, Kerry Butler y Rob McClure', year: 2019, platform: 'Broadway', lang: 'en',
      sources: am(1466050589),
    },
    {
      id: 'mus-matilda-revolting-children', cat: 'mus-10s', franchise: 'Matilda the Musical', game: 'Revolting Children',
      title: 'Revolting Children', composer: 'Elenco de la película', year: 2022, platform: 'Película', lang: 'en',
      sources: am(1651698061),
    },
    {
      id: 'mus-kinky-boots-sex-is-in-the-heel', cat: 'mus-10s', franchise: 'Kinky Boots', game: 'Sex Is in the Heel',
      title: 'Sex Is in the Heel', composer: 'Billy Porter y elenco', year: 2013, platform: 'Broadway', lang: 'en',
      sources: am(638367210),
    },
    {
      id: 'mus-waitress-she-used-to-be-mine', cat: 'mus-10s', franchise: 'Waitress', game: 'She Used to Be Mine',
      title: 'She Used to Be Mine', composer: 'Jessie Mueller', year: 2016, platform: 'Broadway', lang: 'en',
      sources: am(1117418451),
    },
    {
      id: 'mus-mean-girls-meet-the-plastics', cat: 'mus-10s', franchise: 'Mean Girls', game: 'Meet the Plastics',
      title: 'Meet the Plastics', composer: 'Taylor Louderman, Ashley Park y Kate Rockwell', year: 2018, platform: 'Broadway', lang: 'en',
      sources: am(1372106915),
    },
    {
      id: 'mus-heathers-candy-store', cat: 'mus-10s', franchise: 'Heathers: The Musical', game: 'Candy Store',
      title: 'Candy Store', composer: 'Jessica Keenan Wynn, Alice Lee y Elle McLemore', year: 2014, platform: 'Off-Broadway', lang: 'en',
      sources: am(887521354),
    },
    {
      id: 'mus-wonka-a-world-of-your-own', cat: 'mus-10s', franchise: 'Wonka', game: 'A World of Your Own',
      title: 'A World of Your Own', composer: 'Timothée Chalamet', year: 2023, platform: 'Película', lang: 'en',
      sources: am(1718982342),
    },
  );

  // Señuelos: aparecen como opciones incorrectas y en el buscador de Experto (son canciones de verdad).
  const en = (franchise, game, extra) => Object.assign({ theme: 'musicales', franchise: franchise, game: game, lang: 'en' }, extra);
  const es = (franchise, game, extra) => Object.assign({ theme: 'musicales', franchise: franchise, game: game, lang: 'es' }, extra);
  AM.EXTRA_GAMES.push(
    // Otras canciones de los musicales que suenan
    en('The Wizard of Oz', 'Ding-Dong! The Witch Is Dead'), en('The Wizard of Oz', 'If I Only Had a Brain'),
    en('Singin\' in the Rain', 'Moses Supposes'), en('Singin\' in the Rain', 'You Are My Lucky Star'),
    en('West Side Story', 'I Feel Pretty'), en('West Side Story', 'Somewhere'), en('West Side Story', 'Jet Song'),
    en('The Sound of Music', 'The Lonely Goatherd'), en('The Sound of Music', 'Sixteen Going on Seventeen'),
    en('The Sound of Music', 'So Long, Farewell', { aka: ['Adiós, adiós'] }), en('The Sound of Music', 'Climb Ev\'ry Mountain'),
    en('My Fair Lady', 'Wouldn\'t It Be Loverly'), en('My Fair Lady', 'The Rain in Spain'), en('My Fair Lady', 'On the Street Where You Live'),
    en('Fiddler on the Roof', 'Matchmaker'), en('Fiddler on the Roof', 'To Life'),
    en('Cabaret', 'Willkommen'), en('Cabaret', 'Mein Herr'),
    en('Hello, Dolly!', 'Before the Parade Passes By'), en('Hello, Dolly!', 'It Only Takes a Moment'),
    en('Funny Girl', 'People'),
    en('Hair', 'Let the Sunshine In'), en('Hair', 'Good Morning Starshine'),
    en('Man of La Mancha', 'Dulcinea'),
    en('Oliver!', 'Food, Glorious Food'), en('Oliver!', 'Where Is Love?'),
    en('Oklahoma!', 'Oklahoma'), en('Oklahoma!', 'The Surrey with the Fringe on Top'), en('Oklahoma!', 'People Will Say We\'re in Love'),
    en('The King and I', 'Getting to Know You'), en('The King and I', 'I Whistle a Happy Tune'),
    en('Joseph and the Amazing Technicolor Dreamcoat', 'Close Every Door'), en('Joseph and the Amazing Technicolor Dreamcoat', 'Go, Go, Go Joseph'),
    en('Jesus Christ Superstar', 'Gethsemane', { aka: ['Getsemaní'] }), en('Jesus Christ Superstar', 'Everything\'s Alright'),
    en('Jesus Christ Superstar', 'Heaven on Their Minds'),
    en('Grease', 'Grease'), en('Grease', 'We Go Together'), en('Grease', 'Beauty School Dropout'), en('Grease', 'Sandy'),
    en('The Rocky Horror Picture Show', 'Science Fiction/Double Feature'), en('The Rocky Horror Picture Show', 'Hot Patootie'),
    en('The Wiz', 'Home'), en('The Wiz', 'You Can\'t Win'),
    en('Godspell', 'Prepare Ye (The Way of the Lord)'), en('Godspell', 'Learn Your Lessons Well'),
    en('A Chorus Line', 'What I Did for Love'), en('A Chorus Line', 'I Hope I Get It'),
    en('Sweeney Todd', 'Johanna'), en('Sweeney Todd', 'Pretty Women'), en('Sweeney Todd', 'A Little Priest'),
    en('Chicago', 'Razzle Dazzle'), en('Chicago', 'Roxie'), en('Chicago', 'Mister Cellophane'),
    en('Annie', 'Easy Street'), en('Annie', 'You\'re Never Fully Dressed Without a Smile'),
    en('Evita', 'Buenos Aires'), en('Evita', 'Another Suitcase in Another Hall'),
    en('Cats', 'Mr. Mistoffelees'), en('Cats', 'Jellicle Songs for Jellicle Cats'),
    en('Les Misérables', 'On My Own'), en('Les Misérables', 'Bring Him Home'),
    en('Les Misérables', 'Master of the House', { aka: ['Amo del mesón'] }),
    en('Les Misérables', 'At the End of the Day', { aka: ['Otro día se va'] }),
    en('The Phantom of the Opera', 'Think of Me'), en('The Phantom of the Opera', 'Masquerade'), en('The Phantom of the Opera', 'Angel of Music'),
    en('Little Shop of Horrors', 'Skid Row (Downtown)'), en('Little Shop of Horrors', 'Feed Me (Git It)'),
    en('Dreamgirls', 'Listen'), en('Dreamgirls', 'One Night Only'),
    en('Chess', 'I Know Him So Well'),
    en('Into the Woods', 'Agony'), en('Into the Woods', 'Children Will Listen'), en('Into the Woods', 'Giants in the Sky'),
    en('Miss Saigon', 'Sun and Moon'), en('Miss Saigon', 'The Movie in My Mind'),
    en('Rent', 'La Vie Bohème'), en('Rent', 'Out Tonight'), en('Rent', 'One Song Glory'),
    en('Mamma Mia!', 'The Winner Takes It All', { aka: ['Va todo al ganador'] }), en('Mamma Mia!', 'Super Trouper'),
    en('Mamma Mia!', 'Gimme! Gimme! Gimme! (A Man After Midnight)'), en('Mamma Mia!', 'Voulez-Vous'),
    en('Moulin Rouge!', 'Elephant Love Medley'), en('Moulin Rouge!', 'El Tango de Roxanne'), en('Moulin Rouge!', 'Your Song'),
    en('Wicked', 'The Wizard and I'), en('Wicked', 'Dancing Through Life'), en('Wicked', 'No One Mourns the Wicked'),
    en('Hairspray', 'Welcome to the 60\'s'), en('Hairspray', 'Without Love'), en('Hairspray', 'Run and Tell That'),
    en('In the Heights', '96,000'), en('In the Heights', 'Breathe'),
    en('Legally Blonde', 'So Much Better'), en('Legally Blonde', 'Bend and Snap'),
    en('tick, tick... BOOM!', '30/90'), en('tick, tick... BOOM!', 'Johnny Can\'t Decide'),
    en('Hamilton', 'The Room Where It Happens'), en('Hamilton', 'Wait for It'), en('Hamilton', 'Helpless'),
    en('Hamilton', 'The Schuyler Sisters'), en('Hamilton', 'Non-Stop'),
    en('The Greatest Showman', 'Never Enough'), en('The Greatest Showman', 'Come Alive'), en('The Greatest Showman', 'The Other Side'),
    en('The Greatest Showman', 'From Now On'),
    en('La La Land', 'Someone in the Crowd'), en('La La Land', 'A Lovely Night'), en('La La Land', 'Start a Fire'),
    en('Dear Evan Hansen', 'For Forever'), en('Dear Evan Hansen', 'Sincerely, Me'), en('Dear Evan Hansen', 'Requiem'),
    en('The Book of Mormon', 'I Believe'), en('The Book of Mormon', 'Turn It Off'), en('The Book of Mormon', 'You and Me (But Mostly Me)'),
    en('Six', 'Six'), en('Six', 'Don\'t Lose Ur Head'), en('Six', 'Heart of Stone'),
    en('Hadestown', 'Wait for Me'), en('Hadestown', 'Way Down Hadestown'), en('Hadestown', 'Wedding Song'),
    en('Beetlejuice', 'The Whole "Being Dead" Thing'), en('Beetlejuice', 'Dead Mom'), en('Beetlejuice', 'Day-O (The Banana Boat Song)'),
    en('Matilda the Musical', 'Naughty'), en('Matilda the Musical', 'When I Grow Up'), en('Matilda the Musical', 'Quiet'),
    en('Kinky Boots', 'Raise You Up / Just Be'), en('Kinky Boots', 'Land of Lola'), en('Kinky Boots', 'Not My Father\'s Son'),
    en('Waitress', 'What Baking Can Do'), en('Waitress', 'Opening Up'), en('Waitress', 'You Matter to Me'),
    en('Mean Girls', 'Apex Predator'), en('Mean Girls', 'World Burn'), en('Mean Girls', 'I\'d Rather Be Me'),
    en('Heathers: The Musical', 'Seventeen'), en('Heathers: The Musical', 'Dead Girl Walking'), en('Heathers: The Musical', 'Beautiful'),
    en('Wonka', 'Pure Imagination'), en('Wonka', 'Oompa Loompa'), en('Wonka', 'You\'ve Never Had Chocolate Like This'),
    en('KPop Demon Hunters', 'Your Idol'), en('KPop Demon Hunters', 'What It Sounds Like'),
    en('KPop Demon Hunters', 'Takedown'), en('KPop Demon Hunters', 'Free'),
    // Musicales que todavía no tienen pista
    en('Guys and Dolls', 'Luck Be a Lady'),
    en('Gypsy', 'Everything\'s Coming Up Roses'),
    en('Sunset Boulevard', 'As If We Never Said Goodbye'),
    en('Spring Awakening', 'Mama Who Bore Me'),
    en('Come From Away', 'Welcome to the Rock'),
    // En español
    es('Grease', 'Vaselina', { aka: ['Grease'] }),
    es('Jesus Christ Superstar', 'Juicio ante Pilatos'), es('Jesus Christ Superstar', 'Dinos lo que va a pasar'),
    es('The Phantom of the Opera', 'La música de la noche', { aka: ['The Music of the Night'] }),
    es('Mamma Mia!', 'Un verano'), es('Mamma Mia!', 'Siento que se aleja'),
    es('Mentiras', 'Mentiras'), es('Mentiras', 'Solamente amigas'), es('Mentiras', 'Déjala'),
    es('Hoy no me puedo levantar', 'Me colé en una fiesta'), es('Hoy no me puedo levantar', 'Maquillaje'),
    es('Hoy no me puedo levantar', 'Cruz de navajas'),
  );
})(window.AM = window.AM || {});
