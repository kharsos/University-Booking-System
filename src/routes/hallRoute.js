const express = require('express');
const path=require('path')
const router = express.Router();
const multer = require('multer');
const {CreateHall,UpdateHall,DeleteHall,admin}=require('../controllers/hallController')
const {verifyTokenAccess}=require('../middleware/authorization')

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
router.post('/CreateHall',verifyTokenAccess,upload.single('image_url'),CreateHall);
router.post('/UpdateHall/:id',verifyTokenAccess,upload.single('image_url'),UpdateHall);
router.get('/DeleteHall/:id',verifyTokenAccess,DeleteHall);
router.get('/admin',verifyTokenAccess,admin);


module.exports = router