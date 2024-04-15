const {Model,DataTypes}=require('sequelize');
const sequelize=require('../../config/Database');
class Users extends Model{}
Users.init({
    username:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    role:{
        type:DataTypes.STRING
    },
    first_name:{
        type:DataTypes.STRING
    },
    last_name:{
        type:DataTypes.STRING
    },
    national_number:{
        type:DataTypes.STRING
    },
    is_confirmed:{
        type:DataTypes.BOOLEAN
    }
},{
    sequelize,
    modelName:'Users'
}
)

module.exports=Users;