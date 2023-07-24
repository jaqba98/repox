// HTML Elements
const hamburgers = document.getElementsByClassName("hamburger");
const navigations = document.getElementsByClassName("nav");

// Functions
const toggleNavigation = () => {
    Array.from(navigations).forEach(nav => {
        nav.classList.toggle("menu-open");
    });
};

// Add events
Array.from(hamburgers).forEach(hamburger => {
    hamburger.addEventListener("click", () => toggleNavigation());
});
