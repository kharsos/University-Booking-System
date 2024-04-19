const express = require('express');
const app = express()
app.use(express.json())
const Booking=require('../models/bookings');
const Halls=require('../models/halls');
const User=require('../models/users')

const router = express.Router()
router.get('/reservation', async(req, res) =>{
    try {
      const halls= await Halls.findAll()
      res.render('reservation',{halls:halls});
       
      const users= await User.findAll() 
      res.render('reservation',{users:users})
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
    });
router.post('/reservation',async(req,res)=>{
  try{
    let user_id = req.body.users_id;
    let {hall_id,start_date,end_date,expected_attendees,purpose}=req.body
    await Booking.create({...req.body,hall_id:parseInt(hall_id),user_id:parseInt(user_id)})
    
    const newBooking =await Booking.findAll({
      hall_id:hall_id,
      user_id:user_id,
      start_date: start_date,
      end_date: end_date,
      expected_attendees: expected_attendees,
      purpose: purpose
  });
  
  res.render('bookingHistory', { bookings:newBooking });
    } 
    catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur
        res.status(500).json({ message: 'Internal Server Error' });
    }
    
})
module.exports = router;