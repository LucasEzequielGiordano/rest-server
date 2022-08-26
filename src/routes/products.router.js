const { Router } = require("express");
const { check } = require("express-validator");
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/products.controller");
const {
    categoryExistById,
    productExistById,
} = require("../helpers/validateDB");
const { validateJWT, validateFiles, isAdminRole } = require("../middlewares");

const router = Router();

router.get("/", getProducts);

router.get(
    "/:id",
    check("id", "Doesn't Mongo's id valid").isMongoId(),
    check("id").custom(productExistById),
    validateFiles,
    getProduct
);

router.post(
    "/",
    [
        validateJWT,
        check("name", "The name is required").not().isEmpty(),
        check("category", "Doesn't Mongo's id valid").isMongoId(),
        check("category").custom(categoryExistById),
        validateFiles,
    ],
    createProduct
);

router.put(
    "/:id",
    [
        validateJWT,
        // check("category", "Doesn't Mongo's id valid").isMongoId(),
        check("id").custom(productExistById),
        validateFiles,
    ],
    updateProduct
);

router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "Doesn't Mongo's id valid").isMongoId(),
        check("id").custom(productExistById),
        validateFiles,
    ],
    deleteProduct
);

module.exports = router;
