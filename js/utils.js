function checkLogin() {

    if (window.location.href.includes("login.html")) {
        return;
    }
    if (!sessionStorage.getItem("activeClubId")) {
        window.location.href = "login.html";
    }
}
checkLogin();


function showMessage(text, isError) {
    let msgBox = document.getElementById("formMessage");
    msgBox.innerText = text;
    msgBox.style.display = "block"; // jelenjen meg

    if (isError) {
        //red
        msgBox.style.borderColor = "#cc0000";
        msgBox.style.backgroundColor = "#fff0f0";
        msgBox.style.color = "#cc0000";
    }
    else {
        //green
        msgBox.style.borderColor = "#2b7a0b";
        msgBox.style.backgroundColor = "#f0fdf0";
        msgBox.style.color = "#2b7a0b";
    }
}

async function directorLogin() {
    if (sessionStorage.getItem("directorLoggedIn") !== "true") {
        let password = await BridgeModal.prompt("Kérlek add meg a jelszót:");
        if (password === "Robi") {
            sessionStorage.setItem("directorLoggedIn", "true");

        } else {
            await BridgeModal.alert("Helytelen jelszó! Hozzáférés megtagadva!", "danger");
            window.location.href = "index.html";
        }
    }
}

const BridgeModal = {

    // ok gombos alert
    alert: function (message, type) {
        if (!type) type = "primary";
        return new Promise(function (resolve) {
            BridgeModal.createModal(message, false, type, function (result) {
                resolve(result);
            });
        });
    },

    // igen / megse confirm opciok

    confirm: function (message, confirmType) {
        if (!confirmType) confirmType = "danger";
        return new Promise(function (resolve) {
            BridgeModal.createModal(message, true, confirmType, function (result) {
                resolve(result);
            });
        });
    },

    prompt: function (message, type) {
        if (!type) type = "primary";
        return new Promise(function (resolve) {
            BridgeModal.createModal(message, true, type, function (result) {
                resolve(result);
            }, true);
        });
    },

    createModal: function (message, isConfirm, btnType, callback, isPrompt) {
        if (isPrompt === undefined) isPrompt = false;

        //hatter
        let overlay = document.createElement("div");
        overlay.className = "modal-overlay";

        //doboz
        let box = document.createElement("div");
        box.className = "modal-box";

        //szoveg
        let text = document.createElement("p");
        text.innerHTML = message.replace(/\n/g, "<br>");
        box.appendChild(text);

        //szovegmezo, ha prompt
        let inputField = null;
        if (isPrompt) {
            inputField = document.createElement("input");
            inputField.type = "password";
            box.appendChild(inputField);
        }

        //gombok taroloja
        let btnContainer = document.createElement("div");
        btnContainer.className = "modal-buttons";

        //megse gomb
        if (isConfirm) {
            let cancelBtn = document.createElement("button");
            cancelBtn.className = "modal-btn modal-btn-secondary";
            cancelBtn.innerText = "Mégse";
            cancelBtn.onclick = function () {
                document.body.removeChild(overlay);
                callback(isPrompt ? null : false);
            };
            btnContainer.appendChild(cancelBtn);
        }

        //ok, igen gombika
        let confirmBtn = document.createElement("button");
        confirmBtn.className = "modal-btn modal-btn-" + btnType;
        confirmBtn.innerText = (isConfirm && !isPrompt) ? "Igen" : "OK";
        confirmBtn.onclick = function () {
            document.body.removeChild(overlay);
            if (isPrompt) {
                callback(inputField.value);
            } else {
                callback(true);
            }
        };
        btnContainer.appendChild(confirmBtn);

        box.appendChild(btnContainer);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        if (inputField) {
            inputField.focus();
        }
    }
};