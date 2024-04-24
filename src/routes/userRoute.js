const express = require('express');
const router = express.Router();
const {verifyTokenAccess,authorize} =require('../middleware/authorization');
const {Edituser,confirm,deny,activate,deactivate,users}=require('../controllers/usersController');

router.post('/Edituser/:id',verifyTokenAccess,authorize(['admin','staff']),Edituser)
router.post('/confirm/:id',verifyTokenAccess,authorize(['admin','staff']),confirm)
router.post('/deny/:id',verifyTokenAccess,authorize(['admin','staff']),deny)
router.post('/activate/:id',verifyTokenAccess,authorize(['admin','staff']),activate)
router.post('/deactivate/:id',verifyTokenAccess,authorize(['admin','staff']),deactivate)
router.get('/users',verifyTokenAccess,authorize(['admin','staff']),users)


module.exports=router