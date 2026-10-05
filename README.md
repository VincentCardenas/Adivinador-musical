# 🎵 ¿Qué suena? · Adivinador musical

Adivinador musical: suena un fragmento de música **oficial** y tienes que reconocer de dónde es. Hay siete temas:

| Tema | ¿Qué adivinas? | Categorías |
| --- | --- | --- |
| 🎮 **Videojuegos** | La saga y el juego (Halo, Zelda, Pokémon, Elden Ring…): 281 pistas de 127 sagas y 215 juegos | Nintendo, Xbox, PlayStation, Indie, Retro, RPG, Acción, Online |
| 📺 **Series** | La serie por su entrada o tema principal (Friends, Lost, Stranger Things, El Chavo…) | Por época: clásicas, 90s, 2000s, 2010s y 2020 en adelante |
| 🧸 **Caricaturas** | La caricatura por su entrada, en español latino cuando la hubo (Los Picapiedra, Bob Esponja, Hora de aventura…) | Por época: clásicas, 80s, 90s, 2000s y 2010 en adelante |
| 🎌 **Anime** | El anime por su opening: 56 openings famosos, de Caballeros del Zodiaco y Dragon Ball (en latino) a Evangelion, Death Note, Chainsaw Man o Frieren | Por época: clásicos, 90s, 2000s, 2010s y 2020 en adelante |
| 🏰 **Disney** | La película por sus canciones **en español latino** (El rey león, Frozen, Coco…) | Por época: clásicos, renacimiento, 2000s, 2010s y 2020 en adelante. Interruptor para incluir o quitar **Pixar** |
| 🎭 **Musicales** | De qué musical es (Clásico) o qué canción es (Experto y Supervivencia): 122 canciones de 58 musicales de teatro y cine, siempre con su nombre original (Grease, The Phantom of the Opera, Wicked, Hamilton, Six…), en su grabación original o en versiones en español famosas (Timbiriche, Camilo Sesto, el elenco de México, Mamma Mia! de Madrid…) | Por época: clásicos, 70s y 80s, 90s y 2000s y 2010 en adelante. Selector de idioma: **español, inglés o ambos** |
| 🎤 **Canciones** | Quién la canta (Clásico) o qué canción es (Experto y Supervivencia) | Por época: antes de 1980, 80s, 90s, 2000s, 2010s y 2020 en adelante. Selector de idioma: **español, inglés o ambos** |

Al terminar una partida puedes guardar tu puntaje con un **nickname** en el **ranking global** (uno por tema y modo).

Hecho con HTML, CSS y JavaScript puro (sin frameworks ni compilación).

## Modos de juego

