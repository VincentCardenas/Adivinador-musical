Eres el encargado del catálogo de "Adivinador musical" (repositorio VincentCardenas/Adivinador-musical): un juego web en JavaScript puro (window.AM) donde se adivina de qué videojuego, serie, caricatura, anime, película de Disney o musical es una canción. Lo juega gente de México.

Tienes internet: úsalo para comprobar cada fuente de audio de verdad. Por eso te toca este encargo: en sesiones anteriores, sin internet, se inventaron IDs de audio y hubo que repararlos. No puedes oír el audio, así que lo que solo se decide oyendo lo dejas anotado para el usuario.

## 0. Antes de empezar
1. Con git status limpio (si no lo está, detente y avisa): git fetch origin y crea la rama antigravity/v2.1-catalogo desde origin/claude/clever-sagan-5xuvc1. Esa rama tiene main más 30 series nuevas sin comprobar.
2. Lee antigravity_memory.md, planificacion_proyecto.md, la sección del README sobre cómo agregar pistas, js/themes.js, js/sources.js y el encabezado de cada catálogo. Sus reglas siguen vigentes.
3. Para probar el juego: node scripts/server.js (puerto 8080). No funciona con file://.

## Reglas que no se rompen
- NUNCA escribas, adivines ni completes de memoria un ID de YouTube o de Apple. Cada ID sale de una búsqueda real que hiciste ahora, y lo compruebas así:
  - YouTube: oEmbed responde 200 y, en la página watch?v= (ytInitialPlayerResponse), playabilityStatus.status es "OK" y playableInEmbed no es false. oEmbed no detecta videos bloqueados en México, con restricción de edad o sin permiso para insertarse; así fallaron #11 y #18. Además, el título y el canal corresponden a la pista y videoDetails.lengthSeconds es razonable.
  - Apple: el lookup, con el mismo country que pondrás en la fuente, devuelve previewUrl, y el título y el artista corresponden. En los temas en español usa mx. Puedes consultar en lotes: id=1,2,3…, unos 100 por consulta.
  - Guarda cada comprobación en scripts/evidencia-v2.1.json, por ID: consulta, título, canal o artista, álbum, duración, país, resultado y fecha. Claude revisa sin internet que cada ID nuevo o cambiado esté ahí. Los IDs de scripts/.yt-cache.json salieron de búsquedas reales, pero vuelve a comprobarlos.
- Este encargo es solo de catálogo y scripts. No cambies js/sources.js (ni sus umbrales), engine.js, game.js, app.js, themes.js ni loudness.js; loudness.js es generado y las pistas nuevas usan el volumen de respaldo. Si encuentras un bug, anótalo en el reporte.
- No toques el tema Canciones: js/catalog-canciones.js, sus scripts y sus lotes.
- De los scripts que ya existen, corre solo validate-*.js, audit-sources.js y build-series-gemini.js. Ningún otro apply-*, build-*, prepare-* o insert-*, ni resolve-sources.js ni audit-dynamic-sources.js: reescriben catálogos o lotes, algunos con IDs inventados. Sí puedes copiar sus funciones (por ejemplo, search() de resolve-sources.js).
- Edita los catálogos insertando texto al final de su sección, como build-series-gemini.js. Nunca regeneres un archivo entero desde el objeto cargado: se pierden busca, buscaTv, am, los comentarios y el formato. Mantén LF (normaliza \r\n al leer).
- No renombres IDs existentes: el historial de los jugadores y los reportes dependen de ellos. Los IDs nuevos van en kebab-case con el prefijo del tema (tv-, toon-, ani-, dis-, mus-, saga-; en Videojuegos sin prefijo: juego-canción) y son únicos en todo AM.CATALOG más AM.SAGA_TRACKS.
- Fuera de Canciones, cada `game` tiene siempre la misma `franchise` dentro de su tema. No crees categorías nuevas.
- Señuelos: si una pista nueva es de algo que estaba como señuelo en AM.EXTRA_GAMES (Sabrina, Glee, Cobra Kai…), quita ese señuelo. No limpies otros: en Videojuegos y Musicales repetir es normal. Conserva pixar y lang en los señuelos. Los remakes van en AM.VERSIONS (y en excludeGames de su saga).
- Actualiza todas las cuentas:
  - "(N pistas)" del encabezado. catalog.js no lo tiene; Musicales trae además "N en su grabación original y M en español".
  - "(N)" de cada sección. Sagas no las tiene; su total va en "Archivo generado (N canciones)".
  - El 222 de validate-musicales.js.
  - La tabla del inicio del README y las cifras de antigravity_memory.md.
