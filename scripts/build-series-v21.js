#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const {
  searchAndVerifyYoutube,
  searchApple,
  recordAppleTrackEvidence,
  saveAuditCache,
  saveEvidencia,
} = require('./lib-v21');

const ROOT = path.join(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'js', 'catalog-series.js');
const CACHE_PATH = path.join(__dirname, '.series-v21-resolved.json');

let resolvedCache = {};
if (fs.existsSync(CACHE_PATH)) {
  try {
    resolvedCache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
  } catch (e) {
    resolvedCache = {};
  }
}
function saveResolvedCache() {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(resolvedCache, null, 2) + '\n', 'utf8');
}

const SERIES_V21 = [
  // ─── tv-clasicas (+6) ───
  {
    id: 'tv-el-zorro-1957-zorro-theme', cat: 'tv-clasicas', franchise: 'El Zorro (1957)', game: 'El Zorro (1957)',
    title: 'Zorro Theme', composer: 'Norman Foster y George Bruns', year: 1957, platform: 'ABC',
    aka: ['Zorro', 'El Zorro de Disney'],
    ytQuery: 'Walt Disney Zorro TV Series 1957 Intro Opening Theme Song',
  },
  {
    id: 'tv-el-llanero-solitario-lone-ranger-theme', cat: 'tv-clasicas', franchise: 'El llanero solitario', game: 'El llanero solitario',
    title: 'William Tell Overture (Lone Ranger Theme)', composer: 'Gioachino Rossini', year: 1949, platform: 'ABC',
    aka: ['The Lone Ranger'],
    ytQuery: 'The Lone Ranger TV Intro Opening Theme William Tell Overture',
  },
  {
    id: 'tv-los-munster-the-munsters-theme', cat: 'tv-clasicas', franchise: 'Los Munster', game: 'Los Munster',
    title: 'The Munsters Theme', composer: 'Jack Marshall', year: 1964, platform: 'CBS',
    aka: ['The Munsters', 'La familia Monster'],
    ytQuery: 'The Munsters 1964 TV Intro Opening Theme Song',
  },
  {
    id: 'tv-kung-fu-kung-fu-theme', cat: 'tv-clasicas', franchise: 'Kung Fu', game: 'Kung Fu',
    title: 'Kung Fu Theme', composer: 'Jim Helms', year: 1972, platform: 'ABC',
    aka: ['Kung Fu (1972)'],
    ytQuery: 'Kung Fu 1972 TV Series Intro Opening Theme Jim Helms',
  },
  {
    id: 'tv-el-chapulin-colorado-baroque-hoedown', cat: 'tv-clasicas', franchise: 'El Chapulín Colorado', game: 'El Chapulín Colorado',
    title: 'Baroque Hoedown (Tema de El Chapulín Colorado)', composer: 'Jean-Jacques Perrey y Gershon Kingsley', year: 1973, platform: 'Televisa',
    aka: ['Chapulín Colorado'],
    appleQuery: 'Jean-Jacques Perrey Baroque Hoedown',
    appleArtist: 'Perrey',
    appleMatch: 'Baroque Hoedown',
    ytQuery: 'El Chapulin Colorado intro entrada original 1973',
  },
  {
    id: 'tv-los-anos-maravillosos-with-a-little-help-from-my-friends', cat: 'tv-clasicas', franchise: 'Los años maravillosos', game: 'Los años maravillosos',
    title: 'With a Little Help from My Friends', composer: 'Joe Cocker', year: 1988, platform: 'ABC',
    aka: ['The Wonder Years'],
    appleQuery: 'Joe Cocker With a Little Help from My Friends',
    appleArtist: 'Joe Cocker',
    appleMatch: 'With a Little Help',
    ytQuery: 'The Wonder Years Intro Opening Joe Cocker With a Little Help from My Friends',
  },

  // ─── tv-90s (+12) ───
  {
    id: 'tv-clarissa-lo-explica-todo-way-cool', cat: 'tv-90s', franchise: 'Clarissa lo explica todo', game: 'Clarissa lo explica todo',
    title: 'Way Cool (Clarissa Theme)', composer: 'Rachel Sweet', year: 1991, platform: 'Nickelodeon',
    aka: ['Clarissa Explains It All'],
    ytQuery: 'Clarissa Explains It All Intro Opening Theme Nickelodeon',
  },
  {
    id: 'tv-mejorando-la-casa-iron-johns-rock', cat: 'tv-90s', franchise: 'Mejorando la casa', game: 'Mejorando la casa',
    title: "Iron John's Rock", composer: 'Dan Foliart', year: 1991, platform: 'ABC',
    aka: ['Home Improvement'],
    ytQuery: 'Home Improvement Intro Opening Theme Song 1991',
  },
  {
    id: 'tv-melrose-place-melrose-place-theme', cat: 'tv-90s', franchise: 'Melrose Place', game: 'Melrose Place',
    title: 'Melrose Place Theme', composer: 'Tim Truman', year: 1992, platform: 'Fox',
    aka: [],
    ytQuery: 'Melrose Place Opening Credits Theme Song Tim Truman',
  },
  {
    id: 'tv-el-mundo-de-beakman-beakmans-world-theme', cat: 'tv-90s', franchise: 'El mundo de Beakman', game: 'El mundo de Beakman',
    title: "Beakman's World Theme", composer: 'Mark Mothersbaugh', year: 1992, platform: 'TLC / CBS',
    aka: ["Beakman's World"],
    ytQuery: "Beakman's World Intro Opening Theme Song",
  },
  {
    id: 'tv-walker-texas-ranger-the-eyes-of-the-ranger', cat: 'tv-90s', franchise: 'Walker, Texas Ranger', game: 'Walker, Texas Ranger',
    title: 'The Eyes of the Ranger', composer: 'Chuck Norris', year: 1993, platform: 'CBS',
    aka: ['Walker, guardabosques de Texas'],
    ytQuery: 'Walker Texas Ranger Intro Opening Theme Song Eyes of the Ranger Chuck Norris',
  },
  {
    id: 'tv-las-aventuras-de-pete-y-pete-hey-sandy', cat: 'tv-90s', franchise: 'Las aventuras de Pete y Pete', game: 'Las aventuras de Pete y Pete',
    title: 'Hey Sandy', composer: 'Polaris', year: 1993, platform: 'Nickelodeon',
    aka: ['The Adventures of Pete & Pete', 'Pete y Pete'],
    appleQuery: 'Polaris Hey Sandy',
    appleArtist: 'Polaris',
    appleMatch: 'Hey Sandy',
    ytQuery: 'The Adventures of Pete and Pete Intro Opening Hey Sandy Polaris',
  },
  {
    id: 'tv-lois-y-clark-lois-and-clark-main-title', cat: 'tv-90s', franchise: 'Lois y Clark: las nuevas aventuras de Superman', game: 'Lois y Clark: las nuevas aventuras de Superman',
    title: 'Lois & Clark Main Title', composer: 'Jay Gruska', year: 1993, platform: 'ABC',
    aka: ['Lois & Clark: The New Adventures of Superman', 'Lois y Clark'],
    ytQuery: 'Lois and Clark The New Adventures of Superman Intro Opening Theme',
  },
  {
    id: 'tv-hercules-los-viajes-legendarios-main-title', cat: 'tv-90s', franchise: 'Hércules: los viajes legendarios', game: 'Hércules: los viajes legendarios',
    title: 'Hercules: The Legendary Journeys Main Title', composer: 'Joseph LoDuca', year: 1995, platform: 'Sindicación',
    aka: ['Hercules: The Legendary Journeys'],
    appleQuery: 'Joseph LoDuca Hercules The Legendary Journeys Main Title',
    appleArtist: 'Joseph LoDuca',
    appleMatch: 'Main Title',
    ytQuery: 'Hercules The Legendary Journeys Intro Opening Theme',
  },
  {
    id: 'tv-lazos-de-amor-lazos-de-amor', cat: 'tv-90s', franchise: 'Lazos de amor', game: 'Lazos de amor',
    title: 'Lazos de amor', composer: 'Lucero', year: 1995, platform: 'Televisa',
    aka: [],
    appleQuery: 'Lucero Lazos de Amor',
    appleArtist: 'Lucero',
    appleMatch: 'Lazos de Amor',
    ytQuery: 'Lazos de Amor entrada telenovela Lucero',
  },
  {
    id: 'tv-sabrina-la-bruja-adolescente-theme', cat: 'tv-90s', franchise: 'Sabrina, la bruja adolescente', game: 'Sabrina, la bruja adolescente',
    title: 'Sabrina the Teenage Witch Theme', composer: 'Danny Lux', year: 1996, platform: 'ABC',
    aka: ['Sabrina the Teenage Witch'],
    ytQuery: 'Sabrina the Teenage Witch Season 1 Opening Intro Theme',
  },
  {
    id: 'tv-el-privilegio-de-amar-el-privilegio-de-amar', cat: 'tv-90s', franchise: 'El privilegio de amar', game: 'El privilegio de amar',
    title: 'El privilegio de amar', composer: 'Mijares y Lucero', year: 1998, platform: 'Televisa',
    aka: [],
    appleQuery: 'Mijares El Privilegio de Amar',
    appleArtist: 'Mijares',
    appleMatch: 'Privilegio de Amar',
    ytQuery: 'Mijares Lucero El privilegio de amar entrada telenovela',
  },
  {
    id: 'tv-rosalinda-rosalinda', cat: 'tv-90s', franchise: 'Rosalinda', game: 'Rosalinda',
    title: 'Rosalinda', composer: 'Thalía', year: 1999, platform: 'Televisa',
    aka: [],
    appleQuery: 'Thalia Rosalinda',
    appleArtist: 'Thal',
    appleMatch: 'Rosalinda',
    ytQuery: 'Thalia Rosalinda entrada telenovela oficial',
  },

  // ─── tv-00s (+18) ───
  {
    id: 'tv-lizzie-mcguire-if-you-believe', cat: 'tv-00s', franchise: 'Lizzie McGuire', game: 'Lizzie McGuire',
    title: "If You Believe (Lizzie McGuire Theme)", composer: 'Elliot Lurie', year: 2001, platform: 'Disney Channel',
    aka: [],
    ytQuery: 'Lizzie McGuire Theme Song Opening Intro Disney Channel',
  },
  {
    id: 'tv-dos-hombres-y-medio-manly-men', cat: 'tv-00s', franchise: 'Dos hombres y medio', game: 'Dos hombres y medio',
    title: 'Manly Men', composer: 'Chuck Lorre, Lee Aronsohn y Grant Geissman', year: 2003, platform: 'CBS',
    aka: ['Two and a Half Men'],
    ytQuery: 'Two and a Half Men Intro Opening Theme Song Manly Men',
  },
  {
    id: 'tv-es-tan-raven-thats-so-raven', cat: 'tv-00s', franchise: 'Es tan Raven', game: 'Es tan Raven',
    title: "That's So Raven", composer: 'Raven-Symoné', year: 2003, platform: 'Disney Channel',
    aka: ["That's So Raven"],
    appleQuery: "Raven-Symone That's So Raven",
    appleArtist: 'Raven',
    appleMatch: "That's So Raven",
    ytQuery: "That's So Raven Theme Song Opening Intro Disney Channel",
  },
  {
    id: 'tv-amor-real-amor-real', cat: 'tv-00s', franchise: 'Amor real', game: 'Amor real',
    title: 'Amor real', composer: 'Sin Bandera', year: 2003, platform: 'Televisa',
    aka: [],
    appleQuery: 'Sin Bandera Amor Real',
    appleArtist: 'Sin Bandera',
    appleMatch: 'Amor Real',
    ytQuery: 'Sin Bandera Amor Real telenovela entrada',
  },
  {
    id: 'tv-pasion-de-gavilanes-fiera-inquieta', cat: 'tv-00s', franchise: 'Pasión de gavilanes', game: 'Pasión de gavilanes',
    title: 'Fiera inquieta', composer: 'Ángela María Forero', year: 2003, platform: 'Telemundo / Caracol',
    aka: [],
    appleQuery: 'Pasion de Gavilanes Fiera Inquieta',
    appleArtist: 'Gavilanes',
    appleMatch: 'Fiera Inquieta',
    ytQuery: 'Pasion de Gavilanes Fiera Inquieta entrada oficial',
  },
  {
    id: 'tv-manual-de-ned-i-make-my-own-rules', cat: 'tv-00s', franchise: 'Manual de supervivencia escolar de Ned', game: 'Manual de supervivencia escolar de Ned',
    title: 'I Make My Own Rules', composer: 'Lyle Workman', year: 2004, platform: 'Nickelodeon',
    aka: ["Ned's Declassified School Survival Guide", 'El manual de Ned'],
    ytQuery: "Ned's Declassified School Survival Guide Intro Opening Theme Song",
  },
  {
    id: 'tv-rubi-la-descarada', cat: 'tv-00s', franchise: 'Rubí', game: 'Rubí',
    title: 'La descarada', composer: 'Reyli Barba', year: 2004, platform: 'Televisa',
    aka: [],
    appleQuery: 'Reyli Barba La Descarada',
    appleArtist: 'Reyli',
    appleMatch: 'La Descarada',
    ytQuery: 'Reyli La Descarada Rubi entrada telenovela',
  },
  {
    id: 'tv-supernatural-carry-on-wayward-son', cat: 'tv-00s', franchise: 'Supernatural', game: 'Supernatural',
    title: 'Carry On Wayward Son', composer: 'Kansas', year: 2005, platform: 'The WB / The CW',
    aka: ['Sobrenatural'],
    appleQuery: 'Kansas Carry On Wayward Son Leftoverture',
    appleArtist: 'Kansas',
    appleMatch: 'Carry On Wayward Son',
    ytQuery: 'Kansas Carry On Wayward Son Official Audio',
  },
  {
    id: 'tv-zoey-101-follow-me', cat: 'tv-00s', franchise: 'Zoey 101', game: 'Zoey 101',
    title: 'Follow Me', composer: 'Jamie Lynn Spears', year: 2005, platform: 'Nickelodeon',
    aka: [],
    ytQuery: 'Zoey 101 Theme Song Intro Follow Me Jamie Lynn Spears',
  },
  {
    id: 'tv-zack-y-cody-here-i-am', cat: 'tv-00s', franchise: 'Zack y Cody: gemelos en acción', game: 'Zack y Cody: gemelos en acción',
    title: 'Here I Am', composer: 'Loren Ellis y Drew Seeley', year: 2005, platform: 'Disney Channel',
    aka: ['The Suite Life of Zack & Cody', 'Zack y Cody'],
    ytQuery: 'The Suite Life of Zack and Cody Theme Song Intro Opening Disney Channel',
  },
  {
    id: 'tv-la-madrastra-viveme', cat: 'tv-00s', franchise: 'La madrastra', game: 'La madrastra',
    title: 'Víveme', composer: 'Laura Pausini', year: 2005, platform: 'Televisa',
    aka: [],
    appleQuery: 'Laura Pausini Viveme',
    appleArtist: 'Laura Pausini',
    appleMatch: 'Víveme',
    ytQuery: 'Laura Pausini Viveme La Madrastra telenovela',
  },
  {
    id: 'tv-fea-mas-bella-el-club-de-las-feas', cat: 'tv-00s', franchise: 'La fea más bella', game: 'La fea más bella',
    title: 'El club de las feas', composer: 'Banda El Recodo', year: 2006, platform: 'Televisa',
    aka: [],
    appleQuery: 'Banda El Recodo El Club de las Feas',
    appleArtist: 'Recodo',
    appleMatch: 'Club de las Feas',
    ytQuery: 'La fea mas bella entrada Banda El Recodo El club de las feas',
  },
  {
    id: 'tv-gossip-girl-main-title', cat: 'tv-00s', franchise: 'Gossip Girl', game: 'Gossip Girl',
    title: 'Gossip Girl Main Title', composer: 'Transcenders', year: 2007, platform: 'The CW',
    aka: ['Chica indiscreta'],
    ytQuery: 'Gossip Girl Intro Opening Credits Theme',
  },
  {
    id: 'tv-destilando-amor-por-amarte', cat: 'tv-00s', franchise: 'Destilando amor', game: 'Destilando amor',
    title: 'Por amarte', composer: 'Pepe Aguilar', year: 2007, platform: 'Televisa',
    aka: [],
    appleQuery: 'Pepe Aguilar Por Amarte',
    appleArtist: 'Pepe Aguilar',
    appleMatch: 'Por Amarte',
    ytQuery: 'Pepe Aguilar Por Amarte Destilando Amor',
  },
  {
    id: 'tv-fuego-en-la-sangre-para-siempre', cat: 'tv-00s', franchise: 'Fuego en la sangre', game: 'Fuego en la sangre',
    title: 'Para siempre', composer: 'Vicente Fernández', year: 2008, platform: 'Televisa',
    aka: [],
    appleQuery: 'Vicente Fernandez Para Siempre',
    appleArtist: 'Vicente',
    appleMatch: 'Para Siempre',
    ytQuery: 'Vicente Fernandez Para Siempre Fuego en la sangre',
  },
  {
    id: 'tv-glee-dont-stop-believin', cat: 'tv-00s', franchise: 'Glee', game: 'Glee',
    title: "Don't Stop Believin'", composer: 'Glee Cast', year: 2009, platform: 'Fox',
    aka: [],
    appleQuery: "Glee Cast Don't Stop Believin",
    appleArtist: 'Glee Cast',
    appleMatch: "Don't Stop Believin",
    ytQuery: "Glee Cast Don't Stop Believin Official",
  },
  {
    id: 'tv-modern-family-main-title', cat: 'tv-00s', franchise: 'Modern Family', game: 'Modern Family',
    title: 'Modern Family Theme', composer: 'Gabriel Mann', year: 2009, platform: 'ABC',
    aka: ['Familia moderna'],
    ytQuery: 'Modern Family Intro Opening Theme Song Gabriel Mann',
  },
  {
    id: 'tv-sunny-entre-estrellas-so-far-so-great', cat: 'tv-00s', franchise: 'Sunny, entre estrellas', game: 'Sunny, entre estrellas',
    title: 'So Far So Great', composer: 'Demi Lovato', year: 2009, platform: 'Disney Channel',
    aka: ['Sonny with a Chance'],
    appleQuery: 'Demi Lovato So Far So Great',
    appleArtist: 'Demi Lovato',
    appleMatch: 'So Far So Great',
    ytQuery: 'Sonny With a Chance Theme Song Demi Lovato So Far So Great',
  },

  // ─── tv-10s (+20) ───
  {
    id: 'tv-victorious-make-it-shine', cat: 'tv-10s', franchise: 'Victorious', game: 'Victorious',
    title: 'Make It Shine', composer: 'Victoria Justice', year: 2010, platform: 'Nickelodeon',
    aka: [],
    appleQuery: 'Victorious Cast Victoria Justice Make It Shine',
    appleArtist: 'Victoria Justice',
    appleMatch: 'Make It Shine',
    ytQuery: 'Victorious Theme Song Make It Shine Victoria Justice',
  },
  {
    id: 'tv-big-time-rush-big-time-rush', cat: 'tv-10s', franchise: 'Big Time Rush', game: 'Big Time Rush',
    title: 'Big Time Rush', composer: 'Big Time Rush', year: 2010, platform: 'Nickelodeon',
    aka: [],
    appleQuery: 'Big Time Rush Big Time Rush',
    appleArtist: 'Big Time Rush',
    appleMatch: 'Big Time Rush',
    ytQuery: 'Big Time Rush Theme Song Intro Opening Nickelodeon',
  },
  {
    id: 'tv-buena-suerte-charlie-hang-in-there-baby', cat: 'tv-10s', franchise: 'Buena suerte, Charlie', game: 'Buena suerte, Charlie',
    title: 'Hang In There Baby', composer: 'Bridgit Mendler', year: 2010, platform: 'Disney Channel',
    aka: ['Good Luck Charlie'],
    appleQuery: 'Bridgit Mendler Hang In There Baby',
    appleArtist: 'Bridgit Mendler',
    appleMatch: 'Hang In There Baby',
    ytQuery: 'Good Luck Charlie Theme Song Hang In There Baby Bridgit Mendler',
  },
  {
    id: 'tv-a-todo-ritmo-shake-it-up', cat: 'tv-10s', franchise: 'A todo ritmo', game: 'A todo ritmo',
    title: 'Shake It Up', composer: 'Selena Gomez', year: 2010, platform: 'Disney Channel',
    aka: ['Shake It Up'],
    appleQuery: 'Selena Gomez Shake It Up',
    appleArtist: 'Selena Gomez',
    appleMatch: 'Shake It Up',
    ytQuery: 'Shake It Up Theme Song Selena Gomez Disney Channel',
  },
  {
    id: 'tv-teresa-esa-hembra-es-mala', cat: 'tv-10s', franchise: 'Teresa', game: 'Teresa',
    title: 'Esa hembra es mala', composer: 'Gloria Trevi', year: 2010, platform: 'Televisa',
    aka: [],
    appleQuery: 'Gloria Trevi Esa Hembra Es Mala',
    appleArtist: 'Gloria Trevi',
    appleMatch: 'Esa Hembra Es Mala',
    ytQuery: 'Gloria Trevi Esa Hembra Es Mala Teresa telenovela',
  },
  {
    id: 'tv-black-mirror-opening-theme', cat: 'tv-10s', franchise: 'Black Mirror', game: 'Black Mirror',
    title: 'Black Mirror Opening Theme', composer: 'Jon Opstad', year: 2011, platform: 'Channel 4 / Netflix',
    aka: [],
    ytQuery: 'Black Mirror Intro Opening Theme Sound Effect Extended',
  },
  {
    id: 'tv-jessie-hey-jessie', cat: 'tv-10s', franchise: 'Jessie', game: 'Jessie',
    title: 'Hey Jessie', composer: 'Debby Ryan', year: 2011, platform: 'Disney Channel',
    aka: [],
    appleQuery: 'Debby Ryan Hey Jessie',
    appleArtist: 'Debby Ryan',
    appleMatch: 'Hey Jessie',
    ytQuery: 'Jessie Theme Song Hey Jessie Debby Ryan Disney Channel',
  },
  {
    id: 'tv-austin-y-ally-cant-do-it-without-you', cat: 'tv-10s', franchise: 'Austin y Ally', game: 'Austin y Ally',
    title: "Can't Do It Without You", composer: 'Ross Lynch', year: 2011, platform: 'Disney Channel',
    aka: ['Austin & Ally'],
    appleQuery: "Ross Lynch Can't Do It Without You",
    appleArtist: 'Ross Lynch',
    appleMatch: "Can't Do It Without You",
    ytQuery: "Austin and Ally Theme Song Can't Do It Without You Ross Lynch",
  },
  {
    id: 'tv-violetta-en-mi-mundo', cat: 'tv-10s', franchise: 'Violetta', game: 'Violetta',
    title: 'En mi mundo', composer: 'Martina Stoessel', year: 2012, platform: 'Disney Channel',
    aka: [],
    appleQuery: 'Martina Stoessel En Mi Mundo Violetta',
    appleArtist: 'Martina Stoessel',
    appleMatch: 'En Mi Mundo',
    ytQuery: 'Violetta En mi mundo Martina Stoessel Disney Channel',
  },
  {
    id: 'tv-amores-verdaderos-no-me-compares', cat: 'tv-10s', franchise: 'Amores verdaderos', game: 'Amores verdaderos',
    title: 'No me compares', composer: 'Alejandro Sanz', year: 2012, platform: 'Televisa',
    aka: [],
    appleQuery: 'Alejandro Sanz No Me Compares',
    appleArtist: 'Alejandro Sanz',
    appleMatch: 'No Me Compares',
    ytQuery: 'Alejandro Sanz No Me Compares Amores Verdaderos',
  },
  {
    id: 'tv-abismo-de-pasion-solo-un-suspiro', cat: 'tv-10s', franchise: 'Abismo de pasión', game: 'Abismo de pasión',
    title: 'Solo un suspiro', composer: 'Óscar Cruz y Alejandra Orozco', year: 2012, platform: 'Televisa',
    aka: [],
    appleQuery: 'Oscar Cruz Alejandra Orozco Solo Un Suspiro',
    appleArtist: 'Cruz',
    appleMatch: 'Solo un Suspiro',
    ytQuery: 'Solo un suspiro Abismo de pasion entrada telenovela',
  },
  {
    id: 'tv-liv-y-maddie-better-in-stereo', cat: 'tv-10s', franchise: 'Liv y Maddie', game: 'Liv y Maddie',
    title: 'Better in Stereo', composer: 'Dove Cameron', year: 2013, platform: 'Disney Channel',
    aka: ['Liv and Maddie'],
    appleQuery: 'Dove Cameron Better in Stereo',
    appleArtist: 'Dove Cameron',
    appleMatch: 'Better in Stereo',
    ytQuery: 'Liv and Maddie Theme Song Better in Stereo Dove Cameron',
  },
  {
    id: 'tv-lo-que-la-vida-me-robo-el-perdedor', cat: 'tv-10s', franchise: 'Lo que la vida me robó', game: 'Lo que la vida me robó',
    title: 'El perdedor', composer: 'Enrique Iglesias y Marco Antonio Solís', year: 2013, platform: 'Televisa',
    aka: [],
    appleQuery: 'Enrique Iglesias Marco Antonio Solis El Perdedor',
    appleArtist: 'Enrique Iglesias',
    appleMatch: 'El Perdedor',
    ytQuery: 'Enrique Iglesias El Perdedor ft Marco Antonio Solis',
  },
  {
    id: 'tv-outlander-the-skye-boat-song', cat: 'tv-10s', franchise: 'Outlander', game: 'Outlander',
    title: 'The Skye Boat Song', composer: 'Bear McCreary (feat. Raya Yarbrough)', year: 2014, platform: 'Starz',
    aka: ['Forastera'],
    appleQuery: 'Bear McCreary Outlander The Skye Boat Song',
    appleArtist: 'Bear McCreary',
    appleMatch: 'Skye Boat Song',
    ytQuery: 'Outlander Opening Title Theme The Skye Boat Song Bear McCreary',
  },
  {
    id: 'tv-soy-luna-alas', cat: 'tv-10s', franchise: 'Soy Luna', game: 'Soy Luna',
    title: 'Alas', composer: 'Karol Sevilla', year: 2016, platform: 'Disney Channel',
    aka: [],
    appleQuery: 'Karol Sevilla Alas Soy Luna',
    appleArtist: 'Karol Sevilla',
    appleMatch: 'Alas',
    ytQuery: 'Soy Luna Alas Karol Sevilla Disney Channel',
  },
  {
    id: 'tv-cobra-kai-awaken', cat: 'tv-10s', franchise: 'Cobra Kai', game: 'Cobra Kai',
    title: 'Awaken (Cobra Kai Main Theme)', composer: 'Leo Birenberg y Zach Robinson', year: 2018, platform: 'YouTube Red / Netflix',
    aka: [],
    appleQuery: 'Leo Birenberg Zach Robinson Awaken Cobra Kai',
    appleArtist: 'Leo Birenberg',
    appleMatch: 'Awaken',
    ytQuery: 'Cobra Kai Soundtrack Awaken Leo Birenberg Zach Robinson',
  },
  {
    id: 'tv-elite-opening-theme', cat: 'tv-10s', franchise: 'Élite', game: 'Élite',
    title: 'Élite Opening Theme', composer: 'Lucas Vidal', year: 2018, platform: 'Netflix',
    aka: ['Elite'],
    ytQuery: 'Elite Netflix Intro Opening Theme Song',
  },
  {
    id: 'tv-luis-miguel-la-serie-cuando-calienta-el-sol', cat: 'tv-10s', franchise: 'Luis Miguel: la serie', game: 'Luis Miguel: la serie',
    title: 'Cuando calienta el sol', composer: 'Diego Boneta', year: 2018, platform: 'Netflix',
    aka: ['Luis Miguel'],
    appleQuery: 'Diego Boneta Cuando Calienta el Sol Luis Miguel',
    appleArtist: 'Diego Boneta',
    appleMatch: 'Cuando Calienta el Sol',
    ytQuery: 'Diego Boneta Cuando Calienta el Sol Luis Miguel La Serie',
  },
  {
    id: 'tv-the-boys-main-theme', cat: 'tv-10s', franchise: 'The Boys', game: 'The Boys',
    title: 'The Boys Main Theme', composer: 'Christopher Lennertz', year: 2019, platform: 'Prime Video',
    aka: [],
    ytQuery: 'The Boys Soundtrack Christopher Lennertz Translucent Alive Main Theme',
  },
  {
    id: 'tv-euphoria-still-dont-know-my-name', cat: 'tv-10s', franchise: 'Euphoria', game: 'Euphoria',
    title: "Still Don't Know My Name", composer: 'Labrinth', year: 2019, platform: 'HBO',
    aka: ['Euforia'],
    appleQuery: "Labrinth Still Don't Know My Name Euphoria",
    appleArtist: 'Labrinth',
    appleMatch: "Still Don't Know My Name",
    ytQuery: "Labrinth Still Don't Know My Name Euphoria Official",
  },

  // ─── tv-20s (+14) ───
  {
    id: 'tv-gambito-de-dama-main-title', cat: 'tv-20s', franchise: 'Gambito de dama', game: 'Gambito de dama',
    title: "Main Title (The Queen's Gambit)", composer: 'Carlos Rafael Rivera', year: 2020, platform: 'Netflix',
    aka: ["The Queen's Gambit"],
    appleQuery: "Carlos Rafael Rivera Main Title The Queen's Gambit",
    appleArtist: 'Carlos Rafael Rivera',
    appleMatch: 'Main Title',
    ytQuery: "The Queen's Gambit Soundtrack Main Title Carlos Rafael Rivera",
  },
  {
    id: 'tv-emily-en-paris-main-title', cat: 'tv-20s', franchise: 'Emily en París', game: 'Emily en París',
    title: 'Emily in Paris Main Title', composer: 'James Newton Howard', year: 2020, platform: 'Netflix',
    aka: ['Emily in Paris'],
    ytQuery: 'Emily in Paris Intro Opening Theme Netflix',
  },
  {
    id: 'tv-lupin-main-theme', cat: 'tv-20s', franchise: 'Lupin', game: 'Lupin',
    title: 'Arsène (Lupin Main Theme)', composer: 'Mathieu Lamboley', year: 2021, platform: 'Netflix',
    aka: [],
    appleQuery: 'Mathieu Lamboley Lupin Arsene',
    appleArtist: 'Mathieu Lamboley',
    appleMatch: 'Ars',
    ytQuery: 'Mathieu Lamboley Arsene Lupin Netflix Soundtrack',
  },
  {
    id: 'tv-el-libro-de-boba-fett-theme', cat: 'tv-20s', franchise: 'El libro de Boba Fett', game: 'El libro de Boba Fett',
    title: 'The Book of Boba Fett', composer: 'Ludwig Göransson', year: 2021, platform: 'Disney+',
    aka: ['The Book of Boba Fett'],
    appleQuery: 'Ludwig Goransson The Book of Boba Fett',
    appleArtist: 'Ludwig',
    appleMatch: 'Book of Boba Fett',
    ytQuery: 'The Book of Boba Fett Main Theme Ludwig Goransson Official',
  },
  {
    id: 'tv-la-casa-del-dragon-main-title', cat: 'tv-20s', franchise: 'Game of Thrones', game: 'La casa del dragón',
    title: 'House of the Dragon (Main Title)', composer: 'Ramin Djawadi', year: 2022, platform: 'HBO',
    aka: ['House of the Dragon'],
    ytQuery: 'House of the Dragon Official Opening Credits Intro HBO Ramin Djawadi',
  },
  {
    id: 'tv-los-anillos-de-poder-main-title', cat: 'tv-20s', franchise: 'El Señor de los Anillos: los Anillos de Poder', game: 'El Señor de los Anillos: los Anillos de Poder',
    title: 'The Lord of the Rings: The Rings of Power Main Title', composer: 'Howard Shore', year: 2022, platform: 'Prime Video',
    aka: ['The Lord of the Rings: The Rings of Power', 'Los Anillos de Poder'],
    appleQuery: 'Howard Shore The Lord of the Rings The Rings of Power Main Title',
    appleArtist: 'Howard Shore',
    appleMatch: 'Main Title',
    ytQuery: 'Howard Shore The Lord of the Rings The Rings of Power Main Title',
  },
  {
    id: 'tv-andor-main-title-theme', cat: 'tv-20s', franchise: 'Andor', game: 'Andor',
    title: 'Andor (Main Title Theme)', composer: 'Nicholas Britell', year: 2022, platform: 'Disney+',
    aka: ['Star Wars: Andor'],
    appleQuery: 'Nicholas Britell Andor Main Title Theme',
    appleArtist: 'Nicholas Britell',
    appleMatch: 'Andor (Main Title Theme)',
    ytQuery: 'Nicholas Britell Andor Main Title Theme Episode 1',
  },
  {
    id: 'tv-the-bear-new-noise', cat: 'tv-20s', franchise: 'The Bear', game: 'The Bear',
    title: 'New Noise', composer: 'Refused', year: 2022, platform: 'FX / Hulu',
    aka: ['El oso'],
    appleQuery: 'Refused New Noise The Shape of Punk to Come',
    appleArtist: 'Refused',
    appleMatch: 'New Noise',
    ytQuery: 'Refused New Noise Official',
  },
  {
    id: 'tv-moon-knight-main-theme', cat: 'tv-20s', franchise: 'Moon Knight', game: 'Moon Knight',
    title: 'Moon Knight', composer: 'Hesham Nazih', year: 2022, platform: 'Disney+',
    aka: ['Caballero Luna'],
    appleQuery: 'Hesham Nazih Moon Knight',
    appleArtist: 'Hesham Nazih',
    appleMatch: 'Moon Knight',
    ytQuery: 'Hesham Nazih Moon Knight Main Theme Official',
  },
  {
    id: 'tv-obi-wan-kenobi-main-theme', cat: 'tv-20s', franchise: 'Obi-Wan Kenobi', game: 'Obi-Wan Kenobi',
    title: 'Obi-Wan', composer: 'John Williams', year: 2022, platform: 'Disney+',
    aka: ['Star Wars: Obi-Wan Kenobi'],
    appleQuery: 'John Williams Obi-Wan',
    appleArtist: 'John Williams',
    appleMatch: 'Obi-Wan',
    ytQuery: 'John Williams Obi-Wan Theme Official Audio',
  },
  {
    id: 'tv-one-piece-live-action-wealth-fame-power', cat: 'tv-20s', franchise: 'One Piece (serie de TV)', game: 'One Piece (serie de TV)',
    title: 'Wealth Fame Power', composer: 'Sonya Belousova y Giona Ostinelli', year: 2023, platform: 'Netflix',
    aka: ['One Piece Live Action'],
    appleQuery: 'Sonya Belousova Giona Ostinelli Wealth Fame Power One Piece',
    appleArtist: 'Sonya Belousova',
    appleMatch: 'Wealth Fame Power',
    ytQuery: 'Wealth Fame Power One Piece Netflix Soundtrack Sonya Belousova',
  },
  {
    id: 'tv-ahsoka-main-theme', cat: 'tv-20s', franchise: 'Ahsoka', game: 'Ahsoka',
    title: 'Ahsoka - End Credits', composer: 'Kevin Kiner', year: 2023, platform: 'Disney+',
    aka: ['Star Wars: Ahsoka'],
    appleQuery: 'Kevin Kiner Ahsoka End Credits',
    appleArtist: 'Kevin Kiner',
    appleMatch: 'Ahsoka',
    ytQuery: 'Kevin Kiner Ahsoka End Credits Main Theme Official',
  },
  {
    id: 'tv-shogun-main-title', cat: 'tv-20s', franchise: 'Shōgun', game: 'Shōgun',
    title: 'Shōgun Main Title', composer: 'Atticus Ross, Leopold Ross y Nick Chuba', year: 2024, platform: 'FX',
    aka: ['Shogun'],
    appleQuery: 'Atticus Ross Leopold Ross Nick Chuba Shogun Main Title',
    appleArtist: 'Atticus Ross',
    appleMatch: 'Main Title',
    ytQuery: 'Shogun Main Title Atticus Ross Leopold Ross Nick Chuba FX',
  },
  {
    id: 'tv-fallout-i-dont-want-to-set-the-world-on-fire', cat: 'tv-20s', franchise: 'Fallout (serie de TV)', game: 'Fallout (serie de TV)',
    title: "I Don't Want to Set the World on Fire", composer: 'The Ink Spots', year: 2024, platform: 'Prime Video',
    aka: ['Fallout'],
    appleQuery: "The Ink Spots I Don't Want to Set the World on Fire",
    appleArtist: 'Ink Spots',
    appleMatch: "I Don't Want to Set the World on Fire",
    ytQuery: "The Ink Spots I Don't Want to Set the World on Fire Fallout",
  },
];

