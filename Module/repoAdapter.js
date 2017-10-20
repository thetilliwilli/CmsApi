"use strict";
const repo = require("../Repo/index.js");
const base64ToFile = require("../Repo/base64ToFile.js");
const uuid = require("uuid/v4");

module.exports = {
    /**
     * Принять на вход base64 галлерею -> сохранить на диск -> вернуть галлерею с подмененной инфой по сохранненым файлам
     */
    StoreGallery: function(galleryId, imageGallery){
        const gid = galleryId.toString();
        return repo.CreateEmptyGallery(gid.toString())
            .then(() => Promise.all( 
                imageGallery.map( 
                    img => {
                        const info = base64ToFile(img.image);
                        return repo.SaveFile(gid, uuid(), info.ext, info.content);
                    }
                )
            ))
            .then(() => console.log("Gallery created"))
            .catch(error => {console.error(error); throw error;});
    },
};