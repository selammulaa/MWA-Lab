require("./api/data/db");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./api/route/index");

const app = express();
app.set("port", 3000);

// serving static page
app.use(express.static(path.join(__dirname, "public")));
app.use(("/node_modules", express.static(path.join(__dirname, "node_modules"))));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// add this to the api provider code 
app.use("/", function(req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    next();
})

app.use("/", routes);

const server = app.listen(app.get("port"), function(){
    console.log("Listening on port: " + server.address().port);
})