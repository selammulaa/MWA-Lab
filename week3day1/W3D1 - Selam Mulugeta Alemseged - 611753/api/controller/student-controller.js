const path = require("path");

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