# Antigravity Memory - Adivinador Musical

## Arquitectura y Estructura del Sistema
* **Frontend Estático Modular:** La aplicación corre enteramente sobre Vanilla JS sin frameworks pesados, exponiendo módulos bajo el namespace global `window.AM`.
* **Catálogos por Temas:** 
  * `js/catalog-canciones.js` gestiona el catálogo de canciones famosas categorizadas en 12 géneros musicales (`song-rock`, `song-pop`, `song-rap`, `song-reggaeton`, `song-regional`, `song-baladas`, `song-electronica`, `song-cumbia`, `song-salsa`, `song-metal`, `song-kpop`, `song-country`).
  * Conteo consolidado bilingüe: **1,816 pistas totales**.
    * **Rock:** 100 ES / 100 EN (Total: 200)
    * **Pop:** 100 ES / 100 EN (Total: 200)
    * **Rap y hip-hop:** 100 ES / 100 EN (Total: 200)
    * **Baladas:** 100 ES / 100 EN (Total: 200)
    * **Metal:** 100 ES / 100 EN / 5 Alemán (Total: 205)
    * **Electrónica:** 100 ES / 100 EN / 11 Instrumentales (Total: 211)
    * **Reggaetón:** 100 ES (Total: 100)
    * **Regional mexicano:** 100 ES (Total: 100)
    * **Cumbia:** 100 ES (Total: 100)
    * **Salsa:** 99 ES / 1 EN (Total: 100)
    * **K-pop:** 93 KO / 7 EN (Total: 100)
    * **Country:** 100 EN (Total: 100) — desde la v1.9.5, de 1952 a 2024, todas con `busca()`. Los duetos van como "Artista y Artista" en `franchise`.
  * **Duetos en `busca()` (desde la v1.9.5-hotfix1):** Apple nunca escribe "y" en un crédito ("Queen & David Bowie", o el segundo como "(feat. …)" en el título). Si el artista que recibe `busca()` trae " y ", primero busca por el primero del crédito y acepta la canción de cualquiera de ellos; la búsqueda con el nombre completo queda de respaldo para grupos que sí se llaman así ("Alaska y Dinarama", "Fruko y sus Tesos"). Se puede pasar el dueto tal cual o solo el artista principal.
  * Formato estándar de registro:
    ```javascript
    {
      id: 'song-unique-identifier',
      cat: 'song-<genero>',
      franchise: 'Artista o Banda',
      game: 'Título de la Canción',
      title: 'Título de la Canción',
      year: YYYY,
      lang: 'es' | 'en' | 'ko' | 'de' | undefined, // omitido si es instrumental pura
      sources: busca('Artista', 'Canción') // o apple({ song: <id>, country: 'mx' })
    }
    ```
  * `js/catalog-musicales.js` gestiona el catálogo de obras de teatro y películas musicales por época (`mus-clasicos`, `mus-7080`, `mus-9000`, `mus-10s`).
    * Conteo consolidado (v2.1): **269 pistas totales** (239 en su grabación original y 30 en español).
      * **Clásicos (antes de 1970):** 68 canciones (`mus-clasicos`).
      * **70s y 80s:** 74 canciones (`mus-7080`).
      * **90s y 2000s:** 63 canciones (`mus-9000`).
      * **2010 en adelante:** 64 canciones (`mus-10s`).
    * Formato estándar de registro en Musicales:
      ```javascript
      {
        id: 'mus-unique-identifier',
        cat: 'mus-<epoca>',
        franchise: 'Nombre Original del Musical', // Siempre original (ej. "The Wizard of Oz", "Grease")
        game: 'Título de la Canción',
        title: 'Título de la Canción',
        composer: 'Intérprete o elenco de la grabación',
        year: YYYY,
        platform: 'Broadway' | 'Londres' | 'Película' | 'México' | 'Madrid',
        lang: 'en' | 'es',
        sources: busca('Musical', 'Canción') // o am(id)
      }
      ```
    * Nombres en español: registrados exclusivamente en `AM.FRANCHISE_AKA` para habilitar búsqueda en modo Experto sin alterar el nombre canónico de la obra en `franchise`.
  * `js/catalog-anime.js` gestiona el catálogo de openings de anime por época (`anime-clasicos`, `anime-90s`, `anime-00s`, `anime-10s`, `anime-20s`).
    * Conteo consolidado (v2.1): **303 pistas totales**.
      * Distribuido en 5 épocas: Clásicos (antes de 1990), Años 90, 2000s, 2010s, 2020 en adelante.
    * Formato estándar de registro en Anime:
      ```javascript
      {
        id: 'ani-unique-identifier',
        cat: 'anime-<epoca>',
        franchise: 'Nombre Principal del Anime', // Clásico adivina franchise
        game: 'Temporada / Serie específica',     // Experto y Supervivencia adivina game
        title: 'Título de la Canción (Opening)',
        composer: 'Artista, banda o cantante japonés',
        year: YYYY,
        platform: 'Estudio de animación (MAPPA, Ufotable, Wit Studio, Bones, Madhouse, Toei...)',
        aka: ['Título en japonés', 'Traducción oficial', 'Nombre alternativo'],
        sources: [yt('VIDEO_ID'), apple({ song: <id>, country: 'mx' })]
      }
      ```
    * Resolución de fuentes: clips oficiales de Crunchyroll y canales de animación en YouTube (`yt(id)`), complementados con previews oficiales de Apple Music (`apple({ song, country })`).
  * `js/catalog-caricaturas.js` gestiona el catálogo de entradas de caricaturas en español latino por época (`toon-clasicas`, `toon-80s`, `toon-90s`, `toon-00s`, `toon-1014`, `toon-1519`, `toon-20s`).
    * Conteo consolidado (v2.1): **359 pistas totales** (todas en doblaje latinoamericano oficial).
      * Distribuido en 7 épocas: Clásicas (antes de 1980), Años 80, Años 90, 2000s, 2010 a 2014, 2015 a 2019 y 2020 en adelante (desde la v1.9.3-exp-hotfix2; antes las tres últimas eran una sola, `toon-10s`, y `AM.CATEGORY_RENAMES` + `loadCats()` en app.js pasan esa selección guardada a las tres nuevas).
    * Formato estándar de registro en Caricaturas:
      ```javascript
      {
        id: 'toon-unique-identifier',
        cat: 'toon-<epoca>',
        franchise: 'Nombre en Español Latino', // Nombre transmitido en Latinoamérica
        game: 'Nombre de la Serie',
        title: 'Título del tema en español latino',
        composer: 'Compositor / Doblaje latino',
        year: YYYY,
        platform: 'Estudio (Hanna-Barbera, Warner Bros., Disney, Nickelodeon, CN...)',
        aka: ['Título original en inglés'],
        sources: [yt('VIDEO_ID')]
      }
      ```
    * Resolución de fuentes: videos de YouTube con las intros y canciones de apertura dobladas en español latino (`yt(id)`).
