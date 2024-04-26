const app=require('./src/app');
// app.listen(port, () => {
//     console.log(`Serveur lancé sur http://localhost:${port}`);
//   });

const sequelize = require('./config/Database')
sequelize.sync()
  .then(() => {
    app.listen(4000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error syncing Sequelize models:', error);
  });

