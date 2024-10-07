import express from 'express';
import { addLikeHandler, getLikesHandler, removeLikeHandler } from '../controller/likes_controller.js';


const LikesRouter = express.Router();

LikesRouter.post('/add/:productId',addLikeHandler); 
LikesRouter.delete('/:productId/like', removeLikeHandler); 
LikesRouter.get('/likes/:productId', getLikesHandler); 

export default LikesRouter;
