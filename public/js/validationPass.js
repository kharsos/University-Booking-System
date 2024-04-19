document.getElementById('btn').addEventListener('click', function() {
    const password = document.getElementById('password').value;
    const regexPassword = /^[A-Z a-z 0-9 @ - _ \.]{8,}$/;
    if (regexPassword.test(password)) {
        console.log("Password is secure and strong.");
    } else {
        console.log("Password does not meet the criteria.");
    }
})


document.getElementById("emailAddress").addEventListener("submit", function(event) {
    event.preventDefault()
    var emailInput = document.getElementById("emailAddress");
    const email = emailInput.value;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regexEmail.test(email)) {
        console.log("Email is valid."); 
    } else{
        console.log("Email is invalid.")
    }

})