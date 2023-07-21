const hamburger = document.getElementsByClassName("hamburger");
const nav = document.getElementsByClassName("nav");

hamburger[0].addEventListener("click", () => {
    nav[0].classList.toggle("menu-open");
});
