// HTML Elements
const weeklyDownloads = document.getElementById("weekly-downloads")

// Get weekly downloads
fetch("https://api.npmjs.org/downloads/range/2010-01-01:2030-01-01/repox")
    .then((response) => response.json())
    .then((data) => {
        weeklyDownloads.innerText = `${data.downloads} +`;
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
