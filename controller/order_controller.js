import * as orderService from '../services/order_services.js';

// Controller to handle creating a new order
export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to handle fetching all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to handle fetching a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderService.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to handle updating an order by ID
export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const orderData = req.body;
    const updatedOrder = await orderService.updateOrder(orderId, orderData);
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to handle deleting an order by ID
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await orderService.deleteOrder(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
