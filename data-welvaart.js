// Hoofdstuk 2 Welvaart (Economie 4 havo, Cumulus): 2.1 Het bbp, 2.2 Belasting, 2.3 Ongelijkheid, 2.4 Internationale handel.
// Eigen oefenstof. Begrippen volgen de openbare begrippenlijst van Cumulus; de uitleg is in eigen woorden.
// Bedragen en tarieven bij belasting zijn verzonnen en rond (zelfde getallen als in de belasting-machine).
(function () {
  "use strict";
  const eur = (x, d) => "€ " + TW.nl(x, d);
  const pct = (x, d) => TW.nl(x, d == null ? 1 : d) + "%";
  // Box 1 met verzonnen tarieven: 36% tot € 40.000, daarboven 50%, algemene heffingskorting € 3.000
  const box1 = (y) => Math.max(0, 0.36 * Math.min(y, 40000) + 0.5 * Math.max(0, y - 40000) - 3000);

  TW.hoofdstuk({
    id: "h2", nr: "Hoofdstuk 2", titel: "Welvaart", icoon: "💶",
    intro: "Hoe meet je hoe rijk een land is, hoe verdeelt de overheid het inkomen via belastingen, hoe ongelijk zijn inkomen en vermogen verdeeld, en hoe verdient Nederland aan het buitenland?",
    onderdelen: [
      // ------------------------------------------------------------------
      // 2.1 Het bbp
      // ------------------------------------------------------------------
      {
        id: "w2-1", nr: "2.1", titel: "Het bbp",
        kern: [
          "Het [[bruto binnenlands product (bbp)]] is de totale [[toegevoegde waarde]] van alle goederen en diensten die in een land in een jaar worden geproduceerd.",
          "Toegevoegde waarde = omzet − kosten van leveringen van derden (grondstoffen, halffabricaten en diensten die een bedrijf van andere bedrijven koopt). Lonen trek je er **niet** van af: die worden juist uit de toegevoegde waarde betaald.",
          { fig: "bedrijfskolom", bij: "In elke schakel van de bedrijfskolom komt er waarde bij. Samen is dat precies de prijs die de consument betaalt." },
          { let: "Tel voor het bbp nooit de omzetten op. In de omzet van de bakker zit het meel al, en in het meel het graan: dan tel je hetzelfde graan meerdere keren (dubbeltelling)." },
          { kop: "Van bbp naar economische groei" },
          "[[Economische groei]] is de procentuele toename van het bbp ten opzichte van een jaar eerder.",
          "Het **nominale** bbp is gemeten in euro's van dat jaar. Stijgen alleen de prijzen, dan stijgt het nominale bbp ook. Daarom corrigeer je voor inflatie: zo krijg je het **reële** bbp.",
          "Wil je iets zeggen over de welvaart van een gemiddelde inwoner, dan deel je ook nog door het aantal inwoners: het [[reëel bbp per hoofd van de bevolking]].",
          { formule: "reëel indexcijfer = nominaal indexcijfer / prijsindexcijfer × 100" },
          { ezel: "Vuistregel bij kleine percentages: % reëel ≈ % nominaal − % inflatie. Per hoofd haal je er daarna ook de bevolkingsgroei vanaf." },
          { widget: "reeel" },
          { kop: "Meten met twee maten" },
          "Het bbp meet alleen wat op de markt een prijs heeft. Het mist de [[informele economie]] (zwart werk, vrijwilligerswerk, zorg voor je eigen kinderen) en het telt [[negatieve externe effecten]] zoals vervuiling niet als kosten mee.",
          "Daarom zijn er bredere maatstaven: de [[Human Development Index (HDI)]] combineert gezondheid, onderwijs en bbp per hoofd; het [[groen bbp]] trekt milieuschade af; [[brede welvaart]] kijkt ook naar vrije tijd, milieu, veiligheid en ongelijkheid, nu, later en elders.",
          { kop: "Structurele groei en conjunctuur" },
          "[[Structurele groei]] is groei van de [[productiecapaciteit]]: wat een land maximaal kan maken. Die groeit door meer of betere productiefactoren, zoals meer werkenden, meer machines, beter onderwijs en nieuwe technieken (de aanbodkant).",
          "[[Conjunctuur]] zijn de schommelingen van het bbp rond die trend op korte termijn, door een stijgende of dalende effectieve vraag (de vraagkant). Bij [[hoogconjunctuur]] dreigt overbesteding, bij [[laagconjunctuur]] onderbesteding.",
          { fig: "conjunctuur", bij: "Het werkelijke bbp golft rond de trendlijn. De trend is de structurele groei, de golf is de conjunctuur." },
          { widget: "bbpbouwer" }
        ],
        begrippen: [
          ["Bruto binnenlands product (bbp)", "De optelsom van alle toegevoegde waarde die in een land in een bepaalde periode (meestal een jaar) wordt gemaakt."],
          ["Toegevoegde waarde", "Omzet van een bedrijf min wat het betaalt aan leveringen van andere bedrijven, zoals grondstoffen, halffabricaten en ingekochte diensten."],
          ["Economische groei", "De stijging van het bbp in procenten vergeleken met het jaar ervoor."],
          ["Reëel inkomen (koopkracht)", "Wat je met je inkomen werkelijk kunt kopen: het inkomen gecorrigeerd voor de prijsstijging."],
          ["Reëel bbp per hoofd van de bevolking", "Het bbp gecorrigeerd voor inflatie en gedeeld door het aantal inwoners. Veelgebruikte maat voor economische groei."],
          ["Indexcijfer", "Verhoudingsgetal dat een waarde vergelijkt met de waarde in een basisjaar (dat op 100 staat)."],
          ["Prijsindexcijfer", "Indexcijfer dat aangeeft hoe de prijzen zijn veranderd ten opzichte van het basisjaar, bijvoorbeeld de consumentenprijsindex (CPI)."],
          ["Human Development Index (HDI)", "Welvaartsmaat die drie dingen combineert: gezondheid (levensverwachting), onderwijs en bbp per hoofd."],
          ["Brede welvaart", "Welvaart in ruime zin: niet alleen wat we consumeren, maar ook vrije tijd, milieu, veiligheid, gezondheid en ongelijkheid."],
          ["Groen bbp", "Het bbp min de schade aan het milieu en plus verbeteringen van het milieu."],
          ["Informele economie", "Productie die niet in het bbp terechtkomt omdat het CBS haar niet meet, zoals zwart werk, vrijwilligerswerk en huishoudelijk werk."],
          ["Negatieve externe effecten", "Nadelen van productie of consumptie voor anderen, waarvoor de veroorzaker niet betaalt, zoals vervuiling of geluidsoverlast."],
          ["Structurele groei", "Groei van de productiecapaciteit van een land op lange termijn (de aanbodkant van de economie)."],
          ["Productiecapaciteit", "De grootste hoeveelheid goederen en diensten die een bedrijf of land in een periode kan maken. Ook: potentiële productie."],
          ["Conjunctuur", "Schommelingen van het bbp op korte termijn, veroorzaakt door een stijgende of dalende effectieve vraag."]
        ],
        vragen: [
          { q: "Een meubelmaker heeft een omzet van € 500.000. Hij koopt voor € 200.000 hout en voor € 30.000 diensten van andere bedrijven in. Hij betaalt € 180.000 aan lonen. Hoe groot is zijn toegevoegde waarde?",
            a: ["€ 270.000", "€ 90.000", "€ 300.000", "€ 500.000"],
            u: "Toegevoegde waarde = omzet − leveringen van derden = 500.000 − 200.000 − 30.000 = € 270.000. Lonen trek je niet af: die betaalt de meubelmaker juist uit zijn toegevoegde waarde." },
          { q: "Waarom telt het CBS voor het bbp de toegevoegde waarde op en niet de omzet van alle bedrijven?",
            a: ["Om dubbeltellingen te voorkomen", "Omdat de omzet inclusief btw is", "Omdat omzet niet goed te meten is", "Om de inflatie eruit te halen"],
            u: "In de omzet van elk bedrijf zitten de producten van de bedrijven eerder in de bedrijfskolom. Tel je omzetten op, dan tel je die meerdere keren." },
          { q: "Het nominale bbp stijgt met 5%. De prijzen stijgen met 3% en de bevolking groeit met 1%. Wat gebeurt er ongeveer met het reële bbp per hoofd?",
            a: ["Het stijgt met ongeveer 1%", "Het stijgt met ongeveer 2%", "Het stijgt met ongeveer 4%", "Het daalt met ongeveer 1%"],
            u: "Vuistregel: 5% − 3% = 2% reële groei. Per hoofd: 2% − 1% = 1%." },
          { q: "In een jaar is het nominale indexcijfer van het loon 104 en het prijsindexcijfer 106 (vorig jaar = 100). Wat is er met de koopkracht gebeurd?",
            a: ["Die is met ongeveer 1,9% gedaald", "Die is met ongeveer 2% gestegen", "Die is gelijk gebleven", "Die is met ongeveer 10% gestegen"],
            u: "Reëel indexcijfer = 104 / 106 × 100 = 98,1. De koopkracht is dus met 1,9% gedaald: de prijzen stegen harder dan het loon." },
          { q: "Welke activiteit telt **niet** mee in het bbp?",
            a: ["Een vader die zelf zijn badkamer betegelt", "Een tegelzetter die een badkamer betegelt", "Een bouwbedrijf dat een school bouwt", "Een gemeente die een park laat onderhouden"],
            u: "Wat je zelf in huis doet heeft geen marktprijs en wordt niet gemeten: het hoort bij de informele economie. De andere drie zijn betaalde productie." },
          { q: "Een fabriek produceert meer en loost daarbij meer afvalwater in een rivier. Wat gebeurt er met het bbp en met het groen bbp?",
            a: ["Het bbp stijgt, het groen bbp stijgt minder of daalt", "Het bbp en het groen bbp stijgen precies evenveel", "Het bbp daalt, het groen bbp blijft gelijk", "Het bbp blijft gelijk, het groen bbp stijgt"],
            u: "De extra productie verhoogt het bbp. Bij het groen bbp gaat de milieuschade er weer af, dus dat stijgt minder of daalt zelfs. Vervuiling is een negatief extern effect." },
          { q: "Land A heeft een hoger bbp per hoofd dan land B, maar scoort lager op de HDI. Hoe kan dat?",
            a: ["Land A scoort slechter op gezondheid of onderwijs", "Land A heeft een grotere bevolking dan land B", "Land A heeft een hogere inflatie dan land B", "Land A heeft een kleinere informele economie"],
            u: "De HDI kijkt naast het bbp per hoofd ook naar levensverwachting en onderwijs. Scoort A daar slecht, dan kan de HDI lager uitvallen." },
          { q: "De regering investeert veel in beter beroepsonderwijs. Op welke manier draagt dat vooral bij aan groei?",
            a: ["Het vergroot de productiecapaciteit: structurele groei", "Het vergroot de effectieve vraag: hoogconjunctuur", "Het verkleint de productiecapaciteit: laagconjunctuur", "Het verkleint de informele economie: groen bbp"],
            u: "Beter opgeleide werknemers zijn productiever. De productiecapaciteit groeit: dat is structurele groei aan de aanbodkant." },
          { q: "Bekijk de figuur. Wat laat lijn 1 zien en wat is er aan de hand bij punt B?", fig: "conjunctuur",
            a: ["Lijn 1 is de trend; bij B is het laagconjunctuur", "Lijn 1 is het werkelijke bbp; bij B is het hoogconjunctuur", "Lijn 1 is de trend; bij B is het hoogconjunctuur", "Lijn 1 is het werkelijke bbp; bij B is het laagconjunctuur"],
            u: "De rechte, stijgende lijn is de trend (structurele groei). Bij B ligt het werkelijke bbp onder de trend: laagconjunctuur, met kans op onderbesteding." },
          { q: "Bij hoogconjunctuur kan de effectieve vraag groter worden dan de productiecapaciteit. Hoe heet die situatie?",
            a: ["Overbesteding", "Onderbesteding", "Structurele groei", "Bestedingsevenwicht"],
            u: "Wordt er meer gevraagd dan het land kan maken, dan is er overbesteding. Gevolg: prijzen stijgen (bestedingsinflatie)." },
          { q: "Het bbp van een land is in vijf jaar van 800 naar 920 miljard gestegen. Wat is het indexcijfer van het bbp in het laatste jaar, als het eerste jaar het basisjaar is?",
            a: ["115", "120", "87", "15"],
            u: "920 / 800 × 100 = 115. Het basisjaar staat altijd op 100; een stijging van 15% geeft indexcijfer 115." }
        ],
        reken: [
          { q: "Een bakkerij heeft een omzet van € 900.000. Ze koopt voor € 320.000 meel en andere grondstoffen in, betaalt € 60.000 aan energie en schoonmaak door andere bedrijven en € 350.000 aan lonen. Bereken de toegevoegde waarde.",
            antwoord: 520000, eenheid: "euro", tol: 1, hint: "Trek alleen de leveringen van derden af, niet de lonen.",
            stappen: ["Leveringen van derden: 320.000 + 60.000 = € 380.000", "Toegevoegde waarde: 900.000 − 380.000 = € 520.000", "De lonen (€ 350.000) worden uit die toegevoegde waarde betaald."] },
          { gen: (R) => {
            const a = R.int(20, 70) / 10, b = R.int(10, 60) / 10, r = (100 + a) / (100 + b) * 100;
            return { q: `Het nominale bbp stijgt met ${R.nl(a)}%, de prijzen stijgen met ${R.nl(b)}%. Bereken met indexcijfers het indexcijfer van het reële bbp (vorig jaar = 100). Rond af op één decimaal.`,
              antwoord: R.rond(r, 1), tol: 0.06, hint: "Reëel indexcijfer = nominaal indexcijfer / prijsindexcijfer × 100.",
              stappen: [`Nominaal indexcijfer: ${R.nl(100 + a)}. Prijsindexcijfer: ${R.nl(100 + b)}.`, `${R.nl(100 + a)} / ${R.nl(100 + b)} × 100 = ${R.nl(R.rond(r, 1), 1)}`, `Het reële bbp is dus met ${R.nl(R.rond(r - 100, 1), 1)}% veranderd.`] };
          } },
          { gen: (R) => {
            const bbp = R.int(30, 120) * 10, inw = R.kies([8, 10, 12, 16, 20, 25, 40]), ph = bbp * 1000 / inw;
            return { q: `Een land heeft een bbp van € ${R.nl(bbp)} miljard en ${inw} miljoen inwoners. Bereken het bbp per hoofd van de bevolking in euro's.`,
              antwoord: R.rond(ph, 0), eenheid: "euro", tol: 1, hint: "Miljard gedeeld door miljoen geeft duizend: reken eerst om naar hele getallen.",
              stappen: [`€ ${R.nl(bbp)} miljard = € ${R.nl(bbp * 1000)} miljoen`, `€ ${R.nl(bbp * 1000)} miljoen / ${inw} miljoen inwoners = € ${R.nl(R.rond(ph, 0))} per inwoner`] };
          } },
          { gen: (R) => {
            const g = R.int(30, 80) / 10, b = R.int(10, 40) / 10, c = R.int(2, 10) / 10, u = R.rond(g - b - c, 1);
            return { q: `Het nominale bbp groeit met ${R.nl(g)}%, de inflatie is ${R.nl(b)}% en de bevolking groeit met ${R.nl(c)}%. Bereken met de vuistregel de groei van het reële bbp per hoofd. Een daling noteer je met een min.`,
              antwoord: u, eenheid: "%", tol: 0.051, hint: "Eerst de inflatie eraf, daarna de bevolkingsgroei.",
              stappen: [`Reëel bbp: ${R.nl(g)}% − ${R.nl(b)}% = ${R.nl(R.rond(g - b, 1))}%`, `Per hoofd: ${R.nl(R.rond(g - b, 1))}% − ${R.nl(c)}% = ${R.nl(u)}%`] };
          } },
          { q: "Het nominale bbp van een land heeft in 2024 indexcijfer 124 (2020 = 100). Het prijsindexcijfer is in 2024 112. Met hoeveel procent is het reële bbp tussen 2020 en 2024 gestegen? Rond af op één decimaal.",
            antwoord: 10.7, eenheid: "%", tol: 0.06, hint: "Bereken eerst het reële indexcijfer.",
            stappen: ["Reëel indexcijfer = 124 / 112 × 100 = 110,7", "Het reële bbp is dus met 10,7% gestegen.", "De vuistregel (24 − 12 = 12%) zit er hier flink naast, omdat de percentages groot zijn."] }
        ],
        oefen: [
          { type: "sorteer", q: "Telt het mee in het bbp?", groepen: ["Telt mee", "Telt niet mee"],
            items: [["Een kapper knipt een klant", 0], ["Een oma past op haar kleinkinderen", 1], ["Een schilder werkt zwart en geeft het niet op", 1], ["Een ziekenhuis opereert een patiënt", 0], ["Je kookt thuis voor je huisgenoten", 1], ["Een boer verkoopt melk aan een zuivelfabriek", 0]],
            u: "Het bbp meet productie die het CBS kan zien. Onbetaald werk thuis, vrijwilligerswerk en zwart werk vallen erbuiten: dat is de informele economie." },
          { type: "koppel", q: "Koppel de maatstaf aan wat hij meet.",
            paren: [["Nominaal bbp", "productie in euro's van dat jaar"], ["Reëel bbp", "productie gecorrigeerd voor inflatie"], ["Reëel bbp per hoofd", "productie per inwoner, zonder prijseffect"], ["HDI", "gezondheid, onderwijs en inkomen samen"], ["Groen bbp", "bbp min milieuschade"]],
            u: "Hoe meer je corrigeert, hoe beter de maat iets zegt over de welvaart van een gemiddelde inwoner." },
          { type: "invul", q: "Vul de zinnen aan.",
            tekst: "Groei van de productiecapaciteit heet {structurele groei}. Schommelingen van het bbp rond de trend heten {conjunctuur}. Als de effectieve vraag groter is dan de productiecapaciteit, is er {overbesteding}.",
            extra: ["onderbesteding", "inflatie", "economische groei"],
            u: "Structurele groei hoort bij de aanbodkant (lange termijn), conjunctuur bij de vraagkant (korte termijn)." }
        ],
        open: [
          { q: "Een krant schrijft: “Het bbp steeg dit jaar met 4%, dus we zijn allemaal 4% rijker geworden.” Geef twee redenen waarom dat niet hoeft te kloppen.",
            a: "Ten eerste kan een deel van de stijging komen door hogere prijzen: het reële bbp stijgt minder dan het nominale. Ten tweede kan de bevolking gegroeid zijn, zodat het bbp per hoofd minder stijgt. Daarnaast meet het bbp geen vrije tijd, milieuschade of de verdeling van het inkomen: brede welvaart kan dalen terwijl het bbp stijgt.",
            punten: ["inflatie: nominaal tegenover reëel", "bevolkingsgroei: per hoofd", "bbp meet geen brede welvaart of verdeling"] },
          { q: "Leg uit wat het verschil is tussen structurele groei en conjunctuur. Noem bij elk een oorzaak.",
            a: "Structurele groei is de groei van de productiecapaciteit op lange termijn, bijvoorbeeld door meer machines, beter onderwijs of nieuwe technieken. Conjunctuur zijn de schommelingen van het bbp rond die trend op korte termijn, bijvoorbeeld doordat consumenten in een crisis minder gaan besteden, zodat de effectieve vraag daalt.",
            punten: ["structureel: productiecapaciteit, lange termijn, aanbodkant", "conjunctuur: effectieve vraag, korte termijn, vraagkant", "bij elk een passende oorzaak"] }
        ],
        widgets: ["reeel", "bbpbouwer"]
      },

      // ------------------------------------------------------------------
      // 2.2 Belasting
      // ------------------------------------------------------------------
      {
        id: "w2-2", nr: "2.2", titel: "Belasting",
        kern: [
          "Een [[directe belasting]] betaal je zelf rechtstreeks aan de overheid, zoals de [[inkomstenbelasting]]. Een [[indirecte belasting]] betaal je via een ondernemer, die haar in de prijs verwerkt: [[btw]] (een percentage van de prijs) en [[accijns]] (een vast bedrag per liter of pakje, op alcohol, tabak en brandstof).",
          { tip: "Alle tarieven en bedragen in deze app zijn verzonnen en rond: schijf 1 is 36% tot € 40.000, daarboven 50%, de heffingskorting is € 3.000. De echte cijfers veranderen elk jaar. Op de toets krijg je ze in de opgave." },
          { kop: "Het boxenstelsel" },
          "De inkomstenbelasting kent drie boxen: [[box 1]] voor inkomen uit werk en woning, [[box 2]] voor inkomen uit een aanmerkelijk belang (een groot aandeel in een eigen bv) en [[box 3]] voor sparen en beleggen.",
          { formule: "belastbaar inkomen box 1 = brutoloon − aftrekposten + bijtellingen" },
          "Een [[aftrekpost]] verlaagt je belastbaar inkomen, bijvoorbeeld de [[hypotheekrenteaftrek]]. Een [[fiscale bijtelling]] verhoogt het, zonder dat je meer loon krijgt: het [[eigenwoningforfait]] voor een koophuis en de bijtelling voor een auto van de zaak.",
          "Over het belastbaar inkomen reken je per schijf belasting uit. Daarna gaat de [[heffingskorting]] eraf: een korting op het belastingbedrag zelf.",
          { fig: "schijven", bij: "Elke schijf heeft een eigen tarief. Alleen het deel boven € 40.000 valt in het hoge tarief." },
          { kop: "Gemiddeld en marginaal" },
          "De [[gemiddelde belastingdruk]] = betaalde belasting / inkomen × 100%. De [[marginale belastingdruk]] is het tarief over een extra verdiende euro: het tarief van de schijf waar die euro in valt.",
          "Bij een [[progressief belastingtarief]] stijgt de gemiddelde druk als het inkomen stijgt, bij een [[proportioneel belastingtarief]] blijft hij gelijk (een [[vlaktaks]]) en bij een [[degressief belastingtarief]] daalt hij.",
          { let: "Progressief gaat over het percentage, niet over het bedrag. Ook bij een vlaktaks betaalt een hoog inkomen meer euro's. En: een vlaktaks mét een heffingskorting voor iedereen is progressief, want de korting is voor een laag inkomen een groter deel." },
          { fig: "drukstelsels", bij: "Gemiddelde belastingdruk bij drie soorten tarieven." },
          "Een aftrekpost levert meer op naarmate je inkomen hoger is: hij valt dan in een hogere schijf. Daarom beperkt de overheid het voordeel met de [[tariefsaanpassing aftrekposten]].",
          { kop: "Box 3" },
          "In box 3 betaal je belasting over je [[vermogen]] (bezittingen − schulden). Een deel is vrijgesteld: het [[heffingsvrij vermogen]]. Over de rest, het [[belastbaar vermogen]], rekent de Belastingdienst met een **forfaitair** (aangenomen) rendement, niet met wat je echt hebt verdiend.",
          { voorbeeld: { titel: "Box 3 met verzonnen getallen", stappen: ["Spaargeld € 90.000 + aandelen € 60.000 − schuld € 0 = vermogen € 150.000", "Heffingsvrij vermogen € 50.000: belastbaar vermogen € 100.000", "Forfaitair rendement 4% × € 100.000 = € 4.000", "Belasting: 30% × € 4.000 = € 1.200"] } },
          { widget: "belasting" }
        ],
        begrippen: [
          ["Indirecte belasting", "Belasting die je via een ondernemer betaalt omdat ze in de prijs zit, zoals btw en accijns."],
          ["Btw", "Indirecte belasting op de verkoop van goederen en diensten: een percentage van de prijs."],
          ["Inkomstenbelasting", "Directe belasting over je inkomen, verdeeld over drie boxen."],
          ["Box 1", "Deel van de inkomstenbelasting voor inkomen uit werk en woning, met schijven."],
          ["Box 3", "Deel van de inkomstenbelasting voor inkomen uit sparen en beleggen, berekend met een forfaitair rendement."],
          ["Belastbaar inkomen", "Brutoloon min aftrekposten plus bijtellingen: het bedrag waarover je in box 1 belasting betaalt."],
          ["Aftrekpost", "Bedrag dat je in box 1 van je inkomen mag aftrekken, zoals de hypotheekrente."],
          ["Fiscale bijtelling", "Bedrag dat je in box 1 bij je inkomen moet optellen, zoals het eigenwoningforfait of de bijtelling voor een auto van de zaak."],
          ["Heffingskorting", "Korting op de belasting die je in box 1 moet betalen."],
          ["Gemiddelde belastingdruk", "Het deel van je hele inkomen dat je aan belasting betaalt, in procenten."],
          ["Marginale belastingdruk", "Het percentage belasting over een extra verdiende euro."],
          ["Progressief belastingtarief", "Tarief waarbij de gemiddelde belastingdruk stijgt als het inkomen stijgt."],
          ["Vlaktaks", "Eén tarief voor elke euro inkomen: proportioneel, iedereen betaalt hetzelfde percentage."],
          ["Belastbaar vermogen", "Bezittingen min schulden min het heffingsvrij vermogen: de basis voor box 3."],
          ["Tariefsaanpassing aftrekposten", "Beperking van het belastingvoordeel van aftrekposten die in de hoogste schijf vallen."]
        ],
        vragen: [
          { q: "Je verdient € 50.000 en krijgt € 2.000 bruto opslag. Hoeveel belasting betaal je over die opslag (schijf 1: 36% tot € 40.000, daarboven 50%)?",
            a: ["€ 1.000", "€ 720", "€ 656", "€ 2.000"],
            u: "De opslag valt helemaal in schijf 2. Je marginale druk is 50%: 0,5 × 2.000 = € 1.000." },
          { q: "Wat is het verschil tussen een aftrekpost en een heffingskorting?",
            a: ["Een aftrekpost verlaagt het inkomen, een heffingskorting het belastingbedrag", "Een aftrekpost verlaagt het belastingbedrag, een heffingskorting het inkomen", "Een aftrekpost geldt in box 3, een heffingskorting in box 1", "Er is geen verschil: beide verlagen het brutoloon"],
            u: "Een aftrekpost gaat van het inkomen af, vóór je de belasting per schijf uitrekent. De heffingskorting gaat pas daarna van de belasting zelf af." },
          { q: "Twee mensen trekken allebei € 10.000 hypotheekrente af. Anna verdient € 30.000, Bart € 90.000. Wie heeft er het meeste voordeel van en waarom?",
            a: ["Bart, want de aftrek valt bij hem in de 50%-schijf", "Anna, want € 10.000 is voor haar relatief veel", "Allebei evenveel, want de aftrek is even groot", "Anna, want zij betaalt minder belasting"],
            u: "Bij Bart scheelt het 50% × 10.000 = € 5.000, bij Anna 36% × 10.000 = € 3.600. Aftrekposten werken daardoor denivellerend." },
          { q: "Een werknemer krijgt een auto van de zaak met een bijtelling van € 5.000 per jaar. Wat gebeurt er?",
            a: ["Zijn belastbaar inkomen stijgt, dus hij betaalt meer belasting", "Zijn brutoloon stijgt met € 5.000 per jaar", "Hij krijgt € 5.000 belasting terug", "Zijn heffingskorting stijgt met € 5.000"],
            u: "Een bijtelling telt mee als inkomen voor de belasting, omdat hij privé voordeel heeft van de auto. Hij krijgt er geen euro loon bij." },
          { q: "Een land voert een vlaktaks van 40% in, plus een heffingskorting van € 3.000 voor iedereen. Wat voor tarief is dit?",
            a: ["Progressief", "Proportioneel", "Degressief", "Regressief"],
            u: "De korting is voor lage inkomens een groter deel van hun inkomen. De gemiddelde druk stijgt dus met het inkomen: progressief." },
          { q: "Bekijk de figuur. Welke lijn hoort bij een degressief tarief?", fig: "drukstelsels",
            a: ["Lijn C", "Lijn A", "Lijn B", "Lijn A en lijn B"],
            u: "Bij een degressief tarief daalt de gemiddelde belastingdruk als het inkomen stijgt. Dat is de dalende lijn C. A stijgt (progressief), B is vlak (proportioneel)." },
          { q: "Waarom is btw een indirecte belasting?",
            a: ["De consument betaalt haar via de ondernemer die haar afdraagt", "Ze wordt alleen over luxe producten geheven", "Ze hangt af van het inkomen van de koper", "De consument betaalt haar zelf rechtstreeks aan de overheid"],
            u: "De winkel draagt de btw af aan de Belastingdienst. Jij betaalt haar indirect, omdat ze in de prijs zit." },
          { q: "In box 3 rekent de Belastingdienst met een forfaitair rendement van 4%. Je spaargeld levert in werkelijkheid 1% rente op. Wat is het gevolg?",
            a: ["Je betaalt belasting over meer rendement dan je echt hebt", "Je betaalt belasting over 1% rendement", "Je betaalt geen belasting in box 3", "Je krijgt het verschil terug als toeslag"],
            u: "Forfaitair betekent: aangenomen. Je betaalt over 4%, ook al verdien je maar 1%. Daarom is box 3 met alleen spaargeld vaak oneerlijk genoemd." },
          { q: "Iemand heeft een gemiddelde belastingdruk van 30% en een marginale druk van 50%. Wat betekent dat?",
            a: ["Van een extra euro gaat 50 cent naar belasting", "Van elke euro gaat 50 cent naar belasting", "Van een extra euro gaat 30 cent naar belasting", "Hij betaalt 80% belasting over zijn inkomen"],
            u: "De gemiddelde druk geldt voor het hele inkomen, de marginale druk voor de laatste (of volgende) euro." },
          { q: "Welke maatregel werkt **nivellerend**?",
            a: ["De heffingskorting verhogen voor iedereen", "Het tarief van de hoogste schijf verlagen", "De hypotheekrenteaftrek in alle schijven laten", "Overstappen op een degressief tarief"],
            u: "Een vast bedrag aan korting is voor lage inkomens relatief meer waard. De relatieve inkomensverschillen na belasting worden kleiner: nivelleren." }
        ],
        reken: [
          { gen: (R) => {
            const y = R.int(25, 95) * 1000, s1 = 0.36 * Math.min(y, 40000), s2 = 0.5 * Math.max(0, y - 40000), b = box1(y);
            return { q: `Bereken de inkomstenbelasting in box 1 bij een belastbaar inkomen van ${eur(y)}. Verzonnen tarieven: 36% tot € 40.000, 50% daarboven, heffingskorting € 3.000.`,
              antwoord: b, eenheid: "euro", tol: 1, hint: "Reken per schijf, tel op en trek daarna de heffingskorting af.",
              stappen: [`Schijf 1: 36% × ${eur(Math.min(y, 40000))} = ${eur(s1)}`, `Schijf 2: 50% × ${eur(Math.max(0, y - 40000))} = ${eur(s2)}`, `Samen ${eur(s1 + s2)} − heffingskorting € 3.000 = ${eur(b)}`] };
          } },
          { q: "Mila verdient € 62.000 bruto. Ze trekt € 9.000 hypotheekrente af en moet € 2.500 eigenwoningforfait bijtellen. Bereken haar inkomstenbelasting in box 1 (36% tot € 40.000, 50% daarboven, heffingskorting € 3.000).",
            antwoord: 19150, eenheid: "euro", tol: 1, hint: "Bereken eerst het belastbaar inkomen: brutoloon − aftrekposten + bijtellingen.",
            stappen: ["Belastbaar inkomen: 62.000 − 9.000 + 2.500 = € 55.500", "Schijf 1: 0,36 × 40.000 = € 14.400", "Schijf 2: 0,50 × 15.500 = € 7.750", "14.400 + 7.750 − 3.000 = € 19.150"] },
          { gen: (R) => {
            const y = R.int(20, 60) * 2000, b = box1(y), g = b / y * 100;
            return { q: `Iemand heeft een inkomen van ${eur(y)} en betaalt in box 1 ${eur(b)} belasting (zonder aftrekposten). Bereken de gemiddelde belastingdruk. Rond af op één decimaal.`,
              antwoord: R.rond(g, 1), eenheid: "%", tol: 0.06, hint: "Gemiddelde druk = belasting / inkomen × 100%.",
              stappen: [`${eur(b)} / ${eur(y)} × 100% = ${pct(R.rond(g, 1))}`, `De marginale druk is ${y > 40000 ? "50%" : "36%"}: dat is het tarief van de schijf waarin de laatste euro valt.`] };
          } },
          { q: "Daan heeft € 130.000 spaargeld en € 70.000 aan aandelen. Hij heeft een studieschuld van € 20.000. Bereken zijn belasting in box 3 met deze verzonnen regels: heffingsvrij vermogen € 50.000, forfaitair rendement 4%, tarief 30%.",
            antwoord: 1560, eenheid: "euro", tol: 1, hint: "Vermogen = bezittingen − schulden. Haal daarna het heffingsvrij vermogen eraf.",
            stappen: ["Vermogen: 130.000 + 70.000 − 20.000 = € 180.000", "Belastbaar vermogen: 180.000 − 50.000 = € 130.000", "Forfaitair rendement: 4% × 130.000 = € 5.200", "Belasting: 30% × 5.200 = € 1.560"] },
          { gen: (R) => {
            const e = R.int(16, 250), inc = R.rond(e * 1.21, 2);
            return { q: `Een paar schoenen kost ${eur(inc, 2)} inclusief 21% btw. Hoeveel euro btw zit er in die prijs?`,
              antwoord: R.rond(e * 0.21, 2), eenheid: "euro", tol: 0.011, hint: "De prijs inclusief btw is 121%. Reken eerst uit wat 1% is.",
              stappen: [`${eur(inc, 2)} = 121% van de prijs zonder btw`, `Prijs zonder btw: ${eur(inc, 2)} / 1,21 = ${eur(e, 2)}`, `Btw: ${eur(inc, 2)} − ${eur(e, 2)} = ${eur(R.rond(e * 0.21, 2), 2)}`] };
          } },
          { q: "Lars verdient € 70.000. Hoeveel minder belasting betaalt hij als hij € 8.000 hypotheekrente mag aftrekken (zonder tariefsaanpassing; schijf 1 is 36% tot € 40.000, daarboven 50%)?",
            antwoord: 4000, eenheid: "euro", tol: 1, hint: "In welke schijf valt de aftrekpost?",
            stappen: ["Zonder aftrek: belastbaar € 70.000, met aftrek € 62.000.", "Beide bedragen liggen boven € 40.000: de aftrek haalt € 8.000 uit schijf 2.", "Voordeel: 50% × 8.000 = € 4.000"] }
        ],
        oefen: [
          { type: "sorteer", q: "Aftrekpost of bijtelling?", groepen: ["Aftrekpost (verlaagt belastbaar inkomen)", "Bijtelling (verhoogt belastbaar inkomen)"],
            items: [["Hypotheekrente", 0], ["Eigenwoningforfait", 1], ["Privégebruik van een auto van de zaak", 1], ["Giften aan een goed doel", 0], ["Hoge zorgkosten", 0]],
            u: "Aftrekposten gaan van je inkomen af; bijtellingen zijn een voordeel dat je als inkomen moet meetellen." },
          { type: "volgorde", q: "Zet de stappen voor de berekening van box 1 in de goede volgorde.",
            items: ["Begin bij het brutoloon", "Trek de aftrekposten af en tel de bijtellingen op", "Verdeel het belastbaar inkomen over de schijven", "Reken per schijf de belasting uit en tel op", "Trek de heffingskorting af"],
            u: "Eerst het belastbaar inkomen, dan per schijf, en pas helemaal aan het eind de heffingskorting." },
          { type: "koppel", q: "Koppel het soort tarief aan wat er met de gemiddelde belastingdruk gebeurt als het inkomen stijgt.",
            paren: [["Progressief", "de gemiddelde druk stijgt"], ["Proportioneel", "de gemiddelde druk blijft gelijk"], ["Degressief", "de gemiddelde druk daalt"]],
            u: "Kijk altijd naar het percentage van het inkomen, niet naar het bedrag." }
        ],
        open: [
          { q: "Leg uit waarom aftrekposten zoals de hypotheekrenteaftrek denivellerend werken, en hoe de tariefsaanpassing aftrekposten dat tegengaat.",
            a: "Een aftrekpost verlaagt het belastbaar inkomen. Bij een hoog inkomen valt de aftrek in de schijf met het hoogste tarief, dus scheelt dezelfde aftrek meer belasting dan bij een laag inkomen. Hoge inkomens houden er relatief meer aan over: de relatieve inkomensverschillen worden groter. De tariefsaanpassing zorgt dat aftrekposten in de hoogste schijf maar tegen een lager tarief worden verrekend, zodat het voordeel voor hoge inkomens kleiner wordt.",
            punten: ["aftrek valt bij hoog inkomen in hogere schijf", "dus groter voordeel voor hoge inkomens: denivellerend", "tariefsaanpassing: aftrek in hoogste schijf tegen lager tarief"] },
          { q: "Box 3 rekent met een forfaitair rendement. Leg uit waarom iemand met alleen spaargeld dat oneerlijk kan vinden, terwijl iemand met veel aandelen er voordeel van kan hebben.",
            a: "Bij een lage spaarrente verdient de spaarder minder dan het forfaitaire rendement, maar hij betaalt belasting alsof hij het forfaitaire rendement haalt. Een belegger die in een goed beursjaar veel meer verdient, betaalt maar over het forfaitaire rendement. Hij betaalt dus relatief weinig over zijn echte rendement.",
            punten: ["forfaitair = aangenomen rendement, niet werkelijk", "spaarder: werkelijk < forfaitair, dus te veel belasting", "belegger: werkelijk > forfaitair, dus relatief weinig belasting"] }
        ],
        widgets: ["belasting"]
      },

      // ------------------------------------------------------------------
      // 2.3 Ongelijkheid
      // ------------------------------------------------------------------
      {
        id: "w2-3", nr: "2.3", titel: "Ongelijkheid",
        kern: [
          "De [[personele inkomensverdeling]] laat zien hoe het inkomen over personen of huishoudens verdeeld is. (De categoriale verdeling gaat over de soort inkomen: loon, rente, huur, pacht en winst.)",
          "Je [[primair inkomen]] verdien je met een tegenprestatie: loon, rente, huur, pacht of winst. De [[primaire inkomensverdeling]] is de verdeling vóór de overheid ingrijpt.",
          { formule: "secundair inkomen = primair inkomen − belastingen en premies + uitkeringen en toeslagen" },
          "Uitkeringen en toeslagen zijn [[overdrachtsinkomen (inkomensoverdrachten)]]: inkomen zonder tegenprestatie. De [[secundaire inkomensverdeling]] is de verdeling na het ingrijpen van de overheid.",
          "Worden de relatieve inkomensverschillen door overheidsbeleid kleiner, dan heet dat [[nivelleren]]; worden ze groter, dan is het [[denivelleren]].",
          { let: "Nivelleren gaat over relatieve verschillen. Stijgt een inkomen van € 20.000 naar € 22.000 en een van € 80.000 naar € 86.000, dan is het verschil in euro's groter geworden, maar de verhouding gaat van 4 naar 3,9: dat is nivelleren." },
          { kop: "De Lorenzcurve" },
          "Een [[Lorenzcurve]] zet het cumulatieve percentage personen (van arm naar rijk) uit tegen het cumulatieve percentage inkomen. Hoe verder de curve van de diagonaal (volkomen gelijke verdeling) afbuigt, hoe ongelijker.",
          { voorbeeld: { titel: "van tabel naar curve", stappen: ["Zet de groepen op volgorde van laag naar hoog inkomen, elk 20% van de personen (een [[kwintiel]]).", "Reken het aandeel van elke groep in het totale inkomen uit: bijvoorbeeld 5%, 10%, 15%, 25% en 45%.", "Tel de aandelen op (cumulatief): 5%, 15%, 30%, 55%, 100%.", "Zet de punten (20, 5), (40, 15), (60, 30), (80, 55) en (100, 100) in de grafiek en verbind ze."] } },
          { fig: "lorenz_vb", bij: "De armste 40% verdient samen 15% van het inkomen; de rijkste 20% verdient 100% − 55% = 45%." },
          "Ongelijkheid kun je ook in één getal vangen: met een [[percentielenratio]] (bijvoorbeeld het inkomen van de top-20% gedeeld door dat van de onderste 20%) of met de [[GINI-coëfficiënt]] tussen 0 (volkomen gelijk) en 1 (één persoon heeft alles).",
          { widget: "lorenz" },
          { kop: "Vermogen" },
          "[[Vermogen]] = bezittingen − schulden. De [[vermogensverdeling]] is in Nederland veel schever dan de inkomensverdeling: veel huishoudens hebben weinig of zelfs een negatief vermogen, een kleine groep heeft heel veel. Vermogen levert ook weer inkomen op (rente, dividend, huur), waardoor verschillen kunnen groeien.",
          { tip: "Mag het iets (on)gelijker? Voor meer gelijkheid: rechtvaardigheid, solidariteit en minder spanning in de samenleving. Voor meer ongelijkheid: wie harder werkt of meer risico neemt, moet daar meer aan overhouden (prikkels). Bij een open vraag noem je een argument en leg je het verband uit." }
        ],
        begrippen: [
          ["Personele inkomensverdeling", "De verdeling van het inkomen over personen of huishoudens."],
          ["Categoriale inkomensverdeling", "De verdeling van het inkomen over loon, rente, huur, pacht en winst."],
          ["Primair inkomen", "Inkomen waarvoor je iets levert: loon, rente, huur, pacht of winst."],
          ["Secundair inkomen", "Primair inkomen min belastingen en premies plus uitkeringen en toeslagen."],
          ["Primaire inkomensverdeling", "De verdeling van de primaire inkomens, dus vóór het ingrijpen van de overheid."],
          ["Secundaire inkomensverdeling", "De verdeling van de inkomens nadat de overheid belasting heeft geheven en uitkeringen en toeslagen heeft betaald."],
          ["Overdrachtsinkomen (inkomensoverdrachten)", "Inkomen zonder tegenprestatie, zoals een uitkering, toeslag of kinderbijslag."],
          ["Nivelleren", "Overheidsbeleid waardoor de relatieve verschillen tussen hoge en lage inkomens kleiner worden."],
          ["Denivelleren", "Overheidsbeleid waardoor de relatieve verschillen tussen hoge en lage inkomens groter worden."],
          ["Lorenzcurve", "Grafiek van de inkomens- of vermogensverdeling: cumulatief % personen (arm naar rijk) tegen cumulatief % inkomen."],
          ["Kwintiel", "Een vijfde deel (20%) van een reeks, bijvoorbeeld de 20% personen met de laagste inkomens."],
          ["Percentielenratio", "Getal voor ongelijkheid: het inkomen (of vermogen) van een rijke groep gedeeld door dat van een arme groep."],
          ["GINI-coëfficiënt", "Getal tussen 0 en 1 voor de ongelijkheid: 0 is volkomen gelijk, hoe hoger hoe ongelijker."],
          ["Vermogen", "De waarde van alle bezittingen min de schulden."],
          ["Vermogensverdeling", "Hoe het vermogen over de huishoudens verdeeld is."]
        ],
        vragen: [
          { q: "Welk inkomen is een primair inkomen?",
            a: ["De huur die een verhuurder ontvangt", "De zorgtoeslag van een student", "De AOW van een gepensioneerde", "De WW-uitkering van een werkloze"],
            u: "Huur is een beloning voor het beschikbaar stellen van een productiefactor (een woning). Toeslagen en uitkeringen zijn overdrachtsinkomens: geen tegenprestatie." },
          { q: "Bekijk de figuur. Welk deel van het totale inkomen verdient de rijkste 20% van de personen?", fig: "lorenz_vb",
            a: ["45%", "55%", "20%", "25%"],
            u: "Bij 80% van de personen lees je 55% af. De armste 80% verdient dus 55%, de rijkste 20% de rest: 100% − 55% = 45%." },
          { q: "Bekijk de figuur met de curven A en B. Wat kun je concluderen?", fig: "lorenz_twee",
            a: ["Bij B is het inkomen gelijker verdeeld dan bij A", "Bij A is het inkomen gelijker verdeeld dan bij B", "Bij A verdienen alle mensen meer dan bij B", "Bij B is het totale inkomen groter dan bij A"],
            u: "Curve B ligt dichter bij de diagonaal. Een Lorenzcurve zegt niets over de hoogte van de inkomens, alleen over de verdeling." },
          { q: "Vóór belasting verdient Kim € 20.000 en Joris € 80.000. Na belasting en toeslagen is dat € 22.000 en € 66.000. Wat is hier gebeurd?",
            a: ["Nivelleren: de verhouding daalt van 4 naar 3", "Denivelleren: Joris houdt meer euro's over", "Nivelleren: Joris betaalt meer belasting in euro's", "Niets: beiden houden een positief inkomen over"],
            u: "80.000 / 20.000 = 4 en 66.000 / 22.000 = 3. De relatieve verschillen zijn kleiner geworden: nivelleren." },
          { q: "De primaire en de secundaire Lorenzcurve worden in één figuur getekend. Welke ligt in Nederland dichter bij de diagonaal en waarom?",
            a: ["De secundaire, door progressieve belasting en uitkeringen", "De primaire, omdat lonen al eerlijk zijn verdeeld", "De secundaire, omdat iedereen evenveel belasting betaalt", "Ze vallen samen, want de overheid verandert niets aan de verdeling"],
            u: "De overheid neemt via progressieve belasting relatief meer van hoge inkomens en geeft uitkeringen en toeslagen aan lage inkomens. De secundaire verdeling is gelijker." },
          { q: "Een Lorenzcurve gaat door het punt (60, 30). Wat betekent dat?",
            a: ["De armste 60% van de personen verdient samen 30% van het inkomen", "De rijkste 60% van de personen verdient samen 30% van het inkomen", "60% van de personen verdient 30% meer dan gemiddeld", "De armste 30% van de personen verdient samen 60% van het inkomen"],
            u: "Horizontaal staat het cumulatieve percentage personen van arm naar rijk, verticaal het cumulatieve percentage inkomen." },
          { q: "Waarom is de vermogensverdeling meestal schever dan de inkomensverdeling?",
            a: ["Vermogen wordt opgebouwd en geërfd en levert zelf weer inkomen op", "Vermogen wordt in box 1 zwaarder belast dan inkomen", "Iedereen heeft ongeveer evenveel schulden als bezittingen", "Inkomen wordt over meer jaren gespaard dan vermogen"],
            u: "Wie veel heeft, kan meer opzij zetten en ontvangt rente, dividend of huur. Vermogen stapelt zich op en wordt doorgegeven via erfenissen." },
          { q: "Welke maatregel werkt **denivellerend**?",
            a: ["Het tarief van de hoogste schijf verlagen", "De huurtoeslag verhogen", "De bijstandsuitkering verhogen", "Een hoger tarief op grote vermogens"],
            u: "Een lager toptarief laat vooral hoge inkomens meer overhouden. De relatieve verschillen nemen toe." },
          { q: "De GINI-coëfficiënt van een land stijgt van 0,28 naar 0,33. Wat betekent dat?",
            a: ["Het inkomen is ongelijker verdeeld geraakt", "Het inkomen is gelijker verdeeld geraakt", "Het gemiddelde inkomen is gestegen", "De overheid is meer gaan nivelleren"],
            u: "Hoe dichter bij 1, hoe ongelijker. Een stijging betekent dat de Lorenzcurve verder van de diagonaal is komen te liggen." },
          { q: "Een econoom zegt: “Iets meer ongelijkheid is goed voor de economie.” Welk argument past daarbij?",
            a: ["Grotere beloningsverschillen zijn een prikkel om harder te werken", "Gelijke inkomens geven minder spanning in de samenleving", "Lage inkomens geven een groter deel van hun inkomen uit", "Ongelijkheid vergroot de solidariteit tussen groepen"],
            u: "Het prikkelargument: als extra inspanning, opleiding of risico meer oplevert, doen mensen dat eerder. De andere argumenten pleiten eerder voor meer gelijkheid." }
        ],
        reken: [
          { gen: (R) => {
            const a = [R.int(3, 7), R.int(8, 12), R.int(14, 18), R.int(20, 26)];
            a.push(100 - a.reduce((x, y) => x + y, 0));
            const T = R.kies([400, 500, 800]), ink = a.map((x) => x * T / 100), c2 = a[0] + a[1];
            return { q: `Vijf even grote groepen hebben samen een inkomen van € ${T} miljard. Van arm naar rijk verdienen ze: ${ink.map((x) => "€ " + R.nl(x)).join(", ")} miljard. Welk percentage van het inkomen verdient de armste 40%?`,
              antwoord: c2, eenheid: "%", tol: 0.11, hint: "Reken het aandeel van groep 1 en groep 2 uit en tel ze op.",
              stappen: [`Groep 1: ${R.nl(ink[0])} / ${T} × 100% = ${a[0]}%`, `Groep 2: ${R.nl(ink[1])} / ${T} × 100% = ${a[1]}%`, `Cumulatief: ${a[0]}% + ${a[1]}% = ${c2}%. Het punt van de Lorenzcurve is (40, ${c2}).`] };
          } },
          { q: "Een Lorenzcurve gaat door de punten (20, 6), (40, 16), (60, 31) en (80, 54). Welk percentage van het inkomen verdient de derde groep (van 40% tot 60%)?",
            antwoord: 15, eenheid: "%", tol: 0.1, hint: "Het aandeel van één groep is het verschil tussen twee cumulatieve percentages.",
            stappen: ["Tot en met groep 3: 31%. Tot en met groep 2: 16%.", "Groep 3: 31% − 16% = 15%"] },
          { gen: (R) => {
            const p1 = R.int(15, 25) * 1000, f = R.kies([3, 4, 5]), p2 = p1 * f, s1 = p1 + R.int(2, 6) * 1000, s2 = p2 - R.int(4, 12) * 1000, r = s2 / s1;
            return { q: `Vóór belasting verdient A ${eur(p1)} en B ${eur(p2)}. Na belastingen, uitkeringen en toeslagen heeft A ${eur(s1)} en B ${eur(s2)}. Bereken de verhouding B / A na ingrijpen van de overheid. Rond af op twee decimalen.`,
              antwoord: R.rond(r, 2), tol: 0.011, hint: "Deel het secundaire inkomen van B door dat van A.",
              stappen: [`Vóór: ${R.nl(p2)} / ${R.nl(p1)} = ${f}`, `Na: ${R.nl(s2)} / ${R.nl(s1)} = ${R.nl(R.rond(r, 2), 2)}`, `De verhouding is kleiner geworden: de overheid nivelleert.`] };
          } },
          { q: "In een woonwijk verdient de rijkste 20% samen € 18 miljoen en de armste 20% samen € 2,4 miljoen. Bereken de verhouding tussen beide groepen (rijkste / armste).",
            antwoord: 7.5, tol: 0.05, hint: "Deel het inkomen van de rijkste groep door dat van de armste groep.",
            stappen: ["18 / 2,4 = 7,5", "De rijkste 20% verdient samen 7,5 keer zoveel als de armste 20%."] },
          { q: "Een huishouden heeft een huis van € 350.000, € 25.000 spaargeld en een auto van € 15.000. De hypotheekschuld is € 300.000 en de studieschuld € 20.000. Bereken het vermogen.",
            antwoord: 70000, eenheid: "euro", tol: 1, hint: "Vermogen = bezittingen − schulden.",
            stappen: ["Bezittingen: 350.000 + 25.000 + 15.000 = € 390.000", "Schulden: 300.000 + 20.000 = € 320.000", "Vermogen: 390.000 − 320.000 = € 70.000"] }
        ],
        oefen: [
          { type: "sorteer", q: "Primair inkomen of overdrachtsinkomen?", groepen: ["Primair inkomen", "Overdrachtsinkomen"],
            items: [["Loon van een leraar", 0], ["Winst van een bakker", 0], ["Rente op spaargeld", 0], ["Kinderbijslag", 1], ["Huurtoeslag", 1], ["Bijstandsuitkering", 1]],
            u: "Bij een primair inkomen lever je iets (arbeid, kapitaal, grond, ondernemerschap). Een overdrachtsinkomen krijg je zonder tegenprestatie." },
          { type: "sorteer", q: "Werkt de maatregel nivellerend of denivellerend?", groepen: ["Nivellerend", "Denivellerend"],
            items: [["Een hogere zorgtoeslag", 0], ["Een lager tarief in de hoogste schijf", 1], ["Een hogere heffingskorting voor iedereen", 0], ["Aftrekposten zonder beperking", 1], ["Een hoger minimumloon met uitkeringen die meestijgen", 0]],
            u: "Nivelleren: de lagere inkomens gaan er relatief meer op vooruit, of de hoge inkomens relatief meer achteruit." },
          { type: "volgorde", q: "Zet de stappen om een Lorenzcurve te tekenen in de goede volgorde.",
            items: ["Zet de personen op volgorde van laag naar hoog inkomen", "Verdeel ze in gelijke groepen", "Reken het aandeel van elke groep in het totale inkomen uit", "Tel de aandelen cumulatief op", "Zet de punten in de grafiek en verbind ze"],
            u: "Vergeet het cumulatief maken niet: de curve gaat altijd van (0, 0) naar (100, 100)." }
        ],
        open: [
          { q: "Leg uit hoe de overheid via belastingen en uitkeringen de secundaire inkomensverdeling gelijker maakt dan de primaire. Noem twee middelen.",
            a: "Met een progressief belastingtarief betalen hoge inkomens een groter deel van hun inkomen aan belasting, zodat zij er relatief meer op achteruitgaan. Met uitkeringen en toeslagen (bijvoorbeeld huurtoeslag of bijstand) gaan lage inkomens er relatief op vooruit. De relatieve verschillen worden kleiner: de Lorenzcurve van het secundaire inkomen ligt dichter bij de diagonaal.",
            punten: ["progressieve belasting: hoge inkomens relatief meer", "uitkeringen of toeslagen voor lage inkomens", "relatieve verschillen kleiner: nivelleren, curve dichter bij diagonaal"] },
          { q: "Geef een argument vóór en een argument tegen meer nivellering.",
            a: "Vóór: kleinere inkomensverschillen zijn rechtvaardiger en geven minder spanning in de samenleving; mensen met een laag inkomen kunnen beter meedoen. Tegen: als extra werk, een opleiding of ondernemen minder netto oplevert, worden mensen minder geprikkeld om dat te doen. Dat kan de productie en dus de welvaart verlagen.",
            punten: ["vóór: rechtvaardigheid, solidariteit of sociale samenhang", "tegen: minder prikkel om te werken, leren of ondernemen"] }
        ],
        widgets: ["lorenz"]
      },

      // ------------------------------------------------------------------
      // 2.4 Internationale handel
      // ------------------------------------------------------------------
      {
        id: "w2-4", nr: "2.4", titel: "Internationale handel",
        kern: [
          "De [[betalingsbalans]] is een overzicht van alle geldstromen tussen een land en het buitenland in een periode. Hij bestaat uit de [[lopende rekening]] en de [[financiële rekening]].",
          { fig: "betalingsbalans", bij: "De lopende rekening gaat over handel en inkomens, de financiële rekening over kapitaal (investeringen, beleggingen en leningen)." },
          "De lopende rekening bestaat uit de [[goederen- en dienstenrekening]] (export en import) en de [[inkomensrekening]] (primaire inkomens zoals rente, dividend en lonen, en inkomensoverdrachten zoals ontwikkelingshulp en afdrachten aan de EU).",
          { formule: "saldo lopende rekening = alle ontvangsten − alle uitgaven op de lopende rekening" },
          { tip: "Een overschot op de lopende rekening betekent dat het land meer verdient aan het buitenland dan het uitgeeft. Nederland heeft al jaren een groot overschot, vooral door export." },
          { kop: "De wisselkoers" },
          "De [[wisselkoers]] is de prijs van een munt uitgedrukt in een andere munt. Bij een [[zwevende wisselkoers]] bepalen vraag en aanbod op de valutamarkt die prijs. Een stijging heet [[appreciatie]], een daling [[depreciatie]].",
          { voorbeeld: { titel: "appreciatie van de euro", stappen: ["Eerst: € 1 = $ 1,10. Een Nederlandse fiets van € 500 kost in de VS $ 550.", "De euro apprecieert: € 1 = $ 1,25. Dezelfde fiets kost nu $ 625.", "Voor Amerikanen is de fiets duurder: de export daalt.", "Amerikaanse producten worden in euro's goedkoper: de import stijgt. Het saldo van de lopende rekening daalt."] } },
          { kop: "Internationale concurrentiepositie" },
          "De [[internationale concurrentiepositie (ICP)]] geeft aan hoe goed de producten van een land kunnen concurreren op de wereldmarkt. Dat hangt af van prijs en kwaliteit. Een belangrijke maat voor de prijskant zijn de [[loonkosten per product]].",
          { formule: "loonkosten per product = loonkosten per werknemer / arbeidsproductiviteit" },
          { ezel: "% verandering loonkosten per product ≈ % verandering loonkosten − % verandering arbeidsproductiviteit. Stijgt de productiviteit even hard als het loon, dan blijft de ICP gelijk." },
          "De [[loonkosten]] zijn hoger dan het nettoloon dat de werknemer krijgt. Het verschil is de [[wig]]: belastingen en premies. Een grote wig maakt arbeid duur voor de werkgever, zonder dat de werknemer meer overhoudt.",
          { fig: "wig", bij: "Loonkosten − brutoloon = werkgeverswig. Brutoloon − nettoloon = werknemerswig. Samen: de wig." },
          { widget: "concurrentie" },
          { widget: "loonkosten" }
        ],
        begrippen: [
          ["Betalingsbalans", "Overzicht van alle betalingen tussen een land en het buitenland in een periode."],
          ["Lopende rekening", "Deel van de betalingsbalans met de goederen- en dienstenrekening en de inkomensrekening."],
          ["Goederen- en dienstenrekening", "Deel van de lopende rekening met de ontvangsten uit export en de uitgaven aan import."],
          ["Inkomensrekening", "Deel van de lopende rekening met primaire inkomens (rente, dividend, lonen) en inkomensoverdrachten van en naar het buitenland."],
          ["Financiële rekening", "Deel van de betalingsbalans met kapitaalstromen: investeringen, beleggingen en leningen."],
          ["Saldo lopende rekening (E − M)", "Ontvangsten min uitgaven op de lopende rekening; positief betekent een overschot."],
          ["Wisselkoers", "De prijs van een munt uitgedrukt in een andere munt."],
          ["Zwevende wisselkoers", "Wisselkoers die vrij tot stand komt door vraag en aanbod op de valutamarkt."],
          ["Appreciatie", "Stijging van de wisselkoers door vraag en aanbod: de munt wordt meer waard."],
          ["Depreciatie", "Daling van de wisselkoers door vraag en aanbod: de munt wordt minder waard."],
          ["Internationale concurrentiepositie (ICP)", "Hoe goed de producten van een land op prijs en kwaliteit kunnen concurreren met die uit het buitenland."],
          ["Arbeidsproductiviteit (apt)", "De gemiddelde productie per werknemer in een periode."],
          ["Loonkosten per product", "Loonkosten per werknemer gedeeld door de arbeidsproductiviteit. Belangrijke maat voor de ICP."],
          ["Loonkosten", "Wat een werknemer de werkgever kost: brutoloon plus de premies die de werkgever betaalt."],
          ["Wig", "Het verschil tussen de loonkosten voor de werkgever en het nettoloon van de werknemer."]
        ],
        vragen: [
          { q: "Een Nederlands bedrijf ontvangt dividend van een dochterbedrijf in Duitsland. Waar komt dat op de betalingsbalans?",
            a: ["Op de inkomensrekening, als ontvangst", "Op de goederen- en dienstenrekening, als export", "Op de financiële rekening, als kapitaalimport", "Op de inkomensrekening, als uitgave"],
            u: "Dividend is een primair inkomen uit kapitaal. Het komt op de inkomensrekening, als ontvangst voor Nederland." },
          { q: "Een Amerikaans bedrijf koopt een Nederlandse fabriek. Op welke deelrekening komt dat?",
            a: ["De financiële rekening", "De goederen- en dienstenrekening", "De inkomensrekening", "De lopende rekening"],
            u: "Het kopen van een bedrijf is een investering: een kapitaalstroom op de financiële rekening." },
          { q: "De euro apprecieert ten opzichte van de dollar. Wat gebeurt er met de Nederlandse export naar de VS en met de import uit de VS?",
            a: ["Export daalt, import stijgt", "Export stijgt, import daalt", "Export en import stijgen allebei", "Export en import dalen allebei"],
            u: "Met een duurdere euro worden Nederlandse producten in dollars duurder (export daalt) en Amerikaanse producten in euro's goedkoper (import stijgt)." },
          { q: "Eerst is € 1 = 7,50 yuan, later € 1 = 8,00 yuan. Een Chinese kimono kost 600 yuan. Wat gebeurt er met de prijs in euro's?",
            a: ["Die daalt van € 80 naar € 75", "Die stijgt van € 75 naar € 80", "Die blijft € 80", "Die daalt van € 4.500 naar € 4.800"],
            u: "600 / 7,50 = € 80 en 600 / 8,00 = € 75. De euro is meer waard geworden, dus Chinese producten worden voor Nederlanders goedkoper." },
          { q: "In Nederland stijgen de loonkosten per werknemer met 4% en de arbeidsproductiviteit met 1%. Wat gebeurt er met de internationale concurrentiepositie (bij gelijke lonen in het buitenland)?",
            a: ["Die verslechtert: loonkosten per product +3%", "Die verbetert: werknemers zijn productiever", "Die blijft gelijk: beide stijgen", "Die verslechtert: loonkosten per product +5%"],
            u: "Vuistregel: 4% − 1% = 3% hogere loonkosten per product. Nederlandse producten worden relatief duurder." },
          { q: "Bekijk de figuur. Hoe groot is de wig?", fig: "wig",
            a: ["€ 2.200", "€ 1.000", "€ 1.200", "€ 2.800"],
            u: "Wig = loonkosten − nettoloon = 5.000 − 2.800 = € 2.200. Dat is de werkgeverswig (€ 1.000) plus de werknemerswig (€ 1.200)." },
          { q: "De overheid verlaagt de werkgeverspremies. Brutoloon en nettoloon blijven gelijk. Wat gebeurt er?",
            a: ["De loonkosten dalen, de ICP verbetert", "Het nettoloon stijgt, de ICP verbetert", "De loonkosten stijgen, de ICP verslechtert", "De werknemerswig daalt, de ICP blijft gelijk"],
            u: "Lagere werkgeverspremies verkleinen de werkgeverswig. Arbeid wordt goedkoper voor de werkgever: lagere loonkosten per product." },
          { q: "Nederland heeft een groot overschot op de lopende rekening. Wat betekent dat?",
            a: ["Nederland ontvangt meer van het buitenland dan het uitgeeft", "Nederland importeert meer dan het exporteert", "De Nederlandse overheid heeft meer inkomsten dan uitgaven", "Er komt meer kapitaal Nederland binnen dan er uitgaat"],
            u: "Het saldo van de lopende rekening is ontvangsten min uitgaven voor goederen, diensten en inkomens. Het overheidssaldo is iets anders." },
          { q: "Welke factor verbetert de internationale concurrentiepositie **niet**?",
            a: ["Een appreciatie van de euro", "Een hogere arbeidsproductiviteit", "Een lagere wig", "Betere kwaliteit van de producten"],
            u: "Bij een duurdere euro worden Nederlandse producten in buitenlandse munt duurder. Dat verslechtert de ICP." },
          { q: "Een land voert loonmatiging: de lonen stijgen minder dan de arbeidsproductiviteit. Wat is het gevolg voor het saldo van de lopende rekening?",
            a: ["Het stijgt: de export neemt toe", "Het daalt: de export neemt af", "Het daalt: de import neemt toe", "Het verandert niet: lonen zijn binnenlands"],
            u: "De loonkosten per product dalen, de ICP verbetert. Het land exporteert meer en het buitenland wordt relatief duurder: het saldo stijgt." }
        ],
        reken: [
          { q: "Een land heeft dit jaar: export van goederen 500, import van goederen 450, export van diensten 120, import van diensten 100, ontvangen primaire inkomens 60, betaalde primaire inkomens 70, ontvangen inkomensoverdrachten 10 en betaalde inkomensoverdrachten 25 (alles in miljarden euro's). Bereken het saldo van de lopende rekening.",
            antwoord: 45, eenheid: "miljard euro", tol: 0.1, hint: "Tel alle ontvangsten op en trek alle uitgaven ervan af.",
            stappen: ["Ontvangsten: 500 + 120 + 60 + 10 = 690", "Uitgaven: 450 + 100 + 70 + 25 = 645", "Saldo: 690 − 645 = +45 miljard: een overschot"] },
          { gen: (R) => {
            const k = R.kies([7.5, 7.8, 8, 8.2, 8.4]), y = R.int(20, 90) * 10, p = y / k;
            return { q: `De wisselkoers is € 1 = ${R.nl(k)} yuan. Een Chinese jas kost ${R.nl(y)} yuan. Wat kost de jas in euro's? Rond af op twee decimalen.`,
              antwoord: R.rond(p, 2), eenheid: "euro", tol: 0.011, hint: "Hoeveel euro's moet je wisselen om genoeg yuan te krijgen?",
              stappen: [`Elke euro levert ${R.nl(k)} yuan op.`, `${R.nl(y)} / ${R.nl(k)} = ${eur(R.rond(p, 2), 2)}`] };
          } },
          { gen: (R) => {
            const L = R.int(45, 80) * 1000, A = R.kies([1500, 2000, 2400, 2500, 3000, 3200]), lk = L / A;
            return { q: `De loonkosten per werknemer zijn ${eur(L)} per jaar. Een werknemer maakt gemiddeld ${R.nl(A)} producten per jaar. Bereken de loonkosten per product. Rond af op twee decimalen.`,
              antwoord: R.rond(lk, 2), eenheid: "euro", tol: 0.011, hint: "Loonkosten per product = loonkosten per werknemer / arbeidsproductiviteit.",
              stappen: [`${eur(L)} / ${R.nl(A)} = ${eur(R.rond(lk, 2), 2)} per product`] };
          } },
          { gen: (R) => {
            const l = R.int(15, 60) / 10, a = R.int(0, 40) / 10, d = R.rond(l - a, 1);
            return { q: `De loonkosten per werknemer stijgen met ${R.nl(l)}% en de arbeidsproductiviteit stijgt met ${R.nl(a)}%. Bereken met de vuistregel de procentuele verandering van de loonkosten per product. Een daling noteer je met een min.`,
              antwoord: d, eenheid: "%", tol: 0.051, hint: "Loonkosten min arbeidsproductiviteit.",
              stappen: [`${R.nl(l)}% − ${R.nl(a)}% = ${R.nl(d)}%`, d > 0 ? "De loonkosten per product stijgen: de ICP verslechtert (als het buitenland gelijk blijft)." : d < 0 ? "De loonkosten per product dalen: de ICP verbetert." : "De loonkosten per product blijven gelijk."] };
          } },
          { q: "Een werkneemster heeft een brutoloon van € 3.700 per maand. De werkgever betaalt daarbovenop € 800 aan premies. Ze krijgt € 2.600 netto. Bereken de wig.",
            antwoord: 1900, eenheid: "euro", tol: 1, hint: "Wig = loonkosten − nettoloon. Bereken eerst de loonkosten.",
            stappen: ["Loonkosten: 3.700 + 800 = € 4.500", "Wig: 4.500 − 2.600 = € 1.900", "Werkgeverswig € 800 + werknemerswig (3.700 − 2.600 =) € 1.100 = € 1.900"] },
          { q: "De koers van de euro stijgt van $ 1,10 naar $ 1,21. Met hoeveel procent stijgt de dollarprijs van een Nederlands product dat € 50 kost?",
            antwoord: 10, eenheid: "%", tol: 0.1, hint: "Bereken de dollarprijs voor en na de koersstijging.",
            stappen: ["Eerst: 50 × 1,10 = $ 55,00", "Daarna: 50 × 1,21 = $ 60,50", "(60,50 − 55,00) / 55,00 × 100% = 10%: precies de appreciatie van de euro."] }
        ],
        oefen: [
          { type: "sorteer", q: "Op welke deelrekening van de betalingsbalans hoort de transactie?", groepen: ["Goederen- en dienstenrekening", "Inkomensrekening", "Financiële rekening"],
            items: [["Nederland verkoopt kaas aan Italië", 0], ["Een Duitse toerist overnacht in Amsterdam", 0], ["Nederland betaalt rente op een lening aan een Japanse bank", 1], ["Nederland draagt geld af aan de EU", 1], ["Een Nederlands pensioenfonds koopt Amerikaanse aandelen", 2], ["Een Chinees bedrijf bouwt een fabriek in Nederland", 2]],
            u: "Handel in goederen en diensten, inkomens (rente, dividend, overdrachten) en kapitaal (investeringen, beleggingen, leningen)." },
          { type: "volgorde", q: "Zet de oorzaak-gevolgketen in de goede volgorde.",
            items: ["De lonen in Nederland stijgen sterker dan de arbeidsproductiviteit", "De loonkosten per product stijgen", "Nederlandse producten worden duurder dan buitenlandse", "De internationale concurrentiepositie verslechtert", "De export daalt en de import stijgt", "Het saldo van de lopende rekening daalt"],
            u: "Zo'n keten werkt op de toets met kleine, logische stappen: noem elke tussenschakel." },
          { type: "invul", q: "Vul aan.",
            tekst: "Loonkosten − brutoloon = de {werkgeverswig}. Brutoloon − nettoloon = de {werknemerswig}. Loonkosten − nettoloon = de {wig}.",
            extra: ["loonkosten per product", "heffingskorting"],
            u: "De wig is het geld tussen wat de werkgever betaalt en wat de werknemer krijgt: belastingen en premies." }
        ],
        open: [
          { q: "De euro deprecieert ten opzichte van de dollar. Leg in stappen uit wat er gebeurt met het saldo van de Nederlandse lopende rekening.",
            a: "Door de depreciatie krijg je voor een dollar meer euro's. Nederlandse producten worden in dollars goedkoper, dus Amerikanen kopen meer: de export stijgt. Amerikaanse producten worden in euro's duurder, dus Nederlanders kopen minder: de import daalt. Het saldo van de lopende rekening stijgt.",
            punten: ["Nederlandse producten in dollars goedkoper: export stijgt", "Amerikaanse producten in euro's duurder: import daalt", "saldo lopende rekening stijgt"] },
          { q: "Een vakbond zegt: “Hogere lonen hoeven de concurrentiepositie niet te schaden.” Leg uit wanneer dat klopt.",
            a: "De concurrentiepositie hangt af van de loonkosten per product, niet van het loon alleen. Als de arbeidsproductiviteit minstens even hard stijgt als de loonkosten per werknemer, blijven de loonkosten per product gelijk of dalen ze. Dan worden de producten niet duurder en blijft de concurrentiepositie gelijk of verbetert ze.",
            punten: ["het gaat om loonkosten per product", "arbeidsproductiviteit stijgt minstens even hard als de loonkosten", "producten niet duurder: ICP gelijk of beter"] }
        ],
        widgets: ["concurrentie", "loonkosten"]
      }
    ]
  });
})();
