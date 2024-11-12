
// Dark/Light mode toggle switch(s) 
const toggleSwitches = document.querySelectorAll(".theme-toggle-button");

/* FETCH CURRENT WEATHER API  */
function fetchCurrentWeather({ city, latitude, longitude }) {

    let weatherURL;
    if (city) {
        weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5d701d369d46aa133c404b3d2ec1d506&units=metric`;
    } else if (latitude && longitude) {
        weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5d701d369d46aa133c404b3d2ec1d506&units=metric`;
    }
    /* GET CURRENT WEATHER INFO */
    fetch(weatherURL)
        .then((response) => response.json())
        .then(displayWeatherData)
        .catch((error) => {
            document.getElementById("display-info").innerText = "Error retrieving weather data. Please try again.";
            console.error("Weather Error:", error);
        });
}

/* FETCH FORECAST API */
function fetchForecast({ city, latitude, longitude }) {

    let forecastURL;
    if (city) {
        forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=5d701d369d46aa133c404b3d2ec1d506&units=metric`;
    } else if (latitude && longitude) {
        forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=5d701d369d46aa133c404b3d2ec1d506&units=metric`;
    }

    /* GET FORECAST INFO */
    fetch(forecastURL)
        .then((response) => response.json())
        .then(displayForecast)
        .catch((error) => {
            document.getElementById("forecast-info").innerText = "Error retrieving forecast data. Please try again.";
            console.error("Forecast Error:", error);
        });
}

/* BY USER INPUT */
function WeatherData() {
    const cityInputElement = document.getElementById('city-input');
    const cityInput = cityInputElement.value;

    /* call the two API by user input */
    fetchCurrentWeather({ city: cityInput });
    fetchForecast({ city: cityInput });
    cityInputElement.value = '';
}

/* BY USER POSITION */
function getWeatherAtPosition() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            /* call the two API by longitude and latidude. */
            fetchCurrentWeather({ latitude, longitude });
            fetchForecast({ latitude, longitude });
        }
    );
}

/* RUN WHEN STARTING PROGRAM */
getWeatherAtPosition();

/* PRINTING OUT THE CURRENT WEATHER DATA */
function displayWeatherData(weatherData) {
    const infoText = document.getElementById("display-info");
    const iconCode = weatherData.weather[0].icon;
    const temp = Math.round(weatherData.main.temp);
    const iconPath = getSVGIcon(iconCode);
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });

    infoText.innerHTML = `
    <div class="icon-info">
    <div>${weatherData.name}, ${weatherData.sys.country}</div>
        <div class="today-date">${today}</div>
        <img class="svg-animated" src="${iconPath}" width="250px" height="250px">
        <div>${weatherData.weather[0].description}</div>
    </div>
    <div class="information-box">
        <div class="temp-info">${temp}<span class="degree-icon">°</span></div>
    </div>`;
}

/* PRINTING OUT THE FORECAST DATA */

function displayForecast(data) {
    const today = new Date().toLocaleDateString('en-US');
    const hourlyForecastContainer = document.getElementById("hourly-forecast");
    const dailyForecastContainer = document.getElementById("daily-forecast");
    hourlyForecastContainer.innerHTML = "";
    dailyForecastContainer.innerHTML = "";

    displayHourlyForecast(data, hourlyForecastContainer);
    displayDailyForecast(data, today, dailyForecastContainer);
}

/* DISPLAY HOURLY */
function displayHourlyForecast(data, container) {
    const hourlyForecasts = data.list.slice(0, 5);

    hourlyForecasts.forEach((forecast) => {
        const time = new Date(forecast.dt_txt).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        const temp = Math.round(forecast.main.temp);
        const iconCode = forecast.weather[0].icon;
        const iconPath = getSVGIcon(iconCode);

        const forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card");

        forecastCard.innerHTML = `
            <div class="forecast-day">${time}</div>
            <img class="forecast-icon" src="${iconPath}" alt="Weather Icon">
            <div class="forecast-temp">${temp}°C</div>
        `;

        container.appendChild(forecastCard);
    });
}

