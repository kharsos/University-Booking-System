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
const bookingResources=require('../models/booking_resource')
const Resource=require('../models/resource');


router.get('/bookings', async(req, res) =>{
      const ressource= await Resource.findAll()
      const halls= await Halls.findAll()
    try {
      res.render('bookings',{halls:halls,err:false,users:Id,erreur:false,success: false,ressource:ressource});
      // res.redirect('/bookingHistory');

      
    } catch (error) {
      console.log(error)
    }
    });




router.post('/bookings',async(req,res)=>{

  try{
    
    let {hall_id,start_date,end_date,expected_attendees,purpose,resource_id}=req.body;
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
      const halls= await Halls.findAll()
      const ressource = await Resource.findAll();

    if (existingBooking) {
      // Si la salle est déjà réservée pour ces dates, renvoyer un message d'erreur
      res.render('bookings',{halls:halls,err:true,users:user_id,erreur:false,success: false,ressource:ressource});
      return; // Arrêter l'exécution de la fonction ici
    }

    //si la capacity de salle inféreier à expected_attendees renvoyer un message d'erreur
    const hall = await Halls.findByPk(hall_id);
    if (hall.capacity < expected_attendees) {
      res.render('bookings',{halls:halls,err:false,users:user_id,erreur:true,success: false,ressource:ressource});
      return; // Arrêter l'exécution de la fonction ici
    }

  
     
   
    const newBooking  = await Booking.create({...req.body, hall_id:parseInt(hall_id),user_id:user_id,resource_id:parseInt(resource_id)})
    // Créer une nouvelle réservation

  // Enregistrer les ressources sélectionnées dans la table booking_resource
    await bookingResources.create({ booking_id: newBooking.id, resource_id: parseInt(resource_id)});
  // Récupérez les noms des ressources sélectionnées
    const AllBooking = await bookings.findAll({
      include: [
      {
          model: bookingResources,
          include:{
              model:Resource,
              required:true
          }
      },
      {
          model: User,
          required: true
      },
      {
          model: Halls,
          required: true
      }
      ]})

    // Réservation réussie, afficher l'alerte de succès
    res.render('bookingHistory', { bookings:AllBooking});
    }
    catch (error) {
        console.log(error)
    }

})

router.get('/get',async(req,res)=>{
  await bookings.findAll({
    include: [
    {
        model: bookingResources,
        include:{
            model:Resource,
            required:true
        }
    },
    {
        model: User,
        required: true
    },
    {
        model: Halls,
        required: true
    }
    ]
}).then(data=>res.send(data))
})


// Route pour afficher l'historique des réservations
router.get('/bookingHistory', async(req, res) => {
  try {
    
    // Récupérer toutes les réservations depuis la base de données
    const bookings = await Booking.findAll();
    const booking_resource= await bookingResources.findAll();
    const resources = await Resource.findAll();
  //   const selectedResources = await bookingResources.findAll({
  //     where: {
  //         resource_id: parseInt(req.body.resource_id)
  //     }
  // });
    res.render('bookingHistory', { bookings ,booking_resource,resources });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;