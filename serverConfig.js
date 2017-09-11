"use strict";
const path = require("path");


module.exports = {
    port: 8080,
    db: {
        port: 27017,
        host: "localhost",
        dbname: "TAG",
        get connectionString(){return `mongodb://${this.host}:${this.port}/${this.dbname}`},
    },
    photoRepo:{
        rootPath: path.join(__dirname, "Static/CDN")
    }
};