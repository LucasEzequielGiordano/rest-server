const { Schema, model } = require("mongoose");

const userSchema = Schema({
    name: {
        type: String,
        required: [true, "Name required"],
    },
    mail: {
        type: String,
        required: [true, "mail required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password required"],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: ["ADMIN_ROLE", "USER_ROLE"],
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

module.exports = model("User", userSchema);
