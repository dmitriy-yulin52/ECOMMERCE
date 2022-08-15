const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Внутренняя ошибка сервера';


    if(err.name === 'CastError'){
        const message = 'Ошибочка!'
        err = new ErrorHandler(message,404)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.name
    })
}