---
title: Maak van je toetsenbord een vriend in plaats van een vijand
description: De indeling van onze huidige toetsenbordenstandaard komt uit 1867. Het is geoptimaliseerd voor de beperkingen van een eeuwenoude typemachine en niet in het voordeel van ons mensen. Dat kan veranderen.
socialPreview: Je toetsenbord komt uit 1867, niet normaal. Doe eens wat aan je keymap en toetsenbord.
tags:
  - keymap
  - keyboard
  - qmk
  - ergonomie
date: 2023-05-10T12:05
---

![Overview van mijn keymap](/images/blog/keymap/keymap-overview.jpg)

Hallo ouwe toetsenbordtijger! Ik ben hier om je te vertellen dat je toetsenbord niet echt je vriend is. Integendeel, het zit je vaak in de weg. Op het gebied van productiviteit en ergonomie is het toetsenbord blijven steken in 1867.

Alle beperkingen van de originele typemachine zitten nog steeds in ons moderne toetsenbord. Hoe bijvoorbeeld de kolommen niet recht onder elkaar staan en de hoeveelheid aan toetsen die er beschikbaar zijn op onbereikbare plekken.

Maar hier is wat aan te doen. Neem controle over je keymap! Want een goede keymap kan het verschil betekenen tussen je gewrichten slopen door alle vingeryoga die je op een werkdag doet en gezonde handen en polsen als je straks 60 bent.

En heel eerlijk: je zal op dit gebied de grootste stap kunnen zetten met, naast een voor jou nuttige keymap, een nieuw ergonomisch toetsenbord. Maar over de hardware-kant later meer in een andere post.

## Wat is een keymap?

Een keymap is de vertaling die je fysieke toetsenbord maakt van de ingedrukte toets naar datgene wat die ingedrukte toets moet doen. De keymap staat geprogrammeerd in je toetsenbord zodat je toetsenbord de juiste dingen communiceert over de ingedrukte toetsen naar de computer.

Je drukt bijvoorbeeld de knop in van de `A` en je krijgt op je computer de letter `a` te zien. En je ziet al, op je toetsenbord staat de hoofdletter `A`, maar je computer maakt daar de kleine letter `a` van, omdat je de `shift` er niet bij indrukt. Vinden we heel logisch, maar de keymap is dus niet automatisch datgene wat er op je toetsen staat afgedrukt.

![gif van kleine letter en hoofdletter A](/images/blog/keymap/typing-a.gif)

Een keymap zorgt er ook voor dat toetsencombinaties goed worden afgehandeld zodat het indrukken van de `shift` in combinatie met de `A` juist wel de hoofdletter `A` op je scherm tovert.

## Waarom zou je je keymap willen aanpassen?

Twee redenen: productiviteit en ergonomie. Je kunt je leven wat makkelijker maken door bepaalde toetsencombinaties die je vaak op een dag uitvoerd te vereenvoudigen en slecht bereikbare toetsen beter binnen bereik te maken. Dit is natuurlijk hartstikke persoonlijk en zal zelfs per taal en soort werk verschillen.

Op je huidige toetsenbord kun je waarschijnlijk vooral op productiviteit winnen, voor een flinke ergonomische stap zul je ook een ander toetsenbord nodig hebben.

## Hoe pas je een keymap aan?

Het gros van de toetsenborden hebben een keymap waar je niks aan kan veranderen. Het zit voorgeprogrammeerd op je toetsenbord en de meeste mensen realiseren zich niet eens dat het aanpassen van een keymap überhaupt een ding is.

