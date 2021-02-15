const mongoose = require("mongoose");
const JobOpening = mongoose.model("JobOpening");

module.exports.locationGetOne = function(req, res){
    let id = req.params.id;

    JobOpening.findById(id).select("location").exec(function(err, jobOpening){
        let response = {
            status : 201,
            message: jobOpening
        }
        if(err){
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });

}

module.exports.locationAddOne = function(req, res){
    let id = req.params.id;
    let body = req.body;

    let response = {
        status: 201,
        message: ""
    }

    if(body && body.country && body.city && body.state){
        console.log(id);

        JobOpening.findById(id).exec(function(err, jobOpening){
            if(err){
                response.status = 500;
                response.message = err;
                res.status(response.status).json(response.message);
                return;
            }else if(!jobOpening) {
                response.status = 404;
                response.message = "Job Opening not Found.";
                res.status(response.status).json(response.message);
                return;
            }else {
                if(!jobOpening.location){
                    jobOpening.location = new Object();
                }
                jobOpening.location = {
                    city: body.city,
                    state: body.state,
                    country: body.country
                }
                jobOpening.save(function(err, updatedJobOpening){
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }else {
                        response.status = 201;
                        response.message = updatedJobOpening;
                    }

                    res.status(response.status).json(response.message);
                    return;

                });
            }    
            
        })

    }else {
        response.status = 400;
        response.message = "Required field is missing";
        res.status(response.status).json(response.message);
        return;
    }


}

module.exports.locationDeleteOne = function(req, res){
    let id = req.params.id;

    JobOpening.findById(id).exec(function(err, jobOpening){

        let response = {
            status: 204,
            message : ""
        }

        if(err){
            response.status = 500;
            response.message = err;
        }else if(!jobOpening){
            response.status = 404;
            response.message = {message : "Job Opening not found"};
        }else {
            jobOpening.location.remove();
            jobOpening.save(function(err, jobOpening){
                if(err){
                    response.status = 500;
                    response.message = err;
                }else{
                    response.status = 201;
                    response.message = "";
                }
                res.status(response.status).json(jobOpening)

            
            })
        }
        res.status(response.status).json(response.message)
    })
}