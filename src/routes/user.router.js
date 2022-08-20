const { Router } = require("express");
const { check } = require("express-validator");
const {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", usersGet);

router.post("/", [check("mail", "This mail is invalid").isEmail()], usersPost);

router.put("/:id", usersPut);

router.patch("/", usersPatch);

router.delete("/", usersDelete);

module.exports = router;
