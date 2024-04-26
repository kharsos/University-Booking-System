const express = require('express');
 const router = express.Router()
const {
    getBookings,createBooking,bookingHistory} = require('../controllers/bookingsController')
router.get('/bookings',getBookings)
router.post('/booking',createBooking)

// Route pour afficher l'historique des réservations
router.get('/bookingHistory',bookingHistory )

module.exports = router;