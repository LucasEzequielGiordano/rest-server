const validateFiles = require("../middlewares/validateFiles");
const validateJWT = require("../middlewares/validateJWT");
const hasRole = require("../middlewares/validateRole");

module.exports = {
    ...validateFiles,
    ...validateJWT,
    ...hasRole,
};
