let express = require('express');
let router = express.Router();
let coursesController = require('../controllers/courses.controller');
let verifyToken = require('../middlewares/verifyToken.js');
let allowTo = require('../middlewares/allowTo.js');
let userRoles = require('../utils/userRoles.js');


router.route("/").get(verifyToken, allowTo(userRoles.USER, userRoles.ADMIN), coursesController.getAllCourses).post(verifyToken, allowTo(userRoles.ADMIN), coursesController.createCourse);
router.route("/:courseId").get(coursesController.getCourseById).put(coursesController.updateCourse).delete(verifyToken, allowTo(userRoles.ADMIN), coursesController.deleteCourse);
module.exports = router;