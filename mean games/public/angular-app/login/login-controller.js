angular.module("meanGames").controller("LoginController",LoginController);

function LoginController($http, $location, $window, AuthFactory, GameDataFactory, jwtHelper){

    var vm = this;

    vm.isLoggedIn = function(){
        if(AuthFactory.isLoggedIn){
            return true;
        }
        return false;
    }

    vm.register = function(){
        var user = {
            username: vm.username,
            password: vm.password,
        }
    
        if(!vm.username || !vm.password){
            vm.message = "";
            vm.err = "Please ass a username and password"; 
        }else {
            if(vm.password !== vm.passwordRepeate){
                vm.err = ""
            }else {
                $http.post("/api/users/login", user).then(function(result){
                    vm.message = "sucessful logged in";
                    vm.err = "";
                }).catch(function(err){
    
                });
            }
        }
    }

    vm.login = function(){
        if(vm.username && vm.password){
            var user = {
                username : vm.username,
                password: vm.password
            };

            GameDataFactory.login(user).then(function(response){
                if(response.success){
                    $window.sessionStorage.token = response.token;
                    AuthFactory.isLoggedIn = true;
                    var token = $window.sessionStorage.token;
                    var decodedToken = jwtHelper.decodeToken(token);
                    vm.loggedInUser = decodedToken.username;
                }
            
            }).catch(function(err){
                console.log(err);
            });
        }
    }

    vm.logout = function(){
        AuthFactory.isLoggedIn = false;

        delete $window.sessionStorage.token;
        $location.path("/");
        
    }

    vm.isActiveTab = function(url){
        var currentPath = $location.path().split("/")[1];
        return (url === currentPath ? "active" : "");
    }
    
}