const {LocalStorage} = require('node-localstorage')
const localStorage = new LocalStorage('./scratch')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/Users')
const booking = require('../models/Bookings')
const approval = require('../models/Approval')

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

// const approve = async(req,res)=>{
//     await booking.update({
//         status:'approved'
//     },
//     {
//         where:{
//             id:req.params.bookingid  
//         }
//     })
//     res.render('reason',{bookingid:req.params.bookingid,userId:req.params.userid})

// }

const reason =(req,res) =>{
    let data = {bookingid:parseInt(req.params.bookingid),userId:parseInt(req.params.userId),status:'rejected',reason:req.body.reject }
    approval.create({...data})
    // res.redirect(`/dashbord/${data.userId}`)  
    res.send(data)  
}

module.exports = {
    login,
    dashbord,
    rejected,
    reason
}