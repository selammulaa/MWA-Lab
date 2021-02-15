const express = require("express");
const router = express.Router();

const studentController = require("../controller/student-controller");
const facultyController = require("../controller/faculty-controller");
const attendanceController = require("../controller/attendance-controller");
const userController = require("../controller/user-controller");


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


// attendance 
router.route("/students/:id/attendance")
    .get(attendanceController.attendaceGetAll)
    .post(attendanceController.attendanceAddOne);

// userr
router.route("/login")
    .post(userController.login);
    
module.exports = router;
