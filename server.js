const app=require('./src/app');


app.use('/',require('./src/routes/auth'))

const sequelize = require('./config/Database')
sequelize.sync().then(()=>console.log('db is running'))


app.listen(5550,()=>console.log('running !'))

