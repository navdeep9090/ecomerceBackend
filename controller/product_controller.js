import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getAllProductsForUser,
} from '../services/product_services.js';

export const createProductHandler = async (req, res) => {
    try {
        const productData=req.body
        const imageFilenames = req.files.map(file => file.filename);
        const priceAfterOffer = productData?.offer>0?productData?.price - (productData?.price * (productData?.offer / 100)):0;
           productData.priceAfterOffer=priceAfterOffer
          productData.images=imageFilenames
        const product = await createProduct(productData);
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
export const getAllProductsUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const products = await getAllProductsForUser(userId);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
        const priceAfterOffer = updatedData?.offer>0?updatedData?.price - (updatedData?.price * (updatedData?.offer / 100)):0;
        updatedData.priceAfterOffer=priceAfterOffer
        const product = await updateProduct(productId, updatedData);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({message:"Product updated successfully",product});
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

export const getProductsByCategoryController = async (req, res) => {
    try {
      const { category } = req.params;
  
      const products = await getProductsByCategory(category);
  
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

