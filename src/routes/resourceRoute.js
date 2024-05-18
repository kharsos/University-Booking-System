
const express = require('express');
const router = express.Router();
const {AddResource,EditResource,DeleteResource,Resources}=require('../controllers/resourceController');
const {verifyTokenAccess,authorize} =require('../middleware/authorization');


router.post('/resource',verifyTokenAccess,authorize(['admin','staff']),AddResource);
router.post('/resource/:id',verifyTokenAccess,authorize(['admin','staff']),EditResource);
router.get('/resource/:id',verifyTokenAccess,authorize(['admin','staff']),DeleteResource);
router.get('/resource',verifyTokenAccess,authorize(['admin','staff']),Resources);

module.exports=router ;