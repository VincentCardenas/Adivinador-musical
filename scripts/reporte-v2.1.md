# Reporte v2.1 — catálogo (en progreso)

Rama: `antigravity/v2.1-catalogo` (desde `origin/claude/clever-sagan-5xuvc1`). Este reporte se va completando en cada commit.

## 1. Auditoría de red — antes

`node scripts/audit-red.js todos` sobre la rama base (`scripts/audit-red-antes.json`, 2026-10-16):

| Tema | Total | OK | Dudosas | Muertas |
|---|---:|---:|---:|---:|
| Series | 122 | 114 | 4 | 4 |
| Videojuegos | 281 | 263 | 3 | 15 |
| Sagas | 184 | 167 | 17 | 0 |
| Caricaturas | 296 | 221 | 75 | 0 |
| Anime | 251 | 186 | 64 | 1 |
| Disney | 71 | 59 | 12 | 0 |
| Musicales | 222 | 213 | 0 | 9 |
| **Total** | **1,427** | **1,223** | **175** | **29** |

Muertas de antes:
- Series (4): `tv-el-hombre-nuclear-…`, `tv-blanco-y-negro-…`, `tv-dinosaurios-…`, `tv-xena-…` (las cuatro son de las 30 series de Gemini: `buscaTv` no encontraba nada).
- Videojuegos (15): `age-of-empires-ii-shamburger`, `ori-and-the-will-of-th-ori-and-the-will-of-th`, `sea-of-thieves-grogg-mayles`, `undertale-megalovania`, `chrono-cross-chrono-cross-time-s-sc`, `sekiro-shadows-die-twi-isshin-the-sword-saint`, `bioshock-welcome-to-rapture`, `bioshock-infinite-will-the-circle-be-unb`, `devil-may-cry-3-devils-never-cry`, `grand-theft-auto-main-theme`, `max-payne-max-payne-theme`, `call-of-duty-lullaby-for-a-dead-man`, `dota-2-dota-2-main-theme`, `overwatch-2-overture`, `team-fortress-2-rocket-jump-waltz`.
- Anime (1): `ani-hokuto-no-ken-ai-wo-torimodose`.
- Musicales (9): `mus-sonrisas-cosas-que-me-hacen-feliz`, `mus-jcs-i-dont-know-how-to-love-him`, `mus-rocky-horror-time-warp`, `mus-phantom-the-music-of-the-night`, `mus-rocky-touch-a-touch-me`, `mus-mamma-mia-va-todo-al-ganador`, `mus-mamma-mia-chiquitita`, `mus-mamma-mia-fija-tu-amor-en-mi`, `mus-rent-ill-cover-you`.

## 2. Cómo se comprobó cada ID

- Búsquedas reales con `scripts/lib-v21.js` (YouTube: 1 búsqueda/s, oEmbed + página `watch?v=` con `playabilityStatus.status === "OK"` y `playableInEmbed !== false`; Apple: lookup con el mismo `country` de la fuente y `previewUrl`).
- Cada comprobación queda en `scripts/evidencia-v2.1.json` por ID (consulta, título, canal/artista, álbum, duración, país, resultado, fecha).
- `node scripts/check-evidencia.js` revisa sin internet que cada ID nuevo o cambiado frente a la rama base tenga evidencia válida y del mismo país (`am(N)` de Musicales prueba `mx` y luego `us`: basta uno).
- `node scripts/diff-fuentes.js --md` genera la lista de abajo (fuente vieja → nueva, con el título y canal de la evidencia).
- Lo que solo se decide oyendo está en `scripts/revisar-a-oido.md`.

## 3. Estado de los issues

