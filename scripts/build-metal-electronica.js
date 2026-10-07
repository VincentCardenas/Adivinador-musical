const fs = require('fs');

const existingIds = new Set(JSON.parse(fs.readFileSync('scripts/existing-ids-1100.json', 'utf8')));
const rockBatch = JSON.parse(fs.readFileSync('scripts/rock-bilingual-batch.json', 'utf8'));
const popBatch = JSON.parse(fs.readFileSync('scripts/pop-bilingual-batch.json', 'utf8'));
const rapBatch = JSON.parse(fs.readFileSync('scripts/rap-bilingual-batch.json', 'utf8'));
const baladasBatch = JSON.parse(fs.readFileSync('scripts/baladas-bilingual-batch.json', 'utf8'));

[...rockBatch, ...popBatch, ...rapBatch, ...baladasBatch].forEach(t => existingIds.add(t.id));

// ==========================================
// 5. METAL (94 ES + 11 EN = 105)
// ==========================================
const metalES = [
  { id: 'song-guante-de-piel', franchise: 'Rata Blanca', game: 'Guante de piel', year: 1988 },
  { id: 'song-el-sueno-de-la-gitana', franchise: 'Rata Blanca', game: 'El sueño de la gitana', year: 1988 },
  { id: 'song-chico-callejero', franchise: 'Rata Blanca', game: 'Chico callejero', year: 1988 },
  { id: 'song-dias-duros-rata', franchise: 'Rata Blanca', game: 'Días duros', year: 1990 },
  { id: 'song-guerrero-del-arco-iris', franchise: 'Rata Blanca', game: 'Guerrero del arco iris', year: 1991 },
  { id: 'song-la-boca-del-lobo', franchise: 'Rata Blanca', game: 'La boca del lobo', year: 1991 },
  { id: 'song-volviendo-a-casa', franchise: 'Rata Blanca', game: 'Volviendo a casa', year: 2002 },
  { id: 'song-talisman-rata', franchise: 'Rata Blanca', game: 'Talismán', year: 2008 },
  { id: 'song-aun-estas-en-mis-suenos', franchise: 'Rata Blanca', game: 'Aún estás en mis sueños', year: 2005 },
  { id: 'song-baron-rojo-tema', franchise: 'Barón Rojo', game: 'Barón Rojo', year: 1981 },
  { id: 'song-larga-vida-al-rock', franchise: 'Barón Rojo', game: 'Larga vida al rock and roll', year: 1981 },
  { id: 'song-resistire-baron', franchise: 'Barón Rojo', game: 'Resistiré', year: 1982 },
  { id: 'song-cuerdas-de-acero', franchise: 'Barón Rojo', game: 'Cuerdas de acero', year: 1985 },
  { id: 'song-hijos-de-cain', franchise: 'Barón Rojo', game: 'Hijos de Caín', year: 1985 },
  { id: 'song-con-botas-sucias', franchise: 'Barón Rojo', game: 'Con botas sucias', year: 1981 },
  { id: 'song-casi-me-mato', franchise: 'Barón Rojo', game: 'Casi me mato', year: 1983 },
  { id: 'song-tierra-de-vandalos', franchise: 'Barón Rojo', game: 'Tierra de vándalos', year: 1985 },
  { id: 'song-sombras-en-la-oscuridad', franchise: 'Ángeles del Infierno', game: 'Sombras en la oscuridad', year: 1985 },
  { id: 'song-al-otro-lado-del-silencio', franchise: 'Ángeles del Infierno', game: 'Al otro lado del silencio', year: 1986 },
  { id: 'song-si-tu-no-estas-aqui-angeles', franchise: 'Ángeles del Infierno', game: 'Si tú no estás aquí', year: 1988 },
  { id: 'song-con-las-botas-puestas', franchise: 'Ángeles del Infierno', game: 'Con las botas puestas', year: 1984 },
  { id: 'song-unidos-por-el-rock', franchise: 'Ángeles del Infierno', game: 'Unidos por el rock', year: 1984 },
  { id: 'song-fuera-de-la-ley', franchise: 'Ángeles del Infierno', game: 'Fuera de la ley', year: 1985 },
  { id: 'song-la-danza-del-fuego', franchise: 'Mägo de Oz', game: 'La danza del fuego', year: 2000 },
  { id: 'song-hasta-que-el-cuerpo-aguante', franchise: 'Mägo de Oz', game: 'Hasta que el cuerpo aguante', year: 2000 },
  { id: 'song-la-costa-del-silencio', franchise: 'Mägo de Oz', game: 'La costa del silencio', year: 2003 },
  { id: 'song-gaia-mago-de-oz', franchise: 'Mägo de Oz', game: 'Gaia', year: 2003 },
  { id: 'song-el-cantar-de-la-luna', franchise: 'Mägo de Oz', game: 'El cantar de la luna oscura', year: 1998 },
  { id: 'song-finisterra-mago', franchise: 'Mägo de Oz', game: 'Finisterra', year: 2000 },
  { id: 'song-hoy-toca-ser-feliz', franchise: 'Mägo de Oz', game: 'Hoy toca ser feliz', year: 2005 },
  { id: 'song-diabulus-in-musica-mago', franchise: 'Mägo de Oz', game: 'Diabulus in musica', year: 2005 },
  { id: 'song-va-a-estallar-el-obus', franchise: 'Obús', game: 'Va a estallar el obús', year: 1981 },
  { id: 'song-dinero-dinero-obus', franchise: 'Obús', game: 'Dinero, dinero', year: 1982 },
  { id: 'song-vamos-muy-bien', franchise: 'Obús', game: 'Vamos muy bien', year: 1984 },
  { id: 'song-te-visitara-la-muerte', franchise: 'Obús', game: 'Te visitará la muerte', year: 1984 },
  { id: 'song-pesadilla-nuclear', franchise: 'Obús', game: 'Pesadilla nuclear', year: 1981 },
  { id: 'song-sangre-de-reyes', franchise: 'Tierra Santa', game: 'Sangre de reyes', year: 2001 },
  { id: 'song-legendario-tierra-santa', franchise: 'Tierra Santa', game: 'Legendario', year: 1999 },
  { id: 'song-tierras-de-leyenda', franchise: 'Tierra Santa', game: 'Tierras de leyenda', year: 2000 },
  { id: 'song-la-cancion-del-pirata', franchise: 'Tierra Santa', game: 'La canción del pirata', year: 2000 },
  { id: 'song-pegaso-tierra-santa', franchise: 'Tierra Santa', game: 'Pegaso', year: 2001 },
  { id: 'song-las-walkirias', franchise: 'Tierra Santa', game: 'Las walkirias', year: 2003 },
  { id: 'song-si-amaneciera-saratoga', franchise: 'Saratoga', game: 'Si amaneciera', year: 2005 },
  { id: 'song-maldito-corazon-saratoga', franchise: 'Saratoga', game: 'Maldito corazón', year: 2005 },
  { id: 'song-vientos-de-guerra', franchise: 'Saratoga', game: 'Vientos de guerra', year: 1999 },
  { id: 'song-perro-traidor', franchise: 'Saratoga', game: 'Perro traidor', year: 2000 },
  { id: 'song-las-puertas-del-cielo', franchise: 'Saratoga', game: 'Las puertas del cielo', year: 2002 },
  { id: 'song-tu-mismo-warcry', franchise: 'WarCry', game: 'Tú mismo', year: 2002 },
  { id: 'song-hoy-gano-yo-warcry', franchise: 'WarCry', game: 'Hoy gano yo', year: 2002 },
  { id: 'song-capitan-lawrence', franchise: 'WarCry', game: 'Capitán Lawrence', year: 2002 },
  { id: 'song-aire-warcry', franchise: 'WarCry', game: 'Aire', year: 2004 },
  { id: 'song-nana-warcry', franchise: 'WarCry', game: 'Nana', year: 2004 },
  { id: 'song-la-vida-en-un-beso', franchise: 'WarCry', game: 'La vida en un beso', year: 2006 },
  { id: 'song-torquemada-avalanch', franchise: 'Avalanch', game: 'Torquemada', year: 1999 },
  { id: 'song-lucero-avalanch', franchise: 'Avalanch', game: 'Lucero', year: 2003 },
  { id: 'song-xana-avalanch', franchise: 'Avalanch', game: 'Xana', year: 2001 },
  { id: 'song-pelayo-avalanch', franchise: 'Avalanch', game: 'Pelayo', year: 1999 },
  { id: 'song-hijo-de-la-luna-stravaganzza', franchise: 'Stravaganzza', game: 'Hijo de la luna', year: 2006 },
  { id: 'song-escudo-y-espada', franchise: 'Kraken', game: 'Escudo y espada', year: 1987 },
  { id: 'song-muere-libre-kraken', franchise: 'Kraken', game: 'Muere libre', year: 1987 },
  { id: 'song-lenguaje-de-mi-piel', franchise: 'Kraken', game: 'Lenguaje de mi piel', year: 1993 },
  { id: 'song-vestido-de-cristal', franchise: 'Kraken', game: 'Vestido de cristal', year: 1989 },
  { id: 'song-destruccion-hermetica', franchise: 'Hermética', game: 'Destrucción', year: 1989 },
  { id: 'song-victimas-del-vaciamiento', franchise: 'Hermética', game: 'Víctimas del vaciamiento', year: 1994 },
  { id: 'song-soy-de-la-esquina', franchise: 'Hermética', game: 'Soy de la esquina', year: 1991 },
  { id: 'song-tu-medicina-hermetica', franchise: 'Hermética', game: 'Tu medicina', year: 1991 },
  { id: 'song-del-camionero', franchise: 'Hermética', game: 'Del camionero', year: 1994 },
  { id: 'song-sintoma-de-la-infeccion', franchise: 'Malón', game: 'Síntoma de la infección', year: 1995 },
  { id: 'song-castigador-por-herencia', franchise: 'Malón', game: 'Castigador por herencia', year: 1995 },
  { id: 'song-gato-negro-malon', franchise: 'Malón', game: 'Gato negro', year: 1996 },
  { id: 'song-el-nuevo-camino-animal', franchise: 'A.N.I.M.A.L.', game: 'El nuevo camino del hombre', year: 1996 },
  { id: 'song-lejos-de-casa-animal', franchise: 'A.N.I.M.A.L.', game: 'Lejos de casa', year: 1996 },
  { id: 'song-loco-pro-animal', franchise: 'A.N.I.M.A.L.', game: 'Loco pro', year: 1998 },
  { id: 'song-solo-por-ser-indios', franchise: 'A.N.I.M.A.L.', game: 'Sólo por ser indios', year: 1994 },
  { id: 'song-se-vos-almafuerte', franchise: 'Almafuerte', game: 'Sé vos', year: 1998 },
  { id: 'song-a-vos-amigo', franchise: 'Almafuerte', game: 'A vos amigo', year: 1999 },
  { id: 'song-toro-y-pampa', franchise: 'Almafuerte', game: 'Toro y pampa', year: 2006 },
  { id: 'song-matando-gueros', franchise: 'Brujería', game: 'Matando güeros', year: 1993 },
  { id: 'song-la-migra-brujeria', franchise: 'Brujería', game: 'La migra', year: 1995 },
  { id: 'song-colas-de-rata', franchise: 'Brujería', game: 'Colas de rata', year: 1995 },
  { id: 'song-raza-odiada', franchise: 'Brujería', game: 'Raza odiada (Pito Wilson)', year: 1995 },
  { id: 'song-america-resorte', franchise: 'Resorte', game: 'América', year: 1997 },
  { id: 'song-puro-rock-resorte', franchise: 'Resorte', game: 'Puro rock', year: 1999 },
  { id: 'song-aqui-no-es-donde', franchise: 'Resorte', game: 'Aquí no es donde', year: 1999 },
  { id: 'song-muerto-en-la-cruz', franchise: 'Transmetal', game: 'Muerto en la cruz', year: 1988 },
  { id: 'song-infierno-de-dante', franchise: 'Transmetal', game: 'Infierno de Dante', year: 1993 },
  { id: 'song-el-llamado-de-la-hembra', franchise: 'Transmetal', game: 'El llamado de la hembra', year: 1996 },
  { id: 'song-el-loco-luzbel', franchise: 'Luzbel', game: 'El loco', year: 1985 },
  { id: 'song-por-piedad-luzbel', franchise: 'Luzbel', game: 'Por piedad', year: 1986 },
  { id: 'song-pasaporte-al-infierno', franchise: 'Luzbel', game: 'Pasaporte al infierno', year: 1986 },
  { id: 'song-el-tirano-gillman', franchise: 'Gillman', game: 'El tirano', year: 1984 },
  { id: 'song-asesino-arkangel', franchise: 'Arkangel', game: 'Asesino', year: 1981 },
  { id: 'song-en-la-nada-agora', franchise: 'Agora', game: 'En la nada', year: 2004 },
  { id: 'song-refugio-agora', franchise: 'Agora', game: 'Refugio', year: 2008 }
];

