"use strict";
const config = require("../config.js");
const fs = require("fs");
const path = require("path");

function OverflowHandler(entityType, galleryId, savedFiles){
    const abs = path.join(config.repo.root, entityType, galleryId);
    fs.readdir(abs, (error, realFiles) => {
        if(error)
            return console.error(error);
        realFiles.forEach(f =>{
            const noExistInDb = savedFiles.indexOf(f)===-1;
            const noCoverImage = f.split(".")[0] !== "cover";
            if(noExistInDb && noCoverImage)
                fs.unlink(path.join(abs, f));
        });
    });

}

module.exports = function HOC(dto){
    try
    {
        if(dto.imageGallery.length === 0)
        {
            if(!dto.coverImage && !dto.video)
                return;
            const firstImageParts = dto.coverImage ? dto.coverImage.split("/") : dto.video.split("/");
            OverflowHandler(firstImageParts[3], firstImageParts[4], [""]);
        }
        else
        {
            const firstImageParts = dto.imageGallery[0].image.split("/");
            OverflowHandler(firstImageParts[3], firstImageParts[4], dto.imageGallery.map(i => i.image.split("/")[5]));
        }
    }
    catch(error)
    {
        console.warn(`Не удалось подчистить галеррею`);
    }
    finally
    {
        return true;
    }
}