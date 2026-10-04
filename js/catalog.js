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
    /* ───────────── Nintendo (57) ───────────── */
    {
      id: 'acnh-main', cat: 'nintendo', franchise: 'Animal Crossing', game: 'Animal Crossing: New Horizons',
      title: 'Main Theme', composer: 'Yasuaki Iwata y equipo', year: 2020, platform: 'Switch',
      sources: [yt('lI_C1Bjdqn4'), yt('dZQez9N4VRg')],
    },
    {
      id: 'banjo-kazooie-spiral-mountain', cat: 'nintendo', franchise: 'Banjo-Kazooie', game: 'Banjo-Kazooie',
      title: 'Spiral Mountain', composer: 'Grant Kirkhope', year: 1998, platform: 'Nintendo 64',
      sources: [yt('-_Q6yI7bBWk'), yt('b1cRQRdg62E')],
    },
    {
      id: 'banjo-kazooie-treasure-trove-cove', cat: 'nintendo', franchise: 'Banjo-Kazooie', game: 'Banjo-Kazooie',
      title: 'Treasure Trove Cove', composer: 'Grant Kirkhope', year: 1998, platform: 'Nintendo 64',
      sources: [yt('5DQfnj33-QU')],
    },
    {
      id: 'bayonetta-2-tomorrow-is-mine', cat: 'nintendo', franchise: 'Bayonetta', game: 'Bayonetta 2',
      title: 'Tomorrow Is Mine', composer: 'Hiroshi Yamaguchi', year: 2014, platform: 'Wii U',
      sources: [yt('TMerSyvVarc'), yt('q_hCSCgX8A8')],
    },
    {
      id: 'dkc-aquatic', cat: 'nintendo', franchise: 'Donkey Kong', game: 'Donkey Kong Country',
      title: 'Aquatic Ambience', composer: 'David Wise', year: 1994, platform: 'SNES',
      sources: [yt('1XM8ReW9NvA'), yt('gkCcvoJ09gU')],
    },
    {
      id: 'donkey-kong-country-dk-island-swing', cat: 'nintendo', franchise: 'Donkey Kong', game: 'Donkey Kong Country',
      title: 'DK Island Swing', composer: 'David Wise', year: 1994, platform: 'SNES',
      sources: [yt('HG8YrDF6cDk'), yt('UvsDuEFyijY'), yt('p-xLui_xwlU')],
    },
    {
      id: 'donkey-kong-country-2-stickerbush-symphony', cat: 'nintendo', franchise: 'Donkey Kong', game: "Donkey Kong Country 2: Diddy's Kong Quest",
      title: 'Stickerbush Symphony', composer: 'David Wise', year: 1995, platform: 'SNES',
      sources: [yt('Oy5mdV79dww'), yt('QSEi_QmxEso')],
    },
    {
      id: 'donkey-kong-country-grassland-groove', cat: 'nintendo', franchise: 'Donkey Kong', game: 'Donkey Kong Country: Tropical Freeze',
      title: 'Grassland Groove', composer: 'David Wise', year: 2014, platform: 'Wii U / Nintendo Switch',
      sources: [yt('ss421nbCAJE'), yt('yY2cvkx4d0I')],
    },
    {
      id: 'earthbound-onett', cat: 'nintendo', franchise: 'EarthBound', game: 'EarthBound',
      title: 'Onett', composer: 'Keiichi Suzuki y Hirokazu Tanaka', year: 1994, platform: 'SNES',
      sources: [yt('XKfXsTkA71I'), yt('4IKdJ8rAs_E')],
    },
    {
      id: 'f-zero-mute-city', cat: 'nintendo', franchise: 'F-Zero', game: 'F-Zero',
      title: 'Mute City', composer: 'Yumiko Kanki y Naoto Ishida', year: 1990, platform: 'SNES',
      sources: [yt('La_Kb8U6OXA')],
    },
    {
      id: 'fire-emblem-id-purpose', cat: 'nintendo', franchise: 'Fire Emblem', game: 'Fire Emblem: Awakening',
      title: 'Id (Purpose)', composer: 'Hiroki Morishita', year: 2012, platform: 'Nintendo 3DS',
      sources: [yt('8XY5WxernwY')],
    },
    {
      id: 'fire-emblem-fates-lost-in-thoughts-all-a', cat: 'nintendo', franchise: 'Fire Emblem', game: 'Fire Emblem Fates',
      title: 'Lost in Thoughts All Alone', composer: 'Hiroki Morishita', year: 2015, platform: 'Nintendo 3DS',
      sources: [yt('lsz5ijRQvUY'), yt('EAbZa2meh0c')],
    },
    {
      id: 'fire-emblem-edge-of-dawn-seasons-o', cat: 'nintendo', franchise: 'Fire Emblem', game: 'Fire Emblem: Three Houses',
      title: 'The Edge of Dawn (Seasons of Warfare)', composer: 'Takeru Kanazaki, Hiroki Morishita y Rei Kondoh', year: 2019, platform: 'Nintendo Switch',
      sources: [yt('ozRoSNoiewc'), yt('G9yTsx04q-M')],
    },
    {
      id: 'goldeneye-007-facility', cat: 'nintendo', franchise: 'GoldenEye 007', game: 'GoldenEye 007',
      title: 'Facility', composer: 'Graeme Norgate', year: 1997, platform: 'Nintendo 64',
      sources: [yt('_oMCy3IZAQE')],
    },
    {
      id: 'kid-icarus-main-theme', cat: 'nintendo', franchise: 'Kid Icarus', game: 'Kid Icarus: Uprising',
      title: 'Main Theme', composer: 'Motoi Sakuraba', year: 2012, platform: 'Nintendo 3DS',
      sources: [yt('J72zAmL2Xv0')],
    },
    {
      id: 'kdl-greengreens', cat: 'nintendo', franchise: 'Kirby', game: "Kirby's Dream Land",
      title: 'Green Greens', composer: 'Jun Ishikawa', year: 1992, platform: 'Game Boy',
      sources: [yt('Y9ppj6hUKVA'), yt('w6-xfQ8_M3I'), yt('4Jg6yQ2XaPg')],
    },
    {
      id: 'kirby-s-adventure-butter-building', cat: 'nintendo', franchise: 'Kirby', game: "Kirby's Adventure",
      title: 'Butter Building', composer: 'Hirokazu Ando y Jun Ishikawa', year: 1993, platform: 'NES',
      sources: [yt('mvsOL6gayZo'), yt('Y7ivTr5LJlE'), yt('LgMRihX75dM')],
    },
    {
      id: 'kss-gourmet', cat: 'nintendo', franchise: 'Kirby', game: 'Kirby Super Star',
      title: 'Gourmet Race', composer: 'Jun Ishikawa', year: 1996, platform: 'SNES',
      sources: [yt('Se1uh3PS78Y'), yt('4sneo6twzmM')],
    },
    {
      id: 'kirby-triple-deluxe-masked-dedede-s-theme', cat: 'nintendo', franchise: 'Kirby', game: 'Kirby: Triple Deluxe',
      title: "Masked Dedede's Theme", composer: 'Hirokazu Ando y Jun Ishikawa', year: 2014, platform: 'Nintendo 3DS',
      sources: [yt('eeMY-ALRJCY'), yt('gKYCpiTLO3o'), yt('jtzNpDPNSfU')],
    },
    {
      id: 'mario-kart-64-rainbow-road', cat: 'nintendo', franchise: 'Mario Kart', game: 'Mario Kart 64',
      title: 'Rainbow Road', composer: 'Kenta Nagata', year: 1996, platform: 'Nintendo 64',
      sources: [yt('jbP4Ska6anw'), yt('BukCo9ebcSc'), yt('wfXDOLyG2Fc')],
    },
    {
      id: 'mario-kart-ds-waluigi-pinball', cat: 'nintendo', franchise: 'Mario Kart', game: 'Mario Kart DS',
      title: 'Waluigi Pinball', composer: 'Shinobu Tanaka', year: 2005, platform: 'Nintendo DS',
      sources: [yt('mJpAzRPpD5o')],
    },
    {
      id: 'mkwii-coconut', cat: 'nintendo', franchise: 'Mario Kart', game: 'Mario Kart Wii',
      title: 'Coconut Mall', composer: 'Asuka Ohta y Ryo Nagamatsu', year: 2008, platform: 'Wii',
      sources: [yt('bsf1RaKMRMk'), yt('U-Qm8sBfcsg')],
    },
    {
      id: 'mario-kart-8-deluxe-mario-kart-stadium', cat: 'nintendo', franchise: 'Mario Kart', game: 'Mario Kart 8 Deluxe',
      title: 'Mario Kart Stadium', composer: 'Shiho Fujii, Atsuko Asahi y Ryo Nagamatsu', year: 2017, platform: 'Nintendo Switch',
      sources: [yt('PxHL7VKoh_4'), yt('CfzySA67b8I')],
    },
    {
      id: 'metroid-brinstar', cat: 'nintendo', franchise: 'Metroid', game: 'Metroid',
      title: 'Brinstar', composer: 'Hirokazu Tanaka', year: 1986, platform: 'NES',
      sources: [yt('WVTzg2kvNaQ')],
    },
    {
      id: 'metroid-prime-phendrana-drifts', cat: 'nintendo', franchise: 'Metroid', game: 'Metroid Prime',
      title: 'Phendrana Drifts', composer: 'Kenji Yamamoto', year: 2002, platform: 'GameCube',
      sources: [yt('_-wmjWYBjQQ'), yt('ZbbUv1hz6mE')],
    },
    {
      id: 'pkmn-wild', cat: 'nintendo', franchise: 'Pokémon', game: 'Pokémon Red & Blue',
      title: 'Battle! (Wild Pokémon)', composer: 'Junichi Masuda', year: 1996, platform: 'Game Boy',
      sources: [yt('NrS523dOHU4'), yt('LgK2f47q8cU'), yt('gqjjHvz38PQ')],
    },
    {
      id: 'pokemon-red-blue-lavender-town', cat: 'nintendo', franchise: 'Pokémon', game: 'Pokémon Red & Blue',
      title: 'Lavender Town Theme', composer: 'Junichi Masuda', year: 1996, platform: 'Game Boy',
      sources: [apple({ term: 'Lavender Town Theme Pokémon Red & Blue', match: 'Lavender Town Theme' }), yt('eh626LdOXrY'), yt('pJB1nJWUk38')],
    },
    {
      id: 'pokemon-gold-silver-new-bark-town', cat: 'nintendo', franchise: 'Pokémon', game: 'Pokémon Gold & Silver',
      title: 'New Bark Town', composer: 'Junichi Masuda y Go Ichinose', year: 1999, platform: 'Game Boy Color',
      sources: [apple({ term: 'New Bark Town Pokémon Gold & Silver', match: 'New Bark Town' }), yt('D0j9AOEhzO8')],
    },
    {
      id: 'pokemon-ruby-sapphire-littleroot-town', cat: 'nintendo', franchise: 'Pokémon', game: 'Pokémon Ruby & Sapphire',
      title: 'Littleroot Town', composer: 'Go Ichinose, Junichi Masuda y Morikazu Aoki', year: 2002, platform: 'Game Boy Advance',
      sources: [
        apple({ song: 820996247 }),
        apple({ term: 'Littleroot Town Pokémon Ruby & Sapphire', match: 'Littleroot Town' }),
        yt('V1X3sjfIZD4'),
        yt('zGGR7d1lTd8'),
      ],
    },
    {
      id: 'pokemon-diamond-pearl-battle-champion', cat: 'nintendo', franchise: 'Pokémon', game: 'Pokémon Diamond & Pearl',
      title: 'Battle! (Champion)', composer: 'Go Ichinose, Junichi Masuda y Hitomi Sato', year: 2006, platform: 'Nintendo DS',
      sources: [apple({ term: 'Battle! (Champion) Pokémon Diamond & Pearl', match: 'Battle! (Champion)' }), yt('rXefFHRgyE0'), yt('z1M5GiHP8VY')],
    },
    {
      id: 'pokemon-black-white-battle-n', cat: 'nintendo', franchise: 'Pokémon', game: 'Pokémon Black & White',
      title: 'Battle! (N)', composer: 'Shota Kageyama, Junichi Masuda, Go Ichinose y Hitomi Sato', year: 2010, platform: 'Nintendo DS',
      sources: [apple({ term: 'Battle! (N) Pokémon Black & White', match: 'Battle! (N)' }), yt('Gr-qOoB_XKY')],
    },
    {
      id: 'pokemon-sword-shield-battle-champion-leon', cat: 'nintendo', franchise: 'Pokémon', game: 'Pokémon Sword & Shield',
      title: 'Battle! (Champion Leon)', composer: 'Minako Adachi y Go Ichinose', year: 2019, platform: 'Nintendo Switch',
      sources: [yt('bUG_NS0xqSY')],
    },
    {
      id: 'splatoon-splattack', cat: 'nintendo', franchise: 'Splatoon', game: 'Splatoon',
      title: 'Splattack!', composer: 'Toru Minegishi, Shiho Fujii y Ryo Nagamatsu', year: 2015, platform: 'Wii U',
      sources: [yt('LBQmvJyIKTg'), yt('64sJanf_crs')],
    },
    {
      id: 'splatoon-calamari-inkantation', cat: 'nintendo', franchise: 'Splatoon', game: 'Splatoon',
      title: 'Calamari Inkantation', composer: 'Toru Minegishi, Shiho Fujii y Ryo Nagamatsu (performed by the Squid Sisters)', year: 2015, platform: 'Wii U',
      sources: [yt('UC7wfAKDizU')],
    },
    {
      id: 'splatoon-2-ink-me-up', cat: 'nintendo', franchise: 'Splatoon', game: 'Splatoon 2',
      title: 'Ink Me Up', composer: 'Toru Minegishi, Shiho Fujii y Ryo Nagamatsu (performed by Off the Hook)', year: 2017, platform: 'Nintendo Switch',
      sources: [yt('LrsAKUnb3Qg'), yt('6cwisxAlHUU'), yt('OJbJ3D2StfE')],
    },
    {
      id: 'splatoon-3-anarchy-rainbow', cat: 'nintendo', franchise: 'Splatoon', game: 'Splatoon 3',
      title: 'Anarchy Rainbow', composer: 'Splatoon 3 sound team (performed by Deep Cut)', year: 2022, platform: 'Nintendo Switch',
      sources: [yt('GLrRjiY-hl8'), yt('ZiPGToSoLJY'), yt('lrla-fM20AA')],
    },
    {
      id: 'smb-overworld', cat: 'nintendo', franchise: 'Super Mario', game: 'Super Mario Bros.',
      title: 'Overworld Theme', composer: 'Koji Kondo', year: 1985, platform: 'NES',
      sources: [yt('iy3qq7zc4EY'), yt('L4PxvY2gjP0')],
    },
    {
      id: 'super-mario-world-overworld-theme', cat: 'nintendo', franchise: 'Super Mario', game: 'Super Mario World',
      title: 'Overworld Theme', composer: 'Koji Kondo', year: 1990, platform: 'SNES',
      sources: [yt('-HdHba9kIpE'), yt('NijZAy01EbQ'), yt('8w4nvCAx45s')],
    },
    {
      id: 'sm64-bobomb', cat: 'nintendo', franchise: 'Super Mario', game: 'Super Mario 64',
      title: 'Bob-omb Battlefield', composer: 'Koji Kondo', year: 1996, platform: 'Nintendo 64',
      sources: [yt('2TcTc4YmS9c'), yt('bmP3UHXYi28')],
    },
    {
      id: 'super-mario-64-dire-dire-docks', cat: 'nintendo', franchise: 'Super Mario', game: 'Super Mario 64',
      title: 'Dire, Dire Docks', composer: 'Koji Kondo', year: 1996, platform: 'Nintendo 64',
      sources: [yt('Zqa2mgjbOIM'), yt('CH97oY2pZpg')],
    },
    {
      id: 'super-mario-sunshine-delfino-plaza', cat: 'nintendo', franchise: 'Super Mario', game: 'Super Mario Sunshine',
      title: 'Delfino Plaza', composer: 'Koji Kondo y Shinobu Tanaka', year: 2002, platform: 'GameCube',
      sources: [yt('s4hphQfWqAc'), yt('mKl-jqYxZBg')],
    },
    {
      id: 'smg-gusty', cat: 'nintendo', franchise: 'Super Mario', game: 'Super Mario Galaxy',
      title: 'Gusty Garden Galaxy', composer: 'Mahito Yokota y Koji Kondo', year: 2007, platform: 'Wii',
      sources: [yt('1bvDHAUv2ak')],
    },
    {
      id: 'super-mario-odyssey-jump-up-super-star', cat: 'nintendo', franchise: 'Super Mario', game: 'Super Mario Odyssey',
      title: 'Jump Up, Super Star!', composer: 'Naoto Kubo', year: 2017, platform: 'Nintendo Switch',
      sources: [yt('fbR_pCRPDTg')],
    },
    {
      id: 'super-mario-rpg-beware-the-forest-s-mu', cat: 'nintendo', franchise: 'Super Mario RPG', game: 'Super Mario RPG: Legend of the Seven Stars',
      title: "Beware the Forest's Mushrooms", composer: 'Yoko Shimomura', year: 1996, platform: 'SNES',
      sources: [yt('sQPOP5XDT4o')],
    },
    {
      id: 'super-smash-bros-melee-opening', cat: 'nintendo', franchise: 'Super Smash Bros.', game: 'Super Smash Bros. Melee',
      title: 'Opening', composer: 'Hirokazu Ando', year: 2001, platform: 'GameCube',
      sources: [yt('Damxx4K_Yo8'), yt('7QAkCLAM0DY'), yt('gYxVfYo0PqE')],
    },
    {
      id: 'ssbb-main', cat: 'nintendo', franchise: 'Super Smash Bros.', game: 'Super Smash Bros. Brawl',
      title: 'Main Theme', composer: 'Nobuo Uematsu', year: 2008, platform: 'Wii',
      sources: [yt('zeKE0NHUtUw'), yt('nqbwdoNQqSQ')],
    },
    {
      id: 'legend-of-zelda-dark-world', cat: 'nintendo', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: A Link to the Past',
      title: 'Dark World', composer: 'Koji Kondo', year: 1991, platform: 'SNES',
      sources: [yt('8a0huSp6p8A'), yt('bK-ttWxl4CI')],
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
      id: 'legend-of-zelda-clock-town-first-day', cat: 'nintendo', franchise: 'The Legend of Zelda', game: "The Legend of Zelda: Majora's Mask",
      title: 'Clock Town, First Day', composer: 'Koji Kondo', year: 2000, platform: 'Nintendo 64',
      sources: [yt('bjBvktEJ3fY'), yt('vlq4CiKbh2A')],
    },
    {
      id: 'legend-of-zelda-dragon-roost-island', cat: 'nintendo', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: The Wind Waker',
      title: 'Dragon Roost Island', composer: 'Kenta Nagata, Hajime Wakai, Toru Minegishi y Koji Kondo', year: 2002, platform: 'GameCube',
      sources: [yt('SfaNKs2KZ1o'), yt('P_2qlwnWR9E')],
    },
    {
      id: 'legend-of-zelda-hyrule-field', cat: 'nintendo', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Twilight Princess',
      title: 'Hyrule Field', composer: 'Toru Minegishi y Asuka Ohta', year: 2006, platform: 'Wii / GameCube',
      sources: [yt('7xf3b-dETYw'), yt('t6JgG__XbRA')],
    },
    {
      id: 'botw-main', cat: 'nintendo', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Breath of the Wild',
      title: 'Main Theme', composer: 'Manaka Kataoka, Yasuaki Iwata y Hajime Wakai', year: 2017, platform: 'Switch / Wii U',
      sources: [yt('U_Mm4Tia9zI')],
    },
    {
      id: 'wii-sports-title-theme', cat: 'nintendo', franchise: 'Wii Sports', game: 'Wii Sports',
      title: 'Title Theme', composer: 'Kazumi Totaka', year: 2006, platform: 'Wii',
      sources: [yt('2qvAxPqy2wA'), yt('FFs8XXBU8_w'), yt('diQEujrcFG0')],
    },
    {
      id: 'xenoblade-chronicles-you-will-know-our-name', cat: 'nintendo', franchise: 'Xenoblade', game: 'Xenoblade Chronicles',
      title: 'You Will Know Our Names', composer: 'ACE+', year: 2010, platform: 'Wii',
      sources: [yt('g7yNyhLOIa4')],
    },
    {
      id: 'xenoblade-chronicles-gaur-plain', cat: 'nintendo', franchise: 'Xenoblade', game: 'Xenoblade Chronicles',
      title: 'Gaur Plain', composer: 'ACE+', year: 2010, platform: 'Wii',
      sources: [yt('UDJtsfR51To')],
    },
    {
      id: 'xenoblade-chronicles-2-battle', cat: 'nintendo', franchise: 'Xenoblade', game: 'Xenoblade Chronicles 2',
      title: 'Battle!!', composer: 'Yasunori Mitsuda, ACE, Kenji Hiramatsu y Manami Kiyota', year: 2017, platform: 'Nintendo Switch',
      sources: [yt('sMOcg5pzbhE')],
    },

    /* ───────────── Xbox (22) ───────────── */
    {
      id: 'age-of-empires-ii-shamburger', cat: 'xbox', franchise: 'Age of Empires', game: 'Age of Empires II: The Age of Kings',
      title: 'Shamburger', composer: 'Stephen Rippy', year: 1999, platform: 'PC',
      sources: [apple({ term: 'Shamburger Age of Empires II  The Age of Kings', match: 'Shamburger' })],
    },
    {
      id: 'alan-wake-children-of-the-elder', cat: 'xbox', franchise: 'Alan Wake', game: 'Alan Wake',
      title: 'Children of the Elder God', composer: 'Old Gods of Asgard (Poets of the Fall)', year: 2010, platform: 'Xbox 360',
      sources: [apple({ term: 'Children of the Elder God Alan Wake', match: 'Children of the Elder God' })],
    },
    {
      id: 'alan-wake-poet-and-the-muse', cat: 'xbox', franchise: 'Alan Wake', game: 'Alan Wake',
      title: 'The Poet and the Muse', composer: 'Old Gods of Asgard (Poets of the Fall)', year: 2010, platform: 'Xbox 360',
      sources: [apple({ term: 'The Poet and the Muse Alan Wake', match: 'The Poet and the Muse' })],
    },
    {
      id: 'alan-wake-2-herald-of-darkness', cat: 'xbox', franchise: 'Alan Wake', game: 'Alan Wake 2',
      title: 'Herald of Darkness', composer: 'Old Gods of Asgard (Poets of the Fall)', year: 2023, platform: 'PC / PS5 / Xbox Series X|S',
      sources: [apple({ term: 'Herald of Darkness Alan Wake 2', match: 'Herald of Darkness' })],
    },
    {
      id: 'blue-dragon-eternity', cat: 'xbox', franchise: 'Blue Dragon', game: 'Blue Dragon',
      title: 'Eternity', composer: 'Nobuo Uematsu (vocals Ian Gillan)', year: 2006, platform: 'Xbox 360',
      sources: [apple({ term: 'Eternity Blue Dragon', match: 'Eternity' }), yt('N6D5m10o-P4'), yt('MxAugk-QoRc'), yt('VY3nmNO06xs')],
    },
    {
      id: 'fable-fable-theme', cat: 'xbox', franchise: 'Fable', game: 'Fable',
      title: 'Fable Theme', composer: 'Danny Elfman y Russell Shaw', year: 2004, platform: 'Xbox',
      sources: [apple({ term: 'Fable Theme Fable', match: 'Fable Theme' }), yt('dtXxSISuOtg')],
    },
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
      id: 'halo-reach-overture', cat: 'xbox', franchise: 'Halo', game: 'Halo: Reach',
      title: 'Overture', composer: "Martin O'Donnell y Michael Salvatori", year: 2010, platform: 'Xbox 360',
      sources: [
        apple({ song: 1448517552 }),
        apple({ term: 'Overture Halo  Reach', match: 'Overture' }),
        yt('yMfO9ZJVst4'),
        yt('DRMLL6SSNsI'),
        yt('JhnuAlQPX_U'),
      ],
    },
    {
      id: 'halo-4-117', cat: 'xbox', franchise: 'Halo', game: 'Halo 4',
      title: '117', composer: 'Neil Davidge', year: 2012, platform: 'Xbox 360',
      sources: [apple({ term: '117 Halo 4', match: '117' }), yt('eCVg3uD8--U'), yt('iYvL0h5EZaA')],
    },
    {
      id: 'killer-instinct-instinct', cat: 'xbox', franchise: 'Killer Instinct', game: 'Killer Instinct',
      title: 'The Instinct', composer: 'Mick Gordon', year: 2013, platform: 'Xbox One',
      sources: [apple({ term: 'The Instinct Killer Instinct', match: 'The Instinct' })],
    },
    {
      id: 'ori-nibel', cat: 'xbox', franchise: 'Ori', game: 'Ori and the Blind Forest',
      title: 'Light of Nibel', composer: 'Gareth Coker', year: 2015, platform: 'Xbox One / PC',
      sources: [apple({ song: 971520996 }), apple({ album: 971519718, match: 'Light of Nibel' })],
    },
    {
      id: 'ori-and-the-blind-fore-ori-lost-in-the-storm', cat: 'xbox', franchise: 'Ori', game: 'Ori and the Blind Forest',
      title: 'Ori, Lost in the Storm', composer: 'Gareth Coker (vocals Aeralie Brighton)', year: 2015, platform: 'Xbox One',
      sources: [apple({ term: 'Ori, Lost in the Storm Ori and the Blind Forest', match: 'Ori, Lost in the Storm' })],
    },
    {
      id: 'ori-and-the-blind-fore-restoring-the-light-fa', cat: 'xbox', franchise: 'Ori', game: 'Ori and the Blind Forest',
      title: 'Restoring the Light, Facing the Dark', composer: 'Gareth Coker', year: 2015, platform: 'Xbox One',
      sources: [apple({ term: 'Restoring the Light, Facing the Dark Ori and the Blind Forest', match: 'Restoring the Light, Facing the Dark' })],
    },
    {
      id: 'ori-and-the-will-of-th-ori-and-the-will-of-th', cat: 'xbox', franchise: 'Ori', game: 'Ori and the Will of the Wisps',
      title: 'Ori and the Will of the Wisps', composer: 'Gareth Coker', year: 2020, platform: 'Xbox One',
      sources: [apple({ term: 'Ori and the Will of the Wisps Ori and the Will of the Wisps', match: 'Ori and the Will of the Wisps' })],
    },
    {
      id: 'psychonauts-milla-s-dance-party', cat: 'xbox', franchise: 'Psychonauts', game: 'Psychonauts',
      title: "Milla's Dance Party", composer: 'Peter McConnell', year: 2005, platform: 'Xbox',
      sources: [apple({ term: "Milla's Dance Party Psychonauts", match: "Milla's Dance Party" }), yt('e5DT1uS34Rs'), yt('YHpRcYXyyqo')],
    },
    {
      id: 'sea-of-thieves-grogg-mayles', cat: 'xbox', franchise: 'Sea of Thieves', game: 'Sea of Thieves',
      title: 'Grogg Mayles', composer: 'Robin Beanland', year: 2018, platform: 'Xbox One / PC',
      sources: [apple({ term: 'Grogg Mayles Sea of Thieves', match: 'Grogg Mayles' })],
    },
    {
      id: 'starfield-starfield', cat: 'xbox', franchise: 'Starfield', game: 'Starfield',
      title: 'Starfield', composer: 'Inon Zur', year: 2023, platform: 'Xbox Series X|S / PC',
      sources: [apple({ term: 'Starfield Starfield', match: 'Starfield' })],
    },

    /* ───────────── PlayStation (34) ───────────── */
    {
      id: 'bloodborne-gehrman-the-first-hunt', cat: 'playstation', franchise: 'Bloodborne', game: 'Bloodborne',
      title: 'Gehrman, the First Hunter', composer: 'Varios (Bloodborne OST, FromSoftware)', year: 2015, platform: 'PS4',
      sources: [
        apple({ term: 'Gehrman, the First Hunter Bloodborne', match: 'Gehrman, the First Hunter' }),
        yt('3V9zxXN1rx0'),
        yt('UrXUtr5RAKI'),
        yt('WUtvq0IhabU'),
      ],
    },
    {
      id: 'bloodborne-ludwig-the-holy-blade', cat: 'playstation', franchise: 'Bloodborne', game: 'Bloodborne',
      title: 'Ludwig, The Holy Blade', composer: 'Varios (Bloodborne OST, FromSoftware)', year: 2015, platform: 'PS4',
      sources: [
        apple({ song: 1087350336 }),
        apple({ term: 'Ludwig, The Holy Blade Bloodborne', match: 'Ludwig, The Holy Blade' }),
        yt('hJz38VmS45M'),
        yt('w8S5sEKsPLk'),
        yt('ALbVEmzY5S4'),
      ],
    },
    {
      id: 'crash-bandicoot-n-sanity-beach', cat: 'playstation', franchise: 'Crash Bandicoot', game: 'Crash Bandicoot',
      title: 'N. Sanity Beach', composer: 'Josh Mancell (Mutato Muzika)', year: 1996, platform: 'PS1',
      sources: [apple({ term: 'N. Sanity Beach Crash Bandicoot', match: 'N. Sanity Beach' }), yt('AxzXp2wKt6U'), yt('e68I_a6Y8rY')],
    },
    {
      id: 'death-stranding-bb-s-theme', cat: 'playstation', franchise: 'Death Stranding', game: 'Death Stranding',
      title: "BB's Theme", composer: 'Ludvig Forssell', year: 2019, platform: 'PS4',
      sources: [
        apple({ song: 1485424738, country: 'gb' }),
        apple({ term: "BB's Theme Death Stranding", match: "BB's Theme" }),
        yt('Ghk1RFr51xo'),
        yt('wlGdH9XCrgk'),
        yt('8SlJAgWmcUQ'),
      ],
    },
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
      id: 'god-of-war-2018-memories-of-mother', cat: 'playstation', franchise: 'God of War', game: 'God of War (2018)',
      title: 'Memories of Mother', composer: 'Bear McCreary', year: 2018, platform: 'PS4',
      sources: [
        apple({ song: 1370192535 }),
        apple({ term: 'Memories of Mother God of War', match: 'Memories of Mother' }),
        yt('rg8y4npCdY8'),
        yt('0qgx7I3vULE'),
        yt('eVT2R7k4MdQ'),
      ],
    },
    {
      id: 'god-of-war-ragnarok-god-of-war-ragnarok', cat: 'playstation', franchise: 'God of War', game: 'God of War Ragnarök',
      title: 'God of War Ragnarök', composer: 'Bear McCreary', year: 2022, platform: 'PS5',
      sources: [
        apple({ term: 'God of War Ragnarök God of War Ragnarök', match: 'God of War Ragnarök' }),
        yt('V5Ar0dKnl6Y'),
        yt('eMcY8-A5wtg'),
      ],
    },
    {
      id: 'god-of-war-ragnarok-blood-upon-the-snow', cat: 'playstation', franchise: 'God of War', game: 'God of War Ragnarök',
      title: 'Blood Upon the Snow', composer: 'Bear McCreary (feat. Hozier)', year: 2022, platform: 'PS5',
      sources: [
        apple({ song: 1651184274 }),
        apple({ term: 'Blood Upon the Snow God of War Ragnarök', match: 'Blood Upon the Snow' }),
        yt('n0TTcu89AC8'),
        yt('PcCXajuH7_c'),
      ],
    },
    {
      id: 'gran-turismo-moon-over-the-castle', cat: 'playstation', franchise: 'Gran Turismo', game: 'Gran Turismo',
      title: 'Moon Over the Castle', composer: 'Masahiro Andoh', year: 1997, platform: 'PS1',
      sources: [apple({ term: 'Moon Over the Castle Gran Turismo', match: 'Moon Over the Castle' })],
    },
    {
      id: 'horizon-zero-dawn-aloy-s-theme', cat: 'playstation', franchise: 'Horizon', game: 'Horizon Zero Dawn',
      title: "Aloy's Theme", composer: 'Joris de Man', year: 2017, platform: 'PS4',
      sources: [apple({ term: "Aloy's Theme Horizon Zero Dawn", match: "Aloy's Theme" }), yt('_w9B7uwLZeI'), yt('zb_fDZKwT4E'), yt('vcccPoLY3mM')],
    },
    {
      id: 'ico-you-were-there', cat: 'playstation', franchise: 'ICO', game: 'ICO',
      title: 'You Were There', composer: 'Michiru Oshima', year: 2001, platform: 'PS2',
      sources: [apple({ term: 'You Were There ICO', match: 'You Were There' }), yt('oz6wnvLBvpY'), yt('g2Ce86_b88E')],
    },
    {
      id: 'journey-apotheosis', cat: 'playstation', franchise: 'Journey', game: 'Journey',
      title: 'Apotheosis', composer: 'Austin Wintory', year: 2012, platform: 'PS3',
      sources: [apple({ term: 'Apotheosis Journey', match: 'Apotheosis' }), yt('ypNgvc6c6Cc'), yt('MN-U05agRKE'), yt('oPvMDM1q9Ws')],
    },
    {
      id: 'journey-i-was-born-for-this', cat: 'playstation', franchise: 'Journey', game: 'Journey',
      title: 'I Was Born for This', composer: 'Austin Wintory', year: 2012, platform: 'PS3',
      sources: [apple({ term: 'I Was Born for This Journey', match: 'I Was Born for This' }), yt('qizpBpHTzkU'), yt('0wErxj8y_AU')],
    },
    {
      id: 'marvel-s-spider-man-marvel-s-spider-man-ma', cat: 'playstation', franchise: "Marvel's Spider-Man", game: "Marvel's Spider-Man",
      title: 'Spider-Man', composer: 'John Paesano', year: 2018, platform: 'PS4',
      sources: [
        apple({ song: 1435822267 }),
        apple({ term: "Spider-Man Marvel's Spider-Man", match: 'Spider-Man' }),
        yt('YynWr_T8D3o'),
        yt('B_jPNlVeZNQ'),
      ],
    },
    {
      id: 'metal-gear-solid-best-is-yet-to-come', cat: 'playstation', franchise: 'Metal Gear', game: 'Metal Gear Solid',
      title: 'The Best Is Yet to Come', composer: 'Rika Muranaka', year: 1998, platform: 'PS1',
      sources: [apple({ term: 'The Best Is Yet to Come Metal Gear Solid', match: 'The Best Is Yet to Come' }), yt('KDIN5A5Z5qw'), yt('IV4W2DQsB18')],
    },
    {
      id: 'mgs3-snakeeater', cat: 'playstation', franchise: 'Metal Gear', game: 'Metal Gear Solid 3: Snake Eater',
      title: 'Snake Eater', composer: 'Norihiko Hibino (voz: Cynthia Harrell)', year: 2004, platform: 'PS2',
      sources: [apple({ album: 1856534142, match: 'Snake Eater' }), yt('KmB8ywJYMww'), yt('d-BtzNQppoI')],
    },
    {
      id: 'metal-gear-solid-4-old-snake', cat: 'playstation', franchise: 'Metal Gear', game: 'Metal Gear Solid 4: Guns of the Patriots',
      title: 'Old Snake', composer: 'Harry Gregson-Williams', year: 2008, platform: 'PS3',
      sources: [
        apple({ term: 'Old Snake Metal Gear Solid 4  Guns of the Patriots', match: 'Old Snake' }),
        yt('dPPcnYa8WaE'),
        yt('ashwD_M2UMo'),
      ],
    },
    {
      id: 'metal-gear-solid-v-sins-of-the-father', cat: 'playstation', franchise: 'Metal Gear', game: 'Metal Gear Solid V: The Phantom Pain',
      title: 'Sins of the Father', composer: 'Ludvig Forssell', year: 2015, platform: 'PS4',
      sources: [
        apple({ song: 1030638654 }),
        apple({ term: 'Sins of the Father Metal Gear Solid V  The Phantom Pain', match: 'Sins of the Father' }),
        yt('fOB3ibvOwpI'),
        yt('hzKM0mxIcUE'),
        yt('OAXdk-3ftLU'),
      ],
    },
    {
      id: 'parappa-the-rapper-chop-chop-master-onion', cat: 'playstation', franchise: 'PaRappa the Rapper', game: 'PaRappa the Rapper',
      title: "Chop Chop Master Onion's RAP", composer: 'Masaya Matsuura', year: 1996, platform: 'PS1',
      sources: [apple({ term: "Chop Chop Master Onion's RAP PaRappa the Rapper", match: "Chop Chop Master Onion's RAP" }), yt('0D028EyIMD4')],
    },
    {
      id: 'shadow-of-the-colossus-opened-way', cat: 'playstation', franchise: 'Shadow of the Colossus', game: 'Shadow of the Colossus',
      title: 'The Opened Way', composer: 'Kow Otani', year: 2005, platform: 'PS2',
      sources: [
        apple({ term: 'The Opened Way Shadow of the Colossus', match: 'The Opened Way' }),
        yt('36M-NwEFSOc'),
        yt('wWgjfeVj8rc'),
        yt('ULlY3YrJq1c'),
      ],
    },
    {
      id: 'silent-hill-silent-hill', cat: 'playstation', franchise: 'Silent Hill', game: 'Silent Hill',
      title: 'Silent Hill', composer: 'Akira Yamaoka', year: 1999, platform: 'PS1',
      sources: [apple({ term: 'Silent Hill Silent Hill', match: 'Silent Hill' }), yt('mdqNshgDwtQ'), yt('NcwXd4bwTRE')],
    },
    {
      id: 'sh2-laura', cat: 'playstation', franchise: 'Silent Hill', game: 'Silent Hill 2',
      title: 'Theme of Laura', composer: 'Akira Yamaoka', year: 2001, platform: 'PS2',
      sources: [apple({ song: 164069887 }), apple({ album: 164069102, match: 'Theme of Laura' })],
    },
    {
      id: 'silent-hill-2-promise-reprise', cat: 'playstation', franchise: 'Silent Hill', game: 'Silent Hill 2',
      title: 'Promise (Reprise)', composer: 'Akira Yamaoka', year: 2001, platform: 'PS2',
      sources: [
        apple({ song: 164070838 }),
        apple({ term: 'Promise (Reprise) Silent Hill 2', match: 'Promise (Reprise)' }),
        yt('8N_PXTGdlGw'),
        yt('DI2wOIBknAQ'),
        yt('ZwLvcaDMhU8'),
      ],
    },
    {
      id: 'silent-hill-3-you-re-not-here', cat: 'playstation', franchise: 'Silent Hill', game: 'Silent Hill 3',
      title: "You're Not Here", composer: 'Akira Yamaoka', year: 2003, platform: 'PS2',
      sources: [
        apple({ song: 163515533 }),
        apple({ term: "You're Not Here Silent Hill 3", match: "You're Not Here" }),
        yt('-V7vbUjrGGo'),
        yt('dbI3Ggfk3PM'),
        yt('-gPdnxuQM1U'),
      ],
    },
    {
      id: 'spyro-the-dragon-dark-hollow', cat: 'playstation', franchise: 'Spyro', game: 'Spyro the Dragon',
      title: 'Dark Hollow', composer: 'Stewart Copeland', year: 1998, platform: 'PS1',
      sources: [apple({ term: 'Dark Hollow Spyro the Dragon', match: 'Dark Hollow' }), yt('9bGjW3b0B8Q'), yt('0hWcN4lWYHI'), yt('8LkB4j5hYiw')],
    },
    {
      id: 'tlou-theme', cat: 'playstation', franchise: 'The Last of Us', game: 'The Last of Us',
      title: 'The Last of Us', composer: 'Gustavo Santaolalla', year: 2013, platform: 'PS3',
      sources: [apple({ album: 655118434, match: 'The Last of Us' }), apple({ song: 655119055 })],
    },
    {
      id: 'last-of-us-all-gone-no-escape', cat: 'playstation', franchise: 'The Last of Us', game: 'The Last of Us',
      title: 'All Gone (No Escape)', composer: 'Gustavo Santaolalla', year: 2013, platform: 'PS3',
      sources: [
        apple({ song: 655119119 }),
        apple({ term: 'All Gone (No Escape) The Last of Us', match: 'All Gone (No Escape)' }),
        yt('Xd-GB_ueJgA'),
        yt('PCcR9gOyzkc'),
      ],
    },
    {
      id: 'last-of-us-path-a-new-beginning', cat: 'playstation', franchise: 'The Last of Us', game: 'The Last of Us',
      title: 'The Path (A New Beginning)', composer: 'Gustavo Santaolalla', year: 2013, platform: 'PS3',
      sources: [
        apple({ song: 655119860 }),
        apple({ term: 'The Path (A New Beginning) The Last of Us', match: 'The Path (A New Beginning)' }),
        yt('vC4CfQJLhuk'),
        yt('z2f-upX-5NA'),
        yt('MzeJ7FJ0WK8'),
      ],
    },
    {
      id: 'last-of-us-part-ii-last-of-us-part-ii', cat: 'playstation', franchise: 'The Last of Us', game: 'The Last of Us Part II',
      title: 'The Last of Us Part II', composer: 'Gustavo Santaolalla', year: 2020, platform: 'PS4',
      sources: [
        apple({ song: 1517883616 }),
        apple({ term: 'The Last of Us Part II The Last of Us Part II', match: 'The Last of Us Part II' }),
        yt('fAdpMMNeiuM'),
      ],
    },
    {
      id: 'uncharted-nate', cat: 'playstation', franchise: 'Uncharted', game: "Uncharted: Drake's Fortune",
      title: "Nate's Theme", composer: 'Greg Edmonson', year: 2007, platform: 'PS3',
      sources: [apple({ album: 1553232669, match: ["Nate's Theme", 'Uncharted Theme'] }), apple({ song: 1553234143 })],
    },
    {
      id: 'uncharted-2-nate-s-theme-2-0', cat: 'playstation', franchise: 'Uncharted', game: 'Uncharted 2: Among Thieves',
      title: "Nate's Theme 2.0", composer: 'Greg Edmonson', year: 2009, platform: 'PS3',
      sources: [
        apple({ song: 1553230222 }),
        apple({ term: "Nate's Theme 2.0 Uncharted 2  Among Thieves", match: "Nate's Theme 2.0" }),
        yt('To2nyZRpZ38'),
        yt('GhdJSAPS21U'),
        yt('Dnu9bi7kHLE'),
      ],
    },
    {
      id: 'uncharted-3-nate-s-theme-3-0', cat: 'playstation', franchise: 'Uncharted', game: "Uncharted 3: Drake's Deception",
      title: "Nate's Theme 3.0", composer: 'Greg Edmonson', year: 2011, platform: 'PS3',
      sources: [
        apple({ song: 1553227936 }),
        apple({ term: "Nate's Theme 3.0 Uncharted 3  Drake's Deception", match: "Nate's Theme 3.0" }),
        yt('LFhMEb_vb7o'),
        yt('7CeB0Di84TM'),
        yt('QGwnYwTBV7I'),
      ],
    },
    {
      id: 'uncharted-4-a-thief-s-end', cat: 'playstation', franchise: 'Uncharted', game: "Uncharted 4: A Thief's End",
      title: "A Thief's End", composer: 'Henry Jackman', year: 2016, platform: 'PS4',
      sources: [
        apple({ song: 1553235646, country: 'ua' }),
        apple({ term: "A Thief's End Uncharted 4  A Thief's End", match: "A Thief's End" }),
        yt('hyVfs0CnfPo'),
        yt('lOgve-9eOC4'),
      ],
    },

    /* ───────────── Indie (41) ───────────── */
    {
      id: 'balatro-main-theme', cat: 'indie', franchise: 'Balatro', game: 'Balatro',
      title: 'Main Theme', composer: 'LouisF', year: 2024, platform: 'PC / consoles / mobile',
      sources: [apple({ term: 'Main Theme Balatro', match: 'Main Theme' })],
    },
    {
      id: 'bastion-build-that-wall-zia-s', cat: 'indie', franchise: 'Bastion', game: 'Bastion',
      title: "Build That Wall (Zia's Theme)", composer: 'Darren Korb', year: 2011, platform: 'Xbox 360 / PC',
      sources: [
        apple({ term: "Build That Wall (Zia's Theme) Bastion", match: "Build That Wall (Zia's Theme)" }),
        yt('o3SZee4YZX8'),
        yt('vBci3ue4gv4'),
        yt('dWDsoN0V238'),
      ],
    },
    {
      id: 'bastion-setting-sail-coming-ho', cat: 'indie', franchise: 'Bastion', game: 'Bastion',
      title: 'Setting Sail, Coming Home (End Theme)', composer: 'Darren Korb', year: 2011, platform: 'Xbox 360 / PC',
      sources: [
        apple({ term: 'Setting Sail, Coming Home (End Theme) Bastion', match: 'Setting Sail, Coming Home (End Theme)' }),
        yt('g60bPpXEq9Q'),
        yt('GDflVhOpS4E'),
        yt('-4SLV-D60jM'),
      ],
    },
    {
      id: 'celeste-resurrections', cat: 'indie', franchise: 'Celeste', game: 'Celeste',
      title: 'Resurrections', composer: 'Lena Raine', year: 2018, platform: 'PC / Switch',
      sources: [apple({ song: 1544899661 }), apple({ album: 1544899658, match: 'Resurrections' })],
    },
    {
      id: 'celeste-first-steps', cat: 'indie', franchise: 'Celeste', game: 'Celeste',
      title: 'First Steps', composer: 'Lena Raine', year: 2018, platform: 'PC / Switch / PS4 / Xbox One',
      sources: [apple({ term: 'First Steps Celeste', match: 'First Steps' }), yt('N8OHSXvneOE'), yt('iV3d_OMib1s'), yt('YehZRWg14HA')],
    },
    {
      id: 'celeste-reach-for-the-summit', cat: 'indie', franchise: 'Celeste', game: 'Celeste',
      title: 'Reach for the Summit', composer: 'Lena Raine', year: 2018, platform: 'PC / Switch / PS4 / Xbox One',
      sources: [
        apple({ song: 1544899676 }),
        apple({ term: 'Reach for the Summit Celeste', match: 'Reach for the Summit' }),
        yt('iDVM9KED46Q'),
        yt('qx1PcEgmFHY'),
        yt('xERAwiFleJQ'),
      ],
    },
    {
      id: 'cuphead-floral', cat: 'indie', franchise: 'Cuphead', game: 'Cuphead',
      title: 'Floral Fury', composer: 'Kristofer Maddigan', year: 2017, platform: 'Xbox One / PC',
      sources: [apple({ album: 1305353572, match: 'Floral Fury' })],
    },
    {
      id: 'cuphead-don-t-deal-with-the-de', cat: 'indie', franchise: 'Cuphead', game: 'Cuphead',
      title: "Don't Deal With the Devil", composer: 'Kristofer Maddigan', year: 2017, platform: 'PC / Xbox One',
      sources: [
        apple({ term: "Don't Deal With the Devil Cuphead", match: "Don't Deal With the Devil" }),
        yt('D4Hr0L9PrAg'),
        yt('D6KXf-kXKIA'),
        yt('0tuCSTr1XxI'),
      ],
    },
    {
      id: 'cuphead-botanic-panic', cat: 'indie', franchise: 'Cuphead', game: 'Cuphead',
      title: 'Botanic Panic', composer: 'Kristofer Maddigan', year: 2017, platform: 'PC / Xbox One',
      sources: [apple({ term: 'Botanic Panic Cuphead', match: 'Botanic Panic' }), yt('ToR93aj9U7w'), yt('_Y1FbY4DYtI'), yt('2GDiS-4JC8Q')],
    },
    {
      id: 'deltarune-rude-buster', cat: 'indie', franchise: 'Deltarune', game: 'Deltarune',
      title: 'Rude Buster', composer: 'Toby Fox', year: 2018, platform: 'PC / Switch / PS4',
      sources: [
        apple({ song: 1443475721 }),
        apple({ term: 'Rude Buster Deltarune', match: 'Rude Buster' }),
        yt('uY8hz6USA6E'),
        yt('GPL5Hkl11IQ'),
      ],
    },
    {
      id: 'deltarune-world-revolving', cat: 'indie', franchise: 'Deltarune', game: 'Deltarune',
      title: 'THE WORLD REVOLVING', composer: 'Toby Fox', year: 2018, platform: 'PC / Switch / PS4',
      sources: [
        apple({ song: 1443724720, country: 'jp' }),
        apple({ term: 'THE WORLD REVOLVING Deltarune', match: 'THE WORLD REVOLVING' }),
        yt('cfxTZ0aw6iY'),
        yt('Z01Tsgwe2dQ'),
        yt('YJgvrQXlRaw'),
      ],
    },
    {
      id: 'deltarune-big-shot', cat: 'indie', franchise: 'Deltarune', game: 'Deltarune',
      title: 'BIG SHOT', composer: 'Toby Fox', year: 2021, platform: 'PC / Switch / PS4',
      sources: [
        apple({ song: 1586414723, country: 'by' }),
        apple({ term: 'BIG SHOT Deltarune', match: 'BIG SHOT' }),
        yt('V31PVkwzpEY'),
        yt('uivFFnCI8tM'),
        yt('h3Dv_WX2NyQ'),
      ],
    },
    {
      id: 'doki-doki-literature-c-your-reality', cat: 'indie', franchise: 'Doki Doki Literature Club!', game: 'Doki Doki Literature Club!',
      title: 'Your Reality', composer: 'Dan Salvato', year: 2017, platform: 'PC',
      sources: [apple({ term: 'Your Reality Doki Doki Literature Club!', match: 'Your Reality' })],
    },
    {
      id: 'hades-noescape', cat: 'indie', franchise: 'Hades', game: 'Hades',
      title: 'No Escape', composer: 'Darren Korb', year: 2020, platform: 'PC / Switch',
      sources: [apple({ album: 1531339044, match: 'No Escape' })],
    },
    {
      id: 'hades-in-the-blood', cat: 'indie', franchise: 'Hades', game: 'Hades',
      title: 'In the Blood', composer: 'Darren Korb', year: 2020, platform: 'PC / Switch',
      sources: [apple({ term: 'In the Blood Hades', match: 'In the Blood' })],
    },
    {
      id: 'hades-good-riddance', cat: 'indie', franchise: 'Hades', game: 'Hades',
      title: 'Good Riddance', composer: 'Darren Korb', year: 2020, platform: 'PC / Switch',
      sources: [apple({ song: 1531341847 }), apple({ term: 'Good Riddance Hades', match: 'Good Riddance' }), yt('opIK0HRzODQ')],
    },
    {
      id: 'hades-out-of-tartarus', cat: 'indie', franchise: 'Hades', game: 'Hades',
      title: 'Out of Tartarus', composer: 'Darren Korb', year: 2020, platform: 'PC / Switch',
      sources: [apple({ song: 1531339317 }), apple({ term: 'Out of Tartarus Hades', match: 'Out of Tartarus' }), yt('SqFaCDvHxU4')],
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
      id: 'hollow-knight-sealed-vessel', cat: 'indie', franchise: 'Hollow Knight', game: 'Hollow Knight',
      title: 'Sealed Vessel', composer: 'Christopher Larkin', year: 2017, platform: 'PC / Switch',
      sources: [
        apple({ song: 1263341956 }),
        apple({ term: 'Sealed Vessel Hollow Knight', match: 'Sealed Vessel' }),
        yt('ze0Rk-m0w2A'),
        yt('Si5kGxjjGhQ'),
        yt('Vx8vDD5iHS0'),
      ],
    },
    {
      id: 'minecraft-sweden', cat: 'indie', franchise: 'Minecraft', game: 'Minecraft',
      title: 'Sweden', composer: 'C418', year: 2011, platform: 'PC',
      sources: [apple({ song: 424968546 }), apple({ album: 1867885113, match: 'Sweden' }), apple({ album: 424968465, match: 'Sweden' })],
    },
    {
      id: 'minecraft-wet-hands', cat: 'indie', franchise: 'Minecraft', game: 'Minecraft',
      title: 'Wet Hands', composer: 'C418', year: 2011, platform: 'PC / consoles / mobile',
      sources: [apple({ term: 'Wet Hands Minecraft', match: 'Wet Hands' }), yt('mukiMaOSLEs'), yt('en4a2uTHimI'), yt('KE4SAcCQEV8')],
    },
    {
      id: 'minecraft-subwoofer-lullaby', cat: 'indie', franchise: 'Minecraft', game: 'Minecraft',
      title: 'Subwoofer Lullaby', composer: 'C418', year: 2011, platform: 'PC / consoles / mobile',
      sources: [apple({ term: 'Subwoofer Lullaby Minecraft', match: 'Subwoofer Lullaby' }), yt('Gpd85y_iTxY'), yt('Mm09rmYXQew'), yt('e3OWlATOY68')],
    },
    {
      id: 'minecraft-mice-on-venus', cat: 'indie', franchise: 'Minecraft', game: 'Minecraft',
      title: 'Mice on Venus', composer: 'C418', year: 2011, platform: 'PC / consoles / mobile',
      sources: [apple({ term: 'Mice on Venus Minecraft', match: 'Mice on Venus' }), yt('DZ47H84Bc_Q'), yt('T0lMMg6p0KA'), yt('KDJNX1Ou--U')],
    },
    {
      id: 'outer-wilds-travelers', cat: 'indie', franchise: 'Outer Wilds', game: 'Outer Wilds',
      title: 'Travelers', composer: 'Andrew Prahlow', year: 2019, platform: 'PC / Xbox One',
      sources: [apple({ term: 'Travelers Outer Wilds', match: 'Travelers' }), yt('PghYdJEB3G0'), yt('9sZq71GFjaE')],
    },
    {
      id: 'pizza-tower-it-s-pizza-time', cat: 'indie', franchise: 'Pizza Tower', game: 'Pizza Tower',
      title: "It's Pizza Time!", composer: 'Mr. Sauceman', year: 2023, platform: 'PC',
      sources: [apple({ term: "It's Pizza Time! Pizza Tower", match: "It's Pizza Time!" })],
    },
    {
      id: 'plants-vs-zombies-grasswalk', cat: 'indie', franchise: 'Plants vs. Zombies', game: 'Plants vs. Zombies',
      title: 'Grasswalk', composer: 'Laura Shigihara', year: 2009, platform: 'PC',
      sources: [apple({ term: 'Grasswalk Plants vs. Zombies', match: 'Grasswalk' })],
    },
    {
      id: 'plants-vs-zombies-zombies-on-your-lawn', cat: 'indie', franchise: 'Plants vs. Zombies', game: 'Plants vs. Zombies',
      title: 'Zombies on Your Lawn', composer: 'Laura Shigihara', year: 2009, platform: 'PC',
      sources: [apple({ term: 'Zombies on Your Lawn Plants vs. Zombies', match: 'Zombies on Your Lawn' })],
    },
    {
      id: 'shovel-knight-strike-the-earth-plain', cat: 'indie', franchise: 'Shovel Knight', game: 'Shovel Knight',
      title: 'Strike the Earth! (Plains of Passage)', composer: 'Jake Kaufman', year: 2014, platform: 'PC / Wii U / 3DS',
      sources: [
        apple({ term: 'Strike the Earth! (Plains of Passage) Shovel Knight', match: 'Strike the Earth! (Plains of Passage)' }),
        yt('LPY7qNikycI'),
        yt('W7rhEKTX-sE'),
        yt('wqAYMZSOQao'),
      ],
    },
    {
      id: 'stardew-overture', cat: 'indie', franchise: 'Stardew Valley', game: 'Stardew Valley',
      title: 'Stardew Valley Overture', composer: 'ConcernedApe (Eric Barone)', year: 2016, platform: 'PC',
      sources: [apple({ album: 1158129204, match: 'Overture' }), apple({ song: 1831635031 })],
    },
    {
      id: 'stardew-valley-spring-it-s-a-big-worl', cat: 'indie', franchise: 'Stardew Valley', game: 'Stardew Valley',
      title: "Spring (It's A Big World Outside)", composer: 'ConcernedApe', year: 2016, platform: 'PC',
      sources: [
        apple({ term: "Spring (It's A Big World Outside) Stardew Valley", match: "Spring (It's A Big World Outside)" }),
        yt('bnWiJEAHZLk'),
      ],
    },
    {
      id: 'super-meat-boy-forest-funk', cat: 'indie', franchise: 'Super Meat Boy', game: 'Super Meat Boy',
      title: 'Forest Funk', composer: 'Danny Baranowsky', year: 2010, platform: 'Xbox 360 / PC',
      sources: [apple({ term: 'Forest Funk Super Meat Boy', match: 'Forest Funk' })],
    },
    {
      id: 'terraria-overworld-day', cat: 'indie', franchise: 'Terraria', game: 'Terraria',
      title: 'Overworld Day', composer: 'Scott Lloyd Shelly', year: 2011, platform: 'PC / consoles / mobile',
      sources: [apple({ term: 'Overworld Day Terraria', match: 'Overworld Day' }), yt('Zmd43wV2Ko4'), yt('S20YJA6CoZo'), yt('3Fp_nERWO3c')],
    },
    {
      id: 'terraria-boss-1', cat: 'indie', franchise: 'Terraria', game: 'Terraria',
      title: 'Boss 1', composer: 'Scott Lloyd Shelly', year: 2011, platform: 'PC / consoles / mobile',
      sources: [apple({ term: 'Boss 1 Terraria', match: 'Boss 1' }), yt('jp_rl-1rYpQ')],
    },
    {
      id: 'to-the-moon-everything-s-alright', cat: 'indie', franchise: 'To the Moon', game: 'To the Moon',
      title: "Everything's Alright", composer: 'Kan Gao y Laura Shigihara', year: 2011, platform: 'PC',
      sources: [apple({ term: "Everything's Alright To the Moon", match: "Everything's Alright" })],
    },
    {
      id: 'transistor-we-all-become', cat: 'indie', franchise: 'Transistor', game: 'Transistor',
      title: 'We All Become', composer: 'Darren Korb', year: 2014, platform: 'PC / PS4',
      sources: [apple({ term: 'We All Become Transistor', match: 'We All Become' })],
    },
    {
      id: 'undertale-megalovania', cat: 'indie', franchise: 'Undertale', game: 'Undertale',
      title: 'Megalovania', composer: 'Toby Fox', year: 2015, platform: 'PC',
      sources: [apple({ song: 1528217897 }), apple({ album: 1528217465, match: 'Megalovania' }), apple({ album: 1119806348, match: 'Megalovania' })],
    },
    {
      id: 'undertale-hopes-and-dreams', cat: 'indie', franchise: 'Undertale', game: 'Undertale',
      title: 'Hopes and Dreams', composer: 'Toby Fox', year: 2015, platform: 'PC',
      sources: [apple({ term: 'Hopes and Dreams Undertale', match: 'Hopes and Dreams' }), yt('kX6LHY_fddw'), yt('Bzgvx00LTYg')],
    },
    {
      id: 'undertale-spear-of-justice', cat: 'indie', franchise: 'Undertale', game: 'Undertale',
      title: 'Spear of Justice', composer: 'Toby Fox', year: 2015, platform: 'PC',
      sources: [
        apple({ song: 1528217841 }),
        apple({ term: 'Spear of Justice Undertale', match: 'Spear of Justice' }),
        yt('UP4PzIYsnFk'),
        yt('ApWpYmO7G28'),
      ],
    },
    {
      id: 'undertale-bonetrousle', cat: 'indie', franchise: 'Undertale', game: 'Undertale',
      title: 'Bonetrousle', composer: 'Toby Fox', year: 2015, platform: 'PC',
      sources: [apple({ song: 1119807161 }), apple({ term: 'Bonetrousle Undertale', match: 'Bonetrousle' }), yt('M0I76Xp_ntM'), yt('AKAiUtWZ4xY')],
    },

    /* ───────────── Retro 8/16 bits (24) ───────────── */
    {
      id: 'castlevania-vampire-killer', cat: 'retro', franchise: 'Castlevania', game: 'Castlevania',
      title: 'Vampire Killer', composer: 'Kinuyo Yamashita', year: 1986, platform: 'NES',
      sources: [apple({ term: 'Vampire Killer Castlevania', match: 'Vampire Killer' }), yt('_Kuh_OjCpMs'), yt('btgi3TPL3AE')],
    },
    {
      id: 'castlevania-ii-bloody-tears', cat: 'retro', franchise: 'Castlevania', game: "Castlevania II: Simon's Quest",
      title: 'Bloody Tears', composer: 'Kenichi Matsubara', year: 1987, platform: 'NES',
      sources: [apple({ term: "Bloody Tears Castlevania II  Simon's Quest", match: 'Bloody Tears' }), yt('e2oZtvjg5oA'), yt('wKWJkiWGS8M')],
    },
    {
      id: 'castlevania-dracula-s-castle', cat: 'retro', franchise: 'Castlevania', game: 'Castlevania: Symphony of the Night',
      title: "Dracula's Castle", composer: 'Michiru Yamane', year: 1997, platform: 'PlayStation',
      sources: [
        apple({ song: 1459346130 }),
        apple({ term: "Dracula's Castle Castlevania  Symphony of the Night", match: "Dracula's Castle" }),
        yt('X7faGl3O6Oc'),
        yt('ASE2Yqtefbo'),
      ],
    },
    {
      id: 'contra-jungle', cat: 'retro', franchise: 'Contra', game: 'Contra',
      title: 'Jungle', composer: 'Kiyohiro Sada, Hidenori Maezawa', year: 1988, platform: 'NES',
      sources: [apple({ term: 'Jungle Contra', match: 'Jungle' }), yt('O04bPRzqEEk'), yt('q3kRcj74DPI')],
    },
    {
      id: 'doom-1993-at-doom-s-gate', cat: 'retro', franchise: 'DOOM', game: 'DOOM (1993)',
      title: "At Doom's Gate", composer: 'Bobby Prince', year: 1993, platform: 'PC (MS-DOS)',
      sources: [apple({ term: "At Doom's Gate DOOM", match: "At Doom's Gate" }), yt('DnPkRkCwgNw'), yt('2nPqZrNQ5G0')],
    },
    {
      id: 'ducktales-moon', cat: 'retro', franchise: 'DuckTales', game: 'DuckTales',
      title: 'The Moon', composer: 'Hiroshige Tonomura', year: 1989, platform: 'NES',
      sources: [apple({ term: 'The Moon DuckTales', match: 'The Moon' }), yt('3aXCr5-GN1I')],
    },
    {
      id: 'golden-axe-wilderness', cat: 'retro', franchise: 'Golden Axe', game: 'Golden Axe',
      title: 'Wilderness', composer: 'Tohru Nakabayashi', year: 1989, platform: 'Arcade',
      sources: [apple({ term: 'Wilderness Golden Axe', match: 'Wilderness' }), yt('h1_xSBHBQlU'), yt('1-nrStu5iXw')],
    },
    {
      id: 'mm2-wily', cat: 'retro', franchise: 'Mega Man', game: 'Mega Man 2',
      title: 'Dr. Wily Stage 1', composer: 'Takashi Tateishi', year: 1988, platform: 'NES',
      sources: [yt('aTbfpkByIM8'), yt('eELMoAwkqd0'), yt('Mo6if_sRTcU')],
    },
    {
      id: 'mega-man-2-air-man-stage', cat: 'retro', franchise: 'Mega Man', game: 'Mega Man 2',
      title: 'Air Man Stage', composer: 'Takashi Tateishi', year: 1988, platform: 'NES',
      sources: [apple({ term: 'Air Man Stage Mega Man 2', match: 'Air Man Stage' }), yt('IhK4D3ytYMc'), yt('WahcvcX0ywA')],
    },
    {
      id: 'mega-man-x-opening-stage', cat: 'retro', franchise: 'Mega Man', game: 'Mega Man X',
      title: 'Opening Stage', composer: 'Setsuo Yamamoto, Makoto Tomozawa, Yuki Iwai, Yuko Takehara, Toshihiko Horiyama', year: 1993, platform: 'SNES',
      sources: [apple({ term: 'Opening Stage Mega Man X', match: 'Opening Stage' }), yt('8F2jf0NRl2Y'), yt('MkhIGJsYb4I')],
    },
    {
      id: 'metal-slug-assault-theme', cat: 'retro', franchise: 'Metal Slug', game: 'Metal Slug',
      title: 'Assault Theme', composer: 'Takushi Hiyamuta', year: 1996, platform: 'Arcade (Neo Geo)',
      sources: [apple({ term: 'Assault Theme Metal Slug', match: 'Assault Theme' }), yt('JkaxKr1vhsI')],
    },
    {
      id: 'ninja-gaiden-unbreakable-determinat', cat: 'retro', franchise: 'Ninja Gaiden', game: 'Ninja Gaiden',
      title: 'Unbreakable Determination', composer: 'Keiji Yamagishi, Mikio Saito', year: 1988, platform: 'NES',
      sources: [
        apple({ term: 'Unbreakable Determination Ninja Gaiden', match: 'Unbreakable Determination' }),
        yt('dMomBXNDpaM'),
        yt('5tshhUMFEHI'),
        yt('dVBDCaV3i4o'),
      ],
    },
    {
      id: 'out-run-magical-sound-shower', cat: 'retro', franchise: 'Out Run', game: 'Out Run',
      title: 'Magical Sound Shower', composer: 'Hiroshi Kawaguchi', year: 1986, platform: 'Arcade',
      sources: [
        apple({ term: 'Magical Sound Shower Out Run', match: 'Magical Sound Shower' }),
        yt('fy95rEEyd1o'),
        yt('vpHM6mtnIf8'),
        yt('yTDlKHfPmBk'),
      ],
    },
    {
      id: 'sonic-greenhill', cat: 'retro', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog',
      title: 'Green Hill Zone', composer: 'Masato Nakamura', year: 1991, platform: 'Mega Drive',
      sources: [apple({ song: 1167536866 }), apple({ term: 'Green Hill Zone Masato Nakamura', artist: 'Nakamura', match: 'Green Hill Zone' })],
    },
    {
      id: 'sonic-the-hedgehog-2-chemical-plant-zone', cat: 'retro', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog 2',
      title: 'Chemical Plant Zone', composer: 'Masato Nakamura', year: 1992, platform: 'Sega Genesis',
      sources: [
        apple({ song: 1571062943 }),
        apple({ term: 'Chemical Plant Zone Sonic the Hedgehog 2', match: 'Chemical Plant Zone' }),
        yt('SrCgjGnlQRQ'),
        yt('-LYB7iLZNWE'),
      ],
    },
    {
      id: 'sonic-the-hedgehog-3-icecap-zone-act-1', cat: 'retro', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog 3',
      title: 'IceCap Zone Act 1', composer: 'Brad Buxer', year: 1994, platform: 'Sega Genesis',
      sources: [apple({ term: 'IceCap Zone Act 1 Sonic the Hedgehog 3', match: 'IceCap Zone Act 1' }), yt('mKL0BtScEd8'), yt('hYxlqTpZ-24')],
    },
    {
      id: 'sf2-guile', cat: 'retro', franchise: 'Street Fighter', game: 'Street Fighter II',
      title: "Guile's Theme", composer: 'Yoko Shimomura', year: 1991, platform: 'Arcade',
      sources: [apple({ album: 1085989596, country: 'jp', match: 'Guile' }), yt('xOinHbF8l8Y'), yt('FEdbR0jnfvQ')],
    },
    {
      id: 'street-fighter-ii-ken-s-theme', cat: 'retro', franchise: 'Street Fighter', game: 'Street Fighter II',
      title: "Ken's Theme", composer: 'Yoko Shimomura', year: 1991, platform: 'Arcade',
      sources: [apple({ term: "Ken's Theme Street Fighter II", match: "Ken's Theme" }), yt('qHeY9O7FAIQ'), yt('Hm0ncSVPp8Y')],
    },
    {
      id: 'street-fighter-ii-ryu-s-theme', cat: 'retro', franchise: 'Street Fighter', game: 'Street Fighter II',
      title: "Ryu's Theme", composer: 'Yoko Shimomura', year: 1991, platform: 'Arcade',
      sources: [apple({ term: "Ryu's Theme Street Fighter II", match: "Ryu's Theme" }), yt('wkdz9hl-cVQ')],
    },
    {
      id: 'streets-of-rage-2-go-straight', cat: 'retro', franchise: 'Streets of Rage', game: 'Streets of Rage 2',
      title: 'Go Straight', composer: 'Yuzo Koshiro', year: 1992, platform: 'Sega Genesis',
      sources: [
        apple({ song: 1512610923, country: 'ca' }),
        apple({ term: 'Go Straight Streets of Rage 2', match: 'Go Straight' }),
        yt('pPeh7LBMLcs'),
        yt('WZzAYjcb1eY'),
      ],
    },
    {
      id: 'teenage-mutant-ninja-t-big-apple-3-a-m', cat: 'retro', franchise: 'Teenage Mutant Ninja Turtles', game: 'Teenage Mutant Ninja Turtles IV: Turtles in Time',
      title: 'Big Apple, 3 A.M.', composer: 'Konami Kukeiha Club', year: 1992, platform: 'SNES',
      sources: [
        apple({ term: 'Big Apple, 3 A.M. Teenage Mutant Ninja Turtles IV  Turtles in Time', match: 'Big Apple, 3 A.M.' }),
        yt('OzWCrGW5Fnw'),
        yt('6Y6CaQgqkkM'),
        yt('GxZIxTqCbfM'),
      ],
    },
    {
      id: 'tetris-a', cat: 'retro', franchise: 'Tetris', game: 'Tetris (Game Boy)',
      title: 'Type A (Korobeiniki)', composer: 'Tradicional, arr. Hirokazu Tanaka', year: 1989, platform: 'Game Boy',
      sources: [yt('-41jPSBWKNE')],
    },
    {
      id: 'king-of-fighters-98-esaka-forever', cat: 'retro', franchise: 'The King of Fighters', game: "The King of Fighters '98",
      title: 'Esaka Forever', composer: 'SNK Neo Sound Orchestra', year: 1998, platform: 'Arcade (Neo Geo)',
      sources: [apple({ song: 1142071701, country: 'cl' }), apple({ term: "Esaka Forever The King of Fighters '98", match: 'Esaka Forever' })],
    },
    {
      id: 'top-gear-las-vegas', cat: 'retro', franchise: 'Top Gear', game: 'Top Gear',
      title: 'Las Vegas', composer: 'Barry Leitch', year: 1992, platform: 'SNES',
      sources: [apple({ term: 'Las Vegas Top Gear', match: 'Las Vegas' }), yt('R-3x8P0YpvA')],
    },

    /* ───────────── RPG y fantasía (46) ───────────── */
    {
      id: 'baldur-s-gate-3-i-want-to-live', cat: 'rpg', franchise: "Baldur's Gate", game: "Baldur's Gate 3",
      title: 'I Want to Live', composer: 'Borislav Slavov', year: 2023, platform: 'PC / PS5 / Xbox Series',
      sources: [apple({ term: "I Want to Live Baldur's Gate 3", match: 'I Want to Live' })],
    },
    {
      id: 'baldur-s-gate-3-raphael-s-final-act', cat: 'rpg', franchise: "Baldur's Gate", game: "Baldur's Gate 3",
      title: "Raphael's Final Act", composer: 'Borislav Slavov', year: 2023, platform: 'PC / PS5 / Xbox Series',
      sources: [apple({ term: "Raphael's Final Act Baldur's Gate 3", match: "Raphael's Final Act" })],
    },
    {
      id: 'chrono-main', cat: 'rpg', franchise: 'Chrono Trigger', game: 'Chrono Trigger',
      title: 'Chrono Trigger (Main Theme)', composer: 'Yasunori Mitsuda', year: 1995, platform: 'SNES',
      sources: [apple({ song: 324080961 }), apple({ album: 324080907, match: 'Chrono Trigger' })],
    },
    {
      id: 'chrono-trigger-corridors-of-time', cat: 'rpg', franchise: 'Chrono Trigger', game: 'Chrono Trigger',
      title: 'Corridors of Time', composer: 'Yasunori Mitsuda', year: 1995, platform: 'SNES',
      sources: [apple({ term: 'Corridors of Time Chrono Trigger', match: 'Corridors of Time' })],
    },
    {
      id: 'chrono-cross-chrono-cross-time-s-sc', cat: 'rpg', franchise: 'Chrono Trigger', game: 'Chrono Cross',
      title: "CHRONO CROSS ~Time's Scar~", composer: 'Yasunori Mitsuda', year: 1999, platform: 'PlayStation',
      sources: [apple({ term: "CHRONO CROSS ~Time's Scar~ Chrono Cross", match: "CHRONO CROSS ~Time's Scar~" })],
    },
    {
      id: 'clair-obscur-lumiere', cat: 'rpg', franchise: 'Clair Obscur', game: 'Clair Obscur: Expedition 33',
      title: 'Lumière', composer: 'Lorien Testard', year: 2025, platform: 'PS5 / Xbox Series / PC',
      sources: [apple({ term: 'Lumière Clair Obscur  Expedition 33', match: 'Lumière' })],
    },
    {
      id: 'clair-obscur-une-vie-a-peindre', cat: 'rpg', franchise: 'Clair Obscur', game: 'Clair Obscur: Expedition 33',
      title: 'Une vie à peindre', composer: 'Lorien Testard', year: 2025, platform: 'PS5 / Xbox Series / PC',
      sources: [apple({ term: 'Une vie à peindre Clair Obscur  Expedition 33', match: 'Une vie à peindre' })],
    },
    {
      id: 'cyberpunk-2077-never-fade-away', cat: 'rpg', franchise: 'Cyberpunk 2077', game: 'Cyberpunk 2077',
      title: 'Never Fade Away', composer: 'SAMURAI (Refused)', year: 2020, platform: 'PC / PS4 / Xbox One',
      sources: [apple({ term: 'Never Fade Away Cyberpunk 2077', match: 'Never Fade Away' })],
    },
    {
      id: 'cyberpunk-2077-i-really-want-to-stay', cat: 'rpg', franchise: 'Cyberpunk 2077', game: 'Cyberpunk 2077',
      title: 'I Really Want to Stay at Your House', composer: 'Rosa Walton (with Hallie Coggins)', year: 2020, platform: 'PC / PS4 / Xbox One',
      sources: [apple({ term: 'I Really Want to Stay at Your House Cyberpunk 2077', match: 'I Really Want to Stay at Your House' })],
    },
    {
      id: 'ds-gwyn', cat: 'rpg', franchise: 'Dark Souls', game: 'Dark Souls',
      title: 'Gwyn, Lord of Cinder', composer: 'Motoi Sakuraba', year: 2011, platform: 'PS3 / Xbox 360',
      sources: [apple({ song: 1777191721 }), apple({ song: 1629873067 })],
    },
    {
      id: 'dark-souls-iii-soul-of-cinder', cat: 'rpg', franchise: 'Dark Souls', game: 'Dark Souls III',
      title: 'Soul of Cinder', composer: 'Motoi Sakuraba', year: 2016, platform: 'PS4 / Xbox One / PC',
      sources: [apple({ term: 'Soul of Cinder Dark Souls III', match: 'Soul of Cinder' })],
    },
    {
      id: 'diablo-tristram', cat: 'rpg', franchise: 'Diablo', game: 'Diablo',
      title: 'Tristram', composer: 'Matt Uelmen', year: 1996, platform: 'PC',
      sources: [apple({ term: 'Tristram Diablo', match: 'Tristram' })],
    },
    {
      id: 'dragon-quest-overture', cat: 'rpg', franchise: 'Dragon Quest', game: 'Dragon Quest',
      title: 'Overture', composer: 'Koichi Sugiyama', year: 1986, platform: 'NES / Famicom',
      sources: [apple({ term: 'Overture Dragon Quest', match: 'Overture' })],
    },
    {
      id: 'er-main', cat: 'rpg', franchise: 'Elden Ring', game: 'Elden Ring',
      title: 'Elden Ring', composer: 'Tsukasa Saitoh', year: 2022, platform: 'PC / PS5 / Xbox Series',
      sources: [apple({ song: 1642354007 }), apple({ album: 1642353969, match: 'Elden Ring' })],
    },
    {
      id: 'elden-ring-malenia-blade-of-mique', cat: 'rpg', franchise: 'Elden Ring', game: 'Elden Ring',
      title: 'Malenia, Blade of Miquella', composer: 'FromSoftware Sound Team', year: 2022, platform: 'PS5 / PS4 / Xbox / PC',
      sources: [apple({ term: 'Malenia, Blade of Miquella Elden Ring', match: 'Malenia, Blade of Miquella' })],
    },
    {
      id: 'elden-ring-starscourge-radahn', cat: 'rpg', franchise: 'Elden Ring', game: 'Elden Ring',
      title: 'Starscourge Radahn', composer: 'FromSoftware Sound Team', year: 2022, platform: 'PS5 / PS4 / Xbox / PC',
      sources: [apple({ term: 'Starscourge Radahn Elden Ring', match: 'Starscourge Radahn' })],
    },
    {
      id: 'ff7-owa', cat: 'rpg', franchise: 'Final Fantasy', game: 'Final Fantasy VII',
      title: 'One-Winged Angel', composer: 'Nobuo Uematsu', year: 1997, platform: 'PlayStation',
      sources: [apple({ album: 61018952, match: 'One-Winged Angel' }), apple({ song: 1669116129 })],
    },
    {
      id: 'final-fantasy-viii-liberi-fatali', cat: 'rpg', franchise: 'Final Fantasy', game: 'Final Fantasy VIII',
      title: 'Liberi Fatali', composer: 'Nobuo Uematsu', year: 1999, platform: 'PlayStation',
      sources: [
        apple({ song: 62442431 }),
        apple({ term: 'Liberi Fatali Final Fantasy VIII', match: 'Liberi Fatali' }),
        yt('q9wjSimPjPQ'),
        yt('0ihKQl9R6a4'),
        yt('Vcm_ZSCqLFs'),
      ],
    },
    {
      id: 'final-fantasy-ix-melodies-of-life', cat: 'rpg', franchise: 'Final Fantasy', game: 'Final Fantasy IX',
      title: 'Melodies Of Life', composer: 'Nobuo Uematsu (vocals Emiko Shiratori)', year: 2000, platform: 'PlayStation',
      sources: [
        apple({ term: 'Melodies Of Life Final Fantasy IX', match: 'Melodies Of Life' }),
        yt('6qbYS7hXB8U'),
        yt('u4bqksY_6JM'),
        yt('hnqBFhEraQU'),
      ],
    },
    {
      id: 'final-fantasy-x-to-zanarkand', cat: 'rpg', franchise: 'Final Fantasy', game: 'Final Fantasy X',
      title: 'To Zanarkand', composer: 'Nobuo Uematsu', year: 2001, platform: 'PlayStation 2',
      sources: [apple({ term: 'To Zanarkand Final Fantasy X', match: 'To Zanarkand' }), yt('6fp81GzKarQ'), yt('CCPtGpqvKt4'), yt('ewvyrFnOstQ')],
    },
    {
      id: 'final-fantasy-xv-somnus', cat: 'rpg', franchise: 'Final Fantasy', game: 'Final Fantasy XV',
      title: 'Somnus', composer: 'Yoko Shimomura', year: 2016, platform: 'PlayStation 4 / Xbox One',
      sources: [apple({ term: 'Somnus Final Fantasy XV', match: 'Somnus' }), yt('juVZ0TN_2EA'), yt('SAMJBAJlQSc'), yt('4vGxgMnzNwM')],
    },
    {
      id: 'final-fantasy-xvi-find-the-flame', cat: 'rpg', franchise: 'Final Fantasy', game: 'Final Fantasy XVI',
      title: 'Find the Flame', composer: 'Masayoshi Soken', year: 2023, platform: 'PlayStation 5',
      sources: [
        apple({ term: 'Find the Flame Final Fantasy XVI', match: 'Find the Flame' }),
        yt('CeqyEzK87z4'),
        yt('itCm4SRFbQA'),
      ],
    },
    {
      id: 'final-fantasy-vii-rebi-no-promises-to-keep', cat: 'rpg', franchise: 'Final Fantasy', game: 'Final Fantasy VII Rebirth',
      title: 'No Promises to Keep', composer: 'Nobuo Uematsu (vocals Loren Allred)', year: 2024, platform: 'PlayStation 5',
      sources: [
        apple({ term: 'No Promises to Keep Final Fantasy VII Rebirth', match: 'No Promises to Keep' }),
        yt('QskW_S15TfI'),
        yt('lA3nNG7ML4k'),
        yt('pMcdIIN_CME'),
      ],
    },
    {
      id: 'kh-dearly', cat: 'rpg', franchise: 'Kingdom Hearts', game: 'Kingdom Hearts',
      title: 'Dearly Beloved', composer: 'Yoko Shimomura', year: 2002, platform: 'PS2',
      sources: [apple({ song: 1670071084 }), apple({ song: 1669112029 })],
    },
    {
      id: 'kingdom-hearts-simple-and-clean', cat: 'rpg', franchise: 'Kingdom Hearts', game: 'Kingdom Hearts',
      title: 'Simple And Clean', composer: 'Utada Hikaru', year: 2002, platform: 'PlayStation 2',
      sources: [apple({ term: 'Simple And Clean Kingdom Hearts', match: 'Simple And Clean' }), yt('_Hl3W4HB254')],
    },
    {
      id: 'kingdom-hearts-ii-sanctuary', cat: 'rpg', franchise: 'Kingdom Hearts', game: 'Kingdom Hearts II',
      title: 'Sanctuary', composer: 'Utada Hikaru', year: 2005, platform: 'PlayStation 2',
      sources: [apple({ term: 'Sanctuary Kingdom Hearts II', match: 'Sanctuary' }), yt('z11j5hDvA9I'), yt('P1YL4FkCtUw')],
    },
    {
      id: 'kingdom-hearts-iii-don-t-think-twice', cat: 'rpg', franchise: 'Kingdom Hearts', game: 'Kingdom Hearts III',
      title: "Don't Think Twice", composer: 'Utada Hikaru', year: 2019, platform: 'PlayStation 4 / Xbox One',
      sources: [apple({ term: "Don't Think Twice Kingdom Hearts III", match: "Don't Think Twice" }), yt('QYvuImubf80'), yt('hzEqnil0Kf0')],
    },
    {
      id: 'me-vigil', cat: 'rpg', franchise: 'Mass Effect', game: 'Mass Effect',
      title: 'Vigil', composer: 'Jack Wall y Sam Hulick', year: 2007, platform: 'Xbox 360',
      sources: [apple({ song: 1477893943 }), apple({ album: 290609421, match: 'Vigil' })],
    },
    {
      id: 'mass-effect-2-suicide-mission', cat: 'rpg', franchise: 'Mass Effect', game: 'Mass Effect 2',
      title: 'Suicide Mission', composer: 'Jack Wall', year: 2010, platform: 'Xbox 360 / PC',
      sources: [apple({ term: 'Suicide Mission Mass Effect 2', match: 'Suicide Mission' })],
    },
    {
      id: 'monster-hunter-proof-of-a-hero', cat: 'rpg', franchise: 'Monster Hunter', game: 'Monster Hunter: World',
      title: 'Proof of a Hero', composer: 'Masato Kohda', year: 2018, platform: 'PS4 / Xbox One / PC',
      sources: [apple({ term: 'Proof of a Hero Monster Hunter  World', match: 'Proof of a Hero' })],
    },
    {
      id: 'nier-automata-weight-of-the-world-en', cat: 'rpg', franchise: 'NieR', game: 'NieR:Automata',
      title: 'Weight of the World/English Version', composer: 'Keiichi Okabe', year: 2017, platform: 'PlayStation 4 / PC',
      sources: [apple({ term: 'Weight of the World/English Version NieR Automata', match: 'Weight of the World/English Version' })],
    },
    {
      id: 'nier-automata-city-ruins-rays-of-lig', cat: 'rpg', franchise: 'NieR', game: 'NieR:Automata',
      title: 'City Ruins - Rays of Light', composer: 'Keiichi Okabe', year: 2017, platform: 'PlayStation 4 / PC',
      sources: [apple({ term: 'City Ruins - Rays of Light NieR Automata', match: 'City Ruins - Rays of Light' })],
    },
    {
      id: 'nier-replicant-ver-1-2-song-of-the-ancients-d', cat: 'rpg', franchise: 'NieR', game: 'NieR Replicant ver.1.22474487139...',
      title: 'Song of the Ancients / Devola', composer: 'Keiichi Okabe', year: 2021, platform: 'PS4 / Xbox One / PC',
      sources: [apple({ term: 'Song of the Ancients / Devola NieR Replicant ver.1.22474487139...', match: 'Song of the Ancients / Devola' })],
    },
    {
      id: 'octopath-traveler-octopath-traveler-main', cat: 'rpg', franchise: 'Octopath Traveler', game: 'Octopath Traveler',
      title: 'Octopath Traveler -Main Theme-', composer: 'Yasunori Nishiki', year: 2018, platform: 'Nintendo Switch',
      sources: [apple({ term: 'Octopath Traveler -Main Theme- Octopath Traveler', match: 'Octopath Traveler -Main Theme-' })],
    },
    {
      id: 'persona-3-mass-destruction', cat: 'rpg', franchise: 'Persona', game: 'Persona 3',
      title: 'Mass Destruction', composer: 'Shoji Meguro', year: 2006, platform: 'PlayStation 2',
      sources: [apple({ term: 'Mass Destruction Persona 3', match: 'Mass Destruction' })],
    },
    {
      id: 'persona-4-reach-out-to-the-truth', cat: 'rpg', franchise: 'Persona', game: 'Persona 4',
      title: 'Reach Out To The Truth', composer: 'Shoji Meguro', year: 2008, platform: 'PlayStation 2',
      aka: ['Persona 4 Golden'],
      sources: [apple({ term: 'Reach Out To The Truth Persona 4', match: 'Reach Out To The Truth' })],
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
      id: 'persona-5-last-surprise', cat: 'rpg', franchise: 'Persona', game: 'Persona 5',
      title: 'Last Surprise', composer: 'Shoji Meguro', year: 2016, platform: 'PlayStation 4 / PlayStation 3',
      sources: [apple({ term: 'Last Surprise Persona 5', match: 'Last Surprise' })],
    },
    {
      id: 'persona-3-reload-full-moon-full-life', cat: 'rpg', franchise: 'Persona', game: 'Persona 3 Reload',
      title: 'Full Moon Full Life', composer: 'Atsushi Kitajoh (vocals Lotus Juice y Azumi Takahashi)', year: 2024, platform: 'PS5 / PS4 / Xbox Series / PC',
      sources: [apple({ term: 'Full Moon Full Life Persona 3 Reload', match: 'Full Moon Full Life' })],
    },
    {
      id: 'sekiro-shadows-die-twi-isshin-the-sword-saint', cat: 'rpg', franchise: 'Sekiro', game: 'Sekiro: Shadows Die Twice',
      title: 'Isshin, the Sword Saint', composer: 'Yuka Kitamura', year: 2019, platform: 'PS4 / Xbox One / PC',
      sources: [apple({ term: 'Isshin, the Sword Saint Sekiro  Shadows Die Twice', match: 'Isshin, the Sword Saint' })],
    },
    {
      id: 'elder-scrolls-iv-reign-of-the-septims', cat: 'rpg', franchise: 'The Elder Scrolls', game: 'The Elder Scrolls IV: Oblivion',
      title: 'Reign of the Septims', composer: 'Jeremy Soule', year: 2006, platform: 'PC / Xbox 360',
      sources: [apple({ term: 'Reign of the Septims The Elder Scrolls IV  Oblivion', match: 'Reign of the Septims' })],
    },
    {
      id: 'skyrim-dragonborn', cat: 'rpg', franchise: 'The Elder Scrolls', game: 'The Elder Scrolls V: Skyrim',
      title: 'Dragonborn', composer: 'Jeremy Soule', year: 2011, platform: 'PC / Xbox 360 / PS3',
      sources: [apple({ song: 1849547040 }), apple({ song: 596951311 }), apple({ album: 596951310, match: 'Dragonborn' })],
    },
    {
      id: 'elder-scrolls-v-secunda', cat: 'rpg', franchise: 'The Elder Scrolls', game: 'The Elder Scrolls V: Skyrim',
      title: 'Secunda', composer: 'Jeremy Soule', year: 2011, platform: 'PC / PS3 / Xbox 360',
      sources: [apple({ term: 'Secunda The Elder Scrolls V  Skyrim', match: 'Secunda' })],
    },
    {
      id: 'witcher3-geralt', cat: 'rpg', franchise: 'The Witcher', game: 'The Witcher 3: Wild Hunt',
      title: 'Geralt of Rivia', composer: 'Marcin Przybyłowicz', year: 2015, platform: 'PC / PS4 / Xbox One',
      sources: [apple({ album: 1333501415, match: ['Geralt of Rivia', 'The Trail'] })],
    },
    {
      id: 'witcher-3-silver-for-monsters', cat: 'rpg', franchise: 'The Witcher', game: 'The Witcher 3: Wild Hunt',
      title: 'Silver for Monsters...', composer: 'Marcin Przybyłowicz y Percival', year: 2015, platform: 'PC / PS4 / Xbox One',
      sources: [apple({ term: 'Silver for Monsters... The Witcher 3  Wild Hunt', match: 'Silver for Monsters...' })],
    },
    {
      id: 'witcher-3-wolven-storm-priscilla', cat: 'rpg', franchise: 'The Witcher', game: 'The Witcher 3: Wild Hunt',
      title: "The Wolven Storm (Priscilla's Song)", composer: 'Marcin Przybyłowicz', year: 2015, platform: 'PC / PS4 / Xbox One',
      sources: [apple({ term: "The Wolven Storm (Priscilla's Song) The Witcher 3  Wild Hunt", match: "The Wolven Storm (Priscilla's Song)" })],
    },

    /* ───────────── Acción y aventura (31) ───────────── */
    {
      id: 'ac2-ezio', cat: 'accion', franchise: "Assassin's Creed", game: "Assassin's Creed II",
      title: "Ezio's Family", composer: 'Jesper Kyd', year: 2009, platform: 'PS3 / Xbox 360',
      sources: [apple({ album: 1640108379, match: "Ezio's Family" }), apple({ song: 1640273736 })],
    },
    {
      id: 'assassin-s-creed-ii-venice-rooftops', cat: 'accion', franchise: "Assassin's Creed", game: "Assassin's Creed II",
      title: 'Venice Rooftops', composer: 'Jesper Kyd', year: 2009, platform: 'PS3 / Xbox 360 / PC',
      sources: [apple({ term: "Venice Rooftops Assassin's Creed II", match: 'Venice Rooftops' })],
    },
    {
      id: 'assassin-s-creed-iv-assassin-s-creed-iv-bl', cat: 'accion', franchise: "Assassin's Creed", game: "Assassin's Creed IV: Black Flag",
      title: "Assassin's Creed IV Black Flag Main Theme", composer: 'Brian Tyler', year: 2013, platform: 'PS3 / Xbox 360 / PS4 / Xbox One / PC',
      sources: [
        apple({ term: "Assassin's Creed IV Black Flag Main Theme Assassin's Creed IV  Black Flag", match: "Assassin's Creed IV Black Flag Main Theme" }),
      ],
    },
    {
      id: 'bayonetta-mysterious-destiny', cat: 'accion', franchise: 'Bayonetta', game: 'Bayonetta',
      title: 'Mysterious Destiny', composer: 'Hiroshi Yamaguchi', year: 2009, platform: 'PS3 / Xbox 360',
      sources: [apple({ term: 'Mysterious Destiny Bayonetta', match: 'Mysterious Destiny' })],
    },
    {
      id: 'bioshock-welcome-to-rapture', cat: 'accion', franchise: 'BioShock', game: 'BioShock',
      title: 'Welcome to Rapture', composer: 'Garry Schyman', year: 2007, platform: 'PC / Xbox 360',
      sources: [apple({ term: 'Welcome to Rapture BioShock', match: 'Welcome to Rapture' })],
    },
    {
      id: 'bioshock-infinite-will-the-circle-be-unb', cat: 'accion', franchise: 'BioShock', game: 'BioShock Infinite',
      title: 'Will the Circle Be Unbroken', composer: 'Courtnee Draper y Troy Baker', year: 2013, platform: 'PC / PS3 / Xbox 360',
      sources: [apple({ term: 'Will the Circle Be Unbroken BioShock Infinite', match: 'Will the Circle Be Unbroken' })],
    },
    {
      id: 'devil-may-cry-3-devils-never-cry', cat: 'accion', franchise: 'Devil May Cry', game: "Devil May Cry 3: Dante's Awakening",
      title: 'Devils Never Cry', composer: 'Tetsuya Shibata', year: 2005, platform: 'PlayStation 2',
      sources: [apple({ term: "Devils Never Cry Devil May Cry 3  Dante's Awakening", match: 'Devils Never Cry' })],
    },
    {
      id: 'devil-may-cry-5-devil-trigger', cat: 'accion', franchise: 'Devil May Cry', game: 'Devil May Cry 5',
      title: 'Devil Trigger', composer: 'Casey Edwards', year: 2019, platform: 'PS4 / Xbox One / PC',
      sources: [apple({ term: 'Devil Trigger Devil May Cry 5', match: 'Devil Trigger' })],
    },
    {
      id: 'devil-may-cry-5-bury-the-light', cat: 'accion', franchise: 'Devil May Cry', game: 'Devil May Cry 5',
      title: 'Bury the Light', composer: 'Casey Edwards (feat. Victor Borba)', year: 2020, platform: 'PS5 / Xbox Series / PC (Special Edition)',
      sources: [apple({ term: 'Bury the Light Devil May Cry 5', match: 'Bury the Light' })],
    },
    {
      id: 'doom-bfg', cat: 'accion', franchise: 'DOOM', game: 'DOOM (2016)',
      title: 'BFG Division', composer: 'Mick Gordon', year: 2016, platform: 'PC / PS4 / Xbox One',
      sources: [apple({ song: 1157735031 }), apple({ album: 1885803215, match: 'BFG Division' })],
    },
    {
      id: 'doom-2016-rip-tear', cat: 'accion', franchise: 'DOOM', game: 'DOOM (2016)',
      title: 'Rip & Tear', composer: 'Mick Gordon', year: 2016, platform: 'PC / PS4 / Xbox One',
      sources: [apple({ term: 'Rip & Tear DOOM', match: 'Rip & Tear' })],
    },
    {
      id: 'doom-eternal-only-thing-they-fear-i', cat: 'accion', franchise: 'DOOM', game: 'DOOM Eternal',
      title: 'The Only Thing They Fear Is You', composer: 'Mick Gordon', year: 2020, platform: 'PC / PS4 / Xbox One',
      sources: [apple({ term: 'The Only Thing They Fear Is You DOOM Eternal', match: 'The Only Thing They Fear Is You' })],
    },
    {
      id: 'grand-theft-auto-main-theme', cat: 'accion', franchise: 'Grand Theft Auto', game: 'Grand Theft Auto: San Andreas',
      title: 'Main Theme', composer: 'Michael Hunter', year: 2004, platform: 'PlayStation 2',
      sources: [apple({ term: 'Main Theme Grand Theft Auto  San Andreas', match: 'Main Theme' })],
    },
    {
      id: 'grand-theft-auto-iv-soviet-connection', cat: 'accion', franchise: 'Grand Theft Auto', game: 'Grand Theft Auto IV',
      title: 'Soviet Connection', composer: 'Michael Hunter', year: 2008, platform: 'Xbox 360 / PS3',
      sources: [apple({ term: 'Soviet Connection Grand Theft Auto IV', match: 'Soviet Connection' })],
    },
    {
      id: 'grand-theft-auto-v-welcome-to-los-santos', cat: 'accion', franchise: 'Grand Theft Auto', game: 'Grand Theft Auto V',
      title: 'Welcome to Los Santos', composer: 'Oh No', year: 2013, platform: 'PS3 / Xbox 360',
      sources: [apple({ term: 'Welcome to Los Santos Grand Theft Auto V', match: 'Welcome to Los Santos' })],
    },
    {
      id: 'half-life-2-triage-at-dawn', cat: 'accion', franchise: 'Half-Life', game: 'Half-Life 2',
      title: 'Triage at Dawn', composer: 'Kelly Bailey', year: 2004, platform: 'PC',
      sources: [apple({ term: 'Triage at Dawn Half-Life 2', match: 'Triage at Dawn' })],
    },
    {
      id: 'max-payne-max-payne-theme', cat: 'accion', franchise: 'Max Payne', game: 'Max Payne',
      title: 'Max Payne Theme', composer: 'Kärtsy Hatakka y Kimmo Kajasto', year: 2001, platform: 'PC / PS2 / Xbox',
      sources: [apple({ term: 'Max Payne Theme Max Payne', match: 'Max Payne Theme' })],
    },
    {
      id: 'metal-gear-rising-rules-of-nature', cat: 'accion', franchise: 'Metal Gear', game: 'Metal Gear Rising: Revengeance',
      title: 'Rules of Nature', composer: 'Jamie Christopherson', year: 2013, platform: 'PS3 / Xbox 360',
      sources: [apple({ term: 'Rules of Nature Metal Gear Rising  Revengeance', match: 'Rules of Nature' })],
    },
    {
      id: 'metal-gear-rising-it-has-to-be-this-way', cat: 'accion', franchise: 'Metal Gear', game: 'Metal Gear Rising: Revengeance',
      title: 'It Has to Be This Way', composer: 'Jamie Christopherson', year: 2013, platform: 'PS3 / Xbox 360',
      sources: [apple({ term: 'It Has to Be This Way Metal Gear Rising  Revengeance', match: 'It Has to Be This Way' })],
    },
    {
      id: 'portal-stillalive', cat: 'accion', franchise: 'Portal', game: 'Portal',
      title: 'Still Alive', composer: 'Jonathan Coulton (voz: Ellen McLain)', year: 2007, platform: 'PC',
      sources: [apple({ song: 270749989 }), apple({ song: 960006998 })],
    },
    {
      id: 'portal-2-want-you-gone', cat: 'accion', franchise: 'Portal', game: 'Portal 2',
      title: 'Want You Gone', composer: 'Jonathan Coulton', year: 2011, platform: 'PC / PS3 / Xbox 360',
      sources: [apple({ term: 'Want You Gone Portal 2', match: 'Want You Gone' })],
    },
    {
      id: 'rdr-faraway', cat: 'accion', franchise: 'Red Dead Redemption', game: 'Red Dead Redemption',
      title: 'Far Away', composer: 'José González', year: 2010, platform: 'PS3 / Xbox 360',
      sources: [apple({ song: 1655229854 }), apple({ album: 1655229837, match: 'Far Away' })],
    },
    {
      id: 'red-dead-redemption-2-that-s-the-way-it-is', cat: 'accion', franchise: 'Red Dead Redemption', game: 'Red Dead Redemption 2',
      title: "That's the Way It Is", composer: 'Daniel Lanois', year: 2018, platform: 'PS4 / Xbox One',
      sources: [apple({ term: "That's the Way It Is Red Dead Redemption 2", match: "That's the Way It Is" })],
    },
    {
      id: 'red-dead-redemption-2-unshaken', cat: 'accion', franchise: 'Red Dead Redemption', game: 'Red Dead Redemption 2',
      title: 'Unshaken', composer: "D'Angelo y Daniel Lanois", year: 2018, platform: 'PS4 / Xbox One',
      sources: [apple({ term: 'Unshaken Red Dead Redemption 2', match: 'Unshaken' })],
    },
    {
      id: 'resident-evil-2-secure-place', cat: 'accion', franchise: 'Resident Evil', game: 'Resident Evil 2',
      title: 'Secure Place', composer: 'Masami Ueda, Shusaku Uchiyama y Syun Nishigaki', year: 1998, platform: 'PlayStation',
      sources: [apple({ term: 'Secure Place Resident Evil 2', match: 'Secure Place' })],
    },
    {
      id: 'resident-evil-4-serenity', cat: 'accion', franchise: 'Resident Evil', game: 'Resident Evil 4',
      title: 'Serenity', composer: 'Misao Senbongi y Shusaku Uchiyama', year: 2005, platform: 'GameCube',
      sources: [apple({ term: 'Serenity Resident Evil 4', match: 'Serenity' })],
    },
    {
      id: 'resident-evil-village-village-of-shadows', cat: 'accion', franchise: 'Resident Evil', game: 'Resident Evil Village',
      title: 'Village of Shadows', composer: 'Shusaku Uchiyama (Capcom Sound Team)', year: 2021, platform: 'PS5 / PS4 / Xbox Series / PC',
      sources: [apple({ term: 'Village of Shadows Resident Evil Village', match: 'Village of Shadows' })],
    },
    {
      id: 'sonic-adventure-open-your-heart', cat: 'accion', franchise: 'Sonic the Hedgehog', game: 'Sonic Adventure',
      title: 'Open Your Heart', composer: 'Jun Senoue (Crush 40)', year: 1998, platform: 'Dreamcast',
      sources: [apple({ term: 'Open Your Heart Sonic Adventure', match: 'Open Your Heart' })],
    },
    {
      id: 'sa2-livelearn', cat: 'accion', franchise: 'Sonic the Hedgehog', game: 'Sonic Adventure 2',
      title: 'Live & Learn', composer: 'Crush 40', year: 2001, platform: 'Dreamcast',
      sources: [apple({ term: 'Live and Learn Crush 40', artist: 'Crush 40', match: 'Live & Learn' })],
    },
    {
      id: 'sonic-frontiers-i-m-here', cat: 'accion', franchise: 'Sonic the Hedgehog', game: 'Sonic Frontiers',
      title: "I'm Here", composer: 'Tomoya Ohtani', year: 2022, platform: 'PS5 / Xbox Series / Switch / PC',
      sources: [apple({ term: "I'm Here Sonic Frontiers", match: "I'm Here" })],
    },
    {
      id: 'tomb-raider-2013-tomb-raider-main-theme', cat: 'accion', franchise: 'Tomb Raider', game: 'Tomb Raider (2013)',
      title: 'Tomb Raider Main Theme', composer: 'Jason Graves', year: 2013, platform: 'PC / PS3 / Xbox 360',
      sources: [apple({ term: 'Tomb Raider Main Theme Tomb Raider', match: 'Tomb Raider Main Theme' })],
    },

    /* ───────────── Online y multijugador (26) ───────────── */
    {
      id: 'apex-legends-apex-legends-main-them', cat: 'online', franchise: 'Apex Legends', game: 'Apex Legends',
      title: 'Apex Legends: Main Theme', composer: 'Stephen Barton', year: 2019, platform: 'PC / PS4 / Xbox One',
      sources: [apple({ term: 'Apex Legends: Main Theme Apex Legends', match: 'Apex Legends: Main Theme' })],
    },
    {
      id: 'battlefield-3-battlefield-3-main-the', cat: 'online', franchise: 'Battlefield', game: 'Battlefield 3',
      title: 'Battlefield 3 Main Theme', composer: 'Johan Skugge, Jukka Rintamäki', year: 2011, platform: 'PC / PS3 / Xbox 360',
      sources: [apple({ term: 'Battlefield 3 Main Theme Battlefield 3', match: 'Battlefield 3 Main Theme' })],
    },
    {
      id: 'battlefield-4-warsaw-theme', cat: 'online', franchise: 'Battlefield', game: 'Battlefield 4',
      title: 'Warsaw Theme', composer: 'Johan Skugge, Jukka Rintamäki', year: 2013, platform: 'PC / PS4 / Xbox One / PS3 / Xbox 360',
      sources: [apple({ term: 'Warsaw Theme Battlefield 4', match: 'Warsaw Theme' })],
    },
    {
      id: 'call-of-duty-lullaby-for-a-dead-man', cat: 'online', franchise: 'Call of Duty', game: 'Call of Duty: World at War',
      title: 'Lullaby for a Dead Man', composer: 'Kevin Sherwood (feat. Elena Siegman)', year: 2008, platform: 'PS3 / Xbox 360 / PC',
      sources: [apple({ term: 'Lullaby for a Dead Man Call of Duty  World at War', match: 'Lullaby for a Dead Man' })],
    },
    {
      id: 'call-of-duty-115', cat: 'online', franchise: 'Call of Duty', game: 'Call of Duty: Black Ops',
      title: '115', composer: 'Kevin Sherwood (feat. Elena Siegman)', year: 2010, platform: 'PS3 / Xbox 360 / PC',
      sources: [apple({ term: '115 Call of Duty  Black Ops', match: '115' })],
    },
    {
      id: 'destiny-the-traveler', cat: 'online', franchise: 'Destiny', game: 'Destiny',
      title: 'The Traveler', composer: "Martin O'Donnell y Michael Salvatori", year: 2014, platform: 'PS4 / Xbox One / PS3 / Xbox 360',
      sources: [apple({ song: 1791144349, country: 'mx' }), apple({ album: 1791143740, match: 'The Traveler', country: 'mx' })],
    },
    {
      id: 'dota-2-dota-2-main-theme', cat: 'online', franchise: 'Dota 2', game: 'Dota 2',
      title: 'Dota 2 Main Theme', composer: 'Jason Hayes, Tim Larkin', year: 2013, platform: 'PC',
      sources: [apple({ term: 'Dota 2 Main Theme Dota 2', match: 'Dota 2 Main Theme' })],
    },
    {
      id: 'fall-guys-everybody-falls-fall-g', cat: 'online', franchise: 'Fall Guys', game: 'Fall Guys',
      title: 'Everybody Falls (Fall Guys Theme)', composer: 'Jukio Kallio, Daniel Hagström', year: 2020, platform: 'PC / PS4',
      sources: [apple({ term: 'Everybody Falls (Fall Guys Theme) Fall Guys', match: 'Everybody Falls (Fall Guys Theme)' })],
    },
    {
      id: 'final-fantasy-xiv-answers', cat: 'online', franchise: 'Final Fantasy', game: 'Final Fantasy XIV: A Realm Reborn',
      title: 'Answers', composer: 'Nobuo Uematsu', year: 2013, platform: 'PC / PS3 / PS4',
      sources: [apple({ term: 'Answers Final Fantasy XIV  A Realm Reborn', match: 'Answers' })],
    },
    {
      id: 'genshin-impact-dream-aria', cat: 'online', franchise: 'Genshin Impact', game: 'Genshin Impact',
      title: 'Dream Aria', composer: 'Yu-Peng Chen (HOYO-MiX)', year: 2020, platform: 'PC / PS4 / Mobile',
      sources: [apple({ term: 'Dream Aria Genshin Impact', match: 'Dream Aria' })],
    },
    {
      id: 'genshin-impact-liyue', cat: 'online', franchise: 'Genshin Impact', game: 'Genshin Impact',
      title: 'Liyue', composer: 'Yu-Peng Chen (HOYO-MiX)', year: 2020, platform: 'PC / PS4 / Mobile',
      sources: [apple({ term: 'Liyue Genshin Impact', match: 'Liyue' })],
    },
    {
      id: 'helldivers-2-a-cup-of-liber-tea-hel', cat: 'online', franchise: 'Helldivers', game: 'Helldivers 2',
      title: 'A Cup of Liber-tea (Helldivers 2 Main Theme)', composer: 'Wilbert Roget, II', year: 2024, platform: 'PC / PS5',
      sources: [apple({ term: 'A Cup of Liber-tea (Helldivers 2 Main Theme) Helldivers 2', match: 'A Cup of Liber-tea (Helldivers 2 Main Theme)' })],
    },
    {
      id: 'honkai-star-rail-hope-is-the-thing-with', cat: 'online', franchise: 'Honkai: Star Rail', game: 'Honkai: Star Rail',
      title: 'Hope Is the Thing With Feathers', composer: 'HOYO-MiX (feat. Chevy)', year: 2023, platform: 'PC / PS5 / Mobile',
      sources: [apple({ term: 'Hope Is the Thing With Feathers Honkai  Star Rail', match: 'Hope Is the Thing With Feathers' })],
    },
    {
      id: 'league-of-legends-legends-never-die', cat: 'online', franchise: 'League of Legends', game: 'League of Legends',
      title: 'Legends Never Die', composer: 'Against The Current (Riot Games Music)', year: 2009, platform: 'PC',
      sources: [apple({ term: 'Legends Never Die League of Legends', match: 'Legends Never Die' })],
    },
    {
      id: 'league-of-legends-pop-stars', cat: 'online', franchise: 'League of Legends', game: 'League of Legends',
      title: 'POP/STARS', composer: 'K/DA (Madison Beer, (G)I-DLE, Jaira Burns)', year: 2009, platform: 'PC',
      sources: [apple({ term: 'POP/STARS League of Legends', match: 'POP/STARS' })],
    },
    {
      id: 'league-of-legends-warriors', cat: 'online', franchise: 'League of Legends', game: 'League of Legends',
      title: 'Warriors', composer: 'Imagine Dragons', year: 2009, platform: 'PC',
      sources: [apple({ term: 'Warriors League of Legends', match: 'Warriors' })],
    },
    {
      id: 'overwatch-2-overture', cat: 'online', franchise: 'Overwatch', game: 'Overwatch 2',
      title: 'Overture', composer: 'Sam Cardon', year: 2022, platform: 'PC / PS5 / Xbox Series / Switch',
      sources: [apple({ term: 'Overture Overwatch 2', match: 'Overture' })],
    },
    {
      id: 'runescape-sea-shanty-2', cat: 'online', franchise: 'RuneScape', game: 'RuneScape',
      title: 'Sea Shanty 2', composer: 'Ian Taylor', year: 2001, platform: 'PC',
      sources: [apple({ term: 'Sea Shanty 2 RuneScape', match: 'Sea Shanty 2' })],
    },
    {
      id: 'team-fortress-2-team-fortress-2-main-t', cat: 'online', franchise: 'Team Fortress 2', game: 'Team Fortress 2',
      title: 'Team Fortress 2 (Main Theme)', composer: 'Mike Morasky', year: 2007, platform: 'PC',
      sources: [apple({ term: 'Team Fortress 2 (Main Theme) Team Fortress 2', match: 'Team Fortress 2 (Main Theme)' })],
    },
    {
      id: 'team-fortress-2-rocket-jump-waltz', cat: 'online', franchise: 'Team Fortress 2', game: 'Team Fortress 2',
      title: 'Rocket Jump Waltz', composer: 'Mike Morasky', year: 2007, platform: 'PC',
      sources: [apple({ term: 'Rocket Jump Waltz Team Fortress 2', match: 'Rocket Jump Waltz' })],
    },
    {
      id: 'valorant-die-for-you', cat: 'online', franchise: 'Valorant', game: 'Valorant',
      title: 'Die For You', composer: 'Grabbitz', year: 2020, platform: 'PC',
      sources: [apple({ term: 'Die For You Valorant', match: 'Die For You' })],
    },
    {
      id: 'valorant-fire-again', cat: 'online', franchise: 'Valorant', game: 'Valorant',
      title: 'Fire Again', composer: 'Ashnikko', year: 2020, platform: 'PC',
      sources: [apple({ term: 'Fire Again Valorant', match: 'Fire Again' })],
    },
    {
      id: 'world-of-warcraft-legends-of-azeroth', cat: 'online', franchise: 'Warcraft', game: 'World of Warcraft',
      title: 'Legends of Azeroth', composer: 'Jason Hayes', year: 2004, platform: 'PC',
      sources: [apple({ term: 'Legends of Azeroth World of Warcraft', match: 'Legends of Azeroth' })],
    },
    {
      id: 'world-of-warcraft-stormwind', cat: 'online', franchise: 'Warcraft', game: 'World of Warcraft',
      title: 'Stormwind', composer: 'Jason Hayes', year: 2004, platform: 'PC',
      sources: [apple({ term: 'Stormwind World of Warcraft', match: 'Stormwind' })],
    },
    {
      id: 'world-of-warcraft-invincible', cat: 'online', franchise: 'Warcraft', game: 'World of Warcraft',
      title: 'Invincible', composer: 'Russell Brower', year: 2008, platform: 'PC',
      aka: ['World of Warcraft: Wrath of the Lich King', 'Wrath of the Lich King'],
      sources: [apple({ term: 'Invincible World of Warcraft  Wrath of the Lich King', match: 'Invincible' })],
    },
    {
      id: 'warframe-we-all-lift-together', cat: 'online', franchise: 'Warframe', game: 'Warframe',
      title: 'We All Lift Together', composer: 'Keith Power', year: 2013, platform: 'PC / PS4 / Xbox One / Switch',
      sources: [apple({ term: 'We All Lift Together Warframe', match: 'We All Lift Together' })],
    },
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
    ['Donkey Kong', 'Donkey Kong Bananza'],
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
    ['Hades', 'Hades II'], ['Ori', 'Ori and the Will of the Wisps'],
    ['Sonic the Hedgehog', 'Sonic the Hedgehog 2'], ['Sonic the Hedgehog', 'Sonic Mania'], ['Sonic the Hedgehog', 'Sonic Generations'],
    ['Street Fighter', 'Street Fighter III: 3rd Strike'], ['Street Fighter', 'Street Fighter 6'],
    ['Mega Man', 'Mega Man 3'], ['Mega Man', 'Mega Man X'],
    ['Tetris', 'Tetris 99'], ['Tetris', 'Tetris Effect'],
    ['Final Fantasy', 'Final Fantasy VI'], ['Final Fantasy', 'Final Fantasy X'], ['Final Fantasy', 'Final Fantasy VII Remake'],
    ['Kingdom Hearts', 'Kingdom Hearts II'], ['Kingdom Hearts', 'Kingdom Hearts III'],
    ['Persona', 'Persona 3 Reload'],
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

  /*
   * Versiones del mismo juego (remakes, ediciones y expansiones que se venden aparte).
   * Siguen siendo respuestas distintas, pero nunca salen juntas como opciones:
   * si suena Persona 3, "Persona 3 Reload" al lado sería una trampa.
   * (Los DLC no van aquí: cuentan como el juego base, con su nombre en `aka`.)
   */
  AM.VERSIONS = [
    ['Persona 3', 'Persona 3 Reload'],
    ['Final Fantasy VII', 'Final Fantasy VII Remake', 'Final Fantasy VII Rebirth'],
    ['Halo 3', 'Halo 3: ODST'],
  ];
})(window.AM = window.AM || {});
