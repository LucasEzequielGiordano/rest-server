const { Router } = require("express");
const { search } = require("../controllers/search.controller");

const router = Router();

router.get("/:collection/:terminate", search);

module.exports = router;
