
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

function displayWeatherData(weatherData) {
    const infoText = document.getElementById("display-info");
    const iconCode = weatherData.weather[0].icon;
    const temp = Math.round(weatherData.main.temp);
    const iconPath = getSVGIcon(iconCode);

    infoText.innerHTML = `
    <div class="icon-info">
        <div>${weatherData.name}, ${weatherData.sys.country}</div>
        <img src="${iconPath}" width="250px" height="250px">
    </div>
    <div class="temp-info">${temp}°C</div>`;
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