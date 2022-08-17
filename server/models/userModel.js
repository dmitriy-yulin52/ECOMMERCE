const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Пожалуйста введите ваше имя'],
        maxLength: [30, 'Имя не может превышать 30 символов'],
        minLength: [4, 'Имя должно содержать больше 4 символов'],
    },
    email: {
        type: String,
        required: [true, 'Пожалуйста введите ваш email'],
        unique: true,
        validator: [validator.isEmail, 'Пожалуйста введите правильный email!']
    },
    password: {
        type: String,
        required: [true, 'Пожалуйста введите ваше пароль'],
        minLength: [8, 'Пароль должен содержать более 8 символов'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model('User', userSchema)