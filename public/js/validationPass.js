document.getElementById('btn').addEventListener('submit',(event) =>{


});

function submit(event){
            const password = document.getElementById('password').value;
    const regexPassword = /^[A-Z a-z 0-9 @ - _ \.]{8,}$/;
    if (password=='') {
        event.preventDefault()
        document.getElementById('passerr').innerHTML="Password required !";
    } 
    else if(!regexPassword.test(password)){
        event.preventDefault()
        document.getElementById('passerr').innerHTML="Password does not meet the criteria.";
    }
    else{
        document.getElementById('passerr').innerHTML="";
    }




    var emailInput = document.getElementById("emailAddress");
    const email = emailInput.value;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email=='') {
        event.preventDefault()
        document.getElementById('emailerr').innerHTML="email required !";
    } 
    else if (!regexEmail.test(email)){
        event.preventDefault()
        document.getElementById('emailerr').innerHTML="Email is invalid."
}
else{
    document.getElementById('emailerr').innerHTML=""; 
}
}

document.getElementById('btn').addEventListener('click',submit)