import express from 'express';
import {
    createProductHandler,
    getAllProductsHandler,
    getProductByIdHandler,
    updateProductHandler,
    deleteProductHandler,
} from '../controller/product_controller.js';

const ProductRouter = express.Router();

ProductRouter.post('/create', createProductHandler);
ProductRouter.get('/getallproduct', getAllProductsHandler);
ProductRouter.get('/getproduct/:id', getProductByIdHandler);
ProductRouter.put('/update/:id', updateProductHandler);
ProductRouter.delete('/delete/:id', deleteProductHandler);

export default ProductRouter;
