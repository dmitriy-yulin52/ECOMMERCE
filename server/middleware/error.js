const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Внутренняя ошибка сервера';


    if (err.name === 'CastError') {
        const message = 'Ресурс не найден!'
        err = new ErrorHandler(message, 400)
    }

    if (err.code === 11000) {
        const message = `Пользователь с таким email уже есть`
        err = new ErrorHandler(message, 400)
    }

    if (err.name === "JsonWebTokenError") {
        const message = `Веб-токен Json недействителен, повторите попытку `;
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
        const message = `Срок действия веб-токена Json истек, повторите попытку `;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}