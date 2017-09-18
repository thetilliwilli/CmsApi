"use strict";
module.exports = function MongooseInit(pConfig){
    const mongoose = require("mongoose");
    const autoIncrement = require('mongoose-auto-increment');
    return new Promise((resolve, reject)=>{
        //Настраиваем дефолтные промисы
        mongoose.Promise = global.Promise;
        mongoose.connect(pConfig.connectionString, {useMongoClient:true});

        autoIncrement.initialize(mongoose.connection);//Чтобы работало авто-инкрементирующиеся поле

        mongoose.connection.on("error", console.error.bind(console, 'connection error:'));

        mongoose.connection.on("error", reject);
        mongoose.connection.on("open", resolve);
    });
};