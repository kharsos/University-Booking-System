const {Model,DataTypes}=require('sequelize');
const sequelize=require('../../config/Database');
class halls extends Model{}
halls.init({
    name:{
        type:DataTypes.STRING
    },
    location:{
        type:DataTypes.STRING
    },
    capacity:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    },
    image_url:{
        type:DataTypes.STRING
    },

},{
    sequelize,
    modelName:'halls'
}
);

module.exports=halls;