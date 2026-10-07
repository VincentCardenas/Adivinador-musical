const fs = require('fs');

const existingIds = new Set(JSON.parse(fs.readFileSync('scripts/existing-ids-1100.json', 'utf8')));
const rockBatch = JSON.parse(fs.readFileSync('scripts/rock-bilingual-batch.json', 'utf8'));
const popBatch = JSON.parse(fs.readFileSync('scripts/pop-bilingual-batch.json', 'utf8'));
rockBatch.forEach(t => existingIds.add(t.id));
popBatch.forEach(t => existingIds.add(t.id));

// ==========================================
// 3. RAP Y HIP-HOP (80 ES + 20 EN = 100)
// ==========================================
const rapES = [
  { id: 'song-si-senor-control-machete', franchise: 'Control Machete', game: 'Sí, señor', year: 1999 },
  { id: 'song-asi-son-mis-dias', franchise: 'Control Machete', game: 'Así son mis días', year: 1997 },
  { id: 'song-cumbia-poder', franchise: 'Control Machete', game: 'Cumbia poder', year: 1999 },
  { id: 'song-el-arte-del-engano', franchise: 'Cartel de Santa', game: 'El arte del engaño', year: 2008 },
  { id: 'song-la-pelotona', franchise: 'Cartel de Santa', game: 'La pelotona', year: 2002 },
  { id: 'song-asereje-hiphop-cartel', franchise: 'Cartel de Santa', game: 'Si te vienen a contar', year: 2014 },
  { id: 'song-suena-mamalona', franchise: 'Cartel de Santa', game: 'Suena mamalona', year: 2014 },
  { id: 'song-policeman-cartel', franchise: 'Cartel de Santa', game: 'Los mensajes del WhatsApp', year: 2014 },
  { id: 'song-somos-callejeros', franchise: 'C-Kan', game: 'Somos callejeros', year: 2012 },
  { id: 'song-vuelve-c-kan', franchise: 'C-Kan', game: 'Vuelve', year: 2012 },
  { id: 'song-esta-vida-me-encanta', franchise: 'C-Kan', game: 'Esta vida me encanta', year: 2013 },
  { id: 'song-un-par-de-balas', franchise: 'C-Kan', game: 'Un par de balas', year: 2014 },
  { id: 'song-rueda-aleman', franchise: 'Alemán', game: 'Rucón', year: 2018 },
  { id: 'song-rolemos-otro', franchise: 'Alemán', game: 'Rolemos otro', year: 2016 },
  { id: 'song-pues-que-pues', franchise: 'Alemán', game: 'Pues que pues', year: 2016 },
  { id: 'song-gran-vida-aleman', franchise: 'Alemán', game: 'Gran vida', year: 2019 },
  { id: 'song-peligroso-gera-mx', franchise: 'Gera MX', game: 'Peligroso', year: 2019 },
  { id: 'song-los-no-pertenecen', franchise: 'Gera MX', game: 'Los no pertenecen', year: 2017 },
  { id: 'song-no-veo-nada-gera', franchise: 'Gera MX', game: 'No veo nada', year: 2017 },
  { id: 'song-se-me-olvida-gera', franchise: 'Gera MX', game: 'Se me olvida', year: 2021 },
  { id: 'song-soledad-santa-fe', franchise: 'Santa Fe Klan', game: 'Soledad', year: 2021 },
  { id: 'song-mar-y-tierra', franchise: 'Santa Fe Klan', game: 'Mar y tierra', year: 2022 },
  { id: 'song-te-ire-a-buscar', franchise: 'Santa Fe Klan', game: 'Te iré a buscar', year: 2021 },
  { id: 'song-cuidando-el-territorio', franchise: 'Santa Fe Klan y Calibre 50', game: 'Cuidando el territorio', year: 2021 },
  { id: 'song-efectos-vocales-nach', franchise: 'Nach', game: 'Efectos vocales', year: 2008 },
  { id: 'song-manifiesto-nach', franchise: 'Nach', game: 'Manifiesto', year: 2008 },
  { id: 'song-el-idioma-de-los-dioses', franchise: 'Nach', game: 'El idioma de los dioses', year: 2011 },
  { id: 'song-chico-problematico-nach', franchise: 'Nach', game: 'Chico problemático', year: 2003 },
  { id: 'song-amor-libre-nach', franchise: 'Nach', game: 'Amor libre', year: 2008 },
  { id: 'song-cantando-violadores', franchise: 'Violadores del Verso', game: 'Cantando', year: 2006 },
  { id: 'song-vivir-para-contarlo', franchise: 'Violadores del Verso', game: 'Vivir para contarlo', year: 2006 },
  { id: 'song-ballantines-violadores', franchise: 'Violadores del Verso', game: 'Ballantines', year: 2001 },
  { id: 'song-maximo-exponente', franchise: 'Violadores del Verso', game: 'Máximo exponente', year: 2001 },
  { id: 'song-javier-ibarra-kaseo', franchise: 'Kase.O', game: 'Yemen', year: 2016 },
  { id: 'song-mitad-y-mitad-kaseo', franchise: 'Kase.O', game: 'Mitad y mitad', year: 2016 },
  { id: 'song-mazas-y-catapultas', franchise: 'Kase.O', game: 'Mazas y catapultas', year: 2016 },
  { id: 'song-el-circulo-kaseo', franchise: 'Kase.O', game: 'Esto no para', year: 2015 },
  { id: 'song-ringui-dingui-sfdk', franchise: 'SFDK', game: 'Ringui Dingui', year: 2021 },
  { id: 'song-el-liricista-en-el-tejado', franchise: 'SFDK', game: 'El liricista en el tejado', year: 2005 },
  { id: 'song-donde-esta-wally-sfdk', franchise: 'SFDK', game: '¿Dónde está Wifly?', year: 2003 },
  { id: 'song-agua-pasada-sfdk', franchise: 'SFDK', game: 'Agua pasada', year: 2014 },
  { id: 'song-jeremias-17-5', franchise: 'Canserbero', game: 'Jeremías 17-5', year: 2012 },
  { id: 'song-pensando-en-ti-canserbero', franchise: 'Canserbero', game: 'Pensando en ti', year: 2010 },
  { id: 'song-mundo-de-piedra', franchise: 'Canserbero', game: 'Mundo de piedra', year: 2012 },
  { id: 'song-stupid-love-story', franchise: 'Canserbero', game: 'Stupid Love Story', year: 2011 },
  { id: 'song-guia-para-la-accion', franchise: 'Canserbero', game: 'Guía para la acción', year: 2010 },
  { id: 'song-la-muerte-residente', franchise: 'Residente', game: 'La cátedra', year: 2017 },
  { id: 'song-bellacoso-residente', franchise: 'Residente y Bad Bunny', game: 'Bellacoso', year: 2019 },
  { id: 'song-hijos-del-canaveral', franchise: 'Residente', game: 'Hijos del cañaveral', year: 2017 },
  { id: 'song-flow-hp-residente', franchise: 'Residente', game: 'Flow HP', year: 2021 },
  { id: 'song-bizarrap-residente-sesion', franchise: 'Bizarrap y Residente', game: 'Residente: Bzrp Music Sessions, Vol. 49', year: 2022 },
  { id: 'song-arrancarmelo-wos', franchise: 'Wos', game: 'Arrancármelo', year: 2022 },
  { id: 'song-melocoton-wos', franchise: 'Wos', game: 'Melón vino', year: 2019 },
  { id: 'song-terraza-wos', franchise: 'Wos', game: 'Terraza', year: 2019 },
  { id: 'song-purpura-wos', franchise: 'Wos', game: 'Púrpura', year: 2018 },
  { id: 'song-mami-chula-trueno', franchise: 'Trueno y Nicki Nicole', game: 'Mamichula', year: 2020 },
  { id: 'song-atrevido-trueno', franchise: 'Trueno', game: 'Atrevido', year: 2020 },
  { id: 'song-tranky-funky-trueno', franchise: 'Trueno', game: 'Tranky Funky', year: 2023 },
  { id: 'song-mal-beco-duki', franchise: 'Duki', game: 'Malbec', year: 2021 },
  { id: 'song-si-te-sentis-sola', franchise: 'Duki', game: 'Si te sentís sola', year: 2018 },
  { id: 'song-hijo-de-la-noche', franchise: 'Duki, Ysy A y Neo Pistea', game: 'Hijo de la noche', year: 2018 },
  { id: 'song-tumbando-el-club', franchise: 'Neo Pistea', game: 'Tumbando el club (Remix)', year: 2019 },
  { id: 'song-nena-maldicion-paulo', franchise: 'Paulo Londra', game: 'Nena maldición', year: 2018 },
  { id: 'song-adan-y-eva-paulo', franchise: 'Paulo Londra', game: 'Adán y Eva', year: 2018 },
  { id: 'song-tal-vez-paulo', franchise: 'Paulo Londra', game: 'Tal vez', year: 2019 },
  { id: 'song-chica-paranormal', franchise: 'Paulo Londra', game: 'Chica paranormal', year: 2018 },
  { id: 'song-quien-manda-aqui-mala', franchise: 'Mala Rodríguez', game: '¿Quién manda aquí?', year: 2003 },
  { id: 'song-tengo-un-trato-mala', franchise: 'Mala Rodríguez', game: 'Tengo un trato', year: 2000 },
  { id: 'song-por-la-noche-mala', franchise: 'Mala Rodríguez', game: 'Por la noche', year: 2006 },
  { id: 'song-1977-ana-tijoux', franchise: 'Ana Tijoux', game: '1977', year: 2009 },
  { id: 'song-shock-ana-tijoux', franchise: 'Ana Tijoux', game: 'Shock', year: 2011 },
  { id: 'song-antipatriarca-ana-tijoux', franchise: 'Ana Tijoux', game: 'Antipatriarca', year: 2014 },
  { id: 'song-el-solitario-portavoz', franchise: 'Portavoz', game: 'El otro Chile', year: 2012 },
  { id: 'song-donde-empieza-rels-b', franchise: 'Rels B', game: 'A mí', year: 2019 },
  { id: 'song-como-dormiste-rels-b', franchise: 'Rels B', game: 'cómo dormiste?', year: 2022 },
  { id: 'song-buenos-genes-rels-b', franchise: 'Rels B', game: 'Buenos genes', year: 2018 },
  { id: 'song-rincon-flakko-milo-j', franchise: 'Milo J', game: 'Rara vez', year: 2023 },
  { id: 'song-milagrosa-milo-j', franchise: 'Milo J', game: 'Milagrosa', year: 2022 },
  { id: 'song-sesion-milo-j-bizarrap', franchise: 'Bizarrap y Milo J', game: 'Milo J: Bzrp Music Sessions, Vol. 57', year: 2023 },
  { id: 'song-wapo-traketero-nicki', franchise: 'Nicki Nicole', game: 'Wapo traketero', year: 2019 }
];

