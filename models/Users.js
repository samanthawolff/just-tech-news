const bcrypt = require('bcrypt');
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
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);


module.exports = User;