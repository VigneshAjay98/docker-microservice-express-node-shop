const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require('../../database/config.js')
const Cart = require('../../database/models/Cart.js')

const Order = sequelize.define('orders', 
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
        cart_id: {
            type: DataTypes.INTEGER,
            allowNull: false 
        },
        status: {
            type: Sequelize.ENUM,
            values: ['unpaid', 'paid'],
            defaultValue: 'unpaid'
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

Order.belongsTo(Cart, { foreignKey: 'cart_id' })

module.exports = Order