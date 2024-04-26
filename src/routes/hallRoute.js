const express = require('express');
const path=require('path')
const router = express.Router();
const multer = require('multer');
const {CreateHall,UpdateHall,DeleteHall,admin}=require('../controllers/hallController')
const {verifyTokenAccess}=require('../middleware/authorization')
const imagesGet=require('../controllers/imageController');

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

router.post('/Hall/:id',verifyTokenAccess,upload.single('image_url'),UpdateHall);
router.get('/Hall/:id',verifyTokenAccess,DeleteHall);
router.get('/Hall',verifyTokenAccess,admin);
router.post('/Hall',verifyTokenAccess,upload.single('image_url'),CreateHall);
//requireAuth how middleware li kandiro bih verfication dyal login
router.get('/images/:imageName', verifyTokenAccess, imagesGet)





module.exports = router