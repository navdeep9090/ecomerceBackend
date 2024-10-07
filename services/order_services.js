import { Order } from "../models/order.js";

// Service to create a new order
export const createOrder = async (orderData) => {
  const newOrder = new Order(orderData);
  return await newOrder.save();
};

// Service to get all orders
export const getAllOrders = async () => {
  return await Order.find();
};

// Service to get a specific order by ID
export const getOrderById = async (orderId) => {
  return await Order.findById(orderId);
};

// Service to update an order by ID
export const updateOrder = async (orderId, orderData) => {
  return await Order.findByIdAndUpdate(orderId, orderData, { new: true });
};

// Service to delete an order by ID
export const deleteOrder = async (orderId) => {
  return await Order.findByIdAndDelete(orderId);
};
