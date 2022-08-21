const { Router } = require("express");
const { check } = require("express-validator");
const {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch,
} = require("../controllers/user.controller");
const { validateFiles } = require("../middlewares/validateFiles");

const router = Router();

router.get("/", usersGet);

router.post(
    "/",
    [
        check("name", "This name is invalid").not().isEmpty(),
        check(
            "password",
            "This password is invalid, must have more than 6 letters"
        ).isLength({ min: 6 }),
        check("mail", "This mail is invalid").isEmail(),
        // check("role", "This role is invalid").isIn(["ADMIN_ROLE", "USER_ROLE"]),
        validateFiles,
    ],
    usersPost
);

router.put("/:id", usersPut);

router.patch("/", usersPatch);

router.delete("/", usersDelete);

module.exports = router;
