const { Router } = require("express");
const { check } = require("express-validator");
const Role = require("../models/role");
const {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch,
} = require("../controllers/user.controller");
const { validateFiles } = require("../middlewares/validateFiles");
const {
    roleValid,
    mailExist,
    userByIdExist,
} = require("../helpers/validateDB");

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
        check("mail").custom(mailExist),
        check("role").custom(roleValid),
        validateFiles,
    ],
    usersPost
);

router.put(
    "/:id",
    [
        check("id", "It isn't a valid ID").isMongoId(),
        check("id").custom(userByIdExist),
        check("role").custom(roleValid),
        validateFiles,
    ],
    usersPut
);

router.patch("/", usersPatch);

router.delete(
    "/:id",
    [
        check("id", "It isn't a valid ID").isMongoId(),
        check("id").custom(userByIdExist),
        validateFiles,
    ],
    usersDelete
);

module.exports = router;
