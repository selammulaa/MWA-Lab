angular.module("meanGames").directive("gameRating", GameRating); // means game-rating

function GameRating(){
    return {
        restrict: "E", // E - element,  A - attribute
        templateUrl : "angular-app/game-rating/rating.html",
        bindToController: true,
        controller: "GameController",
        controllerAs: "vm",
        scope: {
            start: "@"
        }
    }
}