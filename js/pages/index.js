let db = getDatabase();
let statusMessage = document.getElementById("statusMessage");
let directorLink = document.getElementById("directorLink");
let tableLink = document.getElementById("tableLink");
let namesLink = document.getElementById("namesLink");

if (db === null) {
    tableLink.style.backgroundColor = "gray";
    tableLink.removeAttribute("href");
    tableLink.style.pointerEvents = "none";

    namesLink.style.backgroundColor = "gray";
    namesLink.removeAttribute("href");
    namesLink.style.pointerEvents = "none";

    statusMessage.innerText = "Jelenleg nincs aktív verseny. 😿";
}
else {
    statusMessage.innerText = db.name + " aktív ✅ \nAsztalok: " + db.tableCount + "\tLeosztások: " + db.boardCount;
    directorLink.innerText = "Vezérlőpult";
    directorLink.href = "director-dashboard.html";
}