const rapEN = [
  { id: 'song-ny-state-of-mind', franchise: 'Nas', game: 'N.Y. State of Mind', year: 1994 },
  { id: 'song-if-i-ruled-the-world', franchise: 'Nas y Lauryn Hill', game: 'If I Ruled the World (Imagine That)', year: 1996 },
  { id: 'song-shimmy-shimmy-ya', franchise: 'Ol\' Dirty Bastard', game: 'Shimmy Shimmy Ya', year: 1995 },
  { id: 'song-reppin-time', franchise: 'Jim Jones', game: 'We Fly High', year: 2006 },
  { id: 'song-in-paris-jayz-kanye', franchise: 'JAY-Z y Kanye West', game: 'Ni**as in Paris', year: 2011 },
  { id: 'song-no-church-in-the-wild', franchise: 'JAY-Z y Kanye West', game: 'No Church in the Wild', year: 2011 },
  { id: 'song-hard-knock-life', franchise: 'JAY-Z', game: 'Hard Knock Life (Ghetto Anthem)', year: 1998 },
  { id: 'song-p-i-m-p-50-cent', franchise: '50 Cent', game: 'P.I.M.P.', year: 2003 },
  { id: 'song-many-men-50-cent', franchise: '50 Cent', game: 'Many Men (Wish Death)', year: 2003 },
  { id: 'song-my-name-is-eminem', franchise: 'Eminem', game: 'My Name Is', year: 1999 },
  { id: 'song-cleanin-out-my-closet', franchise: 'Eminem', game: 'Cleanin\' Out My Closet', year: 2002 },
  { id: 'song-sing-for-the-moment', franchise: 'Eminem', game: 'Sing for the Moment', year: 2002 },
  { id: 'song-money-trees-kendrick', franchise: 'Kendrick Lamar', game: 'Money Trees', year: 2012 },
  { id: 'song-bitch-dont-kill-my-vibe', franchise: 'Kendrick Lamar', game: 'Bitch, Don\'t Kill My Vibe', year: 2012 },
  { id: 'song-no-role-modelz-j-cole', franchise: 'J. Cole', game: 'No Role Modelz', year: 2014 },
  { id: 'song-middle-child-j-cole', franchise: 'J. Cole', game: 'MIDDLE CHILD', year: 2019 },
  { id: 'song-goya-travis-scott', franchise: 'Travis Scott', game: 'Antidote', year: 2015 },
  { id: 'song-highest-in-the-room', franchise: 'Travis Scott', game: 'HIGHEST IN THE ROOM', year: 2019 },
  { id: 'song-congratulations-post', franchise: 'Post Malone', game: 'Congratulations', year: 2016 },
  { id: 'song-white-iverson', franchise: 'Post Malone', game: 'White Iverson', year: 2015 }
];

