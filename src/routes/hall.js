const express = require('express');
const app = express()
app.use(express.json())
const Hall=require('../models/halls')
const router = express.Router()
router.get('/salle', async(req, res) =>{
    try {
      const halls = await Hall.findAll();
      res.render('salle', { halls: halls }); 
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
    });
    
  module.exports = router;