const metalEN = [
  { id: 'song-children-of-the-grave', franchise: 'Black Sabbath', game: 'Children of the Grave', year: 1971 },
  { id: 'song-nib-black-sabbath', franchise: 'Black Sabbath', game: 'N.I.B.', year: 1970 },
  { id: 'song-shot-in-the-dark-ozzy', franchise: 'Ozzy Osbourne', game: 'Shot in the Dark', year: 1986 },
  { id: 'song-electric-eye', franchise: 'Judas Priest', game: 'Electric Eye', year: 1982 },
  { id: 'song-turbo-lover', franchise: 'Judas Priest', game: 'Turbo Lover', year: 1986 },
  { id: 'song-aces-high', franchise: 'Iron Maiden', game: 'Aces High', year: 1984 },
  { id: 'song-2-minutes-to-midnight', franchise: 'Iron Maiden', game: '2 Minutes to Midnight', year: 1984 },
  { id: 'song-battery-metallica', franchise: 'Metallica', game: 'Battery', year: 1986 },
  { id: 'song-creeping-death', franchise: 'Metallica', game: 'Creeping Death', year: 1984 },
  { id: 'song-tornado-of-souls', franchise: 'Megadeth', game: 'Tornado of Souls', year: 1990 },
  { id: 'song-im-broken-pantera', franchise: 'Pantera', game: 'I\'m Broken', year: 1994 }
];

