// Wait for the HTML document to completely load before running code
document.addEventListener('DOMContentLoaded', () => {
    
    // Grab our contact button element from the HTML
    const contactBtn = document.getElementById('contactBtn');

    // Add a click event listener to handle interaction
    contactBtn.addEventListener('click', () => {
        // Show an interactive alert dialog pop-up with a placeholder email
        alert('Thanks for stopping by! Feel free to reach out via email at: hello@yourname.com 🚀');
    });

});
