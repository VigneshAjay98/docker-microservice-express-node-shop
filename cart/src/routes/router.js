const express = require('express')
const CartController = require('../controllers/CartController.js')
const PaymentController = require('../controllers/PaymentController.js')
const { isAuth } = require('../middlewares/auth.js')
const router = express.Router()

router.get('/carts', isAuth, CartController.listAll)
router.post('/carts/add', CartController.add)
router.route('/carts/:id')
    .get(isAuth, CartController.view)
    .delete(isAuth, CartController.destroy)

/* Stripe Payment */
router.get('/stripe/confirm', PaymentController.initiatePayment)

// 404 routes
router.get('*', (req, res) => {
    res.send(`<h1 align="center">404 Not found</h1>`)
})

module.exports = router