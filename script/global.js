





function setCurrentTheme(theme) {

    /* document.documentElement.setAttribute("data-theme", theme); // Apply theme to the document

    localStorage.setItem("theme", theme); // Store theme in local storage */
}




function setThemeOnLoad() {
    /* const savedTheme = localStorage.getItem("theme"); */ 

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






/* // On Theme-button press
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
}); */


// Retreive saved theme and apply
window.addEventListener("load", setThemeOnLoad);









// Dark/Light mode toggle switch(s) 
const toggleSwitches = document.querySelectorAll(".theme-toggle-button");




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


// Close dropdown menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1000) {
        closeDropdownMenu();
    }
});
