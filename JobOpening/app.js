
require("./api/data/db");

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/route');
const path = require("path");


const app = express();
app.set("port", 3000);

// serving static pages
app.use(express.static(path.join(__dirname, "public")));
app.use(("/node_modules", express.static(path.join(__dirname, "node_modules"))));



// body-parse 
app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());


// define the route
app.use("/api", routes);


const server = app.listen(app.get("port"), function(){
    console.log("Listening on port - ", server.address().port);
})