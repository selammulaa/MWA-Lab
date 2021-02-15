const mongoose =require("mongoose");
const Student = mongoose.model("Student");


module.exports.attendaceGetAll = function(req, res){
    let course = "";
    let studentId = req.params.id;

    let offset = 0;
    let count = 5;
    const maxCount = 10;

    let response = {
        status: 200,
        message: ""
    }

    if(req.query && req.query.course ){
        course = req.query.course;
    }else {
        response.status = 400;
        response.message = {"message": "Required query strings course is missing"}
        res.status(response.status).json(response.message);
        return;
    }

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count); 
    }

    if(isNaN(offset) || isNaN(count)){
        response.status = 400;
        response.message = {"message": "QueryString offset and count should be numbers"}
        res.status(response.status).json(response.message);
        return;
    }

    if(count > maxCount){
        response.status = 400;
        response.message = {"message": "Count exceeds maximum of  " + maxCount};
        res.status(response.status).json(response.message);
    }

    Student.findById(studentId).select("attendance")
        .skip(offset).limit(count).exec(function(err, student){
            if(err){
                response.status = 500;
                response.message = err;
            }else {

                let studentAttendance = new Array();
                student.attendance.forEach(element => {
                    if(element.course.courseName == course){
                        studentAttendance.push(element);
                    }
                });
                response.message = studentAttendance;
            }
            res.status(response.status).json(response.message);
        })
}

module.exports.attendanceAddOne = function(req, res){
    const studentId = req.params.id;

    Student.findById(studentId).exec(function(err, student){

        let response = {
            status : 201,
            message: student
        }

        if(err){
            response.status = 500;
            response.message = err;
            res.status(response.status).json(response.message);
            return;
        }else if(!student){
            response.status = 404;
            response.message = {"message": "Student not found"};
            res.status(response.status).json(response.message);
            return;
        }else {
            if(req.body && req.body.courseNumber && req.body.session){
                console.log(student);
                student.attendance.push({
                        course : {
                            courseNumber: req.body.courseNumber,
                            courseName: req.body.courseName,
                            year: req.body.year,
                            semester: req.body.semester,
                            registrationCode: req.body.registrationCode
                        },
                        session: req.body.session});

                student.save(function(err, updatedStudent){
                    response.message = updatedStudent;
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }
                    res.status(response.status).json(response.message);
                    return;
                });
            }else {
                response.status = 400;
                response.message = {"message": "Required data missing from POST"};
                res.status(response.status).json(response.message);
                return;
            }
        }
    })
}

