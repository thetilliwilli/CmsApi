"use strict";

const mongoose = require("mongoose");
const uuid =  require("uuid/v4");
const autoIncrementPlugin = require("mongoose-auto-increment");
const util = require("../Module/util.js");

var tupleSchema = new mongoose.Schema({
    //META--------------------
    _mt: {type: Date, default: util.Now},

    //PROPERTIES--------------------
    guid: {type: String, default: uuid},
    name: {type: String, required: [true, "Отсутствует Название экспоната"], minlength: [1, "Слишком короткое Название экспоната"], unique: [true, "Название экспоната должно быть уникальным"]},
    catsub: {type: String, required: [true, "Отсутствует Категория экспоната"]},
    countries: [String],
    description: String,
    coverImage: String,
    imageGallery: [{
        image: String,
        thumbnail: String,
        description:{ru: String, en: String},
        guid: {type: String, default: uuid}
    }],
    fields: [{name: String, value: String}]
});

tupleSchema.plugin(autoIncrementPlugin.plugin, "Tuple");

module.exports = mongoose.model("Tuple", tupleSchema);