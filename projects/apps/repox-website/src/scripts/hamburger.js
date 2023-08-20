// HTML Element
const hamburgersEl = document.getElementsByClassName(`hamburger`);
const navigationsEl = document.getElementsByClassName(`top-nav`);

// Add events
Array.from(hamburgersEl).forEach(hamburgerEl => {
  hamburgerEl.addEventListener(`click`, () => {
    Array.from(navigationsEl).forEach(navigationEl => {
      navigationEl.classList.toggle(`top-nav-open`);
    });
  });
});
