angular.module("restaurantApp", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl : "angular-app/menu-list/menus.html",
            controller: "MenusController",
            controllerAs: "vm"
        })
        .when("/menu/:id", {
            templateUrl : "angular-app/menu-display/menu.html",
            controller: "MenuController",
            controllerAs: "vm"
        })
}