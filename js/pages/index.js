let db = getDatabase();
let statusMessage = document.getElementById("statusMessage");
let directorLink = document.getElementById("directorLink");
let tableLink = document.getElementById("tableLink");
let namesLink = document.getElementById("namesLink");
let clubName = sessionStorage.getItem("activeClubName");

let finalMessage = "";

if (clubName) {
    finalMessage += "✅ Aktív klub: <strong>" + clubName + "</strong> <br>";
}

if (db === null) {
    tableLink.style.backgroundColor = "gray";
    tableLink.removeAttribute("href");
    tableLink.style.pointerEvents = "none";

    namesLink.style.backgroundColor = "gray";
    namesLink.removeAttribute("href");
    namesLink.style.pointerEvents = "none";

    finalMessage += "😿 Jelenleg nincs aktív verseny.";
}
else {
    finalMessage += "✅ " + db.name + " aktív |\nAsztalok: " + db.tableCount + "\t| Leosztások: " + db.boardCount;
    directorLink.innerText = "Vezérlőpult";
    directorLink.href = "director-dashboard.html";
}

statusMessage.innerHTML = finalMessage;