const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth.controller");
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
router.post(
    "/google",
    [
        check("id_token", "id_toke is required").not().isEmpty(),
        validateFiles,
    ],
    googleSignIn
);

module.exports = router;
