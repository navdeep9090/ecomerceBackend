
import Cart from "../models/cart.js";
import { addToCart, getCart } from "../services/cart_services.js";


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
export const removeProductFromCart = async (req, res) => {
  const { userId } = req.params; // Get userId from URL params
  const { productId, size } = req.body; // Get productId and size from body

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (itemIndex > -1) {
      // Remove the product from the cart
      const product = await Product.findById(productId);
      if (!product) throw new Error('Product not found');

      // Decrease the totalAmount
      cart.totalAmount -= product.price * cart.items[itemIndex].quantity;

      // Remove the product from the cart items
      cart.items.splice(itemIndex, 1);

      // Save the updated cart
      await cart.save();

      return res.status(200).json({ message: 'Product removed from cart', cart });
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

