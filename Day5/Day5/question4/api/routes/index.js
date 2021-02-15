var express = require("express");
var router = express.Router();
const controllerStudents = require("../controllers/students-controller");
const controllerAddress = require("../controllers/address-controller");


// api/students/
// api/students/1537
// api/students/1537/addresses
// api/students/1537/addresses/1123

router.route("/students")
    .get(controllerStudents.studentsGetAll)
    .post(controllerStudents.studentsAddOne);

router.route("/students/:studentId")
    .get(controllerStudents.studentsGetOne)
    .put(controllerStudents.studentsUpdateOne)
    .delete(controllerStudents.studentsDeleteOne);

router.route("/students/:studentId/addresses")
    .get(controllerAddress.addressesGetAll)
    .post(controllerAddress.addressAddOne);

router.route("/students/:studentId/addresses/:addressId")
    .get(controllerAddress.addressesGetOne)
    .put(controllerAddress.addressUpdateOne)
    .delete(controllerAddress.addressDeleteOne);

module.exports = router;