angular.module("jobOpeningApp").controller("JobOpeningDetailController", JobOpeningDetailController);

function JobOpeningDetailController($routeParams, JobOpeningFactory){
    let vm = this;
    let id  = $routeParams.id;

    JobOpeningFactory.getOneJob(id).then(function(response){
        vm.job = response;
    })

    vm.success =false;
    vm.failur = false;
    vm.message = "";
    vm.deleteJob = function(id){
        JobOpeningFactory.deleteOneJob(id).then(function(response){
            vm.success = true;
            vm.failur =false;
            vm.message = "Successfully Deleted the Job";
        }).catch(function(response){
            vm.failur = true;
            vm.success =false;
            vm.message = "Error occured while Deleting the Job";
        })
    }

    vm.addSkill = function(jobId){
        console.log(jobId);
        if(vm.skillFrom.$valid){
            
            JobOpeningFactory.addOneSkill(jobId, {skill: vm.skill})
                .then(function(response){
                    JobOpeningFactory.getOneJob(jobId).then(function(response){
                        vm.job = response;
                        skill: vm.skill = null;
                    })
                }).catch(function(err){

                });
        }
    }


}