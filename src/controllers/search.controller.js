const { response } = require("express");
const { User, Category, Product } = require("../models");
const { isValidObjectId } = require("mongoose");

const allowedCollections = ["users", "category", "products", "roles"];

const searchUsers = async (terminate = "", res = response) => {
    const isMongoID = isValidObjectId(terminate);
    if (isMongoID) {
        const user = await User.findById(terminate);
        return res.json({ results: user ? [user] : [] });
    }

    const regex = new RegExp(terminate, "i");
    const users = await User.find({
        $or: [{ name: regex }, { mail: regex }],
        $and: [{ state: true }],
    });

    res.json({
        results: users,
    });
};

const searchCategories = async (terminate = "", res = response) => {
    const isMongoID = isValidObjectId(terminate);
    if (isMongoID) {
        const category = await Category.findById(terminate);
        return res.json({ results: category ? [category] : [] });
    }

    const regex = new RegExp(terminate, "i");
    const categories = await Category.find({ name: regex, state: true });

    res.json({
        results: categories,
    });
};

const searchProducts = async (terminate = "", res = response) => {
    const isMongoID = isValidObjectId(terminate);
    if (isMongoID) {
        const product = await Product.findById(terminate).populate(
            "category",
            "name"
        );
        return res.json({ results: product ? [product] : [] });
    }

    const regex = new RegExp(terminate, "i");
    const products = await Product.find({ name: regex, state: true }).populate(
        "category",
        "name"
    );

    res.json({
        results: products,
    });
};

const search = (req, res = response) => {
    const { collection, terminate } = req.params;

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `The allowed collection are: ${allowedCollections}`,
        });
    }

    switch (collection) {
        case "users":
            searchUsers(terminate, res);
            break;
        case "category":
            searchCategories(terminate, res);
            break;
        case "products":
            searchProducts(terminate, res);
            break;
        default:
            res.status(500).json({
                msg: "Forgot to search",
            });
    }
};

module.exports = { search };
