const mongoose = require("mongoose");
require("./menus-model");
require("./users-mdoel");

const dbURL = "mongodb://localhost:27017/RestaurantDb";
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to " + dbURL);
});

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