| Issue | Pista | Estado |
|---|---|---|
| #8 | `dis-hercules-no-importa-la-distancia` | Arreglado: dos videos de la versión latina de la película (Apple solo tenía la de Ricky Martin de los créditos). composer → Antonio Benavides (voz cantada de Hércules joven según Wikipedia). Revisar a oído. |
| #9 | `tv-los-soprano-woke-up-this-morning` | Arreglado: Apple «Woke Up This Morning (Chosen One Mix)» de A3 (álbum de la serie) + otro Apple + YouTube. |
| #10 | `toon-los-padrinos-magicos-…` | Pendiente (búsqueda hecha; falta aplicar). |
| #11 | `tv-sex-and-the-city-…` | Arreglado: se quitó X453aKQgob4; quedan PKRe-6jAzuc y SPXZDbz-8HU, ambos comprobados. |
| #12 | `toon-inuyasha-change-the-world` | Pendiente. |
| #13 | `toon-yu-yu-hakusho-sonrisa-explosiva` | Arreglado: `yt('RncCJNOZLb0', 15)`. Revisar a oído el segundo de inicio. |
| #14 | `toon-dragon-ball-gt-mi-corazon-encantado` | Arreglado: primero el opening latino de TV (wgZ-ATUGXDw) y respaldo TV size dF4OwMSrnUQ; se quitó el Apple que era otra grabación. |
| #15 | Reporte viejo de Caricaturas | Pendiente de confirmar que no queda ningún ID inventado. |
| #16 | `ani-blue-seed-carnival-babel` | Pendiente. |
| #17 | `dis-mulan-reflejo` | Arreglado: Apple 1624897102 «Reflejo» (2:26), la versión de la película del álbum oficial en español (Apple acredita a «ANALY» todas las canciones de la película); antes sonaba «Reflejo (Tema Principal)», la versión de créditos. composer se queda en Lucero. Revisar a oído. |
| #18 | `toon-shuriken-school-tema` | Pendiente (búsqueda hecha; falta aplicar). |

## 4. Pistas arregladas (fuente vieja → nueva)

