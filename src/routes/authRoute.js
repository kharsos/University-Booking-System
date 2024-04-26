const express = require('express');
const User=require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router()
const {
    login,signup
}=require('../controllers/authController');

router.post('/signup',signup)

router.get('/signup', function(req, res) {
    res.render('signup',{success:false});
});

router.get('/',(req,res)=>{
    res.render('index',{})
})

router.get('/login',(req,res)=>{


    res.render('login',{err:{email:false,password:false},hide:false})

})


router.post('/login',login)






module.exports = router

