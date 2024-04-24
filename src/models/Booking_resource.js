const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/Database');
const Booking = require('./Bookings')
const Resource = require('./Resources')

class BookingResource extends Model {}
BookingResource.init({
    booking_id: {
        type: DataTypes.INTEGER,
        onDelete:'CASCADE'
    },
    resource_id: { 
        type: DataTypes.INTEGER,
        onDelete:'CASCADE'
    }
}, {
    sequelize,
    modelName: 'booking_resource'
});


BookingResource.belongsTo(Resource, { foreignKey: 'resource_id' });
BookingResource.belongsTo(Booking,{foreignKey:'booking_id'})
Booking.hasMany(BookingResource, { foreignKey:'booking_id' });

module.exports = BookingResource;
