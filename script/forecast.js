import getSVGIcon from './global.js'

/* LOAD SESSION STORAGE */

function LoadSessionStorage() {
    const latitude = sessionStorage.getItem('latitude');
    const longitude = sessionStorage.getItem('longitude');

    fetchCurrentWeather({ latitude, longitude });
    fetchForecast({ latitude, longitude });
}

LoadSessionStorage();

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
        .then(data => {
            displayWeatherData(data);
            displayCurrentInfo(data);
        })
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

/* PRINT OUT DAILY INFORMATION DATA */
function displayCurrentInfo(weatherData) {
    const container = document.getElementById('current-info');

    container.innerHTML = '';
    const rain = weatherData.rain ? weatherData.rain['1h'] : 0;

    /* CONVERT UNIX TIME FOR SUNRISE AND SUNSET TO LOCAL TIMES RATHER THAN UTC */
    const sunriseUTC = new Date(weatherData.sys.sunrise * 1000);
    const sunsetUTC = new Date(weatherData.sys.sunset * 1000);
    const timezone = weatherData.timezone;

    const localSunrise = new Date(sunriseUTC.getTime() + timezone * 1000);
    const localSunset = new Date(sunsetUTC.getTime() + timezone * 1000);
    const sunrise = localSunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = localSunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const currentweatherDataContainer = document.createElement("div");
    currentweatherDataContainer.classList.add("current-info-data");

    currentweatherDataContainer.innerHTML = `
            <div><span class="info-title">Min temp:</span> ${Math.round(weatherData.main.temp_min)}°C</div>
            <div><span class="info-title">Max temp:</span> ${Math.round(weatherData.main.temp_max)}°C</div>
            <div><span class="info-title">Humidity:</span> ${weatherData.main.humidity}%</div>
            <div><span class="info-title">Wind speed:</span> ${weatherData.wind.speed} m/s</div>
            <div><span class="info-title">Rain:</span> ${rain} mm</div>
            <div><span class="info-title">Sunrise:</span> ${sunrise}</div>
            <div><span class="info-title">Sunset:</span> ${sunset}</div>
        `;
    container.appendChild(currentweatherDataContainer);
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
function displayDailyForecast(weatherData, today, container) {
    const dailyForecasts = weatherData.list.filter(entry => {
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
    const currentInfo = document.getElementById("current-info");

    hourlyForecastContainer.style.display = "flex";
    dailyForecastContainer.style.display = "none";
    currentInfo.style.display = "none";

    document.getElementById("show-hourly").classList.add("active-button");
    document.getElementById("show-daily").classList.remove("active-button");
    document.getElementById("show-info").classList.remove("active-button");
}

/* SHOW/HIDE DAILY FORECASTS */
function showDailyForecast() {
    const hourlyForecastContainer = document.getElementById("hourly-forecast");
    const dailyForecastContainer = document.getElementById("daily-forecast");
    const currentInfo = document.getElementById("current-info");

    hourlyForecastContainer.style.display = "none";
    dailyForecastContainer.style.display = "flex";
    currentInfo.style.display = "none";

    document.getElementById("show-daily").classList.add("active-button");
    document.getElementById("show-hourly").classList.remove("active-button");
    document.getElementById("show-info").classList.remove("active-button");
}

/* SHOW THE INFORMATION OF TODAY */
function showTodaysInfo() {
    const hourlyForecastContainer = document.getElementById("hourly-forecast");
    const dailyForecastContainer = document.getElementById("daily-forecast");
    const currentInfoContainer = document.getElementById("current-info");

    hourlyForecastContainer.style.display = "none";
    dailyForecastContainer.style.display = "none";
    currentInfoContainer.style.display = "flex";

    document.getElementById("show-daily").classList.remove("active-button");
    document.getElementById("show-hourly").classList.remove("active-button");
    document.getElementById("show-info").classList.add("active-button");
}

