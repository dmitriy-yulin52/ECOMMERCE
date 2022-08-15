const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Внутренняя ошибка сервера';

    res.status(err.statusCode).json({
        success: false,
        error: err
    })
}