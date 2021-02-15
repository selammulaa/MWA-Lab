angular.module("restaurantApp").factory("MenuDataFactory", MenuDataFactory);

function MenuDataFactory($http){
    return{
        getAllMenus: getAllMenus,
        getOneMenu: getOneMenu,
        addOneMenu: addOneMenu,
        deleteOneMenu: deleteOneMenu
    };

    function getAllMenus(){
        return $http.get("/api/menus").then(complete).catch(failed);
    }

    function getOneMenu(id){
        return $http.get("/api/menus/"+id).then(complete).catch(failed);
    }

    function addOneMenu(menu){
        return $http.post("/api/menus", menu).then(complete).catch(failed);
    }

    function deleteOneMenu(id){
        return $http.delete("/api/menus/" + id).then(complete).catch(failed);
    }

    function complete(response){
        console.log(response.data);
        return response.data;
    }

    function failed(error){
        return error.status.statusText;
    }
}