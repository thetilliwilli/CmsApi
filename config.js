"use strict";
const path = require("path");


module.exports = {
    port: 8001,
    db: {
        port: 27017,
        host: "localhost",
        dbname: "TAG",
        get connectionString(){return `mongodb://${this.host}:${this.port}/${this.dbname}`},
    },
    repo:{
        host: "95.213.248.123",
        port: 8080,
        webRoot: "/Static/Repo",
        get root(){ return path.join(__dirname, this.webRoot) }
    }
};