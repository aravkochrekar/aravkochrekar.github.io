// Wait for the HTML document to completely load
document.addEventListener('DOMContentLoaded', () => {
    
    // Grab key elements
    const contactBtn = document.getElementById('contactBtn');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const interactiveCells = document.querySelectorAll('.grid-cell.interactive');
    const currentVoltageText = document.getElementById('currentVoltage');
    const targetVoltageText = document.getElementById('targetVoltage');
    const gameStatus = document.getElementById('gameStatus');
    const resetCircuitBtn = document.getElementById('resetCircuitBtn');
    const gameContainer = document.querySelector('.game-container');

    const BASE_VOLTAGE = 5;
    let targetVoltage = 7;

    // Contact button click event
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            alert('Thanks for stopping by! Feel free to reach out via email!');
        });
    }

    // Show/Hide "Back to Top" button based on window scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    // Smooth scroll back to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // DOC OCK GAME LOGIC: Cycling Components & Voltage Calculation
    const componentTypes = [
        { type: 'wire', text: '━', modifier: 0 },
        { type: 'boost', text: '+1V', modifier: 1 },
        { type: 'damp', text: '-1V', modifier: -1 }
    ];

    if (interactiveCells) {
        interactiveCells.forEach(cell => {
            cell.addEventListener('click', () => {
                let currentType = cell.getAttribute('data-type');
                
                // Find next component index in the cycle
                let currentIndex = componentTypes.findIndex(c => c.type === currentType);
                let nextIndex = (currentIndex + 1) % componentTypes.length;
                let nextComponent = componentTypes[nextIndex];

                // Update cell attributes and content
                cell.setAttribute('data-type', nextComponent.type);
                cell.textContent = nextComponent.text;

                // Recalculate total voltage
                calculateVoltage();
            });
        });
    }

    function calculateVoltage() {
        let totalVoltage = BASE_VOLTAGE;

        // Sum up modifiers from active cells
        interactiveCells.forEach(cell => {
            let type = cell.getAttribute('data-type');
            if (type === 'boost') totalVoltage += 1;
            if (type === 'damp') totalVoltage -= 1;
        });

        // Update display readout
        currentVoltageText.textContent = `${totalVoltage}V`;

        // Check against Target Voltage
        if (totalVoltage === targetVoltage) {
            gameStatus.textContent = '⚡ Calibration Complete! Voltage Stabilized! 🔬';
            gameStatus.style.color = '#10b981';
            gameContainer.classList.add('calibrated');
        } else {
            gameStatus.textContent = 'Status: Voltage Mismatch — Adjust Components';
            gameStatus.style.color = '#f3f4f6';
            gameContainer.classList.remove('calibrated');
        }
    }

    // Reset Circuit & Target Voltage
    if (resetCircuitBtn) {
        resetCircuitBtn.addEventListener('click', () => {
            // Set random target voltage between 4V and 9V
            targetVoltage = Math.floor(Math.random() * 6) + 4;
            targetVoltageText.textContent = `${targetVoltage}V`;

            // Reset cells to plain wires
            interactiveCells.forEach(cell => {
                cell.setAttribute('data-type', 'wire');
                cell.textContent = '━';
            });

            calculateVoltage();
        });
    }

    // Initial calculation on load
    calculateVoltage();

});