Commit de la fase 2, parte 1 (Series, Disney, Musicales y #13/#14 de Anime). En Series, las 16 de Gemini cambiadas usaban `buscaTv`, que no encontraba nada (4 muertas) o caía en un cover o regrabación; se pasaron a videos o previews comprobados de la entrada original. En Musicales: 9 muertas y 3 que sonaban como cover (Grease en español y las dos de Six).

### js/catalog-series.js

- `tv-la-isla-de-gilligan-the-ballad-of-gilligan-s-isle` (cambiada)
  - antes: buscaTv(['The Wellingtons Gilligan\'s Isle', 'Gilligan\'s Island Television\'s Greatest Hits'], { match: ['The Ballad of Gilligan\'s Isle', 'Gilligan\'s Island'], artist: ['The Wellingtons', 'The Eligibles'], album_hint: ['Television\'s Greatest Hits'] })
  - ahora: yt TEq5wtFr9e8 «Gilligan's Island Season One Opening» (theresa53100, 63s) · yt ZdClvI7eBD0 «Gilligan's Island Opening Credits and Theme Song» (Steven, 79s)
- `tv-mi-bella-genio-jeannie` (cambiada)
  - antes: buscaTv(['Hugo Montenegro Jeannie', 'I Dream of Jeannie Television\'s Greatest Hits'], { match: ['Jeannie', 'I Dream of Jeannie'], artist: ['Hugo Montenegro'], album_hint: ['Television\'s Greatest Hits'] })
  - ahora: yt SU7bAEDJplI «Opening Sequence | I Dream Of Jeannie» (I Dream of Jeannie, 62s) · yt ND1MXF-svtQ «I Dream of Jeannie 1965 - 1970 Opening and Closing Theme (With Intro) HD» (TeeVees Greatest, 214s)
- `tv-el-superagente-86-get-smart-theme` (cambiada)
  - antes: buscaTv(['Irving Szathmary Get Smart', 'Get Smart Television\'s Greatest Hits'], { match: ['Theme from Get Smart', 'Get Smart Theme', 'Get Smart'], artist: ['Irving Szathmary'], album_hint: ['Television\'s Greatest Hits'] })
  - ahora: yt o2ObCoCm61s «Get Smart (Intro) S3 (1967)» (RetroAlexander, 55s) · yt voU4ZjyWoSE «Get Smart (Intro) Pilot (1965)» (RetroAlexander, 64s)
- `tv-la-familia-ingalls-little-house-on-the-prairie-theme` (cambiada)
  - antes: buscaTv('David Rose Little House on the Prairie', { match: ['Little House on the Prairie Main Title', 'Little House on the Prairie Theme', 'Little House on the Prairie'], artist: ['David Rose'], album_hint: ['Television\'s Greatest Hits', 'Little House on the Prairie'] })
  - ahora: yt mD2hwsHPBbo «Little House on the Prairie Season 1 - Opening Theme (Enhanced)» (Nels Oleson - Fan, 52s)
- `tv-el-hombre-nuclear-the-six-million-dollar-man-theme` (cambiada)
  - antes: buscaTv(['Oliver Nelson Six Million Dollar Man', 'Six Million Dollar Man Television\'s Greatest Hits'], { match: ['Theme from The Six Million Dollar Man', 'The Six Million Dollar Man Theme', 'The Six Million Dollar Man'], artist: ['Oliver Nelson'], album_hint: ['Television\'s Greatest Hits'] })
  - ahora: yt 0CPJ-AbCsT8 «The Six Million Dollar Man Opening and Closing Theme (With Intro) HD Surround» (TeeVees Greatest, 208s) · yt 9pUaeLtXM_A «Intro-$6Milion Dollar Man» (Tyler Randolph, 87s)
- `tv-los-angeles-de-charlie-charlie-s-angels-theme` (cambiada)
  - antes: buscaTv(['Jack Elliott Allyn Ferguson Charlie\'s Angels', 'Charlie\'s Angels Television\'s Greatest Hits'], { match: ['Theme from Charlie\'s Angels', 'Charlie\'s Angels Theme', 'Charlie\'s Angels'], artist: ['Jack Elliott', 'Allyn Ferguson'], album_hint: ['Television\'s Greatest Hits'] })
  - ahora: yt Eri_0OgkaZM «Charlie's Angels 1976 - 1981 Opening and Closing Theme» (TeeVees Greatest, 111s) · yt rtaEFOxMPck «"Charlie's Angels" 1976 TV Intro» (The Rap Sheet, 69s)
- `tv-chips-chips-theme` (cambiada)
  - antes: buscaTv(['John Parker CHiPs', 'CHiPs Television\'s Greatest Hits'], { match: ['Theme from CHiPs', 'CHiPs Theme', 'CHiPs'], artist: ['John Parker'], album_hint: ['Television\'s Greatest Hits'] })
  - ahora: yt DjI7zWbQris «CHiPs (Season 1 Intro 1977)» (Tate Smith, 69s) · yt D5-bD372v5s «CHiPs' - Theme Song (Intro)» (Ti Ger, 80s)
- `tv-blanco-y-negro-it-takes-diff-rent-strokes` (cambiada)
  - antes: buscaTv(['Alan Thicke Diff\'rent Strokes', 'Diff\'rent Strokes Television\'s Greatest Hits'], { match: ['It Takes Diff\'rent Strokes', 'It Takes a Diff\'rent Strokes', 'Diff\'rent Strokes'], artist: ['Alan Thicke'], album_hint: ['Television\'s Greatest Hits'] })
  - ahora: yt kK1MhqugRYg «Different Strokes Intro ORIGINAL» (martinlosteas, 51s) · yt 6jJIVK-daGk «Diff'rent Strokes - theme song (longer version)» (Reni Ramirez, 62s)
- `tv-alf-alf-theme` (cambiada)
  - antes: buscaTv(['Alf Clausen ALF', 'ALF Television\'s Greatest Hits'], { match: ['Theme from ALF', 'ALF Theme', 'ALF'], artist: ['Alf Clausen'], album_hint: ['Television\'s Greatest Hits'] })
  - ahora: yt 0I_3bu9zgDk «ALF - All Openings - Theme Song Credits - Paul Fusco - Opening Credits - Intro - (1986-1990)» (A FUSCO - Classic TV, 123s) · yt zD9pEaOqAqw «ALF - Original NBC Pilot Opening - Not Seen Since 1986 - Opening Theme Song Credits - Intro» (A FUSCO - Classic TV, 260s)
- `tv-sex-and-the-city-sex-and-the-city-theme` (cambiada)
  - antes: yt X453aKQgob4 «Sex and the City Opening Credits» (Ella Rose, 57s) · yt PKRe-6jAzuc «Sex and the City (1998) Season 1 - Opening Theme» (AnahaB Telly, 37s)
  - ahora: yt PKRe-6jAzuc «Sex and the City (1998) Season 1 - Opening Theme» (AnahaB Telly, 37s) · yt SPXZDbz-8HU «Sex and the City Opening Credits» (Ella Rose, 55s)
- `tv-los-soprano-woke-up-this-morning` (cambiada)
  - antes: apple 1726659625 mx «Woke up This Morning» (Alabama 3 — Exile on Coldharbour Lane)
  - ahora: apple 324764558 mx «Woke Up This Morning (Chosen One Mix)» (A3 — The Sopranos (Music from the HBO Original Series)) · apple 1608608752 mx «Woke Up This Morning (Chosen One Mix / Theme to the HBO series The Sopranos)» (A3 — Woke Up This Morning) · yt vy4-VrBbIeo «Woke Up This Morning Chosen One Mix  Theme to the HBO series The Sopranos» (Gamerotakuu, 246s)
- `tv-beverly-hills-90210-beverly-hills-90210-theme` (cambiada)
  - antes: buscaTv(['John E. Davis Beverly Hills 90210', 'Beverly Hills 90210 Television\'s Greatest Hits'], { match: ['Theme from Beverly Hills, 90210', 'Beverly Hills, 90210 Theme', 'Beverly Hills 90210'], artist: ['John E. Davis'], album_hint: ['Television\'s Greatest Hits', 'Beverly Hills, 90210'] })
  - ahora: yt JDOrOMuo-9o «Beverly Hills, 90210 - Intro [HQ]» (Jan Schmelter, 87s)
- `tv-mr-bean-ecce-homo-qui-est-faba` (cambiada)
  - antes: buscaTv(['Howard Goodall Mr. Bean', 'Ecce homo qui est faba'], { match: ['Ecce homo qui est faba', 'Mr. Bean Theme', 'Mr. Bean'], artist: ['Howard Goodall', 'Southwark Cathedral', 'Christ Church'], album_hint: ['Mr. Bean'] })
  - ahora: yt WmtIrkR6O7I «Mr Bean TV Series (Opening Theme)» (UK FlashBack, 36s) · yt 6Xcn630a-N8 «Mr.Bean Intro (1990)» (Huy Hoang Nigel Uno Phan, 35s) · yt 6C02VhTM8PI «Mr  Bean (1990) Ecce homo qui est faba» (xmorente Magister Latinus, 34s)
- `tv-dinosaurios-dinosaurs-theme` (cambiada)
  - antes: buscaTv(['Bruce Broughton Dinosaurs', 'Dinosaurs Television\'s Greatest Hits'], { match: ['Dinosaurs Main Title', 'Dinosaurs Theme', 'Dinosaurs'], artist: ['Bruce Broughton'], album_hint: ['Television\'s Greatest Hits'] })
  - ahora: yt CpSEG64Tq6o «Dinosaurs - Intro **High Quality**» (FungManHin, 41s) · yt 3jp-1AO32jg «Classic TV Theme: Dinosaurs (Full Stereo)» (David Gideon, 105s)
- `tv-la-ninera-the-nanny-named-fran` (cambiada)
  - antes: buscaTv(['Ann Hampton Callaway Nanny', 'The Nanny Television\'s Greatest Hits'], { match: ['The Nanny Named Fran', 'The Nanny'], artist: ['Ann Hampton Callaway'], album_hint: ['Television\'s Greatest Hits'] })
  - ahora: apple 1841692170 mx «The Nanny Named Fran (from "The Nanny" Television Series)» (Ann Hampton Callaway — The Nanny Named Fran (from "The Nanny" Television Series) - Single) · yt ijRSfm9CAUI «Anne Hampton Callaway - The Nanny Named Fran (The Nanny Theme Song)» (TheNewurban, 46s)
- `tv-xena-la-princesa-guerrera-xena-warrior-princess-main-title` (cambiada)
  - antes: buscaTv('Joseph LoDuca Xena', { match: ['Main Title (from "Xena: Warrior Princess")
  - ahora: apple 1444069072 mx «Main Title» (Joseph LoDuca — Xena: Warrior Princess (Original Television Soundtrack)) · apple 1444069630 mx «Main Title (Extended Version)» (Joseph LoDuca — Xena: Warrior Princess (Original Television Soundtrack)) · yt GdTnm6QNzeE «Xena Warrior Princess Intro 4K Remastered» (iTs- Abubakardurrani, 58s)
- `tv-gilmore-girls-where-you-lead` (cambiada)
  - antes: buscaTv(['Carole King Louise Goffin Where You Lead', 'Carole King Where You Lead'], { match: ['Where You Lead', 'Where You Lead I Will Follow'], artist: ['Carole King', 'Louise Goffin'], album_hint: ['Our Little Corner of the World', 'Gilmore Girls'] })
  - ahora: yt sKXIoKYDdo4 «Carole King & Louise Goffin - Where You Lead I Will Follow (Gilmore Girls intro theme song)» (SR, 207s) · apple 1139003043 mx «Where You Lead I Will Follow» (Carole King — Love Makes the World)
- `tv-csi-en-la-escena-del-crimen-who-are-you` (cambiada)
  - antes: buscaTv('The Who Who Are You', { match: ['Who Are You'], artist: ['The Who'], album_hint: ['Who Are You'] })
  - ahora: yt 2ysZk_KMXUE «Who Are You CSI Theme» (Vertigo Stardust, 41s) · yt Qh8SsaCWY-s «CSI Soundtrack Who Are You The Who» (MakerOfAllMusic1DS, 209s)

### js/catalog-anime.js

- `toon-dragon-ball-gt-mi-corazon-encantado` (cambiada)
  - antes: apple 1403477085 mx · yt wgZ-ATUGXDw «Dragon Ball GT Opening Latino Full HD 1080p Creditless [Mi Corazón Encantado]» (Sera Mun Doremi, 109s)
  - ahora: yt wgZ-ATUGXDw «Dragon Ball GT Opening Latino Full HD 1080p Creditless [Mi Corazón Encantado]» (Sera Mun Doremi, 109s) · yt dF4OwMSrnUQ «Dragon Ball GT - Mi Corazón Encantado - Broadcast Latino Remasterizado - TV Size - FLAC» (EL NOSTALGICO REMASTERIZADOR DE AUDIOS, 120s)
- `toon-yu-yu-hakusho-sonrisa-explosiva` (cambiada)
  - antes: yt RncCJNOZLb0 «Yu Yu Hakusho Opening Latino - HD» (LeonMaverick1998, 90s) · apple 433591403 mx
  - ahora: yt RncCJNOZLb0 t=15 «Yu Yu Hakusho Opening Latino - HD» (LeonMaverick1998, 90s) · apple 433591403 mx

### js/catalog-disney.js

- `dis-hercules-no-importa-la-distancia` (cambiada) — composer: "Ricky Martin" → "Antonio Benavides"
  - antes: apple 185392252 mx
  - ahora: yt A1AYx-qIdec «Hércules (1997) — "No Importa La Distancia" || Canción completa — (latino)//(video+letra)» (kevinCN1, 281s) · yt KUKMMK7g3aw «Hercules "No importa la distancia" (Español Latino)» (Omar Cabán -YuriFoX-, 281s)
- `dis-mulan-reflejo` (cambiada)
  - antes: apple 1624897208 mx «Reflejo (Tema Principal)» (Lucero — Mulán (Banda Sonora Original en Español))
  - ahora: apple 1624897102 mx «Reflejo» (ANALY — Mulán (Banda Sonora Original en Español)) · yt _yTsNxhGE30 «Mi reflejo | Mulán» (Disney Jr. Latinoamérica, 101s)

### js/catalog-musicales.js

- `mus-sonrisas-cosas-que-me-hacen-feliz` (cambiada)
  - antes: am 1442413954
  - ahora: yt uu0OP85Uhbc «Sonrisas y Lagrimas - Cosas que me hacen feliz» (Sonrisas y lágrimas Youtube, 161s) · yt jgFEV8qVFek «Mis Cosas Favoritas (From The Sound Of Music)» (Kika Edgar - Topic, 150s)
- `mus-jcs-i-dont-know-how-to-love-him` (cambiada)
  - antes: am 1440808479
  - ahora: am 1576870092 «I Don't Know How To Love Him» (Yvonne Elliman — Jesus Christ Superstar (50th Anniversary / Deluxe) [2021 Remaster], us) · am 1440659210 «I Don't Know How to Love Him» (Yvonne Elliman — Jesus Christ Superstar (Original Broadway Cast), us) · yt ry3Q1wFClu8 «I Don't Know How To Love Him (From "Jesus Christ Superstar" Soundtrack)» (Yvonne Elliman - Topic, 238s)
- `mus-rocky-horror-time-warp` (cambiada)
  - antes: am 1024228176 · am 293627177
  - ahora: am 6795892417 «Time Warp» (Little Nell, Patricia Quinn, Richard O'Brien & The Rocky Horror Picture Show — The Rocky Horror Picture Show (Soundtrack from the Motion Picture), us) · am 6798894562 «The Time Warp (2015 Remastered)» (Richard O'Brien, Patricia Quinn, Nell Campbell & The Rocky Horror Picture Show — Absolute Treasures: The Rocky Horror Picture Show - The Complete and Definitive Soundtrack (2015 40th Anniversary Re-Mastered Edition), us) · yt u1O2-oFmWXM «The Rocky Horror Picture Show "Time Warp" (1975) - (4K)» (VideoXL, 255s)
- `mus-phantom-the-music-of-the-night` (cambiada)
  - antes: am 1452159654
  - ahora: am 1843488431 «The Music of the Night» (Michael Crawford — The Phantom of the Opera (Original 1986 London Cast), us) · am 1843482049 «The Music of the Night» (Andrew Lloyd Webber & Michael Crawford — Highlights from the Phantom of the Opera (Original 1986 London Cast), us) · yt 4JXFOnWYMAg «The Music of the Night» (Andrew Lloyd Webber - Topic, 341s)
- `mus-grease-noches-de-verano` (cambiada)
  - antes: busca('Grease', 'Noches de verano')
  - ahora: am 1886593807 «Noches De Verano» (Timbiriche — Vaselina, us) · yt dufaepx47X4 «Vaselina (Timbiriche) - Noches de Verano CON LETRA» (Daniel Morales (DMorales), 209s) · yt UCrfiGrLPDU «Noches de Verano - Vaselina Timbiriche 1985» (Alfredo García, 201s)
- `mus-rocky-touch-a-touch-me` (cambiada)
  - antes: busca('The Rocky Horror Picture Show', 'Touch-a, Touch-a, Touch-a, Touch Me')
  - ahora: am 6795892805 «Touch-A, Touch-A, Touch Me» (Susan Sarandon & The Rocky Horror Picture Show — The Rocky Horror Picture Show (Soundtrack from the Motion Picture), us) · am 6798894575 «Touch-A, Touch-A, Touch Me (2015 Remastered)» (Susan Sarandon & The Rocky Horror Picture Show — Absolute Treasures: The Rocky Horror Picture Show - The Complete and Definitive Soundtrack (2015 40th Anniversary Re-Mastered Edition), us)
- `mus-mamma-mia-va-todo-al-ganador` (cambiada)
  - antes: am 1440848090
  - ahora: yt 8GfRenrapjA «Mamma Mia! - Va todo al ganador» (BroadwayRadio Spain, 255s) · yt CvO9aII8QtQ «MAMMA MIA . Va todo al ganador» (NinaStudio, 279s)
- `mus-mamma-mia-chiquitita` (cambiada)
  - antes: am 1440847475
  - ahora: yt ChPnown8esE «Chiquita (De la producción teatral española Mamma Mia!)» (mammamiaonline, 169s) · yt hl4FXPpn8lE «Mamma Mia Barcelona.Muntsa Rius. Maribel Ibarz . Nina. Chiquitita» (63mousse, 188s)
- `mus-mamma-mia-fija-tu-amor-en-mi` (cambiada)
  - antes: am 1440847579
  - ahora: yt RXZLo7PzVnc «Mamma Mia! - Fija tu amor en mí» (BroadwayRadio Spain, 217s) · yt 3hK8QY-rUEw «Fija tu amor en mí (Lay All Your Love on Me)» (mammamiaonline, 236s)
- `mus-rent-ill-cover-you` (cambiada)
  - antes: busca('Rent', 'I\'ll Cover You')
  - ahora: am 1440845173 «I'll Cover You» (Wilson Jermaine Heredia & Jesse L. Martin — Rent (Original Broadway Cast Recording), us) · am 80446176 «I'll Cover You» (Wilson Jermaine Heredia & Jesse L. Martin — Rent (Original Motion Picture Soundtrack), us) · yt WNmW-soLOMg «I'll Cover You» (Wilson Jermaine Heredia - Topic, 149s)
- `mus-six-dont-lose-ur-head` (cambiada)
  - antes: busca('Six', 'Don\'t Lose Ur Head')
  - ahora: am 1465183509 «Don't Lose Ur Head (feat. Christina Modestou)» (SIX — Six: The Musical (Studio Cast Recording), us) · am 1620248488 «Don't Lose Ur Head (feat. Andrea Macasaet)» (SIX — SIX: LIVE ON OPENING NIGHT (Original Broadway Cast Recording), us) · yt kAthQG1aKho «SIX the Musical - Don't Lose Ur Head (from the Studio Cast Recording)» (SIX, 247s)
- `mus-six-heart-of-stone` (cambiada)
  - antes: busca('Six', 'Heart of Stone')
  - ahora: am 1465183513 «Heart of Stone (feat. Natalie Paris)» (SIX — Six: The Musical (Studio Cast Recording), us) · am 1620248651 «Heart of Stone (feat. Abby Mueller)» (SIX — SIX: LIVE ON OPENING NIGHT (Original Broadway Cast Recording), us) · yt wMY7nZHNp7U «SIX the Musical (featuring Natalie Paris) - Heart of Stone (from the Studio Cast Recording)» (SIX, 313s)

## 5. Pendiente por aplicar

- **Issues restantes:** #10 (`toon-los-padrinos-magicos-los-padrinos-magicos-tema`), #12 (`toon-inuyasha-change-the-world`), #15 (confirmación de IDs inventados en Caricaturas), #16 (`ani-blue-seed-carnival-babel`), #18 (`toon-shuriken-school-tema`).
- **Muertas restantes (16):** 15 de Videojuegos (`js/catalog.js`) y 1 de Anime (`ani-hokuto-no-ken-ai-wo-torimodose`). Ya buscadas y comprobadas en `scripts/evidencia-v2.1.json`.
- **Dudosas y retiradas de Fase 2:** 15 covers de Videojuegos, 27 de Anime + 5 retiradas de Anime, 35 de Caricaturas + 11 retiradas de Caricaturas (búsquedas ya terminadas en `_tmp-phase2-part3a.json` y `_tmp-phase2-part3b.json`).
- **Fase 3 (Expansión +20 % por categoría):** Series (+70 hasta 192), Caricaturas (+65), Anime (+52), Disney (+21), Musicales (+47), Videojuegos (+61), Sagas (+37).
- **Fase 4:** Auditoría final `audit-red.js todos` con 0 muertas, verificación en navegador y actualización de versión a 2.1.
