"use strict";
const mongoose = require("mongoose");
const BureauSchema = require("./bureau.schema.js");
module.exports = mongoose.model("Bureau", BureauSchema);