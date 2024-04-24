const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/Database');
const Booking = require('./Bookings'); // Import Booking model
const Resource = require('./Resource'); // Import Resource model


class BookingResource extends Model {}
BookingResource.init({
    booking_id: {
        type: DataTypes.INTEGER
    },
    resource_id: { 
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'booking_resource'
});

// Define associations
BookingResource.belongsTo(Booking, { foreignKey: 'booking_id' });
BookingResource.belongsTo(Resource, { foreignKey: 'resource_id' });
Booking.hasMany(BookingResource,{foreignKey:'booking_id'})

module.exports = BookingResource;