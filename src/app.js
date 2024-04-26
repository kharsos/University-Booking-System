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
const {verifyTokenAccess} =require('./middleware/authorization')
const {imageRout}=require('./controllers/imageController')

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.json())

app.set('views',path.join(__dirname,'./views'))

app.set('view engine','ejs')

app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, './uploads')));
// app.use('/images/:imageName', verifyTokenAccess,imageRout);

app.use('/',require('./routes/hallRoute'));
app.use('/',require('./routes/resourceRoute'));
app.use('/',require('./routes/userRoute'));
app.use('/',require('./routes/reportingRoute'));

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



module.exports=app;