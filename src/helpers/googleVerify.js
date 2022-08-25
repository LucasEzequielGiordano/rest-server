const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleVerify(token = "") {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, picture, mail } = ticket.getPayload();
    return {
        name: name,
        img: picture,
        email: mail,
    };
}
module.exports = {
    googleVerify,
};
