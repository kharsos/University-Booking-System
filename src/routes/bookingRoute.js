// const {Op}=require('sequelize')
const express = require('express');
const app = express()
app.use(express.json())
// const Booking=require('../models/Bookings');
// const User=require('../models/Users');
// const Halls = require('../models/Hall');
// const bookings = require('../models/Bookings');
 const router = express.Router()
// const {Id} = require('../middleware/authorization')
// const bookingResources=require('../models/booking_resource')
// const Resource=require('../models/Resource');
const {
    getBookings,createBooking,bookingHistory} = require('../controllers/bookingsController')
router.get('/bookings',getBookings)
router.post('/bookings',createBooking)

// Route pour afficher l'historique des réservations
router.get('/bookingHistory',bookingHistory )

module.exports = router;