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
    // stock: {
    //     type: Number,
    //     // required: true,
    //     min: 0,
    // },
    images: [
        {
            type: [String],
            required: true,
        },
    ],
    type: {
        type: String,
        required:true, 
        trim: true,
    },
    offer: {
        type: String, 
        trim: true,
    },
    sizes: [
        {
            size: { type: String, required: true },
            stock: { type: Number, required: true, min: 0 },  
        },
    ],
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
            rating: { type: Number, min: 0, max: 5 }, 
            comment: { type: String, trim: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: { type: String, trim: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Product', productSchema);

//  offer 20%off
// size  
//type
//review
//comment


//favrt  schema