const SECCIONES = [
  { cat: 'tv-clasicas', label: 'Clásicas (antes de 1990)' },
  { cat: 'tv-90s', label: 'Años 90' },
  { cat: 'tv-00s', label: '2000s' },
  { cat: 'tv-10s', label: '2010s' },
  { cat: 'tv-20s', label: '2020 en adelante' },
];

const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const list = (a) => '[' + a.map(q).join(', ') + ']';

function loadCatalog(code) {
  const AM = { CATEGORIES: [], CATALOG: [], EXTRA_GAMES: [], VERSIONS: [], FRANCHISE_AKA: {} };
  vm.runInNewContext(code, { window: { AM }, AM, console });
  return AM;
}

async function resolveItem(item) {
  if (resolvedCache[item.id] && resolvedCache[item.id].length > 0) {
    return resolvedCache[item.id];
  }
  const sources = [];
  if (item.appleQuery) {
    const items = await searchApple(item.appleQuery, 'mx', 10, 'song');
    const aNorm = (item.appleArtist || '').toLowerCase();
    const mNorm = (item.appleMatch || '').toLowerCase();
    for (const it of items) {
      if (!it.previewUrl) continue;
      const tName = (it.trackName || '').toLowerCase();
      const arName = (it.artistName || '').toLowerCase();
      if (tName.includes('karaoke') || tName.includes('tribute') || tName.includes('cover') || arName.includes('tribute')) continue;
      if (aNorm && !arName.includes(aNorm)) continue;
      if (mNorm && !tName.includes(mNorm)) continue;
      recordAppleTrackEvidence(it, 'mx', item.appleQuery);
      sources.push(`apple({ song: ${it.trackId}, country: 'mx' })`);
      if (sources.length >= 1) break;
    }
  }
  if (item.ytQuery) {
    const yts = await searchAndVerifyYoutube(item.ytQuery, {
      maxCandidates: 6,
      wantCount: sources.length > 0 ? 1 : 2,
      minLength: 20,
      maxLength: 540,
      filterFn: (info) => {
        const t = (info.title || '').toLowerCase();
        return !t.includes('cover') && !t.includes('karaoke') && !t.includes('reaction') && !t.includes('piano tutorial');
      },
    });
    for (const y of yts) {
      sources.push(`yt('${y.id}')`);
    }
  }
  if (sources.length === 0) {
    throw new Error(`No se encontró ninguna fuente válida para ${item.id} (${item.game})`);
  }
  resolvedCache[item.id] = sources;
  saveResolvedCache();
  saveAuditCache();
  saveEvidencia();
  return sources;
}

