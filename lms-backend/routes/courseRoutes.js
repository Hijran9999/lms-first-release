// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const {
  createCourse, getCourses, getCourse, updateCourse, deleteCourse
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, getCourses);
router.post('/', protect, authorize('instructor','admin'), createCourse);
router.get('/:id', protect, getCourse);
router.put('/:id', protect, authorize('instructor','admin'), updateCourse);
router.delete('/:id', protect, authorize('instructor','admin'), deleteCourse);

module.exports = router;
