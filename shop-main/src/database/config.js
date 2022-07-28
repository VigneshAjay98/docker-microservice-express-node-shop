const mongoose = require('mongoose')

mongoose.connect(process.env.DB_HOST).then(() => {
    console.log(`**********MongoDB Connected successfully!**********`)
}).catch((e) => {
    console.log(`**********MongoDB Connection failed :(**********`)
})