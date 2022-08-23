const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
    return new Promise((res, rej) => {
        const payload = { uid };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: "2h",
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    rej("was not possible to generate the token");
                } else {
                    res(token);
                }
            }
        );
    });
};

module.exports = { generateJWT };
