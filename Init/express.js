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
            // res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Blob");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            //HACK: для того что бы пропускать любые OPTIONS запросы (мой кастомный хедер Blob)
            if(req.method === "OPTIONS")
                return res.send(200);
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