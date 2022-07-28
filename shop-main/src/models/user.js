const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        validate(value) {
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            return validator.isStrongPassword(value)
        }
    },
    image: {
        type: String
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    token: {
        type: String,
        default: ""
    },
    googleId: {
        type: String,
        default: ""
    }
})

userSchema.set('timestamps', true)
userSchema.set('versionKey', false)

userSchema.statics.validateCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user) {
        throw "Email not matched"
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw "Credentials not matched"
    }
    const token = await jwt.sign({ _id: user._id, name: user.name, email: user.email, role: user.email }, process.env.JWT_SECRET, {expiresIn: "7 days" })

    user.token = token
    user.save()
    return user
}
const User = mongoose.model('users', userSchema)

module.exports = User
