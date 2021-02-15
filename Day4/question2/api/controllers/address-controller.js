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