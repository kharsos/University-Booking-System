const express = require('express');
const router = express.Router();
const {verifyTokenAccess} =require('../middleware/authorization');
const {Edituser,confirm,deny,activate,deactivate,users}=require('../controllers/usersController');

router.post('/Edituser/:id',verifyTokenAccess,Edituser)
router.post('/confirm/:id',verifyTokenAccess,confirm)
router.post('/deny/:id',verifyTokenAccess,deny)
router.post('/activate/:id',verifyTokenAccess,activate)
router.post('/deactivate/:id',verifyTokenAccess,deactivate)
router.get('/users',verifyTokenAccess,users)


module.exports=router