
function userLoginAnimation(event) {
    event.preventDefault();
    document.getElementById("button-container").classList.toggle("button-loading");
    document.getElementById("submit-button").value = "";
    
    // Wait while showing animation
    setTimeout(function() {
        document.getElementById("userLogin").submit();
    }, 2000);
}