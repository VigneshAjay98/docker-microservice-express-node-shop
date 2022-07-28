const mongoose = require('mongoose')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB1_NAME, process.env.DB1_USERNAME, process.env.DB1_PASSWORD, {
    host: process.env.DB1_HOST,
    dialect: process.env.DB1_DRIVER,
    // logging: false
})

sequelize.sync({ alter: true }).then(() => {
    console.log(`**********MySql Connected successfully!**********`)
}).catch((e) => {
    console.log(`**********MySql Connection failed :(**********`)
    console.log(e)
})

mongoose.connect(process.env.DB2_HOST).then(() => {
    console.log(`**********MongoDB Connected successfully!**********`)
}).catch((e) => {
    console.log(`**********MongoDB Connection failed :(**********`)
})

module.exports = { sequelize, mongoose }

    