"use strict";
const express = require("express");
const bodyParser = require("body-parser");

module.exports = function ExpressInit(pConfig){
    return new Promise((resolve, reject)=>{
        var app = express();
        
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(pConfig.mainRouter);
        
        app.listen(pConfig.port, ()=>{console.log(`[ContentManagerServer]:(StartListenPort):${pConfig.port}`);});
    });
};