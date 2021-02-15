require("./api/data/db");

const bodyParser = require("body-parser");
var express = require("express");
var routes = require("./api/routes");

var app = express();
app.set("port", 3000);

app.use(bodyParser.urlencoded({extended : false}));

app.use("/api", routes);

var server = app.listen(app.get("port"), function(){
    console.log("App listening on port ", server.address().port );
});
