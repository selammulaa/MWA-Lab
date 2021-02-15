const mongoose = require('mongoose');
const Menu = mongoose.model("Menus");


module.exports.originGetOne = function(req, res){
    var menuId = req.params.menuId;

    Menu.findById(menuId).select("origin").exec(function(err, menu){
        if(err){
            res.status(500).json(err);
        }else if(!menu){
            res.status(404).json({"message" : "Menu not found"});
        }else {
            var origin = menu.origin;

            if(!origin){
                res.status(404).json({"message": "Origin not found"});
            }
            res.status(200).json(origin);
        }
    })
}

module.exports.originAddOne = function(req, res){
    var menuId = req.params.menuId;

    Menu.findById(menuId).select("origin").exec(function(err, menu){
        if(err){
            res.status(500).json(err);
        }else if(!menu){
            res.status(404).json({"message" : "Menu not found"});
        }else {

            if(req.body && req.body.country && req.body.continent){
                menu.origin = new Object();
                menu.origin.country = req.body.country;
                menu.origin.continent = req.body.continent;

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

module.exports.originUpdateOne = function(req, res){
    var menuId = req.params.menuId;

    Menu.findById(menuId).select("origin").exec(function(err, menu){
        if(err){
            res.status(500).json(err);
        }else if(!menu){
            res.status(404).json({"message" : "Menu not found"});
        }else {
            var origin = menu.origin;
            
            if(!origin){
                res.status(404).json({"message": "Origin not found"});
            }else {
                menu.origin.country = req.body.country;
                menu.origin.continent = req.body.continent;

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
            }
        }
    })
}

module.exports.originDeleteOne = function(req, res){
    const menuId = req.params.menuId;

    Menu.findById(menuId).select("-drinks").exec(function(err, menu){
        if(err){
            res.status(500).json(err);
        }else if(!menu){
            res.status(404).json({"message" : "Menu not found"});
        }else {
            if(menu.origin){
                menu.origin.remove();

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
                res.status(404).json({"message" : "Origin not found for the menu"});
            }
        }
    })
}

