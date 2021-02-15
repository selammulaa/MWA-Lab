// is going to hold application module and route
angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider){
    // $locationProvider.hashPrefix("");
    $routeProvider
    .when("/", {
        templateUrl: "angular-app/game-list/games.html",
        controller : "GamesController",
        controllerAs: "vm"
    })
    .when("/game/:id", {
        templateUrl: "angular-app/game-display/game.html",
        controller : "GameController",
        controllerAs: "vm"
    })
}
