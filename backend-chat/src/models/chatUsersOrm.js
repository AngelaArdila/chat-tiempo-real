
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConection');
const User = require('./userOrm');

class ChatUser extends Model {}

ChatUser.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id',
        },
        onDelete: 'CASCADE',
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    sequelize,
    modelName: 'ChatUser',
    tableName: 'chat_users',
    timestamps: false,
});

ChatUser.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(ChatUser, { foreignKey: 'user_id' });

module.exports = ChatUser;