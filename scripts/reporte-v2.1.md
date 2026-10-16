# Reporte v2.1 — catálogo (en progreso)

Rama: `antigravity/v2.1-catalogo` (desde `origin/claude/clever-sagan-5xuvc1`). Este reporte se actualiza en cada commit.

## 1. Auditoría de red — antes vs. tras Fase 2

`node scripts/audit-red.js todos` (`scripts/audit-red-antes.json` vs. `scripts/audit-red-report.json`):

| Tema | Antes (Total / OK / Dudosas / Muertas) | Tras Fase 2 (Total / OK / Dudosas / Muertas) |
|---|---|---|
| Series | 122 / 114 / 4 / 4 | 122 / 118 / 4 / **0** |
| Videojuegos | 281 / 263 / 3 / 15 | 281 / 276 / 5 / **0** |
| Sagas | 184 / 167 / 17 / 0 | 184 / 167 / 17 / **0** |
| Caricaturas | 296 / 221 / 75 / 0 | 307 (+11 recuperadas) / 237 / 70 / **0** |
| Anime | 251 / 186 / 64 / 1 | 256 (+5 recuperadas) / 213 / 43 / **0** |
| Disney | 71 / 59 / 12 / 0 | 71 / 59 / 12 / **0** |
| Musicales | 222 / 213 / 0 / 9 | 222 / 220 / 2 / **0** |
| **Total** | **1,427 / 1,223 / 175 / 29** | **1,443 / 1,290 / 153 / 0** |

## 2. Cómo se comprobó cada ID

- Búsquedas reales con `scripts/lib-v21.js` (YouTube: 1 búsqueda/s, oEmbed + página `watch?v=` con `playabilityStatus.status === "OK"` y `playableInEmbed !== false`; Apple: lookup con el mismo `country` de la fuente y `previewUrl`).
- Cada comprobación queda en `scripts/evidencia-v2.1.json` por ID (consulta, título, canal/artista, álbum, duración, país, resultado, fecha).
- `node scripts/check-evidencia.js` revisa sin internet que cada ID nuevo o cambiado frente a la rama base tenga evidencia válida y del mismo país (380 IDs revisados, 0 sin evidencia).
- `node scripts/diff-fuentes.js --md` genera la lista completa de abajo (fuente vieja → nueva, con el título y canal de la evidencia).
- Lo que solo se decide oyendo está en `scripts/revisar-a-oido.md`.
- Ninguna pista tuvo que quitarse (`scripts/pendientes-v2.1.json` vacío `[]`).

## 3. Estado de los issues (#8 a #18) — TODOS RESUELTOS

| Issue | Pista | Estado |
|---|---|---|
| #8 | `dis-hercules-no-importa-la-distancia` | **Arreglado:** dos videos comprobados de la versión latina de la película (Antonio Benavides, Hércules joven); Apple solo tenía la versión pop de créditos de Ricky Martin. Anotado en `revisar-a-oido.md`. |
| #9 | `tv-los-soprano-woke-up-this-morning` | **Arreglado:** Apple `324764558` «Woke Up This Morning (Chosen One Mix)» de A3 (álbum oficial de la serie) + respaldo Apple `1608608752` y YouTube `vy4-VrBbIeo`. |
| #10 | `toon-los-padrinos-magicos-los-padrinos-magicos-tema` | **Arreglado:** reemplazado `kFjexH-badI` por tres videos comprobados de la entrada latina oficial de Nickelodeon (`8-GyMX9ynj0`, `UNNwMc4OGBg`, `LZF8GErHgIk`). |
| #11 | `tv-sex-and-the-city-sex-and-the-city-theme` | **Arreglado:** retirado `X453aKQgob4`; quedan `PKRe-6jAzuc` y `SPXZDbz-8HU`, ambos comprobados con `playabilityStatus: OK` y `playableInEmbed: true`. |
| #12 | `toon-inuyasha-change-the-world` | **Arreglado:** agregado el opening 1 en español latino («El mundo he de cambiar», `suU86VJt5a0` TV size y `PxQ9RdKxclQ`) delante del respaldo de Apple (`1848248144`). |
| #13 | `toon-yu-yu-hakusho-sonrisa-explosiva` | **Arreglado:** ajustado inicio a `yt('RncCJNOZLb0', 15)` para saltar la introducción silenciosa; además se separó `ani-yu-yu-hakusho-hohoemi-no-bakudan` con el opening japonés original (`urZWmEgm72Q`, Crunchyroll). |
| #14 | `toon-dragon-ball-gt-mi-corazon-encantado` | **Arreglado:** puesto primero el opening latino de TV (`wgZ-ATUGXDw` y respaldo `dF4OwMSrnUQ`) y retirado el Apple que tocaba una regrabación. |
| #15 | Reporte viejo de Caricaturas con IDs inventados | **Confirmado:** `node scripts/audit-red.js caricaturas` comprobó todas las pistas de Caricaturas contra YouTube/Apple y dio **0 muertas**; no queda ningún ID inventado del reporte #15. |
| #16 | `ani-blue-seed-carnival-babel` | **Arreglado:** reemplazado `hwQVtycXyZw` por el audio oficial `NArssqBPTvE` («CARNIVAL・BABEL ～カルナバル・バベル～», TAKADA BAND - Topic) que arranca directo sin intro hablada, más respaldos `kqPxlbAseho` y `ykbcsmjbUiQ`. |
| #17 | `dis-mulan-reflejo` | **Arreglado:** cambiado de Apple `1624897208` («Reflejo (Tema Principal)», versión pop de créditos) a Apple `1624897102` («Reflejo», pista 2 del álbum *Mulán (Banda Sonora Original en Español)*, 2:26, versión de la película) + respaldo YouTube `_yTsNxhGE30`. |
| #18 | `toon-shuriken-school-tema` | **Arreglado:** reemplazado `WTQ_bj6T14g` por el opening oficial `I6fEsMsgw8c` (canal oficial *Shuriken School*) y respaldo `jC4G22p6OhM`. |

## 4. Pistas arregladas y recuperadas en Fase 2 (fuente vieja → nueva)

