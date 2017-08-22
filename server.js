"use strict";
//INCLUDES--------------------------------------------------------------------------------------------
const config = require("./Config/serverConfig.js");
const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./Router/mainRouter.js");
//SETUP--------------------------------------------------------------------------------------------
const mongooseInit = require("./Init/mongooseInit.js");
const expressInit = require("./Init/expressInit.js");
//LOGIC--------------------------------------------------------------------------------------------
Promise.resolve({connectionString: config.db.connectionString})
    .then(mongooseInit)
    .then(cx=>Promise.resolve({
        port: config.port,
        mainRouter: mainRouter,
    }))
    .then(expressInit);