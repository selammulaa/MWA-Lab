const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/meanJobs";

mongoose.connect(dbUrl);

mongoose.connection.on("connected", function(){
    console.log("Mongooose connected to " + dbUrl);
})

require("./jobOpening-model");


