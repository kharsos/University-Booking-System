const express = require('express');
const { where } = require('sequelize');
const router = express.Router();
const {verifyTokenAccess,authorize} =require('../middleware/authorization');
const reporting=require('../controllers/reportingController');

router.get('/reporting',verifyTokenAccess,authorize(['admin','staff']),reporting)

module.exports=router