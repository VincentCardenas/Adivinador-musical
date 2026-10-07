# Planificación del Proyecto: Reparación de Fuentes de Audio Inventadas (Caricaturas y Anime)

## Resumen del Análisis

### Qué pasó (causa raíz)
En las expansiones de **Anime (v1.12)** y **Caricaturas (v1.13)** los identificadores de YouTube y de Apple Music se **inventaron** en lugar de obtenerse de fuentes reales. Los scripts `validate-anime.js` y `validate-caricaturas.js` solo comprobaban que el campo `sources` existiera, nunca que el video o la canción existieran. Por eso se reportó "fuentes validadas" cuando no lo estaban. El reporte del verificador del usuario lo confirma.

### Magnitud medida con `scripts/audit-sources.js` (auditoría real contra YouTube oEmbed y iTunes Lookup)

| Catálogo | Pistas | Con alguna fuente real | **Sin ninguna fuente real** | YouTube válidos | Apple válidos |
|---|:---:|:---:|:---:|:---:|:---:|
| Caricaturas | 306 | 106 | **200** (todas las nuevas) | 205/605 | 30/30 |
| Anime | 256 | 131 | **125** | 72/239 | 94/241 |

* Las 106 caricaturas originales funcionan todas. Las 200 nuevas están rotas al 100 %.
* En Anime, que un ID de Apple "exista" **no garantiza que sea la canción correcta**: un número inventado pudo caer en otra canción real. Hay que verificar el título, no solo la existencia.
* Riesgo adicional no medido todavía: **Musicales** (222) y **Canciones** (1,716) usan `busca(artista, canción)`, que se resuelve dinámicamente. No hay IDs inventados, pero tampoco se ha comprobado que cada término resuelva a una pista aceptada por el filtro de `js/sources.js`.

### Viabilidad de la solución (probada)
La búsqueda de YouTube desde Node funciona sin API key y devuelve IDs y títulos reales. Prueba con "El Fantasma del Espacio intro español latino": primer resultado `xMtO8Bm4EUY | El Fantasma Del Espacio Intro Latino`. Con eso se puede **resolver cada pista a un video real y comprobar que su título coincida**.

### Decisiones de diseño
1. **Nunca más IDs a mano.** Todo ID entra solo si lo devolvió una búsqueda real **y** pasó verificación de título y de `oEmbed` (existe y es incrustable).
2. **Puntaje de confianza** por candidato: el título del video debe contener las palabras clave de la serie (`franchise` o `aka`); en Caricaturas debe contener "latino" o "español"; se descartan títulos con `reaction`, `cover`, `remix`, `karaoke`, `extended`, `capítulo completo`, `loop`, `1 hora`. Solo se acepta automáticamente por encima del umbral. Los dudosos van a un archivo de revisión.
3. **Lo que no se pueda resolver se retira del catálogo** (se guarda en `scripts/pendientes-*.json`) en vez de dejarlo roto. Se prefiere un catálogo menor pero 100 % reproducible. **Los números oficiales (README, cabeceras, memoria) se corrigen a las cifras reales.** Esta es la decisión por defecto; si prefieres dejarlas marcadas pero visibles, dilo antes de dar luz verde.
4. **Respaldo previo** de ambos catálogos antes de tocarlos.
5. **Compuerta obligatoria**: `audit-sources.js` reemplaza a los validadores estructurales como criterio de "terminado". Una tarea no se marca completa si la auditoría real no da 0 pistas sin fuente.
6. **Throttle** de 1 consulta por segundo a YouTube (~325 búsquedas, unos 6 minutos) para evitar bloqueos. Procesos activos (`serve` en el puerto 8000 y `server.js`) **no se tocan**.

---

## Archivos Afectados
* `scripts/audit-sources.js` (Modificación - guardar por pista el título resuelto y añadir verificación de coincidencia de título, no solo existencia)
* `scripts/resolve-sources.js` (Creación - búsqueda en YouTube, puntaje de confianza, verificación oEmbed, salida a JSON de resultados y pendientes)
* `scripts/apply-resolved-sources.js` (Creación - reemplaza `sources` verificadas en los catálogos y retira las pistas sin fuente)
* `scripts/backups/catalog-caricaturas.pre-fix.js` y `scripts/backups/catalog-anime.pre-fix.js` (Creación - respaldos)
* `scripts/source-review-caricaturas.json`, `scripts/source-review-anime.json`, `scripts/pendientes-caricaturas.json`, `scripts/pendientes-anime.json` (Creación - salidas)
* `js/catalog-caricaturas.js` (Modificación - fuentes reales, retiro de irresolubles, cabecera con conteo real)
* `js/catalog-anime.js` (Modificación - fuentes reales, retiro de irresolubles, cabecera con conteo real)
* `scripts/validate-caricaturas.js` y `scripts/validate-anime.js` (Modificación - fallar si hay IDs que no resuelven)
* `README.md` (Modificación - corregir cifras y el texto de v1.12 y v1.13, que afirmaban fuentes oficiales y conteos no ciertos)
* `antigravity_memory.md` (Modificación - registrar la lección y la regla de no inventar IDs)

