"use strict";

const mongoose = require("mongoose");
const uuid =  require("uuid/v4");
const autoIncrementPlugin = require("mongoose-auto-increment");
const util = require("../Module/util.js");

var playerSchema = new mongoose.Schema({
    //META--------------------
    _mt: {type: Date, default: util.Now},

    //PROPERTIES--------------------
    guid: {type: String, default: uuid},
});

playerSchema.plugin(autoIncrementPlugin.plugin, "Player");

module.exports = mongoose.model("Player", playerSchema);