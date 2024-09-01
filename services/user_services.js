

import User from "../models/user.js";

 const createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

 const findUserById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    throw new Error(`Error finding user by ID: ${error.message}`);
  }
};

 const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error(`Error finding user by email: ${error.message}`);
  }
};

 const updateUser = async (userId, updateData) => {
  try {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

 const deleteUser = async (userId) => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

export default {
    createUser,
    findUserById,
    findUserByEmail,
    updateUser,
    deleteUser,
  };