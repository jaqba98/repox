// HTML Elements
const hamburgers = document.getElementsByClassName("hamburger");
const navigations = document.getElementsByClassName("nav");
const weeklyDownloads = document.getElementById("weekly-downloads")

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

// Get weekly downloads
fetch("https://api.npmjs.org/downloads/point/last-week/repox")
    .then((response) => response.json())
    .then((data) => {
        weeklyDownloads.innerText = `${data.downloads} +`;
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
