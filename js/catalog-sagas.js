/*
 * Modo Sagas (solo Videojuegos): las sagas que se pueden elegir y sus canciones extra.
 *
 *   AM.SAGAS        → cada saga junta las pistas del catálogo de sus `franchises` (catalog.js)
 *                     más las de AM.SAGA_TRACKS con su mismo `saga`. `excludeGames` deja fuera
 *                     juegos del catálogo: en este modo no va música de remakes, Halo va
 *                     solo de Combat Evolved a Reach y Kirby deja fuera Triple Deluxe (su
 *                     Masked Dedede's Theme usa la melodía de King Dedede's Theme).
 *                     En las opciones va "juego - canción"; `prefix` (se quita del inicio) y
 *                     `short` (nombre completo → corto) acortan los nombres de juego muy largos.
 *   AM.SAGA_TRACKS  → canciones que solo suenan en el modo Sagas (no cambian los otros modos).
 *                     Mismo formato que catalog.js; en este modo la respuesta es el título.
 *                     Solo música original: nada de remakes, remasters ni arreglos.
 *                     Las de Apple salen de los soundtracks originales; las de YouTube son
 *                     subidas del soundtrack original revisadas a mano (se prefieren los canales
 *                     "- Topic" de YouTube Music cuando existen) y va primero la que suena más
 *                     fuerte, porque el juego solo puede bajar el volumen, no subirlo.
 *
 * Un juego aparece en "Un juego" solo si tiene al menos 5 canciones con nombres distintos.
 * Archivo generado (184 canciones).
 */
