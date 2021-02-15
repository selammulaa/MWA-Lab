angular.module("myProperApp")
    .controller("MyProperController", MyProperController);

function MyProperController(){
    var vm = this;
    vm.name = "Jack";
}