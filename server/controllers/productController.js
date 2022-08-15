const Product = require('../models/productModule');
const ErrorHandler = require('../utils/errorHandler')


exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })
}

exports.updateProduct = async (req, res) => {
    const id = req.params.id;

    try {
        let product = await Product.findById(id);
        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Продукт не найден!'
            })
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true,
            product
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Ошибка сервера!'
        })
    }
}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Продукт не найден!'
            })
        }
        await product.remove();
        res.status(200).json({
            success: true,
            message: 'Продукт успешно удален'
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Ошибка сервера!'
        })
    }
}


exports.getProductDetails = async (req, res, next) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        if (!product) {
            next(new ErrorHandler('Продукт не найден!',404))
        }
        res.status(200).json({
            success: true,
            product
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Ошибка сервера!'
        })
    }
}