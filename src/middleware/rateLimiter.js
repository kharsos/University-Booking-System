const rateLimiter = require('express-rate-limit')

const limiter = rateLimiter({
    limit:10,
    windowMs:60*60*1000,
    message:'you are olny allowed to do 3 requests'
})

module.exports=limiter