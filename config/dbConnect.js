import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // const mongoURI = "mongodb://127.0.0.1:27017/ecomerce";
    const mongoURI = "mongodb+srv://bharatonclick:yiLQOsfknT6UqaJC@cluster0.ewvjm.mongodb.net/mustacheguts?retryWrites=true&w=majority&appName=Cluster0";
    // const mongoURI = "mongodb+srv://bharatonclick:<db_password>@cluster0.ewvjm.mongodb.net/";
    mongoose.connect(mongoURI)
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(`MongoDB connect error : ${error}`);
  }
};
