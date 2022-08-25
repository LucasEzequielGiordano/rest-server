const { Router } = require("express");
const { check } = require("express-validator");
const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categories.controller");
const { categoryExistById } = require("../helpers/validateDB");
const { validateJWT, validateFiles, isAdminRole } = require("../middlewares");

const router = Router();

router.get("/", getCategories);

router.get(
    "/:id",
    check("id", "Doesn't Mongo's id valid").isMongoId(),
    check("id").custom(categoryExistById),
    validateFiles,
    getCategory
);

router.post(
    "/",
    [
        validateJWT,
        check("name", "The name is required").not().isEmpty(),
        validateFiles,
    ],
    createCategory
);

router.put(
    "/:id",
    [
        validateJWT,
        check("name", "The name is required").not().isEmpty(),
        check("id").custom(categoryExistById),
        validateFiles,
    ],
    updateCategory
);

router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "Doesn't Mongo's id valid").isMongoId(),
        check("id").custom(categoryExistById),
        validateFiles,
    ],
    deleteCategory
);

module.exports = router;
