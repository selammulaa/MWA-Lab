const mongoose = require("mongoose");

secretQrCodeSchema = mongoose.Schema({
    secretCode: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        "default": new Date()
    }
});

mongoose.model("SecretQrCode", secretQrCodeSchema);