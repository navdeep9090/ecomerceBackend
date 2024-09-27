import express from 'express';
const allRoutes = express.Router();
import authRouter from './auth_routes.js';
import usersRouter from './users.js';
import ProductRouter from './product.js';
import CartRouter from './cart.js';
import ReviewRouter from './review.js';
import LikesRouter from './likes.js';


allRoutes.use('/auth', authRouter);
allRoutes.use('/user', usersRouter);
allRoutes.use('/product', ProductRouter);
allRoutes.use('/cart', CartRouter);
allRoutes.use('/review', ReviewRouter);
allRoutes.use('/review', LikesRouter);




/* GET home page. */
// allRoutes.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

export default allRoutes
