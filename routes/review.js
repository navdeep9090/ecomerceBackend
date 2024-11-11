import express from 'express';
import { createReviewValidation, getProductRatingValidation } from '../validation/review_validation.js';
import { createReviewHandler, getProductRatingController, getProductReviewsHandler } from '../controller/review_controller.js';
import validate from '../middlware/validate_middlware.js';

const ReviewRouter = express.Router();

ReviewRouter.post('/create', validate(createReviewValidation), createReviewHandler); // Create a review
ReviewRouter.get('/:productId', getProductReviewsHandler); // Get reviews for a product
ReviewRouter.get('/averageRating/:productId/',validate(getProductRatingValidation), getProductRatingController);


export default ReviewRouter;