console.log('Metal ES:', metalES.length, '(expected 94)');
console.log('Metal EN:', metalEN.length, '(expected 11)');

const allMetalNew = [];
metalES.forEach(t => {
  allMetalNew.push({
    id: t.id, cat: 'song-metal', franchise: t.franchise, game: t.game,
    title: t.game, year: t.year, lang: 'es',
    sources: `busca('${t.franchise.replace(/'/g, "\\'")}', '${t.game.replace(/'/g, "\\'")}')`
  });
  existingIds.add(t.id);
});
metalEN.forEach(t => {
  allMetalNew.push({
    id: t.id, cat: 'song-metal', franchise: t.franchise, game: t.game,
    title: t.game, year: t.year, lang: 'en',
    sources: `busca('${t.franchise.replace(/'/g, "\\'")}', '${t.game.replace(/'/g, "\\'")}')`
  });
  existingIds.add(t.id);
});

fs.writeFileSync('scripts/metal-bilingual-batch.json', JSON.stringify(allMetalNew, null, 2));

// ==========================================
// 6. ELECTRÓNICA (96 ES + 15 EN = 111)
// ==========================================
const elecES = [
  { id: 'song-manto-estelar-moenia', franchise: 'Moenia', game: 'Manto estelar', year: 1999 },
  { id: 'song-no-dices-mas-moenia', franchise: 'Moenia', game: 'No dices más', year: 1999 },
  { id: 'song-ni-tu-ni-nadie-moenia', franchise: 'Moenia', game: 'Ni tú ni nadie', year: 2004 },
  { id: 'song-morir-tres-veces', franchise: 'Moenia', game: 'Morir tres veces', year: 2006 },
  { id: 'song-en-que-momento', franchise: 'Moenia', game: '¿En qué momento?', year: 2001 },
  { id: 'song-dejame-entrar-moenia', franchise: 'Moenia', game: 'Déjame entrar', year: 1999 },
  { id: 'song-estabas-ahi-moenia', franchise: 'Moenia', game: 'Estabas ahí', year: 1997 },
  { id: 'song-no-puedo-estar-sin-ti', franchise: 'Moenia', game: 'No puedo estar sin ti', year: 1997 },
  { id: 'song-llegaste-a-mi-moenia', franchise: 'Moenia', game: 'Llegaste a mí', year: 2001 },
  { id: 'song-prohibido-besar-moenia', franchise: 'Moenia', game: 'Prohibido besar', year: 2003 },
  { id: 'song-cada-que-belanova', franchise: 'Belanova', game: 'Cada que...', year: 2007 },
  { id: 'song-paso-el-tiempo-belanova', franchise: 'Belanova', game: 'Paso el tiempo', year: 2007 },
  { id: 'song-me-pregunto-belanova', franchise: 'Belanova', game: 'Me pregunto', year: 2005 },
  { id: 'song-tus-ojos-belanova', franchise: 'Belanova', game: 'Tus ojos', year: 2003 },
  { id: 'song-one-two-three-go', franchise: 'Belanova', game: '1, 2, 3, Go!', year: 2007 },
  { id: 'song-mariposas-belanova', franchise: 'Belanova', game: 'Mariposas', year: 2011 },
  { id: 'song-nada-es-igual-belanova', franchise: 'Belanova', game: 'Nada de más', year: 2010 },
  { id: 'song-no-se-que-me-das', franchise: 'Fangoria', game: 'No sé qué me das', year: 2001 },
  { id: 'song-retorciendo-palabras', franchise: 'Fangoria', game: 'Retorciendo palabras', year: 2004 },
  { id: 'song-miro-la-vida-pasar', franchise: 'Fangoria', game: 'Miro la vida pasar', year: 2004 },
  { id: 'song-criticar-por-criticar', franchise: 'Fangoria', game: 'Criticar por criticar', year: 2006 },
  { id: 'song-dramas-y-comedias', franchise: 'Fangoria', game: 'Dramas y comedias', year: 2013 },
  { id: 'song-geometria-polifacetica', franchise: 'Fangoria', game: 'Geometría polifacética', year: 2016 },
  { id: 'song-fiesta-en-el-infierno', franchise: 'Fangoria', game: 'Fiesta en el infierno', year: 2016 },
  { id: 'song-espectacular-fangoria', franchise: 'Fangoria', game: 'Espectacular', year: 2017 },
  { id: 'song-eternamente-inocente', franchise: 'Fangoria', game: 'Eternamente inocente', year: 2001 },
  { id: 'song-historias-de-amor-obk', franchise: 'OBK', game: 'Historias de amor', year: 1991 },
  { id: 'song-de-que-me-sirve-llorar', franchise: 'OBK', game: 'De qué me sirve llorar', year: 1991 },
  { id: 'song-el-cielo-no-entiende', franchise: 'OBK', game: 'El cielo no entiende', year: 2000 },
  { id: 'song-tu-sigue-asi-obk', franchise: 'OBK', game: 'Tú sigue así', year: 2001 },
  { id: 'song-falsa-moral-obk', franchise: 'OBK', game: 'Falsa moral', year: 2001 },
  { id: 'song-la-princesa-de-mis-suenos', franchise: 'OBK', game: 'La princesa de mis sueños', year: 1995 },
  { id: 'song-quiereme-otra-vez', franchise: 'OBK', game: 'Quiéreme otra vez', year: 2003 },
  { id: 'song-loco-mia-tema', franchise: 'Loco Mía', game: 'Loco Mía', year: 1989 },
  { id: 'song-rumba-samba-mambo', franchise: 'Loco Mía', game: 'Rumba, samba, mambo', year: 1990 },
  { id: 'song-gorbachov-locomia', franchise: 'Loco Mía', game: 'Gorbachov', year: 1991 },
  { id: 'song-asi-me-gusta-a-mi', franchise: 'Chimo Bayo', game: 'Así me gusta a mí', year: 1991 },
  { id: 'song-quimica-chimo-bayo', franchise: 'Chimo Bayo', game: 'Química', year: 1992 },
  { id: 'song-bombas-chimo-bayo', franchise: 'Chimo Bayo', game: 'Bombas', year: 1992 },
  { id: 'song-dónde-estan-sentidos', franchise: 'Sentidos Opuestos', game: '¿Dónde están?', year: 1996 },
  { id: 'song-amor-de-papel', franchise: 'Sentidos Opuestos', game: 'Amor de papel', year: 1998 },
  { id: 'song-fiesta-sentidos', franchise: 'Sentidos Opuestos', game: 'Fiesta', year: 1999 },
  { id: 'song-ardiente-tentacion', franchise: 'Sentidos Opuestos', game: 'Ardiente tentación', year: 1999 },
  { id: 'song-mirame-sentidos', franchise: 'Sentidos Opuestos', game: 'Mírame', year: 1996 },
  { id: 'song-mai-mai-kabah', franchise: 'Kabah', game: 'Mai Mai', year: 1998 },
  { id: 'song-antro-kabah', franchise: 'Kabah', game: 'Antro', year: 2000 },
  { id: 'song-espada-javiera-mena', franchise: 'Javiera Mena', game: 'Espada', year: 2013 },
  { id: 'song-otra-era-javiera', franchise: 'Javiera Mena', game: 'Otra era', year: 2014 },
  { id: 'song-luz-de-piedra-de-luna', franchise: 'Javiera Mena', game: 'Luz de piedra de luna', year: 2010 },
  { id: 'song-xt4s1s-danna', franchise: 'Danna Paola', game: 'XT4S1S', year: 2022 },
  { id: 'song-1trago-danna', franchise: 'Danna Paola', game: '1Trago', year: 2023 },
  { id: 'song-prisionero-miranda', franchise: 'Miranda!', game: 'Prisionero', year: 2007 },
  { id: 'song-yo-te-dire-miranda', franchise: 'Miranda!', game: 'Yo te diré', year: 2004 },
  { id: 'song-traicion-miranda', franchise: 'Miranda!', game: 'Traición', year: 2004 },
  { id: 'song-hola-miranda', franchise: 'Miranda!', game: 'Hola', year: 2007 },
  { id: 'song-enamorada-miranda', franchise: 'Miranda!', game: 'Enamorada', year: 2007 },
  { id: 'song-mentia-miranda', franchise: 'Miranda!', game: 'Mentía', year: 2009 },
  { id: 'song-nalguita-plastilina', franchise: 'Plastilina Mosh', game: 'Nalguita', year: 2003 },
  { id: 'song-peligroso-pop', franchise: 'Plastilina Mosh', game: 'Peligroso pop', year: 2003 },
  { id: 'song-soun-tha-mi-primer-amor', franchise: 'Kinky', game: 'Soun Tha Mi Primer Amor', year: 2002 },
  { id: 'song-a-donde-van-los-muertos', franchise: 'Kinky', game: '¿A dónde van los muertos?', year: 2006 },
  { id: 'song-coqueta-kinky', franchise: 'Kinky', game: 'Coqueta', year: 2006 },
  { id: 'song-hasta-quemarnos', franchise: 'Kinky', game: 'Hasta quemarnos', year: 2008 },
  { id: 'song-tijuana-sound-machine', franchise: 'Nortec Collective', game: 'Tijuana Sound Machine', year: 2008 },
  { id: 'song-polaris-nortec', franchise: 'Nortec Collective', game: 'Polaris', year: 2005 },
  { id: 'song-tengo-la-voz', franchise: 'Nortec Collective', game: 'Tengo la voz', year: 2008 },
  { id: 'song-sesion-villano-bizarrap', franchise: 'Bizarrap y Villano Antillano', game: 'Villano Antillano: Bzrp Music Sessions, Vol. 51', year: 2022 },
  { id: 'song-sesion-tiago-bizarrap', franchise: 'Bizarrap y Tiago PZK', game: 'Tiago PZK: Bzrp Music Sessions, Vol. 48', year: 2021 },
  { id: 'song-sesion-snow-bizarrap', franchise: 'Bizarrap y Snow Tha Product', game: 'Snow Tha Product: Bzrp Music Sessions, Vol. 39', year: 2021 },
  { id: 'song-sesion-anuel-bizarrap', franchise: 'Bizarrap y Anuel AA', game: 'Anuel AA: Bzrp Music Sessions, Vol. 46', year: 2021 },
  { id: 'song-sesion-eladio-bizarrap', franchise: 'Bizarrap y Eladio Carrión', game: 'Eladio Carrión: Bzrp Music Sessions, Vol. 40', year: 2021 },
  { id: 'song-sesion-nicky-jam-bizarrap', franchise: 'Bizarrap y Nicky Jam', game: 'Nicky Jam: Bzrp Music Sessions, Vol. 41', year: 2021 },
  { id: 'song-sesion-morfy-bizarrap', franchise: 'Bizarrap y Morad', game: 'Morad: Bzrp Music Sessions, Vol. 47', year: 2021 },
  { id: 'song-dispara-nicki-nicole', franchise: 'Nicki Nicole y Milo J', game: 'DISPARA ***', year: 2023 },
  { id: 'song-ojo-blindado-sumo', franchise: 'Sumo', game: 'El ojo blindado', year: 1987 },
  { id: 'song-el-tiempo-es-dinero', franchise: 'Soda Stereo', game: 'El tiempo es dinero', year: 1984 },
  { id: 'song-claroscuro-la-ley', franchise: 'La Ley', game: 'El duelo', year: 1995 },
  { id: 'song-dia-cero-la-ley', franchise: 'La Ley', game: 'Día cero', year: 1995 },
  { id: 'song-aqui-la-ley', franchise: 'La Ley', game: 'Aquí', year: 2000 },
  { id: 'song-mentira-la-ley', franchise: 'La Ley', game: 'Mentira', year: 2001 },
  { id: 'song-fuera-de-mi-la-ley', franchise: 'La Ley', game: 'Fuera de mí', year: 2000 },
  { id: 'song-sensacion-del-bloque', franchise: 'De La Ghetto y Randy', game: 'Sensación del bloque', year: 2006 },
  { id: 'song-los-aparatos-el-alfa', franchise: 'El Alfa', game: 'Los aparatos', year: 2022 },
  { id: 'song-curazao-el-alfa', franchise: 'El Alfa', game: 'Curazao', year: 2021 },
  { id: 'song-singapur-el-alfa', franchise: 'El Alfa', game: 'Singapur', year: 2020 },
  { id: 'song-este-ritmo-se-baila-asi', franchise: 'Chayanne', game: 'Este ritmo se baila así', year: 1988 },
  { id: 'song-provocame-chayanne', franchise: 'Chayanne', game: 'Provócame', year: 1992 },
  { id: 'song-boom-boom-chayanne', franchise: 'Chayanne', game: 'Boom boom', year: 2000 },
  { id: 'song-fiesta-en-america', franchise: 'Chayanne', game: 'Fiesta en América', year: 1987 },
  { id: 'song-lo-dejaria-todo-dance', franchise: 'Chayanne', game: 'Caprichosa', year: 2003 },
  { id: 'song-suavemente-elvis-crespo', franchise: 'Elvis Crespo', game: 'Suavemente', year: 1998 },
  { id: 'song-pintame-elvis-crespo', franchise: 'Elvis Crespo', game: 'Píntame', year: 1999 },
  { id: 'song-tu-sonrisa-elvis', franchise: 'Elvis Crespo', game: 'Tu sonrisa', year: 1998 },
  { id: 'song-la-vida-es-un-carnaval-dance', franchise: 'Celia Cruz', game: 'Yo viviré (I Will Survive)', year: 1998 },
  { id: 'song-que-le-den-candela', franchise: 'Celia Cruz', game: 'Que le den candela', year: 1998 },
  { id: 'song-carnaval-maluma', franchise: 'Maluma', game: 'Carnaval', year: 2014 }
];

