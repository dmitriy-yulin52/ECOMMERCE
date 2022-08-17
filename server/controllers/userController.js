const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const User = require('../models/userModel');


exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'public_id',
            url: 'url'
        }
    })

    const oldUser = await User.findOne({email})

    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        // user,
        token
    })

})


exports.loginUser = catchAsyncErrors(async (req, res, next) => {


    const {email, password} = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Пожалуйста введите пароль и email', 400))
    }

    const user = await User.findOne({email}).select('+password');


    if (!user) {
        return next(new ErrorHandler('Неправильный пароль или email!', 401))
    }

    const isPasswordMatched = user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Неправильный пароль или email!', 401))
    }

    const token = user.getJWTToken()

    res.status(201).json({
        success: true,
        // user,
        token
    })

})