Het wordt een ander verhaal als je een eigen toetsenbord gaat maken of een toetsenbord koopt die de mogelijkheid heeft om je keymap aan te passen (zoals de meeste nieuwe [Keychron toetsenborden](https://www.keychron.com/products) bijvoorbeeld). Dan is er [de software QMK](https://qmk.fm/) waar je mee aan de slag kunt. Mocht je niet de scriptkant van een keymap in willen duiken, dan is er ook [VIA](https://www.caniusevia.com/) die bepaalde features van QMK ontsluit via een online UI.

![Screenshot van VIA software](/images/blog/keymap/via.jpg)

Er zijn heel wat communities die elkaar ermee helpen en waarbij ook keymaps worden gedeeld. Kijk bijvoorbeeld eens op de Reddits [ErgoMechBoards](https://www.reddit.com/r/ErgoMechKeyboards/) en [OLKB](https://www.reddit.com/r/olkb/) of de Discords van [SplitKB](https://splitkb.com/) en [KeebSupply](https://keeb.supply/).

## Zonder speciaal toetsenbord aan de slag

Je kunt al veel bereiken door speciale software op je computer te installeren om als een soort tussenpersoon te dienen tussen je keyboard en je computer. Op deze manier verander je niks aan je toetsenbord (je kunt dus je huidige toetsenbord blijven gebruiken), maar wel aan de manier waarop toetsen worden geïnterpreteerd door je computer.

Op de Mac is er bijvoorbeeld [de app Karabiner Elements](https://karabiner-elements.pqrs.org/) die je hiermee kan helpen. Het is niet zo krachtig als een keymap in de firmware van een toetsenbord, maar voor wat nuttige hacks kom je een heel eind. Ook hier is een community misschien handig om te raadplegen: [Karabiner Elements Reddit](https://www.reddit.com/r/Karabiner/)

## Wat kun je dan zoal met een eigen keymap?

De mogelijkheden zijn eindeloos, maar hier een paar zaken die je productiviteit en ergonomie zelfs op een on-ergonomisch toetsenbord zullen verbeteren.

### Tap en hold

Toetsen kunnen met een 'tap' iets anders doen dan met een 'hold', dus het ingedrukt houden van de toets. Op je huidige toetsenbord zitten specifieke toetsen die alleen iets doen als je ze ingedrukt houdt, zoals bijvoorbeeld de `alt` of de `shift`. Een veel gemaakte eerste aanpassing is het veranderen van de linker en rechter `shift` zodat het bij een hold gewoon de `shift` is, maar bij een tap links de `(` en rechts de `)`.

En andere veelgebruikte toepassing hierbij is de `capslock` die iedereen altijd in de weg zit. Maak er een HYPER-toets van bij hold (`ctrl-alt-shift-cmd` tegelijk) en bij een tap de `esc` toets. Nu kun je zelf sneltoetsen op je computer inregelen die gebruik maken van deze HYPER-toets. Ik ga hier later weleens wat meer over vertellen, want de HYPER-toets is een eigen post waard.

Wat ook handig voor jouw situatie zou kunnen zijn is het aanpassen van het ingedrukt houden van de `Q` naar `CMD-Q`. Zo hoef je enkel nog maar de Q ingedrukt te houden om een applicatie af te sluiten.

Dit is het script om dit voor elkaar te krijgen in Karabiner Elements:

![Script om de werking van een ingedrukte q toets te veranderen](/images/blog/keymap/q-to-quit.png)

Misschien komen de creatieve sappen nu bij je naar boven om hold-acties op andere toetsen te bedenken. Zo zou je bijv. een veel gebruikte applicatie kunnen lanceren door de spatietoets ingedrukt te houden of het indrukken van de `.` te laten resulteren in het `…` karakter.

### Hoofdletters zonder vingeryoga

Je kunt je toetsenbord zo inregelen dat een lange tap op een karakter, dus even langer ingedrukt houden dan je gewend bent, de `shift` variant van het karakter oplevert. Dit is een standaard feature van QMK en heet [Auto Shift](https://docs.qmk.fm/#/feature_auto_shift) en ook met Karabiner Elements is dit in te regelen.

Zo hoef je geen vingeryoga te beoefenen met de niet-ergonomisch geplaatste `shift` en bewegen je vingers minder over het toetsenbord. Dit zal je toekomstige 60-jarige zelf echt heel fijn vinden.

### Combos

Om nog minder te hoeven bewegen over je toetsenbord kan het fijn zijn om bepaalde toetsen die je veel gebruikt, maar waarbij je onergonomische acties met je vingers moet ondernemen, dichterbij te brengen zonder iets van je lettertoetsen te hoeven opgeven. Door twee toetsen tegelijk in te drukken kun je een actie uitvoeren.

Zo heb ik de `,` en de `.` samen tot de `enter` gemaakt en de `x` en de `c` de `tab`. Want die gebruik ik regelmatig, maar de toetsen zitten veel te ver weg van je pinken om fijn te kunnen aantappen.

Een [voorbeeld van de Karabiner website](https://karabiner-elements.pqrs.org/docs/json/typical-complex-modifications-examples/) is het simultaan indrukken van de `=` en de `backspace` om zo de `delete` knop te krijgen.

![Script om van de = en de backspace een deleteknop te maken](/images/blog/keymap/equals-delete.png)

### Layers

Layers veranderen je toetsen in andere karakters over de hele linie. Stiekem gebruik je al layers op je toetsenbord (met `shift` ga je naar een andere layer) en ook op je telefoon. Zo zorgt deze knop er op iOS voor dat je omschakelt van de basis-layer naar de nummers-layer.

![Knop om naar nummers te gaan op iPhone-toetsenbord](/images/blog/keymap/keymap-iphone-example.jpg)

Dit maakt het mogelijk om allerlei toetsen weg te strippen van je toetsenbord. Het zou echt idioot zijn als je een toetsenbord zou gebruiken waarin de kleine letters en de hoofdletters allemaal een eigen toets hadden.

### Persoonlijke aanpassingen

Er zijn mensen die zweren bij een compleet andere indeling van de letters op een toetsenbord. Zo zijn er Dvorak-, Coleman- en Workman-indelingen bijvoorbeeld. Ik heb nog niet de tijd en behoefte gehad om me daar volledig in te storten, maar ik heb wel een kleine wijziging gedaan aan mijn qwerty-indeling. Ik heb de `p` omgewisseld met de `;`. De `p` gebruik ik véél vaker dan de `;` dus ergonomisch een enorme win voor mijn rechterpink, die sowieso al dat getype niet zo fijn vind.

### Nog veel meer mogelijkheden

- Ik heb een toets waarmee ik de huidige selectie ‘opzuig’ en met een tap weer uitspuug. Alsof het een stempel is. Hold is dus `cmd-c` en tap is `cmd-v`.
- Ik heb _one shot modifiers_ ingesteld waardoor ik op `shift` kan tappen zonder ‘m vast te houden en dan zal de volgende toetsaanslag (bijvoorbeeld de `Z`) reageren alsof ook de `shift` toets erbij werd ingedrukt. Nog minder vingeryoga hierdoor.
- Ik heb een toets die in een keer `cmd-shift-5` voor me indrukt. Dit is de shortcut om een professioneel screenshot te maken met [Cleanshot X](https://cleanshot.com/).

## Maar Reinier, waarom ben je hier zo druk mee?

Ten eerste omdat ik graag aan het nerden ben met productiviteit. Sinds ik de kracht van het aanpassen van de capslock naar een hypertoets heb ondervonden, wilde ik meer. Daarnaast kreeg ik twee jaar geleden ineens wat last van mijn rechter pols. Niet zoveel dat werken ineens niet meer kon, maar wel zo'n zeurend gevoel dat ik het in de gaten moest houden. Ik verbeterde mijn werkhouding, kocht een nieuw toetsenbord en muis en de pijn werd minder en minder. Nu wil ik niet meer dat die pijn terugkomt of dat ik ooit last van RSI ga hebben, want ben ik teveel afhankelijk voor werk en levensplezier van mijn toetsenbord.

## Mijn keymap

Om te beginnen heb ik twee keyboards waar praktisch maar 34 toetsen op zitten. Zo is elke toets op een ergonomische manier binnen vingerbereik.

De toetsenborden zijn ook nog eens ortholineair wat wil zeggen dat de toetsen in een strak grid op het toetsenbord zitten. Veel fijner dan de standaard waarbij de rijen schuin onder elkaar zitten.

Sowieso is het huidige keyboard-ontwerp dat je overal tegenkomt gebaseerd op de technische beperkingen van een typemachine van zo'n 150 jaar geleden, daar kom ik misschien op een andere keer op terug. Want het is natuurlijk waanzin dat we nog steeds beperkt worden door die beperkingen.

Dit is bijvoorbeeld mijn toetsenbord voor als ik op pad ben: de [Boardsource Technik](https://boardsource.xyz/store/5ffb9b01edd0447f8023fdb2).

![Mijn technik keyboard met 34 toetsen](/images/blog/keymap/technik.jpg)

Mijn keymap staat ook openbaar in Github zodat andere van de code kunnen leren of zelf verbeteringen kunnen aandragen. Neem gerust eens een kijkje in [de repository reinier/dotfiles](https://github.com/reinier/dotfiles)

### Base layer

![De base layer van mijn keymap](/images/blog/keymap/base.png)

### Symbols

![De symbols layer van mijn keymap](/images/blog/keymap/symbols.png)

### Numbers

![De nummers layer van mijn keymap](/images/blog/keymap/numbers.png)

### Extend

![De extended layer van mijn keymap](/images/blog/keymap/extend.png)

Het kan zijn dat op het moment dat je dit leest mijn keymap alweer een beetje is aangepast. Want na een bepaalde periode merk ik weleens dat ik sommige acties vaker uitvoer dan andere en dat mijn handen daar op een bepaalde manier op reageren. Dan ga ik kijken wat ik efficiënter kan maken aan mijn keymap om zo de last van mijn handen nog verder te verlichten.

## En nu?

Wil je ook de stap maken naar een eigen keymap of een ergonomischer toetsenbord kopen? Kijk dan eens naar kant en klare oplossingen zoals de [ZSA Moonlander](https://www.zsa.io/moonlander/), de [ZSA Planck](https://www.zsa.io/planck) of een keyboard van [Keychron](https://www.keychron.com/products/keychron-q4-qmk-via-custom-mechanical-keyboard). En lurk ook eens een tijdje mee op [ErgoMechBoards](https://www.reddit.com/r/ErgoMechKeyboards/) en kijk eens wat filmpjes van [Ben Vallack die een flinke toetsenbordtocht heeft gemaakt](https://www.youtube.com/shorts/X0gTMRLRNp0) om uiteindelijk op maar 18 toetsen uit te komen (dat gaat me wat te ver, maar wel enorm interessant).

Het inregelen van de HYPER-toets met Karabiner was mijn gateway drug naar het nog meer optimaliseren van mijn toetsenbord. Johannes Holmberg zet in de post [Setting up a hyper key](https://holmberg.io/hyper-key/) in vier simpele stappen uiteen hoe je op je Mac een HYPER-toets kan inregelen op je bestaande keyboard.
