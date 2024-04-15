const app=require('./src/app');

app.use('/',require('./src/routes/auth'))

const sequelize = require('./config/Database')
sequelize.sync().then(()=>console.log('db is running'))

app.listen(8080);
console.log('8080 is the magic port');