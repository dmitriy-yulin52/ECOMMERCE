const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const User = require('../models/userModel');
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail');
const crypto = require("crypto");
const cloudinary = require('cloudinary')

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    const {name, email, password} = req.body;

    console.log(name, email, password, 'name,email,password')

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    })

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

    sendToken(user, 200, res);

});


exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
});


exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Старый пароль неверен!', 400))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler('Пароль не совпадает', 400))
    }

    user.password = req.body.newPassword;
    await user.save()

    sendToken(user, 200, res)
});


exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindModify: false
    })
    res.status(200).json({
        success: true,
        message: 'Успешно'
    })
});

//admin
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})

//admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`Пользователь не существует с идентификатором ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
    })
})

//admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindModify: false
    })
    res.status(200).json({
        success: true,
        message: 'Успешно'
    })
});

//admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`Пользователь не существует с идентификатором ${req.params.id}`))
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: 'Пользователь удален!'
    })
});
