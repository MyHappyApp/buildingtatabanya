// === SPLASH CSAK EGYSZER ===
window.addEventListener("load", () => {

    const splash = document.getElementById("splashScreen");

    // Ha már volt splash → ne jelenjen meg újra
    if (localStorage.getItem("splashDone") === "true") {
        splash.style.display = "none";
        return;
    }

    // Első indítás → splash megy, majd eltűnik
    setTimeout(() => {
        splash.style.display = "none";
        localStorage.setItem("splashDone", "true");
    }, 2600); // turbózott splash időzítése
});

// === PIN KÓD ===
const correctPIN = "0505";

window.onload = () => {
    if (localStorage.getItem("loggedIn") === "true") {
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("mainScreen").style.display = "flex";
    }
};

function checkPIN() {
    const input = document.getElementById("pinInput").value;
    const error = document.getElementById("pinError");

    if (input === correctPIN) {
        localStorage.setItem("loggedIn", "true");
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("mainScreen").style.display = "flex";
    } else {
        error.style.display = "block";
        setTimeout(() => error.style.display = "none", 1500);
    }
}

// === POPUP LOGIKA ===
function openTL(name, internal, mobile) {
    document.getElementById("popupName").innerText = name;
    document.getElementById("popupInternal").innerText = "Belső szám: " + internal;

    const phone = document.getElementById("popupPhone");
    phone.onclick = () => {
        window.location.href = "tel:" + mobile;
    };

    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// === ÁDÁM PROJEKT ===
function openAdam() {
    document.getElementById("popupName").innerText =
        "Hívd Ádámot ha szeretnéd hogy valaki leváltson, vagy meghívjon egy kávéra!";

    document.getElementById("popupInternal").innerText =
        "Csak mobilon érhető el.";

    const phone = document.getElementById("popupPhone");
    phone.onclick = () => {
        window.location.href = "tel:+36203865961";
    };

    document.getElementById("popup").style.display = "flex";
}
