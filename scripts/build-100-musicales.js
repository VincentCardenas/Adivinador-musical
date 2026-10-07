const fs = require('fs');

const existingIds = new Set(JSON.parse(fs.readFileSync('scripts/all-project-ids.json', 'utf8')));

const clasicos = [
  { id: 'mus-ding-dong-witch', franchise: 'The Wizard of Oz', game: 'Ding-Dong! The Witch Is Dead', composer: 'Judy Garland y elenco', year: 1939, platform: 'Película', lang: 'en' },
  { id: 'mus-if-i-only-had-a-brain', franchise: 'The Wizard of Oz', game: 'If I Only Had a Brain', composer: 'Ray Bolger y Judy Garland', year: 1939, platform: 'Película', lang: 'en' },
  { id: 'mus-moses-supposes', franchise: 'Singin\' in the Rain', game: 'Moses Supposes', composer: 'Gene Kelly y Donald O\'Connor', year: 1952, platform: 'Película', lang: 'en' },
  { id: 'mus-you-were-meant-for-me', franchise: 'Singin\' in the Rain', game: 'You Were Meant for Me', composer: 'Gene Kelly', year: 1952, platform: 'Película', lang: 'en' },
  { id: 'mus-wss-i-feel-pretty', franchise: 'West Side Story', game: 'I Feel Pretty', composer: 'Marni Nixon y elenco', year: 1961, platform: 'Película', lang: 'en' },
  { id: 'mus-wss-somethings-coming', franchise: 'West Side Story', game: 'Something\'s Coming', composer: 'Jim Bryant', year: 1961, platform: 'Película', lang: 'en' },
  { id: 'mus-wss-somewhere', franchise: 'West Side Story', game: 'Somewhere', composer: 'Reri Grist', year: 1961, platform: 'Película', lang: 'en' },
  { id: 'mus-sound-climb-evry-mountain', franchise: 'The Sound of Music', game: 'Climb Ev\'ry Mountain', composer: 'Peggy Wood', year: 1965, platform: 'Película', lang: 'en' },
  { id: 'mus-sound-sixteen-going-on-seventeen', franchise: 'The Sound of Music', game: 'Sixteen Going on Seventeen', composer: 'Charmian Carr y Daniel Truhitte', year: 1965, platform: 'Película', lang: 'en' },
  { id: 'mus-sound-the-lonely-goatherd', franchise: 'The Sound of Music', game: 'The Lonely Goatherd', composer: 'Julie Andrews y los niños von Trapp', year: 1965, platform: 'Película', lang: 'en' },
  { id: 'mus-sound-so-long-farewell', franchise: 'The Sound of Music', game: 'So Long, Farewell', composer: 'Los niños von Trapp', year: 1965, platform: 'Película', lang: 'en' },
  { id: 'mus-mfl-wouldnt-it-be-loverly', franchise: 'My Fair Lady', game: 'Wouldn\'t It Be Loverly', composer: 'Marni Nixon', year: 1964, platform: 'Película', lang: 'en' },
  { id: 'mus-mfl-the-rain-in-spain', franchise: 'My Fair Lady', game: 'The Rain in Spain', composer: 'Rex Harrison, Marni Nixon y Wilfrid Hyde-White', year: 1964, platform: 'Película', lang: 'en' },
  { id: 'mus-mfl-on-the-street', franchise: 'My Fair Lady', game: 'On the Street Where You Live', composer: 'Bill Shirley', year: 1964, platform: 'Película', lang: 'en' },
  { id: 'mus-mfl-get-me-to-the-church', franchise: 'My Fair Lady', game: 'Get Me to the Church on Time', composer: 'Stanley Holloway y elenco', year: 1964, platform: 'Película', lang: 'en' },
  { id: 'mus-fiddler-matchmaker', franchise: 'Fiddler on the Roof', game: 'Matchmaker, Matchmaker', composer: 'Elenco de la película', year: 1971, platform: 'Película', lang: 'en' },
  { id: 'mus-fiddler-to-life', franchise: 'Fiddler on the Roof', game: 'To Life', composer: 'Topol y elenco', year: 1971, platform: 'Película', lang: 'en' },
  { id: 'mus-oklahoma-surrey', franchise: 'Oklahoma!', game: 'The Surrey with the Fringe on Top', composer: 'Gordon MacRae', year: 1955, platform: 'Película', lang: 'en' },
  { id: 'mus-oklahoma-people-will-say', franchise: 'Oklahoma!', game: 'People Will Say We\'re in Love', composer: 'Gordon MacRae y Shirley Jones', year: 1955, platform: 'Película', lang: 'en' },
  { id: 'mus-oklahoma-title', franchise: 'Oklahoma!', game: 'Oklahoma', composer: 'Gordon MacRae y elenco', year: 1955, platform: 'Película', lang: 'en' },
  { id: 'mus-king-i-getting-to-know-you', franchise: 'The King and I', game: 'Getting to Know You', composer: 'Marni Nixon y elenco', year: 1956, platform: 'Película', lang: 'en' },
  { id: 'mus-king-i-hello-young-lovers', franchise: 'The King and I', game: 'Hello, Young Lovers', composer: 'Marni Nixon', year: 1956, platform: 'Película', lang: 'en' },
  { id: 'mus-guys-luck-be-a-lady', franchise: 'Guys and Dolls', game: 'Luck Be a Lady', composer: 'Marlon Brando y elenco', year: 1955, platform: 'Película', lang: 'en' },
  { id: 'mus-guys-sit-down-rockin', franchise: 'Guys and Dolls', game: 'Sit Down, You\'re Rockin\' the Boat', composer: 'Stubby Kaye y elenco', year: 1955, platform: 'Película', lang: 'en' },
  { id: 'mus-birdie-put-on-a-happy-face', franchise: 'Bye Bye Birdie', game: 'Put on a Happy Face', composer: 'Dick Van Dyke', year: 1963, platform: 'Película', lang: 'en' }
];

