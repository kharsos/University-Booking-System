const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/Users')

const router = express.Router()


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
        user.create({username,email,password,role,first_name,last_name,national_number,is_confirmed})
        .then(result=>res.json(result))
    })
})

router.post('/login',async (req,res)=>{
    let {email,password}=req.body
    let test =await user.findOne({where:{
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