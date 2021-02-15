angular.module("restaurantApp").directive("menusNavigation", MenuNavigation);

function MenuNavigation(){
    return{
        restrict: "E",
        templateUrl: "angular-app/navigation-directive/navigation-directive.html"
    };
}