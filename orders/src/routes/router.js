const express = require('express')
const OrderController = require('../controllers/OrderController.js')
const { isAuth } = require('../middlewares/auth.js')
const router = express.Router()

// router.get('/orders', isAuth, OrderController.listAll)
// router.post('/orders/add', OrderController.add)
// router.route('/orders/:id')
//     .get(isAuth, OrderController.view)
//     .delete(isAuth, OrderController.destroy)

/* Stripe Payment */
router.get('/payment/confirm', OrderController.receivePayment)

// 404 routes
router.get('*', (req, res) => {
    res.send(`<h1 align="center">404 Not found</h1>`)
})

module.exports = router