const express=require('express');
const Booking=require('../models/Bookings');
const User=require('../models/Users');
const Halls = require('../models/Hall');
const {Op}=require('sequelize')
const bookingResources=require('../models/booking_resource')
const Resource=require('../models/Resource');
const { Id } = require('../middleware/authorization');

// Action pour obtenir toutes les réservations
const bookingHistory = async (req, res) => {
    try {
      const bookings = await Booking.findAll({
        include: [
          {
            model: bookingResources,
            include: {
              model: Resource,
              required: true
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
        ],
        where: {
          user_id: Id
        }
      });
      res.render('bookingHistory', { bookings:bookings });
    } catch (error) {
      console.log(error);
    }
  };
  

// Action pour créer une réservation
const createBooking = async (req, res) => {
    try {
      let { hall_id, start_date, end_date, expected_attendees, purpose, resource_id } = req.body;
      let user_id = Id;
  
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
  
      if (existingBooking) {
        res.status(400).render('bookings', { err: true, users: user_id, erreur: false, success: false });
        return;
      }
  
      const hall = await Halls.findByPk(hall_id);
      if (hall.capacity < expected_attendees) {
        res.status(400).render('bookings', { err: false, users: user_id, erreur: true, success: false });
        return ;
      }
  
      const newBooking = await Booking.create({ ...req.body, hall_id: parseInt(hall_id), user_id, resource_id: parseInt(resource_id) });
  
      await bookingResources.create({ booking_id: newBooking.id, resource_id: parseInt(resource_id) });
  
      const AllBooking = await Booking.findAll({
        include: [
          {
            model: bookingResources,
            include: {
              model: Resource,
              required: true
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
        ],
        where: {
          user_id
        }
      });
  
      res.render('bookingHistory', { bookings :AllBooking});
    } catch (error) {
      console.log(error);
      res.status(500).send('Une erreur s\'est produite lors de la création de la réservation.');
    }
  };

  const getBookings= async(req, res) =>{
          const ressources= await Resource.findAll()
          const halls= await Halls.findAll()
        try {
          res.render('bookings',{halls:halls,err:false,users:Id,erreur:false,success: false,ressources:ressources});
          // res.redirect('/bookingHistory');
    
          
        } catch (error) {
          console.log(error)
        }
        };

  module.exports = {
    getBookings,
    createBooking,
    bookingHistory
  };