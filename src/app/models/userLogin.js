const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/mysql");

const UserLogin = sequelize.define(
    "User_Login",
    {
        id: {
            type: DataTypes.BIGINT(11),
            autoIncrement: true,
            primaryKey: true,
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_At: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        update_At: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        secret_key: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

module.exports = UserLogin;