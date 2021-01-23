const mongoose = require("mongoose");
const JobOpening = mongoose.model("JobOpening");


module.exports.jobOpeningsGetAll = function(req, res){
    var offset = 0;
    var count = 10;
    const maxCount = 10;

    let response = {
        status: 400,
        message : "init"
    }

    if(req.query && req.query.count){
        count = parseInt(req.query.count);
    }

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }

    if(isNaN(offset) || isNaN(count)){
        response.status = 404;
        response.message = "QueryString offset and count should be numbers";
        res.status(response.status).json(response.message);
        return;
    }

    if(count > maxCount){
        response.status = 400;
        response.message = "Count exceeds maximun of" + maxCount;
        res.status(response.status).json(response.message);
        return;
    }

    JobOpening.find().skip(offset).limit(count).exec(function(err, jobOpenings){
        console.log("find");
        if(err){
            response.status = 500;
            response.message = err;
        }
        response.status = 200;
        response.message = jobOpenings;
        res.status(response.status).json(response.message);

    })


}

module.exports.jobOpeningsGetOne = function(req, res){
    let id = req.params.id;

    let response = {
        status: 400,
        message: ""
    }

    JobOpening.findById(id).exec(function(err, jobOpening){

        if(err){
            response.status = 500;
            response.message = err;
        }if(!jobOpening){
            response.status = 404;
            response.message = {message: "Job Opening not found."}
        }else {
            response.status = 200;
            response.message = jobOpening;
        }
        res.status(response.status).json(response.message);
        return;

    });
 
}

module.exports.jobOpeningsAddOne = function(req, res){

    // response
    let response = {
        status : 400,
        message : ""
    }

    // check
    if(req.body && req.body.title && req.body.salary && req.body.description &&
        req.body.experience && req.body.country
         && req.body.city && req.body.state){

        // create
        JobOpening.create({
            title : req.body.title,
            salary : req.body.salary,
            description : req.body.description,
            experience : req.body.experience,
            postDate : req.body.postDate,
            location: {
                country : req.body.country,
                city : req.body.city,
                state : req.body.state
            }
            
        }, function(err, jobOpening){
            if(err){
                response.status = 500;
                response.message = err;
            }else {
                response.status = 201;
                response.message = jobOpening;
            }
            res.status(response.status).json(response.message);
            return;
        })

    }else {

        response.status = 400;
        response.message = {message: "Required Fields are Missing"};
        res.status(response.status).json(response.message);
        return;

    }

  
}

module.exports.jobOpeningsUpdateOne = function(req, res){
    let id = req.params.id;

    let response = {
        status: 400,
        message: "update initialized"
    }

    JobOpening.findById(id).select("-reviews -skills")
            .exec(function(err, jobOpening){

        if(err){
            response.status = 500;
            response.message = err;
            res.status(response.status).json(response.message);
            return;
        }else if(!jobOpening){
            response.state = 404;
            response.message = "Job Opening Not Found";
            res.status(response.status).json(response.message);
            return;
        }else {

            // focus here
            jobOpening.title = req.body.title;
            jobOpening.salary = req.body.salary;
            jobOpening.description = req.body.description;
            jobOpening.experience = req.body.experience;
            jobOpening.skills = req.body.skills;
            jobOpening.postDate = req.body.postDate;
            jobOpening.location = {
                city: req.body.city,
                state: req.body.state,
                country: req.body.country
            }

            jobOpening.save(function(err, jobOpening){
                if(err){
                    response.status = 500;
                    response.message = err;
                }else {
                    response.status = 200;
                    response.message = jobOpening;
                }
                res.status(response.status).json(response.message);
                return;
            })
        }
        
    });


}

module.exports.jobOpeningsDeleteOne = function(req, res){
    let id = req.params.id;

    let response = {
        status: 400,
        message: "delete"
    }

    JobOpening.findByIdAndRemove(id).exec(function(err, deletedGame){
        if(err){
            response.status = 500;
            response.message = err;
        }else {
            response.status = 204;
            response.message = deletedGame;
        }

        res.status(response.status).json(response.message);

    });
    
}