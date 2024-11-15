import Joi from 'joi';

export const createReviewValidation = {
  body: Joi.object({
    productId: Joi.string().required(),
    userId: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().optional().allow(''), // Optional review comment
  }),
};
export const getProductRatingValidation = {params:Joi.object({
  productId: Joi.string().trim().required().messages({
    'string.empty': 'Product id is required',
    'any.required': 'Product id is required',
  }),
})};