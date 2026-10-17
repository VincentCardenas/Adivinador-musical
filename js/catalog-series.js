/*
 * Catálogo: Series de TV (192 pistas).
 * Entradas y temas principales de series, separados por la década en que se estrenaron.
 * Mismo formato que catalog.js; las fuentes se prueban en el orden en que aparecen.
 */
(function (AM) {
  'use strict';

  const apple = (o) => Object.assign({ type: 'itunes' }, o);
  const yt = (id, start) => ({ type: 'youtube', id: id, start: start || 0 });
  // Busca la pista en Apple Music con cada término, en México y luego en EE. UU.; `match`, `artist` y `album_hint` la validan.
  const buscaTv = (terms, o) => [].concat(terms).reduce((out, term) =>
    out.concat(['mx', 'us'].map((country) => apple(Object.assign({ term: term, country: country }, o)))), []);

  AM.CATEGORIES.push(
    { id: 'tv-clasicas', theme: 'series', label: 'Clásicas (antes de 1990)', icon: '📼' },
    { id: 'tv-90s', theme: 'series', label: 'Años 90', icon: '📺' },
    { id: 'tv-00s', theme: 'series', label: '2000s', icon: '💿' },
    { id: 'tv-10s', theme: 'series', label: '2010s', icon: '📱' },
    { id: 'tv-20s', theme: 'series', label: '2020 en adelante', icon: '🍿' },
  );

  AM.CATALOG.push(
    /* ───────────── Clásicas (antes de 1990) (41) ───────────── */
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
    {
      id: 'tv-la-isla-de-gilligan-the-ballad-of-gilligan-s-isle', cat: 'tv-clasicas', franchise: 'La isla de Gilligan', game: 'La isla de Gilligan',
      title: 'The Ballad of Gilligan\'s Isle', composer: 'The Wellingtons', year: 1964, platform: 'CBS',
      aka: ['Gilligan\'s Island'],
      sources: [yt('TEq5wtFr9e8'), yt('ZdClvI7eBD0')],
    },
    {
      id: 'tv-mi-bella-genio-jeannie', cat: 'tv-clasicas', franchise: 'Mi bella genio', game: 'Mi bella genio',
      title: 'Jeannie', composer: 'Hugo Montenegro', year: 1965, platform: 'NBC',
      aka: ['I Dream of Jeannie'],
      sources: [yt('SU7bAEDJplI'), yt('ND1MXF-svtQ')],
    },
    {
      id: 'tv-el-superagente-86-get-smart-theme', cat: 'tv-clasicas', franchise: 'El superagente 86', game: 'El superagente 86',
      title: 'Get Smart Theme', composer: 'Irving Szathmary', year: 1965, platform: 'NBC',
      aka: ['Get Smart'],
      sources: [yt('o2ObCoCm61s'), yt('voU4ZjyWoSE')],
    },
    {
      id: 'tv-el-show-de-benny-hill-yakety-sax', cat: 'tv-clasicas', franchise: 'El show de Benny Hill', game: 'El show de Benny Hill',
      title: 'Yakety Sax', composer: 'Boots Randolph', year: 1969, platform: 'Thames Television',
      aka: ['The Benny Hill Show', 'Benny Hill'],
      sources: buscaTv('Boots Randolph Yakety Sax', { match: ['Yakety Sax'], artist: ['Boots Randolph'], album_hint: ['Yakety Sax'] }),
    },
    {
      id: 'tv-la-familia-ingalls-little-house-on-the-prairie-theme', cat: 'tv-clasicas', franchise: 'La familia Ingalls', game: 'La familia Ingalls',
      title: 'Little House on the Prairie Theme', composer: 'David Rose', year: 1974, platform: 'NBC',
      aka: ['Little House on the Prairie', 'La pequeña casa en la pradera'],
      sources: [yt('mD2hwsHPBbo')],
    },
    {
      id: 'tv-el-hombre-nuclear-the-six-million-dollar-man-theme', cat: 'tv-clasicas', franchise: 'El hombre nuclear', game: 'El hombre nuclear',
      title: 'The Six Million Dollar Man Theme', composer: 'Oliver Nelson', year: 1974, platform: 'ABC',
      aka: ['The Six Million Dollar Man', 'El hombre de los seis millones de dólares'],
      sources: [yt('0CPJ-AbCsT8'), yt('9pUaeLtXM_A')],
    },
    {
      id: 'tv-la-mujer-maravilla-wonder-woman', cat: 'tv-clasicas', franchise: 'La mujer maravilla', game: 'La mujer maravilla',
      title: 'Wonder Woman', composer: 'Charles Fox y Norman Gimbel', year: 1975, platform: 'ABC',
      aka: ['Wonder Woman'],
      sources: buscaTv(['Charles Fox Wonder Woman', 'Wonder Woman Television\'s Greatest Hits'], { match: ['Wonder Woman', 'Wonder Woman Theme', 'Theme from Wonder Woman'], artist: ['Charles Fox'], album_hint: ['Television\'s Greatest Hits'] }),
    },
    {
      id: 'tv-los-angeles-de-charlie-charlie-s-angels-theme', cat: 'tv-clasicas', franchise: 'Los ángeles de Charlie', game: 'Los ángeles de Charlie',
      title: 'Charlie\'s Angels Theme', composer: 'Jack Elliott y Allyn Ferguson', year: 1976, platform: 'ABC',
      aka: ['Charlie\'s Angels'],
      sources: [yt('Eri_0OgkaZM'), yt('rtaEFOxMPck')],
    },
    {
      id: 'tv-el-increible-hulk-1977-the-lonely-man', cat: 'tv-clasicas', franchise: 'El increíble Hulk (1977)', game: 'El increíble Hulk (1977)',
      title: 'The Lonely Man', composer: 'Joe Harnell', year: 1977, platform: 'CBS',
      aka: ['The Incredible Hulk', 'El increíble Hulk'],
      sources: buscaTv('Joe Harnell Lonely Man', { match: ['The Lonely Man Theme', 'The Lonely Man'], artist: ['Joe Harnell'], album_hint: ['The Incredible Hulk'] }),
    },
    {
      id: 'tv-chips-chips-theme', cat: 'tv-clasicas', franchise: 'CHiPs', game: 'CHiPs',
      title: 'CHiPs Theme', composer: 'John Parker', year: 1977, platform: 'NBC',
      aka: ['CHiPs: Patrulla motorizada', 'Patrulla motorizada'],
      sources: [yt('DjI7zWbQris'), yt('D5-bD372v5s')],
    },
    {
      id: 'tv-blanco-y-negro-it-takes-diff-rent-strokes', cat: 'tv-clasicas', franchise: 'Blanco y negro', game: 'Blanco y negro',
      title: 'It Takes Diff\'rent Strokes', composer: 'Alan Thicke', year: 1978, platform: 'NBC',
      aka: ['Diff\'rent Strokes', 'Arnold'],
      sources: [yt('kK1MhqugRYg'), yt('6jJIVK-daGk')],
    },
    {
      id: 'tv-los-duques-de-hazzard-good-ol-boys', cat: 'tv-clasicas', franchise: 'Los Duques de Hazzard', game: 'Los Duques de Hazzard',
      title: 'Good Ol\' Boys', composer: 'Waylon Jennings', year: 1979, platform: 'CBS',
      aka: ['The Dukes of Hazzard'],
      sources: buscaTv('Waylon Jennings Good Ol\' Boys', { match: ['Theme from The Dukes of Hazzard (Good Ol\' Boys)', 'Good Ol\' Boys'], artist: ['Waylon Jennings'], album_hint: ['Music Man', 'The Dukes of Hazzard'] }),
    },
    {
      id: 'tv-magnum-theme-from-magnum-p-i', cat: 'tv-clasicas', franchise: 'Magnum', game: 'Magnum',
      title: 'Theme from Magnum P.I.', composer: 'Mike Post', year: 1980, platform: 'CBS',
      aka: ['Magnum, P.I.', 'Magnum P.I.'],
      sources: buscaTv('Mike Post Magnum', { match: ['Theme from Magnum P.I.', 'Magnum P.I.', 'Magnum, P.I.'], artist: ['Mike Post'], album_hint: ['Television Theme Songs', 'Television\'s Greatest Hits'] }),
    },
    {
      id: 'tv-luz-de-luna-moonlighting', cat: 'tv-clasicas', franchise: 'Luz de luna', game: 'Luz de luna',
      title: 'Moonlighting', composer: 'Al Jarreau', year: 1985, platform: 'ABC',
      aka: ['Moonlighting'],
      sources: buscaTv('Al Jarreau Moonlighting', { match: ['Moonlighting (Theme)', 'Moonlighting'], artist: ['Al Jarreau'], album_hint: ['Moonlighting'] }),
    },
    {
      id: 'tv-alf-alf-theme', cat: 'tv-clasicas', franchise: 'Alf', game: 'Alf',
      title: 'ALF Theme', composer: 'Alf Clausen', year: 1986, platform: 'NBC',
      aka: ['ALF'],
      sources: [yt('0I_3bu9zgDk'), yt('zD9pEaOqAqw')],
    },
    {
      id: 'tv-el-zorro-1957-zorro-theme', cat: 'tv-clasicas', franchise: 'El Zorro (1957)', game: 'El Zorro (1957)',
      title: 'Zorro Theme', composer: 'Norman Foster y George Bruns', year: 1957, platform: 'ABC',
      aka: ['Zorro', 'El Zorro de Disney'],
      sources: [yt('eSgbxPtyv1U'), yt('lQnle_3KuOE')],
    },
    {
      id: 'tv-el-llanero-solitario-lone-ranger-theme', cat: 'tv-clasicas', franchise: 'El llanero solitario', game: 'El llanero solitario',
      title: 'William Tell Overture (Lone Ranger Theme)', composer: 'Gioachino Rossini', year: 1949, platform: 'ABC',
      aka: ['The Lone Ranger'],
      sources: [yt('p9lf76xOA5k'), yt('hxIuIxqo2So')],
    },
    {
      id: 'tv-los-munster-the-munsters-theme', cat: 'tv-clasicas', franchise: 'Los Munster', game: 'Los Munster',
      title: 'The Munsters Theme', composer: 'Jack Marshall', year: 1964, platform: 'CBS',
      aka: ['The Munsters', 'La familia Monster'],
      sources: [yt('JdrbLvFJkB4'), yt('vgmiBjJFOSA')],
    },
    {
      id: 'tv-kung-fu-kung-fu-theme', cat: 'tv-clasicas', franchise: 'Kung Fu', game: 'Kung Fu',
      title: 'Kung Fu Theme', composer: 'Jim Helms', year: 1972, platform: 'ABC',
      aka: ['Kung Fu (1972)'],
      sources: [yt('mfU8pfUawEE'), yt('T2t-1CPJXYo')],
    },
    {
      id: 'tv-el-chapulin-colorado-baroque-hoedown', cat: 'tv-clasicas', franchise: 'El Chapulín Colorado', game: 'El Chapulín Colorado',
      title: 'Baroque Hoedown (Tema de El Chapulín Colorado)', composer: 'Jean-Jacques Perrey y Gershon Kingsley', year: 1973, platform: 'Televisa',
      aka: ['Chapulín Colorado'],
      sources: [apple({ song: 711739109, country: 'mx' }), yt('N63K43wHz4g')],
    },
    {
      id: 'tv-los-anos-maravillosos-with-a-little-help-from-my-friends', cat: 'tv-clasicas', franchise: 'Los años maravillosos', game: 'Los años maravillosos',
      title: 'With a Little Help from My Friends', composer: 'Joe Cocker', year: 1988, platform: 'ABC',
      aka: ['The Wonder Years'],
      sources: [apple({ song: 1434916256, country: 'mx' })],
    },
    /* ───────────── Años 90 (41) ───────────── */
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
      sources: [yt('PKRe-6jAzuc'), yt('SPXZDbz-8HU')],
    },
    {
      id: 'tv-los-soprano-woke-up-this-morning', cat: 'tv-90s', franchise: 'Los Soprano', game: 'Los Soprano',
      title: 'Woke Up This Morning', composer: 'Alabama 3', year: 1999, platform: 'HBO',
      aka: ['The Sopranos'],
      sources: [apple({ song: 324764558, country: 'mx' }), apple({ song: 1608608752, country: 'mx' }), yt('vy4-VrBbIeo')],
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
    {
      id: 'tv-beverly-hills-90210-beverly-hills-90210-theme', cat: 'tv-90s', franchise: 'Beverly Hills 90210', game: 'Beverly Hills 90210',
      title: 'Beverly Hills, 90210 Theme', composer: 'John E. Davis', year: 1990, platform: 'Fox',
      aka: ['Beverly Hills, 90210', 'Sensación de vivir'],
      sources: [yt('JDOrOMuo-9o')],
    },
    {
      id: 'tv-mr-bean-ecce-homo-qui-est-faba', cat: 'tv-90s', franchise: 'Mr. Bean', game: 'Mr. Bean',
      title: 'Ecce homo qui est faba', composer: 'Howard Goodall', year: 1990, platform: 'ITV',
      aka: ['Mister Bean'],
      sources: [yt('WmtIrkR6O7I'), yt('6Xcn630a-N8'), yt('6C02VhTM8PI')],
    },
    {
      id: 'tv-dinosaurios-dinosaurs-theme', cat: 'tv-90s', franchise: 'Dinosaurios', game: 'Dinosaurios',
      title: 'Dinosaurs Theme', composer: 'Bruce Broughton', year: 1991, platform: 'ABC',
      aka: ['Dinosaurs'],
      sources: [yt('CpSEG64Tq6o'), yt('3jp-1AO32jg')],
    },
    {
      id: 'tv-highlander-princes-of-the-universe', cat: 'tv-90s', franchise: 'Highlander', game: 'Highlander',
      title: 'Princes of the Universe', composer: 'Queen', year: 1992, platform: 'Sindicación',
      aka: ['Highlander: The Series', 'Highlander: El inmortal'],
      sources: buscaTv('Queen Princes of the Universe', { match: ['Princes of the Universe'], artist: ['Queen'], album_hint: ['A Kind of Magic'] }),
    },
    {
      id: 'tv-la-ninera-the-nanny-named-fran', cat: 'tv-90s', franchise: 'La niñera', game: 'La niñera',
      title: 'The Nanny Named Fran', composer: 'Ann Hampton Callaway', year: 1993, platform: 'CBS',
      aka: ['The Nanny'],
      sources: [apple({ song: 1841692170, country: 'mx' }), yt('ijRSfm9CAUI')],
    },
    {
      id: 'tv-corazon-salvaje-corazon-salvaje', cat: 'tv-90s', franchise: 'Corazón salvaje', game: 'Corazón salvaje',
      title: 'Corazón salvaje', composer: 'Mijares', year: 1993, platform: 'Televisa',
      sources: buscaTv('Mijares Corazón salvaje', { match: ['Corazón salvaje'], artist: ['Mijares'], album_hint: ['Encadenado'] }),
    },
    {
      id: 'tv-marimar-marimar', cat: 'tv-90s', franchise: 'Marimar', game: 'Marimar',
      title: 'Marimar', composer: 'Thalía', year: 1994, platform: 'Televisa',
      sources: buscaTv('Thalía Marimar', { match: ['Marimar'], artist: ['Thalía'], album_hint: ['En éxtasis'] }),
    },
    {
      id: 'tv-maria-la-del-barrio-maria-la-del-barrio', cat: 'tv-90s', franchise: 'María la del barrio', game: 'María la del barrio',
      title: 'María la del barrio', composer: 'Thalía', year: 1995, platform: 'Televisa',
      sources: buscaTv('Thalía María la del barrio', { match: ['María la del barrio'], artist: ['Thalía'], album_hint: ['En éxtasis'] }),
    },
    {
      id: 'tv-escalofrios-goosebumps-theme', cat: 'tv-90s', franchise: 'Escalofríos', game: 'Escalofríos',
      title: 'Goosebumps Theme', composer: 'Jack Lenz', year: 1995, platform: 'YTV',
      aka: ['Goosebumps', 'Pesadillas'],
      sources: buscaTv('Jack Lenz Goosebumps', { match: ['Goosebumps Theme', 'Theme from Goosebumps', 'Goosebumps Main Title'], artist: ['Jack Lenz'], album_hint: ['Goosebumps'] }),
    },
    {
      id: 'tv-xena-la-princesa-guerrera-xena-warrior-princess-main-title', cat: 'tv-90s', franchise: 'Xena: la princesa guerrera', game: 'Xena: la princesa guerrera',
      title: 'Xena: Warrior Princess Main Title', composer: 'Joseph LoDuca', year: 1995, platform: 'Sindicación',
      aka: ['Xena: Warrior Princess', 'Xena'],
      sources: [apple({ song: 1444069072, country: 'mx' }), apple({ song: 1444069630, country: 'mx' }), yt('GdTnm6QNzeE')],
    },
    {
      id: 'tv-la-usurpadora-la-usurpadora', cat: 'tv-90s', franchise: 'La usurpadora', game: 'La usurpadora',
      title: 'La usurpadora', composer: 'Pandora', year: 1998, platform: 'Televisa',
      sources: buscaTv('Pandora La usurpadora', { match: ['La usurpadora'], artist: ['Pandora'] }),
    },
    {
      id: 'tv-muneca-brava-cambio-dolor', cat: 'tv-90s', franchise: 'Muñeca brava', game: 'Muñeca brava',
      title: 'Cambio dolor', composer: 'Natalia Oreiro', year: 1998, platform: 'Telefe',
      sources: buscaTv('Natalia Oreiro Cambio dolor', { match: ['Cambio dolor'], artist: ['Natalia Oreiro'], album_hint: ['Natalia Oreiro'] }),
    },
    {
      id: 'tv-clarissa-lo-explica-todo-way-cool', cat: 'tv-90s', franchise: 'Clarissa lo explica todo', game: 'Clarissa lo explica todo',
      title: 'Way Cool (Clarissa Theme)', composer: 'Rachel Sweet', year: 1991, platform: 'Nickelodeon',
      aka: ['Clarissa Explains It All'],
      sources: [yt('y0BerpDmVSE'), yt('DqAmG9A7TBc')],
    },
    {
      id: 'tv-mejorando-la-casa-iron-johns-rock', cat: 'tv-90s', franchise: 'Mejorando la casa', game: 'Mejorando la casa',
      title: 'Iron John\'s Rock', composer: 'Dan Foliart', year: 1991, platform: 'ABC',
      aka: ['Home Improvement'],
      sources: [yt('JoWgn_uzNWE'), yt('gwM3a8QnWOc')],
    },
    {
      id: 'tv-melrose-place-melrose-place-theme', cat: 'tv-90s', franchise: 'Melrose Place', game: 'Melrose Place',
      title: 'Melrose Place Theme', composer: 'Tim Truman', year: 1992, platform: 'Fox',
      sources: [yt('5FoSXRxFYDk')],
    },
    {
      id: 'tv-el-mundo-de-beakman-beakmans-world-theme', cat: 'tv-90s', franchise: 'El mundo de Beakman', game: 'El mundo de Beakman',
      title: 'Beakman\'s World Theme', composer: 'Mark Mothersbaugh', year: 1992, platform: 'TLC / CBS',
      aka: ['Beakman\'s World'],
      sources: [yt('7lXijSAicNM'), yt('ut541DsesD4')],
    },
    {
      id: 'tv-walker-texas-ranger-the-eyes-of-the-ranger', cat: 'tv-90s', franchise: 'Walker, Texas Ranger', game: 'Walker, Texas Ranger',
      title: 'The Eyes of the Ranger', composer: 'Chuck Norris', year: 1993, platform: 'CBS',
      aka: [],
      sources: [yt('NIYZVSElmj4'), yt('AXPQwI4g410')],
    },
    {
      id: 'tv-las-aventuras-de-pete-y-pete-hey-sandy', cat: 'tv-90s', franchise: 'Las aventuras de Pete y Pete', game: 'Las aventuras de Pete y Pete',
      title: 'Hey Sandy', composer: 'Polaris', year: 1993, platform: 'Nickelodeon',
      aka: ['The Adventures of Pete & Pete', 'Pete y Pete'],
      sources: [apple({ song: 79309107, country: 'mx' }), yt('qkGtGt1L6iU')],
    },
    {
      id: 'tv-lois-y-clark-lois-and-clark-main-title', cat: 'tv-90s', franchise: 'Lois y Clark: las nuevas aventuras de Superman', game: 'Lois y Clark: las nuevas aventuras de Superman',
      title: 'Lois & Clark Main Title', composer: 'Jay Gruska', year: 1993, platform: 'ABC',
      aka: ['Lois & Clark: The New Adventures of Superman', 'Lois y Clark'],
      sources: [yt('giTNQ1Q9j74'), yt('5-N3o1IAxFc')],
    },
    {
      id: 'tv-hercules-los-viajes-legendarios-main-title', cat: 'tv-90s', franchise: 'Hércules: los viajes legendarios', game: 'Hércules: los viajes legendarios',
      title: 'Hercules: The Legendary Journeys Main Title', composer: 'Joseph LoDuca', year: 1995, platform: 'Sindicación',
      aka: ['Hercules: The Legendary Journeys'],
      sources: [apple({ song: 1444068891, country: 'mx' }), yt('xmJHe-oifcI')],
    },
    {
      id: 'tv-lazos-de-amor-lazos-de-amor', cat: 'tv-90s', franchise: 'Lazos de amor', game: 'Lazos de amor',
      title: 'Lazos de amor', composer: 'Lucero', year: 1995, platform: 'Televisa',
      sources: [apple({ song: 1484678184, country: 'mx' }), yt('k_2ys901CWk')],
    },
    {
      id: 'tv-sabrina-la-bruja-adolescente-theme', cat: 'tv-90s', franchise: 'Sabrina, la bruja adolescente', game: 'Sabrina, la bruja adolescente',
      title: 'Sabrina the Teenage Witch Theme', composer: 'Danny Lux', year: 1996, platform: 'ABC',
      aka: ['Sabrina the Teenage Witch'],
      sources: [yt('Cz8y2aZ3eN4'), yt('YOU0f0eDLe4')],
    },
    {
      id: 'tv-el-privilegio-de-amar-el-privilegio-de-amar', cat: 'tv-90s', franchise: 'El privilegio de amar', game: 'El privilegio de amar',
      title: 'El privilegio de amar', composer: 'Mijares y Lucero', year: 1998, platform: 'Televisa',
      sources: [apple({ song: 1444036441, country: 'mx' }), yt('hW3pptHt3gM')],
    },
    {
      id: 'tv-rosalinda-rosalinda', cat: 'tv-90s', franchise: 'Rosalinda', game: 'Rosalinda',
      title: 'Rosalinda', composer: 'Thalía', year: 1999, platform: 'Televisa',
      sources: [apple({ song: 724343282, country: 'mx' }), yt('ir2MnpB7wcQ')],
    },
    /* ───────────── 2000s (45) ───────────── */
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
    {
      id: 'tv-gilmore-girls-where-you-lead', cat: 'tv-00s', franchise: 'Gilmore Girls', game: 'Gilmore Girls',
      title: 'Where You Lead', composer: 'Carole King y Louise Goffin', year: 2000, platform: 'The WB',
      aka: ['Las chicas Gilmore', 'Tal para cual'],
      sources: [yt('sKXIoKYDdo4'), apple({ song: 1139003043, country: 'mx' })],
    },
    {
      id: 'tv-csi-en-la-escena-del-crimen-who-are-you', cat: 'tv-00s', franchise: 'CSI: En la escena del crimen', game: 'CSI: En la escena del crimen',
      title: 'Who Are You', composer: 'The Who', year: 2000, platform: 'CBS',
      aka: ['CSI', 'CSI: Crime Scene Investigation', 'CSI: Las Vegas'],
      sources: [yt('2ysZk_KMXUE'), yt('Qh8SsaCWY-s')],
    },
    {
      id: 'tv-monk-it-s-a-jungle-out-there', cat: 'tv-00s', franchise: 'Monk', game: 'Monk',
      title: 'It\'s a Jungle Out There', composer: 'Randy Newman', year: 2002, platform: 'USA Network',
      sources: buscaTv('Randy Newman It\'s a Jungle Out There', { match: ['It\'s a Jungle Out There'], artist: ['Randy Newman'], album_hint: ['Monk'] }),
    },
    {
      id: 'tv-lizzie-mcguire-if-you-believe', cat: 'tv-00s', franchise: 'Lizzie McGuire', game: 'Lizzie McGuire',
      title: 'If You Believe (Lizzie McGuire Theme)', composer: 'Elliot Lurie', year: 2001, platform: 'Disney Channel',
      sources: [yt('n_TO9E3ugLM'), yt('QKDqLVxpq7o')],
    },
    {
      id: 'tv-dos-hombres-y-medio-manly-men', cat: 'tv-00s', franchise: 'Dos hombres y medio', game: 'Dos hombres y medio',
      title: 'Manly Men', composer: 'Chuck Lorre, Lee Aronsohn y Grant Geissman', year: 2003, platform: 'CBS',
      aka: ['Two and a Half Men'],
      sources: [yt('bl5q4AIGGZQ'), yt('ObEc39sdrtA')],
    },
    {
      id: 'tv-es-tan-raven-thats-so-raven', cat: 'tv-00s', franchise: 'Es tan Raven', game: 'Es tan Raven',
      title: 'That\'s So Raven', composer: 'Raven-Symoné', year: 2003, platform: 'Disney Channel',
      aka: ['That\'s So Raven'],
      sources: [apple({ song: 1542833542, country: 'mx' }), yt('gpH_PIqT-q8')],
    },
    {
      id: 'tv-amor-real-amor-real', cat: 'tv-00s', franchise: 'Amor real', game: 'Amor real',
      title: 'Amor real', composer: 'Sin Bandera', year: 2003, platform: 'Televisa',
      sources: [apple({ song: 268500737, country: 'mx' }), yt('ULz5Sxbte6E')],
    },
    {
      id: 'tv-pasion-de-gavilanes-fiera-inquieta', cat: 'tv-00s', franchise: 'Pasión de gavilanes', game: 'Pasión de gavilanes',
      title: 'Fiera inquieta', composer: 'Ángela María Forero', year: 2003, platform: 'Telemundo / Caracol',
      sources: [yt('gS5yUIwI9U8'), yt('EfE3UbHfgR4')],
    },
    {
      id: 'tv-manual-de-ned-i-make-my-own-rules', cat: 'tv-00s', franchise: 'Manual de supervivencia escolar de Ned', game: 'Manual de supervivencia escolar de Ned',
      title: 'I Make My Own Rules', composer: 'Lyle Workman', year: 2004, platform: 'Nickelodeon',
      aka: ['Ned\'s Declassified School Survival Guide', 'El manual de Ned'],
      sources: [yt('s9Z6HlgX9jc'), yt('yUzVIE3VFO8')],
    },
    {
      id: 'tv-rubi-la-descarada', cat: 'tv-00s', franchise: 'Rubí', game: 'Rubí',
      title: 'La descarada', composer: 'Reyli Barba', year: 2004, platform: 'Televisa',
      sources: [apple({ song: 355620707, country: 'mx' }), yt('J-Az8MrpXps')],
    },
    {
      id: 'tv-supernatural-carry-on-wayward-son', cat: 'tv-00s', franchise: 'Supernatural', game: 'Supernatural',
      title: 'Carry On Wayward Son', composer: 'Kansas', year: 2005, platform: 'The WB / The CW',
      aka: ['Sobrenatural'],
      sources: [apple({ song: 190655992, country: 'mx' }), yt('2X_2IdybTV0')],
    },
    {
      id: 'tv-zoey-101-follow-me', cat: 'tv-00s', franchise: 'Zoey 101', game: 'Zoey 101',
      title: 'Follow Me', composer: 'Jamie Lynn Spears', year: 2005, platform: 'Nickelodeon',
      sources: [yt('YquxXthted4'), yt('uTgUwMWBeJk')],
    },
    {
      id: 'tv-zack-y-cody-here-i-am', cat: 'tv-00s', franchise: 'Zack y Cody: gemelos en acción', game: 'Zack y Cody: gemelos en acción',
      title: 'Here I Am', composer: 'Loren Ellis y Drew Seeley', year: 2005, platform: 'Disney Channel',
      aka: ['The Suite Life of Zack & Cody', 'Zack y Cody'],
      sources: [yt('_9dYvfao6WY')],
    },
    {
      id: 'tv-la-madrastra-viveme', cat: 'tv-00s', franchise: 'La madrastra', game: 'La madrastra',
      title: 'Víveme', composer: 'Laura Pausini', year: 2005, platform: 'Televisa',
      sources: [apple({ song: 128216290, country: 'mx' }), yt('fR_WnjBp9i8')],
    },
    {
      id: 'tv-fea-mas-bella-el-club-de-las-feas', cat: 'tv-00s', franchise: 'La fea más bella', game: 'La fea más bella',
      title: 'El club de las feas', composer: 'Banda El Recodo', year: 2006, platform: 'Televisa',
      sources: [apple({ song: 1444016967, country: 'mx' }), yt('XLkdwxql3BE')],
    },
    {
      id: 'tv-gossip-girl-main-title', cat: 'tv-00s', franchise: 'Gossip Girl', game: 'Gossip Girl',
      title: 'Gossip Girl Main Title', composer: 'Transcenders', year: 2007, platform: 'The CW',
      aka: ['Chica indiscreta'],
      sources: [yt('1aiBSo0NkcE')],
    },
    {
      id: 'tv-destilando-amor-por-amarte', cat: 'tv-00s', franchise: 'Destilando amor', game: 'Destilando amor',
      title: 'Por amarte', composer: 'Pepe Aguilar', year: 2007, platform: 'Televisa',
      sources: [apple({ song: 1713953063, country: 'mx' }), yt('ZoEdZ4E7Tn0')],
    },
    {
      id: 'tv-fuego-en-la-sangre-para-siempre', cat: 'tv-00s', franchise: 'Fuego en la sangre', game: 'Fuego en la sangre',
      title: 'Para siempre', composer: 'Vicente Fernández', year: 2008, platform: 'Televisa',
      sources: [apple({ song: 264215071, country: 'mx' }), yt('e33Z2BPKwxE')],
    },
    {
      id: 'tv-glee-dont-stop-believin', cat: 'tv-00s', franchise: 'Glee', game: 'Glee',
      title: 'Don\'t Stop Believin\'', composer: 'Glee Cast', year: 2009, platform: 'Fox',
      sources: [apple({ song: 347886835, country: 'mx' }), yt('ZwgmmcKSSaU')],
    },
    {
      id: 'tv-modern-family-main-title', cat: 'tv-00s', franchise: 'Modern Family', game: 'Modern Family',
      title: 'Modern Family Theme', composer: 'Gabriel Mann', year: 2009, platform: 'ABC',
      aka: ['Familia moderna'],
      sources: [yt('8baceGL07Gs'), yt('1e4yQm7J3jE')],
    },
    {
      id: 'tv-sunny-entre-estrellas-so-far-so-great', cat: 'tv-00s', franchise: 'Sunny, entre estrellas', game: 'Sunny, entre estrellas',
      title: 'So Far So Great', composer: 'Demi Lovato', year: 2009, platform: 'Disney Channel',
      aka: ['Sonny with a Chance'],
      sources: [apple({ song: 1445739394, country: 'mx' }), yt('nHUFqsv5RZ8')],
    },
    {
      id: 'tv-big-time-rush-big-time-rush', cat: 'tv-00s', franchise: 'Big Time Rush', game: 'Big Time Rush',
      title: 'Big Time Rush', composer: 'Big Time Rush', year: 2009, platform: 'Nickelodeon',
      sources: [yt('SN_MY9uDUEw')],
    },
    /* ───────────── 2010s (40) ───────────── */
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
    {
      id: 'tv-victorious-make-it-shine', cat: 'tv-10s', franchise: 'Victorious', game: 'Victorious',
      title: 'Make It Shine', composer: 'Victoria Justice', year: 2010, platform: 'Nickelodeon',
      sources: [apple({ song: 6777916665, country: 'mx' }), yt('nfCDhU1L-Pw')],
    },
    {
      id: 'tv-buena-suerte-charlie-hang-in-there-baby', cat: 'tv-10s', franchise: 'Buena suerte, Charlie', game: 'Buena suerte, Charlie',
      title: 'Hang In There Baby', composer: 'Bridgit Mendler', year: 2010, platform: 'Disney Channel',
      aka: ['Good Luck Charlie'],
      sources: [apple({ song: 1443545641, country: 'mx' }), yt('Ugjzkw1LYxA')],
    },
    {
      id: 'tv-a-todo-ritmo-shake-it-up', cat: 'tv-10s', franchise: 'A todo ritmo', game: 'A todo ritmo',
      title: 'Shake It Up', composer: 'Selena Gomez', year: 2010, platform: 'Disney Channel',
      aka: ['Shake It Up'],
      sources: [apple({ song: 1445849098, country: 'mx' }), yt('CmHhE7woSpM')],
    },
    {
      id: 'tv-teresa-esa-hembra-es-mala', cat: 'tv-10s', franchise: 'Teresa', game: 'Teresa',
      title: 'Esa hembra es mala', composer: 'Gloria Trevi', year: 2010, platform: 'Televisa',
      sources: [apple({ song: 1445156615, country: 'mx' }), yt('Co1SLTz1bDM')],
    },
    {
      id: 'tv-black-mirror-opening-theme', cat: 'tv-10s', franchise: 'Black Mirror', game: 'Black Mirror',
      title: 'Black Mirror Opening Theme', composer: 'Jon Opstad', year: 2011, platform: 'Channel 4 / Netflix',
      sources: [yt('o4x1Q9Apg8o')],
    },
    {
      id: 'tv-jessie-hey-jessie', cat: 'tv-10s', franchise: 'Jessie', game: 'Jessie',
      title: 'Hey Jessie', composer: 'Debby Ryan', year: 2011, platform: 'Disney Channel',
      sources: [apple({ song: 1443545635, country: 'mx' }), yt('d5SYWpQOAFE')],
    },
    {
      id: 'tv-austin-y-ally-cant-do-it-without-you', cat: 'tv-10s', franchise: 'Austin y Ally', game: 'Austin y Ally',
      title: 'Can\'t Do It Without You', composer: 'Ross Lynch', year: 2011, platform: 'Disney Channel',
      aka: ['Austin & Ally'],
      sources: [yt('hHxxDM-43v0'), yt('hraM3pBE1dU')],
    },
    {
      id: 'tv-violetta-en-mi-mundo', cat: 'tv-10s', franchise: 'Violetta', game: 'Violetta',
      title: 'En mi mundo', composer: 'Martina Stoessel', year: 2012, platform: 'Disney Channel',
      sources: [apple({ song: 1532928769, country: 'mx' }), yt('YJBe8ftC4oI')],
    },
    {
      id: 'tv-amores-verdaderos-no-me-compares', cat: 'tv-10s', franchise: 'Amores verdaderos', game: 'Amores verdaderos',
      title: 'No me compares', composer: 'Alejandro Sanz', year: 2012, platform: 'Televisa',
      sources: [apple({ song: 1443236410, country: 'mx' }), yt('vpUDf_ITZLg')],
    },
    {
      id: 'tv-abismo-de-pasion-solo-un-suspiro', cat: 'tv-10s', franchise: 'Abismo de pasión', game: 'Abismo de pasión',
      title: 'Solo un suspiro', composer: 'Óscar Cruz y Alejandra Orozco', year: 2012, platform: 'Televisa',
      sources: [yt('h53LsTsExoM'), yt('Lveojy88EeA')],
    },
    {
      id: 'tv-liv-y-maddie-better-in-stereo', cat: 'tv-10s', franchise: 'Liv y Maddie', game: 'Liv y Maddie',
      title: 'Better in Stereo', composer: 'Dove Cameron', year: 2013, platform: 'Disney Channel',
      aka: ['Liv and Maddie'],
      sources: [apple({ song: 1444220584, country: 'mx' }), yt('B1Yior3umyI')],
    },
    {
      id: 'tv-lo-que-la-vida-me-robo-el-perdedor', cat: 'tv-10s', franchise: 'Lo que la vida me robó', game: 'Lo que la vida me robó',
      title: 'El perdedor', composer: 'Enrique Iglesias y Marco Antonio Solís', year: 2013, platform: 'Televisa',
      sources: [apple({ song: 1440819823, country: 'mx' }), yt('tLcfAnN2QgY')],
    },
    {
      id: 'tv-outlander-the-skye-boat-song', cat: 'tv-10s', franchise: 'Outlander', game: 'Outlander',
      title: 'The Skye Boat Song', composer: 'Bear McCreary (feat. Raya Yarbrough)', year: 2014, platform: 'Starz',
      aka: ['Forastera'],
      sources: [yt('9y_Va7k37h4'), apple({ song: 1029187185, country: 'mx' })],
    },
    {
      id: 'tv-soy-luna-alas', cat: 'tv-10s', franchise: 'Soy Luna', game: 'Soy Luna',
      title: 'Alas', composer: 'Karol Sevilla', year: 2016, platform: 'Disney Channel',
      sources: [apple({ song: 1879593895, country: 'mx' }), yt('yFchuO_Vovc')],
    },
    {
      id: 'tv-cobra-kai-awaken', cat: 'tv-10s', franchise: 'Cobra Kai', game: 'Cobra Kai',
      title: 'Awaken (Cobra Kai Main Theme)', composer: 'Leo Birenberg y Zach Robinson', year: 2018, platform: 'YouTube Red / Netflix',
      sources: [yt('uCtOIOZ7b8s'), yt('UUsBiOSTQ6E')],
    },
    {
      id: 'tv-elite-opening-theme', cat: 'tv-10s', franchise: 'Élite', game: 'Élite',
      title: 'Élite Opening Theme', composer: 'Lucas Vidal', year: 2018, platform: 'Netflix',
      aka: ['Elite'],
      sources: [yt('OwP77tioj98')],
    },
    {
      id: 'tv-luis-miguel-la-serie-cuando-calienta-el-sol', cat: 'tv-10s', franchise: 'Luis Miguel: la serie', game: 'Luis Miguel: la serie',
      title: 'Cuando calienta el sol', composer: 'Diego Boneta', year: 2018, platform: 'Netflix',
      aka: ['Luis Miguel'],
      sources: [apple({ song: 1398090229, country: 'mx' }), yt('7uGizHFs_lE')],
    },
    {
      id: 'tv-the-boys-main-theme', cat: 'tv-10s', franchise: 'The Boys', game: 'The Boys',
      title: 'Translucent Alive', composer: 'Christopher Lennertz', year: 2019, platform: 'Prime Video',
      sources: [yt('1-4cnsq6Mx0'), yt('qUe74ZJEp34')],
    },
    {
      id: 'tv-euphoria-still-dont-know-my-name', cat: 'tv-10s', franchise: 'Euphoria', game: 'Euphoria',
      title: 'Still Don\'t Know My Name', composer: 'Labrinth', year: 2019, platform: 'HBO',
      aka: ['Euforia'],
      sources: [apple({ song: 1481092695, country: 'mx' }), yt('fq8ZkL3-8Kg')],
    },
    /* ───────────── 2020 en adelante (25) ───────────── */
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
    {
      id: 'tv-gambito-de-dama-main-title', cat: 'tv-20s', franchise: 'Gambito de dama', game: 'Gambito de dama',
      title: 'Main Title (The Queen\'s Gambit)', composer: 'Carlos Rafael Rivera', year: 2020, platform: 'Netflix',
      aka: ['The Queen\'s Gambit'],
      sources: [apple({ song: 1658426690, country: 'mx' }), yt('gXtmCdWd1Cs')],
    },
    {
      id: 'tv-emily-en-paris-main-title', cat: 'tv-20s', franchise: 'Emily en París', game: 'Emily en París',
      title: 'Emily in Paris Main Title', composer: 'James Newton Howard', year: 2020, platform: 'Netflix',
      aka: ['Emily in Paris'],
      sources: [yt('cSSGIS3rDrM'), yt('yMpD1iOmFtw')],
    },
    {
      id: 'tv-lupin-main-theme', cat: 'tv-20s', franchise: 'Lupin', game: 'Lupin',
      title: 'Arsène (Lupin Main Theme)', composer: 'Mathieu Lamboley', year: 2021, platform: 'Netflix',
      sources: [apple({ song: 1658411858, country: 'mx' }), yt('LqLISfd8s1M')],
    },
    {
      id: 'tv-el-libro-de-boba-fett-theme', cat: 'tv-20s', franchise: 'El libro de Boba Fett', game: 'El libro de Boba Fett',
      title: 'The Book of Boba Fett', composer: 'Ludwig Göransson', year: 2021, platform: 'Disney+',
      aka: ['The Book of Boba Fett'],
      sources: [apple({ song: 1606019321, country: 'mx' }), yt('3a0tH0fkvW8')],
    },
    {
      id: 'tv-la-casa-del-dragon-main-title', cat: 'tv-20s', franchise: 'Game of Thrones', game: 'La casa del dragón',
      title: 'House of the Dragon (Main Title)', composer: 'Ramin Djawadi', year: 2022, platform: 'HBO',
      aka: ['House of the Dragon'],
      sources: [yt('MvEKGxyJ9Vg'), yt('HIblsDVSq_k')],
    },
    {
      id: 'tv-los-anillos-de-poder-main-title', cat: 'tv-20s', franchise: 'El Señor de los Anillos: los Anillos de Poder', game: 'El Señor de los Anillos: los Anillos de Poder',
      title: 'The Lord of the Rings: The Rings of Power Main Title', composer: 'Howard Shore', year: 2022, platform: 'Prime Video',
      aka: ['The Lord of the Rings: The Rings of Power', 'Los Anillos de Poder'],
      sources: [apple({ song: 1647431758, country: 'mx' }), yt('F1efWC-qEjM')],
    },
    {
      id: 'tv-andor-main-title-theme', cat: 'tv-20s', franchise: 'Andor', game: 'Andor',
      title: 'Andor (Main Title Theme)', composer: 'Nicholas Britell', year: 2022, platform: 'Disney+',
      aka: ['Star Wars: Andor'],
      sources: [apple({ song: 1652582783, country: 'mx' }), yt('73fQOkfHk8Q')],
    },
    {
      id: 'tv-the-bear-new-noise', cat: 'tv-20s', franchise: 'The Bear', game: 'The Bear',
      title: 'New Noise', composer: 'Refused', year: 2022, platform: 'FX / Hulu',
      aka: ['El oso'],
      sources: [apple({ song: 1485027943, country: 'mx' }), yt('NkAe30aEG5c')],
    },
    {
      id: 'tv-moon-knight-main-theme', cat: 'tv-20s', franchise: 'Moon Knight', game: 'Moon Knight',
      title: 'Moon Knight', composer: 'Hesham Nazih', year: 2022, platform: 'Disney+',
      aka: ['Caballero Luna'],
      sources: [apple({ song: 1620595966, country: 'mx' }), yt('2uJYMlMdqeI')],
    },
    {
      id: 'tv-obi-wan-kenobi-main-theme', cat: 'tv-20s', franchise: 'Obi-Wan Kenobi', game: 'Obi-Wan Kenobi',
      title: 'Obi-Wan', composer: 'John Williams', year: 2022, platform: 'Disney+',
      aka: ['Star Wars: Obi-Wan Kenobi'],
      sources: [apple({ song: 1631245338, country: 'mx' }), yt('HLn8e3aU7eI')],
    },
    {
      id: 'tv-one-piece-live-action-wealth-fame-power', cat: 'tv-20s', franchise: 'One Piece (serie de TV)', game: 'One Piece (serie de TV)',
      title: 'Wealth Fame Power', composer: 'Sonya Belousova y Giona Ostinelli', year: 2023, platform: 'Netflix',
      aka: ['One Piece Live Action'],
      sources: [apple({ song: 1701004772, country: 'mx' }), yt('i9mci2uWBjg')],
    },
    {
      id: 'tv-ahsoka-main-theme', cat: 'tv-20s', franchise: 'Ahsoka', game: 'Ahsoka',
      title: 'Ahsoka - End Credits', composer: 'Kevin Kiner', year: 2023, platform: 'Disney+',
      aka: ['Star Wars: Ahsoka'],
      sources: [apple({ song: 1703626445, country: 'mx' }), yt('uF5IPOEFndw')],
    },
    {
      id: 'tv-shogun-main-title', cat: 'tv-20s', franchise: 'Shōgun', game: 'Shōgun',
      title: 'Shōgun Main Title', composer: 'Atticus Ross, Leopold Ross y Nick Chuba', year: 2024, platform: 'FX',
      aka: ['Shogun'],
      sources: [apple({ song: 1730619131, country: 'mx' }), yt('wjZ_nkI08b4')],
    },
    {
      id: 'tv-fallout-i-dont-want-to-set-the-world-on-fire', cat: 'tv-20s', franchise: 'Fallout (serie de TV)', game: 'Fallout (serie de TV)',
      title: 'I Don\'t Want to Set the World on Fire', composer: 'The Ink Spots', year: 2024, platform: 'Prime Video',
      aka: ['Fallout'],
      sources: [apple({ song: 1682355393, country: 'mx' }), yt('TmIwm5RElRs')],
    },
  );

  // Señuelos: aparecen como opciones incorrectas y en el buscador de Experto.
  AM.EXTRA_GAMES.push(
    { theme: 'series', franchise: 'Bonanza', game: 'Bonanza' },
    { theme: 'series', franchise: 'Columbo', game: 'Columbo' },
    { theme: 'series', franchise: 'Hechizada', game: 'Hechizada' },
    { theme: 'series', franchise: 'Star Trek', game: 'Star Trek: La nueva generación' },
    { theme: 'series', franchise: 'The Walking Dead', game: 'The Walking Dead: Dead City' },
  );
})(window.AM = window.AM || {});