const anos7080 = [
  { id: 'mus-grease-sandy', franchise: 'Grease', game: 'Sandy', composer: 'John Travolta', year: 1978, platform: 'Película', lang: 'en' },
  { id: 'mus-grease-beauty-school', franchise: 'Grease', game: 'Beauty School Dropout', composer: 'Frankie Avalon', year: 1978, platform: 'Película', lang: 'en' },
  { id: 'mus-grease-worse-things', franchise: 'Grease', game: 'There Are Worse Things I Could Do', composer: 'Stockard Channing', year: 1978, platform: 'Película', lang: 'en' },
  { id: 'mus-grease-sandra-dee', franchise: 'Grease', game: 'Look at Me, I\'m Sandra Dee', composer: 'Stockard Channing', year: 1978, platform: 'Película', lang: 'en' },
  { id: 'mus-grease-freddy-mi-amor', franchise: 'Grease', game: 'Freddy, mi amor', composer: 'Timbiriche', year: 1984, platform: 'México', lang: 'es', aka: ['Freddy, My Love'] },
  { id: 'mus-grease-noches-de-verano', franchise: 'Grease', game: 'Noches de verano', composer: 'Timbiriche', year: 1984, platform: 'México', lang: 'es', aka: ['Summer Nights'] },
  { id: 'mus-jcs-heaven-on-their-minds', franchise: 'Jesus Christ Superstar', game: 'Heaven on Their Minds', composer: 'Carl Anderson', year: 1973, platform: 'Película', lang: 'en' },
  { id: 'mus-jcs-everythings-alright', franchise: 'Jesus Christ Superstar', game: 'Everything\'s Alright', composer: 'Yvonne Elliman, Carl Anderson y Ted Neeley', year: 1973, platform: 'Película', lang: 'en' },
  { id: 'mus-jcs-king-herods-song', franchise: 'Jesus Christ Superstar', game: 'King Herod\'s Song', composer: 'Josh Mostel', year: 1973, platform: 'Película', lang: 'en' },
  { id: 'mus-rocky-sweet-transvestite', franchise: 'The Rocky Horror Picture Show', game: 'Sweet Transvestite', composer: 'Tim Curry', year: 1975, platform: 'Película', lang: 'en' },
  { id: 'mus-rocky-science-fiction', franchise: 'The Rocky Horror Picture Show', game: 'Science Fiction/Double Feature', composer: 'Richard O\'Brien', year: 1975, platform: 'Película', lang: 'en' },
  { id: 'mus-rocky-touch-a-touch-me', franchise: 'The Rocky Horror Picture Show', game: 'Touch-a, Touch-a, Touch-a, Touch Me', composer: 'Susan Sarandon', year: 1975, platform: 'Película', lang: 'en' },
  { id: 'mus-chicago-roxie', franchise: 'Chicago', game: 'Roxie', composer: 'Renée Zellweger', year: 2002, platform: 'Película', lang: 'en' },
  { id: 'mus-chicago-when-youre-good', franchise: 'Chicago', game: 'When You\'re Good to Mama', composer: 'Queen Latifah', year: 2002, platform: 'Película', lang: 'en' },
  { id: 'mus-chicago-mister-cellophane', franchise: 'Chicago', game: 'Mister Cellophane', composer: 'John C. Reilly', year: 2002, platform: 'Película', lang: 'en' },
  { id: 'mus-chicago-razzle-dazzle', franchise: 'Chicago', game: 'Razzle Dazzle', composer: 'Richard Gere', year: 2002, platform: 'Película', lang: 'en' },
  { id: 'mus-annie-never-fully-dressed', franchise: 'Annie', game: 'You\'re Never Fully Dressed Without a Smile', composer: 'Peter Marshall y las huérfanas', year: 1982, platform: 'Película', lang: 'en' },
  { id: 'mus-annie-easy-street', franchise: 'Annie', game: 'Easy Street', composer: 'Carol Burnett, Tim Curry y Bernadette Peters', year: 1982, platform: 'Película', lang: 'en' },
  { id: 'mus-evita-buenos-aires', franchise: 'Evita', game: 'Buenos Aires', composer: 'Madonna', year: 1996, platform: 'Película', lang: 'en' },
  { id: 'mus-evita-another-suitcase', franchise: 'Evita', game: 'Another Suitcase in Another Hall', composer: 'Madonna', year: 1996, platform: 'Película', lang: 'en' },
  { id: 'mus-cats-jellicle-songs', franchise: 'Cats', game: 'Jellicle Songs for Jellicle Cats', composer: 'Elenco original de Londres', year: 1981, platform: 'Londres', lang: 'en' },
  { id: 'mus-cats-mr-mistoffelees', franchise: 'Cats', game: 'Mr. Mistoffelees', composer: 'Wayne Sleep y elenco', year: 1981, platform: 'Londres', lang: 'en' },
  { id: 'mus-lesmis-bring-him-home', franchise: 'Les Misérables', game: 'Bring Him Home', composer: 'Colm Wilkinson', year: 1985, platform: 'Londres', lang: 'en' },
  { id: 'mus-lesmis-stars', franchise: 'Les Misérables', game: 'Stars', composer: 'Philip Quast', year: 1985, platform: 'Londres', lang: 'en' },
  { id: 'mus-lesmis-empty-chairs', franchise: 'Les Misérables', game: 'Empty Chairs at Empty Tables', composer: 'Michael Ball', year: 1985, platform: 'Londres', lang: 'en' }
];

