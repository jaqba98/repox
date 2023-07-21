const hamburger = document.getElementById("hamburger");
const menu = document.getElementsByClassName("menu");

hamburger.addEventListener("click", () => {
    for (let i = 0; i < menu.length; i++) {
        menu[i].classList.toggle("menu-open");
    }
});
