const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const usersGet = async (req, res = response) => {
    const { limit = 5, since = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(since)).limit(Number(limit)),
    ]);

    res.json({ total, users });
};

const usersPost = async (req, res = response) => {
    const { name, mail, password, role } = req.body;
    const user = new User({ name, mail, password, role });

    // encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({ user });
};

const usersPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, mail, ...rest } = req.body;
    const user = await User.findByIdAndUpdate(id, rest);
    if (password) {
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
    }

    res.json({
        msg: "put API - controller",
        user,
    });
};

const usersPatch = (req, res = response) => {
    res.json({
        msg: "patch API - controller",
    });
};

const usersDelete = async (req, res = response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: false });
    const userAuth = req.user;
    res.json({
        user,
        userAuth,
    });
};

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch,
};
