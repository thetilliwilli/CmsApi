"use strict";
//INCLUDES--------------------------------------------------------------------------------------------
const mongoose = require("mongoose");
const photoRepo = require("../Modules/photoRepository.js");

//SETUP--------------------------------------------------------------------------------------------
function DateTimeNowIso(){
    return (new Date()).toISOString();
}
//LOGIC--------------------------------------------------------------------------------------------
var exhibitSchema = new mongoose.Schema({
    id: Number,
    guid: String,
    name: {ru: {type: String, required: [true, "Отсутствует Название экспоната"], minlength: [1, "Слишком короткое Название экспоната"], unique: [true, "Название экспоната должно быть уникальным"]}, en: String},
    title: {ru: {type: String, required: [true, "Отсутствует Заголовок экспоната"], minlength: [1, "Слишком короткий  Заголовок экспоната"]}, en: String},
    subtitle: {ru: String, en: String},
    location: {ru: String, en: String},
    description: {ru: String, en: String},
    history: {ru: String, en: String},
    date: {type: Date, default: DateTimeNowIso},
    coverImage: {type: String, required: [true, "Отсутствует аватарка экспоната"]},
    fields: [{name: String, value: String}],
    imageGallery: [{image: String, thumbnail: String, description:{ru: String, en: String}}],
});

exhibitSchema.pre("save", function(next){
    console.log(`Converting images to files for ${this.name.ru}`);
    const coverImageData = this.coverImage.split(",")[1];
    photoRepo.PutImage(coverImageData, this._id.toString(), "cover.jpeg");
    // this.imageGallery.forEach(img=>{
    // });
    next();
});

module.exports = mongoose.model("Exhibit", exhibitSchema);