const express = require('express')
const {
    login,
    dashbord,
    rejected,
    reason
}=require('../controllers/userController')

const router = express.Router()


router.get('/',(req,res)=>{
    res.render('index',{})
})

router.get('/login',(req,res)=>{
    res.render('login',{err:{email:false,password:false}})
})


router.post('/login',login)

router.get('/dashbord/:userid',dashbord)

router.post('/dashbord/:userid/reject/:bookingid',rejected)

router.post("/reject/:userId/:bookingid",reason)

module.exports = router