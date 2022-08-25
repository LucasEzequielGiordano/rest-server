const { response } = require("express");
const { Categorie } = require("../models");

const getCategories = async (req, res = response) => {
    const { limit = 5, since = 0 } = req.query;
    const query = { state: true };

    const [total, categories] = await Promise.all([
        Categorie.countDocuments(query),
        Categorie.find(query)
            .populate("user", "name")
            .skip(Number(since))
            .limit(Number(limit)),
    ]);
    res.json({ total, categories });
};

const getCategorie = async (req, res = response) => {
    const { id } = req.params;
    const categorie = await Categorie.findById(id).populate("user", "name");
    res.json(categorie);
};

const createCategorie = async (req, res = response) => {
    const name = req.body.name.toUpperCase();
    const categorieDB = await Categorie.findOne({ name });

    if (categorieDB) {
        return res.status(400).json({
            msg: `The categorie ${categorieDB.name} doesn't exist`,
        });
    }
    const data = {
        name,
        user: req.user._id,
    };
    const categorie = new Categorie(data);

    await categorie.save();

    res.json(201).json(categorie);
};

module.exports = {
    createCategorie,
    getCategories,
    getCategorie,
};
