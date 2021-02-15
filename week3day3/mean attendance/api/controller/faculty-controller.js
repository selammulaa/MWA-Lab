const path = require("path");

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