
function onUserLogin(event) {
    event.preventDefault();
    document.getElementById("button-container").classList.toggle("button-loading");
    document.getElementById("submit-button").value = "";
    
    // Wait 2s before submitting form with animation
    setTimeout(function() {
        document.getElementById("userLogin").submit();
    }, 2000);

    
    // Maybe save user name and display it like "Welcome back, Arif" on the other pages?
    // Call Api fetch here?
}

function colorInputField(field) {
    if (field.value.trim() !== "") {
        field.classList.add("input-filled");
        field.classList.remove("input-default");
    } else {
        field.classList.remove("input-filled");
        field.classList.add("input-default");
    }
}

// Color input fields if not empty
document.getElementById("username").addEventListener("input", function() {
    colorInputField(this);
});

document.getElementById("password").addEventListener("input", function() {
    colorInputField(this);
});