Incluye:
- Los **11 issues (#8 a #18)**.
- Las **29 pistas muertas** de la auditoría inicial (4 de Series, 15 de Videojuegos, 1 de Anime y 9 de Musicales) + fuentes primarias caídas (`acnh-main`, `toon-un-show-mas-un-show-mas-entrada`).
- Las **30 series de Gemini** (14 que ya resolvían a la grabación original con `buscaTv` y 16 reparadas con fuentes originales comprobadas).
- Los **15 covers de Videojuegos** y **3 covers de Musicales** que resolvían a covers en Apple Music.
- Las **27 pistas de Anime** y **35 pistas de Caricaturas** con video equivocado, duplicado o corto.
- Las **16 pistas retiradas** en la reparación anterior (5 de Anime y 11 de Caricaturas), todas recuperadas con fuentes reales comprobadas.

### js/catalog.js

- `acnh-main` (cambiada)
  - antes: yt lI_C1Bjdqn4 · yt dZQez9N4VRg
  - ahora: yt dZQez9N4VRg
- `age-of-empires-ii-shamburger` (cambiada)
  - antes: apple {term: 'Shamburger Age of Empires II The Age of Kings', match: 'Shamburger'}
  - ahora: yt CPhJWlURRVM «Age of Empires II - Shamburger» (Chaud, 215s) · yt ScjlBHY_pd4 «Shamburger (Age of Empires II: Definitive Edition Soundtrack)» (Peaches Lamb, 282s) · yt WWChiYoTSNI «Shamburger» (Todd Masten - Topic, 282s)
- `ori-and-the-will-of-th-ori-and-the-will-of-th` (cambiada)
  - antes: apple {term: 'Ori and the Will of the Wisps Ori and the Will of the Wisps', match: 'Ori and the Will of the Wisps'}
  - ahora: apple 1500849133 mx «Main Theme» (Gareth Coker — Ori and the Will of the Wisps (Original Soundtrack Recording)) · yt Qh3NnE7Ye2M «Main Theme» (Gareth Coker - Topic, 117s)
- `sea-of-thieves-grogg-mayles` (cambiada)
  - antes: apple {term: 'Grogg Mayles Sea of Thieves', match: 'Grogg Mayles'}
  - ahora: yt Dzio5OGBJ3o «Grogg Mayles» (Sea of Thieves - Topic, 113s) · yt qy9DeUihR6s «Grogg Mayles (Original Game Soundtrack) (Instrumental)» (Sea of Thieves - Topic, 111s) · yt -p04mhYaS1Y «Sea of Thieves - Grogg Mayles (OST)» (VGSoundTracks, 111s)
- `starfield-starfield` (cambiada)
  - antes: apple {term: 'Starfield Starfield', match: 'Starfield'}
  - ahora: yt Bgmsi5cM-gA «"Into The Starfield" by Inon Zur - Official Main Theme» (SuperEricksen, 167s) · yt aICTLaYteF0 «01  Into the Starfield Main Theme Starfield Original Game Soundtrack OST» (TheSoundtrack, 169s) · yt QGzEpcl42SA «Starfield - Main Theme (Official OST)» (Dan Allen Gaming, 164s)
- `horizon-zero-dawn-aloy-s-theme` (cambiada)
  - antes: apple {term: "Aloy's Theme Horizon Zero Dawn", match: "Aloy's Theme"} · yt _w9B7uwLZeI «Horizon Zero Dawn OST - Aloy's Theme» (CobaiyeOST, 150s) · yt zb_fDZKwT4E · yt vcccPoLY3mM
  - ahora: apple 1678659568 mx «Aloy's Theme (feat. Julie Elven) [Part 1 - Motherland]» (Joris de Man — Horizon Zero Dawn (Original Soundtrack)) · yt Ahjcv5fGH5o «Horizon Zero Dawn OST - Aloy's Theme (Joris de Man feat. Julie Elven)» (Julie Elven, 150s) · yt _w9B7uwLZeI «Horizon Zero Dawn OST - Aloy's Theme» (CobaiyeOST, 150s)
- `undertale-megalovania` (cambiada)
  - antes: apple 1528217897 us · apple {album: 1528217465, match: 'Megalovania'} · apple {album: 1119806348, match: 'Megalovania'}
  - ahora: apple 6813343186 mx «Megalovania» (Toby Fox — Undertale Soundtrack) · yt KK3KXAECte4 «100. MEGALOVANIA (UNDERTALE Soundtrack) - Toby Fox» (Toby Fox, 160s) · yt 0FCvzsVlXpQ «MEGALOVANIA» (Toby Fox - Topic, 156s)
- `castlevania-vampire-killer` (cambiada)
  - antes: apple {term: 'Vampire Killer Castlevania', match: 'Vampire Killer'} · yt _Kuh_OjCpMs · yt btgi3TPL3AE «Castlevania (NES) Music - Stage 01 Vampire Killer» (GBelair, 180s)
  - ahora: apple 6813088759 mx «Vampire Killer (城内潜入BGM) [悪魔城ドラキュラ] [FDS]» (Konami Kukeiha Club — ミュージックフロム 悪魔城ドラキュラ 黒 01) · yt btgi3TPL3AE «Castlevania (NES) Music - Stage 01 Vampire Killer» (GBelair, 180s) · yt kASEUfAN5pk «Castlevania (NES/FC) Music - Vampire Killer [HQ]» (player2403, 180s)
- `contra-jungle` (cambiada)
  - antes: apple {term: 'Jungle Contra', match: 'Jungle'} · yt O04bPRzqEEk «Contra (NES) Music - Jungle Theme» (GBelair, 180s) · yt q3kRcj74DPI
  - ahora: yt O04bPRzqEEk «Contra (NES) Music - Jungle Theme» (GBelair, 180s) · yt 5UqXbEwqwF8 «Contra Music (NES) - Jungle Theme [Stage 1]» (explod2A03, 116s) · yt o_CEXj45-Lk «Contra (Arcade) OST - 1987 /// 02 - Area 1 Jungle ~ Area 7 Hangar» (Best Game Music, 180s)
- `chrono-cross-chrono-cross-time-s-sc` (cambiada)
  - antes: apple {term: "CHRONO CROSS ~Time's Scar~ Chrono Cross", match: "CHRONO CROSS ~Time's Scar~"}
  - ahora: apple 1478581545 mx «CHRONO CROSS ~時の傷痕~» (Yasunori Mitsuda — クロノ・クロス オリジナル・サウンドトラック) · yt 40BZyMdDG4s «CHRONO CROSS ～時の傷痕～» (Yasunori Mitsuda - Topic, 150s) · yt 180sjeAMKPE «Chrono Cross Opening/Intro HD - Scars of Time (high quality)» (0xybelis, 145s)
- `dragon-quest-overture` (cambiada)
  - antes: apple {term: 'Overture Dragon Quest', match: 'Overture'}
  - ahora: apple 1824660296 mx «序曲 (IV)» (Tokyo Metropolitan Symphony Orchestra & Koichi Sugiyama — 交響組曲「ドラゴンクエスト IV」導かれし者たち) · apple 1824661465 mx «序曲 (XI)» (Tokyo Metropolitan Symphony Orchestra & Koichi Sugiyama — 交響組曲「ドラゴンクエストXI」過ぎ去りし時を求めて) · yt MATZR7LGECQ «Symphonic Suite Dragon Quest IV ~ Overture» (Godai, 148s)
- `kingdom-hearts-simple-and-clean` (cambiada)
  - antes: apple {term: 'Simple And Clean Kingdom Hearts', match: 'Simple And Clean'} · yt _Hl3W4HB254
  - ahora: apple 1444573376 mx «Simple And Clean (Remastered 2018)» (Hikaru Utada — Deep River (Remastered 2018)) · yt 0nKizH5TV_g «Kingdom Hearts 1.5 HD - Opening (Simple and Clean)» (Livvy Valnain, 192s) · yt N0vhw4dfMRg «Kingdom Hearts: Simple and Clean (lyrics)» (ShadowFang01, 298s)
- `kingdom-hearts-ii-sanctuary` (cambiada)
  - antes: apple {term: 'Sanctuary Kingdom Hearts II', match: 'Sanctuary'} · yt z11j5hDvA9I · yt P1YL4FkCtUw
  - ahora: apple 1444982815 mx «Sanctuary (Opening)» (Hikaru Utada — Ultra Blue (Remastered 2018)) · yt im5tc4fcg5w «Kingdom Hearts 2 Opening Sanctuary HD» (Lin, 292s) · yt HTUq3Ik1GHM «Kingdom Hearts II Soundtrack- Sanctuary» (Schizo Prime, 257s)
- `monster-hunter-proof-of-a-hero` (cambiada)
  - antes: apple {term: 'Proof of a Hero Monster Hunter World', match: 'Proof of a Hero'}
  - ahora: apple 1336357865 mx «Proof of a Hero - Monster Hunter: World version» (Zhenlan Kang(CAPCOM) — MONSTER HUNTER: WORLD ORIGINAL SOUNDTRACK) · apple 1336360271 mx «Proof of a Hero - Monster Hunter: World version (Extended edition)» (Zhenlan Kang(CAPCOM) — MONSTER HUNTER: WORLD ORIGINAL SOUNDTRACK) · yt nn6qY2sXLjE «Monster Hunter World OST: Proof of a Hero (Extended) 英雄の証 ～ MH:W ver (Extended edition) [HQ | 4K]» (Sound of Monster Hunter, 195s)
- `persona-3-mass-destruction` (cambiada)
  - antes: apple {term: 'Mass Destruction Persona 3', match: 'Mass Destruction'}
  - ahora: yt S0GgBcNKK5g «Mass Destruction» (Lotus Juice - Topic, 209s) · yt 6jFaoLrLzd4 «Persona 3 OST - Mass Destruction» (Bosquez88, 210s) · yt Q6q6pDC6Mas «Mass Destruction -Reload-» (Lotus Juice - Topic, 185s)
- `persona-4-reach-out-to-the-truth` (cambiada)
  - antes: apple {term: 'Reach Out To The Truth Persona 4', match: 'Reach Out To The Truth'}
  - ahora: yt A9zlXUSuUeo «Reach Out To The Truth» (Shihoko Hirata - Topic, 168s) · yt 11nM7lkCkhk «Reach Out To The Truth -First Battle-» (Shihoko Hirata - Topic, 177s) · yt 5cbjrTNSq0I «Persona 4 - Reach Out To The Truth - First Battle» (HyperTrooper, 178s)
- `sekiro-shadows-die-twi-isshin-the-sword-saint` (cambiada)
  - antes: apple {term: 'Isshin, the Sword Saint Sekiro Shadows Die Twice', match: 'Isshin, the Sword Saint'}
  - ahora: yt bfNCB9fhvIQ «Sword Saint | Sekiro™: Shadows Die Twice OST» (Original Soundtrack, 208s) · yt h6zaG46LeD4 «Isshin Ashina | Sekiro™: Shadows Die Twice OST» (Original Soundtrack, 187s)
- `witcher-3-wolven-storm-priscilla` (cambiada)
  - antes: apple {term: "The Wolven Storm (Priscilla's Song) The Witcher 3 Wild Hunt", match: "The Wolven Storm (Priscilla's Song)"}
  - ahora: apple 1032027414 mx «Wolven Storm» (Marcin Przybyłowicz — Wolven Storm - Single) · yt 3ukCLUdzbUs «Wolven Storm (English)» (Marcin Przybylowicz - Topic, 198s) · yt 823yuWz0lto «The Witcher 3 Soundtrack - The Wolven Storm (Priscilla's song)» (Movie Edition Games, 201s)
- `bioshock-welcome-to-rapture` (cambiada)
  - antes: apple {term: 'Welcome to Rapture BioShock', match: 'Welcome to Rapture'}
  - ahora: yt BbEunjRoj84 «Garry Schyman - The Ocean On His Shoulders - Welcome To Rapture» (BioshockOST, 217s) · yt sEFIZh_Zscc «Bioshock Soundtrack: 02 Welcome to Rapture» (firefeure, 113s) · yt 7DjpOuucA1k «BioShock OST | Welcome to Rapture» (VideoGameMusicTube, 111s)
- `bioshock-infinite-will-the-circle-be-unb` (cambiada)
  - antes: apple {term: 'Will the Circle Be Unbroken BioShock Infinite', match: 'Will the Circle Be Unbroken'}
  - ahora: yt 9F1l6xXLSI0 «Bioshock Infinite OST - Will The Circle Be Unbroken (Full)» (BioshockInfiniteOST, 285s) · yt kKCgzwHz6CI «BioShock Infinite - Will The Circle Be Unbroken (Choir)» (Gardimuer, 345s) · yt LAIS-ADK6c8 «Bioshock Infinite OST - Will The Circle Be Unbroken (Choral version)» (BioshockInfiniteOST, 177s)
- `devil-may-cry-3-devils-never-cry` (cambiada)
  - antes: apple {term: "Devils Never Cry Devil May Cry 3 Dante's Awakening", match: 'Devils Never Cry'}
  - ahora: apple 507028546 mx «"DEVILS NEVER CRY"(スタッフロール)» (Capcom Sound Team — Devil May Cry 3 (Original Soundtrack)) · yt xti_6Bzpa8A «Devil May Cry 3 - Devils Never Cry» (Peppos92, 321s) · yt lj-2-44G11A «Devil May Cry 3 - Devils Never Cry [HD]» (Ms.Dantessa, 366s)
- `doom-eternal-only-thing-they-fear-i` (cambiada)
  - antes: apple {term: 'The Only Thing They Fear Is You DOOM Eternal', match: 'The Only Thing They Fear Is You'}
  - ahora: yt kpnW68Q8ltc «Doom Eternal OST - The Only Thing They Fear Is You (Mick Gordon) [Doom Eternal Theme]» (Revive Music, 413s) · yt ekY09M48Jvs «DOOM Eternal OST - The Only Thing They Fear Is You (Extended Intro)» (sv_jace, 488s)
- `grand-theft-auto-main-theme` (cambiada)
  - antes: apple {term: 'Main Theme Grand Theft Auto San Andreas', match: 'Main Theme'}
  - ahora: yt JYy69qOJWoM «Grand Theft Auto Theme (Joyride by Da Shootaz)» (PLINGMAN777777, 168s) · yt 6hXohRub4WQ «GTA 1 (GTA I) - Main Theme | Da Shootaz - "Joyride"» (GTA Soundtracks, 157s) · yt KZqsEH99QYM «Grand Theft Auto - Main Theme [REMASTERED & EXTENDED]» (1DERER, 273s)
- `max-payne-max-payne-theme` (cambiada)
  - antes: apple {term: 'Max Payne Theme Max Payne', match: 'Max Payne Theme'}
  - ahora: yt Cv0y0On8ZGQ «Max Payne - Main Theme» (dino_squared, 225s) · yt _17usOw7rbo «Max Payne [OST] #01 - Max Payne Theme» (GronkhOSTs, 224s) · yt 1f7jjys4BjQ «Max Payne (2001) - Main theme (HQ/HD - Audio enhanced)» (Uzublecker Database, 225s)
- `tomb-raider-2013-tomb-raider-main-theme` (cambiada)
  - antes: apple {term: 'Tomb Raider Main Theme Tomb Raider', match: 'Tomb Raider Main Theme'}
  - ahora: apple 1471827136 mx «A Survivor Is Born» (Jason Graves — Tomb Raider (Original Soundtrack)) · apple 1731016011 mx «A Survivor Is Born» (Jason Graves — Tomb Raider (Original Soundtrack)) · yt iiVUXL6_REM «The Tomb Raider» (Jason Graves - Topic, 52s)
- `call-of-duty-lullaby-for-a-dead-man` (cambiada)
  - antes: apple {term: 'Lullaby for a Dead Man Call of Duty World at War', match: 'Lullaby for a Dead Man'}
  - ahora: apple 1542638511 mx «Lullaby of a Deadman» (Kevin Sherwood, Corey Redgrift & Elena Siegman — Call of Duty: Black Ops – Zombies (Original Game Soundtrack)) · yt rDtDKuOGE40 «Lullaby for a Deadman - Verruckt song -  Elena Siegman - Lyrics [Official]» (Kevin Sherwood, 246s) · yt 8l8YPKI3fdw «Black Ops Zombies Soundtrack - "Lullaby Of A Dead Man"» (YouTube Radio, 237s)
- `dota-2-dota-2-main-theme` (cambiada)
  - antes: apple {term: 'Dota 2 Main Theme Dota 2', match: 'Dota 2 Main Theme'}
  - ahora: apple 1891389281 mx «Dota2» (Valve Studio Orchestra — The Dota 2 (Official Soundtrack)) · yt FUSTuiSEKQk «Dota 2 Trailer Music - Main Menu Theme» (dota2updates, 113s) · yt eMQ1CzJYumA «Dota 2 - Main Menu Flute Theme» (Gagunga, 112s)
- `honkai-star-rail-hope-is-the-thing-with` (cambiada)
  - antes: apple {term: 'Hope Is the Thing With Feathers Honkai Star Rail', match: 'Hope Is the Thing With Feathers'}
  - ahora: apple 1744859069 mx «Hope Is the Thing With Feathers» (Robin, HOYO-MiX & Chevy — INSIDE - EP) · yt l8-v7ZnNB_c «EP: Hope Is the Thing With Feathers | Honkai: Star Rail» (Honkai: Star Rail, 176s) · yt DlIgf0PUDo4 «Robin (Chevy) - Hope Is the Thing With Feathers | Honkai: Star Rail» (Noobaka, 230s)
- `overwatch-2-overture` (cambiada)
  - antes: apple {term: 'Overture Overwatch 2', match: 'Overture'}
  - ahora: yt xco_LrRLYN4 «Overwatch Music - (01) Overture» (Warcraft Music | Congelatore, 115s) · yt LrA__QQ6RAE «Overture» (Release - Topic, 114s)
- `team-fortress-2-team-fortress-2-main-t` (cambiada)
  - antes: apple {term: 'Team Fortress 2 (Main Theme) Team Fortress 2', match: 'Team Fortress 2 (Main Theme)'}
  - ahora: apple 1891390013 mx «Team Fortress 2» (Valve Studio Orchestra — The Orange Box (Original Soundtrack)) · apple 1891389644 mx «Team Fortress 2» (Valve Studio Orchestra — Fight Songs: The Music of Team Fortress 2) · yt PDM2qukzKwg «Team Fortress 2 Soundtrack | Main Theme» (OfficialTF2Wiki, 73s)
- `team-fortress-2-rocket-jump-waltz` (cambiada)
  - antes: apple {term: 'Rocket Jump Waltz Team Fortress 2', match: 'Rocket Jump Waltz'}
  - ahora: apple 1891390015 mx «Rocket Jump Waltz» (Valve Studio Orchestra — The Orange Box (Original Soundtrack)) · yt kbdtBLD8Lbg «Team Fortress 2 Soundtrack | Rocket Jump Waltz» (OfficialTF2Wiki, 40s) · yt 2lKEJlDQrXU «Rocket Jump Waltz» (Valve Studio Orchestra - Topic, 40s)

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

### js/catalog-caricaturas.js

- `toon-canuto-y-canito-tema` (cambiada)
  - antes: yt YWHvV9qKXbg
  - ahora: yt N0ltSTIoQYA «Boomerang spot - Canuto y Canito - Augie Doggie» (carloscentella, 61s) · yt CxCjSAhm6Og «Augie Doggie and Doggie Daddy (1959) - Extended Main Theme» (robmic, 64s) · yt JFJhf7P6Li0 «TV THEME - "AUGIE DOGGIE"» (Pirate Radio U.S.A., 28s)
- `toon-superman-filmation-1966-tema` (cambiada)
  - antes: yt WAQW_u9eiuU
  - ahora: yt Vp8yZoc4Bbs «Las Nuevas Aventuras de Superman (1966) | Intro Original | Español Latino | Remasterizada en Full HD» (Long Play Chile, 54s) · yt -BnMrpMd1Rc «OPENING  LAS NUEVAS AVENTURAS DE SUPERMAN 1966   TV RIP CANAL WARNER» (SuperEddiejam, 55s) · yt XY9rOVu0RBk «New Adventures of Superman Theme Song (1966)» (Kurtis Findlay, 56s)
- `toon-batman-filmation-1968-tema` (cambiada)
  - antes: yt Fgz9cJScRik
  - ahora: yt jKkhUwK7bXo «Las aventuras de Batman y Robin (intro de 1968).» (¡Archivo nostálgico!, 59s) · yt ZjAFAV7S6Sg «batman y robin 1968 audio latino» (Retro'X Tv, 201s) · yt N94ljLAeplk «The Adventures of Batman | 1968 Cartoon Intro» (Near Mint Fanboys, 61s)
- `toon-archie-show-sugar-sugar` (cambiada)
  - antes: yt hfuU-xOj8lA
  - ahora: yt WGl0sdlIDiU «Los Archies Intro 1968» (GMJCZP, 58s) · yt j3plj_Xplus «The Archies - Sugar, Sugar (Official Animated Music Video)» (TheArchiesVEVO, 182s) · apple 214805381 mx «Sugar, Sugar» (The Archies — Sugar, Sugar - Single) · apple 1412839444 mx «Sugar, Sugar» (The Archies — Everything's Archie)
- `toon-nuevas-peliculas-scooby-doo-tema` (cambiada)
  - antes: yt 6Jj8sIcCsuU
  - ahora: yt vQrfORAuxjA «Las Nuevas películas de Scooby Doo (1972) en Azteca 7 Estreno Intro» (Martín Arredondo, 77s) · yt M7QXmazyPnk «Nuevas películas de Scooby Doo (1972) en Azteca 7 Estreno Intro» (Araceli Medina Gomez, 62s) · yt FeRm2esVSdY «1972 The New Scooby-Doo Movies Intro S1» (ScoobyDooEpisodes, 61s)
- `toon-dinamita-perro-maravilla-tema` (nueva)
  - ahora: yt rkeIwShrX74 «Fabulman y Dinamita intro latino» (MF RETRO VINTAGE, 73s) · yt ngi7qrPCYDc «DINAMITA Y FABULMAN  Intro Español Latino» (J.L MEGA-RETRO, 71s) · yt VxxL2YvNkzE «Dynomutt Dog Wonder TV intro (1978)» (Fabs Jimenez, 59s)
- `toon-frankenstein-jr-los-imposibles-tema` (nueva)
  - ahora: yt XrkRs8s7pY0 «Los imposibles intro español latino» (Retro'X Tv, 46s) · yt xtInRPbNn3U «Opening los imposibles y frankenstein jr» (TV CLASICOS, 51s) · yt qjftOJhpPU4 «Open | Frankenstein Jr. & The Impossibles | Warner Archive» (Warner Bros. Classics, 50s)
- `toon-simiolon-y-la-pandilla-tema` (nueva)
  - ahora: yt D_d583FHxPQ «The Great Grape Ape Show Intro» (CockGoblin, 61s) · yt 6xv8hi7JOGc «TV THEME - "THE GREAT GRAPE APE SHOW"» (Pirate Radio U.S.A., 54s)
- `toon-pequenos-picapiedra-tema` (cambiada)
  - antes: yt DJAp5DrYX_s
  - ahora: yt eaN7TYMV70Y «Los Pequeños Picapiedra Intro latino» (Soy Retro, 60s) · yt bvp6DlAKhmM «Los Pequeños Picapiedra - Intro» (T. C. Intros Latinos, 75s) · yt ozALyhvfsRk «THE FLINTSTONE KIDS (Opening Sequence)» (K.J. Norman, 66s)
- `toon-cachorro-scooby-doo-tema` (cambiada)
  - antes: yt 6Jj8sIcCsuU
  - ahora: yt OJ79j5n-dWY «Un Cachorro Llamado Scooby Doo - Intro Latino» (El Canal Retro, 62s) · yt ezq4yUD7WXo «Un Cachorro Llamado Scooby Doo 1988 (Español Latino)» (Generación Retro, 184s) · yt yVraEch7IhA «A Pup Named Scooby-Doo (Theme Song)» (platypusduck54, 62s)
- `toon-daniel-el-travieso-dic-tema` (cambiada)
  - antes: yt 0mxI4nDiIIc «Daniel El Travieso - Intro latino» (T. C. Intros Latinos, 70s)
  - ahora: yt K6omA3sFMyQ «Daniel El Travieso - Intro (Latino) HD» (CaricaturasDeAyer, 61s) · yt 0mxI4nDiIIc «Daniel El Travieso - Intro latino» (T. C. Intros Latinos, 70s) · yt LLdAVXOeNHk «Dennis The Menace Cartoon Theme Song/Intro [HQ - 1986]» (ArisGreek30, 62s)
- `toon-capitan-n-el-amo-del-juego-tema` (nueva)
  - ahora: yt ZLKhjYiwQEQ «Capitan N Opening 1» (PastTies, 77s) · yt GQbr7_CkgPA «Captain N: The Game Master Season 2 opening» (WordsmithVG, 31s) · yt qbJomK-v2Is «Captain N & The Videogame Masters» (neslink, 28s)
- `toon-godzilla-serie-animada-90s-tema` (cambiada)
  - antes: yt rirhQSAPDV8
  - ahora: yt 1b2CtgkwJQA «Godzilla: The Series (Opening)» (jigsaw332, 72s) · yt VkTQqUNLp64 «Godzilla:The Series Intro HD 720P» (NINE ART, 64s) · yt C8Vg9d7CaaY «Classic TV Theme: Godzilla, The Series (Full Stereo)» (David Gideon, 126s)
- `toon-cuatro-fantasticos-1994-tema` (cambiada)
  - antes: yt eLZyt2eKFO4
  - ahora: yt _wkvydrFAwQ «Los 4 Fantásticos - Intro en Español (Serie 1994)» (Ciber Cosmos, 61s) · yt JqdNhWLaEPI «Serie 90´s Los 4 Fantasticos Intro 1» (franco meza, 108s) · yt XggH5-vLlUQ «Fantastic Four Cartoon Intro» (MikeSchwartzWrites, 66s)
- `toon-superman-serie-animada-tema` (cambiada)
  - antes: yt WAQW_u9eiuU
  - ahora: yt SjS2TqzuzoY «Superman: The Animated Series | Intro | HBO Max» (HBO Max Latinoamérica, 62s) · yt Q7DQAjR7rgY «Superman: The Animated Series (Main Title)» (Shirley Walker - Topic, 66s) · yt cUYyKD10fEw «Superman The Animated Series 1996 Intro 4k» (Black Machine, 60s)
- `toon-beavis-y-butt-head-tema` (cambiada)
  - antes: yt tIDDZfRfN34
  - ahora: yt 3p2rWlCQ7cI «BEAVIS AND BUTT-HEAD - Main Theme  By Mike Judge | MTV» (Geek Music, 127s) · yt aWvd8ouoy3g «Mike Judge's Beavis and Butt-Head (2022) Intro» (fiumba2, 21s)
- `toon-el-zorro-1997-serie-tema` (nueva)
  - ahora: yt BlcfuwTASnU «Zorro 1997 La Serie Animada (Español Latino)» (Generación Retro, 61s) · yt uvK6SFlDkfQ «The New Adventures of Zorro 1997   Intro Opening» (Neal Hernandez, 58s)
- `toon-dinosaurios-extremos-tema` (nueva)
  - ahora: yt cQiJZJaw7qU «Extremodinos [Opening Latino].mp4» (oditel, 60s) · yt VI__EW_fPJs «Extreme Dinosaurs Intro HQ» (thomziq, 60s) · yt 4G-pv7P3aJU «Extreme Dinosaurs Full Intro Theme» (IntroKingOfMelody, 114s)
- `toon-fantasma-2040-tema` (nueva)
  - ahora: yt B-QaC0nHSMs «El fantasma 2040» (Actv Latino, 59s) · yt xPF4g4kC9a4 «Phantom 2040 Intro» (Dalton Barron, 62s) · yt r2HEvWUNzwQ «The Phantom.mov» (GeraldOBrienMusic, 59s)
- `toon-mighty-max-serie-tema` (nueva)
  - ahora: yt oaA-dMLG-1E «RESTORED Mighty Max Opening (Intro)» (Mighty Max Restoration Project, 57s) · yt tS_h8D1ZlLs «Mighty Max Intro» (SlayerMatt69, 70s)
- `toon-oggy-y-las-cucarachas-tema` (nueva)
  - ahora: yt 5jSU_VkSdKY «Oggy and the Cockroaches - Opening Credits - Season 4 (HD)» (Xilam Animation, 31s) · yt 5YImzqFQ2vU «The Mini-Golf War - Oggy and the Cockroaches Soundtrack OST» (Liem_Tran4, 36s)
- `toon-los-padrinos-magicos-los-padrinos-magicos-tema` (cambiada)
  - antes: yt kFjexH-badI · yt AN02Z35CJgk «Los Padrinos Mágicos - Intro HD Latino: (2001)» (Intro TV, 52s)
  - ahora: yt 8-GyMX9ynj0 «Intro Los Padrinos Mágicos [Nickelodeon Latam]» (TVMix y Caricaturas, 59s) · yt UNNwMc4OGBg «Intro Los Padrinos Mágicos - Versión NickToons (Latino PAL)» (Nomelas CN, 52s) · yt LZF8GErHgIk «Los padrinos magicos Intro (Español Latino) (Azteca 7 SD)» (Samsung Galaxy Tab A9+ 5G, 120s)
- `toon-peppa-pig-peppa-pig-theme` (cambiada)
  - antes: yt bwtTZVUmV94 «PEPPA LA CERDITA - INTRO (ESPAÑOL LATINO DISCOVERY KIDS)» (Peppa La Cerdita, 16s) · yt iUjKJzjGImw «Peppa Pig | intro | versión 3 | Discovery Kids» (TonyDK, 15s)
  - ahora: yt wulejb3mZK0 «Theme Music From Peppa Pig» (Peppa Pig - Topic, 39s)
- `toon-el-campamento-de-lazlo-el-campamento-de-lazlo-tema` (cambiada)
  - antes: yt UjixodxQX_U · yt va-i4lrvzBE
  - ahora: yt lUCAQfipGvE «El campamento de lazlo intro latino» (Magic y Cartoon del recuerdo, 36s) · yt M7VVJG6KFpk «camp lazlo intro latino» (promos escenas intros y mas, 47s) · yt Pan0F0y_OMs «Camp Lazlo Theme Song» (Scooby-Doo Fan, 38s)
- `toon-shuriken-school-tema` (cambiada)
  - antes: yt WTQ_bj6T14g «Shuriken School Y El Mago Serie Animada Intro Español Latino Crossover» (José Lau sanchez, 138s)
  - ahora: yt I6fEsMsgw8c «Shuriken School - Opening Credits - Season 1 (HD)» (Shuriken School, 45s) · yt jC4G22p6OhM «Shuriken School Theme & Credits» (CanadaToonFan, 79s)
- `toon-liga-de-la-justicia-ilimitada-tema` (cambiada)
  - antes: yt Q51kns5haj4
  - ahora: yt ufM59OOvPw0 «Liga De La Justicia Ilimitada Opening Español Latino (1080p HD)» (Demis Facundo Hereñú, 60s) · yt GTwzS8Uf8o0 «Liga de la Justicia Ilimitada Intro Opening Justice League Unlimited» (Ayumintro, 60s) · yt pesEIkgz5Ko «Justice League Unlimited Theme» (Michael McCuistion - Topic, 62s)
- `toon-the-batman-2004-tema` (cambiada)
  - antes: yt Fgz9cJScRik
  - ahora: yt p4qLo_-OS8M «THE BATMAN 2004 SERIES SEASON 1 INTRO HD» (Jack X, 61s) · yt dtKsB6lUXfU «U2 - Theme From 'The Batman' (Visualiser)» (U2VEVO, 103s) · yt it1AVeGS3dw «The Batman - Season 4-5 | Opening Theme (English) (HD)» (Ben10Petya, 60s)
- `toon-batman-el-valiente-tema` (cambiada)
  - antes: yt Fgz9cJScRik
  - ahora: yt uczM19x3aNM «Batman: The Brave and the Bold Theme» (Andy Sturmer - Topic, 32s) · yt 9g9r4TFTFyk «"Batman: The Brave and The Bold" Opening Titles» (The World's Finest, 31s)
- `toon-x-men-evolution-tema` (cambiada)
  - antes: yt YypzWfwOC3A
  - ahora: yt tYSpja6JBZo «X-Men Evolution Opening» (reconmeee, 51s) · yt jwXCV2ZB2iw «X-Men: Evolution - Season 3-4 | Opening Theme (English) (HD)» (Ben10Petya, 60s)
- `toon-wolverine-y-los-x-men-tema` (cambiada)
  - antes: yt YypzWfwOC3A
  - ahora: yt mVGIukft1Gs «Wolverine and the X-Men (Intro) [HD]» (DanChaotic1, 45s) · yt Tw8uoMfhIjo «Wolverine and the X-Men - Opening» (Gemma Jones, 74s) · yt 0f2RES_A49Q «Wolverine and the X Men Intro Theme» (Chris, 30s)
- `toon-spider-man-mtv-2003-tema` (cambiada)
  - antes: yt 2887MsT5Axw «Spiderman / Hombre Araña - Opening Latino (remasterizado)» (Bellower666, 61s)
  - ahora: yt 1g8l0Bbbij8 «Spider-Man TNAS Intro (1080p HD)» (SpiderSlim716, 31s) · yt RihN05tCwyo «Spider-Man TNAS Live Action Intro» (ArachnidoComics, 31s)
- `toon-static-shock-choque-estatico-tema` (cambiada)
  - antes: yt EeaGn0ON968
  - ahora: yt qDct-i8JZhc «Static Shock - Opening 1» (Static Shock Latino, 61s) · yt -oHskbJ9nEs «Static Shock - Opening 2» (Static Shock Latino, 60s) · yt 10AWeHE4X8M «Static Shock Opening» (stinnetnator, 61s)
- `toon-tutenstein-discovery-kids-tema` (cambiada)
  - antes: yt l8NX7FyrNfE
  - ahora: yt 2wmzRZzGRtc «Tutenstein: Theme Song» (Tutenstein - Official Channel, 67s)
- `toon-star-wars-clone-wars-2008-tema` (cambiada)
  - antes: yt SU4WjBo1O84
  - ahora: yt tacl5JYFb78 «Star Wars la Guerra de los Clones Intro español latino» (José Carlos, 80s) · yt iKZgzM8Ghns «Star Wars Main Title & A Galaxy Divided» (Kevin Kiner - Topic, 73s) · yt UxZRZsq-Aj4 «Star Wars The Clone Wars Main Title (Original) - Kevin Kiner» (Clone Gunner Commander Jedi, 22s)
- `toon-el-chavo-animado-tema` (nueva)
  - ahora: yt gFh3Xo3LpoQ «El Chavo Animado introducción completa.» (Veronica Bottaro, 71s) · yt UQT5HA2RjPI «El Chavo Animado Intro (Discovery Kids)» (FRAN!, 68s)
- `toon-dibo-el-dragon-de-los-deseos-tema` (nueva)
  - ahora: yt HWUfMvlQfH4 «Dibo: El Dragón de los Deseos (Intro) (Solo en Audio)» (The Fernando Dalmatian 206, 61s) · yt RvEDxs9QTNc «Dibo - cancion del regalo - canciones infantiles» (DibujosPekes, 72s) · yt tKAtNr-9NtU «Dibo the gift dragon official theme song opening» (Animation Music Hub, 61s)
- `toon-el-increible-mundo-de-gumball-the-amazing-world-of-gumb` (cambiada)
  - antes: yt jKxdMtEzrKs «El increíble mundo de Gumball | Intro en español | HBO Max» (HBO Max Latinoamérica, 19s) · yt X7PmWMQJTqU
  - ahora: yt eYuifjzBfFM «El Maravilloso mundo de Gumball creditos» (Bryan Escarate Salinas, 30s) · yt YfAgvE-XSz8 «The Amazing World Of Gumball Credits» (Fernando11101, 35s) · yt oK8jcNqc8Xw «The Amazing World Of Gumball Extended Intro Song!!!» (CLOVER!, 61s)
- `toon-un-show-mas-un-show-mas-entrada` (cambiada)
  - antes: yt J7z20AVaYto · yt mDLqrtIV0UI
  - ahora: yt mDLqrtIV0UI
- `toon-ultimate-spider-man-tema` (cambiada)
  - antes: yt 2887MsT5Axw «Spiderman / Hombre Araña - Opening Latino (remasterizado)» (Bellower666, 61s)
  - ahora: yt RmX11ysUu5M «The Ultimate Intro (Ultimate Spider-Man)» (Marvel Kids Archive, 60s)
- `toon-hulk-agentes-de-smash-tema` (cambiada)
  - antes: yt TDniH6eZtdc
  - ahora: yt fvjSpukiwzk «Promo de Hulk y los Agentes de S.M.A.S.H» (JonathanMassey, 30s) · yt Id9dVsZwg2E «HULK and the Agents of S M A S H  Intro (2013-2015)» (Οι Φύλακες της Νοσταλγίας, 30s)
- `toon-vengadores-unidos-tema` (cambiada)
  - antes: yt yYAK1xW4l1Y «Los Vengadores los Héroes Más Poderosos del Planeta: Opening Español Latino» (JonathanMassey, 63s)
  - ahora: yt wJGogU_082I «Los Vengadores Unidos de Marvel   Opening» (SecretSpyFull, 36s)
- `toon-star-wars-rebels-tema` (cambiada)
  - antes: yt SU4WjBo1O84
  - ahora: apple 1440629907 mx «Rebels Theme» (Kevin Kiner — Star Wars Rebels: Season One (Original Soundtrack)) · yt _kzU06rrIws «Rebels Theme» (Kevin Kiner - Topic, 56s) · yt Gjuux2b4wN4 «Star Wars Rebels Soundtack: Title Theme» (Rebel “Rebels Report” Report, 53s)
- `toon-thundercats-2011-tema` (cambiada)
  - antes: yt fQKEQz4as8U
  - ahora: yt 8OTJvFxY1CM «Thundercats 2011 Opening» (balgus82, 78s) · yt fe8hOF6Ly3o «My ThunderCats 2011 Intro HD» (Micke Johansson, 76s)
- `toon-linterna-verde-serie-animada-tema` (cambiada)
  - antes: yt _MfSBvh0Cdo
  - ahora: yt iMcyoP06tXw «Opening de Linterna Verde la Serie Animada» (Enter Series, 22s) · yt o-Xm4wNqMMM «GREEN LANTERN OST - Main Theme - Frederik Wiedmann» (chris banks, 36s) · yt Yv0D1fBgJDo «Green Lantern: The Animated Series (2012) Intro 4k Remaster» (The Animation Nation, 22s)
- `toon-cuidado-con-batman-tema` (cambiada)
  - antes: yt Fgz9cJScRik
  - ahora: yt gjS4E8-uUzU «Beware the Batman - Opening Credits» (IGN, 25s) · yt uTQ3CHBA9TA «Beware The Batman Intro 2013 720p HD» (CutSprings, 20s) · yt 3bzPVlBpqrA «Beware the Batman (Cuidado con Batman) Descarga El Primer Capitulo» (Milton Cesar, 87s)
- `toon-star-wars-resistencia-tema` (cambiada)
  - antes: yt SU4WjBo1O84
  - ahora: yt YSJNIeD8lNA «Star Wars Resistance Main Title - Michael Tavera» (Clone Gunner Commander Jedi, 81s) · yt o1FbdtsC9OA «Star Wars Resistance - Credits Music (HD)» (Jamie64, 36s)
- `toon-patoaventuras-2017-tema` (cambiada)
  - antes: yt Xzg2U6Sw79s
  - ahora: yt C9sZaB3SB0I «Patoaventuras (2017) | Intro (Tema de entrada) | Español Latinoamericano» (Tano Upload Canciones, 57s) · yt cWTbg07-XOw «DuckTales (2017) - Mexican Spanish Theme [Full]» (Leon Paradox, 130s) · yt greRWnaQWc4 «Felicia Barton - DuckTales (From "DuckTales"/Extended Version/Audio Only)» (DisneyMusicVEVO, 121s)
- `toon-muppet-babies-2018-tema` (cambiada)
  - antes: yt GJvcHymNNug
  - ahora: yt EqN_uisnzpU «🎶 La Canción de Muppet Babies» (Disney Jr. Latinoamérica, 59s) · yt Y91bLY6k_7o «Muppet Babies Theme 2018» (Renee Elise Goldsberry - Topic, 62s) · yt QX5Ju-x63AY «Muppet Babies Theme 2018 (From "Muppet Babies")» (Renee Elise Goldsberry - Topic, 63s)
- `toon-villanos-cartoon-network-tema` (cambiada)
  - antes: yt Q52_R7ono2w
  - ahora: yt rpvEAtm8hJE «🎩Enganchado | Villanos PILOTO ORIGINAL | 4K Latino | Time Machine 📼» (Time Machine 4K, 91s) · yt WQ09RSOjcNM «Villanos | Cartoon Network | Temporada Uno sneek peak - Alan Ituriel» (Vi Cherry, 28s) · yt vVQpKhl_ugE «Villainous ALL INTROS | Villanos» (Kako, 67s)

### js/catalog-anime.js

- `ani-cutie-honey-tema` (cambiada)
  - antes: yt T_OgBnrrbYM
  - ahora: apple 1886029868 mx «Cutie Honey» (Yoko Maekawa — Cutie Honey - Single) · yt jCX77Je16fk «Cutie Honey opening (1973)» (Tsuki Ginae, 90s)
- `ani-el-perro-de-flandes` (cambiada)
  - antes: yt tEQsSX7KqF8
  - ahora: yt aTfRMH1RvR0 «El perro de Flandes (Inicio español)» (TaranWanderer2, 64s) · yt PlZ8Qy_jDTA «El Perro de Flandes (Serie de TV)» (Sones de niños, 180s) · yt 6heXBqWCdZU «El Perro de Flandes | Flanders no inu | Serie 1975 | Intro España» (Las Series De Nuestra Vida, 74s)
- `ani-capitan-futuro-tema` (cambiada)
  - antes: yt wS0Eu1uG0HA
  - ahora: yt kL334m4a_j8 «Capitan Futuro - Opening Latino (Remasterizado - HD 1080p)» (Bellower666, 71s) · yt lfxr3KRGiAI «capitan memo capitan futuro cancion completa» (julio cesar soto andia, 209s)
- `ani-hokuto-no-ken-ai-wo-torimodose` (cambiada)
  - antes: yt pRFxpHSNxkA
  - ahora: yt Ks3WAHefLDk «Hokuto No Ken Jap Opening. You Wa Shock» (KENSHIRO2486, 124s) · apple 433591372 mx «Ai Wo Torimodose!!» (クリスタルキング — Anison No. 1)
- `ani-saint-seiya-soldier-dream` (cambiada)
  - antes: yt JU90SmiYeuw · apple 1443831881 mx
  - ahora: yt zaPh5P_Bd7w «Soldier Dream Español Latino Saint Seiya HD» (Robert Viviano Ordoñez, 82s) · yt rSK5gQVz9Hw «·MAUREN·「Soldier Dream ~Versión Full~ ★SAINT SEIYA OPENING 2★» (Anison Music, 218s)
- `ani-anpanman-march` (cambiada)
  - antes: yt D6xpDiCoAsg
  - ahora: yt 5mLape5F0Fw «アンパンマンのマーチ （テレビサイズver.）［公式オープニングテーマ］» (VAP OFFICIAL MUSIC CHANNEL, 70s) · yt fTz2Rycn5Yc «Past Anpanman No March OP Comparison» (Kendall Nguyen, 73s)
- `toon-dragon-ball-gt-mi-corazon-encantado` (cambiada)
  - antes: apple 1403477085 mx · yt wgZ-ATUGXDw «Dragon Ball GT Opening Latino Full HD 1080p Creditless [Mi Corazón Encantado]» (Sera Mun Doremi, 109s)
  - ahora: yt wgZ-ATUGXDw «Dragon Ball GT Opening Latino Full HD 1080p Creditless [Mi Corazón Encantado]» (Sera Mun Doremi, 109s) · yt dF4OwMSrnUQ «Dragon Ball GT - Mi Corazón Encantado - Broadcast Latino Remasterizado - TV Size - FLAC» (EL NOSTALGICO REMASTERIZADOR DE AUDIOS, 120s)
- `toon-yu-yu-hakusho-sonrisa-explosiva` (cambiada)
  - antes: yt RncCJNOZLb0 «Yu Yu Hakusho Opening Latino - HD» (LeonMaverick1998, 90s) · apple 433591403 mx
  - ahora: yt RncCJNOZLb0 t=15 «Yu Yu Hakusho Opening Latino - HD» (LeonMaverick1998, 90s) · apple 433591403 mx
- `ani-yu-gi-oh-kawaita-sakebi` (cambiada)
  - antes: yt timXx6CBjoA · apple 1443831903 mx
  - ahora: yt iQj61OQ1mFk «Yu-Gi-Oh! Op 0 (Kawaita Sakebi) 720p HD» (AnimeOPFreakHD, 70s) · yt jv3r7NKsLJ4 «Yu-Gi-Oh! Season 0 OP - Kawaita Sakebi (4K Remaster)» (4K ANIME PROJECT, 70s) · yt zh_beGMkfqU «Yu-Gi-Oh! Season 0 Opening Full - Kawaita Sakebi by The FIELD OF VIEW» (Sissie131, 250s)
- `ani-sailor-moon-r-otome-no-policy` (cambiada)
  - antes: yt 9NanowbK60Y · apple 1443831905 mx
  - ahora: yt ChRj7FagQ8U «Otome no Policy» (Yoko Ishida - Topic, 196s) · yt IlgJ0OtzYPY «Sailor Moon R - Otome no Policy Textless Ending HD» (Panteater, 90s) · yt J9WDMHHXP1I «Sailor Moon R - Otome no Policy Subtitled Ending HD» (Panteater, 90s)
- `ani-sailor-moon-sailor-star-song` (cambiada)
  - antes: yt 8MD9HYC2d_I · apple 1443831907 mx
  - ahora: yt UlkN58iORYE «Sailormoon Sailor Stars Opening» (cardcaptorzlove, 96s) · yt zk260b4pg8s «Sailor Moon Sailor Stars OST - Sailor Stars Theme (Full)» (Sailor Neptune, 232s) · yt gouuowD8P0o «Sailor Star Song» (Release - Topic, 234s)
- `ani-digimon-adventure-02-target` (cambiada)
  - antes: yt WmGy9CAap0w · apple 1443831910 mx
  - ahora: yt GaD6f293CJ4 «Digimon 02 Opening Latino Full HD 1080p Creditless [Impacto Rojo]» (Sera Mun Doremi, 90s) · yt JjzOENA8N3c «Digimon 02 Opening v2 Español Laitno (Audio Remasterizado)» (JonathanMassey, 90s) · yt CDRMMG1WWlM «Digimon Adventure 02 - Opening Latino - Letra - Versión Completa - Impacto Rojo - Ricardo Silva» (YamakiSongs, 266s)
- `ani-slayers-get-along` (cambiada)
  - antes: yt YuwuE8vgYok
  - ahora: yt C9oo-ZPB5oI «Slayers Opening 1995 HD 1080 (AI Upscale)» (imangos, 97s) · yt C4M5i1u6LUQ «Get along» (Megumi Hayashibara - Topic, 247s) · yt 7cq4BhxEOUs «The Slayers Opening 1 Get Along» (El tío Hikigaya 2.0, 242s)
- `ani-slayers-next-give-a-reason` (cambiada)
  - antes: yt ITyheBukJqI
  - ahora: yt 5R9ZaIGgNnc «Slayers NEXT Opening 1996 HD 1080 (AI Upscale)» (imangos, 91s) · yt q1l-oY3hMng «Give a reason» (Megumi Hayashibara - Topic, 267s) · yt u_7vGJ1pqvU «Slayer Next Op Give a reason Megumi Hayashibara» (El tío Hikigaya 0, 259s)
- `ani-digimon-adventure-butter-fly` (cambiada)
  - antes: yt WmGy9CAap0w · apple 1443831959 mx
  - ahora: yt jB7ecG_12x8 «Digimon Japanese Opening Theme- Butterfly (HD)» (Tys[Frv], 96s) · yt 0SMfWmEf8Wo «Koji Wada - Butter-Fly (Original version, High quality)» (paigib, 258s) · yt S4L399kgd1I «[Digimon] Butterfly» (Wizardwomon, 256s)
- `ani-blue-seed-carnival-babel` (cambiada)
  - antes: yt hwQVtycXyZw
  - ahora: yt NArssqBPTvE «CARNIVAL・BABEL ～カルナバル・バベル～» (- Topic, 217s) · yt kqPxlbAseho «Blue Seed opening Full» (Иван Коробков, 212s) · yt ykbcsmjbUiQ «CARNIVAL･BABEL ／TAKADA BAND【OnVocal】» (catbrother, 215s)
- `ani-yu-yu-hakusho-hohoemi-no-bakudan` (cambiada)
  - antes: yt RncCJNOZLb0 «Yu Yu Hakusho Opening Latino - HD» (LeonMaverick1998, 90s) · apple 433591403 mx
  - ahora: yt urZWmEgm72Q «Yu Yu Hakusho - Opening 1 | Hohoemi no Bakudan» (Crunchyroll, 97s) · yt XkIAyMFeuAU «Yu Yu Hakusho ; OP | Hohoemi No Bakudan | Sub. Español & Romaji. (AMV)» (valenka୨ৎ, 256s) · apple 433591403 mx
- `ani-trigun-ht` (nueva)
  - ahora: yt NPDWuip1k5o «H.T» (Tsuneo Imahori - Topic, 91s) · yt 4OxFSy8G5wk «Trigun - Opening HD» (Redthundereign, 90s) · apple 969897525 mx «H.T» (Dr.Donuts — Trigun the First Donuts (Original Soundtrack))
- `toon-inuyasha-change-the-world` (cambiada) — composer: "V6" → "Gabriela Vega (versión latina)"
  - antes: apple 1848248144 mx
  - ahora: yt suU86VJt5a0 «InuYasha Opening 1 latino El Mundo He De Cambiar» (Lucy de Park, 97s) · yt PxQ9RdKxclQ «"El mundo he de cambiar". AMV Inuyasha Opening 1. Español latino |Full version|.» (Tecna na na, 292s) · apple 1848248144 mx
- `ani-naruto-shippuden-hotaru-no-hikari` (cambiada)
  - antes: yt 2upuBiEiXDk · apple 1089186525 mx
  - ahora: yt BnxVkEivFXI «Naruto shippuden Op/  Opening  5 [4K 60 FSP]» (NakiriSaku ,, 93s) · yt IqKqNcW2-b4 «いきものがかり 『ホタルノヒカリ』Music Video» (いきものがかり, 250s) · apple 1089186525 mx
- `ani-code-geass-r2-o2` (cambiada)
  - antes: yt G8CFuZ9MseQ
  - ahora: apple 1537396552 mx «O2» (Orange Range — O2 - Single) · yt HgGcePdMsDY «アニメ「コードギアス 反逆のルルーシュR2」オープニング／ORANGE RANGE「O2」» (コードギアスチャンネル CODEGEASS Channel, 90s) · yt n-3SrDQiFU4 «ORANGE RANGE『O2』MV» (ORANGE RANGE, 263s)
- `ani-katekyo-hitman-reborn-boys-and-girls` (cambiada)
  - antes: yt 7jfdgD-aW4A
  - ahora: apple 278108067 mx «BOYS & GIRLS» (LM.C — OPENING&ENDING THEME SONGS) · yt 2T9-VHpkj_I «TVアニメ『家庭教師ヒットマンREBORN!』ノンクレジット映像 標的27-51｜オープニングテーマ「BOYS & GIRLS」LM.C» (『家庭教師ヒットマンREBORN!』アニメ公式, 90s) · yt hk7lp9IvkN0 «BOYS & GIRLS» (LoveKirbyAndGTR4, 248s)
- `ani-inuyasha-i-am` (nueva)
  - ahora: apple 1599256440 mx «I am» (hitomi — 犬夜叉 BEST ALBUM 主題歌集) · apple 1258423705 mx «I am» (hitomi — SELF PORTRAIT) · yt ZW5KZV0ALIM «I am» (hitomi - Topic, 285s) · yt NysOOSNS83o «Inuyasha - Op. 2 "I am" by Hitomi» (Zsolti Kun, 95s)
- `ani-katekyo-hitman-reborn-88` (nueva)
  - ahora: apple 280625539 mx «88» (LM.C — 88 - Single) · apple 326548345 mx «88» (LM.C — 家庭教師ヒットマンREBORN! KATEKYO HITMAN REBORN! OPENING&ENDING THEME SONGS2) · yt iKBDC9KSTpU «TVアニメ『家庭教師ヒットマンREBORN!』ノンクレジット映像 標的74-101｜オープニングテーマ「88」LM.C» (『家庭教師ヒットマンREBORN!』アニメ公式, 90s) · yt 0RGRl8olQHc «LM.C - 88  / Music Video (HD ver.)» (LM.C Official, 240s)
- `ani-aot-jiyuu-no-tsubasa` (cambiada)
  - antes: yt 8OkpRK2_gVs · apple 1529543138 mx
  - ahora: apple 666788984 mx «自由の翼» (Linked Horizon — 自由への進撃 - Single) · yt PbWFpzi8C94 «Attack on Titan Opening 2 | Jiyuu no Tsubasa by Linked Horizon» (Crunchyroll, 89s) · yt iA7c314_SWM «Shingeki no Kyojin Opening 2 Full ver. Jiyuu no Tsubasa (please read description)» (CondeMauro, 329s)
- `ani-aot-shinzou-wo-sasageyo` (cambiada)
  - antes: yt StLX4kITjWU · apple 1529543140 mx
  - ahora: apple 1219237974 mx «Shinzo wo Sasageyo! (TV Size)» (Linked Horizon — Shinzo wo Sasageyo! (TV Size) - Single) · apple 1229977150 mx «心臓を捧げよ!» (Linked Horizon — 進撃の軌跡) · yt LKP-vZvjbh8 «Attack on Titan Season 2 Opening | Shinzou wo Sasageyo!» (Crunchyroll, 89s) · yt CID-sYQNCew «Attack on Titan Season 2 - Official Opening Song - Shinzou wo Sasageyo by Linked Horizon» (animelab, 90s)
- `ani-aot-red-swan` (cambiada)
  - antes: yt 8OkpRK2_gVs · apple 1529543142 mx
  - ahora: apple 1414197395 mx «Red Swan - TV Edit - (feat. HYDE)» (YOSHIKI — Red Swan - TV Edit - (feat. HYDE) - Single) · apple 1436825394 mx «Red Swan (feat. HYDE)» (YOSHIKI — Red Swan (feat. HYDE) - Single) · yt r1XE8ON8fos «"Red Swan" (Attack on Titan anime theme) - 進撃の巨人 Official Lyric Video YOSHIKI feat. HYDE» (Yoshiki, 269s) · yt MWSR17vEVBw «▶ Attack on Titan / Shingeki no Kyojin Season 3 OP •「Red Swan」 YOSHIKI feat. HYDE ᴴᴰ» (Zed Astaroth, 90s)
- `ani-aot-shoukei-to-shikabane-no-michi` (cambiada)
  - antes: yt StLX4kITjWU · apple 1529543144 mx
  - ahora: apple 1459973237 mx «憧憬と屍の道 [TV Size]» (Linked Horizon — 憧憬と屍の道 [TV Size] - Single) · yt czJHHta2vz8 «憧憬と屍の道» (Linked Horizon - Topic, 276s) · yt 0dK7JgKivQM «Shingeki no kyojin opening 5 『Shoukei to Shikabane no Michi』 Linked Horizon [1080p]» (Towzeur, 90s)
- `ani-mha-peace-sign` (cambiada)
  - antes: yt yu0HjPzFYnY · apple 1653922190 mx
  - ahora: apple 1537458310 mx «ピースサイン - Peace Sign» (Kenshi Yonezu — ピースサイン - Peace Sign - EP) · yt Q7w5IMyJ3pM «My Hero Academia Season 2 Opening 1 | Peace Sign» (Crunchyroll, 100s) · yt 9aJVr5tTTWk «米津玄師 - ピースサイン , Kenshi Yonezu - Peace Sign» (Kenshi Yonezu  米津玄師, 264s)
- `ani-mha-sora-ni-utaeba` (cambiada)
  - antes: yt yu0HjPzFYnY · apple 1537418118 mx
  - ahora: yt 2ieT6Vh7jZE «My Hero Academia Season 2 Opening 2 | Sora ni Utaeba» (Crunchyroll, 100s) · yt eYxXpqdWkhY «Boku no Hero Academia season 2 Opening 2 Full || Sora ni Utaeba - Amazarashi || AMV sub español» (Johan-1454, 254s) · yt yiVbEZ7Da74 «Boku no Hero Academia Opening 3 Full | "Sora ni Utaeba" + Lyrics» (Shimazu, 216s)
- `ani-mha-odd-future` (cambiada)
  - antes: yt yu0HjPzFYnY · apple 1537381415 mx
  - ahora: apple 1410776543 mx «Odd Future» (UVERworld — Odd Future - Single) · yt iBRH9Po3gw8 «My Hero Academia Opening 4 | ODD FUTURE by UVERworld» (Crunchyroll, 100s) · yt 0zLxFAlS29A «UVERworld 『ODD FUTURE』» (UVERworld Official YouTube Channel, 230s)
- `ani-mha-polaris` (cambiada)
  - antes: yt yu0HjPzFYnY · apple 1537418120 mx
  - ahora: apple 1502966127 mx «Polaris» (BLUE ENCOUNT — POLARIS (World Edition) - EP) · yt 6OJxjAefwXc «My Hero Academia Opening 6 | Polaris by Blue Encount» (Crunchyroll, 100s) · yt Isb7Q4jEA04 «BLUE ENCOUNT 『ポラリス』Music Video【アニメ『僕のヒーローアカデミア』第4期オープニングテーマ】» (BLUE ENCOUNT Official YouTube Channel, 224s)
- `ani-jujutsu-kaisen-vivid-vice` (cambiada)
  - antes: yt GwaRztMaoY0 · apple 1543126650 mx
  - ahora: apple 1546061848 mx «VIVID VICE» (Who-ya Extended — VIVID VICE - EP) · yt LFTE4W--Htk «JUJUTSU KAISEN Opening 2 | Vivid Vice» (Crunchyroll, 100s) · yt EU6I8TxU6Z4 «Who-ya Extended 「VIVID VICE」 MUSIC VIDEO TVアニメ『呪術廻戦』OPテーマ» (Who-ya Extended official YouTube channel, 200s)
- `ani-jujutsu-kaisen-ao-no-sumika` (cambiada)
  - antes: yt GwaRztMaoY0 · apple 1694294652 mx
  - ahora: yt gcgKUcJKxIs «TVアニメ『呪術廻戦』第2期「懐玉・玉折」ノンクレジットOPムービー／OPテーマ：キタニタツヤ「青のすみか」｜毎週木曜夜11時56分～MBS/TBS系列全国28局にて放送中!!» (TOHO animation チャンネル, 90s) · yt zuoVd2QNxJo «青のすみか / キタニタツヤ - Where Our Blue Is / Tatsuya Kitani» (キタニタツヤ / Tatsuya Kitani, 201s) · apple 1694294652 mx
- `ani-mob-psycho-100-iii-1` (cambiada)
  - antes: yt Bw-5Lka7gPE
  - ahora: yt umqzznKblJ0 «Mob Psycho 100 III Opening 3 | 1 by Mob Choir» (Crunchyroll, 100s) · yt PB4VaN_qV3Q «1» (MOB CHOIR - Topic, 230s) · yt xRIOnDruOZM «Mob Psycho 100 Season 3 - Opening Full『1』by MOB CHOIR» (AniMelody – Anime Music, 264s)
- `ani-ranking-of-kings-boy` (nueva)
  - ahora: apple 1588362375 mx «BOY» (King Gnu — BOY - Single) · apple 1716523690 mx «BOY» (King Gnu — THE GREATEST UNKNOWN) · yt s5SSAXK6bQE «Ranking of Kings - Opening Theme - BOY» (Crunchyroll, 110s) · yt PN7b30letP4 «Ranking of Kings - Opening 1 | BOY» (Crunchyroll FR, 90s)
- `ani-ranking-of-kings-naked-hero` (nueva)
  - ahora: apple 1600223385 mx «裸の勇者» (Vaundy — 裸の勇者 - EP) · apple 1714599986 mx «裸の勇者» (Vaundy — replica) · yt dWZAH5w8jkQ «Ranking of Kings Opening 2 | Naked Hero by Vaundy» (Crunchyroll, 100s) · yt FT0GKCuSaW0 «裸の勇者 / Vaundy：MUSIC VIDEO» (Vaundy, 201s)

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

## 5. Fase 3: Pistas agregadas por categoría (progreso actual)

| Tema | Categoría | Antes | Meta (+20 %) | Agregadas | Total actual | Estado |
|---|---|---:|---:|---:|---:|---|
| **Series** | `tv-clasicas` | 28 | +6 | +6 | **34** | ✅ Completado |
| **Series** | `tv-90s` | 23 | +12 | +12 | **35** | ✅ Completado |
| **Series** | `tv-00s` | 31 | +18 | +18 | **49** | ✅ Completado |
| **Series** | `tv-10s` | 29 | +20 | +20 | **49** | ✅ Completado |
| **Series** | `tv-20s` | 11 | +14 | +14 | **25** | ✅ Completado |
| **Series (Total)** | — | **122** | **+70** | **+70** | **192** | ✅ **Meta lograda (192)** |
| **Disney** | `dis-clasica` | 13 | +5 | +5 | **18** | ✅ Completado |
| **Disney** | `dis-renacimiento` | 19 | +4 | +4 | **23** | ✅ Completado |
| **Disney** | `dis-2000s` | 15 | +3 | +3 | **18** | ✅ Completado |
| **Disney** | `dis-2010s` | 16 | +4 | +4 | **20** | ✅ Completado |
| **Disney** | `dis-2020s` | 8 | +5 | +5 | **13** | ✅ Completado |
| **Disney (Total)** | — | **71** | **+21** | **+21** | **92** | ✅ **Meta lograda (92)** |
| **Musicales** | `mus-clasicos` | 56 | +12 | +12 (3 `es`) | **68** | ✅ Completado |
| **Musicales** | `mus-7080` | 61 | +13 | +13 | **74** | ✅ Completado |
| **Musicales** | `mus-9000` | 52 | +11 | +11 (2 `es`) | **63** | ✅ Completado |
| **Musicales** | `mus-10s` | 53 | +11 | +11 (3 `es`) | **64** | ✅ Completado |
| **Musicales (Total)** | — | **222** | **+47** | **+47** | **269** | ✅ **Meta lograda (269: 239 orig / 30 es)** |

## 6. Pendiente por aplicar (resto de Fase 3 y Fase 4)

- **Fase 3 (Expansión +20 % por categoría):**
  - Caricaturas: +54 adicionales (+11 ya recuperadas en Fase 2 = +65 total; meta final: 361 pistas).
  - Anime: +47 adicionales (+5 ya recuperadas en Fase 2 = +52 total; meta final: 303 pistas).
  - Videojuegos: +61 pistas nuevas (meta final: 342 pistas).
  - Sagas (`SAGA_TRACKS`): +37 pistas nuevas, completando primero los 13 juegos con menos de 5 pistas (meta final: 221 pistas).
- **Fase 4:** Revisión de dudosas restantes (`scripts/audit-red-revisadas.json`), verificación en navegador (`scripts/verificar-v2.1/`) y subida de versión a 2.1.
