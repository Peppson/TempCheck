
function onUserLogin(event) {
    event.preventDefault();
    document.getElementById("button-container").classList.toggle("button-loading");
    document.getElementById("submit-button").value = "";
    
    // Wait 2s before submitting form with animation
    setTimeout(function() {
        document.getElementById("userLogin").submit();
    }, 2000);

    // Call Api fetch here?
}
