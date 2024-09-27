import express from 'express';
import { addLikeHandler, getLikesHandler, removeLikeHandler } from '../controller/likes_controller.js';


const LikesRouter = express.Router();

LikesRouter.post('/:productId/like', addLikeHandler); // Add like
LikesRouter.delete('/:productId/like', removeLikeHandler); // Remove like
LikesRouter.get('/:productId/likes', getLikesHandler); // Get all likes

export default LikesRouter;
