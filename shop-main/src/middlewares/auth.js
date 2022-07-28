const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const isAuth = (req, res, next) => {
    try {
        if(!req.headers.authorization && req.session.user) { // Oauth2.0 
            next()
        } else if(req.headers.authorization) { // JWT
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = User.findOne({ _id: decoded._id, token }).then(user => {
                if(!user) throw "Expired"
                req.user = user
                next()
            }).catch((e) => {
                res.status(400).send(e)
            })
        } else {
            throw "Unauthorized"
        }
    } catch (e) {
        res.status(401).send(e)
    }
}

const checkRole = roles => (req, res, next) =>{
    !roles.includes(req.user.role) ? res.status(403).send("Forbidden") : next()
}

module.exports = { isAuth, checkRole }