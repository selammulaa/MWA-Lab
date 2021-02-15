const mongoos =require("mongoose");
const Game = mongoos.model("Games");

module.exports.publisherGetOne = function(req, res){
    var gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){
        var publisher = game.publisher;

        res.status(200).json(publisher);
    })
}