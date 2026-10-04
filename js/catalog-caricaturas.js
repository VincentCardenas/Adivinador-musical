/*
 * Catálogo: Caricaturas (76 pistas).
 * Entradas de caricaturas por época. Cuando existe, suena primero la entrada en español latino (YouTube) y el preview oficial de Apple queda de respaldo.
 * Mismo formato que catalog.js; las fuentes se prueban en el orden en que aparecen.
 */
(function (AM) {
  'use strict';

  const apple = (o) => Object.assign({ type: 'itunes' }, o);
  const yt = (id, start) => ({ type: 'youtube', id: id, start: start || 0 });

  AM.CATEGORIES.push(
    { id: 'toon-clasicas', theme: 'caricaturas', label: 'Clásicas (antes de 1980)', icon: '🎞️' },
    { id: 'toon-80s', theme: 'caricaturas', label: 'Años 80', icon: '🕹️' },
    { id: 'toon-90s', theme: 'caricaturas', label: 'Años 90', icon: '📼' },
    { id: 'toon-00s', theme: 'caricaturas', label: '2000s', icon: '💿' },
    { id: 'toon-10s', theme: 'caricaturas', label: '2010 en adelante', icon: '📱' },
  );

  AM.CATALOG.push(
    /* ───────────── Clásicas (antes de 1980) (12) ───────────── */
    {
      id: 'toon-los-picapiedra-los-picapiedra-tema', cat: 'toon-clasicas', franchise: 'Los Picapiedra', game: 'Los Picapiedra',
      title: 'Los Picapiedra (tema)', composer: 'Hoyt Curtin', year: 1960, platform: 'Hanna-Barbera',
      aka: ['The Flintstones'],
      sources: [yt('wFfT7X87uX8'), yt('N6q9iDvJTv8'), apple({ song: 461579583, country: 'mx' })],
    },
    {
      id: 'toon-los-supersonicos-los-supersonicos-tema', cat: 'toon-clasicas', franchise: 'Los Supersónicos', game: 'Los Supersónicos',
      title: 'Los Supersónicos (tema)', composer: 'Hoyt Curtin', year: 1962, platform: 'Hanna-Barbera',
      aka: ['The Jetsons'],
      sources: [yt('awMumkhBMUM'), yt('UXSZX-hNWWs')],
    },
    {
      id: 'toon-scooby-doo-donde-estas-scooby-doo-donde-estas-tema', cat: 'toon-clasicas', franchise: 'Scooby-Doo', game: 'Scooby-Doo, ¿dónde estás?',
      title: 'Scooby-Doo, ¿dónde estás? (tema)', composer: 'David Mook y Ben Raleigh', year: 1969, platform: 'Hanna-Barbera',
      aka: ['Scooby-Doo', 'Scooby-Doo, Where Are You!'],
      sources: [yt('6Jj8sIcCsuU'), yt('-XME6M-g3Ao')],
    },
    {
      id: 'toon-la-pantera-rosa-the-pink-panther-theme', cat: 'toon-clasicas', franchise: 'La Pantera Rosa', game: 'La Pantera Rosa',
      title: 'The Pink Panther Theme', composer: 'Henry Mancini', year: 1963, platform: 'DePatie-Freleng',
      aka: ['The Pink Panther'],
      sources: [apple({ song: 953536415, country: 'mx' }), yt('bii-PIGprv8'), yt('mtKuBGMhLKw')],
    },
    {
      id: 'toon-popeye-el-marino-i-m-popeye-the-sailor-man', cat: 'toon-clasicas', franchise: 'Popeye el marino', game: 'Popeye el marino',
      title: 'I\'m Popeye the Sailor Man', composer: 'Sammy Lerner', year: 1933, platform: 'Fleischer',
      aka: ['Popeye'],
      sources: [yt('Wu-_ugvuMFk'), yt('nJ5taO8uGsE'), apple({ song: 308101323, country: 'mx' })],
    },
    {
      id: 'toon-el-pajaro-loco-el-pajaro-loco-tema', cat: 'toon-clasicas', franchise: 'El Pájaro Loco', game: 'El Pájaro Loco',
      title: 'El Pájaro Loco (tema)', composer: 'Kay Kyser y Gloria Wood', year: 1947, platform: 'Walter Lantz',
      aka: ['Woody Woodpecker'],
      sources: [yt('Tj2y3tXD8As'), yt('ElGDPKHhVHU'), apple({ song: 601373480, country: 'mx' })],
    },
    {
      id: 'toon-looney-tunes-merrily-we-roll-along', cat: 'toon-clasicas', franchise: 'Looney Tunes', game: 'Looney Tunes',
      title: 'Merrily We Roll Along', composer: 'Carl Stalling', year: 1930, platform: 'Warner Bros.',
      sources: [yt('0jTHNBKjMBU'), yt('viBJUZtxQFs')],
    },
    {
      id: 'toon-don-gato-y-su-pandilla-don-gato-tema', cat: 'toon-clasicas', franchise: 'Don Gato y su pandilla', game: 'Don Gato y su pandilla',
      title: 'Don Gato (tema)', composer: 'Hoyt Curtin', year: 1961, platform: 'Hanna-Barbera',
      aka: ['Top Cat'],
      sources: [yt('YgbUEnNf7y8'), yt('gMavhe_T99M')],
    },
    {
      id: 'toon-el-hombre-arana-1967-spider-man-theme', cat: 'toon-clasicas', franchise: 'El Hombre Araña (1967)', game: 'El Hombre Araña (1967)',
      title: 'Spider-Man Theme', composer: 'Bob Harris y Paul Francis Webster', year: 1967, platform: 'Grantray-Lawrence',
      aka: ['Spider-Man'],
      sources: [yt('eH6rNQGkppY'), yt('xsx3JCw62WQ')],
    },
    {
      id: 'toon-los-autos-locos-los-autos-locos-tema', cat: 'toon-clasicas', franchise: 'Los autos locos', game: 'Los autos locos',
      title: 'Los autos locos (tema)', composer: 'Ted Nichols', year: 1968, platform: 'Hanna-Barbera',
      aka: ['Wacky Races'],
      sources: [yt('Ae7xqtttQGg'), yt('8jHrrMThQJk')],
    },
    {
      id: 'toon-el-oso-yogui-el-oso-yogui-tema', cat: 'toon-clasicas', franchise: 'El oso Yogui', game: 'El oso Yogui',
      title: 'El oso Yogui (tema)', composer: 'Hoyt Curtin', year: 1961, platform: 'Hanna-Barbera',
      aka: ['Yogi Bear', 'El oso Yogi'],
      sources: [yt('gxHlA0wzmwc'), yt('bDes4d8A4fI')],
    },
    {
      id: 'toon-tom-y-jerry-tom-y-jerry-entrada', cat: 'toon-clasicas', franchise: 'Tom y Jerry', game: 'Tom y Jerry',
      title: 'Tom y Jerry (entrada)', composer: 'Scott Bradley', year: 1940, platform: 'MGM',
      aka: ['Tom and Jerry'],
      sources: [yt('zeAlFwuP7Vw'), yt('td0S8povRY0')],
    },
    /* ───────────── Años 80 (11) ───────────── */
    {
      id: 'toon-los-pitufos-los-pitufos-tema', cat: 'toon-80s', franchise: 'Los Pitufos', game: 'Los Pitufos',
      title: 'Los Pitufos (tema)', composer: 'Hoyt Curtin', year: 1981, platform: 'Hanna-Barbera',
      aka: ['The Smurfs'],
      sources: [yt('kV5ZKuxDbjQ'), yt('fnR8PaCJ19c')],
    },
    {
      id: 'toon-he-man-y-los-amos-del-universo-he-man-theme', cat: 'toon-80s', franchise: 'He-Man y los Amos del Universo', game: 'He-Man y los Amos del Universo',
      title: 'He-Man Theme', composer: 'Shuki Levy y Haim Saban', year: 1983, platform: 'Filmation',
      aka: ['He-Man'],
      sources: [yt('pglgnVJ1ZNY'), yt('anrLcTAhX_8')],
    },
    {
      id: 'toon-thundercats-thundercats-theme', cat: 'toon-80s', franchise: 'Thundercats', game: 'Thundercats',
      title: 'Thundercats Theme', composer: 'Bernard Hoffer', year: 1985, platform: 'Rankin/Bass',
      sources: [yt('fQKEQz4as8U'), yt('HcGNqrAtsgg')],
    },
    {
      id: 'toon-transformers-transformers-theme', cat: 'toon-80s', franchise: 'Transformers', game: 'Transformers',
      title: 'Transformers Theme', composer: 'Lion', year: 1984, platform: 'Hasbro',
      sources: [yt('9NA4VED8CrY'), yt('Ae-Pl-Q34ng'), apple({ song: 254633754, country: 'mx' })],
    },
    {
      id: 'toon-las-tortugas-ninja-teenage-mutant-ninja-turtles-theme', cat: 'toon-80s', franchise: 'Las Tortugas Ninja', game: 'Las Tortugas Ninja',
      title: 'Teenage Mutant Ninja Turtles Theme', composer: 'Chuck Lorre y Dennis Challen', year: 1987, platform: 'Murakami-Wolf-Swenson',
      aka: ['Teenage Mutant Ninja Turtles'],
      sources: [yt('Oy6UG8jAKfo'), yt('MapBJJvjhoI'), apple({ song: 1044277995, country: 'mx' })],
    },
    {
      id: 'toon-patoaventuras-ducktales-theme', cat: 'toon-80s', franchise: 'Patoaventuras', game: 'Patoaventuras',
      title: 'DuckTales Theme', composer: 'Mark Mueller', year: 1987, platform: 'Disney TV Animation',
      aka: ['DuckTales'],
      sources: [yt('Xzg2U6Sw79s'), yt('rNl1zFyBHmY')],
    },
    {
      id: 'toon-chip-y-dale-al-rescate-chip-n-dale-rescue-rangers-theme', cat: 'toon-80s', franchise: 'Chip y Dale al rescate', game: 'Chip y Dale al rescate',
      title: 'Chip \'n Dale Rescue Rangers Theme', composer: 'Mark Mueller', year: 1989, platform: 'Disney TV Animation',
      aka: ['Chip y Dale: Guardianes rescatadores', 'Chip \'n Dale: Rescue Rangers'],
      sources: [yt('H3boxe3U7Kw'), yt('gvUjT0jCJus')],
    },
    {
      id: 'toon-los-osos-gummi-adventures-of-the-gummi-bears-theme', cat: 'toon-80s', franchise: 'Los osos Gummi', game: 'Los osos Gummi',
      title: 'Adventures of the Gummi Bears Theme', composer: 'Michael Silversher y Patty Silversher', year: 1985, platform: 'Disney TV Animation',
      aka: ['Gummi Bears'],
      sources: [yt('64e2Xh8rwro'), yt('IYdjkjV9yrY')],
    },
    {
      id: 'toon-inspector-gadget-inspector-gadget-theme', cat: 'toon-80s', franchise: 'Inspector Gadget', game: 'Inspector Gadget',
      title: 'Inspector Gadget Theme', composer: 'Haim Saban y Shuki Levy', year: 1983, platform: 'DiC',
      sources: [yt('rBkzTGmmtT4'), yt('JtPAkpCSexE'), apple({ song: 1603339355, country: 'mx' })],
    },
    {
      id: 'toon-los-simpson-the-simpsons-main-title-theme', cat: 'toon-80s', franchise: 'Los Simpson', game: 'Los Simpson',
      title: 'The Simpsons Main Title Theme', composer: 'Danny Elfman', year: 1989, platform: 'Fox',
      aka: ['The Simpsons', 'Los Simpsons'],
      sources: [apple({ song: 1598035609, country: 'mx' }), yt('aDcFhYtiIEM')],
    },
    {
      id: 'toon-garfield-y-sus-amigos-amigo-es', cat: 'toon-80s', franchise: 'Garfield y sus amigos', game: 'Garfield y sus amigos',
      title: 'Amigo es', year: 1988, platform: 'CBS',
      aka: ['Garfield and Friends', 'Garfield'],
      sources: [yt('MJmSmjBN-nU'), yt('sQKsXHzXJ4w')],
    },
    /* ───────────── Años 90 (20) ───────────── */
    {
      id: 'toon-animaniacs-animaniacs-main-title-theme', cat: 'toon-90s', franchise: 'Animaniacs', game: 'Animaniacs',
      title: 'Animaniacs Main Title Theme', composer: 'Richard Stone', year: 1993, platform: 'Warner Bros.',
      sources: [yt('nU60zUf5r5M'), yt('BPakVSOx9N4'), apple({ song: 1538239354, country: 'mx' })],
    },
    {
      id: 'toon-pinky-y-cerebro-pinky-and-the-brain-theme', cat: 'toon-90s', franchise: 'Pinky y Cerebro', game: 'Pinky y Cerebro',
      title: 'Pinky and the Brain Theme', composer: 'Richard Stone', year: 1995, platform: 'Warner Bros.',
      aka: ['Pinky and the Brain'],
      sources: [yt('HKbPt5RcTXk'), yt('vRk5Zbskvq4')],
    },
    {
      id: 'toon-las-chicas-superpoderosas-las-chicas-superpoderosas-tem', cat: 'toon-90s', franchise: 'Las Chicas Superpoderosas', game: 'Las Chicas Superpoderosas',
      title: 'Las Chicas Superpoderosas (tema)', composer: 'James L. Venable', year: 1998, platform: 'Cartoon Network',
      aka: ['The Powerpuff Girls'],
      sources: [yt('Y9qtsvOTXfw'), yt('2GmMXZmueeE')],
    },
    {
      id: 'toon-el-laboratorio-de-dexter-dexter-s-laboratory-theme', cat: 'toon-90s', franchise: 'El laboratorio de Dexter', game: 'El laboratorio de Dexter',
      title: 'Dexter\'s Laboratory Theme', composer: 'Thomas Chase y Steve Rucker', year: 1996, platform: 'Cartoon Network',
      aka: ['Dexter\'s Laboratory'],
      sources: [yt('nhZ0YMKBcv8'), yt('XZtNesiBabc')],
    },
    {
      id: 'toon-bob-esponja-la-cancion-de-bob-esponja', cat: 'toon-90s', franchise: 'Bob Esponja', game: 'Bob Esponja',
      title: 'La canción de Bob Esponja', composer: 'Derek Drymon y Stephen Hillenburg', year: 1999, platform: 'Nickelodeon',
      aka: ['SpongeBob SquarePants', 'Bob Esponja Pantalones Cuadrados'],
      sources: [yt('v94Cbb76qfc'), yt('7gnsLSHA5es')],
    },
    {
      id: 'toon-aventuras-en-panales-rugrats-theme', cat: 'toon-90s', franchise: 'Aventuras en pañales', game: 'Aventuras en pañales',
      title: 'Rugrats Theme', composer: 'Mark Mothersbaugh', year: 1991, platform: 'Nickelodeon',
      aka: ['Rugrats'],
      sources: [yt('AROaL6Uh1ko'), yt('jMEj9kQg3F8')],
    },
    {
      id: 'toon-oye-arnold-hey-arnold-theme', cat: 'toon-90s', franchise: '¡Oye, Arnold!', game: '¡Oye, Arnold!',
      title: 'Hey Arnold! Theme', composer: 'Jim Lang', year: 1996, platform: 'Nickelodeon',
      aka: ['Hey Arnold!'],
      sources: [yt('xwH6kyKFSQY'), yt('OzM8BkVHp6s'), yt('Z2EotmVUdDE')],
    },
    {
      id: 'toon-x-men-la-serie-animada-x-men-theme', cat: 'toon-90s', franchise: 'X-Men: La serie animada', game: 'X-Men: La serie animada',
      title: 'X-Men Theme', composer: 'Ron Wasserman', year: 1992, platform: 'Fox Kids',
      aka: ['X-Men: The Animated Series', 'X-Men'],
      sources: [yt('PL5KvPt4GKA'), yt('DFpB3UM8niE'), yt('tQjdm8BdJO4')],
    },
    {
      id: 'toon-batman-la-serie-animada-batman-the-animated-series-main', cat: 'toon-90s', franchise: 'Batman: La serie animada', game: 'Batman: La serie animada',
      title: 'Batman: The Animated Series Main Title', composer: 'Danny Elfman y Shirley Walker', year: 1992, platform: 'Warner Bros.',
      aka: ['Batman: The Animated Series'],
      sources: [yt('rrmUk2YUm14'), yt('VZWAAj4ZFI4')],
    },
    {
      id: 'toon-futurama-futurama-theme', cat: 'toon-90s', franchise: 'Futurama', game: 'Futurama',
      title: 'Futurama Theme', composer: 'Christopher Tyng', year: 1999, platform: 'Fox',
      sources: [apple({ song: 1504583013, country: 'mx' }), yt('EDmSa9-p3Mw'), yt('6F1QNfmiqHc')],
    },
    {
      id: 'toon-south-park-south-park-theme', cat: 'toon-90s', franchise: 'South Park', game: 'South Park',
      title: 'South Park Theme', composer: 'Primus', year: 1997, platform: 'Comedy Central',
      sources: [yt('x9tqCX_npls'), yt('rJZMEDBJqvA')],
    },
    {
      id: 'toon-padre-de-familia-family-guy-theme', cat: 'toon-90s', franchise: 'Padre de familia', game: 'Padre de familia',
      title: 'Family Guy Theme', composer: 'Walter Murphy', year: 1999, platform: 'Fox',
      aka: ['Family Guy'],
      sources: [yt('fX-jDoqxKAA'), yt('mwuAL4dwyOY')],
    },
    {
      id: 'toon-tiny-toons-tiny-toon-adventures-theme', cat: 'toon-90s', franchise: 'Tiny Toons', game: 'Tiny Toons',
      title: 'Tiny Toon Adventures Theme', composer: 'Bruce Broughton', year: 1990, platform: 'Warner Bros.',
      aka: ['Tiny Toon Adventures'],
      sources: [yt('0gKrdLKvF4g'), yt('qXuU99ScERE')],
    },
    {
      id: 'toon-el-pato-darkwing-darkwing-duck-theme', cat: 'toon-90s', franchise: 'El Pato Darkwing', game: 'El Pato Darkwing',
      title: 'Darkwing Duck Theme', composer: 'Steve Nelson y Thomas Chase', year: 1991, platform: 'Disney TV Animation',
      aka: ['Darkwing Duck'],
      sources: [yt('wAG75hzJGpQ'), yt('LH_oOWfCX5w')],
    },
    {
      id: 'toon-johnny-bravo-johnny-bravo-entrada', cat: 'toon-90s', franchise: 'Johnny Bravo', game: 'Johnny Bravo',
      title: 'Johnny Bravo (entrada)', year: 1997, platform: 'Cartoon Network',
      sources: [yt('0xsdgf5SGZI'), yt('P05ECHpbfq0')],
    },
    {
      id: 'toon-coraje-el-perro-cobarde-coraje-entrada', cat: 'toon-90s', franchise: 'Coraje, el perro cobarde', game: 'Coraje, el perro cobarde',
      title: 'Coraje (entrada)', year: 1999, platform: 'Cartoon Network',
      aka: ['Courage the Cowardly Dog'],
      sources: [yt('9OJ1NKnt-B0'), yt('CzfGpBF33HE')],
    },
    {
      id: 'toon-ed-edd-y-eddy-ed-edd-y-eddy-entrada', cat: 'toon-90s', franchise: 'Ed, Edd y Eddy', game: 'Ed, Edd y Eddy',
      title: 'Ed, Edd y Eddy (entrada)', year: 1999, platform: 'Cartoon Network',
      aka: ['Ed, Edd n Eddy'],
      sources: [yt('93T3RfXL5Lo'), yt('EIRs-iQWXfw')],
    },
    {
      id: 'toon-capitan-planeta-capitan-planeta-tema', cat: 'toon-90s', franchise: 'Capitán Planeta', game: 'Capitán Planeta',
      title: 'Capitán Planeta (tema)', year: 1990, platform: 'TBS',
      aka: ['Captain Planet'],
      sources: [yt('rhthBlQzt7w'), yt('xfelHZQ5oVE')],
    },
    {
      id: 'toon-gargolas-gargolas-entrada', cat: 'toon-90s', franchise: 'Gárgolas', game: 'Gárgolas',
      title: 'Gárgolas (entrada)', composer: 'Carl Johnson', year: 1994, platform: 'Disney',
      aka: ['Gargoyles'],
      sources: [yt('sRGBB2r7Ohk'), yt('HXJusPmLweE')],
    },
    {
      id: 'toon-los-thornberrys-los-thornberrys-tema', cat: 'toon-90s', franchise: 'Los Thornberrys', game: 'Los Thornberrys',
      title: 'Los Thornberrys (tema)', composer: 'Drew Neumann', year: 1998, platform: 'Nickelodeon',
      aka: ['The Wild Thornberrys'],
      sources: [yt('X3rL0P7JUqU'), yt('Rtw98M5A7t8')],
    },
    /* ───────────── 2000s (17) ───────────── */
    {
      id: 'toon-los-padrinos-magicos-los-padrinos-magicos-tema', cat: 'toon-00s', franchise: 'Los Padrinos Mágicos', game: 'Los Padrinos Mágicos',
      title: 'Los Padrinos Mágicos (tema)', composer: 'Ron Jones', year: 2001, platform: 'Nickelodeon',
      aka: ['The Fairly OddParents'],
      sources: [yt('kFjexH-badI'), yt('AN02Z35CJgk')],
    },
    {
      id: 'toon-danny-phantom-danny-phantom-theme', cat: 'toon-00s', franchise: 'Danny Phantom', game: 'Danny Phantom',
      title: 'Danny Phantom Theme', composer: 'Deric Battiste y Guy Moon', year: 2004, platform: 'Nickelodeon',
      sources: [yt('N2axNm4ybIg'), yt('n1SclW5jY_k')],
    },
    {
      id: 'toon-avatar-la-leyenda-de-aang-avatar-the-last-airbender-mai', cat: 'toon-00s', franchise: 'Avatar: La leyenda de Aang', game: 'Avatar: La leyenda de Aang',
      title: 'Avatar: The Last Airbender Main Title', composer: 'Jeremy Zuckerman', year: 2005, platform: 'Nickelodeon',
      aka: ['Avatar: The Last Airbender'],
      sources: [yt('BPYW-_mF3LM'), yt('x9BX94FL3yI'), apple({ song: 1698175924, country: 'mx' })],
    },
    {
      id: 'toon-kim-possible-call-me-beep-me', cat: 'toon-00s', franchise: 'Kim Possible', game: 'Kim Possible',
      title: 'Call Me, Beep Me!', composer: 'Christina Milian', year: 2002, platform: 'Disney Channel',
      sources: [yt('6dCmvb_2hyk'), apple({ song: 1494973474, country: 'mx' })],
    },
    {
      id: 'toon-phineas-y-ferb-today-is-gonna-be-a-great-day', cat: 'toon-00s', franchise: 'Phineas y Ferb', game: 'Phineas y Ferb',
      title: 'Today Is Gonna Be a Great Day', composer: 'Bowling for Soup', year: 2007, platform: 'Disney Channel',
      aka: ['Phineas and Ferb'],
      sources: [yt('4T6IEp36SGw'), yt('Nt5AuDn6BwE'), apple({ song: 1440631151, country: 'mx' })],
    },
    {
      id: 'toon-ben-10-ben-10-theme', cat: 'toon-00s', franchise: 'Ben 10', game: 'Ben 10',
      title: 'Ben 10 Theme', composer: 'Andy Sturmer', year: 2005, platform: 'Cartoon Network',
      sources: [yt('1vrf9TWvZY0'), yt('B18HZBtzy-8')],
    },
    {
      id: 'toon-los-jovenes-titanes-teen-titans-theme', cat: 'toon-00s', franchise: 'Los Jóvenes Titanes', game: 'Los Jóvenes Titanes',
      title: 'Teen Titans Theme', composer: 'Puffy AmiYumi', year: 2003, platform: 'Cartoon Network',
      aka: ['Teen Titans'],
      sources: [yt('gm25Chqo7-o'), yt('oZZC9xUM3dI'), apple({ song: 1536227100, country: 'mx' })],
    },
    {
      id: 'toon-dora-la-exploradora-dora-the-explorer-theme', cat: 'toon-00s', franchise: 'Dora la exploradora', game: 'Dora la exploradora',
      title: 'Dora the Explorer Theme', composer: 'Dora the Explorer', year: 2000, platform: 'Nickelodeon',
      aka: ['Dora the Explorer'],
      sources: [yt('0PDC9MPOCRE'), yt('WTnGQXhHf5w'), apple({ song: 281871271, country: 'mx' })],
    },
    {
      id: 'toon-la-casa-de-mickey-mouse-mickey-mouse-clubhouse-theme', cat: 'toon-00s', franchise: 'La casa de Mickey Mouse', game: 'La casa de Mickey Mouse',
      title: 'Mickey Mouse Clubhouse Theme', composer: 'They Might Be Giants', year: 2006, platform: 'Disney Junior',
      aka: ['Mickey Mouse Clubhouse'],
      sources: [yt('gfA3r2e43sU')],
    },
    {
      id: 'toon-peppa-pig-peppa-pig-theme', cat: 'toon-00s', franchise: 'Peppa Pig', game: 'Peppa Pig',
      title: 'Peppa Pig Theme', composer: 'Julian Nott', year: 2004, platform: 'Astley Baker Davies',
      sources: [yt('bwtTZVUmV94'), yt('iUjKJzjGImw')],
    },
    {
      id: 'toon-los-backyardigans-the-backyardigans-theme-song', cat: 'toon-00s', franchise: 'Los Backyardigans', game: 'Los Backyardigans',
      title: 'The Backyardigans Theme Song', composer: 'The Backyardigans', year: 2004, platform: 'Nick Jr.',
      aka: ['The Backyardigans'],
      sources: [yt('L8rNMkADX5U'), yt('JhJKI4P4PPs'), apple({ song: 283379554, country: 'mx' })],
    },
    {
      id: 'toon-isla-del-drama-i-wanna-be-famous', cat: 'toon-00s', franchise: 'Isla del Drama', game: 'Isla del Drama',
      title: 'I Wanna Be Famous', composer: 'Brian Pickett y Graeme Cornies', year: 2007, platform: 'Teletoon',
      aka: ['Total Drama Island'],
      sources: [yt('QhzdNrc4N4Q'), yt('Tg4znUP3Too')],
    },
    {
      id: 'toon-lazytown-lazytown-tema', cat: 'toon-00s', franchise: 'LazyTown', game: 'LazyTown',
      title: 'LazyTown (tema)', composer: 'Máni Svavarsson', year: 2004, platform: 'Nick Jr.',
      aka: ['Lazy Town'],
      sources: [yt('gjS5SNWCK9A'), yt('4ATiZIl5_9M')],
    },
    {
      id: 'toon-jimmy-neutron-jimmy-neutron-entrada', cat: 'toon-00s', franchise: 'Jimmy Neutrón', game: 'Jimmy Neutrón',
      title: 'Jimmy Neutrón (entrada)', year: 2002, platform: 'Nickelodeon',
      aka: ['Las aventuras de Jimmy Neutrón', 'Jimmy Neutron'],
      sources: [yt('TMBJTbPxb14'), yt('eBW9K3s1224')],
    },
    {
      id: 'toon-las-sombrias-aventuras-de-billy-y-mandy-billy-y-mandy-e', cat: 'toon-00s', franchise: 'Las sombrías aventuras de Billy y Mandy', game: 'Las sombrías aventuras de Billy y Mandy',
      title: 'Billy y Mandy (entrada)', year: 2001, platform: 'Cartoon Network',
      aka: ['Billy y Mandy', 'The Grim Adventures of Billy & Mandy'],
      sources: [yt('LlPlN_wUxPc'), yt('KP_2RIU6Un0')],
    },
    {
      id: 'toon-knd-los-chicos-del-barrio-knd-entrada', cat: 'toon-00s', franchise: 'KND: Los chicos del barrio', game: 'KND: Los chicos del barrio',
      title: 'KND (entrada)', year: 2002, platform: 'Cartoon Network',
      aka: ['Código KND', 'Codename: Kids Next Door'],
      sources: [yt('r05QzlUGpr8'), yt('_dLOBxQa50M')],
    },
    {
      id: 'toon-samurai-jack-samurai-jack-entrada', cat: 'toon-00s', franchise: 'Samurai Jack', game: 'Samurai Jack',
      title: 'Samurai Jack (entrada)', year: 2001, platform: 'Cartoon Network',
      sources: [yt('-NztPS4dflw'), yt('3MrIPQEF8Dc')],
    },
    /* ───────────── 2010 en adelante (16) ───────────── */
    {
      id: 'toon-hora-de-aventura-hora-de-aventura-tema', cat: 'toon-10s', franchise: 'Hora de aventura', game: 'Hora de aventura',
      title: 'Hora de aventura (tema)', composer: 'Pendleton Ward', year: 2010, platform: 'Cartoon Network',
      aka: ['Adventure Time'],
      sources: [yt('TXCBB7O4B38'), yt('8EAqF_6N3tY'), apple({ song: 1516720543, country: 'mx' })],
    },
    {
      id: 'toon-gravity-falls-gravity-falls-main-title-theme', cat: 'toon-10s', franchise: 'Gravity Falls', game: 'Gravity Falls',
      title: 'Gravity Falls Main Title Theme', composer: 'Brad Breeck', year: 2012, platform: 'Disney Channel',
      sources: [apple({ song: 1445287659, country: 'mx' }), yt('X2DUpDxFJyg')],
    },
    {
      id: 'toon-steven-universe-we-are-the-crystal-gems', cat: 'toon-10s', franchise: 'Steven Universe', game: 'Steven Universe',
      title: 'We Are the Crystal Gems', composer: 'Rebecca Sugar', year: 2013, platform: 'Cartoon Network',
      sources: [yt('m1srUX0wdJY'), yt('fc7YeXsldWQ'), apple({ song: 1511215902, country: 'mx' })],
    },
    {
      id: 'toon-el-increible-mundo-de-gumball-the-amazing-world-of-gumb', cat: 'toon-10s', franchise: 'El increíble mundo de Gumball', game: 'El increíble mundo de Gumball',
      title: 'The Amazing World of Gumball Theme', composer: 'Ben Locke', year: 2011, platform: 'Cartoon Network',
      aka: ['The Amazing World of Gumball'],
      sources: [yt('jKxdMtEzrKs'), yt('X7PmWMQJTqU')],
    },
    {
      id: 'toon-rick-y-morty-rick-and-morty-theme', cat: 'toon-10s', franchise: 'Rick y Morty', game: 'Rick y Morty',
      title: 'Rick and Morty Theme', composer: 'Ryan Elder', year: 2013, platform: 'Adult Swim',
      aka: ['Rick and Morty'],
      sources: [apple({ song: 1570547237, country: 'mx' }), yt('E6TUs69Cw94')],
    },
    {
      id: 'toon-bluey-bluey-theme-tune', cat: 'toon-10s', franchise: 'Bluey', game: 'Bluey',
      title: 'Bluey Theme Tune', composer: 'Joff Bush', year: 2018, platform: 'Ludo Studio',
      sources: [apple({ song: 1572744286, country: 'mx' }), yt('rSgszEckqA8')],
    },
    {
      id: 'toon-paw-patrol-paw-patrol-theme', cat: 'toon-10s', franchise: 'Paw Patrol', game: 'Paw Patrol',
      title: 'PAW Patrol Theme', composer: 'PAW Patrol', year: 2013, platform: 'Nickelodeon',
      aka: ['Patrulla de cachorros'],
      sources: [yt('QWg4tLFCd3A'), apple({ song: 1655407497, country: 'mx' })],
    },
    {
      id: 'toon-miraculous-las-aventuras-de-ladybug-miraculous-theme-so', cat: 'toon-10s', franchise: 'Miraculous: Las aventuras de Ladybug', game: 'Miraculous: Las aventuras de Ladybug',
      title: 'Miraculous Theme Song', composer: 'Jeremy Zag y Noam Kaniel', year: 2015, platform: 'Zag',
      aka: ['Miraculous Ladybug'],
      sources: [yt('hJWmLQeULLU'), yt('aVJ9_bw6oqM')],
    },
    {
      id: 'toon-arcane-enemy', cat: 'toon-10s', franchise: 'Arcane', game: 'Arcane',
      title: 'Enemy', composer: 'Imagine Dragons y Arcane', year: 2021, platform: 'Netflix',
      sources: [apple({ song: 1593813937, country: 'mx' }), yt('UqcE-IIevf0')],
    },
    {
      id: 'toon-bojack-horseman-bojack-horseman-theme', cat: 'toon-10s', franchise: 'BoJack Horseman', game: 'BoJack Horseman',
      title: 'BoJack Horseman Theme', composer: 'Patrick Carney', year: 2014, platform: 'Netflix',
      sources: [apple({ song: 1273849481, country: 'mx' }), yt('rQvIR1oL1vE')],
    },
    {
      id: 'toon-my-little-pony-la-magia-de-la-amistad-my-little-pony-th', cat: 'toon-10s', franchise: 'My Little Pony: La magia de la amistad', game: 'My Little Pony: La magia de la amistad',
      title: 'My Little Pony Theme Song', composer: 'Daniel Ingram', year: 2010, platform: 'Hasbro',
      aka: ['My Little Pony: Friendship Is Magic'],
      sources: [yt('L4FLMPE_svQ'), yt('kBx8cGyyQik'), apple({ song: 1882319366, country: 'mx' })],
    },
    {
      id: 'toon-escandalosos-escandalosos-entrada', cat: 'toon-10s', franchise: 'Escandalosos', game: 'Escandalosos',
      title: 'Escandalosos (entrada)', year: 2015, platform: 'Cartoon Network',
      aka: ['We Bare Bears'],
      sources: [yt('hLckLYiC5r4'), yt('pl5fax9AKzw')],
    },
    {
      id: 'toon-star-vs-las-fuerzas-del-mal-star-vs-las-fuerzas-del-mal', cat: 'toon-10s', franchise: 'Star vs. las fuerzas del mal', game: 'Star vs. las fuerzas del mal',
      title: 'Star vs. las fuerzas del mal (entrada)', year: 2015, platform: 'Disney XD',
      aka: ['Star vs. the Forces of Evil'],
      sources: [yt('YVdR58VMzIo'), yt('U2M3iitNpqc')],
    },
    {
      id: 'toon-the-loud-house-the-loud-house-entrada', cat: 'toon-10s', franchise: 'The Loud House', game: 'The Loud House',
      title: 'The Loud House (entrada)', year: 2016, platform: 'Nickelodeon',
      aka: ['Una casa de locos'],
      sources: [yt('Y4X1MF2J4ug'), yt('sieOTxsTAK8')],
    },
    {
      id: 'toon-amphibia-amphibia-entrada', cat: 'toon-10s', franchise: 'Amphibia', game: 'Amphibia',
      title: 'Amphibia (entrada)', year: 2019, platform: 'Disney Channel',
      sources: [yt('WFZGhz-Z_jI'), yt('G78ndJgZXGs')],
    },
    {
      id: 'toon-la-casa-buho-la-casa-buho-entrada', cat: 'toon-10s', franchise: 'La casa búho', game: 'La casa búho',
      title: 'La casa búho (entrada)', year: 2020, platform: 'Disney Channel',
      aka: ['The Owl House'],
      sources: [yt('iAM2bjs1WUM'), yt('9eoDJufrO3k')],
    },
  );

  // Señuelos: aparecen como opciones incorrectas y en el buscador de Experto.
  AM.EXTRA_GAMES.push(
    { theme: 'caricaturas', franchise: 'El show de la Pantera Rosa', game: 'El show de la Pantera Rosa' },
    { theme: 'caricaturas', franchise: 'Los Jetsons: la película', game: 'Los Jetsons: la película' },
    { theme: 'caricaturas', franchise: 'Doug', game: 'Doug' },
    { theme: 'caricaturas', franchise: 'CatDog', game: 'CatDog' },
    { theme: 'caricaturas', franchise: 'La vida moderna de Rocko', game: 'La vida moderna de Rocko' },
    { theme: 'caricaturas', franchise: 'Recreo', game: 'Recreo' },
    { theme: 'caricaturas', franchise: 'Hey Arnold!: la película', game: 'Hey Arnold!: la película' },
    { theme: 'caricaturas', franchise: 'Pucca', game: 'Pucca' },
    { theme: 'caricaturas', franchise: 'Chowder', game: 'Chowder' },
    { theme: 'caricaturas', franchise: 'Invasor Zim', game: 'Invasor Zim' },
    { theme: 'caricaturas', franchise: 'Un show más', game: 'Un show más' },
    { theme: 'caricaturas', franchise: 'Phineas y Ferb: la película', game: 'Phineas y Ferb: la película' },
    { theme: 'caricaturas', franchise: 'Los Simpson: la película', game: 'Los Simpson: la película' },
    { theme: 'caricaturas', franchise: 'Las aventuras de Tintín', game: 'Las aventuras de Tintín' },
    { theme: 'caricaturas', franchise: 'Aventuras en pañales', game: 'Los Rugrats crecidos' },
  );
})(window.AM = window.AM || {});
