
const express = require('express');
const router = express.Router();
const {AddResource,EditResource,DeleteResource,Resources}=require('../controllers/resourceController');
const {verifyTokenAccess,authorize} =require('../middleware/authorization');

router.post('/AddResource',verifyTokenAccess,authorize(['admin','staff']),AddResource);
router.post('/EditResource/:id',verifyTokenAccess,authorize(['admin','staff']),EditResource);
router.get('/DeleteResource/:id',verifyTokenAccess,authorize(['admin','staff']),DeleteResource);
router.get('/resource',verifyTokenAccess,authorize(['admin','staff']),Resources);

module.exports=router ;