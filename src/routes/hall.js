const express = require('express');
const app = express()
app.use(express.json())
const Hall=require('../models/halls')
const router = express.Router()

app.get('/hall', (req, res) => {
  // Query database for available halls
  const hall = []; // Fetch halls from database
  res.render('hall', { hall });
});


router.get('/salle', async (req, res) =>{
  try {
    const halls = await Hall.findAll();
    res.render('salle', { halls: halls }); 
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});







// app.get('/salle',(req,res)=>{
  
//   res.render('salle',{});
//   res.redirect('/bookings')
// })
  module.exports = router;