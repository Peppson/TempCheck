
// Dark/Light mode toggle switch(s) 
const toggleSwitches = document.querySelectorAll(".theme-toggle-button");


//------------ Color Theme ------------//

function windownOnLoad() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme, false);
        return;
    }

    setTheme("dark");
}

function setTheme(theme, writeToStorage = true) {
    if (writeToStorage) {
        localStorage.setItem("theme", theme);
    }
    
    setColorTheme(theme);
    setThemeButtonState(theme);
    setThemeIcon(theme);
}

function setColorTheme(theme) {
    const page = document.querySelector("body");
    console.log("Theme: " + theme);


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

    if (theme === "light") {
        page.classList.add("light-mode");
    } else {
        page.classList.remove("light-mode");
    }
}

function setThemeButtonState(theme) {
    const isLightTheme = (theme === "light");
    
    // Sync both buttons (desktop + mobile header)
    toggleSwitches.forEach(button => button.checked = isLightTheme);

}

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


//------------ Dropdown menu ------------//

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


//------------ Event Listeners ------------//

// On window load
window.addEventListener("load", windownOnLoad);

// On theme button press
toggleSwitches.forEach((toggleSwitch) => {
    toggleSwitch.addEventListener("change", () => {
        const isLightTheme = toggleSwitch.checked;

        // Sync both buttons
        toggleSwitches.forEach(button => button.checked = isLightTheme);

        let theme = isLightTheme ? "light" : "dark"; 
        setTheme(theme);
    });
});

// Close dropdown menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1000) {
        closeDropdownMenu();
    }
});
