
const dbconnection = require("../data/dbconnection");
const ObjectId = require("mongodb").ObjectId;

module.exports.gamesGetAll = function(req, res){

    console.log("Get all games");
    console.log(req.query);

    var offset = 0;
    var count = 3;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }

    if(req.query && req.query.count){
        count = parseInt(req.query.count); 
        if(count > 7){
            count = 7;
        }
    }

    var db = dbconnection.get();
    var collection = db.collection("games");

    collection.find().skip(offset).limit(count).toArray(function(err, docs){
        console.log("games ", docs);
        res.status(200).json(docs);
    });


}

module.exports.gamesGetOne = function(req, res){

    var db = dbconnection.get();
    var collection = db.collection("games");
    const gameId = req.params.gameId;

    collection.findOne({_id: ObjectId(gameId)}, function(err, doc){
        console.log("GET game with gameId: ", gameId);
        res.status(200).json(doc);
    });
    
   
}

module.exports.gamesAddOne = function(req, res){
    console.log("POST to add a game");

    var db = dbconnection.get();
    var collection = db.collection("games");
    var newGame;
    if(req.body && req.body.title && req.body.price){
        newGame = req.body;
        newGame.price = parseFloat(req.body.price);
        newGame.title = req.body.title;
        console.log(newGame);
        collection.insertOne(newGame, function(err, response){
            console.log(response.ops);
            res.status(201).json(req.body);

        });

        console.log(req.body);
    }else {
        console.log("Data missing from POSt body");
        res.status(400).json({error: "Required data missing from POST"});
    }

}

