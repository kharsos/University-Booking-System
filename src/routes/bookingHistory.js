const express = require('express');
const app = express()
app.use(express.json())
const Bookings=require('./booking')
// const Booking=require('../models/Bookings');
const router = express.Router()

    
// Route pour afficher l'historique des réservations
router.get('/bookings', async(req, res) => {
  try {
    // Récupérer toutes les réservations depuis la base de données
    const booking = await Bookings.findAll();
    res.render('bookingHistory', { booking });


  } catch (error) {
    console.log(error);
  }
});

