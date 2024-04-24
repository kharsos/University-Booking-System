const express = require('express');
const router = express.Router()
const {verifyTokenAccess,authorize} =require('../middleware/authorization')

const {
    dashbord,
    reason,
    rejected,
    approve,
    approved,
    booking_history,
    booking_list
} =require('../controllers/bookingController')

router.get('/dashbord',verifyTokenAccess,authorize(['approver']),dashbord)


router.post('/dashbord/reject/:bookingid',verifyTokenAccess,authorize(['approver']),rejected)

router.post('/dashbord/approve/:bookingid',verifyTokenAccess,authorize(['approver']),approve)

router.get('/approve/:bookingid',verifyTokenAccess,authorize(['approver']),approved)
router.post('/approve/:bookingid',verifyTokenAccess,authorize(['approver']),approved)

router.post("/reject/:bookingid",verifyTokenAccess,authorize(['approver']),reason)

router.get('/dashbord/history',verifyTokenAccess,authorize(['approver']),booking_history)

router.get('/dashbord/bookings',verifyTokenAccess,authorize(['approver']),booking_list)

module.exports=router