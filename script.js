// Wait for the DOM/HTML to fully load before running our script
document.addEventListener('DOMContentLoaded', () => {
    
    // Grab the button element from our HTML using its ID
    const colorBtn = document.getElementById('colorBtn');

    // List of fun colors to cycle through when clicked
    const colors = ['#ff7675', '#55efc4', '#ffeaa7', '#fab1a0', '#74b9ff'];

    // Add a 'click' event listener to the button
    colorBtn.addEventListener('click', () => {
        // Pick a random color from our array
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Change the background color of the main body
        document.body.style.background = randomColor;
    });

});