* **Resolución de Audio Dinámica (`js/sources.js`):**
  * La función `busca(artista, cancion)` genera consultas hacia la iTunes Search API vía JSONP con rate limiting (tokens de 6 ráfagas, recarga cada 3.2s).
  * Soporta resolución primaria para México (`country: 'mx'`) con fallback global.
* **Filtros e Indexación (`js/themes.js`):**
  * Soporte para épocas temporales (`antes de 1980`, `80s`, `90s`, `00s`, `10s`, `20s`) basado en el atributo numérico `year`.
  * Filtro de idiomas (`es`, `en`, `ambos`/`todos`) que garantiza selecciones parejas y sin sesgos gracias a la paridad 100 ES / 100 EN en los géneros bilingües.
* **Categorías nuevas y selección guardada (`loadCats()` en `js/app.js`):** el jugador guarda sus categorías elegidas por tema (`am.catsByTheme`). Desde la v1.9.5 también se guarda `am.catsKnown` (las categorías que ya vio): una categoría nueva entra elegida solo si el jugador tenía elegidas todas las demás de ese tema. Al agregar una categoría nueva, añade su id a `AM.NEW_CATEGORIES` en su catálogo (como `song-country`), para los jugadores que vienen de antes de la 1.9.5 y aún no tienen `catsKnown`. Si una categoría se divide o cambia de id, usa `AM.CATEGORY_RENAMES`.
* **Modos de juego (`js/game.js` + `js/app.js`):**
  * Supervivencia: 3 vidas. Desde la v1.9.4, cada 5 rondas (la 5, 10, 15…) hay ronda bonus (`bonusEvery: 5`, `AM.Logic.isBonusRound`): acertarla devuelve una vida (máximo 3) y fallarla no la quita.
  * Nicknames ofensivos (desde la v1.9.5-hotfix1): `AM.Scores.isOffensive` en `js/scores.js` no deja guardarlos ni los muestra, y la base los rechaza con la regla `nick_permitido` (función `nick_ofensivo` en `supabase/schema.sql`). Las dos listas (PALABRAS completas y PEGADAS dentro de otra palabra) tienen que ser idénticas: `node scripts/validate-nick-filter.js` lo revisa y prueba ejemplos que deben pasar ("Computadora", "Maricarmen", "Vergara", "Kike"…).
  * El ranking (Supabase) valida cada puntaje con la regla `puntaje_posible` de `supabase/schema.sql` (en Supervivencia: `rondas - aciertos <= 3 + rondas / 5`). Si cambian las reglas de vidas o puntos, hay que actualizar esa regla y volver a correr el archivo en el SQL Editor de Supabase.

