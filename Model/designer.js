"use strict";

const mongoose = require("mongoose");
const uuid =  require("uuid/v4");
const autoIncrementPlugin = require("mongoose-auto-increment");
const util = require("../Module/util.js");
const BureauSchema = require("./bureau.schema.js");

var designerSchema = new mongoose.Schema({
    //META--------------------
    _mt: {type: Date, default: util.Now},

    //PROPERTIES--------------------
    shortName : {type: String, default: ""}, //"Чуканова А.Ф.",
    fullName : {type: String, default: "", required: true}, //"Чуканова Анастасия Федотовна",
    birthDate : {type: String, default: ""}, //"07.07.1932",
    deathDate : {type: String, default: ""}, //"",
    birthPlace : {type: String, default: ""}, //"Воронежская область, Гремяченский район, с. Яблочное ",
    position : {type: String, default: ""}, //"Фрезеровщица инструментального цеха №18, Тульский машиностроительный завод",//занимаемая должность
    totalXP : {type: String, default: ""}, //"",
    industryXP : {type: String, default: ""}, //"44 года",
    education : {type: String, default: ""}, //"Неполное среднее",//образование
    degree : {type: String, default: ""}, //"не имеет",//ученая степень
    biography : {type: String, default: ""}, //"Фрезеровщица инструментального цеха №18",
    awards : {type: String, default: ""}, //"Кавалер ордена Ленина (1970 г.)",
    characteristics : {type: String, default: ""}, //"Высококлассный специалист - инструментальщик по изготовлению технологической оснастки, используемой в военном производстве.",
    portrait: {type: String, default: ""}, //"",//портрет конструктора
    // bureau: BureauSchema, //becareful subdoc
    bureau: {type: Number, ref: "Bureau"}
});

designerSchema.plugin(autoIncrementPlugin.plugin, "Designer");

module.exports = mongoose.model("Designer", designerSchema);