const elecEN = [
  { id: 'song-technologic-daft', franchise: 'Daft Punk', game: 'Technologic', year: 2005 },
  { id: 'song-digital-love-daft', franchise: 'Daft Punk', game: 'Digital Love', year: 2001 },
  { id: 'song-da-funk-daft', franchise: 'Daft Punk', game: 'Da Funk', year: 1995 },
  { id: 'song-sweet-nothing-calvin', franchise: 'Calvin Harris y Florence Welch', game: 'Sweet Nothing', year: 2012 },
  { id: 'song-i-need-your-love-calvin', franchise: 'Calvin Harris y Ellie Goulding', game: 'I Need Your Love', year: 2012 },
  { id: 'song-blame-calvin-harris', franchise: 'Calvin Harris y John Newman', game: 'Blame', year: 2014 },
  { id: 'song-without-you-avicii', franchise: 'Avicii y Sandro Cavazza', game: 'Without You', year: 2017 },
  { id: 'song-sos-avicii', franchise: 'Avicii y Aloe Blacc', game: 'SOS', year: 2019 },
  { id: 'song-waiting-for-love-avicii', franchise: 'Avicii', game: 'Waiting for Love', year: 2015 },
  { id: 'song-play-hard-guetta', franchise: 'David Guetta, Ne-Yo y Akon', game: 'Play Hard', year: 2012 },
  { id: 'song-without-you-guetta', franchise: 'David Guetta y Usher', game: 'Without You', year: 2011 },
  { id: 'song-when-love-takes-over', franchise: 'David Guetta y Kelly Rowland', game: 'When Love Takes Over', year: 2009 },
  { id: 'song-galvanize-chemical', franchise: 'The Chemical Brothers', game: 'Galvanize', year: 2005 },
  { id: 'song-block-rockin-beats', franchise: 'The Chemical Brothers', game: 'Block Rockin\' Beats', year: 1997 },
  { id: 'song-praise-you-fatboy', franchise: 'Fatboy Slim', game: 'Praise You', year: 1998 }
];

console.log('Elec ES:', elecES.length, '(expected 96)');
console.log('Elec EN:', elecEN.length, '(expected 15)');

const allElecNew = [];
elecES.forEach(t => {
  allElecNew.push({
    id: t.id, cat: 'song-electronica', franchise: t.franchise, game: t.game,
    title: t.game, year: t.year, lang: 'es',
    sources: `busca('${t.franchise.replace(/'/g, "\\'")}', '${t.game.replace(/'/g, "\\'")}')`
  });
  existingIds.add(t.id);
});
elecEN.forEach(t => {
  allElecNew.push({
    id: t.id, cat: 'song-electronica', franchise: t.franchise, game: t.game,
    title: t.game, year: t.year, lang: 'en',
    sources: `busca('${t.franchise.replace(/'/g, "\\'")}', '${t.game.replace(/'/g, "\\'")}')`
  });
  existingIds.add(t.id);
});

fs.writeFileSync('scripts/electronica-bilingual-batch.json', JSON.stringify(allElecNew, null, 2));

console.log('✅ Metal y Electrónica exportados exitosamente.');
