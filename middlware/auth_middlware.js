import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import {tokenTypes}  from '../config/token.js';

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Unauthorized' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (payload.type !== tokenTypes.ACCESS) {
      return res.status(401).send({ message: 'Invalid token type' });
    }

    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(401).send({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

export default authenticate;
