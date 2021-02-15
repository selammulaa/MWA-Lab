angular.module("meanAttendance", ["ngRoute"]).config(config)

function config($routeProvider){

    $routeProvider
        .when("/login", {
            templateUrl: "angular-app/login/login.html",
            // controller: "LoginController",
            // controllerAs: "vm",
        })
}