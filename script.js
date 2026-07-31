// Wait for the HTML document to completely load
document.addEventListener('DOMContentLoaded', () => {
    
    // Grab key elements from the HTML
    const contactBtn = document.getElementById('contactBtn');
    const backToTopBtn = document.getElementById('backToTopBtn');

    // Contact button click event
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            alert('Thanks for stopping by! Feel free to reach out via email!');
        });
    }

    // Show/Hide "Back to Top" button based on window scroll position
    window.addEventListener('scroll', () => {
        // Show button if user scrolls down more than 150px on the browser page
        if (window.scrollY > 150) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    // Smooth brisk scroll back to the top of the browser page when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
