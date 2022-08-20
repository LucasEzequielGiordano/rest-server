const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DataBase online");
    } catch (error) {
        console.log(error);
        throw new Error("Error at init db");
    }
};

module.exports = {
    dbConnection,
};
