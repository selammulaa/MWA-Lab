require("./api/data/db");

const bodyParser = require("body-parser");
const express = require("express");
const routes = require("./api/routes");

const app = express();
app.set("port", 3000);

app.use(bodyParser.urlencoded({extended : false}));

app.use("/api", routes);

const server = app.listen(app.get("port"), function(){
    console.log("App listening on port ", server.address().port );
});