console.log('Rap ES:', rapES.length, '(expected 80)');
console.log('Rap EN:', rapEN.length, '(expected 20)');

const allRapNew = [];
rapES.forEach(t => {
  allRapNew.push({
    id: t.id, cat: 'song-rap', franchise: t.franchise, game: t.game,
    title: t.game, year: t.year, lang: 'es',
    sources: `busca('${t.franchise.replace(/'/g, "\\'")}', '${t.game.replace(/'/g, "\\'")}')`
  });
  existingIds.add(t.id);
});
rapEN.forEach(t => {
  allRapNew.push({
    id: t.id, cat: 'song-rap', franchise: t.franchise, game: t.game,
    title: t.game, year: t.year, lang: 'en',
    sources: `busca('${t.franchise.replace(/'/g, "\\'")}', '${t.game.replace(/'/g, "\\'")}')`
  });
  existingIds.add(t.id);
});

fs.writeFileSync('scripts/rap-bilingual-batch.json', JSON.stringify(allRapNew, null, 2));

// ==========================================
// 4. BALADAS (28 ES + 72 EN = 100)
// ==========================================
const baladasES = [
  { id: 'song-amada-amante', franchise: 'Roberto Carlos', game: 'Amada amante', year: 1971 },
  { id: 'song-detalles-roberto-carlos', franchise: 'Roberto Carlos', game: 'Detalles', year: 1971 },
  { id: 'song-cama-y-mesa', franchise: 'Roberto Carlos', game: 'Cama y mesa', year: 1981 },
  { id: 'song-melina-camilo-sesto', franchise: 'Camilo Sesto', game: 'Melina', year: 1975 },
  { id: 'song-quieres-ser-mi-amante', franchise: 'Camilo Sesto', game: '¿Quieres ser mi amante?', year: 1974 },
  { id: 'song-si-me-dejas-ahora', franchise: 'José José', game: 'Si me dejas ahora', year: 1979 },
  { id: 'song-amar-y-querer', franchise: 'José José', game: 'Amar y querer', year: 1977 },
  { id: 'song-preso-jose-jose', franchise: 'José José', game: 'Preso', year: 1981 },
  { id: 'song-payaso-jose-jose', franchise: 'José José', game: 'Payaso', year: 1983 },
  { id: 'song-seria-capaz-jose-jose', franchise: 'José José', game: '¿Y quién puede ser?', year: 1986 },
  { id: 'song-no-vale-la-pena', franchise: 'Juan Gabriel', game: 'No vale la pena', year: 1983 },
  { id: 'song-pero-que-necesidad', franchise: 'Juan Gabriel', game: 'Pero qué necesidad', year: 1994 },
  { id: 'song-fue-un-placer-conocerte', franchise: 'Rocío Dúrcal', game: 'Fue un placer conocerte', year: 1977 },
  { id: 'song-vestida-de-azucar', franchise: 'Gloria Trevi', game: 'Vestida de azúcar', year: 2011 },
  { id: 'song-no-querias-lastimarme', franchise: 'Gloria Trevi', game: 'No querías lastimarme', year: 2013 },
  { id: 'song-bella-manuel-mijares', franchise: 'Manuel Mijares', game: 'Bella', year: 1986 },
  { id: 'song-soldado-del-amor', franchise: 'Manuel Mijares', game: 'Soldado del amor', year: 1988 },
  { id: 'song-fria-como-el-viento', franchise: 'Luis Miguel', game: 'Fría como el viento', year: 1988 },
  { id: 'song-involvidable-luis-miguel', franchise: 'Luis Miguel', game: 'Inolvidable', year: 1991 },
  { id: 'song-no-se-tu-luis-miguel', franchise: 'Luis Miguel', game: 'No sé tú', year: 1991 },
  { id: 'song-por-debajo-de-la-mesa', franchise: 'Luis Miguel', game: 'Por debajo de la mesa', year: 1997 },
  { id: 'song-la-media-vuelta', franchise: 'Luis Miguel', game: 'La media vuelta', year: 1994 },
  { id: 'song-amarte-es-un-placer', franchise: 'Luis Miguel', game: 'Amarte es un placer', year: 1999 },
  { id: 'song-volver-a-amar-cristian', franchise: 'Cristian Castro', game: 'Volver a amar', year: 1999 },
  { id: 'song-lloran-las-rosas', franchise: 'Cristian Castro', game: 'Lloran las rosas', year: 1997 },
  { id: 'song-yo-queria-cristian', franchise: 'Cristian Castro', game: 'Yo quería', year: 2001 },
  { id: 'song-que-me-alcance-la-vida', franchise: 'Sin Bandera', game: 'Que me alcance la vida', year: 2006 },
  { id: 'song-te-vi-venir-sin-bandera', franchise: 'Sin Bandera', game: 'Te vi venir', year: 2002 }
];

