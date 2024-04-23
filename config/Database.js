
const {Sequelize}= require('sequelize')


const sequelize=new Sequelize('Booking-system.db','user','pass',{
    dialect:'sqlite',
    host:'./dev.sqlite',
    dialectOptions : {
        timeout:5000
        
    }
})
module.exports=sequelize;

