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
    title: String,
    subtitle: String,
    cardTitle: String,
    cardImageUri: String,
    ttx: [{name: String, value: String, unit: String}],
    articles: [{title: String, text: String}],
    ctFrom: {type: Date, default: DateTimeNowIso},
    ctTo: {type: Date, default: DateTimeNowIso},
    cl: String,
    // imageGallery: [{orderIndex: Number, uri: String, thumb: String, guid: String}],
    // imageGalleryDescription: [{guid: String, text: String}]
    imageGallery: [String],
    imageGalleryDescription: [String],
    lang: {type: String, enum: ["en", "ru"], default: "ru"}
});

module.exports = mongoose.model("Exhibit", exhibitSchema);