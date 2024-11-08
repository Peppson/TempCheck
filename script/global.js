
// Dark/Light mode toggle switch
const toggleSwitch = document.getElementById('toggleSwitch');


function WeatherData() {
    const cityInput = document.getElementById('city-input').value;

    if (cityInput == '') {
        document.getElementById("display-info").innerText = "Please enter a city name.";
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=5d701d369d46aa133c404b3d2ec1d506&units=metric`)
        .then((response) => response.json())
        .then(displayWeatherData)
        .catch((error) => {
            document.getElementById("display-info").innerText = "Enter a real city, dummy";
            console.error("Error:", error);
        });
}

function getWeatherAtPosition() {

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5d701d369d46aa133c404b3d2ec1d506&units=metric`)
                .then((response) => response.json())
                .then(displayWeatherData)
                .catch((error) => {
                    document.getElementById("display-info").innerText = "Could not retrieve weather data for your location.";
                    console.error("Error:", error);
                });
        }
    );
}

getWeatherAtPosition(); // DEN BA KÖR

function displayWeatherData(weatherData) {
    const infoText = document.getElementById("display-info");
    const iconCode = weatherData.weather[0].icon;
    const temp = Math.round(weatherData.main.temp);
    const iconPath = getSVGIcon(iconCode);
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    infoText.innerHTML = `
    <div class="icon-info">
    <div> ${today}</div>
    <img class="svg-animated" src="${iconPath}" width="250px" height="250px">
    <div> ${weatherData.weather[0].description}</div>
    </div>
    <div class="information-box">
    <div>${weatherData.name}, ${weatherData.sys.country}</div>
    <div class="temp-info">${temp}°</div>
    </div>`;
}

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
    setTimeout(function() {
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

function onUserLogin(event) {
    event.preventDefault();
    document.getElementById("button-container").classList.toggle("button-loading");
    document.getElementById("submit-button").value = "";
    
    // Wait while showing animation
    setTimeout(function() {
        document.getElementById("userLogin").submit();
    }, 2000);

    // Call Api fetch here?
}


toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        console.log('Light mode!');
    } else {
        console.log('Dark mode!');
    }
});
