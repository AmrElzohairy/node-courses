const asyncHandler = require('express-async-handler');
let Course = require("../models/courseSchema.js");
let statusMessage = require("../utils/statusMessage.js");

let getAllCourses = asyncHandler(async (req, res) => {
  let query = req.query;
  let page = parseInt(query.page);
  let limit = parseInt(query.limit) || 10;
  let skip = (page - 1) * limit;
  
  let courses = await Course.find({}, {__v: 0}).skip(skip).limit(limit);
  res.status(200).json({
    "status": statusMessage.SUCCESS,
    "data": { courses }
  });
});

let getCourseById = asyncHandler(async (req, res) => {
  let courseId = req.params.courseId;
  let course = await Course.findById(courseId);
  
  if (course) {
    res.status(200).json({
      "status": statusMessage.SUCCESS,
      "data": { course }
    });
  } else {
    res.status(404).json({
      "status": statusMessage.FAIL,
      "message": "Course not found"
    });
  }
});

let createCourse = asyncHandler(async (req, res) => {
  let course = new Course(req.body);
  await course.save();
  res.status(201).json({
    "status": statusMessage.SUCCESS,
    "data": { course }
  });
});

let updateCourse = asyncHandler(async (req, res) => {
  let courseId = req.params.courseId;
  let course = await Course.findByIdAndUpdate(courseId, { $set: { ...req.body } });
  
  if (course) {
    res.status(200).json({
      "status": statusMessage.SUCCESS,
    });
  } else {
    res.status(404).json({
      "status": statusMessage.FAIL,
      "message": "Course not found"
    });
  }
});

let deleteCourse = asyncHandler(async (req, res) => {
  let courseId = req.params.courseId;
  let course = await Course.findByIdAndDelete(courseId);
  
  if (course) {
    res.status(200).json({
      "status": statusMessage.SUCCESS,
    });
  } else {
    res.status(404).json({
      "status": statusMessage.FAIL,
      "message": "Course not found"
    });
  }
});

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};