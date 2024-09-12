import express from 'express';
import {
    createProductHandler,
    getAllProductsHandler,
    getProductByIdHandler,
    updateProductHandler,
    deleteProductHandler,
} from '../controller/product_controller.js';
import { uploadImages } from '../middlware/upload_middlware.js';
import validate from '../middlware/validate_middlware.js';
import { ProductValidation, updateProductValidation } from '../validation/product_validation.js';

const ProductRouter = express.Router();

ProductRouter.post('/create', validate(ProductValidation),uploadImages, createProductHandler);
ProductRouter.get('/getallproduct', getAllProductsHandler);
ProductRouter.get('/getproduct/:id', getProductByIdHandler);
ProductRouter.put('/update/:id', validate(updateProductValidation),uploadImages, updateProductHandler);
ProductRouter.delete('/delete/:id', deleteProductHandler);

export default ProductRouter;
