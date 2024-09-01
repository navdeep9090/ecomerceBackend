import Product from '../models/product.js';

export const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

export const getAllProducts = async () => {
    return await Product.find({});
};

export const getProductById = async (productId) => {
    return await Product.findById(productId);
};

export const updateProduct = async (productId, productData) => {
    return await Product.findByIdAndUpdate(productId, productData, { new: true });
};

export const deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
};