- Reglas de cada tema:
  - Caricaturas: primero la entrada en español latino del doblaje oficial cuando existe; Apple queda de respaldo.
  - Anime: los clásicos que pasaron doblados en la tele de México llevan su opening latino oficial; los demás, el opening original. Nunca fandubs, covers ni "versión de…".
  - Disney: el doblaje latino de la película (no el de España ni la versión pop de los créditos); pixar: true cuando aplique.
  - Musicales:
    - lang es obligatorio;
    - franchise es el nombre original del musical, y los nombres en español van en AM.FRANCHISE_AKA;
    - la época va por el estreno del musical (year es el de la grabación);
    - las versiones en español llevan el título con que se grabaron y, en aka, el original.
  - Videojuegos y Sagas: solo música original del juego, nada de covers, remixes ni arreglos. En Sagas:
    - prefiere canales "- Topic" y pon primero el video que suena más fuerte (playerConfig.audioConfig.loudnessDb de la página, si viene);
    - cuentan las pistas de catalog.js más las de SAGA_TRACKS, y hoy 13 juegos tienen menos de 5;
    - cada juego debe tener al menos 5 pistas con distinto nombre;
    - no agregues juegos que estén en excludeGames ni repitas canciones de catalog.js.
  - Series: la entrada tal como se transmitió en México.
- Peticiones a internet:
  - YouTube: como mucho 1 búsqueda por segundo y 2 consultas de oEmbed o de página por segundo. Si responde 429 o pide captcha, para 5 minutos.
  - iTunes: como mucho unas 20 consultas por minuto. Si responde 403, espera y reintenta.
  - Guarda caché para poder reanudar.
- Haz commit y push al terminar la fase 1, la fase 2 y cada tema de la fase 3. En cada commit deben pasar los pasos 1 a 3 de la fase 4. Escribe los mensajes en español y pon "Fixes #N" cuando un commit arregle un issue: GitHub solo cierra issues con palabras en inglés.
- Sube solo a antigravity/v2.1-catalogo. No subas a main, no abras ni fusiones PRs, y no comentes ni cierres issues: Claude revisa la rama antes de pasarla a main.

## Si no te alcanza para todo
Ve en este orden:
1. Issues #8 a #18.
2. Pistas muertas.
3. Las 30 series.
4. Series nuevas.
5. toon-20s, dis-2020s, dis-clasica y musicales en español.
6. El resto de la fase 3.
7. Sagas.
8. Dudosas que nadie reportó.

Detente siempre en un punto limpio: commit, push y reporte con lo que falta. Si no terminas, no subas la versión; Claude lo hace.

## Fase 1. Auditoría de red de todo el catálogo (menos Canciones)
Crea scripts/audit-red.js <juegos|sagas|series|caricaturas|anime|disney|musicales|todos>. Debe:
- Probar cada fuente:
  - yt: las comprobaciones de YouTube de arriba.
  - apple song: lookup con previewUrl y coherencia de título y artista.
  - apple album/term (incluidos buscaTv, busca y amAlbum): usa la lógica REAL de js/sources.js; no la copies a mano (audit-dynamic-sources.js la copió mal y nunca evaluó nada).
- Para usar esa lógica real, como resolveItunes no se exporta:
  1. En un vm, carga config.js, los catálogos en el orden de index.html, catalog-sagas.js, themes.js (pone t.theme) y sources.js.
  2. Pásale setTimeout y clearTimeout, y un document falso: createElement devuelve { remove() {} }, y head.appendChild(script) hace fetch de script.src y llama window[callback](json), o script.onerror() si falla.
  3. Llama AM.Sources.resolve() con una copia de la pista que solo tenga la fuente que pruebas y un id único.
  El cubo de fichas de sources.js ya limita Apple a unas 19 por minuto: no consultes Apple desde otro proceso al mismo tiempo.
- Clasificar cada pista por la fuente que el juego tocaría primero:
  - ok;
  - dudosa: el título o el canal apuntan a otra serie o juego; dicen cover, fandub, remix, reacción, extended o compilación; no dicen latino o español cuando debe ser doblaje; o dura menos de 20 s o más de 10 min;
  - muerta: no queda ninguna fuente que suene.
- Escribir scripts/audit-red-report.json y ser reanudable con caché.

Córrelo con todos y guarda las cifras de "antes" para el reporte.

## Fase 2. Arreglar errores
1. Muertas y dudosas de la fase 1:
   - Busca una fuente real que funcione y corresponda.
   - Si no hay forma, quita la pista y guarda su bloque completo con el motivo en scripts/pendientes-v2.1.json.
   - No cambies una fuente que pasa la auditoría solo porque encontraste otra "mejor": cambia lo muerto, lo reportado y lo claramente equivocado. Cada video que cambias pierde su volumen medido.
