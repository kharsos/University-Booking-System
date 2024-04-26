const express = require('express');
const { where } = require('sequelize');
const Booking = require('../models/Bookings'); // Import Booking model
const Resource = require('../models/Resource'); // Import Resource model
const Users = require('../models/Users'); // Import Hall model


// Assuming this route handler is for rendering the EJS template
const reporting=async(req, res,next) => {
    try{
        // Retrieve counts using Sequelize's count method
        const bookingCount = await Booking.count();
        const resourceCount = await Resource.count();
        const userCount = await Users.count();

        // Render the EJS template and pass the counts as variables
        res.render('reporting', { bookingCount, resourceCount, userCount });

    }catch(error){
        let err=new Error(error.message);
        err.statusCode=error.status || 500 ;
        next(err) ;
    }
};

module.exports=reporting