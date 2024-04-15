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
    const password = document.getElementById('password').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    var suffix = /[a-z 0-9 \. - _]@uca.ac.ma/;
    if (!suffix.test(emailAddress)) {
      document.querySelector('#validateEmail').classList.remove('validate');
      document.querySelector('#passwordMatching').classList.add('validate');
      document.querySelector('#validatePassword').classList.add('validate');
      e.preventDefault()
    }
    else if (!regex.test(password)) {
      document.querySelector('#validatePassword').classList.remove('validate');
      document.querySelector('#validateEmail').classList.add('validate');
      document.querySelector('#passwordMatching').classList.add('validate');
      e.preventDefault()
      }
      else if (password != confirmPassword) {
        document.querySelector('#passwordMatching').classList.remove('validate');
        document.querySelector('#validatePassword').classList.add('validate');
        document.querySelector('#validateEmail').classList.add('validate');
        e.preventDefault()
    } else {
      document.querySelector('#passwordMatching').classList.add('validate');
      document.querySelector('#validatePassword').classList.add('validate');
      document.querySelector('#validateEmail').classList.add('validate');
    }
})
 

