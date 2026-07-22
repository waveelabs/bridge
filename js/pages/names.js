
//Adatok mentése
document.getElementById("addPairBtn").addEventListener("click", onAddPair);

async function onAddPair() {
    let db = getDatabase();
    if (db === null) {
        showMessage("Még nincs aktív verseny!", true);
        return;
    }

    let direction = document.getElementById("pairDirection").value;
    let pNumber = document.getElementById("pairNumber").value;
    let p1 = document.getElementById("player1").value.trim();
    let p2 = document.getElementById("player2").value.trim();

    if (p1 === "" || p2 === "") {
        showMessage("Kérlek töltsd ki mindkét játékos nevét!", true);
        return;
    }

    let pairData = {
        direction: direction,
        number: pNumber,
        player1: p1,
        player2: p2,
    }

    let existingIndex = db.pairs.findIndex(p => p.direction === direction && p.number === pNumber);

    if (existingIndex !== -1) {
        let sure = await BridgeModal.confirm("Ez a párszám már létezik ezen a vonalon. Bisztosan felülírod az eddigi neveket?", "danger");
        if (sure) {
            db.pairs[existingIndex] = pairData;
        } else {
            return;
        }
    } else {
        db.pairs.push(pairData);
    }

    saveDatabase(db);
    showMessage(`${direction} ${pNumber} páros sikeresen elmentve! ✅`, false);

    //űrlap letörlése
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";

    renderTable();
}

function renderTable() {
    let db = getDatabase();
    let tbody = document.getElementById("namesTableBody");
    tbody.innerHTML = "";


    if (!db || db.pairs.length === 0) {
        tbody.innerHTML = "<tr><td colspan='3'>Még nincsenek rögzített párok.</td></tr>";
        return;
    }

    for (let i = 0; i < db.pairs.length; i++) {

        let pair = db.pairs[i];
        let tr = document.createElement("tr");

        tr.innerHTML = `<td>${pair.direction} ${pair.number}</td>
                        <td>${pair.player1} és ${pair.player2}</td>
                        <td style="text-align: center; cursor: pointer; color: #cc0000; font-size: 1.2em;" title="Törlés" onclick="deletePair(${i})">❌</td>`;

        tbody.appendChild(tr);

    }
}

async function deletePair(index) {

    let db = getDatabase();
    if (db && db.pairs[index]) {
        let pairToDelete = db.pairs[index];
        let sure = await BridgeModal.confirm(`Biztosan törölni szeretnéd ezt a párt: ${pairToDelete.direction} ${pairToDelete.number}?`, "danger");

        if (sure) {
            db.pairs.splice(index, 1); // kivágjuk
            saveDatabase(db);
            showMessage(`${pairToDelete.direction} ${pairToDelete.number} páros sikeresen törölve!`, false);
            renderTable();
        }
    }

}

renderTable();