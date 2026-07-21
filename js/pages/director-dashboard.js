
        directorLogin();

        //setup

        let db = getDatabase();

        if (db === null) {
            document.getElementById("resetBtn").disabled = true;
            document.getElementById("calculateBtn").style.display = "none";
        }
        else {
            document.getElementById("sessionInfo").innerHTML =
                "<p><strong>Asztalok: </strong>" + db.tableCount + "\t<strong>Leosztások: </strong>" + db.boardCount + "</p>" +
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
                htmlToInsert += "<p><strong style='color: #1857b0'>" + game.table + ". asztal, " + game.board + ". leosztás</strong></p>";
                htmlToInsert += "<p><strong>N-S " + game.pairNS + "</strong>" + nsName + "</p><p><strong>E-W " + game.pairEW + "</strong>" + ewName + "</p>";
                htmlToInsert += "<p><strong>Licit: </strong>" + game.level + game.suit + doubledText + " felvevő: " + game.declarer + "</p>";
                htmlToInsert += "<p><strong>Eredmény: </strong>" + game.tricks + "</p>";
                htmlToInsert += "</div>";
            }

            resultsContainer.innerHTML = htmlToInsert;
        }

        //CALCULATE SCORE

        //CALCULATE MATCHPOINTS

        //delete data
        document.getElementById("resetBtn").addEventListener("click", onResetClick);

        function onResetClick() {
            let sure = confirm("⚠️ Biztosan törölni szeretnéd ezt a versenyt? Minden eredmény elvész! ⚠️");
            if (sure) {
                clearDatabase();
                window.location.href = "index.html";
            }
        }
