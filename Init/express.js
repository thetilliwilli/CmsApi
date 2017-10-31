"use strict";

module.exports = function ExpressInit(){
    const express = require("express");
    const bodyParser = require("body-parser");
    const config = require("../config.js");
    const mainRouter = require("../Router/main.js");
    return new Promise((resolve, reject)=>{
        var app = express();
        
        // app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json({limit:100*1024*1024}));
        //CORS заголовок - принимать запросы с любых доменов
        app.use((req, res, next)=>{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            next();
        });
        app.use("/Static/Repo", express.static(config.repo.root));
        app.use(mainRouter);
        
        app.listen(config.port, ()=>{
            console.log(`[ContentManagerServer]:(StartListenPort):${config.port}`);
            resolve();
        });
        
    });
};