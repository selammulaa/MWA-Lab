// const { response } = require("express");
const mongoos =require("mongoose");
const Student = mongoos.model("Students");

module.exports.addressesGetAll = function(req, res){
    var studentId = req.params.studentId;
    Student.findById(studentId).select("address").exec(function(err, student){
        if(err){
            res.status(500).json(err);
        }else {
            var address = student.address;
            res.status(200).json(address);
        }
    });
}

module.exports.addressesGetOne = function(req, res){
    var studentId = req.params.studentId;
    var addressId = req.params.addressId;

    Student.findById(studentId).select("address").exec(function(err, student){
        if(err){
            res.status(500).json(err);
        } else if(!student) {
            res.status(404).json({"message" : "Student not found"});
        }else {
            var address = student.address.id(addressId);
            res.status(200).json(address);
        }
    })
}

module.exports.addressAddOne = function(req, res){
    const studentId = req.params.studentId;

    Student.findById(studentId).exec(function(err, student){
        if(err){
            res.status(500).json(err);
        } else if(!student) {
            res.status(404).json({"message" : "Student not found"});
        }else {
            student.address.push(
                {
                    street : req.body.street,
                    city : req.body.city,
                    state : req.body.status,
                    zip : req.body.zip,
                    buildingNo : req.body.buildingNo
                }
            )

            student.save(function(err, updatedStudent){
                const response = {
                    status : 201,
                    message : updatedStudent
                }
                if(err){
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    })
}

module.exports.addressUpdateOne = function(req, res){
    var studentId = req.params.studentId;
    var addressId = req.params.addressId;

    Student.findById(studentId).exec(function(err, student){
        if(err){
            res.status(500).json(err);
        } else if(!student) {
            res.status(404).json({"message" : "Student not found"});
        }else {
            var address = student.address.id(addressId);
            var addIndx = student.address.indexOf(address);

            student.address[addIndx] = {
                _id : address._id,
                street : req.body.street,
                city : req.body.city,
                state : req.body.status,
                zip : req.body.zip,
                buildingNo : req.body.buildingNo
            }

            student.save(function(err, updatedStudent){
                const response = {
                    status : 204,
                    message : updatedStudent
                }
                if(err){
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    })
}

module.exports.addressDeleteOne = function(req, res){
    var studentId = req.params.studentId;
    var addressId = req.params.addressId;

    Student.findById(studentId).exec(function(err, student){
        if(err){
            res.status(500).json(err);
        } else if(!student) {
            res.status(404).json({"message" : "Student not found"});
        }else {
            var address = student.address.id(addressId);
            var addIndx = student.address.indexOf(address);

            student.address.splice(addIndx, 1)

            student.save(function(err, updatedStudent){
                const response = {
                    status : 204,
                    message : updatedStudent
                }
                if(err){
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    })
}

