var express = require("express");
var app = express();

app.set("port", 5000);
var server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("Listening to port " + port)
});

