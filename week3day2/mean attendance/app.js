const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./api/route/index");
const apiRoutes = require("./api/route/route");

const app = express();
app.set("port", 4000);


app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

const server = app.listen(app.get("port"), function(){
    console.log("Listening on port: " + server.address().port);
})