/*
 * Catálogo: Películas de Disney y Pixar (71 pistas).
 * Canciones de películas de Disney en español latino, por época. `pixar: true` marca las de Pixar (se pueden quitar desde el inicio).
 * Mismo formato que catalog.js; las fuentes se prueban en el orden en que aparecen.
 */
(function (AM) {
  'use strict';

  const apple = (o) => Object.assign({ type: 'itunes' }, o);
  const yt = (id, start) => ({ type: 'youtube', id: id, start: start || 0 });

  AM.CATEGORIES.push(
    { id: 'dis-clasica', theme: 'disney', label: 'Clásicos (1937–1988)', icon: '🏰' },
    { id: 'dis-renacimiento', theme: 'disney', label: 'Renacimiento (1989–1999)', icon: '🌹' },
    { id: 'dis-2000s', theme: 'disney', label: '2000–2009', icon: '🐠' },
    { id: 'dis-2010s', theme: 'disney', label: '2010–2019', icon: '❄️' },
    { id: 'dis-2020s', theme: 'disney', label: '2020 en adelante', icon: '🦋' },
  );

  AM.CATALOG.push(
    /* ───────────── Clásicos (1937–1988) (13) ───────────── */
    {
      id: 'dis-blanca-nieves-y-los-siete-enanos-hei-ho', cat: 'dis-clasica', franchise: 'Blanca Nieves y los siete enanos', game: 'Blanca Nieves y los siete enanos',
      title: 'Hei-Ho', composer: 'Doblaje latino', year: 1937,
      aka: ['Blancanieves'],
      sources: [yt('Wgc0UbpfWtE'), yt('mR6FcHHPXkU')],
    },
    {
      id: 'dis-pinocho-la-estrella-azul', cat: 'dis-clasica', franchise: 'Pinocho', game: 'Pinocho',
      title: 'La estrella azul', composer: 'Pablo Palos', year: 1940,
      sources: [apple({ song: 1561432494, country: 'mx' }), yt('t5pCdgdctt0'), yt('sO44XLwNTJs')],
    },
    {
      id: 'dis-cenicienta-bibidi-babidi-bu', cat: 'dis-clasica', franchise: 'Cenicienta', game: 'Cenicienta',
      title: 'Bibidi-Babidi-Bu', composer: 'Norma Herrera', year: 1950,
      aka: ['La Cenicienta'],
      sources: [apple({ song: 1624896789, country: 'mx' }), yt('n0VGH1FYDVE')],
    },
    {
      id: 'dis-alicia-en-el-pais-de-las-maravillas-feliz-no-cumpleanos', cat: 'dis-clasica', franchise: 'Alicia en el país de las maravillas', game: 'Alicia en el país de las maravillas',
      title: 'Feliz no cumpleaños', composer: 'Doblaje latino', year: 1951,
      sources: [yt('9v_yH08tDw4'), yt('vREirMXu41Y')],
    },
    {
      id: 'dis-peter-pan-tu-puedes-volar', cat: 'dis-clasica', franchise: 'Peter Pan', game: 'Peter Pan',
      title: 'Tú puedes volar', composer: 'Doblaje latino', year: 1953,
      sources: [yt('vRfBmzv8vkQ'), yt('tS6N3EfdgOg')],
    },
    {
      id: 'dis-la-dama-y-el-vagabundo-bella-notte', cat: 'dis-clasica', franchise: 'La dama y el vagabundo', game: 'La dama y el vagabundo',
      title: 'Bella Notte', composer: 'Doblaje latino', year: 1955,
      sources: [yt('Ya3QSsI6RSo'), yt('YPQllZbI_S8')],
    },
    {
      id: 'dis-la-bella-durmiente-eres-tu-el-principe-azul', cat: 'dis-clasica', franchise: 'La bella durmiente', game: 'La bella durmiente',
      title: 'Eres tú el príncipe azul', composer: 'Doblaje latino', year: 1959,
      sources: [apple({ song: 1561428707, country: 'mx' }), yt('JeasDmHl3m8')],
    },
    {
      id: 'dis-101-dalmatas-cruela-de-vil', cat: 'dis-clasica', franchise: '101 dálmatas', game: '101 dálmatas',
      title: 'Cruela de Vil', composer: 'Doblaje latino', year: 1961,
      sources: [yt('65StEcLVIgY'), yt('96OURnMM1U8')],
    },
    {
      id: 'dis-mary-poppins-supercalifragilisticoespialidoso', cat: 'dis-clasica', franchise: 'Mary Poppins', game: 'Mary Poppins',
      title: 'Supercalifragilisticoespialidoso', composer: 'Doblaje latino', year: 1964,
      sources: [yt('LTo4hMKFoMU'), yt('dcRQF7ofuFo')],
    },
    {
      id: 'dis-el-libro-de-la-selva-busca-lo-mas-vital', cat: 'dis-clasica', franchise: 'El libro de la selva', game: 'El libro de la selva',
      title: 'Busca lo más vital', composer: 'Germán Valdés "Tin Tan"', year: 1967,
      sources: [yt('QLjmuvfHcfc'), yt('Tnh_kPHp9LM')],
    },
    {
      id: 'dis-los-aristogatos-todos-quieren-ser-ya-gatos-jazz', cat: 'dis-clasica', franchise: 'Los aristogatos', game: 'Los aristogatos',
      title: 'Todos quieren ser ya gatos jazz', composer: 'Doblaje latino', year: 1970,
      sources: [yt('wvLSywV8NUM'), yt('gDknOcAYOEs')],
    },
    {
      id: 'dis-winnie-pooh-es-winnie-pooh', cat: 'dis-clasica', franchise: 'Winnie Pooh', game: 'Winnie Pooh',
      title: 'Es Winnie Pooh', composer: 'Disney Studio Chorus', year: 1977,
      aka: ['Winnie the Pooh'],
      sources: [yt('Cd8ccq4iTUU'), apple({ song: 741203383, country: 'mx' })],
    },
    {
      id: 'dis-oliver-y-su-pandilla-no-me-preocupo', cat: 'dis-clasica', franchise: 'Oliver y su pandilla', game: 'Oliver y su pandilla',
      title: 'No me preocupo', composer: 'Michael Cruz', year: 1988,
      sources: [yt('0u4BAQ0B0s4')],
    },
    /* ───────────── Renacimiento (1989–1999) (19) ───────────── */
    {
      id: 'dis-la-sirenita-bajo-el-mar', cat: 'dis-renacimiento', franchise: 'La sirenita', game: 'La sirenita',
      title: 'Bajo el mar', composer: 'Michael Cruz', year: 1989,
      sources: [apple({ song: 1624897878, country: 'mx' }), yt('DDSerADikPg')],
    },
    {
      id: 'dis-la-sirenita-parte-de-el', cat: 'dis-renacimiento', franchise: 'La sirenita', game: 'La sirenita',
      title: 'Parte de él', composer: 'Isela Sotelo', year: 1989,
      sources: [apple({ song: 1624897869, country: 'mx' })],
    },
    {
      id: 'dis-la-bella-y-la-bestia', cat: 'dis-renacimiento', franchise: 'La bella y la bestia', game: 'La bella y la bestia',
      title: 'La bella y la bestia', composer: 'Norma Herrera', year: 1991,
      sources: [apple({ song: 1444046541, country: 'mx' })],
    },
    {
      id: 'dis-la-bella-y-la-bestia-nuestro-huesped', cat: 'dis-renacimiento', franchise: 'La bella y la bestia', game: 'La bella y la bestia',
      title: 'Nuestro huésped', composer: 'Norma Herrera y Moisés Palacios', year: 1991,
      sources: [apple({ song: 1444046534, country: 'mx' })],
    },
    {
      id: 'dis-aladdin-un-mundo-ideal', cat: 'dis-renacimiento', franchise: 'Aladdín', game: 'Aladdín',
      title: 'Un mundo ideal', composer: 'ANALY y Demián Bichir', year: 1992,
      sources: [apple({ song: 1618857323, country: 'mx' })],
    },
    {
      id: 'dis-aladdin-principe-ali', cat: 'dis-renacimiento', franchise: 'Aladdín', game: 'Aladdín',
      title: 'Príncipe Alí', composer: 'Ruben Trujillo', year: 1992,
      sources: [apple({ song: 1618857321, country: 'mx' })],
    },
    {
      id: 'dis-el-rey-leon-hakuna-matata', cat: 'dis-renacimiento', franchise: 'El rey león', game: 'El rey león',
      title: 'Hakuna Matata', composer: 'Claudia Pizá y Francisco Colmenero', year: 1994,
      sources: [apple({ song: 517299275, country: 'mx' })],
    },
    {
      id: 'dis-el-rey-leon-el-ciclo-sin-fin', cat: 'dis-renacimiento', franchise: 'El rey león', game: 'El rey león',
      title: 'El ciclo sin fin', composer: 'Tata Vega', year: 1994,
      sources: [apple({ song: 517299266, country: 'mx' })],
    },
    {
      id: 'dis-el-rey-leon-yo-quisiera-ya-ser-el-rey', cat: 'dis-renacimiento', franchise: 'El rey león', game: 'El rey león',
      title: 'Yo quisiera ya ser el rey', composer: 'Doblaje latino', year: 1994,
      sources: [yt('scZAnwaSIlw'), yt('23xNPVXZAWM')],
    },
    {
      id: 'dis-pocahontas-colores-en-el-viento', cat: 'dis-renacimiento', franchise: 'Pocahontas', game: 'Pocahontas',
      title: 'Colores en el viento', composer: 'Susana Zavaleta', year: 1995,
      sources: [apple({ song: 1624897806, country: 'mx' })],
    },
    {
      id: 'dis-toy-story-yo-soy-tu-amigo-fiel', cat: 'dis-renacimiento', franchise: 'Toy Story', game: 'Toy Story',
      title: 'Yo soy tu amigo fiel', composer: 'Héctor Ortiz', year: 1995, pixar: true,
      sources: [apple({ song: 1468162506, country: 'mx' })],
    },
    {
      id: 'dis-el-jorobado-de-notre-dame-las-campanas-de-notre-dame', cat: 'dis-renacimiento', franchise: 'El jorobado de Notre Dame', game: 'El jorobado de Notre Dame',
      title: 'Las campanas de Notre Dame', composer: 'Doblaje latino', year: 1996,
      sources: [yt('caDFkJyuyX0'), yt('-wiWoBKeLfI')],
    },
    {
      id: 'dis-hercules-no-importa-la-distancia', cat: 'dis-renacimiento', franchise: 'Hércules', game: 'Hércules',
      title: 'No importa la distancia', composer: 'Ricky Martin', year: 1997,
      sources: [apple({ song: 185392252, country: 'mx' })],
    },
    {
      id: 'dis-hercules-de-cero-a-heroe', cat: 'dis-renacimiento', franchise: 'Hércules', game: 'Hércules',
      title: 'De cero a héroe', composer: 'Tatiana y las musas', year: 1997,
      sources: [yt('20JoKHRpnFE'), yt('gdOVLQKn08w')],
    },
    {
      id: 'dis-mulan-reflejo', cat: 'dis-renacimiento', franchise: 'Mulán', game: 'Mulán',
      title: 'Reflejo', composer: 'Lucero', year: 1998,
      sources: [apple({ song: 1624897208, country: 'mx' })],
    },
    {
      id: 'dis-mulan-hombres-de-accion-seran-hoy', cat: 'dis-renacimiento', franchise: 'Mulán', game: 'Mulán',
      title: 'Hombres de acción serán hoy', composer: 'Cristian Castro', year: 1998,
      sources: [yt('SuKbG1wC_WI'), yt('mSTcXJbviAg'), yt('9x0AakpY0HE')],
    },
    {
      id: 'dis-tarzan-en-mi-corazon-viviras', cat: 'dis-renacimiento', franchise: 'Tarzán', game: 'Tarzán',
      title: 'En mi corazón vivirás', composer: 'Phil Collins', year: 1999,
      sources: [yt('fYFchvSdX8o'), yt('zGGUekR0p6E')],
    },
    {
      id: 'dis-tarzan-dos-mundos', cat: 'dis-renacimiento', franchise: 'Tarzán', game: 'Tarzán',
      title: 'Dos mundos', composer: 'Phil Collins', year: 1999,
      sources: [yt('Tl-CtAiQUA4'), yt('JH53SkrNqZU')],
    },
    {
      id: 'dis-toy-story-2-cuando-alguien-me-amaba', cat: 'dis-renacimiento', franchise: 'Toy Story', game: 'Toy Story 2',
      title: 'Cuando alguien me amaba', composer: 'Doblaje latino', year: 1999, pixar: true,
      sources: [yt('BCKMsbaNbKw'), yt('iIopDqbjqbo')],
    },
    /* ───────────── 2000–2009 (15) ───────────── */
    {
      id: 'dis-lilo-y-stitch-he-mele-no-lilo', cat: 'dis-2000s', franchise: 'Lilo y Stitch', game: 'Lilo y Stitch',
      title: 'He Mele No Lilo', composer: 'Mark Keali\'i Ho\'omalu', year: 2002,
      sources: [apple({ song: 1440737178, country: 'mx' })],
    },
    {
      id: 'dis-el-planeta-del-tesoro-sigo-aqui', cat: 'dis-2000s', franchise: 'El planeta del tesoro', game: 'El planeta del tesoro',
      title: 'Sigo aquí', composer: 'Alex Ubago', year: 2002,
      sources: [apple({ song: 265000193, country: 'mx' })],
    },
    {
      id: 'dis-buscando-a-nemo-nemo-egg-main-title', cat: 'dis-2000s', franchise: 'Buscando a Nemo', game: 'Buscando a Nemo',
      title: 'Nemo Egg (Main Title)', composer: 'Thomas Newman', year: 2003, pixar: true,
      sources: [apple({ song: 1440713648, country: 'mx' })],
    },
    {
      id: 'dis-piratas-del-caribe-la-maldicion-del-perla-negra-he-s-a-p', cat: 'dis-2000s', franchise: 'Piratas del Caribe', game: 'Piratas del Caribe: La maldición del Perla Negra',
      title: 'He\'s a Pirate', composer: 'Klaus Badelt', year: 2003,
      aka: ['Pirates of the Caribbean'],
      sources: [apple({ song: 1440650203, country: 'mx' })],
    },
    {
      id: 'dis-tierra-de-osos-grandes-espiritus', cat: 'dis-2000s', franchise: 'Tierra de osos', game: 'Tierra de osos',
      title: 'Grandes espíritus', composer: 'Doblaje latino', year: 2003,
      aka: ['Hermano oso', 'Brother Bear'],
      sources: [yt('A17v7T3LJGI'), yt('jx7_it1YAjM')],
    },
    {
      id: 'dis-los-increibles-the-incredits', cat: 'dis-2000s', franchise: 'Los increíbles', game: 'Los increíbles',
      title: 'The Incredits', composer: 'Michael Giacchino', year: 2004, pixar: true,
      sources: [apple({ song: 1440783355, country: 'mx' })],
    },
    {
      id: 'dis-cars-life-is-a-highway', cat: 'dis-2000s', franchise: 'Cars', game: 'Cars',
      title: 'Life Is a Highway', composer: 'Rascal Flatts', year: 2006, pixar: true,
      aka: ['Cars: Una aventura sobre ruedas'],
      sources: [apple({ song: 1440667482, country: 'mx' })],
    },
    {
      id: 'dis-ratatouille-le-festin', cat: 'dis-2000s', franchise: 'Ratatouille', game: 'Ratatouille',
      title: 'Le Festin', composer: 'Camille', year: 2007, pixar: true,
      sources: [apple({ song: 1445745069, country: 'mx' })],
    },
    {
      id: 'dis-wall-e-define-dancing', cat: 'dis-2000s', franchise: 'WALL·E', game: 'WALL·E',
      title: 'Define Dancing', composer: 'Thomas Newman', year: 2008, pixar: true,
      aka: ['Wall-E'],
      sources: [apple({ song: 1445606413, country: 'mx' })],
    },
    {
      id: 'dis-up-una-aventura-de-altura-married-life', cat: 'dis-2000s', franchise: 'Up: Una aventura de altura', game: 'Up: Una aventura de altura',
      title: 'Married Life', composer: 'Michael Giacchino', year: 2009, pixar: true,
      aka: ['Up'],
      sources: [apple({ song: 1440617708, country: 'mx' })],
    },
    {
      id: 'dis-la-princesa-y-el-sapo-llegare', cat: 'dis-2000s', franchise: 'La princesa y el sapo', game: 'La princesa y el sapo',
      title: 'Llegaré', composer: 'Paula Arias Esquivel', year: 2009,
      sources: [apple({ song: 1624897358, country: 'mx' }), yt('Qxs6m6sJ9JQ'), yt('zjjzFHQOzs4')],
    },
    {
      id: 'dis-las-locuras-del-emperador-mundo-perfecto', cat: 'dis-2000s', franchise: 'Las locuras del emperador', game: 'Las locuras del emperador',
      title: 'Mundo perfecto', composer: 'Óscar D\'León', year: 2000,
      aka: ['The Emperor\'s New Groove'],
      sources: [yt('jhdqaolD3Ig'), yt('fB7v3wk2BII')],
    },
    {
      id: 'dis-chicken-little-ya-no-se-quien-soy', cat: 'dis-2000s', franchise: 'Chicken Little', game: 'Chicken Little',
      title: 'Ya no sé quién soy', composer: 'Alejandro Lerner', year: 2005,
      sources: [yt('K8jRbgX1EMY')],
    },
    {
      id: 'dis-encantada-la-historia-de-giselle-y-tu-sabras', cat: 'dis-2000s', franchise: 'Encantada: La historia de Giselle', game: 'Encantada: La historia de Giselle',
      title: 'Y tú sabrás', composer: 'Doblaje latino', year: 2007,
      aka: ['Encantada', 'Enchanted'],
      sources: [yt('KxrLR_Vxun0'), yt('w40lX91e0yw')],
    },
    {
      id: 'dis-camp-rock-lo-que-soy-this-is-me', cat: 'dis-2000s', franchise: 'Camp Rock', game: 'Camp Rock',
      title: 'Lo que soy (This Is Me)', composer: 'Demi Lovato', year: 2008,
      sources: [yt('oObiJAipqoA'), yt('pLPvgdHPrSQ')],
    },
    /* ───────────── 2010–2019 (16) ───────────── */
    {
      id: 'dis-enredados-veo-en-ti-la-luz', cat: 'dis-2010s', franchise: 'Enredados', game: 'Enredados',
      title: 'Veo en ti la luz', composer: 'Chayanne y Danna Paola', year: 2010,
      sources: [apple({ song: 1444066907, country: 'mx' })],
    },
    {
      id: 'dis-enredados-madre-sabe-bien', cat: 'dis-2010s', franchise: 'Enredados', game: 'Enredados',
      title: 'Madre sabe bien', composer: 'Irasema Terrazas', year: 2010,
      sources: [apple({ song: 1444066903, country: 'mx' }), yt('9TDSRzLvsKU')],
    },
    {
      id: 'dis-valiente-viento-y-cielo-alcanzar', cat: 'dis-2010s', franchise: 'Valiente', game: 'Valiente',
      title: 'Viento y cielo alcanzar', composer: 'Doblaje latino', year: 2012, pixar: true,
      sources: [yt('5p2hwlq341Y'), yt('DvKoAX1oeFo')],
    },
    {
      id: 'dis-ralph-el-demoledor-sugar-rush', cat: 'dis-2010s', franchise: 'Ralph', game: 'Ralph, el demoledor',
      title: 'Sugar Rush', composer: 'AKB48', year: 2012,
      aka: ['Wreck-It Ralph'],
      sources: [apple({ song: 1561436021, country: 'mx' })],
    },
    {
      id: 'dis-frozen-una-aventura-congelada-libre-soy', cat: 'dis-2010s', franchise: 'Frozen', game: 'Frozen: Una aventura congelada',
      title: 'Libre soy', composer: 'Carmen Sarahi', year: 2013,
      aka: ['Frozen'],
      sources: [apple({ song: 1441181583, country: 'mx' })],
    },
    {
      id: 'dis-frozen-una-aventura-congelada-y-si-hacemos-un-muneco', cat: 'dis-2010s', franchise: 'Frozen', game: 'Frozen: Una aventura congelada',
      title: '¿Y si hacemos un muñeco?', composer: 'Romina Marroquín Payró y Sara Paula Gómez Arias', year: 2013,
      aka: ['Frozen'],
      sources: [apple({ song: 1441181576, country: 'mx' })],
    },
    {
      id: 'dis-grandes-heroes-immortals', cat: 'dis-2010s', franchise: 'Grandes héroes', game: 'Grandes héroes',
      title: 'Immortals', composer: 'Fall Out Boy', year: 2014,
      aka: ['Big Hero 6'],
      sources: [apple({ song: 1440806447, country: 'mx' })],
    },
    {
      id: 'dis-intensa-mente-bundle-of-joy', cat: 'dis-2010s', franchise: 'Intensa-Mente', game: 'Intensa-Mente',
      title: 'Bundle of Joy', composer: 'Michael Giacchino', year: 2015, pixar: true,
      aka: ['Intensamente', 'Inside Out'],
      sources: [apple({ song: 1443776090, country: 'mx' })],
    },
    {
      id: 'dis-zootopia-try-everything', cat: 'dis-2010s', franchise: 'Zootopia', game: 'Zootopia',
      title: 'Try Everything', composer: 'Shakira', year: 2016,
      sources: [apple({ song: 1440667007, country: 'mx' })],
    },
    {
      id: 'dis-moana-un-mar-de-aventuras-cuan-lejos-voy', cat: 'dis-2010s', franchise: 'Moana', game: 'Moana: Un mar de aventuras',
      title: '¿Cuán lejos voy?', composer: 'Sara Paula Gómez Arias', year: 2016,
      aka: ['Moana'],
      sources: [apple({ song: 1440855800, country: 'mx' })],
    },
    {
      id: 'dis-moana-un-mar-de-aventuras-de-nada', cat: 'dis-2010s', franchise: 'Moana', game: 'Moana: Un mar de aventuras',
      title: 'De nada', composer: 'BETO CASTILLO', year: 2016,
      aka: ['Moana'],
      sources: [apple({ song: 1440855860, country: 'mx' }), yt('HS2qe2nL2Co')],
    },
    {
      id: 'dis-coco-recuerdame', cat: 'dis-2010s', franchise: 'Coco', game: 'Coco',
      title: 'Recuérdame', composer: 'Carlos Rivera', year: 2017, pixar: true,
      sources: [apple({ song: 1440726688, country: 'mx' })],
    },
    {
      id: 'dis-coco-un-poco-loco', cat: 'dis-2010s', franchise: 'Coco', game: 'Coco',
      title: 'Un poco loco', composer: 'Luis Ángel Gómez Jaramillo y Gael García Bernal', year: 2017, pixar: true,
      sources: [apple({ song: 1440726681, country: 'mx' })],
    },
    {
      id: 'dis-coco-la-llorona', cat: 'dis-2010s', franchise: 'Coco', game: 'Coco',
      title: 'La llorona', composer: 'Angélica Vale y Marco Antonio Solís', year: 2017, pixar: true,
      sources: [apple({ song: 1440726685, country: 'mx' })],
    },
    {
      id: 'dis-frozen-2-mucho-mas-alla', cat: 'dis-2010s', franchise: 'Frozen', game: 'Frozen 2',
      title: 'Mucho más allá', composer: 'Carmen Sarahi y AURORA', year: 2019,
      sources: [apple({ song: 1487754972, country: 'mx' })],
    },
    {
      id: 'dis-frozen-2-muestrate', cat: 'dis-2010s', franchise: 'Frozen', game: 'Frozen 2',
      title: 'Muéstrate', composer: 'Carmen Sarahi y Leslie Gil', year: 2019,
      sources: [apple({ song: 1487754979, country: 'mx' })],
    },
    /* ───────────── 2020 en adelante (8) ───────────── */
    {
      id: 'dis-encanto-no-se-habla-de-bruno', cat: 'dis-2020s', franchise: 'Encanto', game: 'Encanto',
      title: 'No se habla de Bruno', composer: 'Carolina Gaitán - La Gaita y Mauro Castillo', year: 2021,
      sources: [apple({ song: 1596162957, country: 'mx' }), yt('wTi8yLyHeb8')],
    },
    {
      id: 'dis-encanto-dos-oruguitas', cat: 'dis-2020s', franchise: 'Encanto', game: 'Encanto',
      title: 'Dos oruguitas', composer: 'Sebastián Yatra', year: 2021,
      sources: [apple({ song: 1596162964, country: 'mx' })],
    },
    {
      id: 'dis-encanto-en-lo-profundo', cat: 'dis-2020s', franchise: 'Encanto', game: 'Encanto',
      title: 'En lo profundo', composer: 'Sugey Torres', year: 2021,
      sources: [yt('7JXVgNvIXcI'), yt('u_txH8iBejI')],
    },
    {
      id: 'dis-encanto-la-familia-madrigal', cat: 'dis-2020s', franchise: 'Encanto', game: 'Encanto',
      title: 'La familia Madrigal', composer: 'Olga Lucía Vives y Yaneth Waldman', year: 2021,
      sources: [apple({ song: 1596162952, country: 'mx' })],
    },
    {
      id: 'dis-luca-silenzio-bruno', cat: 'dis-2020s', franchise: 'Luca', game: 'Luca',
      title: 'Silenzio, Bruno!', composer: 'Dan Romer', year: 2021, pixar: true,
      sources: [apple({ song: 1571407929, country: 'mx' })],
    },
    {
      id: 'dis-red-nobody-like-u', cat: 'dis-2020s', franchise: 'Red', game: 'Red',
      title: 'Nobody Like U', composer: '4*TOWN (From Disney and Pixar’s Turning Red) y Jordan Fisher', year: 2022, pixar: true,
      aka: ['Turning Red'],
      sources: [apple({ song: 1610789903, country: 'mx' })],
    },
    {
      id: 'dis-wish-el-poder-de-los-deseos-mi-deseo', cat: 'dis-2020s', franchise: 'Wish: El poder de los deseos', game: 'Wish: El poder de los deseos',
      title: 'Mi deseo', composer: 'María León', year: 2023,
      aka: ['Wish'],
      sources: [yt('TZRGfNet77I'), yt('o_d4f_88KvM')],
    },
    {
      id: 'dis-moana-2-al-final', cat: 'dis-2020s', franchise: 'Moana', game: 'Moana 2',
      title: 'Al final', composer: 'Sara Paula Gómez Arias', year: 2024,
      sources: [yt('E0xyhIGdt0w'), yt('D82t_7mUHXI')],
    },
  );

  // Señuelos: aparecen como opciones incorrectas y en el buscador de Experto.
  AM.EXTRA_GAMES.push(
    { theme: 'disney', franchise: 'Bambi', game: 'Bambi' },
    { theme: 'disney', franchise: 'Dumbo', game: 'Dumbo' },
    { theme: 'disney', franchise: 'Fantasía', game: 'Fantasía' },
    { theme: 'disney', franchise: 'La espada en la piedra', game: 'La espada en la piedra' },
    { theme: 'disney', franchise: 'Los rescatadores', game: 'Los rescatadores' },
    { theme: 'disney', franchise: 'El zorro y el sabueso', game: 'El zorro y el sabueso' },
    { theme: 'disney', franchise: 'Bichos', game: 'Bichos', pixar: true },
    { theme: 'disney', franchise: 'Monsters, Inc.', game: 'Monsters University', pixar: true },
    { theme: 'disney', franchise: 'Toy Story', game: 'Toy Story 3', pixar: true },
    { theme: 'disney', franchise: 'Toy Story', game: 'Toy Story 4', pixar: true },
    { theme: 'disney', franchise: 'Buscando a Nemo', game: 'Buscando a Dory', pixar: true },
    { theme: 'disney', franchise: 'Los increíbles', game: 'Los increíbles 2', pixar: true },
    { theme: 'disney', franchise: 'Cars', game: 'Cars 2', pixar: true },
    { theme: 'disney', franchise: 'Toy Story', game: 'Lightyear', pixar: true },
    { theme: 'disney', franchise: 'Raya y el último dragón', game: 'Raya y el último dragón' },
    { theme: 'disney', franchise: 'Atlantis: El imperio perdido', game: 'Atlantis: El imperio perdido' },
    { theme: 'disney', franchise: 'Bolt', game: 'Bolt' },
    { theme: 'disney', franchise: 'Ralph', game: 'Ralph rompe Internet' },
    { theme: 'disney', franchise: 'El rey león', game: 'Mufasa: El rey león' },
    { theme: 'disney', franchise: 'El rey león', game: 'El rey león 2: El tesoro de Simba' },
    { theme: 'disney', franchise: 'Aladdín', game: 'Aladdín: El retorno de Jafar' },
    { theme: 'disney', franchise: 'La sirenita', game: 'La sirenita 2: Regreso al mar' },
    { theme: 'disney', franchise: 'Mulán', game: 'Mulán 2' },
  );
})(window.AM = window.AM || {});
