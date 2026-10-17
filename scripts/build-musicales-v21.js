/**
 * Fase 3 — Expansión de Musicales (+47 pistas: 222 -> 269)
 * Categorías:
 *   - mus-clasicos: 56 -> +12 = 68 (incluye 3 en español: lang: 'es')
 *   - mus-7080: 61 -> +13 = 74
 *   - mus-9000: 52 -> +11 = 63
 *   - mus-10s: 53 -> +11 = 64 (incluye 3 en español: lang: 'es')
 *
 * Reanudable, comprueba cada fuente en vivo con lib-v21.js y registra evidencia en scripts/evidencia-v2.1.json.
 */
const fs = require('fs');
const path = require('path');
const {
  searchAndVerifyYoutube,
  searchApple,
  recordAppleTrackEvidence,
} = require('./lib-v21');

const CATALOG_PATH = path.join(__dirname, '..', 'js', 'catalog-musicales.js');
const VALIDATOR_PATH = path.join(__dirname, 'validate-musicales.js');
const CACHE_PATH = path.join(__dirname, '.musicales-v21-resolved.json');

const NEW_MUSICALES = [
  // ───────────── Clásicos (antes de 1970) (+12: 56 -> 68, 3 en español) ─────────────
  {
    id: 'mus-la-mancha-el-sueno-imposible',
    cat: 'mus-clasicos',
    franchise: 'Man of La Mancha',
    game: 'El sueño imposible',
    title: 'El sueño imposible',
    composer: 'Plácido Domingo',
    year: 1996,
    platform: 'Versión en español',
    lang: 'es',
    aka: ['The Impossible Dream'],
    appleTerm: 'Placido Domingo El sueno imposible',
    appleTitleRe: /sue[ñn]o imposible/i,
    appleArtistRe: /pl[aá]cido domingo/i,
    ytQuery: 'El sueño imposible Man of La Mancha español Placido Domingo',
    ytTitleRe: /sue[ñn]o imposible|mancha/i,
  },
  {
    id: 'mus-fiddler-si-yo-fuera-rico',
    cat: 'mus-clasicos',
    franchise: 'Fiddler on the Roof',
    game: 'Si yo fuera rico',
    title: 'Si yo fuera rico',
    composer: 'Manolo Fábregas',
    year: 1970,
    platform: 'México',
    lang: 'es',
    aka: ['If I Were a Rich Man'],
    ytQuery: 'Si yo fuera rico El violinista en el tejado español musical',
    ytTitleRe: /si yo fuera rico|violinista/i,
  },
  {
    id: 'mus-sonrisas-do-re-mi-es',
    cat: 'mus-clasicos',
    franchise: 'The Sound of Music',
    game: 'Do-Re-Mi (español)',
    title: 'Do-Re-Mi',
    composer: 'Silvia Luchetti y elenco',
    year: 2011,
    platform: 'Madrid',
    lang: 'es',
    aka: ['Do-Re-Mi'],
    appleTerm: 'Sonrisas y lagrimas Do-Re-Mi',
    appleTitleRe: /do-?re-?mi/i,
    appleArtistRe: /sonrisas|silvia luchetti|novicia/i,
    ytQuery: 'Do Re Mi Sonrisas y lagrimas musical español',
    ytTitleRe: /do.?re.?mi|sonrisas|novicia/i,
  },
  {
    id: 'mus-cabaret-willkommen',
    cat: 'mus-clasicos',
    franchise: 'Cabaret',
    game: 'Willkommen',
    title: 'Willkommen',
    composer: 'Joel Grey',
    year: 1972,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Joel Grey Willkommen Cabaret',
    appleTitleRe: /willkommen/i,
    appleArtistRe: /joel grey|cabaret/i,
    ytQuery: 'Joel Grey Willkommen Cabaret 1972',
    ytTitleRe: /willkommen|cabaret/i,
  },
  {
    id: 'mus-cabaret-mein-herr',
    cat: 'mus-clasicos',
    franchise: 'Cabaret',
    game: 'Mein Herr',
    title: 'Mein Herr',
    composer: 'Liza Minnelli',
    year: 1972,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Liza Minnelli Mein Herr Cabaret',
    appleTitleRe: /mein herr/i,
    appleArtistRe: /liza minnelli|cabaret/i,
    ytQuery: 'Liza Minnelli Mein Herr Cabaret',
    ytTitleRe: /mein herr|liza minnelli/i,
  },
  {
    id: 'mus-funny-girl-people',
    cat: 'mus-clasicos',
    franchise: 'Funny Girl',
    game: 'People',
    title: 'People',
    composer: 'Barbra Streisand',
    year: 1968,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Barbra Streisand People Funny Girl',
    appleTitleRe: /^people/i,
    appleArtistRe: /barbra streisand/i,
    ytQuery: 'Barbra Streisand People Funny Girl',
    ytTitleRe: /people|barbra streisand/i,
  },
  {
    id: 'mus-hair-let-the-sunshine-in',
    cat: 'mus-clasicos',
    franchise: 'Hair',
    game: 'Let the Sunshine In',
    title: 'The Flesh Failures (Let the Sunshine In)',
    composer: 'Elenco original de Broadway',
    year: 1968,
    platform: 'Broadway',
    lang: 'en',
    aka: ['The Flesh Failures (Let the Sunshine In)'],
    appleTerm: 'Hair Broadway Flesh Failures Let the Sunshine In',
    appleTitleRe: /let the sunshine in|flesh failures/i,
    appleArtistRe: /hair|broadway|galt/i,
    ytQuery: 'Hair Broadway The Flesh Failures Let the Sunshine In',
    ytTitleRe: /let the sunshine in|flesh failures|hair/i,
  },
  {
    id: 'mus-oliver-food-glorious-food',
    cat: 'mus-clasicos',
    franchise: 'Oliver!',
    game: 'Food, Glorious Food',
    title: 'Food, Glorious Food',
    composer: 'Elenco de Oliver!',
    year: 1968,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Oliver Food Glorious Food',
    appleTitleRe: /food, glorious food/i,
    appleArtistRe: /oliver|lionel bart/i,
    ytQuery: 'Oliver Food Glorious Food 1968',
    ytTitleRe: /food,? glorious food|oliver/i,
  },
  {
    id: 'mus-oliver-where-is-love',
    cat: 'mus-clasicos',
    franchise: 'Oliver!',
    game: 'Where Is Love?',
    title: 'Where Is Love?',
    composer: 'Mark Lester',
    year: 1968,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Oliver Where Is Love',
    appleTitleRe: /where is love/i,
    appleArtistRe: /oliver|mark lester|lionel bart/i,
    ytQuery: 'Oliver Where Is Love 1968',
    ytTitleRe: /where is love|oliver/i,
  },
  {
    id: 'mus-joseph-close-every-door',
    cat: 'mus-clasicos',
    franchise: 'Joseph and the Amazing Technicolor Dreamcoat',
    game: 'Close Every Door',
    title: 'Close Every Door',
    composer: 'Jason Donovan',
    year: 1991,
    platform: 'Londres',
    lang: 'en',
    appleTerm: 'Jason Donovan Close Every Door Joseph',
    appleTitleRe: /close every door/i,
    appleArtistRe: /jason donovan|joseph|andrew lloyd webber/i,
    ytQuery: 'Jason Donovan Close Every Door Joseph',
    ytTitleRe: /close every door|joseph/i,
  },
  {
    id: 'mus-joseph-go-go-go-joseph',
    cat: 'mus-clasicos',
    franchise: 'Joseph and the Amazing Technicolor Dreamcoat',
    game: 'Go, Go, Go Joseph',
    title: 'Go, Go, Go Joseph',
    composer: 'Jason Donovan y elenco',
    year: 1991,
    platform: 'Londres',
    lang: 'en',
    appleTerm: 'Go Go Go Joseph Andrew Lloyd Webber',
    appleTitleRe: /go,? go,? go joseph/i,
    appleArtistRe: /jason donovan|joseph|andrew lloyd webber/i,
    ytQuery: 'Go Go Go Joseph Andrew Lloyd Webber',
    ytTitleRe: /go,? go,? go joseph|joseph/i,
  },
  {
    id: 'mus-gypsy-everythings-coming-up-roses',
    cat: 'mus-clasicos',
    franchise: 'Gypsy',
    game: 'Everything\'s Coming Up Roses',
    title: 'Everything\'s Coming Up Roses',
    composer: 'Ethel Merman',
    year: 1959,
    platform: 'Broadway',
    lang: 'en',
    appleTerm: 'Ethel Merman Everything\'s Coming Up Roses Gypsy',
    appleTitleRe: /everything's coming up roses/i,
    appleArtistRe: /ethel merman|gypsy|patti lupone|imelda/i,
    ytQuery: 'Ethel Merman Everything\'s Coming Up Roses Gypsy',
    ytTitleRe: /coming up roses|gypsy/i,
  },

  // ───────────── 70s y 80s (+13: 61 -> 74) ─────────────
  {
    id: 'mus-grease-title',
    cat: 'mus-7080',
    franchise: 'Grease',
    game: 'Grease',
    title: 'Grease',
    composer: 'Frankie Valli',
    year: 1978,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Frankie Valli Grease',
    appleTitleRe: /^grease/i,
    appleArtistRe: /frankie valli/i,
    ytQuery: 'Frankie Valli Grease Official Audio',
    ytTitleRe: /grease|frankie valli/i,
  },
  {
    id: 'mus-grease-we-go-together',
    cat: 'mus-7080',
    franchise: 'Grease',
    game: 'We Go Together',
    title: 'We Go Together',
    composer: 'John Travolta y Olivia Newton-John',
    year: 1978,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'John Travolta Olivia Newton-John We Go Together Grease',
    appleTitleRe: /we go together/i,
    appleArtistRe: /john travolta|olivia newton|grease/i,
    ytQuery: 'Grease We Go Together John Travolta Olivia Newton-John',
    ytTitleRe: /we go together|grease/i,
  },
  {
    id: 'mus-les-mis-on-my-own',
    cat: 'mus-7080',
    franchise: 'Les Misérables',
    game: 'On My Own',
    title: 'On My Own',
    composer: 'Samantha Barks',
    year: 2012,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Samantha Barks On My Own Les Miserables',
    appleTitleRe: /on my own/i,
    appleArtistRe: /samantha barks|les mis|lea salonga/i,
    ytQuery: 'Samantha Barks On My Own Les Miserables',
    ytTitleRe: /on my own|les mis/i,
  },
  {
    id: 'mus-les-mis-master-of-the-house',
    cat: 'mus-7080',
    franchise: 'Les Misérables',
    game: 'Master of the House',
    title: 'Master of the House',
    composer: 'Sacha Baron Cohen y Helena Bonham Carter',
    year: 2012,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Sacha Baron Cohen Master of the House Les Miserables',
    appleTitleRe: /master of the house/i,
    appleArtistRe: /sacha baron cohen|helena bonham|les mis/i,
    ytQuery: 'Master of the House Les Miserables Sacha Baron Cohen',
    ytTitleRe: /master of the house|les mis/i,
  },
  {
    id: 'mus-les-mis-castle-on-a-cloud',
    cat: 'mus-7080',
    franchise: 'Les Misérables',
    game: 'Castle on a Cloud',
    title: 'Castle on a Cloud',
    composer: 'Isabelle Allen',
    year: 2012,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Isabelle Allen Castle on a Cloud Les Miserables',
    appleTitleRe: /castle on a cloud/i,
    appleArtistRe: /isabelle allen|les mis/i,
    ytQuery: 'Castle on a Cloud Les Miserables Isabelle Allen',
    ytTitleRe: /castle on a cloud|les mis/i,
  },
  {
    id: 'mus-phantom-angel-of-music',
    cat: 'mus-7080',
    franchise: 'The Phantom of the Opera',
    game: 'Angel of Music',
    title: 'Angel of Music',
    composer: 'Sarah Brightman y Michael Crawford',
    year: 1986,
    platform: 'Londres',
    lang: 'en',
    appleTerm: 'Sarah Brightman Michael Crawford Angel of Music Phantom',
    appleTitleRe: /angel of music/i,
    appleArtistRe: /sarah brightman|michael crawford|andrew lloyd webber|phantom/i,
    ytQuery: 'Angel of Music Sarah Brightman Michael Crawford Phantom of the Opera',
    ytTitleRe: /angel of music|phantom/i,
  },
  {
    id: 'mus-little-shop-skid-row',
    cat: 'mus-7080',
    franchise: 'Little Shop of Horrors',
    game: 'Skid Row (Downtown)',
    title: 'Skid Row (Downtown)',
    composer: 'Rick Moranis, Ellen Greene y elenco',
    year: 1986,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Little Shop of Horrors Skid Row Downtown',
    appleTitleRe: /skid row/i,
    appleArtistRe: /rick moranis|ellen greene|little shop/i,
    ytQuery: 'Little Shop of Horrors Skid Row Downtown 1986',
    ytTitleRe: /skid row|little shop/i,
  },
  {
    id: 'mus-little-shop-feed-me',
    cat: 'mus-7080',
    franchise: 'Little Shop of Horrors',
    game: 'Feed Me (Git It)',
    title: 'Feed Me (Git It)',
    composer: 'Levi Stubbs y Rick Moranis',
    year: 1986,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Levi Stubbs Rick Moranis Feed Me Git It Little Shop',
    appleTitleRe: /feed me/i,
    appleArtistRe: /levi stubbs|rick moranis|little shop/i,
    ytQuery: 'Little Shop of Horrors Feed Me Git It 1986',
    ytTitleRe: /feed me|little shop/i,
  },
  {
    id: 'mus-little-shop-dentist',
    cat: 'mus-7080',
    franchise: 'Little Shop of Horrors',
    game: 'Dentist!',
    title: 'Dentist!',
    composer: 'Steve Martin',
    year: 1986,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Steve Martin Dentist Little Shop of Horrors',
    appleTitleRe: /dentist/i,
    appleArtistRe: /steve martin|little shop/i,
    ytQuery: 'Steve Martin Dentist Little Shop of Horrors 1986',
    ytTitleRe: /dentist|little shop/i,
  },
  {
    id: 'mus-dreamgirls-listen',
    cat: 'mus-7080',
    franchise: 'Dreamgirls',
    game: 'Listen',
    title: 'Listen',
    composer: 'Beyoncé',
    year: 2006,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Beyonce Listen Dreamgirls',
    appleTitleRe: /^listen/i,
    appleArtistRe: /beyonc[eé]|dreamgirls/i,
    ytQuery: 'Beyonce Listen Dreamgirls Official',
    ytTitleRe: /listen|beyonc[eé]|dreamgirls/i,
  },
  {
    id: 'mus-dreamgirls-one-night-only',
    cat: 'mus-7080',
    franchise: 'Dreamgirls',
    game: 'One Night Only',
    title: 'One Night Only',
    composer: 'Jennifer Hudson',
    year: 2006,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Dreamgirls One Night Only Jennifer Hudson',
    appleTitleRe: /one night only/i,
    appleArtistRe: /jennifer hudson|beyonc[eé]|dreamgirls/i,
    ytQuery: 'Dreamgirls One Night Only Jennifer Hudson',
    ytTitleRe: /one night only|dreamgirls/i,
  },
  {
    id: 'mus-into-the-woods-agony',
    cat: 'mus-7080',
    franchise: 'Into the Woods',
    game: 'Agony',
    title: 'Agony',
    composer: 'Chris Pine y Billy Magnussen',
    year: 2014,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Chris Pine Billy Magnussen Agony Into the Woods',
    appleTitleRe: /^agony/i,
    appleArtistRe: /chris pine|billy magnussen|into the woods/i,
    ytQuery: 'Into the Woods Agony Chris Pine Billy Magnussen',
    ytTitleRe: /agony|into the woods/i,
  },
  {
    id: 'mus-sweeney-todd-johanna',
    cat: 'mus-7080',
    franchise: 'Sweeney Todd',
    game: 'Johanna',
    title: 'Johanna',
    composer: 'Jamie Campbell Bower y Johnny Depp',
    year: 2007,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Sweeney Todd Johanna Johnny Depp',
    appleTitleRe: /^johanna/i,
    appleArtistRe: /jamie campbell|johnny depp|sweeney todd|victor garber/i,
    ytQuery: 'Sweeney Todd Johanna 2007',
    ytTitleRe: /johanna|sweeney todd/i,
  },

  // ───────────── 90s y 2000s (+11: 52 -> 63) ─────────────
  {
    id: 'mus-mamma-mia-gimme-gimme-gimme',
    cat: 'mus-9000',
    franchise: 'Mamma Mia!',
    game: 'Gimme! Gimme! Gimme! (A Man After Midnight)',
    title: 'Gimme! Gimme! Gimme! (A Man After Midnight)',
    composer: 'Amanda Seyfried',
    year: 2008,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Amanda Seyfried Gimme Gimme Gimme Mamma Mia',
    appleTitleRe: /gimme! gimme! gimme!/i,
    appleArtistRe: /amanda seyfried|mamma mia/i,
    ytQuery: 'Mamma Mia Gimme Gimme Gimme Amanda Seyfried',
    ytTitleRe: /gimme|mamma mia/i,
  },
  {
    id: 'mus-mamma-mia-voulez-vous',
    cat: 'mus-9000',
    franchise: 'Mamma Mia!',
    game: 'Voulez-Vous',
    title: 'Voulez-Vous',
    composer: 'Elenco de la película',
    year: 2008,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Mamma Mia Cast Voulez-Vous',
    appleTitleRe: /voulez-vous/i,
    appleArtistRe: /mamma mia|philip michael|amanda seyfried/i,
    ytQuery: 'Mamma Mia Voulez-Vous Movie Cast',
    ytTitleRe: /voulez-vous|mamma mia/i,
  },
  {
    id: 'mus-mamma-mia-money-money-money',
    cat: 'mus-9000',
    franchise: 'Mamma Mia!',
    game: 'Money, Money, Money',
    title: 'Money, Money, Money',
    composer: 'Meryl Streep',
    year: 2008,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Meryl Streep Money Money Money Mamma Mia',
    appleTitleRe: /money, money, money/i,
    appleArtistRe: /meryl streep|mamma mia/i,
    ytQuery: 'Meryl Streep Money Money Money Mamma Mia',
    ytTitleRe: /money, money, money|mamma mia/i,
  },
  {
    id: 'mus-moulin-rouge-el-tango-de-roxanne',
    cat: 'mus-9000',
    franchise: 'Moulin Rouge!',
    game: 'El Tango de Roxanne',
    title: 'El Tango de Roxanne',
    composer: 'Ewan McGregor, José Feliciano y Jacek Koman',
    year: 2001,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Ewan McGregor Jose Feliciano El Tango de Roxanne Moulin Rouge',
    appleTitleRe: /tango de roxanne/i,
    appleArtistRe: /ewan mcgregor|jos[eé] feliciano|moulin rouge/i,
    ytQuery: 'Moulin Rouge El Tango de Roxanne Ewan McGregor',
    ytTitleRe: /tango de roxanne|moulin rouge/i,
  },
  {
    id: 'mus-moulin-rouge-your-song',
    cat: 'mus-9000',
    franchise: 'Moulin Rouge!',
    game: 'Your Song',
    title: 'Your Song',
    composer: 'Ewan McGregor y Alessandro Safina',
    year: 2001,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Ewan McGregor Alessandro Safina Your Song Moulin Rouge',
    appleTitleRe: /^your song/i,
    appleArtistRe: /ewan mcgregor|alessandro safina/i,
    ytQuery: 'Ewan McGregor Your Song Moulin Rouge',
    ytTitleRe: /your song|ewan mcgregor|moulin rouge/i,
  },
  {
    id: 'mus-wicked-no-one-mourns-the-wicked',
    cat: 'mus-9000',
    franchise: 'Wicked',
    game: 'No One Mourns the Wicked',
    title: 'No One Mourns the Wicked',
    composer: 'Kristin Chenoweth y elenco',
    year: 2003,
    platform: 'Broadway',
    lang: 'en',
    appleTerm: 'Kristin Chenoweth No One Mourns the Wicked',
    appleTitleRe: /no one mourns the wicked/i,
    appleArtistRe: /kristin chenoweth|ariana grande|wicked/i,
    ytQuery: 'Wicked No One Mourns the Wicked Kristin Chenoweth',
    ytTitleRe: /no one mourns the wicked|wicked/i,
  },
  {
    id: 'mus-tick-tick-boom-30-90',
    cat: 'mus-9000',
    franchise: 'tick, tick... BOOM!',
    game: '30/90',
    title: '30/90',
    composer: 'Andrew Garfield',
    year: 2021,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Andrew Garfield 30/90 tick tick BOOM',
    appleTitleRe: /30\/90/i,
    appleArtistRe: /andrew garfield/i,
    ytQuery: 'Andrew Garfield 30/90 tick tick BOOM',
    ytTitleRe: /30\/90|tick.*boom/i,
  },
  {
    id: 'mus-legally-blonde-so-much-better',
    cat: 'mus-9000',
    franchise: 'Legally Blonde',
    game: 'So Much Better',
    title: 'So Much Better',
    composer: 'Laura Bell Bundy',
    year: 2007,
    platform: 'Broadway',
    lang: 'en',
    appleTerm: 'Laura Bell Bundy So Much Better Legally Blonde',
    appleTitleRe: /so much better/i,
    appleArtistRe: /laura bell bundy|legally blonde/i,
    ytQuery: 'Legally Blonde So Much Better Laura Bell Bundy',
    ytTitleRe: /so much better|legally blonde/i,
  },
  {
    id: 'mus-spring-awakening-mama-who-bore-me',
    cat: 'mus-9000',
    franchise: 'Spring Awakening',
    game: 'Mama Who Bore Me',
    title: 'Mama Who Bore Me',
    composer: 'Lea Michele',
    year: 2006,
    platform: 'Broadway',
    lang: 'en',
    appleTerm: 'Lea Michele Mama Who Bore Me Spring Awakening',
    appleTitleRe: /mama who bore me/i,
    appleArtistRe: /lea michele|spring awakening/i,
    ytQuery: 'Lea Michele Mama Who Bore Me Spring Awakening',
    ytTitleRe: /mama who bore me|spring awakening/i,
  },
  {
    id: 'mus-mentiras-mentiras',
    cat: 'mus-9000',
    franchise: 'Mentiras',
    game: 'Mentiras',
    title: 'Mentiras',
    composer: 'Elenco original de Mentiras',
    year: 2009,
    platform: 'México',
    lang: 'es',
    appleTerm: 'Mentiras el musical Mentiras',
    appleTitleRe: /mentiras/i,
    appleArtistRe: /mentiras|natalia sosa|mariana trevi[ñn]o/i,
    ytQuery: 'Mentiras el musical Mentiras cancion',
    ytTitleRe: /mentiras/i,
  },
  {
    id: 'mus-hnmpl-maquillaje',
    cat: 'mus-9000',
    franchise: 'Hoy no me puedo levantar',
    game: 'Maquillaje',
    title: 'Maquillaje',
    composer: 'Elenco de Hoy no me puedo levantar',
    year: 2006,
    platform: 'México',
    lang: 'es',
    appleTerm: 'Hoy no me puedo levantar Maquillaje',
    appleTitleRe: /maquillaje/i,
    appleArtistRe: /hoy no me puedo levantar|mecano/i,
    ytQuery: 'Hoy no me puedo levantar musical Maquillaje',
    ytTitleRe: /maquillaje|hoy no me puedo levantar/i,
  },

  // ───────────── 2010 en adelante (+11: 53 -> 64, 3 en español) ─────────────
  {
    id: 'mus-kpop-libre',
    cat: 'mus-10s',
    franchise: 'KPop Demon Hunters',
    game: 'Libre',
    title: 'Libre (Free - versión en español)',
    composer: 'Doblaje en español',
    year: 2025,
    platform: 'Doblaje en español',
    lang: 'es',
    aka: ['Free'],
    appleTerm: 'Las guerreras k-pop Libre',
    appleTitleRe: /libre/i,
    appleArtistRe: /guerreras|kpop|huntr|saja|karin|azul/i,
    ytQuery: 'KPop Demon Hunters Libre español Free',
    ytTitleRe: /libre|free|kpop|guerreras/i,
  },
  {
    id: 'mus-kpop-tu-idolo',
    cat: 'mus-10s',
    franchise: 'KPop Demon Hunters',
    game: 'Tu ídolo',
    title: 'Tu ídolo (Your Idol - versión en español)',
    composer: 'Saja Boys (doblaje)',
    year: 2025,
    platform: 'Doblaje en español',
    lang: 'es',
    aka: ['Your Idol'],
    appleTerm: 'Saja Boys Tu idolo',
    appleTitleRe: /tu [ií]dolo|your idol/i,
    appleArtistRe: /saja boys|guerreras|kpop/i,
    ytQuery: 'Saja Boys Tu idolo español Your Idol KPop Demon Hunters',
    ytTitleRe: /[ií]dolo|your idol|saja boys|guerreras/i,
  },
  {
    id: 'mus-matilda-ninos-rebeldes',
    cat: 'mus-10s',
    franchise: 'Matilda the Musical',
    game: 'Niños rebeldes',
    title: 'Niños rebeldes (Revolting Children)',
    composer: 'Elenco en español',
    year: 2022,
    platform: 'Versión en español',
    lang: 'es',
    aka: ['Revolting Children'],
    ytQuery: 'Matilda Ninos rebeldes español Revolting Children',
    ytTitleRe: /ni[ñn]os rebeldes|matilda/i,
  },
  {
    id: 'mus-matilda-when-i-grow-up',
    cat: 'mus-10s',
    franchise: 'Matilda the Musical',
    game: 'When I Grow Up',
    title: 'When I Grow Up',
    composer: 'Elenco de la película',
    year: 2022,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Matilda When I Grow Up',
    appleTitleRe: /when i grow up/i,
    appleArtistRe: /matilda|alisha weir|tim minchin/i,
    ytQuery: 'Matilda When I Grow Up Official',
    ytTitleRe: /when i grow up|matilda/i,
  },
  {
    id: 'mus-matilda-naughty',
    cat: 'mus-10s',
    franchise: 'Matilda the Musical',
    game: 'Naughty',
    title: 'Naughty',
    composer: 'Alisha Weir',
    year: 2022,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Alisha Weir Naughty Matilda',
    appleTitleRe: /^naughty/i,
    appleArtistRe: /alisha weir|matilda/i,
    ytQuery: 'Matilda Naughty Alisha Weir',
    ytTitleRe: /naughty|matilda/i,
  },
  {
    id: 'mus-book-of-mormon-i-believe',
    cat: 'mus-10s',
    franchise: 'The Book of Mormon',
    game: 'I Believe',
    title: 'I Believe',
    composer: 'Andrew Rannells',
    year: 2011,
    platform: 'Broadway',
    lang: 'en',
    appleTerm: 'Andrew Rannells I Believe Book of Mormon',
    appleTitleRe: /^i believe/i,
    appleArtistRe: /andrew rannells|book of mormon/i,
    ytQuery: 'Andrew Rannells I Believe The Book of Mormon',
    ytTitleRe: /i believe|book of mormon/i,
  },
  {
    id: 'mus-beetlejuice-whole-being-dead-thing',
    cat: 'mus-10s',
    franchise: 'Beetlejuice',
    game: 'The Whole "Being Dead" Thing',
    title: 'The Whole "Being Dead" Thing',
    composer: 'Alex Brightman',
    year: 2019,
    platform: 'Broadway',
    lang: 'en',
    appleTerm: 'Alex Brightman The Whole Being Dead Thing Beetlejuice',
    appleTitleRe: /being dead/i,
    appleArtistRe: /alex brightman|beetlejuice/i,
    ytQuery: 'Alex Brightman The Whole Being Dead Thing Beetlejuice',
    ytTitleRe: /being dead|beetlejuice/i,
  },
  {
    id: 'mus-heathers-seventeen',
    cat: 'mus-10s',
    franchise: 'Heathers: The Musical',
    game: 'Seventeen',
    title: 'Seventeen',
    composer: 'Barrett Wilbert Weed y Ryan McCartan',
    year: 2014,
    platform: 'Off-Broadway',
    lang: 'en',
    appleTerm: 'Barrett Wilbert Weed Ryan McCartan Seventeen Heathers',
    appleTitleRe: /^seventeen/i,
    appleArtistRe: /barrett wilbert|ryan mccartan|heathers/i,
    ytQuery: 'Heathers The Musical Seventeen Barrett Wilbert Weed',
    ytTitleRe: /seventeen|heathers/i,
  },
  {
    id: 'mus-heathers-dead-girl-walking',
    cat: 'mus-10s',
    franchise: 'Heathers: The Musical',
    game: 'Dead Girl Walking',
    title: 'Dead Girl Walking',
    composer: 'Barrett Wilbert Weed y Ryan McCartan',
    year: 2014,
    platform: 'Off-Broadway',
    lang: 'en',
    appleTerm: 'Barrett Wilbert Weed Dead Girl Walking Heathers',
    appleTitleRe: /dead girl walking/i,
    appleArtistRe: /barrett wilbert|heathers/i,
    ytQuery: 'Heathers The Musical Dead Girl Walking',
    ytTitleRe: /dead girl walking|heathers/i,
  },
  {
    id: 'mus-mean-girls-world-burn',
    cat: 'mus-10s',
    franchise: 'Mean Girls',
    game: 'World Burn',
    title: 'World Burn',
    composer: 'Taylor Louderman y elenco',
    year: 2018,
    platform: 'Broadway',
    lang: 'en',
    appleTerm: 'Taylor Louderman World Burn Mean Girls',
    appleTitleRe: /world burn/i,
    appleArtistRe: /taylor louderman|renee rapp|mean girls/i,
    ytQuery: 'Mean Girls Broadway World Burn Taylor Louderman',
    ytTitleRe: /world burn|mean girls/i,
  },
  {
    id: 'mus-wonka-pure-imagination',
    cat: 'mus-10s',
    franchise: 'Wonka',
    game: 'Pure Imagination',
    title: 'Pure Imagination',
    composer: 'Timothée Chalamet',
    year: 2023,
    platform: 'Película',
    lang: 'en',
    appleTerm: 'Timothee Chalamet Pure Imagination Wonka',
    appleTitleRe: /pure imagination/i,
    appleArtistRe: /timoth[eé]e chalamet|wonka/i,
    ytQuery: 'Timothee Chalamet Pure Imagination Wonka',
    ytTitleRe: /pure imagination|wonka|chalamet/i,
  },
];

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function formatEntry(item, sourcesCode) {
  const akaPart = item.aka && item.aka.length
    ? `\n      aka: [${item.aka.map((a) => `'${esc(a)}'`).join(', ')}],`
    : '';
  return [
    '    {',
    `      id: '${esc(item.id)}', cat: '${esc(item.cat)}', franchise: '${esc(item.franchise)}', game: '${esc(item.game)}',`,
    `      title: '${esc(item.title)}', composer: '${esc(item.composer)}', year: ${item.year}, platform: '${esc(item.platform)}', lang: '${esc(item.lang)}',${akaPart}`,
    `      sources: [${sourcesCode.join(', ')}],`,
    '    },',
  ].join('\n');
}

