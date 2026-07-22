# BridgePal

A **BridgePal** egy könnyen használható, böngészőalapú alkalmazás bridzsversenyek lebonyolításához, eredmények rögzítéséhez és kiszámításához.

## Főbb Funkciók

- **Verseny kezelés**: Versenyek létrehozása paraméterezett asztalokkal és leosztásokkal
- **Eredmény rögzítése**: Asztali beíró felület játékosok számára
- **Automatikus eredményszámolás**: Beépített nemzetközi bridzs pontozási szabályok
- **Versenyigazgatói panel**: Vezérlőpult az eredmények áttekintéséhez és kezeléséhez
- **Párok nyilvántartása**: Versenyző párok (N-S, E-W) adatainak kezelése
- **Szkórhelyzet kalkulátor**: Automatikus számítás board és felvevő alapján
- **Szerkesztési lehetőség**: Már beküldött eredmények módosítása
- **Verseny reset**: Teljes verseny törlése egy kattintással
- **Jelszóvédelem**: Igazgatói funkciók szinkronizációval

## Projekt Szerkezete

### Frontend Fájlok
- `index.html`: Főoldal - verseny státusza és navigáció
- `director-setup.html`: Verseny paraméter beállítása (jelszóval védett)
- `director-dashboard.html`: Igazgatói panel - eredmények áttekintése
- `names.html`: Versenyző párok kezelése
- `table.html`: Asztali beíró felület

### JavaScript Modulok
- `js/pages/index.js`: Főoldal logika
- `js/pages/director-setup.js`: Verseny létrehozás
- `js/pages/director-dashboard.js`: Vezérlőpult logika
- `js/pages/table.js`: Formok és adatküldés
- `js/pages/names.js`: Párok nevét kezelő felület
- `js/calculate.js`: Bridzs pontozási motor (típusa: import/export modul)
- `js/mock-data.js`: Lokális adatbázis (localStorage) interfész
- `js/utils.js`: Közös segédfüggvények

### Stílus
- `css/styles.css`: Teljes alkalmazás stílusa

### Backend & Adatbázis
- `php/table_db.php`: PHP backend az eredmények szinkronizálásához
- `bridgepal.sql`: Adatbázis séma

### Követelmények
- Modern böngésző (Chrome, Firefox, Safari, Edge)
- PHP 7+ (backend szinkronizációhoz)

## Készítők

*built with ♥️ by wavee.labs 🌊*

---

**Verzió**: 1.1  
**Utolsó frissítés**: 2026. július