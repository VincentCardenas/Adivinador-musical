# Antigravity Memory - Adivinador Musical

## Arquitectura y Estructura del Sistema
* **Frontend Estático Modular:** La aplicación corre enteramente sobre Vanilla JS sin frameworks pesados, exponiendo módulos bajo el namespace global `window.AM`.
* **Catálogos por Temas:** 
  * `js/catalog-canciones.js` gestiona el catálogo de canciones famosas categorizadas en 11 géneros musicales (`song-rock`, `song-pop`, `song-rap`, `song-reggaeton`, `song-regional`, `song-baladas`, `song-electronica`, `song-cumbia`, `song-salsa`, `song-metal`, `song-kpop`).
  * Conteo consolidado bilingüe: **1,716 pistas totales**.
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
    * Conteo consolidado: **222 pistas totales** (200 en su grabación original y 22 en español).
      * **Clásicos (antes de 1970):** 56 canciones (`mus-clasicos`).
      * **70s y 80s:** 61 canciones (`mus-7080`).
      * **90s y 2000s:** 52 canciones (`mus-9000`).
      * **2010 en adelante:** 53 canciones (`mus-10s`).
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
    * Conteo consolidado: **251 pistas totales**.
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
  * `js/catalog-caricaturas.js` gestiona el catálogo de entradas de caricaturas en español latino por época (`toon-clasicas`, `toon-80s`, `toon-90s`, `toon-00s`, `toon-10s`).
    * Conteo consolidado: **295 pistas totales** (todas en doblaje latinoamericano oficial).
      * Distribuido en 5 épocas: Clásicas (antes de 1980), Años 80, Años 90, 2000s, 2010 en adelante.
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

## Convenciones y Lecciones Aprendidas
1. **Unicidad de Identificadores:** Todos los `id` de pista deben seguir formato kebab-case único con prefijo de tema (`song-...`, `mus-...`). Cuando existen títulos homónimos entre artistas o géneros, se incluye el identificador de artista (`song-rosa-pastel-belanova`, `mus-grease-summer-nights`).
2. **Fin de Líneas en Entornos Mixtos:** En Windows (CRLF), las expresiones regulares y reemplazos de cadenas literales para inyecciones de código deben considerar o normalizar los saltos `\r\n` para evitar discrepancias silenciosas.
3. **Uso de `busca` vs `apple`:** La función `busca(artista, cancion)` es más resiliente ante cambios de ID en Apple Music para canciones populares que la codificación fija de ID numérico.
4. **Validación Automatizada Preventiva:** Ejecutar `node --check` junto con los scripts de validación (`scripts/validate-catalog.js` y `scripts/validate-musicales.js`) garantiza de forma infalible que no haya colisiones de ID, faltas de campos obligatorios o desbalances entre categorías o cuotas idiomáticas.
5. **Fuentes Reales y Auditoría en Red:** Los IDs de fuentes de audio (YouTube, Apple Music) JAMÁS se escriben a mano, se adivinan ni se inventan. Todo ID debe provenir de una búsqueda real. Además, el criterio de "terminado" exige una auditoría real contra la red (por ejemplo, vía `scripts/audit-sources.js`) que valide que la fuente existe y es incrustable, no solo que el código esté estructuralmente completo. Al modificar archivos en masa mediante expresiones regulares, es imperativo soportar variaciones en la indentación y saltos de línea (CRLF vs LF) para evitar omisiones silenciosas.

