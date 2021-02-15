var mongoose = require("mongoose");

const publisherShchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    country : {
        type: String,
        require : true
    },
    established: {
        type : Date,
        required : true
    },
    location : {
        address : String,
        coordinates: {
            type : [Number], // long(E/W), lat(N/S)
            index : "2dsphere"
        }
    }
}); 

const gameSchema = mongoose.Schema({
    title : {
        type: String,
        require: true
    } ,
    price : Number,
    designers : [String],
    minPlayers : {
        type: Number,
        min : 1,
        max : 10
    },
    maxPlayers : {
        type : Number,
        min : 1,
        max : 10
    },
    rate : {
        type: Number,
        min: 1,
        max : 5,
        "default" : 1
    },
    // publisher : publisherShchema 
});

mongoose.model("Games", gameSchema, "games"); // collection in mongodb is Games