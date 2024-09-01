import httpStatus from 'http-status';
import auth_services from "../services/auth_services.js";
import token_services from "../services/token_services.js";
import { sendPasswordResetEmail } from "../services/email_service.js";
import user_services from "../services/user_services.js";

const register = async (req, res, next) => {
  try {
    const user = await auth_services.register(req.body);
    const tokens = await auth_services.generateAuthTokens(user);
    res.status(201).send({ user, tokens });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await auth_services.login(req.body.email, req.body.password);
    const tokens = await auth_services.generateAuthTokens(user);
    res.send({ user, tokens });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await auth_services.logout(req.body.refreshToken);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = await token_services.generateResetPasswordToken(req.body.email);
    const user = await user_services.findUserByEmail(req.body.email)
    await sendPasswordResetEmail(resetPasswordToken, user);
    console.log("rrrrresetpaswword",resetPasswordToken)
    res.status(httpStatus.OK).send({message : 'Email for reset password sent to your registered email'});
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    await auth_services.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.OK).send({message: 'Password changed succesfully'});
  } catch (error) {
    console.log("eeeeeeeeeeeeeeee",error)
    next(error);
  }
};

export default {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
};
