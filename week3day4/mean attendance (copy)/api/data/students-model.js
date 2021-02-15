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
    semester:{
        type: String,
        require: true
    },
    registrationCode: {
        type: String,
        require: true
    }
})

const attendaceSchema = mongoose.Schema({
    date: {
        type: Date,
        require: true,
        "default": new Date()
    },
    session: {
        type: String,
        require: true
    },
    course: {
        type: course,
        require: true
    }
})

const student = mongoose.Schema({
    studentId: {
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
    },
    attendance: {
        type: [attendaceSchema]
    }
})

mongoose.model("Student", student);