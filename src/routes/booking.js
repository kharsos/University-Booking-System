const {Op}=require('sequelize')
const express = require('express');
const app = express()
app.use(express.json())
const Booking=require('../models/Bookings');
const User=require('../models/Users');
const Halls = require('../models/halls');
const bookings = require('../models/Bookings');
const router = express.Router()
const {Id} = require('../middleware/authorization')


router.get('/bookings', async(req, res) =>{
      const users= await User.findAll() 
      const halls= await Halls.findAll()
    try {
      res.render('bookings',{halls:halls,err:false,users:users,erreur:false,success: false});
      // res.redirect('/bookingHistory');

      
    } catch (error) {
      console.log(error)
    }
    });




router.post('/bookings',async(req,res)=>{

  try{
    
    let {hall_id,start_date,end_date,expected_attendees,purpose}=req.body;
    // obtenir l'ID de l'utilisateur
    let user_id = Id;

  // Vérifier si la salle est disponible pour les dates données
    const existingBooking = await Booking.findOne({
      where: {
          hall_id: hall_id,
          [Op.or]: [
              {
                  start_date: {
                      [Op.between]: [start_date, end_date]
                  }
              },
              {
                  end_date: {
                      [Op.between]: [start_date, end_date]
                  }
              },
              {
                  start_date: {
                      [Op.lte]: start_date
                    },
                  end_date: {
                      [Op.gte]: end_date
                    }
              }
          ]
      }
  });
      const users= await User.findAll() 
      const halls= await Halls.findAll()
    if (existingBooking) {
      // Si la salle est déjà réservée pour ces dates, renvoyer un message d'erreur
      res.render('bookings',{halls:halls,err:true,users:users,erreur:false,success: false});
      return; // Arrêter l'exécution de la fonction ici
    }

    //si la capacity de salle inféreier à expected_attendees renvoyer un message d'erreur
    const hall = await Halls.findByPk(hall_id);
    if (hall.capacity < expected_attendees) {
      res.render('bookings',{halls:halls,err:false,users:users,erreur:true,success: false});
      return; // Arrêter l'exécution de la fonction ici
    }

  
     
     
    await Booking.create({...req.body, hall_id:parseInt(hall_id),user_id:user_id})
    // Créer une nouvelle réservation
    const newBooking =await Booking.findAll({
      hall_id:hall_id,
      user_id:user_id,
      start_date: start_date,
      end_date: end_date,
      expected_attendees: expected_attendees,
      purpose: purpose
  });
    // Réservation réussie, afficher l'alerte de succès
    return res.render('bookings', {bookings:newBooking, halls, users, err: false, erreur: false, success: true });
  
    
  

    
    } 
    catch (error) {
        console.log(error)
    }

})



// Route pour afficher l'historique des réservations
router.get('/bookingHistory', async(req, res) => {
  try {
    // Récupérer toutes les réservations depuis la base de données
    const bookings = await Booking.findAll();
    res.render('bookingHistory', { bookings });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;