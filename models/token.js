import mongoose from 'mongoose';
import { tokenTypes } from '../config/token.js';

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
tokenSchema.methods.isExpired = function() {
  return this.expiresAt < new Date();
};
const Token = mongoose.model('Token', tokenSchema);

export default Token;