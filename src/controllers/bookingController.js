const booking = require('../models/Bookings')
const approval = require('../models/Approval')
const hall = require('../models/Hall')
const user = require('../models/Users')
const resource = require('../models/Resources')
const Booking_Resource = require('../models/Booking_resource')
const {Id} = require('../middleware/authorization')
const emailSending=require('../utils/emailSender')


const dashbord = async (req, res,next) => {
    try {
        const userId = Id; 
        await booking.findAll({
            include: [
            {
                model: Booking_Resource,
                include:{
                    model:resource,
                    required:true
                }
            },
            {
                model: user,
                required: true
            },
            {
                model: hall,
                required: true
            }
            ],
            where: {
            status: 'pending'
            }
        })
        .then(data=>{
            if (!data) {
                const err = new Error('no data found')
                err.statusCode = 404
                err.status = 'Not Found'
                next(err)
            }
            res.render('approver_dashbord', { data: data, userId: userId });
        })
    } catch (error) {
        console.log(error)
        const err = new Error('Error in dashboard function:')
        err.statusCode = 500
        err.status = 'Error'
        next(err)
    }
  };

const rejected =async (req,res,next)=>{
    try{
        const BookingId =Number(req.params.bookingid)
        await booking.update({
            status : 'rejected'
        },{
            where:{
                id:BookingId
            }
        })
        .then(res.render('reason',{bookingid:BookingId,userId:Id}))
        .catch((err)=>{
            let error = new Error(err.message)
            error.statusCode = 404
            error.status = 'Not Found'
            next(error)
        })
    
    }
    catch (err){
        let error = new Error(err.message)
        error.statusCode = err.status || 500
        next(error)
    }
    }

const approve = async(req,res,next)=>{
    try{
        const BookingId =req.params.bookingid
        const data = await booking.findOne({include:[
            {
                model:user,
                required:true
            },
            {
                model:hall,
                required:true
            }
        ],where:{
            id:BookingId
        }})
        emailSending(data)
        await booking.update({
                status:'approved'
            },
            {
                where:{
                    id:BookingId
                }
            
            })
            .then(res.redirect(`/approve/${BookingId}`) )
            .catch(err=>{
                let error = new Error(err.message)
                error.statusCode = err.status || 404
                error.status = 'Not Found'
                next(error)
            })
    }
    catch (err){
        let error = new Error(err.message)
        error.statusCode = err.status || 500
        next(error)
    }
    
    }

const approved = async(req,res,next)=>{
    try{
        let data = {booking_id:parseInt(req.params.bookingid),approver_id:Id,status:'approved',reason:'' }
        await approval.create(data)
        .then(()=>res.redirect(`/dashbord`))
        .catch(err=>{
            let error = new Error(err.message)
            error.statusCode = err.status || 404
            err.status = 'failed'
            next(error)
        })
    }
    catch (err){
        let error = new Error(err.message)
        error.statusCode = err.status || 500
        next(error)
    }
    
        
}

const reason =async (req,res,next) =>{
    try{
        let data = {booking_id:parseInt(req.params.bookingid),approver_id:Id,status:'rejected',reason:req.body.reject }
        await approval.create(data)
        .then(()=>res.redirect(`/dashbord`))
        .catch(err=>{
        let error = new Error(err.message)
        error.statusCode = err.status || 404
        error.status = 'failed'
        next(error)
    })
    }
    catch (err){
        let error = new Error(err.message)
        error.statusCode = err.status || 500
        next(error)
    }
    
    
}

const booking_history = async(req,res,next)=>{
    try{
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
        .then((data)=>res.render('approver_history',{data:data,userId:Id}))
        .catch(err=>{
            let error = new Error(err.message)
            error.statusCode = err.status || 404
            error.status = ' Not Found'
            next(error)
        })
    }
    catch(err){
        let error = new Error(err.message)
        error.statusCode = err.status || 404
        next(error)
    }
    
}

const booking_list = async (req,res,next) =>{
    try{
        const userId = Id
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
        .then((data)=>res.render('approver_listing',{data:data,userId:userId}))
        .catch(err=>{
            let error = new Error(err.message)
            error.statusCode = err.status || 404
            error.status = ' Not Found'
            next(error)
        })
        
    }
    catch (err){
        let error = new Error(err.message)
        error.statusCode = err.status || 404
        next(error)
    }
    
}   


module.exports = {
    booking_history,
    booking_list,
    dashbord,
    reason,
    rejected,
    approve,
    approved
}