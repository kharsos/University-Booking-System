const express =require('express')
const app = express()
const bodyParser =require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.json())

app.set('view engine','ejs')

app.use(express.static('public'))

app.use('/',require('./src/routes/auth'))

const sequelize = require('./config/env/Database')
sequelize.sync().then(()=>console.log('db is running'))


app.listen(5500,()=>console.log('server is listening !'))