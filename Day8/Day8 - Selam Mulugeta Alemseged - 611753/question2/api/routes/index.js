const express = require("express");
const router = express.Router();

const controllerMenu = require("../controllers/menu-controller");
const controllerDrink = require("../controllers/drink-controller");
const controllerNutrition = require("../controllers/nutrition-controller");
const controllerOrigin = require("../controllers/origin-controller");

// api/menus/
// api/menus/123
// api/menus/123/drinks
// api/menus/123/drinks/345

router.route("/menus")
    .get(controllerMenu.menusGetAll)
    .post(controllerMenu.menusAddOne);

router.route("/menus/:menuId")
    .get(controllerMenu.menusGetOne)
    .put(controllerMenu.menusUpdateOne)
    .delete(controllerMenu.menusDeleteOne);

router.route("/menus/:menuId/drinks")
    .get(controllerDrink.drinksGetAll)
    .post(controllerDrink.drinksAddOne);

router.route("/menus/:menuId/drinks/:drinkId")
    .get(controllerDrink.drinksGetOne)
    .put(controllerDrink.drinksUpdateOne)
    .delete(controllerDrink.drinksDeleteOne);

router.route("/menus/:menuId/origin")
    .get(controllerOrigin.originGetOne)
    .post(controllerOrigin.originAddOne)
    .put(controllerOrigin.originUpdateOne)
    .delete(controllerOrigin.originDeleteOne);

router.route("/menus/:menuId/nutrition")
    .get(controllerNutrition.nutritionGetOne)
    .post(controllerNutrition.nutritionAddOne)
    .put(controllerNutrition.nutritionUpdateOne)
    .delete(controllerNutrition.nutritionDeleteOne);

module.exports = router;
