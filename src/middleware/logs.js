const winston = require('winston')

const logger  = winston.createLogger({
    level:'info',
    transports:[
        new winston.transports.File({filename:'app.log',level:'info'})
    ]
})

const request_logger =(req,res,next) =>{
    logger.info(`URL:${req.originalUrl} , methode:${req.method} , status:${res.statusCode}`)
    next()
}

module.exports = {
    logger,
    request_logger
}