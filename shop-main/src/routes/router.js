const express = require('express')
const passport = require('passport')
const productsController = require('../controllers/productsController.js')
const usersController = require('../controllers/usersController.js')
const authController = require('../controllers/authController.js')
const { isAuth, checkRole } = require('../middlewares/auth.js')
const upload = require('../middlewares/multer.js')
const router = express.Router()

router.get('/', productsController.home)
router.post('/login/submit', authController.signup)
router.get('/logout', authController.logout)

// Google oAuth2.0
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        req.session.user = req.user
        res.redirect('/user/me')
    }
)

// User Routes
router.get('/users', isAuth, checkRole(['admin']), usersController.allUsers)
router.get('/users/me', isAuth, usersController.profile)
router.route('/users/:_id')
        .get(isAuth, checkRole(['admin']), usersController.display)
        .patch(isAuth, checkRole(['admin']), usersController.edit)
router.post('/users/create', isAuth, checkRole(['admin']), usersController.create)

// Product routes
router.get('/products', productsController.allProducts)
router.route('/products/:_id')
        .get(isAuth, checkRole(['admin', 'user']), productsController.display)
        .patch(isAuth, checkRole(['admin']), productsController.edit)
router.post('/products/create', isAuth, checkRole(['admin']), productsController.create)
router.post('/products/upload', upload.single('file'), (req, res) => {
    res.send("File Uploaded!")
})

// 404 routes
router.get('*', (req, res) => {
    res.send(`<h1 align="center">404 Not found</h1>`)
})

module.exports = router