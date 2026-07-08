# BridgePal

A **BridgePal** egy könnyen használható, böngészőalapú alkalmazás bridzsversenyek lebonyolításához és az eredmények rögzítéséhez.

## Fájlszerkezet

* `index.html`: A főoldal, amely mutatja a jelenlegi verseny státuszát és a fő navigációs gombokat.
* `director-setup.html`: Jelszóval védett űrlap a verseny kezdeti paramétereinek (asztalok, partik száma) megadásához.
* `director-dashboard.html`: Jelszóval védett versenyigazgatói panel az adatok áttekintéséhez, valamint a verseny törléséhez (Session Reset).
* `names.html`: Felület a versenyző párok (N-S, E-W) nevének, vonalának és azonosítójának rögzítéséhez, valamint törléséhez.
* `table.html`: Az asztali beíró felület a játékosok számára, beépített szabályrendszerrel és ellenőrző logikával.
* `js/mock-data.js`: Az adatbázis-kezelő logika (mentés és olvasás a böngésző helyi tárhelyéről).
* `js/utils.js`: Általános segédfüggvények (pl. a felugró rendszerüzenetek és hibaüzenetek kezelése).
* `css/styles.css`: A teljes alkalmazás globális stíluslapja.

## 🌊 Készítők

*built with ♥️ by wavee.labs 🌊*