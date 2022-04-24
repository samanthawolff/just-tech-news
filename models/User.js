const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create our User model
class User extends Model {}

// Define table columns and configuration
User.init(
    {
       // DEFINE AN ID COLUMN
       id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true
       },
       // DEFINE A USERNAME COLUMN
       username: {
           type: DataTypes.STRING,
           allowNull: false
       },
       // DEFINE AN EMAIL COLUMN
       email: {
           type: DataTypes.STRING,
           allowNull: false,
           unique: true,
           validate: {
               isEmail: true
           }
       },
       // DEFINE A PASSWORD COLUMN
       password: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               len: [4]
           }
       }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);


module.exports = User;