* **Otros catálogos (v2.1):**
  * Videojuegos (`js/catalog.js`): 342 pistas, de 131 sagas y 232 juegos.
  * Sagas (`js/catalog-sagas.js`, `AM.SAGA_TRACKS`): 202 pistas (no repitas en SAGA_TRACKS canciones que ya estén en catalog.js: el modo Sagas ya las toma de ahí).
  * Series (`js/catalog-series.js`): 192.
  * Disney (`js/catalog-disney.js`): 89.
* **Inicio (v1.9.6 → v2.0):**
  * La 1.9.6 trajo el configurador paso a paso. Está guardada en la rama `respaldo-v1.9.6` y el tag `v1.9.6`: no los toques.
  * La 2.0 lo cambió por el inicio estilo "setlist", que está en main y salió como release V2.0:
    * tres partes en un panel: 1 Tema, 2 Modo y 3 Música;
    * el resumen "Tu partida" con ▶ Jugar.
  * Cambió `index.html`, `css/styles.css`, el bloque del inicio de `js/app.js` y `catsLabel`/`offLabel` de `js/themes.js`.
* **Herramientas de red (desde la v2.1):** corren en una computadora con internet; Claude no tiene red en su sesión.
  * `scripts/lib-v21.js` tiene las búsquedas reales y verificadas:
    * `searchAndVerifyYoutube`: oEmbed más `playabilityStatus` y `playableInEmbed` de la página del video, que detectan los videos bloqueados en México o que no se pueden insertar;
    * `searchApple`, `verifyAppleSongIds`: lookup con el mismo `country` de la fuente y `previewUrl`;
    * `recordAppleTrackEvidence`.
    Cada comprobación se guarda por ID en `scripts/evidencia-v2.1.json`.
  * `node scripts/audit-red.js <tema|todos>` audita el catálogo en red y clasifica cada pista en ok, dudosa o muerta. Escribe `scripts/audit-red-report.json` y las búsquedas por término y álbum las prueba con la lógica real de `js/sources.js`.
  * `node scripts/check-phase4.js` corre las comprobaciones sin red:
    * `node --check`;
    * IDs repetidos;
    * cuentas de encabezados y secciones;
    * una sola `franchise` por `game`;
    * Canciones intacto;
    * los validadores.
    Debe pasar en cada commit.
  * Otros scripts:
    * `node scripts/check-evidencia.js` revisa que cada ID nuevo o cambiado respecto a la base (`2d85042`, de donde salió la 2.1; se cambia con `BASE=<commit>`) tenga evidencia;
    * `node scripts/diff-fuentes.js --md` lista cada cambio de fuente, de la vieja a la nueva;
    * `scripts/build-{series,disney,musicales}-v21.js` agregaron las pistas de la 2.1.
  * `node scripts/aplicar-revision-v21.js [--probar]` aplica las decisiones de `scripts/revision-v21.json` sin red. Las tomaron revisores Sonnet y un árbitro Opus sobre la evidencia, y pueden:
    * quitar o reordenar fuentes;
    * corregir datos;
    * mover de época;
    * quitar pistas, que van a `scripts/pendientes-v2.1.json`.
    Lo que solo se decide oyendo va a `scripts/revisar-a-oido.md`.
  * `node scripts/build-resto-v22.js <caricaturas|anime|juegos|sagas|todos>` agregó la segunda tanda de la 2.1 (Caricaturas, Anime, Videojuegos y Sagas; corrió en la PC del usuario porque YouTube bloquea los servidores en la nube):
    * lee los candidatos de `scripts/candidatos-v22.json` , los busca de verdad y aplica filtros deterministas (palabras clave, latino, covers, remakes y duración);
    * inserta al final de cada sección, guarda evidencia y es reanudable;
    * se detiene en la meta de cada categoría y deja lo aceptado y lo descartado en `scripts/resultado-v22.json`.

