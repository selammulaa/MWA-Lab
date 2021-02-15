const mongoose = require("mongoose");
const Student = mongoose.model("Students");

// api/students/
// api/students/1537
// api/students/1537/addresses
// api/students/1537/addresses/1123

module.exports.studentsGetAll = function(req, res){
    Student.find().exec(function(err, students){
        if(err){
            res.status(500).json(err);
        }else {
            res.status(200).json(students)
        }
    })
}

module.exports.studentsGetOne = function(req, res){
    const studentId = req.params.studentId;

    Student.findById(studentId).exec(function(err, student){
        console.log(student);
        if(err){
            res.status(500).json(err);
        }else if(!student){
            res.status(404).json({"message": "Student not found"});
        }else {
            res.status(200).json(student);
        }
    })
}

