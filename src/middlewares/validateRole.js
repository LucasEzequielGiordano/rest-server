const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: "validate token first",
        });
    }
    const { role, name } = req.user;
    if (role !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${name} is not an admin`,
        });
    }
    next();
};

const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: "Verified role before that token",
            });
        }
        if (roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `this roles ${roles} are required `,
            });
        }
        next();
    };
};

module.exports = {
    isAdminRole,
    hasRole,
};