## Convenciones y Lecciones Aprendidas
1. **Unicidad de Identificadores:** Todos los `id` de pista deben seguir formato kebab-case único con prefijo de tema (`song-...`, `mus-...`). Cuando existen títulos homónimos entre artistas o géneros, se incluye el identificador de artista (`song-rosa-pastel-belanova`, `mus-grease-summer-nights`).
2. **Fin de Líneas en Entornos Mixtos:** En Windows (CRLF), las expresiones regulares y reemplazos de cadenas literales para inyecciones de código deben considerar o normalizar los saltos `\r\n` para evitar discrepancias silenciosas.
3. **Uso de `busca` vs `apple`:** La función `busca(artista, cancion)` es más resiliente ante cambios de ID en Apple Music para canciones populares que la codificación fija de ID numérico.
4. **Validación Automatizada Preventiva:** Ejecutar `node --check` junto con los scripts de validación (`scripts/validate-catalog.js` y `scripts/validate-musicales.js`) garantiza de forma infalible que no haya colisiones de ID, faltas de campos obligatorios o desbalances entre categorías o cuotas idiomáticas.
5. **Fuentes Reales y Auditoría en Red:** Los IDs de fuentes de audio (YouTube, Apple Music) JAMÁS se escriben a mano, se adivinan ni se inventan. Todo ID debe provenir de una búsqueda real. Además, el criterio de "terminado" exige una auditoría real contra la red (por ejemplo, vía `scripts/audit-sources.js`) que valide que la fuente existe y es incrustable, no solo que el código esté estructuralmente completo. Al modificar archivos en masa mediante expresiones regulares, es imperativo soportar variaciones en la indentación y saltos de línea (CRLF vs LF) para evitar omisiones silenciosas.
6. **Revisión por agentes antes de publicar (v2.1):** que una fuente "suene" no basta. Se cuelan versiones en vivo, recreaciones de fans, intros de España, Apple en japonés en pistas latinas, popurrís y compilaciones. Revisa el título, el canal, la duración y el álbum de la evidencia de cada fuente nueva antes de publicar. Si un doblaje solo existe en el de España, o si la pista repite la misma canción y serie que ya está en otro idioma, se quita en vez de dejarla.
