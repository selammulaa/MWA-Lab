const { DBRef } = require("mongodb");
const mongoose =require("mongoose");
require("./games.model.js")

const dbURL = "mongodb://localhost:27017/meanGames";

mongoose.connect(dbURL);

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to " + dbURL);
});

mongoose.connection.on("disconnected", function(){
    console.log("Mongoose disconnected.");
});


mongoose.connection.on("error ", function(err){
    console.log("Mongoose connected error " + err);
});

// signal when interrupted
process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by application termination.");
        process.exit(0);
    })
});

process.once("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by application restart.");
        process.kill(process.pid, "SIGUSR2"); 
    })
});