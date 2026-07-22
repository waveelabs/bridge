import {
  calculateScore,
  calculateMatchpoints,
  calculateVulnerability,
  doubledConverter,
} from "../calculate.js";

// submit button magic
let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", onSubmitClick);

const boardNumInput = document.getElementById("boardNum");
const declarerSelect = document.getElementById("declarer");
const vulnDisplay = document.getElementById("declarerVulnerability");

//esemenykezelők -- megsem annyira folosleges az az eva
boardNumInput.addEventListener("input", frissitSebezhetoseg);
boardNumInput.addEventListener("change", frissitSebezhetoseg);
declarerSelect.addEventListener("change", frissitSebezhetoseg);

// frissítjük a sebezhetőséget, ha változik a board vagy a felvevő --gemini irta
function frissitSebezhetoseg() {
  const boardVal = document.getElementById("boardNum").value;
  const declarerVal = document.getElementById("declarer").value;

  if (boardVal && declarerVal) {
    const calculatedVuln = calculateVulnerability(boardVal, declarerVal);
    // Szép magyar kiírás (pl. "Vulnerable" -> Sebezhető, "None" -> Nem sebezhető)
    const szoftveresMegjelenites =
      calculatedVuln === "yes" ||
        calculatedVuln === true ||
        calculatedVuln === "vul"
        ? "Sebezhető (B)"
        : "Nem sebezhető (M)";

    vulnDisplay.textContent = `A felvevő sebezhetősége: ${szoftveresMegjelenites}`;
    return calculatedVuln;
  }
  return "no";
}

//esemenykezelők -- megsem annyira folosleges az az eva
boardNumInput.addEventListener("input", frissitSebezhetoseg);
boardNumInput.addEventListener("change", frissitSebezhetoseg);
declarerSelect.addEventListener("change", frissitSebezhetoseg);

// Első betöltéskor is fusson le, hogy ne legyen üres a mező
frissitSebezhetoseg();

