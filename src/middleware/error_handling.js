const {logger} = require('./logs')
const error_handling = (error,req,res,next) =>{
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'
    logger.error(error)
    res.render('error_handling',{err:error})
}

module.exports=error_handling