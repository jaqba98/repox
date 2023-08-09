// HTML Elements
const hamburgers = document.getElementsByClassName(`hamburger`);
const navigations = document.getElementsByClassName(`main-nav`);

// Add events
Array.from(hamburgers).forEach(hamburger => {
  hamburger.addEventListener(`click`, () => {
    Array.from(navigations).forEach(nav => {
      nav.classList.toggle(`main-nav-open`);
    });
  });
});
