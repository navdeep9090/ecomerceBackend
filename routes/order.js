import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from '../controller/order_controller.js';

const OrderRouter = express.Router();

OrderRouter.post('/orders', createOrder);

OrderRouter.get('/orders', getAllOrders);

OrderRouter.get('/orders/:id', getOrderById);

OrderRouter.put('/orders/:id', updateOrder);

OrderRouter.delete('/orders/:id', deleteOrder);

export default OrderRouter;
