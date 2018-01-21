"use strict";
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    login: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, default:""},
});

module.exports = mongoose.model("User", UserSchema);