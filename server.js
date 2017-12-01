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
    .then(() => mongooseInit())
    .then(() => repoInit())
    .then(() => expressInit())
    .then(cx => {
        //Do what you want here
        // var MBureau = require("./Model/bureau.js");
        // var MDesigner = require("./Model/designer.js");

        // MBureau.create({fullName:"KB - Kuntsevo"})
        // .then(()=>{
        //     return;// MDesigner.create({shortName:"Rihnana", fullName:"Rihnana B", bureau: 1})
        // })
        // .then(()=>{
        //     return MDesigner.findOne({fullName:"Rihnana B"}).populate("bureau")
        // })
        // .then(designer=>console.log(designer))
        // .catch(e=>console.log(e));
    })
    .catch(err=>console.error(err));