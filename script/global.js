
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
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const temp = Math.round(weatherData.main.temp);

    infoText.innerHTML = `
    <div class="icon-info">
    <div>  ${weatherData.name}, ${weatherData.sys.country} </div>
    <img src="${iconUrl}" style="width: 160px; height: 160px;">
    <div>${weatherData.weather[0].description}</div></div>
    <div class="temp-info"> ${temp}° </div>`;
}