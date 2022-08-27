const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apifeatures')


exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

exports.getAllProducts = catchAsyncErrors(async (req, res,next) => {

    const resultPerPage = 8
    const productCount = await Product.countDocuments();

    const aptFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage)
    const products = await aptFeature.query;
    const filteredProductsCount  = products.length
    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount
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

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating
                rev.comment = comment
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
        avg = avg + rev.rating
    })
    product.ratings = avg / product.reviews.length;

    await product.save({
        validateBeforeSave: false
    });
    res.status(200).json({
        success: true,
    })
})


exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler('Продукт не найден!', 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});


exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler('Продукт не найден!', 404))
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

    let avg = 0;
    reviews.forEach((rev) => {
        avg = avg + rev.rating
    })
    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})
