const {Model,DataTypes}= require('sequelize');
const sequelize = require('../../config/Database');
class Resource extends Model {}

Resource.init({
    name: {
        type: DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'resources'
});



module.exports=Resource
