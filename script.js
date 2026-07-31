// Wait for the DOM content to fully load before attaching event handlers
document.addEventListener('DOMContentLoaded', () => {
    
    // Grab the contact button element
    const contactBtn = document.getElementById('contactBtn');

    // Add click event for the contact button
    contactBtn.addEventListener('click', () => {
        alert('Thanks for stopping by! Feel free to reach out via email at: hello@yourname.com 🚀');
    });

    // Interactive feature: Add sound/animation pop effect when clicking background stickers!
    const stickers = document.querySelectorAll('.sticker');
    
    stickers.forEach(sticker => {
        sticker.addEventListener('click', () => {
            // Quick bounce animation when a sticker is clicked
            sticker.style.transform = 'scale(1.4) rotate(0deg)';
            setTimeout(() => {
                sticker.style.transform = '';
            }, 300);
        });
    });

});