async function resolveItem(item) {
  const sources = [];

  if (item.appleTerm) {
    for (const country of ['mx', 'us']) {
      const results = await searchApple(item.appleTerm, country, 10);
      const match = results.find((r) => {
        if (!r.previewUrl || !r.trackId) return false;
        const t = r.trackName || '';
        const a = r.artistName || '';
        if (/karaoke|tribute|8-bit|ringtone|instrumental|piano version/i.test(t + ' ' + a)) return false;
        const titleOk = item.appleTitleRe ? item.appleTitleRe.test(t) : true;
        const artistOk = item.appleArtistRe ? item.appleArtistRe.test(a + ' ' + (r.collectionName || '')) : true;
        return titleOk && artistOk;
      });
      if (match) {
        recordAppleTrackEvidence(match, country, `apple-search:${country}:${item.appleTerm}`);
        sources.push(`apple({ song: ${match.trackId}, country: '${country}' })`);
        break;
      }
    }
  }

  if (item.ytQuery) {
    const candidates = await searchAndVerifyYoutube(item.ytQuery, {
      maxCandidates: 8,
      accept: (info) => {
        if (info.lengthSeconds < 30 || info.lengthSeconds > 540) return false;
        if (/karaoke|tutorial|reaction|reacci[oó]n|8-bit|nightcore|amv/i.test(info.title)) return false;
        return item.ytTitleRe ? item.ytTitleRe.test(info.title + ' ' + info.author) : true;
      },
    });
    for (const c of candidates.slice(0, 2)) {
      sources.push(`yt('${c.id}')`);
    }
  }

  if (sources.length === 0) {
    throw new Error(`No se encontró fuente válida para ${item.id} (${item.franchise} - ${item.game})`);
  }
  return sources;
}

