const express = require('express')
var cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.prefix = '/api';
        this.authPath = `${this.prefix}/auth`
        this.userPath = `${this.prefix}/user`;
        this.plantPath = `${this.prefix}/plant`;
        /* conected db */
        this.conectedDB();
        /* middleware */
        this.middlewares();
        /* routes */
        this.routes();
    }

    async conectedDB() {
        await dbConnection();
    }

    middlewares() {
        /* CORS */
        this.app.use(cors())

        /* parse body */
        this.app.use(express.json());

        /* directorio publico */
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.userPath, require('../routes/user.routes'));
        this.app.use(this.plantPath, require('../routes/plant.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

}

module.exports = Server;