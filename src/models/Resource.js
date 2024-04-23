const {Model,DataTypes}=require('sequelize');
const sequelize=require('../../config/Database');

class resource extends Model{}
resource.init({
    name:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    modelName:'resource'
}
)

module.exports=resource;