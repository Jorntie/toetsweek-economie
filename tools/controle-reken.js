#!/usr/bin/env node
// Rekent elke rekenopgave onafhankelijk na. Gebruik (vanuit de vak-map): node tools/controle-reken.js
// Vaste opgaven: eigen berekening per opgave. Gen-opgaven: 300 keer genereren, de getallen uit de vraagtekst halen
// en het antwoord opnieuw uitrekenen. Daarnaast een paar controles op de widgets en figuren.
const fs = require("fs"), path = require("path"), vm = require("vm");
const dir = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
const ctx = { console, Math, Date, JSON, Number, String, Array, Object, isFinite, isNaN, parseFloat, parseInt, setTimeout, clearTimeout,
  document: { getElementById: () => null, documentElement: { style: { setProperty() {} } }, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [] },
  localStorage: { getItem: () => null, setItem() {} }, location: { hash: "" }, addEventListener() {}, requestAnimationFrame() {} };
ctx.window = ctx; vm.createContext(ctx);
for (const m of html.matchAll(/<script src="([^"]+)"/g)) vm.runInContext(fs.readFileSync(path.join(dir, m[1]), "utf8"), ctx, { filename: m[1] });
const TW = ctx.TW, S = TW._S;

let ok = 0, fout = 0;
const meld = (goed, wat) => { if (goed) ok++; else { fout++; console.log("✖ " + wat); } };
const bijna = (a, b, tol) => Math.abs(a - b) <= (tol != null ? tol : Math.max(Math.abs(b) * 0.001, 0.0051));
// Nederlandse getallen uit een tekst: "1.250,5" -> 1250.5
const getallen = (s) => (s.replace(/_\{[^}]*\}/g, "").match(/\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+(?:,\d+)?/g) || []).map((x) => Number(x.replace(/\./g, "").replace(",", ".")));
const box1 = (y) => Math.max(0, 0.36 * Math.min(y, 40000) + 0.5 * Math.max(0, y - 40000) - 3000);
const r = (x, d) => Math.round(x * 10 ** d) / 10 ** d;

// ---- vaste opgaven: begin van de vraag -> eigen berekening ----
const VAST = {
  "Een bakkerij heeft een omzet": () => 900000 - 320000 - 60000,
  "Het nominale bbp van een land heeft in 2024": () => r(124 / 112 * 100 - 100, 1),
  "Mila verdient": () => box1(62000 - 9000 + 2500),
  "Daan heeft": () => 0.3 * 0.04 * (130000 + 70000 - 20000 - 50000),
  "Lars verdient": () => box1(70000) - box1(62000),
  "Een Lorenzcurve gaat door de punten": () => 31 - 16,
  "In een woonwijk": () => 18 / 2.4,
  "Een huishouden heeft": () => 350000 + 25000 + 15000 - 300000 - 20000,
  "Een land heeft dit jaar": () => (500 + 120 + 60 + 10) - (450 + 100 + 70 + 25),
  "Een werkneemster heeft": () => 3700 + 800 - 2600,
  "De koers van de euro stijgt": () => (50 * 1.21 - 50 * 1.10) / (50 * 1.10) * 100,
  "Een bedrijf heeft 120": () => 120 + 180 * 24 / 36,
  "Op een arbeidsmarkt geldt: vraag L_{v} = 60": () => { const q = 50 / 10, L = 60 - 5 * q; return 0.5 * q * (60 - L); },
  "Op dezelfde markt": () => { const q = (60 - 45) / 5, qe = 5; return 0.5 * (qe - q) * ((60 - 5 * q) - (10 + 5 * q)); },
  "In jaar 1 is de beroepsbevolking": () => r(432000 / 9.6e6 * 100 - 380000 / 9.5e6 * 100, 2),
  "Bekijk de figuur met de effectieve vraag": () => ctx.ECOFIG.PC[4] - ctx.ECOFIG.EV[4],
  "Bekijk de figuur: de loonkosten zijn": () => 200 / 5000 * 100,
  "In een land krijgen 3,6 miljoen": () => 3.6e6 * 15000 / 9e6,
  "Een pensioenfonds heeft een vermogen van € 120": () => r(120 / (100 * 1.08) * 100, 1),
  "Een pensioenfonds heeft verplichtingen": () => 1.1 * 250,
  "Een gepensioneerde krijgt": () => 1500 * 1.04
};

