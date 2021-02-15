const mongoose = require('mongoose');
const Menu = mongoose.model("Menus");

module.exports.nutritionGetOne = function(req, res){
    var menuId = req.params.menuId;

    Menu.findById(menuId).select("nutrition").exec(function(err, menu){
        if(err){
            res.status(500).json(err);
        }else if(!menu){
            res.status(404).json({"message" : "Menu not found"});
        }else {
            var nutrition = menu.nutrition;

            if(!nutrition){
                res.status(404).json({"message": "Nutrition not found"});
            }
            res.status(200).json(nutrition);
        }
    })
}

module.exports.nutritionAddOne = function(req, res){
    var menuId = req.params.menuId;

    Menu.findById(menuId).select("nutrition").exec(function(err, menu){
        if(err){
            res.status(500).json(err);
        }else if(!menu){
            res.status(404).json({"message" : "Menu not found"});
        }else {

            if(req.body && req.body.calories && req.body.fat && req.body.protein && req.body.carbs){
                
                menu.nutrition = new Object();
                menu.nutrition.calories = req.body.calories;
                menu.nutrition.fat = req.body.fat;
                menu.nutrition.protein = req.body.protein;
                menu.nutrition.carbs = req.body.carbs;

                menu.save(function(err, updatedMenu){
                    const response = {
                        status : 201,
                        message : updatedMenu
                    }
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }
    
                    res.status(response.status).json(response.message);
                
                })
            }else {
                res.status(400).json({error : "Required data missing from POST"});
            }
            
        }
    })
}

module.exports.nutritionUpdateOne = function(req, res){
    var menuId = req.params.menuId;

    Menu.findById(menuId).select("nutrition").exec(function(err, menu){
        if(err){
            res.status(500).json(err);
        }else if(!menu){
            res.status(404).json({"message" : "Menu not found"});
        }else {

            if(req.body && req.body.calories && req.body.fat && req.body.protein && req.body.carbs){
                
                menu.nutrition.calories = req.body.calories;
                menu.nutrition.fat = req.body.fat;
                menu.nutrition.protein = req.body.protein;
                menu.nutrition.carbs = req.body.carbs;

                menu.save(function(err, updatedMenu){
                    const response = {
                        status : 201,
                        message : updatedMenu
                    }
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }
    
                    res.status(response.status).json(response.message);
                
                })
            }else {
                res.status(400).json({error : "Required data missing from POST"});
            }
            
        }
    })
}

module.exports.nutritionDeleteOne = function(req, res){
    const menuId = req.params.menuId;

    Menu.findById(menuId).select("-drinks").exec(function(err, menu){
        if(err){
            res.status(500).json(err);
        }else if(!menu){
            res.status(404).json({"message" : "Menu not found"});
        }else {
            if(menu.nutrition){
                menu.nutrition.remove();

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

            }else {
                res.status(404).json({"message" : "Nutritions not found for the menu"});
            }
        }
    })
}

