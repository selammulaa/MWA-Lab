var express = require("express");
var router = express.Router();
const controllerStudents = require("../controllers/students-controller");
const controllerAddress = require("../controllers/address-controller");


// api/students/
// api/students/1537
// api/students/1537/addresses
// api/students/1537/addresses/1123

router.route("/students").get(controllerStudents.studentsGetAll);
router.route("/students/:studentId").get(controllerStudents.studentsGetOne);
router.route("/students/:studentId/addresses").get(controllerAddress.addressesGetAll);
router.route("/students/:studentId/addresses/:addressId").get(controllerAddress.addressesGetOne);

module.exports = router;