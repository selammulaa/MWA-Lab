const mongoos =require("mongoose");
const User = mongoos.model("User");
const bcrypte = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");


module.exports.login = function(req, res){
    console.log("Loggin in user");
    var username = '';
    var password = '';

    let response = {
        status : 200,
        message : ""
    }

    if(req.body && req.body.username && req.body.password){
        username = req.body.username;
        password = req.body.password;

        User.findOne({username: username}).exec(function(err, user){
            if(err){
                response.status = 500;
                response.message = err;
                res.status(response.status).json(response.message);
                return;
            }
    
            if(user && bcrypte.compareSync(password, user.password)){
                var token = jwt.sign({username: user.name}, "cs572", {expiresIn: 3600});
                response.status = 200;
                response.message = {user: user, success: true, token: token};
                res.status(response.status).json(response.message);
                return;
                
            }else {
                response.status = 400;
                response.message = {"message": "Unauthorized"};
                res.status(response.status).json(response.message);
                return;
            }
        });
    }else {
        response.status = 400;
        response.message = {"message": "Required data missing from POST"}
        res.status(response.status).json(response.message);
        return;
    }

    
}

// middleware
module.exports.authenticate = function(req, res, next){
    console.log(req);
    var headerExists = req.headers.authorization;
    
    let response = {
        status: 401,
        message: ""
    }

    if(headerExists){
        var token = req.heades.authentication.split(" ");
        jwt.verify(token, "cs572", function(err, decoded){
            if(err){
                response.status = 401;
                response.message = {"message": "Unauthorized"}
                res.status(response.status).json(response.message);
            }else {
                req.user = decoded.user;
                next();
            }
        }); 
    } else {
        response.status = 403;
        response.message = {"message": "No token provided"}
        res.status(response.status).json(response.message);
    }
}
