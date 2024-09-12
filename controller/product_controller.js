import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../services/product_services.js';

export const createProductHandler = async (req, res) => {
    try {
        const imageFilenames = req.files.map(file => file.filename);
        const product = await createProduct(req.body,imageFilenames);
        res.status(201).json(product);
    } catch (error) {
        console.log("error create product",error)
        res.status(400).json({ message: error.message });
    }
};

export const getAllProductsHandler = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductByIdHandler = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProductHandler = async (req, res) => {
    try {
        const productId = req?.params?.id; 
        const imageFilenames = req.files ? req.files.map(file => file.filename) : [];
        const updatedData = {
            ...req.body,
        };

        if (imageFilenames.length > 0) {
            updatedData.images = imageFilenames;
        }
        const product = await updateProduct(productId, updatedData);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({message:"Product updated successfully"},product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProductHandler = async (req, res) => {
    try {
        const product = await deleteProduct(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
