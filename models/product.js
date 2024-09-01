// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    images: [
        {
            type: String,
            required: true,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Product', productSchema);