2. Los 11 issues abiertos, #8 a #18. No tienen etiqueta; aquí está todo lo que necesitas. Puedes cambiar title, composer y aka para que describan la versión que suena; el id, nunca. Las pistas que empiezan con toon- en #12, #13 y #14 están en js/catalog-anime.js.
   - #8 dis-hercules-no-importa-la-distancia: Apple toca una versión que no es la de la película. Busca la del doblaje latino de la película.
   - #9 tv-los-soprano-woke-up-this-morning: piden la versión recortada de la entrada de la tele. En la tele sonaba la "Chosen One Mix" de Alabama 3; compruébalo.
   - #10 toon-los-padrinos-magicos-los-padrinos-magicos-tema: el video kFjexH-badI es otra versión. Busca la entrada latina de la tele.
   - #11 tv-sex-and-the-city-sex-and-the-city-theme: el video X453aKQgob4 no sonó.
   - #12 toon-inuyasha-change-the-world: piden la versión en español latino.
   - #13 toon-yu-yu-hakusho-sonrisa-explosiva: la música tarda unos 10 s en empezar. Usa yt(id, segundo_de_inicio) u otro video.
   - #14 toon-dragon-ball-gt-mi-corazon-encantado: Apple no es la versión de la tele. Busca la latina de TV de Aaron Montalvo, no una regrabación.
   - #15: reporte viejo de Caricaturas con IDs inventados que ya se quitaron. Confirma que no queda ninguno y dilo en el reporte.
   - #16 ani-blue-seed-carnival-babel: la música empieza tarde y se acaba el tiempo. Usa un segundo de inicio u otro video.
   - #17 dis-mulan-reflejo: Apple toca otra versión. El campo composer dice quién canta en la película (Lucero): busca esa grabación.
   - #18 toon-shuriken-school-tema: el video WTQ_bj6T14g no sonó.
3. Vuelve a resolver las 16 pistas que se retiraron en la reparación anterior. Sus bloques están en scripts/backups/catalog-{anime,caricaturas}.pre-fix.js, pero sus IDs de audio son inventados: NO los uses. Para 10 de ellas, scripts/pendientes-{anime,caricaturas}.json trae el mejor candidato real que quedó dudoso (revision.dudosas[].elegido); puedes partir de ahí, comprobándolo de nuevo. Regresa solo las que consigan fuente real. Las pistas son:
   - Anime: ani-trigun-ht, ani-inuyasha-i-am, ani-katekyo-hitman-reborn-88, ani-ranking-of-kings-boy, ani-ranking-of-kings-naked-hero.
   - Caricaturas: toon-dinamita-perro-maravilla-tema, toon-frankenstein-jr-los-imposibles-tema, toon-simiolon-y-la-pandilla-tema, toon-dinosaurios-extremos-tema, toon-mighty-max-serie-tema, toon-dibo-el-dragon-de-los-deseos-tema, toon-capitan-n-el-amo-del-juego-tema, toon-el-zorro-1997-serie-tema, toon-fantasma-2040-tema, toon-oggy-y-las-cucarachas-tema, toon-el-chavo-animado-tema.
4. Las 30 series que agregó scripts/build-series-gemini.js usan buscaTv sin comprobar. Confirma con la lógica real que cada búsqueda encuentra la grabación correcta y no un cover. Si no:
   - ajusta match, artist y album_hint, o cambia a un video real de YouTube;
   - si nada sirve, quítala y pásala a DESCARTADAS en build-series-gemini.js con el motivo.

## Fase 3. Agregar música (empieza por Series)
Pistas NUEVAS por categoría (ya calculadas: 20 % de lo que hay hoy):

| Tema | Categoría (hoy → nuevas) |
|---|---|
| Series | Meta final de 192 pistas (hoy 122, así que +70). Reparto orientativo (±5): tv-clasicas +6, tv-90s +12, tv-00s +18, tv-10s +20, tv-20s +14 |
| Caricaturas | toon-clasicas 49→+10, toon-80s 50→+10, toon-90s 63→+13, toon-00s 69→+14, toon-1014 32→+7, toon-1519 28→+6, toon-20s 5→+5 |
| Anime | anime-clasicos 48→+10, anime-90s 49→+10, anime-00s 49→+10, anime-10s 54→+11, anime-20s 51→+11 |
| Disney | dis-clasica 13→+5, dis-renacimiento 19→+4, dis-2000s 15→+3, dis-2010s 16→+4, dis-2020s 8→+5 |
| Musicales | mus-clasicos 56→+12, mus-7080 61→+13, mus-9000 52→+11, mus-10s 53→+11. De las nuevas, al menos 3 en mus-clasicos y 3 en mus-10s en español (lang 'es'), para que esas épocas se puedan jugar solo en español |
| Videojuegos | nintendo 57→+12, xbox 22→+5, playstation 34→+7, indie 41→+9, retro 24→+5, rpg 46→+10, accion 31→+7, online 26→+6 |
| Sagas (SAGA_TRACKS) | 184→+37, repartidas entre las sagas; primero los juegos con menos de 5 pistas |

