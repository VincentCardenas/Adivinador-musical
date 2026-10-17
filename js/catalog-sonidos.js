/*
 * Modo Sonidos (solo Videojuegos): efectos de sonido de videojuegos, "solo para conocedores".
 *
 *   AM.SOUND_TRACKS → cada efecto suena desde 1 segundo y el jugador escribe la saga (`franchise`,
 *                     el mismo nombre que en catalog.js). `game` es el juego que lo hizo famoso y
 *                     `title` el nombre del sonido en español; los dos se muestran al revelar.
 *                     `aka` son otros nombres de la SAGA para el buscador ("CS", "Mario Bros").
 *                     Las fuentes son videos de YouTube con solo ese efecto, encontrados y comprobados
 *                     con scripts/build-resto-v22.js (nunca IDs escritos a mano).
 *
 * El modo aparece cuando hay al menos AM.MIN_POOL sonidos.
 * Archivo generado (0 sonidos).
 */
(function (AM) {
  'use strict';

  const yt = (id, start) => ({ type: 'youtube', id: id, start: start || 0 });

  AM.SOUND_TRACKS = [
  ];

  AM.SOUND_TRACKS.forEach((t) => { t.theme = 'juegos'; t.sound = true; });
})(window.AM = window.AM || {});
