/*
 * Temas del juego: videojuegos, series, caricaturas, anime, Disney, musicales y canciones.
 *
 * Cada tema tiene sus propias categorías (épocas, plataformas, géneros…) y define cómo se llaman
 * las dos respuestas de cada pista:
 *   - `franchise` → respuesta "amplia" del modo Clásico (saga, artista, serie, musical…)
 *   - `game`      → respuesta exacta de Experto y Supervivencia (juego, canción, película…)
 * `lineIcon`: si el tema lo trae, debajo de cada canción se muestra su `franchise` con ese ícono
 * (🎭 Wicked) en vez del nombre de la canción, que ya es la respuesta.
 * Este archivo se carga después de todos los catálogos y marca cada pista con su tema.
 */
(function (AM) {
  'use strict';

  /*
   * Selector de idioma (Canciones y Musicales): las pistas sin `lang` (instrumentales) entran con
   * cualquier opción, y las de otros idiomas (K-pop en coreano, Rammstein) solo con la primera.
   * `allLabel`: "Ambos" en Musicales; "Todos" en Canciones, que también tiene coreano y alemán.
   */
  const langFilter = (allLabel) => ({
    id: 'lang', type: 'choice', default: 'ambos', label: 'Idioma',
    options: [
      { value: 'ambos', label: '🌎 ' + (allLabel || 'Ambos') },
      { value: 'es', label: 'Español' },
      { value: 'en', label: 'Inglés' },
    ],
    keep: (t, v) => v === 'ambos' || !t.lang || t.lang === v,
  });

  /*
   * Selector de época (Canciones, que se separa por género): según el `year` de cada pista.
   * Los señuelos no traen año y entran con cualquier época.
   */
  const ERAS = [
    { value: 'todas', label: '🕰️ Todas' },
    { value: 'antes', label: 'Antes de 1980', to: 1979 },
    { value: '80s', label: 'Años 80', from: 1980, to: 1989 },
    { value: '90s', label: 'Años 90', from: 1990, to: 1999 },
    { value: '00s', label: '2000s', from: 2000, to: 2009 },
    { value: '10s', label: '2010s', from: 2010, to: 2019 },
    { value: '20s', label: '2020s', from: 2020 },
  ];
  const eraFilter = () => ({
    id: 'era', type: 'choice', default: 'todas', label: 'Época',
    options: ERAS.map((e) => ({ value: e.value, label: e.label })),
    keep: (t, v) => {
      const era = ERAS.find((e) => e.value === v);
      if (!era || !t.year) return true;
      return (!era.from || t.year >= era.from) && (!era.to || t.year <= era.to);
    },
  });

  AM.THEMES = [
    {
      id: 'juegos', label: 'Videojuegos', icon: '🎮',
      kicker: 'Adivinador musical para gamers',
      sub: 'Escucha el soundtrack oficial y adivina de qué videojuego es.',
      broad: 'saga', broadArt: 'la saga', broadPl: 'sagas',
      exact: 'juego', exactArt: 'el juego', exactPl: 'juegos',
      expertGoal: 'el juego exacto', survivalGoal: 'juego exacto',
      question: '¿De qué juego es?',
      placeholder: 'Escribe el nombre del juego…',
      partial: 'saga correcta, otro juego',
      clasicoExample: 'Halo, Kirby, Zelda…', survivalExample: '¿Halo 2 o Halo 3?',
      otherReason: 'Es de otro juego', sameReason: 'Es otra canción de este mismo juego',
      realLabel: '¿De qué juego era en realidad?', realPlaceholder: 'Escribe el juego (si lo sabes)',
      songExample: 'Dire, Dire Docks',
      ranks: {
        survival: [
          [25, 'Leyenda del soundtrack', 'Tus oídos tienen el 100% de logros.'],
          [15, 'Jefe final', 'Pocos llegan tan lejos. ¡Impresionante!'],
          [8, 'Veterano gamer', 'Tienes buen oído. ¿Otra partida?'],
          [3, 'Aventurero', 'Vas por buen camino.'],
          [0, 'Novato', 'Todos empezamos en el nivel 1-1.'],
        ],
        ratio: [
          [0.9, 'Leyenda del soundtrack', 'Reconoces los juegos con los ojos cerrados.'],
          [0.7, 'Gran oído gamer', '¡Casi perfecto!'],
          [0.4, 'Nada mal, jugador', 'Sigue practicando y subirás de nivel.'],
          [0, 'A seguir practicando', 'Hay mucho soundtrack por descubrir.'],
        ],
      },
    },
    {
      id: 'series', label: 'Series', icon: '📺',
      kicker: 'Adivinador musical de series de TV',
      sub: 'Escucha la entrada o el tema principal y adivina de qué serie es.',
      broad: 'serie', broadArt: 'la serie', broadPl: 'series',
      exact: 'serie', exactArt: 'la serie', exactPl: 'series',
      expertGoal: 'el nombre de la serie', survivalGoal: 'adivina la serie',
      question: '¿De qué serie es?',
      placeholder: 'Escribe el nombre de la serie…',
      partial: 'misma franquicia, otra serie',
      clasicoExample: 'Friends, Lost, Stranger Things…', survivalExample: 'sin pistas fáciles',
      otherReason: 'Es de otra serie', sameReason: 'Es otra canción de esta misma serie',
      realLabel: '¿De qué serie era en realidad?', realPlaceholder: 'Escribe la serie (si la sabes)',
      songExample: "I'll Be There for You",
      ranks: {
        survival: [
          [25, 'Maratonista legendario', 'Te sabes todas las entradas de memoria.'],
          [15, 'Crítico de TV', 'Pocos llegan tan lejos. ¡Impresionante!'],
          [8, 'Fan de las series', 'Tienes buen oído. ¿Otra partida?'],
          [3, 'Espectador', 'Vas por buen camino.'],
          [0, 'Recién suscrito', 'Todos empezamos por el primer capítulo.'],
        ],
        ratio: [
          [0.9, 'Maratonista legendario', 'Reconoces cualquier serie con solo oír la entrada.'],
          [0.7, 'Experto en series', '¡Casi perfecto!'],
          [0.4, 'Buen espectador', 'Unos capítulos más y lo dominas.'],
          [0, 'A seguir viendo', 'Hay muchas series por descubrir.'],
        ],
      },
    },
    {
      id: 'caricaturas', label: 'Caricaturas', icon: '🧸',
      kicker: 'Adivinador musical de caricaturas',
      sub: 'Escucha la entrada y adivina de qué caricatura es.',
      broad: 'caricatura', broadArt: 'la caricatura', broadPl: 'caricaturas',
      exact: 'caricatura', exactArt: 'la caricatura', exactPl: 'caricaturas',
      expertGoal: 'el nombre de la caricatura', survivalGoal: 'adivina la caricatura',
      question: '¿De qué caricatura es?',
      placeholder: 'Escribe el nombre de la caricatura…',
      partial: 'misma saga, otra caricatura',
      clasicoExample: 'Los Picapiedra, Bob Esponja, Hora de aventura…', survivalExample: '¿Los Simpson o Los Simpson: la película?',
      otherReason: 'Es de otra caricatura', sameReason: 'Es otra canción de esta misma caricatura',
      realLabel: '¿De qué caricatura era en realidad?', realPlaceholder: 'Escribe la caricatura (si la sabes)',
      songExample: 'Tema de Los Picapiedra',
      ranks: {
        survival: [
          [25, 'Leyenda de las caricaturas', 'Tu infancia (y la de todos) vive en tu memoria.'],
          [15, 'Héroe del sábado en la mañana', 'Pocos llegan tan lejos. ¡Impresionante!'],
          [8, 'Fan de las caricaturas', 'Tienes buen oído. ¿Otra partida?'],
          [3, 'Aprendiz', 'Vas por buen camino.'],
          [0, 'Novato', 'Todos empezamos en el primer episodio.'],
        ],
        ratio: [
          [0.9, 'Leyenda de las caricaturas', 'Reconoces cualquier entrada a la primera.'],
          [0.7, 'Fan de las caricaturas', '¡Casi perfecto!'],
          [0.4, 'Nada mal', 'Unas cuantas tardes de caricaturas más y lo dominas.'],
          [0, 'A seguir viendo', 'Hay muchas caricaturas por descubrir.'],
        ],
      },
    },
    {
      id: 'anime', label: 'Anime', icon: '🎌',
      kicker: 'Adivinador musical de anime',
      sub: 'Escucha el opening y adivina de qué anime es.',
      broad: 'anime', broadArt: 'el anime', broadPl: 'animes',
      exact: 'anime', exactArt: 'el anime', exactPl: 'animes',
      expertGoal: 'el nombre del anime', survivalGoal: 'adivina el anime',
      question: '¿De qué anime es?',
      placeholder: 'Escribe el nombre del anime…',
      partial: 'misma saga, otro anime',
      clasicoExample: 'Dragon Ball, Naruto, Demon Slayer…', survivalExample: '¿Dragon Ball Z o Dragon Ball GT?',
      otherReason: 'Es de otro anime', sameReason: 'Es otro opening de este mismo anime',
      realLabel: '¿De qué anime era en realidad?', realPlaceholder: 'Escribe el anime (si lo sabes)',
      songExample: 'Gurenge',
      ranks: {
        survival: [
          [25, 'Leyenda del anime', 'Te sabes los openings mejor que los créditos.'],
          [15, 'Otaku de corazón', 'Pocos llegan tan lejos. ¡Impresionante!'],
          [8, 'Fan del anime', 'Tienes buen oído. ¿Otra partida?'],
          [3, 'Aprendiz', 'Vas por buen camino.'],
          [0, 'Novato', 'Todos empezamos en el primer capítulo.'],
        ],
        ratio: [
          [0.9, 'Leyenda del anime', 'Reconoces cualquier opening a la primera.'],
          [0.7, 'Otaku de corazón', '¡Casi perfecto!'],
          [0.4, 'Nada mal', 'Unos cuantos maratones más y lo dominas.'],
          [0, 'A seguir viendo', 'Hay mucho anime por descubrir.'],
        ],
      },
    },
    {
      id: 'disney', label: 'Disney', icon: '🏰',
      kicker: 'Adivinador musical de películas de Disney',
      sub: 'Escucha la canción (en español latino) y adivina de qué película de Disney es.',
      broad: 'película', broadArt: 'la película', broadPl: 'películas',
      exact: 'película', exactArt: 'la película', exactPl: 'películas',
      expertGoal: 'la película exacta', survivalGoal: 'película exacta',
      question: '¿De qué película es?',
      placeholder: 'Escribe el nombre de la película…',
      partial: 'saga correcta, otra película',
      clasicoExample: 'El rey león, Frozen, Coco…', survivalExample: '¿Toy Story o Toy Story 2?',
      otherReason: 'Es de otra película', sameReason: 'Es otra canción de esta misma película',
      realLabel: '¿De qué película era en realidad?', realPlaceholder: 'Escribe la película (si la sabes)',
      songExample: 'Hakuna Matata',
      filters: [
        {
          id: 'pixar', type: 'toggle', default: true,
          label: 'Incluir películas de Pixar', icon: '💡',
          keep: (t, on) => on || !t.pixar,
        },
      ],
      ranks: {
        survival: [
          [25, 'Leyenda de Disney', 'Hakuna matata: ninguna canción se te escapa.'],
          [15, 'Protagonista', 'Pocos llegan tan lejos. ¡Impresionante!'],
          [8, 'Fan de Disney', 'Tienes buen oído. ¿Otra partida?'],
          [3, 'Aprendiz de magia', 'Vas por buen camino.'],
          [0, 'Novato', 'Había una vez… tu primera partida.'],
        ],
        ratio: [
          [0.9, 'Leyenda de Disney', 'Te sabes todas las canciones de memoria.'],
          [0.7, 'Gran fan de Disney', '¡Casi perfecto!'],
          [0.4, 'Nada mal', 'Un maratón de películas y lo dominas.'],
          [0, 'A seguir viendo', 'Hay mucha magia por descubrir.'],
        ],
      },
    },
    {
      id: 'musicales', label: 'Musicales', icon: '🎭',
      kicker: 'Adivinador musical de teatro y cine',
      sub: 'Escucha la canción y adivina de qué musical es: Broadway, Londres y películas, en su versión original o en español.',
      broad: 'musical', broadArt: 'el musical', broadPl: 'musicales',
      exact: 'canción', exactArt: 'la canción', exactPl: 'canciones',
      expertGoal: 'la canción exacta', survivalGoal: 'canción exacta',
      question: '¿De qué musical es?', questionExact: '¿Qué canción es?',
      placeholder: 'Escribe la canción o el musical…',
      partial: 'musical correcto, otra canción',
      clasicoExample: 'Wicked, Grease, The Phantom of the Opera…', survivalExample: '¿Defying Gravity o Popular?',
      otherReason: 'Es de otro musical', sameReason: 'Es otra canción de este mismo musical',
      realLabel: '¿Qué canción era en realidad?', realPlaceholder: 'Escribe la canción (si la sabes)',
      realSongLabel: '¿De qué musical era?', songExample: 'Wicked',
      lineIcon: '🎭',
      filters: [langFilter()],
      ranks: {
        survival: [
          [25, 'Leyenda de Broadway', 'Te sabes cada canción, del primer acto al último.'],
          [15, 'Estrella del elenco', 'Pocos llegan tan lejos. ¡Impresionante!'],
          [8, 'Fan de los musicales', 'Tienes buen oído. ¿Otra función?'],
          [3, 'Corista', 'Vas por buen camino.'],
          [0, 'Debutante', 'Todos empezamos en la audición.'],
        ],
        ratio: [
          [0.9, 'Leyenda de Broadway', 'Reconoces cualquier musical desde la obertura.'],
          [0.7, 'Estrella del elenco', '¡Casi perfecto!'],
          [0.4, 'Nada mal', 'Unos cuantos ensayos más y lo dominas.'],
          [0, 'A seguir ensayando', 'Hay muchos musicales por descubrir.'],
        ],
      },
    },
    {
      id: 'canciones', label: 'Canciones', icon: '🎤',
      kicker: 'Adivinador musical de canciones famosas',
      sub: 'Escucha el fragmento y adivina qué canción es (y quién la canta). Elige los géneros, la época y el idioma.',
      broad: 'artista', broadArt: 'el artista', broadPl: 'artistas',
      exact: 'canción', exactArt: 'la canción', exactPl: 'canciones',
      expertGoal: 'la canción exacta', survivalGoal: 'canción exacta',
      question: '¿Quién la canta?', questionExact: '¿Qué canción es?',
      placeholder: 'Escribe el nombre de la canción…',
      partial: 'artista correcto, otra canción',
      clasicoExample: 'Queen, Shakira, Luis Miguel…', survivalExample: 'adivina la canción exacta',
      otherReason: 'Es otra canción', sameReason: 'Es otra versión (en vivo, remix…) de esta canción',
      realLabel: '¿Qué canción era en realidad?', realPlaceholder: 'Escribe la canción (si la sabes)',
      realSongLabel: '¿Quién la canta?', songExample: 'Queen',
      showArtist: true,
      optionsByCat: true, // las opciones falsas, del mismo género que la que suena
      filters: [langFilter('Todos'), eraFilter()],
      ranks: {
        survival: [
          [25, 'Leyenda musical', 'Reconoces cualquier canción a la primera.'],
          [15, 'Alma de la fiesta', 'Pocos llegan tan lejos. ¡Impresionante!'],
          [8, 'Melómano', 'Tienes buen oído. ¿Otra partida?'],
          [3, 'Buen oído', 'Vas por buen camino.'],
          [0, 'Principiante', 'Todos empezamos con la primera canción.'],
        ],
        ratio: [
          [0.9, 'Leyenda musical', 'Reconoces cualquier canción a la primera.'],
          [0.7, 'Gran oído musical', '¡Casi perfecto!'],
          [0.4, 'Nada mal', 'Sigue escuchando y subirás de nivel.'],
          [0, 'A seguir escuchando', 'Hay mucha música por descubrir.'],
        ],
      },
    },
  ];

  const byId = {};
  AM.THEMES.forEach((t) => { byId[t.id] = t; t.filters = t.filters || []; });
  AM.theme = (id) => byId[id] || AM.THEMES[0];

  // Las categorías originales (videojuegos) no traen tema: se les asigna aquí.
  const catTheme = {};
  AM.CATEGORIES.forEach((c) => {
    if (!c.theme) c.theme = 'juegos';
    catTheme[c.id] = c.theme;
  });
  AM.CATALOG.forEach((t) => { t.theme = catTheme[t.cat] || 'juegos'; });
  AM.EXTRA_GAMES.forEach((g) => { if (!g.theme) g.theme = g.cat ? (catTheme[g.cat] || 'juegos') : 'juegos'; });

  AM.themeCategories = (id) => AM.CATEGORIES.filter((c) => c.theme === id);
})(window.AM = window.AM || {});
