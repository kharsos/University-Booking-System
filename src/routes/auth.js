// <<<<<<< HEAD
const express = require('express');
const app = express()
app.use(express.json())
const User=require('../models/users');
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
module.exports=router

router.get('/',(req,res)=>{
    res.render('index',{})
})

router.get('/login',(req,res)=>{
    res.render('login',{})
})


router.post('/post',(req,res)=>{
    let {username,email,password,role,first_name,last_name,national_number,is_confirmed}=req.body
    bcrypt.hash(password,10,(err,crypted)=>{
        password = crypted
        User.create({username,email,password,role,first_name,last_name,national_number,is_confirmed})
        .then(result=>res.json(result))
    })
})

router.post('/login',async (req,res)=>{
    let {email,password}=req.body
    let test =await User.findOne({where:{
        email:email
    }})
    if(!test){
        res.send("user doesnt exist")
    }
    else{
        bcrypt.compare(password,test.password)
        .then(result=>{
            if(!result){
                res.send('password incorect')
            }
            else{
                const payload = {username:test.username,email:test.email}
                jwt.sign(payload,'tokenSecret',{expiresIn:'2h'},(err,token)=>{
                    if(err){
                        res.send(err)
                    }
                    else{
                        res.send(`token: ${token} , <br> message : welcome sir ${test.username}`)
                    }
                })
            }
        })
    }
})

module.exports = router
// >>>>>>> login_functionality
