// const express = require('express');
// const app = express()
// app.use(express.json())
// const Ressource=require('../models/resource')
// const booking_resource=require('../models/booking_resource')
// const router = express.Router()
// router.get('/bookings', async(req, res) =>{
//     try {
//       const bookingResources = await booking_resource.findAll({
//         include: [{
//           model: Ressource,
//           attributes: ['name'] // Sélectionnez les colonnes à afficher
//         }]
//       });
//       const resources = bookingResources.map(booking => booking.Resource);
//       res.render('bookings', { resources: resources });
//     } catch (error) {
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//     });

    
// module.exports = router;