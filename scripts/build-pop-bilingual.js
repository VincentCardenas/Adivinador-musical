const fs = require('fs');

const existingIds = new Set(JSON.parse(fs.readFileSync('scripts/existing-ids-1100.json', 'utf8')));
const rockBatch = JSON.parse(fs.readFileSync('scripts/rock-bilingual-batch.json', 'utf8'));
rockBatch.forEach(t => existingIds.add(t.id));

// ==========================================
// 2. POP (68 ES + 32 EN = 100)
// ==========================================
const popES = [
  { id: 'song-hoy-no-me-puedo-levantar', franchise: 'Mecano', game: 'Hoy no me puedo levantar', year: 1981 },
  { id: 'song-barco-a-venus', franchise: 'Mecano', game: 'Barco a Venus', year: 1983 },
  { id: 'song-cruz-de-navajas', franchise: 'Mecano', game: 'Cruz de navajas', year: 1986 },
  { id: 'song-la-fuerza-del-destino', franchise: 'Mecano', game: 'La fuerza del destino', year: 1988 },
  { id: 'song-mujer-contra-mujer', franchise: 'Mecano', game: 'Mujer contra mujer', year: 1988 },
  { id: 'song-un-ano-mas', franchise: 'Mecano', game: 'Un año más', year: 1988 },
  { id: 'song-amante-bandido', franchise: 'Miguel Bosé', game: 'Amante bandido', year: 1984 },
  { id: 'song-morenamia', franchise: 'Miguel Bosé', game: 'Morenamía', year: 2001 },
  { id: 'song-si-tu-no-vuelves', franchise: 'Miguel Bosé', game: 'Si tú no vuelves', year: 1993 },
  { id: 'song-a-quien-le-importa-alaska', franchise: 'Alaska y Dinarama', game: '¿A quién le importa?', year: 1986 },
  { id: 'song-marta-tiene-un-marcapasos', franchise: 'Hombres G', game: 'Marta tiene un marcapasos', year: 1986 },
  { id: 'song-voy-a-pasarmelo-bien', franchise: 'Hombres G', game: 'Voy a pasármelo bien', year: 1989 },
  { id: 'song-te-quiero-hombres-g', franchise: 'Hombres G', game: 'Te quiero', year: 1986 },
  { id: 'song-con-todos-menos-conmigo', franchise: 'Timbiriche', game: 'Con todos menos conmigo', year: 1987 },
  { id: 'song-besos-de-ceniza', franchise: 'Timbiriche', game: 'Besos de ceniza', year: 1987 },
  { id: 'song-princesa-tibetana', franchise: 'Timbiriche', game: 'Princesa tibetana', year: 1990 },
  { id: 'song-bazar-flans', franchise: 'Flans', game: 'Bazar', year: 1985 },
  { id: 'song-no-controles-flans', franchise: 'Flans', game: 'No controles', year: 1985 },
  { id: 'song-las-mil-y-una-noches', franchise: 'Flans', game: 'Las mil y una noches', year: 1986 },
  { id: 'song-como-te-va-mi-amor', franchise: 'Pandora', game: '¿Cómo te va mi amor?', year: 1985 },
  { id: 'song-reina-de-corazones', franchise: 'Alejandra Guzmán', game: 'Reina de corazones', year: 1991 },
  { id: 'song-eternamente-bella', franchise: 'Alejandra Guzmán', game: 'Eternamente bella', year: 1990 },
  { id: 'song-miralo-miralo', franchise: 'Alejandra Guzmán', game: 'Míralo, míralo', year: 1993 },
  { id: 'song-pelo-suelto', franchise: 'Gloria Trevi', game: 'Pelo suelto', year: 1991 },
  { id: 'song-dr-psiquiatra', franchise: 'Gloria Trevi', game: 'Dr. Psiquiatra', year: 1989 },
  { id: 'song-todos-me-miran', franchise: 'Gloria Trevi', game: 'Todos me miran', year: 2006 },
  { id: 'song-con-los-ojos-cerrados', franchise: 'Gloria Trevi', game: 'Con los ojos cerrados', year: 1992 },
  { id: 'song-el-ultimo-adios-paulina', franchise: 'Paulina Rubio', game: 'El último adiós', year: 2000 },
  { id: 'song-te-quise-tanto-paulina', franchise: 'Paulina Rubio', game: 'Te quise tanto', year: 2004 },
  { id: 'song-causa-y-efecto', franchise: 'Paulina Rubio', game: 'Causa y efecto', year: 2009 },
  { id: 'song-mio-paulina', franchise: 'Paulina Rubio', game: 'Mío', year: 1992 },
  { id: 'song-amor-a-la-mexicana-thalia', franchise: 'Thalía', game: 'Amor a la mexicana', year: 1997 },
  { id: 'song-entre-el-mar-y-una-estrella', franchise: 'Thalía', game: 'Entre el mar y una estrella', year: 2000 },
  { id: 'song-arrasando-thalia', franchise: 'Thalía', game: 'Arrasando', year: 2000 },
  { id: 'song-a-quien-le-importa-thalia', franchise: 'Thalía', game: '¿A quién le importa?', year: 2002 },
  { id: 'song-azucar-amargo-fey', franchise: 'Fey', game: 'Azúcar amargo', year: 1996 },
  { id: 'song-media-naranja-fey', franchise: 'Fey', game: 'Media naranja', year: 1995 },
  { id: 'song-muevelo-fey', franchise: 'Fey', game: 'Muévelo', year: 1996 },
  { id: 'song-la-calle-de-las-sirenas', franchise: 'Kabah', game: 'La calle de las sirenas', year: 1996 },
  { id: 'song-al-pasar-kabah', franchise: 'Kabah', game: 'Al pasar', year: 1996 },
  { id: 'song-vive-kabah', franchise: 'Kabah', game: 'Vive', year: 1996 },
  { id: 'song-enloqueceme-ov7', franchise: 'OV7', game: 'Enloquéceme', year: 2000 },
  { id: 'song-shabadabada-ov7', franchise: 'OV7', game: 'Shabadabada', year: 2000 },
  { id: 'song-mirame-a-los-ojos-ov7', franchise: 'OV7', game: 'Mírame a los ojos', year: 1997 },
  { id: 'song-la-playa-oreja', franchise: 'La Oreja de Van Gogh', game: 'La playa', year: 2000 },
  { id: 'song-cuidate-oreja', franchise: 'La Oreja de Van Gogh', game: 'Cuídate', year: 2000 },
  { id: 'song-puedes-contar-conmigo', franchise: 'La Oreja de Van Gogh', game: 'Puedes contar conmigo', year: 2003 },
  { id: 'song-20-de-enero', franchise: 'La Oreja de Van Gogh', game: '20 de enero', year: 2003 },
  { id: 'song-jueves-oreja', franchise: 'La Oreja de Van Gogh', game: 'Jueves', year: 2008 },
  { id: 'song-sin-ti-no-soy-nada', franchise: 'Amaral', game: 'Sin ti no soy nada', year: 2002 },
  { id: 'song-el-universo-sobre-mi', franchise: 'Amaral', game: 'El universo sobre mí', year: 2005 },
  { id: 'song-zapatillas-el-canto', franchise: 'El Canto del Loco', game: 'Zapatillas', year: 2005 },
  { id: 'song-la-madre-de-jose', franchise: 'El Canto del Loco', game: 'La madre de José', year: 2003 },
  { id: 'song-tu-calorro-estopa', franchise: 'Estopa', game: 'Tu calorro', year: 1999 },
  { id: 'song-por-la-raja-de-tu-falda', franchise: 'Estopa', game: 'Por la raja de tu falda', year: 1999 },
  { id: 'song-vino-tinto-estopa', franchise: 'Estopa', game: 'Vino tinto', year: 2001 },
  { id: 'song-caminando-por-la-vida', franchise: 'Melendi', game: 'Caminando por la vida', year: 2005 },
  { id: 'song-volverte-a-ver-juanes', franchise: 'Juanes', game: 'Volverte a ver', year: 2004 },
  { id: 'song-es-por-ti-juanes', franchise: 'Juanes', game: 'Es por ti', year: 2002 },
  { id: 'song-me-enamora-juanes', franchise: 'Juanes', game: 'Me enamora', year: 2007 },
  { id: 'song-si-te-vas-shakira', franchise: 'Shakira', game: 'Si te vas', year: 1998 },
  { id: 'song-ojos-asi-shakira', franchise: 'Shakira', game: 'Ojos así', year: 1998 },
  { id: 'song-ciega-sordomuda-shakira', franchise: 'Shakira', game: 'Ciega, sordomuda', year: 1998 },
  { id: 'song-inevitable-shakira', franchise: 'Shakira', game: 'Inevitable', year: 1998 },
  { id: 'song-suerte-shakira', franchise: 'Shakira', game: 'Suerte', year: 2001 },
  { id: 'song-andar-conmigo-julieta', franchise: 'Julieta Venegas', game: 'Andar conmigo', year: 2003 },
  { id: 'song-eres-para-mi-julieta', franchise: 'Julieta Venegas', game: 'Eres para mí', year: 2006 },
  { id: 'song-en-el-2000-natalia', franchise: 'Natalia Lafourcade', game: 'En el 2000', year: 2002 }
];

