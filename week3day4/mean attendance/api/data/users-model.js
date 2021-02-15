const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    id: {
        type: String,
        require:false
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: false
    }
});

mongoose.model("User", userSchema);