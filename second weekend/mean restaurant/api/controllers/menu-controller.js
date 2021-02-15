const mongoose = require('mongoose');
const Menu = mongoose.model("Menus");

module.exports.menusGetAll = function(req, res){

    let offset = 0;
    let count = 5;
    const maxCount = 5;

    let searchString = null;

    let response = {
        status: 200,
        message: ""
    }

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }

    if(req.query && req.query.count){
        count = parseInt(req.query.count); 
    }

    if(req.query && req.query.search){
        searchString = req.query.search;
    }

    if(isNaN(offset) || isNaN(count)){
        response.status = 404;
        response.message = {"message": "QueryString offset and count should be numbers"};
        res.status(response.status).json(response.message);
        return;
    }

    if(count > maxCount){
        response.status = 400;
        response.message = {"message": "Count exceeds maximum of " + maxCount};
        res.status(response.status).json(response.message);
    }

    if(searchString){
        Menu.find({name: new RegExp(searchString+'+', "i")}).skip(offset).limit(count).exec(function(err, docs){
            response.status = 200;
            response.message = docs;
            if(err){
                response.status = 500;
                response.message =err;
                res.status(500).json(err);
            }
            res.status(response.status).json(response.message);
        });

    }else {

        Menu.find().skip(offset).limit(count).exec(function(err, docs){
            response.status = 200;
            response.message = docs;
            if(err){
                response.status = 500;
                response.message =err;
                res.status(500).json(err);
            }
            res.status(response.status).json(response.message);
        });
    }

}

module.exports.menusGetOne = function(req, res){

    const menuId = req.params.menuId;

    Menu.findById(menuId).exec(function(err, menu){
        let response = {
            status : 200,
            message : menu
        };

        if(err){
            response.status = 500;
            response.message = err;
            return;
        }else if(!menu) {
            response.status = 400;
            response.message = "Menu not found.";
        }

        res.status(response.status).json(response.message);
    });

}

module.exports.menusAddOne = function(req, res){

    let response = {
        status : 201,
        message : ""
    }
    console.log(req.body);

   if(req.body && req.body.name && req.body.type && 
        req.body.calories && req.body.fat && req.body.carbs && req.body.protein &&
        req.body.continent && req.body.country){

        Menu.create({
            name : req.body.name,
            type : req.body.type,
            price : req.body.price,
            description : req.body.description,
            nutrition : {
                calories : req.body.calories,
                fat : req.body.fat,
                carbs : req.body.carbs,
                protein : req.body.protein
            },
            origin : {
                continent : req.body.continent,
                country : req.body.country
            },
            allergies: [
                {
                name : req.body.allergy
            }]
        }, function(err, menu){
            response = {
                status : 201,
                message : menu
            }
            if(err){
                response.status = 500;
                response.message = err
            }
            res.status(response.status).json(response.message);
        })
   }else {
        response.status = 400;
        response.message = {error : "Required data missing from POST"}
        res.status(response.status).json(response.message);
   }
}

module.exports.menusUpdateOne = function(req, res){
    const menuId = req.params.menuId;

    Menu.findById(menuId).exec(function(err, menu){
        const response = {
            status: 204,
            message: menu
        }
        if(err){
            response.status = 500;
            response.message = err
        }else if(!menu){
            response.status = 404;
            response.message = {"message": "Menu not found"};
        }

        if(response.status != 204){
            res.status(response.status).json(response.message);
        }else {
            menu.name = req.body.name;
            menu.type = req.body.type;
            menu.price = req.body.price;
            menu.description = req.body.description;
            menu.nutrition = {
                calories : req.body.calories,
                fat : req.body.fat,
                carbs : req.body.carbs,
                protein : req.body.protein
            };
            menu.origin = {
                continent : req.body.continent,
                country : req.body.country
            };

            menu.save(function(err, updatedMenu){
                response.message = updatedMenu;
                if(err){
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
}

module.exports.menusDeleteOne = function(req, res){
    const menuId = req.params.menuId;

    Menu.findByIdAndRemove(menuId).exec(function(err, deletedMenu){
        const response = {
            status : 204,
            message : deletedMenu
        }

        if(err){
            response.status = 500;
            response.message = err;
        }else if(!deletedMenu){
            response.status = 404;
            response.message = {"message" : "Menu not found"};
        }

        res.status(response.status).json(response.message);
    })
}

