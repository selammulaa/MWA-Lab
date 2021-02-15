var express = require("express");
var router = express.Router();
const controllerGames = require("../controllers/games-controller");
const controllerPublisher = require("../controllers/publisher-controller");


router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gamesAddOne);


router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne)
    .put(controllerGames.gamesUpdateOne)
    .delete(controllerGames.gamesDeleteOne);

router.route("/games/:gameId/publishers")
    .get(controllerPublisher.publisherGetOne)
    .post(controllerPublisher.publisherAddOne)
    .put(controllerPublisher.publisherUpdateOne)
    .delete(controllerPublisher.publisherDeleteOne);
    

module.exports = router