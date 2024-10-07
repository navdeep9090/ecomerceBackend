import { addLikeToProduct, getLikesForProduct, removeLikeFromProduct } from "../services/likes_services.js";

  
  // Add a like to a product
  export const addLikeHandler = async (req, res) => {
    try {
      const { productId } = req.params;
      const { userId } = req.body;
      const productLike = await addLikeToProduct(productId, userId);
      return res.status(201).json({ message: 'Like added successfully', productLike });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  
  // Remove a like from a product
  export const removeLikeHandler = async (req, res) => {
    try {
      const { productId } = req.params;
      const { userId } = req.body; // Ensure userId is passed in the request body
  
      await removeLikeFromProduct(productId, userId);
      return res.status(200).json({ message: 'Like removed successfully' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  
  // Get all likes for a product
  export const getLikesHandler = async (req, res) => {
    try {
      const { productId } = req.params;
  
      const likes = await getLikesForProduct(productId);
      return res.status(200).json(likes);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  