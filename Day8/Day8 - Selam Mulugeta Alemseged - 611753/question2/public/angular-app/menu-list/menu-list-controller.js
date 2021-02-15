angular.module("restaurantApp").controller("MenusController", MenusController);

function MenusController(MenuDataFactory){
    var vm = this;
    vm.title = "MEAN Menu";

    MenuDataFactory.getAllMenus()
        .then(function(response){
            vm.menus = response;
        })
}