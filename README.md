# BridgePal ♠️♥️♦️♣️

A **BridgePal** egy könnyen használható, böngészőalapú alkalmazás bridzsversenyek lebonyolításához és az eredmények rögzítéséhez. A projekt célja, hogy a directorok egyszerűen létrehozhassanak eseményeket, a játékosok pedig közvetlenül az asztaltól vihessék be a lejátszott partik adatait.

## Főbb funkciók

* **Director beállítások (Director Setup):** Új versenyek létrehozása a név, az asztalok számának és a leosztások számának megadásával.


* **Asztali eredménybeírás (Table Entry):** A játékosok rögzíthetik az É-D és K-Ny párok számát, a licitet (szint, szín, kontrázott státusz, felvevő, veszélyeztetettség) és a végső ütésszámot. Ha egy asztalhoz és leosztáshoz már tartozik adat, a rendszer figyelmeztet a felülírásra.


* **Élő Eredménykövető (Director Dashboard):** A versenyigazgató valós időben láthatja a beérkező eredményeket, a lejátszott partik arányát, és szükség esetén egy gombnyomással törölheti a teljes adatbázist.


* **Helyi adattárolás:** Az alkalmazás a böngésző `localStorage` egyelőre.

## Használat és telepítés

Mivel az alkalmazás tisztán kliensoldali, a beállítása nagyon egyszerű:

1. Töltsd le vagy klónozd a tárolót a gépedre.
2. Nyisd meg az `index.html` fájlt egy tetszőleges webböngészőben.
3. Kattints a **Director setup ⚙️** gombra az első versenyed létrehozásához.
4. A sikeres létrehozás után a **Table entry 📝** gomb aktívvá válik az eredmények rögzítéséhez.



## 📁 Fájlszerkezet

* `index.html`: A főoldal, amely mutatja a jelenlegi verseny státuszát és a fő navigációs gombokat.
* `director-setup.html`: Űrlap a verseny kezdeti paramétereinek (asztalok, partik száma) megadásához.
* `director-dashboard.html`: A versenyigazgatói panel az adatok áttekintéséhez, valamint a Session Reset funkcióhoz.
* `table.html`: Az asztali beíró felület a játékosok számára.
* `js/mock-data.js`: Az adatbázis-kezelő logika (mentés és olvasás a helyi tárhelyről).
* `css/styles.css`: A teljes alkalmazás globális stíluslapja.

## 🌊 Készítők

*made with ♥️ by wavee.labs 🌊*