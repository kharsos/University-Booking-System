const {Model,DataTypes}=require('sequelize');
const sequelize=require('../../config/Database');
class user extends Model{}
user.init({
    username:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    first_name:{
        type:DataTypes.STRING
    },
    last_name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    national_number:{
        type:DataTypes.INTEGER
    },
    field:{
        type:DataTypes.STRING
    },
    role:{
        type:DataTypes.STRING
    },
    is_confirmed:{
        type:DataTypes.BOOLEAN
    },

},{
    sequelize,
    modelName:'user'
}
);

module.exports=user;