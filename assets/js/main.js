// Konfiguration für die Magazine
const magazines = [
    {
        id: 1,
        title: "Paradi Magazin - Ausgabe 1",
        date: "November 2025",
        thumbnail: "assets/images/cover-1.jpg",
        pages: ["magazines/issue1/page1.jpg", "magazines/issue1/page2.jpg"]
    }
    // Weitere Magazine hier hinzufügen
];

// Initialisierung des Magazin-Viewers
let currentMagazine = null;

document.addEventListener('DOMContentLoaded', function() {
    loadMagazineList();
    if (magazines.length > 0) {
        loadMagazine(magazines[0]);
    }
});

// Laden der Magazin-Liste
function loadMagazineList() {
    const magazineList = document.querySelector('.magazine-list');
    magazineList.innerHTML = '';

    magazines.forEach(magazine => {
        const card = createMagazineCard(magazine);
        magazineList.appendChild(card);
    });
}

// Erstellen einer Magazin-Karte
function createMagazineCard(magazine) {
    const card = document.createElement('div');
    card.className = 'magazine-card minecraft-style';
    card.innerHTML = `
        <img src="${magazine.thumbnail}" alt="${magazine.title}">
        <h3>${magazine.title}</h3>
        <p>${magazine.date}</p>
        <button class="minecraft-button" onclick="loadMagazine(${magazine.id})">Lesen</button>
    `;
    return card;
}

// Laden eines Magazins
function loadMagazine(magazineId) {
    const magazine = magazines.find(m => m.id === magazineId);
    if (!magazine) return;

    currentMagazine = magazine;
    const magazineContainer = document.getElementById('magazine');
    
    // Turn.js Initialisierung
    $(magazineContainer).turn({
        width: 800,
        height: 600,
        autoCenter: true,
        gradients: true,
        acceleration: true,
        when: {
            turning: function(event, page, pageObj) {
                // Animation beim Blättern
            }
        }
    });

    // Seiten laden
    magazine.pages.forEach(pageUrl => {
        const page = document.createElement('div');
        page.className = 'page';
        page.style.backgroundImage = `url(${pageUrl})`;
        magazineContainer.appendChild(page);
    });

    // Scroll zum Viewer
    document.getElementById('magazine-container').scrollIntoView({
        behavior: 'smooth'
    });
}

// Navigation durch das Magazin
function previousPage() {
    $('#magazine').turn('previous');
}

function nextPage() {
    $('#magazine').turn('next');
}

// Responsive Design Anpassungen
window.addEventListener('resize', function() {
    if (currentMagazine) {
        const width = Math.min(800, window.innerWidth - 40);
        const height = (width / 4) * 3;
        $('#magazine').turn('size', width, height);
    }
});