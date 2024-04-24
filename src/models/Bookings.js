const {Model,DataTypes}=require('sequelize');
const sequelize=require('../../config/Database');
const User = require('./Users')
const hall = require('./Hall')
class bookings extends Model{}
bookings.init({
    userId:{
        type:DataTypes.INTEGER
    },
    hall_Id:{
        type:DataTypes.INTEGER
    },
    startDate:{
        type:DataTypes.DATE
    },
    endDate:{
        type:DataTypes.DATE 
    },
    expectedAttendees:{
        type:DataTypes.INTEGER
    },
    purpose:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    modelName:'bookings'
}


);

bookings.belongsTo(hall,{foreignKey:'hall_Id'})


bookings.belongsTo(User,{foreignKey:'userId'})

module.exports=bookings;