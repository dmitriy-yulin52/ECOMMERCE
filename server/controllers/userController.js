const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const User = require('../models/userModel');
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail');
const crypto = require("crypto");


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

    console.log(user)
    sendToken(user, 201, res)
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

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Неправильный пароль или email!', 401))
    }

    sendToken(user, 200, res)
});


exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return next(new ErrorHandler('Пользователь не найден', 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Ваш токен для сброса пароля - это :-\n\n ${resetPasswordUrl} \n\nесли вы не запрашивали это электронное письмо, пожалуйста, проигнорируйте его`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        })

        res.status(200).json({
            success: true,
            message: `Электронное письмо, отправленно успешно на ${user.email}`
        })
    } catch (e) {
        user.getResetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(e.message, 500));
    }

})

exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Вышел из системы'
    })
})


exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    });

    if (!user) {
        return next(new ErrorHandler('Токен сброса пароля недействителен или срок его действия истек', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Пароль не является паролем', 400))
    }

    user.password = req.body.password;
    user.getResetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);

})