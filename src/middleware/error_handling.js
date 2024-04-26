const {logger,getBrowserEngine} = require('./logs')
const error_handling = (error,req,res,next) =>{
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'
    error.Url = req.originalUrl
    error.methode = req.method
    error.message = error.message
    error.browserEngine = getBrowserEngine(req.headers['user-agent'])
    logger.error(error)
    next()
}

module.exports=error_handling