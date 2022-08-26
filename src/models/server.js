const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            users: '/api/users'
        }
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // reading and body parse
        this.app.use(express.json());

        // public directory
        this.app.use(express.static("src/public"));
    }

    routes() {
        this.app.use(this.paths.auth, require("../routes/auth.router"));
        this.app.use(this.paths.categories, require("../routes/categories.router"));
        this.app.use(this.paths.products, require("../routes/products.router"));
        this.app.use(this.paths.users, require("../routes/user.router"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;
