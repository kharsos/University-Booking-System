const {Model,DataTypes}=require('sequelize');
const sequelize=require('../University-Booking-System-main/config/env/Database');
class Users extends Model{}
Users.init({
    name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    userType:{
        type:DataTypes.STRING
    },
},{
    sequelize,
    modelName:'Users'
}
)

module.exports=Users;