const {LocalStorage} = require('node-localstorage')
const localStorage = new LocalStorage('./scratch')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/Users')
const sequelize = require('../../config/Database')

//signup

const signup= async (req, res) => {
    try {
        // Extract email and password from request body
        let { email, password } = req.body;

        // Check if a user with the provided email already exists
        let existingUser = await user.findOne({ where: { email: email } });
        if (!existingUser) {
            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create a new user instance with the provided email and hashed password
            const newUser = await user.create({ ...req.body, email: email, password: hashedPassword,is_confirmed:false,is_activated:false });
            // Generate a JWT token using jsonwebtoken
            const token = jwt.sign({ userId: newUser._id }, 'your_secret_key');
            // Send a success response with the message and the generated token
            // res.send({ message: "User created successfully", token });
            res.render('signup',{success:true});

        } else {
            return res.status(400).json({ message: "Email already exists" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const login = async (req,res)=>{
    let {email,password}=req.body
    let test =await user.findOne({where:{
        email:email
    }})
    if(!test){
        res.render('login',{err:{email:true,password:false},hide:false})
    }
    else{
        bcrypt.compare(password,test.password)
        .then(result=>{
            if(!result){
                res.render('login',{err:{email:false,password:true},hide:false})
            }
            else{
                const payload = {id:test.id,role:test.role}
                jwt.sign(payload,'tokenSecret',{expiresIn:'2h'},(err,token)=>{
                    if(err){
                        res.send(err)
                    }
                    else{
                        localStorage.setItem('token',`Bearer ${token}`)
                        if(test.is_confirmed==true&&test.is_activated==true){
                            if(test.role=='student'){
                                res.redirect('/bookings')
                            }
                            else if(test.role=='admin'||test.role=='staff'){
                                res.redirect('/admin')
                            }
                            else if(test.role=='approver'){
                                res.redirect(`/dashbord`)
                            }
                        }
                        else{
                            res.render('login',{err:{email:false,password:false},hide:true})
                        }
                    }
                })
            }
        })
    }
}




module.exports = {
    login,signup
}