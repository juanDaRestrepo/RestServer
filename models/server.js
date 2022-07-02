const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users'
        //middlewares
        this.middlewares();
        //App Routes
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Reading and parsing body
        this.app.use( express.json() )

        //Public routes
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', process.env.PORT);
        })
    }
}

module.exports = Server