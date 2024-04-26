
const express = require('express');
const router = express.Router();
const {AddResource,EditResource,DeleteResource,Resources}=require('../controllers/resourceController');
const {verifyTokenAccess} =require('../middleware/authorization');

router.post('/resource',verifyTokenAccess,AddResource);
router.post('/resource/:id',verifyTokenAccess,EditResource);
router.get('/resource/:id',verifyTokenAccess,DeleteResource);
router.get('/resource',verifyTokenAccess,Resources);

module.exports=router ;