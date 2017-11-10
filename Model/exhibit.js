"use strict";
//INCLUDES--------------------------------------------------------------------------------------------
const mongoose = require("mongoose");
const uuid = require("uuid/v4");
const autoIncrementPlugin = require('mongoose-auto-increment');
const util = require("../Module/util.js");

//SETUP--------------------------------------------------------------------------------------------

//LOGIC--------------------------------------------------------------------------------------------
var exhibitSchema = new mongoose.Schema({
    _ct: {type: Date, default: util.Now},
    _mt: {type: Date, default: util.Now},
    guid: {type:String, default: uuid},
    name: {ru: {type: String, required: [true, "Отсутствует Название экспоната"], minlength: [1, "Слишком короткое Название экспоната"]}, en: String},
    title: {ru: String, en: String},
    subtitle: {ru: String, en: String},
    location: {ru: String, en: String},
    description: {ru: String, en: String},
    history: {ru: String, en: String},
    date: {type: Date, default: util.Now},
    coverImage: {type: String, default: ""},
    fields: [{
        name: {ru: String, en: String},
        value: {ru: String, en: String}
    }],
    imageGallery: [{
        image: String,
        description:{ru: String, en: String},
        guid: {type: String, default: uuid}
    }],
    complex: {type: String, default: ""},
    ordinal: {type: Number, default: 0},
});

exhibitSchema.plugin(autoIncrementPlugin.plugin, 'Exhibit');

module.exports = mongoose.model("Exhibit", exhibitSchema);