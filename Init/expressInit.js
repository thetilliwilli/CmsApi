"use strict";
const express = require("express");
const bodyParser = require("body-parser");

module.exports = function ExpressInit(pConfig){
    return new Promise((resolve, reject)=>{
        var app = express();
        
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json({limit:25*1000*1000}));
        //CORS заголовок - принимать запросы с любых доменов
        app.use((req, res, next)=>{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        app.use(pConfig.mainRouter);
        
        app.listen(pConfig.port, ()=>{console.log(`[ContentManagerServer]:(StartListenPort):${pConfig.port}`);});
    });
};