
import Cart from "../models/cart.js";
import { addToCart, getCart, removeProductFromCart } from "../services/cart_services.js";


export const addProductToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity,size} = req.body;
  try {
    const cart = await addToCart(userId, productId, quantity,size );
    return res.status(200).json({ message: 'Product added to cart',cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await getCart(userId);
    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProductFromCartController = async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.body; 
 console.log(productId,"ddddddddddddddddddddddddd",userId)
  try {
    const updatedCart = await removeProductFromCart(userId, productId);
    res.status(200).json({
      message: 'Product removed from cart',
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


