import mongoose from 'mongoose';
import Product from '../models/product.js';

export const createProduct = async (productData,imageFilenames) => {
 productData.images=imageFilenames
    const product = new Product({
        ...productData
    });
    return await product.save();
};

export const getAllProducts = async () => {
    return await Product.find({});
};

export const getProductById = async (productId) => {
    return await Product.findById(productId);
};

export const updateProduct = async (productId, updatedData) => {
    return await Product.findByIdAndUpdate(productId, updatedData, {
        new: true, 
        runValidators: true, 
    });
};

export const deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
};

export const getProductsByCategory = async (category) => {
    try {
      // Fetch products that match the category
      const products = await Product.find({ category: category.trim() });
  
      if (!products.length) {
        throw new Error('No products found for this category.');
      }
  
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const getAverageRatingForProduct = async (productId) => {
    try {
      const result = await Review.aggregate([
        { $match: { productId: mongoose.Types.ObjectId(productId) } }, 
        {
          $group: {
            _id: '$productId', 
            averageRating: { $avg: '$rating' },
          },
        },
      ]);
  
      if (result.length === 0) {
        return { averageRating: 0 }; 
      }
  
      return { averageRating: result[0].averageRating };
    } catch (error) {
      throw new Error('Error calculating average rating');
    }
  };

  export const getAllProductsForUser = async (userId) => {
    try {
      const products = await Product.aggregate([
        {
          $lookup: {
            from: 'productlikes', 
            localField: '_id',    
            foreignField: 'product', 
            as: 'likes',           
          },
        },
        {
          $addFields: {
            userHasLiked: {
              $in: [new mongoose.Types.ObjectId(userId), '$likes.user'], 
            },
          },
        },
        {
          $project: {
            name: 1,
            description: 1,
            price: 1,
            category: 1,
            images: 1,
            type: 1,
            offer: 1,
            sizes: 1,
            createdAt: 1,
            userHasLiked: 1,  
          },
        },
      ]);
  
      return products;
    } catch (error) {
      throw new Error('Error fetching products with user likes');
    }
  };