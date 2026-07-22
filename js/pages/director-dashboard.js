
directorLogin();

//setup

let db = getDatabase();

if (db === null) {
    document.getElementById("resetBtn").disabled = true;
    document.getElementById("calculateBtn").style.display = "none";
}
else {
    document.getElementById("sessionInfo").innerHTML =
        "<p><strong>Asztalok: </strong>" + db.tableCount + "\t| <strong>Leosztások: </strong>" + db.boardCount + "</p>" +
        "<p><strong>Beküldött eredmények: </strong>" + db.results.length + " / " + db.tableCount * db.boardCount + "</p>"
}

let resultsContainer = document.getElementById("resultsList");

if (db.results.length === 0) {
    resultsContainer.innerHTML = "<div class='card'><p>Még nem érkezett eredmény.</p></div>";
    document.getElementById("calculateBtn").disabled = true;
}
else {
    renderIncomingResults();
}

// render results
function renderIncomingResults() {
    let resultsContainer = document.getElementById("resultsList");
    let htmlToInsert = "";

    for (let i = 0; i < db.results.length; i++) {
        let game = db.results[i];

        let doubledText = "";
        if (game.doubled !== "none") {
            doubledText = " " + game.doubled;
        }

        //megkeressük a neveket

        const ns = db.pairs?.find(p => p.direction === "N-S" && p.number == game.pairNS);
        const ew = db.pairs?.find(p => p.direction === "E-W" && p.number == game.pairEW);

        const nsName = ns ? ` (${ns.player1} és ${ns.player2})` : "";
        const ewName = ew ? ` (${ew.player1} és ${ew.player2})` : "";

        //html kartya
        htmlToInsert += "<div class='card' style='line-height: 1'>";

        htmlToInsert += "<div style='display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;'>";
        htmlToInsert += "<strong style='color: #1857b0; font-size: 1.1em;'>" + game.table + ". asztal, " + game.board + ". leosztás</strong>";
        htmlToInsert += "<a href='table.html?table=" + game.table + "&board=" + game.board + "' style='background-color: #cc0000; color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 22px; font-weight: bold;'>✏️</a>";
        htmlToInsert += "</div>";
        htmlToInsert += "<p><strong>Rögzítette: </strong> " + game.recorder + "</p>"
        htmlToInsert += "<p><strong>N-S " + game.pairNS + "</strong>" + nsName + "</p><p><strong>E-W " + game.pairEW + "</strong>" + ewName + "</p>";
        htmlToInsert += "<p><strong>Licit: </strong>" + game.level + game.suit + doubledText + " felvevő: " + game.declarer + "</p>";
        htmlToInsert += "<p><strong>Eredmény: </strong>" + game.tricks + "</p>";
        htmlToInsert += "</div>";
    }

    resultsContainer.innerHTML = htmlToInsert;
}

//delete data
document.getElementById("resetBtn").addEventListener("click", onResetClick);

async function onResetClick() {
    let sure = await BridgeModal.confirm("Biztosan törölni szeretnéd ezt a versenyt? Minden eredmény elvész!", "danger");
    if (sure) {
        clearDatabase();
        window.location.href = "index.html";
    }
}
