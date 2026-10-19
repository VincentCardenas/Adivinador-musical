/*
 * Modo Sonidos (solo Videojuegos): efectos de sonido de videojuegos, "solo para conocedores".
 *
 *   AM.SOUND_TRACKS → cada efecto suena desde 1 segundo y el jugador escribe la saga (`franchise`,
 *                     el mismo nombre que en catalog.js). `game` es el juego que lo hizo famoso y
 *                     `title` el nombre del sonido en español; los dos se muestran al revelar.
 *                     `aka` son otros nombres de la SAGA para el buscador ("CS", "Mario Bros").
 *                     Las fuentes son videos de YouTube con solo ese efecto, encontrados y comprobados
 *                     con scripts/build-resto-v22.js (nunca IDs escritos a mano).
 *
 * El modo aparece cuando hay al menos AM.MIN_POOL sonidos.
 * Archivo generado (43 sonidos).
 */
(function (AM) {
  'use strict';

  const yt = (id, start) => ({ type: 'youtube', id: id, start: start || 0 });

  AM.SOUND_TRACKS = [
    {
      id: 'sfx-super-mario-bros-power-up-del-hongo', franchise: 'Super Mario', game: 'Super Mario Bros.',
      title: 'Power-up del hongo', year: 1985, platform: 'NES',
      aka: ['Mario', 'Mario Bros', 'Super Mario Bros'],
      sources: [yt('PeHYSWZeJrM')],
    },
    {
      id: 'sfx-metal-gear-solid-alerta-al-ser-detectado', franchise: 'Metal Gear', game: 'Metal Gear Solid',
      title: 'Alerta al ser detectado', year: 1998, platform: 'PlayStation',
      aka: ['MGS', 'Metal Gear Solid'],
      sources: [yt('An7ZD-s6aHY'), yt('29ayN0ExAFw')],
    },
    {
      id: 'sfx-super-mario-bros-moneda', franchise: 'Super Mario', game: 'Super Mario Bros.',
      title: 'Moneda', year: 1985, platform: 'NES',
      aka: ['Mario', 'Mario Bros', 'Super Mario Bros'],
      sources: [yt('mQSmVZU5EL4')],
    },
    {
      id: 'sfx-super-mario-bros-vida-extra-1-up', franchise: 'Super Mario', game: 'Super Mario Bros.',
      title: 'Vida extra (1-UP)', year: 1985, platform: 'NES',
      aka: ['Mario', 'Mario Bros', 'Super Mario Bros'],
      sources: [yt('o3Tlv7h9I3Y')],
    },
    {
      id: 'sfx-minecraft-siseo-del-creeper', franchise: 'Minecraft', game: 'Minecraft',
      title: 'Siseo del Creeper', year: 2011, platform: 'PC',
      aka: ['Mine craft'],
      sources: [yt('Yt_8QFteuPQ'), yt('jn4xFdPpMUg')],
    },
    {
      id: 'sfx-the-legend-of-zelda-ocarina-of-time-abrir-un-cofre', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Ocarina of Time',
      title: 'Abrir un cofre', year: 1998, platform: 'Nintendo 64',
      aka: ['Zelda', 'Legend of Zelda', 'La Leyenda de Zelda'],
      sources: [yt('NuMNVd7vxwI'), yt('69AyYUJUBTg')],
    },
    {
      id: 'sfx-the-legend-of-zelda-secreto-descubierto', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Ocarina of Time',
      title: 'Secreto descubierto', year: 1998, platform: 'Nintendo 64',
      aka: ['Zelda', 'Legend of Zelda', 'La Leyenda de Zelda'],
      sources: [yt('9d3qCPcMgH4'), yt('iUsliYXRMUc')],
    },
    {
      id: 'sfx-roblox-oof', franchise: 'Roblox', game: 'Roblox',
      title: 'Oof', year: 2006, platform: 'PC',
      sources: [yt('3w-2gUSus34')],
    },
    {
      id: 'sfx-sonic-the-hedgehog-recoger-un-anillo', franchise: 'Sonic the Hedgehog', game: 'Sonic the Hedgehog',
      title: 'Recoger un anillo', year: 1991, platform: 'Sega Genesis / Mega Drive',
      aka: ['Sonic', 'Sonic el erizo'],
      sources: [yt('n9GImjHkLmE'), yt('FRgfAPe5s3U')],
    },
    {
      id: 'sfx-grand-theft-auto-san-andreas-mision-cumplida', franchise: 'Grand Theft Auto', game: 'Grand Theft Auto: San Andreas',
      title: 'Misión cumplida', year: 2004, platform: 'PS2',
      aka: ['GTA', 'GTA SA'],
      sources: [yt('7lsdJDiJ0QE'), yt('sA3juLMhv3A')],
    },
    {
      id: 'sfx-street-fighter-ii-hadouken', franchise: 'Street Fighter', game: 'Street Fighter II',
      title: '¡Hadouken!', year: 1991, platform: 'Arcade',
      aka: ['SF', 'Street Fighter II', 'Street Fighter 2'],
      sources: [yt('gCDonNRpffM'), yt('RdoA_QeRqYk')],
    },
    {
      id: 'sfx-mortal-kombat-finish-him', franchise: 'Mortal Kombat', game: 'Mortal Kombat',
      title: '¡Finish Him!', year: 1992, platform: 'Arcade',
      aka: ['MK', 'Mortal Combat'],
      sources: [yt('ZrjoCWHWlPA'), yt('nc3pdrEM4I8')],
    },
    {
      id: 'sfx-mortal-kombat-get-over-here-scorpion', franchise: 'Mortal Kombat', game: 'Mortal Kombat',
      title: '¡Get over here! (Scorpion)', year: 1992, platform: 'Arcade',
      aka: ['MK'],
      sources: [yt('gEDamnAymjY'), yt('nJg8AXNEvxs')],
    },
    {
      id: 'sfx-street-fighter-ii-shoryuken', franchise: 'Street Fighter', game: 'Street Fighter II',
      title: '¡Shoryuken!', year: 1991, platform: 'Arcade',
      aka: ['SF', 'Street Fighter 2'],
      sources: [yt('zvEriuKrtlE'), yt('kY7a77aWvDw')],
    },
    {
      id: 'sfx-grand-theft-auto-san-andreas-ah-shit-here-we-go-again-cj', franchise: 'Grand Theft Auto', game: 'Grand Theft Auto: San Andreas',
      title: 'Ah shit, here we go again (CJ)', year: 2004, platform: 'PlayStation 2',
      aka: ['GTA', 'San Andreas'],
      sources: [yt('tnROqOCwVVY'), yt('QK_Ro6fHNwI')],
    },
    {
      id: 'sfx-among-us-reunion-de-emergencia', franchise: 'Among Us', game: 'Among Us',
      title: 'Reunión de emergencia', year: 2018, platform: 'PC',
      aka: ['Amongus', 'Among-Us'],
      sources: [yt('gVylTS6Y1Bs'), yt('FEYOC4AVVzc')],
    },
    {
      id: 'sfx-minecraft-aldeano-hmm', franchise: 'Minecraft', game: 'Minecraft',
      title: 'Aldeano (Hmm)', year: 2011, platform: 'PC',
      aka: ['Mine craft'],
      sources: [yt('8CUy3n0Yu1A'), yt('KzIw_9myY6k')],
    },
    {
      id: 'sfx-the-elder-scrolls-v-skyrim-grito-fus-ro-dah', franchise: 'The Elder Scrolls', game: 'The Elder Scrolls V: Skyrim',
      title: 'Grito Fus Ro Dah', year: 2011, platform: 'PC / PlayStation 3 / Xbox 360',
      aka: ['Skyrim', 'Elder Scrolls', 'TES'],
      sources: [yt('peP7yUOo3WM'), yt('zzH_Wn0R-yo')],
    },
    {
      id: 'sfx-pac-man-perder-una-vida', franchise: 'Pac-Man', game: 'Pac-Man',
      title: 'Perder una vida', year: 1980, platform: 'Arcade',
      aka: ['Pacman', 'Pac Man', 'Comecocos'],
      sources: [yt('CHPOTiYqX_Q'), yt('NxSj2T2vx7M')],
    },
    {
      id: 'sfx-counter-strike-1-6-granada-fire-in-the-hole', franchise: 'Counter-Strike', game: 'Counter-Strike 1.6',
      title: 'Granada: Fire in the hole', year: 2003, platform: 'PC',
      aka: ['Counter Strike', 'Counterstrike', 'CS', 'CSGO', 'CS:GO', 'CS 1.6', 'CS2'],
      sources: [yt('uJPu_GU7raE'), yt('NfMPQhNsNBY')],
    },
    {
      id: 'sfx-pac-man-musica-de-inicio', franchise: 'Pac-Man', game: 'Pac-Man',
      title: 'Música de inicio', year: 1980, platform: 'Arcade',
      aka: ['Pacman'],
      sources: [yt('lmoKw4eJzik'), yt('uTdQT1vMThc')],
    },
    {
      id: 'sfx-duck-hunt-risa-del-perro', franchise: 'Duck Hunt', game: 'Duck Hunt',
      title: 'Risa del perro', year: 1984, platform: 'NES',
      aka: ['Caceria de patos'],
      sources: [yt('7fkgjgBJKzk'), yt('yuZZx01wjn8')],
    },
    {
      id: 'sfx-among-us-revelacion-del-impostor-shhh', franchise: 'Among Us', game: 'Among Us',
      title: 'Revelación del impostor (Shhh)', year: 2018, platform: 'Móvil / PC',
      aka: ['Amongus'],
      sources: [yt('ekL881PJMjI'), yt('pzX-WNlzIC0')],
    },
    {
      id: 'sfx-metal-slug-heavy-machine-gun', franchise: 'Metal Slug', game: 'Metal Slug',
      title: '¡Heavy Machine Gun!', year: 1996, platform: 'Arcade (Neo Geo)',
      sources: [yt('lhXk_cPPm3o')],
    },
    {
      id: 'sfx-clash-royale-risa-del-emote-del-rey', franchise: 'Clash Royale', game: 'Clash Royale',
      title: 'Risa del emote del Rey', year: 2016, platform: 'iOS / Android',
      sources: [yt('-M-WB32zvR0'), yt('ECf9z2CKHhg')],
    },
    {
      id: 'sfx-the-legend-of-zelda-ocarina-of-time-hey-listen', franchise: 'The Legend of Zelda', game: 'The Legend of Zelda: Ocarina of Time',
      title: '¡Hey! ¡Listen!', year: 1998, platform: 'Nintendo 64',
      aka: ['Zelda', 'Legend of Zelda', 'La Leyenda de Zelda'],
      sources: [yt('P55sOvmHOvs'), yt('mwfx22pRo64')],
    },
    {
      id: 'sfx-pokemon-red-and-blue-curar-al-equipo', franchise: 'Pokémon', game: 'Pokémon Red & Blue',
      title: 'Curar al equipo', year: 1996, platform: 'Game Boy',
      aka: ['Pokemon', 'Pokémon Rojo', 'Pokemon Rojo y Azul'],
      sources: [yt('xcg6M2Xmtbk')],
    },
    {
      id: 'sfx-call-of-duty-modern-warfare-2-hitmarker', franchise: 'Call of Duty', game: 'Call of Duty: Modern Warfare 2',
      title: 'Hitmarker', year: 2009, platform: 'Xbox 360',
      aka: ['COD', 'CoD', 'Modern Warfare', 'Black Ops'],
      sources: [yt('HD9xkEv1sGM'), yt('6hHtlem47iE')],
    },
    {
      id: 'sfx-fortnite-abrir-un-cofre-dorado', franchise: 'Fortnite', game: 'Fortnite',
      title: 'Abrir un cofre dorado', year: 2017, platform: 'PC',
      sources: [yt('-whYIavLM1s'), yt('2b7fBOl1diI')],
    },
    {
      id: 'sfx-grand-theft-auto-v-wasted', franchise: 'Grand Theft Auto', game: 'Grand Theft Auto V',
      title: 'Wasted', year: 2013, platform: 'PS3',
      aka: ['GTA', 'GTA 5', 'GTA V'],
      sources: [yt('K3kFQHKE0LA')],
    },
    {
      id: 'sfx-mortal-kombat-ii-toasty', franchise: 'Mortal Kombat', game: 'Mortal Kombat II',
      title: '¡Toasty!', year: 1993, platform: 'Arcade',
      aka: ['MK', 'Mortal Combat'],
      sources: [yt('vb5Vlb9atEk'), yt('aLaERVA-P6o')],
    },
    {
      id: 'sfx-mario-kart-64-cuenta-regresiva-de-salida', franchise: 'Mario Kart', game: 'Mario Kart 64',
      title: 'Cuenta regresiva de salida', year: 1996, platform: 'Nintendo 64',
      aka: ['Mariokart', 'Mario Cart'],
      sources: [yt('KOoCEIwswYg'), yt('djRynyD2Fnw')],
    },
    {
      id: 'sfx-pokemon-red-and-blue-subir-de-nivel', franchise: 'Pokémon', game: 'Pokémon Red & Blue',
      title: 'Subir de nivel', year: 1996, platform: 'Game Boy',
      aka: ['Pokemon', 'Pokémon Rojo', 'Pokemon Rojo y Azul'],
      sources: [yt('3hHeGkCazTY'), yt('FMEeeM3Pegc')],
    },
    {
      id: 'sfx-resident-evil-4-voz-del-mercader', franchise: 'Resident Evil', game: 'Resident Evil 4',
      title: 'Voz del Mercader', year: 2005, platform: 'GameCube',
      aka: ['RE', 'Biohazard', 'Buhonero'],
      sources: [yt('HL-waqkb0OE')],
    },
    {
      id: 'sfx-among-us-asesinato-del-impostor', franchise: 'Among Us', game: 'Among Us',
      title: 'Asesinato del impostor', year: 2018, platform: 'PC',
      aka: ['Amongus', 'Among-Us'],
      sources: [yt('34ewE9biJRE'), yt('hsnvGSrDf6c')],
    },
    {
      id: 'sfx-crash-bandicoot-2-cortex-strikes-back-el-whoa-al-caer', franchise: 'Crash Bandicoot', game: 'Crash Bandicoot 2: Cortex Strikes Back',
      title: 'El \'¡Whoa!\' al caer', year: 1997, platform: 'PlayStation',
      aka: ['Crash'],
      sources: [yt('syp5JiNt14o'), yt('5M-9wAmdMWI')],
    },
    {
      id: 'sfx-minecraft-dano-del-jugador', franchise: 'Minecraft', game: 'Minecraft',
      title: 'Daño del jugador', year: 2011, platform: 'PC',
      aka: ['Maicra'],
      sources: [yt('PTFHWfh2Yf4'), yt('RMkKsZL3_uc')],
    },
    {
      id: 'sfx-metal-gear-solid-llamada-del-codec', franchise: 'Metal Gear', game: 'Metal Gear Solid',
      title: 'Llamada del códec', year: 1998, platform: 'PlayStation',
      aka: ['Metal Gear Solid', 'MGS'],
      sources: [yt('pEarkcns2rk'), yt('e5kZZHxYeZE')],
    },
    {
      id: 'sfx-metal-gear-solid-game-over-snake', franchise: 'Metal Gear', game: 'Metal Gear Solid',
      title: 'Game Over: ¡Snake!', year: 1998, platform: 'PlayStation',
      aka: ['Metal Gear Solid', 'MGS'],
      sources: [yt('syYug2rV1qQ'), yt('MS8OawQegYE')],
    },
    {
      id: 'sfx-clash-royale-grito-del-montapuercos-hog-rider', franchise: 'Clash Royale', game: 'Clash Royale',
      title: 'Grito del Montapuercos (Hog Rider)', year: 2016, platform: 'Móvil',
      aka: ['Clash of Clans', 'Clash'],
      sources: [yt('XzM6PPwkm34'), yt('6Ow8cgyh7lM')],
    },
    {
      id: 'sfx-resident-evil-4-detras-de-ti-imbecil', franchise: 'Resident Evil', game: 'Resident Evil 4',
      title: '¡Detrás de ti, imbécil!', year: 2005, platform: 'GameCube / PS2',
      aka: ['Biohazard', 'RE'],
      sources: [yt('QMpWfziKo6k')],
    },
    {
      id: 'sfx-metal-slug-mission-complete', franchise: 'Metal Slug', game: 'Metal Slug',
      title: '¡Mission Complete!', year: 1996, platform: 'Arcade (Neo Geo)',
      sources: [yt('iSBBsUld8zM'), yt('rJvtzBA1uFY')],
    },
    {
      id: 'sfx-minecraft-orbe-de-experiencia', franchise: 'Minecraft', game: 'Minecraft',
      title: 'Orbe de experiencia (XP)', year: 2011, platform: 'PC',
      aka: ['Mine craft'],
      sources: [yt('Ehj0sY9Gc94')],
    },
  ];

  AM.SOUND_TRACKS.forEach((t) => { t.theme = 'juegos'; t.sound = true; });
})(window.AM = window.AM || {});
