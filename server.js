const app=require('./src/app');
app.use('/',require('./src/routes/auth'))

const sequelize = require('./config/Database')
sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error syncing Sequelize models:', error);
  });

