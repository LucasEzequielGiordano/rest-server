const express = require("express");
const cors = require("cors");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutes = "/api/users";
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // reading and body parse
        this.app.use(express.json())

        // public directory
        this.app.use(express.static("src/public"));
    }

    routes() {
        this.app.use(this.usersRoutes, require("../routes/user.router"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;
