"use strict";
//INCLUDES--------------------------------------------------------------------------------------------
const config = require("./serverConfig.js");
const express = require("express");
const mongoose = require("mongoose");
//SETUP--------------------------------------------------------------------------------------------
const mongooseInit = require("./Init/mongooseInit.js");
const expressInit = require("./Init/expressInit.js");
//LOGIC--------------------------------------------------------------------------------------------
Promise.resolve({connectionString: config.db.connectionString})
    .then(mongooseInit)
    .then(expressInit)
    .catch(err=>console.error(err));