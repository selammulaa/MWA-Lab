var express = require("express");
var path = require("path");

const app = express();
app.set("port", 3000);

//if we write this the static content will be server witout the 
// code below - they will be served automatically
app.use(express.static(path.join(__dirname, "public")));


// app.get("/", function(req,res){
//     console.log("GET homepage");
//     res.status(200);
//     res.sendFile(path.join(__dirname,"public", "index.html"));

// });

const server = app.listen(app.get("port"), function(){
    console.log("Listening to port " + server.address().port);
})