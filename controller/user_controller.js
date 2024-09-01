import user_services from "../services/user_services.js";
  
   const createUserController = async (req, res) => {
    try {
      const user = await user_services.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
   const getUserByIdController = async (req, res) => {
    try {
      const user = await user_services.findUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
   const getUserByEmailController = async (req, res) => {
    try {
      const user = await user_services.findUserByEmail(req.params.email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
   const updateUserController = async (req, res) => {
    try {
      const user = await user_services.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
   const deleteUserController = async (req, res) => {
    try {
      const user = await user_services.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export default {
    createUserController,
    getUserByIdController,
    getUserByEmailController,
    updateUserController,
    deleteUserController,
  };