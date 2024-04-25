const express =require('express')
const sequelize=require('../config/Database');
const path = require('path')
const app = express()
const bodyParser =require('body-parser')


sequelize.sync()
.then(()=>console.log('db is ready'))


const auteRoute = require('./routes/authRoute')
const approverRouter = require('./routes/approverRoute')
const book=require('./routes/bookingRoute')
const salle=require('./routes/hall')
const booking = require('./models/Bookings')
const User = require('./models/Users')
const Hall = require('./models/Hall')


app.use(bodyParser.urlencoded({extended:true}))

app.use(express.json())

app.set('views',path.join(__dirname,'./views'))

app.set('view engine','ejs')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }));


app.use('/',require('./routes/authRoute'))

app.use('/',require('./routes/hall'));
// app.use('/',require('./routes/bookingHistory'))
app.use('/',require('./routes/bookingRoute'))

app.use('/',require('./routes/hall'))

// app.use('/',require('./routes/bookingResource'))

// app.get('/salle',(req,res)=>{
  
//     res.render('salle',{});
//     res.redirect('/bookings')
//   })

app.use('/',salle)
app.use('/',auteRoute)
app.use('/',book)
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

module.exports=app;