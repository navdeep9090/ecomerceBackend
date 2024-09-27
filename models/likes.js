// models/ProductLike.js
import mongoose from 'mongoose';

const productLikeSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductLike = mongoose.model('ProductLike', productLikeSchema);
export default ProductLike;
