const {Model , DataTypes}= require('sequelize');
const sequelize = require('../../config/Database');
const User = require('./Users');
const bookings = require('./Bookings');
const user = require('./Users');

class Approval extends Model {}

Approval.init({
    booking_id: {
        type: DataTypes.INTEGER
    },
    approver_id: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    },
    reason:{
        type:DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'approvals'
});


Approval.belongsTo(bookings , {foreignKey:'booking_id'})

Approval.belongsTo(user , {foreignKey : 'approver_id'})

module.exports = Approval;
