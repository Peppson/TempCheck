
// Dark/Light mode toggle switch(s) 
const toggleSwitches = document.querySelectorAll(".theme-toggle-button");


//------------ Color Theme ------------//

function windownOnLoad() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme, false);
        return;
    }

    // No theme found, default to "dark"
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
