# Toetsweek · Economie

Interactieve leer-app voor de toetsweek (havo 5). Stof: Welvaart 2.1 t/m 2.4 · Arbeid 5.1 t/m 5.3. Eigen oefenstof bij Economie havo (Cumulus).

Statische app zonder build-stap: open `index.html`, of start een lokale server:

```bash
python3 -m http.server 8773
```

`core.js` en `core.css` zijn de gedeelde kern uit `../toetsweek/core/` (daar aanpassen, dan `../toetsweek/sync-core.sh`).
Controle van de stof: `node ../toetsweek/core/check.js`.
