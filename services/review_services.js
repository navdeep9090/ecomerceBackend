import Review from "../models/review.js";

export const createReview = async ({ productId, userId, rating, comment }) => {
  const review = new Review({
    productId,
    userId,
    rating,
    comment,
  });
  await review.save();
  return review;
};

export const getReviewsByProductId = async (productId) => {
  return await Review.find({ productId }).populate('userId', 'name');
};

