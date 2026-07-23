directorLogin();

let createButton = document.getElementById("createBtn");
let setupDetails = document.getElementById("setupDetails");

createButton.addEventListener("click", onCreateClick);

function onCreateClick() {
  let name = document.getElementById("sessionName").value;
  let tables = document.getElementById("tableCount").value;
  let boards = document.getElementById("boardCount").value;

  if (name.trim() === "") {
    name = "Névtelen verseny";
    //robinak valami alap név h ne kapjon agyfaszt
  }

  createTournament(name, tables, boards);
  let DataToSave = {
    name: name,
    table_count: tables,
    board_count: boards,
  };

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
      if (!data.success) {
        showMessage("Hiba a mentés során: " + data.message, true);
      } else {
        // Sikeres mentés esetén ez fut le:
        showMessage("Sikeres mentés!", false);
      }
    })
    .catch((error) => {
      console.error("Fetch hiba:", error);
      showMessage("Hálózati hiba történt!", true);
    });

  showMessage("A verseny sikeresen létrehozva! 🎉", false);
  setupDetails.style.display = "none";
  createButton.style.display = "none";
}
