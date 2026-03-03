const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ message: 'User created successfully', data: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user', error: error.message });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'Users fetched successfully', count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update user', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete user', error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
};
