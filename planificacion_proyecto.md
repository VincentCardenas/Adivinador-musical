# Planificación del Proyecto: Catálogo v2.1 — Auditoría Real de Red, Corrección de Issues (#8–#18) y Expansión Verificada

## Resumen del Análisis

### 1. Diagnóstico Inicial y Estado del Repositorio (`git status`)
* **Rama `antigravity/v2.1-catalogo` creada desde `origin/claude/clever-sagan-5xuvc1`:** Se limpió el reporte local antiguo `scripts/audit-dynamic-report.json` y se creó la rama de trabajo sobre el commit `2d85042`, que incluye `main` (v2.0, con `js/catalog-canciones.js` en 1,816 pistas y `js/catalog-caricaturas.js` dividido en 7 épocas: `toon-clasicas`, `toon-80s`, `toon-90s`, `toon-00s`, `toon-1014`, `toon-1519`, `toon-20s`) más las 30 series nuevas generadas por `scripts/build-series-gemini.js` a partir de `scripts/series-gemini-1.json` (totalizando 122 pistas en `js/catalog-series.js`).

### 2. Decisiones Arquitectónicas
1. **Arnés de Auditoría Real (`scripts/audit-red.js`):**
   * En lugar de reimplementar a mano la puntuación de iTunes (error que invalidó `audit-dynamic-sources.js`), `audit-red.js` cargará en un contexto `vm` los archivos reales del juego en el orden exacto de `index.html` (`js/config.js`, todos los catálogos, `js/catalog-sagas.js`, `js/themes.js` y `js/sources.js`).
   * Se inyectará un `document` simulado cuyo `head.appendChild(script)` intercepta la URL JSONP de `js/sources.js`, realiza la petición HTTP real respetando el cubo de fichas (`bucket` de ~19 consultas/minuto de `sources.js`), y ejecuta `window[callback](json)` o `script.onerror()`.
   * Para YouTube, cada ID se comprobará en dos niveles: (a) `oEmbed` HTTP 200 y (b) descarga de `https://www.youtube.com/watch?v=<id>` con cabecera `Accept-Language: es-MX,es;q=0.9` para extraer `ytInitialPlayerResponse` y verificar `playabilityStatus.status === 'OK'`, `playabilityStatus.playableInEmbed !== false`, `videoDetails.lengthSeconds` razonable (20 s a 600 s desde `start`), coherencia de título/canal y `playerConfig.audioConfig.loudnessDb`.
   * Para `apple({ song })`, se realizarán consultas en lotes (`lookup?id=1,2,...&country=mx|us`, hasta 100 IDs por lote) verificando `previewUrl` y coherencia de `trackName`, `artistName` y `collectionName`.
2. **Trazabilidad y Evidencia (`scripts/evidencia-v2.1.json`):**
   * Cada ID nuevo o modificado de YouTube o Apple Music provendrá exclusivamente de búsquedas reales ejecutadas en esta sesión y quedará registrado en `scripts/evidencia-v2.1.json` con consulta, título, canal/artista, álbum, duración, país, resultado y fecha ISO.
3. **Edición Quirúrgica de Catálogos:**
   * Ningún catálogo se regenerará serializando objetos desde memoria (para no perder `busca`, `buscaTv`, `am`, `amAlbum`, comentarios ni formato). Toda inserción o corrección se hará por manipulación de texto con saltos de línea LF (`\n`), actualizando las cabeceras `(N pistas)` y encabezados de sección `(N)`.
   * `js/catalog-canciones.js`, `js/sources.js`, `js/engine.js`, `js/game.js`, `js/app.js`, `js/themes.js` y `js/loudness.js` no se modificarán.

---

## Archivos Afectados

