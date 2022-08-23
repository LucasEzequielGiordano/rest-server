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

userSchema.methods.toJSON = function () {
    const { __v, password, _id, ...User } = this.toObject();
    User.uid = _id;
    return User;
};

module.exports = model("User", userSchema);
