const resource=require('../models/Resources');
const express = require('express');
const router = express.Router();

// Create a new Ressource
router.post('/AddResource',async (req, res,next) => {
    try {
        const { name, description } = req.body;
        // Create a new Hall instance with the provided fields
        const newResoource = await resource.create({name,description});
        // res.send(newResoource);
      res.redirect('/resource')
    } catch (error) {
      let err=new Error(error.message);
      err.statusCode=error.status || 500 ;
      next(err) ;
    }
  });
    

//    Edit Resource by ID
  router.post('/EditResource/:id', async (req, res,next) => {
      try {
        const { name, description } = req.body;
        resource.update({name,description},
        {
            where:{ id:req.params.id}
        })
        // res.send("succes")
        res.redirect('/resource')
      } catch (error) {
        let err=new Error(error.message);
        err.statusCode=error.status || 500 ;
        next(err) ;
      }
    });

//   // Delete a hall by ID
  router.get('/DeleteResource/:id', async (req, res,next) => {
      try {
        // const resource = await resource.findByPk(req.params.id);
        await resource.destroy({where:{id:req.params.id}});
        // res.json({ message: 'resource deleted successfully' });
        res.redirect('/resource')
      } catch (error) {
        let err=new Error(error.message);
        err.statusCode=error.status || 500 ;
        next(err) ;
      }
    });
    
router.get('/resource', async(req, res,next) =>{
        try {
          const resources = await resource.findAll();
          res.render('resource', { resource: resources }); 
        } catch (error) {
          let err=new Error(error.message);
          err.statusCode=error.status || 500 ;
          next(err) ;
        }
});

module.exports=router