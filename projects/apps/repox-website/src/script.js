const hamburger = document.getElementsByClassName("hamburger");
const menu = document.getElementsByClassName("menu");

hamburger[0].addEventListener("click", () => {
    menu[0].classList.toggle("menu-open");
});
