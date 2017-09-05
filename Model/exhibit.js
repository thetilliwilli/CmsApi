"use strict";
//INCLUDES--------------------------------------------------------------------------------------------
const mongoose = require("mongoose");

//SETUP--------------------------------------------------------------------------------------------
function DateTimeNowIso(){
    return (new Date()).toISOString();
}
//LOGIC--------------------------------------------------------------------------------------------
var exhibitSchema = new mongoose.Schema({
    id: Number,
    guid: String,
    name: String,
    title: String,
    subtitle: String,
    coverImage: String,
    fields: [{name: String, value: String}],
    history: String,
    description: String,
    date: {type: Date, default: DateTimeNowIso},
    location: String,
    imageGallery: [{image: String, thumbnail: String, description:{ru: String, en: String}}],
});

module.exports = mongoose.model("Exhibit", exhibitSchema);