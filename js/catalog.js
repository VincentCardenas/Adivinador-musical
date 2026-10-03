/*
 * Catálogo de pistas.
 *
 * Cada pista tiene una o más fuentes de audio, en orden de preferencia:
 *   - apple({ song })              → preview oficial de 30 s por ID de canción (Apple Music / iTunes)
 *   - apple({ album, match })      → busca la canción por nombre dentro de un álbum oficial
 *   - apple({ term, artist, match })→ búsqueda libre en iTunes, filtrada por artista
 *   - yt(id, inicio)               → video de YouTube (se usa si Apple no tiene el soundtrack,
 *                                    como pasa con casi todo lo de Nintendo)
 * Si una fuente falla, el juego prueba la siguiente; si fallan todas, la pista se salta sola.
 */
(function (AM) {
  'use strict';

  const apple = (o) => Object.assign({ type: 'itunes' }, o);
  const yt = (id, start) => ({ type: 'youtube', id: id, start: start || 0 });

  AM.CATEGORIES = [
    { id: 'nintendo', label: 'Nintendo', icon: '🍄' },
    { id: 'xbox', label: 'Xbox', icon: '🟢' },
    { id: 'playstation', label: 'PlayStation', icon: '🔷' },
    { id: 'indie', label: 'Indie', icon: '🪲' },
    { id: 'retro', label: 'Retro 8/16 bits', icon: '🕹️' },
    { id: 'rpg', label: 'RPG y fantasía', icon: '🗡️' },
    { id: 'accion', label: 'Acción y aventura', icon: '💥' },
    { id: 'online', label: 'Online y multijugador', icon: '🌐' },
  ];

  AM.CATALOG = [
    /* ───────────── Nintendo (14) ───────────── */
    {
      id: 'acnh-main', cat: 'nintendo', franchise: 'Animal Crossing', game: 'Animal Crossing: New Horizons',
      title: 'Main Theme', composer: 'Yasuaki Iwata y equipo', year: 2020, platform: 'Switch',
      sources: [yt('lI_C1Bjdqn4'), yt('dZQez9N4VRg')],
    },
    {
      id: 'dkc-aquatic', cat: 'nintendo', franchise: 'Donkey Kong', game: 'Donkey Kong Country',
      title: 'Aquatic Ambience', composer: 'David Wise', year: 1994, platform: 'SNES',
      sources: [yt('1XM8ReW9NvA'), yt('FgTOGMqpcUk'), yt('gkCcvoJ09gU')],
    },
    {
      id: 'kdl-greengreens', cat: 'nintendo', franchise: 'Kirby', game: "Kirby's Dream Land",
      title: 'Green Greens', composer: 'Jun Ishikawa', year: 1992, platform: 'Game Boy',
      sources: [yt('Y9ppj6hUKVA'), yt('w6-xfQ8_M3I'), yt('4Jg6yQ2XaPg')],
    },
    {
      id: 'kss-gourmet', cat: 'nintendo', franchise: 'Kirby', game: 'Kirby Super Star',
      title: 'Gourmet Race', composer: 'Jun Ishikawa', year: 1996, platform: 'SNES',
      sources: [yt('Se1uh3PS78Y'), yt('4sneo6twzmM')],
    },
    {
      id: 'mkwii-coconut', cat: 'nintendo', franchise: 'Mario Kart', game: 'Mario Kart Wii',
      title: 'Coconut Mall', composer: 'Asuka Ohta y Ryo Nagamatsu', year: 2008, platform: 'Wii',
      sources: [yt('bsf1RaKMRMk'), yt('U-Qm8sBfcsg')],
    },
    {
      id: 'pkmn-wild', cat: 'nintendo', franchise: 'Pokémon', game: 'Pokémon Red & Blue',
      title: 'Battle! (Wild Pokémon)', composer: 'Junichi Masuda', year: 1996, platform: 'Game Boy',
      sources: [yt('NrS523dOHU4'), yt('LgK2f47q8cU'), yt('gqjjHvz38PQ')],
    },
    {
      id: 'splatoon-splattack', cat: 'nintendo', franchise: 'Splatoon', game: 'Splatoon',
      title: 'Splattack!', composer: 'Toru Minegishi, Shiho Fujii y Ryo Nagamatsu', year: 2015, platform: 'Wii U',
      sources: [yt('nU8vbkWptc4'), yt('4URkpbX3x7Q')],
    },
    {
      id: 'smb-overworld', cat: 'nintendo', franchise: 'Super Mario', game: 'Super Mario Bros.',
      title: 'Overworld Theme', composer: 'Koji Kondo', year: 1985, platform: 'NES',
      sources: [yt('iy3qq7zc4EY'), yt('L4PxvY2gjP0')],
    },
    {
      id: 'sm64-bobomb', cat: 'nintendo', franchise: 'Super Mario', game: 'Super Mario 64',
      title: 'Bob-omb Battlefield', composer: 'Koji Kondo', year: 1996, platform: 'Nintendo 64',
      sources: [yt('BCD3PKRyspE'), yt('2TcTc4YmS9c'), yt('bmP3UHXYi28')],
    },
    {
      id: 'smg-gusty', cat: 'nintendo', franchise: 'Super Mario', game: 'Super Mario Galaxy',
      title: 'Gusty Garden Galaxy', composer: 'Mahito Yokota y Koji Kondo', year: 2007, platform: 'Wii',
      sources: [yt('ezJPx7v7ALk'), yt('1bvDHAUv2ak')],
    },
    {
      id: 'ssbb-main', cat: 'nintendo', franchise: 'Super Smash Bros.', game: 'Super Smash Bros. Brawl',
      title: 'Main Theme', composer: 'Nobuo Uematsu', year: 2008, platform: 'Wii',
      sources: [yt('zeKE0NHUtUw'), yt('nqbwdoNQqSQ')],
    },
    {
      id: 'oot-gerudo', cat: 'nintendo', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Ocarina of Time',
      title: 'Gerudo Valley', composer: 'Koji Kondo', year: 1998, platform: 'Nintendo 64',
      sources: [yt('0hEYvdMoF2g'), yt('mxV7v26eKHA'), yt('kevbJUmaBOA')],
    },
    {
      id: 'oot-lostwoods', cat: 'nintendo', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Ocarina of Time',
      title: "Lost Woods (Saria's Song)", composer: 'Koji Kondo', year: 1998, platform: 'Nintendo 64',
      sources: [yt('V9so9y-8Dgk'), yt('NoiByoQ9O4Q')],
    },
    {
      id: 'botw-main', cat: 'nintendo', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Breath of the Wild',
      title: 'Main Theme', composer: 'Manaka Kataoka, Yasuaki Iwata y Hajime Wakai', year: 2017, platform: 'Switch / Wii U',
      sources: [yt('woKE52m86sg'), yt('U_Mm4Tia9zI')],
    },

    /* ───────────── Xbox (7) ───────────── */
    {
      id: 'gow1-theme', cat: 'xbox', franchise: 'Gears of War', game: 'Gears of War',
      title: 'Gears of War (Main Theme)', composer: 'Kevin Riepl', year: 2006, platform: 'Xbox 360',
      sources: [apple({ album: 1576495953, match: 'Gears of War' })],
    },
    {
      id: 'gow1-14years', cat: 'xbox', franchise: 'Gears of War', game: 'Gears of War',
      title: '14 Years After E-Day', composer: 'Kevin Riepl', year: 2006, platform: 'Xbox 360',
      sources: [apple({ album: 1576495953, match: '14 Years After' }), yt('nhuTL4CvJ50')],
    },
    {
      id: 'gow2-theme', cat: 'xbox', franchise: 'Gears of War', game: 'Gears of War 2',
      title: 'Main Theme', composer: 'Steve Jablonsky', year: 2008, platform: 'Xbox 360',
      sources: [apple({ album: 1574690195, match: ['Gears of War 2', 'Main Theme', 'Return of the Omen', 'Hope Runs Deep'] })],
    },
    {
      id: 'haloce-theme', cat: 'xbox', franchise: 'Halo', game: 'Halo: Combat Evolved',
      title: 'Halo (Main Theme)', composer: "Martin O'Donnell y Michael Salvatori", year: 2001, platform: 'Xbox',
      sources: [apple({ song: 1682522054 }), apple({ album: 1682519536, match: 'Halo' }), yt('p6LIhPV_D9k'), yt('QeOvEyzLijQ')],
    },
    {
      id: 'halo2-mjolnir', cat: 'xbox', franchise: 'Halo', game: 'Halo 2',
      title: 'Halo Theme Mjolnir Mix', composer: "Martin O'Donnell y Michael Salvatori", year: 2004, platform: 'Xbox',
      sources: [apple({ album: 1682511658, match: 'Mjolnir' }), apple({ term: 'Halo Theme Mjolnir Mix', artist: "O'Donnell", match: 'Mjolnir' })],
    },
    {
      id: 'halo3-ofe', cat: 'xbox', franchise: 'Halo', game: 'Halo 3',
      title: 'One Final Effort', composer: "Martin O'Donnell y Michael Salvatori", year: 2007, platform: 'Xbox 360',
      sources: [
        apple({ album: 1682505763, match: 'One Final Effort' }),
        apple({ term: 'One Final Effort Halo 3', artist: "O'Donnell", match: 'One Final Effort' }),
      ],
    },
    {
      id: 'ori-nibel', cat: 'xbox', franchise: 'Ori', game: 'Ori and the Blind Forest',
      title: 'Light of Nibel', composer: 'Gareth Coker', year: 2015, platform: 'Xbox One / PC',
      sources: [apple({ song: 971520996 }), apple({ album: 971519718, match: 'Light of Nibel' })],
    },

    /* ───────────── PlayStation (6) ───────────── */
    {
      id: 'got-ghost', cat: 'playstation', franchise: 'Ghost of Tsushima', game: 'Ghost of Tsushima',
      title: 'The Way of the Ghost', composer: 'Ilan Eshkeri', year: 2020, platform: 'PS4',
      sources: [apple({ song: 1521542378 }), apple({ song: 1521542617 })],
    },
    {
      id: 'gow2018-theme', cat: 'playstation', franchise: 'God of War', game: 'God of War (2018)',
      title: 'God of War', composer: 'Bear McCreary', year: 2018, platform: 'PS4',
      sources: [apple({ album: 1370190783, match: 'God of War' })],
    },
    {
      id: 'mgs3-snakeeater', cat: 'playstation', franchise: 'Metal Gear', game: 'Metal Gear Solid 3: Snake Eater',
      title: 'Snake Eater', composer: 'Norihiko Hibino (voz: Cynthia Harrell)', year: 2004, platform: 'PS2',
      sources: [apple({ album: 1856534142, match: 'Snake Eater' }), yt('KmB8ywJYMww'), yt('d-BtzNQppoI')],
    },
    {
      id: 'sh2-laura', cat: 'playstation', franchise: 'Silent Hill', game: 'Silent Hill 2',
      title: 'Theme of Laura', composer: 'Akira Yamaoka', year: 2001, platform: 'PS2',
      sources: [apple({ song: 164069887 }), apple({ album: 164069102, match: 'Theme of Laura' })],
    },
    {
      id: 'tlou-theme', cat: 'playstation', franchise: 'The Last of Us', game: 'The Last of Us',
      title: 'The Last of Us', composer: 'Gustavo Santaolalla', year: 2013, platform: 'PS3',
      sources: [apple({ album: 655118434, match: 'The Last of Us' }), apple({ song: 655119055 })],
    },
    {
      id: 'uncharted-nate', cat: 'playstation', franchise: 'Uncharted', game: "Uncharted: Drake's Fortune",
      title: "Nate's Theme", composer: 'Greg Edmonson', year: 2007, platform: 'PS3',
      sources: [apple({ album: 1553232669, match: ["Nate's Theme", 'Uncharted Theme'] }), apple({ song: 1553234143 })],
    },

    /* ───────────── Indie (9) ───────────── */
    {
      id: 'celeste-resurrections', cat: 'indie', franchise: 'Celeste', game: 'Celeste',
      title: 'Resurrections', composer: 'Lena Raine', year: 2018, platform: 'PC / Switch',
      sources: [apple({ song: 1544899661 }), apple({ album: 1544899658, match: 'Resurrections' })],
    },
    {
      id: 'cuphead-floral', cat: 'indie', franchise: 'Cuphead', game: 'Cuphead',
      title: 'Floral Fury', composer: 'Kristofer Maddigan', year: 2017, platform: 'Xbox One / PC',
      sources: [apple({ album: 1305353572, match: 'Floral Fury' })],
    },
    {
      id: 'hades-noescape', cat: 'indie', franchise: 'Hades', game: 'Hades',
      title: 'No Escape', composer: 'Darren Korb', year: 2020, platform: 'PC / Switch',
      sources: [apple({ album: 1531339044, match: 'No Escape' })],
    },
    {
      id: 'hk-greenpath', cat: 'indie', franchise: 'Hollow Knight', game: 'Hollow Knight',
      title: 'Greenpath', composer: 'Christopher Larkin', year: 2017, platform: 'PC / Switch',
      sources: [apple({ album: 1263341718, match: 'Greenpath' }), yt('fWquuWkHVP4'), yt('STU5IY4gh5k')],
    },
    {
      id: 'hk-citytears', cat: 'indie', franchise: 'Hollow Knight', game: 'Hollow Knight',
      title: 'City of Tears', composer: 'Christopher Larkin', year: 2017, platform: 'PC / Switch',
      sources: [apple({ album: 1263341718, match: 'City of Tears' })],
    },
    {
      id: 'hk-hornet', cat: 'indie', franchise: 'Hollow Knight', game: 'Hollow Knight',
      title: 'Hornet', composer: 'Christopher Larkin', year: 2017, platform: 'PC / Switch',
      sources: [apple({ album: 1263341718, match: 'Hornet' })],
    },
    {
      id: 'minecraft-sweden', cat: 'indie', franchise: 'Minecraft', game: 'Minecraft',
      title: 'Sweden', composer: 'C418', year: 2011, platform: 'PC',
      sources: [apple({ song: 424968546 }), apple({ album: 1867885113, match: 'Sweden' }), apple({ album: 424968465, match: 'Sweden' })],
    },
    {
      id: 'stardew-overture', cat: 'indie', franchise: 'Stardew Valley', game: 'Stardew Valley',
      title: 'Stardew Valley Overture', composer: 'ConcernedApe (Eric Barone)', year: 2016, platform: 'PC',
      sources: [apple({ album: 1158129204, match: 'Overture' }), apple({ song: 1831635031 })],
    },
    {
      id: 'undertale-megalovania', cat: 'indie', franchise: 'Undertale', game: 'Undertale',
      title: 'Megalovania', composer: 'Toby Fox', year: 2015, platform: 'PC',
      sources: [apple({ song: 1528217897 }), apple({ album: 1528217465, match: 'Megalovania' }), apple({ album: 1119806348, match: 'Megalovania' })],
    },

    /* ───────────── Retro 8/16 bits (4) ───────────── */
    {
      id: 'mm2-wily', cat: 'retro', franchise: 'Mega Man', game: 'Mega Man 2',
      title: 'Dr. Wily Stage 1', composer: 'Takashi Tateishi', year: 1988, platform: 'NES',
      sources: [yt('aTbfpkByIM8'), yt('eELMoAwkqd0'), yt('Mo6if_sRTcU')],
    },
    {
      id: 'sonic-greenhill', cat: 'retro', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog',
      title: 'Green Hill Zone', composer: 'Masato Nakamura', year: 1991, platform: 'Mega Drive',
      sources: [apple({ song: 1167536866 }), apple({ term: 'Green Hill Zone Masato Nakamura', artist: 'Nakamura', match: 'Green Hill Zone' })],
    },
    {
      id: 'sf2-guile', cat: 'retro', franchise: 'Street Fighter', game: 'Street Fighter II',
      title: "Guile's Theme", composer: 'Yoko Shimomura', year: 1991, platform: 'Arcade',
      sources: [apple({ album: 1085989596, country: 'jp', match: 'Guile' }), yt('xOinHbF8l8Y'), yt('FEdbR0jnfvQ'), yt('5RxPUIoERwY')],
    },
    {
      id: 'tetris-a', cat: 'retro', franchise: 'Tetris', game: 'Tetris (Game Boy)',
      title: 'Type A (Korobeiniki)', composer: 'Tradicional, arr. Hirokazu Tanaka', year: 1989, platform: 'Game Boy',
      sources: [yt('S098e4mSLDY'), yt('-41jPSBWKNE')],
    },

    /* ───────────── RPG y fantasía (9) ───────────── */
    {
      id: 'chrono-main', cat: 'rpg', franchise: 'Chrono Trigger', game: 'Chrono Trigger',
      title: 'Chrono Trigger (Main Theme)', composer: 'Yasunori Mitsuda', year: 1995, platform: 'SNES',
      sources: [apple({ song: 324080961 }), apple({ album: 324080907, match: 'Chrono Trigger' })],
    },
    {
      id: 'ds-gwyn', cat: 'rpg', franchise: 'Dark Souls', game: 'Dark Souls',
      title: 'Gwyn, Lord of Cinder', composer: 'Motoi Sakuraba', year: 2011, platform: 'PS3 / Xbox 360',
      sources: [apple({ song: 1777191721 }), apple({ song: 1629873067 })],
    },
    {
      id: 'er-main', cat: 'rpg', franchise: 'Elden Ring', game: 'Elden Ring',
      title: 'Elden Ring', composer: 'Tsukasa Saitoh', year: 2022, platform: 'PC / PS5 / Xbox Series',
      sources: [apple({ song: 1642354007 }), apple({ album: 1642353969, match: 'Elden Ring' })],
    },
    {
      id: 'ff7-owa', cat: 'rpg', franchise: 'Final Fantasy', game: 'Final Fantasy VII',
      title: 'One-Winged Angel', composer: 'Nobuo Uematsu', year: 1997, platform: 'PlayStation',
      sources: [apple({ album: 61018952, match: 'One-Winged Angel' }), apple({ song: 1669116129 })],
    },
    {
      id: 'kh-dearly', cat: 'rpg', franchise: 'Kingdom Hearts', game: 'Kingdom Hearts',
      title: 'Dearly Beloved', composer: 'Yoko Shimomura', year: 2002, platform: 'PS2',
      sources: [apple({ song: 1670071084 }), apple({ song: 1669112029 })],
    },
    {
      id: 'me-vigil', cat: 'rpg', franchise: 'Mass Effect', game: 'Mass Effect',
      title: 'Vigil', composer: 'Jack Wall y Sam Hulick', year: 2007, platform: 'Xbox 360',
      sources: [apple({ song: 1477893943 }), apple({ album: 290609421, match: 'Vigil' })],
    },
    {
      id: 'p5-lwc', cat: 'rpg', franchise: 'Persona', game: 'Persona 5',
      title: 'Life Will Change', composer: 'Shoji Meguro (voz: Lyn)', year: 2016, platform: 'PS4',
      sources: [
        apple({ album: 1226946448, country: 'jp', match: 'Life Will Change' }),
        apple({ term: 'Life Will Change Persona 5', artist: 'Atlus', match: 'Life Will Change' }),
      ],
    },
    {
      id: 'skyrim-dragonborn', cat: 'rpg', franchise: 'The Elder Scrolls', game: 'The Elder Scrolls V: Skyrim',
      title: 'Dragonborn', composer: 'Jeremy Soule', year: 2011, platform: 'PC / Xbox 360 / PS3',
      sources: [apple({ song: 1849547040 }), apple({ song: 596951311 }), apple({ album: 596951310, match: 'Dragonborn' })],
    },
    {
      id: 'witcher3-geralt', cat: 'rpg', franchise: 'The Witcher', game: 'The Witcher 3: Wild Hunt',
      title: 'Geralt of Rivia', composer: 'Marcin Przybyłowicz', year: 2015, platform: 'PC / PS4 / Xbox One',
      sources: [apple({ album: 1333501415, match: ['Geralt of Rivia', 'The Trail'] })],
    },

    /* ───────────── Acción y aventura (5) ───────────── */
    {
      id: 'ac2-ezio', cat: 'accion', franchise: "Assassin's Creed", game: "Assassin's Creed II",
      title: "Ezio's Family", composer: 'Jesper Kyd', year: 2009, platform: 'PS3 / Xbox 360',
      sources: [apple({ album: 1640108379, match: "Ezio's Family" }), apple({ song: 1640273736 })],
    },
    {
      id: 'doom-bfg', cat: 'accion', franchise: 'DOOM', game: 'DOOM (2016)',
      title: 'BFG Division', composer: 'Mick Gordon', year: 2016, platform: 'PC / PS4 / Xbox One',
      sources: [apple({ song: 1157735031 }), apple({ album: 1885803215, match: 'BFG Division' })],
    },
    {
      id: 'portal-stillalive', cat: 'accion', franchise: 'Portal', game: 'Portal',
      title: 'Still Alive', composer: 'Jonathan Coulton (voz: Ellen McLain)', year: 2007, platform: 'PC',
      sources: [apple({ song: 270749989 }), apple({ song: 960006998 })],
    },
    {
      id: 'rdr-faraway', cat: 'accion', franchise: 'Red Dead Redemption', game: 'Red Dead Redemption',
      title: 'Far Away', composer: 'José González', year: 2010, platform: 'PS3 / Xbox 360',
      sources: [apple({ song: 1655229854 }), apple({ album: 1655229837, match: 'Far Away' })],
    },
    {
      id: 'sa2-livelearn', cat: 'accion', franchise: 'Sonic the Hedgehog', game: 'Sonic Adventure 2',
      title: 'Live & Learn', composer: 'Crush 40', year: 2001, platform: 'Dreamcast',
      sources: [apple({ term: 'Live and Learn Crush 40', artist: 'Crush 40', match: 'Live & Learn' })],
    },

    /* ───────────── Online y multijugador (0) ───────────── */

  ];

  /*
   * Juegos "señuelo": no tienen pista, pero aparecen como opciones incorrectas
   * y en el buscador del modo Experto para que no sea tan fácil adivinar por descarte.
   */
  AM.EXTRA_GAMES = [
    ['Halo', 'Halo: Reach'], ['Halo', 'Halo 3: ODST'], ['Halo', 'Halo 4'], ['Halo', 'Halo Infinite'],
    ['Gears of War', 'Gears of War 3'], ['Gears of War', 'Gears of War 4'], ['Gears of War', 'Gears 5'],
    ['Super Mario', 'Super Mario Bros. 3'], ['Super Mario', 'Super Mario World'], ['Super Mario', 'Super Mario Sunshine'],
    ['Super Mario', 'Super Mario Odyssey'], ['Super Mario', 'Super Mario Bros. Wonder'],
    ['Mario Kart', 'Mario Kart 64'], ['Mario Kart', 'Mario Kart 8 Deluxe'], ['Mario Kart', 'Mario Kart World'],
    ['Kirby', "Kirby's Return to Dream Land"], ['Kirby', 'Kirby and the Forgotten Land'], ['Kirby', 'Kirby 64: The Crystal Shards'],
    ['The Legend of Zelda', 'The Legend of Zelda: A Link to the Past'], ['The Legend of Zelda', "The Legend of Zelda: Majora's Mask"],
    ['The Legend of Zelda', 'The Legend of Zelda: The Wind Waker'], ['The Legend of Zelda', 'The Legend of Zelda: Twilight Princess'],
    ['The Legend of Zelda', 'The Legend of Zelda: Tears of the Kingdom'],
    ['Pokémon', 'Pokémon Gold & Silver'], ['Pokémon', 'Pokémon Ruby & Sapphire'], ['Pokémon', 'Pokémon Diamond & Pearl'],
    ['Pokémon', 'Pokémon Scarlet & Violet'],
    ['Donkey Kong', 'Donkey Kong Country 2'], ['Donkey Kong', 'Donkey Kong Bananza'],
    ['Super Smash Bros.', 'Super Smash Bros. Melee'], ['Super Smash Bros.', 'Super Smash Bros. Ultimate'],
    ['Animal Crossing', 'Animal Crossing: New Leaf'], ['Animal Crossing', 'Animal Crossing: Wild World'],
    ['Splatoon', 'Splatoon 2'], ['Splatoon', 'Splatoon 3'],
    ['Metroid', 'Super Metroid'], ['Metroid', 'Metroid Prime'], ['Metroid', 'Metroid Dread'],
    ['Hollow Knight', 'Hollow Knight: Silksong'],
    ['God of War', 'God of War III'], ['God of War', 'God of War Ragnarök'],
    ['The Last of Us', 'The Last of Us Part II'],
    ['Uncharted', 'Uncharted 2: Among Thieves'], ['Uncharted', "Uncharted 4: A Thief's End"],
    ['Ghost of Tsushima', 'Ghost of Yōtei'],
    ['Metal Gear', 'Metal Gear Solid'], ['Metal Gear', 'Metal Gear Solid V: The Phantom Pain'],
    ['Silent Hill', 'Silent Hill'], ['Silent Hill', 'Silent Hill f'],
    ['Undertale', 'Deltarune'], ['Hades', 'Hades II'], ['Ori', 'Ori and the Will of the Wisps'],
    ['Sonic the Hedgehog', 'Sonic the Hedgehog 2'], ['Sonic the Hedgehog', 'Sonic Mania'], ['Sonic the Hedgehog', 'Sonic Generations'],
    ['Street Fighter', 'Street Fighter III: 3rd Strike'], ['Street Fighter', 'Street Fighter 6'],
    ['Mega Man', 'Mega Man 3'], ['Mega Man', 'Mega Man X'],
    ['Tetris', 'Tetris 99'], ['Tetris', 'Tetris Effect'],
    ['Final Fantasy', 'Final Fantasy VI'], ['Final Fantasy', 'Final Fantasy X'], ['Final Fantasy', 'Final Fantasy VII Remake'],
    ['Kingdom Hearts', 'Kingdom Hearts II'], ['Kingdom Hearts', 'Kingdom Hearts III'],
    ['Persona', 'Persona 4 Golden'], ['Persona', 'Persona 3 Reload'],
    ['Chrono Trigger', 'Chrono Cross'],
    ['The Elder Scrolls', 'The Elder Scrolls IV: Oblivion'], ['The Witcher', 'The Witcher 2'],
    ['Dark Souls', 'Dark Souls III'], ['Bloodborne', 'Bloodborne'], ['Sekiro', 'Sekiro: Shadows Die Twice'],
    ['Elden Ring', 'Elden Ring Nightreign'],
    ['Mass Effect', 'Mass Effect 2'], ['Mass Effect', 'Mass Effect 3'],
    ['DOOM', 'DOOM (1993)'], ['DOOM', 'DOOM Eternal'],
    ["Assassin's Creed", "Assassin's Creed"], ["Assassin's Creed", "Assassin's Creed IV: Black Flag"],
    ['Portal', 'Portal 2'], ['Half-Life', 'Half-Life 2'],
    ['Red Dead Redemption', 'Red Dead Redemption 2'], ['Grand Theft Auto', 'Grand Theft Auto: San Andreas'],
    ['Grand Theft Auto', 'Grand Theft Auto V'],
    ['Minecraft', 'Minecraft Dungeons'], ['Terraria', 'Terraria'],
    ['Crash Bandicoot', 'Crash Bandicoot'], ['Spyro', 'Spyro the Dragon'], ['Banjo-Kazooie', 'Banjo-Kazooie'],
    ['Castlevania', 'Castlevania: Symphony of the Night'], ['Resident Evil', 'Resident Evil 4'],
    ['Fortnite', 'Fortnite'], ['Overwatch', 'Overwatch'], ['Destiny', 'Destiny'], ['Cyberpunk 2077', 'Cyberpunk 2077'],
  ].map(([franchise, game]) => ({ franchise: franchise, game: game }));
})(window.AM = window.AM || {});
