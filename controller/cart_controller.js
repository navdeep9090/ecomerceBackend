
import Cart from "../models/cart.js";
import { addToCart, getCart, removeProductFromCart, updateCart } from "../services/cart_services.js";


export const addProductToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity,size,amount} = req.body;
  try {
    const cart = await addToCart(userId, productId, quantity,size,amount );
    return res.status(200).json({ message: 'Product added to cart',cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProductToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity,size,amount} = req.body;
  try {
    const cart = await updateCart(userId, productId, quantity,size,amount );
    return res.status(200).json({ message: 'Cart data updated',cart });
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


