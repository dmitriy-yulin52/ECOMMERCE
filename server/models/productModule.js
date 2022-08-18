const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Пожалуйста, введите название продукта"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Пожалуйста, введите описание продукта"],
    },
    price: {
        type: Number,
        required: [true, "Пожалуйста, введите цену продукта"],
        maxLength: [8, "Цена не может превышать 8 символов"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Пожалуйста, введите категорию продукта"],
    },
    Stock: {
        type: Number,
        required: [true, "Пожалуйста, введите ассортимент продукции"],
        maxLength: [4, "Aссортимент не может превышать 4 символов"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

mongoose.isValidObjectId(new mongoose.Types.ObjectId())

module.exports = mongoose.model('Product', productSchema);