const mongoose = require("mongoose");

const course = mongoose.Schema({
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
    semester: {
        type: String,
        require: true
    },
    registrationCode: {
        type: String,
        require: true
    }
})

const faculty = mongoose.Schema({
    facultyId: {
        type: String,
        require: true,
        unique: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type : String,
        require: true
    },
    picture: {
        data: Buffer,
        contentType: String,
        require: false
    },
    course: {
        type: [course],
        require: false
    }
})

mongoose.model("Faculty", faculty);
