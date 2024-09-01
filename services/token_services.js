import jwt from 'jsonwebtoken';
import Token from '../models/token.js';
import User from '../models/user.js';
import { tokenTypes } from '../config/token.js';

const generateResetPasswordToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('No user found with this email');
  }

  const resetToken = jwt.sign({ sub: user._id, type: tokenTypes.RESET_PASSWORD }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

  await Token.create({
    token: resetToken,
    userId: user._id,
    type: tokenTypes.RESET_PASSWORD,
    expires: Date.now() + 3600000, 
  });

  return resetToken;
};

const deleteToken = async (tokenId) => {
  try {
    const tokenDoc = await Token.findByIdAndDelete(tokenId);

    if (!tokenDoc) {
      console.log('Token not found');
    } else {
      console.log('Token successfully deleted');
    }
  } catch (error) {
    console.error('Error deleting token:', error);
  }
};
export default {
  generateResetPasswordToken,
  deleteToken,
};
