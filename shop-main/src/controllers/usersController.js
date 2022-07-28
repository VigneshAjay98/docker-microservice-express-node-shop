const User = require('../models/user.js')
const bcrypt = require('bcryptjs')

class UsersController
{
    allUsers(req, res){
        try {
            User.find({}, function (err, users) {
                if(err) {
                    throw "Something went wrong"
                }
                res.status(200).send(users)
            })
        }
        catch(err) {
            res.status(500).send(err)
        }
    }

    display(req, res) {
        try {
            User.findById(req.params._id).then(user=>{
                res.status(200).send(user)
            }).catch(err=>{
                res.status(404).send("No records found")
            })
        }
        catch(error) {
            res.status(500).send(error)
        }
    }

    async profile(req, res) {
        res.send("You are now Logged in!")
    }

    edit(req, res) {
        try {
            User.findByIdAndUpdate(req.params._id, { $set: req.body}, {new: true, runValidators: true})
            .then((user) => {
                res.status(200).send(user)
            }).catch((err) => {
                res.status(404).send(err)
            })
        }
        catch(error) {
            res.status(500).send(error)
        }
    }

    create(req, res) {
        User.findOne({email: req.body.email}).then(user=>{
            if(user) {
                res.status(403).send(`Email already used</br>`)
            }else {
                const user = new User(req.body)
                user.password = bcrypt.hashSync(req.body.password, 10);

                user.save().then(() => {
                    res.status(201).send(req.body)
                }).catch((e) => {
                    res.status(400).send(e)
                })
            }
        }).catch(err=>{
            res.status(403).send("err")
        })
    }
}
const usersController = new UsersController()

module.exports = usersController