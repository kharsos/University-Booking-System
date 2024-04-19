const express =require('express')
const sequelize=require('../config/Database');
const path = require('path')
const app = express()
const bodyParser =require('body-parser')

sequelize.sync()
.then(()=>console.log('db is ready'))

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.json())

app.set('views',path.join(__dirname,'./views'))

app.set('view engine','ejs')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }));

app.use('/',require('./routes/auth'))

app.get('/login', function(req, res) {
    res.render('login',{});
});

app.use('/',require('./routes/hall'))

app.get('/salle', function(req, res) {
    res.render('salle',{});
});

app.get('/sidebar', function(req, res) {
    res.render('sidebar',{});
});

app.use('/',require('./routes/booking'))

app.get('/reservation', (req, res) => {
    res.render('reservation'); 
});

app.get('/',require('./routes/booking'))


// app.use('/',require('./routes/bookingResource'))
// app.get('/reservation', (req, res) => {
//     res.render('reservation'); 
// });




app.get('/hall', (req, res) => {
    // Query database for available halls
    const hall = []; // Fetch halls from database
    res.render('hall', { hall });
});

// Route for submitting a booking request
app.post('/reservation', (req, res) => {
    // Parse form data and save booking request to database
    res.redirect('/bookingHistory');
});

// Route for displaying booking history
app.get('/bookingHistory', (req, res) => {
    // Query database for user's booking history
    const bookings = []; // Fetch bookings from database
    res.render('bookingHistory', { bookings });
});
app.get('/student',(req,res)=>{
    res.redirect('/reservation')
})
module.exports=app;