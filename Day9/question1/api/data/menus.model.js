var mongoose = require("mongoose");

const nutritionSchema = mongoose.Schema({
    calories :{
        type : Number,
        require : true
    },
    fat :{
        type : Number,
        require : true
    },
    carbs :{
        type : Number,
        require : true
    },
    protein :{
        type : Number,
        require : true
    }
});

const originSchema = mongoose.Schema({
    continent :{
        type : String,
        require : true
    }, 
    country :{
        type : String,
        require : true
    }
});

const drinkSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : false
    },
    price :{
        type : Number,
        require : true
    },
    nutrition :nutritionSchema,
    ingredients : {
        type : [String],
        require : false
    }
});

const allergiesSchema = mongoose.Schema({
    name: String
});

const ingredientsSchema = mongoose.Schema({
    name : String
});

const menuSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    type : {
        type : String ,
        require : true
    },
    description : String,
    nutrition : {
        type : nutritionSchema,
        require : true
    },
    ingredients : [ingredientsSchema],
    price : {
        type: Number,
        require : true
    },
    origin : {
        type : originSchema,
        require : true
    },
    drinks : [drinkSchema],
    allergies : [allergiesSchema]
});

mongoose.model("Menus", menuSchema, "menus");



