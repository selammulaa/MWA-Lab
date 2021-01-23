const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    country: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    }
});

const reviewsSchema = mongoose.Schema({
    date: Date,
    nameOfUser: String,
    review : String
});

const skillsSchema = mongoose.Schema({
    skill: {
        type: String
    }
})

const jobOpeningSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    salary : {
        type: Number
    },
    description: {
        type: String,
        require: true
    },
    experience : {
        type: Number,
        require: true
    },
    skills: {
        type: [skillsSchema]
    },
    postDate: {
        type: Date,
        default: new Date()
    },
    location : locationSchema,
    review: [reviewsSchema]

});

mongoose.model("JobOpening", jobOpeningSchema, "jobOpenings");