angular.module("restaurantApp").controller("MenuController", MenuController);

function MenuController($routeParams, MenuDataFactory){
    var vm = this;
    vm.title = "MEAN Menu";

    var id = $routeParams.id;

    MenuDataFactory.getOneMenu(id)
        .then(function(response){
            vm.menu = response;
            
        })
}