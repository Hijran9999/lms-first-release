// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', authorize('admin'), getAllUsers); // only admin can list all users
router.get('/:id', authorize('admin','instructor','student'), getUserById);
router.put('/:id', authorize('admin','instructor','student'), updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;
