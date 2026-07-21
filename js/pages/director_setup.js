
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
            showMessage("A verseny sikeresen létrehozva! 🎉", false);
            setupDetails.style.display = "none";
            createButton.style.display = "none";

        }