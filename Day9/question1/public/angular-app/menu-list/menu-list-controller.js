angular.module("restaurantApp").controller("MenusController", MenusController);

function MenusController(MenuDataFactory){
    var vm = this;
    vm.title = "MEAN Menu";

    MenuDataFactory.getAllMenus()
        .then(function(response){
            vm.menus = response;
        });

    vm.addMenu = function(){
        var postData = {
            name : vm.newMenuName,
            type : vm.newMenuType,
            description: vm.newMenuDescription,
            allergy: vm.newMenuAllergy,
            continent: vm.newMenuContinent,
            country: vm.newMenuCountry,
            calories: vm.newMenuCalories,
            fat: vm.newMenuFat,
            carbs: vm.newMenuCarbs,
            protein: vm.newMenuProtein,
            price: vm.newMenuPrice
        }

        console.log(postData);

        if(vm.menuForm.$valid){
            MenuDataFactory.addOneMenu(postData).then(function(response){
                console.log("Menu Saved");
                console.log(response);
                MenuDataFactory.getAllMenus()
                .then(function(response){
                    vm.menus = response;
                });

            }).catch(function(error){
                console.log(error);
            });
        }
    }

    vm.deleteSuccess = null;
    vm.deleteMenu = function(menuId){
        if(menuId){
            console.log(menuId);
            MenuDataFactory.deleteOneMenu(menuId).then(function(response){
                console.log(response);
                vm.deleteSuccess = true;
                MenuDataFactory.getAllMenus()
                .then(function(response){
                    vm.menus = response;
                });
            }).catch(function(error){
                vm.deleteSuccess = false;
                console.log(error); 
            })
        }

    }
}