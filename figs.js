// Figuren (inline SVG). TW.fig(naam, (quiz) => svg); bij quiz = true weglaten wat het antwoord verklapt.
(function () {
  "use strict";
  const esc = TW.esc;
  const svg = (w, h, label, body) => `<svg class="fig" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">${body}</svg>`;
  // doos met gecentreerde tekstregels; eerste regel vet
  const doos = (x, y, w, h, regels, cls) => {
    const n = regels.length, y0 = y + h / 2 - (n - 1) * 6.5 + 4;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" class="${cls || "doos"}"/>` +
      regels.map((r, i) => `<text x="${x + w / 2}" y="${(y0 + i * 13).toFixed(1)}" text-anchor="middle" class="k${i === 0 ? " b" : ""}">${esc(r)}</text>`).join("");
  };
  const pijl = (x1, y1, x2, y2) => {
    const a = Math.atan2(y2 - y1, x2 - x1), l = 6;
    return `<path d="M${x1} ${y1}L${x2} ${y2}M${x2} ${y2}L${(x2 - l * Math.cos(a - 0.5)).toFixed(1)} ${(y2 - l * Math.sin(a - 0.5)).toFixed(1)}M${x2} ${y2}L${(x2 - l * Math.cos(a + 0.5)).toFixed(1)} ${(y2 - l * Math.sin(a + 0.5)).toFixed(1)}" class="pijl"/>`;
  };
  const ECOFIG = (window.ECOFIG = {});

  // Stroomschema van de bevolking. o.licht = sleutel van het vak dat oplicht, o.n = { sleutel: aantal }
  ECOFIG.bevolking = (o) => {
    o = o || {};
    const n = o.n || {};
    const V = [
      ["tot", 95, 4, 150, 30, ["Totale bevolking"]],
      ["geschikt", 14, 60, 186, 40, ["Beroepsgeschikte bevolking", "15 tot 75 jaar"]],
      ["nietgeschikt", 214, 60, 122, 40, ["Niet beroepsgeschikt", "jonger dan 15 of 75+"]],
      ["bb", 4, 128, 150, 40, ["Beroepsbevolking", "het aanbod van arbeid"]],
      ["nbb", 164, 128, 150, 40, ["Niet-beroepsbevolking", "werkt niet, zoekt niet"]],
      ["werkzaam", 4, 198, 118, 40, ["Werkzame", "beroepsbevolking"]],
      ["werkloos", 132, 198, 118, 40, ["Werkloze", "beroepsbevolking"]]
    ];
    let s = pijl(150, 34, 110, 60) + pijl(200, 34, 270, 60) + pijl(90, 100, 80, 128) + pijl(140, 100, 230, 128) + pijl(60, 168, 60, 198) + pijl(100, 168, 185, 198);
    V.forEach((v) => {
      const regels = v[5].slice();
      if (n[v[0]] != null) regels.push(typeof n[v[0]] === "number" ? TW.nl(n[v[0]]) : String(n[v[0]]));
      const h = regels.length > 2 ? v[4] + 12 : v[4];
      s += doos(v[1], v[2], v[3], h, regels, o.licht === v[0] ? "doos-a" : "doos");
    });
    return svg(340, 256, "Stroomschema: van de totale bevolking naar de werkzame en de werkloze beroepsbevolking", s);
  };
  TW.fig("bevolking", () => ECOFIG.bevolking({}));
  TW.fig("bevolking_getallen", (quiz) => ECOFIG.bevolking({ n: { tot: 17800, geschikt: 13000, nietgeschikt: 4800, nbb: 3400, werkzaam: 9216, werkloos: 384, bb: quiz ? "?" : 9600 } }));

  // Bedrijfskolom van graan tot brood (bedragen per brood)
  TW.fig("bedrijfskolom", (quiz) => {
    const S = [["Boer", "graan", "0,30"], ["Meelfabriek", "meel", "0,80"], ["Bakker", "brood", "2,00"]], TWV = ["0,30", "0,50", "1,20"];
    let s = "";
    S.forEach((x, i) => {
      const bx = 6 + i * 112;
      s += doos(bx, 22, 82, 44, [x[0], "verkoopt " + x[1], "voor € " + x[2]]);
      if (i < 2) s += pijl(bx + 84, 44, bx + 110, 44);
      s += `<text x="${bx + 41}" y="86" text-anchor="middle" class="k b pg">${quiz ? "toeg. waarde = ?" : "toeg. waarde € " + TWV[i]}</text>`;
    });
    s += pijl(314, 44, 334, 44) + `<text x="6" y="12" class="k b">Van graan tot brood (bedragen per brood)</text><text x="334" y="16" text-anchor="end" class="k">consument</text>`;
    if (!quiz) s += `<text x="170" y="106" text-anchor="middle" class="k">Samen: 0,30 + 0,50 + 1,20 = € 2,00 = de prijs die de consument betaalt</text>`;
    return svg(340, quiz ? 94 : 112, "Bedrijfskolom met drie schakels: boer, meelfabriek en bakker", s);
  });

  // Conjunctuurgolf rond de trend
  TW.fig("conjunctuur", (quiz) => {
    const P = TW.plot({ x: [0, 12], y: [0, 40], xl: "tijd (jaren)", yl: "bbp", geenGetallen: true, xt: 2, yt: 10, w: 340, h: 210 });
    const trend = (x) => 9 + 1.9 * x, echt = (x) => trend(x) + 5 * Math.sin((x - 0.5) * Math.PI / 3);
    let s = P.assen() + P.fn(trend, "stip2") + P.fn(echt, "curve", 120);
    s += P.tekst(11.8, trend(11.8), quiz ? "lijn 1" : "trend", "end", "k b pb", 0, 14) + P.tekst(8.6, echt(8), quiz ? "lijn 2" : "werkelijk bbp", "start", "k b pa", 0, -6);
    s += P.tekst(2, echt(2), quiz ? "A" : "hoogconjunctuur", "middle", "k b", 0, -8) + P.tekst(5, echt(5), quiz ? "B" : "laagconjunctuur", "middle", "k b", 0, 16);
    return P.svg(s, "Het werkelijke bbp golft rond een stijgende trendlijn");
  });

  // Schijven in box 1 (fictieve tarieven)
  TW.fig("schijven", () => {
    const x0 = 10, br = 320, g = (40 / 60) * br;
    let s = `<text x="${x0}" y="12" class="k b">Belastbaar inkomen € 60.000 (verzonnen tarieven)</text>`;
    s += `<rect x="${x0}" y="20" width="${g.toFixed(1)}" height="36" class="vlak"/><rect x="${(x0 + g).toFixed(1)}" y="20" width="${(br - g).toFixed(1)}" height="36" class="vlak4"/><rect x="${x0}" y="20" width="${br}" height="36" class="s"/>`;
    s += `<text x="${(x0 + g / 2).toFixed(1)}" y="36" text-anchor="middle" class="k b">schijf 1: eerste € 40.000</text><text x="${(x0 + g / 2).toFixed(1)}" y="50" text-anchor="middle" class="k">36% → € 14.400</text>`;
    s += `<text x="${(x0 + g + (br - g) / 2).toFixed(1)}" y="36" text-anchor="middle" class="k b">schijf 2: € 20.000</text><text x="${(x0 + g + (br - g) / 2).toFixed(1)}" y="50" text-anchor="middle" class="k">50% → € 10.000</text>`;
    s += `<text x="${x0}" y="74" class="k">Samen € 24.400, min € 3.000 heffingskorting = € 21.400.</text>`;
    s += `<text x="${x0}" y="90" class="k">Gemiddelde druk 35,7% (21.400 / 60.000), marginaal 50%.</text>`;
    return svg(340, 96, "Een inkomen van 60.000 euro verdeeld over twee belastingschijven", s);
  });

  // Gemiddelde belastingdruk bij drie soorten tarieven
  TW.fig("drukstelsels", (quiz) => {
    const P = TW.plot({ x: [0, 100], y: [0, 60], xl: "inkomen (× € 1.000)", yl: "gemiddelde belastingdruk (%)", xt: 20, yt: 10, w: 340, h: 220, mt: 20 });
    const prog = (x) => (x < 4 ? NaN : Math.max(0, (0.36 * Math.min(x, 40) + 0.5 * Math.max(0, x - 40) - 3) / x) * 100);
    const degr = (x) => (x < 4 ? NaN : ((0.45 * Math.min(x, 40) + 0.25 * Math.max(0, x - 40)) / x) * 100);
    let s = P.assen() + P.fn(prog, "curve", 100) + P.fn(() => 40, "curve5") + P.fn(degr, "curve4", 100);
    s += P.tekst(30, prog(30), quiz ? "A" : "progressief", "start", "k b pa", 6, 16) + P.tekst(30, 40, quiz ? "B" : "proportioneel", "middle", "k b pg", 0, 13) + P.tekst(98, degr(98), quiz ? "C" : "degressief", "end", "k b pb", 0, 15);
    return P.svg(s, "Drie lijnen: de gemiddelde belastingdruk stijgt, blijft gelijk of daalt als het inkomen toeneemt");
  });

  // Lorenzcurve
  const lorenzPlot = () => TW.plot({ x: [0, 100], y: [0, 100], xl: "% personen (cumulatief, arm → rijk)", yl: "% inkomen (cumulatief)", xt: 20, yt: 10, w: 340, h: 300, mt: 20 });
  TW.fig("lorenz_vb", (quiz) => {
    const P = lorenzPlot(), c = [0, 5, 15, 30, 55, 100], pts = c.map((v, i) => [i * 20, v]);
    let s = P.assen() + P.lijn(0, 0, 100, 100, "stip") + P.vlak(pts, "vlak") + P.pad(pts, "curve") + pts.slice(1, 5).map((p) => P.punt(p[0], p[1])).join("");
    if (!quiz) s += pts.slice(1, 5).map((p) => P.tekst(p[0], p[1], p[1] + "%", "start", "b", 8, 14)).join("") + P.tekst(50, 50, "gelijke verdeling", "end", "k", -8, -4);
    return P.svg(s, "Lorenzcurve door de punten 20 en 5, 40 en 15, 60 en 30, 80 en 55");
  });
  TW.fig("lorenz_twee", () => {
    const P = lorenzPlot(), a = [0, 3, 10, 23, 45, 100], b = [0, 8, 20, 36, 58, 100];
    const pt = (c) => c.map((v, i) => [i * 20, v]);
    const s = P.assen() + P.lijn(0, 0, 100, 100, "stip") + P.pad(pt(a), "curve4") + P.pad(pt(b), "curve") + P.tekst(80, 45, "A", "start", "g pb", 6, 12) + P.tekst(80, 58, "B", "end", "g pa", -8, -4);
    return P.svg(s, "Twee Lorenzcurven: curve B ligt dichter bij de diagonaal dan curve A");
  });

  // Opbouw van de betalingsbalans
  TW.fig("betalingsbalans", () => {
    let s = doos(95, 4, 150, 30, ["Betalingsbalans"], "doos-a") + pijl(140, 34, 95, 58) + pijl(200, 34, 262, 58);
    s += doos(10, 58, 170, 40, ["Lopende rekening", "handel en inkomens"]) + doos(196, 58, 136, 40, ["Financiële rekening", "kapitaalstromen"]);
    s += pijl(60, 98, 70, 122) + pijl(130, 98, 240, 122);
    s += doos(4, 122, 150, 52, ["Goederen- en", "dienstenrekening", "export (E) en import (M)"]) + doos(164, 122, 170, 52, ["Inkomensrekening", "primaire inkomens en", "inkomensoverdrachten"]);
    return svg(340, 180, "De betalingsbalans bestaat uit de lopende rekening en de financiële rekening", s);
  });

  // Arbeidsmarkt met minimumloon
  const amPlot = () => TW.plot({ x: [0, 12], y: [0, 70], xl: "arbeid (mln arbeidsjaren)", yl: "loon (× € 1.000 per jaar)", xt: 1, yt: 10, w: 340, h: 280, mt: 20 });
  const Lv = (q) => 60 - 5 * q, La = (q) => 10 + 5 * q;
  TW.fig("arbeidsmarkt_min", (quiz) => {
    const P = amPlot();
    let s = P.assen() + P.fn(Lv, "curve") + P.fn(La, "curve5") + P.tekst(10.8, Lv(10.8), "vraag", "end", "b pa", -6, -2) + P.tekst(10.6, La(10.6), "aanbod", "end", "b pg", -8, 4);
    s += P.lijn(0, 45, 11.5, 45, "curve2") + P.tekst(11.5, 45, "minimumloon", "end", "k b pr", 0, -5) + P.lijn(3, 0, 3, 45, "stip") + P.lijn(7, 0, 7, 45, "stip") + P.lijn(5, 0, 5, 35, "stip") + P.lijn(0, 35, 5, 35, "stip") + P.punt(5, 35);
    if (!quiz) s += P.lijn(3, 45, 7, 45, "dik2") + P.tekst(5, 45, "aanbodoverschot: 4 mln", "middle", "k b pr", 0, 16);
    return P.svg(s, "Arbeidsmarkt: evenwichtsloon 35, minimumloon 45, vraag 3 en aanbod 7 miljoen arbeidsjaren");
  });
  TW.fig("arbeidsmarkt_surplus", () => {
    const P = amPlot();
    let s = P.assen() + P.vlak([[0, 60], [3, 45], [0, 45]], "vlak") + P.vlak([[0, 45], [3, 45], [3, 25], [0, 10]], "vlak3") + P.vlak([[3, 45], [5, 35], [3, 25]], "vlak2");
    s += P.fn(Lv, "curve") + P.fn(La, "curve5") + P.tekst(10.8, Lv(10.8), "vraag", "end", "b pa", -6, -2) + P.tekst(10.6, La(10.6), "aanbod", "end", "b pg", -8, 4);
    s += P.lijn(0, 45, 11.5, 45, "curve2") + P.tekst(11.5, 45, "minimumloon", "end", "k b pr", 0, -5) + P.lijn(3, 0, 3, 45, "stip") + P.lijn(5, 0, 5, 35, "stip") + P.lijn(0, 35, 5, 35, "stip");
    s += P.tekst(1, 50, "A", "middle", "g pa", 0, 4) + P.tekst(1.4, 31, "B", "middle", "g pg", 0, 4) + P.tekst(3.7, 35, "C", "middle", "g pr", 0, 5);
    return P.svg(s, "Arbeidsmarkt met minimumloon en drie gekleurde vlakken A, B en C");
  });

  // Loonkosten, brutoloon, nettoloon en de wig
  TW.fig("wig", (quiz) => {
    const x0 = 10, br = 320, f = br / 5000;
    const blok = (x, w, y, cls, r1, r2) => `<rect x="${(x0 + x * f).toFixed(1)}" y="${y}" width="${(w * f).toFixed(1)}" height="34" class="${cls}"/><rect x="${(x0 + x * f).toFixed(1)}" y="${y}" width="${(w * f).toFixed(1)}" height="34" class="s"/><text x="${(x0 + (x + w / 2) * f).toFixed(1)}" y="${y + 15}" text-anchor="middle" class="k b">${r1}</text><text x="${(x0 + (x + w / 2) * f).toFixed(1)}" y="${y + 28}" text-anchor="middle" class="k">${r2}</text>`;
    let s = `<text x="${x0}" y="12" class="k b">Loonkosten voor de werkgever: € 5.000 per maand</text>`;
    s += blok(0, 2800, 20, "vlak3", "nettoloon", "€ 2.800") + blok(2800, 1200, 20, "vlak4", "werknemerswig", quiz ? "?" : "€ 1.200") + blok(4000, 1000, 20, "vlak2", "werkgeverswig", quiz ? "?" : "€ 1.000");
    s += `<path d="M${x0} 62 v6 h${(4000 * f).toFixed(1)} v-6" class="pijl"/><text x="${(x0 + 2000 * f).toFixed(1)}" y="82" text-anchor="middle" class="k">brutoloon € 4.000</text>`;
    s += `<path d="M${(x0 + 2800 * f).toFixed(1)} 92 v6 h${(2200 * f).toFixed(1)} v-6" class="pijl"/><text x="${(x0 + 3900 * f).toFixed(1)}" y="112" text-anchor="middle" class="k b">${quiz ? "de wig = ?" : "de wig € 2.200"}</text>`;
    return svg(340, 118, "Balk: de loonkosten bestaan uit het nettoloon, de werknemerswig en de werkgeverswig", s);
  });

  // Omslagstelsel tegenover kapitaaldekkingsstelsel
  TW.fig("stelsels_pensioen", () => {
    let s = `<text x="6" y="12" class="k b pa">Omslagstelsel (AOW)</text>`;
    s += doos(6, 20, 120, 40, ["Werkenden van nu", "betalen premie"]) + pijl(128, 40, 208, 40) + doos(210, 20, 124, 40, ["Ouderen van nu", "krijgen AOW"]);
    s += `<text x="168" y="34" text-anchor="middle" class="k">zelfde jaar</text><text x="6" y="76" class="k">Geen spaarpot. Gevoelig voor vergrijzing (grijze druk).</text>`;
    s += `<text x="6" y="104" class="k b pb">Kapitaaldekkingsstelsel (pensioenfonds)</text>`;
    s += doos(6, 112, 92, 40, ["Jij nu", "betaalt premie"]) + pijl(100, 132, 122, 132) + doos(124, 112, 104, 40, ["Pensioenfonds", "spaart en belegt"]) + pijl(230, 132, 252, 132) + doos(254, 112, 80, 40, ["Jij later", "pensioen"]);
    s += `<text x="6" y="168" class="k">Eigen spaarpot. Gevoelig voor rente, beurs en inflatie.</text>`;
    return svg(340, 174, "Schema van het omslagstelsel en het kapitaaldekkingsstelsel", s);
  });

  // Effectieve vraag tegenover productiecapaciteit (verzonnen land, jaar 1 t/m 8)
  ECOFIG.EV = [100, 104, 108, 106, 104, 110, 118, 124];
  ECOFIG.PC = [100, 103, 106, 109, 112, 115, 118, 121];
  TW.fig("ev_pc", (quiz) => {
    const P = TW.plot({ x: [0.5, 8.5], y: [95, 130], xl: "jaar", yl: "× € 1 mld", xt: 1, yt: 5, w: 340, h: 240, mt: 22 });
    const ev = ECOFIG.EV.map((v, i) => [i + 1, v]), pc = ECOFIG.PC.map((v, i) => [i + 1, v]);
    let s = P.assen() + P.pad(pc, "curve5") + P.pad(ev, "curve") + ev.map((p) => P.punt(p[0], p[1])).join("") + pc.map((p) => P.punt(p[0], p[1], "dot", 3)).join("");
    s += P.tekst(8.4, 124, "effectieve vraag", "end", "k b pa", 0, -8) + P.tekst(8.4, 121, "productiecapaciteit", "end", "k b pg", 0, 16);
    if (!quiz) s += P.tekst(5, 104, "onderbesteding", "middle", "k b pr", 0, 16) + P.tekst(2.6, 108, "overbesteding", "middle", "k b pb", 0, -10);
    return P.svg(s, "Lijnen van de effectieve vraag en de productiecapaciteit van jaar 1 tot en met jaar 8");
  });

  // Verloop van de dekkingsgraad van een verzonnen pensioenfonds
  ECOFIG.DG = [112, 104, 96, 93, 101, 108, 115, 118];
  TW.fig("dekking_verloop", () => {
    const P = TW.plot({ x: [0.5, 8.5], y: [85, 125], xl: "jaar", yl: "dekkingsgraad (%)", xt: 1, yt: 5, w: 340, h: 230, mt: 22 });
    const pts = ECOFIG.DG.map((v, i) => [i + 1, v]);
    let s = P.assen() + P.lijn(0.5, 100, 8.5, 100, "curve2") + P.lijn(0.5, 110, 8.5, 110, "stip");
    s += P.tekst(8.4, 100, "100%", "end", "k b pr", 0, 13) + P.tekst(8.4, 110, "110%", "end", "k", 0, 13);
    s += P.pad(pts, "curve") + pts.map((p) => P.punt(p[0], p[1]) + P.tekst(p[0], p[1], String(p[1]), "middle", "k b", 0, -8)).join("");
    return P.svg(s, "Dekkingsgraad van een pensioenfonds in jaar 1 tot en met 8, met lijnen bij 100 en 110 procent");
  });

  // Twee redeneringen over een loonsverlaging: Keynes en de Klassieken
  TW.fig("loon_scholen", (quiz) => {
    const K = ["loon daalt", "koopkracht ↓", "consumptie ↓", "effectieve vraag ↓", "productie ↓", "werkgelegenheid ↓"];
    const C = ["loon daalt", "loonkosten per product ↓", "prijzen ↓, ICP ↑", "export ↑", "productie ↑", "werkgelegenheid ↑"];
    let s = `<text x="85" y="12" text-anchor="middle" class="k b pa">Keynes: loon = koopkracht</text><text x="255" y="12" text-anchor="middle" class="k b pb">Klassieken: loon = kosten</text>`;
    K.forEach((t, i) => {
      const y = 20 + i * 36, laatste = i === K.length - 1;
      s += doos(10, y, 150, 26, [quiz && laatste ? "werkgelegenheid ?" : t], laatste ? "doos-a" : "doos") + doos(180, y, 150, 26, [quiz && laatste ? "werkgelegenheid ?" : C[i]], laatste ? "doos-a" : "doos");
      if (!laatste) s += pijl(85, y + 26, 85, y + 36) + pijl(255, y + 26, 255, y + 36);
    });
    return svg(340, 236, "Twee ketens: volgens Keynes leidt een loonsverlaging tot minder werk, volgens de Klassieken tot meer werk", s);
  });
})();
