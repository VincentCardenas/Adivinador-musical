const fs = require('fs');
const path = require('path');

const existingIds = new Set(JSON.parse(fs.readFileSync('scripts/existing-ids-1100.json', 'utf8')));

const rockES = [
  { id: 'song-nada-personal', franchise: 'Soda Stereo', game: 'Nada personal', year: 1985 },
  { id: 'song-profugos', franchise: 'Soda Stereo', game: 'Prófugos', year: 1986 },
  { id: 'song-signos', franchise: 'Soda Stereo', game: 'Signos', year: 1986 },
  { id: 'song-en-remolinos', franchise: 'Soda Stereo', game: 'En remolinos', year: 1992 },
  { id: 'song-juegos-de-seduccion', franchise: 'Soda Stereo', game: 'Juegos de seducción', year: 1985 },
  { id: 'song-zoom-soda', franchise: 'Soda Stereo', game: 'Zoom', year: 1995 },
  { id: 'song-primavera-0', franchise: 'Soda Stereo', game: 'Primavera 0', year: 1992 },
  { id: 'song-ella-uso-mi-cabeza', franchise: 'Soda Stereo', game: 'Ella usó mi cabeza como un revólver', year: 1995 },
  { id: 'song-crimen-cerati', franchise: 'Gustavo Cerati', game: 'Crimen', year: 2006 },
  { id: 'song-puente-cerati', franchise: 'Gustavo Cerati', game: 'Puente', year: 1999 },
  { id: 'song-adios-cerati', franchise: 'Gustavo Cerati', game: 'Adiós', year: 2006 },
  { id: 'song-deja-vu-cerati', franchise: 'Gustavo Cerati', game: 'Déjà vu', year: 2009 },
  { id: 'song-la-celula-que-explota', franchise: 'Caifanes', game: 'La célula que explota', year: 1990 },
  { id: 'song-viento-caifanes', franchise: 'Caifanes', game: 'Viento', year: 1988 },
  { id: 'song-matenme-porque-me-muero', franchise: 'Caifanes', game: 'Mátenme porque me muero', year: 1988 },
  { id: 'song-los-dioses-ocultos', franchise: 'Caifanes', game: 'Los dioses ocultos', year: 1990 },
  { id: 'song-nubes-caifanes', franchise: 'Caifanes', game: 'Nubes', year: 1992 },
  { id: 'song-te-lo-pido-por-favor-jaguares', franchise: 'Jaguares', game: 'Te lo pido por favor', year: 2002 },
  { id: 'song-sirena-varada', franchise: 'Héroes del Silencio', game: 'Sirena varada', year: 1993 },
  { id: 'song-heroe-de-leyenda', franchise: 'Héroes del Silencio', game: 'Héroe de leyenda', year: 1987 },
  { id: 'song-mar-adentro-heroes', franchise: 'Héroes del Silencio', game: 'Mar adentro', year: 1988 },
  { id: 'song-flor-de-loto-heroes', franchise: 'Héroes del Silencio', game: 'Flor de loto', year: 1993 },
  { id: 'song-avalancha-heroes', franchise: 'Héroes del Silencio', game: 'Avalancha', year: 1995 },
  { id: 'song-lady-blue-bunbury', franchise: 'Bunbury', game: 'Lady Blue', year: 2002 },
  { id: 'song-infinito-bunbury', franchise: 'Bunbury', game: 'Infinito', year: 1999 },
  { id: 'song-frente-a-frente-bunbury', franchise: 'Bunbury', game: 'Frente a frente', year: 2010 },
  { id: 'song-la-muralla-verde', franchise: 'Los Enanitos Verdes', game: 'La muralla verde', year: 1986 },
  { id: 'song-por-el-resto', franchise: 'Los Enanitos Verdes', game: 'Por el resto', year: 1987 },
  { id: 'song-te-vi-en-un-tren', franchise: 'Los Enanitos Verdes', game: 'Te vi en un tren', year: 1987 },
  { id: 'song-cada-vez-que-te-digo-adios', franchise: 'Los Enanitos Verdes', game: 'Cada vez que te digo adiós', year: 1986 },
  { id: 'song-vasos-vacios', franchise: 'Los Fabulosos Cadillacs', game: 'Vasos vacíos', year: 1988 },
  { id: 'song-siguiendo-la-luna', franchise: 'Los Fabulosos Cadillacs', game: 'Siguiendo la luna', year: 1992 },
  { id: 'song-mal-bicho', franchise: 'Los Fabulosos Cadillacs', game: 'Mal bicho', year: 1995 },
  { id: 'song-calaveras-y-diablitos', franchise: 'Los Fabulosos Cadillacs', game: 'Calaveras y diablitos', year: 1997 },
  { id: 'song-manuel-santillan', franchise: 'Los Fabulosos Cadillacs', game: 'Manuel Santillán, El León', year: 1992 },
  { id: 'song-la-guitarra-decadentes', franchise: 'Los Auténticos Decadentes', game: 'La guitarra', year: 1995 },
  { id: 'song-loco-tu-forma-de-ser', franchise: 'Los Auténticos Decadentes', game: 'Loco (tu forma de ser)', year: 1989 },
  { id: 'song-un-osito-de-peluche', franchise: 'Los Auténticos Decadentes', game: 'Un osito de peluche de Taiwán', year: 2003 },
  { id: 'song-no-me-importa-el-dinero', franchise: 'Los Auténticos Decadentes', game: 'No me importa el dinero', year: 2000 },
  { id: 'song-irresponsables-babasonicos', franchise: 'Babasónicos', game: 'Irresponsables', year: 2003 },
  { id: 'song-putita-babasonicos', franchise: 'Babasónicos', game: 'Putita', year: 2003 },
  { id: 'song-el-colmo-babasonicos', franchise: 'Babasónicos', game: 'El colmo', year: 2005 },
  { id: 'song-mariposa-tecknicolor', franchise: 'Fito Páez', game: 'Mariposa tecknicolor', year: 1994 },
  { id: 'song-circo-beat', franchise: 'Fito Páez', game: 'Circo Beat', year: 1994 },
  { id: 'song-al-lado-del-camino', franchise: 'Fito Páez', game: 'Al lado del camino', year: 1999 },
  { id: 'song-hablando-a-tu-corazon', franchise: 'Charly García', game: 'Hablando a tu corazón', year: 1986 },
  { id: 'song-no-voy-en-tren', franchise: 'Charly García', game: 'No voy en tren', year: 1987 },
  { id: 'song-cerca-de-la-revolucion', franchise: 'Charly García', game: 'Cerca de la revolución', year: 1984 },
  { id: 'song-flaca-calamaro', franchise: 'Andrés Calamaro', game: 'Flaca', year: 1997 },
  { id: 'song-mil-horas-abuelos', franchise: 'Los Abuelos de la Nada', game: 'Mil horas', year: 1983 },
  { id: 'song-te-quiero-igual-calamaro', franchise: 'Andrés Calamaro', game: 'Te quiero igual', year: 1999 },
  { id: 'song-loco-calamaro', franchise: 'Andrés Calamaro', game: 'Loco', year: 1997 },
  { id: 'song-sin-documentos', franchise: 'Los Rodríguez', game: 'Sin documentos', year: 1993 },
  { id: 'song-para-no-olvidar', franchise: 'Los Rodríguez', game: 'Para no olvidar', year: 1995 },
  { id: 'song-mucho-mejor-rodriguez', franchise: 'Los Rodríguez', game: 'Mucho mejor', year: 1995 },
  { id: 'song-estrechez-de-corazon', franchise: 'Los Prisioneros', game: 'Estrechez de corazón', year: 1990 },
  { id: 'song-la-voz-de-los-80', franchise: 'Los Prisioneros', game: 'La voz de los \'80', year: 1984 },
  { id: 'song-sexo-prisioneros', franchise: 'Los Prisioneros', game: 'Sexo', year: 1986 },
  { id: 'song-un-amor-violento', franchise: 'Los Tres', game: 'Un amor violento', year: 1991 },
  { id: 'song-dejate-caer', franchise: 'Los Tres', game: 'Déjate caer', year: 1995 },
  { id: 'song-llueve-sobre-la-ciudad', franchise: 'Los Bunkers', game: 'Llueve sobre la ciudad', year: 2005 }
];

