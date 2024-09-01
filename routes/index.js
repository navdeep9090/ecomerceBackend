import express from 'express';
const allRoutes = express.Router();
import authRouter from './auth_routes.js';
import usersRouter from './users.js';
import ProductRouter from './product.js';


allRoutes.use('/auth', authRouter);
allRoutes.use('/user', usersRouter);
allRoutes.use('/product', ProductRouter);

/* GET home page. */
// allRoutes.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

export default allRoutes