---

## Tasklist Interactiva

- [x] 1. Crear respaldos de `js/catalog-caricaturas.js` y `js/catalog-anime.js` en `scripts/backups/` antes de cualquier cambio.
- [x] 2. Mejorar `scripts/audit-sources.js`: guardar por pista el título resuelto (YouTube oEmbed y Apple Lookup) y marcar como sospechosa toda pista cuyo título resuelto no comparta palabras clave con `title`, `franchise`, `aka` o `composer`. Ejecutarlo sobre Anime para separar "ID real y correcto" de "ID real pero canción equivocada".
- [x] 3. Crear `scripts/resolve-sources.js`: para cada pista sin fuente correcta, buscar en YouTube con consultas como `"<franchise> <tipo de pieza> español latino"` (Caricaturas) y `"<franchise> opening <title> <composer>"` (Anime), con throttle de 1 consulta por segundo, extrayendo `videoId`, título y duración.
- [x] 4. Implementar en `resolve-sources.js` el puntaje de confianza: coincidencia de palabras clave del título, presencia de "latino" o "español" en Caricaturas, duración razonable (entre 20 s y 6 min), exclusión de títulos con `reaction`, `cover`, `remix`, `karaoke`, `extended`, `capítulo completo`, `loop`, `1 hora`, y confirmación de que `oEmbed` responde 200.
- [x] 5. Ejecutar la resolución sobre las 200 caricaturas nuevas y volcar `scripts/source-review-caricaturas.json` (aceptadas con puntaje alto, dudosas con puntaje medio) y `scripts/pendientes-caricaturas.json` (sin candidato).
- [x] 6. Ejecutar la resolución sobre las pistas de Anime sin fuente o con canción equivocada y volcar `scripts/source-review-anime.json` y `scripts/pendientes-anime.json`. En Anime se intentará además resolver por Apple Music (búsqueda iTunes con título y artista, validando `trackName` y `artistName`) antes de recurrir a YouTube.
- [x] 7. Crear `scripts/apply-resolved-sources.js`: reemplazar `sources` solo con candidatos aceptados, retirar del catálogo las pistas pendientes, recalcular los comentarios de sección `(N)` y la cabecera `Catálogo: ... (N pistas)`, respetando saltos de línea CRLF y conservando comentarios no relacionados.
- [x] 8. Aplicar sobre `js/catalog-caricaturas.js` y `js/catalog-anime.js` y comprobar con `node --check` cada archivo.
- [x] 9. Ejecutar `node scripts/audit-sources.js todos` y exigir 0 pistas sin fuente real y 0 sospechosas en Caricaturas y Anime. Si queda alguna, volver al paso 3 con consultas alternativas o retirarla.
- [x] 10. Revisión humana de muestra: listar 15 pistas aleatorias por catálogo con su título de video resuelto para que el usuario confirme que son la serie correcta y en español latino. Las marcadas dudosas en `source-review-*.json` se presentan para decisión.
- [x] 11. Endurecer `validate-caricaturas.js` y `validate-anime.js` para que fallen si algún ID de fuente no resuelve contra la red (flag `--offline` para el modo estructural actual).
- [x] 12. Auditoría de solo lectura de **Musicales** y **Canciones**: crear un arnés en Node que reutilice la lógica de `resolveItunes` y `scoreSong` de `js/sources.js` y verifique que cada `busca(...)` resuelva a una pista aceptada. Entregar un reporte; **no se modifica ningún dato sin tu aprobación**.
- [x] 13. Corregir `README.md`: cifras reales de Anime y Caricaturas en la tabla y reescribir las entradas v1.12 y v1.13 sin afirmar fuentes oficiales ni conteos que no se cumplan.
- [x] 14. Actualizar `antigravity_memory.md` con la lección aprendida: los IDs de fuente jamás se escriben a mano ni se generan sin verificar contra la red, y "terminado" exige la auditoría real de fuentes, no solo la validación estructural.
