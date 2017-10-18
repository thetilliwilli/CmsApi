"use strict";
//INCLUDES--------------------------------------------------------------------------------------------
const config = require("./config.js");
const express = require("express");
const mongoose = require("mongoose");
//SETUP--------------------------------------------------------------------------------------------
const mongooseInit = require("./Init/mongoose.js");
const repoInit = require("./Init/repo.js");
const expressInit = require("./Init/express.js");
//LOGIC--------------------------------------------------------------------------------------------
Promise.resolve()
    .then(mongooseInit)
    .then(repoInit)
    .then(expressInit)
    .then((cxt)=>{
        //Do what you want here
        var repo = require("./Repo/index.js");
        // repo.CreateEmptyGallery("1234")
        //     .then(() => repo.DeleteGallery("1234"))
        //     .then(() => repo.CreateEmptyGallery("12345"))
        // repo.SaveFile("12345", "image", "png", "base64 encode png content");
    })
    .catch(err=>console.error(err));