const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    courseNumber: {
        type: String,
        require: true
    },
    courseName: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    semester:{
        type: String,
        require: true
    },
    registrationCode: {
        type: String,
        require: true
    }
});

mongoose.model("Course", courseSchema);