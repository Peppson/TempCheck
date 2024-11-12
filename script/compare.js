
function toggleDropdown(dropdownContentSelector) {
    const dropdownContent = document.querySelector(dropdownContentSelector);
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';

    // Close dropdown
    window.onclick = function (event) {
        if (!event.target.matches('.dropdown-btn')) {
            const dropdowns = document.querySelectorAll('.swe, .rwa');
            dropdowns.forEach(function (dropdown) {
                if (dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                }
            });
        }
    };
}

function weatherApi(city, win) {
    let cityInput = city
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=5d701d369d46aa133c404b3d2ec1d506&units=metric`)
        .then((response) => response.json())
        .then((data) => { displayVs(data, win) })

        .catch((error) => {
            document.getElementById("display-info").innerText = "Enter a real city, dummy";
            console.error("Error:", error);
        });
    console.log(city)
}

function displayVs(weatherData, win) {
    const infoTextCollection = document.getElementsByClassName(`win-${win}`)[0];
    const compareWindow = document.getElementsByClassName(`comp-info-${win}`)[0];
    const iconCode = weatherData.weather[0].icon;
    const temp = Math.round(weatherData.main.temp);
    const feelsComp = Math.round(weatherData.main.feels_like);
    const minComp = Math.round(weatherData.main.temp_min);
    const maxComp = Math.round(weatherData.main.temp_max);
    const humiComp = Math.round(weatherData.main.humidity);
    const windComp = Math.round(weatherData.wind.speed);
    const iconPath = getSVGIcon(iconCode);

    infoTextCollection.classList.add(`move-${win}`);
    setTimeout(function () {
        infoTextCollection.innerHTML = `
        <div class="vs-info">userLoginAnimation
        <div class=city-info>${weatherData.name}, ${weatherData.sys.country}</div>
        <img class="icon-img" src="${iconPath}">
        </div>
        <div class="vs-temp-info">${temp}°C</div>`;
    }, 1000);
    infoTextCollection.addEventListener('animationend', function handleAnimationEnd() {
        infoTextCollection.classList.remove(`move-${win}`);

        compareWindow.innerHTML = `
        <div class="temp-comp">${temp}</div>
        <div class="feels-comp">${feelsComp}</div>
        <div class="min-comp">${minComp}</div>
        <div class="max-comp">${maxComp}</div>
        <div class="humidity-comp">${humiComp}</div>
        <div class="wind-comp">${windComp}</div>
        `

    })
}
