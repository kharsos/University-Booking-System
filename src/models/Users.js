const {Model , DataTypes} =require('sequelize')
const sequelize = require('../../config/Database')

class user extends Model{}

user.init({
    email:{
        type:DataTypes.STRING
    },
    username:{
        type:DataTypes.STRING
    },
    first_name:{
        type:DataTypes.STRING
    },
    last_name:{
        type:DataTypes.STRING
    },
    national_number:{
        type:DataTypes.JSON
    },
    role:{
        type:DataTypes.STRING
    },
    field:{
        type:DataTypes.JSON
    },
    password:{
        type:DataTypes.STRING
    },
    is_confirmed:{
        type:DataTypes.BOOLEAN
    }
},{
    sequelize,
    modelName:'user'
})

module.exports=user