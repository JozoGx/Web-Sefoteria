document.addEventListener('DOMContentLoaded', () => {
    // Fungsi untuk menangani animasi scroll
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.fade-in');
        const windowHeight = window.innerHeight;

        elements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight) {
                element.classList.add('visible');
            }
        });

        // Periksa apakah elemen attackRight ada sebelum mencoba mengaksesnya
        const attackRight = document.querySelector('.attack-right');
        if (attackRight) {
            const attackRightTop = attackRight.getBoundingClientRect().top;
            if (attackRightTop < windowHeight) {
                attackRight.classList.add('active');
                setTimeout(() => {
                    attackRight.classList.add('pulse');
                }, 1000);
            }
        }
    }

    // Event listener untuk scroll
    window.addEventListener('scroll', handleScrollAnimation);

    // Panggil fungsi saat halaman dimuat
    handleScrollAnimation();

    // Navbar toggle functionality
    const navbar = document.querySelector('.navbar-links');
    const navbarToggle = document.querySelector('.navbar');

    navbarToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            navbar.classList.toggle('active');
        }
    });

    // Close navbar when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navbar.classList.remove('active');
            }
        });
    });

    function adjustCharactersHeight() {
        const charactersSection = document.querySelector('.characters');
        const viewportHeight = window.innerHeight;
        charactersSection.style.height = `${viewportHeight}px`;
    }

    window.addEventListener('load', adjustCharactersHeight);
    window.addEventListener('resize', adjustCharactersHeight);
});
