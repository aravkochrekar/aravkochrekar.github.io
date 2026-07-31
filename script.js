// Wait for the HTML document to completely load
document.addEventListener('DOMContentLoaded', () => {
    
    // Grab key elements from the HTML
    const contactBtn = document.getElementById('contactBtn');
    const scrollContainer = document.getElementById('scrollContainer');
    const backToTopBtn = document.getElementById('backToTopBtn');

    // Contact button click event
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            alert('Thanks for stopping by! Feel free to reach out via email!');
        });
    }

    // Show/Hide "Back to Top" button based on scroll position inside the box
    scrollContainer.addEventListener('scroll', () => {
        // Show button if user scrolls down more than 100px
        if (scrollContainer.scrollTop > 100) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    // Smooth scroll back to top when clicked
    backToTopBtn.addEventListener('click', () => {
        scrollContainer.scrollTo({
            top: 0,
            behavior: 'smooth' // Moderate, smooth scrolling speed back to top
        });
    });

});
