# 🎮 ¿Qué juego suena?

Adivinador musical para gamers: suena un fragmento del **soundtrack oficial** de un videojuego y
tienes que reconocer de cuál es. Halo, Gears of War, Hollow Knight, Mario, Kirby, Zelda, Pokémon,
Final Fantasy, Elden Ring, Undertale, DOOM, League of Legends, Baldur's Gate 3 y más: **281 pistas de
127 sagas y 215 juegos**, elegidos a partir de Metacritic, OpenCritic, SteamCharts y listas de los mejores
soundtracks.

Hecho con HTML, CSS y JavaScript puro (sin frameworks ni compilación).

## Modos de juego

| Modo | Cómo funciona |
| --- | --- |
| 🎯 **Clásico** | 10 rondas, 4 opciones de saga y 20 s por ronda. Responder rápido da más puntos y las rachas multiplican (x1.5 con 3 aciertos seguidos, x2 con 5). |
| 🎧 **Experto** | Estilo Heardle. Empiezas con **1 segundo** de audio; cada fallo o salto desbloquea más (1 → 2 → 4 → 7 → 11 → 16 s). Hay que escribir el **juego exacto**; si aciertas la saga pero no el juego, te avisa con 🟨. |
| ❤️ **Supervivencia** | Opciones con el juego exacto (¿Halo 2 o Halo 3?), 3 vidas y el reloj se acorta cada 3 aciertos. |

Además puedes filtrar por categorías (Nintendo, Xbox, PlayStation, Indie, Retro, RPG, Acción, Online),
guardar récords por modo, compartir tu resultado con emojis y, al final, ver la lista de lo que sonó con
enlaces para escucharlo completo.

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

## ¿De dónde sale la música?

El juego **no incluye archivos de audio**: los reproduce desde fuentes oficiales al momento.

1. **Apple Music**: los previews oficiales de 30 s de los álbumes de soundtrack publicados por las
   editoras (Microsoft, Sony, Square Enix, etc.), obtenidos con la
   [iTunes Search API](https://performance-partners.apple.com/search-api).
2. **YouTube**: para los soundtracks que no están en Apple Music (como casi todo Nintendo), se usa un
   reproductor de YouTube oculto con la [IFrame API](https://developers.google.com/youtube/iframe_api_reference).

Cada pista tiene varias fuentes de respaldo. Si una deja de existir (por ejemplo, un video que borran),
el juego prueba la siguiente y, si ninguna sirve, cambia de pista sola sin que cuente la ronda.

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

Todo el catálogo está en [`js/catalog.js`](js/catalog.js). Cada pista se ve así:

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

Tipos de fuente (se prueban en orden):

- `apple({ song: ID })`: una canción de Apple Music por su ID (el número después de `?i=` o al final de
  `music.apple.com/.../song/...`).
- `apple({ album: ID, match: 'Nombre' })`: busca la canción por nombre dentro de un álbum
  (el número al final de `music.apple.com/.../album/...`). `match` también acepta una lista de nombres.
- `apple({ term: 'texto', artist: 'Compositor', match: 'Nombre' })`: búsqueda libre filtrada por artista.
- `apple({ ..., country: 'jp' })`: para álbumes que solo están en la tienda de otro país.
- `yt('ID_DEL_VIDEO', segundoDeInicio)`: el ID es lo que va después de `watch?v=`.

Para que un juego aparezca como opción incorrecta o en el buscador de Experto sin tener pista,
agrégalo a `AM.EXTRA_GAMES` al final del mismo archivo.

## Estructura

```
index.html        Pantallas: inicio, partida, resultados y diálogos
css/styles.css    Estilos (estética arcade/synthwave, responsive)
js/config.js      Repositorio de GitHub que recibe los reportes
js/catalog.js     Pistas, categorías y juegos "señuelo"
js/sources.js     Resuelve cada pista a un preview de Apple o un video de YouTube
js/engine.js      Reproductor unificado (<audio> + YouTube oculto), cortes de clip y fallos
js/sfx.js         Efectos de sonido de la interfaz, sintetizados con Web Audio
js/game.js        Reglas: modos, opciones, puntaje y textos de resultado
js/app.js         Interfaz y flujo de la partida, historial, reportes, visualizador y verificación
.github/ISSUE_TEMPLATE/reporte-cancion.yml   Formulario de GitHub para los reportes
```

## Versiones

La versión actual se ve en la esquina inferior izquierda del juego. Para publicar una nueva, cambia
`version` en [`js/config.js`](js/config.js) y los `?v=` de `index.html` (así los navegadores descargan los
archivos nuevos en vez de usar los guardados en caché).

- **1.1**: repertorio ampliado de 54 a 281 pistas con juegos de Metacritic, OpenCritic y SteamCharts;
  búsqueda estricta en Apple Music (descarta covers y remixes); categoría Online y multijugador; el juego recuerda lo que ya escuchaste para no repetir; botón para reportar canciones;
  versión visible en pantalla.
- **1.0**: primera versión: 54 pistas, modos Clásico, Experto y Supervivencia, y verificación del catálogo.

## Aviso

Proyecto de fans sin fines comerciales. La música y los nombres de los juegos pertenecen a sus
compositores, editoras y estudios. El juego no aloja ni descarga audio: solo reproduce los previews
públicos de Apple Music y videos de YouTube, con enlaces a la fuente original.
