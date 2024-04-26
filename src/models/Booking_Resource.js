const {Model , DataTypes}= require('sequelize');
const sequelize = require('../../config/Database');
const bookings = require('./Bookings');
const resource = require('./Resources')

class Booking_Resource extends Model {}

Booking_Resource.init({
    booking_id: {
        type: DataTypes.INTEGER
    },
    resource_id: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'Booking_Resources'
});


bookings.belongsToMany(resource, { through: Booking_Resource, foreignKey: 'booking_id' });
resource.belongsToMany(bookings, { through: Booking_Resource, foreignKey: 'resource_id' });


module.exports = Booking_Resource;
