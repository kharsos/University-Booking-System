const express = require('express');
const BookingResource = require('../models/Booking_resource'); 
const Booking = require('../models/Bookings'); // Import Booking model
const Resource = require('../models/Resources'); // Import Resource model
const Hall = require('../models/Hall'); // Import Hall model
const router = express.Router();


// Assuming this route handler is for rendering the EJS template
router.get('/reporting', (req, res,next) => {
    try{
    // const bookingId = 1;
    // const resourceId = 1;
    BookingResource.findAll({
        where: {
            // booking_id: bookingId,
            // resource_id: resourceId
        },
        include: [
            {
                model: Booking,
                include: {
                    model: Hall,
                    attributes: ['name'] // Retrieve only the name attribute of the Hall model
                },
                attributes: ['start_date', 'end_date'] // Retrieve start_date and end_date attributes of the Booking model
            },
            {
                model: Resource,
                attributes: ['name'] // Retrieve only the name attribute of the Resource model
            }
        ]
    })
    .then(bookingResources => {
        // Pass the retrieved data to the EJS template
        res.render('reporting', { bookingResources });
        // res.send( bookingResources );
    })
    .catch(err => {
        console.error('Error fetching Booking Resources:', err);
        res.status(500).send('Internal Server Error');
    });}catch(error){
        let err=new Error(error.message);
        err.statusCode=error.status || 500 ;
        next(err) ;
    }
});

module.exports=router