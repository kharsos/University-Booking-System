const express = require('express');
const router = express.Router()
const verify =require('../middleware/authorization')

const {
    dashbord,
    reason,
    rejected,
    approve,
    approved,
    booking_history,
    booking_list
} =require('../controllers/bookingController')

router.get('/dashbord/:userid',verify,dashbord)


router.post('/dashbord/:userid/reject/:bookingid',verify,rejected)

router.post('/dashbord/:userid/approve/:bookingid',verify,approve)

router.get('/approve/:userid/:bookingid',verify,approved)
router.post('/approve/:userid/:bookingid',verify,approved)

router.post("/reject/:userId/:bookingid",verify,reason)

router.get('/dashbord/:userid/history',verify,booking_history)

router.get('/dashbord/:userid/bookings',verify,booking_list)

module.exports=router