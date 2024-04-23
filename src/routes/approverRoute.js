const express = require('express');
const router = express.Router()
const {verifyTokenAccess} =require('../middleware/authorization')

const {
    dashbord,
    reason,
    rejected,
    approve,
    approved,
    booking_history,
    booking_list
} =require('../controllers/bookingController')

router.get('/dashbord',verifyTokenAccess,dashbord)


router.post('/dashbord/reject/:bookingid',verifyTokenAccess,rejected)

router.post('/dashbord/approve/:bookingid',verifyTokenAccess,approve)

router.get('/approve/:bookingid',verifyTokenAccess,approved)
router.post('/approve/:bookingid',verifyTokenAccess,approved)

router.post("/reject/:bookingid",verifyTokenAccess,reason)

router.get('/dashbord/history',verifyTokenAccess,booking_history)

router.get('/dashbord/bookings',verifyTokenAccess,booking_list)

module.exports=router