// ---- gen-opgaven: herkenning aan de vraagtekst -> antwoord uit de getallen in de vraag ----
const GEN = [
  [/Bereken met indexcijfers het indexcijfer van het reële bbp/, (g) => r((100 + g[0]) / (100 + g[1]) * 100, 1)],
  [/bbp per hoofd van de bevolking in euro's/, (g) => Math.round(g[0] * 1e9 / (g[1] * 1e6))],
  [/groei van het reële bbp per hoofd/, (g) => r(g[0] - g[1] - g[2], 1)],
  [/inkomstenbelasting in box 1 bij een belastbaar inkomen/, (g) => box1(g[1])],
  [/Bereken de gemiddelde belastingdruk/, (g) => { if (!bijna(g[2], box1(g[0]), 0.01)) throw new Error("belasting in de vraag klopt niet"); return r(g[2] / g[0] * 100, 1); }],
  [/inclusief 21% btw/, (g) => r(g[0] - g[0] / 1.21, 2)],
  [/Welk percentage van het inkomen verdient de armste 40%/, (g) => { const T = g[0], ink = g.slice(1, 6); if (!bijna(ink.reduce((a, b) => a + b, 0), T, 1e-6)) throw new Error("groepen tellen niet op tot het totaal"); return (ink[0] + ink[1]) / T * 100; }],
  [/verhouding B \/ A na ingrijpen/, (g) => r(g[3] / g[2], 2)],
  [/Wat kost de jas in euro's/, (g) => r(g[2] / g[1], 2)],
  [/Bereken de loonkosten per product/, (g) => r(g[0] / g[1], 2)],
  [/procentuele verandering van de loonkosten per product/, (g) => r(g[0] - g[1], 1)],
  [/Bereken de participatiegraad/, (g) => r(g[1] / g[0] * 100, 1)],
  [/Bereken het aanbodoverschot/, (g) => { const a = g[0], M = g[4]; return r((M - 10) / 5 - (a - M) / 5, 2); }],
  [/Bereken het werkloosheidspercentage/, (g) => r(g[1] / (g[0] * 1e6) * 100, 1)],
  [/Bereken de wig per maand/, (g) => Math.round(g[0] * (1 + g[1] / 100) - g[0] * (1 - g[2] / 100))],
  [/Bereken de dekkingsgraad/, (g) => r(g[0] / g[1] * 100, 1)],
  [/Bereken de grijze druk/, (g) => r(g[0] / g[2] * 100, 1)]
];

S.hfst.forEach((h) => h.onderdelen.forEach((o) => (o.reken || []).forEach((d, i) => {
  const waar = `${o.id} reken[${i}]`;
  if (typeof d.gen === "function") {
    for (let n = 0; n < 300; n++) {
      const x = d.gen(TW.R), regel = GEN.find((g) => g[0].test(x.q));
      if (!regel) { meld(false, `${waar}: geen controle voor gen-vraag "${x.q.slice(0, 60)}"`); return; }
      let verwacht;
      try { verwacht = regel[1](getallen(x.q)); } catch (e) { meld(false, `${waar}: ${e.message} in "${x.q}"`); return; }
      const tol = x.tol != null ? x.tol : Math.max(Math.abs(verwacht) * 0.01, 0.005);
      if (!bijna(x.antwoord, verwacht, Math.min(tol, Math.max(Math.abs(verwacht) * 0.002, 0.011)))) { meld(false, `${waar}: antwoord ${x.antwoord}, nagerekend ${verwacht} bij "${x.q}"`); return; }
      if (x.stappen.some((s) => /NaN|undefined|Infinity/.test(s))) { meld(false, `${waar}: stap met NaN`); return; }
    }
    meld(true);
  } else {
    const sleutel = Object.keys(VAST).find((k) => d.q.startsWith(k));
    if (!sleutel) return meld(false, `${waar}: geen controle voor "${d.q.slice(0, 60)}"`);
    const v = VAST[sleutel]();
    meld(bijna(d.antwoord, v, 0.051), `${waar}: antwoord ${d.antwoord}, nagerekend ${v}`);
  }
})));

// ---- controles op widgets en figuren (zelfde formules als in widgets.js / widgets-arbeid.js) ----
const ECO = ctx.ECO;
meld(ECO.box1(60000).bel === 21400, "box1(60.000) moet 21.400 zijn (figuur schijven)");
meld(ECO.box1(50000).bel === 16400 && bijna(16400 / 50000 * 100, 32.8), "box1(50.000): 16.400 en 32,8%");
meld(ECO.box1(30000).bel === 7800, "box1(30.000) = 7.800");
meld(ECO.box1(5000).bel === 0, "box1 nooit negatief");
// Lorenz: cumulatief tot 100 en de 80/20 ratio uit de figuur lorenz_vb
const c = [0, 5, 15, 30, 55, 100], aand = c.slice(1).map((v, i) => v - c[i]);
meld(aand.reduce((a, b) => a + b, 0) === 100 && aand.every((a, i) => i === 0 || a >= aand[i - 1]), "lorenz_vb: aandelen oplopend en samen 100");
// reëel indexcijfer
meld(bijna(104 / 106 * 100, 98.11, 0.01), "reëel indexcijfer 104/106");
// arbeidsmarkt: surplus zonder en met minimumloon 45
const Lv = (q) => 60 - 5 * q, La = (q) => 10 + 5 * q;
const wg = (q, w) => 0.5 * q * (Lv(0) - w), wn = (q, w) => q * w - (La(0) * q + 2.5 * q * q);
meld(wg(5, 35) + wn(5, 35) === 125 && wg(3, 45) + wn(3, 45) === 105 && wg(3, 45) === 22.5 && wn(3, 45) === 82.5, "surplus 125 → 105 (A 22,5, B 82,5)");
// pensioen
meld(16000 * 50 / 100 === 8000 && 4000 / 0.4 === 10000 && bijna(105 / 110 * 100, 95.45, 0.01), "pensioen-widget: premie, uitkering en dekkingsgraad");
// concurrentie en loonkosten
meld(40 / 0.9 > 44.44 && 40 / 0.9 < 44.45 && 50 * 0.9 === 45 && 66000 / 2400 === 27.5 && 63000 / 2800 === 22.5, "concurrentie- en loonkosten-widget");
// figuren
meld(9216 + 384 === 9600 && 13000 - 3400 === 9600 && 384 / 9600 === 0.04, "figuur bevolking_getallen");
meld(5000 - 4000 === 1000 && 4000 - 2800 === 1200 && 5000 - 2800 === 2200, "figuur wig");
meld(ctx.ECOFIG.DG.filter((v) => v < 100).length === 2, "dekking_verloop: 2 jaren onder 100%");
const ov = ctx.ECOFIG.EV.map((v, i) => v - ctx.ECOFIG.PC[i]);
meld(ov.indexOf(Math.min(...ov)) === 4 && ov[2] > 0, "ev_pc: grootste onderbesteding in jaar 5, overbesteding in jaar 3");

console.log(`\n${ok} controles goed, ${fout} fout`);
process.exit(fout ? 1 : 0);