const anos9000 = [
  { id: 'mus-phantom-masquerade', franchise: 'The Phantom of the Opera', game: 'Masquerade', composer: 'Elenco original de Londres', year: 1986, platform: 'Londres', lang: 'en' },
  { id: 'mus-phantom-wishing-you-were', franchise: 'The Phantom of the Opera', game: 'Wishing You Were Somehow Here Again', composer: 'Sarah Brightman', year: 1986, platform: 'Londres', lang: 'en' },
  { id: 'mus-phantom-point-of-no-return', franchise: 'The Phantom of the Opera', game: 'The Point of No Return', composer: 'Michael Crawford y Sarah Brightman', year: 1986, platform: 'Londres', lang: 'en' },
  { id: 'mus-phantom-think-of-me', franchise: 'The Phantom of the Opera', game: 'Think of Me', composer: 'Sarah Brightman', year: 1986, platform: 'Londres', lang: 'en' },
  { id: 'mus-rent-out-tonight', franchise: 'Rent', game: 'Out Tonight', composer: 'Daphne Rubin-Vega', year: 1996, platform: 'Broadway', lang: 'en' },
  { id: 'mus-rent-ill-cover-you', franchise: 'Rent', game: 'I\'ll Cover You', composer: 'Jesse L. Martin y Wilson Jermaine Heredia', year: 1996, platform: 'Broadway', lang: 'en' },
  { id: 'mus-rent-light-my-candle', franchise: 'Rent', game: 'Light My Candle', composer: 'Adam Pascal y Daphne Rubin-Vega', year: 1996, platform: 'Broadway', lang: 'en' },
  { id: 'mus-rent-la-vie-boheme', franchise: 'Rent', game: 'La Vie Bohème', composer: 'Elenco original de Broadway', year: 1996, platform: 'Broadway', lang: 'en' },
  { id: 'mus-mamma-sos', franchise: 'Mamma Mia!', game: 'SOS', composer: 'Meryl Streep y Pierce Brosnan', year: 2008, platform: 'Película', lang: 'en' },
  { id: 'mus-mamma-take-a-chance', franchise: 'Mamma Mia!', game: 'Take a Chance on Me', composer: 'Julie Walters y Stellan Skarsgård', year: 2008, platform: 'Película', lang: 'en' },
  { id: 'mus-mamma-the-winner-takes-it-all', franchise: 'Mamma Mia!', game: 'The Winner Takes It All', composer: 'Meryl Streep', year: 2008, platform: 'Película', lang: 'en' },
  { id: 'mus-mamma-honey-honey', franchise: 'Mamma Mia!', game: 'Honey, Honey', composer: 'Amanda Seyfried, Ashley Lilley y Rachel McDowall', year: 2008, platform: 'Película', lang: 'en' },
  { id: 'mus-mamma-super-trouper', franchise: 'Mamma Mia!', game: 'Super Trouper', composer: 'Meryl Streep, Christine Baranski y Julie Walters', year: 2008, platform: 'Película', lang: 'en' },
  { id: 'mus-wicked-the-wizard-and-i', franchise: 'Wicked', game: 'The Wizard and I', composer: 'Idina Menzel y Carole Shelley', year: 2003, platform: 'Broadway', lang: 'en' },
  { id: 'mus-wicked-no-good-deed', franchise: 'Wicked', game: 'No Good Deed', composer: 'Idina Menzel', year: 2003, platform: 'Broadway', lang: 'en' },
  { id: 'mus-wicked-dancing-through-life', franchise: 'Wicked', game: 'Dancing Through Life', composer: 'Norbert Leo Butz y elenco', year: 2003, platform: 'Broadway', lang: 'en' },
  { id: 'mus-wicked-one-short-day', franchise: 'Wicked', game: 'One Short Day', composer: 'Kristin Chenoweth, Idina Menzel y elenco', year: 2003, platform: 'Broadway', lang: 'en' },
  { id: 'mus-wicked-as-long-as-youre-mine', franchise: 'Wicked', game: 'As Long as You\'re Mine', composer: 'Idina Menzel y Leo Norbert Butz', year: 2003, platform: 'Broadway', lang: 'en' },
  { id: 'mus-hairspray-i-can-hear-the-bells', franchise: 'Hairspray', game: 'I Can Hear the Bells', composer: 'Nikki Blonsky', year: 2007, platform: 'Película', lang: 'en' },
  { id: 'mus-hairspray-welcome-to-the-60s', franchise: 'Hairspray', game: 'Welcome to the 60\'s', composer: 'Nikki Blonsky y John Travolta', year: 2007, platform: 'Película', lang: 'en' },
  { id: 'mus-hairspray-without-love', franchise: 'Hairspray', game: 'Without Love', composer: 'Zac Efron, Nikki Blonsky, Elijah Kelley y Amanda Bynes', year: 2007, platform: 'Película', lang: 'en' },
  { id: 'mus-heights-breathe', franchise: 'In the Heights', game: 'Breathe', composer: 'Mandy Gonzalez', year: 2008, platform: 'Broadway', lang: 'en' },
  { id: 'mus-heights-96000', franchise: 'In the Heights', game: '96,000', composer: 'Lin-Manuel Miranda y elenco', year: 2008, platform: 'Broadway', lang: 'en' },
  { id: 'mus-heights-carnaval-del-barrio', franchise: 'In the Heights', game: 'Carnaval del Barrio', composer: 'Andréa Burns y elenco', year: 2008, platform: 'Broadway', lang: 'en' },
  { id: 'mus-avenue-q-if-you-were-gay', franchise: 'Avenue Q', game: 'If You Were Gay', composer: 'John Tartaglia y Rick Lyon', year: 2003, platform: 'Broadway', lang: 'en' }
];

