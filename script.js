document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('presentation-container');
    const slides = document.querySelectorAll('.slide');

    let currentX = 0;
    let currentY = 0;

    // Rács méreteinek meghatározása
    let maxX = 0;
    let maxY = 0;

    // Inicializálás: pozicionáljuk a diákat a data-x és data-y alapján
    slides.forEach(slide => {
        const x = parseInt(slide.getAttribute('data-x'));
        const y = parseInt(slide.getAttribute('data-y'));

        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;

        // CSS-ben állítjuk be a pozíciót, hogy a konténeren belül jó helyen legyenek
        slide.style.left = `${x * 100}vw`;
        slide.style.top = `${y * 100}vh`;
    });

    function updateView() {
        // A konténert mozgatjuk ellentétes irányba
        const transformX = -currentX * 100;
        const transformY = -currentY * 100;
        container.style.transform = `translate(${transformX}vw, ${transformY}vh)`;
    }

    function navigate(direction) {
        switch (direction) {
            case 'ArrowRight':
                if (currentX < maxX) currentX++;
                break;
            case 'ArrowLeft':
                if (currentX > 0) currentX--;
                break;
            case 'ArrowDown':
                if (currentY < maxY) currentY++;
                break;
            case 'ArrowUp':
                if (currentY > 0) currentY--;
                break;
        }
        updateView();
    }

    // Billentyűzet események figyelése
    document.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault(); // Megakadályozza az alapértelmezett görgetést
            navigate(e.key);
        }
    });

    // Opcionális: Érintőképernyős támogatás vagy gombok hozzáadása később
    console.log('2D Presentation Engine Initialized');
});
