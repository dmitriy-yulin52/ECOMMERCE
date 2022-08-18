const catchAsyncErrors = require('./catchAsyncErrors')
const ErrorHandler = require("../utils/errorHandler");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const {token} = req.cookies;
    console.log(token,'token')
    console.log(req.cookies,'req')

    if (!token) {
        return next(new ErrorHandler('Пожалуйста, войдите в систему, чтобы получить доступ к этому ресурсу', 401))
    }

    const decodeDate = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodeDate.id);

    next();
});


exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Роли ${req.user.role} не разрешен доступ к этому ресурсу!`, 403))
        }
        next();
    };
};