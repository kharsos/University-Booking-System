const express = require('express');
 const router = express.Router()
 const {verifyTokenAccess,authorize}=require('../middleware/authorization')
const {
    getBookings,createBooking,bookingHistory} = require('../controllers/bookingsController')
router.get('/bookings',verifyTokenAccess,authorize(['student','staff']),getBookings)
router.post('/booking',verifyTokenAccess,authorize(['student','staff']),createBooking)

// Route pour afficher l'historique des réservations
router.get('/bookingHistory',verifyTokenAccess,authorize(['student','staff']),bookingHistory )

module.exports = router;