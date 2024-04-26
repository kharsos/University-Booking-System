const { where } = require('sequelize');
const user=require('../models/Users');
const express = require('express');
    

// Edit user by ID
const Edituser= async (req, res,next) => {
      try {
        const { email,username, firstname,lastname,national_number,role,field } = req.body;
        await user.update({email,username, firstname,lastname,national_number,role,field},
        {
            where:{ id:req.params.id}
        })
        // res.send("succes")
        res.redirect('/users')
      } catch (error) {
        let err=new Error(error.message);
        err.statusCode=error.status || 500 ;
        next(err) ;
      }
    };
//confirm button
const confirm= async (req, res,next) => {
        try {
          const  is_confirmed =true;
          await user.update({is_confirmed},
          {
              where:{ id:req.params.id}
          })
          res.redirect('/users')
        } catch (error) {
          let err=new Error(error.message);
          err.statusCode=error.status || 500 ;
          next(err) ;
        }
      };
//deny button
const deny= async (req, res,next) => {
    try {
      const  is_confirmed =false;
      await user.update({is_confirmed},
      {
          where:{ id:req.params.id}
      })
      res.redirect('/users')
    } catch (error) {
      let err=new Error(error.message);
      err.statusCode=error.status || 500 ;
      next(err) ;
    }
  };
//activate button
const activate= async (req, res,next) => {
  try {
    const  is_activated =true;
    await user.update({is_activated},
    {
        where:{ id:req.params.id}
    })
    res.redirect('/users')
  } catch (error) {
      let err=new Error(error.message);
      err.statusCode=error.status || 500 ;
      next(err) ;
  }
};
//deactivate button
const deactivate= async (req, res,next) => {
  try {
    const  is_activated =false;
    await user.update({is_activated},
    {
        where:{ id:req.params.id}
    })
    res.redirect('/users')
  } catch (error) {
    let err=new Error(error.message);
    err.statusCode=error.status || 500 ;
    next(err) ;
  }
};

const users= async(req, res,next) =>{
        try {
          const users = await user.findAll();
          const data = users.map(user => ({
            id: user.id,
            email: user.email,
            username: user.username,
            first_name: user.firstname,
            last_name: user.lastname,
            national_number:JSON.parse(user.national_number),
            role: user.role,
            field:JSON.parse(user.field),
            password: user.password,
            is_confirmed: user.is_confirmed,
            is_activated: user.is_activated
        }));
          res.render('users', { user: data }); 
        } catch (error) {
          let err=new Error(error.message);
          err.statusCode=error.status || 500 ;
          next(err) ;
        }
};

module.exports={Edituser,confirm,deny,activate,deactivate,users}