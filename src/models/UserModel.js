const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            min: 8,
            max: 12,
        },
        pais: {
            type: String,
            require: true,
        },
    }, {
        timestamps: true,
    }
);


module.exports = mongoose.model("users", UserSchema);