require("./api/data/db");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./api/route/index");

const app = express();
app.set("port", 3000);

// serving static page
app.use(express.static(path.join(__dirname, "public")));


app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use("/", routes);

const server = app.listen(app.get("port"), function(){
    console.log("Listening on port: " + server.address().port);
})