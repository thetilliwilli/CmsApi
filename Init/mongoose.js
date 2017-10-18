"use strict";

const serverConfig = require("../config.js");

module.exports = function MongooseInit(){
    const mongoose = require("mongoose");
    const autoIncrement = require('mongoose-auto-increment');
    return new Promise((resolve, reject)=>{
        //Настраиваем дефолтные промисы
        mongoose.Promise = global.Promise;
        mongoose.connect(serverConfig.db.connectionString, {useMongoClient:true});

        autoIncrement.initialize(mongoose.connection);//Чтобы работало авто-инкрементирующиеся поле

        mongoose.connection.on("error", console.error.bind(console, 'connection error:'));

        mongoose.connection.on("error", reject);
        mongoose.connection.on("open", resolve);
    });
};