const rockEN = [
  { id: 'song-twist-and-shout', franchise: 'The Beatles', game: 'Twist and Shout', year: 1963 },
  { id: 'song-a-hard-days-night', franchise: 'The Beatles', game: 'A Hard Day\'s Night', year: 1964 },
  { id: 'song-help-beatles', franchise: 'The Beatles', game: 'Help!', year: 1965 },
  { id: 'song-yesterday-beatles', franchise: 'The Beatles', game: 'Yesterday', year: 1965 },
  { id: 'song-paint-it-black', franchise: 'The Rolling Stones', game: 'Paint It, Black', year: 1966 },
  { id: 'song-sympathy-for-the-devil', franchise: 'The Rolling Stones', game: 'Sympathy for the Devil', year: 1968 },
  { id: 'song-start-me-up', franchise: 'The Rolling Stones', game: 'Start Me Up', year: 1981 },
  { id: 'song-light-my-fire', franchise: 'The Doors', game: 'Light My Fire', year: 1967 },
  { id: 'song-break-on-through', franchise: 'The Doors', game: 'Break On Through (To the Other Side)', year: 1967 },
  { id: 'song-purple-haze', franchise: 'Jimi Hendrix', game: 'Purple Haze', year: 1967 },
  { id: 'song-baba-oriley', franchise: 'The Who', game: 'Baba O\'Riley', year: 1971 },
  { id: 'song-whole-lotta-love', franchise: 'Led Zeppelin', game: 'Whole Lotta Love', year: 1969 },
  { id: 'song-immigrant-song', franchise: 'Led Zeppelin', game: 'Immigrant Song', year: 1970 },
  { id: 'song-black-dog', franchise: 'Led Zeppelin', game: 'Black Dog', year: 1971 },
  { id: 'song-wish-you-were-here', franchise: 'Pink Floyd', game: 'Wish You Were Here', year: 1975 },
  { id: 'song-money-pink-floyd', franchise: 'Pink Floyd', game: 'Money', year: 1973 },
  { id: 'song-comfortably-numb', franchise: 'Pink Floyd', game: 'Comfortably Numb', year: 1979 },
  { id: 'song-under-pressure', franchise: 'Queen y David Bowie', game: 'Under Pressure', year: 1981 },
  { id: 'song-radio-ga-ga', franchise: 'Queen', game: 'Radio Ga Ga', year: 1984 },
  { id: 'song-somebody-to-love-queen', franchise: 'Queen', game: 'Somebody to Love', year: 1976 },
  { id: 'song-highway-to-hell', franchise: 'AC/DC', game: 'Highway to Hell', year: 1979 },
  { id: 'song-thunderstruck', franchise: 'AC/DC', game: 'Thunderstruck', year: 1990 },
  { id: 'song-you-shook-me-all-night-long', franchise: 'AC/DC', game: 'You Shook Me All Night Long', year: 1980 },
  { id: 'song-roxanne', franchise: 'The Police', game: 'Roxanne', year: 1978 },
  { id: 'song-message-in-a-bottle', franchise: 'The Police', game: 'Message in a Bottle', year: 1979 },
  { id: 'song-sultans-of-swing', franchise: 'Dire Straits', game: 'Sultans of Swing', year: 1978 },
  { id: 'song-money-for-nothing', franchise: 'Dire Straits', game: 'Money for Nothing', year: 1985 },
  { id: 'song-with-or-without-you', franchise: 'U2', game: 'With or Without You', year: 1987 },
  { id: 'song-sunday-bloody-sunday', franchise: 'U2', game: 'Sunday Bloody Sunday', year: 1983 },
  { id: 'song-beautiful-day-u2', franchise: 'U2', game: 'Beautiful Day', year: 2000 },
  { id: 'song-shiny-happy-people', franchise: 'R.E.M.', game: 'Shiny Happy People', year: 1991 },
  { id: 'song-patience-gnr', franchise: 'Guns N\' Roses', game: 'Patience', year: 1988 },
  { id: 'song-knockin-on-heavens-door', franchise: 'Guns N\' Roses', game: 'Knockin\' on Heaven\'s Door', year: 1991 },
  { id: 'song-everlong', franchise: 'Foo Fighters', game: 'Everlong', year: 1997 },
  { id: 'song-best-of-you', franchise: 'Foo Fighters', game: 'Best of You', year: 2005 },
  { id: 'song-supermassive-black-hole', franchise: 'Muse', game: 'Supermassive Black Hole', year: 2006 },
  { id: 'song-knights-of-cydonia', franchise: 'Muse', game: 'Knights of Cydonia', year: 2006 },
  { id: 'song-i-bet-you-look-good', franchise: 'Arctic Monkeys', game: 'I Bet You Look Good on the Dancefloor', year: 2005 },
  { id: 'song-505-arctic-monkeys', franchise: 'Arctic Monkeys', game: '505', year: 2007 }
];