const popEN = [
  { id: 'song-holiday-madonna', franchise: 'Madonna', game: 'Holiday', year: 1983 },
  { id: 'song-lucky-star-madonna', franchise: 'Madonna', game: 'Lucky Star', year: 1983 },
  { id: 'song-papa-dont-preach', franchise: 'Madonna', game: 'Papa Don\'t Preach', year: 1986 },
  { id: 'song-la-isla-bonita', franchise: 'Madonna', game: 'La Isla Bonita', year: 1986 },
  { id: 'song-hung-up-madonna', franchise: 'Madonna', game: 'Hung Up', year: 2005 },
  { id: 'song-bad-michael-jackson', franchise: 'Michael Jackson', game: 'Bad', year: 1987 },
  { id: 'song-man-in-the-mirror', franchise: 'Michael Jackson', game: 'Man in the Mirror', year: 1987 },
  { id: 'song-black-or-white', franchise: 'Michael Jackson', game: 'Black or White', year: 1991 },
  { id: 'song-faith-george-michael', franchise: 'George Michael', game: 'Faith', year: 1987 },
  { id: 'song-1999-prince', franchise: 'Prince', game: '1999', year: 1982 },
  { id: 'song-kiss-prince', franchise: 'Prince', game: 'Kiss', year: 1986 },
  { id: 'song-how-will-i-know', franchise: 'Whitney Houston', game: 'How Will I Know', year: 1985 },
  { id: 'song-i-have-nothing', franchise: 'Whitney Houston', game: 'I Have Nothing', year: 1992 },
  { id: 'song-oops-i-did-it-again', franchise: 'Britney Spears', game: 'Oops!... I Did It Again', year: 2000 },
  { id: 'song-stronger-britney', franchise: 'Britney Spears', game: 'Stronger', year: 2000 },
  { id: 'song-im-a-slave-4-u', franchise: 'Britney Spears', game: 'I\'m a Slave 4 U', year: 2001 },
  { id: 'song-genie-in-a-bottle', franchise: 'Christina Aguilera', game: 'Genie in a Bottle', year: 1999 },
  { id: 'song-fighter-christina', franchise: 'Christina Aguilera', game: 'Fighter', year: 2002 },
  { id: 'song-everybody-backstreet', franchise: 'Backstreet Boys', game: 'Everybody (Backstreet\'s Back)', year: 1997 },
  { id: 'song-as-long-as-you-love-me', franchise: 'Backstreet Boys', game: 'As Long as You Love Me', year: 1997 },
  { id: 'song-bye-bye-bye', franchise: '*NSYNC', game: 'Bye Bye Bye', year: 2000 },
  { id: 'song-its-gonna-be-me', franchise: '*NSYNC', game: 'It\'s Gonna Be Me', year: 2000 },
  { id: 'song-say-my-name-destiny', franchise: 'Destiny\'s Child', game: 'Say My Name', year: 1999 },
  { id: 'song-survivor-destiny', franchise: 'Destiny\'s Child', game: 'Survivor', year: 2001 },
  { id: 'song-sexyback-justin', franchise: 'Justin Timberlake', game: 'SexyBack', year: 2006 },
  { id: 'song-mirrors-justin', franchise: 'Justin Timberlake', game: 'Mirrors', year: 2013 },
  { id: 'song-teenage-dream-katy', franchise: 'Katy Perry', game: 'Teenage Dream', year: 2010 },
  { id: 'song-dark-horse-katy', franchise: 'Katy Perry', game: 'Dark Horse', year: 2013 },
  { id: 'song-locked-out-of-heaven', franchise: 'Bruno Mars', game: 'Locked Out of Heaven', year: 2012 },
  { id: 'song-thats-what-i-like', franchise: 'Bruno Mars', game: 'That\'s What I Like', year: 2016 },
  { id: 'song-set-fire-to-the-rain', franchise: 'Adele', game: 'Set Fire to the Rain', year: 2011 },
  { id: 'song-vampire-olivia', franchise: 'Olivia Rodrigo', game: 'vampire', year: 2023 }
];

console.log('Pop ES count:', popES.length, '(expected 68)');
console.log('Pop EN count:', popEN.length, '(expected 32)');

const allPopNew = [];
popES.forEach(t => {
  allPopNew.push({
    id: t.id, cat: 'song-pop', franchise: t.franchise, game: t.game,
    title: t.game, year: t.year, lang: 'es',
    sources: `busca('${t.franchise.replace(/'/g, "\\'")}', '${t.game.replace(/'/g, "\\'")}')`
  });
  existingIds.add(t.id);
});
popEN.forEach(t => {
  allPopNew.push({
    id: t.id, cat: 'song-pop', franchise: t.franchise, game: t.game,
    title: t.game, year: t.year, lang: 'en',
    sources: `busca('${t.franchise.replace(/'/g, "\\'")}', '${t.game.replace(/'/g, "\\'")}')`
  });
  existingIds.add(t.id);
});

fs.writeFileSync('scripts/pop-bilingual-batch.json', JSON.stringify(allPopNew, null, 2));
console.log('✅ Pop lote exportado exitosamente.');
