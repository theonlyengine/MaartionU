document.addEventListener("DOMContentLoaded", function() {
    // Toggle mobile menu
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
});