const anos2010 = [
  { id: 'mus-hamilton-wait-for-it', franchise: 'Hamilton', game: 'Wait for It', composer: 'Leslie Odom, Jr. y elenco', year: 2015, platform: 'Broadway', lang: 'en' },
  { id: 'mus-hamilton-the-schuyler-sisters', franchise: 'Hamilton', game: 'The Schuyler Sisters', composer: 'Renée Elise Goldsberry, Phillipa Soo, Jasmine Cephas Jones y elenco', year: 2015, platform: 'Broadway', lang: 'en' },
  { id: 'mus-hamilton-dear-theodosia', franchise: 'Hamilton', game: 'Dear Theodosia', composer: 'Lin-Manuel Miranda y Leslie Odom, Jr.', year: 2015, platform: 'Broadway', lang: 'en' },
  { id: 'mus-hamilton-burn', franchise: 'Hamilton', game: 'Burn', composer: 'Phillipa Soo', year: 2015, platform: 'Broadway', lang: 'en' },
  { id: 'mus-hamilton-the-room-where-it-happens', franchise: 'Hamilton', game: 'The Room Where It Happens', composer: 'Leslie Odom, Jr., Lin-Manuel Miranda y elenco', year: 2015, platform: 'Broadway', lang: 'en' },
  { id: 'mus-hamilton-helpless', franchise: 'Hamilton', game: 'Helpless', composer: 'Phillipa Soo y elenco', year: 2015, platform: 'Broadway', lang: 'en' },
  { id: 'mus-hamilton-non-stop', franchise: 'Hamilton', game: 'Non-Stop', composer: 'Lin-Manuel Miranda, Leslie Odom, Jr. y elenco', year: 2015, platform: 'Broadway', lang: 'en' },
  { id: 'mus-hamilton-guns-and-ships', franchise: 'Hamilton', game: 'Guns and Ships', composer: 'Daveed Diggs, Leslie Odom, Jr. y elenco', year: 2015, platform: 'Broadway', lang: 'en' },
  { id: 'mus-showman-never-enough', franchise: 'The Greatest Showman', game: 'Never Enough', composer: 'Loren Allred', year: 2017, platform: 'Película', lang: 'en' },
  { id: 'mus-showman-from-now-on', franchise: 'The Greatest Showman', game: 'From Now On', composer: 'Hugh Jackman y elenco', year: 2017, platform: 'Película', lang: 'en' },
  { id: 'mus-showman-the-other-side', franchise: 'The Greatest Showman', game: 'The Other Side', composer: 'Hugh Jackman y Zac Efron', year: 2017, platform: 'Película', lang: 'en' },
  { id: 'mus-showman-come-alive', franchise: 'The Greatest Showman', game: 'Come Alive', composer: 'Hugh Jackman, Keala Settle, Daniel Everidge y Zendaya', year: 2017, platform: 'Película', lang: 'en' },
  { id: 'mus-showman-tightrope', franchise: 'The Greatest Showman', game: 'Tightrope', composer: 'Michelle Williams', year: 2017, platform: 'Película', lang: 'en' },
  { id: 'mus-lalaland-a-lovely-night', franchise: 'La La Land', game: 'A Lovely Night', composer: 'Ryan Gosling y Emma Stone', year: 2016, platform: 'Película', lang: 'en' },
  { id: 'mus-lalaland-someone-in-the-crowd', franchise: 'La La Land', game: 'Someone in the Crowd', composer: 'Emma Stone, Callie Hernandez, Sonoya Mizuno y Jessica Rothe', year: 2016, platform: 'Película', lang: 'en' },
  { id: 'mus-deh-for-forever', franchise: 'Dear Evan Hansen', game: 'For Forever', composer: 'Ben Platt', year: 2017, platform: 'Broadway', lang: 'en' },
  { id: 'mus-deh-sincerely-me', franchise: 'Dear Evan Hansen', game: 'Sincerely, Me', composer: 'Mike Faist, Ben Platt y Will Roland', year: 2017, platform: 'Broadway', lang: 'en' },
  { id: 'mus-deh-words-fail', franchise: 'Dear Evan Hansen', game: 'Words Fail', composer: 'Ben Platt', year: 2017, platform: 'Broadway', lang: 'en' },
  { id: 'mus-six-dont-lose-ur-head', franchise: 'Six', game: 'Don\'t Lose Ur Head', composer: 'Christina Modestou y elenco', year: 2018, platform: 'Londres', lang: 'en' },
  { id: 'mus-six-heart-of-stone', franchise: 'Six', game: 'Heart of Stone', composer: 'Natalie Paris y elenco', year: 2018, platform: 'Londres', lang: 'en' },
  { id: 'mus-six-all-you-wanna-do', franchise: 'Six', game: 'All You Wanna Do', composer: 'Aimie Atkinson y elenco', year: 2018, platform: 'Londres', lang: 'en' },
  { id: 'mus-hadestown-wait-for-me', franchise: 'Hadestown', game: 'Wait for Me', composer: 'André De Shields, Reeve Carney y elenco', year: 2019, platform: 'Broadway', lang: 'en' },
  { id: 'mus-hadestown-way-down', franchise: 'Hadestown', game: 'Way Down Hadestown', composer: 'Amber Gray, André De Shields y elenco', year: 2019, platform: 'Broadway', lang: 'en' },
  { id: 'mus-hadestown-why-we-build', franchise: 'Hadestown', game: 'Why We Build the Wall', composer: 'Patrick Page y elenco', year: 2019, platform: 'Broadway', lang: 'en' },
  { id: 'mus-beetlejuice-dead-mom', franchise: 'Beetlejuice', game: 'Dead Mom', composer: 'Sophia Anne Caruso', year: 2019, platform: 'Broadway', lang: 'en' }
];

