
const express = require('express');
const router = express.Router();
const {AddResource,EditResource,DeleteResource,Resources}=require('../controllers/resourceController');
const {verifyTokenAccess} =require('../middleware/authorization');

router.post('/AddResource',verifyTokenAccess,AddResource);
router.post('/EditResource/:id',verifyTokenAccess,EditResource);
router.get('/DeleteResource/:id',verifyTokenAccess,DeleteResource);
router.get('/resource',verifyTokenAccess,Resources);

module.exports=router ;