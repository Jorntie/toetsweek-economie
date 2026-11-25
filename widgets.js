// Interactieve onderdelen bij Welvaart (hoofdstuk 2) en gedeelde hulpfuncties (ECO).
// De onderdelen bij Arbeid (hoofdstuk 5) staan in widgets-arbeid.js.
(function () {
  "use strict";
  const nl = TW.nl, fmt = TW.fmt, esc = TW.esc;
  const ECO = (window.ECO = {});
  ECO.eur = (x, d) => "€ " + nl(x, d == null ? 0 : d);
  ECO.pct = (x, d) => nl(x, d == null ? 1 : d) + "%";
  ECO.klem = (x, a, b) => Math.max(a, Math.min(b, x));
  ECO.teken = (x, d) => (x > 0 ? "+" : x < 0 ? "−" : "") + nl(Math.abs(x), d == null ? 1 : d);
  // Nederlandse getalinvoer: "1.250,5", "12,5%", "€ 300"
  ECO.getal = (s) => {
    s = String(s).trim().replace(/[€%$\s]/g, "").replace(/−/g, "-");
    if (s === "") return NaN;
    if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s = s.replace(/\./g, "");
    return Number(s.replace(",", "."));
  };
  // Tabbladen: defs = [[naam, bouw(paneel)], ...]
  ECO.tabs = (el, defs) => {
    el.innerHTML = `<div class="eco-tabs" role="tablist">${defs.map((d, i) => `<button class="btn" role="tab" data-i="${i}">${esc(d[0])}</button>`).join("")}</div><div class="eco-paneel"></div>`;
    const knoppen = [...el.querySelectorAll(".eco-tabs .btn")], paneel = el.querySelector(".eco-paneel");
    const kies = (i) => { knoppen.forEach((k, n) => k.classList.toggle("aan", n === i)); paneel.innerHTML = ""; defs[i][1](paneel); };
    knoppen.forEach((k, i) => (k.onclick = () => kies(i)));
    kies(0);
  };
  // Reeks opdrachten "voorspel eerst": lijst = [{ q, opties: [goed, fout, ...], uitleg, start(), doe() }]
  ECO.voorspel = (houder, lijst, klaarFn, kop) => {
    let i = 0, goed = 0;
    function toon() {
      if (i >= lijst.length) {
        houder.innerHTML = `<div class="opdr"><div class="opdr-kop">Opdrachten klaar</div><p class="opdr-q">${goed} van de ${lijst.length} in één keer goed voorspeld. ${goed === lijst.length ? "Sterk! 🎉" : "Speel verder met de knoppen of doe ze nog een keer."}</p><button class="btn klein" data-a="weer">Opnieuw</button></div>`;
        houder.querySelector("[data-a=weer]").onclick = () => { i = 0; goed = 0; toon(); };
        if (klaarFn) klaarFn();
        return;
      }
      const o = lijst[i];
      if (o.start) o.start();
      const opties = TW.shuffle(o.opties.map((t, n) => ({ t, n })));
      houder.innerHTML = `<div class="opdr"><div class="opdr-kop">${kop || "Opdracht"} ${i + 1} van ${lijst.length} · voorspel eerst</div>
        <p class="opdr-q">${fmt(o.q)}</p>${opties.map((p) => `<button class="opt" data-n="${p.n}">${fmt(p.t)}</button>`).join("")}<div class="fbplek"></div></div>`;
      const knoppen = [...houder.querySelectorAll(".opt")];
      knoppen.forEach((k) => (k.onclick = () => {
        const juist = k.dataset.n === "0";
        knoppen.forEach((kk) => { kk.disabled = true; if (kk.dataset.n === "0") kk.classList.add("goed"); });
        if (!juist) k.classList.add("fout"); else goed++;
        if (o.doe) o.doe();
        houder.querySelector(".fbplek").innerHTML = `<div class="eco-fb ${juist ? "ok" : "nok"}"><b>${juist ? "✔ Goed voorspeld." : "✖ Nog niet."}</b> ${fmt(o.uitleg)}${o.doe ? " Kijk wat er hierboven is veranderd." : ""}<br><button class="btn klein primary" data-a="verder">${i + 1 < lijst.length ? "Volgende opdracht" : "Afronden"}</button></div>`;
        houder.querySelector("[data-a=verder]").onclick = () => { i++; toon(); };
      }));
    }
    toon();
  };
  // Korte rekenvraag binnen een widget: { q, antwoord (getal of functie), tol, eenheid, hint, stappen (lijst of functie) }, cb(juist)
  ECO.rekenvraag = (houder, d, cb) => {
    let pogingen = 0, af = false;
    const A = () => (typeof d.antwoord === "function" ? d.antwoord() : d.antwoord);
    const St = () => (typeof d.stappen === "function" ? d.stappen() : d.stappen) || [];
    houder.innerHTML = `<p class="opdr-q">${fmt(d.q)}</p><div class="eco-in"><input inputmode="decimal" autocomplete="off" aria-label="Jouw antwoord" placeholder="antwoord">${d.eenheid ? `<span class="eenh">${esc(d.eenheid)}</span>` : ""}<button class="btn primary" data-a="chk">Controleer</button></div><div class="fbplek"></div>`;
    const inv = houder.querySelector("input"), fb = houder.querySelector(".fbplek");
    const einde = (juist) => {
      if (af) return; af = true; inv.disabled = true; houder.querySelector("[data-a=chk]").disabled = true;
      const st = St();
      fb.innerHTML = `<div class="eco-fb ${juist ? "ok" : "nok"}"><b>${juist ? "✔ Goed!" : "✖ Het antwoord is " + nl(A()) + (d.eenheid ? " " + esc(d.eenheid) : "") + "."}</b>${st.length ? `<ol class="stappen">${st.map((s) => `<li>${fmt(s)}</li>`).join("")}</ol>` : ""}</div>`;
      cb(juist);
    };
    const check = () => {
      const g = ECO.getal(inv.value), a = A();
      if (isNaN(g)) return;
      if (Math.abs(g - a) <= (d.tol != null ? d.tol : Math.max(Math.abs(a) * 0.01, 0.005)) + 1e-9) return einde(true);
      pogingen++;
      if (pogingen >= 2) return einde(false);
      fb.innerHTML = `<div class="eco-fb nok">Nog niet goed. ${d.hint ? "💡 " + fmt(d.hint) : "Probeer het nog één keer."}</div>`;
    };
    houder.querySelector("[data-a=chk]").onclick = check;
    inv.onkeydown = (e) => { if (e.key === "Enter") check(); };
  };
  const schuif = (naam, label, min, max, step, val) => `<label class="schuif"><span>${label}</span><output data-o="${naam}"></output><input data-s="${naam}" type="range" min="${min}" max="${max}" step="${step}" value="${val}"></label>`;
  ECO.schuif = schuif;
  // staaf in een plot: van basis tot v, met naam eronder en waarde erboven
  ECO.staaf = (P, x, v, cls, naam, label, basis, br) => {
    const b = basis || 0, h = br || 0.32;
    return P.vlak([[x - h, b], [x - h, v], [x + h, v], [x + h, b]], cls) + (naam ? P.tekst(x, b, naam, "middle", "k", 0, 14) : "") + (label != null ? P.tekst(x, Math.max(v, b), label, "middle", "b", 0, -4) : "");
  };
  ECO.rooster = (P, x1, y0, y1, stap) => {
    let s = "";
    for (let v = y0; v <= y1 + 1e-9; v += stap) s += P.lijn(0, v, x1, v, "raster") + P.tekst(0, v, nl(v), "end", "k", -6, 4);
    return s;
  };

  // ------------------------------------------------------------------
  // 1. Van nominaal naar reëel
  // ------------------------------------------------------------------
  TW.widget("reeel", {
    titel: "Van nominaal naar reëel", icoon: "🧾",
    uitleg: "Meer euro's is niet altijd meer kopen. Verschuif de nominale stijging en de inflatie en kijk wat er reëel overblijft.",
    maak(el, api) {
      const SOORT = {
        loon: { naam: "Loon", reeel: "reële loon (de koopkracht van het loon)" },
        bbp: { naam: "Bbp", reeel: "reële bbp" },
        ink: { naam: "Inkomen", reeel: "reële inkomen (de koopkracht)" }
      };
      ECO.tabs(el, [["Verkennen", verken], ["Oefenen", oefen]]);

      function verken(p) {
        let soort = "loon", n = 4, i = 1.5;
        p.innerHTML = `<div class="keuze" data-k>${Object.keys(SOORT).map((k) => `<button class="btn" data-k="${k}">${SOORT[k].naam}</button>`).join("")}</div>
          <div data-g></div>
          ${schuif("n", "Nominale verandering", -4, 12, 0.5, n)}${schuif("i", "Prijzen (inflatie)", -2, 10, 0.5, i)}
          <div class="uit" data-u></div><div data-opdr></div>`;
        const P = api.plot({ x: [0, 3], y: [85, 116], w: 340, h: 200, mb: 30 });
        function teken() {
          const S = SOORT[soort], ni = 100 + n, pi = 100 + i, ri = (ni / pi) * 100;
          p.querySelectorAll("[data-k] .btn").forEach((b) => b.classList.toggle("aan", b.dataset.k === soort));
          const st = (x, v, cls, naam) => P.vlak([[x - 0.32, 100], [x - 0.32, v], [x + 0.32, v], [x + 0.32, 100]], cls) +
            P.tekst(x, Math.max(v, 100), nl(v, 1), "middle", "b", 0, -5) + P.tekst(x, 85, naam, "middle", "k", 0, 14);
          let rooster = "";
          for (let v = 85; v <= 115; v += 5) rooster += P.lijn(0, v, 3, v, "raster") + P.tekst(0, v, String(v), "end", "k", -6, 4);
          p.querySelector("[data-g]").innerHTML = P.svg(rooster + P.lijn(0, 100, 3, 100, "s") +
            st(0.5, ni, "vlak", "nominaal") + st(1.5, pi, "vlak4", "prijzen") + st(2.5, ri, ri >= 100 ? "vlak3" : "vlak2", "reëel") +
            `<text x="4" y="10" class="k b">indexcijfer (vorig jaar = 100)</text>`, "Staven met het nominale indexcijfer, het prijsindexcijfer en het reële indexcijfer");
          p.querySelector("[data-o=n]").textContent = ECO.teken(n) + "%";
          p.querySelector("[data-o=i]").textContent = ECO.teken(i) + "%";
          const vuist = n - i, exact = ri - 100;
          const richting = Math.abs(exact) < 0.005 ? "blijft gelijk" : exact > 0 ? "stijgt" : "daalt";
          p.querySelector("[data-u]").innerHTML = `<b>Het ${S.reeel} ${richting}.</b>
            <table class="mini"><tr><td>Vuistregel</td><td>${nl(n, 1)}% − ${nl(i, 1)}% = <b>${ECO.teken(vuist)}%</b></td></tr>
            <tr><td>Met indexcijfers</td><td>${nl(ni, 1)} / ${nl(pi, 1)} × 100 = <b>${nl(ri, 2)}</b></td></tr>
            <tr class="tot"><td>Verschil</td><td>${nl(Math.abs(vuist - exact), 2)} procentpunt</td></tr></table>
            <p class="noot">De vuistregel werkt goed bij kleine percentages. Hoe groter de inflatie, hoe verder hij ernaast zit: probeer maar.</p>`;
        }
        p.querySelectorAll("[data-k] .btn").forEach((b) => (b.onclick = () => { soort = b.dataset.k; teken(); }));
        p.querySelector("[data-s=n]").oninput = (e) => { n = +e.target.value; teken(); };
        p.querySelector("[data-s=i]").oninput = (e) => { i = +e.target.value; teken(); };
        const zet = (a, b, s) => { n = a; i = b; if (s) soort = s; p.querySelector("[data-s=n]").value = a; p.querySelector("[data-s=i]").value = b; teken(); };
        teken();
        ECO.voorspel(p.querySelector("[data-opdr]"), [
          { start: () => zet(4, 1.5, "loon"), doe: () => zet(3, 3, "loon"), q: "Je loon stijgt met 3% en de prijzen stijgen ook met 3%. Wat gebeurt er met je koopkracht?",
            opties: ["Die blijft gelijk", "Die stijgt met 3%", "Die daalt met 3%", "Die stijgt met 6%"],
            uitleg: "Je krijgt 3% meer euro's, maar alles is ook 3% duurder. Je kunt precies evenveel kopen. Dit heet prijscompensatie." },
          { doe: () => zet(2, 5, "loon"), q: "Het nominale loon stijgt met 2%, de inflatie is 5%. Wat gebeurt er met het reële loon?",
            opties: ["Het daalt met ongeveer 3%", "Het stijgt met ongeveer 2%", "Het stijgt met ongeveer 7%", "Het daalt met ongeveer 5%"],
            uitleg: "Vuistregel: 2% − 5% = −3%. Je loon in euro's stijgt, maar je kunt er minder van kopen." },
          { doe: () => zet(1, -1, "bbp"), q: "Het nominale bbp stijgt met 1%, terwijl de prijzen met 1% dalen (deflatie). Wat gebeurt er met het reële bbp?",
            opties: ["Het stijgt met ongeveer 2%", "Het blijft gelijk", "Het stijgt met ongeveer 1%", "Het daalt met ongeveer 2%"],
            uitleg: "1% − (−1%) = +2%. Bij dalende prijzen is de reële groei groter dan de nominale groei." }
        ], () => api.klaar());
      }

      function oefen(p) {
        let goed = 0, n = 0;
        const R = api.R;
        function maak() {
          const t = R.kies(["vuist", "vuist", "index", "hoofd", "comp"]);
          const a = R.int(15, 60) / 10, b = R.int(10, 45) / 10;
          if (t === "vuist") {
            const wat = R.kies([["het nominale loon", "het reële loon"], ["het nominale inkomen", "de koopkracht"], ["het nominale bbp", "het reële bbp"]]);
            return { q: `In een jaar stijgt ${wat[0]} met ${nl(a, 1)}%. De prijzen stijgen met ${nl(b, 1)}%. Bereken met de **vuistregel** de procentuele verandering van ${wat[1]}. Een daling noteer je met een min.`,
              antwoord: R.rond(a - b, 1), tol: 0.051, eenheid: "%", hint: "Vuistregel: nominale verandering min de inflatie.",
              stappen: [`Vuistregel: reële verandering = nominale verandering − inflatie`, `${nl(a, 1)}% − ${nl(b, 1)}% = ${ECO.teken(R.rond(a - b, 1))}%`] };
          }
          if (t === "index") {
            const r = (100 + a) / (100 + b) * 100;
            return { q: `Het nominale inkomen stijgt met ${nl(a, 1)}% en de prijzen stijgen met ${nl(b, 1)}%. Bereken **met indexcijfers** het indexcijfer van de koopkracht (vorig jaar = 100). Rond af op twee decimalen.`,
              antwoord: R.rond(r, 2), tol: 0.011, hint: "Reëel indexcijfer = nominaal indexcijfer / prijsindexcijfer × 100.",
              stappen: [`Nominaal indexcijfer: ${nl(100 + a, 1)}. Prijsindexcijfer: ${nl(100 + b, 1)}.`, `${nl(100 + a, 1)} / ${nl(100 + b, 1)} × 100 = ${nl(R.rond(r, 2), 2)}`, `De koopkracht verandert dus met ${ECO.teken(R.rond(r - 100, 2), 2)}%.`] };
          }
          if (t === "hoofd") {
            const c = R.int(2, 12) / 10, g = R.rond(a + 1, 1);
            return { q: `Het nominale bbp groeit met ${nl(g, 1)}%, de inflatie is ${nl(b, 1)}% en de bevolking groeit met ${nl(c, 1)}%. Bereken met de **vuistregel** de groei van het reële bbp per hoofd van de bevolking. Een daling noteer je met een min.`,
              antwoord: R.rond(g - b - c, 1), tol: 0.051, eenheid: "%", hint: "Haal van de nominale groei eerst de inflatie af en daarna de bevolkingsgroei.",
              stappen: [`Reëel bbp: ${nl(g, 1)}% − ${nl(b, 1)}% = ${ECO.teken(R.rond(g - b, 1))}%`, `Per hoofd: ${ECO.teken(R.rond(g - b, 1))}% − ${nl(c, 1)}% = ${ECO.teken(R.rond(g - b - c, 1))}%`] };
          }
          return { q: `De inflatie is ${nl(b, 1)}%. Een vakbond eist prijscompensatie en daarbovenop ${nl(a, 1)}% koopkrachtverbetering. Welke nominale loonstijging eist de vakbond volgens de vuistregel?`,
            antwoord: R.rond(a + b, 1), tol: 0.051, eenheid: "%", hint: "Nominaal = reëel + inflatie.",
            stappen: [`Prijscompensatie: het loon stijgt mee met de inflatie van ${nl(b, 1)}%.`, `Daarbovenop ${nl(a, 1)}% koopkracht: ${nl(b, 1)}% + ${nl(a, 1)}% = ${nl(R.rond(a + b, 1), 1)}%`] };
        }
        function nieuw() {
          p.innerHTML = `<div class="opdr"><div class="opdr-kop">Oefenen met nieuwe getallen · ${goed} van ${n} goed</div><div data-v></div><div data-n></div></div>`;
          ECO.rekenvraag(p.querySelector("[data-v]"), maak(), (juist) => {
            n++; if (juist) goed++;
            if (goed >= 3) api.klaar();
            p.querySelector(".opdr-kop").textContent = `Oefenen met nieuwe getallen · ${goed} van ${n} goed`;
            p.querySelector("[data-n]").innerHTML = `<button class="btn primary" style="margin-top:10px">Nieuwe opgave</button>`;
            p.querySelector("[data-n] .btn").onclick = nieuw;
          });
        }
        nieuw();
      }
    }
  });

  // ------------------------------------------------------------------
  // 2. Bbp-bouwer
  // ------------------------------------------------------------------
  TW.widget("bbpbouwer", {
    titel: "Bbp-bouwer", icoon: "🏗️",
    uitleg: "Volg een brood door de bedrijfskolom. Elke schakel voegt waarde toe: omzet min inkoop. Bedragen in miljoenen euro's.",
    maak(el, api) {
      ECO.tabs(el, [["Bedrijfskolom", kolom], ["Bbp per hoofd", hoofd]]);

      function kolom(p) {
        const NAAM = ["Boer", "Meelfabriek", "Bakkerij", "Supermarkt"], ICO = ["🌾", "🏭", "🥖", "🛒"];
        const START = [40, 90, 160, 220];
        let om = START.slice();
        p.innerHTML = `<div data-g></div><div data-st></div><div class="uit" data-u></div><div data-opdr></div>`;
        const P = api.plot({ x: [0, 4], y: [0, 300], w: 340, h: 230, mb: 34, mt: 20 });
        p.querySelector("[data-st]").innerHTML = NAAM.map((nm, i) => `<div class="stapper"><span>${ICO[i]} Omzet ${nm.toLowerCase()}</span><button class="btn" data-i="${i}" data-d="-10" aria-label="Omzet ${nm} omlaag">−</button><output data-o="${i}"></output><button class="btn" data-i="${i}" data-d="10" aria-label="Omzet ${nm} omhoog">+</button></div>`).join("");
        const som = (a) => a.reduce((x, y) => x + y, 0);
        function teken() {
          let b = ECO.rooster(P, 4, 0, 300, 50) + P.lijn(0, 0, 4, 0, "s");
          om.forEach((o, i) => {
            const ink = i ? om[i - 1] : 0, x = i + 0.5;
            if (ink) b += P.vlak([[x - 0.36, 0], [x - 0.36, ink], [x + 0.36, ink], [x + 0.36, 0]], "grijs");
            b += P.vlak([[x - 0.36, ink], [x - 0.36, o], [x + 0.36, o], [x + 0.36, ink]], "vlak3");
            b += P.tekst(x, o, "+" + (o - ink), "middle", "b pg", 0, -5);
            if (ink >= 40) b += P.tekst(x, ink / 2, "inkoop", "middle", "k", 0, 4);
            b += P.tekst(x, 0, NAAM[i], "middle", "k", 0, 14);
            if (i < 3) b += P.lijn(x + 0.36, o, x + 0.64, o, "stip");
            p.querySelector(`[data-o="${i}"]`).textContent = o;
          });
          b += `<text x="4" y="10" class="k b">omzet (× € 1 mln): grijs = inkoop, groen = toegevoegde waarde</text>`;
          p.querySelector("[data-g]").innerHTML = P.svg(b, "Bedrijfskolom met per schakel de inkoop en de toegevoegde waarde");
          const tw = om.map((o, i) => o - (i ? om[i - 1] : 0));
          p.querySelector("[data-u]").innerHTML = `<table class="mini"><tr><th>Schakel</th><th>Omzet</th><th>Inkoop</th><th>Toeg. waarde</th></tr>
            ${om.map((o, i) => `<tr><td>${NAAM[i]}</td><td>${o}</td><td>${i ? om[i - 1] : 0}</td><td><b>${tw[i]}</b></td></tr>`).join("")}
            <tr class="tot"><td>Totaal</td><td>${som(om)}</td><td></td><td>${som(tw)}</td></tr></table>
            <p class="noot">De som van de toegevoegde waarde (${som(tw)}) is gelijk aan de omzet van de laatste schakel. De som van de omzetten (${som(om)}) is veel groter: daarin zit het graan vier keer. Voor het gemak koopt de boer hier niets in.</p>`;
        }
        p.querySelector("[data-st]").onclick = (e) => {
          const k = e.target.closest("button"); if (!k) return;
          const i = +k.dataset.i, nv = om[i] + +k.dataset.d;
          const min = i ? om[i - 1] : 10, max = i < 3 ? om[i + 1] : 290;
          if (nv < min || nv > max) return;
          om[i] = nv; teken();
        };
        teken();
        ECO.voorspel(p.querySelector("[data-opdr]"), [
          { start: () => { om = START.slice(); teken(); }, doe: () => { om[3] = 240; teken(); },
            q: "De supermarkt verhoogt haar prijzen: de omzet stijgt van 220 naar 240. De inkoop blijft gelijk. Wat gebeurt er met de totale toegevoegde waarde van deze bedrijfskolom?",
            opties: ["Die stijgt met 20", "Die stijgt met 240", "Die blijft gelijk", "Die stijgt met 80"],
            uitleg: "Alleen de toegevoegde waarde van de supermarkt verandert: van 60 naar 80. Het totaal gaat van 220 naar 240." },
          { start: () => { om = START.slice(); teken(); }, doe: () => { om[0] = 50; teken(); },
            q: "De boer vraagt meer voor zijn graan: zijn omzet stijgt van 40 naar 50. De andere omzetten blijven gelijk. Wat gebeurt er met de totale toegevoegde waarde?",
            opties: ["Die blijft 220: de boer krijgt 10 erbij, de meelfabriek 10 minder", "Die stijgt met 10, want de boer verdient nu meer dan eerst", "Die stijgt met 40, want elke schakel in de kolom wordt duurder", "Die daalt met 10, want de inkoop van de fabriek wordt duurder"],
            uitleg: "De meelfabriek koopt duurder in maar verkoopt voor dezelfde prijs. De waarde verschuift binnen de kolom; de consument betaalt nog steeds 220." },
          { start: () => { om = START.slice(); teken(); },
            q: "Waarom telt het CBS voor het bbp de toegevoegde waarde op en niet de omzetten?",
            opties: ["Anders tel je dezelfde productie meerdere keren mee", "Omdat de omzet altijd zonder btw wordt gemeten", "Omdat alleen de laatste schakel iets produceert", "Omdat de inkoop meestal uit het buitenland komt"],
            uitleg: "In de omzet van de bakker zit het meel al, en in het meel het graan. Omzetten optellen geeft dubbeltellingen." }
        ], () => api.klaar());
      }

      function hoofd(p) {
        let bbp = 600, inw = 60;
        const B = { bbp: 900, inw: 60 };
        p.innerHTML = `<h4>Land A (stel jij in)</h4>${schuif("bbp", "Bbp", 100, 1200, 20, bbp)}${schuif("inw", "Inwoners", 5, 80, 1, inw)}
          <div class="kern-getal"><div><small>Land A: bbp per hoofd</small><b data-a></b></div><div><small>Land B: € 900 mld, 60 mln inwoners</small><b>${ECO.eur(B.bbp * 1000 / B.inw)}</b></div></div>
          <div data-g></div><div class="opdr"><div class="opdr-kop">Opdracht</div><p class="opdr-q">Maak van A een land met een <b>kleiner</b> bbp dan land B, maar met een <b>hoger</b> bbp per hoofd.</p><div data-fb></div></div>`;
        const P = api.plot({ x: [0, 2], y: [0, 40], w: 340, h: 170, mb: 30, mt: 20 });
        function teken() {
          const a = bbp * 1000 / inw, b = B.bbp * 1000 / B.inw;
          p.querySelector("[data-o=bbp]").textContent = "€ " + nl(bbp) + " mld";
          p.querySelector("[data-o=inw]").textContent = inw + " mln";
          p.querySelector("[data-a]").textContent = ECO.eur(Math.round(a));
          const s = ECO.rooster(P, 2, 0, 40, 10) + ECO.staaf(P, 0.5, Math.min(a / 1000, 40), "vlak", "Land A", nl(a / 1000, 1), 0, 0.3) + ECO.staaf(P, 1.5, b / 1000, "vlak4", "Land B", nl(b / 1000, 1), 0, 0.3) +
            P.lijn(0, 0, 2, 0, "s") + `<text x="4" y="10" class="k b">bbp per hoofd (× € 1.000)</text>`;
          p.querySelector("[data-g]").innerHTML = P.svg(s, "Bbp per hoofd van land A en land B");
          const ok = bbp < B.bbp && a > b;
          p.querySelector("[data-fb]").innerHTML = ok
            ? `<div class="eco-fb ok"><b>✔ Gelukt.</b> A produceert in totaal minder dan B, maar per inwoner meer: ${ECO.eur(bbp)} mld / ${inw} mln = ${ECO.eur(Math.round(a))}. Voor de welvaart van een gemiddelde inwoner zegt het bbp per hoofd meer dan het totale bbp.</div>`
            : `<div class="eco-fb">Bbp per hoofd = bbp / aantal inwoners. Nu: ${ECO.eur(bbp)} mld / ${inw} mln = ${ECO.eur(Math.round(a))}. ${bbp >= B.bbp ? "Het bbp van A moet onder € 900 mld blijven." : "Het bbp per hoofd van A moet boven € 15.000 komen."}</div>`;
          if (ok) api.klaar();
        }
        p.querySelector("[data-s=bbp]").oninput = (e) => { bbp = +e.target.value; teken(); };
        p.querySelector("[data-s=inw]").oninput = (e) => { inw = +e.target.value; teken(); };
        teken();
      }
    }
  });

  // ------------------------------------------------------------------
  // 3. Belasting-machine
  // ------------------------------------------------------------------
  // Fictieve, ronde tarieven. De echte tarieven verschillen per jaar en staan in de opgave of het boek.
  const BOX1 = { grens: 40000, t1: 0.36, t2: 0.5, korting: 3000 };
  const box1 = (y) => {
    const s1 = Math.min(y, BOX1.grens) * BOX1.t1, s2 = Math.max(0, y - BOX1.grens) * BOX1.t2;
    return { s1, s2, bel: Math.max(0, s1 + s2 - BOX1.korting) };
  };
  const STELSEL = {
    prog: { naam: "Progressief", lang: "schijven van 36% en 50%, met een heffingskorting van € 3.000", f: (y) => box1(y).bel, marg: (y) => (y < 3000 / 0.36 ? 0 : y < 40000 ? 36 : 50) },
    prop: { naam: "Proportioneel", lang: "vlaktaks van 40% over elke euro, zonder heffingskorting", f: (y) => 0.4 * y, marg: () => 40 },
    vals: { naam: "Vlaktaks + korting", lang: "40% over elke euro, met een heffingskorting van € 3.000", f: (y) => Math.max(0, 0.4 * y - 3000), marg: (y) => (y < 7500 ? 0 : 40) },
    degr: { naam: "Degressief", lang: "45% tot € 40.000 en daarboven 25%, zonder heffingskorting", f: (y) => 0.45 * Math.min(y, 40000) + 0.25 * Math.max(0, y - 40000), marg: (y) => (y < 40000 ? 45 : 25) }
  };
  ECO.BOX1 = BOX1; ECO.box1 = box1; ECO.STELSEL = STELSEL;

  TW.widget("belasting", {
    titel: "Belasting-machine", icoon: "🧮",
    uitleg: "Zie wat er met je inkomen gebeurt in box 1 en box 3. Let op: de tarieven en bedragen hier zijn **verzonnen en rond**. De echte verschillen per jaar; op de toets staan ze in de opgave.",
    maak(el, api) {
      ECO.tabs(el, [["Box 1", b1], ["Stelsels", stelsels], ["Box 3", b3]]);

      function b1(p) {
        let bruto = 50000;
        const POST = [{ n: "Hypotheekrente", b: -8000, s: "aftrekpost" }, { n: "Eigenwoningforfait", b: 2000, s: "bijtelling" }, { n: "Auto van de zaak", b: 6000, s: "bijtelling" }];
        const aan = [false, false, false];
        p.innerHTML = `${schuif("bruto", "Brutoloon per jaar", 0, 120000, 1000, bruto)}
          <div class="chips">${POST.map((x, i) => `<button class="chip" data-p="${i}">${x.b < 0 ? "−" : "+"} ${ECO.eur(Math.abs(x.b))} ${x.n} <small>(${x.s})</small></button>`).join("")}</div>
          <div data-g></div><div class="uit" data-u></div><div data-opdr></div>`;
        function teken() {
          const corr = POST.reduce((a, x, i) => a + (aan[i] ? x.b : 0), 0), bel = Math.max(0, bruto + corr), r = box1(bel);
          p.querySelector("[data-o=bruto]").textContent = ECO.eur(bruto);
          p.querySelectorAll("[data-p]").forEach((c, i) => c.classList.toggle("aan", aan[i]));
          const W = 340, x0 = 8, br = W - 16, sch = br / 130000, g = BOX1.grens;
          const w1 = Math.min(bel, g) * sch, w2 = Math.max(0, bel - g) * sch, xg = x0 + g * sch;
          let s = `<text x="${x0}" y="12" class="k b">belastbaar inkomen ${ECO.eur(bel)}</text><rect x="${x0}" y="20" width="${br}" height="34" rx="4" class="doos"/>`;
          if (w1 > 0) s += `<rect x="${x0}" y="20" width="${w1.toFixed(1)}" height="34" class="vlak"/><rect x="${x0}" y="20" width="${(w1 * BOX1.t1).toFixed(1)}" height="34" class="vlak"/><rect x="${x0}" y="20" width="${(w1 * BOX1.t1).toFixed(1)}" height="34" class="vlak"/>`;
          if (w2 > 0) s += `<rect x="${xg.toFixed(1)}" y="20" width="${w2.toFixed(1)}" height="34" class="vlak4"/><rect x="${xg.toFixed(1)}" y="20" width="${(w2 * BOX1.t2).toFixed(1)}" height="34" class="vlak4"/><rect x="${xg.toFixed(1)}" y="20" width="${(w2 * BOX1.t2).toFixed(1)}" height="34" class="vlak4"/>`;
          s += `<line x1="${xg.toFixed(1)}" y1="14" x2="${xg.toFixed(1)}" y2="60" class="stip"/><text x="${xg.toFixed(1)}" y="72" text-anchor="middle" class="k">€ 40.000</text>`;
          s += `<text x="${x0 + 2}" y="72" class="k b pa">schijf 1 · 36%</text><text x="${x0 + br}" y="72" text-anchor="end" class="k b pb">schijf 2 · 50%</text>`;
          s += `<text x="${x0}" y="90" class="k">Donker = belasting, licht = wat overblijft (vóór de heffingskorting).</text>`;
          p.querySelector("[data-g]").innerHTML = `<svg class="fig" viewBox="0 0 ${W} 96" role="img" aria-label="Balk met het belastbaar inkomen verdeeld over twee schijven">${s}</svg>`;
          const gem = bruto ? (r.bel / bruto) * 100 : 0, marg = STELSEL.prog.marg(bel);
          p.querySelector("[data-u]").innerHTML = `<table class="mini">
            <tr><td>Brutoloon ${ECO.eur(bruto)}${corr ? ` ${corr < 0 ? "−" : "+"} ${ECO.eur(Math.abs(corr))}` : ""}</td><td>belastbaar ${ECO.eur(bel)}</td></tr>
            <tr><td>Schijf 1: 36% × ${ECO.eur(Math.min(bel, g))}</td><td>${ECO.eur(r.s1)}</td></tr>
            <tr><td>Schijf 2: 50% × ${ECO.eur(Math.max(0, bel - g))}</td><td>${ECO.eur(r.s2)}</td></tr>
            <tr><td>Heffingskorting</td><td>− ${ECO.eur(Math.min(BOX1.korting, r.s1 + r.s2))}</td></tr>
            <tr class="tot"><td>Te betalen belasting</td><td>${ECO.eur(r.bel)}</td></tr></table>
            <div class="kern-getal drie"><div><small>Gemiddelde belastingdruk</small><b>${ECO.pct(gem)}</b></div><div><small>Marginale belastingdruk</small><b>${marg}%</b></div><div><small>Houd je over</small><b>${ECO.eur(bruto - r.bel)}</b></div></div>
            <p class="noot">Gemiddelde druk = belasting / brutoloon × 100%. Marginale druk = het tarief over een extra verdiende euro. Premies en pensioen laten we hier weg.</p>`;
        }
        const zet = (b, a) => { bruto = b; [0, 1, 2].forEach((i) => (aan[i] = !!(a && a[i]))); p.querySelector("[data-s=bruto]").value = b; teken(); };
        p.querySelector("[data-s=bruto]").oninput = (e) => { bruto = +e.target.value; teken(); };
        p.querySelectorAll("[data-p]").forEach((c, i) => (c.onclick = () => { aan[i] = !aan[i]; teken(); }));
        teken();
        ECO.voorspel(p.querySelector("[data-opdr]"), [
          { start: () => zet(50000), doe: () => zet(51000),
            q: "Je verdient € 50.000 en krijgt € 1.000 bruto opslag. Hoeveel belasting betaal je over die extra € 1.000?",
            opties: ["€ 500", "€ 360", "€ 328", "€ 1.000"],
            uitleg: "De extra euro's vallen in schijf 2. De marginale belastingdruk is daar 50%, dus € 500. De gemiddelde druk (32,8%) zegt iets over je hele inkomen, niet over de opslag." },
          { start: () => zet(30000),
            q: "Bij € 30.000 valt je hele inkomen in schijf 1 (36%). Toch is de gemiddelde belastingdruk maar 26%. Hoe komt dat?",
            opties: ["Door de heffingskorting van € 3.000", "Door het lagere tarief van schijf 2", "Doordat de eerste € 10.000 onbelast is", "Door de aftrekposten van schijf 1"],
            uitleg: "36% × € 30.000 = € 10.800. Daar gaat de heffingskorting van € 3.000 af: € 7.800, en dat is 26% van € 30.000." },
          { start: () => zet(80000), doe: () => zet(80000, [true]),
            q: "Iemand met € 80.000 brutoloon trekt € 8.000 hypotheekrente af. Hoeveel belasting scheelt dat (zonder tariefsaanpassing aftrekposten)?",
            opties: ["€ 4.000", "€ 2.880", "€ 8.000", "€ 3.000"],
            uitleg: "De aftrekpost haalt € 8.000 uit schijf 2: 50% × € 8.000 = € 4.000. Iemand met € 30.000 zou maar 36% × € 8.000 = € 2.880 minder betalen. Aftrekposten werken dus denivellerend; daarom bestaat de tariefsaanpassing aftrekposten." },
          { start: () => zet(60000), doe: () => zet(60000, [false, false, true]),
            q: "Een werknemer met € 60.000 krijgt een auto van de zaak met een bijtelling van € 6.000. Wat gebeurt er?",
            opties: ["Hij betaalt € 3.000 meer belasting", "Hij betaalt € 6.000 meer belasting", "Hij krijgt € 3.000 belasting terug", "Zijn brutoloon stijgt met € 6.000"],
            uitleg: "Een bijtelling verhoogt het belastbaar inkomen, niet het loon. De € 6.000 valt in schijf 2: 50% × € 6.000 = € 3.000 extra belasting." }
        ], () => api.klaar());
      }

      function stelsels(p) {
        let k = "prog", y = 60000;
        p.innerHTML = `<div class="keuze" data-k>${Object.keys(STELSEL).map((s) => `<button class="btn" data-k="${s}">${STELSEL[s].naam}</button>`).join("")}</div>
          <p class="noot" data-l></p><div data-g></div>${schuif("y", "Inkomen", 0, 120000, 2000, y)}
          <div class="uit" data-u></div><div data-opdr></div>`;
        const P = api.plot({ x: [0, 120], y: [0, 60], xl: "inkomen (× € 1.000)", yl: "gemiddelde belastingdruk (%)", xt: 20, yt: 10, w: 340, h: 230, mt: 20 });
        function teken() {
          const S = STELSEL[k];
          p.querySelectorAll("[data-k] .btn").forEach((b) => b.classList.toggle("aan", b.dataset.k === k));
          p.querySelector("[data-l]").textContent = S.naam + ": " + S.lang + ". De stippellijnen zijn de andere stelsels.";
          p.querySelector("[data-o=y]").textContent = ECO.eur(y);
          const druk = (f) => (x) => (x <= 0 ? NaN : (f(x * 1000) / (x * 1000)) * 100);
          let s = P.assen();
          Object.keys(STELSEL).forEach((n) => { if (n !== k) s += P.fn(druk(STELSEL[n].f), "stip", 120); });
          s += P.fn(druk(S.f), "curve", 120);
          const d = y ? (S.f(y) / y) * 100 : 0;
          if (y) s += P.lijn(y / 1000, 0, y / 1000, d, "stip") + P.punt(y / 1000, d, "greep", 7) + P.tekst(y / 1000, d, nl(d, 1) + "%", y > 95000 ? "end" : "start", "b pa", y > 95000 ? -10 : 10, -8);
          p.querySelector("[data-g]").innerHTML = P.svg(s, "Gemiddelde belastingdruk bij elk inkomen voor het gekozen stelsel");
          const A = 30000, B = 90000, na = A - S.f(A), nb = B - S.f(B), v = nb / na;
          const oordeel = Math.abs(v - 3) < 0.005 ? "De verhouding blijft 3,0: dit stelsel nivelleert niet en denivelleert niet." : v < 3 ? "De relatieve inkomensverschillen worden kleiner: dit stelsel <b>nivelleert</b>." : "De relatieve inkomensverschillen worden groter: dit stelsel <b>denivelleert</b>.";
          p.querySelector("[data-u]").innerHTML = `<div class="kern-getal"><div><small>Gemiddelde druk bij ${ECO.eur(y)}</small><b>${ECO.pct(d)}</b></div><div><small>Marginale druk</small><b>${S.marg(y)}%</b></div></div>
            <table class="mini"><tr><th>Twee personen</th><th>Asha</th><th>Bob</th><th>Bob : Asha</th></tr>
            <tr><td>Vóór belasting</td><td>${ECO.eur(A)}</td><td>${ECO.eur(B)}</td><td>3,00</td></tr>
            <tr><td>Belasting</td><td>${ECO.eur(S.f(A))}</td><td>${ECO.eur(S.f(B))}</td><td></td></tr>
            <tr class="tot"><td>Na belasting</td><td>${ECO.eur(na)}</td><td>${ECO.eur(nb)}</td><td>${nl(v, 2)}</td></tr></table>
            <p>${oordeel}</p>`;
        }
        const zet = (kk, yy) => { k = kk; if (yy != null) { y = yy; p.querySelector("[data-s=y]").value = yy; } teken(); };
        p.querySelectorAll("[data-k] .btn").forEach((b) => (b.onclick = () => zet(b.dataset.k)));
        p.querySelector("[data-s=y]").oninput = (e) => { y = +e.target.value; teken(); };
        teken();
        ECO.voorspel(p.querySelector("[data-opdr]"), [
          { start: () => zet("prog", 60000),
            q: "Bij het progressieve stelsel stijgt de lijn. Wat betekent dat?",
            opties: ["Hoe hoger het inkomen, hoe groter het deel dat naar belasting gaat", "Hoe hoger het inkomen, hoe meer euro's belasting iemand betaalt", "Iedereen betaalt precies hetzelfde percentage aan belasting", "Het marginale tarief is lager dan het gemiddelde tarief"],
            uitleg: "Progressief gaat over het percentage, niet over het bedrag. Ook bij een vlaktaks betaalt een hoog inkomen meer euro's, maar niet een groter deel." },
          { start: () => zet("prop", 60000), doe: () => zet("vals", 60000),
            q: "Een vlaktaks van 40% is proportioneel. Nu komt er een heffingskorting van € 3.000 bij die voor iedereen even hoog is. Wat voor stelsel is het dan?",
            opties: ["Progressief: de gemiddelde druk stijgt met het inkomen", "Proportioneel: het tarief blijft voor iedereen 40%", "Degressief: de korting is voor hoge inkomens meer waard", "Proportioneel: iedereen krijgt precies dezelfde korting"],
            uitleg: "€ 3.000 korting is voor een laag inkomen een veel groter deel dan voor een hoog inkomen. De gemiddelde druk loopt daardoor op: een vlaktaks met een algemene heffingskorting is progressief." },
          { start: () => zet("prog", 60000), doe: () => zet("degr", 60000),
            q: "Bij het degressieve stelsel is het tarief boven € 40.000 lager dan eronder. Wat gebeurt er met de verhouding tussen het inkomen van Bob en Asha?",
            opties: ["Die wordt groter dan 3,0: denivellering", "Die blijft 3,0: beiden betalen belasting", "Die wordt kleiner dan 3,0: nivellering", "Die wordt precies 1,0: gelijke inkomens"],
            uitleg: "Bob betaalt een kleiner deel van zijn inkomen dan Asha. Na belasting is het verschil relatief groter geworden." }
        ], () => api.klaar());
      }

      function b3(p) {
        const VRIJ = 50000, FORF = 0.04, TAR = 0.3;
        let bez = 150000, sch = 0, echt = 4;
        p.innerHTML = `${schuif("bez", "Bezittingen (spaargeld, beleggingen)", 0, 500000, 10000, bez)}${schuif("sch", "Schulden", 0, 100000, 10000, sch)}${schuif("echt", "Werkelijk rendement", 0, 8, 0.5, echt)}
          <div class="uit" data-u></div>
          <div class="opdr"><div class="opdr-kop">Opdracht</div><p class="opdr-q">Zoek een situatie waarin de belasting in box 3 <b>groter</b> is dan wat het vermogen werkelijk heeft opgeleverd.</p><div data-fb></div></div>`;
        function teken() {
          const verm = Math.max(0, bez - sch), bv = Math.max(0, verm - VRIJ), fr = bv * FORF, bel = fr * TAR, wr = verm * echt / 100;
          p.querySelector("[data-o=bez]").textContent = ECO.eur(bez);
          p.querySelector("[data-o=sch]").textContent = ECO.eur(sch);
          p.querySelector("[data-o=echt]").textContent = ECO.pct(echt);
          p.querySelector("[data-u]").innerHTML = `<table class="mini">
            <tr><td>Vermogen = bezittingen − schulden</td><td>${ECO.eur(verm)}</td></tr>
            <tr><td>Heffingsvrij vermogen</td><td>− ${ECO.eur(Math.min(VRIJ, verm))}</td></tr>
            <tr><td>Belastbaar vermogen</td><td>${ECO.eur(bv)}</td></tr>
            <tr><td>Forfaitair rendement: 4% × ${ECO.eur(bv)}</td><td>${ECO.eur(fr)}</td></tr>
            <tr class="tot"><td>Belasting box 3: 30% × ${ECO.eur(fr)}</td><td>${ECO.eur(bel)}</td></tr></table>
            <div class="kern-getal"><div><small>Werkelijk verdiend (${ECO.pct(echt)} van ${ECO.eur(verm)})</small><b>${ECO.eur(wr)}</b></div><div><small>Belasting als deel daarvan</small><b>${wr > 0 ? ECO.pct((bel / wr) * 100, 0) : bel > 0 ? "meer dan 100%" : "0%"}</b></div></div>
            <p class="noot">Verzonnen cijfers: heffingsvrij vermogen € 50.000, forfaitair rendement 4%, tarief 30%. In box 3 rekent de Belastingdienst met een <b>forfaitair</b> (aangenomen) rendement, niet met wat je echt verdiende. De echte regels en percentages veranderen vaak: gebruik op de toets die uit de opgave.</p>`;
          const ok = bel > wr && bel > 0;
          p.querySelector("[data-fb]").innerHTML = ok
            ? `<div class="eco-fb ok"><b>✔ Gevonden.</b> Het werkelijke rendement (${ECO.eur(wr)}) is lager dan de belasting (${ECO.eur(bel)}). Dat kan doordat de belasting over het forfaitaire rendement van 4% gaat, ook als je in werkelijkheid veel minder verdient.</div>`
            : `<div class="eco-fb">Nu is het werkelijke rendement ${ECO.eur(wr)} en de belasting ${ECO.eur(bel)}. Tip: wat gebeurt er als de spaarrente heel laag is?</div>`;
          if (ok) api.klaar();
        }
        ["bez", "sch", "echt"].forEach((n) => (p.querySelector(`[data-s=${n}]`).oninput = (e) => { const v = +e.target.value; if (n === "bez") bez = v; else if (n === "sch") sch = v; else echt = v; teken(); }));
        teken();
      }
    }
  });

  // ------------------------------------------------------------------
  // 4. Lorenzcurve-lab
  // ------------------------------------------------------------------
  TW.widget("lorenz", {
    titel: "Lorenzcurve-lab", icoon: "📐",
    uitleg: "Vijf groepen van elk 20% van de personen, van arm naar rijk. Sleep de punten en zie hoe de inkomensaandelen, de tabel en de curve meebewegen.",
    maak(el, api) {
      const mkPlot = () => api.plot({ x: [0, 100], y: [0, 100], xl: "% personen (cumulatief, arm → rijk)", yl: "% inkomen (cumulatief)", xt: 20, yt: 20, w: 340, h: 310, mt: 20 });
      const GROEP = ["1 · armste 20%", "2", "3", "4", "5 · rijkste 20%"];
      ECO.tabs(el, [["Lab", lab], ["Van tabel naar curve", oefen]]);

      function lab(p) {
        const P = mkPlot();
        const PRESET = { gelijk: [0, 20, 40, 60, 80, 100], midden: [0, 8, 21, 38, 61, 100], scheef: [0, 2, 7, 17, 37, 100] };
        let c = PRESET.midden.slice(), prim = null, taak = 0;
        p.innerHTML = `<div data-g></div>
          <div class="keuze"><button class="btn" data-pre="gelijk">Volkomen gelijk</button><button class="btn" data-pre="midden">Gewoon</button><button class="btn" data-pre="scheef">Erg scheef</button><button class="btn" data-a="niv">Nivelleer</button></div>
          <div class="uit" data-u></div><div data-opdr></div>`;
        const hoek = (Math.atan2(P.Y(0) - P.Y(100), P.X(100) - P.X(0)) * 180 / Math.PI).toFixed(1);
        p.querySelector("[data-g]").innerHTML = P.svg(P.assen() + P.lijn(0, 0, 100, 100, "stip") +
          `<text x="${P.X(40).toFixed(1)}" y="${(P.Y(40) - 6).toFixed(1)}" text-anchor="middle" class="k" transform="rotate(-${hoek} ${P.X(40).toFixed(1)} ${P.Y(40).toFixed(1)})">volkomen gelijke verdeling</text><g data-dyn></g>` +
          [1, 2, 3, 4].map((i) => `<circle data-vis="${i}" r="8" class="greep"/><circle data-hit="${i}" r="21" class="hit"/>`).join(""), "Lorenzcurve met vier sleepbare punten");
        const svg = p.querySelector("svg"), dyn = p.querySelector("[data-dyn]");
        const pts = (a) => a.map((v, i) => [i * 20, v]);
        function teken() {
          let s = P.vlak(pts(c), "vlak");
          if (prim) s += P.pad(pts(prim), "stip2");
          s += P.pad(pts(c), "curve");
          for (let i = 1; i <= 4; i++) s += P.tekst(i * 20, c[i], c[i] + "%", "start", "b", 11, 15);
          dyn.innerHTML = s;
          for (let i = 1; i <= 4; i++) ["vis", "hit"].forEach((t) => { const e = svg.querySelector(`[data-${t}="${i}"]`); e.setAttribute("cx", P.X(i * 20).toFixed(1)); e.setAttribute("cy", P.Y(c[i]).toFixed(1)); });
          const aand = c.slice(1).map((v, i) => v - c[i]);
          p.querySelector("[data-u]").innerHTML = `<table class="mini"><tr><th>Groep</th><th>Aandeel inkomen</th><th>Cumulatief</th></tr>
            ${aand.map((a, i) => `<tr><td>${GROEP[i]}</td><td>${a}%</td><td>${c[i + 1]}%</td></tr>`).join("")}</table>
            <div class="kern-getal drie"><div><small>Armste 40% verdient</small><b>${c[2]}%</b></div><div><small>Rijkste 20% verdient</small><b>${100 - c[4]}%</b></div><div><small>80/20 ratio</small><b>${aand[0] > 0 ? nl(aand[4] / aand[0], 1) : "∞"}</b></div></div>
            ${prim ? `<p class="noot">Oranje stippellijn = de primaire inkomensverdeling, blauw = de secundaire (na belastingen, uitkeringen en toeslagen).</p>` : `<p class="noot">De groepen staan van arm naar rijk. Daarom kan een punt niet verder omhoog of omlaag dan de buurpunten toelaten.</p>`}`;
          taakCheck();
        }
        // De groepen staan van arm naar rijk: een aandeel mag nooit kleiner zijn dan dat van de groep ervoor.
        function grenzen(i) {
          const onder = Math.max(i >= 2 ? 2 * c[i - 1] - c[i - 2] : 0, i <= 3 ? 2 * c[i + 1] - c[i + 2] : 0);
          return [Math.ceil(onder), Math.floor((c[i - 1] + c[i + 1]) / 2)];
        }
        [1, 2, 3, 4].forEach((i) => api.sleep(svg, svg.querySelector(`[data-hit="${i}"]`), (x, y) => {
          const g = grenzen(i); c[i] = ECO.klem(Math.round(P.iy(y)), g[0], g[1]); prim = null; teken();
        }));
        p.querySelectorAll("[data-pre]").forEach((b) => (b.onclick = () => { c = PRESET[b.dataset.pre].slice(); prim = null; teken(); }));
        function nivelleer() {
          if (!prim) prim = c.slice();
          const aand = c.slice(1).map((v, i) => v - c[i]).map((a) => Math.round(a + 0.3 * (20 - a)));
          aand[4] += 100 - aand.reduce((a, b) => a + b, 0);
          c = [0]; aand.forEach((a) => c.push(c[c.length - 1] + a)); teken();
        }
        p.querySelector("[data-a=niv]").onclick = nivelleer;

        // opdrachten
        const houder = p.querySelector("[data-opdr]");
        const TAKEN = [
          { soort: "getal", start: () => { c = PRESET.midden.slice(); prim = null; }, q: "Lees af uit de curve: welk deel van het totale inkomen verdient de armste 40% van de personen?", antw: () => c[2], uitleg: () => `Ga bij 40% van de personen omhoog naar de curve en lees links af: ${c[2]}%.` },
          { soort: "getal", q: "En welk deel verdient de rijkste 20%?", antw: () => 100 - c[4], uitleg: () => `De armste 80% verdient samen ${c[4]}%. Voor de rijkste 20% blijft 100% − ${c[4]}% = ${100 - c[4]}% over.` },
          { soort: "doe", q: "Sleep de punten tot de rijkste 20% ongeveer de helft van het inkomen verdient (49 tot 51%).", ok: () => 100 - c[4] >= 49 && 100 - c[4] <= 51, klaar: "De curve buigt nu verder van de diagonaal af: de verdeling is schever geworden." },
          { soort: "doe", q: "Maak de verdeling nu gelijker: zorg dat de armste 40% minstens 30% van het inkomen krijgt.", ok: () => c[2] >= 30, klaar: "De curve ligt dichter bij de diagonaal. Hoe kleiner het vlak tussen curve en diagonaal, hoe gelijker de verdeling." },
          { soort: "keuze", start: () => { c = PRESET.midden.slice(); prim = null; teken(); }, q: "De overheid heft progressieve belasting en betaalt uitkeringen en toeslagen aan lage inkomens. Waar ligt de Lorenzcurve van de secundaire inkomensverdeling vergeleken met die van de primaire?",
            opties: ["Dichter bij de diagonaal", "Verder van de diagonaal", "Precies op dezelfde plek", "Boven de diagonaal"], doe: nivelleer,
            uitleg: "De overheid nivelleert: de relatieve inkomensverschillen worden kleiner. De secundaire curve ligt daarom dichter bij de lijn van volkomen gelijke verdeling. Boven de diagonaal kan een Lorenzcurve nooit komen." }
        ];
        function taakCheck() {
          const t = TAKEN[taak];
          if (!t || t.soort !== "doe" || t.af || !houder.querySelector(".fbplek")) return;
          if (t.ok()) { t.af = true; houder.querySelector(".fbplek").innerHTML = `<div class="eco-fb ok"><b>✔ Gelukt.</b> ${t.klaar}<br><button class="btn klein primary" data-a="verder">Volgende opdracht</button></div>`; houder.querySelector("[data-a=verder]").onclick = volgende; }
        }
        function volgende() { taak++; toonTaak(); }
        function toonTaak() {
          const t = TAKEN[taak];
          if (!t) return;
          if (t.start) t.start();
          const kop = `<div class="opdr-kop">Opdracht ${taak + 1} van ${TAKEN.length}</div>`;
          if (t.soort === "getal") {
            houder.innerHTML = `<div class="opdr">${kop}<div data-v></div><div data-n></div></div>`; teken();
            ECO.rekenvraag(houder.querySelector("[data-v]"), { q: t.q, antwoord: t.antw, tol: 0.5, eenheid: "%", hint: "Zoek het punt op de curve en lees de waarde op de verticale as af.", stappen: () => [t.uitleg()] }, () => {
              houder.querySelector("[data-n]").innerHTML = `<button class="btn klein primary" style="margin-top:8px">Volgende opdracht</button>`; houder.querySelector("[data-n] .btn").onclick = volgende;
            });
          } else if (t.soort === "doe") {
            t.af = false; houder.innerHTML = `<div class="opdr">${kop}<p class="opdr-q">${fmt(t.q)}</p><div class="fbplek"></div></div>`; teken();
          } else {
            ECO.voorspel(houder, [t], () => api.klaar(), "Slotopdracht");
          }
        }
        teken(); toonTaak();
      }

      function oefen(p) {
        const R = api.R, P = mkPlot();
        function nieuw() {
          const a = [R.int(3, 8), R.int(9, 13), R.int(14, 18), R.int(19, 25)];
          a.push(100 - a.reduce((x, y) => x + y, 0));
          const T = R.kies([200, 400, 500, 800]), ink = a.map((x) => (x * T) / 100);
          const cum = [0]; a.forEach((x) => cum.push(cum[cum.length - 1] + x));
          p.innerHTML = `<p>In een land wonen vijf even grote groepen. Dit is het totale inkomen per groep, van arm naar rijk. Vul de <b>cumulatieve</b> percentages in.</p>
            <table class="mini"><tr><th>Groep (elk 20%)</th><th>Inkomen (€ mld)</th><th>Cumulatief %</th></tr>
            ${ink.map((x, i) => `<tr><td>${GROEP[i]}</td><td>${nl(x)}</td><td data-c="${i}">${i < 4 ? `<input inputmode="decimal" aria-label="Cumulatief percentage tot en met groep ${i + 1}">` : "100"}</td></tr>`).join("")}
            <tr class="tot"><td>Totaal</td><td>${nl(T)}</td><td></td></tr></table>
            <div class="row"><button class="btn primary" data-a="chk">Controleer</button><button class="btn" data-a="hint">💡 Stappen</button><button class="btn" data-a="nieuw">Nieuwe tabel</button></div>
            <div data-fb></div><div data-g></div>`;
          const fb = p.querySelector("[data-fb]");
          const stappen = `<ol class="stappen"><li>Tel alle inkomens op: € ${nl(T)} mld.</li><li>Aandeel van een groep = inkomen van de groep / totaal × 100%. Groep 1: ${nl(ink[0])} / ${nl(T)} × 100% = ${a[0]}%.</li><li>Tel de aandelen op van arm naar rijk: eerst ${a[0]}%, dan ${a[0]}% + ${a[1]}% = ${cum[2]}%, enzovoort. De laatste groep komt altijd op 100% uit.</li></ol>`;
          p.querySelector("[data-a=hint]").onclick = () => { fb.innerHTML = `<div class="eco-fb">${stappen}</div>`; };
          p.querySelector("[data-a=nieuw]").onclick = nieuw;
          p.querySelector("[data-a=chk]").onclick = () => {
            let alles = true;
            for (let i = 0; i < 4; i++) {
              const td = p.querySelector(`[data-c="${i}"]`), g = ECO.getal(td.querySelector("input").value);
              const ok = Math.abs(g - cum[i + 1]) <= 0.5; td.className = ok ? "goed" : "fout"; if (!ok) alles = false;
            }
            if (alles) {
              api.klaar();
              fb.innerHTML = `<div class="eco-fb ok"><b>✔ Alle vier goed.</b> Dit zijn de punten van de Lorenzcurve: (20, ${cum[1]}), (40, ${cum[2]}), (60, ${cum[3]}), (80, ${cum[4]}) en (100, 100).</div>`;
              const pts = cum.map((v, i) => [i * 20, v]);
              p.querySelector("[data-g]").innerHTML = P.svg(P.assen() + P.lijn(0, 0, 100, 100, "stip") + P.vlak(pts, "vlak") + P.pad(pts, "curve") + pts.slice(1, 5).map((q) => P.punt(q[0], q[1]) + P.tekst(q[0], q[1], q[1] + "%", "start", "b", 8, 14)).join(""), "De Lorenzcurve bij jouw tabel");
            } else fb.innerHTML = `<div class="eco-fb nok">Nog niet alles klopt (rood). Veelgemaakte fout: het aandeel van de groep invullen in plaats van het opgetelde percentage.</div>`;
          };
        }
        nieuw();
      }
    }
  });

  // ------------------------------------------------------------------
  // 5. Concurrentiepositie (internationale handel)
  // ------------------------------------------------------------------
  TW.widget("concurrentie", {
    titel: "Concurrentiepositie", icoon: "🌍",
    uitleg: "Een Nederlandse en een Amerikaanse fabrikant maken hetzelfde product. Verander de loonkosten, de arbeidsproductiviteit en de koers van de dollar en kijk wat er met de handel gebeurt.",
    maak(el, api) {
      let loon = 0, apt = 0, koers = 0.8;
      const US = 50, OVERIG = 24, LKPP0 = 16;
      el.innerHTML = `${schuif("loon", "Loonkosten per werknemer (NL)", -10, 10, 1, 0)}${schuif("apt", "Arbeidsproductiviteit (NL)", -10, 10, 1, 0)}${schuif("koers", "Koers van de dollar", 0.6, 1, 0.01, koers)}
        <div data-u></div><div data-g></div><p class="noot">Rekenmodel met verzonnen getallen: de richting klopt, de precieze grootte niet. Het Nederlandse product kost € 24 aan overige kosten plus de loonkosten per product; het Amerikaanse kost altijd $ 50.</p><div data-opdr></div>`;
      const P = api.plot({ x: [0, 3], y: [0, 160], w: 340, h: 180, mb: 30, mt: 20 });
      function teken() {
        const lk = LKPP0 * (1 + loon / 100) / (1 + apt / 100), pnl = OVERIG + lk;
        const nlInVS = pnl / koers, usInNL = US * koers;
        const exp = ECO.klem(100 * Math.pow(US / nlInVS, 2), 0, 160), imp = ECO.klem(100 * Math.pow(pnl / usInNL, 2), 0, 160);
        el.querySelector("[data-o=loon]").textContent = ECO.teken(loon, 0) + "%";
        el.querySelector("[data-o=apt]").textContent = ECO.teken(apt, 0) + "%";
        el.querySelector("[data-o=koers]").textContent = "$ 1 = € " + nl(koers, 2);
        const beter = nlInVS < US - 0.005, slechter = nlInVS > US + 0.005;
        el.querySelector("[data-u]").innerHTML = `<div class="kern-getal"><div><small>Loonkosten per product (NL)</small><b>${ECO.eur(lk, 2)}</b></div><div><small>Concurrentiepositie van NL</small><b class="${beter ? "op" : slechter ? "neer" : ""}">${beter ? "verbeterd" : slechter ? "verslechterd" : "zoals bij de start"}</b></div></div>
          <h4>In de winkel in de VS</h4><div class="prijskaart"><div class="${beter ? "win" : ""}"><small>Nederlands product: € ${nl(pnl, 2)} / ${nl(koers, 2)}</small><b>$ ${nl(nlInVS, 2)}</b></div><div class="${slechter ? "win" : ""}"><small>Amerikaans product</small><b>$ ${nl(US, 2)}</b></div></div>
          <h4>In de winkel in Nederland</h4><div class="prijskaart"><div class="${beter ? "win" : ""}"><small>Nederlands product</small><b>€ ${nl(pnl, 2)}</b></div><div class="${slechter ? "win" : ""}"><small>Amerikaans product: $ 50 × ${nl(koers, 2)}</small><b>€ ${nl(usInNL, 2)}</b></div></div>`;
        const saldo = exp - imp;
        let s = ECO.rooster(P, 3, 0, 160, 40) + ECO.staaf(P, 0.5, exp, "vlak3", "export (E)", nl(exp, 0)) + ECO.staaf(P, 1.5, imp, "vlak2", "import (M)", nl(imp, 0));
        s += P.vlak([[2.18, 80], [2.18, 80 + saldo / 2], [2.82, 80 + saldo / 2], [2.82, 80]], saldo >= 0 ? "vlak3" : "vlak2") + P.lijn(2.1, 80, 2.9, 80, "s") + P.tekst(2.5, 0, "saldo (E − M)", "middle", "k", 0, 14) + P.tekst(2.5, 80 + Math.max(saldo / 2, 0), ECO.teken(saldo, 0), "middle", "b", 0, -4);
        s += P.lijn(0, 0, 2, 0, "s") + `<text x="4" y="10" class="k b">handel tussen NL en de VS (start = 100)</text>`;
        el.querySelector("[data-g]").innerHTML = P.svg(s, "Staven met de export, de import en het saldo van de lopende rekening");
      }
      const zet = (l, a, k) => { loon = l; apt = a; koers = k; el.querySelector("[data-s=loon]").value = l; el.querySelector("[data-s=apt]").value = a; el.querySelector("[data-s=koers]").value = k; teken(); };
      el.querySelector("[data-s=loon]").oninput = (e) => { loon = +e.target.value; teken(); };
      el.querySelector("[data-s=apt]").oninput = (e) => { apt = +e.target.value; teken(); };
      el.querySelector("[data-s=koers]").oninput = (e) => { koers = +e.target.value; teken(); };
      teken();
      ECO.voorspel(el.querySelector("[data-opdr]"), [
        { start: () => zet(0, 0, 0.8), doe: () => zet(0, 0, 0.9),
          q: "De koers van de dollar stijgt van € 0,80 naar € 0,90: de dollar apprecieert, de euro wordt dus minder waard. Wat gebeurt er met de Nederlandse export naar de VS?",
          opties: ["Die stijgt: het Nederlandse product wordt in dollars goedkoper", "Die daalt: voor Nederlanders is de dollar duurder geworden", "Die blijft gelijk: de prijs in euro's verandert immers niet", "Die daalt: Amerikanen krijgen minder euro's voor een dollar"],
          uitleg: "De prijs blijft € 40, maar Amerikanen betalen nu € 40 / 0,90 = $ 44,44 in plaats van $ 50. Tegelijk wordt het Amerikaanse product in Nederland duurder (€ 45): de import daalt. Het saldo op de lopende rekening verbetert." },
        { start: () => zet(0, 0, 0.8), doe: () => zet(6, 6, 0.8),
          q: "In Nederland stijgen de loonkosten per werknemer met 6%. De arbeidsproductiviteit stijgt ook met 6%. Wat gebeurt er met de internationale concurrentiepositie?",
          opties: ["Die blijft gelijk: de loonkosten per product veranderen niet", "Die verslechtert: de lonen in Nederland zijn immers gestegen", "Die verbetert: de werknemers maken nu meer producten", "Die verslechtert met 6%: evenveel als de loonstijging"],
          uitleg: "Het gaat om de loonkosten **per product**. Werknemers kosten 6% meer, maar maken ook 6% meer: per product blijft het € 16." },
        { start: () => zet(0, 0, 0.8), doe: () => zet(8, 2, 0.8),
          q: "Nu stijgen de loonkosten met 8% en de arbeidsproductiviteit met 2%. Wat gebeurt er met het saldo van de lopende rekening?",
          opties: ["Dat daalt: minder export en meer import", "Dat stijgt: hogere lonen geven meer export", "Dat blijft gelijk: de koers is niet veranderd", "Dat stijgt: de import wordt nu duurder"],
          uitleg: "Loonkosten per product: ongeveer 8% − 2% = 6% hoger. Het Nederlandse product wordt duurder, de concurrentiepositie verslechtert: de export daalt en Nederlanders kopen vaker het Amerikaanse product." }
      ], () => api.klaar());
    }
  });
})();
