angular.module("myProperApp").controller("JokeController", JokeController);

function JokeController($http){
    
    var vm = this;
    
    $http.get("https://official-joke-api.appspot.com/jokes/ten")
        .then(function(response){
            vm.jokes = response.data;
        })

}

