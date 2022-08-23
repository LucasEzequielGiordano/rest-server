const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");

const login = async (req, res = response) => {
    const { mail, password } = req.body;

    try {
        const user = await User.findOne({ mail });
        if (!user) {
            return res.status(400).json({
                msg: "the user or password is not correct",
            });
        }

        if (!user.state) {
            return res.status(400).json({
                msg: "the user or password is not correct",
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "the user or password is not correct",
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            msg: "Login ok",
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "oops, something went wrong",
        });
    }
};

module.exports = {
    login,
};