| Modo | Cómo funciona |
| --- | --- |
| 🎯 **Clásico** | 10 rondas, 4 opciones y 20 s por ronda. Adivinas la respuesta "amplia": la saga del videojuego, la serie, la caricatura, la película, el musical o el artista que canta. Responder rápido da más puntos y las rachas multiplican (x1.5 con 3 aciertos seguidos, x2 con 5). |
| 🎧 **Experto** | Estilo Heardle. Empiezas con **1 segundo** de audio; cada fallo o salto desbloquea más (1 → 2 → 4 → 7 → 11 → 16 s). Hay que escribir la respuesta **exacta** (el juego, la película, la canción…); si aciertas la saga, el musical o el artista pero no la respuesta, te avisa con 🟨. En Musicales vale el título original o el de la versión en español (*Gethsemane* o *Getsemaní*). |
| ❤️ **Supervivencia** | Opciones con la respuesta exacta (¿Halo 2 o Halo 3? ¿Toy Story o Toy Story 2?), 3 vidas y el reloj se acorta cada 3 aciertos. |
| 🗂️ **Sagas** | Solo en Videojuegos. Eliges una saga (Super Mario, Zelda, Pokémon, Kirby, Donkey Kong, Sonic, Final Fantasy, Halo, Mega Man o Street Fighter) y adivinas **qué canción es** entre 4 opciones: de **toda la saga** (cada opción dice juego y canción, como *Halo 3 - One Final Effort* u *Ocarina of Time - Zelda's Lullaby*) o de **un solo juego** (solo el nombre de la canción; se puede elegir si el juego tiene al menos 5). 10 rondas (o una por canción si el juego tiene menos) y 20 s por ronda. Solo música original: nada de remakes ni remasters (Halo va de Combat Evolved a Reach). Tiene récord por saga, pero no entra al ranking global. |

Además puedes filtrar por categorías, guardar récords por tema y modo, compartir tu resultado con emojis
y, al final, ver la lista de lo que sonó con enlaces para escucharlo completo.

**Sin repeticiones:** el juego recuerda (en tu navegador) qué pistas ya escuchaste y siempre pone primero
las que te faltan, sin repetir la misma saga dos rondas seguidas ni más de 2 veces por partida. En el
inicio ves cuántas llevas y puedes reiniciar el historial.

Atajos: <kbd>1</kbd>–<kbd>4</kbd> para elegir, <kbd>Espacio</kbd> para repetir y <kbd>Enter</kbd> para seguir.

## Cómo abrirlo

El juego necesita abrirse **desde un servidor** (no con doble clic en `index.html`), porque YouTube no
reproduce videos incrustados en páginas `file://`.

**Opción 1: en tu computadora**

```bash
# dentro de la carpeta del proyecto
python3 -m http.server 8000
# o, si tienes Node:
npx serve .
```

Luego abre <http://localhost:8000>.

**Opción 2: publicarlo gratis con GitHub Pages**

1. En el repositorio, ve a **Settings → Pages**.
2. En *Source* elige **Deploy from a branch**, la rama que quieras publicar y la carpeta `/ (root)`.
3. En un minuto queda en `https://<tu-usuario>.github.io/Adivinador-musical/`.

## Ranking global

El ranking guarda los puntajes en [Supabase](https://supabase.com) (una base de datos con plan gratis).
**Ya está activado**: [`js/config.js`](js/config.js) apunta al proyecto de Supabase del juego. Si algún día
usas otro proyecto (o haces tu propia copia del juego), así se conecta:

1. Crea una cuenta gratis en <https://supabase.com> y un proyecto nuevo (cualquier nombre y región; guarda
   la contraseña de la base de datos en un lugar seguro, el juego no la necesita).
2. En el proyecto abre **SQL Editor → New query**, pega todo el contenido de
   [`supabase/schema.sql`](supabase/schema.sql) y dale **Run**. Eso crea la tabla `scores` con sus reglas.
3. Ve a **Project Settings → API Keys** (o al botón **Connect**) y copia:
   - la **Project URL** (algo como `https://abcdxyz.supabase.co`);
   - la llave **publishable** (empieza con `sb_publishable_…`; en proyectos viejos se llama `anon`).
4. Pégalas en [`js/config.js`](js/config.js), en `scoreboard.url` y `scoreboard.key`, y sube el cambio.

**Cuando el juego estrena un tema** (como Musicales en la v1.8), la base tiene que aceptar su nombre: vuelve a
correr [`supabase/schema.sql`](supabase/schema.sql) completo en el **SQL Editor** (se puede correr las veces que
quieras; no borra puntajes). Mientras no lo hagas, ese tema se juega normal pero su ranking avisa que todavía no
está activado.

> **Importante:** esa llave es pública a propósito (la ve cualquiera que abra el juego); lo que protege la
> tabla son las reglas de `schema.sql`. **Nunca** pongas en el juego la llave `secret` ni la `service_role`.

Qué permiten las reglas: cualquiera puede **ver** el ranking y **agregar** su puntaje, pero nadie puede
editar ni borrar desde el juego. La base rechaza nicknames raros (de 2 a 16 letras, números, espacios,
`.`, `_` o `-`), puntajes imposibles para cada modo y el spam (un mismo nickname no puede guardar dos
puntajes en menos de 20 s). Si alguien pone un nickname feo, bórralo desde **Table Editor → scores**.

Dos detalles del plan gratis de Supabase:

- Si el proyecto pasa **una semana sin uso**, Supabase lo pausa y el ranking deja de cargar. Se reactiva
  desde su panel con un clic (los datos no se pierden).
- Como el juego no tiene servidor propio, alguien con conocimientos podría mandar un puntaje inventado
  (dentro de los límites de cada modo). Para un juego entre amigos es suficiente; si pasa, borra la fila.

## ¿De dónde sale la música?

El juego **no incluye archivos de audio**: los reproduce desde fuentes oficiales al momento.

1. **Apple Music**: los previews oficiales de 30 s de los álbumes y soundtracks publicados por las
   disqueras y editoras (Microsoft, Sony, Walt Disney Records, etc.), obtenidos con la
   [iTunes Search API](https://performance-partners.apple.com/search-api). Las pistas nuevas usan la
   tienda de México (`country: 'mx'`), donde están los doblajes latinos de Disney.
2. **YouTube**: para lo que no está en Apple Music (como casi todo Nintendo o muchas entradas de
   caricaturas en español latino), se usa un reproductor de YouTube oculto con la
   [IFrame API](https://developers.google.com/youtube/iframe_api_reference).

Cada pista tiene varias fuentes de respaldo. Si una deja de existir (por ejemplo, un video que borran),
el juego prueba la siguiente y, si ninguna sirve, cambia de pista sola sin que cuente la ronda.

**Volumen parejo:** [`js/loudness.js`](js/loudness.js) guarda el volumen medido de cada fuente (en LUFS:
los previews de Apple medidos con ffmpeg y los videos con el dato que publica YouTube) y el reproductor
baja las que suenan más fuerte para que todas queden a un nivel parecido. Solo baja, nunca sube: un video
muy bajito se sigue oyendo bajito. Una pista nueva sin medir usa un ajuste promedio.

### Verificar el catálogo

Abajo de la página está **🛠 Verificar catálogo**: prueba en silencio todas las pistas en tu navegador y
te dice cuáles suenan y desde qué fuente. El botón *Copiar reporte* te da una lista que puedes usar para
arreglar o reemplazar las que fallen.

## Reportar una canción

Si una pista está mal (es de otro juego, es otra canción, es un cover o no suena), en la revelación de la
ronda y en la lista de resultados está el botón **🚩 Reportar canción**. Ahí se elige qué pasó y, si lo
sabes, de qué juego o qué canción era en realidad.

- **Enviar reporte** abre un *issue* de GitHub ya rellenado con la plantilla
  [`.github/ISSUE_TEMPLATE/reporte-cancion.yml`](.github/ISSUE_TEMPLATE/reporte-cancion.yml)
  (quien reporta necesita una cuenta de GitHub gratis). Todos los reportes quedan en la pestaña
  **Issues** del repositorio con el título `[Reporte] …`, listos para corregir el catálogo. Si creas la
  etiqueta `reporte-cancion` (Issues → Labels → New label), GitHub se la pone sola a cada reporte.
- **Solo guardar aquí** lo deja en el navegador; desde **🚩 Mis reportes** (abajo de la página) se pueden
  enviar después o copiar todos para mandarlos por otro lado.
- Por defecto, la pista reportada se oculta para ese jugador. Desde *Mis reportes* se pueden volver a mostrar.

El repositorio que recibe los reportes se configura en [`js/config.js`](js/config.js).

## Agregar o cambiar pistas

Cada tema tiene su archivo de catálogo:

| Tema | Archivo | `franchise` (Clásico) | `game` (Experto/Supervivencia) |
| --- | --- | --- | --- |
| Videojuegos | [`js/catalog.js`](js/catalog.js) | saga | juego |
| Series | [`js/catalog-series.js`](js/catalog-series.js) | serie | serie |
| Caricaturas | [`js/catalog-caricaturas.js`](js/catalog-caricaturas.js) | caricatura | caricatura |
| Anime | [`js/catalog-anime.js`](js/catalog-anime.js) | saga (Dragon Ball) | anime (Dragon Ball Z) |
| Disney | [`js/catalog-disney.js`](js/catalog-disney.js) | saga (Toy Story) | película (Toy Story 2) |
| Musicales | [`js/catalog-musicales.js`](js/catalog-musicales.js) | musical (Wicked) | canción (Defying Gravity) |
| Canciones | [`js/catalog-canciones.js`](js/catalog-canciones.js) | artista | canción |

Los temas (nombres, textos, filtros y rangos) están en [`js/themes.js`](js/themes.js). Cada pista se ve así:

```js
{
  id: 'hk-greenpath',            // único
  cat: 'indie',                  // nintendo | xbox | playstation | indie | retro | rpg | accion | online
  franchise: 'Hollow Knight',    // respuesta del modo Clásico
  game: 'Hollow Knight',         // respuesta de Experto y Supervivencia
  title: 'Greenpath',
  composer: 'Christopher Larkin', year: 2017, platform: 'PC / Switch',
  sources: [
    apple({ album: 1263341718, match: 'Greenpath' }), // canción dentro de un álbum de Apple Music
    yt('fWquuWkHVP4'),                                // respaldo: video de YouTube
  ],
},
```

Campos opcionales: `aka` (otros nombres que acepta el buscador de Experto, por ejemplo
`aka: ['Knight Rider']` en *El auto fantástico*; en Musicales, el título de la otra versión de la canción, y así
el buscador acepta cualquiera de los dos), `lang: 'es' | 'en'` en Canciones y Musicales (para el filtro de idioma
y para que las opciones vayan en el mismo idioma que la canción) y `pixar: true` en Disney (para el
interruptor de Pixar). En Musicales, el musical va **siempre con su nombre original** (*The Phantom of the Opera*, nunca *El fantasma
de la ópera*), aunque la pista sea de una versión en español; los nombres con que se conoce en español (*Vaselina*
para *Grease*) van en `AM.FRANCHISE_AKA`, al principio de [`js/catalog-musicales.js`](js/catalog-musicales.js):
con ellos el buscador de Experto lista sus canciones, pero nunca se muestran como respuesta. Las pistas de un DLC o expansión van con el nombre del juego base y el del DLC en
`aka` (como *Wrath of the Lich King* en *World of Warcraft*). En los catálogos nuevos cada categoría lleva
`theme` para saber a qué tema pertenece.

Tipos de fuente (se prueban **en el orden en que aparecen**):

- `apple({ song: ID })`: una canción de Apple Music por su ID (el número después de `?i=` o al final de
  `music.apple.com/.../song/...`).
- `apple({ album: ID, match: 'Nombre' })`: busca la canción por nombre dentro de un álbum
  (el número al final de `music.apple.com/.../album/...`). `match` también acepta una lista de nombres.
- `apple({ term: 'texto', artist: 'Compositor', match: 'Nombre' })`: búsqueda libre filtrada por artista.
- `apple({ ..., country: 'jp' })`: para álbumes que solo están en la tienda de otro país.
- `yt('ID_DEL_VIDEO', segundoDeInicio)`: el ID es lo que va después de `watch?v=`.

Para que una respuesta aparezca como opción incorrecta o en el buscador de Experto sin tener pista,
agrégala a `AM.EXTRA_GAMES` al final del mismo archivo (en los catálogos nuevos, con su `theme`).
Los remakes y ediciones que se venden aparte (*Persona 3* y *Persona 3 Reload*) van en `AM.VERSIONS`,
al final de [`js/catalog.js`](js/catalog.js): siguen siendo respuestas distintas, pero nunca salen juntas como opciones.

## Estructura

```
index.html                Pantallas: inicio, partida, resultados y diálogos
css/styles.css            Estilos (estética arcade/synthwave, responsive)
js/config.js              Versión, repositorio de reportes y conexión del ranking (Supabase)
js/catalog.js             Videojuegos: pistas, categorías y juegos "señuelo"
js/catalog-series.js      Series de TV por época
js/catalog-caricaturas.js Caricaturas por época
js/catalog-anime.js       Openings de anime por época
js/catalog-disney.js      Disney y Pixar (español latino) por época
js/catalog-musicales.js   Musicales de teatro y cine (originales y en español) por época
js/catalog-canciones.js   Canciones famosas por época e idioma
js/catalog-sagas.js       Modo Sagas: las 10 sagas y sus canciones extra (generado)
js/themes.js              Los 7 temas: textos, filtros (Pixar, idioma) y rangos
js/sources.js             Resuelve cada pista a un preview de Apple o un video de YouTube
js/loudness.js            Volumen medido de cada fuente (generado) para que todo suene parejo
js/engine.js              Reproductor unificado (<audio> + YouTube oculto), volumen parejo, cortes de clip y fallos
js/sfx.js                 Efectos de sonido de la interfaz, sintetizados con Web Audio
js/game.js                Reglas: modos, opciones, puntaje y textos de resultado
js/scores.js              Ranking global (API REST de Supabase)
js/app.js                 Interfaz y flujo de la partida, historial, reportes, ranking y verificación
supabase/schema.sql       Tabla y reglas del ranking global
.github/ISSUE_TEMPLATE/reporte-cancion.yml   Formulario de GitHub para los reportes
```

## Versiones

La versión actual se ve en la esquina inferior izquierda del juego. Para publicar una nueva, cambia
`version` en [`js/config.js`](js/config.js) y los `?v=` de `index.html` (así los navegadores descargan los
archivos nuevos en vez de usar los guardados en caché).

- **1.8.1**: en Musicales, cada musical vuelve a su **nombre original** (*The Phantom of the Opera*, *Grease*,
  *West Side Story*, *The Sound of Music*, *Les Misérables*, *KPop Demon Hunters*…); el nombre en español solo sirve
  para buscarlo en Experto (*vaselina* lista las de *Grease*). Repertorio ampliado de 85 a **122 canciones** y de 37 a
  **58 musicales**: *Oklahoma!*, *The King and I*, *Joseph*, *The Wiz*, *Godspell*, *A Chorus Line*, *Sweeney Todd*,
  *Into the Woods*, *Miss Saigon*, *Legally Blonde*, *tick, tick... BOOM!*, *The Book of Mormon*, *Six*, *Hadestown*,
  *Beetlejuice*, *Matilda the Musical*, *Kinky Boots*, *Waitress*, *Mean Girls*, *Heathers* y *Wonka*, más canciones
  de los que ya estaban y 5 versiones en español nuevas (*Sonrisas y lágrimas* y *Mamma Mia!* de Madrid, *Mentiras* y
  *Hoy no me puedo levantar*). Cada pista suena solo en la grabación que dice su ficha (se quitaron respaldos de otras
  versiones).
- **1.8**: tema nuevo **🎭 Musicales**: 85 canciones de 37 musicales de teatro y cine (nada de Disney, que tiene
  su propio tema), por época y con selector de idioma. 70 suenan en su grabación original (Broadway, Londres o la
  película) y 15 en versiones en español: *Vaselina* de Timbiriche, *Jesucristo Superstar* de Camilo Sesto,
  *Evita* con Paloma San Basilio, *El fantasma de la ópera* con el elenco de México, *Mentiras*, *Mamma Mia!* de
  Madrid y el doblaje de *Las guerreras K-pop*. En Clásico adivinas el musical; en Experto y Supervivencia, la
  canción (el buscador acepta el título original o el de la versión en español, y también el otro nombre del
  musical: *grease* lista las de *Vaselina*). Las pistas nuevas usan el volumen promedio hasta que se midan. Para
  su ranking hay que volver a correr `supabase/schema.sql`.
- **1.7.2**: en Sagas con toda la saga, las opciones dicen el juego y la canción (*Halo 3 - One Final
  Effort*); los nombres muy largos se acortan (*Ocarina of Time - …* en vez de *The Legend of Zelda:
  Ocarina of Time - …*).
- **1.7.1**: en Sagas, de los videos de cada canción suena primero el más fuerte (los muy bajitos no se
  pueden subir), y Kirby deja fuera *Triple Deluxe*: su *Masked Dedede's Theme* usa la melodía de
  *King Dedede's Theme* y confundía como opción.
- **1.7**: modo **Sagas** (solo Videojuegos): eliges una de 10 sagas y adivinas qué canción es, de toda la
  saga o de un solo juego. 184 canciones nuevas solo para este modo, todas de los soundtracks originales
  (nada de remakes ni remasters; Halo va de *Combat Evolved* a *Reach*). Además, varias pistas que buscaban
  su audio en Apple por nombre y a veces caían en covers (arpa, *Distant Worlds*, *The Greatest Bits*…)
  ahora apuntan directo al soundtrack oficial, y *Answers* (FF XIV) vuelve a sonar.
- **1.6**: el **ranking global** queda activado (Supabase).
- **1.5**: el anime pasa a ser su **propio tema**, por época; **volumen parejo** entre pistas (se mide cada
  fuente y se bajan las que suenan más fuerte); se quitan 42 videos de YouTube que ya no existen (4 pistas de
  Nintendo que se habían quedado sin audio tienen videos nuevos).
- **1.4**: correcciones de los reportes: si el audio se queda cargando a media ronda, el reloj se pausa
  (y si sigue trabado, se prueba otra fuente); las opciones de Canciones van en el idioma de la canción que
  suena; los DLC cuentan como su juego (*Wrath of the Lich King* → *World of Warcraft*) y ya no salen
  juntas dos versiones del mismo juego (*Persona 4* / *Persona 4 Golden*, *Halo 3* / *ODST*…).
- **1.3**: categoría **Openings de anime** (56 openings famosos, con audio oficial); el título del juego pasa a ser **¿Qué suena?**; correcciones de los reportes: Destiny suena *The Traveler* en vez de la canción de los créditos, Breaking Bad usa su entrada real, *La chica de ayer* en versión de estudio y *Labios rotos* en su época correcta (2011).
- **1.2**: nuevos temas: series, caricaturas, películas de Disney (en español latino, con interruptor
  de Pixar) y canciones famosas (con selector de idioma), todos por época; ranking global con nickname
  (Supabase); récords por tema y modo.
- **1.1**: repertorio ampliado de 54 a 281 pistas con juegos de Metacritic, OpenCritic y SteamCharts;
  búsqueda estricta en Apple Music (descarta covers y remixes); categoría Online y multijugador; el juego recuerda lo que ya escuchaste para no repetir; botón para reportar canciones;
  versión visible en pantalla.
- **1.0**: primera versión: 54 pistas, modos Clásico, Experto y Supervivencia, y verificación del catálogo.

## Aviso

Proyecto de fans sin fines comerciales. La música y los nombres de los juegos, series, caricaturas,
películas y canciones pertenecen a sus artistas, compositores, editoras y estudios. El juego no aloja ni descarga audio: solo reproduce los previews
públicos de Apple Music y videos de YouTube, con enlaces a la fuente original.
