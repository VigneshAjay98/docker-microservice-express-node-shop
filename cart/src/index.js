require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const { createClient } = require("redis")
const RedisStore = require('connect-redis')(session)
require('./database/config.js')

const redisClient = createClient({ 
    url: process.env.REDIS_URL, 
    legacyMode: true 
})

redisClient.connect()
.then(()=> console.log("****Redis Connected Successfully!****"))
.catch((err)=>{
    console.log("****Redis Connection failed****")
    console.log(err)
})

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
}))

app.use(require('./routes/router.js'))

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`) )