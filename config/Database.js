const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('university_booking_system.db','user','pass',{
    dialect:'sqlite',
    host:'./dev.sqlite'
}) 

module.exports = sequelize