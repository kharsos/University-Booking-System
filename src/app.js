const express =require('express')
const sequelize=require('../config/Database');
const path = require('path')
const app = express()
const bodyParser =require('body-parser')
const auteRoute = require('./routes/authRoute')
const approverRouter = require('./routes/approverRoute')
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.json())

app.set('views',path.join(__dirname,'./views'))

app.set('view engine','ejs')

app.use(express.static('public'))

app.use('/',auteRoute)

app.use('/',approverRouter)

app.get('/email',(req,res)=>res.render('emailTemplate',{}))



module.exports=app;