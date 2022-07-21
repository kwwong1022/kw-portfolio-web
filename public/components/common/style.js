// fade in effect
const faders = document.querySelectorAll('.fade-in');
const sliders = document.querySelectorAll('.slide-in');

const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -150px 0px"
};

const appearOnScroll = new IntersectionObserver(
    function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        })
    }, 
    appearOptions);

if (faders) {
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

if (sliders) {
    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });
}