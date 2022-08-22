const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { validateFiles } = require("../middlewares/validateFiles");

const router = Router();

router.post(
    "/login",
    [
        check("mail", "The email is required").isEmail(),
        check("password", "The password is required").not().isEmpty(),
        validateFiles,
    ],
    login
);

module.exports = router;
