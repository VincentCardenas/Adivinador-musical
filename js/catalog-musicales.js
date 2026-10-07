/*
 * Catálogo: Musicales (222 pistas: 200 en su grabación original y 22 en español).
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
  const busca = (musical, cancion, otros) => {
    const o = { term: musical + ' ' + cancion, match: [cancion].concat(otros || []), album_hint: musical };
    return [apple(Object.assign({ country: 'mx' }, o)), apple(o)];
  };

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
    'Guys and Dolls': ['Ellos y ellas'],
    'Bye Bye Birdie': ['Un beso para Birdie'],
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
    'Avenue Q': ['Avenida Q'],
    'Spring Awakening': ['Despertar de primavera'],
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
    /* ───────────── Clásicos (antes de 1970) (56) ───────────── */
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

        {
      id: 'mus-ding-dong-witch', cat: 'mus-clasicos', franchise: "The Wizard of Oz", game: "Ding-Dong! The Witch Is Dead",
      title: "Ding-Dong! The Witch Is Dead", composer: "Judy Garland y elenco", year: 1939, platform: "Película", lang: 'en',
      sources: busca('The Wizard of Oz', 'Ding-Dong! The Witch Is Dead'),
    },
    {
      id: 'mus-if-i-only-had-a-brain', cat: 'mus-clasicos', franchise: "The Wizard of Oz", game: "If I Only Had a Brain",
      title: "If I Only Had a Brain", composer: "Ray Bolger y Judy Garland", year: 1939, platform: "Película", lang: 'en',
      sources: busca('The Wizard of Oz', 'If I Only Had a Brain'),
    },
    {
      id: 'mus-moses-supposes', cat: 'mus-clasicos', franchise: "Singin' in the Rain", game: "Moses Supposes",
      title: "Moses Supposes", composer: "Gene Kelly y Donald O'Connor", year: 1952, platform: "Película", lang: 'en',
      sources: busca('Singin\' in the Rain', 'Moses Supposes'),
    },
    {
      id: 'mus-you-were-meant-for-me', cat: 'mus-clasicos', franchise: "Singin' in the Rain", game: "You Were Meant for Me",
      title: "You Were Meant for Me", composer: "Gene Kelly", year: 1952, platform: "Película", lang: 'en',
      sources: busca('Singin\' in the Rain', 'You Were Meant for Me'),
    },
    {
      id: 'mus-wss-i-feel-pretty', cat: 'mus-clasicos', franchise: "West Side Story", game: "I Feel Pretty",
      title: "I Feel Pretty", composer: "Marni Nixon y elenco", year: 1961, platform: "Película", lang: 'en',
      sources: busca('West Side Story', 'I Feel Pretty'),
    },
    {
      id: 'mus-wss-somethings-coming', cat: 'mus-clasicos', franchise: "West Side Story", game: "Something's Coming",
      title: "Something's Coming", composer: "Jim Bryant", year: 1961, platform: "Película", lang: 'en',
      sources: busca('West Side Story', 'Something\'s Coming'),
    },
    {
      id: 'mus-wss-somewhere', cat: 'mus-clasicos', franchise: "West Side Story", game: "Somewhere",
      title: "Somewhere", composer: "Reri Grist", year: 1961, platform: "Película", lang: 'en',
      sources: busca('West Side Story', 'Somewhere'),
    },
    {
      id: 'mus-sound-climb-evry-mountain', cat: 'mus-clasicos', franchise: "The Sound of Music", game: "Climb Ev'ry Mountain",
      title: "Climb Ev'ry Mountain", composer: "Peggy Wood", year: 1965, platform: "Película", lang: 'en',
      sources: busca('The Sound of Music', 'Climb Ev\'ry Mountain'),
    },
    {
      id: 'mus-sound-sixteen-going-on-seventeen', cat: 'mus-clasicos', franchise: "The Sound of Music", game: "Sixteen Going on Seventeen",
      title: "Sixteen Going on Seventeen", composer: "Charmian Carr y Daniel Truhitte", year: 1965, platform: "Película", lang: 'en',
      sources: busca('The Sound of Music', 'Sixteen Going on Seventeen'),
    },
    {
      id: 'mus-sound-the-lonely-goatherd', cat: 'mus-clasicos', franchise: "The Sound of Music", game: "The Lonely Goatherd",
      title: "The Lonely Goatherd", composer: "Julie Andrews y los niños von Trapp", year: 1965, platform: "Película", lang: 'en',
      sources: busca('The Sound of Music', 'The Lonely Goatherd'),
    },
    {
      id: 'mus-sound-so-long-farewell', cat: 'mus-clasicos', franchise: "The Sound of Music", game: "So Long, Farewell",
      title: "So Long, Farewell", composer: "Los niños von Trapp", year: 1965, platform: "Película", lang: 'en',
      sources: busca('The Sound of Music', 'So Long, Farewell'),
    },
    {
      id: 'mus-mfl-wouldnt-it-be-loverly', cat: 'mus-clasicos', franchise: "My Fair Lady", game: "Wouldn't It Be Loverly",
      title: "Wouldn't It Be Loverly", composer: "Marni Nixon", year: 1964, platform: "Película", lang: 'en',
      sources: busca('My Fair Lady', 'Wouldn\'t It Be Loverly'),
    },
    {
      id: 'mus-mfl-the-rain-in-spain', cat: 'mus-clasicos', franchise: "My Fair Lady", game: "The Rain in Spain",
      title: "The Rain in Spain", composer: "Rex Harrison, Marni Nixon y Wilfrid Hyde-White", year: 1964, platform: "Película", lang: 'en',
      sources: busca('My Fair Lady', 'The Rain in Spain'),
    },
    {
      id: 'mus-mfl-on-the-street', cat: 'mus-clasicos', franchise: "My Fair Lady", game: "On the Street Where You Live",
      title: "On the Street Where You Live", composer: "Bill Shirley", year: 1964, platform: "Película", lang: 'en',
      sources: busca('My Fair Lady', 'On the Street Where You Live'),
    },
    {
      id: 'mus-mfl-get-me-to-the-church', cat: 'mus-clasicos', franchise: "My Fair Lady", game: "Get Me to the Church on Time",
      title: "Get Me to the Church on Time", composer: "Stanley Holloway y elenco", year: 1964, platform: "Película", lang: 'en',
      sources: busca('My Fair Lady', 'Get Me to the Church on Time'),
    },
    {
      id: 'mus-fiddler-matchmaker', cat: 'mus-clasicos', franchise: "Fiddler on the Roof", game: "Matchmaker, Matchmaker",
      title: "Matchmaker, Matchmaker", composer: "Elenco de la película", year: 1971, platform: "Película", lang: 'en',
      sources: busca('Fiddler on the Roof', 'Matchmaker, Matchmaker'),
    },
    {
      id: 'mus-fiddler-to-life', cat: 'mus-clasicos', franchise: "Fiddler on the Roof", game: "To Life",
      title: "To Life", composer: "Topol y elenco", year: 1971, platform: "Película", lang: 'en',
      sources: busca('Fiddler on the Roof', 'To Life'),
    },
    {
      id: 'mus-oklahoma-surrey', cat: 'mus-clasicos', franchise: "Oklahoma!", game: "The Surrey with the Fringe on Top",
      title: "The Surrey with the Fringe on Top", composer: "Gordon MacRae", year: 1955, platform: "Película", lang: 'en',
      sources: busca('Oklahoma!', 'The Surrey with the Fringe on Top'),
    },
    {
      id: 'mus-oklahoma-people-will-say', cat: 'mus-clasicos', franchise: "Oklahoma!", game: "People Will Say We're in Love",
      title: "People Will Say We're in Love", composer: "Gordon MacRae y Shirley Jones", year: 1955, platform: "Película", lang: 'en',
      sources: busca('Oklahoma!', 'People Will Say We\'re in Love'),
    },
    {
      id: 'mus-oklahoma-title', cat: 'mus-clasicos', franchise: "Oklahoma!", game: "Oklahoma",
      title: "Oklahoma", composer: "Gordon MacRae y elenco", year: 1955, platform: "Película", lang: 'en',
      sources: busca('Oklahoma!', 'Oklahoma'),
    },
    {
      id: 'mus-king-i-getting-to-know-you', cat: 'mus-clasicos', franchise: "The King and I", game: "Getting to Know You",
      title: "Getting to Know You", composer: "Marni Nixon y elenco", year: 1956, platform: "Película", lang: 'en',
      sources: busca('The King and I', 'Getting to Know You'),
    },
    {
      id: 'mus-king-i-hello-young-lovers', cat: 'mus-clasicos', franchise: "The King and I", game: "Hello, Young Lovers",
      title: "Hello, Young Lovers", composer: "Marni Nixon", year: 1956, platform: "Película", lang: 'en',
      sources: busca('The King and I', 'Hello, Young Lovers'),
    },
    {
      id: 'mus-guys-luck-be-a-lady', cat: 'mus-clasicos', franchise: "Guys and Dolls", game: "Luck Be a Lady",
      title: "Luck Be a Lady", composer: "Marlon Brando y elenco", year: 1955, platform: "Película", lang: 'en',
      sources: busca('Guys and Dolls', 'Luck Be a Lady'),
    },
    {
      id: 'mus-guys-sit-down-rockin', cat: 'mus-clasicos', franchise: "Guys and Dolls", game: "Sit Down, You're Rockin' the Boat",
      title: "Sit Down, You're Rockin' the Boat", composer: "Stubby Kaye y elenco", year: 1955, platform: "Película", lang: 'en',
      sources: busca('Guys and Dolls', 'Sit Down, You\'re Rockin\' the Boat'),
    },
    {
      id: 'mus-birdie-put-on-a-happy-face', cat: 'mus-clasicos', franchise: "Bye Bye Birdie", game: "Put on a Happy Face",
      title: "Put on a Happy Face", composer: "Dick Van Dyke", year: 1963, platform: "Película", lang: 'en',
      sources: busca('Bye Bye Birdie', 'Put on a Happy Face'),
    },
    /* ───────────── 70s y 80s (61) ───────────── */
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

        {
      id: 'mus-grease-sandy', cat: 'mus-7080', franchise: "Grease", game: "Sandy",
      title: "Sandy", composer: "John Travolta", year: 1978, platform: "Película", lang: 'en',
      sources: busca('Grease', 'Sandy'),
    },
    {
      id: 'mus-grease-beauty-school', cat: 'mus-7080', franchise: "Grease", game: "Beauty School Dropout",
      title: "Beauty School Dropout", composer: "Frankie Avalon", year: 1978, platform: "Película", lang: 'en',
      sources: busca('Grease', 'Beauty School Dropout'),
    },
    {
      id: 'mus-grease-worse-things', cat: 'mus-7080', franchise: "Grease", game: "There Are Worse Things I Could Do",
      title: "There Are Worse Things I Could Do", composer: "Stockard Channing", year: 1978, platform: "Película", lang: 'en',
      sources: busca('Grease', 'There Are Worse Things I Could Do'),
    },
    {
      id: 'mus-grease-sandra-dee', cat: 'mus-7080', franchise: "Grease", game: "Look at Me, I'm Sandra Dee",
      title: "Look at Me, I'm Sandra Dee", composer: "Stockard Channing", year: 1978, platform: "Película", lang: 'en',
      sources: busca('Grease', 'Look at Me, I\'m Sandra Dee'),
    },
    {
      id: 'mus-grease-freddy-mi-amor', cat: 'mus-7080', franchise: "Grease", game: "Freddy, mi amor",
      title: "Freddy, mi amor", composer: "Timbiriche", year: 1984, platform: "México", lang: 'es',
      aka: ["Freddy, My Love"],
      sources: busca('Grease', 'Freddy, mi amor'),
    },
    {
      id: 'mus-grease-noches-de-verano', cat: 'mus-7080', franchise: "Grease", game: "Noches de verano",
      title: "Noches de verano", composer: "Timbiriche", year: 1984, platform: "México", lang: 'es',
      aka: ["Summer Nights"],
      sources: busca('Grease', 'Noches de verano'),
    },
    {
      id: 'mus-jcs-heaven-on-their-minds', cat: 'mus-7080', franchise: "Jesus Christ Superstar", game: "Heaven on Their Minds",
      title: "Heaven on Their Minds", composer: "Carl Anderson", year: 1973, platform: "Película", lang: 'en',
      sources: busca('Jesus Christ Superstar', 'Heaven on Their Minds'),
    },
    {
      id: 'mus-jcs-everythings-alright', cat: 'mus-7080', franchise: "Jesus Christ Superstar", game: "Everything's Alright",
      title: "Everything's Alright", composer: "Yvonne Elliman, Carl Anderson y Ted Neeley", year: 1973, platform: "Película", lang: 'en',
      sources: busca('Jesus Christ Superstar', 'Everything\'s Alright'),
    },
    {
      id: 'mus-jcs-king-herods-song', cat: 'mus-7080', franchise: "Jesus Christ Superstar", game: "King Herod's Song",
      title: "King Herod's Song", composer: "Josh Mostel", year: 1973, platform: "Película", lang: 'en',
      sources: busca('Jesus Christ Superstar', 'King Herod\'s Song'),
    },
    {
      id: 'mus-rocky-sweet-transvestite', cat: 'mus-7080', franchise: "The Rocky Horror Picture Show", game: "Sweet Transvestite",
      title: "Sweet Transvestite", composer: "Tim Curry", year: 1975, platform: "Película", lang: 'en',
      sources: busca('The Rocky Horror Picture Show', 'Sweet Transvestite'),
    },
    {
      id: 'mus-rocky-science-fiction', cat: 'mus-7080', franchise: "The Rocky Horror Picture Show", game: "Science Fiction/Double Feature",
      title: "Science Fiction/Double Feature", composer: "Richard O'Brien", year: 1975, platform: "Película", lang: 'en',
      sources: busca('The Rocky Horror Picture Show', 'Science Fiction/Double Feature'),
    },
    {
      id: 'mus-rocky-touch-a-touch-me', cat: 'mus-7080', franchise: "The Rocky Horror Picture Show", game: "Touch-a, Touch-a, Touch-a, Touch Me",
      title: "Touch-a, Touch-a, Touch-a, Touch Me", composer: "Susan Sarandon", year: 1975, platform: "Película", lang: 'en',
      sources: busca('The Rocky Horror Picture Show', 'Touch-a, Touch-a, Touch-a, Touch Me'),
    },
    {
      id: 'mus-chicago-roxie', cat: 'mus-7080', franchise: "Chicago", game: "Roxie",
      title: "Roxie", composer: "Renée Zellweger", year: 2002, platform: "Película", lang: 'en',
      sources: busca('Chicago', 'Roxie'),
    },
    {
      id: 'mus-chicago-when-youre-good', cat: 'mus-7080', franchise: "Chicago", game: "When You're Good to Mama",
      title: "When You're Good to Mama", composer: "Queen Latifah", year: 2002, platform: "Película", lang: 'en',
      sources: busca('Chicago', 'When You\'re Good to Mama'),
    },
    {
      id: 'mus-chicago-mister-cellophane', cat: 'mus-7080', franchise: "Chicago", game: "Mister Cellophane",
      title: "Mister Cellophane", composer: "John C. Reilly", year: 2002, platform: "Película", lang: 'en',
      sources: busca('Chicago', 'Mister Cellophane'),
    },
    {
      id: 'mus-chicago-razzle-dazzle', cat: 'mus-7080', franchise: "Chicago", game: "Razzle Dazzle",
      title: "Razzle Dazzle", composer: "Richard Gere", year: 2002, platform: "Película", lang: 'en',
      sources: busca('Chicago', 'Razzle Dazzle'),
    },
    {
      id: 'mus-annie-never-fully-dressed', cat: 'mus-7080', franchise: "Annie", game: "You're Never Fully Dressed Without a Smile",
      title: "You're Never Fully Dressed Without a Smile", composer: "Peter Marshall y las huérfanas", year: 1982, platform: "Película", lang: 'en',
      sources: busca('Annie', 'You\'re Never Fully Dressed Without a Smile'),
    },
    {
      id: 'mus-annie-easy-street', cat: 'mus-7080', franchise: "Annie", game: "Easy Street",
      title: "Easy Street", composer: "Carol Burnett, Tim Curry y Bernadette Peters", year: 1982, platform: "Película", lang: 'en',
      sources: busca('Annie', 'Easy Street'),
    },
    {
      id: 'mus-evita-buenos-aires', cat: 'mus-7080', franchise: "Evita", game: "Buenos Aires",
      title: "Buenos Aires", composer: "Madonna", year: 1996, platform: "Película", lang: 'en',
      sources: busca('Evita', 'Buenos Aires'),
    },
    {
      id: 'mus-evita-another-suitcase', cat: 'mus-7080', franchise: "Evita", game: "Another Suitcase in Another Hall",
      title: "Another Suitcase in Another Hall", composer: "Madonna", year: 1996, platform: "Película", lang: 'en',
      sources: busca('Evita', 'Another Suitcase in Another Hall'),
    },
    {
      id: 'mus-cats-jellicle-songs', cat: 'mus-7080', franchise: "Cats", game: "Jellicle Songs for Jellicle Cats",
      title: "Jellicle Songs for Jellicle Cats", composer: "Elenco original de Londres", year: 1981, platform: "Londres", lang: 'en',
      sources: busca('Cats', 'Jellicle Songs for Jellicle Cats'),
    },
    {
      id: 'mus-cats-mr-mistoffelees', cat: 'mus-7080', franchise: "Cats", game: "Mr. Mistoffelees",
      title: "Mr. Mistoffelees", composer: "Wayne Sleep y elenco", year: 1981, platform: "Londres", lang: 'en',
      sources: busca('Cats', 'Mr. Mistoffelees'),
    },
    {
      id: 'mus-lesmis-bring-him-home', cat: 'mus-7080', franchise: "Les Misérables", game: "Bring Him Home",
      title: "Bring Him Home", composer: "Colm Wilkinson", year: 1985, platform: "Londres", lang: 'en',
      sources: busca('Les Misérables', 'Bring Him Home'),
    },
    {
      id: 'mus-lesmis-stars', cat: 'mus-7080', franchise: "Les Misérables", game: "Stars",
      title: "Stars", composer: "Philip Quast", year: 1985, platform: "Londres", lang: 'en',
      sources: busca('Les Misérables', 'Stars'),
    },
    {
      id: 'mus-lesmis-empty-chairs', cat: 'mus-7080', franchise: "Les Misérables", game: "Empty Chairs at Empty Tables",
      title: "Empty Chairs at Empty Tables", composer: "Michael Ball", year: 1985, platform: "Londres", lang: 'en',
      sources: busca('Les Misérables', 'Empty Chairs at Empty Tables'),
    },
    /* ───────────── 90s y 2000s (52) ───────────── */
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

        {
      id: 'mus-phantom-masquerade', cat: 'mus-9000', franchise: "The Phantom of the Opera", game: "Masquerade",
      title: "Masquerade", composer: "Elenco original de Londres", year: 1986, platform: "Londres", lang: 'en',
      sources: busca('The Phantom of the Opera', 'Masquerade'),
    },
    {
      id: 'mus-phantom-wishing-you-were', cat: 'mus-9000', franchise: "The Phantom of the Opera", game: "Wishing You Were Somehow Here Again",
      title: "Wishing You Were Somehow Here Again", composer: "Sarah Brightman", year: 1986, platform: "Londres", lang: 'en',
      sources: busca('The Phantom of the Opera', 'Wishing You Were Somehow Here Again'),
    },
    {
      id: 'mus-phantom-point-of-no-return', cat: 'mus-9000', franchise: "The Phantom of the Opera", game: "The Point of No Return",
      title: "The Point of No Return", composer: "Michael Crawford y Sarah Brightman", year: 1986, platform: "Londres", lang: 'en',
      sources: busca('The Phantom of the Opera', 'The Point of No Return'),
    },
    {
      id: 'mus-phantom-think-of-me', cat: 'mus-9000', franchise: "The Phantom of the Opera", game: "Think of Me",
      title: "Think of Me", composer: "Sarah Brightman", year: 1986, platform: "Londres", lang: 'en',
      sources: busca('The Phantom of the Opera', 'Think of Me'),
    },
    {
      id: 'mus-rent-out-tonight', cat: 'mus-9000', franchise: "Rent", game: "Out Tonight",
      title: "Out Tonight", composer: "Daphne Rubin-Vega", year: 1996, platform: "Broadway", lang: 'en',
      sources: busca('Rent', 'Out Tonight'),
    },
    {
      id: 'mus-rent-ill-cover-you', cat: 'mus-9000', franchise: "Rent", game: "I'll Cover You",
      title: "I'll Cover You", composer: "Jesse L. Martin y Wilson Jermaine Heredia", year: 1996, platform: "Broadway", lang: 'en',
      sources: busca('Rent', 'I\'ll Cover You'),
    },
    {
      id: 'mus-rent-light-my-candle', cat: 'mus-9000', franchise: "Rent", game: "Light My Candle",
      title: "Light My Candle", composer: "Adam Pascal y Daphne Rubin-Vega", year: 1996, platform: "Broadway", lang: 'en',
      sources: busca('Rent', 'Light My Candle'),
    },
    {
      id: 'mus-rent-la-vie-boheme', cat: 'mus-9000', franchise: "Rent", game: "La Vie Bohème",
      title: "La Vie Bohème", composer: "Elenco original de Broadway", year: 1996, platform: "Broadway", lang: 'en',
      sources: busca('Rent', 'La Vie Bohème'),
    },
    {
      id: 'mus-mamma-sos', cat: 'mus-9000', franchise: "Mamma Mia!", game: "SOS",
      title: "SOS", composer: "Meryl Streep y Pierce Brosnan", year: 2008, platform: "Película", lang: 'en',
      sources: busca('Mamma Mia!', 'SOS'),
    },
    {
      id: 'mus-mamma-take-a-chance', cat: 'mus-9000', franchise: "Mamma Mia!", game: "Take a Chance on Me",
      title: "Take a Chance on Me", composer: "Julie Walters y Stellan Skarsgård", year: 2008, platform: "Película", lang: 'en',
      sources: busca('Mamma Mia!', 'Take a Chance on Me'),
    },
    {
      id: 'mus-mamma-the-winner-takes-it-all', cat: 'mus-9000', franchise: "Mamma Mia!", game: "The Winner Takes It All",
      title: "The Winner Takes It All", composer: "Meryl Streep", year: 2008, platform: "Película", lang: 'en',
      sources: busca('Mamma Mia!', 'The Winner Takes It All'),
    },
    {
      id: 'mus-mamma-honey-honey', cat: 'mus-9000', franchise: "Mamma Mia!", game: "Honey, Honey",
      title: "Honey, Honey", composer: "Amanda Seyfried, Ashley Lilley y Rachel McDowall", year: 2008, platform: "Película", lang: 'en',
      sources: busca('Mamma Mia!', 'Honey, Honey'),
    },
    {
      id: 'mus-mamma-super-trouper', cat: 'mus-9000', franchise: "Mamma Mia!", game: "Super Trouper",
      title: "Super Trouper", composer: "Meryl Streep, Christine Baranski y Julie Walters", year: 2008, platform: "Película", lang: 'en',
      sources: busca('Mamma Mia!', 'Super Trouper'),
    },
    {
      id: 'mus-wicked-the-wizard-and-i', cat: 'mus-9000', franchise: "Wicked", game: "The Wizard and I",
      title: "The Wizard and I", composer: "Idina Menzel y Carole Shelley", year: 2003, platform: "Broadway", lang: 'en',
      sources: busca('Wicked', 'The Wizard and I'),
    },
    {
      id: 'mus-wicked-no-good-deed', cat: 'mus-9000', franchise: "Wicked", game: "No Good Deed",
      title: "No Good Deed", composer: "Idina Menzel", year: 2003, platform: "Broadway", lang: 'en',
      sources: busca('Wicked', 'No Good Deed'),
    },
    {
      id: 'mus-wicked-dancing-through-life', cat: 'mus-9000', franchise: "Wicked", game: "Dancing Through Life",
      title: "Dancing Through Life", composer: "Norbert Leo Butz y elenco", year: 2003, platform: "Broadway", lang: 'en',
      sources: busca('Wicked', 'Dancing Through Life'),
    },
    {
      id: 'mus-wicked-one-short-day', cat: 'mus-9000', franchise: "Wicked", game: "One Short Day",
      title: "One Short Day", composer: "Kristin Chenoweth, Idina Menzel y elenco", year: 2003, platform: "Broadway", lang: 'en',
      sources: busca('Wicked', 'One Short Day'),
    },
    {
      id: 'mus-wicked-as-long-as-youre-mine', cat: 'mus-9000', franchise: "Wicked", game: "As Long as You're Mine",
      title: "As Long as You're Mine", composer: "Idina Menzel y Leo Norbert Butz", year: 2003, platform: "Broadway", lang: 'en',
      sources: busca('Wicked', 'As Long as You\'re Mine'),
    },
    {
      id: 'mus-hairspray-i-can-hear-the-bells', cat: 'mus-9000', franchise: "Hairspray", game: "I Can Hear the Bells",
      title: "I Can Hear the Bells", composer: "Nikki Blonsky", year: 2007, platform: "Película", lang: 'en',
      sources: busca('Hairspray', 'I Can Hear the Bells'),
    },
    {
      id: 'mus-hairspray-welcome-to-the-60s', cat: 'mus-9000', franchise: "Hairspray", game: "Welcome to the 60's",
      title: "Welcome to the 60's", composer: "Nikki Blonsky y John Travolta", year: 2007, platform: "Película", lang: 'en',
      sources: busca('Hairspray', 'Welcome to the 60\'s'),
    },
    {
      id: 'mus-hairspray-without-love', cat: 'mus-9000', franchise: "Hairspray", game: "Without Love",
      title: "Without Love", composer: "Zac Efron, Nikki Blonsky, Elijah Kelley y Amanda Bynes", year: 2007, platform: "Película", lang: 'en',
      sources: busca('Hairspray', 'Without Love'),
    },
    {
      id: 'mus-heights-breathe', cat: 'mus-9000', franchise: "In the Heights", game: "Breathe",
      title: "Breathe", composer: "Mandy Gonzalez", year: 2008, platform: "Broadway", lang: 'en',
      sources: busca('In the Heights', 'Breathe'),
    },
    {
      id: 'mus-heights-96000', cat: 'mus-9000', franchise: "In the Heights", game: "96,000",
      title: "96,000", composer: "Lin-Manuel Miranda y elenco", year: 2008, platform: "Broadway", lang: 'en',
      sources: busca('In the Heights', '96,000'),
    },
    {
      id: 'mus-heights-carnaval-del-barrio', cat: 'mus-9000', franchise: "In the Heights", game: "Carnaval del Barrio",
      title: "Carnaval del Barrio", composer: "Andréa Burns y elenco", year: 2008, platform: "Broadway", lang: 'en',
      sources: busca('In the Heights', 'Carnaval del Barrio'),
    },
    {
      id: 'mus-avenue-q-if-you-were-gay', cat: 'mus-9000', franchise: "Avenue Q", game: "If You Were Gay",
      title: "If You Were Gay", composer: "John Tartaglia y Rick Lyon", year: 2003, platform: "Broadway", lang: 'en',
      sources: busca('Avenue Q', 'If You Were Gay'),
    },
    /* ───────────── 2010 en adelante (53) ───────────── */
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
    {
      id: 'mus-hamilton-wait-for-it', cat: 'mus-10s', franchise: "Hamilton", game: "Wait for It",
      title: "Wait for It", composer: "Leslie Odom, Jr. y elenco", year: 2015, platform: "Broadway", lang: 'en',
      sources: busca('Hamilton', 'Wait for It'),
    },
    {
      id: 'mus-hamilton-the-schuyler-sisters', cat: 'mus-10s', franchise: "Hamilton", game: "The Schuyler Sisters",
      title: "The Schuyler Sisters", composer: "Renée Elise Goldsberry, Phillipa Soo, Jasmine Cephas Jones y elenco", year: 2015, platform: "Broadway", lang: 'en',
      sources: busca('Hamilton', 'The Schuyler Sisters'),
    },
    {
      id: 'mus-hamilton-dear-theodosia', cat: 'mus-10s', franchise: "Hamilton", game: "Dear Theodosia",
      title: "Dear Theodosia", composer: "Lin-Manuel Miranda y Leslie Odom, Jr.", year: 2015, platform: "Broadway", lang: 'en',
      sources: busca('Hamilton', 'Dear Theodosia'),
    },
    {
      id: 'mus-hamilton-burn', cat: 'mus-10s', franchise: "Hamilton", game: "Burn",
      title: "Burn", composer: "Phillipa Soo", year: 2015, platform: "Broadway", lang: 'en',
      sources: busca('Hamilton', 'Burn'),
    },
    {
      id: 'mus-hamilton-the-room-where-it-happens', cat: 'mus-10s', franchise: "Hamilton", game: "The Room Where It Happens",
      title: "The Room Where It Happens", composer: "Leslie Odom, Jr., Lin-Manuel Miranda y elenco", year: 2015, platform: "Broadway", lang: 'en',
      sources: busca('Hamilton', 'The Room Where It Happens'),
    },
    {
      id: 'mus-hamilton-helpless', cat: 'mus-10s', franchise: "Hamilton", game: "Helpless",
      title: "Helpless", composer: "Phillipa Soo y elenco", year: 2015, platform: "Broadway", lang: 'en',
      sources: busca('Hamilton', 'Helpless'),
    },
    {
      id: 'mus-hamilton-non-stop', cat: 'mus-10s', franchise: "Hamilton", game: "Non-Stop",
      title: "Non-Stop", composer: "Lin-Manuel Miranda, Leslie Odom, Jr. y elenco", year: 2015, platform: "Broadway", lang: 'en',
      sources: busca('Hamilton', 'Non-Stop'),
    },
    {
      id: 'mus-hamilton-guns-and-ships', cat: 'mus-10s', franchise: "Hamilton", game: "Guns and Ships",
      title: "Guns and Ships", composer: "Daveed Diggs, Leslie Odom, Jr. y elenco", year: 2015, platform: "Broadway", lang: 'en',
      sources: busca('Hamilton', 'Guns and Ships'),
    },
    {
      id: 'mus-showman-never-enough', cat: 'mus-10s', franchise: "The Greatest Showman", game: "Never Enough",
      title: "Never Enough", composer: "Loren Allred", year: 2017, platform: "Película", lang: 'en',
      sources: busca('The Greatest Showman', 'Never Enough'),
    },
    {
      id: 'mus-showman-from-now-on', cat: 'mus-10s', franchise: "The Greatest Showman", game: "From Now On",
      title: "From Now On", composer: "Hugh Jackman y elenco", year: 2017, platform: "Película", lang: 'en',
      sources: busca('The Greatest Showman', 'From Now On'),
    },
    {
      id: 'mus-showman-the-other-side', cat: 'mus-10s', franchise: "The Greatest Showman", game: "The Other Side",
      title: "The Other Side", composer: "Hugh Jackman y Zac Efron", year: 2017, platform: "Película", lang: 'en',
      sources: busca('The Greatest Showman', 'The Other Side'),
    },
    {
      id: 'mus-showman-come-alive', cat: 'mus-10s', franchise: "The Greatest Showman", game: "Come Alive",
      title: "Come Alive", composer: "Hugh Jackman, Keala Settle, Daniel Everidge y Zendaya", year: 2017, platform: "Película", lang: 'en',
      sources: busca('The Greatest Showman', 'Come Alive'),
    },
    {
      id: 'mus-showman-tightrope', cat: 'mus-10s', franchise: "The Greatest Showman", game: "Tightrope",
      title: "Tightrope", composer: "Michelle Williams", year: 2017, platform: "Película", lang: 'en',
      sources: busca('The Greatest Showman', 'Tightrope'),
    },
    {
      id: 'mus-lalaland-a-lovely-night', cat: 'mus-10s', franchise: "La La Land", game: "A Lovely Night",
      title: "A Lovely Night", composer: "Ryan Gosling y Emma Stone", year: 2016, platform: "Película", lang: 'en',
      sources: busca('La La Land', 'A Lovely Night'),
    },
    {
      id: 'mus-lalaland-someone-in-the-crowd', cat: 'mus-10s', franchise: "La La Land", game: "Someone in the Crowd",
      title: "Someone in the Crowd", composer: "Emma Stone, Callie Hernandez, Sonoya Mizuno y Jessica Rothe", year: 2016, platform: "Película", lang: 'en',
      sources: busca('La La Land', 'Someone in the Crowd'),
    },
    {
      id: 'mus-deh-for-forever', cat: 'mus-10s', franchise: "Dear Evan Hansen", game: "For Forever",
      title: "For Forever", composer: "Ben Platt", year: 2017, platform: "Broadway", lang: 'en',
      sources: busca('Dear Evan Hansen', 'For Forever'),
    },
    {
      id: 'mus-deh-sincerely-me', cat: 'mus-10s', franchise: "Dear Evan Hansen", game: "Sincerely, Me",
      title: "Sincerely, Me", composer: "Mike Faist, Ben Platt y Will Roland", year: 2017, platform: "Broadway", lang: 'en',
      sources: busca('Dear Evan Hansen', 'Sincerely, Me'),
    },
    {
      id: 'mus-deh-words-fail', cat: 'mus-10s', franchise: "Dear Evan Hansen", game: "Words Fail",
      title: "Words Fail", composer: "Ben Platt", year: 2017, platform: "Broadway", lang: 'en',
      sources: busca('Dear Evan Hansen', 'Words Fail'),
    },
    {
      id: 'mus-six-dont-lose-ur-head', cat: 'mus-10s', franchise: "Six", game: "Don't Lose Ur Head",
      title: "Don't Lose Ur Head", composer: "Christina Modestou y elenco", year: 2018, platform: "Londres", lang: 'en',
      sources: busca('Six', 'Don\'t Lose Ur Head'),
    },
    {
      id: 'mus-six-heart-of-stone', cat: 'mus-10s', franchise: "Six", game: "Heart of Stone",
      title: "Heart of Stone", composer: "Natalie Paris y elenco", year: 2018, platform: "Londres", lang: 'en',
      sources: busca('Six', 'Heart of Stone'),
    },
    {
      id: 'mus-six-all-you-wanna-do', cat: 'mus-10s', franchise: "Six", game: "All You Wanna Do",
      title: "All You Wanna Do", composer: "Aimie Atkinson y elenco", year: 2018, platform: "Londres", lang: 'en',
      sources: busca('Six', 'All You Wanna Do'),
    },
    {
      id: 'mus-hadestown-wait-for-me', cat: 'mus-10s', franchise: "Hadestown", game: "Wait for Me",
      title: "Wait for Me", composer: "André De Shields, Reeve Carney y elenco", year: 2019, platform: "Broadway", lang: 'en',
      sources: busca('Hadestown', 'Wait for Me'),
    },
    {
      id: 'mus-hadestown-way-down', cat: 'mus-10s', franchise: "Hadestown", game: "Way Down Hadestown",
      title: "Way Down Hadestown", composer: "Amber Gray, André De Shields y elenco", year: 2019, platform: "Broadway", lang: 'en',
      sources: busca('Hadestown', 'Way Down Hadestown'),
    },
    {
      id: 'mus-hadestown-why-we-build', cat: 'mus-10s', franchise: "Hadestown", game: "Why We Build the Wall",
      title: "Why We Build the Wall", composer: "Patrick Page y elenco", year: 2019, platform: "Broadway", lang: 'en',
      sources: busca('Hadestown', 'Why We Build the Wall'),
    },
    {
      id: 'mus-beetlejuice-dead-mom', cat: 'mus-10s', franchise: "Beetlejuice", game: "Dead Mom",
      title: "Dead Mom", composer: "Sophia Anne Caruso", year: 2019, platform: "Broadway", lang: 'en',
      sources: busca('Beetlejuice', 'Dead Mom'),
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
