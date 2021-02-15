const path = require("path");
const mongoose = require("mongoose");
const Faculty = mongoose.model("Faculty");
const User = mongoose.model("User");
const bcrypte = require("bcrypt-nodejs");


module.exports.facultyHomePage = function(req, res){
    dispathPageFaculty("home", res);

}

module.exports.facultyTakeAttendancePage = function(req, res){
    dispathPageFaculty("take-attendance", res);

}

module.exports.facultyStudentsPage = function(req, res){
    dispathPageFaculty("students", res);

}

module.exports.facultySecretCodePage = function(req, res){
    dispathPageFaculty("secret-code", res);

}

module.exports.facultyAddStudentPage = function(req, res){
    dispathPageFaculty("student-add", res);

}

dispathPageFaculty = function(pageName, res){
    res.status(200).sendFile(path.join(__dirname, "..", "..", "public", "faculty" ,pageName+".html") );
    
}

module.exports.facultyGetOne = function(req, res){
    const id = req.params.id;

    Faculty.findById(id).exec(function(err, faculty){
        let response = {
            status : 201,
            message: faculty
        }
        if(err){
            response.status = 500;
            response.message = err
        }else if(!faculty){
            response.status = 500;
            response.message = {message: "Faculty not found."}
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.facultyAddOne = function(req, res){
    let response = {
        status: 201,
        message: ""
    }

    if(req.body && req.body.facultyId && req.body.firstName && req.body.lastName && req.body.password){
        Faculty.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            facultyId: req.body.facultyId,
        }, function(err, faculty){

            if(err){
                response.status = 500;
                response.message = err;
                res.status(response.status).json(response.message);
                return;
            }else {
            
                User.create({
                    username : faculty.facultyId,
                    password: bcrypte.hashSync(req.body.password, bcrypte.genSaltSync(10)),
                    role: "faculty",
                    id: faculty._id
                }, function(err, user){
                    if(err){
                        response.status = 500;
                        response.message = err;
                        res.status(response.status).json(response.message);
                        return;
                    }else {
                        response.status = 201;
                        response.message = faculty;
                        res.status(response.status).json(response.message);
                        return;
                    }
                })
            
            }

        })

    }else{
        response.status = 400;
        response.message = {"message": "Required data missing from POST"}
        res.status(response.status).json(response.message);
        return;
    }
}