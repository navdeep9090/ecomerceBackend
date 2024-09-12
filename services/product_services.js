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
