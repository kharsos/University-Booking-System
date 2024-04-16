const {LocalStorage} = require('node-localstorage')
const localStorage = new LocalStorage('./scratch')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/Users')
const booking = require('../models/Bookings')
const approval = require('../models/Approval')
const sequelize = require('../../config/Database')
const hall = require('../models/Hall')

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
    const userId = req.params.userid
    const data = await booking.findAll({
        include:[
            {
                model:user,
                required:true
            },
            {
                model:hall,
                required:true
            }
        ],
        where:{
            status:"pending"
        }
    })
    res.render('approver_dashbord',{data:data,userId:userId})
}   

const rejected =async (req,res)=>{
    await booking.update({
        status : 'rejected'
    },{
        where:{
            id:req.params.bookingid
        }
    })
    .then(res.render('reason',{bookingid:req.params.bookingid,userId:req.params.userid}))
    .catch((err)=>console.log(err))

}

const approve = async(req,res)=>{
    await booking.update({
            status:'approved'
        },
        {
            where:{
                id:req.params.bookingid
            }
        
        })
        .then(res.redirect(`/approve/${req.params.userid}/${req.params.bookingid}`) )
        .catch(err=>console.log(err))
        
}

const approved = async(req,res)=>{
    let data = {booking_id:parseInt(req.params.bookingid),approver_id:parseInt(req.params.userid),status:'approved',reason:'' }
        await approval.create(data)
        res.redirect(`/dashbord/${req.params.userid}`)
}

const reason =(req,res) =>{
    let data = {booking_id:parseInt(req.params.bookingid),approver_id:parseInt(req.params.userId),status:'rejected',reason:req.body.reject }
    approval.create(data)
    res.redirect(`/dashbord/${data.userId}`)  
}

const booking_history = async(req,res)=>{
    await booking.findAll({
        include:[
            {
                model:user,
                required:true
            },
            {
                model:hall,
                required:true
            }
        ]
    })
    .then(data=>res.render('approver_history',{data:data,userId:req.params.userid}))
}

const booking_list = async (req,res) =>{
    const userId = req.params.userid
    const data = await booking.findAll({
        include:[
            {
                model:user,
                required:true
            },
            {
                model:hall,
                required:true
            }
        ]
    })
    res.render('approver_listing',{data:data,userId:userId})
}   

module.exports = {
    login,
    dashbord,
    rejected,
    reason,
    approve,
    approved,
    booking_history,
    booking_list
}