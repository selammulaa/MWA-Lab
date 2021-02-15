var mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    street : {
        type: String,
        require : true
    },
    city : {
        type: String,
        require : true
    },
    state : {
        type : String,
        require : true
    },
    zip: {
        type : String,
        require: true
    },
    buildingNo : {
        type : String,
        require : true
    }

});

const studentSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    gpa : {
        type : Number,
        require : true
    },
    address : [addressSchema]
});

mongoose.model("Students", studentSchema, "Students");