import mongoose from 'mongoose';
import Product from '../models/product.js';

export const createProduct = async (productData) => {
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