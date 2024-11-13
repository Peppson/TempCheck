import getSVGIcon from './global.js'

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
            console.error("Error:", error);
        });
}


function weatherApiHelper(win){
    const valueInput = document.getElementsByClassName('input-search')[0].value;
    weatherApi(valueInput, win)

}

function search(win){
    const onclickSearch = document.getElementsByClassName(`win-${win}`)[0];

    onclickSearch.innerHTML = `
    <div class="input-align">
        <input class="input-search" type="text" placeholder="Location">
        <button class="search-style" onclick="weatherApiHelper('${win}')">Search</button>
    </div>
    `
}

function displayVs(weatherData, win) {
    const infoTextCollection = document.getElementsByClassName(`win-${win}`)[0];
    const iconCode = weatherData.weather[0].icon;
    const temp = Math.round(weatherData.main.temp);
    const feelsComp = Math.round(weatherData.main.feels_like);
    const minComp = Math.round(weatherData.main.temp_min);
    const maxComp = Math.round(weatherData.main.temp_max);
    const humiComp = Math.round(weatherData.main.humidity);
    const windComp = Math.round(weatherData.wind.speed);
    const iconPath = getSVGIcon(iconCode);

    const tempDiv = document.getElementsByClassName(`temp-comp-${win}`)[0];
    const feelsDiv = document.getElementsByClassName(`feels-comp-${win}`)[0];
    const minDiv = document.getElementsByClassName(`min-comp-${win}`)[0];
    const maxDiv = document.getElementsByClassName(`max-comp-${win}`)[0];
    const humDiv = document.getElementsByClassName(`humidity-comp-${win}`)[0];
    const windDiv = document.getElementsByClassName(`wind-comp-${win}`)[0];


    infoTextCollection.classList.add(`move-${win}`);
    setTimeout(function () {
        infoTextCollection.innerHTML = `
        <button class="search-button-${win}" onclick="search('${win}')">
            <div class="vs-info">
            <div class=city-info>${weatherData.name}, ${weatherData.sys.country}</div>
            <img class="icon-img" src="${iconPath}">
            </div>
            <div class="vs-temp-info">${temp}°C</div>
        </button>
            `;
    }, 1000);
    infoTextCollection.addEventListener('animationend', function handleAnimationEnd() {
        infoTextCollection.classList.remove(`move-${win}`);

        tempDiv.innerHTML = temp;
        feelsDiv.innerHTML = feelsComp;
        minDiv.innerHTML = minComp;
        maxDiv.innerHTML = maxComp;
        humDiv.innerHTML = humiComp;
        windDiv.innerHTML = windComp;


    })
}