async function main() {
  let resolved = {};
  if (fs.existsSync(CACHE_PATH)) {
    resolved = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
  }

  console.log(`🚀 Resolviendo ${NEW_MUSICALES.length} pistas nuevas de Musicales para v2.1...`);
  for (let i = 0; i < NEW_MUSICALES.length; i++) {
    const item = NEW_MUSICALES[i];
    if (resolved[item.id] && resolved[item.id].length > 0) {
      console.log(`[${i + 1}/${NEW_MUSICALES.length}] (caché) ${item.id} -> ${resolved[item.id].join(', ')}`);
      continue;
    }
    const sources = await resolveItem(item);
    resolved[item.id] = sources;
    fs.writeFileSync(CACHE_PATH, JSON.stringify(resolved, null, 2) + '\n', 'utf8');
    console.log(`[${i + 1}/${NEW_MUSICALES.length}] ✔ ${item.id} -> ${sources.join(', ')}`);
  }

  let content = fs.readFileSync(CATALOG_PATH, 'utf8').replace(/\r\n/g, '\n');

  // Asegurar que Gypsy y Spring Awakening estén en FRANCHISE_AKA si aplica
  const sections = [
    { cat: 'mus-clasicos', nextMarker: '    /* ───────────── 70s y 80s' },
    { cat: 'mus-7080', nextMarker: '    /* ───────────── 90s y 2000s' },
    { cat: 'mus-9000', nextMarker: '    /* ───────────── 2010 en adelante' },
    { cat: 'mus-10s', nextMarker: '  );\n\n  // Señuelos:' },
  ];

  let addedCount = 0;
  for (const sec of sections) {
    const items = NEW_MUSICALES.filter((x) => x.cat === sec.cat && !content.includes(`id: '${x.id}'`));
    if (items.length === 0) continue;
    const blocks = items.map((item) => formatEntry(item, resolved[item.id])).join('\n');
    const idx = content.indexOf(sec.nextMarker);
    if (idx === -1) throw new Error(`No se encontró marcador para ${sec.cat}: ${sec.nextMarker}`);
    content = content.slice(0, idx) + blocks + '\n' + content.slice(idx);
    addedCount += items.length;
  }

  // Actualizar cuentas de encabezado y secciones
  const vm = require('vm');
  const sandbox = { window: {} };
  sandbox.window = sandbox;
  sandbox.AM = { CATEGORIES: [], CATALOG: [], EXTRA_GAMES: [], FRANCHISE_AKA: {} };
  vm.runInNewContext(content, sandbox);

  const total = sandbox.AM.CATALOG.length;
  const esCount = sandbox.AM.CATALOG.filter((t) => t.lang === 'es').length;
  const origCount = sandbox.AM.CATALOG.filter((t) => t.lang !== 'es').length;

  content = content.replace(
    /Catálogo: Musicales \(\d+ pistas: \d+ en su grabación original y \d+ en español\)/,
    `Catálogo: Musicales (${total} pistas: ${origCount} en su grabación original y ${esCount} en español)`
  );

  const catLabels = [
    { cat: 'mus-clasicos', label: 'Clásicos (antes de 1970)' },
    { cat: 'mus-7080', label: '70s y 80s' },
    { cat: 'mus-9000', label: '90s y 2000s' },
    { cat: 'mus-10s', label: '2010 en adelante' },
  ];

  for (const c of catLabels) {
    const count = sandbox.AM.CATALOG.filter((t) => t.cat === c.cat).length;
    const escLabel = c.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(\\/\\* ─+ ${escLabel} \\()\\d+(\\) ─+ \\*\\/)`);
    content = content.replace(re, `$1${count}$2`);
  }

  fs.writeFileSync(CATALOG_PATH, content, 'utf8');

  // Actualizar conteo esperado en scripts/validate-musicales.js
  let valContent = fs.readFileSync(VALIDATOR_PATH, 'utf8').replace(/\r\n/g, '\n');
  valContent = valContent.replace(/222/g, String(total));
  fs.writeFileSync(VALIDATOR_PATH, valContent, 'utf8');

  console.log(`✅ js/catalog-musicales.js actualizado (+${addedCount} pistas nuevas, total: ${total}: ${origCount} orig / ${esCount} es).`);
}

main().catch((e) => {
  console.error('❌ Error:', e);
  process.exit(1);
});
