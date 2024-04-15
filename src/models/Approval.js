const {Model,DataTypes}=require('sequelize');
const sequelize=require('../../config/Database');
const user = require('./Users')
const booking = require('./Bookings')
class approval extends Model{}
approval.init({
    booking_id:{
        type:DataTypes.INTEGER
    },
    approver_id:{
        type:DataTypes.INTEGER
    },
    status:{
        type:DataTypes.STRING
    },
    reason:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    modelName:'approval'
}
)

module.exports=approval;