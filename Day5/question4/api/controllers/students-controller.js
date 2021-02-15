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

module.exports.studentsAddOne = function(req, res){
    console.log("POST to add game");

    if(req.body && req.body.name && req.body.gpa){
        Student.create({
            name: req.body.name,
            gpa : req.body.gpa,
            address : [
                {
                    street : req.body.street,
                    city : req.body.city,
                    state : req.body.status,
                    zip : req.body.zip,
                    buildingNo : req.body.buildingNo
                }
            ]
        }, function(err, student){
            const response = {
                status : 201,
                message : student
            }
            if(err){
                response.status = 400;
                response.message = err
            }
            res.status(response.status).json(response.message);
        })
    }else {
        res.status(400).json({error: "Required data missing from POST"})
    }
}

module.exports.studentsUpdateOne = function(req, res){
    const stuendtId = req.params.studentId;

    Student.findById(stuendtId).exec(function(err, student){
        const response = {
            status: 204,
            message: student
        }
        if(err){
            response.status = 500;
            response.message = err
        }else if(!student){
            response.status = 404;
            response.message = {"message": "Student ID not found"};
        }

        if(response.status != 204){
            res.status(response.status).json(response.message);
        }else {
            student.name = req.body.name;
            student.gpa = req.body.gpa;

            student.save(function(err, updatedStudent){
                response.message = updatedStudent;
                if(err){
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            }); 
        }
    });
}

module.exports.studentsDeleteOne = function(req, res){
    const studentId = req.params.studentId;

    Student.findByIdAndRemove(studentId).exec(function(err, deletedStudent){
        const response = {
            status : 204,
            message : deletedStudent
        }

        if(err){
            response.status = 500;
            response.message = err;
        }else if(!deletedStudent){
            response.status = 404;
            response.message = {"message": "Student ID not found"};
        }

        res.status(response.status).json(response.message);
    })
}

