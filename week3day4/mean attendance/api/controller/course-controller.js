const e = require("express");
const mongoose =require("mongoose");
const { report } = require("../route");
const Course = mongoose.model("Course");
const Student = mongoose.model("Student");


module.exports.courseGetAll = function(req, res){

    var studentId = req.params.id;

    Student.findById(studentId).select("course").exec(function(err, student){
        let response = {
            status: 200,
            message: student
        };
        if(err){
            response.status = 500;
            response.message = err;
        }else if(!student){
            response.status = 404;
            response.message = {"message" : "Student not found."}
        }
        res.status(response.status).json(response.message);
    });  
}

module.exports.courseAddOne = function(req, res){
    var studentId = req.params.id;

    Student.findById(studentId).select("-attendace").exec(function(err, student){
        let response = {
            status :201,
            message : student
        }

        if(err){
            response.status = 500;
            response.message = err;
            res.status(response.status).json(response.message);

        }else if(!student){
            response.status = 404;
            response.message = {"message": "Student not found"}
            res.status(response.status).json(response.message);

        }else {
            if(req.body && req.body.courseName && req.body.courseNumber && req.body.year && req.body.semester &&
                req.body.registrationCode && req.body.studentRegistrationCode){

                if(req.body.registrationCode !== req.body.studentRegistrationCode){
                    response.status = 400;
                    response.message = {"message": "Incorrect registration code"};
                    res.status(response.status).json(response.message);

                }else {

                    student.course.push({
                        courseNumber: req.body.courseNumber,
                        courseName: req.body.courseName,
                        year: req.body.year,
                        semester: req.body.semester,
                        registrationCode: req.body.registrationCode
                    });

                    student.save(function(err, updatedStudent){
                        response.message = updatedStudent;
                        response.status = 201;
                        if(err){
                            response.status = 500;
                            response.message = err;
                        }
                        res.status(response.status).json(response.message);

                    })  
                }

            }else {
                response.status = 400;
                response.message = {"message": "Required data is missing from POST"};
                res.status(response.status).json(response.message);
            }
        }
    });
}

module.exports.courseDeleteOne = function(req, res){
    var studentId = req.params.id;
    var courseId = req.params.courseId;

    Student.findById(studentId).select("-attendace").exec(function(err, student){
        let response = {
            status : 204,
            message: student
        }
        if(err){
            response.status = 500;
            response.message = err;
            res.status(response.status).json(response.message);

        }else if(!student){
            response.status = 404;
            response.message = {"message": "Student not found"};
            res.status(response.status).json(response.message);

        }else {
            var course = student.course.id(courseId);
            var courseIndx = student.course.indexOf(course);

            student.course.splice(courseIndx, 1);

            student.save(function(err, updatedStudent){
                response.message = updatedStudent;
                if(err){
                    response.status = 500;
                    report.message = err;
                }
                res.status(response.status).json(response.message);
            })
        }
    })

} 

module.exports.addCourse = function(req, res){
    let response = {
        status : 201,
        message : ""
    }

    Course.create({
        courseNumber: req.body.courseNumber,
        courseName: req.body.courseName,
        year: req.body.year,
        semester: req.body.semester,
        registrationCode: req.body.registrationCode
    }, function(err, course){
        response = {
            status : 201,
            message : course
        }
        if(err){
            response.status = 500;
            response.message = err
        }
        res.status(response.status).json(response.message);
    });

}

module.exports.getCourses = function( req, res){
    

    Course.find().exec(function(err, course){
        let response = {
            status : 200,
            message : course
        }
        if(err){
            response.message = err;
            response.status = 500;
        }
        res.status(response.status).json(response.message);

    })
}