Cómo se cuentan las metas:
- Las 16 recuperadas en la fase 2 cuentan para la meta de su categoría.
- Lo que quites en la fase 2 no se repone aparte, salvo en Series.

Criterios para cada pista nueva:
- Muy reconocible para gente de México.
- No está ya en ese tema, ni con otro nombre ni como otra versión de la misma canción.
- Sigue el formato y las reglas del tema, y su fuente se comprobó de verdad.
- Desde su segundo de inicio suenan al menos 20 s de música reconocible: Clásico da 20 s y Experto llega a 16. En Apple no se puede elegir dónde empieza; si el preview no arranca en lo reconocible, usa YouTube y prefiere videos "TV size" (~1:30) que empiecen directo.
- Todo lo que solo se decide oyendo (versión, segundo de inicio) va anotado con su enlace (&t=) en scripts/revisar-a-oido.md, para que el usuario lo escuche. Ninguna pista usa todavía segundo de inicio: comprueba en el navegador que el clip arranque ahí.
- Si una categoría no llega a la meta con pistas que cumplan todo, no rellenes: deja menos y explícalo en el reporte.

Para Series, además:
- Solo ficción de imagen real, telenovelas incluidas: nada de caricaturas, anime, reality ni concursos. ALF y Dinosaurios ya están y se quedan, pero no agregues más series de títeres.
- Una entrada por serie, con su nombre en México y el título original en aka.
- No repitas las 50 de scripts/series-gemini-1.json, que ya se revisaron. Excepción: Walker, Texas Ranger; Sabrina, la bruja adolescente y Dos hombres y medio se descartaron solo por no tener audio en Apple; agrégalas si encuentras su entrada real en YouTube.

Agrega las pistas con scripts reanudables como scripts/build-series-gemini.js, que no dupliquen nada si se vuelven a correr.

Si te sobra tiempo: agrega un respaldo comprobado a las pistas que tienen una sola fuente.

## Fase 4. Comprobación final (los pasos 1 a 3 van en cada commit)
1. node --check en cada archivo de js/.
2. Carga todos los catálogos en un vm y comprueba:
   - 0 IDs repetidos y las cuentas de los encabezados coinciden;
   - fuera de Canciones, ningún game tiene dos franchise en su tema (Canciones tiene 21 a propósito: no las toques);
   - node scripts/validate-catalog.js sigue dando 1816;
   - git diff origin/claude/clever-sagan-5xuvc1 -- js/catalog-canciones.js sale vacío.
3. Estos validadores pasan: node scripts/validate-anime.js --offline, node scripts/validate-caricaturas.js --offline y node scripts/validate-musicales.js.
4. node scripts/audit-red.js todos da 0 muertas. Cada dudosa que quede la revisaste a mano y está en scripts/audit-red-revisadas.json con su motivo. No ajustes la heurística para que pasen.
5. En el navegador, con el juego servido:
   - cada tema muestra sus categorías con las cuentas nuevas;
   - empieza una partida en cada tema y en Sagas, sin errores en la consola;
   - en "🛠 Verificar catálogo" (al pie de la página), prueba cada tema que cambiaste con "Todo" en Música, y en Sagas una vez por saga;
   - guarda los reportes en scripts/verificar-v2.1/; si copiar no funciona, guarda los renglones ❌.
6. Solo si terminaste todo, sube la versión a 2.1:
   - js/config.js (version);
   - todos los ?v= de index.html;
   - una entrada en el historial del README, arriba de 2.0, que diga qué se arregló, qué se agregó por tema y qué issues se arreglaron.
7. Anota en antigravity_memory.md las herramientas y reglas nuevas, como audit-red.js y cómo se usa.

## Entrega
- Sube la rama antigravity/v2.1-catalogo con los commits de cada fase y tema.
- Deja scripts/reporte-v2.1.md con:
  - cifras de la auditoría antes y después, por tema;
  - cada pista arreglada (fuente vieja → nueva, con la consulta usada);
  - cada pista quitada y por qué;
  - las pistas agregadas por categoría (meta y logradas);
  - el estado de cada issue, de #8 a #18;
  - los reportes de "Verificar catálogo";
  - lo que no se pudo hacer y por qué.
- Termina con un resumen corto para el usuario: qué se hizo, cuántas pistas se arreglaron, quitaron y agregaron, y que Claude debe revisar la rama antes de pasarla a main.