async function main() {
  console.log(`🚀 Resolviendo ${SERIES_V21.length} series nuevas para v2.1...`);
  for (let i = 0; i < SERIES_V21.length; i++) {
    const it = SERIES_V21[i];
    const srcs = await resolveItem(it);
    console.log(`[${i + 1}/${SERIES_V21.length}] ✔ ${it.id} -> ${srcs.join(', ')}`);
  }

  let code = fs.readFileSync(CATALOG_PATH, 'utf8').replace(/\r\n/g, '\n');
  const before = loadCatalog(code);
  const existingIds = new Set(before.CATALOG.map((t) => t.id));

  const nuevasPorCat = {};
  const juegosAgregados = [];

  for (const it of SERIES_V21) {
    if (existingIds.has(it.id)) continue;
    const srcs = resolvedCache[it.id];
    const lines = [
      '    {',
      `      id: ${q(it.id)}, cat: ${q(it.cat)}, franchise: ${q(it.franchise)}, game: ${q(it.game)},`,
      `      title: ${q(it.title)}, composer: ${q(it.composer)}, year: ${it.year}, platform: ${q(it.platform)},`,
    ];
    if (it.aka && it.aka.length) {
      lines.push(`      aka: ${list(it.aka)},`);
    }
    lines.push(`      sources: [${srcs.join(', ')}],`, '    },');
    (nuevasPorCat[it.cat] = nuevasPorCat[it.cat] || []).push(lines.join('\n'));
    juegosAgregados.push(it.game);
  }

  SECCIONES.forEach((s, idx) => {
    const blocks = nuevasPorCat[s.cat] || [];
    if (!blocks.length) return;
    const next = SECCIONES[idx + 1];
    const marker = next
      ? new RegExp(`\\n    /\\* ─+ ${next.label.replace(/[()]/g, '\\$&')} \\(\\d+\\) ─+ \\*/`)
      : /\n  \);\n\n  \/\/ Señuelos/;
    const m = code.match(marker);
    if (!m) throw new Error(`No encontré el final de la sección ${s.label}`);
    code = code.slice(0, m.index) + '\n' + blocks.join('\n') + code.slice(m.index);
  });

  // Quitar de AM.EXTRA_GAMES cualquier señuelo cuyo game coincida con una serie agregada
  for (const game of juegosAgregados) {
    const escaped = q(game).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`\\n    \\{ theme: 'series', franchise: '[^']*', game: ${escaped} \\},`, 'g');
    code = code.replace(re, '');
  }

  const after = loadCatalog(code);
  code = code.replace(/Catálogo: Series de TV \(\d+ pistas\)/, `Catálogo: Series de TV (${after.CATALOG.length} pistas)`);
  for (const s of SECCIONES) {
    const n = after.CATALOG.filter((t) => t.cat === s.cat).length;
    code = code.replace(new RegExp(`(/\\* ─+ ${s.label.replace(/[()]/g, '\\$&')} )\\(\\d+\\)`), `$1(${n})`);
  }

  fs.writeFileSync(CATALOG_PATH, code, 'utf8');
  console.log(`🎉 Catálogo de Series actualizado: ${before.CATALOG.length} → ${after.CATALOG.length} pistas; señuelos: ${before.EXTRA_GAMES.length} → ${after.EXTRA_GAMES.length}`);
}

main().catch((err) => {
  console.error('❌ Error en build-series-v21.js:', err);
  process.exit(1);
});
