const { where } = require('sequelize');
const resource=require('../models/Resource');
const express = require('express');

// Create a new Ressource
const AddResource=async (req, res,next) => {
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
  };
    

//    Edit Resource by ID
  const EditResource= async (req, res,next) => {
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
    };

// Delete a hall by ID
const DeleteResource= async (req, res,next) => {
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
    };
    
const Resources= async(req, res,next) =>{
        try {
          const resources = await resource.findAll();
          res.render('resource', { resource: resources }); 
        } catch (error) {
          let err=new Error(error.message);
          err.statusCode=error.status || 500 ;
          next(err) ;
        }
};

module.exports={AddResource,EditResource,DeleteResource,Resources}