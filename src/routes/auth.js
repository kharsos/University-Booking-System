
const express = require('express');
const User=require('../models/Users');
const hall = require('../models/Hall')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router()
router.post('/signup', async (req, res) => {
    try {
        // Extract email and password from request body
        let { email, password } = req.body;

        // Check if a user with the provided email already exists
        let existingUser = await User.findOne({ where: { email: email } });
        if (!existingUser) {
            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create a new user instance with the provided email and hashed password
            const newUser = await User.create({ ...req.body, email: email, password: hashedPassword });
            // Generate a JWT token using jsonwebtoken
            const token = jwt.sign({ userId: newUser._id }, 'your_secret_key');
            // Send a success response with the message and the generated token
            res.send({ message: "User created successfully", token });

        } else {
            return res.status(400).json({ message: "Email already exists" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


const {
    login,
    dashbord,
    rejected,
    reason,
    approve,
    approved,
    booking_history,
    booking_list
}=require('../controllers/userController');
const bookings = require('../models/Bookings');
const { useInflection } = require('sequelize');
const user = require('../models/Users');

router.get('/signup', function(req, res) {
    res.render('signup',{});
});

router.get('/admin', function(req, res) {
    res.render('admin',{});
});
router.get('/',(req,res)=>{
    res.render('index',{})
})

router.get('/login',(req,res)=>{

    res.render('login',{err:{email:false,password:false}})
})


router.post('/login',login)

router.get('/dashbord/:userid',dashbord)


router.post('/dashbord/:userid/reject/:bookingid',rejected)

router.post('/dashbord/:userid/approve/:bookingid',approve)

router.get('/approve/:userid/:bookingid',approved)
router.post('/approve/:userid/:bookingid',approved)

router.post("/reject/:userId/:bookingid",reason)

router.get('/dashbord/:userid/history',booking_history)

router.get('/dashbord/:userid/bookings',booking_list)


module.exports = router

