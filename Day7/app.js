angular.module("myProperApp",['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl : "template/main.html",
            controller : "MainController",
            controllerAs : "mainCtrl"
        })
        .when("/about", {
            templateUrl : "template/about.html",
            controller : "AboutController",
            controllerAs : "aboutCtrl"
        })
        .when("/joke", {
            templateUrl : "template/joke.html",
            controller : "JokeController",
            controllerAs : "jokeCtrl"
        })
        .when("/dog/:breed", {
            templateUrl : "template/recipe.html",
            controller : "RecipeController",
            controllerAs : "recipeCtrl"
        })
        .otherwise({
            redirectTo: "/"
        })
}