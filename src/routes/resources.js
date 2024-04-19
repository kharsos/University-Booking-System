const express = require('express');
const app = express()
app.use(express.json())
const Resource=require('../models/resource')
const router = express.Router()
router.get('/reservation', async(req, res) =>{
    try {
      const resources = await Resource.findAll();
      res.render('reservation', { resources: resources }); 
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
    });


module.exports = router;