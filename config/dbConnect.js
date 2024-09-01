import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI = "mongodb://127.0.0.1:27017/ecomerce";
    mongoose.connect(mongoURI)
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(`MongoDB connect error : ${error}`);
  }
};
