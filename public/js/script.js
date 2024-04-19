
//sidebar
const hamBurger = document.querySelector(".toggle-btn");
hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

const express = require('express');
const app = express();
app.use(express.json())
// Route de page principale
// app.get('/student', (req, res) => {
//   res.render('student');
// });
// //botton de réservation
app.get('/student', (req, res) => {
  res.redirect('/reservation');
});



// document.getElementById("reservationBtn").addEventListener("click", function() {
//   window.location.href = "localhost:8080/reservation";
// });


// const form = document.getElementById('bookingForm');
//     form.addEventListener('submit', function(event) {
//       if (!form.checkValidity()) {
//         event.preventDefault();
//         event.stopPropagation();
//       }
//       form.classList.add('was-validated');
//     });