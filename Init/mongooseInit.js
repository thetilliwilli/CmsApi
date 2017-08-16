const mongoose = require("mongoose");

module.exports = function MongooseInit(pConfig){
    return new Promise((resolve, reject)=>{
        //Настраиваем дефолтные промисы
        mongoose.Promise = global.Promise;
        mongoose.connect(pConfig.connectionString, {useMongoClient:true});
        // mongoose.connection.on("error", (err)=>{
        //     console.error("[MongooseInit]:(Init): Фейл при инициализации соединения к МонгоДБ. Проверьте параметры соединения");
        //     reject(err);
        // });
        mongoose.connection.on("error", console.error.bind(console, 'connection error:'));

        mongoose.connection.on("error", reject);
        mongoose.connection.on("open", resolve);
    });
};