const { response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req, res = response, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            msg: "No Token in the petition",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        if (!user) {
            return res.status(401).json({
                msg: "Token invalid",
            });
        }
        if (!user.state) {
            return res.status(401).json({
                msg: "Token invalid",
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Token invalid",
        });
    }
};

module.exports = {
    validateJWT,
};
