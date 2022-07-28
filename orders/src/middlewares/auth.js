const isAuth = (req, res, next) => {
    try {
        if(!req.headers.authorization && req.session.user) { // Oauth2.0 
            next()
        } else {
            throw "Unauthorized"
        }
    } catch (e) {
        res.status(401).send(e)
    }
}

module.exports = { isAuth }