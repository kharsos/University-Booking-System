const {Model,DataTypes} = require('sequelize')
const sequelize=require('../../config/Database');
const User = require('./Users')
const hall = require('./Hall');
class bookings extends Model{}
bookings.init({
    user_id:{
        type:DataTypes.INTEGER
    },
    hall_id:{
        type:DataTypes.INTEGER
    },
    start_date:{
        type:DataTypes.DATE
    },
    end_date:{
        type:DataTypes.DATE
    },
    expected_attendees:{
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

bookings.belongsTo(hall,{foreignKey:'hall_Id'})
bookings.belongsTo(User,{foreignKey:'user_id'})




module.exports=bookings;