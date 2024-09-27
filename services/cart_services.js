
import Product from '../models/product.js';
import Cart from '../models/cart.js';


export const addToCart = async (userId, productId, quantity,size) => {
  try {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity,size }],
        totalAmount: product.price * quantity,
      });
    } else {
      const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      cart.totalAmount += product.price * quantity;
    }

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) throw new Error('Cart not found');
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeProductFromCart = async (userId, productId) => {
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new Error('Cart not found');
    }

    const updatedItems = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.items = updatedItems;

    cart.totalAmount = updatedItems.reduce(
      (total, item) => total + item.quantity * item.productPrice,
      0
    );

    await cart.save();

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};
