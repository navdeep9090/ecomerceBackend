import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;
const addressSchema = new Schema({
  street: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  postalCode: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
});


// Define the User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    private: true,

  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  alternatePhoneNumber: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  addresses: {
    billing: addressSchema,
    shipping: addressSchema,
  },
  orderHistory: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        // required: true,
      },
      orderDate: {
        type: Date,
        // required: true,
      },
      totalAmount: {
        type: Number,
        // required: true,
      },
    },
  ],
  wishlist: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user=this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

const User = mongoose.model('User', userSchema);

export default User;