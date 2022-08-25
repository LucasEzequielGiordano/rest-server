const { Router } = require("express");
const { check } = require("express-validator");
const {
    createCategorie,
    getCategories,
    getCategorie,
} = require("../controllers/categories.controller");
const { categorieExistById } = require("../helpers/validateDB");
const { validateJWT, validateFiles } = require("../middlewares");

const router = Router();

router.get("/", getCategories);

router.get(
    "/:id",
    check("id", "Doesn't Mongo's id valid").isMongoId(),
    check("id").custom(categorieExistById),
    validateFiles,
    getCategorie
);

router.post(
    "/",
    [
        validateJWT,
        check("name", "The name is required").not().isEmpty(),
        validateFiles,
    ],
    createCategorie
);

router.put("/:id", (req, res) => {
    res.json("put");
});

router.delete("/:id", (req, res) => {
    res.json("delete");
});

module.exports = router;