(function (AM) {
  'use strict';

  const apple = (o) => Object.assign({ type: 'itunes' }, o);
  const yt = (id, start) => ({ type: 'youtube', id: id, start: start || 0 });

  AM.SAGAS = [
    { id: 'mario', label: 'Super Mario', icon: '🍄', franchises: ['Super Mario', 'Mario Kart'] },
    { id: 'zelda', label: 'The Legend of Zelda', icon: '🗡️', franchises: ['The Legend of Zelda'], prefix: 'The Legend of Zelda: ' },
    { id: 'pokemon', label: 'Pokémon', icon: '⚡', franchises: ['Pokémon'] },
    { id: 'kirby', label: 'Kirby', icon: '⭐', franchises: ['Kirby'], excludeGames: ['Kirby: Triple Deluxe'] },
    { id: 'donkey-kong', label: 'Donkey Kong', icon: '🍌', franchises: ['Donkey Kong'], short: { "Donkey Kong Country 2: Diddy's Kong Quest": 'Donkey Kong Country 2' } },
    { id: 'sonic', label: 'Sonic', icon: '💨', franchises: ['Sonic the Hedgehog'] },
    { id: 'final-fantasy', label: 'Final Fantasy', icon: '💎', franchises: ['Final Fantasy'], excludeGames: ['Final Fantasy VII Rebirth', 'Final Fantasy VII Remake'], short: { 'Final Fantasy XIV: A Realm Reborn': 'Final Fantasy XIV' } },
    { id: 'halo', label: 'Halo', icon: '🪖', franchises: ['Halo'], excludeGames: ['Halo 4', 'Halo 5: Guardians', 'Halo Infinite'] },
    { id: 'mega-man', label: 'Mega Man', icon: '🤖', franchises: ['Mega Man'] },
    { id: 'street-fighter', label: 'Street Fighter', icon: '🥊', franchises: ['Street Fighter'] },
  ];

  AM.SAGA_TRACKS = [
    /* ───────────── mario ───────────── */
    {
      id: 'saga-super-mario-bros-underground-theme', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Bros.',
      title: 'Underground Theme', composer: 'Koji Kondo', year: 1985, platform: 'NES',
      sources: [yt('c0SuIMUoShI'), yt('UOwyFPgjPQ4')],
    },
    {
      id: 'saga-super-mario-bros-underwater-theme', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Bros.',
      title: 'Underwater Theme', composer: 'Koji Kondo', year: 1985, platform: 'NES',
      sources: [yt('nKx0Liso6aQ'), yt('zc28zcBIX7U')],
    },
    {
      id: 'saga-super-mario-bros-castle-theme', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Bros.',
      title: 'Castle Theme', composer: 'Koji Kondo', year: 1985, platform: 'NES',
      sources: [yt('I9TFZbC27aw'), yt('NPprKd_MCpA')],
    },
    {
      id: 'saga-super-mario-bros-starman', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Bros.',
      title: 'Starman', composer: 'Koji Kondo', year: 1985, platform: 'NES',
      sources: [yt('Lw049q22-hY')],
    },
    {
      id: 'saga-super-mario-world-athletic-theme', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario World',
      title: 'Athletic Theme', composer: 'Koji Kondo', year: 1990, platform: 'SNES',
      sources: [yt('46yfRJy9N7c'), yt('XF2fA1epvLE')],
    },
    {
      id: 'saga-super-mario-world-ghost-house', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario World',
      title: 'Ghost House', composer: 'Koji Kondo', year: 1990, platform: 'SNES',
      sources: [yt('QlOkOnFDBHs'), yt('d6fLaUgLHTY')],
    },
    {
      id: 'saga-super-mario-world-title-theme', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario World',
      title: 'Title Theme', composer: 'Koji Kondo', year: 1990, platform: 'SNES',
      sources: [yt('kghAq1Qvafg'), yt('PXYIReEQ24g')],
    },
    {
      id: 'saga-super-mario-world-star-road', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario World',
      title: 'Star Road', composer: 'Koji Kondo', year: 1990, platform: 'SNES',
      sources: [yt('V0yJAqFMS3o'), yt('oRM6SGqvIHg')],
    },
    {
      id: 'saga-super-mario-64-inside-the-castle-walls', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario 64',
      title: 'Inside the Castle Walls', composer: 'Koji Kondo', year: 1996, platform: 'Nintendo 64',
      sources: [yt('-pdLR-nsvlY'), yt('HIA-F4FVTt4')],
    },
    {
      id: 'saga-super-mario-64-slider', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario 64',
      title: 'Slider', composer: 'Koji Kondo', year: 1996, platform: 'Nintendo 64',
      sources: [yt('f64nXt1z4XU'), yt('lc9B5GkWw94')],
    },
    {
      id: 'saga-super-mario-64-koopas-road', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario 64',
      title: 'Koopa\'s Road', composer: 'Koji Kondo', year: 1996, platform: 'Nintendo 64',
      sources: [yt('3hrmwFaHTaY'), yt('UzQfL1H4o-0')],
    },
    {
      id: 'saga-super-mario-64-snow-mountain', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario 64',
      title: 'Snow Mountain', composer: 'Koji Kondo', year: 1996, platform: 'Nintendo 64',
      sources: [yt('6iZ_buAz55g'), yt('PeCVnvTwKQU')],
    },
    {
      id: 'saga-super-mario-64-lethal-lava-land', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario 64',
      title: 'Lethal Lava Land', composer: 'Koji Kondo', year: 1996, platform: 'Nintendo 64',
      sources: [yt('emeB83Q6P1I'), yt('vthq62tj5XI')],
    },
    {
      id: 'saga-super-mario-sunshine-ricco-harbor', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Sunshine',
      title: 'Ricco Harbor', composer: 'Koji Kondo y Shinobu Tanaka', year: 2002, platform: 'GameCube',
      sources: [yt('FXJUxsHgZvI'), yt('WWY5xgACHPk')],
    },
    {
      id: 'saga-super-mario-sunshine-secret-course', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Sunshine',
      title: 'Secret Course', composer: 'Koji Kondo y Shinobu Tanaka', year: 2002, platform: 'GameCube',
      sources: [yt('9QN_v-5NJ10'), yt('5E9svMa42lw')],
    },
    {
      id: 'saga-super-mario-sunshine-sirena-beach', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Sunshine',
      title: 'Sirena Beach', composer: 'Koji Kondo y Shinobu Tanaka', year: 2002, platform: 'GameCube',
      sources: [yt('i8Qt_DbTR1U'), yt('wLDK36EF8k8')],
    },
    {
      id: 'saga-super-mario-sunshine-bianco-hills', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Sunshine',
      title: 'Bianco Hills', composer: 'Koji Kondo y Shinobu Tanaka', year: 2002, platform: 'GameCube',
      sources: [yt('AEY8tfNtu7U'), yt('nx1A1xStMRs')],
    },
    {
      id: 'saga-super-mario-galaxy-good-egg-galaxy', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Galaxy',
      title: 'Good Egg Galaxy', composer: 'Mahito Yokota y Koji Kondo', year: 2007, platform: 'Wii',
      sources: [yt('56TfZJoZxv8'), yt('hdXk4BGgmq8')],
    },
    {
      id: 'saga-super-mario-galaxy-battlerock-galaxy', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Galaxy',
      title: 'Battlerock Galaxy', composer: 'Mahito Yokota y Koji Kondo', year: 2007, platform: 'Wii',
      sources: [yt('AhueZ4d-vKk'), yt('K9Vgc8ojqQA')],
    },
    {
      id: 'saga-super-mario-galaxy-buoy-base-galaxy', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Galaxy',
      title: 'Buoy Base Galaxy', composer: 'Mahito Yokota y Koji Kondo', year: 2007, platform: 'Wii',
      sources: [yt('SmUn_YgOBAw'), yt('Y9a1cyZbKj4')],
    },
    {
      id: 'saga-super-mario-galaxy-space-junk-galaxy', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Galaxy',
      title: 'Space Junk Galaxy', composer: 'Mahito Yokota y Koji Kondo', year: 2007, platform: 'Wii',
      sources: [yt('m2kO_Ffg7i0'), yt('ZDBozS7s-BQ')],
    },
    {
      id: 'saga-super-mario-galaxy-rosalina-in-the-observatory', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Galaxy',
      title: 'Rosalina in the Observatory', composer: 'Mahito Yokota y Koji Kondo', year: 2007, platform: 'Wii',
      sources: [yt('S-bdAQDnE6I'), yt('OlzA4gV1-vU')],
    },
    {
      id: 'saga-super-mario-odyssey-fossil-falls', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Odyssey',
      title: 'Fossil Falls', composer: 'Naoto Kubo, Shiho Fujii y Koji Kondo', year: 2017, platform: 'Nintendo Switch',
      sources: [yt('2LQE9FLNK7o'), yt('f8W5U6uDsMA')],
    },
    {
      id: 'saga-super-mario-odyssey-steam-gardens', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Odyssey',
      title: 'Steam Gardens', composer: 'Naoto Kubo, Shiho Fujii y Koji Kondo', year: 2017, platform: 'Nintendo Switch',
      sources: [yt('OhogRNHLW30'), yt('pOvPPn_q0U8')],
    },
    {
      id: 'saga-super-mario-odyssey-new-donk-city', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Odyssey',
      title: 'New Donk City', composer: 'Naoto Kubo, Shiho Fujii y Koji Kondo', year: 2017, platform: 'Nintendo Switch',
      sources: [yt('6JF89RKOT8Q'), yt('ChTz6T-UGyw')],
    },
    {
      id: 'saga-super-mario-odyssey-tostarena-town', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Odyssey',
      title: 'Tostarena Town', composer: 'Naoto Kubo, Shiho Fujii y Koji Kondo', year: 2017, platform: 'Nintendo Switch',
      sources: [yt('4aMsKZ53Lt8'), yt('AAsZEpfWnz4')],
    },
    {
      id: 'saga-super-mario-odyssey-break-free-lead-the-way', saga: 'mario', franchise: 'Super Mario', game: 'Super Mario Odyssey',
      title: 'Break Free (Lead the Way)', composer: 'Naoto Kubo, Shiho Fujii y Koji Kondo', year: 2017, platform: 'Nintendo Switch',
      sources: [yt('DNXTxZVZ4UQ'), yt('3I_awBzvjPU')],
    },
    /* ───────────── zelda ───────────── */
    {
      id: 'saga-the-legend-of-zelda-a-link-to-the-past-hyrule-field-main-th', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: A Link to the Past',
      title: 'Hyrule Field Main Theme', composer: 'Koji Kondo', year: 1991, platform: 'SNES',
      sources: [yt('fJN3qW4QcWw'), yt('gFbOcwYIfJ4')],
    },
    {
      id: 'saga-the-legend-of-zelda-a-link-to-the-past-kakariko-village', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: A Link to the Past',
      title: 'Kakariko Village', composer: 'Koji Kondo', year: 1991, platform: 'SNES',
      sources: [yt('gMnZite_lB0'), yt('HSEVaRorxCI')],
    },
    {
      id: 'saga-the-legend-of-zelda-a-link-to-the-past-hyrule-castle', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: A Link to the Past',
      title: 'Hyrule Castle', composer: 'Koji Kondo', year: 1991, platform: 'SNES',
      sources: [yt('JVsaNbPuvRI')],
    },
    {
      id: 'saga-the-legend-of-zelda-a-link-to-the-past-lost-woods', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: A Link to the Past',
      title: 'Lost Woods', composer: 'Koji Kondo', year: 1991, platform: 'SNES',
      sources: [yt('i6fjPbPeGHk'), yt('XbtyTKfuvQ4')],
    },
    {
      id: 'saga-the-legend-of-zelda-ocarina-of-time-hyrule-field', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Ocarina of Time',
      title: 'Hyrule Field', composer: 'Koji Kondo', year: 1998, platform: 'Nintendo 64',
      sources: [yt('s3YA4-mDkPk'), yt('S1vXYPtn03c')],
    },
    {
      id: 'saga-the-legend-of-zelda-ocarina-of-time-kakariko-village', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Ocarina of Time',
      title: 'Kakariko Village', composer: 'Koji Kondo', year: 1998, platform: 'Nintendo 64',
      sources: [yt('gsq5STyuNAs'), yt('EsOfsbYRbFM')],
    },
    {
      id: 'saga-the-legend-of-zelda-ocarina-of-time-zeldas-lullaby', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Ocarina of Time',
      title: 'Zelda\'s Lullaby', composer: 'Koji Kondo', year: 1998, platform: 'Nintendo 64',
      sources: [yt('EPhfbtjqWM8')],
    },
    {
      id: 'saga-the-legend-of-zelda-ocarina-of-time-song-of-storms', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Ocarina of Time',
      title: 'Song of Storms', composer: 'Koji Kondo', year: 1998, platform: 'Nintendo 64',
      sources: [yt('UtgHZaq0EGs'), yt('XTDSJCYWuQA')],
    },
    {
      id: 'saga-the-legend-of-zelda-ocarina-of-time-lon-lon-ranch', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Ocarina of Time',
      title: 'Lon Lon Ranch', composer: 'Koji Kondo', year: 1998, platform: 'Nintendo 64',
      sources: [yt('0BDad24djOY'), yt('efrVpkrWNkI')],
    },
    {
      id: 'saga-the-legend-of-zelda-ocarina-of-time-temple-of-time', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Ocarina of Time',
      title: 'Temple of Time', composer: 'Koji Kondo', year: 1998, platform: 'Nintendo 64',
      sources: [yt('cvtLLaK2Fy8'), yt('n66LMxSH3ZM')],
    },
    {
      id: 'saga-the-legend-of-zelda-majoras-mask-song-of-healing', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Majora\'s Mask',
      title: 'Song of Healing', composer: 'Koji Kondo y Toru Minegishi', year: 2000, platform: 'Nintendo 64',
      sources: [yt('XDX4ZwUeOok')],
    },
    {
      id: 'saga-the-legend-of-zelda-majoras-mask-termina-field', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Majora\'s Mask',
      title: 'Termina Field', composer: 'Koji Kondo y Toru Minegishi', year: 2000, platform: 'Nintendo 64',
      sources: [yt('EPXwDQumJc4'), yt('tR5fMdUF9qU')],
    },
    {
      id: 'saga-the-legend-of-zelda-majoras-mask-stone-tower-temple', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Majora\'s Mask',
      title: 'Stone Tower Temple', composer: 'Koji Kondo y Toru Minegishi', year: 2000, platform: 'Nintendo 64',
      sources: [yt('-x6Y7Rsmc4c'), yt('fNDLoncWz30')],
    },
    {
      id: 'saga-the-legend-of-zelda-majoras-mask-final-hours', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Majora\'s Mask',
      title: 'Final Hours', composer: 'Koji Kondo y Toru Minegishi', year: 2000, platform: 'Nintendo 64',
      sources: [yt('knLCbS02T1Y')],
    },
    {
      id: 'saga-the-legend-of-zelda-the-wind-waker-outset-island', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: The Wind Waker',
      title: 'Outset Island', composer: 'Kenta Nagata, Hajime Wakai, Toru Minegishi y Koji Kondo', year: 2002, platform: 'GameCube',
      sources: [yt('vwMCZ6B499c'), yt('uG960gmNiKY')],
    },
    {
      id: 'saga-the-legend-of-zelda-the-wind-waker-the-great-sea', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: The Wind Waker',
      title: 'The Great Sea', composer: 'Kenta Nagata, Hajime Wakai, Toru Minegishi y Koji Kondo', year: 2002, platform: 'GameCube',
      sources: [yt('or8y5EC1_Rs'), yt('xV9_iMpXv-U')],
    },
    {
      id: 'saga-the-legend-of-zelda-the-wind-waker-windfall-island', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: The Wind Waker',
      title: 'Windfall Island', composer: 'Kenta Nagata, Hajime Wakai, Toru Minegishi y Koji Kondo', year: 2002, platform: 'GameCube',
      sources: [yt('QemTZn8YfJ0'), yt('TAUDsoy8OM0')],
    },
    {
      id: 'saga-the-legend-of-zelda-the-wind-waker-arylls-theme', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: The Wind Waker',
      title: 'Aryll\'s Theme', composer: 'Kenta Nagata, Hajime Wakai, Toru Minegishi y Koji Kondo', year: 2002, platform: 'GameCube',
      sources: [yt('m4DYlKny4fw'), yt('zuY8gZGm53I')],
    },
    {
      id: 'saga-the-legend-of-zelda-breath-of-the-wild-hateno-village', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Breath of the Wild',
      title: 'Hateno Village', composer: 'Manaka Kataoka, Yasuaki Iwata y Hajime Wakai', year: 2017, platform: 'Nintendo Switch / Wii U',
      sources: [yt('RUwhVBYfoQE'), yt('Uj07-YU5cTk')],
    },
    {
      id: 'saga-the-legend-of-zelda-breath-of-the-wild-kass-theme', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Breath of the Wild',
      title: 'Kass\' Theme', composer: 'Manaka Kataoka, Yasuaki Iwata y Hajime Wakai', year: 2017, platform: 'Nintendo Switch / Wii U',
      sources: [yt('Wx6CmERsmyo')],
    },
    {
      id: 'saga-the-legend-of-zelda-breath-of-the-wild-rito-village', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Breath of the Wild',
      title: 'Rito Village', composer: 'Manaka Kataoka, Yasuaki Iwata y Hajime Wakai', year: 2017, platform: 'Nintendo Switch / Wii U',
      sources: [yt('EUbS2LLmdX8'), yt('tgKMf2r96o0')],
    },
    {
      id: 'saga-the-legend-of-zelda-breath-of-the-wild-zoras-domain', saga: 'zelda', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Breath of the Wild',
      title: 'Zora\'s Domain', composer: 'Manaka Kataoka, Yasuaki Iwata y Hajime Wakai', year: 2017, platform: 'Nintendo Switch / Wii U',
      sources: [yt('Ud9ktw40mPQ'), yt('cHcLOLJHlMY')],
    },
    /* ───────────── pokemon ───────────── */
    {
      id: 'saga-pokemon-red-and-blue-pallet-town', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Red & Blue',
      title: 'Pallet Town', composer: 'Junichi Masuda', year: 1996, platform: 'Game Boy',
      sources: [yt('kO09V19wwlE'), yt('cOWRNLaCMJg')],
    },
    {
      id: 'saga-pokemon-red-and-blue-pokemon-center', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Red & Blue',
      title: 'Pokémon Center', composer: 'Junichi Masuda', year: 1996, platform: 'Game Boy',
      sources: [yt('MjZIjHu0OfY'), yt('I_pRfIE6PgQ')],
    },
    {
      id: 'saga-pokemon-red-and-blue-battle-trainer', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Red & Blue',
      title: 'Battle! (Trainer)', composer: 'Junichi Masuda', year: 1996, platform: 'Game Boy',
      sources: [yt('yEKd5ebxg9M'), yt('UH7YJGheDUU')],
    },
    {
      id: 'saga-pokemon-red-and-blue-battle-gym-leader', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Red & Blue',
      title: 'Battle! (Gym Leader)', composer: 'Junichi Masuda', year: 1996, platform: 'Game Boy',
      sources: [yt('Vk9T241KnF0')],
    },
    {
      id: 'saga-pokemon-red-and-blue-route-1', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Red & Blue',
      title: 'Route 1', composer: 'Junichi Masuda', year: 1996, platform: 'Game Boy',
      sources: [yt('u0G12EBW4KY'), yt('R4D_12tRenQ')],
    },
    {
      id: 'saga-pokemon-gold-and-silver-goldenrod-city', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Gold & Silver',
      title: 'Goldenrod City', composer: 'Junichi Masuda y Go Ichinose', year: 1999, platform: 'Game Boy Color',
      sources: [yt('S1-VyHIx_SY'), yt('DlqTD429kEM')],
    },
    {
      id: 'saga-pokemon-gold-and-silver-ecruteak-city', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Gold & Silver',
      title: 'Ecruteak City', composer: 'Junichi Masuda y Go Ichinose', year: 1999, platform: 'Game Boy Color',
      sources: [yt('GhJhR96tJwk'), yt('4MNAktk9ei8')],
    },
    {
      id: 'saga-pokemon-gold-and-silver-route-29', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Gold & Silver',
      title: 'Route 29', composer: 'Junichi Masuda y Go Ichinose', year: 1999, platform: 'Game Boy Color',
      sources: [yt('lP1vP21-Kp0'), yt('rxqHQ9nOZcc')],
    },
    {
      id: 'saga-pokemon-gold-and-silver-battle-johto-trainer', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Gold & Silver',
      title: 'Battle! (Johto Trainer)', composer: 'Junichi Masuda y Go Ichinose', year: 1999, platform: 'Game Boy Color',
      sources: [yt('JbCtVIDMEAs'), yt('Yl05vRMfQ4k')],
    },
    {
      id: 'saga-pokemon-ruby-and-sapphire-route-101', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Ruby & Sapphire',
      title: 'Route 101', composer: 'Go Ichinose, Junichi Masuda y Morikazu Aoki', year: 2002, platform: 'Game Boy Advance',
      sources: [apple({ song: 820996259, country: 'us' }), yt('zf9rqmkXCFA'), yt('WMj9b4vYTXU')],
    },
    {
      id: 'saga-pokemon-ruby-and-sapphire-petalburg-city', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Ruby & Sapphire',
      title: 'Petalburg City', composer: 'Go Ichinose, Junichi Masuda y Morikazu Aoki', year: 2002, platform: 'Game Boy Advance',
      sources: [apple({ song: 820996285, country: 'us' }), yt('sj3lYNPm1xU'), yt('L3fiaPBDfv8')],
    },
    {
      id: 'saga-pokemon-ruby-and-sapphire-slateport-city', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Ruby & Sapphire',
      title: 'Slateport City', composer: 'Go Ichinose, Junichi Masuda y Morikazu Aoki', year: 2002, platform: 'Game Boy Advance',
      sources: [apple({ song: 820996375, country: 'us' }), yt('3sX3CjliJtE'), yt('l0yo32iVGA0')],
    },
    {
      id: 'saga-pokemon-ruby-and-sapphire-battle-team-aqua-magma', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Ruby & Sapphire',
      title: 'Battle! (Team Aqua/Magma)', composer: 'Go Ichinose, Junichi Masuda y Morikazu Aoki', year: 2002, platform: 'Game Boy Advance',
      sources: [apple({ song: 820996300, country: 'us' }), yt('DR06tQIFz5w'), yt('FjCH4wPC6dA')],
    },
    {
      id: 'saga-pokemon-diamond-and-pearl-jubilife-city', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Diamond & Pearl',
      title: 'Jubilife City', composer: 'Hitomi Sato, Go Ichinose y Junichi Masuda', year: 2006, platform: 'Nintendo DS',
      sources: [apple({ song: 840159590, country: 'us' }), yt('s3dLJDcLcow'), yt('loMhf2J6UsA')],
    },
    {
      id: 'saga-pokemon-diamond-and-pearl-twinleaf-town', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Diamond & Pearl',
      title: 'Twinleaf Town', composer: 'Hitomi Sato, Go Ichinose y Junichi Masuda', year: 2006, platform: 'Nintendo DS',
      sources: [apple({ song: 840159412, country: 'us' }), yt('npOxbkubyEA')],
    },
    {
      id: 'saga-pokemon-diamond-and-pearl-route-201', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Diamond & Pearl',
      title: 'Route 201', composer: 'Hitomi Sato, Go Ichinose y Junichi Masuda', year: 2006, platform: 'Nintendo DS',
      sources: [apple({ song: 840159420, country: 'us' }), yt('1Q_-XkUWH0w'), yt('wr5vbFgvhVE')],
    },
    {
      id: 'saga-pokemon-diamond-and-pearl-eterna-forest', saga: 'pokemon', franchise: 'Pokémon', game: 'Pokémon Diamond & Pearl',
      title: 'Eterna Forest', composer: 'Hitomi Sato, Go Ichinose y Junichi Masuda', year: 2006, platform: 'Nintendo DS',
      sources: [apple({ song: 840162936, country: 'us' }), yt('KqkMem4XeJQ'), yt('S8-FXBuVXAs')],
    },
    /* ───────────── kirby ───────────── */
    {
      id: 'saga-kirbys-dream-land-float-islands', saga: 'kirby', franchise: 'Kirby', game: 'Kirby\'s Dream Land',
      title: 'Float Islands', composer: 'Jun Ishikawa', year: 1992, platform: 'Game Boy',
      sources: [yt('AmL_nb6g_ME'), yt('P1YBW-rj_jk')],
    },
    {
      id: 'saga-kirbys-dream-land-bubbly-clouds', saga: 'kirby', franchise: 'Kirby', game: 'Kirby\'s Dream Land',
      title: 'Bubbly Clouds', composer: 'Jun Ishikawa', year: 1992, platform: 'Game Boy',
      sources: [yt('85w5rfY6gaA'), yt('Em1Ux35lxLc')],
    },
    {
      id: 'saga-kirbys-dream-land-castle-lololo', saga: 'kirby', franchise: 'Kirby', game: 'Kirby\'s Dream Land',
      title: 'Castle Lololo', composer: 'Jun Ishikawa', year: 1992, platform: 'Game Boy',
      sources: [yt('yYsPS4zfCiM'), yt('rWaUCMx8E0s')],
    },
    {
      id: 'saga-kirbys-dream-land-king-dededes-theme', saga: 'kirby', franchise: 'Kirby', game: 'Kirby\'s Dream Land',
      title: 'King Dedede\'s Theme', composer: 'Jun Ishikawa', year: 1992, platform: 'Game Boy',
      sources: [yt('cJy1rTRIRlE')],
    },
    {
      id: 'saga-kirbys-adventure-vegetable-valley', saga: 'kirby', franchise: 'Kirby', game: 'Kirby\'s Adventure',
      title: 'Vegetable Valley', composer: 'Jun Ishikawa y Hirokazu Ando', year: 1993, platform: 'NES',
      sources: [yt('XT0CXT38Vf4'), yt('dHsFjwmA--M')],
    },
    {
      id: 'saga-kirbys-adventure-ice-cream-island', saga: 'kirby', franchise: 'Kirby', game: 'Kirby\'s Adventure',
      title: 'Ice Cream Island', composer: 'Jun Ishikawa y Hirokazu Ando', year: 1993, platform: 'NES',
      sources: [yt('0SzIl49Fqb0'), yt('8B3bxk38OaY')],
    },
    {
      id: 'saga-kirbys-adventure-rainbow-resort', saga: 'kirby', franchise: 'Kirby', game: 'Kirby\'s Adventure',
      title: 'Rainbow Resort', composer: 'Jun Ishikawa y Hirokazu Ando', year: 1993, platform: 'NES',
      sources: [yt('aAaPQOhLA2Y'), yt('MHpSAwzh50M')],
    },
    {
      id: 'saga-kirbys-adventure-orange-ocean', saga: 'kirby', franchise: 'Kirby', game: 'Kirby\'s Adventure',
      title: 'Orange Ocean', composer: 'Jun Ishikawa y Hirokazu Ando', year: 1993, platform: 'NES',
      sources: [yt('4ZIZVsZ-0iE'), yt('lrJKXQnlRf4')],
    },
    {
      id: 'saga-kirby-super-star-vs-marx', saga: 'kirby', franchise: 'Kirby', game: 'Kirby Super Star',
      title: 'Vs. Marx', composer: 'Jun Ishikawa', year: 1996, platform: 'SNES',
      sources: [yt('YnfL3tzFx1Y'), yt('CySXu56R4V0')],
    },
    {
      id: 'saga-kirby-super-star-the-great-cave-offensive', saga: 'kirby', franchise: 'Kirby', game: 'Kirby Super Star',
      title: 'The Great Cave Offensive', composer: 'Jun Ishikawa', year: 1996, platform: 'SNES',
      sources: [yt('slOXXskLrV8')],
    },
    {
      id: 'saga-kirby-super-star-dyna-blade', saga: 'kirby', franchise: 'Kirby', game: 'Kirby Super Star',
      title: 'Dyna Blade', composer: 'Jun Ishikawa', year: 1996, platform: 'SNES',
      sources: [yt('hRgW8JcWYV0'), yt('RklMEhqVIvw')],
    },
    {
      id: 'saga-kirby-super-star-meta-knights-revenge', saga: 'kirby', franchise: 'Kirby', game: 'Kirby Super Star',
      title: 'Meta Knight\'s Revenge', composer: 'Jun Ishikawa', year: 1996, platform: 'SNES',
      sources: [yt('NdWckdX4LlE')],
    },
    /* ───────────── donkey-kong ───────────── */
    {
      id: 'saga-donkey-kong-country-gang-plank-galleon', saga: 'donkey-kong', franchise: 'Donkey Kong', game: 'Donkey Kong Country',
      title: 'Gang-Plank Galleon', composer: 'David Wise, Eveline Fischer y Robin Beanland', year: 1994, platform: 'SNES',
      sources: [yt('Hnu4S76N3lw'), yt('T0H_gtLBeFo')],
    },
    {
      id: 'saga-donkey-kong-country-fear-factory', saga: 'donkey-kong', franchise: 'Donkey Kong', game: 'Donkey Kong Country',
      title: 'Fear Factory', composer: 'David Wise, Eveline Fischer y Robin Beanland', year: 1994, platform: 'SNES',
      sources: [yt('a6skzlUQBbQ'), yt('krnF4BeIPUU')],
    },
    {
      id: 'saga-donkey-kong-country-ice-cave-chant', saga: 'donkey-kong', franchise: 'Donkey Kong', game: 'Donkey Kong Country',
      title: 'Ice Cave Chant', composer: 'David Wise, Eveline Fischer y Robin Beanland', year: 1994, platform: 'SNES',
      sources: [yt('Fa-5Y6jDTHQ'), yt('9UWCf8AV494')],
    },
    {
      id: 'saga-donkey-kong-country-life-in-the-mines', saga: 'donkey-kong', franchise: 'Donkey Kong', game: 'Donkey Kong Country',
      title: 'Life in the Mines', composer: 'David Wise, Eveline Fischer y Robin Beanland', year: 1994, platform: 'SNES',
      sources: [yt('erGZDJertpU'), yt('Ior-jYblXU0')],
    },
    {
      id: 'saga-donkey-kong-country-forest-frenzy', saga: 'donkey-kong', franchise: 'Donkey Kong', game: 'Donkey Kong Country',
      title: 'Forest Frenzy', composer: 'David Wise, Eveline Fischer y Robin Beanland', year: 1994, platform: 'SNES',
      sources: [yt('bQA9_KkT9R4'), yt('54owKVhMvHM')],
    },
    {
      id: 'saga-donkey-kong-country-2-diddys-kong-quest-lockjaws-saga', saga: 'donkey-kong', franchise: 'Donkey Kong', game: 'Donkey Kong Country 2: Diddy\'s Kong Quest',
      title: 'Lockjaw\'s Saga', composer: 'David Wise', year: 1995, platform: 'SNES',
      sources: [yt('McSHtulKWto'), yt('6MVMcAlgHxY')],
    },
    {
      id: 'saga-donkey-kong-country-2-diddys-kong-quest-snakey-chantey', saga: 'donkey-kong', franchise: 'Donkey Kong', game: 'Donkey Kong Country 2: Diddy\'s Kong Quest',
      title: 'Snakey Chantey', composer: 'David Wise', year: 1995, platform: 'SNES',
      sources: [yt('aXcZ4qv__Xs'), yt('Mr2cFY_3PT0')],
    },
    {
      id: 'saga-donkey-kong-country-2-diddys-kong-quest-flight-of-the-zinge', saga: 'donkey-kong', franchise: 'Donkey Kong', game: 'Donkey Kong Country 2: Diddy\'s Kong Quest',
      title: 'Flight of the Zinger', composer: 'David Wise', year: 1995, platform: 'SNES',
      sources: [yt('B8sKwkBxPM0'), yt('EmSA9AY49rU')],
    },
    {
      id: 'saga-donkey-kong-country-2-diddys-kong-quest-hot-head-bop', saga: 'donkey-kong', franchise: 'Donkey Kong', game: 'Donkey Kong Country 2: Diddy\'s Kong Quest',
      title: 'Hot-Head Bop', composer: 'David Wise', year: 1995, platform: 'SNES',
      sources: [yt('h_WEMytLlnw'), yt('flAFuldeRV8')],
    },
    {
      id: 'saga-donkey-kong-country-2-diddys-kong-quest-forest-interlude', saga: 'donkey-kong', franchise: 'Donkey Kong', game: 'Donkey Kong Country 2: Diddy\'s Kong Quest',
      title: 'Forest Interlude', composer: 'David Wise', year: 1995, platform: 'SNES',
      sources: [yt('AnEfB1F9BaY'), yt('x5EgRk0mQM8')],
    },
    {
      id: 'saga-donkey-kong-64-dk-rap', saga: 'donkey-kong', franchise: 'Donkey Kong', game: 'Donkey Kong 64',
      title: 'DK Rap', composer: 'Grant Kirkhope', year: 1999, platform: 'Nintendo 64',
      sources: [yt('npuuTBlEb1U'), yt('G0XxA1ms_II')],
    },
    {
      id: 'saga-donkey-kong-64-jungle-japes', saga: 'donkey-kong', franchise: 'Donkey Kong', game: 'Donkey Kong 64',
      title: 'Jungle Japes', composer: 'Grant Kirkhope', year: 1999, platform: 'Nintendo 64',
      sources: [yt('2_Jl3F2e4B0'), yt('BkrTUw_mdQs')],
    },
    {
      id: 'saga-donkey-kong-64-angry-aztec', saga: 'donkey-kong', franchise: 'Donkey Kong', game: 'Donkey Kong 64',
      title: 'Angry Aztec', composer: 'Grant Kirkhope', year: 1999, platform: 'Nintendo 64',
      sources: [yt('awwa_EnHVfo'), yt('gyp-AELnlzU')],
    },
    {
      id: 'saga-donkey-kong-64-fungi-forest', saga: 'donkey-kong', franchise: 'Donkey Kong', game: 'Donkey Kong 64',
      title: 'Fungi Forest', composer: 'Grant Kirkhope', year: 1999, platform: 'Nintendo 64',
      sources: [yt('z3LY3gKCCUo'), yt('4xlr9ko7B3s')],
    },
    {
      id: 'saga-donkey-kong-64-creepy-castle', saga: 'donkey-kong', franchise: 'Donkey Kong', game: 'Donkey Kong 64',
      title: 'Creepy Castle', composer: 'Grant Kirkhope', year: 1999, platform: 'Nintendo 64',
      sources: [yt('ftiqcfh15Cc'), yt('BH7QwvrGAhQ')],
    },
    /* ───────────── sonic ───────────── */
    {
      id: 'saga-sonic-the-hedgehog-marble-zone', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog',
      title: 'Marble Zone', composer: 'Masato Nakamura', year: 1991, platform: 'Mega Drive',
      sources: [apple({ song: 1571062717, country: 'us' }), yt('nyW6SHySAHM'), yt('z1aXXX_oqP8')],
    },
    {
      id: 'saga-sonic-the-hedgehog-spring-yard-zone', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog',
      title: 'Spring Yard Zone', composer: 'Masato Nakamura', year: 1991, platform: 'Mega Drive',
      sources: [apple({ song: 1571062718, country: 'us' }), yt('Vq40xcLyyjQ'), yt('8UeOg9Kubek')],
    },
    {
      id: 'saga-sonic-the-hedgehog-labyrinth-zone', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog',
      title: 'Labyrinth Zone', composer: 'Masato Nakamura', year: 1991, platform: 'Mega Drive',
      sources: [apple({ song: 1571062722, country: 'us' }), yt('8CErBJJX00M'), yt('JlY8Di_Pb4U')],
    },
    {
      id: 'saga-sonic-the-hedgehog-star-light-zone', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog',
      title: 'Star Light Zone', composer: 'Masato Nakamura', year: 1991, platform: 'Mega Drive',
      sources: [apple({ song: 1571062725, country: 'us' }), yt('0rwH_2Desp0'), yt('uIp8N0ePkLw')],
    },
    {
      id: 'saga-sonic-the-hedgehog-scrap-brain-zone', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog',
      title: 'Scrap Brain Zone', composer: 'Masato Nakamura', year: 1991, platform: 'Mega Drive',
      sources: [apple({ song: 1571062728, country: 'us' }), yt('5VaRpZETtUQ'), yt('ONQKGcuHsg0')],
    },
    {
      id: 'saga-sonic-the-hedgehog-2-emerald-hill-zone', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog 2',
      title: 'Emerald Hill Zone', composer: 'Masato Nakamura', year: 1992, platform: 'Mega Drive',
      sources: [apple({ song: 1571062936, country: 'us' }), yt('LWdhufzxQRA'), yt('kiT9yLezwbE')],
    },
    {
      id: 'saga-sonic-the-hedgehog-2-casino-night-zone', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog 2',
      title: 'Casino Night Zone', composer: 'Masato Nakamura', year: 1992, platform: 'Mega Drive',
      sources: [apple({ song: 1571062950, country: 'us' }), yt('0gw7A3Ao7Y8'), yt('x_jsB_aABoI')],
    },
    {
      id: 'saga-sonic-the-hedgehog-2-mystic-cave-zone', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog 2',
      title: 'Mystic Cave Zone', composer: 'Masato Nakamura', year: 1992, platform: 'Mega Drive',
      sources: [apple({ song: 1571062952, country: 'us' }), yt('HdgRJDu4hcU'), yt('TVEyGntyOZQ')],
    },
    {
      id: 'saga-sonic-the-hedgehog-2-aquatic-ruin-zone', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog 2',
      title: 'Aquatic Ruin Zone', composer: 'Masato Nakamura', year: 1992, platform: 'Mega Drive',
      sources: [apple({ song: 1571062949, country: 'us' }), yt('AK33c2rV2Do'), yt('nhHa7ph5GLg')],
    },
    {
      id: 'saga-sonic-the-hedgehog-3-angel-island-zone', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog 3',
      title: 'Angel Island Zone', composer: 'Sega Sound Team', year: 1994, platform: 'Mega Drive',
      sources: [yt('CuReWvbiMhY'), yt('sC-d-AM0gCM')],
    },
    {
      id: 'saga-sonic-the-hedgehog-3-hydrocity-zone', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog 3',
      title: 'Hydrocity Zone', composer: 'Sega Sound Team', year: 1994, platform: 'Mega Drive',
      sources: [yt('RPYzgCI6Q1I'), yt('1K1rV9kFs6I')],
    },
    {
      id: 'saga-sonic-the-hedgehog-3-carnival-night-zone', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog 3',
      title: 'Carnival Night Zone', composer: 'Sega Sound Team', year: 1994, platform: 'Mega Drive',
      sources: [yt('gHwHiymSojk'), yt('dt1e6mBFp4A')],
    },
    {
      id: 'saga-sonic-the-hedgehog-3-marble-garden-zone', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog 3',
      title: 'Marble Garden Zone', composer: 'Sega Sound Team', year: 1994, platform: 'Mega Drive',
      sources: [yt('Jq6oRi6UTXY'), yt('3Qw10LYqye4')],
    },
    {
      id: 'saga-sonic-adventure-it-doesnt-matter', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic Adventure',
      title: 'It Doesn\'t Matter', composer: 'Jun Senoue', year: 1998, platform: 'Dreamcast',
      sources: [yt('NDpZ9Qg761I'), yt('pJs1iJOXFN8')],
    },
    {
      id: 'saga-sonic-adventure-azure-blue-world', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic Adventure',
      title: 'Azure Blue World', composer: 'Jun Senoue', year: 1998, platform: 'Dreamcast',
      sources: [apple({ song: 915243460, country: 'us' }), yt('lJMc40mXhto'), yt('98z669imLpE')],
    },
    {
      id: 'saga-sonic-adventure-run-through-the-speed-highway', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic Adventure',
      title: 'Run Through the Speed Highway', composer: 'Jun Senoue', year: 1998, platform: 'Dreamcast',
      sources: [apple({ song: 915243492, country: 'us' }), yt('xgcyH9I1NBE'), yt('EDE5Us3KEqo')],
    },
    {
      id: 'saga-sonic-adventure-windy-hill', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic Adventure',
      title: 'Windy Hill', composer: 'Jun Senoue', year: 1998, platform: 'Dreamcast',
      sources: [apple({ song: 915243539, country: 'us' }), yt('2ElK26-lwVs'), yt('FvKQLPHWuwU')],
    },
    {
      id: 'saga-sonic-adventure-2-escape-from-the-city', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic Adventure 2',
      title: 'Escape from the City', composer: 'Jun Senoue', year: 2001, platform: 'Dreamcast',
      sources: [apple({ song: 929920756, country: 'us' }), yt('5WcyVvWZJU4'), yt('YQDDkG24DVw')],
    },
    {
      id: 'saga-sonic-adventure-2-unknown-from-m-e', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic Adventure 2',
      title: 'Unknown from M.E.', composer: 'Jun Senoue', year: 2001, platform: 'Dreamcast',
      sources: [yt('JntQ1X46qgg'), yt('Ki5_XdOR7KE')],
    },
    {
      id: 'saga-sonic-adventure-2-throw-it-all-away', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic Adventure 2',
      title: 'Throw It All Away', composer: 'Jun Senoue', year: 2001, platform: 'Dreamcast',
      sources: [yt('OxLH0nnUnCY'), yt('8XKba81lEPU')],
    },
    {
      id: 'saga-sonic-adventure-2-supporting-me', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic Adventure 2',
      title: 'Supporting Me', composer: 'Jun Senoue', year: 2001, platform: 'Dreamcast',
      sources: [apple({ song: 929931503, country: 'us' }), yt('VXeIRsqqFbA'), yt('dMXyNB8HFG8')],
    },
    {
      id: 'saga-sonic-frontiers-undefeatable', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic Frontiers',
      title: 'Undefeatable', composer: 'Tomoya Ohtani', year: 2022, platform: 'PS5 / Xbox / Switch / PC',
      sources: [apple({ song: 1652677664, country: 'us' }), yt('IWmapG_rAQ8'), yt('3NoKAOTE_ZI')],
    },
    {
      id: 'saga-sonic-frontiers-break-through-it-all', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic Frontiers',
      title: 'Break Through It All', composer: 'Tomoya Ohtani', year: 2022, platform: 'PS5 / Xbox / Switch / PC',
      sources: [apple({ song: 1652689615, country: 'us' }), yt('-PCdu2PHjwA'), yt('74LuHHYkuIs')],
    },
    {
      id: 'saga-sonic-frontiers-find-your-flame', saga: 'sonic', franchise: 'Sonic the Hedgehog', game: 'Sonic Frontiers',
      title: 'Find Your Flame', composer: 'Tomoya Ohtani', year: 2022, platform: 'PS5 / Xbox / Switch / PC',
      sources: [apple({ song: 1652703113, country: 'us' }), yt('QL0Z9UvDW3c'), yt('wagkbGcX21k')],
    },
    /* ───────────── final-fantasy ───────────── */
    {
      id: 'saga-final-fantasy-vi-terras-theme', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VI',
      title: 'Terra\'s Theme', composer: 'Nobuo Uematsu', year: 1994, platform: 'SNES',
      sources: [apple({ song: 62446770, country: 'mx' }), yt('PiI7rDqv9FQ'), yt('xLLI0TjYoNU')],
    },
    {
      id: 'saga-final-fantasy-vi-dancing-mad', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VI',
      title: 'Dancing Mad', composer: 'Nobuo Uematsu', year: 1994, platform: 'SNES',
      sources: [apple({ song: 62447131, country: 'mx' }), yt('FRnDbOwGipo'), yt('g6UgxJtHIVY')],
    },
    {
      id: 'saga-final-fantasy-vi-aria-di-mezzo-carattere', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VI',
      title: 'Aria di Mezzo Carattere', composer: 'Nobuo Uematsu', year: 1994, platform: 'SNES',
      sources: [apple({ song: 62446851, country: 'mx' })],
    },
    {
      id: 'saga-final-fantasy-vi-kefka', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VI',
      title: 'Kefka', composer: 'Nobuo Uematsu', year: 1994, platform: 'SNES',
      sources: [apple({ song: 62446554, country: 'mx' })],
    },
    {
      id: 'saga-final-fantasy-vi-kefkas-tower', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VI',
      title: 'Kefka\'s Tower', composer: 'Nobuo Uematsu', year: 1994, platform: 'SNES',
      sources: [apple({ song: 62447113, country: 'mx' }), yt('Z_72wzafKjo'), yt('vRpYI2ZZOAU')],
    },
    {
      id: 'saga-final-fantasy-vii-aeriths-theme', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VII',
      title: 'Aerith\'s Theme', composer: 'Nobuo Uematsu', year: 1997, platform: 'PlayStation',
      sources: [apple({ song: 61017453, country: 'us' }), yt('iqMbmkUpihA')],
    },
    {
      id: 'saga-final-fantasy-vii-prelude', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VII',
      title: 'Prelude', composer: 'Nobuo Uematsu', year: 1997, platform: 'PlayStation',
      sources: [apple({ song: 61016708, country: 'us' }), yt('FabUYfFBs3s'), yt('zRZOVNJXkGI')],
    },
    {
      id: 'saga-final-fantasy-vii-main-theme-of-final-fantasy-vii', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VII',
      title: 'Main Theme of Final Fantasy VII', composer: 'Nobuo Uematsu', year: 1997, platform: 'PlayStation',
      sources: [apple({ song: 61016881, country: 'us' }), yt('nnzpEPI_JMc'), yt('ORpKwkq5z-4')],
    },
    {
      id: 'saga-final-fantasy-vii-let-the-battles-begin', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VII',
      title: 'Let the Battles Begin!', composer: 'Nobuo Uematsu', year: 1997, platform: 'PlayStation',
      sources: [apple({ song: 61016795, country: 'us' }), yt('U_lqfaQIZH4')],
    },
    {
      id: 'saga-final-fantasy-vii-tifas-theme', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VII',
      title: 'Tifa\'s Theme', composer: 'Nobuo Uematsu', year: 1997, platform: 'PlayStation',
      sources: [apple({ song: 61016765, country: 'us' }), yt('cO_ftxA28Y8'), yt('W_UWkWlvbFw')],
    },
    {
      id: 'saga-final-fantasy-vii-j-e-n-o-v-a', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VII',
      title: 'J-E-N-O-V-A', composer: 'Nobuo Uematsu', year: 1997, platform: 'PlayStation',
      sources: [apple({ song: 61017139, country: 'us' })],
    },
    {
      id: 'saga-final-fantasy-viii-dont-be-afraid', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VIII',
      title: 'Don\'t Be Afraid', composer: 'Nobuo Uematsu', year: 1999, platform: 'PlayStation',
      sources: [apple({ song: 62442481, country: 'mx' }), yt('nZ4Ivp-nTEQ'), yt('S5bRMje6V9Y')],
    },
    {
      id: 'saga-final-fantasy-viii-balamb-garden', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VIII',
      title: 'Balamb Garden', composer: 'Nobuo Uematsu', year: 1999, platform: 'PlayStation',
      sources: [apple({ song: 62442458, country: 'mx' }), yt('p2RW8HWNY8M'), yt('UmYfkfm7GpA')],
    },
    {
      id: 'saga-final-fantasy-viii-the-man-with-the-machine-gun', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VIII',
      title: 'The Man with the Machine Gun', composer: 'Nobuo Uematsu', year: 1999, platform: 'PlayStation',
      sources: [apple({ song: 62442643, country: 'mx' }), yt('KMm7kayDeTU')],
    },
    {
      id: 'saga-final-fantasy-viii-force-your-way', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VIII',
      title: 'Force Your Way', composer: 'Nobuo Uematsu', year: 1999, platform: 'PlayStation',
      sources: [apple({ song: 62442543, country: 'mx' }), yt('ak-AfYL-rfI'), yt('HFzbRTAyal8')],
    },
    {
      id: 'saga-final-fantasy-viii-fishermans-horizon', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy VIII',
      title: 'Fisherman\'s Horizon', composer: 'Nobuo Uematsu', year: 1999, platform: 'PlayStation',
      sources: [apple({ song: 62442971, country: 'mx' }), yt('YP9in2EqREA')],
    },
    {
      id: 'saga-final-fantasy-ix-youre-not-alone', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy IX',
      title: 'You\'re Not Alone!', composer: 'Nobuo Uematsu', year: 2000, platform: 'PlayStation',
      sources: [apple({ song: 62444329, country: 'mx' }), yt('yUrC5R30Ofk'), yt('Ha6iWPqrJeE')],
    },
    {
      id: 'saga-final-fantasy-ix-vamo-alla-flamenco', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy IX',
      title: 'Vamo\' alla Flamenco', composer: 'Nobuo Uematsu', year: 2000, platform: 'PlayStation',
      sources: [apple({ song: 62443404, country: 'mx' }), yt('kHGu_rVZcAo'), yt('zCT1n22YOgI')],
    },
    {
      id: 'saga-final-fantasy-ix-roses-of-may', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy IX',
      title: 'Roses of May', composer: 'Nobuo Uematsu', year: 2000, platform: 'PlayStation',
      sources: [apple({ song: 62443978, country: 'mx' }), yt('PSLe02hu7d8'), yt('QOJUxX6tvjw')],
    },
    {
      id: 'saga-final-fantasy-ix-a-place-to-call-home', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy IX',
      title: 'A Place to Call Home', composer: 'Nobuo Uematsu', year: 2000, platform: 'PlayStation',
      sources: [apple({ song: 62443366, country: 'mx' }), yt('VdxC7FqoNQw')],
    },
    {
      id: 'saga-final-fantasy-x-suteki-da-ne', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy X',
      title: 'Suteki da ne', composer: 'Nobuo Uematsu, Masashi Hamauzu y Junya Nakano', year: 2001, platform: 'PlayStation 2',
      sources: [apple({ song: 62445434, country: 'mx' }), yt('Ze6w1sLvymM')],
    },
    {
      id: 'saga-final-fantasy-x-otherworld', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy X',
      title: 'Otherworld', composer: 'Nobuo Uematsu, Masashi Hamauzu y Junya Nakano', year: 2001, platform: 'PlayStation 2',
      sources: [apple({ song: 62444699, country: 'mx' }), yt('BKZs90_fkt4'), yt('KO6fvJrsTsE')],
    },
    {
      id: 'saga-final-fantasy-x-besaid-island', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy X',
      title: 'Besaid Island', composer: 'Nobuo Uematsu, Masashi Hamauzu y Junya Nakano', year: 2001, platform: 'PlayStation 2',
      sources: [apple({ song: 62444834, country: 'mx' }), yt('BRfAbssvy1c'), yt('RC1VmGXiEFw')],
    },
    {
      id: 'saga-final-fantasy-x-challenge', saga: 'final-fantasy', franchise: 'Final Fantasy', game: 'Final Fantasy X',
      title: 'Challenge', composer: 'Nobuo Uematsu, Masashi Hamauzu y Junya Nakano', year: 2001, platform: 'PlayStation 2',
      sources: [apple({ song: 62445572, country: 'mx' })],
    },
    /* ───────────── halo ───────────── */
    {
      id: 'saga-halo-combat-evolved-truth-and-reconciliation-suite', saga: 'halo', franchise: 'Halo', game: 'Halo: Combat Evolved',
      title: 'Truth and Reconciliation Suite', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2001, platform: 'Xbox',
      sources: [apple({ song: 1682519548, country: 'us' }), yt('xSHYFQ_LUIk'), yt('SB6y9q4hEQw')],
    },
    {
      id: 'saga-halo-combat-evolved-brothers-in-arms', saga: 'halo', franchise: 'Halo', game: 'Halo: Combat Evolved',
      title: 'Brothers in Arms', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2001, platform: 'Xbox',
      sources: [apple({ song: 1682519842, country: 'us' }), yt('aQHZCP0ew88')],
    },
    {
      id: 'saga-halo-combat-evolved-rock-anthem-for-saving-the-world', saga: 'halo', franchise: 'Halo', game: 'Halo: Combat Evolved',
      title: 'Rock Anthem for Saving the World', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2001, platform: 'Xbox',
      sources: [apple({ song: 1682521062, country: 'us' }), yt('aEbxfy2Tv6I'), yt('6Wcqnofddtc')],
    },
    {
      id: 'saga-halo-combat-evolved-perilous-journey', saga: 'halo', franchise: 'Halo', game: 'Halo: Combat Evolved',
      title: 'Perilous Journey', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2001, platform: 'Xbox',
      sources: [apple({ song: 1682519893, country: 'us' }), yt('TGz-AfDaDAM'), yt('0obow-wqPb0')],
    },
    {
      id: 'saga-halo-2-blow-me-away', saga: 'halo', franchise: 'Halo', game: 'Halo 2',
      title: 'Blow Me Away', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2004, platform: 'Xbox',
      sources: [apple({ song: 1682511820, country: 'us' }), yt('OrOB9vLzksc'), yt('tj9QbiBaSsk')],
    },
    {
      id: 'saga-halo-2-peril', saga: 'halo', franchise: 'Halo', game: 'Halo 2',
      title: 'Peril', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2004, platform: 'Xbox',
      sources: [apple({ song: 1682511824, country: 'us' }), yt('nD-PTA0WTlI'), yt('itKxjLSsIL8')],
    },
    {
      id: 'saga-halo-2-unforgotten', saga: 'halo', franchise: 'Halo', game: 'Halo 2',
      title: 'Unforgotten', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2004, platform: 'Xbox',
      sources: [apple({ song: 1682498870, country: 'us' }), yt('2viwZVJqWbA'), yt('zmKOKRjxAAo')],
    },
    {
      id: 'saga-halo-2-in-amber-clad', saga: 'halo', franchise: 'Halo', game: 'Halo 2',
      title: 'In Amber Clad', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2004, platform: 'Xbox',
      sources: [apple({ song: 1682513811, country: 'us' }), yt('5ZaF1Ao5YGI'), yt('hvULmdUJw1A')],
    },
    {
      id: 'saga-halo-3-finish-the-fight', saga: 'halo', franchise: 'Halo', game: 'Halo 3',
      title: 'Finish the Fight', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2007, platform: 'Xbox 360',
      sources: [apple({ song: 1682511364, country: 'us' }), yt('DNWaJU8nNno'), yt('JFOJ13sw8o4')],
    },
    {
      id: 'saga-halo-3-never-forget', saga: 'halo', franchise: 'Halo', game: 'Halo 3',
      title: 'Never Forget', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2007, platform: 'Xbox 360',
      sources: [apple({ song: 1682510979, country: 'us' }), yt('OOHXjgEY_RQ'), yt('JX5O3n9K_d0')],
    },
    {
      id: 'saga-halo-3-released', saga: 'halo', franchise: 'Halo', game: 'Halo 3',
      title: 'Released', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2007, platform: 'Xbox 360',
      sources: [apple({ song: 1682506344, country: 'us' }), yt('BJAfrL889CQ'), yt('pfgXFBWuKow')],
    },
    {
      id: 'saga-halo-3-behold-a-pale-horse', saga: 'halo', franchise: 'Halo', game: 'Halo 3',
      title: 'Behold a Pale Horse', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2007, platform: 'Xbox 360',
      sources: [apple({ song: 1682508283, country: 'us' }), yt('aDSQbCYrXu0'), yt('zJUuMk18sqQ')],
    },
    {
      id: 'saga-halo-reach-ashes', saga: 'halo', franchise: 'Halo', game: 'Halo: Reach',
      title: 'Ashes', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2010, platform: 'Xbox 360',
      sources: [apple({ song: 1682515986, country: 'us' }), yt('qNSUhJoMIEE'), yt('C6eMBvMuZ6A')],
    },
    {
      id: 'saga-halo-reach-ghosts-and-glass', saga: 'halo', franchise: 'Halo', game: 'Halo: Reach',
      title: 'Ghosts and Glass', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2010, platform: 'Xbox 360',
      sources: [apple({ song: 1682516926, country: 'us' }), yt('pfobM_oV9MI'), yt('isaOrKNHw7g')],
    },
    {
      id: 'saga-halo-reach-winter-contingency', saga: 'halo', franchise: 'Halo', game: 'Halo: Reach',
      title: 'Winter Contingency', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2010, platform: 'Xbox 360',
      sources: [apple({ song: 1682514374, country: 'us' }), yt('JUeBfZxh1cc'), yt('kY1b3jsKfvI')],
    },
    {
      id: 'saga-halo-reach-the-package', saga: 'halo', franchise: 'Halo', game: 'Halo: Reach',
      title: 'The Package', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2010, platform: 'Xbox 360',
      sources: [apple({ song: 1682515549, country: 'us' }), yt('E_hHvJ8NzXY'), yt('BGDnjVkk74o')],
    },
    {
      id: 'saga-halo-3-odst-the-rookie', saga: 'halo', franchise: 'Halo', game: 'Halo 3: ODST',
      title: 'The Rookie', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2009, platform: 'Xbox 360',
      sources: [apple({ song: 1682503055, country: 'us' }), yt('0YwVVB00ftA'), yt('lwnwNws4b5Y')],
    },
    {
      id: 'saga-halo-3-odst-neon-night', saga: 'halo', franchise: 'Halo', game: 'Halo 3: ODST',
      title: 'Neon Night', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2009, platform: 'Xbox 360',
      sources: [apple({ song: 1682503738, country: 'us' }), yt('AQRH6kLMa1k'), yt('ONSqRdnNJj4')],
    },
    {
      id: 'saga-halo-3-odst-deference-for-darkness', saga: 'halo', franchise: 'Halo', game: 'Halo 3: ODST',
      title: 'Deference for Darkness', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2009, platform: 'Xbox 360',
      sources: [apple({ song: 1682503376, country: 'us' }), yt('346rm-hPLA4')],
    },
    {
      id: 'saga-halo-3-odst-skyline', saga: 'halo', franchise: 'Halo', game: 'Halo 3: ODST',
      title: 'Skyline', composer: 'Martin O\'Donnell y Michael Salvatori', year: 2009, platform: 'Xbox 360',
      sources: [apple({ song: 1682504154, country: 'us' }), yt('ka2yMEZ1kfI'), yt('P7k7I7f0hrc')],
    },
    /* ───────────── mega-man ───────────── */
    {
      id: 'saga-mega-man-2-metal-man-stage', saga: 'mega-man', franchise: 'Mega Man', game: 'Mega Man 2',
      title: 'Metal Man Stage', composer: 'Takashi Tateishi', year: 1988, platform: 'NES',
      sources: [apple({ song: 1086913482, country: 'jp' })],
    },
    {
      id: 'saga-mega-man-2-quick-man-stage', saga: 'mega-man', franchise: 'Mega Man', game: 'Mega Man 2',
      title: 'Quick Man Stage', composer: 'Takashi Tateishi', year: 1988, platform: 'NES',
      sources: [apple({ song: 1086913485, country: 'jp' }), yt('L5g93Z2nFYU'), yt('FRa4LHSJf_M')],
    },
    {
      id: 'saga-mega-man-2-bubble-man-stage', saga: 'mega-man', franchise: 'Mega Man', game: 'Mega Man 2',
      title: 'Bubble Man Stage', composer: 'Takashi Tateishi', year: 1988, platform: 'NES',
      sources: [apple({ song: 1086913484, country: 'jp' }), yt('e3bDQ_fabW0'), yt('FEULEvmq7yE')],
    },
    {
      id: 'saga-mega-man-2-crash-man-stage', saga: 'mega-man', franchise: 'Mega Man', game: 'Mega Man 2',
      title: 'Crash Man Stage', composer: 'Takashi Tateishi', year: 1988, platform: 'NES',
      sources: [apple({ song: 1086913486, country: 'jp' }), yt('7oO7QC32Wfs'), yt('F4MhF3BYtHo')],
    },
    {
      id: 'saga-mega-man-2-flash-man-stage', saga: 'mega-man', franchise: 'Mega Man', game: 'Mega Man 2',
      title: 'Flash Man Stage', composer: 'Takashi Tateishi', year: 1988, platform: 'NES',
      sources: [apple({ song: 1086913487, country: 'jp' }), yt('irFVOnCKjnI'), yt('26MopY4DTZU')],
    },
    {
      id: 'saga-mega-man-3-snake-man-stage', saga: 'mega-man', franchise: 'Mega Man', game: 'Mega Man 3',
      title: 'Snake Man Stage', composer: 'Yasuaki Fujita', year: 1990, platform: 'NES',
      sources: [apple({ song: 1086916653, country: 'jp' }), yt('JhBReeSrh0U'), yt('ZqGLXispP08')],
    },
    {
      id: 'saga-mega-man-3-shadow-man-stage', saga: 'mega-man', franchise: 'Mega Man', game: 'Mega Man 3',
      title: 'Shadow Man Stage', composer: 'Yasuaki Fujita', year: 1990, platform: 'NES',
      sources: [apple({ song: 1086916655, country: 'jp' }), yt('Tl9vnKYVlz4'), yt('Usl7cw6VnLU')],
    },
    {
      id: 'saga-mega-man-3-spark-man-stage', saga: 'mega-man', franchise: 'Mega Man', game: 'Mega Man 3',
      title: 'Spark Man Stage', composer: 'Yasuaki Fujita', year: 1990, platform: 'NES',
      sources: [apple({ song: 1086916654, country: 'jp' }), yt('HkhI6kjXW48'), yt('6J5cN87c2yM')],
    },
    {
      id: 'saga-mega-man-3-needle-man-stage', saga: 'mega-man', franchise: 'Mega Man', game: 'Mega Man 3',
      title: 'Needle Man Stage', composer: 'Yasuaki Fujita', year: 1990, platform: 'NES',
      sources: [apple({ song: 1086916648, country: 'jp' }), yt('iF9hBPcxuDI'), yt('wDJbOB1h2EU')],
    },
    {
      id: 'saga-mega-man-3-gemini-man-stage', saga: 'mega-man', franchise: 'Mega Man', game: 'Mega Man 3',
      title: 'Gemini Man Stage', composer: 'Yasuaki Fujita', year: 1990, platform: 'NES',
      sources: [apple({ song: 1086916650, country: 'jp' }), yt('3pVlf9tuUo0'), yt('J2LF3YR2dNM')],
    },
    {
      id: 'saga-mega-man-x-storm-eagle-stage', saga: 'mega-man', franchise: 'Mega Man', game: 'Mega Man X',
      title: 'Storm Eagle Stage', composer: 'Setsuo Yamamoto, Makoto Tomozawa y otros', year: 1993, platform: 'SNES',
      sources: [apple({ song: 1406684867, country: 'us' }), yt('AipJNHPvIU4'), yt('HdpBgxeOw7w')],
    },
    {
      id: 'saga-mega-man-x-spark-mandrill-stage', saga: 'mega-man', franchise: 'Mega Man', game: 'Mega Man X',
      title: 'Spark Mandrill Stage', composer: 'Setsuo Yamamoto, Makoto Tomozawa y otros', year: 1993, platform: 'SNES',
      sources: [apple({ song: 1406684866, country: 'us' }), yt('wdvJtSroRSw'), yt('qpRQtn8JQvI')],
    },
    {
      id: 'saga-mega-man-x-chill-penguin-stage', saga: 'mega-man', franchise: 'Mega Man', game: 'Mega Man X',
      title: 'Chill Penguin Stage', composer: 'Setsuo Yamamoto, Makoto Tomozawa y otros', year: 1993, platform: 'SNES',
      sources: [apple({ song: 1406684736, country: 'us' }), yt('DIMmdlvJSSk'), yt('fcOjHuAD6SI')],
    },
    {
      id: 'saga-mega-man-x-armored-armadillo-stage', saga: 'mega-man', franchise: 'Mega Man', game: 'Mega Man X',
      title: 'Armored Armadillo Stage', composer: 'Setsuo Yamamoto, Makoto Tomozawa y otros', year: 1993, platform: 'SNES',
      sources: [apple({ song: 1406684869, country: 'us' }), yt('gBFdJMpox8s'), yt('eAGRVDZdB3Q')],
    },
    /* ───────────── street-fighter ───────────── */
    {
      id: 'saga-street-fighter-ii-chun-lis-theme', saga: 'street-fighter', franchise: 'Street Fighter', game: 'Street Fighter II',
      title: 'Chun-Li\'s Theme', composer: 'Yoko Shimomura e Isao Abe', year: 1991, platform: 'Arcade / SNES',
      sources: [apple({ song: 1085989772, country: 'jp' }), yt('V2j1kFEBWyw')],
    },
    {
      id: 'saga-street-fighter-ii-blankas-theme', saga: 'street-fighter', franchise: 'Street Fighter', game: 'Street Fighter II',
      title: 'Blanka\'s Theme', composer: 'Yoko Shimomura e Isao Abe', year: 1991, platform: 'Arcade / SNES',
      sources: [apple({ song: 1085989775, country: 'jp' }), yt('BYaBY3DM3j0'), yt('OQn_021wQ_g')],
    },
    {
      id: 'saga-street-fighter-ii-zangiefs-theme', saga: 'street-fighter', franchise: 'Street Fighter', game: 'Street Fighter II',
      title: 'Zangief\'s Theme', composer: 'Yoko Shimomura e Isao Abe', year: 1991, platform: 'Arcade / SNES',
      sources: [apple({ song: 1085989774, country: 'jp' }), yt('LOtqHVjhKrE'), yt('fFVOf9CrElY')],
    },
    {
      id: 'saga-street-fighter-ii-dhalsims-theme', saga: 'street-fighter', franchise: 'Street Fighter', game: 'Street Fighter II',
      title: 'Dhalsim\'s Theme', composer: 'Yoko Shimomura e Isao Abe', year: 1991, platform: 'Arcade / SNES',
      sources: [apple({ song: 1085989776, country: 'jp' }), yt('161BSCTF5c4')],
    },
    {
      id: 'saga-street-fighter-ii-e-hondas-theme', saga: 'street-fighter', franchise: 'Street Fighter', game: 'Street Fighter II',
      title: 'E. Honda\'s Theme', composer: 'Yoko Shimomura e Isao Abe', year: 1991, platform: 'Arcade / SNES',
      sources: [apple({ song: 1085989777, country: 'jp' }), yt('hmn465eOqog'), yt('hirmbIKd2gk')],
    },
    {
      id: 'saga-street-fighter-ii-m-bisons-theme', saga: 'street-fighter', franchise: 'Street Fighter', game: 'Street Fighter II',
      title: 'M. Bison\'s Theme', composer: 'Yoko Shimomura e Isao Abe', year: 1991, platform: 'Arcade / SNES',
      sources: [apple({ song: 1085989782, country: 'jp' }), yt('72aSGvXeOTs'), yt('swMHVYQDbag')],
    },
    {
      id: 'saga-street-fighter-ii-sagats-theme', saga: 'street-fighter', franchise: 'Street Fighter', game: 'Street Fighter II',
      title: 'Sagat\'s Theme', composer: 'Yoko Shimomura e Isao Abe', year: 1991, platform: 'Arcade / SNES',
      sources: [apple({ song: 1085989784, country: 'jp' }), yt('76LfDeMWT6k'), yt('WUSVAVyx420')],
    },
    {
      id: 'saga-street-fighter-ii-vegas-theme', saga: 'street-fighter', franchise: 'Street Fighter', game: 'Street Fighter II',
      title: 'Vega\'s Theme', composer: 'Yoko Shimomura e Isao Abe', year: 1991, platform: 'Arcade / SNES',
      sources: [apple({ song: 1085989787, country: 'jp' }), yt('Ze0MgmwMgAU'), yt('8jCmFylp0Co')],
    },
    {
      id: 'saga-street-fighter-ii-player-select', saga: 'street-fighter', franchise: 'Street Fighter', game: 'Street Fighter II',
      title: 'Player Select', composer: 'Yoko Shimomura e Isao Abe', year: 1991, platform: 'Arcade / SNES',
      sources: [apple({ song: 1085989767, country: 'jp' }), yt('lXiFJaqCYHQ'), yt('41SjKq4096g')],
    },
  ];
})(window.AM = window.AM || {});
