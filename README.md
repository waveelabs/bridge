# 🌊 BridgePal

A **BridgePal** egy könnyen használható, böngészőalapú alkalmazás bridzsversenyek lebonyolításához, eredmények rögzítéséhez és szkórkalkálásához. Az alkalmazás támogatja az offline működést és helyi adattárolást, valamint optional backend PHP szinkronizációt.

## 🎯 Főbb Funkciók

- **Verseny kezelés**: Versenyek létrehozása paraméterezett asztalokkal és leosztásokkal
- **Eredmény rögzítése**: Asztali beíró felület játékosok számára
- **Automatikus škórkalkálás**: Beépített nemzetközi bridzs pontozási szabályok
- **Versenyigazgatói panel**: Vezérlőpult az eredmények áttekintéséhez és kezeléséhez
- **Párok nyilvántartása**: Versenyző párok (N-S, E-W) adatainak kezelése
- **Sérülékenységi kalkulátor**: Automatikus számítás board és felvevő alapján
- **Szerkesztési lehetőség**: Már beküldött eredmények módosítása
- **Verseny reset**: Teljes verseny törlése egy kattintással
- **Jelszóvédelem**: Igazgatói funkciók szinkronizációval

## 📁 Projekt Szerkezete

### Frontend Fájlok
- `index.html`: Főoldal - verseny státusza és navigáció
- `director-setup.html`: Verseny paraméter beállítása (jelszóval védett)
- `director-dashboard.html`: Igazgatói panel - eredmények áttekintése
- `names.html`: Versenyző párok kezelése
- `table.html`: Asztali beíró felület

### JavaScript Modulok
- `js/pages/index.js`: Főoldal logika
- `js/pages/director-setup.js`: Verseny létrehozás
- `js/pages/director-dashboard.js`: Igazgatói panel dinamika
- `js/pages/table.js`: Beíró formok és adatküldés
- `js/pages/names.js`: Párok kezelő felület
- `js/calculate.js`: Bridzs pontozási motor (típusa: import/export modul)
- `js/mock-data.js`: Lokális adatbázis (localStorage) interfész
- `js/utils.js`: Közös segédfüggvények (modálok, üzenetek, login)

### Stílus
- `css/styles.css`: Teljes alkalmazás stílusa

### Backend & Adatbázis
- `php/table_db.php`: PHP backend az eredmények szinkronizálásához
- `bridgepal.sql`: Adatbázis séma

## 💾 Adattárolás

A BridgePal **kétszintű adattárolást** támogat:

1. **Helyi tárolás (localStorage)** - Alapértelmezett
   - Adatok a böngészőben tárolódnak
   - Offline működéshez ideális
   - Az alkalmazás azonnal működőképes
   - Club ID alapú szétválasztás

2. **PHP Backend (opcionális)**
   - Eredmények szinkronizálása szerverhez
   - Persistent adattárolás
   - Többfelhasználós funkciók támogatása

## 🔐 Jelszó Védelem

Az igazgatói funkciók (setup, dashboard) jelszóval vannak védve:
- **Jelszó**: `Robi`
- A jelszó session alapon tárolódik (sessionStorage)

## 🚀 Telepítés & Használat

### Követelmények
- Modern böngésző (Chrome, Firefox, Safari, Edge)
- PHP 7+ (backend szinkronizációhoz)

### Gyors Kezdés

1. **Versenyt megnyit az index-ből**
2. **Klikkelnél a "Verseny létrehozása" gombra**
3. **Beadja az igazgatói jelszót** (Robi)
4. **Megadja a verseny paramétereit**: asztalok száma, leosztások száma, verseny neve
5. **Párok neveit rögzítse** a names.html felületen
6. **Eredményeket rögzítje** az asztali beíró felületen (table.html)
7. **A vezérlőpulton** (director-dashboard.html) követheti az eredményeket
8. **Végeredményt számol** az "Eredmény kiszámítása" gombbal

### Szerkesztés

Már beküldött eredmények szerkeszthetők a vezérlőpult ✏️ gombjával.

## 📊 Bridzs Pontozási Szabályok

A `calculate.js` modulban implementált pontozási rendszer:
- **Normál ütéspontok**: Szín és szintet alapján
- **Dupla/Redupla büntetés**: x2 / x4 szorzó
- **Felvételi pont (Game Bonus)**: 300 (nem sérülékeny) / 500 (sérülékeny)
- **Slam bónusz**: 500/750 (Kis slam) vagy 1000/1500 (Grand slam)
- **Többlet ütések**: Automatikus kalkuláció
- **Undertrick büntetés**: Szabályos bridzs penalizálás

## 🐛 Ismert Hibák & Javítások

- **Duplikáció fix**: Eredmények kétszeri beküldésének problémája kijavítva
  - Okcorr: `table.js` nem szükséges dupla `.push()` remove

## 🛠️ Fejlesztői Megjegyzések

- Az alkalmazás ES6 modulokat használ a backend logikához (calculate.js)
- Felugró rendszer: `BridgeModal` objektum (utils.js)
- Responsive design CSS flexbox alapon
- Multi-device support (asztali, tablet, mobil)

## 🌊 Készítők

*built with ♥️ by wavee.labs 🌊*

---

**Verzió**: 1.1  
**Utolsó frissítés**: 2026. július