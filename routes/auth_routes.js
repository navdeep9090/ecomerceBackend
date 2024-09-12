import express from 'express';
import auth_controller from '../controller/auth_controller.js';
import validate from '../middlware/validate_middlware.js';
import auth_validation from '../validation/auth_validation.js';
import authenticate from '../middlware/auth_middlware.js';
import passport from 'passport';

const authRouter = express.Router();

authRouter.post('/register', validate(auth_validation.register), auth_controller.register);
authRouter.post('/login', validate(auth_validation.login), auth_controller.login);
authRouter.post('/logout', authenticate, auth_controller.logout);
authRouter.post('/forgot-password', validate(auth_validation.forgotPassword), auth_controller.forgotPassword);
authRouter.post('/reset-password', validate(auth_validation.resetPassword), auth_controller.resetPassword);
authRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }));
authRouter.get('/google/callback',passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      const token = req.user.token;  
    res.redirect(`http://localhost:4000/dashboard?token=${token}`);
    });
    authRouter.get('/facebook',passport.authenticate('facebook'));
    authRouter.get('facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/' }),
        (req, res) => {
          res.redirect('/');
        });

export default authRouter;