console.log('Rock ES count:', rockES.length, '(expected 61)');
console.log('Rock EN count:', rockEN.length, '(expected 39)');

const allRockNew = [];

rockES.forEach(t => {
  allRockNew.push({
    id: t.id, cat: 'song-rock', franchise: t.franchise, game: t.game,
    title: t.game, year: t.year, lang: 'es',
    sources: `busca('${t.franchise.replace(/'/g, "\\'")}', '${t.game.replace(/'/g, "\\'")}')`
  });
});

rockEN.forEach(t => {
  allRockNew.push({
    id: t.id, cat: 'song-rock', franchise: t.franchise, game: t.game,
    title: t.game, year: t.year, lang: 'en',
    sources: `busca('${t.franchise.replace(/'/g, "\\'")}', '${t.game.replace(/'/g, "\\'")}')`
  });
});

let errors = 0;
allRockNew.forEach(t => {
  if (existingIds.has(t.id)) {
    console.error('CLASH with existing:', t.id);
    errors++;
  }
});

console.log('Rock clashes:', errors);
if (errors === 0) {
  fs.writeFileSync('scripts/rock-bilingual-batch.json', JSON.stringify(allRockNew, null, 2));
  console.log('✅ Lote de Rock exportado exitosamente.');
} else {
  process.exit(1);
}
