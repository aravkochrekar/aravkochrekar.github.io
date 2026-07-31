// Wait for the HTML document to completely load
document.addEventListener('DOMContentLoaded', () => {
    
    // Grab key elements from the DOM
    const contactBtn = document.getElementById('contactBtn');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const openGameBtn = document.getElementById('openGameBtn');
    const closeGameBtn = document.getElementById('closeGameBtn');
    const gamePage = document.getElementById('gamePage');
    
    const palettePieces = document.querySelectorAll('.palette-piece');
    const dropSlots = document.querySelectorAll('.grid-slot.drop-target');
    const currentVoltsText = document.getElementById('currentVolts');
    const circuitStatus = document.getElementById('circuitStatus');
    const resetLabBtn = document.getElementById('resetLabBtn');

    const BASE_VOLTS = 5;
    const TARGET_VOLTS = 8;
    let draggedPieceData = null;

    // Contact button click listener
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            alert('Thanks for stopping by! Feel free to reach out via email!');
        });
    }

    // Scroll listener for floating Back-To-Top button
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

    // Open/Close Dedicated Game Page Overlay
    if (openGameBtn && closeGameBtn && gamePage) {
        openGameBtn.addEventListener('click', () => {
            gamePage.classList.remove('hidden');
        });

        closeGameBtn.addEventListener('click', () => {
            gamePage.classList.add('hidden');
        });
    }

    // HTML5 DRAG & DROP LOGIC
    palettePieces.forEach(piece => {
        piece.addEventListener('dragstart', (e) => {
            draggedPieceData = {
                shape: piece.getAttribute('data-shape'),
                modifier: parseInt(piece.getAttribute('data-modifier')),
                icon: piece.querySelector('.icon').textContent,
                label: piece.querySelector('.piece-label').textContent
            };
            e.dataTransfer.setData('text/plain', ''); // Required for Firefox drag support
        });
    });

    dropSlots.forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allows dropping
            slot.classList.add('hovered');
        });

        slot.addEventListener('dragleave', () => {
            slot.classList.remove('hovered');
        });

        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.classList.remove('hovered');

            if (draggedPieceData) {
                // Remove existing child if slot is occupied
                slot.innerHTML = '';

                // Create placed piece element
                const newPiece = document.createElement('div');
                newPiece.className = 'placed-piece';
                newPiece.setAttribute('data-shape', draggedPieceData.shape);
                newPiece.setAttribute('data-modifier', draggedPieceData.modifier);
                newPiece.innerHTML = `
                    <span class="icon">${draggedPieceData.icon}</span>
                    <span class="piece-label">${draggedPieceData.label}</span>
                `;

                slot.appendChild(newPiece);

                // Re-evaluate electricity network flow
                evaluatePowerFlow();
            }
        });
    });

    // BREADTH-FIRST POWER FLOW & VOLTAGE CALCULATION
    function evaluatePowerFlow() {
        // Reset electricity visual states on all grid slots
        dropSlots.forEach(slot => slot.classList.remove('electric-active'));

        // Power flow connections starting at PWR (Row 0, Col 0) -> right to (0,1)
        let currentVoltage = BASE_VOLTS;
        let pwrConnected = true;

        // Slot 1: (Row 0, Col 1)
        const slot01 = document.querySelector('.grid-slot[data-row="0"][data-col="1"]');
        const piece01 = slot01 ? slot01.querySelector('.placed-piece') : null;

        if (piece01 && (piece01.getAttribute('data-shape') === 'horizontal' || piece01.getAttribute('data-shape') === 'corner-rb')) {
            slot01.classList.add('electric-active');
            currentVoltage += parseInt(piece01.getAttribute('data-modifier'));

            // Slot 2: (Row 0, Col 2)
            const slot02 = document.querySelector('.grid-slot[data-row="0"][data-col="2"]');
            const piece02 = slot02 ? slot02.querySelector('.placed-piece') : null;

            if (piece02 && piece02.getAttribute('data-shape') === 'corner-rt') {
                slot02.classList.add('electric-active');
                currentVoltage += parseInt(piece02.getAttribute('data-modifier'));

                // Slot 3: (Row 1, Col 2)
                const slot12 = document.querySelector('.grid-slot[data-row="1"][data-col="2"]');
                const piece12 = slot12 ? slot12.querySelector('.placed-piece') : null;

                if (piece12 && piece12.getAttribute('data-shape') === 'vertical') {
                    slot12.classList.add('electric-active');
                    currentVoltage += parseInt(piece12.getAttribute('data-modifier'));

                    // Slot 4: (Row 2, Col 2) - Target Connected!
                    const targetSlot = document.querySelector('.grid-slot.target');
                    if (targetSlot) {
                        targetSlot.classList.add('electric-active');
                    }

                    // Check win condition
                    if (currentVoltage === TARGET_VOLTS) {
                        circuitStatus.textContent = '⚡ CALIBRATION SUCCESS! Continuous Circuit Powered & Stabilized at 8V! 🚀';
                        circuitStatus.style.color = '#10b981';
                    } else {
                        circuitStatus.textContent = `⚡ Line Connected! Voltage Mismatch (${currentVoltage}V / 8V Target)`;
                        circuitStatus.style.color = '#38bdf8';
                    }
                }
            }
        } else {
            circuitStatus.textContent = 'Drag pieces onto the board to build a powered connection from PWR to OUT!';
            circuitStatus.style.color = '#f3f4f6';
        }

        currentVoltsText.textContent = `${currentVoltage}V`;
    }

    // Reset Lab Board
    if (resetLabBtn) {
        resetLabBtn.addEventListener('click', () => {
            dropSlots.forEach(slot => {
                slot.innerHTML = '';
                slot.classList.remove('electric-active');
            });
            currentVoltsText.textContent = `${BASE_VOLTS}V`;
            circuitStatus.textContent = 'Board cleared. Drag pieces onto the board to build your circuit!';
            circuitStatus.style.color = '#f3f4f6';
        });
    }

});
