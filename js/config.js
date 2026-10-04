/*
 * Configuración general.
 * `version` se muestra en la esquina inferior izquierda. Al publicar una versión nueva,
 * cámbiala aquí y en los "?v=" de index.html (eso obliga a los navegadores a bajar los archivos nuevos).
 * `repo` es el repositorio de GitHub donde llegan los reportes de canciones
 * (se abren como issues con la plantilla .github/ISSUE_TEMPLATE/reporte-cancion.yml).
 * `scoreboard` conecta el ranking global con Supabase (ver README → "Ranking global"):
 *   - url: la "Project URL" de tu proyecto (https://xxxx.supabase.co)
 *   - key: la llave pública "publishable" (sb_publishable_…) o la antigua "anon".
 *     Es pública a propósito: lo que protege la tabla son las reglas de supabase/schema.sql.
 *     Nunca pongas aquí la llave "secret" ni la "service_role".
 *   Si se quedan vacías, el juego funciona igual y el ranking aparece como "no configurado".
 */
(function (AM) {
  'use strict';

  AM.CONFIG = {
    version: '1.7',
    repo: 'VincentCardenas/Adivinador-musical',
    reportTemplate: 'reporte-cancion.yml',
    scoreboard: {
      url: 'https://jzhadveclfjnyajrabec.supabase.co',
      key: 'sb_publishable_wOOMswZtbNDhADtc03Od6Q_BxdECt8S',
      table: 'scores',
    },
  };
})(window.AM = window.AM || {});
