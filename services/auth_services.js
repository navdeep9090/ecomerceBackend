import User from '../models/user.js';
import Token from '../models/token.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { tokenTypes } from '../config/token.js';
import token_services from './token_services.js';

const register = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new Error('Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new Error('Incorrect email or password');
  }
  return user;
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOneAndDelete({ token: refreshToken, type: tokenTypes.REFRESH });
  if (!refreshTokenDoc) {
    throw new Error('Token not found');
  }
};

const resetPassword = async (resetPasswordToken, newPassword) => {
  const resetTokenDoc = await Token.findOne({ token: resetPasswordToken, type: tokenTypes.RESET_PASSWORD });
  console.log(newPassword,"resetTokenDoc",resetTokenDoc)
  if (!resetTokenDoc || resetTokenDoc.isExpired()) {
    throw new Error('Password reset token is invalid or has expired');
  }

  const user = await User.findById(resetTokenDoc.userId);
  user.password = newPassword;
  await user.save();
   await token_services.deleteToken(resetTokenDoc._id)
};

const generateAuthTokens = async (user) => {
  const accessToken = jwt.sign({ sub: user._id, type: tokenTypes.ACCESS }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
  const refreshToken = jwt.sign({ sub: user._id, type: tokenTypes.REFRESH }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });

  await Token.create({
    token: refreshToken,
    userId: user._id,
    type: tokenTypes.REFRESH,
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return {
    accessToken,
    refreshToken,
  };
};

export default {
  register,
  login,
  logout,
  resetPassword,
  generateAuthTokens,
};
