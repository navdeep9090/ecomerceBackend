import express from 'express';
const allRoutes = express.Router();
import authRouter from './auth_routes.js';
import usersRouter from './users.js';
import ProductRouter from './product.js';
import CartRouter from './cart.js';
import ReviewRouter from './review.js';
import LikesRouter from './likes.js';
import OrderRouter from './order.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';


allRoutes.use('/auth', authRouter);
allRoutes.use('/user', usersRouter);
allRoutes.use('/product', ProductRouter);
allRoutes.use('/cart', CartRouter);
allRoutes.use('/review', ReviewRouter);
allRoutes.use('/like',LikesRouter);
allRoutes.use('/order',OrderRouter);

const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_kVtkAyYsf8r4PV',  // Replace with your Razorpay test key ID
    key_secret: 'Zb7GD7h7HKIhwU8sfh25cb1A',  // Replace with your Razorpay test key secret
  });

  allRoutes.post('/create-order', async (req, res) => {
    // const { amount } = req.body;
  
    const options = {
      amount: 10*100 ,  // Amount in the smallest currency unit
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,  // Automatically capture the payment
      // callback_url: 'http://localhost:4000/verify-payment',
      //  redirect: true
    };
  
    try {
      const order = await razorpayInstance.orders.create(options);
      res.json(order);
      console.log("ooooooooooooooooooooooooooo,order")
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong!' });
    }
  });
  
  // Verify payment signature
  allRoutes.post('/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrr",req.body)
  
    const hmac = crypto.createHmac('sha256', 'your_test_key_secret');
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');
  
    if (generatedSignature === razorpay_signature) {
      res.status(200).send({ message: 'Payment verified successfully' });
    } else {
      res.status(400).send({ message: 'Payment verification failed' });
    }
  });

/* GET home page. */
// allRoutes.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

export default allRoutes
