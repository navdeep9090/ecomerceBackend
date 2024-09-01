
import express from 'express';
import user_controller from '../controller/user_controller.js';

const usersRouter = express.Router();

usersRouter.post('/create', user_controller.createUserController);
usersRouter.get('/getbyid/:id', user_controller.getUserByIdController);
usersRouter.get('/getbyemail/:email', user_controller.getUserByEmailController);
usersRouter.put('/update/:id', user_controller.updateUserController);
usersRouter.delete('/delete/:id', user_controller.deleteUserController);

export default usersRouter;