angular.module("jobOpeningApp").factory("JobOpeningFactory", JobOpeningFactory);

function JobOpeningFactory($http){

    return {
        getAllJobs: getAllJobs,
        getOneJob: getOneJob,
        addOneJob: addOneJob,
        deleteOneJob: deleteOneJob,
        updateOneJob: updateOneJob,
        addOneSkill: addOneSkill
    }

    function getAllJobs(){
        return $http.get("/api/jobOpenings").then(complete).catch(falied);
    }

    function getOneJob(id){
        return $http.get("/api/jobOpenings/"+id).then(complete).catch(falied);
    }

    function addOneJob(job){
        return $http.post("/api/jobOpenings", job).then(complete).catch(falied);
    }

    function deleteOneJob(id){
        return $http.delete("/api/jobOpenings/"+id).then(complete).catch(falied);
    }

    function updateOneJob(job){
        return $http.put("/api/jobOpenings/"+job.id, job).then(complete).catch(falied);
    }

    function addOneSkill(jobId, skill){
        return $http.post("/api/jobOpenings/" + jobId + "/skills", skill)
    }

    function complete(response){
        console.log(response.data);
        return response.data;
    }

    function falied(error){
        console.log(error);
        return error.status.statusText;
    }

}