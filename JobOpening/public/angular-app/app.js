angular.module("jobOpeningApp", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "angular-app/job-opening-list/job-openings.html",
            controller: "JobOpeningsController",
            controllerAs: "vm"
        })
        .when("/job/:id", {
            templateUrl: "angular-app/job-opening-detail/job-opening.html",
            controller: "JobOpeningDetailController",
            controllerAs: "vm"
        })
}