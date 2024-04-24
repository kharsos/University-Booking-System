const express = require('express');
const { where } = require('sequelize');
const router = express.Router();
const {verifyTokenAccess} =require('../middleware/authorization');
const reporting=require('../controllers/reportingController');

router.get('/reporting',verifyTokenAccess,reporting)

module.exports=router