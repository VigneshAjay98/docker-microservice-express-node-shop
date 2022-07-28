const User = require('../models/user.js')

class AuthController 
{
    signup(req, res) {
        try {
            User.validateCredentials(req.body.email, req.body.password).then(user=>{
                res.send(user)
            }).catch((e) =>{
                res.status(400).send(e)
            })
        } catch (e) {
            res.status(400).send(e)
        }
    }

    async logout(req, res, next) {
        req.logout(function(err) {
            if (err) { return next(err) }
            res.status(200).clearCookie('connect.sid', {
                path: '/'
            })
            req.session.destroy(function (err) {
                res.redirect('/')
            })
        })
    }

}

const authController = new AuthController()

module.exports = authController