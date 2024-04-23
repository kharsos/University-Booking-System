const express =require('express')
const sequelize=require('../config/Database');
const path = require('path')
const app = express()
const bodyParser =require('body-parser')
const auteRoute = require('./routes/authRoute')
const approverRouter = require('./routes/approverRoute')
const booking = require('./models/Bookings')
const User = require('./models/Users')
const Hall = require('./models/Hall')
const {request_logger} = require('./middleware/logs')
const error_handling = require('./middleware/error_handling')
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.json())

app.use(error_handling)

app.use(request_logger)

app.set('views',path.join(__dirname,'./views'))

app.set('view engine','ejs')

app.use(express.static('public'))



app.use('/',auteRoute)

app.use('/',approverRouter)

app.get('/email',async(req,res)=>{
    const data = await booking.findOne({include:[
        {
            model:User,
            required:true
        },
        {
            model:Hall,
            required:true
        }
    ],where:{
        id:4
    }})
    // res.send(data)})
    res.render('emailTemplate',{data:data})})


app.all('*',(req,res,next)=>{
    const err = new Error(`Can t find ${req.originalUrl} in the server !`)
    err.status = 'fail'
    err.statusCode = 404

    next(err)
})

app.use(error_handling)


module.exports=app;