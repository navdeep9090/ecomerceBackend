

import Joi from 'joi';

export const addToCartValidation = {
  params: Joi.object({
    userId: Joi.string().required(),
  }),
  body: Joi.object({
    productId: Joi.string().required().messages({
      'string.empty': 'Product ID is required',
      'any.required': 'Product ID is required',
    }),
    quantity: Joi.number().min(1).required().messages({
      'number.base': 'Quantity must be a number',
      'number.min': 'Quantity must be at least 1',
      'any.required': 'Quantity is required',
    }),
    size: Joi.string().required().messages({
      'string.empty': 'Size is required',
      'any.required': 'Size is required',
    }),
  }),
};

export const getCartValidation = {
    params: Joi.object({
      userId: Joi.string().required().messages({
        'string.empty': 'User ID is required',
        'any.required': 'User ID is required',
      }),
    }),
  };

  export const removeFromCartValidation = {
    params: Joi.object({
      userId: Joi.string().required().messages({
        'string.empty': 'User ID is required',
        'any.required': 'User ID is required',
      }),
    }),
    body: Joi.object({
      productId: Joi.string().required().messages({
        'string.empty': 'Product ID is required',
        'any.required': 'Product ID is required',
      }),
      size: Joi.string().required().messages({
        'string.empty': 'Size is required',
        'any.required': 'Size is required',
      }),
    }),
  };