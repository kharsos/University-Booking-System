const {Model,DataTypes}=require('sequelize');
const sequelize=require('../../config/Database');
class ressource extends Model{}
ressource.init({
    name:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    },
    
},{
    sequelize,
    modelName:'ressource'
}
);

module.exports=ressource;