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

function directorLogin() {
    if (sessionStorage.getItem("directorLoggedIn") !== "true") {
        let password = prompt("Kérlek add meg a jelszót:");
        if (password === "Robi") {
            sessionStorage.setItem("directorLoggedIn", "true");

        } else {
            alert("Helytelen jelszó! Hozzáférés megtagadva!");
            window.location.href = "index.html";
        }
    }
}