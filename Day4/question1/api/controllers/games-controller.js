const mongoose = require('mongoose');
const Game = mongoose.model("Games");

module.exports.gamesGetAll = function(req, res){

    var offset = 0;
    var count = 5;
    const maxCount = 7;

    const response = {
        status : 200,
        message : ""
    };

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }

    if(req.query && req.query.count){
        count = parseInt(req.query.count);
    }

    if(isNaN(count) || isNaN(offset)){
        response.status = 404;
        response.message = "QueryString offset and count should be numbers";
        res.status(response.status).json(response.message);
        return;
    }
    if(count > maxCount){
        response.status = 400;
        response.message = "Count exceeds maximum of " + maxCount;
        res.status(response.status).json(response.message);
        return;
    }

    Game.find().skip(offset).limit(count).exec(function(err, games){
        if(err){
            response.status = 500;
            response.message = err;
        }else {
            response.status = 200;
            response.message = games;

        }
        res.status(response.status).json(response.message);


    });

}

module.exports.gamesGetOne = function(req, res){

    const gameId = req.params.gameId;

    Game.findById(gameId).exec(function(err, game){
        const response = {
            status : 200,
            message : game
        };

        if(err){
            response.status = 500;
            response.message = err;
            return;
        }else if(!game){
            response.status = 400;
            response.message = "Game ID not found.";
        }
        
        res.status(response.status).json(response.message);
    });
}