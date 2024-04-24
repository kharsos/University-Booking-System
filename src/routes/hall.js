const Hall = require('../models/Hall')
const express = require('express');
const path=require('path')
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function(req, file, cb) { // Changed cb to cb
      cb(null, file.originalname);
  }
});

const upload = multer({ storage });
// Create a new hallconst 

router.post('/CreateHall',upload.single('image_url'), async (req, res,next) => {
    try {
        const { name, location, capacity, description } = req.body;
        const imageUrl = req.file.filename;
            // Proceed with creating the Hall record in the database
            Hall.create({
                name,
                location,
                capacity,
                description,
                image_url: imageUrl // Save the original filename in the database
            }).then(() => {
                res.redirect('/admin');
                // res.send(req.file)
            }).catch((err) => {
                console.error('Error creating hall:', err);
                res.status(500).send('Error creating hall');
            });
        }
    catch (error) {
      let err=new Error(error.message);
      err.statusCode=error.status || 500 ;
      next(err) ;
    }
});  

/// POST request to update the hall details
router.post('/UpdateHall/:id', upload.single('image_url'), async (req, res,next) => {
  try {
      const { name, location, capacity, description } = req.body;
      let imageUrl = req.file ? req.file.filename : undefined;
      
      // Find the hall by ID and update its details
      const hall = await Hall.findByPk(req.params.id);
      if (!hall) {
          return res.status(404).send('Hall not found');
      }
      // Update the hall attributes
      hall.name = name;
      hall.location = location;
      hall.capacity = capacity;
      hall.description = description;
      if (imageUrl) {
          hall.image_url = imageUrl;
      }
      // Save the updated hall
      await hall.save();
      
      res.redirect('/admin');
  } catch (error) {
      let err=new Error(error.message);
      err.statusCode=error.status || 500
      next(err)
  }
});
// Delete a hall by ID
router.get('/DeleteHall/:id', async (req, res,next) => {
    try {
      const hall = await Hall.findByPk(req.params.id);
      if (!hall) {
        return res.status(404).json({ message: 'Hall not found' });
      }
      await hall.destroy();
      // res.json({ message: 'Hall deleted successfully' });
      res.redirect('/admin')
    } catch (error) {
      let err=new Error(error.message);
      err.statusCode=error.status || 500 ;
      next(err) ;
    }
  });
//the admin page rout
router.get('/admin', async(req, res,next) =>{
  try {
    const halls = await Hall.findAll();
    res.render('admin', { halls: halls });
    // res.send(halls) 
  } catch (error) {
    let err=new Error(error.message);
    err.statusCode=error.status || 500 ;
    next(err) ;
  }
  });

module.exports = router