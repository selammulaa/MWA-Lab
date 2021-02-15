const express = require("express");
const router = express.Router();

const jobOpeningsController = require("../controller/jobOpenings-controller");
const locationsController = require("../controller/location-controller");
const skillsController = require("../controller/skills-controller");
const reviewsController = require("../controller/review-controller");

router.route("/jobOpenings")
    .get(jobOpeningsController.jobOpeningsGetAll)
    .post(jobOpeningsController.jobOpeningsAddOne);

router.route("/jobOpenings/:id")
    .get(jobOpeningsController.jobOpeningsGetOne)
    .put(jobOpeningsController.jobOpeningsUpdateOne)
    .delete(jobOpeningsController.jobOpeningsDeleteOne);

router.route("/jobOpenings/:id/location")
    .get(locationsController.locationGetOne)
    .post(locationsController.locationAddOne)
    .delete(locationsController.locationDeleteOne);

router.route("/jobOpenings/:id/skills/")
    .get(skillsController.skillsGetAll)
    .post(skillsController.skillsAddOne);

router.route("/jobOpenings/:id/skills/:skillId")
    .get(skillsController.skillsGetOne)
    .put(skillsController.skillsUpdateOne)
    .delete(skillsController.skillsDeleteOne)


module.exports = router;