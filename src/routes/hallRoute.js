const express = require('express');
const path=require('path')
const router = express.Router();
const multer = require('multer');
const imagesGet=require('../controllers/imageController');
const {CreateHall,UpdateHall,DeleteHall,admin,getHalls}=require('../controllers/hallController')
const {verifyTokenAccess,authorize}=require('../middleware/authorization')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function(req, file, cb) { // Changed cb to cb
      cb(null, file.originalname);
  }
});

const upload = multer({ storage });


router.get('/images/:imageName', verifyTokenAccess, imagesGet)


router.post('/Hall',verifyTokenAccess,authorize(['admin','staff']),upload.single('image_url'),CreateHall);
router.post('/Hall/:id',verifyTokenAccess,authorize(['admin','staff']),upload.single('image_url'),UpdateHall);
router.get('/Hall/:id',verifyTokenAccess,authorize(['admin','staff']),DeleteHall);
router.get('/Hall',verifyTokenAccess,authorize(['admin','staff']),admin);
router.get('/salle',verifyTokenAccess,authorize(['student','staff']),getHalls);



module.exports = router