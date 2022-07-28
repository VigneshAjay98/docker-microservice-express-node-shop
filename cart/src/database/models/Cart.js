const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database/config.js')

const Cart = sequelize.define('carts', 
    {
        /* Model attributes are defined here */
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false 
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false 
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false 
        },
        created_at: {
            type: "TIMESTAMP",
            field: 'created_at',
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false
        },
        updated_at: {
            type: "TIMESTAMP",
            field: 'updated_at',
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false
        }
    },
    {
        createdAt   : 'created_at',
        updatedAt   : 'updated_at',
        timestamps  : true,
        underscored : true
    }
)

module.exports = Cart