// controllers/courseController.js
const Course = require('../models/Course');

exports.createCourse = async (req, res, next) => {
  try {
    const { title, code, description, startDate, endDate } = req.body;
    const instructor = req.user.id;
    const course = await Course.create({ title, code, description, startDate, endDate, instructor });
    res.status(201).json(course);
  } catch (err) { next(err); }
};

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('instructor', 'fullName email');
    res.json(courses);
  } catch (err) { next(err); }
};

exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'fullName email');
    if (!course) return res.status(404).json({ message: 'Not found' });
    res.json(course);
  } catch (err) { next(err); }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (err) { next(err); }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) { next(err); }
};
