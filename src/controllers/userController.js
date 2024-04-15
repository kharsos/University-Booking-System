const {LocalStorage} = require('node-localstorage')
const localStorage = new LocalStorage('./scratch')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/Users')
const booking = require('../models/Bookings')

const login = async (req,res)=>{
    let {email,password}=req.body
    let test =await user.findOne({where:{
        email:email
    }})
    if(!test){
        res.render('login',{err:{email:true,password:false}})
    }
    else{
        bcrypt.compare(password,test.password)
        .then(result=>{
            if(!result){
                res.render('login',{err:{email:false,password:true}})
            }
            else{
                const payload = {id:test.id,role:test.role}
                jwt.sign(payload,'tokenSecret',{expiresIn:'2h'},(err,token)=>{
                    if(err){
                        res.send(err)
                    }
                    else{
                        localStorage.setItem('token',`Bearer ${token}`)
                        res.redirect(`/dashbord/${test.id}`)
                    }
                })
            }
        })
    }
}

const dashbord = async (req,res) =>{
    const data = await booking.findAll({
        where:{
            status:"pending"
        }
    })
    res.render('dashbord',{data:data})
}

module.exports = {
    login,
    dashbord
}