/* DISPLAY DAILY FORECAST */
function displayDailyForecast(data, today, container) {
    const dailyForecasts = data.list.filter(entry => {
        const entryDate = new Date(entry.dt_txt).toLocaleDateString('en-US');
        return entry.dt_txt.includes("12:00:00") && entryDate !== today;
    })
    dailyForecasts.forEach((forecast) => {
        const dayOfWeek = new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(forecast.main.temp);
        const iconCode = forecast.weather[0].icon;
        const iconPath = getSVGIcon(iconCode);

        const forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card");

        forecastCard.innerHTML = `
            <div class="forecast-day">${dayOfWeek}</div>
            <img class="forecast-icon" src="${iconPath}" alt="Weather Icon">
            <div class="forecast-temp">${temp}°C</div>
        `;

        container.appendChild(forecastCard);
    });
}

/* SHOW/HIDE HOURLY FORECAST */
function showHourlyForecast() {
    const hourlyForecastContainer = document.getElementById("hourly-forecast");
    const dailyForecastContainer = document.getElementById("daily-forecast");

    hourlyForecastContainer.style.display = "flex";
    dailyForecastContainer.style.display = "none";

    document.getElementById("show-hourly").classList.add("active-button");
    document.getElementById("show-daily").classList.remove("active-button");
}

// /* SHOW/HIDE DAILY FORECASTS */
function showDailyForecast() {
    const hourlyForecastContainer = document.getElementById("hourly-forecast");
    const dailyForecastContainer = document.getElementById("daily-forecast");

    hourlyForecastContainer.style.display = "none";
    dailyForecastContainer.style.display = "flex";

    document.getElementById("show-daily").classList.add("active-button");
    document.getElementById("show-hourly").classList.remove("active-button");
}

/* MATCHING THE ICON CODES WITH SVGs */
function getSVGIcon(iconCode) {
    let iconPath;
    switch (iconCode) {
        case '01d':
            iconPath = 'icons/animated/day.svg';
            break;
        case '01n':
            iconPath = 'icons/animated/night.svg';
            break;
        case '02d':
            iconPath = 'icons/animated/cloudy-day-1.svg';
            break;
        case '02n':
            iconPath = 'icons/animated/cloudy-night-1.svg';
            break;
        case '03d':
            iconPath = 'icons/animated/cloudy-day-2.svg';
            break;
        case '03n':
            iconPath = 'icons/animated/cloudy-night-2.svg';
            break;
        case '04d':
            iconPath = 'icons/animated/cloudy-day-3.svg';
            break;
        case '04n':
            iconPath = 'icons/animated/cloudy-night-3.svg';
            break;
        case '09d':
            iconPath = 'icons/animated/rainy-1.svg';
            break;
        case '09n':
            iconPath = 'icons/animated/rainy-4.svg';
            break;
        case '10d':
            iconPath = 'icons/animated/rainy-2.svg';
            break;
        case '10n':
            iconPath = 'icons/animated/rainy-5.svg';
            break;
        case '11d':
        case '11n':
            iconPath = 'icons/animated/thunder.svg';
            break;
        case '13d':
            iconPath = 'icons/animated/snowy-1.svg';
            break;
        case '13n':
            iconPath = 'icons/animated/snowy-5.svg';
            break;
        case '50d':
        case '50n':
            iconPath = 'icons/animated/cloudy.svg';
            break;
        default:
            iconPath = 'icons/animated/cloudy.svg';
            break;
    }
    return iconPath;
}

/* BOTTOM SECTION */

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
        <button class="search-button-one" onclick="search('one')">
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

// Set theme icons. Params "light" || "dark"
function setThemeIcon(theme) {
    const icons = document.querySelectorAll(".theme-icon");

    setTimeout(function () {

        for (const icon of icons) {
            if (theme === "light") {
                icon.innerHTML = `<img src="icons/static/header-icon-sun.svg" alt="|">`;
            } else if (theme === "dark") {
                icon.innerHTML = `<img src="icons/static/header-icon-dark.svg" alt="|">`;
            } else {
                alert("Error! in setThemeIcon()");
            }
        }
    }, 75);
}

function toggleDropdownMenu() {
    const menu = document.getElementById("dropdown-menu");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}

function closeDropdownMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.style.display = "none";
}


// On Theme-button press
toggleSwitches.forEach((toggleSwitch) => {
    toggleSwitch.addEventListener("change", () => {
        const isLightTheme = toggleSwitch.checked;

        // Sync both buttons
        toggleSwitches.forEach(switchElem => switchElem.checked = isLightTheme);

        if (isLightTheme) {
            setThemeIcon("light");
            console.log("light mode!");
        } else {
            setThemeIcon("dark");
            console.log("dark mode!");
        }
    });
});

// Close dropdown menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1000) {
        closeDropdownMenu();
    }
});
