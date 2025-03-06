const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConection');

class User extends Model {}

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255), // Se recomienda para almacenar contraseñas cifradas
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});

module.exports = User;



