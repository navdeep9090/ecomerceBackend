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

export const getAverageRatingForProduct = async (productId) => {
  try {
    const result = await Review.aggregate([
      { $match: { productId: mongoose.Types.ObjectId(productId) } }, 
      {
        $group: {
          _id: '$productId', 
          averageRating: { $avg: '$rating' },
        },
      },
    ]);

    if (result.length === 0) {
      return { averageRating: 0 }; 
    }

    return { averageRating: result[0].averageRating };
  } catch (error) {
    throw new Error('Error calculating average rating');
  }
};
