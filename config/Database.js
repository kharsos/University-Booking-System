const {Sequelize}= require('sequelize')
const sequelize=new Sequelize('Booking-system.db','user','pass',{
    host:'./dev.sqlite',
    dialect:'sqlite'
    }
)

  
module.exports=sequelize;

