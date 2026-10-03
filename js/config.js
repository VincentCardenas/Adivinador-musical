/*
 * Configuración general.
 * `version` se muestra en la esquina inferior izquierda. Al publicar una versión nueva,
 * cámbiala aquí y en los "?v=" de index.html (eso obliga a los navegadores a bajar los archivos nuevos).
 * `repo` es el repositorio de GitHub donde llegan los reportes de canciones
 * (se abren como issues con la plantilla .github/ISSUE_TEMPLATE/reporte-cancion.yml).
 */
(function (AM) {
  'use strict';

  AM.CONFIG = {
    version: '1.1',
    repo: 'VincentCardenas/Adivinador-musical',
    reportTemplate: 'reporte-cancion.yml',
  };
})(window.AM = window.AM || {});
