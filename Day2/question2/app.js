var express = require("express");
var routes = require("./api/routes");

const app = express();
app.set("port", 3000);

app.use("/", routes);

const server = app.listen(app.get("port"), function(){
    console.log("Listening to port: " + server.address().port);
});