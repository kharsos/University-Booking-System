document.getElementById('select').addEventListener('change', function() {
    var role = this.value;
    if (role === 'student') {
      document.getElementById('student').classList.remove('hidden');
      document.getElementById('staff').classList.add('hidden');
    } else if (role === 'staff') {
      document.getElementById('student').classList.add('hidden');
      document.getElementById('staff').classList.remove('hidden');
    }
  });


document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault()
    const password = document.getElementById('password').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    var suffix = /[a-z 0-9 \. - _]@uca.ac.ma/;
    if (!suffix.test(emailAddress)) {
      // alert("email must end with '@uca.ac.ma'!");
      document.querySelector('#validateEmail').classList.remove('validateEmail');
    }
    else if (regex.test(password)) {
      document.querySelector('#validatePassword').classList.remove('validatePassword');
      // console.log("Password is secure and strong.");
        if (password != confirmPassword) {
          // alert("Passwords do not match!");
          document.querySelector('#passwordMatching').classList.remove('passwordMatching');
      }
      return true;
    } else {
        console.log("Password does not meet the criteria.");
    }
})
 

