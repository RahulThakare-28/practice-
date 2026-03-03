const express = require('express');
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

// Four CRUD APIs
router.post('/users', createUser);    // Create
router.get('/users', getAllUsers);    // Read
router.put('/users/:id', updateUser); // Update
router.delete('/users/:id', deleteUser); // Delete

module.exports = router;
