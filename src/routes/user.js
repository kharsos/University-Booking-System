const { where } = require('sequelize');
const user=require('../models/Users');
const express = require('express');
const router = express.Router();
    

// Edit user by ID
  router.post('/Edituser/:id', async (req, res,next) => {
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
    });
//confirm button
router.post('/confirm/:id', async (req, res,next) => {
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
      });
//deny button
router.post('/deny/:id', async (req, res,next) => {
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
  });
//activate button
router.post('/activate/:id', async (req, res,next) => {
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
});
//deactivate button
router.post('/deactivate/:id', async (req, res,next) => {
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
});

router.get('/users', async(req, res,next) =>{
        try {
          const users = await user.findAll();
          const data = users.map(user => ({
            id: user.id,
            email: user.email,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
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
});

module.exports=router