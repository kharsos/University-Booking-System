const {Model,DataTypes}=require('sequelize');
const sequelize=require('../../config/Database');
const booking=require('./bookings')
const resource=require('./resource')

class booking_resource extends Model{}
booking_resource.init({
    booking_id:{
        type:DataTypes.INTEGER
    },
    resource_id:{
        type:DataTypes.INTEGER
    },
    
},{
    sequelize,
    modelName:'booking_resource'
}
);

booking_resource.belongsTo(booking,{foreignKey:"booking_id"})
booking_resource.belongsTo(resource,{foreignKey:"resource_id"})
module.exports=booking_resource;