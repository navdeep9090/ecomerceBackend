// cartRoutes.js

import express from 'express';
import validate from '../middlware/validate_middlware.js';
import {  addToCartValidation, deleteProductValidation, getCartValidation } from '../validation/cart_validation.js';
import { addProductToCart, getUserCart,deleteProductFromCartController, updateProductToCart } from '../controller/cart_controller.js';


const CartRouter = express.Router();

// Route for adding a product to the cart with validation
CartRouter.post('/add-to-cart/:userId',validate(addToCartValidation), addProductToCart);

CartRouter.post('/update-to-cart/:userId',validate(addToCartValidation), updateProductToCart);

// Route for getting the cart of a user with validation
CartRouter.get('/:userId', validate(getCartValidation), getUserCart);

CartRouter.post('/remove-from-cart/:productId',validate(deleteProductValidation),deleteProductFromCartController );


export default CartRouter;
