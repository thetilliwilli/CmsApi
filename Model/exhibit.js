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
    // id: String,
    guid: {type:String, default: uuid},
    name: {ru: {type: String, required: [true, "Отсутствует Название экспоната"], minlength: [1, "Слишком короткое Название экспоната"], unique: [true, "Название экспоната должно быть уникальным"]}, en: String},
    title: {ru: String, en: String}, //{ru: {type: String, required: [true, "Отсутствует Заголовок экспоната"], minlength: [1, "Слишком короткий  Заголовок экспоната"]}, en: String},
    subtitle: {ru: String, en: String},
    location: {ru: String, en: String},
    description: {ru: String, en: String},
    history: {ru: String, en: String},
    date: {type: Date, default: util.Now},
    coverImage: {type: String, default: "/Static/img/defaultExhibitAvatar.jpg"}, //{ru: String, en: String}, //{type: String, required: [true, "Отсутствует аватарка экспоната"]},
    fields: [{
        name: {ru: String, en: String},
        value: {ru: String, en: String}
    }],
    imageGallery: [{
        image: String,
        // thumbnail: String,
        description:{ru: String, en: String},
        guid: {type: String, default: uuid}
    }],
});

// exhibitSchema.post("save", doc => {
//     console.log("post save");
//     console.log(this);
//     console.log(doc);
// });
// exhibitSchema.post("update", doc => {
    //     console.log("post update");
    //     console.log(this);
    //     console.log(doc);
    // });
    // exhibitSchema.post("findOneAndUpdate", doc => {
        //     console.log("post update");
        //     console.log(this);
        //     console.log(doc);
// });

exhibitSchema.plugin(autoIncrementPlugin.plugin, 'Exhibit');

module.exports = mongoose.model("Exhibit", exhibitSchema);