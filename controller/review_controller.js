import { createReview, getAverageRatingForProduct, getReviewsByProductId } from "../services/review_services.js";

export const createReviewHandler = async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;
    const review = await createReview({ productId, userId, rating, comment });
    return res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

export const getProductReviewsHandler = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await getReviewsByProductId(productId);
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};
export const getProductRatingController = async (req, res) => {
  try {
    const { productId } = req.params;

    const { averageRating } = await getAverageRatingForProduct(productId);

    res.status(200).json({ averageRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};