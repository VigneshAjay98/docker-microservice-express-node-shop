const Product = require('../models/product.js')

class ProuctsController
{
    home(req, res) {
        res.send(`<h1 align="center">Hi from class products Controller</h1>`)
    }

    allProducts(req, res){
        try {
            Product.find({}, function (err, products) {
                if(err) {
                    throw new Error("Something went wrong")
                }
                res.status(200).send(products)
            })
        }
        catch(err) {
            res.status(500).send(err)
        }
    }

    display(req, res) {
        try {
            Product.findById(req.params._id, function (err, product) {
                if(err) {
                    res.status(404).send("No records found")
                }
                res.status(200).send(product)
            })
        }
        catch(error) {
            res.status(500).send(error)
        }
    }

    create(req, res) {
        const product = new Product(req.body)

        product.save().then(() => {
            res.status(201).send(req.body)
        }).catch((e) => {
            res.status(400).send(e)
        })
    }

    edit(req, res) {
        try {
            Product.findByIdAndUpdate(req.params._id, { $set: req.body}, {new: true, runValidators: true})
            .then((product) => {
                res.status(200).send(product)
            }).catch((err) => {
                res.status(404).send(err)
            })
        }
        catch(error) {
            res.status(500).send(error)
        }
    }
}
const prouctsController = new ProuctsController()

module.exports = prouctsController