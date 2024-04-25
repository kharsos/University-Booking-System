const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 3 * 60 * 60 * 1000, // 3 hours
    max: 100 // limit each IP to 100 requests per 3-hour window
});

module.exports=limiter