### Scripts a Crear
* `scripts/audit-red.js` (Auditoría integral de red con `vm` real de `js/sources.js`, `ytInitialPlayerResponse` y lotes de iTunes Lookup).
* `scripts/evidencia-v2.1.json` (Registro auditable de cada ID nuevo o modificado).
* `scripts/audit-red-report.json` (Reporte detallado de `audit-red.js`).
* `scripts/audit-red-revisadas.json` (Justificación manual de pistas clasificadas como dudosas por la heurística pero verificadas como correctas).
* `scripts/pendientes-v2.1.json` (Bloques completos de pistas muertas irreemplazables retiradas del catálogo).
* `scripts/revisar-a-oido.md` (Listado de pistas con segundo de inicio `start > 0` o versión específica para revisión auditiva del usuario con enlaces `&t=`).
* `scripts/reporte-v2.1.md` (Reporte final consolidado de la versión 2.1).
* `scripts/verificar-v2.1/` (Reportes exportados desde la herramienta "🛠 Verificar catálogo" del navegador).
* Scripts reanudables de expansión por tema:
  * `scripts/build-series-v21.js`
  * `scripts/build-caricaturas-v21.js`
  * `scripts/build-anime-v21.js`
  * `scripts/build-disney-v21.js`
  * `scripts/build-musicales-v21.js`
  * `scripts/build-juegos-v21.js`
  * `scripts/build-sagas-v21.js`
  * `scripts/check-phase4.js` (Verificador automatizado de los pasos 1 a 3 de la Fase 4 antes de cada commit).

