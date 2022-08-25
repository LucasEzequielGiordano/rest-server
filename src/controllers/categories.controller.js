const { response } = require("express");
const { Category } = require("../models");

const getCategories = async (req, res = response) => {
    const { limit = 5, since = 0 } = req.query;
    const query = { state: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate("user", "name")
            .skip(Number(since))
            .limit(Number(limit)),
    ]);
    res.json({ total, categories });
};

const getCategory = async (req, res = response) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate("user", "name");
    res.json(category);
};

const createCategory = async (req, res = response) => {
    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
        return res.status(400).json({
            msg: `The category ${categoryDB.name} doesn't exist`,
        });
    }
    const data = {
        name,
        user: req.user._id,
    };
    const category = new Category(data);

    await category.save();

    res.json(201).json(category);
};

const updateCategory = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;
    data.name = data.name.toUpperCase();
    data.user = req.user._id;
    const category = await Category.findByIdAndUpdate(id, data, {
        new: true,
    });
    res.json(category);
};

const deleteCategory = async (req, res = response) => {
    const { id } = req.params;
    const categorydeleted = await Category.findByIdAndUpdate(
        id,
        { state: false },
        { new: true }
    );
    res.json(categorydeleted);
};

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};
