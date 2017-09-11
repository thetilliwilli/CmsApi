/**
 * Путь к фото хранилищу /Static/PhotoRepo
 * Сигнатура фото файла rootPath/galleryId/imageId (/Static/PhotoRepo/96h983h5963h6h-v63-4v643v3-63/000.jpeg)
 * galleryId - это exhibitId
 * Допустимые расширения файлов изображений - только jpeg/jpg
 */
"use strict";
const config = require("../serverConfig.js");
const path = require("path");
const fs = require("fs");

function SaveBase64Image(base64, fileName){
    fs.writeFileSync(fileName, base64, "base64");
}

// function ConvertToJpeg(fileName){

// }

class PhotoRepository
{
    constructor(rootPath){
        if(!rootPath) throw new Error("Invalid arguments");

        this.rootPath = rootPath.toString();
    }

    PutImage(base64Image, galleryId, fileId){
        const absGalleryPath = path.join(this.rootPath, galleryId);
        
        if(!this.GalleryExists(galleryId))
            this.CreateGallery(galleryId);

        const files = fs.readdirSync(absGalleryPath);
        const fileCount = files.filter(f=>path.extname(f)==="jpeg").length;//Отбираем все файлы jpeg и только их считаем
        const fileName = fileId ? fileId : ("000"+fileCount).slice(-3)+".jpeg";
        const absFilePath = path.join(absGalleryPath, fileName);
        SaveBase64Image(base64Image, absFilePath);
    }

    DeleteImage(imageId, galleryId){
        if(!this.GalleryExists(galleryId))
            return;
        fs.unlinkSync(path.join(this.rootPath, galleryId, imageId));
    }

    CreateGallery(galleryId){
        const absGalleryPath = path.join(this.rootPath, galleryId);
        fs.mkdirSync(absGalleryPath);
        fs.mkdirSync(path.join(absGalleryPath, "Min"));
    }

    GalleryExists(galleryId){
        return fs.existsSync(path.join(this.rootPath, galleryId));
    }

}

module.exports = new PhotoRepository(config.photoRepo.rootPath);