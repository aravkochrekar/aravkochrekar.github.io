// Wait for the HTML document to completely load
document.addEventListener('DOMContentLoaded', () => {
    
    // Grab contact button
    const contactBtn = document.getElementById('contactBtn');

    // Button click interaction
    contactBtn.addEventListener('click', () => {
        alert('Thanks for stopping by! Feel free to reach out via email! 🚀');
    });

    // Sticker bounce interaction on click
    const stickers = document.querySelectorAll('.sticker');
    
    stickers.forEach(sticker => {
        sticker.addEventListener('click', () => {
            sticker.style.transform = 'scale(1.3) rotate(0deg)';
            setTimeout(() => {
                sticker.style.transform = '';
            }, 250);
        });
    });

});
