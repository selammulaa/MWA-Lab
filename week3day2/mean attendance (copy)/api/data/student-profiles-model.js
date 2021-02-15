const mongoose = require("mongoose");

const attendaceSchema = mongoose.Schema({
    date: {
        type: Date,
        require: true
    },
    session: {
        type: String,
        requier: true
    },
    course: {
        type: String,
        requier: true
    }
})

const studentProfile = mongoose.Schema({
    studentId: {
        type: String,
        requier: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type : String,
        requier: true
    },
    picture: {
        data: Buffer,
        contentType: String,
        requier: false
    },
    attendanc: {
        type: [attendaceSchema]
    }
})

mongoose.model("StudentProfile", studentProfile);