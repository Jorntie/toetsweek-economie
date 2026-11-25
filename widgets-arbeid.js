// Interactieve onderdelen bij Arbeid (hoofdstuk 5). Gebruikt de hulpfuncties uit widgets.js (ECO) en figs.js (ECOFIG).
(function () {
  "use strict";
  const nl = TW.nl, fmt = TW.fmt, esc = TW.esc, ECO = window.ECO, schuif = ECO.schuif;

  // ------------------------------------------------------------------
  // 6. Arbeidsmarkt-grafiek
  // ------------------------------------------------------------------
  TW.widget("arbeidsmarkt", {
    titel: "Arbeidsmarkt-grafiek", icoon: "⚖️",
    uitleg: "Werkgevers vragen arbeid, werknemers bieden arbeid aan. Verschuif de lijnen, zet een minimumloon aan en sleep het rode bolletje omhoog of omlaag.",
    maak(el, api) {
      let sv = 0, sa = 0, minAan = false, M = 45, surplus = false;
      const P = api.plot({ x: [0, 12], y: [0, 70], xl: "arbeid (mln arbeidsjaren)", yl: "loon (× € 1.000 per jaar)", xt: 2, yt: 10, w: 340, h: 290, mt: 20 });
      const Lv = (q) => 60 + 5 * sv - 5 * q, La = (q) => 10 - 5 * sa + 5 * q;
      const Qv = (l) => (60 + 5 * sv - l) / 5, Qa = (l) => (l - 10 + 5 * sa) / 5;
      el.innerHTML = `<div data-g></div>
        <div class="keuze"><button class="btn" data-v="-1">← Vraag</button><button class="btn" data-v="1">Vraag →</button><button class="btn" data-a="-1">← Aanbod</button><button class="btn" data-a="1">Aanbod →</button></div>
        <div class="chips"><button class="chip" data-t="min">Minimumloon</button><button class="chip" data-t="sur">Surplus tonen</button><button class="chip" data-t="reset">↺ Herstel</button></div>
        <div class="uit" data-u></div><div data-opdr></div>`;
      el.querySelector("[data-g]").innerHTML = P.svg(P.assen() + `<g data-dyn></g><circle data-vis r="9" class="greep" style="fill:var(--bad)"/><circle data-hit r="22" class="hit"/>`, "Arbeidsmarkt met vraaglijn, aanbodlijn en minimumloon");
      const svg = el.querySelector("svg"), dyn = el.querySelector("[data-dyn]"), vis = el.querySelector("[data-vis]"), hit = el.querySelector("[data-hit]");
      function stand() {
        const qe = 5 + 0.5 * (sv + sa), le = 35 + 2.5 * (sv - sa);
        const bindt = minAan && M > le + 1e-9;
        const q = bindt ? Math.max(0, Qv(M)) : qe, w = bindt ? M : le, aanbod = bindt ? Qa(M) : qe;
        const wg = q > 0 ? 0.5 * q * (Lv(0) - w) : 0, wn = q * w - (La(0) * q + 2.5 * q * q);
        const verlies = bindt ? 0.5 * (qe - q) * (Lv(q) - La(q)) : 0;
        return { qe, le, bindt, q, w, aanbod, wg, wn, verlies };
      }
      function teken() {
        const s = stand();
        let b = "";
        if (surplus) {
          b += P.vlak([[0, Lv(0)], [s.q, Lv(s.q)], [s.q, s.w], [0, s.w]], "vlak") + P.vlak([[0, s.w], [s.q, s.w], [s.q, La(s.q)], [0, La(0)]], "vlak3");
          if (s.bindt) b += P.vlak([[s.q, Lv(s.q)], [s.qe, s.le], [s.q, La(s.q)]], "vlak2");
        }
        b += P.fn(Lv, "curve") + P.fn(La, "curve5");
        const xv = Math.min(11, Qv(6)), xa = Math.min(11, Qa(64));
        b += P.tekst(xv, Lv(xv), "vraag", "end", "b pa", -6, -2) + P.tekst(xa, La(xa), "aanbod", "end", "b pg", -8, 4);
        b += P.lijn(0, s.le, s.qe, s.le, "stip") + P.lijn(s.qe, 0, s.qe, s.le, "stip") + P.punt(s.qe, s.le);
        if (minAan) {
          b += P.lijn(0, M, 11.3, M, "curve2") + P.tekst(0.2, M, "minimumloon", "start", "k b pr", 0, -5);
          if (s.bindt) b += P.lijn(s.q, 0, s.q, M, "stip") + P.lijn(s.aanbod, 0, s.aanbod, M, "stip") + P.lijn(s.q, M, s.aanbod, M, "dik2") + P.tekst((s.q + s.aanbod) / 2, M, "aanbodoverschot", "middle", "k b pr", 0, 16);
        }
        if (surplus) b += P.tekst(Math.max(0.5, s.q / 3), (Lv(0) + 2 * s.w) / 3, "A", "middle", "g pa") + P.tekst(Math.max(0.5, s.q / 3), (La(0) + 2 * s.w) / 3, "B", "middle", "g pg", 0, 8) + (s.bindt && s.verlies > 0 ? P.tekst(s.q + (s.qe - s.q) / 3, s.le, "C", "middle", "g pr", 0, 5) : "");
        dyn.innerHTML = b;
        vis.style.display = hit.style.display = minAan ? "" : "none";
        [vis, hit].forEach((c) => { c.setAttribute("cx", P.X(11.3).toFixed(1)); c.setAttribute("cy", P.Y(M).toFixed(1)); });
        el.querySelector("[data-t=min]").classList.toggle("aan", minAan);
        el.querySelector("[data-t=sur]").classList.toggle("aan", surplus);
        const uitleg = !minAan ? "Zonder ingrijpen komt de markt uit in het evenwicht: vraag en aanbod zijn gelijk." : s.bindt
          ? "Het minimumloon ligt <b>boven</b> het evenwichtsloon. Werkgevers vragen minder arbeid en meer mensen bieden zich aan: er ontstaat een aanbodoverschot (werkloosheid)."
          : "Het minimumloon ligt <b>onder</b> het evenwichtsloon en heeft dus geen effect: niemand hoeft voor zo weinig te werken.";
        el.querySelector("[data-u]").innerHTML = `<div class="kern-getal"><div><small>Loon</small><b>${ECO.eur(s.w * 1000)}</b></div><div><small>Werkgelegenheid</small><b>${nl(s.q, 2)} mln</b></div><div><small>Aanbod van arbeid</small><b>${nl(s.aanbod, 2)} mln</b></div><div><small>Aanbodoverschot</small><b class="${s.aanbod - s.q > 0.001 ? "neer" : ""}">${nl(s.aanbod - s.q, 2)} mln</b></div></div>
          ${surplus ? `<div class="kern-getal drie"><div><small>A · werkgeverssurplus</small><b>€ ${nl(s.wg, 1)} mld</b></div><div><small>B · werknemerssurplus</small><b>€ ${nl(s.wn, 1)} mld</b></div><div><small>C · verlies (Harberger driehoek)</small><b class="${s.verlies > 0 ? "neer" : ""}">€ ${nl(s.verlies, 1)} mld</b></div></div>` : ""}
          <p class="noot">${uitleg}</p>`;
      }
      api.sleep(svg, hit, (x, y) => { M = ECO.klem(Math.round(P.iy(y)), 15, 60); teken(); });
      el.querySelectorAll("[data-v]").forEach((k) => (k.onclick = () => { sv = ECO.klem(sv + +k.dataset.v, -2, 2); teken(); }));
      el.querySelectorAll("[data-a]").forEach((k) => (k.onclick = () => { sa = ECO.klem(sa + +k.dataset.a, -2, 2); teken(); }));
      const zet = (v, a, m, mm, su) => { sv = v; sa = a; minAan = !!m; if (mm) M = mm; surplus = !!su; teken(); };
      el.querySelector("[data-t=min]").onclick = () => { minAan = !minAan; teken(); };
      el.querySelector("[data-t=sur]").onclick = () => { surplus = !surplus; teken(); };
      el.querySelector("[data-t=reset]").onclick = () => zet(0, 0, false, 45, false);
      teken();
      ECO.voorspel(el.querySelector("[data-opdr]"), [
        { start: () => zet(0, 0, false, 45, false), doe: () => zet(0, 0, true, 45, false),
          q: "Het evenwichtsloon is € 35.000. De overheid voert een minimumloon in van € 45.000. Wat gebeurt er met de werkgelegenheid?",
          opties: ["Die daalt: werkgevers vragen bij een hoger loon minder arbeid", "Die stijgt: bij een hoger loon willen meer mensen werken", "Die blijft gelijk: alleen het loon verandert door de maatregel", "Die stijgt: werknemers kunnen meer besteden"],
          uitleg: "Op deze markt bepaalt de korte kant hoeveel er gewerkt wordt. Bij € 45.000 vragen werkgevers nog maar 3 mln arbeidsjaren, terwijl er 7 mln worden aangeboden: een aanbodoverschot van 4 mln." },
        { start: () => zet(0, 0, true, 45, false), doe: () => zet(0, 0, true, 25, false),
          q: "De overheid verlaagt het minimumloon naar € 25.000, onder het evenwichtsloon. Wat is het loon dat nu op de markt tot stand komt?",
          opties: ["€ 35.000: het minimumloon heeft geen effect meer", "€ 25.000: werkgevers betalen nooit meer dan het minimum", "€ 30.000: het gemiddelde van minimum en evenwicht", "€ 45.000: lonen dalen niet door loonstarheid"],
          uitleg: "Een minimumloon is een ondergrens. Ligt het onder het evenwichtsloon, dan komt de markt gewoon in het evenwicht uit." },
        { start: () => zet(0, 0, false, 45, false), doe: () => zet(2, 0, false, 45, false),
          q: "Het is hoogconjunctuur: bedrijven willen meer produceren en hebben meer personeel nodig. Wat gebeurt er in de grafiek?",
          opties: ["De vraaglijn schuift naar rechts: loon en werkgelegenheid stijgen", "De aanbodlijn schuift naar rechts: het loon daalt", "De vraaglijn schuift naar links: het loon stijgt", "De aanbodlijn schuift naar links: het loon stijgt"],
          uitleg: "Bedrijven vragen bij elk loon meer arbeid. De markt wordt krapper: het evenwichtsloon stijgt naar € 40.000 en de werkgelegenheid naar 6 mln arbeidsjaren." },
        { start: () => zet(0, 0, false, 45, false), doe: () => zet(0, 2, false, 45, false),
          q: "Door een hogere participatiegraad bieden meer mensen zich aan op de arbeidsmarkt. Wat gebeurt er met het evenwichtsloon en de werkgelegenheid?",
          opties: ["Het loon daalt en de werkgelegenheid stijgt", "Het loon stijgt en de werkgelegenheid stijgt", "Het loon daalt en de werkgelegenheid daalt", "Het loon stijgt en de werkgelegenheid daalt"],
          uitleg: "De aanbodlijn schuift naar rechts. Door het grotere aanbod daalt het loon naar € 30.000; bij dat lagere loon vragen werkgevers meer arbeid (6 mln)." },
        { start: () => zet(0, 0, false, 45, true), doe: () => zet(0, 0, true, 45, true),
          q: "Kijk naar de vlakken: A is het werkgeverssurplus, B het werknemerssurplus. Nu komt er een minimumloon van € 45.000. Wat gebeurt er met het totale surplus (A + B)?",
          opties: ["Dat daalt: er gaat surplus verloren (vlak C)", "Dat stijgt: werknemers verdienen meer", "Dat blijft gelijk: A krimpt, B groeit evenveel", "Dat stijgt: er komt een vlak C bij"],
          uitleg: "Er wordt minder gewerkt dan in het evenwicht. Het surplus van de arbeidsjaren die wegvallen is verdwenen: de Harberger driehoek (C), een verlies aan economische doelmatigheid. Het totale surplus daalt van € 125 mld naar € 105 mld." }
      ], () => api.klaar());
    }
  });

  // ------------------------------------------------------------------
  // 7. Wie telt mee?
  // ------------------------------------------------------------------
  TW.widget("wietelt", {
    titel: "Wie telt mee?", icoon: "🧑‍🤝‍🧑",
    uitleg: "Wie hoort bij de beroepsbevolking en wie niet? Deel eerst personen in en reken daarna de participatiegraad en het werkloosheidspercentage uit.",
    maak(el, api) {
      const GROEP = [["werkzaam", "Werkzame beroepsbevolking"], ["werkloos", "Werkloze beroepsbevolking"], ["nbb", "Niet-beroepsbevolking"], ["nietgeschikt", "Niet beroepsgeschikt"]];
      const MENSEN = [
        ["Sanne (34) werkt 36 uur per week als verpleegkundige.", 0, "Ze heeft betaald werk en is tussen de 15 en 75 jaar."],
        ["Daan (17) zit op de havo en vult 8 uur per week vakken.", 0, "Ook een bijbaan is betaald werk. Daan is ouder dan 15, dus hij telt mee als werkzaam."],
        ["Yusuf (45) is ontslagen, solliciteert elke week en kan morgen beginnen.", 1, "Geen betaald werk, recent gezocht en direct beschikbaar: precies de drie eisen voor werkloos."],
        ["Emma (20) studeert voltijds, heeft geen bijbaan en zoekt er ook geen.", 2, "Ze is beroepsgeschikt (15 tot 75 jaar), maar werkt niet en zoekt niet. Ze biedt zich dus niet aan."],
        ["Henk (78) werkt nog 10 uur per week in een boekhandel.", 3, "Henk werkt wel, maar is ouder dan 75. De beroepsgeschikte bevolking loopt van 15 tot 75 jaar."],
        ["Lotte (13) heeft een krantenwijk.", 3, "Lotte is jonger dan 15 en hoort daarom niet bij de beroepsgeschikte bevolking."],
        ["Karin (52) is volledig arbeidsongeschikt en kan niet werken.", 2, "Ze is niet beschikbaar voor werk. Arbeidsongeschikten horen bij de niet-beroepsbevolking."],
        ["Tom (38) is huisman, zorgt voor de kinderen en zoekt geen baan.", 2, "Huishoudelijk werk is onbetaald en Tom zoekt geen betaald werk."],
        ["Fatima (29) zoekt een baan, maar kan pas over vier maanden beginnen.", 2, "Ze zoekt wel, maar is niet direct beschikbaar. Dan tel je niet mee als werkloos."],
        ["Bram (61) is met vroegpensioen en zoekt geen werk meer.", 2, "Hij is jonger dan 75, maar biedt zich niet meer aan op de arbeidsmarkt."],
        ["Mila (26) werkt als zzp'er: ze is zelfstandig fotograaf.", 0, "Ook zelfstandigen hebben betaald werk en horen bij de werkzame beroepsbevolking."],
        ["Jeroen (41) wil graag werken, maar is na veel afwijzingen gestopt met solliciteren.", 2, "Hij zoekt niet meer en telt daarom officieel niet als werkloos. Dit is een voorbeeld van verborgen werkloosheid (ontmoedigingseffect)."],
        ["Noor (33) doet 20 uur per week vrijwilligerswerk en zoekt geen betaalde baan.", 2, "Vrijwilligerswerk is onbetaald. Zonder betaald werk en zonder te zoeken hoor je bij de niet-beroepsbevolking."]
      ];
      ECO.tabs(el, [["Indelen", indelen], ["Rekenen", rekenen]]);

      function indelen(p) {
        const rij = api.shuffle(MENSEN).slice(0, 8);
        let i = 0, goed = 0;
        function toon() {
          if (i >= rij.length) {
            p.innerHTML = `${window.ECOFIG.bevolking({})}<div class="opdr"><div class="opdr-kop">Klaar</div><p class="opdr-q">${goed} van de ${rij.length} goed ingedeeld. ${goed >= 7 ? "Dat zit er goed in! 🎉" : "Let vooral op de drie eisen voor werkloos: geen betaald werk, recent gezocht en direct beschikbaar."}</p><button class="btn primary">Nog een ronde</button></div>`;
            p.querySelector(".btn").onclick = () => indelen(p);
            api.klaar(); return;
          }
          const m = rij[i];
          p.innerHTML = `<div data-fig>${window.ECOFIG.bevolking({})}</div><div class="pl"><span>Persoon ${i + 1} van ${rij.length}</span><span>${goed} goed</span></div>
            <div class="persoon">${esc(m[0])}</div><div class="antw-grid">${GROEP.map((g, n) => `<button class="btn" data-n="${n}">${g[1]}</button>`).join("")}</div><div data-fb></div>`;
          p.querySelectorAll(".antw-grid .btn").forEach((k) => (k.onclick = () => {
            const n = +k.dataset.n, juist = n === m[1];
            p.querySelectorAll(".antw-grid .btn").forEach((kk) => { kk.disabled = true; if (+kk.dataset.n === m[1]) kk.classList.add("goed"); });
            if (!juist) k.classList.add("fout"); else goed++;
            p.querySelector("[data-fig]").innerHTML = window.ECOFIG.bevolking({ licht: GROEP[m[1]][0] });
            p.querySelector("[data-fb]").innerHTML = `<div class="eco-fb ${juist ? "ok" : "nok"}"><b>${juist ? "✔ Goed." : "✖ Het is: " + GROEP[m[1]][1].toLowerCase() + "."}</b> ${esc(m[2])}<br><button class="btn klein primary">${i + 1 < rij.length ? "Volgende persoon" : "Bekijk je score"}</button></div>`;
            p.querySelector("[data-fb] .btn").onclick = () => { i++; toon(); };
          }));
        }
        toon();
      }

      function rekenen(p) {
        const R = api.R;
        let goed = 0;
        function nieuw() {
          const G = R.int(120, 140) * 100, NG = R.int(40, 52) * 100, BB = R.int(85, 100) * 100, u = R.kies([3, 4, 5, 6, 8]), WL = BB * u / 100;
          const part = (BB / G) * 100;
          p.innerHTML = `<p>Een land in cijfers (× 1.000 personen). Het getal bij de beroepsbevolking moet je zelf uitrekenen.</p>
            ${window.ECOFIG.bevolking({ n: { tot: G + NG, geschikt: G, nietgeschikt: NG, nbb: G - BB, werkzaam: BB - WL, werkloos: WL, bb: "?" } })}
            <div class="opdr"><div class="opdr-kop">Vraag 1 van 2</div><div data-v1></div></div><div data-v2></div>`;
          ECO.rekenvraag(p.querySelector("[data-v1]"), { q: "Bereken de participatiegraad. Rond af op één decimaal.", antwoord: R.rond(part, 1), tol: 0.051, eenheid: "%",
            hint: "Participatiegraad = beroepsbevolking / beroepsgeschikte bevolking × 100%. De beroepsbevolking is werkzaam plus werkloos.",
            stappen: [`Beroepsbevolking = werkzaam + werkloos = ${nl(BB - WL)} + ${nl(WL)} = ${nl(BB)}`, `Participatiegraad = ${nl(BB)} / ${nl(G)} × 100% = ${nl(R.rond(part, 1), 1)}%`] }, (j1) => {
            p.querySelector("[data-v2]").innerHTML = `<div class="opdr"><div class="opdr-kop">Vraag 2 van 2</div><div data-v></div><div data-n></div></div>`;
            ECO.rekenvraag(p.querySelector("[data-v2] [data-v]"), { q: "Bereken het werkloosheidspercentage.", antwoord: u, tol: 0.051, eenheid: "%",
              hint: "Deel de werkloze beroepsbevolking door de beroepsbevolking, niet door de hele bevolking.",
              stappen: [`Werkloosheidspercentage = werkloze beroepsbevolking / beroepsbevolking × 100%`, `${nl(WL)} / ${nl(BB)} × 100% = ${nl(u)}%`] }, (j2) => {
              if (j1 && j2) goed++;
              if (goed >= 1) api.klaar();
              p.querySelector("[data-v2] [data-n]").innerHTML = `<button class="btn primary" style="margin-top:10px">Nieuwe getallen</button>`;
              p.querySelector("[data-v2] [data-n] .btn").onclick = nieuw;
            });
          });
        }
        nieuw();
      }
    }
  });

  // ------------------------------------------------------------------
  // 8. Soorten werkloosheid
  // ------------------------------------------------------------------
  TW.widget("werkloosheid", {
    titel: "Soorten werkloosheid", icoon: "🔍",
    uitleg: "Elke soort werkloosheid heeft een eigen oorzaak en dus een eigen aanpak. Kies eerst de soort, daarna het beleid dat erbij past.",
    maak(el, api) {
      const SOORT = ["Conjunctureel", "Kwantitatief structureel", "Kwalitatief structureel", "Frictie", "Seizoens"];
      const VOLUIT = ["conjuncturele werkloosheid", "kwantitatieve structurele werkloosheid", "kwalitatieve structurele werkloosheid", "frictiewerkloosheid", "seizoenswerkloosheid"];
      const BELEID = [
        "De effectieve vraag stimuleren: belastingen omlaag of overheidsbestedingen omhoog",
        "De loonkosten per product verlagen: loonmatiging, een lagere wig of een hogere arbeidsproductiviteit",
        "Scholing (leven lang leren) en de arbeidsmobiliteit vergroten",
        "Vraag en aanbod sneller bij elkaar brengen: betere informatie en bemiddeling",
        "Weinig aan te doen: het hoort bij het seizoen en gaat vanzelf weer over"
      ];
      const CASES = [
        ["Door een recessie geven consumenten minder uit. Meubelfabrieken draaien op halve kracht en ontslaan personeel.", 0, "Er is te weinig effectieve vraag: de productiecapaciteit wordt niet volledig benut. Dat is conjuncturele werkloosheid (de kijk van Keynes)."],
        ["Een bank vervangt baliemedewerkers door een app. De bank draait prima, maar die banen komen niet terug.", 1, "Arbeid is vervangen door kapitaal (een diepte-investering). Er zijn blijvend te weinig arbeidsplaatsen: kwantitatieve structurele werkloosheid."],
        ["Er zijn veel vacatures voor installateurs van warmtepompen, maar de werklozen in de regio zijn vooral kantoormedewerkers.", 2, "Er zijn tegelijk vacatures en werklozen, maar de opleiding past niet: kwalitatieve structurele werkloosheid."],
        ["Een strandtent heeft in de winter geen werk voor het bedienend personeel.", 4, "De vraag naar arbeid hangt af van het seizoen: seizoenswerkloosheid."],
        ["Een pas afgestudeerde fysiotherapeut zoekt twee maanden naar een passende baan. Er zijn genoeg vacatures.", 3, "Zoeken en solliciteren kost tijd en niemand kent alle vacatures: frictiewerkloosheid."],
        ["Een kledingfabriek verplaatst de productie naar een lagelonenland, omdat de loonkosten per product hier te hoog zijn.", 1, "Arbeid is hier te duur: de arbeidsplaatsen verdwijnen blijvend. Dat is kwantitatieve structurele werkloosheid."],
        ["In het noorden zijn veel werklozen, in het westen veel vacatures voor hetzelfde werk. Verhuizen of ver reizen doen mensen niet graag.", 2, "Het werk en de werklozen zitten niet op dezelfde plek: beperkte arbeidsmobiliteit hoort bij kwalitatieve structurele werkloosheid."],
        ["Belangrijke handelspartners zitten in een crisis. De export stort in en Nederlandse bedrijven krijgen veel minder orders.", 0, "Export is een onderdeel van de effectieve vraag. Minder bestedingen uit het buitenland geeft conjuncturele werkloosheid."]
      ];
      const STELLING = [
        ["Werkloosheid ontstaat doordat er te weinig wordt besteed.", 0], ["Kijk naar de korte termijn: de schommelingen in de effectieve vraag.", 0],
        ["Loon is vooral koopkracht: hogere lonen geven meer bestedingen en dus meer werk.", 0], ["In een crisis moet de overheid meer uitgeven of de belastingen verlagen.", 0],
        ["Werkloosheid ontstaat doordat arbeid te duur is of niet aansluit op de vacatures.", 1], ["Kijk naar de lange termijn: de productiecapaciteit, de aanbodkant van de economie.", 1],
        ["Loon is vooral kosten: hogere loonkosten per product kosten banen.", 1], ["Loonmatiging en een lagere wig verbeteren de concurrentiepositie en scheppen werk.", 1]
      ];
      ECO.tabs(el, [["Welke soort?", soorten], ["Keynes of Klassieken?", scholen]]);

      function soorten(p) {
        const rij = api.shuffle(CASES);
        let i = 0, punten = 0;
        function toon() {
          if (i >= rij.length) {
            p.innerHTML = `<div class="opdr"><div class="opdr-kop">Klaar</div><p class="opdr-q">${punten} van de ${rij.length * 2} punten (soort en beleid). ${punten >= 13 ? "Uitstekend! 🎉" : "Ezelsbruggetje: conjunctureel = te weinig bestedingen, structureel = er is iets mis met de kosten, de hoeveelheid of de kwaliteit van arbeid."}</p><button class="btn primary">Nog een ronde</button></div>`;
            p.querySelector(".btn").onclick = () => soorten(p); api.klaar(); return;
          }
          const c = rij[i];
          p.innerHTML = `<div class="pl"><span>Situatie ${i + 1} van ${rij.length}</span><span>${punten} punten</span></div><div class="persoon">${esc(c[0])}</div>
            <p class="opdr-q">Stap 1 · Welke soort werkloosheid is dit?</p><div class="antw-grid" data-s1>${SOORT.map((s, n) => `<button class="btn" data-n="${n}">${s}</button>`).join("")}</div><div data-fb1></div><div data-s2></div>`;
          p.querySelectorAll("[data-s1] .btn").forEach((k) => (k.onclick = () => {
            const juist = +k.dataset.n === c[1];
            p.querySelectorAll("[data-s1] .btn").forEach((kk) => { kk.disabled = true; if (+kk.dataset.n === c[1]) kk.classList.add("goed"); });
            if (!juist) k.classList.add("fout"); else punten++;
            p.querySelector("[data-fb1]").innerHTML = `<div class="eco-fb ${juist ? "ok" : "nok"}"><b>${juist ? "✔ Goed." : "✖ Het is " + VOLUIT[c[1]] + "."}</b> ${esc(c[2])}</div>`;
            const opties = api.shuffle(BELEID.map((t, n) => ({ t, n })));
            p.querySelector("[data-s2]").innerHTML = `<p class="opdr-q" style="margin-top:14px">Stap 2 · Welk beleid past hierbij?</p>${opties.map((o) => `<button class="opt" data-n="${o.n}">${esc(o.t)}</button>`).join("")}<div data-fb2></div>`;
            p.querySelectorAll("[data-s2] .opt").forEach((o) => (o.onclick = () => {
              const j2 = +o.dataset.n === c[1];
              p.querySelectorAll("[data-s2] .opt").forEach((oo) => { oo.disabled = true; if (+oo.dataset.n === c[1]) oo.classList.add("goed"); });
              if (!j2) o.classList.add("fout"); else punten++;
              p.querySelector("[data-fb2]").innerHTML = `<div class="eco-fb ${j2 ? "ok" : "nok"}"><b>${j2 ? "✔ Past." : "✖ Dat pakt de oorzaak niet aan."}</b> Bij ${VOLUIT[c[1]]} hoort: ${BELEID[c[1]].charAt(0).toLowerCase() + BELEID[c[1]].slice(1)}.<br><button class="btn klein primary">${i + 1 < rij.length ? "Volgende situatie" : "Bekijk je score"}</button></div>`;
              p.querySelector("[data-fb2] .btn").onclick = () => { i++; toon(); };
            }));
          }));
        }
        toon();
      }

      function scholen(p) {
        const rij = api.shuffle(STELLING);
        let i = 0, goed = 0;
        const NAAM = ["Keynes", "Klassieken"];
        function toon() {
          if (i >= rij.length) {
            p.innerHTML = `<div class="opdr"><div class="opdr-kop">Klaar</div><p class="opdr-q">${goed} van de ${rij.length} goed. Onthoud: Keynes = vraagkant, korte termijn, conjunctuur, loon is koopkracht. Klassieken = aanbodkant, lange termijn, structuur, loon is kosten.</p><button class="btn primary">Nog een keer</button></div>`;
            p.querySelector(".btn").onclick = () => scholen(p); api.klaar(); return;
          }
          const s = rij[i];
          p.innerHTML = `<div class="pl"><span>Uitspraak ${i + 1} van ${rij.length}</span><span>${goed} goed</span></div><div class="persoon">“${esc(s[0])}”</div>
            <p class="opdr-q">Bij welke visie hoort deze uitspraak?</p><div class="antw-grid">${NAAM.map((nm, n) => `<button class="btn" data-n="${n}">${nm}</button>`).join("")}</div><div data-fb></div>`;
          p.querySelectorAll(".antw-grid .btn").forEach((k) => (k.onclick = () => {
            const juist = +k.dataset.n === s[1];
            p.querySelectorAll(".antw-grid .btn").forEach((kk) => { kk.disabled = true; if (+kk.dataset.n === s[1]) kk.classList.add("goed"); });
            if (!juist) k.classList.add("fout"); else goed++;
            p.querySelector("[data-fb]").innerHTML = `<div class="eco-fb ${juist ? "ok" : "nok"}"><b>${juist ? "✔ Goed." : "✖ Dit hoort bij " + NAAM[s[1]] + "."}</b> ${s[1] === 0 ? "Keynes kijkt naar de vraagkant: de bestedingen bepalen op korte termijn de productie en de werkgelegenheid." : "De Klassieken kijken naar de aanbodkant: de kosten en de kwaliteit van de productiefactoren bepalen de werkgelegenheid."}<br><button class="btn klein primary">${i + 1 < rij.length ? "Volgende" : "Bekijk je score"}</button></div>`;
            p.querySelector("[data-fb] .btn").onclick = () => { i++; toon(); };
          }));
        }
        toon();
      }
    }
  });

  // ------------------------------------------------------------------
  // 9. Loonkosten per product
  // ------------------------------------------------------------------
  TW.widget("loonkosten", {
    titel: "Loonkosten per product", icoon: "🏷️",
    uitleg: "Loonkosten per product = loonkosten per werknemer / arbeidsproductiviteit. Verschuif beide en kijk wat er met de concurrentiepositie gebeurt.",
    maak(el, api) {
      const L0 = 60000, A0 = 2400, BUIT = 25;
      let loon = L0, apt = A0;
      el.innerHTML = `${schuif("loon", "Loonkosten per werknemer per jaar", 40000, 90000, 1000, loon)}${schuif("apt", "Arbeidsproductiviteit (producten per werknemer per jaar)", 1500, 4000, 100, apt)}
        <div data-g></div><div class="uit" data-u></div><div data-opdr></div><div class="opdr" data-vrij style="display:none"></div>`;
      const P = api.plot({ x: [0, 2], y: [0, 50], w: 340, h: 170, mb: 30, mt: 20 });
      let vrijAan = false;
      function teken() {
        const lk = loon / apt, dl = (loon / L0 - 1) * 100, da = (apt / A0 - 1) * 100, dk = (lk / (L0 / A0) - 1) * 100;
        el.querySelector("[data-o=loon]").textContent = ECO.eur(loon);
        el.querySelector("[data-o=apt]").textContent = nl(apt);
        const s = ECO.rooster(P, 2, 0, 50, 10) + ECO.staaf(P, 0.5, Math.min(lk, 50), lk < BUIT - 0.005 ? "vlak3" : lk > BUIT + 0.005 ? "vlak2" : "vlak", "Nederland", "€ " + nl(lk, 2), 0, 0.3) + ECO.staaf(P, 1.5, BUIT, "grijs", "buitenland", "€ " + nl(BUIT, 2), 0, 0.3) +
          P.lijn(0, 0, 2, 0, "s") + `<text x="4" y="10" class="k b">loonkosten per product (€)</text>`;
        el.querySelector("[data-g]").innerHTML = P.svg(s, "Loonkosten per product in Nederland en in het buitenland");
        const oordeel = Math.abs(lk - BUIT) < 0.005 ? "gelijk aan het buitenland" : lk < BUIT ? "beter dan het buitenland" : "slechter dan het buitenland";
        el.querySelector("[data-u]").innerHTML = `<div class="kern-getal"><div><small>${ECO.eur(loon)} / ${nl(apt)}</small><b>${ECO.eur(lk, 2)} per product</b></div><div><small>Internationale concurrentiepositie</small><b class="${lk < BUIT - 0.005 ? "op" : lk > BUIT + 0.005 ? "neer" : ""}">${oordeel}</b></div></div>
          <table class="mini"><tr><th>Verandering sinds de start</th><th></th></tr>
          <tr><td>Loonkosten per werknemer</td><td>${ECO.teken(dl)}%</td></tr><tr><td>Arbeidsproductiviteit</td><td>${ECO.teken(da)}%</td></tr>
          <tr><td>Loonkosten per product, vuistregel</td><td>${ECO.teken(dl - da)}%</td></tr><tr class="tot"><td>Loonkosten per product, precies</td><td>${ECO.teken(dk)}%</td></tr></table>`;
        if (vrijAan) {
          const ok = loon >= L0 && lk < 22;
          el.querySelector("[data-vrij]").innerHTML = `<div class="opdr-kop">Slotopdracht</div><p class="opdr-q">Breng de loonkosten per product onder de € 22, <b>zonder</b> de loonkosten per werknemer te verlagen (dus minstens € 60.000).</p>${ok ? `<div class="eco-fb ok"><b>✔ Gelukt.</b> Met een arbeidsproductiviteit van ${nl(apt)} kost een product nog maar ${ECO.eur(lk, 2)} aan loon. Zo kan een land met hoge lonen toch concurreren: door scholing, betere machines en innovatie.</div>` : `<div class="eco-fb">Nu: ${ECO.eur(lk, 2)} per product bij een loon van ${ECO.eur(loon)}.</div>`}`;
          if (ok) api.klaar();
        }
      }
      const zet = (l, a) => { loon = l; apt = a; el.querySelector("[data-s=loon]").value = l; el.querySelector("[data-s=apt]").value = a; teken(); };
      el.querySelector("[data-s=loon]").oninput = (e) => { loon = +e.target.value; teken(); };
      el.querySelector("[data-s=apt]").oninput = (e) => { apt = +e.target.value; teken(); };
      teken();
      ECO.voorspel(el.querySelector("[data-opdr]"), [
        { start: () => zet(L0, A0), doe: () => zet(66000, A0),
          q: "De loonkosten per werknemer stijgen met 10% (naar € 66.000). De arbeidsproductiviteit blijft 2.400. Wat gebeurt er met de loonkosten per product?",
          opties: ["Die stijgen met 10% naar € 27,50", "Die blijven € 25,00", "Die stijgen met € 10 naar € 35,00", "Die dalen met 10% naar € 22,50"],
          uitleg: "€ 66.000 / 2.400 = € 27,50. Elk product kost nu 10% meer aan loon: de concurrentiepositie verslechtert." },
        { start: () => zet(L0, A0), doe: () => zet(66000, 2640),
          q: "Nu stijgen de loonkosten met 10% én de arbeidsproductiviteit met 10% (naar 2.640). Wat gebeurt er met de loonkosten per product?",
          opties: ["Die blijven gelijk", "Die stijgen met 10%", "Die stijgen met 20%", "Die dalen met 10%"],
          uitleg: "€ 66.000 / 2.640 = € 25,00. Een loonsverhoging die gelijk is aan de stijging van de arbeidsproductiviteit kost geen concurrentiepositie." },
        { start: () => zet(L0, A0), doe: () => zet(63000, 2800),
          q: "Een minister zegt: “Onze lonen stijgen, dus onze concurrentiepositie verslechtert.” Klopt dat altijd?",
          opties: ["Nee: alleen als de lonen sterker stijgen dan de arbeidsproductiviteit", "Ja: hogere lonen betekenen altijd hogere kosten per product", "Nee: lonen hebben geen invloed op de concurrentiepositie", "Ja: tenzij de wisselkoers tegelijk verandert"],
          uitleg: "Het gaat om de loonkosten **per product**. Hier stijgt het loon 5% en de arbeidsproductiviteit bijna 17%: per product dalen de loonkosten naar € 22,50." }
      ], () => { vrijAan = true; el.querySelector("[data-vrij]").style.display = ""; zet(L0, A0); });
    }
  });

  // ------------------------------------------------------------------
  // 10. Pensioen: omslagstelsel en dekkingsgraad
  // ------------------------------------------------------------------
  TW.widget("pensioen", {
    titel: "Pensioen-lab", icoon: "👵",
    uitleg: "Twee manieren om pensioen te betalen. Bij de AOW betalen de werkenden van nu (omslagstelsel). Een pensioenfonds spaart en belegt (kapitaaldekkingsstelsel) en let op de dekkingsgraad.",
    maak(el, api) {
      const mens = (x, y, cls) => `<circle cx="${x}" cy="${y}" r="4.5" class="${cls}"/><path d="M${x - 6} ${y + 19} v-7 a6 6 0 0 1 12 0 v7 z" class="${cls}"/>`;
      ECO.tabs(el, [["Omslagstelsel (AOW)", omslag], ["Dekkingsgraad", dekking]]);

      function omslag(p) {
        const UITK = 16000, PREM0 = 4000;
        let druk = 25, vast = "uitkering";
        p.innerHTML = `<div data-g></div>${schuif("druk", "Grijze druk", 20, 60, 5, druk)}
          <div class="keuze" data-k><button class="btn" data-k="uitkering">De uitkering blijft gelijk</button><button class="btn" data-k="premie">De premie blijft gelijk</button></div>
          <div class="uit" data-u></div><div data-opdr></div>`;
        function teken() {
          const nOud = druk / 5;
          let s = `<text x="6" y="12" class="k b pa">100 van 20 tot 65 jaar (premie)</text>`;
          for (let i = 0; i < 20; i++) s += mens(16 + (i % 10) * 16.5, 24 + Math.floor(i / 10) * 26, "mens");
          s += `<text x="186" y="12" class="k b pb">${druk} van 65 jaar of ouder</text>`;
          for (let i = 0; i < nOud; i++) s += mens(194 + (i % 6) * 16.5, 24 + Math.floor(i / 6) * 26, "mens2");
          s += `<text x="6" y="92" class="k">Elk poppetje staat voor 5 personen.</text>`;
          p.querySelector("[data-g]").innerHTML = `<svg class="fig" viewBox="0 0 340 98" role="img" aria-label="Poppetjes: werkenden tegenover ouderen">${s}</svg>`;
          p.querySelector("[data-o=druk]").textContent = druk + "%";
          p.querySelectorAll("[data-k] .btn").forEach((b) => b.classList.toggle("aan", b.dataset.k === vast));
          const premie = vast === "uitkering" ? UITK * druk / 100 : PREM0, uitk = vast === "uitkering" ? UITK : PREM0 / (druk / 100);
          p.querySelector("[data-u]").innerHTML = `<div class="kern-getal drie"><div><small>Werkenden per oudere</small><b>${nl(100 / druk, 1)}</b></div><div><small>Premie per werkende per jaar</small><b class="${premie > PREM0 ? "neer" : ""}">${ECO.eur(premie)}</b></div><div><small>AOW-uitkering per jaar</small><b class="${uitk < UITK - 0.5 ? "neer" : ""}">${ECO.eur(Math.round(uitk))}</b></div></div>
            <p class="noot">${vast === "uitkering" ? `Totale uitkeringen = totale premies: ${druk} × ${ECO.eur(UITK)} = 100 × ${ECO.eur(premie)}.` : `Totale premies = totale uitkeringen: 100 × ${ECO.eur(PREM0)} = ${druk} × ${ECO.eur(Math.round(uitk))}.`} Verzonnen bedragen; we doen alsof iedereen van 20 tot 65 werkt en premie betaalt. Er wordt niets gespaard: wat dit jaar binnenkomt, gaat er dit jaar weer uit.</p>`;
        }
        const zet = (d, v) => { druk = d; if (v) vast = v; p.querySelector("[data-s=druk]").value = d; teken(); };
        p.querySelector("[data-s=druk]").oninput = (e) => { druk = +e.target.value; teken(); };
        p.querySelectorAll("[data-k] .btn").forEach((b) => (b.onclick = () => { vast = b.dataset.k; teken(); }));
        teken();
        ECO.voorspel(p.querySelector("[data-opdr]"), [
          { start: () => zet(25, "uitkering"), doe: () => zet(50, "uitkering"),
            q: "Door vergrijzing stijgt de grijze druk van 25% naar 50%. De AOW-uitkering blijft even hoog. Wat gebeurt er met de premie per werkende?",
            opties: ["Die verdubbelt", "Die stijgt met 25%", "Die blijft gelijk", "Die halveert"],
            uitleg: "Eerst betaalden 4 werkenden samen één uitkering, nu nog maar 2. De premie gaat van € 4.000 naar € 8.000 per werkende." },
          { start: () => zet(25, "premie"), doe: () => zet(40, "premie"),
            q: "De politiek wil de premie niet verhogen. De grijze druk stijgt van 25% naar 40%. Wat gebeurt er dan met de AOW-uitkering?",
            opties: ["Die daalt naar € 10.000", "Die blijft € 16.000", "Die daalt naar € 6.400", "Die stijgt naar € 25.600"],
            uitleg: "Er komt 100 × € 4.000 = € 400.000 binnen. Verdeeld over 40 ouderen is dat € 10.000 per persoon." },
          { start: () => zet(40, "uitkering"),
            q: "Welke maatregel verlaagt de grijze druk zelf (en dus het probleem van het omslagstelsel)?",
            opties: ["De AOW-leeftijd verhogen", "De AOW-uitkering waardevast maken", "De pensioenpremie voor fondsen verhogen", "De dekkingsgraad van fondsen verhogen"],
            uitleg: "Bij een hogere AOW-leeftijd zijn er minder mensen met een uitkering en meer mensen die premie betalen. Dekkingsgraad en pensioenfondsen horen bij het kapitaaldekkingsstelsel, niet bij de AOW." }
        ], () => api.klaar());
      }

      function dekking(p) {
        let V = 105, L = 100;
        p.innerHTML = `<div class="kern-getal drie"><div><small>Vermogen</small><b data-v></b></div><div><small>Contante waarde verplichtingen</small><b data-l></b></div><div><small>Dekkingsgraad</small><b data-d></b></div></div>
          <div class="meter" aria-hidden="true"><i style="width:40%;background:var(--bad);opacity:.55"></i><i style="width:10%;background:var(--oranje);opacity:.55"></i><i style="width:50%;background:var(--good);opacity:.55"></i></div><div class="meter-wijzer"><span data-w></span></div>
          <div class="pl" style="margin-top:2px"><span>60%</span><span>100% · 110%</span><span>160%</span></div>
          <p data-o></p>
          <div class="keuze"><button class="btn" data-e="beursneer">📉 Beurs −20%</button><button class="btn" data-e="beursop">📈 Beurs +15%</button><button class="btn" data-e="renteneer">Rente daalt</button><button class="btn" data-e="renteop">Rente stijgt</button><button class="btn" data-e="ouder">Mensen leven langer</button><button class="btn" data-e="reset">↺ Herstel</button></div>
          <p class="noot">Dekkingsgraad = vermogen / contante waarde van de verplichtingen × 100%. De grenzen van 100% en 110% zijn hier verzonnen; de echte regels staan in de opgave.</p><div data-opdr></div>`;
        function teken() {
          const d = (V / L) * 100;
          p.querySelector("[data-v]").textContent = "€ " + nl(V, 1) + " mld";
          p.querySelector("[data-l]").textContent = "€ " + nl(L, 1) + " mld";
          p.querySelector("[data-d]").textContent = ECO.pct(d);
          const w = p.querySelector("[data-w]"); w.textContent = ECO.pct(d, 0); w.style.left = ECO.klem((d - 60), 0, 100) + "%";
          p.querySelector("[data-o]").innerHTML = d < 100 ? "<b>Tekort.</b> Het fonds heeft te weinig vermogen voor alle toekomstige uitkeringen. Indexeren kan niet en als dit lang duurt, moeten de pensioenen worden gekort (verlaagd) of de premies omhoog."
            : d < 110 ? "<b>Net genoeg.</b> Het fonds kan de pensioenen betalen, maar heeft geen buffer. Indexeren kan niet of maar voor een deel: gepensioneerden verliezen koopkracht als de prijzen stijgen."
            : "<b>Ruim voldoende.</b> Het fonds heeft een buffer en kan de pensioenen indexeren: laten meestijgen met de prijzen (waardevast) of met de lonen (welvaartsvast).";
        }
        const EV = { beursneer: () => (V *= 0.8), beursop: () => (V *= 1.15), renteneer: () => (L *= 1.1), renteop: () => (L *= 0.9), ouder: () => (L *= 1.05), reset: () => { V = 105; L = 100; } };
        p.querySelectorAll("[data-e]").forEach((b) => (b.onclick = () => { EV[b.dataset.e](); teken(); }));
        const zet = (v, l) => { V = v; L = l; teken(); };
        teken();
        ECO.voorspel(p.querySelector("[data-opdr]"), [
          { start: () => zet(105, 100), doe: () => zet(105, 110),
            q: "De rente daalt. Het vermogen van het fonds blijft € 105 mld. Wat gebeurt er met de dekkingsgraad?",
            opties: ["Die daalt: de contante waarde van de verplichtingen stijgt", "Die stijgt: het fonds hoeft minder rente te betalen", "Die blijft gelijk: het vermogen verandert niet", "Die stijgt: de beleggingen leveren meer op"],
            uitleg: "Bij een lagere rente groeit geld minder hard aan. Het fonds moet dus nú meer in kas hebben om later hetzelfde te kunnen uitkeren: de contante waarde van de verplichtingen stijgt, de dekkingsgraad daalt (hier naar 95,5%)." },
          { start: () => zet(105, 100), doe: () => zet(84, 100),
            q: "De aandelenkoersen dalen met 20%. De dekkingsgraad zakt naar 84%. Wat merken de gepensioneerden daarvan als dit aanhoudt?",
            opties: ["Hun pensioen wordt niet geïndexeerd en kan zelfs gekort worden", "Niets: een toegezegd pensioen kan nooit omlaag", "Hun AOW-uitkering wordt verlaagd", "Ze moeten zelf extra premie gaan betalen"],
            uitleg: "Bij een tekort kan het fonds de pensioenen niet laten meestijgen met de prijzen en moet het soms korten. De AOW staat hier los van: die wordt via het omslagstelsel betaald." },
          { start: () => zet(105, 100), doe: () => zet(105, 105),
            q: "De levensverwachting stijgt: mensen krijgen gemiddeld langer pensioen. Wat betekent dat voor het pensioenfonds?",
            opties: ["De verplichtingen stijgen, dus de dekkingsgraad daalt", "Het vermogen stijgt, dus de dekkingsgraad stijgt", "Niets: de premies zijn al betaald", "De grijze druk daalt, dus de dekkingsgraad stijgt"],
            uitleg: "Het fonds moet per deelnemer meer jaren uitkeren. De contante waarde van de toekomstige verplichtingen wordt groter, terwijl het vermogen gelijk blijft." }
        ], () => api.klaar());
      }
    }
  });
})();
