// HTML Elements
const weeklyDownloads = document.getElementById("weekly-downloads");
const totalDownloads = document.getElementById("total-downloads");

// Get weekly downloads
fetch("https://api.npmjs.org/downloads/point/last-week/repox")
  .then(async (response) => await response.json())
  .then((data) => {
    weeklyDownloads.innerText = `${data.downloads} +`;
  })
  .catch((error) => {
    console.error(`Error fetching data: ${error}`);
  });

// Get total downloads
fetch("https://api.npmjs.org/downloads/range/2010-01-01:2030-01-01/repox")
  .then(async (response) => await response.json())
  .then((data) => {
    const total = data.downloads
      .map(item => item.downloads)
      .filter(item => item !== 0)
      .reduce((acc, curr) => acc + curr, 0);
    totalDownloads.innerText = `${total} +`;
  })
  .catch((error) => {
    console.error(`Error fetching data: ${error}`);
  });
