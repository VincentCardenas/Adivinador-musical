/*
 * Catálogo: Series de TV (92 pistas).
 * Entradas y temas principales de series, separados por la década en que se estrenaron.
 * Mismo formato que catalog.js; las fuentes se prueban en el orden en que aparecen.
 */
(function (AM) {
  'use strict';

  const apple = (o) => Object.assign({ type: 'itunes' }, o);
  const yt = (id, start) => ({ type: 'youtube', id: id, start: start || 0 });

  AM.CATEGORIES.push(
    { id: 'tv-clasicas', theme: 'series', label: 'Clásicas (antes de 1990)', icon: '📼' },
    { id: 'tv-90s', theme: 'series', label: 'Años 90', icon: '📺' },
    { id: 'tv-00s', theme: 'series', label: '2000s', icon: '💿' },
    { id: 'tv-10s', theme: 'series', label: '2010s', icon: '📱' },
    { id: 'tv-20s', theme: 'series', label: '2020 en adelante', icon: '🍿' },
  );

  AM.CATALOG.push(
    /* ───────────── Clásicas (antes de 1990) (20) ───────────── */
    {
      id: 'tv-cheers-where-everybody-knows-your-name', cat: 'tv-clasicas', franchise: 'Cheers', game: 'Cheers',
      title: 'Where Everybody Knows Your Name', composer: 'Gary Portnoy', year: 1982, platform: 'NBC',
      sources: [apple({ song: 7197543, country: 'mx' })],
    },
    {
      id: 'tv-miami-vice-miami-vice-theme', cat: 'tv-clasicas', franchise: 'Miami Vice', game: 'Miami Vice',
      title: 'Miami Vice Theme', composer: 'Jan Hammer', year: 1984, platform: 'NBC',
      aka: ['División Miami'],
      sources: [apple({ song: 1604292364, country: 'mx' })],
    },
    {
      id: 'tv-el-auto-fantastico-knight-rider-theme', cat: 'tv-clasicas', franchise: 'El auto fantástico', game: 'El auto fantástico',
      title: 'Knight Rider Theme', composer: 'Stu Phillips', year: 1982, platform: 'NBC',
      aka: ['Knight Rider'],
      sources: [apple({ song: 1528121767, country: 'mx' })],
    },
    {
      id: 'tv-brigada-a-the-a-team-theme', cat: 'tv-clasicas', franchise: 'Brigada A', game: 'Brigada A',
      title: 'The A-Team Theme', year: 1983, platform: 'NBC',
      aka: ['The A-Team', 'Los magníficos'],
      sources: [yt('rtpPXPsDQoE'), yt('hZocOGrW5G0')],
    },
    {
      id: 'tv-macgyver-macgyver-theme', cat: 'tv-clasicas', franchise: 'MacGyver', game: 'MacGyver',
      title: 'MacGyver Theme', composer: 'Randy Edelman', year: 1985, platform: 'ABC',
      sources: [yt('yOEe1uzurKo'), yt('1Rb8ER_Whmg')],
    },
    {
      id: 'tv-star-trek-theme-from-star-trek', cat: 'tv-clasicas', franchise: 'Star Trek', game: 'Star Trek',
      title: 'Theme from Star Trek', composer: 'Alexander Courage', year: 1966, platform: 'NBC',
      sources: [apple({ song: 74983818, country: 'mx' })],
    },
    {
      id: 'tv-mision-imposible-mission-impossible-theme', cat: 'tv-clasicas', franchise: 'Misión imposible', game: 'Misión imposible',
      title: 'Mission: Impossible Theme', composer: 'Lalo Schifrin', year: 1966, platform: 'CBS',
      aka: ['Mission: Impossible'],
      sources: [apple({ song: 1444100762, country: 'mx' })],
    },
    {
      id: 'tv-la-dimension-desconocida-the-twilight-zone-theme', cat: 'tv-clasicas', franchise: 'La dimensión desconocida', game: 'La dimensión desconocida',
      title: 'The Twilight Zone Theme', composer: 'Marius Constant', year: 1959, platform: 'CBS',
      aka: ['The Twilight Zone'],
      sources: [yt('9Et-HxKxch4'), yt('wv-d18sbTkY')],
    },
    {
      id: 'tv-batman-1966-batman-theme', cat: 'tv-clasicas', franchise: 'Batman (1966)', game: 'Batman (1966)',
      title: 'Batman Theme', composer: 'Neal Hefti', year: 1966, platform: 'ABC',
      sources: [apple({ song: 466472989, country: 'mx' })],
    },
    {
      id: 'tv-dias-felices-happy-days', cat: 'tv-clasicas', franchise: 'Días felices', game: 'Días felices',
      title: 'Happy Days', composer: 'Pratt y McClain', year: 1974, platform: 'ABC',
      aka: ['Happy Days'],
      sources: [apple({ song: 160975431, country: 'mx' })],
    },
    {
      id: 'tv-los-locos-addams-the-addams-family-theme', cat: 'tv-clasicas', franchise: 'Los locos Addams', game: 'Los locos Addams',
      title: 'The Addams Family Theme', composer: 'Vic Mizzy', year: 1964, platform: 'ABC',
      aka: ['The Addams Family', 'Los Locos Addams'],
      sources: [apple({ song: 400958931, country: 'mx' })],
    },
    {
      id: 'tv-las-chicas-de-oro-thank-you-for-being-a-friend', cat: 'tv-clasicas', franchise: 'Las chicas de oro', game: 'Las chicas de oro',
      title: 'Thank You for Being a Friend', composer: 'Andrew Gold', year: 1985, platform: 'NBC',
      aka: ['The Golden Girls'],
      sources: [apple({ song: 497246623, country: 'mx' })],
    },
    {
      id: 'tv-el-chavo-del-8-the-elephant-never-forgets', cat: 'tv-clasicas', franchise: 'El Chavo del 8', game: 'El Chavo del 8',
      title: 'The Elephant Never Forgets', composer: 'Perrey y Kingsley', year: 1971, platform: 'Televisa',
      aka: ['El Chavo'],
      sources: [apple({ song: 711688736, country: 'mx' })],
    },
    {
      id: 'tv-el-crucero-del-amor-the-love-boat', cat: 'tv-clasicas', franchise: 'El crucero del amor', game: 'El crucero del amor',
      title: 'The Love Boat', composer: 'Jack Jones', year: 1977, platform: 'ABC',
      aka: ['The Love Boat'],
      sources: [apple({ song: 1575828862, country: 'mx' })],
    },
    {
      id: 'tv-tres-por-tres-everywhere-you-look', cat: 'tv-clasicas', franchise: 'Tres por tres', game: 'Tres por tres',
      title: 'Everywhere You Look', composer: 'Jesse Frederick', year: 1987, platform: 'ABC',
      aka: ['Full House'],
      sources: [yt('ClKuPgIqoCU'), yt('jKWnK6sTzvs')],
    },
    {
      id: 'tv-casados-con-hijos-love-and-marriage', cat: 'tv-clasicas', franchise: 'Casados con hijos', game: 'Casados con hijos',
      title: 'Love and Marriage', composer: 'Frank Sinatra', year: 1987, platform: 'Fox',
      aka: ['Married... with Children'],
      sources: [apple({ song: 1440874843, country: 'mx' })],
    },
    {
      id: 'tv-doctor-who-doctor-who-theme', cat: 'tv-clasicas', franchise: 'Doctor Who', game: 'Doctor Who',
      title: 'Doctor Who Theme', composer: 'Ron Grainer', year: 1963, platform: 'BBC',
      sources: [apple({ song: 1554633837, country: 'mx' })],
    },
    {
      id: 'tv-hawaii-five-o', cat: 'tv-clasicas', franchise: 'Hawaii Five-O', game: 'Hawaii Five-O',
      title: 'Hawaii Five-O', composer: 'The Ventures', year: 1968, platform: 'CBS',
      sources: [apple({ song: 844883319, country: 'mx' })],
    },
    {
      id: 'tv-m-a-s-h-suicide-is-painless', cat: 'tv-clasicas', franchise: 'M*A*S*H', game: 'M*A*S*H',
      title: 'Suicide Is Painless', composer: 'The MASH', year: 1972, platform: 'CBS',
      sources: [apple({ song: 1726244068, country: 'mx' })],
    },
    {
      id: 'tv-dallas-dallas-theme', cat: 'tv-clasicas', franchise: 'Dallas', game: 'Dallas',
      title: 'Dallas Theme', composer: 'Jerrold Immel', year: 1978, platform: 'CBS',
      sources: [yt('4vZNWdFd1UM'), yt('8sKX3tWaOew')],
    },
    /* ───────────── Años 90 (17) ───────────── */
    {
      id: 'tv-friends-i-ll-be-there-for-you', cat: 'tv-90s', franchise: 'Friends', game: 'Friends',
      title: 'I\'ll Be There for You', composer: 'The Rembrandts', year: 1994, platform: 'NBC',
      sources: [apple({ song: 1098761080, country: 'mx' })],
    },
    {
      id: 'tv-seinfeld-seinfeld-theme', cat: 'tv-90s', franchise: 'Seinfeld', game: 'Seinfeld',
      title: 'Seinfeld Theme', composer: 'Jonathan Wolff', year: 1989, platform: 'NBC',
      sources: [apple({ song: 1572502517, country: 'mx' })],
    },
    {
      id: 'tv-los-expedientes-secretos-x-the-x-files-theme', cat: 'tv-90s', franchise: 'Los expedientes secretos X', game: 'Los expedientes secretos X',
      title: 'The X-Files Theme', composer: 'Mark Snow y Chris Carter', year: 1993, platform: 'Fox',
      aka: ['The X-Files', 'Expedientes X'],
      sources: [apple({ song: 95844236, country: 'mx' })],
    },
    {
      id: 'tv-twin-peaks-twin-peaks-theme', cat: 'tv-90s', franchise: 'Twin Peaks', game: 'Twin Peaks',
      title: 'Twin Peaks Theme', composer: 'Angelo Badalamenti', year: 1990, platform: 'ABC',
      sources: [apple({ song: 374382372, country: 'mx' })],
    },
    {
      id: 'tv-el-principe-del-rap-the-fresh-prince-of-bel-air', cat: 'tv-90s', franchise: 'El príncipe del rap', game: 'El príncipe del rap',
      title: 'The Fresh Prince of Bel-Air', composer: 'DJ Jazzy Jeff y The Fresh Prince', year: 1990, platform: 'NBC',
      aka: ['The Fresh Prince of Bel-Air'],
      sources: [apple({ song: 308198601, country: 'mx' })],
    },
    {
      id: 'tv-guardianes-de-la-bahia-i-m-always-here', cat: 'tv-90s', franchise: 'Guardianes de la bahía', game: 'Guardianes de la bahía',
      title: 'I\'m Always Here', composer: 'Jim Jamison', year: 1991, platform: 'NBC',
      aka: ['Baywatch'],
      sources: [apple({ song: 1634302459, country: 'mx' })],
    },
    {
      id: 'tv-buffy-la-cazavampiros-buffy-the-vampire-slayer-theme', cat: 'tv-90s', franchise: 'Buffy, la cazavampiros', game: 'Buffy, la cazavampiros',
      title: 'Buffy the Vampire Slayer Theme', composer: 'Nerf Herder', year: 1997, platform: 'The WB',
      aka: ['Buffy the Vampire Slayer'],
      sources: [yt('Ibc6CBRIjnQ'), yt('lk6iJNSv-vY')],
    },
    {
      id: 'tv-dawson-s-creek-i-don-t-want-to-wait', cat: 'tv-90s', franchise: 'Dawson\'s Creek', game: 'Dawson\'s Creek',
      title: 'I Don\'t Want to Wait', composer: 'Paula Cole', year: 1998, platform: 'The WB',
      sources: [apple({ song: 128104411, country: 'mx' })],
    },
    {
      id: 'tv-ally-mcbeal-searchin-my-soul', cat: 'tv-90s', franchise: 'Ally McBeal', game: 'Ally McBeal',
      title: 'Searchin\' My Soul', composer: 'Vonda Shepard', year: 1997, platform: 'Fox',
      sources: [apple({ song: 268055701, country: 'mx' })],
    },
    {
      id: 'tv-frasier-tossed-salad-and-scrambled-eggs', cat: 'tv-90s', franchise: 'Frasier', game: 'Frasier',
      title: 'Tossed Salad and Scrambled Eggs', composer: 'Kelsey Grammer', year: 1993, platform: 'NBC',
      sources: [yt('0DeQDv7P3QY'), yt('ml5U0sKe1mU')],
    },
    {
      id: 'tv-sala-de-urgencias-er-main-theme', cat: 'tv-90s', franchise: 'Sala de urgencias', game: 'Sala de urgencias',
      title: 'ER Main Theme', composer: 'James Newton Howard', year: 1994, platform: 'NBC',
      aka: ['ER'],
      sources: [yt('r3KCM7ldK08'), yt('HBRh8_sW2FQ')],
    },
    {
      id: 'tv-el-show-de-los-70-in-the-street', cat: 'tv-90s', franchise: 'El show de los 70', game: 'El show de los 70',
      title: 'In the Street', composer: 'Cheap Trick', year: 1998, platform: 'Fox',
      aka: ['That \'70s Show'],
      sources: [yt('Uply9BUShPw'), yt('YdDC0XzhOEo')],
    },
    {
      id: 'tv-sex-and-the-city-sex-and-the-city-theme', cat: 'tv-90s', franchise: 'Sex and the City', game: 'Sex and the City',
      title: 'Sex and the City Theme', composer: 'Douglas J. Cuomo', year: 1998, platform: 'HBO',
      sources: [yt('X453aKQgob4'), yt('PKRe-6jAzuc')],
    },
    {
      id: 'tv-los-soprano-woke-up-this-morning', cat: 'tv-90s', franchise: 'Los Soprano', game: 'Los Soprano',
      title: 'Woke Up This Morning', composer: 'Alabama 3', year: 1999, platform: 'HBO',
      aka: ['The Sopranos'],
      sources: [apple({ song: 1726659625, country: 'mx' })],
    },
    {
      id: 'tv-hechiceras-how-soon-is-now', cat: 'tv-90s', franchise: 'Hechiceras', game: 'Hechiceras',
      title: 'How Soon Is Now?', composer: 'Love Spit Love', year: 1998, platform: 'The WB',
      aka: ['Charmed'],
      sources: [yt('fhzw890uU_A'), yt('U_IOTMu5zDE')],
    },
    {
      id: 'tv-power-rangers-go-go-power-rangers', cat: 'tv-90s', franchise: 'Power Rangers', game: 'Power Rangers',
      title: 'Go Go Power Rangers', composer: 'Ron Wasserman', year: 1993, platform: 'Fox Kids',
      aka: ['Mighty Morphin Power Rangers'],
      sources: [apple({ song: 1444118093, country: 'mx' })],
    },
    {
      id: 'tv-betty-la-fea-se-dice-de-mi', cat: 'tv-90s', franchise: 'Betty la fea', game: 'Betty la fea',
      title: 'Se dice de mí', composer: 'Yolanda Rayo', year: 1999, platform: 'RCN',
      aka: ['Yo soy Betty, la fea'],
      sources: [apple({ song: 6807168698, country: 'mx' })],
    },
    /* ───────────── 2000s (23) ───────────── */
    {
      id: 'tv-lost-life-and-death', cat: 'tv-00s', franchise: 'Lost', game: 'Lost',
      title: 'Life and Death', composer: 'Michael Giacchino y Tim Simonec', year: 2004, platform: 'ABC',
      aka: ['Perdidos'],
      sources: [apple({ song: 1446739259, country: 'mx' })],
    },
    {
      id: 'tv-the-office-the-office-theme', cat: 'tv-00s', franchise: 'The Office', game: 'The Office',
      title: 'The Office Theme', composer: 'Jay Ferguson', year: 2005, platform: 'NBC',
      sources: [yt('uyIVAm9PVrI'), yt('4iisysmwB_k')],
    },
    {
      id: 'tv-dr-house-teardrop', cat: 'tv-00s', franchise: 'Dr. House', game: 'Dr. House',
      title: 'Teardrop', composer: 'Massive Attack', year: 2004, platform: 'Fox',
      aka: ['House', 'House M.D.'],
      sources: [apple({ song: 724466700, country: 'mx' })],
    },
    {
      id: 'tv-grey-s-anatomy-cosy-in-the-rocket', cat: 'tv-00s', franchise: 'Grey\'s Anatomy', game: 'Grey\'s Anatomy',
      title: 'Cosy in the Rocket', composer: 'Psapp', year: 2005, platform: 'ABC',
      aka: ['Anatomía de Grey'],
      sources: [apple({ song: 1440913654, country: 'mx' })],
    },
    {
      id: 'tv-how-i-met-your-mother-hey-beautiful', cat: 'tv-00s', franchise: 'How I Met Your Mother', game: 'How I Met Your Mother',
      title: 'Hey Beautiful', composer: 'The Solids', year: 2005, platform: 'CBS',
      aka: ['Cómo conocí a tu madre'],
      sources: [apple({ song: 1506688697, country: 'mx' })],
    },
    {
      id: 'tv-the-big-bang-theory-big-bang-theory-theme', cat: 'tv-00s', franchise: 'The Big Bang Theory', game: 'The Big Bang Theory',
      title: 'Big Bang Theory Theme', composer: 'Barenaked Ladies', year: 2007, platform: 'CBS',
      aka: ['La teoría del Big Bang'],
      sources: [apple({ song: 397826612, country: 'mx' })],
    },
    {
      id: 'tv-smallville-save-me', cat: 'tv-00s', franchise: 'Smallville', game: 'Smallville',
      title: 'Save Me', composer: 'Remy Zero', year: 2001, platform: 'The WB',
      sources: [apple({ song: 36400165, country: 'mx' })],
    },
    {
      id: 'tv-dexter-dexter-main-title', cat: 'tv-00s', franchise: 'Dexter', game: 'Dexter',
      title: 'Dexter Main Title', composer: 'Rolfe Kent', year: 2006, platform: 'Showtime',
      sources: [apple({ song: 1534802065, country: 'mx' })],
    },
    {
      id: 'tv-prison-break-prison-break-main-title', cat: 'tv-00s', franchise: 'Prison Break', game: 'Prison Break',
      title: 'Prison Break Main Title', composer: 'Ramin Djawadi', year: 2005, platform: 'Fox',
      sources: [yt('LVFk2u6b5ZY'), yt('xNmIqwlZE5o')],
    },
    {
      id: 'tv-breaking-bad-breaking-bad-entrada', cat: 'tv-00s', franchise: 'Breaking Bad', game: 'Breaking Bad',
      title: 'Breaking Bad (entrada)', composer: 'Dave Porter', year: 2008, platform: 'AMC',
      sources: [yt('F1HNuAE9WdU'), yt('A35gds8NBws')],
    },
    {
      id: 'tv-malcolm-el-de-en-medio-boss-of-me', cat: 'tv-00s', franchise: 'Malcolm el de en medio', game: 'Malcolm el de en medio',
      title: 'Boss of Me', composer: 'They Might Be Giants', year: 2000, platform: 'Fox',
      aka: ['Malcolm in the Middle'],
      sources: [apple({ song: 1609311990, country: 'mx' })],
    },
    {
      id: 'tv-the-o-c-california', cat: 'tv-00s', franchise: 'The O.C.', game: 'The O.C.',
      title: 'California', composer: 'Phantom Planet', year: 2003, platform: 'Fox',
      sources: [apple({ song: 6794050137, country: 'mx' })],
    },
    {
      id: 'tv-esposas-desesperadas-desperate-housewives-main-title', cat: 'tv-00s', franchise: 'Esposas desesperadas', game: 'Esposas desesperadas',
      title: 'Desperate Housewives Main Title', composer: 'Danny Elfman', year: 2004, platform: 'ABC',
      aka: ['Desperate Housewives', 'Mujeres desesperadas'],
      sources: [apple({ song: 1443207728, country: 'mx' })],
    },
    {
      id: 'tv-hannah-montana-the-best-of-both-worlds', cat: 'tv-00s', franchise: 'Hannah Montana', game: 'Hannah Montana',
      title: 'The Best of Both Worlds', composer: 'Hannah Montana', year: 2006, platform: 'Disney Channel',
      sources: [apple({ song: 1440778789, country: 'mx' })],
    },
    {
      id: 'tv-icarly-leave-it-all-to-me', cat: 'tv-00s', franchise: 'iCarly', game: 'iCarly',
      title: 'Leave It All to Me', composer: 'Miranda Cosgrove', year: 2007, platform: 'Nickelodeon',
      sources: [apple({ song: 324759688, country: 'mx' })],
    },
    {
      id: 'tv-rebelde', cat: 'tv-00s', franchise: 'Rebelde', game: 'Rebelde',
      title: 'Rebelde', composer: 'RBD y Anahí', year: 2004, platform: 'Televisa',
      sources: [apple({ song: 1529353094, country: 'mx' })],
    },
    {
      id: 'tv-mad-men-a-beautiful-mine', cat: 'tv-00s', franchise: 'Mad Men', game: 'Mad Men',
      title: 'A Beautiful Mine', composer: 'RJD2', year: 2007, platform: 'AMC',
      sources: [apple({ song: 1833094991, country: 'mx' })],
    },
    {
      id: 'tv-true-blood-bad-things', cat: 'tv-00s', franchise: 'True Blood', game: 'True Blood',
      title: 'Bad Things', composer: 'Jace Everett', year: 2008, platform: 'HBO',
      sources: [apple({ song: 313613446, country: 'mx' })],
    },
    {
      id: 'tv-scrubs-superman', cat: 'tv-00s', franchise: 'Scrubs', game: 'Scrubs',
      title: 'Superman', composer: 'Lazlo Bane', year: 2001, platform: 'NBC',
      sources: [apple({ song: 1444166874, country: 'mx' })],
    },
    {
      id: 'tv-the-wire-way-down-in-the-hole', cat: 'tv-00s', franchise: 'The Wire', game: 'The Wire',
      title: 'Way Down in the Hole', composer: 'The Blind Boys of Alabama', year: 2002, platform: 'HBO',
      sources: [apple({ song: 1653654676, country: 'mx' })],
    },
    {
      id: 'tv-drake-and-josh-found-a-way', cat: 'tv-00s', franchise: 'Drake & Josh', game: 'Drake & Josh',
      title: 'Found a Way', composer: 'Drake Bell', year: 2004, platform: 'Nickelodeon',
      sources: [apple({ song: 1504745729, country: 'mx' })],
    },
    {
      id: 'tv-sons-of-anarchy-this-life', cat: 'tv-00s', franchise: 'Sons of Anarchy', game: 'Sons of Anarchy',
      title: 'This Life', composer: 'Curtis Stigers y The Forest Rangers', year: 2008, platform: 'FX',
      aka: ['Hijos de la anarquía'],
      sources: [apple({ song: 483007519, country: 'mx' })],
    },
    {
      id: 'tv-los-hechiceros-de-waverly-place-everything-is-not-what-it', cat: 'tv-00s', franchise: 'Los hechiceros de Waverly Place', game: 'Los hechiceros de Waverly Place',
      title: 'Everything Is Not What It Seems', composer: 'Selena Gomez', year: 2007, platform: 'Disney Channel',
      aka: ['Wizards of Waverly Place'],
      sources: [apple({ song: 741203416, country: 'mx' })],
    },
    /* ───────────── 2010s (21) ───────────── */
    {
      id: 'tv-game-of-thrones-main-title', cat: 'tv-10s', franchise: 'Game of Thrones', game: 'Game of Thrones',
      title: 'Main Title', composer: 'Ramin Djawadi', year: 2011, platform: 'HBO',
      aka: ['Juego de tronos'],
      sources: [apple({ song: 1440799057, country: 'mx' })],
    },
    {
      id: 'tv-stranger-things', cat: 'tv-10s', franchise: 'Stranger Things', game: 'Stranger Things',
      title: 'Stranger Things', composer: 'Kyle Dixon y Michael Stein', year: 2016, platform: 'Netflix',
      sources: [apple({ song: 1142771420, country: 'mx' })],
    },
    {
      id: 'tv-westworld-main-title-theme-westworld', cat: 'tv-10s', franchise: 'Westworld', game: 'Westworld',
      title: 'Main Title Theme - Westworld', composer: 'Ramin Djawadi', year: 2016, platform: 'HBO',
      sources: [apple({ song: 1454594563, country: 'mx' })],
    },
    {
      id: 'tv-the-walking-dead-the-walking-dead-main-title', cat: 'tv-10s', franchise: 'The Walking Dead', game: 'The Walking Dead',
      title: 'The Walking Dead Main Title', composer: 'Bear McCreary', year: 2010, platform: 'AMC',
      aka: ['Los muertos vivientes'],
      sources: [apple({ song: 1275301945, country: 'mx' })],
    },
    {
      id: 'tv-peaky-blinders-red-right-hand', cat: 'tv-10s', franchise: 'Peaky Blinders', game: 'Peaky Blinders',
      title: 'Red Right Hand', composer: 'Nick Cave y The Bad Seeds', year: 2013, platform: 'BBC',
      sources: [apple({ song: 1435808593, country: 'mx' })],
    },
    {
      id: 'tv-the-crown-the-crown-main-title', cat: 'tv-10s', franchise: 'The Crown', game: 'The Crown',
      title: 'The Crown Main Title', composer: 'Hans Zimmer', year: 2016, platform: 'Netflix',
      sources: [apple({ song: 1168757720, country: 'mx' })],
    },
    {
      id: 'tv-narcos-tuyo', cat: 'tv-10s', franchise: 'Narcos', game: 'Narcos',
      title: 'Tuyo', composer: 'Rodrigo Amarante', year: 2015, platform: 'Netflix',
      sources: [apple({ song: 1440046431, country: 'mx' })],
    },
    {
      id: 'tv-la-casa-de-papel-my-life-is-going-on', cat: 'tv-10s', franchise: 'La casa de papel', game: 'La casa de papel',
      title: 'My Life Is Going On', composer: 'Cecilia Krull', year: 2017, platform: 'Netflix',
      aka: ['Money Heist'],
      sources: [apple({ song: 1687482201, country: 'mx' })],
    },
    {
      id: 'tv-sherlock-sherlock-main-theme', cat: 'tv-10s', franchise: 'Sherlock', game: 'Sherlock',
      title: 'Sherlock Main Theme', composer: 'David Arnold y Michael Price', year: 2010, platform: 'BBC',
      sources: [yt('RWW7L7hq-38'), yt('Pk2FME6HVdA')],
    },
    {
      id: 'tv-downton-abbey-downton-abbey-the-suite', cat: 'tv-10s', franchise: 'Downton Abbey', game: 'Downton Abbey',
      title: 'Downton Abbey - The Suite', composer: 'John Lunn y The Chamber Orchestra of London', year: 2010, platform: 'ITV',
      sources: [apple({ song: 1619437211, country: 'mx' })],
    },
    {
      id: 'tv-true-detective-far-from-any-road', cat: 'tv-10s', franchise: 'True Detective', game: 'True Detective',
      title: 'Far From Any Road', composer: 'The Handsome Family', year: 2014, platform: 'HBO',
      sources: [apple({ song: 1440871969, country: 'mx' })],
    },
    {
      id: 'tv-better-call-saul-better-call-saul-main-title-theme', cat: 'tv-10s', franchise: 'Better Call Saul', game: 'Better Call Saul',
      title: 'Better Call Saul Main Title Theme', composer: 'Little Barrie', year: 2015, platform: 'AMC',
      sources: [apple({ song: 1042339654, country: 'mx' })],
    },
    {
      id: 'tv-the-mandalorian', cat: 'tv-10s', franchise: 'The Mandalorian', game: 'The Mandalorian',
      title: 'The Mandalorian', composer: 'Ludwig Göransson', year: 2019, platform: 'Disney+',
      sources: [apple({ song: 1486687344, country: 'mx' })],
    },
    {
      id: 'tv-succession-succession-main-title-theme', cat: 'tv-10s', franchise: 'Succession', game: 'Succession',
      title: 'Succession (Main Title Theme)', composer: 'Nicholas Britell', year: 2018, platform: 'HBO',
      sources: [apple({ song: 1500926127, country: 'mx' })],
    },
    {
      id: 'tv-dark-goodbye', cat: 'tv-10s', franchise: 'Dark', game: 'Dark',
      title: 'Goodbye', composer: 'Apparat', year: 2017, platform: 'Netflix',
      sources: [apple({ song: 1348438696, country: 'mx' })],
    },
    {
      id: 'tv-house-of-cards-house-of-cards-main-title-theme', cat: 'tv-10s', franchise: 'House of Cards', game: 'House of Cards',
      title: 'House of Cards Main Title Theme', composer: 'Jeff Beal', year: 2013, platform: 'Netflix',
      sources: [yt('9w-O60x1bYk'), yt('wTJ8ndXFnjQ')],
    },
    {
      id: 'tv-vikingos-if-i-had-a-heart', cat: 'tv-10s', franchise: 'Vikingos', game: 'Vikingos',
      title: 'If I Had a Heart', composer: 'Fever Ray', year: 2013, platform: 'History',
      aka: ['Vikings'],
      sources: [apple({ song: 664996546, country: 'mx' })],
    },
    {
      id: 'tv-orange-is-the-new-black-you-ve-got-time', cat: 'tv-10s', franchise: 'Orange Is the New Black', game: 'Orange Is the New Black',
      title: 'You\'ve Got Time', composer: 'Regina Spektor', year: 2013, platform: 'Netflix',
      sources: [apple({ song: 1440743644, country: 'mx' })],
    },
    {
      id: 'tv-the-witcher-toss-a-coin-to-your-witcher', cat: 'tv-10s', franchise: 'The Witcher', game: 'The Witcher',
      title: 'Toss a Coin to Your Witcher', composer: 'Sonya Belousova y Giona Ostinelli', year: 2019, platform: 'Netflix',
      sources: [apple({ song: 1495203863, country: 'mx' })],
    },
    {
      id: 'tv-yellowstone-yellowstone-theme', cat: 'tv-10s', franchise: 'Yellowstone', game: 'Yellowstone',
      title: 'Yellowstone Theme', composer: 'Brian Tyler', year: 2018, platform: 'Paramount Network',
      sources: [apple({ song: 1422861344, country: 'mx' })],
    },
    {
      id: 'tv-big-little-lies-cold-little-heart', cat: 'tv-10s', franchise: 'Big Little Lies', game: 'Big Little Lies',
      title: 'Cold Little Heart', composer: 'Michael Kiwanuka', year: 2017, platform: 'HBO',
      aka: ['Pequeñas mentiras'],
      sources: [apple({ song: 1440804347, country: 'mx' })],
    },
    /* ───────────── 2020 en adelante (11) ───────────── */
    {
      id: 'tv-el-juego-del-calamar-way-back-then', cat: 'tv-20s', franchise: 'El juego del calamar', game: 'El juego del calamar',
      title: 'Way Back Then', composer: 'Jung Jae Il', year: 2021, platform: 'Netflix',
      aka: ['Squid Game'],
      sources: [apple({ song: 1585115804, country: 'mx' })],
    },
    {
      id: 'tv-merlina-wednesday-main-titles', cat: 'tv-20s', franchise: 'Merlina', game: 'Merlina',
      title: 'Wednesday Main Titles', composer: 'Danny Elfman', year: 2022, platform: 'Netflix',
      aka: ['Wednesday'],
      sources: [apple({ song: 1695245134, country: 'mx' })],
    },
    {
      id: 'tv-the-last-of-us', cat: 'tv-20s', franchise: 'The Last of Us', game: 'The Last of Us',
      title: 'The Last of Us', composer: 'Gustavo Santaolalla', year: 2023, platform: 'HBO',
      sources: [apple({ song: 655118443, country: 'mx' })],
    },
    {
      id: 'tv-severance-severance-main-title-theme', cat: 'tv-20s', franchise: 'Severance', game: 'Severance',
      title: 'Severance (Main Title Theme)', composer: 'Theodore Shapiro', year: 2022, platform: 'Apple TV+',
      aka: ['Separación'],
      sources: [apple({ song: 1608610104, country: 'mx' })],
    },
    {
      id: 'tv-ted-lasso-ted-lasso-theme', cat: 'tv-20s', franchise: 'Ted Lasso', game: 'Ted Lasso',
      title: 'Ted Lasso Theme', composer: 'Marcus Mumford y Tom Howe', year: 2020, platform: 'Apple TV+',
      sources: [apple({ song: 1534329463, country: 'mx' })],
    },
    {
      id: 'tv-bridgerton-bridgerton-main-title', cat: 'tv-20s', franchise: 'Bridgerton', game: 'Bridgerton',
      title: 'Bridgerton Main Title', composer: 'Kris Bowers', year: 2020, platform: 'Netflix',
      sources: [apple({ song: 1750123309, country: 'mx' })],
    },
    {
      id: 'tv-the-white-lotus-aloha', cat: 'tv-20s', franchise: 'The White Lotus', game: 'The White Lotus',
      title: 'Aloha!', composer: 'Cristobal Tapia De Veer', year: 2021, platform: 'HBO',
      sources: [apple({ song: 1575441246, country: 'mx' })],
    },
    {
      id: 'tv-loki-loki-main-title', cat: 'tv-20s', franchise: 'Loki', game: 'Loki',
      title: 'Loki Main Title', composer: 'Natalie Holt', year: 2021, platform: 'Disney+',
      sources: [apple({ song: 1574250179, country: 'mx' })],
    },
    {
      id: 'tv-wandavision-agatha-all-along', cat: 'tv-20s', franchise: 'WandaVision', game: 'WandaVision',
      title: 'Agatha All Along', composer: 'Kristen Anderson-Lopez y Robert Lopez', year: 2021, platform: 'Disney+',
      sources: [apple({ song: 1554957228, country: 'mx' })],
    },
    {
      id: 'tv-only-murders-in-the-building-only-murders-in-the-building', cat: 'tv-20s', franchise: 'Only Murders in the Building', game: 'Only Murders in the Building',
      title: 'Only Murders in the Building Main Title Theme', composer: 'Siddhartha Khosla', year: 2021, platform: 'Hulu',
      aka: ['Solo asesinatos en el edificio'],
      sources: [yt('FxC6qXL6-HQ'), yt('rljU2-GUIJ4')],
    },
    {
      id: 'tv-yellowjackets-no-return', cat: 'tv-20s', franchise: 'Yellowjackets', game: 'Yellowjackets',
      title: 'No Return', composer: 'Craig Wedren y Anna Waronker', year: 2021, platform: 'Showtime',
      sources: [apple({ song: 1603330780, country: 'mx' })],
    },
  );

  // Señuelos: aparecen como opciones incorrectas y en el buscador de Experto.
  AM.EXTRA_GAMES.push(
    { theme: 'series', franchise: 'Bonanza', game: 'Bonanza' },
    { theme: 'series', franchise: 'Columbo', game: 'Columbo' },
    { theme: 'series', franchise: 'Hechizada', game: 'Hechizada' },
    { theme: 'series', franchise: 'Mi bella genio', game: 'Mi bella genio' },
    { theme: 'series', franchise: 'Los Munster', game: 'Los Munster' },
    { theme: 'series', franchise: 'Alf', game: 'Alf' },
    { theme: 'series', franchise: 'Los años maravillosos', game: 'Los años maravillosos' },
    { theme: 'series', franchise: 'Melrose Place', game: 'Melrose Place' },
    { theme: 'series', franchise: 'Sabrina, la bruja adolescente', game: 'Sabrina, la bruja adolescente' },
    { theme: 'series', franchise: 'Glee', game: 'Glee' },
    { theme: 'series', franchise: 'Gossip Girl', game: 'Gossip Girl' },
    { theme: 'series', franchise: 'Modern Family', game: 'Modern Family' },
    { theme: 'series', franchise: 'Euphoria', game: 'Euphoria' },
    { theme: 'series', franchise: 'The Boys', game: 'The Boys' },
    { theme: 'series', franchise: 'Cobra Kai', game: 'Cobra Kai' },
    { theme: 'series', franchise: 'Élite', game: 'Élite' },
    { theme: 'series', franchise: 'Black Mirror', game: 'Black Mirror' },
    { theme: 'series', franchise: 'Outlander', game: 'Outlander' },
    { theme: 'series', franchise: 'Lupin', game: 'Lupin' },
    { theme: 'series', franchise: 'The Bear', game: 'The Bear' },
    { theme: 'series', franchise: 'Andor', game: 'Andor' },
    { theme: 'series', franchise: 'Shōgun', game: 'Shōgun' },
    { theme: 'series', franchise: 'Supernatural', game: 'Supernatural' },
    { theme: 'series', franchise: 'Star Trek', game: 'Star Trek: La nueva generación' },
    { theme: 'series', franchise: 'The Walking Dead', game: 'The Walking Dead: Dead City' },
    { theme: 'series', franchise: 'Game of Thrones', game: 'La casa del dragón' },
  );
})(window.AM = window.AM || {});
