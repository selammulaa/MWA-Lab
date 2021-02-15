const mongoose = require('mongoose');
const Menu = mongoose.model("Menus");

module.exports.drinksGetAll = function(req, res){
    var menuId = req.params.menuId;

    Menu.findById(menuId).select("drinks").exec(function(err, menu){
        if(err){
            res.status(500).json(err);
        } else if(!menu){
            res.status(404).json({"message" : "Menu not found"});
        } else {
            var drinks = menu.drinks;
            res.status(200).json(drinks);
        }
    })
}

module.exports.drinksGetOne = function(req, res){
    var menuId = req.params.menuId;
    var drinkId = req.params.drinkId;

    Menu.findById(menuId).select("drinks").exec(function(err, menu){
        if(err){
            res.status(500).json(err);
        } else if(!menu){
            res.status(404).json({"message" : "Menu not found"});
        } else {
            var drink = menu.drinks.id(drinkId);
            if(!drink){
                res.status(404).json({"message" : "Drink not found."});
            }
            res.status(200).json(drink);
        }
    })
}

module.exports.drinksAddOne = function(req, res){
    var menuId = req.params.menuId;

    Menu.findById(menuId).exec(function(err, menu){
        if(err){
            res.status(500).json(err);
        } else if(!menu){
            res.status(404).json({"menu" : "Menu not found"});
        } else {
            if(req.body && req.body.name && req.body.price){
                menu.drinks.push(
                    {
                        name : req.body.name,
                        description : req.body.description,
                        price : req.body.price,
                        nuitrition : {
                            calories : req.body.calories,
                            fat : req.body.fat,
                            carbs : req.body.carbs,
                            protein : req.body.protein
                        }
                    }
                )

                menu.save(function(err, updatedMenu){
                    const response = {
                        status : 201,
                        message : updatedMenu.drinks
                    }
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }
                    res.status(response.status).json(response.message);
                
                })
            }else {
                req.status(400).json({error : "Required data missing from POST"});
            }
            
        }
    })
}

module.exports.drinksUpdateOne = function(req, res){
    var menuId = req.params.menuId;
    var drinkId = req.params.drinkId;

    Menu.findById(menuId).exec(function(err, menu){
        if(err){
            res.status(500).json(err);
        }if(!menu){
            res.status(404).json({"messag": "Menu not found."});
        }else {
            var drink = menu.drinks.id(drinkId);
            if(drink){
                var drinkIndx = menu.drinks.indexOf(drink);

                menu.drinks[drinkIndx] = {
                    _id : drink._id,
                    name : req.body.name,
                    description : req.body.description,
                    price : req.body.price,
                    nuitrition : {
                        calories : req.body.calories,
                        fat : req.body.fat,
                        carbs : req.body.carbs,
                        protein : req.body.protein
                    }
                }
    
                menu.save(function(err, updatedMenu){
                    const response = {
                        status : 204,
                        message : updatedMenu
                    }
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }
                    res.status(response.status).json(response.message);
                });
            }else {
                res.status(404).json({"messag": "Drink not found."});
            }
            
        }
    });
}

module.exports.drinksDeleteOne = function(req, res){
    var menuId = req.params.menuId;
    var drinkId = req.params.drinkId;

    Menu.findById(menuId).exec(function(err, menu){
        if(err){
            res.status(500).json(err);
        }else if(!menu){
            res.status(404).json({"messag": "Menu not found."});
        }else {
            var drink = menu.drinks.id(drinkId);
            var drinkIndx = menu.drinks.indexOf(drink);

            menu.drinks.splice(drinkIndx, 1);

            menu.save(function(err, updatedMenu){
                const response = {
                    status : 204,
                    message : updatedMenu
                }
                if(err){
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            })
        }
    })

}

