const mongoose = require("mongoose");
const JobOpening = mongoose.model("JobOpening");


module.exports.skillsGetAll = function(req, res){
    JobOpening.findById(req.params.id).select("skills").exec(function(err, jobOpenings){
        let response = {
            status: 200,
            message: jobOpenings
        }
        if(err){
            response.status = 500;
            response.message = err;
            res.status(response.status).json(response.message);
            return;
        } else if(!jobOpenings){
            response.status = 404;
            response.message = {message : "Job Opening Not Found"};
            res.status(response.status).json(response.message);
            return;
        }

        res.status(response.status).json(response.message);

    });
}

module.exports.skillsGetOne = function(req, res){
    JobOpening.findById(req.params.id).select("skills").exec(function(err, jobOpening){
        let response = {
            status: 200,
            message: ""
        }
        if(err){
            response.status = 500;
            response.message = err;
        }else if(!jobOpening){
            response.status = 404;
            response.message = {message: "Job Opening not found"};
        }else {
            let skill = jobOpening.skills.id(req.params.skillId);
            if(skill){
                response.status = 200;
                response.message = skill;
            }else {
                response.status = 404;
                response.message = {message : "Skill not found"};
            }
        }

        res.status(response.status).json(response.message);

    });
}

module.exports.skillsAddOne = function(req, res){
    let response = {
        status: 200,
        message: ""
    }
    if(req.body && req.body.skill){

        JobOpening.findById(req.params.id).exec(function(err, jobOpening){
            if(err){
                response.status = 500;
                response.message = err; 
                res.status(response.status).json(response.message);
                return;
            }else if(!jobOpening){
                response.status = 404;
                response.message =  {message : "Skill not found"};;
                res.status(response.status).json(response.message);
                return;
            }else {
                let skill = {
                    skill: req.body.skill
                };
                if(!jobOpening.skills){
                    jobOpening.skills = new Array();
                }
                jobOpening.skills.push(skill)
                jobOpening.save(function(err, jobOpening){
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }else {
                        response.status = 201;
                        response.message = jobOpening;
                    }
                    res.status(response.status).json(response.message);
                    return;
                });
            }
        })

    }else {
        response.status = 400;
        response.message = {message : "Required Fields are Missing."};
        res.status(response.status).json(response.message);
        return;
    }

}

module.exports.skillsUpdateOne = function(req, res){
    let response = {
        status: 200,
        message: ""
    }
    if(req.body && req.body.skill){

        JobOpening.findById(req.params.id).exec(function(err, jobOpening){
            if(err){
                response.status = 500;
                response.message = err; 
                res.status(response.status).json(response.message);
                return;
            }else if(!jobOpening){
                response.status = 404;
                response.message =  {message : "Job Opening not found"};;
                res.status(response.status).json(response.message);
                return;
            }else {

                var skl = jobOpening.skills.id(req.params.skillId);
                if(skl){
                    var indx = jobOpening.skills.indexOf(skl);
            
                    jobOpening.skills[indx].skill = req.body.skill; 
    
                    jobOpening.save(function(err, jobOpening){
                        if(err){
                            response.status = 500;
                            response.message = err;
                        }else {
                            response.status = 201;
                            response.message = jobOpening;
                        }
                        res.status(response.status).json(response.message);
                        return;
                    });
                }else {
                    response.status = 404;
                    response.message =  {message : "Skill not found"};;
                    res.status(response.status).json(response.message);
                    return;
                }
                
            }
        })

    }else {
        response.status = 400;
        response.message = {message : "Required Fields are Missing."};
        res.status(response.status).json(response.message);
        return;
    }

}

module.exports.skillsDeleteOne = function(req,res){

    let jobId = req.params.id;
    let skillId =req.params.skillId;

    let response = {
        status: 200,
        message: ""
    }

    JobOpening.findById(jobId).select("skills").exec(function(err, jobOpening){
        if(err){
            response.status = 500;
            response.message =  err
            res.status(response.status).json(response.message);
            return;
        }else if(!jobOpening){
            response.status = 404;
            response.message =  {message : "Job Opening not found"};
            res.status(response.status).json(response.message);
            return;
        }else {
            var skill = jobOpening.skills.id(skillId);

            if(skill){
                let index = jobOpening.skills.indexOf(skill);
                jobOpening.skills.splice(index, 1);
                jobOpening.save(function(err, jobOpening){
                    if(err){
                        response.status = 500;
                        response.message =  err
                        res.status(response.status).json(response.message);
                        return;
                    }else {
                        response.status = 204;
                        response.message =  jobOpening
                        res.status(response.status).json(response.message);
                        return;
                    }
                })

            }else {
                response.status = 404;
                response.message =  {message : "Skill not found"};
                res.status(response.status).json(response.message);
                return;
            }
            
        }
    })

}