### Archivos Existentes a Modificar
* `scripts/build-series-gemini.js` (Ajuste de términos/metadatos o pase a `DESCARTADAS` de las 30 series sin comprobar).
* `scripts/validate-musicales.js` (Actualización del conteo esperado de 222 al nuevo total tras la expansión).
* `js/catalog-series.js` (Corrección de issues #9 y #11, revisión de las 30 series de Gemini y expansión a 192 pistas).
* `js/catalog-caricaturas.js` (Corrección de issues #10 y #18, recuperación de retiradas con fuente real y expansión de +65 pistas).
* `js/catalog-anime.js` (Corrección de issues #12, #13, #14 y #16, recuperación de retiradas con fuente real y expansión de +52 pistas).
* `js/catalog-disney.js` (Corrección de issues #8 y #17, arreglo de muertas y expansión de +21 pistas).
* `js/catalog-musicales.js` (Arreglo de muertas y expansión de +47 pistas incluyendo ≥3 en español en `mus-clasicos` y ≥3 en `mus-10s`).
* `js/catalog.js` (Arreglo de muertas y expansión de +61 pistas).
* `js/catalog-sagas.js` (Arreglo de muertas y expansión de +37 pistas en `AM.SAGA_TRACKS`, completando ≥5 pistas para los 13 juegos con menos de 5).
* `js/config.js` y `index.html` (Subida de versión a `2.1` y `?v=2.1` únicamente al completar todas las fases).
* `README.md` y `antigravity_memory.md` (Actualización de conteos, entrada de versión 2.1 y documentación de `audit-red.js`).

---

## Tasklist Interactiva

### Fase 0: Limpieza de Git y Creación de Rama
- [x] 1. Limpiar el cambio sin confirmar en `scripts/audit-dynamic-report.json` (`git checkout -- scripts/audit-dynamic-report.json`), verificar `git status` limpio y crear la rama `antigravity/v2.1-catalogo` desde `origin/claude/clever-sagan-5xuvc1`.
- [x] 2. Crear el script auxiliar `scripts/check-phase4.js` que ejecute en cada corte: `node --check` sobre todos los archivos de `js/`, validación en `vm` de 0 IDs duplicados (`AM.CATALOG` + `AM.SAGA_TRACKS`), coherencia de conteos en cabeceras/secciones, unicidad de `franchise` por `game` en cada tema (excepto Canciones), `node scripts/validate-catalog.js` (1,816 pistas), `git diff origin/claude/clever-sagan-5xuvc1 -- js/catalog-canciones.js` vacío, `node scripts/validate-anime.js --offline`, `node scripts/validate-caricaturas.js --offline` y `node scripts/validate-musicales.js`.

### Fase 1: Auditoría de Red de Todo el Catálogo (`scripts/audit-red.js`)
- [x] 3. Implementar `scripts/audit-red.js <juegos|sagas|series|caricaturas|anime|disney|musicales|todos>` con caché reanudable, límite de 2 consultas/s a páginas/oEmbed de YouTube (verificando `oEmbed` 200 + `ytInitialPlayerResponse.playabilityStatus.status === 'OK'` y `playableInEmbed !== false`), lotes de iTunes Lookup para `apple({ song })`, y ejecución real en `vm` de `AM.Sources.resolve()` para fuentes dinámicas (`album`, `term`, `buscaTv`, `busca`, `amAlbum`).
- [x] 4. Ejecutar `node scripts/audit-red.js todos`, generar `scripts/audit-red-report.json`, respaldar las métricas iniciales ("antes") por tema para el reporte final, verificar `check-phase4.js` y hacer commit + push a `antigravity/v2.1-catalogo`.

### Fase 2: Corrección de Issues (#8–#18), Fuentes Muertas, 16 Retiradas y 30 Series de Gemini
- [x] 5. Resolver los 11 issues abiertos (#8 a #18) buscando y comprobando fuentes reales en `scripts/evidencia-v2.1.json` y registrando tiempos de inicio en `scripts/revisar-a-oido.md`:
  - `#8` `dis-hercules-no-importa-la-distancia` (doblaje latino de la película).
  - `#9` `tv-los-soprano-woke-up-this-morning` (versión de entrada de TV, *Chosen One Mix* de Alabama 3).
  - `#10` `toon-los-padrinos-magicos-los-padrinos-magicos-tema` (entrada latina oficial de TV).
  - `#11` `tv-sex-and-the-city-sex-and-the-city-theme` (reemplazar video caído `X453aKQgob4`).
  - `#12` `toon-inuyasha-change-the-world` en `js/catalog-anime.js` (opening oficial en español latino).
  - `#13` `toon-yu-yu-hakusho-sonrisa-explosiva` en `js/catalog-anime.js` (`yt(id, start)` o video directo sin intro hablada larga).
  - `#14` `toon-dragon-ball-gt-mi-corazon-encantado` en `js/catalog-anime.js` (versión latina de TV de Aaron Montalvo).
  - `#15` Confirmar 0 IDs inventados en Caricaturas y documentarlo para cierre del issue.
  - `#16` `ani-blue-seed-carnival-babel` (`yt(id, start)` o video donde la música arranque a tiempo).
  - `#17` `dis-mulan-reflejo` (grabación de la película cantada por Lucero).
  - `#18` `toon-shuriken-school-tema` (reemplazar video caído `WTQ_bj6T14g`).
- [x] 6. Reparar todas las pistas clasificadas como `muerta` o claramente equivocadas en la Fase 1 en todos los temas (sin tocar Canciones ni fuentes sanas); retirar a `scripts/pendientes-v2.1.json` únicamente las que no tengan ninguna fuente real disponible.
- [x] 7. Auditar con la lógica real de `js/sources.js` las 30 series agregadas por `scripts/build-series-gemini.js`: ajustar `match`, `artist`, `album_hint` o cambiar a `yt(id)` comprobado cuando `buscaTv` falle o devuelva un cover; pasar a `DESCARTADAS` en `scripts/build-series-gemini.js` las que no tengan fuente válida.
- [x] 8. Re-evaluar desde cero las 16 pistas retiradas en la reparación anterior (5 de Anime y 11 de Caricaturas, tomando metadatos de `scripts/backups/catalog-{anime,caricaturas}.pre-fix.js` y candidatos de `scripts/pendientes-{anime,caricaturas}.json` pero comprobando cada ID contra la red) y reincorporar solo las que tengan fuente real válida.
- [x] 9. Actualizar conteos de cabeceras y secciones tras las correcciones de la Fase 2, ejecutar `node scripts/check-phase4.js`, y hacer commit (incluyendo `Fixes #8` a `Fixes #18`) + push a `antigravity/v2.1-catalogo`.

### Fase 3: Expansión de Catálogos (+20 % por Categoría)
- [x] 10. **Series (`js/catalog-series.js`):** Crear y ejecutar `scripts/build-series-v21.js` para alcanzar la meta de **192 pistas totales** (reparto orientativo: `tv-clasicas` +6, `tv-90s` +12, `tv-00s` +18, `tv-10s` +20, `tv-20s` +14; incluyendo *Walker, Texas Ranger*, *Sabrina, la bruja adolescente* y *Dos hombres y medio* si se halla su entrada en YouTube, sin repetir el resto de `series-gemini-1.json`, limpiando señuelos en `AM.EXTRA_GAMES`). Ejecutar validaciones y hacer commit + push.
- [ ] 11. **Caricaturas (`js/catalog-caricaturas.js`):** Crear y ejecutar `scripts/build-caricaturas-v21.js` para agregar las pistas nuevas en español latino oficial (`toon-clasicas` +10, `toon-80s` +10, `toon-90s` +13, `toon-00s` +14, `toon-1014` +7, `toon-1519` +6, `toon-20s` +5, contando las recuperadas en Fase 2), limpiar señuelos convertidos en pistas, validar y hacer commit + push.
- [ ] 12. **Anime (`js/catalog-anime.js`):** Crear y ejecutar `scripts/build-anime-v21.js` para agregar openings verificados (`anime-clasicos` +10 en doblaje latino oficial cuando aplique, `anime-90s` +10, `anime-00s` +10, `anime-10s` +11, `anime-20s` +11, contando las recuperadas en Fase 2), limpiar señuelos convertidos en pistas, validar y hacer commit + push.
- [x] 13. **Disney (`js/catalog-disney.js`):** Crear y ejecutar `scripts/build-disney-v21.js` para agregar canciones en doblaje latino oficial de la película (`dis-clasica` +5, `dis-renacimiento` +4, `dis-2000s` +3, `dis-2010s` +4, `dis-2020s` +5, marcando `pixar: true` cuando corresponda), limpiar señuelos convertidos en pistas, validar y hacer commit + push.
- [ ] 14. **Musicales (`js/catalog-musicales.js`):** Crear y ejecutar `scripts/build-musicales-v21.js` para agregar canciones verificadas (`mus-clasicos` +12 con ≥3 `lang: 'es'`, `mus-7080` +13, `mus-9000` +11, `mus-10s` +11 con ≥3 `lang: 'es'`), actualizar `AM.FRANCHISE_AKA`, el encabezado `(N pistas: X en su grabación original y Y en español)` y el total en `scripts/validate-musicales.js`, limpiar señuelos convertidos en pistas, validar y hacer commit + push.
- [ ] 15. **Videojuegos (`js/catalog.js`):** Crear y ejecutar `scripts/build-juegos-v21.js` para agregar pistas de soundtracks originales (`nintendo` +12, `xbox` +5, `playstation` +7, `indie` +9, `retro` +5, `rpg` +10, `accion` +7, `online` +6), actualizar `AM.VERSIONS` si aplica, validar y hacer commit + push.
- [ ] 16. **Sagas (`js/catalog-sagas.js`):** Crear y ejecutar `scripts/build-sagas-v21.js` para agregar +37 pistas originales en `AM.SAGA_TRACKS` (priorizando canales `- Topic`, ordenando primero el video con mayor `loudnessDb` y completando primero los 13 juegos que tienen menos de 5 pistas entre `catalog.js` y `SAGA_TRACKS`, respetando `excludeGames`), actualizar `"Archivo generado (N canciones)"`, validar y hacer commit + push.

### Fase 4: Comprobación Final, Verificación en Navegador, Versión 2.1 y Entrega
- [ ] 17. Ejecutar `node scripts/audit-red.js todos` y confirmar **0 pistas muertas** en todos los temas; revisar manualmente cada pista `dudosa` remanente y documentar su justificación en `scripts/audit-red-revisadas.json`.
- [ ] 18. Iniciar o usar el servidor local en puerto 8080 (`node scripts/server.js`), comprobar en el navegador las cuentas de cada tema/categoría, iniciar una partida de prueba en cada tema y en Sagas verificando 0 errores en consola, ejecutar **"🛠 Verificar catálogo"** en cada tema modificado y en cada saga, y guardar los reportes en `scripts/verificar-v2.1/`.
- [ ] 19. Si todo el alcance se completó sin pendientes críticos: subir la versión a `2.1` en `js/config.js`, actualizar todos los parámetros `?v=2.1` en `index.html`, actualizar las cifras e historial de versiones en `README.md` (arriba de `2.0`), y poner al día `antigravity_memory.md` con lo que falta después de la `1.9.5-hotfix1` (`1.9.6`, `2.0` y `2.1`), las herramientas y reglas nuevas (`scripts/audit-red.js` y su modo de uso) y las cifras nuevas de cada catálogo.
- [ ] 20. Redactar `scripts/reporte-v2.1.md` con la comparativa antes/después de la auditoría, el detalle de pistas reparadas, retiradas y agregadas por categoría, el estado de los issues #8 a #18 y los resultados del verificador; ejecutar `node scripts/check-phase4.js` y hacer el commit + push final a `antigravity/v2.1-catalogo`.
