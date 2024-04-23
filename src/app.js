const express =require('express')
const sequelize=require('../config/Database');
const path = require('path')
const app = express()
const bodyParser =require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.json())

app.set('views',path.join(__dirname,'./views'))

app.set('view engine','ejs')

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, './uploads')));

app.use('/',require('./routes/auth'));
app.use('/',require('./routes/hall'));
app.use('/',require('./routes/resource'));
app.use('/',require('./routes/user'));
app.use('/',require('./routes/reporting'));



module.exports=app;