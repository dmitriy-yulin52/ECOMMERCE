const Product = require('../models/productModule');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apifeatures')


exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const aptFeature = new ApiFeatures(Product.find(), req.query).search().filter();
    // const products = await Product.find();
    const products = await aptFeature.query;
    res.status(200).json({
        success: true,
        products
    })
})

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    try {
        let product = await Product.findById(id);
        if (!product) {
            return next(new ErrorHandler('Продукт не найден!', 404))
        } else {
            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
            res.status(200).json({
                success: true,
                product
            })
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Ошибка сервера!'
        })
    }
})

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return next(new ErrorHandler('Продукт не найден!', 404))
        } else {
            await product.remove();
            res.status(200).json({
                success: true,
                message: 'Продукт успешно удален'
            })
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Ошибка сервера!'
        })
    }
})


exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return next(new ErrorHandler('Продукт не найден!', 404))
        } else {
            res.status(200).json({
                success: true,
                product
            })
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Ошибка сервера!'
        })
    }
})