"use strict";

const mongoose = require("mongoose");
const uuid =  require("uuid/v4");
const autoIncrementPlugin = require("mongoose-auto-increment");
const util = require("../Module/util.js");

var bureauSchema = new mongoose.Schema({
    //META--------------------
    // _mt: {type: Date, default: util.Now},

    //PROPERTIES--------------------
    shortName: {type: String, default: ""}, //"АО «КБП»",
    fullName : {type: String, default: ""}, //"АО «Конструкторское бюро приборостроения» имени академика Г.А. Шипунова.",
    description: {type: String, default: ""}, //"История Конструкторского БЮРО началась в 1972 г...",
    preview : {type: String, default: ""}, //"",//только логотип (без текста)
    logotype : {type: String, default: ""}, //"",//полное изображение логотипа компании (с текстом)

    //Перед любым сохранением/изменением необходимо добавлять сюда <id of this[Designer._id]>
    //Сделать это через прехуки
    //Также удалять из другого КБ конструткторов у которых изменилось КБ
    designers : [String],//id конструкторов
});

bureauSchema.plugin(autoIncrementPlugin.plugin, "Bureau");

module.exports = bureauSchema;