angular.module("jobOpeningApp").controller("JobOpeningsController", JobOpeningsController);

function JobOpeningsController(JobOpeningFactory){
    let vm = this;
    vm.headerTitle = "Job Openings List";
    vm.saveOrEdit = "save";

    JobOpeningFactory.getAllJobs()
        .then(function(response){
            vm.jobs = response;
            console.log(vm.jobs);

    });

    vm.addJob = function(){

        var job = {
            title: vm.title,
            salary: vm.salary,
            description: vm.description,
            experience: vm.experience,
            postDate: vm.postDate,
            country: vm.country,
            city: vm.city,
            state: vm.state,
            id: vm.id
        };
        if(vm.saveOrEdit === "save"){
            console.log(job);
    
            if(vm.jobForm.$valid){
                console.log("valid");
    
                JobOpeningFactory.addOneJob(job).then(function(response){
    
                    JobOpeningFactory.getAllJobs()
                    .then(function(response){
                        vm.jobs = response;
                        console.log(vm.jobs);
    
                    vm.title = null;
                    vm.salary = null;
                    vm.description = null;
                    vm.experience = null;
                    vm.postDate = null;
                    vm.country = null;
                    vm.city = null;
                    vm.state = null;
            
                });
    
                }).catch(function(eror){
    
                });
            }
        }else {

            if(vm.jobForm.$valid){
                console.log("valid");
    
                JobOpeningFactory.updateOneJob(job).then(function(response){
    
                    JobOpeningFactory.getAllJobs()
                    .then(function(response){
                        vm.jobs = response;
    
                    vm.title = null;
                    vm.salary = null;
                    vm.description = null;
                    vm.experience = null;
                    vm.postDate = null;
                    vm.country = null;
                    vm.city = null;
                    vm.state = null;
            
                });
    
                }).catch(function(eror){
    
                });
            }

        }
        

    }

    vm.initEdit = function(job){
        console.log(job);
        vm.title = job.title;
        vm.salary = job.salary;
        vm.description = job.description;
        vm.experience = job.experience;
        vm.postDate = new Date(job.postDate);

        if(job.location){
            vm.country = job.location.country;
            vm.city = job.location.city;
            vm.state = job.location.state;
        }
        
        vm.id = job._id;

        vm.saveOrEdit = "edit"
    }
    
}