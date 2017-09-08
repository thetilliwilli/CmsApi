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
    name: {ru: {type: String, required: [true, "Отсутствует название экспоната"], minlength: [1, "Плохое Название экспоната"], unique: [true, "Название экспоната должно быть уникальным"]}, en: String},
    title: {ru: String, en: String},
    subtitle: {ru: String, en: String},
    location: {ru: String, en: String},
    description: {ru: String, en: String},
    history: {ru: String, en: String},
    date: {type: Date, default: DateTimeNowIso},
    coverImage: {ru: String, en: String},
    fields: [{name: String, value: String}],
    imageGallery: [{image: String, thumbnail: String, description:{ru: String, en: String}}],
});

module.exports = mongoose.model("Exhibit", exhibitSchema);