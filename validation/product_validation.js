import Joi from "joi";
import { objectId } from "./custom_validation.js";

export const ProductValidation = {
  body: Joi.object().keys({
    name: Joi.string().trim().required().min(1).max(255),
    description: Joi.string().trim().required(),
    price: Joi.number().required().min(0),
    category: Joi.string().trim().required(),
    // stock: Joi.number().min(0), // Uncomment if stock becomes required
    images: Joi.array().items(Joi.string().required()).required(),
    type: Joi.string().trim().required(),
    offer:Joi.number().min(0).optional(),
    sizes: Joi.array()
      .items(
        Joi.object({
          size: Joi.string().required(),
          stock: Joi.number().required().min(0),
        })
      )
      .required(),
  }),
};
export const updateProductValidation = {
    params: Joi.object({
      id: Joi.string().required().custom(objectId), 
    }),
    body: Joi.object({
      name: Joi.string().trim().min(1).max(255).optional(),
      description: Joi.string().trim().min(10).optional(),
      price: Joi.number().min(0).optional(),
      category: Joi.string().trim().optional(),
      images: Joi.array().items(Joi.string()).optional(),
      type: Joi.string().trim().optional(),
      offer: Joi.number().min(0).optional(),
      sizes: Joi.array()
        .items(
          Joi.object({
            size: Joi.string().optional(),
            stock: Joi.number().min(0).optional(),
          })
        )
        .optional(),
    }).min(1), 
  };;
  
  export const getProductByCategoryValidation = {params:Joi.object({
    category: Joi.string().trim().required().messages({
      'string.empty': 'Category is required',
      'any.required': 'Category is required',
    }),
  })};

 