/*
 * Catálogo: Anime (56 pistas).
 * Openings de anime por época (año del opening). Los clásicos suenan primero en español latino (YouTube) y el preview oficial de Apple queda de respaldo.
 * Mismo formato que catalog.js; las fuentes se prueban en el orden en que aparecen.
 */
(function (AM) {
  'use strict';

  const apple = (o) => Object.assign({ type: 'itunes' }, o);
  const yt = (id, start) => ({ type: 'youtube', id: id, start: start || 0 });

  AM.CATEGORIES.push(
    { id: 'anime-clasicos', theme: 'anime', label: 'Clásicos (antes de 1990)', icon: '📼' },
    { id: 'anime-90s', theme: 'anime', label: 'Años 90', icon: '🐉' },
    { id: 'anime-00s', theme: 'anime', label: '2000s', icon: '🍥' },
    { id: 'anime-10s', theme: 'anime', label: '2010s', icon: '⚔️' },
    { id: 'anime-20s', theme: 'anime', label: '2020 en adelante', icon: '🔥' },
  );

  AM.CATALOG.push(
    /* ───────────── Clásicos (antes de 1990) (8) ───────────── */
    {
      id: 'toon-meteoro-meteoro-tema', cat: 'anime-clasicos', franchise: 'Meteoro', game: 'Meteoro',
      title: 'Meteoro (tema)', composer: 'Nobuyoshi Koshibe', year: 1967, platform: 'Tatsunoko',
      aka: ['Speed Racer'],
      sources: [yt('_lser7H47Rs'), yt('Zrl9zvgDGa8')],
    },
    {
      id: 'toon-heidi-abuelito-dime-tu', cat: 'anime-clasicos', franchise: 'Heidi', game: 'Heidi',
      title: 'Abuelito, dime tú', composer: 'Takeo Watanabe', year: 1974, platform: 'Zuiyo Eizo',
      sources: [yt('GHUx-vKr7Xc'), yt('l77rAJPtNKI')],
    },
    {
      id: 'toon-candy-candy', cat: 'anime-clasicos', franchise: 'Candy Candy', game: 'Candy Candy',
      title: 'Candy Candy', composer: 'Takeo Watanabe', year: 1976, platform: 'Toei Animation',
      sources: [yt('39mbBe7Nv7I'), yt('5J8vNIh6Puc')],
    },
    {
      id: 'toon-mazinger-z', cat: 'anime-clasicos', franchise: 'Mazinger Z', game: 'Mazinger Z',
      title: 'Mazinger Z', composer: 'Michiaki Watanabe', year: 1972, platform: 'Toei Animation',
      sources: [yt('J9n4-4AEu3U'), yt('NCYznN1dhzA'), apple({ song: 458237797, country: 'mx' })],
    },
    {
      id: 'toon-los-caballeros-del-zodiaco-pegasus-fantasy', cat: 'anime-clasicos', franchise: 'Los Caballeros del Zodiaco', game: 'Los Caballeros del Zodiaco',
      title: 'Pegasus Fantasy', composer: 'Make-Up (versión latina)', year: 1986, platform: 'Toei Animation',
      aka: ['Saint Seiya'],
      sources: [yt('JU90SmiYeuw'), yt('BLXHuZ-1C_4')],
    },
    {
      id: 'toon-dragon-ball-la-fantastica-aventura-makafushigi-adventur', cat: 'anime-clasicos', franchise: 'Dragon Ball', game: 'Dragon Ball',
      title: 'La fantástica aventura (Makafushigi Adventure!)', composer: 'Hiroki Takahashi (versión latina)', year: 1986, platform: 'Toei Animation',
      sources: [yt('9Hbd1QeI1Og'), yt('H10GLcS5FH0')],
    },
    {
      id: 'toon-dragon-ball-z-cha-la-head-cha-la', cat: 'anime-clasicos', franchise: 'Dragon Ball', game: 'Dragon Ball Z',
      title: 'Cha-La Head-Cha-La', composer: 'Ricardo Silva', year: 1989, platform: 'Toei Animation',
      sources: [apple({ song: 718918336, country: 'mx' }), yt('cie7scVUdQE')],
    },
    {
      id: 'toon-super-campeones', cat: 'anime-clasicos', franchise: 'Super Campeones', game: 'Super Campeones',
      title: 'Super Campeones', composer: 'Versión latina', year: 1983, platform: 'Tsuchida Production',
      aka: ['Captain Tsubasa', 'Supercampeones'],
      sources: [yt('RlQKghs-W4s'), yt('rJzNgkjQY78')],
    },
    /* ───────────── Años 90 (10) ───────────── */
    {
      id: 'toon-pokemon-atrapalos-ya', cat: 'anime-90s', franchise: 'Pokémon', game: 'Pokémon',
      title: '¡Atrápalos ya!', composer: 'Versión latina', year: 1997, platform: 'OLM',
      sources: [yt('ZYMkmW0TTSg'), yt('vvnorKroNMs')],
    },
    {
      id: 'toon-digimon-si-tu-lo-deseas-puedes-volar', cat: 'anime-90s', franchise: 'Digimon', game: 'Digimon',
      title: 'Si tú lo deseas puedes volar', composer: 'Ricardo Silva', year: 1999, platform: 'Toei Animation',
      aka: ['Digimon Adventure'],
      sources: [yt('WmGy9CAap0w'), yt('7HVv9_Q3HfI')],
    },
    {
      id: 'toon-sailor-moon-moonlight-densetsu', cat: 'anime-90s', franchise: 'Sailor Moon', game: 'Sailor Moon',
      title: 'Moonlight Densetsu', composer: 'Versión latina', year: 1992, platform: 'Toei Animation',
      sources: [yt('9NanowbK60Y'), yt('8MD9HYC2d_I')],
    },
    {
      id: 'toon-dragon-ball-gt-mi-corazon-encantado', cat: 'anime-90s', franchise: 'Dragon Ball', game: 'Dragon Ball GT',
      title: 'Mi corazón encantado', composer: 'Aaron Montalvo', year: 1996, platform: 'Toei Animation',
      sources: [apple({ song: 1403477085, country: 'mx' }), yt('wgZ-ATUGXDw')],
    },
    {
      id: 'toon-neon-genesis-evangelion-a-cruel-angel-s-thesis', cat: 'anime-90s', franchise: 'Neon Genesis Evangelion', game: 'Neon Genesis Evangelion',
      title: 'A Cruel Angel\'s Thesis', composer: 'Yoko Takahashi', year: 1995, platform: 'Gainax',
      aka: ['Evangelion'],
      sources: [apple({ song: 1656737698, country: 'mx' })],
    },
    {
      id: 'toon-cowboy-bebop-tank', cat: 'anime-90s', franchise: 'Cowboy Bebop', game: 'Cowboy Bebop',
      title: 'Tank!', composer: 'Yoko Kanno y The Seatbelts', year: 1998, platform: 'Sunrise',
      sources: [yt('EL-D9LrFJd4'), yt('UFFa0QoHWvE')],
    },
    {
      id: 'toon-one-piece-we-are', cat: 'anime-90s', franchise: 'One Piece', game: 'One Piece',
      title: 'We Are!', composer: 'Kitadani Hiroshi', year: 1999, platform: 'Toei Animation',
      sources: [apple({ song: 1770907052, country: 'mx' })],
    },
    {
      id: 'toon-sakura-card-captor-catch-you-catch-me', cat: 'anime-90s', franchise: 'Sakura Card Captor', game: 'Sakura Card Captor',
      title: 'Catch You Catch Me', composer: 'GUMI', year: 1998, platform: 'Madhouse',
      aka: ['Sakura Cazadora de Cartas', 'Cardcaptor Sakura'],
      sources: [apple({ song: 1318186200, country: 'mx' })],
    },
    {
      id: 'toon-slam-dunk-kimi-ga-suki-da-to-sakebitai', cat: 'anime-90s', franchise: 'Slam Dunk', game: 'Slam Dunk',
      title: 'Kimi ga Suki da to Sakebitai', composer: 'BAAD', year: 1993, platform: 'Toei Animation',
      sources: [apple({ song: 1693743422, country: 'jp' })],
    },
    {
      id: 'toon-yu-yu-hakusho-sonrisa-explosiva', cat: 'anime-90s', franchise: 'Yu Yu Hakusho', game: 'Yu Yu Hakusho',
      title: 'Sonrisa explosiva', composer: 'Versión latina (original: Matsuko Mawatari)', year: 1992, platform: 'Pierrot',
      sources: [yt('RncCJNOZLb0'), apple({ song: 433591403, country: 'mx' })],
    },
    /* ───────────── 2000s (11) ───────────── */
    {
      id: 'toon-naruto-shippuden-blue-bird', cat: 'anime-00s', franchise: 'Naruto', game: 'Naruto Shippuden',
      title: 'Blue Bird', composer: 'Ikimonogakari', year: 2007, platform: 'Pierrot',
      sources: [apple({ song: 1089186523, country: 'mx' }), yt('2upuBiEiXDk')],
    },
    {
      id: 'toon-death-note-the-world', cat: 'anime-00s', franchise: 'Death Note', game: 'Death Note',
      title: 'the WORLD', composer: 'NIGHTMARE', year: 2006, platform: 'Madhouse',
      sources: [apple({ song: 385239211, country: 'mx' })],
    },
    {
      id: 'toon-fullmetal-alchemist-brotherhood-again', cat: 'anime-00s', franchise: 'Fullmetal Alchemist', game: 'Fullmetal Alchemist: Brotherhood',
      title: 'Again', composer: 'YUI', year: 2009, platform: 'Bones',
      aka: ['Fullmetal Alchemist', 'FMA'],
      sources: [apple({ song: 1537418083, country: 'mx' })],
    },
    {
      id: 'toon-naruto-go', cat: 'anime-00s', franchise: 'Naruto', game: 'Naruto',
      title: 'GO!!!', composer: 'FLOW', year: 2004, platform: 'Pierrot',
      sources: [apple({ song: 1536366366, country: 'mx' })],
    },
    {
      id: 'toon-bleach-asterisk', cat: 'anime-00s', franchise: 'Bleach', game: 'Bleach',
      title: 'Asterisk', composer: 'ORANGE RANGE', year: 2004, platform: 'Pierrot',
      sources: [apple({ song: 1537381402, country: 'mx' })],
    },
    {
      id: 'toon-inuyasha-change-the-world', cat: 'anime-00s', franchise: 'Inuyasha', game: 'Inuyasha',
      title: 'Change the World', composer: 'V6', year: 2000, platform: 'Sunrise',
      sources: [apple({ song: 1848248144, country: 'mx' })],
    },
    {
      id: 'toon-code-geass-colors', cat: 'anime-00s', franchise: 'Code Geass', game: 'Code Geass',
      title: 'COLORS', composer: 'FLOW', year: 2006, platform: 'Sunrise',
      sources: [apple({ song: 1536482652, country: 'mx' })],
    },
    {
      id: 'toon-fairy-tail-snow-fairy', cat: 'anime-00s', franchise: 'Fairy Tail', game: 'Fairy Tail',
      title: 'Snow fairy', composer: 'FUNKIST', year: 2009, platform: 'A-1 Pictures',
      sources: [apple({ song: 997647863, country: 'mx' })],
    },
    {
      id: 'toon-naruto-rocks', cat: 'anime-00s', franchise: 'Naruto', game: 'Naruto',
      title: 'Rocks', composer: 'Hound Dog (versión latina)', year: 2002, platform: 'Pierrot',
      sources: [yt('PWO4hc-L_i4'), yt('PzbYmqLed1Q')],
    },
    {
      id: 'toon-yu-gi-oh-yu-gi-oh-opening', cat: 'anime-00s', franchise: 'Yu-Gi-Oh!', game: 'Yu-Gi-Oh!',
      title: 'Yu-Gi-Oh! (opening)', year: 2000, platform: 'Studio Gallop',
      sources: [yt('timXx6CBjoA'), yt('IJh5yp8yfx0')],
    },
    {
      id: 'toon-hamtaro-hamtaro-opening', cat: 'anime-00s', franchise: 'Hamtaro', game: 'Hamtaro',
      title: 'Hamtaro (opening)', year: 2000, platform: 'TMS Entertainment',
      sources: [yt('qz9RTb9w3mk'), yt('QrAmgCo_kps')],
    },
    /* ───────────── 2010s (14) ───────────── */
    {
      id: 'toon-ataque-a-los-titanes-guren-no-yumiya', cat: 'anime-10s', franchise: 'Ataque a los titanes', game: 'Ataque a los titanes',
      title: 'Guren no Yumiya', composer: 'Linked Horizon', year: 2013, platform: 'Wit Studio',
      aka: ['Attack on Titan', 'Shingeki no Kyojin'],
      sources: [yt('8OkpRK2_gVs'), yt('StLX4kITjWU')],
    },
    {
      id: 'toon-demon-slayer-gurenge', cat: 'anime-10s', franchise: 'Demon Slayer', game: 'Demon Slayer',
      title: 'Gurenge', composer: 'LiSA', year: 2019, platform: 'Ufotable',
      aka: ['Kimetsu no Yaiba', 'Guardianes de la noche'],
      sources: [apple({ song: 1529543135, country: 'mx' }), yt('JHw8gwQXpWI')],
    },
    {
      id: 'toon-my-hero-academia-the-day', cat: 'anime-10s', franchise: 'My Hero Academia', game: 'My Hero Academia',
      title: 'The Day', composer: 'Porno Graffitti', year: 2016, platform: 'Bones',
      aka: ['Boku no Hero Academia'],
      sources: [apple({ song: 1119496702, country: 'mx' }), yt('yu0HjPzFYnY')],
    },
    {
      id: 'toon-tokyo-ghoul-unravel', cat: 'anime-10s', franchise: 'Tokyo Ghoul', game: 'Tokyo Ghoul',
      title: 'unravel', composer: 'TK from Ling tosite sigure', year: 2014, platform: 'Pierrot',
      sources: [apple({ song: 1588285604, country: 'mx' })],
    },
    {
      id: 'toon-naruto-shippuden-silhouette', cat: 'anime-10s', franchise: 'Naruto', game: 'Naruto Shippuden',
      title: 'Silhouette', composer: 'KANA-BOON', year: 2014, platform: 'Pierrot',
      sources: [apple({ song: 1536490000, country: 'mx' })],
    },
    {
      id: 'toon-jojo-s-bizarre-adventure-bloody-stream', cat: 'anime-10s', franchise: 'JoJo\'s Bizarre Adventure', game: 'JoJo\'s Bizarre Adventure',
      title: 'Bloody Stream', composer: 'Coda', year: 2012, platform: 'David Production',
      aka: ['JoJo', 'JoJo no Kimyou na Bouken'],
      sources: [apple({ song: 595259109, country: 'jp' })],
    },
    {
      id: 'toon-hunter-x-hunter-departure', cat: 'anime-10s', franchise: 'Hunter x Hunter', game: 'Hunter x Hunter',
      title: 'departure!', composer: 'Masatoshi Ono', year: 2011, platform: 'Madhouse',
      sources: [apple({ song: 551273032, country: 'mx' })],
    },
    {
      id: 'toon-one-punch-man-the-hero', cat: 'anime-10s', franchise: 'One Punch Man', game: 'One Punch Man',
      title: 'THE HERO!!', composer: 'JAM Project', year: 2015, platform: 'Madhouse',
      sources: [apple({ song: 1815780792, country: 'mx' })],
    },
    {
      id: 'toon-shigatsu-wa-kimi-no-uso-hikaru-nara', cat: 'anime-10s', franchise: 'Shigatsu wa Kimi no Uso', game: 'Shigatsu wa Kimi no Uso',
      title: 'Hikaru Nara', composer: 'Goose house', year: 2014, platform: 'A-1 Pictures',
      aka: ['Your Lie in April', 'Tu mentira en abril'],
      sources: [apple({ song: 1537529533, country: 'mx' })],
    },
    {
      id: 'toon-sword-art-online-crossing-field', cat: 'anime-10s', franchise: 'Sword Art Online', game: 'Sword Art Online',
      title: 'crossing field', composer: 'LiSA', year: 2012, platform: 'A-1 Pictures',
      aka: ['SAO'],
      sources: [apple({ song: 1537785962, country: 'mx' })],
    },
    {
      id: 'toon-haikyuu-imagination', cat: 'anime-10s', franchise: 'Haikyuu!!', game: 'Haikyuu!!',
      title: 'Imagination', composer: 'SPYAIR', year: 2014, platform: 'Production I.G',
      aka: ['Haikyu!!'],
      sources: [apple({ song: 859822147, country: 'mx' })],
    },
    {
      id: 'toon-black-clover-black-rover', cat: 'anime-10s', franchise: 'Black Clover', game: 'Black Clover',
      title: 'Black Rover', composer: 'Vickeblanka', year: 2017, platform: 'Pierrot',
      sources: [apple({ song: 1439297637, country: 'mx' })],
    },
    {
      id: 'toon-mob-psycho-100-99', cat: 'anime-10s', franchise: 'Mob Psycho 100', game: 'Mob Psycho 100',
      title: '99', composer: 'MOB CHOIR', year: 2016, platform: 'Bones',
      sources: [apple({ song: 1144397128, country: 'jp' })],
    },
    {
      id: 'toon-dragon-ball-super-vuela-pega-y-esquiva', cat: 'anime-10s', franchise: 'Dragon Ball', game: 'Dragon Ball Super',
      title: 'Vuela, pega y esquiva', composer: 'Adrián Barba', year: 2015, platform: 'Toei Animation',
      sources: [yt('_37jJAl1c0g'), yt('xeRZEWA_-nQ')],
    },
    /* ───────────── 2020 en adelante (13) ───────────── */
    {
      id: 'toon-jujutsu-kaisen-kaikai-kitan', cat: 'anime-20s', franchise: 'Jujutsu Kaisen', game: 'Jujutsu Kaisen',
      title: 'Kaikai Kitan', composer: 'Eve', year: 2020, platform: 'MAPPA',
      sources: [apple({ song: 1543126646, country: 'mx' }), yt('GwaRztMaoY0')],
    },
    {
      id: 'toon-chainsaw-man-kick-back', cat: 'anime-20s', franchise: 'Chainsaw Man', game: 'Chainsaw Man',
      title: 'KICK BACK', composer: 'Kenshi Yonezu', year: 2022, platform: 'MAPPA',
      sources: [apple({ song: 1653922188, country: 'mx' })],
    },
    {
      id: 'toon-oshi-no-ko-idol', cat: 'anime-20s', franchise: 'Oshi no Ko', game: 'Oshi no Ko',
      title: 'Idol', composer: 'YOASOBI', year: 2023, platform: 'Doga Kobo',
      aka: ['【推しの子】'],
      sources: [apple({ song: 1688334537, country: 'mx' })],
    },
    {
      id: 'toon-spy-x-family-mixed-nuts', cat: 'anime-20s', franchise: 'Spy x Family', game: 'Spy x Family',
      title: 'Mixed Nuts', composer: 'Official HIGE DANDism', year: 2022, platform: 'Wit Studio / CloverWorks',
      sources: [apple({ song: 1616586639, country: 'mx' })],
    },
    {
      id: 'toon-mashle-bling-bang-bang-born', cat: 'anime-20s', franchise: 'Mashle', game: 'Mashle',
      title: 'Bling-Bang-Bang-Born', composer: 'Creepy Nuts', year: 2024, platform: 'A-1 Pictures',
      aka: ['Mashle: Magic and Muscles'],
      sources: [apple({ song: 1720332181, country: 'mx' })],
    },
    {
      id: 'toon-dandadan-otonoke', cat: 'anime-20s', franchise: 'Dandadan', game: 'Dandadan',
      title: 'Otonoke', composer: 'Creepy Nuts', year: 2024, platform: 'Science SARU',
      sources: [apple({ song: 1771603031, country: 'mx' })],
    },
    {
      id: 'toon-frieren-yuusha', cat: 'anime-20s', franchise: 'Frieren', game: 'Frieren',
      title: 'Yuusha', composer: 'YOASOBI', year: 2023, platform: 'Madhouse',
      aka: ['Sousou no Frieren', 'Frieren: Más allá del final del viaje'],
      sources: [apple({ song: 1707001466, country: 'mx' })],
    },
    {
      id: 'toon-solo-leveling-level', cat: 'anime-20s', franchise: 'Solo Leveling', game: 'Solo Leveling',
      title: 'LEveL', composer: 'SawanoHiroyuki[nZk]', year: 2024, platform: 'A-1 Pictures',
      sources: [apple({ song: 1718526128, country: 'mx' })],
    },
    {
      id: 'toon-tokyo-revengers-cry-baby', cat: 'anime-20s', franchise: 'Tokyo Revengers', game: 'Tokyo Revengers',
      title: 'Cry Baby', composer: 'OFFICIAL HIGE DANDISM', year: 2021, platform: 'LIDENFILMS',
      sources: [apple({ song: 1563683060, country: 'mx' })],
    },
    {
      id: 'toon-blue-lock-chaos-ga-kiwamaru', cat: 'anime-20s', franchise: 'Blue Lock', game: 'Blue Lock',
      title: 'Chaos ga Kiwamaru', composer: 'UNISON SQUARE GARDEN', year: 2022, platform: '8bit',
      sources: [apple({ song: 1648654054, country: 'mx' })],
    },
    {
      id: 'toon-ataque-a-los-titanes-the-rumbling', cat: 'anime-20s', franchise: 'Ataque a los titanes', game: 'Ataque a los titanes',
      title: 'The Rumbling', composer: 'SiM', year: 2022, platform: 'MAPPA',
      aka: ['Attack on Titan', 'Shingeki no Kyojin'],
      sources: [apple({ song: 1606345338, country: 'mx' })],
    },
    {
      id: 'toon-jujutsu-kaisen-specialz', cat: 'anime-20s', franchise: 'Jujutsu Kaisen', game: 'Jujutsu Kaisen',
      title: 'SPECIALZ', composer: 'King Gnu', year: 2023, platform: 'MAPPA',
      sources: [apple({ song: 1702823583, country: 'mx' })],
    },
    {
      id: 'toon-demon-slayer-zankyou-sanka', cat: 'anime-20s', franchise: 'Demon Slayer', game: 'Demon Slayer',
      title: 'Zankyou Sanka', composer: 'Aimer', year: 2022, platform: 'Ufotable',
      aka: ['Kimetsu no Yaiba', 'Guardianes de la noche'],
      sources: [apple({ song: 1594814735, country: 'jp' })],
    },
  );

  // Señuelos: aparecen como opciones incorrectas y en el buscador de Experto.
  AM.EXTRA_GAMES.push(
    { theme: 'anime', franchise: 'Dragon Ball', game: 'Dragon Ball Kai' },
    { theme: 'anime', franchise: 'Naruto', game: 'Boruto' },
    { theme: 'anime', franchise: 'Shin-chan', game: 'Shin-chan' },
    { theme: 'anime', franchise: 'Doraemon', game: 'Doraemon' },
    { theme: 'anime', franchise: 'Kimi ni Todoke', game: 'Kimi ni Todoke' },
    { theme: 'anime', franchise: 'Dr. Stone', game: 'Dr. Stone' },
    { theme: 'anime', franchise: 'Vinland Saga', game: 'Vinland Saga' },
    { theme: 'anime', franchise: 'Fire Force', game: 'Fire Force' },
    { theme: 'anime', franchise: 'Steins;Gate', game: 'Steins;Gate' },
    { theme: 'anime', franchise: 'Kaguya-sama: Love Is War', game: 'Kaguya-sama: Love Is War' },
    { theme: 'anime', franchise: 'Ranma ½', game: 'Ranma ½' },
    { theme: 'anime', franchise: 'Rurouni Kenshin', game: 'Rurouni Kenshin' },
    { theme: 'anime', franchise: 'Dr. Slump', game: 'Dr. Slump' },
    { theme: 'anime', franchise: 'Kaiju No. 8', game: 'Kaiju No. 8' },
  );

  // Versiones de lo mismo: nunca salen juntas como opciones.
  AM.VERSIONS.push(
    ['Dragon Ball Z', 'Dragon Ball Kai'],
  );
})(window.AM = window.AM || {});