async function onSubmitClick() {
  // database
  let db = getDatabase();
  if (db === null) {
    showMessage("Még nincs létrehozott verseny!", true);
    return;
  }

  // let'g gather the daaaaata

  let boardVal = document.getElementById("boardNum").value;
  let declarerVal = document.getElementById("declarer").value;
  let calculatedVuln = calculateVulnerability(boardVal, declarerVal);
  let resultData = {
    recorder: document.getElementById("recorderName").value.trim(),
    table: document.getElementById("tableNum").value,
    board: boardVal,
    pairNS: document.getElementById("nsPair").value,
    pairEW: document.getElementById("ewPair").value,
    level: document.getElementById("contractLevel").value,
    suit: document.getElementById("contractSuit").value,
    doubled: document.getElementById("contractDoubled").value,
    declarer: declarerVal,
    isVulnerable: calculatedVuln,
    tricks: document.getElementById("tricksTaken").value,
  };

  //validáció
  if (
    resultData.recorder === "" ||
    resultData.pairNS === "" ||
    resultData.pairEW === "" ||
    resultData.tricks === ""
  ) {
    showMessage(
      "Kérlek töltsd ki a N-S pár, E-W pár, Rögzítő neve és az Eredmény mezőket!",
      true,
    );
    return;
  }

  let doubleText =
    resultData.doubled !== "none" ? ` ${resultData.doubled}` : "";

  let scorePage = {
    ns_v: calculateVulnerability(resultData.board, "N"),
    ew_v: calculateVulnerability(resultData.board, "E"),
    declarer: resultData.declarer,
    contract_amount: resultData.level,
    contract_suite: resultData.suit,
    tricks_result: resultData.tricks,
    doubled: doubledConverter(resultData.doubled),
  };

  let score = calculateScore(scorePage);

  //öszefoglaló szöveg
  let summaryText =
    `<strong>Beküldés megerősítése:</strong>\n\n` +
    `Asztal: ${resultData.table} | Leosztás: ${resultData.board}\n` +
    `N-S: ${resultData.pairNS} | E-W: ${resultData.pairEW}\n` +
    `Licit: ${resultData.level}${resultData.suit}${doubleText} (Felvevő: ${resultData.declarer})\n` +
    `Felvevő szkórhelyzete: ${resultData.isVulnerable === "no" ? "M" : "B"}\n` +
    `Eredmény: ${resultData.tricks}\n` +
    `Pontszám: ${score}\n` +
    `Rőgzítő: ${resultData.recorder}\n\n` +
    `<strong>Minden adat helyes?</strong>`;

  let sure = await BridgeModal.confirm(summaryText, "primary");
  if (!sure) {
    return;
  }

  // meg kéne nézni, hogy ez a table és board combo létezik-e
  let foundMistake = false;
  for (let i = 0; i < db.results.length; i++) {
    let pastGame = db.results[i];

    if (
      pastGame.table === resultData.table &&
      pastGame.board === resultData.board
    ) {
      //felülírja, ha leokézzák (sok figyelmeztetéssel)
      let answer = await BridgeModal.confirm(
        "Ezzel felülírod a már beküldött adatot! Biztosan folytatod?", "danger"
      );
      if (answer) {
        db.results[i] = resultData;
        foundMistake = true;
        break;
      } else {
        // egyébként csak kilépünk
        return;
      }
    }
  }

  if (!foundMistake) {
    db.results.push(resultData);
  }

  //sima mentés
  saveDatabase(db);

  let DataToSave = {
    board_id: resultData.board,
    table_number: resultData.table,
    pair_ns: resultData.pairNS,
    pair_ew: resultData.pairEW,
    declarer: resultData.declarer,
    contract_amount: resultData.level,
    contract_suite: resultData.suit,
    doubled: doubledConverter(resultData.doubled),
    tricks_result: resultData.tricks,
    ns_score: score[0],
    ew_score: score[1],
    recorder: resultData.recorder,
  };

  // Adatok küldése a PHP fájlnak
  fetch("/bridge/php/table_db.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(DataToSave), // JSON szöveggé alakítjuk az objektumot
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Szerver hiba (" + response.status + ")");
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        showMessage(
          resultData.board +
          ". leosztás, " +
          resultData.table +
          ". asztal eredménye sikeresen beküldve! 🎉",
          false,
        );

        // kövi board a kényelemért
        document.getElementById("boardNum").value =
          parseInt(resultData.board) + 1;

        //letisztítjuk a formot
        document.getElementById("tricksTaken").value = "";

        //frissítés
        frissitSebezhetoseg();

        //legörgetünk
        window.scrollTo(0, document.body.scrollHeight);
      } else {
        showMessage("Szerver hiba: " + data.message, true);
      }
    });
}

function loadForEdit() {
  const urlParams = new URLSearchParams(window.location.search);
  const editTable = urlParams.get("table");
  const editBoard = urlParams.get("board");

  if (editTable && editBoard) {
    let db = getDatabase();
    // megkeressük az eredményt a az adatb-ben

    let gameToEdit = db.results.find(
      (r) => r.table === editTable && r.board === editBoard,
    );

    if (gameToEdit) {
      document.getElementById("tableNum").value = gameToEdit.table;
      document.getElementById("boardNum").value = gameToEdit.board;
      document.getElementById("nsPair").value = gameToEdit.pairNS;
      document.getElementById("ewPair").value = gameToEdit.pairEW;
      document.getElementById("declarer").value = gameToEdit.declarer;
      document.getElementById("contractDoubled").value = gameToEdit.doubled;
      document.getElementById("contractLevel").value = gameToEdit.level;
      document.getElementById("contractSuit").value = gameToEdit.suit;
      document.getElementById("tricksTaken").value = gameToEdit.tricks;
      document.getElementById("recorderName").value = "director";
    }

    frissitSebezhetoseg();

    showMessage(
      "Módosító mód: " +
      editTable +
      ". asztal, " +
      editBoard +
      ". leosztás betöltve.",
      false,
    );
  }
}

loadForEdit();
