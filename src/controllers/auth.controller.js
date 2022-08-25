const { response, json } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/googleVerify");

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

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;
    try {
        const { email, name, img } = await googleVerify(id_token);
        let user = await User.findOne({ email });
        if (!user) {
            const data = {
                name,
                email,
                password: ":P",
                img,
                google: true,
            };
            user = new User(data);
            await user.save();
        }

        if (!user.state) {
            return res.status(401).json({
                msg: "Talk with the admin, user denied",
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token,
        });
    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: "Token don't verified",
        });
    }
};

module.exports = {
    login,
    googleSignIn,
};
