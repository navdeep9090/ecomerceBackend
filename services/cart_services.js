
import Product from '../models/product.js';
import Cart from '../models/cart.js';


// export const addToCart = async (userId, productId, quantity,size) => {
//   try {
//     const product = await Product.findById(productId);
//     if (!product) throw new Error('Product not found');

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({
//         userId,
//         items: [{ productId, quantity,size }],
//         totalAmount: product.price * quantity,
//       });
//     } else {
//       const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

//       if (itemIndex > -1) {
//         cart.items[itemIndex].quantity += quantity;
//       } else {
//         cart.items.push({ productId, quantity });
//       }

//       cart.totalAmount += product.price * quantity;
//     }

//     await cart.save();
//     return cart;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };
export const addToCart = async (userId, productId, quantity, size) => {
  try {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');
    const price = product.offer > 0 
      ? product.price - (product.price * (product.offer / 100)) 
      : product.price;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
     
      cart = new Cart({
        userId,
        items: [{ 
          productId, 
          quantity, 
          size, 
          amount: price * quantity 
        }],
        totalAmount: price * quantity, 
      });
    } else {
     
      const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].amount = price * cart.items[itemIndex].quantity;
      } else {
        cart.items.push({ 
          productId, 
          quantity, 
          size, 
          amount: price * quantity 
        });
      }

      
      cart.totalAmount = cart.items.reduce((acc, item) => acc + item.amount, 0);
    }

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCart = async (userId, productId, quantity, size) => {
  try {
    // Find the product to get its price and offer
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    // Find the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('Cart not found');

    // Find the index of the product in the cart
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex === -1) {
      throw new Error('Product not found in the cart');
    }

    // Update quantity or size
    if (quantity !== undefined) {
      cart.items[itemIndex].quantity = quantity;
    }

    if (size) {
      cart.items[itemIndex].size = size;
    }

    // Recalculate the amount for this item (consider offer if applicable)
    const price = product.offer > 0 
      ? product.price - (product.price * (product.offer / 100)) // Apply the offer
      : product.price;

    cart.items[itemIndex].amount = price * cart.items[itemIndex].quantity;

    // Recalculate the total amount for the cart
    cart.totalAmount = cart.items.reduce((total, item) => total + item.amount, 0);

    // Save the updated cart
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
      (total, item) => total + item.amount, 0 
    );

    await cart.save();

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

