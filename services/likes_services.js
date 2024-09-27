// services/productService.js
import Product from '../models/product.js';
import ProductLike from '../models/likes.js';

// Add a like to a product
export const addLikeToProduct = async (productId, userId) => {
  const existingLike = await ProductLike.findOne({ productId, userId });
  if (existingLike) {
    throw new Error('User has already liked this product');
  }

  const productLike = new ProductLike({ productId, userId });
  await productLike.save();

  // Optionally, update the product document to reflect likes
  await Product.findByIdAndUpdate(productId, { $push: { likes: productLike._id } });
  
  return productLike;
};

// Remove a like from a product
export const removeLikeFromProduct = async (productId, userId) => {
  const productLike = await ProductLike.findOneAndDelete({ productId, userId });
  if (!productLike) {
    throw new Error('Like not found');
  }

  // Optionally, update the product document to reflect removed likes
  await Product.findByIdAndUpdate(productId, { $pull: { likes: productLike._id } });
  
  return productLike;
};

// Get all likes for a product
export const getLikesForProduct = async (productId) => {
  return await ProductLike.find({ productId }).populate('userId', 'name');
};
