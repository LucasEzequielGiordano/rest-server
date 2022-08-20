const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const usersGet = (req, res = response) => {
    const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

    res.json({
        msg: "get API - controller",
        q,
        nombre,
        apikey,
        page,
        limit,
    });
};

const usersPost = async (req, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json(errors);

    const { name, mail, password, role } = req.body;
    const user = new User({ name, mail, password, role });

    const emailExist = await User.findOne({ mail });
    if (emailExist)
        res.status(400).json({
            msg: "This email is registered in our database",
        });

    // encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({ user });
};

const usersPut = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: "put API - controller",
        id,
    });
};

const usersPatch = (req, res = response) => {
    res.json({
        msg: "patch API - controller",
    });
};

const usersDelete = (req, res = response) => {
    res.json({
        msg: "delete API - controller",
    });
};

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch,
};
