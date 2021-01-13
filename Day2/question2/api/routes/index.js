var express = require("express");
var router = express.Router();

const controllerAddition = require("../controllers/additon-controller");

router.route("/add/:num1").get(controllerAddition.addTwoNumbers);

module.exports = router;