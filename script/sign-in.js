
function onUserLogin(event) {
    event.preventDefault();
    document.getElementById("button-container").classList.toggle("button-loading");
    document.getElementById("submit-button").value = "";
    
    // Animation
    setTimeout(function() {
        document.getElementById("userLogin").submit();
    }, 2000);
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

// Color input fields when not empty
document.getElementById("username").addEventListener("input", function() {
    colorInputField(this);
});

document.getElementById("password").addEventListener("input", function() {
    colorInputField(this);
});
