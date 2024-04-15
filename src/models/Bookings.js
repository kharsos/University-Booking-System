const {Model,DataTypes}=require('sequelize');
const sequelize=require('../../config/Database');
class bookings extends Model{}
bookings.init({
    userId:{
        type:DataTypes.INTEGER
    },
    hall_Id:{
        type:DataTypes.DATE
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
)

module.exports=bookings;