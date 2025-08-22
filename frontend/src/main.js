const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

const marqueeTrack = document.querySelector(".marquee-track");
let currentX = 0;

const duplicateContent = () => {
    const content = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML = content + content + content;
};

duplicateContent();

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;

    const speed = delta * 2;

    currentX -= speed;
    marqueeTrack.style.transform = `translateX(${currentX}px)`;

    if (currentX < -marqueeTrack.offsetWidth / 2) {
        currentX = 0;
    }
    else if (currentX > 0) {
        currentX = -marqueeTrack.offsetWidth / 2;
    }

    lastScrollY = currentScrollY
})

document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target;

                    if (target.classList.contains("hero-shape")) {
                        target.classList.add("slide-in-left");
                        setTimeout(() => {
                            const heroImage = document.querySelector(".hero-image img");
                            if (heroImage) {
                                heroImage.classList.add("slide-in-top");
                            }
                        }, 1000);
                        observer.unobserve(target);
                    }

                    if (target.classList.contains("zoom-in")) {
                        target.classList.add("zoomed-in");
                        observer.unobserve(target);
                    }
                }
            });
        },
        {
            threshold: 0.1,
        }
    );

    const heroShape = document.querySelector(".hero-shape");
    if (heroShape) {
        observer.observe(heroShape);
    }

    const zoomElements = document.querySelectorAll(".zoom-in");
    zoomElements.forEach(element => {
        observer.observe(element);
    });
});