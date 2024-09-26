// cartRoutes.js

import express from 'express';
import validate from '../middlware/validate_middlware.js';
import {  addToCartValidation, getCartValidation, removeFromCartValidation } from '../validation/cart_validation.js';
import { addProductToCart, getUserCart } from '../controller/cart_controller.js';


const CartRouter = express.Router();

// Route for adding a product to the cart with validation
CartRouter.post('/add-to-cart/:userId',validate(addToCartValidation), addProductToCart);

// Route for getting the cart of a user with validation
CartRouter.get('/:userId', validate(getCartValidation), getUserCart);

CartRouter.get('/remove-from-cart/:userId',validate(removeFromCartValidation) );


export default CartRouter;
