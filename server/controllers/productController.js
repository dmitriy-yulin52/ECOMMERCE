const Product = require('../models/productModule');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apifeatures')


exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user =  req.user.id

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerTage = 5
    const productCount = await Product.countDocuments();

    const aptFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerTage)
    const products = await aptFeature.query;
    res.status(200).json({
        success: true,
        products,
        productCount
    })
})

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    let product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler('Продукт не найден!', 404))
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
})

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    const product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler('Продукт не найден!', 404))
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: 'Продукт успешно удален'
    })
})


exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler('Продукт не найден!', 404))
    }
    res.status(200).json({
        success: true,
        product,
    })
})