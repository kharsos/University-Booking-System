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

app.use(express.urlencoded({ extended: true }));

app.use('/',require('./routes/auth'))

app.get('/signup', function(req, res) {
    res.render('signup',{});
});
app.get('/dashboard', function(req, res) {
    res.render('dashboard',{});
});
module.exports=app;
