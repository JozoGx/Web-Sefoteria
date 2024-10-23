function createLightning() {
    const lightning = document.querySelector('.characters .lightning');
    
    function flash() {
        lightning.style.opacity = 1;
        
        setTimeout(() => {
            lightning.style.opacity = 0;
        }, 50);
        
        setTimeout(() => {
            lightning.style.opacity = 0.5;
        }, 75);
        
        setTimeout(() => {
            lightning.style.opacity = 0;
        }, 100);
    }

    function scheduleLightning() {
        const delay = Math.random() * 1000 + 2000; // Random delay between 2-3 seconds
        setTimeout(() => {
            flash();
            scheduleLightning();
        }, delay);
    }

    scheduleLightning();
}

document.addEventListener('DOMContentLoaded', createLightning);
