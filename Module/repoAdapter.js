"use strict";
const repo = require("../Repo/index.js");
const base64ToFile = require("../Repo/base64ToFile.js");
const uuid = require("uuid/v4");
const config = require("../config.js");

module.exports = {
    /**
     * Принять на вход base64 галлерею -> сохранить на диск -> вернуть галлерею с подмененной инфой по сохранненым файлам
     */
    StoreGallery: function(galleryId, dto){
        const gallery = dto.imageGallery.filter(img => img.image.slice(0,5) === "data:");
        const gid = galleryId.toString();
        const fids = [];
        const exts = [];
        return repo.CreateEmptyGallery(gid.toString())
            .then(() => Promise.all(gallery.map( 
                (img, index) => {
                    const info = base64ToFile(img.image);
                    const fid = uuid();
                    fids.push(fid);
                    exts.push(info.ext);
                    return repo.SaveFile(gid, fid, info.ext, info.content);
                }
            )))
            .then(() => {//Пересохраняем coverImage
                if(dto.coverImage.slice(0,5) !== "data:") return;//Выходим если не base64 изображение
                const info = base64ToFile(dto.coverImage);
                return repo.SaveFile(gid, "cover", info.ext, info.content)
                    .then(() => dto.coverImage = `${config.repo.webRoot}/${gid}/cover.${info.ext}`);
            })
            .then(() => gallery.forEach( (img,i) => img.image = `${config.repo.webRoot}/${gid}/${fids[i]}.${exts[i]}`))
            .catch(error => {console.error(error); throw error;});
    },
    DeleteGallery: function(galleryId){
        repo.DeleteGallery(galleryId);
    }
};