const baladasEN = [
  { id: 'song-something-beatles', franchise: 'The Beatles', game: 'Something', year: 1969 },
  { id: 'song-the-long-and-winding-road', franchise: 'The Beatles', game: 'The Long and Winding Road', year: 1970 },
  { id: 'song-all-you-need-is-love', franchise: 'The Beatles', game: 'All You Need Is Love', year: 1967 },
  { id: 'song-piano-man-billy-joel', franchise: 'Billy Joel', game: 'Piano Man', year: 1973 },
  { id: 'song-just-the-way-you-are-joel', franchise: 'Billy Joel', game: 'Just the Way You Are', year: 1977 },
  { id: 'song-honesty-billy-joel', franchise: 'Billy Joel', game: 'Honesty', year: 1978 },
  { id: 'song-tiny-dancer-elton', franchise: 'Elton John', game: 'Tiny Dancer', year: 1971 },
  { id: 'song-rocket-man-elton', franchise: 'Elton John', game: 'Rocket Man (I Think It\'s Going to Be a Long, Long Time)', year: 1972 },
  { id: 'song-candle-in-the-wind', franchise: 'Elton John', game: 'Candle in the Wind', year: 1973 },
  { id: 'song-goodbye-yellow-brick-road', franchise: 'Elton John', game: 'Goodbye Yellow Brick Road', year: 1973 },
  { id: 'song-dont-let-the-sun-go-down', franchise: 'Elton John', game: 'Don\'t Let the Sun Go Down on Me', year: 1974 },
  { id: 'song-sorry-seems-to-be', franchise: 'Elton John', game: 'Sorry Seems to Be the Hardest Word', year: 1976 },
  { id: 'song-bridge-over-troubled-water', franchise: 'Simon & Garfunkel', game: 'Bridge over Troubled Water', year: 1970 },
  { id: 'song-the-sound-of-silence-sg', franchise: 'Simon & Garfunkel', game: 'The Sound of Silence', year: 1965 },
  { id: 'song-make-it-with-you', franchise: 'Bread', game: 'Make It with You', year: 1970 },
  { id: 'song-if-bread', franchise: 'Bread', game: 'If', year: 1971 },
  { id: 'song-without-you-nilsson', franchise: 'Harry Nilsson', game: 'Without You', year: 1971 },
  { id: 'song-killing-me-softly', franchise: 'Roberta Flack', game: 'Killing Me Softly with His Song', year: 1973 },
  { id: 'song-the-first-time-ever', franchise: 'Roberta Flack', game: 'The First Time Ever I Saw Your Face', year: 1972 },
  { id: 'song-you-are-so-beautiful', franchise: 'Joe Cocker', game: 'You Are So Beautiful', year: 1974 },
  { id: 'song-three-times-a-lady', franchise: 'Commodores', game: 'Three Times a Lady', year: 1978 },
  { id: 'song-sail-on-commodores', franchise: 'Commodores', game: 'Sail On', year: 1979 },
  { id: 'song-easy-commodores', franchise: 'Commodores', game: 'Easy', year: 1977 },
  { id: 'song-hello-lionel-richie', franchise: 'Lionel Richie', game: 'Hello', year: 1983 },
  { id: 'song-truly-lionel-richie', franchise: 'Lionel Richie', game: 'Truly', year: 1982 },
  { id: 'song-say-you-say-me', franchise: 'Lionel Richie', game: 'Say You, Say Me', year: 1985 },
  { id: 'song-stuck-on-you-lionel', franchise: 'Lionel Richie', game: 'Stuck on You', year: 1984 },
  { id: 'song-penny-lover-lionel', franchise: 'Lionel Richie', game: 'Penny Lover', year: 1983 },
  { id: 'song-i-just-called-to-say', franchise: 'Stevie Wonder', game: 'I Just Called to Say I Love You', year: 1984 },
  { id: 'song-lately-stevie-wonder', franchise: 'Stevie Wonder', game: 'Lately', year: 1980 },
  { id: 'song-overjoyed-stevie', franchise: 'Stevie Wonder', game: 'Overjoyed', year: 1985 },
  { id: 'song-ribbon-in-the-sky', franchise: 'Stevie Wonder', game: 'Ribbon in the Sky', year: 1982 },
  { id: 'song-open-arms-journey', franchise: 'Journey', game: 'Open Arms', year: 1981 },
  { id: 'song-faithfully-journey', franchise: 'Journey', game: 'Faithfully', year: 1983 },
  { id: 'song-waiting-for-a-girl', franchise: 'Foreigner', game: 'Waiting for a Girl Like You', year: 1981 },
  { id: 'song-i-want-to-know-what-love-is', franchise: 'Foreigner', game: 'I Want to Know What Love Is', year: 1984 },
  { id: 'song-hard-to-say-im-sorry', franchise: 'Chicago', game: 'Hard to Say I\'m Sorry', year: 1982 },
  { id: 'song-youre-the-inspiration', franchise: 'Chicago', game: 'You\'re the Inspiration', year: 1984 },
  { id: 'song-if-you-leave-me-now', franchise: 'Chicago', game: 'If You Leave Me Now', year: 1976 },
  { id: 'song-in-the-air-tonight', franchise: 'Phil Collins', game: 'In the Air Tonight', year: 1981 },
  { id: 'song-one-more-night-phil', franchise: 'Phil Collins', game: 'One More Night', year: 1985 },
  { id: 'song-a-groovy-kind-of-love', franchise: 'Phil Collins', game: 'A Groovy Kind of Love', year: 1988 },
  { id: 'song-do-you-remember-phil', franchise: 'Phil Collins', game: 'Do You Remember?', year: 1989 },
  { id: 'song-heaven-bryan-adams', franchise: 'Bryan Adams', game: 'Heaven', year: 1984 },
  { id: 'song-please-forgive-me', franchise: 'Bryan Adams', game: 'Please Forgive Me', year: 1993 },
  { id: 'song-straight-from-the-heart', franchise: 'Bryan Adams', game: 'Straight from the Heart', year: 1983 },
  { id: 'song-have-you-ever-really-loved', franchise: 'Bryan Adams', game: 'Have You Ever Really Loved a Woman?', year: 1995 },
  { id: 'song-all-out-of-love', franchise: 'Air Supply', game: 'All Out of Love', year: 1980 },
  { id: 'song-making-love-out-of-nothing', franchise: 'Air Supply', game: 'Making Love Out of Nothing at All', year: 1983 },
  { id: 'song-lost-in-love-air-supply', franchise: 'Air Supply', game: 'Lost in Love', year: 1980 },
  { id: 'song-even-the-nights-are-better', franchise: 'Air Supply', game: 'Even the Nights Are Better', year: 1982 },
  { id: 'song-here-i-am-air-supply', franchise: 'Air Supply', game: 'Here I Am (Just When I Thought I Was Over You)', year: 1981 },
  { id: 'song-when-a-man-loves-a-woman-bolton', franchise: 'Michael Bolton', game: 'When a Man Loves a Woman', year: 1991 },
  { id: 'song-how-am-i-supposed-to-live', franchise: 'Michael Bolton', game: 'How Am I Supposed to Live Without You', year: 1989 },
  { id: 'song-time-love-and-tenderness', franchise: 'Michael Bolton', game: 'Time, Love and Tenderness', year: 1991 },
  { id: 'song-said-i-loved-you', franchise: 'Michael Bolton', game: 'Said I Loved You...But I Lied', year: 1993 },
  { id: 'song-have-i-told-you-lately', franchise: 'Rod Stewart', game: 'Have I Told You Lately', year: 1993 },
  { id: 'song-i-dont-want-to-talk-about-it', franchise: 'Rod Stewart', game: 'I Don\'t Want to Talk About It', year: 1975 },
  { id: 'song-youre-in-my-heart', franchise: 'Rod Stewart', game: 'You\'re in My Heart (The Final Acclaim)', year: 1977 },
  { id: 'song-forever-young-rod', franchise: 'Rod Stewart', game: 'Forever Young', year: 1988 },
  { id: 'song-always-atlantic-starr', franchise: 'Atlantic Starr', game: 'Always', year: 1987 },
  { id: 'song-save-the-best-for-last', franchise: 'Vanessa Williams', game: 'Save the Best for Last', year: 1991 },
  { id: 'song-un-break-my-heart', franchise: 'Toni Braxton', game: 'Un-Break My Heart', year: 1996 },
  { id: 'song-breathe-again-toni', franchise: 'Toni Braxton', game: 'Breathe Again', year: 1993 },
  { id: 'song-i-swear-all-4-one', franchise: 'All-4-One', game: 'I Swear', year: 1994 },
  { id: 'song-i-can-love-you-like-that', franchise: 'All-4-One', game: 'I Can Love You Like That', year: 1995 },
  { id: 'song-end-of-the-road-boyz', franchise: 'Boyz II Men', game: 'End of the Road', year: 1992 },
  { id: 'song-ill-make-love-to-you', franchise: 'Boyz II Men', game: 'I\'ll Make Love to You', year: 1994 },
  { id: 'song-on-bended-knee-boyz', franchise: 'Boyz II Men', game: 'On Bended Knee', year: 1994 },
  { id: 'song-one-sweet-day', franchise: 'Mariah Carey y Boyz II Men', game: 'One Sweet Day', year: 1995 },
  { id: 'song-vision-of-love', franchise: 'Mariah Carey', game: 'Vision of Love', year: 1990 },
  { id: 'song-without-you-mariah', franchise: 'Mariah Carey', game: 'Without You', year: 1993 }
];

console.log('Baladas ES:', baladasES.length, '(expected 28)');
console.log('Baladas EN:', baladasEN.length, '(expected 72)');

const allBaladasNew = [];
baladasES.forEach(t => {
  allBaladasNew.push({
    id: t.id, cat: 'song-baladas', franchise: t.franchise, game: t.game,
    title: t.game, year: t.year, lang: 'es',
    sources: `busca('${t.franchise.replace(/'/g, "\\'")}', '${t.game.replace(/'/g, "\\'")}')`
  });
  existingIds.add(t.id);
});
baladasEN.forEach(t => {
  allBaladasNew.push({
    id: t.id, cat: 'song-baladas', franchise: t.franchise, game: t.game,
    title: t.game, year: t.year, lang: 'en',
    sources: `busca('${t.franchise.replace(/'/g, "\\'")}', '${t.game.replace(/'/g, "\\'")}')`
  });
  existingIds.add(t.id);
});

fs.writeFileSync('scripts/baladas-bilingual-batch.json', JSON.stringify(allBaladasNew, null, 2));

console.log('✅ Rap y Baladas exportados exitosamente.');
