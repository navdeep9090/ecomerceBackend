import express from 'express';
import { createReviewValidation } from '../validation/review_validation.js';
import { createReviewHandler, getProductReviewsHandler } from '../controller/review_controller.js';
import validate from '../middlware/validate_middlware.js';

const ReviewRouter = express.Router();

ReviewRouter.post('/create', validate(createReviewValidation), createReviewHandler); // Create a review
ReviewRouter.get('/:productId', getProductReviewsHandler); // Get reviews for a product

export default ReviewRouter;