angular.module("restaurantApp", ["ngRoute",  "angular-jwt"]).config(config).run(run);

function config($routeProvider, $httpProvider){
    $httpProvider.interceptors.push("AuthInterceptor");

    $routeProvider
        .when("/", {
            templateUrl: "angular-app/welcome/welcome.html",
            access: {restricted: false}
        })
        .when("/menus", {
            templateUrl : "angular-app/menu-list/menus.html",
            controller: "MenusController",
            controllerAs: "vm",
            access: {restricted: false}

        })
        .when("/menu/:id", {
            templateUrl : "angular-app/menu-display/menu.html",
            controller: "MenuController",
            controllerAs: "vm",
            access: {restricted: false}

        })
        .when("/register",{
            templateUrl: "angular-app/register/register.html",
            controller : "RegisterController",
            controllerAs: "vm",
            access: {restricted: false}
        })
        .when("/login",{
            templateUrl: "angular-app/login/login.html",
            controller : "LoginController",
            controllerAs: "vm"
        })
        .when("/profile", {
            templateUrl: "angular-app/profile/profile.html",
            controllerAs: "vm",
            access: {restricted: true}
        })
        .otherwise({
            redirectTo: "/"
        })
}

function run($rootScope, $location, $window, AuthFactory){
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute){
        if(nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token &&
            !AuthFactory.isLoggedIn){
                event.preventDefault(); // do not go to that path
                $location.path("/"); //Instead go to the root
            }
    })
}