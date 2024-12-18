const express = require('express');
const path = require('path');
const limiter = require('./middleware/rateLimiter');
const app = express()
const bodyParser =require('body-parser')
const auteRoute = require('./routes/authRoute')
const approverRouter = require('./routes/approverRoute')
const booking = require('./models/Bookings')
const User = require('./models/Users')
const Hall = require('./models/Hall')
const {verifyTokenAccess} =require('./middleware/authorization')
const {imageRout}=require('./controllers/imageController')
const bookingRouter=require('./routes/bookingRoute')
const hallRoute = require('./routes/hallRoute');
const resourceRoute = require('./routes/resourceRoute');
const userRoute = require('./routes/userRoute');
const reportingRoute = require('./routes/reportingRoute');


const { request_logger } = require('./middleware/logs');
const  error_handling  = require('./middleware/error_handling');



app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, './uploads')));
// app.use('/images/:imageName', verifyTokenAccess,imageRout);

// Apply middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.urlencoded({ extended: false }));




app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, './uploads')));


// Apply logging and error handling middleware
app.use(request_logger);
app.use(error_handling);

// Apply rate limiter middleware

app.use(limiter);

// Log IP address for each request
app.use((req, res, next) => {
    console.log(`Request per IP: ${req.ip}`);
    next();
});

// Apply routes
app.use('/', hallRoute);
app.use('/', resourceRoute);
app.use('/', userRoute);
app.use('/', reportingRoute);
app.use('/', auteRoute);
app.use('/', approverRouter);
app.use('/',bookingRouter)
module.exports = app;

