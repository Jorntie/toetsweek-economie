// Hoofdstuk 5 Arbeid (Economie 5 havo, Cumulus): 5.1 Vraag en aanbod, 5.2 Werkloosheid, 5.3 Pensioen.
// Eigen oefenstof. Begrippen volgen de openbare begrippenlijst van Cumulus; de uitleg is in eigen woorden.
// Alle getallen in de opgaven zijn verzonnen.
(function () {
  "use strict";
  const eur = (x, d) => "€ " + TW.nl(x, d);

  TW.hoofdstuk({
    id: "h5", nr: "Hoofdstuk 5", titel: "Arbeid", icoon: "👷",
    intro: "Hoe komt het loon tot stand, waarom zijn er werklozen terwijl er vacatures zijn, en wie betaalt straks jouw pensioen?",
    onderdelen: [
      // ------------------------------------------------------------------
      // 5.1 Vraag en aanbod
      // ------------------------------------------------------------------
      {
        id: "a5-1", nr: "5.1", titel: "Vraag en aanbod",
        kern: [
          "Op de arbeidsmarkt bieden werknemers arbeid aan en vragen werkgevers arbeid. Het [[aanbod van arbeid]] is de [[beroepsbevolking]]: iedereen van 15 tot 75 jaar die betaald werk heeft, of geen werk heeft maar recent heeft gezocht en direct beschikbaar is.",
          { fig: "bevolking", bij: "Van de totale bevolking naar de werkzame en de werkloze beroepsbevolking." },
          "De [[vraag naar arbeid]] = [[werkgelegenheid]] + [[vacatures]]. De werkgelegenheid is de vervulde vraag (gelijk aan de werkzame beroepsbevolking), vacatures zijn de onvervulde vraag.",
          { formule: "participatiegraad = beroepsbevolking / beroepsgeschikte bevolking × 100%" },
          { widget: "wietelt" },
          "Arbeid meet je vaak in [[arbeidsjaren]]: één arbeidsjaar is een volledige baan gedurende een jaar. Twee mensen die elk de helft van een volledige week werken ([[deeltijdwerk]]), zijn samen één arbeidsjaar.",
          "Is de vraag naar arbeid groter dan het aanbod, dan is er een [[krappe arbeidsmarkt]]: veel vacatures, weinig werklozen, en werknemers kunnen hogere lonen vragen. Bij een [[ruime arbeidsmarkt]] is het omgekeerd.",
          { kop: "Arbeidsmarkt en volkomen concurrentie" },
          "Economen gebruiken voor de arbeidsmarkt vaak het model van [[volkomen concurrentie]]: veel vragers en aanbieders, gelijke (homogene) arbeid, een doorzichtige markt en vrije toe- en uittreding. Het loon is dan de prijs die vraag en aanbod gelijk maakt: het evenwichtsloon.",
          "De vraaglijn daalt: bij een hoger loon vragen werkgevers minder arbeid. De aanbodlijn stijgt: bij een hoger loon willen meer mensen (meer uren) werken.",
          "Het [[werkgeverssurplus]] is het verschil tussen wat werkgevers maximaal willen betalen en het loon dat ze betalen. Het [[werknemerssurplus]] is het verschil tussen het loon en het loon waarvoor werknemers minimaal willen werken.",
          { fig: "arbeidsmarkt_surplus", bij: "Met een minimumloon van 45: A is het werkgeverssurplus, B het werknemerssurplus en C het verloren surplus (Harberger driehoek)." },
          "Een [[minimumloon]] boven het evenwichtsloon beschermt werknemers tegen een te laag loon, maar werkgevers vragen dan minder arbeid en er bieden zich meer mensen aan: een [[aanbodoverschot]] (werkloosheid). Een deel van het totale surplus gaat verloren.",
          { widget: "arbeidsmarkt" },
          { kop: "Onderhandelen op de arbeidsmarkt" },
          "In het echt is de arbeidsmarkt geen volkomen concurrentie. Lonen worden vaak vastgelegd in een [[collectieve arbeidsovereenkomst (cao)]] tussen [[werkgeversorganisaties]] en [[vakbonden]]. Afspraken tussen één werkgever en één werknemer staan in een [[individuele arbeidsovereenkomst]].",
          { tip: "Een [[zelfstandige zonder personeel (zzp'er)]] is ondernemer, geen werknemer. Hij betaalt geen premies voor de werknemersverzekeringen en is dus ook niet verzekerd tegen werkloosheid of arbeidsongeschiktheid. Daarover gaat de discussie of zelfstandigen wel solidair zijn." }
        ],
        begrippen: [
          ["Aanbod van arbeid", "Gelijk aan de beroepsbevolking: de mensen van 15 tot 75 jaar die werken of werkloos zijn."],
          ["Beroepsbevolking", "Alle personen van 15 tot 75 jaar met betaald werk, plus de werklozen die recent zochten en direct beschikbaar zijn."],
          ["Beroepsgeschikte bevolking", "Alle personen van 15 tot 75 jaar."],
          ["Niet-beroepsbevolking", "Mensen van 15 tot 75 jaar zonder betaald werk die niet zoeken of niet direct beschikbaar zijn, zoals studenten en arbeidsongeschikten."],
          ["Vraag naar arbeid", "Werkgelegenheid plus vacatures."],
          ["Werkgelegenheid", "De vervulde vraag naar arbeid; even groot als de werkzame beroepsbevolking."],
          ["Vacatures", "De onvervulde vraag naar arbeid: werkgevers zoeken nog personeel."],
          ["Participatiegraad", "De beroepsbevolking als percentage van de beroepsgeschikte bevolking."],
          ["Arbeidsjaar", "Eén volledige baan gedurende een heel jaar."],
          ["Krappe arbeidsmarkt", "De vraag naar arbeid is groter dan het aanbod: veel vacatures en weinig werklozen."],
          ["Ruime arbeidsmarkt", "Het aanbod van arbeid is groter dan de vraag: weinig vacatures en veel werklozen."],
          ["Werkgeverssurplus", "Het verschil tussen wat een werkgever maximaal voor arbeid wil betalen en het loon dat hij betaalt."],
          ["Werknemerssurplus", "Het verschil tussen het loon en het laagste loon waarvoor een werknemer wil werken."],
          ["Minimumloon", "Het laagste loon dat een werkgever volgens de wet mag betalen."],
          ["Collectieve arbeidsovereenkomst (cao)", "Afspraken over arbeidsvoorwaarden tussen werkgeversorganisaties en vakbonden, voor een hele groep werknemers."]
        ],
        vragen: [
          { q: "Een student van 19 studeert voltijds, heeft geen bijbaan en zoekt er ook geen. Waar hoort hij bij?",
            a: ["De niet-beroepsbevolking", "De werkloze beroepsbevolking", "De werkzame beroepsbevolking", "De niet beroepsgeschikte bevolking"],
            u: "Hij is tussen de 15 en 75 jaar, dus beroepsgeschikt. Maar hij werkt niet en zoekt niet: hij biedt zich niet aan op de arbeidsmarkt." },
          { q: "Bekijk de figuur. Hoe groot is de beroepsbevolking (× 1.000)?", fig: "bevolking_getallen",
            a: ["9.600", "13.000", "9.216", "4.800"],
            u: "Beroepsbevolking = werkzaam + werkloos = 9.216 + 384 = 9.600. Je kunt ook rekenen: beroepsgeschikt − niet-beroepsbevolking = 13.000 − 3.400 = 9.600." },
          { q: "Er zijn 9,4 miljoen werkenden en 0,4 miljoen vacatures. De beroepsbevolking is 9,7 miljoen. Wat voor arbeidsmarkt is dit?",
            a: ["Krap: de vraag (9,8 mln) is groter dan het aanbod", "Ruim: er zijn 0,3 miljoen werklozen", "Krap: de werkgelegenheid is groter dan het aanbod", "Ruim: het aanbod is groter dan de werkgelegenheid"],
            u: "Vraag naar arbeid = werkgelegenheid + vacatures = 9,4 + 0,4 = 9,8 miljoen. Dat is meer dan het aanbod van 9,7 miljoen: krap." },
          { q: "Op een arbeidsmarkt met volkomen concurrentie stijgt het loon. Wat gebeurt er volgens het model?",
            a: ["Werkgevers vragen minder arbeid, meer mensen bieden zich aan", "Werkgevers vragen meer arbeid, minder mensen bieden zich aan", "Werkgevers en werknemers reageren niet op het loon", "De vraaglijn en de aanbodlijn verschuiven allebei naar rechts"],
            u: "Een loonsverandering is een beweging lángs de lijnen: minder gevraagde arbeid (de vraaglijn daalt) en meer aangeboden arbeid (de aanbodlijn stijgt)." },
          { q: "Bekijk de figuur. Hoe groot is het aanbodoverschot door het minimumloon?", fig: "arbeidsmarkt_min",
            a: ["4 miljoen arbeidsjaren", "2 miljoen arbeidsjaren", "3 miljoen arbeidsjaren", "7 miljoen arbeidsjaren"],
            u: "Bij een loon van 45 vragen werkgevers 3 miljoen arbeidsjaren en bieden werknemers 7 miljoen aan. Het aanbodoverschot is 7 − 3 = 4 miljoen." },
          { q: "Bekijk de figuur. Welk vlak stelt het werknemerssurplus voor?", fig: "arbeidsmarkt_surplus",
            a: ["Vlak B", "Vlak A", "Vlak C", "Vlak A en vlak B samen"],
            u: "Het werknemerssurplus ligt tussen het loon dat werknemers krijgen (45) en de aanbodlijn. A ligt tussen de vraaglijn en het loon: werkgeverssurplus. C is het verloren surplus." },
          { q: "Door de invoering van een minimumloon boven het evenwichtsloon ontstaat een Harberger driehoek. Wat stelt die voor?",
            a: ["Surplus dat verloren gaat omdat er minder wordt gewerkt", "Het extra loon dat werknemers door de maatregel krijgen", "Het surplus dat van werkgevers naar werknemers gaat", "De belasting die de overheid over het minimumloon int"],
            u: "Arbeidsjaren die werkgevers en werknemers allebei hadden gewild, gaan niet door. Het surplus daarvan is weg: een verlies aan economische doelmatigheid." },
          { q: "Steeds meer vrouwen gaan meer uren werken. Wat gebeurt er in het model met de aanbodlijn, het evenwichtsloon en de werkgelegenheid?",
            a: ["Aanbodlijn naar rechts, loon daalt, werkgelegenheid stijgt", "Aanbodlijn naar links, loon stijgt, werkgelegenheid daalt", "Vraaglijn naar rechts, loon stijgt, werkgelegenheid stijgt", "Aanbodlijn naar rechts, loon stijgt, werkgelegenheid stijgt"],
            u: "Bij elk loon wordt er meer arbeid aangeboden. Er ontstaat een aanbodoverschot, het loon daalt en werkgevers vragen bij dat lagere loon meer arbeid." },
          { q: "Waarom is de echte arbeidsmarkt geen markt van volkomen concurrentie?",
            a: ["Lonen liggen vaak vast in cao's en arbeid is niet homogeen", "Er zijn te weinig werknemers om van een markt te spreken", "Werkgevers mogen het loon niet zelf vaststellen", "Er bestaat geen evenwichtsloon op een arbeidsmarkt"],
            u: "Vakbonden en werkgeversorganisaties onderhandelen over lonen, er is een minimumloon, werknemers verschillen in opleiding en ervaring, en niet iedereen kent alle vacatures." },
          { q: "Een zzp'er wordt ziek en kan een half jaar niet werken. Wat is het verschil met een werknemer?",
            a: ["Hij heeft geen verplichte werknemersverzekering tegen ziekte", "Hij krijgt een hogere uitkering dan een werknemer", "Hij valt automatisch onder de werknemersverzekeringen", "Er is geen verschil: iedereen is gelijk verzekerd"],
            u: "Werknemersverzekeringen zijn er alleen voor mensen in loondienst. Een zzp'er moet zich zelf verzekeren of een buffer opbouwen." },
          { q: "Wat is het verschil tussen een cao en een individuele arbeidsovereenkomst?",
            a: ["Een cao geldt voor een groep werknemers, een individuele voor één werknemer", "Een cao is een afspraak tussen één werkgever en één werknemer", "Een individuele overeenkomst wordt door de vakbond afgesloten", "Een cao geldt alleen voor zzp'ers en uitzendkrachten"],
            u: "Een cao sluiten werkgeversorganisaties en vakbonden voor een hele sector of een groot bedrijf. Een individuele arbeidsovereenkomst sluit je zelf met je werkgever." }
        ],
        reken: [
          { gen: (R) => {
            const G = R.int(120, 140) * 100, BB = R.int(85, 100) * 100, p = BB / G * 100;
            return { q: `De beroepsgeschikte bevolking is ${R.nl(G * 1000)} personen. De beroepsbevolking is ${R.nl(BB * 1000)} personen. Bereken de participatiegraad. Rond af op één decimaal.`,
              antwoord: R.rond(p, 1), eenheid: "%", tol: 0.06, hint: "Participatiegraad = beroepsbevolking / beroepsgeschikte bevolking × 100%.",
              stappen: [`${R.nl(BB * 1000)} / ${R.nl(G * 1000)} × 100% = ${R.nl(R.rond(p, 1), 1)}%`] };
          } },
          { q: "Een bedrijf heeft 120 werknemers met een volledige werkweek van 36 uur en 180 werknemers die 24 uur per week werken. Hoeveel arbeidsjaren werken zij samen in een jaar?",
            antwoord: 240, eenheid: "arbeidsjaren", tol: 0.1, hint: "Reken de deeltijders om naar volledige banen.",
            stappen: ["Eén deeltijder werkt 24 / 36 = 2/3 arbeidsjaar.", "180 × 2/3 = 120 arbeidsjaren", "Samen: 120 + 120 = 240 arbeidsjaren"] },
          { q: "Op een arbeidsmarkt geldt: vraag L_{v} = 60 − 5q en aanbod L_{a} = 10 + 5q (L is het loon in duizenden euro's, q in miljoenen arbeidsjaren). Bereken het werkgeverssurplus in het evenwicht, in miljarden euro's.",
            antwoord: 62.5, eenheid: "miljard euro", tol: 0.1, hint: "Zoek eerst het evenwicht. Het werkgeverssurplus is de driehoek tussen de vraaglijn en het evenwichtsloon.",
            stappen: ["Evenwicht: 60 − 5q = 10 + 5q, dus q = 5 en L = 35", "De vraaglijn snijdt de loon-as bij 60.", "Werkgeverssurplus: ½ × 5 × (60 − 35) = 62,5", "Eenheid: miljoen arbeidsjaren × duizend euro = miljard euro"] },
          { q: "Op dezelfde markt (L_{v} = 60 − 5q en L_{a} = 10 + 5q) komt een minimumloon van 45. Bereken de Harberger driehoek in miljarden euro's.",
            antwoord: 20, eenheid: "miljard euro", tol: 0.1, hint: "Bij het minimumloon wordt er minder gewerkt. De driehoek ligt tussen die hoeveelheid en het evenwicht, tussen de vraag- en de aanbodlijn.",
            stappen: ["Bij L = 45 vragen werkgevers: 60 − 5q = 45, dus q = 3", "Bij q = 3 is de vraaglijn 45 en de aanbodlijn 10 + 15 = 25", "Driehoek van q = 3 tot q = 5: ½ × (5 − 3) × (45 − 25) = 20"] },
          { gen: (R) => {
            const a = R.kies([50, 60, 70, 80]), q = (a - 10) / 10, w = (a + 10) / 2, M = w + R.kies([5, 10]);
            const qv = (a - M) / 5, qa = (M - 10) / 5;
            return { q: `Op een arbeidsmarkt geldt: vraag L_{v} = ${a} − 5q en aanbod L_{a} = 10 + 5q (L in duizenden euro's, q in miljoenen arbeidsjaren). De overheid stelt een minimumloon in van ${M}. Bereken het aanbodoverschot in miljoenen arbeidsjaren.`,
              antwoord: R.rond(qa - qv, 2), eenheid: "mln arbeidsjaren", tol: 0.011, hint: "Vul het minimumloon in bij de vraaglijn en bij de aanbodlijn en reken q uit.",
              stappen: [`Evenwicht ter controle: q = ${R.nl(q)}, L = ${R.nl(w)}. Het minimumloon ligt erboven.`, `Vraag: ${a} − 5q = ${M}, dus q = ${R.nl(qv)}`, `Aanbod: 10 + 5q = ${M}, dus q = ${R.nl(qa)}`, `Aanbodoverschot: ${R.nl(qa)} − ${R.nl(qv)} = ${R.nl(R.rond(qa - qv, 2))} miljoen arbeidsjaren`] };
          } }
        ],
        oefen: [
          { type: "koppel", q: "Koppel het begrip aan wat het is.",
            paren: [["Aanbod van arbeid", "de beroepsbevolking"], ["Vraag naar arbeid", "werkgelegenheid + vacatures"], ["Werkgelegenheid", "de werkzame beroepsbevolking"], ["Vacatures", "onvervulde vraag naar arbeid"], ["Aanbodoverschot", "werkloosheid door een te hoog loon"]],
            u: "Let op: werkgelegenheid is de vervulde vraag, vacatures zijn de onvervulde vraag." },
          { type: "sorteer", q: "Wat gebeurt er met de vraaglijn of de aanbodlijn van arbeid?", groepen: ["Vraaglijn naar rechts", "Aanbodlijn naar rechts", "Aanbodlijn naar links"],
            items: [["Hoogconjunctuur: bedrijven verkopen meer", 0], ["Meer arbeidsmigranten komen naar Nederland", 1], ["Meer mensen gaan langer studeren", 2], ["De vraag naar zorg stijgt door vergrijzing", 0], ["Ouders gaan meer uren werken door goedkopere kinderopvang", 1], ["Veel mensen gaan met pensioen", 2]],
            u: "De vraag naar arbeid hangt af van de productie (afgeleide vraag). Het aanbod hangt af van hoeveel mensen willen en kunnen werken." },
          { type: "invul", q: "Vul aan.",
            tekst: "Ligt het minimumloon boven het evenwichtsloon, dan vragen werkgevers {minder} arbeid en bieden {meer} mensen zich aan. Er ontstaat een {aanbodoverschot}.",
            extra: ["vraagoverschot", "evenwicht"],
            u: "Een minimumloon werkt als een minimumprijs: het is alleen effectief als het boven het evenwichtsloon ligt." }
        ],
        open: [
          { q: "Leg met het model van de arbeidsmarkt uit waarom een flinke verhoging van het minimumloon tot meer werkloosheid kan leiden, en geef een reden waarom de overheid het toch doet.",
            a: "Ligt het minimumloon boven het evenwichtsloon, dan is arbeid duurder: werkgevers vragen minder arbeid. Tegelijk willen bij dat hogere loon meer mensen werken. Er ontstaat een aanbodoverschot: werkloosheid, en een deel van het surplus gaat verloren. De overheid doet het toch om werknemers met een zwakke onderhandelingspositie te beschermen tegen een te laag loon en om armoede tegen te gaan.",
            punten: ["arbeid duurder: minder vraag naar arbeid", "meer aanbod bij hoger loon: aanbodoverschot", "reden: bescherming van werknemers, minder armoede of nivellering"] },
          { q: "In een sector is de arbeidsmarkt erg krap. Leg uit wat er volgens het model met het loon gebeurt, en geef een gevolg voor de bedrijven.",
            a: "Bij een krappe markt is de vraag naar arbeid groter dan het aanbod. Werkgevers concurreren om werknemers en bieden hogere lonen: het loon stijgt richting een nieuw evenwicht. Voor bedrijven stijgen de loonkosten. Zij kunnen de prijzen verhogen, investeren in machines die arbeid vervangen, of hun productie niet uitbreiden omdat ze geen personeel vinden.",
            punten: ["vraag groter dan aanbod: vraagoverschot", "loon stijgt", "gevolg: hogere loonkosten, prijzen omhoog of meer machines"] }
        ],
        widgets: ["wietelt", "arbeidsmarkt"]
      },

      // ------------------------------------------------------------------
      // 5.2 Werkloosheid
      // ------------------------------------------------------------------
      {
        id: "a5-2", nr: "5.2", titel: "Werkloosheid",
        kern: [
          "[[Werkloosheid]]: mensen zonder betaald werk die recent wel naar werk hebben gezocht en direct beschikbaar zijn.",
          { formule: "werkloosheidspercentage = werkloze beroepsbevolking / beroepsbevolking × 100%" },
          { let: "Deel niet door de hele bevolking en ook niet door de beroepsgeschikte bevolking, maar door de beroepsbevolking. Een daling van 5% naar 4% is een daling van 1 procentpunt (en van 20%)." },
          { kop: "Werkloosheid volgens Keynes" },
          "[[Keynes]] kijkt naar de vraagkant en de korte termijn. Als de [[effectieve vraag (EV)]] kleiner is dan de productiecapaciteit ([[onderbesteding]]), produceren bedrijven minder en ontslaan ze mensen: [[conjuncturele werkloosheid]].",
          { fig: "ev_pc", bij: "Ligt de effectieve vraag onder de productiecapaciteit, dan is er onderbesteding en dreigt conjuncturele werkloosheid." },
          "Aanpak volgens Keynes: de overheid stimuleert de effectieve vraag, met hogere overheidsbestedingen of lagere belastingen. Het loon is voor Keynes vooral **koopkracht**: loonsverlaging is in een crisis een slecht idee, omdat de consumptie dan verder daalt.",
          { kop: "Werkloosheid volgens de Klassieken" },
          "De [[Klassieken]] kijken naar de aanbodkant en de lange termijn. [[Structurele werkloosheid]] ontstaat door de kosten, de hoeveelheid of de kwaliteit van de productiefactoren. Het loon is voor hen vooral **kosten**.",
          { tabel: { kop: ["Soort", "Oorzaak"], rijen: [
            ["Kwantitatief structureel", "te weinig arbeidsplaatsen, ook bij volledig benutte capaciteit, bijvoorbeeld omdat arbeid te duur is"],
            ["Kwalitatief structureel", "werklozen en vacatures passen niet bij elkaar: verkeerde opleiding of te weinig arbeidsmobiliteit"],
            ["Frictie", "zoeken en solliciteren kost tijd"],
            ["Seizoen", "in een deel van het jaar is er minder werk"]] } },
          "Aanpak volgens de Klassieken: de loonkosten per product verlagen (loonmatiging, een kleinere wig, hogere arbeidsproductiviteit), scholing en arbeidsmobiliteit verbeteren, zodat werknemers beter aansluiten op de arbeidsmarkt.",
          { fig: "loon_scholen", bij: "Dezelfde loonsverlaging, twee redeneringen. Op de toets moet je beide ketens in stappen kunnen opschrijven." },
          { widget: "werkloosheid" },
          { kop: "Meer werk door minder wig" },
          "De [[wig]] drijft de loonkosten op zonder dat de werknemer meer overhoudt. Verlaagt de overheid de [[werkgeverswig]], dan daalt de prijs van arbeid voor bedrijven en vragen ze meer arbeid. Verlaagt ze de [[werknemerswig]], dan stijgt het nettoloon en loont werken meer, zodat meer mensen zich aanbieden.",
          "Werkloosheid kun je ook importeren: als het in het buitenland slecht gaat, daalt de export. Dat is minder effectieve vraag en dus conjuncturele werkloosheid in Nederland. Zijn de Nederlandse loonkosten per product te hoog, dan verhuizen banen naar het buitenland (structureel).",
          { widget: "loonkosten" }
        ],
        begrippen: [
          ["Werkloosheid", "De situatie van mensen zonder betaald werk die recent hebben gezocht en direct beschikbaar zijn."],
          ["Werkloze beroepsbevolking", "Het deel van de beroepsbevolking dat geen betaald werk heeft maar wel zoekt en direct kan beginnen."],
          ["Keynes", "Econoom die schommelingen van het bbp op korte termijn verklaarde uit veranderingen van de effectieve vraag."],
          ["Klassieken", "Economen die de aanbodkant centraal stellen: de productiecapaciteit en de kosten van productiefactoren."],
          ["Effectieve vraag (EV)", "De totale vraag naar alle goederen en diensten in een land in een periode."],
          ["Onderbesteding", "De effectieve vraag is kleiner dan de productiecapaciteit."],
          ["Overbesteding", "De effectieve vraag is groter dan de productiecapaciteit."],
          ["Conjuncturele werkloosheid", "Werkloosheid doordat de effectieve vraag te laag is."],
          ["Structurele werkloosheid", "Werkloosheid door veranderingen in de hoeveelheid, kwaliteit of kosten van arbeid en kapitaal."],
          ["Kwantitatieve structurele werkloosheid", "Werkloosheid omdat er te weinig arbeidsplaatsen zijn, terwijl de productiecapaciteit volledig wordt gebruikt."],
          ["Kwalitatieve structurele werkloosheid", "Werklozen en vacatures tegelijk, omdat opleiding of woonplaats niet aansluit."],
          ["Frictiewerkloosheid", "Werkloosheid omdat het zoeken naar een (nieuwe) baan tijd kost."],
          ["Arbeidsmobiliteit", "Hoe makkelijk mensen wisselen van regio, werkgever of beroep."],
          ["Werkgeverswig", "Loonkosten min brutoloon: de premies die de werkgever betaalt."],
          ["Werknemerswig", "Brutoloon min nettoloon: belasting en premies die van het loon van de werknemer afgaan."]
        ],
        vragen: [
          { q: "Een land heeft een beroepsbevolking van 9 miljoen. Er zijn 360.000 werklozen. Wat is het werkloosheidspercentage?",
            a: ["4%", "3,6%", "0,4%", "40%"],
            u: "360.000 / 9.000.000 × 100% = 4%." },
          { q: "De werkloosheid daalt van 5% naar 4%. Welke uitspraak klopt?",
            a: ["De werkloosheid is met 1 procentpunt gedaald", "De werkloosheid is met 1 procent gedaald", "De werkloosheid is met 25% gedaald", "De werkloosheid is met 4 procentpunt gedaald"],
            u: "Het verschil tussen twee percentages heet procentpunt: 5 − 4 = 1 procentpunt. In procenten is het een daling van 1/5 = 20%." },
          { q: "Bekijk de figuur. In welk jaar is de conjuncturele werkloosheid waarschijnlijk het grootst?", fig: "ev_pc",
            a: ["Jaar 5", "Jaar 3", "Jaar 8", "Jaar 4"],
            u: "In jaar 5 ligt de effectieve vraag het verst onder de productiecapaciteit: 112 − 104 = 8 miljard onderbesteding." },
          { q: "Bekijk de figuur. Wat is er in jaar 3 aan de hand?", fig: "ev_pc",
            a: ["Overbesteding: kans op bestedingsinflatie", "Onderbesteding: kans op conjuncturele werkloosheid", "Bestedingsevenwicht: de economie is in balans", "Onderbesteding: kans op structurele werkloosheid"],
            u: "In jaar 3 is de effectieve vraag (108) groter dan de productiecapaciteit (106): overbesteding. Bedrijven kunnen niet alles leveren en verhogen hun prijzen." },
          { q: "Welke maatregel past bij de aanpak van conjuncturele werkloosheid?",
            a: ["De overheid gaat meer investeren in wegen en dijken", "De overheid verlaagt het minimumloon flink", "De overheid zet in op omscholing van werklozen", "De overheid verhoogt de belastingen om te sparen"],
            u: "Conjuncturele werkloosheid komt door te weinig bestedingen. Meer overheidsbestedingen verhogen de effectieve vraag." },
          { q: "Bekijk de figuur. Wat gebeurt er volgens Keynes en volgens de Klassieken met de werkgelegenheid als de lonen dalen?", fig: "loon_scholen",
            a: ["Keynes: daalt. Klassieken: stijgt", "Keynes: stijgt. Klassieken: daalt", "Keynes en Klassieken: daalt", "Keynes en Klassieken: stijgt"],
            u: "Keynes: lager loon is minder koopkracht, minder consumptie, minder productie en minder werk. Klassieken: lager loon is lagere kosten, betere concurrentiepositie, meer export en meer werk." },
          { q: "Er zijn veel vacatures voor ICT'ers, terwijl er veel werkloze productiemedewerkers zijn. Welke soort werkloosheid is dit?",
            a: ["Kwalitatieve structurele werkloosheid", "Kwantitatieve structurele werkloosheid", "Conjuncturele werkloosheid", "Frictiewerkloosheid"],
            u: "Er zijn tegelijk werklozen en vacatures, maar de opleiding past niet. Omscholing is de aanpak." },
          { q: "Een fabriek vervangt honderd werknemers door robots, omdat arbeid te duur is geworden. De fabriek draait op volle capaciteit. Welke soort werkloosheid ontstaat?",
            a: ["Kwantitatieve structurele werkloosheid", "Kwalitatieve structurele werkloosheid", "Conjuncturele werkloosheid", "Seizoenswerkloosheid"],
            u: "De capaciteit wordt volledig benut, maar er zijn blijvend minder arbeidsplaatsen: kwantitatief structureel." },
          { q: "De overheid verlaagt de werkgeverspremies. Wat is volgens de Klassieken het gevolg?",
            a: ["Lagere loonkosten, dus meer vraag naar arbeid", "Hoger nettoloon, dus meer koopkracht", "Hogere loonkosten, dus minder vraag naar arbeid", "Lagere loonkosten, dus minder aanbod van arbeid"],
            u: "Een kleinere werkgeverswig maakt arbeid goedkoper zonder dat het nettoloon daalt. Bedrijven vragen meer arbeid en de concurrentiepositie verbetert." },
          { q: "De economie van belangrijke handelspartners krimpt sterk. Leg de juiste keten vast.",
            a: ["Export daalt, EV daalt, productie daalt, conjuncturele werkloosheid stijgt", "Import daalt, EV stijgt, productie stijgt, werkloosheid daalt", "Export daalt, loonkosten stijgen, structurele werkloosheid stijgt", "Export stijgt, EV stijgt, productie stijgt, werkloosheid daalt"],
            u: "Export is een onderdeel van de effectieve vraag. Zo kun je werkloosheid importeren." },
          { q: "Jeroen wil graag werken, maar heeft na veel afwijzingen het solliciteren opgegeven. Hoe telt hij mee in de statistiek?",
            a: ["Hij hoort bij de niet-beroepsbevolking: verborgen werkloosheid", "Hij hoort bij de werkloze beroepsbevolking", "Hij hoort bij de werkzame beroepsbevolking", "Hij telt niet mee: hij is niet beroepsgeschikt"],
            u: "Wie niet zoekt, telt niet als werkloos. Mensen die door weinig kans op werk stoppen met zoeken, vormen verborgen werkloosheid (ontmoedigingseffect)." }
        ],
        reken: [
          { gen: (R) => {
            const BB = R.int(85, 100) / 10, WL = R.int(250, 600) * 1000, p = WL / (BB * 1e6) * 100;
            return { q: `De beroepsbevolking is ${R.nl(BB)} miljoen personen. Er zijn ${R.nl(WL)} werklozen. Bereken het werkloosheidspercentage. Rond af op één decimaal.`,
              antwoord: R.rond(p, 1), eenheid: "%", tol: 0.06, hint: "Deel de werklozen door de beroepsbevolking, beide in personen.",
              stappen: [`${R.nl(BB)} miljoen = ${R.nl(BB * 1e6)}`, `${R.nl(WL)} / ${R.nl(BB * 1e6)} × 100% = ${R.nl(R.rond(p, 1), 1)}%`] };
          } },
          { q: "In jaar 1 is de beroepsbevolking 9,5 miljoen en zijn er 380.000 werklozen. In jaar 2 is de beroepsbevolking 9,6 miljoen en zijn er 432.000 werklozen. Met hoeveel procentpunt is het werkloosheidspercentage gestegen?",
            antwoord: 0.5, eenheid: "procentpunt", tol: 0.01, hint: "Bereken eerst beide werkloosheidspercentages.",
            stappen: ["Jaar 1: 380.000 / 9.500.000 × 100% = 4,0%", "Jaar 2: 432.000 / 9.600.000 × 100% = 4,5%", "Stijging: 4,5 − 4,0 = 0,5 procentpunt"] },
          { q: "Bekijk de figuur met de effectieve vraag en de productiecapaciteit. Hoe groot is de onderbesteding in jaar 5, in miljarden euro's?", fig: "ev_pc",
            antwoord: 8, eenheid: "miljard euro", tol: 0.1, hint: "Onderbesteding = productiecapaciteit − effectieve vraag.",
            stappen: ["Jaar 5: productiecapaciteit 112, effectieve vraag 104", "Onderbesteding: 112 − 104 = 8 miljard euro"] },
          { gen: (R) => {
            const B = R.int(28, 50) * 100, wg = R.kies([20, 22, 25, 28]), wn = R.kies([28, 30, 32, 35]);
            const LK = B * (1 + wg / 100), N = B * (1 - wn / 100), wig = LK - N;
            return { q: `Een werknemer heeft een brutoloon van ${eur(B)} per maand. De werkgever betaalt daarbovenop ${wg}% van het brutoloon aan premies. Van het brutoloon gaat ${wn}% af aan loonheffing en premies voor de werknemer. Bereken de wig per maand.`,
              antwoord: R.rond(wig, 0), eenheid: "euro", tol: 1, hint: "Wig = loonkosten − nettoloon.",
              stappen: [`Loonkosten: ${eur(B)} × ${R.nl(1 + wg / 100)} = ${eur(R.rond(LK, 0))}`, `Nettoloon: ${eur(B)} × ${R.nl(1 - wn / 100)} = ${eur(R.rond(N, 0))}`, `Wig: ${eur(R.rond(LK, 0))} − ${eur(R.rond(N, 0))} = ${eur(R.rond(wig, 0))}`] };
          } },
          { q: "Bekijk de figuur: de loonkosten zijn € 5.000 en de werkgeverswig is € 1.000. De overheid verlaagt de werkgeverspremies met € 200. Met hoeveel procent dalen de loonkosten?", fig: "wig",
            antwoord: 4, eenheid: "%", tol: 0.05, hint: "Het brutoloon blijft gelijk; alleen de werkgeverswig daalt.",
            stappen: ["Nieuwe loonkosten: 5.000 − 200 = € 4.800", "Daling: 200 / 5.000 × 100% = 4%", "Het nettoloon (€ 2.800) verandert niet."] }
        ],
        oefen: [
          { type: "sorteer", q: "Hoort de uitspraak bij Keynes of bij de Klassieken?", groepen: ["Keynes", "Klassieken"],
            items: [["Loon is vooral koopkracht", 0], ["Loon is vooral een kostenpost", 1], ["In een crisis moet de overheid meer uitgeven", 0], ["Een lagere wig schept banen", 1], ["Werkloosheid komt door te weinig bestedingen", 0], ["Omscholing helpt tegen werkloosheid", 1]],
            u: "Keynes: vraagkant, korte termijn, conjunctureel. Klassieken: aanbodkant, lange termijn, structureel." },
          { type: "volgorde", q: "Zet de redenering van Keynes in de goede volgorde.",
            items: ["Consumenten en bedrijven worden onzeker en besteden minder", "De effectieve vraag daalt onder de productiecapaciteit", "Bedrijven verkopen minder en verlagen hun productie", "Bedrijven hebben minder personeel nodig", "De conjuncturele werkloosheid stijgt"],
            u: "Op de toets levert elke ontbrekende schakel puntverlies op." },
          { type: "koppel", q: "Koppel de soort werkloosheid aan de passende aanpak.",
            paren: [["Conjunctureel", "effectieve vraag stimuleren"], ["Kwantitatief structureel", "loonkosten per product verlagen"], ["Kwalitatief structureel", "omscholing en arbeidsmobiliteit"], ["Frictie", "betere bemiddeling en informatie"]],
            u: "Pak altijd de oorzaak aan. Meer bestedingen helpen niet als werklozen de verkeerde opleiding hebben." }
        ],
        open: [
          { q: "De regering overweegt de lonen van ambtenaren te bevriezen om de werkloosheid te bestrijden. Leg uit waarom een aanhanger van Keynes daartegen is en waarom een aanhanger van de Klassieken het juist steunt.",
            a: "Keynes: loon is koopkracht. Als de lonen achterblijven, daalt de koopkracht en dus de consumptie. De effectieve vraag daalt, bedrijven produceren minder en de conjuncturele werkloosheid stijgt. Klassieken: loon is kosten. Lagere loonkosten (voor de overheid en via loonmatiging in de rest van de economie) verlagen de loonkosten per product, verbeteren de concurrentiepositie en maken arbeid goedkoper, zodat er meer banen komen.",
            punten: ["Keynes: lagere koopkracht, minder consumptie, lagere EV, meer werkloosheid", "Klassieken: lagere loonkosten (per product), betere concurrentiepositie", "Klassieken: meer vraag naar arbeid of meer export, minder werkloosheid"] },
          { q: "Leg uit hoe een verlaging van de werknemerswig tot meer werkgelegenheid kan leiden, zonder dat de loonkosten dalen.",
            a: "Bij een kleinere werknemerswig houdt de werknemer bij hetzelfde brutoloon meer netto over. Werken wordt aantrekkelijker, waardoor meer mensen zich aanbieden of meer uren gaan werken. Ook stijgt de koopkracht, waardoor de bestedingen en de productie toenemen: bedrijven hebben meer werknemers nodig.",
            punten: ["hoger nettoloon bij gelijk brutoloon", "werken loont meer: groter aanbod van arbeid", "meer koopkracht: hogere bestedingen en productie"] }
        ],
        widgets: ["werkloosheid", "loonkosten"]
      },

      // ------------------------------------------------------------------
      // 5.3 Pensioen
      // ------------------------------------------------------------------
      {
        id: "a5-3", nr: "5.3", titel: "Pensioen",
        kern: [
          "Een pensioen in Nederland bestaat meestal uit drie delen: de [[AOW]] van de overheid, een [[bedrijfspensioen]] dat je via je werkgever opbouwt, en wat je eventueel zelf spaart of belegt.",
          { kop: "AOW en het omslagstelsel" },
          "De AOW (het [[staatspensioen]]) is een volksverzekering: iedereen die in Nederland woont of werkt is verzekerd. Ze wordt betaald volgens het [[omslagstelsel]]: de premies van de werkenden van dit jaar gaan dit jaar direct naar de AOW-uitkeringen (aangevuld met belastinggeld). Er wordt niets gespaard.",
          { fig: "stelsels_pensioen", bij: "Omslagstelsel: de werkenden van nu betalen voor de ouderen van nu. Kapitaaldekkingsstelsel: je spaart voor jezelf." },
          { formule: "grijze druk = aantal personen van 65 jaar of ouder / aantal personen van 20 tot 65 jaar × 100%" },
          "Door vergrijzing stijgt de [[grijze druk]]: er komen meer ouderen per werkende. Bij het omslagstelsel moet de premie per werkende dan omhoog, of de uitkering omlaag, of de AOW-leeftijd omhoog. (De [[groene druk]] vergelijkt de jongeren van 0 tot 20 met de groep van 20 tot 65.)",
          { widget: "pensioen" },
          { kop: "Bedrijfspensioen en kapitaaldekking" },
          "Een pensioenfonds werkt met het [[kapitaaldekkingsstelsel]]: werknemers en werkgevers betalen premie, het fonds belegt dat geld ([[beleggen]]) en keert later pensioen uit. Iedere generatie spaart voor zichzelf, dus vergrijzing raakt dit stelsel minder. Het is wel gevoelig voor de rente, de beurs en inflatie.",
          "Of een fonds genoeg geld heeft, zie je aan de [[dekkingsgraad]]. De verplichtingen zijn alle toekomstige uitkeringen, teruggerekend naar wat ze nu waard zijn (de [[contante waarde]]).",
          { formule: "dekkingsgraad = vermogen / contante waarde van de verplichtingen × 100%" },
          { let: "Daalt de rente, dan daalt de dekkingsgraad, ook al verandert het vermogen niet. Bij een lage rente groeit geld langzamer aan, dus moet het fonds nú meer in kas hebben om later hetzelfde uit te keren: de contante waarde van de verplichtingen stijgt." },
          "Is de dekkingsgraad hoog genoeg, dan kan het fonds de pensioenen [[indexeren]]: laten meestijgen met de prijzen ([[waardevast]]) of met de lonen ([[welvaartsvast]]). Is hij te laag, dan blijft indexeren uit en moet het fonds soms korten. Een pensioen is dus geen garantie.",
          { fig: "dekking_verloop", bij: "Verzonnen fonds. Onder de 100% is er een tekort; in deze app geldt boven de 110% genoeg buffer om te indexeren." },
          { tip: "Een zzp'er krijgt wel AOW, maar bouwt geen verplicht bedrijfspensioen op. Hij moet zelf sparen of beleggen voor later, en kiest dus zelf tussen nu besteden en later pensioen." }
        ],
        begrippen: [
          ["AOW", "Basispensioen van de overheid (Algemene Ouderdomswet); een volksverzekering voor iedereen die in Nederland woont of werkt."],
          ["Staatspensioen", "Een ander woord voor de AOW: het basispensioen van de Rijksoverheid."],
          ["Bedrijfspensioen", "Aanvullend pensioen naast de AOW, dat werknemers verplicht via hun werkgever opbouwen."],
          ["Omslagstelsel", "Financiering waarbij de premies van de werkenden van dit jaar direct worden gebruikt voor de uitkeringen van dit jaar."],
          ["Kapitaaldekkingsstelsel", "Financiering waarbij premies worden belegd door een pensioenfonds en later als pensioen worden uitgekeerd aan dezelfde deelnemers."],
          ["Grijze druk", "Aantal personen van 65 jaar en ouder als percentage van het aantal personen van 20 tot 65 jaar."],
          ["Groene druk", "Aantal personen van 0 tot 20 jaar als percentage van het aantal personen van 20 tot 65 jaar."],
          ["Dekkingsgraad", "Vermogen van een pensioenfonds gedeeld door de contante waarde van alle toekomstige verplichtingen, × 100%."],
          ["Contante waarde van een bedrag", "Wat een bedrag dat je in de toekomst krijgt of moet betalen nu waard is."],
          ["Indexeren", "Een uitkering of pensioen aanpassen aan de stijging van prijzen of lonen."],
          ["Waardevast", "Een uitkering die meestijgt met de inflatie, zodat de koopkracht gelijk blijft."],
          ["Welvaartsvast", "Een uitkering die meestijgt met de gemiddelde loonstijging."],
          ["Beleggen", "Geld gebruiken om bijvoorbeeld aandelen of obligaties te kopen, met als doel er financieel op vooruit te gaan."],
          ["Rendement", "De opbrengst van een belegging als percentage van wat je erin had gestopt."],
          ["Solidariteit", "Elkaar helpen zonder directe tegenprestatie; bij verzekeren: risico's delen met andere verzekerden."]
        ],
        vragen: [
          { q: "Waarom is het omslagstelsel gevoeliger voor vergrijzing dan het kapitaaldekkingsstelsel?",
            a: ["Bij omslag betalen de werkenden van nu voor de ouderen van nu", "Bij omslag hangt de uitkering af van de beurs", "Bij kapitaaldekking betaalt de overheid alle pensioenen", "Bij kapitaaldekking is er geen premie nodig"],
            u: "Komen er meer ouderen per werkende, dan moet elke werkende meer premie betalen. Bij kapitaaldekking heeft elke generatie haar eigen spaarpot." },
          { q: "Een pensioenfonds heeft een vermogen van € 180 miljard. De contante waarde van de verplichtingen is € 200 miljard. Wat is de dekkingsgraad?",
            a: ["90%", "111%", "20%", "180%"],
            u: "180 / 200 × 100% = 90%. Het fonds heeft een tekort: het heeft niet genoeg voor alle toekomstige uitkeringen." },
          { q: "De rente daalt sterk. Het vermogen van een pensioenfonds blijft gelijk. Wat gebeurt er met de dekkingsgraad?",
            a: ["Die daalt, omdat de contante waarde van de verplichtingen stijgt", "Die stijgt, omdat het fonds minder rente betaalt", "Die blijft gelijk, omdat het vermogen gelijk blijft", "Die stijgt, omdat beleggingen meer opleveren"],
            u: "Bij een lagere rente is een toekomstig bedrag nu meer waard. De verplichtingen worden groter, de dekkingsgraad daalt." },
          { q: "Een pensioen wordt waardevast geïndexeerd. Wat betekent dat?",
            a: ["Het stijgt mee met de inflatie", "Het stijgt mee met de gemiddelde lonen", "Het blijft elk jaar hetzelfde bedrag", "Het stijgt mee met de beurskoersen"],
            u: "Waardevast: de koopkracht blijft gelijk. Welvaartsvast: het pensioen stijgt mee met de lonen en houdt dus gelijke tred met de werkenden." },
          { q: "In een land zijn 3 miljoen 65-plussers en 10 miljoen mensen van 20 tot 65 jaar. Wat is de grijze druk?",
            a: ["30%", "23%", "33%", "300%"],
            u: "3 / 10 × 100% = 30%. Let op: je deelt door de groep van 20 tot 65, niet door de hele bevolking." },
          { q: "Bekijk de figuur. In hoeveel jaren had het fonds een tekort?", fig: "dekking_verloop",
            a: ["2 jaren", "3 jaren", "4 jaren", "5 jaren"],
            u: "Onder de 100% liggen jaar 3 (96%) en jaar 4 (93%). Dat zijn twee jaren met een tekort." },
          { q: "Bekijk de figuur. In welk jaar steeg de dekkingsgraad het meest?", fig: "dekking_verloop",
            a: ["Jaar 5", "Jaar 7", "Jaar 8", "Jaar 6"],
            u: "Van jaar 4 naar jaar 5: van 93 naar 101, dat is 8 procentpunt. Andere stijgingen zijn 7 (jaar 6 en 7) en 3 (jaar 8)." },
          { q: "Welke maatregel helpt het **omslagstelsel** van de AOW het meest tegen vergrijzing?",
            a: ["De AOW-leeftijd verhogen", "De dekkingsgraad van pensioenfondsen verhogen", "Pensioenfondsen meer laten beleggen in aandelen", "Het bedrijfspensioen welvaartsvast maken"],
            u: "Met een hogere AOW-leeftijd zijn er minder uitkeringen en meer premiebetalers. Dekkingsgraad en beleggen horen bij het kapitaaldekkingsstelsel." },
          { q: "Waarom is een zzp'er extra kwetsbaar als hij met pensioen gaat?",
            a: ["Hij bouwt geen verplicht bedrijfspensioen op", "Hij krijgt geen AOW-uitkering", "Hij moet dubbele AOW-premie betalen", "Zijn pensioen wordt nooit geïndexeerd"],
            u: "Een zzp'er krijgt wel AOW, maar heeft geen werkgever en dus geen verplicht pensioenfonds. Spaart hij niet zelf, dan heeft hij later alleen de AOW." },
          { q: "De inflatie is 4%. Een pensioenfonds met een dekkingsgraad van 98% indexeert niet. Wat gebeurt er met de koopkracht van de gepensioneerden?",
            a: ["Die daalt met ongeveer 4%", "Die blijft gelijk", "Die stijgt met ongeveer 4%", "Die daalt met ongeveer 2%"],
            u: "Het pensioen blijft in euro's gelijk, terwijl alles 4% duurder wordt. Vuistregel: 0% − 4% = −4% koopkracht." },
          { q: "Wat bedoelt men met solidariteit tussen generaties bij de AOW?",
            a: ["Werkenden betalen premie voor de AOW van de huidige ouderen", "Ouderen betalen mee aan de studie van jongeren", "Iedereen spaart zelf voor de eigen oude dag", "Pensioenfondsen beleggen voor alle generaties tegelijk"],
            u: "In het omslagstelsel betalen jongeren voor ouderen, in het vertrouwen dat de volgende generatie later voor hen betaalt." }
        ],
        reken: [
          { gen: (R) => {
            const V = R.int(150, 260), L = R.int(160, 240), d = V / L * 100;
            return { q: `Een pensioenfonds heeft een vermogen van € ${V} miljard. De contante waarde van de verplichtingen is € ${L} miljard. Bereken de dekkingsgraad. Rond af op één decimaal.`,
              antwoord: R.rond(d, 1), eenheid: "%", tol: 0.06, hint: "Dekkingsgraad = vermogen / verplichtingen × 100%.",
              stappen: [`${V} / ${L} × 100% = ${R.nl(R.rond(d, 1), 1)}%`, d < 100 ? "Onder de 100%: het fonds heeft een tekort." : "Boven de 100%: het fonds heeft genoeg voor alle toekomstige uitkeringen."] };
          } },
          { gen: (R) => {
            const oud = R.int(30, 50) / 10, mid = R.int(95, 110) / 10, g = oud / mid * 100;
            return { q: `In een land zijn ${R.nl(oud)} miljoen mensen van 65 jaar of ouder en ${R.nl(mid)} miljoen mensen van 20 tot 65 jaar. Bereken de grijze druk. Rond af op één decimaal.`,
              antwoord: R.rond(g, 1), eenheid: "%", tol: 0.06, hint: "Grijze druk = 65+ / (20 tot 65) × 100%.",
              stappen: [`${R.nl(oud)} / ${R.nl(mid)} × 100% = ${R.nl(R.rond(g, 1), 1)}%`] };
          } },
          { q: "In een land krijgen 3,6 miljoen mensen een AOW-uitkering van € 15.000 per jaar. Er zijn 9 miljoen premiebetalers. Hoeveel premie moet elke premiebetaler per jaar betalen als de AOW volledig uit premies komt?",
            antwoord: 6000, eenheid: "euro", tol: 1, hint: "Bij het omslagstelsel geldt: totale premies = totale uitkeringen.",
            stappen: ["Totale uitkeringen: 3,6 miljoen × € 15.000 = € 54 miljard", "Premie per betaler: € 54 miljard / 9 miljoen = € 6.000"] },
          { q: "Een pensioenfonds heeft een vermogen van € 120 miljard en verplichtingen met een contante waarde van € 100 miljard. Door een rentedaling stijgen de verplichtingen met 8%. Bereken de nieuwe dekkingsgraad. Rond af op één decimaal.",
            antwoord: 111.1, eenheid: "%", tol: 0.06, hint: "Bereken eerst de nieuwe verplichtingen.",
            stappen: ["Nieuwe verplichtingen: 100 × 1,08 = € 108 miljard", "Dekkingsgraad: 120 / 108 × 100% = 111,1%", "Eerst was het 120%: de dekkingsgraad is gedaald zonder dat er iets aan het vermogen veranderde."] },
          { q: "Een pensioenfonds heeft verplichtingen met een contante waarde van € 250 miljard. Hoeveel vermogen heeft het nodig voor een dekkingsgraad van 110%?",
            antwoord: 275, eenheid: "miljard euro", tol: 0.1, hint: "Vermogen = dekkingsgraad × verplichtingen.",
            stappen: ["Vermogen = 1,10 × 250 = € 275 miljard"] },
          { q: "Een gepensioneerde krijgt € 1.500 bruto pensioen per maand. De prijzen stijgen met 3% en de lonen met 4%. Hoeveel krijgt hij per maand als het fonds het pensioen welvaartsvast indexeert?",
            antwoord: 1560, eenheid: "euro", tol: 0.5, hint: "Welvaartsvast: mee met de lonen.",
            stappen: ["Welvaartsvast betekent: mee met de loonstijging van 4%.", "1.500 × 1,04 = € 1.560", "Waardevast (mee met de prijzen) zou 1.500 × 1,03 = € 1.545 zijn."] }
        ],
        oefen: [
          { type: "sorteer", q: "Hoort het kenmerk bij het omslagstelsel of bij het kapitaaldekkingsstelsel?", groepen: ["Omslagstelsel", "Kapitaaldekkingsstelsel"],
            items: [["De AOW", 0], ["Een pensioenfonds belegt de premies", 1], ["Gevoelig voor vergrijzing", 0], ["Gevoelig voor de rente en de beurs", 1], ["Er wordt niets gespaard", 0], ["Je kijkt naar de dekkingsgraad", 1]],
            u: "Omslag: van werkenden naar ouderen in hetzelfde jaar. Kapitaaldekking: sparen en beleggen voor jezelf." },
          { type: "volgorde", q: "Zet de oorzaak-gevolgketen in de goede volgorde.",
            items: ["De rente daalt", "De contante waarde van de toekomstige verplichtingen stijgt", "De dekkingsgraad daalt", "Het fonds kan de pensioenen niet indexeren", "De koopkracht van gepensioneerden daalt bij inflatie"],
            u: "Begin bij de rente en eindig bij het gevolg voor de mensen." },
          { type: "invul", q: "Vul aan.",
            tekst: "Een pensioen dat meestijgt met de prijzen is {waardevast}. Een pensioen dat meestijgt met de lonen is {welvaartsvast}. Pensioenen aanpassen aan prijzen of lonen heet {indexeren}.",
            extra: ["korten", "beleggen"],
            u: "Bij welvaartsvast blijven gepensioneerden gelijk oplopen met de werkenden, bij waardevast alleen met de prijzen." }
        ],
        open: [
          { q: "Leg uit waarom de vergrijzing een probleem is voor de AOW, en noem twee maatregelen die de overheid kan nemen.",
            a: "De AOW wordt betaald met het omslagstelsel: de werkenden van nu betalen de uitkeringen van de ouderen van nu. Door vergrijzing stijgt de grijze druk: er komen meer ouderen per werkende. Als de uitkering gelijk blijft, moet elke werkende meer premie betalen. Maatregelen: de AOW-leeftijd verhogen, de premie verhogen, meer belastinggeld bijdragen of de uitkering minder laten stijgen.",
            punten: ["omslagstelsel: werkenden betalen voor ouderen van nu", "grijze druk stijgt: meer ouderen per werkende", "twee passende maatregelen"] },
          { q: "Een pensioenfonds heeft een dekkingsgraad van 95%. Leg uit wat dat betekent en wat de gevolgen kunnen zijn voor werkenden en gepensioneerden.",
            a: "Het fonds heeft maar 95% van het vermogen dat nodig is om alle toekomstige uitkeringen te betalen: er is een tekort. Het fonds zal de pensioenen niet indexeren, waardoor gepensioneerden koopkracht verliezen als de prijzen stijgen. Duurt het tekort lang, dan kan het fonds de pensioenen korten of de premies voor werkenden en werkgevers verhogen.",
            punten: ["vermogen kleiner dan contante waarde van de verplichtingen: tekort", "geen indexatie: koopkrachtverlies", "korten of hogere premies"] }
        ],
        widgets: ["pensioen"]
      }
    ]
  });
})();
