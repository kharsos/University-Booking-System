const winston = require('winston')

const logger  = winston.createLogger({
    level:'info',
    transports:[
        new winston.transports.File({filename:'app.log',level:'info'})
    ]
})

function getBrowserEngine(userAgent) {
    if (userAgent.indexOf("Chrome") !== -1 || userAgent.indexOf("CriOS") !== -1) {
      return "Chrome";
    } else if (userAgent.indexOf("Firefox") !== -1) {
      return "FireFox";
    } else if (userAgent.indexOf("Safari") !== -1) {
      return "Safari";
    } else if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident") !== -1) {
      return "Trident";
    } else if (userAgent.indexOf("Opera") !== -1 || userAgent.indexOf("OPR") !== -1) {
      return "Presto";
    } else {
      return "Unknown";
    }
  }

const request_logger =(req,res,next) =>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const browser = getBrowserEngine(req.headers['user-agent'])
    logger.info(`IP: ${ip}, URL: ${req.originalUrl}, Method: ${req.method}, Status: ${res.statusCode} browserEngine:${browser}`);
    next()
}

module.exports = {
    logger,
    request_logger,
    getBrowserEngine
}