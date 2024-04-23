const {Model,DataTypes}=require('sequelize');
const sequelize=require('../../config/Database');
class hall extends Model{}
hall.init({
    name:{
        type:DataTypes.STRING
    },
    location:{
        type:DataTypes.STRING
    },
    capacity:{
        type:DataTypes.INTEGER
    },
    description:{
        type:DataTypes.STRING
    },
    image_url:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    modelName:'Hall'
}
)

module.exports=hall;