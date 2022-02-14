const { DataTypes } = require('sequelize');

const sequelize = require('../utils/db');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    pass: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    status: { // 1 active 2 inactive
        type: DataTypes.TINYINT(1),
        defaultValue: 1
    },
}, 
{
    timestamps: true,
    indexes: []
});

module.exports = User;