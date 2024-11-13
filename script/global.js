
// Dark/Light mode toggle switch(s) 
const toggleSwitches = document.querySelectorAll(".theme-toggle-button");
const toggleSlider = document.querySelectorAll(".slider");
const toggleIcon = document.querySelectorAll(".theme-icon");



//------------ Color Theme ------------//

function windownOnLoad() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme, false);
        return;
    }

    setTheme("dark", false);
}

function setTheme(theme, btnAnimation = true) {
    localStorage.setItem("theme", theme);
    
    setColorTheme(theme);
    setThemeButtonState(theme, btnAnimation);
    setThemeIcon(theme, btnAnimation);
}

function setColorTheme(theme) {
    const page = document.querySelector("body");
    console.log("Theme: " + theme);

    if (theme === "light") {
        page.classList.add("light-mode");
    } else {
        page.classList.remove("light-mode");
    }
}

function setThemeButtonState(theme, btnAnimation) {
    const isLightTheme = (theme === "light");

    if (btnAnimation) {
        toggleSlider.forEach(button => {
            button.classList.add("slider-animation");
        });
    }
    
    // Sync both buttons (desktop + mobile header)
    toggleSlider.forEach(slider => { slider.checked = isLightTheme; });
    toggleSwitches.forEach(button => { button.checked = isLightTheme; });
}

function setThemeIcon(theme, btnAnimation) {
    if (btnAnimation) {
        setTimeout(function () {
            changeThemeIcon(theme);
        }, 75);
    } else {
        changeThemeIcon(theme);
    }
}

function changeThemeIcon(theme) {
    for (const icon of toggleIcon) {
        if (theme === "light") {
            icon.innerHTML = `<img src="icons/static/header-icon-sun.svg" alt="|">`;
        } else if (theme === "dark") {
            icon.innerHTML = `<img src="icons/static/header-icon-dark.svg" alt="|">`;
        } else {
            alert("Error! in setThemeIcon()");
        }
    }
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