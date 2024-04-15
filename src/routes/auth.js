const express = require('express')
const {
    login,
    dashbord
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

module.exports = router