const express = require('express');
const path= require('path');


const imagesGet= async(req, res,next) => {
  try {
    const imagePath = path.join(__dirname, '../uploads', req.params.imageName);
    const placeholderImagePath = path.join(__dirname,'../uploads', "placeholder.png");
    if (req.params.imageName=='') {
      res.sendFile(placeholderImagePath);
  } else {
      res.sendFile(imagePath);
  }
} catch (error) {
  let err=new Error(error.message);
  err.statusCode=error.status || 500 ;
  next(err) ;
}
  };

module.exports=imagesGet;