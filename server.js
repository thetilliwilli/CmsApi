"use strict";
//INCLUDES--------------------------------------------------------------------------------------------
const config = require("./config.js");
const express = require("express");
const mongoose = require("mongoose");
//SETUP--------------------------------------------------------------------------------------------
const mongooseInit = require("./Init/mongoose.js");
const repoInit = require("./Init/repoInit.js");
const expressInit = require("./Init/express.js");
//LOGIC--------------------------------------------------------------------------------------------
Promise.resolve()
    .then(mongooseInit)
    .then(repoInit)
    .then(expressInit)
    .then((cxt)=>{
        //Do what you want here
    })
    .catch(err=>console.error(err));