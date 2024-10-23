function createRain() {
    const rainContainer = document.querySelector('.characters .rain-container');
    if (!rainContainer) {
        console.error('Rain container not found');
        return;
    }
    
    const raindropsCount = 200; // Meningkatkan jumlah tetesan hujan

    for (let i = 0; i < raindropsCount; i++) {
        createRaindrop(rainContainer);
    }
}

function createRaindrop(container) {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    
    const startPositionX = Math.random() * 100;
    const fallDuration = Math.random() * 1 + 1; // Durasi jatuh antara 0.7 dan 1.2 detik
    
    raindrop.style.left = `${startPositionX}%`;
    raindrop.style.top = '-5%'; // Mulai sedikit di atas container
    raindrop.style.animationDuration = `${fallDuration}s`;
    
    container.appendChild(raindrop);
    
    // Hapus tetesan hujan setelah animasi selesai dan buat yang baru
    raindrop.addEventListener('animationend', () => {
        raindrop.remove();
        createRaindrop(container);
    });
}

// Pastikan DOM telah dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', createRain);

// Tambahkan fungsi untuk memulai hujan kembali jika container menjadi visible
function checkVisibility() {
    const rainContainer = document.querySelector('.characters .rain-container');
    if (rainContainer && isElementInViewport(rainContainer)) {
        createRain();
    }
}

// Fungsi helper untuk memeriksa apakah elemen dalam viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Tambahkan event listener untuk scroll
window.addEventListener('scroll', checkVisibility);
