const mongoose = require("mongoose");
const dbURL = "mongodb://localhost:27017/meanAttendance";

mongoose.connect(dbURL);

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to " + dbURL);
});

require("./student-profiles-model");
require("./users-model");
require("./secret-qrcode-model");