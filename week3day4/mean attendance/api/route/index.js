const express = require("express");
const router = express.Router();

const studentController = require("../controller/student-controller");
const facultyController = require("../controller/faculty-controller");
const attendanceController = require("../controller/attendance-controller");
const userController = require("../controller/user-controller");
const courseController = require("../controller/course-controller");


router.route("/login").get(studentController.studentLoginPage);
router.route("/student/profile").get(studentController.studentProfilePage);
router.route("/student/update").get(studentController.studnetUpdatePage);
router.route("/student/attendace").get(studentController.studentAttendacePage);
router.route("/student/qr-code").get(studentController.studentQrCode);

router.route("/faculty").get(facultyController.facultyHomePage);
router.route("/faculty/attendance").get(facultyController.facultyTakeAttendancePage);
router.route("/faculty/students").get(facultyController.facultyStudentsPage);
router.route("/faculty/secret-code").get(facultyController.facultySecretCodePage);
router.route("/faculty/students/add").get(facultyController.facultyAddStudentPage);



// students
router.route("/students")
    .get(studentController.studentsGetAll)
    .post(studentController.studentsAddOne);

router.route("/students/:id")
    .get(studentController.studentsGetOne)
    .put(studentController.studentsUpdateOne)
    .delete(studentController.studentsDeleteOne)

// student course
router.route("/students/:id/courses")
    .get(courseController.courseGetAll)
    .post(courseController.courseAddOne);

router.route("/students/:id/courses/:courseId")
    .delete(courseController.courseDeleteOne);

// attendance 
router.route("/students/:id/attendance")
    .get(attendanceController.attendaceGetAll)
    .post(attendanceController.attendanceAddOne);

// user
router.route("/login")
    .post(userController.login);

// faculty

router.route("/faculties")
    .post(facultyController.facultyAddOne);

router.route("/faculties/:id")
    .get(facultyController.facultyGetOne);

// course
router.route("/courses")
    .get(courseController.getCourses)
    .post(courseController.addCourse);
    
module.exports = router;