console.log('Clásicos:', clasicos.length);
console.log('70s-80s:', anos7080.length);
console.log('90s-00s:', anos9000.length);
console.log('2010+:', anos2010.length);

const allNew = {
  'mus-clasicos': clasicos,
  'mus-7080': anos7080,
  'mus-9000': anos9000,
  'mus-10s': anos2010
};

let errors = 0;
const newIds = new Set();

for (const [cat, list] of Object.entries(allNew)) {
  list.forEach(t => {
    t.cat = cat;
    t.title = t.game;
    t.sources = `busca('${t.franchise.replace(/'/g, "\\'")}', '${t.game.replace(/'/g, "\\'")}')`;
    if (existingIds.has(t.id)) {
      console.error('CLASH con ID existente:', t.id);
      errors++;
    }
    if (newIds.has(t.id)) {
      console.error('CLASH dentro del nuevo lote:', t.id);
      errors++;
    }
    newIds.add(t.id);
  });
}

console.log('Total nuevos:', newIds.size);
console.log('Total errores:', errors);

if (errors === 0) {
  fs.writeFileSync('scripts/musicales-100-batch.json', JSON.stringify(allNew, null, 2));
  console.log('✅ 100 canciones de Musicales exportadas a scripts/musicales-100-batch.json exitosamente.');
} else {
  process.exit(1);
}
