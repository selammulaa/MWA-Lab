const path = require("path");
const mongoos =require("mongoose");
const Student = mongoos.model("Student");
const User = mongoos.model("User");
const bcrypte = require("bcrypt-nodejs");

module.exports.studentHomePage = function(req, res){
    dispatchPage("index", res);

}

module.exports.studentProfilePage = function(req, res){
    dispatchPage("profile", res);

}

module.exports.studentLoginPage = function(req, res){
    dispatchPage("login", res);

}

module.exports.studentAttendacePage = function(req, res){
    dispatchPage("attendace", res);

    
}

module.exports.studnetUpdatePage = function(req, res){
    dispatchPage("student-update", res);

}

module.exports.studentQrCode = function(req, res){
    dispatchPage("student-qr", res);
}

dispatchPage = function(pageName, res){
    res.status(200).sendFile(path.join(__dirname, "..", "..", "public", "student" ,pageName+".html") );
    
}

module.exports.studentsGetAll = function(req, res){
    
    let offset = 0;
    let count = 10;
    let maxCount = 10;
    let searchString = null;

    let response = {
        status: 200,
        message: ""
    }

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count); 
    }

    if(req.query && req.query.search){
        searchString = req.query.search;
    }

    if(isNaN(offset) || isNaN(count)){
        response.status = 404;
        response.message = {"message": "QueryString offset and count should be numbers"}
        res.status(response.status).json(response.message);
        return;
    }

    if(count > maxCount){
        response.status = 400;
        response.message = {"message": "Count exceeds maximum of  " + maxCount};
        res.status(response.status).json(response.message);
    }

    if(searchString){

        Student.find({
            $or : [
                {firstName: new RegExp(searchString + '+', 'i')},
                {lastName: new RegExp(searchString + '+', 'i')},
                {studentId: new RegExp(searchString + '+', 'i')}
            ]
        }).select("-attendance").skip(offset).limit(count).exec(function(err, students){
            if(err){
                response.status = 500;
                response.message = err;
            }else {
                response.status = 201;
                response.message = students;
            }
            res.status(response.status).json(response.message);
        });
    }else {

        Student.find().select("-attendance").skip(offset).limit(count).exec(function(err, students){
            if(err){
                response.status = 500;
                response.message = err;
            }else {
                response.status = 201;
                response.message = students;
            }
            res.status(response.status).json(response.message);
        });
    }
}

module.exports.studentsGetOne = function(req, res){
    const id = req.params.id;

    Student.findById(id).select("-attendance").exec(function(err, student){
        let response = {
            status : 201,
            message: student
        }
        if(err){
            response.status = 500;
            response.message = err
        }else if(!student){
            response.status = 500;
            response.message = {message: "Student not found."}
        }
        console.log(response);

        res.status(response.status).json(response.message);
    })
}

module.exports.studentsAddOne = function(req, res){
    let isStudent = false;
    if(req.query && req.query.student){
        isStudent = true;
    }

    let response = {
        status: 201,
        message: ""
    }

    if(isStudent){
        if(!(req.body && req.body.password)){
            response.status = 400;
            response.message = {"message": "Required data missing from POST"}
            res.status(response.status).json(response.message);
            return;
        }
    }
 
    if(req.body && req.body.studentId && req.body.firstName && req.body.lastName){

        Student.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            studentId: req.body.studentId,
            picture: req.body.picture
        }, function(err, student){

            if(err){
                response.status = 500;
                response.message = err;
                res.status(response.status).json(response.message);
                return;
            }else {
                if(isStudent){
                    User.create({
                        username : student.studentId,
                        password: bcrypte.hashSync(req.body.password, bcrypte.genSaltSync(10)),
                        role: "student",
                        id: student._id
                    }, function(err, user){
                        if(err){
                            response.status = 500;
                            response.message = err;
                            res.status(response.status).json(response.message);
                            return;
                        }else {
                            response.status = 201;
                            response.message = student;
                            res.status(response.status).json(response.message);
                            return;
                        }
                    })
                }else {
                    response.status = 201;
                    response.message = student;
                    res.status(response.status).json(response.message);
                    return;
                }
                
            }

        })

    }else {
        response.status = 400;
        response.message = {"message": "Required data missing from POST"}
        res.status(response.status).json(response.message);
        return;
    }
    
}

module.exports.studentsUpdateOne = function(req, res){
    const id = req.params.id;

    Student.findById(id).select("-attendance").exec(function(err, student){
        let response = {
            status: 201,
            message: student
        };

        if(err){
            response.status = 500;
            response.message = err;
            res.status(response.status).json(response.message);
            return;
        }else if(!student){
            response.status = 404;
            response.message = {"message": "Student not found."}
            res.status(response.status).json(response.message);
            return;
        }else {
            student.firstName = req.body.firstName;
            student.lastName = req.body.lastName;
            student.studentId = req.body.studentId;
            student.picture = req.body.picture;
            student.save(function(err, updatedStudent){
                response.message = updatedStudent;
                if(err){
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            })
        }
    })
}

module.exports.studentsDeleteOne = function(req, res){
    const id = req.params.id;

    Student.findByIdAndRemove(id).exec(function(err, deletedStudent){
        let response = {
            status: 204,
            message: deletedStudent
        };
        if(err){
            response.status = 500;
            response.message = err;
        }else if(!deletedStudent){
            response.status = 404;
            response.message = {"message": "Student not found."}
        }

        res.status(response.status).json(response.message);

    })
}

