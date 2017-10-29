"use strict";
//INCLUDES--------------------------------------------------------------------------------------------
const mongoose = require("mongoose");
const uuid = require("uuid/v4");
const autoIncrementPlugin = require('mongoose-auto-increment');
const util = require("../Module/util.js");

//SETUP--------------------------------------------------------------------------------------------

//LOGIC--------------------------------------------------------------------------------------------
var instSchema = new mongoose.Schema({
    uptime: {type: Date, default: util.Now},
    id: {type:String, required: true, unique: true},//IMEI или persistent UUID
    hardname: String,//Имя от устройства
    type: {type: String, required: true, enum:["tag", "tuple", "golo"]},
    description: String,//Описание для апликейшена
    complex: String,
});

// instSchema.plugin(autoIncrementPlugin.plugin, 'Inst');

module.exports = mongoose.model("Inst", instSchema);