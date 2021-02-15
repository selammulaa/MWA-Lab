angular.module("myProperApp").controller("RecipeController", RecipeController);

function RecipeController($http, $routeParams){
    
    var vm = this;
    var breedType = $routeParams.breed;
    
    $http.get("https://dog.ceo/api/breed/" + breedType + "/images/random/3")
        .then(function(response){
            vm.imageSrc = response.data.message;
        })

}

