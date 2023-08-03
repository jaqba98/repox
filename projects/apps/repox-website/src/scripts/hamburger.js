// HTML Elements
const hamburgers = document.getElementsByClassName("hamburger");
const navigations = document.getElementsByClassName("main-nav");

// Functions
const toggleNavigation = () => {
  Array.from(navigations).forEach(nav => {
    nav.classList.toggle("main-nav-open");
  });
};

// Add events
Array.from(hamburgers).forEach(hamburger => {
  hamburger.addEventListener("click", () => { toggleNavigation(); });
});
