// === SPLASH CSAK EGYSZER ===
window.addEventListener("load", () => {
    const splash = document.getElementById("splashScreen");

    if (localStorage.getItem("splashDone") === "true") {
        splash.style.display = "none";
        return;
    }

    setTimeout(() => {
        splash.style.display = "none";
        localStorage.setItem("splashDone", "true");
    }, 2600);
});

// === PIN KÓD ===
const correctPIN = "0505";

window.onload = () => {
    if (localStorage.getItem("loggedIn") === "true") {
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("mainScreen").style.display = "flex";
    }

    updateCustomCallButton();
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



// ======================================================
// === TELEFONSZÁM HOZZÁADÁSA FUNKCIÓ ====================
// ======================================================

// Gomb frissítése induláskor
function updateCustomCallButton() {
    const btn = document.querySelector(".adam-button");

    const savedName = localStorage.getItem("customName");
    const savedNumber = localStorage.getItem("customNumber");

    if (savedName && savedNumber) {
        btn.innerText = savedName;

        btn.onclick = openCustomCallPopup;
    } else {
        btn.innerText = "Telefonszám hozzáadása";
        btn.onclick = openCustomCallPopup;
    }
}

// Popup megnyitása
function openCustomCallPopup() {
    const name = localStorage.getItem("customName") || "";
    const number = localStorage.getItem("customNumber") || "";

    document.getElementById("popupName").innerText = "Telefonszám hozzáadása";
    document.getElementById("popupInternal").innerHTML = `
        <input id="customName" class="popup-input" placeholder="Név" value="${name}">
        <input id="customNumber" class="popup-input" placeholder="Telefonszám" value="${number}">
        <button class="popup-save" onclick="saveCustomNumber()">Mentés</button>
    `;

    const phone = document.getElementById("popupPhone");
    phone.onclick = () => {
        if (number) window.location.href = "tel:" + number;
    };

    document.getElementById("popup").style.display = "flex";
}

// Mentés
function saveCustomNumber() {
    const name = document.getElementById("customName").value.trim();
    const number = document.getElementById("customNumber").value.trim();

    if (name === "" || number === "") {
        alert("Kérlek tölts ki minden mezőt!");
        return;
    }

    localStorage.setItem("customName", name);
    localStorage.setItem("customNumber", number);

    updateCustomCallButton();
    closePopup();
}



// === ÁDÁM PROJEKT (MEGMARAD, DE NEM A GOMBON) ===
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
// ==========================================
// ========= HAMBURGER MENÜ =================
// ==========================================

let deferredPrompt = null;

// Menü nyitás/zárás
function toggleMenu() {

    const menu = document.getElementById("menuDropdown");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// Menü bezárása kattintás kívül
window.addEventListener("click", function(e) {

    const menu = document.getElementById("menuDropdown");
    const button = document.querySelector(".hamburger-btn");

    if (!menu.contains(e.target) && !button.contains(e.target)) {
        menu.style.display = "none";
    }
});

// ==========================================
// =============== MEGOSZTÁS ================
// ==========================================

async function shareApp() {

    try {

        await navigator.share({
            title: "Building",
            text: "Building telefonszámos app",
            url: "https://myhappyapp.github.io/buildingtatabanya/"
        });

    } catch (err) {
        console.log("Megosztás megszakítva");
    }
}

// ==========================================
// ========= APPIKON TELEPÍTÉS ==============
// ==========================================

// PWA install figyelése
window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;
});

// Telepítés indítása
async function installApp() {

    if (!deferredPrompt) {

        alert("A telepítés jelenleg nem elérhető ezen az eszközön.");
        return;
    }

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
        console.log("App telepítve");
    }

    deferredPrompt = null;
}// ==========================================
// ========= SERVICE WORKER =================
// ==========================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./service-worker.js")

            .then((registration) => {
                console.log("Service Worker sikeresen regisztrálva");
            })

            .catch((error) => {
                console.log("Service Worker hiba:", error);
            });
    });
}