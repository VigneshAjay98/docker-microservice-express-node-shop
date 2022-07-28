const { Op } = require('sequelize')
const Cart = require('../database/models/Cart.js')

class CartController 
{
    static async listAll(req, res) {
        const carts = await Cart.findAll()
        res.send(carts)
    }

    static async add(req, res) {
        var cart = await Cart.findOne({
            where: {
                [Op.and]: [{user_id: req.body.user_id}, {product_id: req.body.product_id}]
            }
        })
        if(cart){
            cart = await Cart.update(
                    {
                        quantity: cart.quantity + 1 
                    },
                    {
                        where: {
                            [Op.and]: [{user_id: req.body.user_id}, {product_id: req.body.product_id}]
                        }
                    }
                )
        } else {
            cart = await Cart.create(req.body)
        }
        res.send(cart)
    }

    static async view(req, res) {
        const cart = await Cart.findAll({
                    where: {
                        id: req.params.id
                    }
                })
        res.send(cart)
    } 

    static async destroy(req, res) {
        await Cart.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(204).send(`Cart deleted!`)
    }

}

module.exports = CartController