// Wait for the HTML document to completely load
document.addEventListener('DOMContentLoaded', () => {
    
    // Grab key elements
    const contactBtn = document.getElementById('contactBtn');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const openGameBtn = document.getElementById('openGameBtn');
    const closeGameBtn = document.getElementById('closeGameBtn');
    const gamePage = document.getElementById('gamePage');
    const tiles = document.querySelectorAll('.c-tile.pipe');
    const currentVoltsText = document.getElementById('currentVolts');
    const circuitStatus = document.getElementById('circuitStatus');
    const resetLabBtn = document.getElementById('resetLabBtn');

    const BASE_VOLTS = 5;
    const TARGET_VOLTS = 8;

    // Contact button click
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            alert('Thanks for stopping by! Feel free to reach out via email!');
        });
    }

    // Scroll listeners for Back-To-Top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // OPEN / CLOSE DEDICATED GAME PAGE
    if (openGameBtn && closeGameBtn && gamePage) {
        openGameBtn.addEventListener('click', () => {
            gamePage.classList.remove('hidden');
        });

        closeGameBtn.addEventListener('click', () => {
            gamePage.classList.add('hidden');
        });
    }

    // DOC OCK PUZZLE MECHANICS
    if (tiles) {
        tiles.forEach(tile => {
            tile.addEventListener('click', () => {
                let rot = parseInt(tile.getAttribute('data-rotation')) || 0;
                rot = (rot + 90) % 360;
                tile.setAttribute('data-rotation', rot);
                tile.style.transform = `rotate(${rot}deg)`;

                evaluateCircuit();
            });
        });
    }

    function evaluateCircuit() {
        // Correct rotational solution state for continuous path
        const solution = [0, 90, 0, 0, 180, 0, 0];
        let pathCorrect = true;
        let activeVoltage = BASE_VOLTS;

        tiles.forEach((tile, idx) => {
            let rot = parseInt(tile.getAttribute('data-rotation'));
            let mod = parseInt(tile.getAttribute('data-modifier')) || 0;

            if (rot !== solution[idx]) {
                pathCorrect = false;
            } else {
                activeVoltage += mod;
            }
        });

        currentVoltsText.textContent = `${activeVoltage}V`;

        if (pathCorrect && activeVoltage === TARGET_VOLTS) {
            document.querySelectorAll('.c-tile').forEach(t => t.classList.add('powered'));
            circuitStatus.textContent = '⚡ Calibration Complete! Voltage Stabilized at 8V! 🚀';
            circuitStatus.style.color = '#10b981';
        } else {
            document.querySelectorAll('.c-tile.pipe').forEach(t => t.classList.remove('powered'));
            document.querySelector('.c-tile.target').classList.remove('powered');
            circuitStatus.textContent = 'Status: Circuit Line Incomplete or Mismatched Voltage';
            circuitStatus.style.color = '#f3f4f6';
        }
    }

    // Reset / Scramble Tile Rotations
    if (resetLabBtn) {
        resetLabBtn.addEventListener('click', () => {
            const rotOptions = [90, 180, 270];
            tiles.forEach(tile => {
                let r = rotOptions[Math.floor(Math.random() * rotOptions.length)];
                tile.setAttribute('data-rotation', r);
                tile.style.transform = `rotate(${r}deg)`;
            });
            evaluateCircuit();
        });
    }

});
