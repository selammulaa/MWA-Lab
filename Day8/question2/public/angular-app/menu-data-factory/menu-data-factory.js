angular.module("restaurantApp").factory("MenuDataFactory", MenuDataFactory);

function MenuDataFactory($http){
    return{
        getAllMenus: getAllMenus,
        getOneMenu: getOneMenu
    };

    function getAllMenus(){
        return $http.get("/api/menus").then(complete).catch(failed);
    }

    function getOneMenu(id){
        return $http.get("/api/menus/"+id).then(complete).catch(failed);
    }

    function complete(response){
        console.log(response.data);
        return response.data;
    }

    function failed(error){
        return error.status.statusText;
    }
}