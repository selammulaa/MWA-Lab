angular.module("myProperApp").controller("AboutController", AboutController);

function AboutController(){
    var vm = this;
    vm.bio = "This is my bio";
}