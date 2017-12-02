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
        if(!dto || !dto.imageGallery)
            return Promise.resolve();//Например когда меняем complex, ordinal
        const gallery = dto.imageGallery;
        const gid = galleryId.toString();
        return Promise.resolve()
            .then(() => repo.CreateEmptyGallery(gid.toString()))
            .then(() => Promise.all(gallery.map(
                (img, index) => {
                    if(img.image.slice(0,5) === "data:")//это base64, файл нужно пересохранить на диск
                    {
                        const info = base64ToFile(img.image);
                        const fid = uuid();
                        return repo.SaveFile(gid, fid, info.ext, info.content)
                            .then(() => dto.imageGallery[index].image = `${config.repo.webRoot}/${gid}/${fid}.${info.ext}`);//подменить ссылку
                    }
                    else
                    {
                        if(img.image.split("/")[4] === gid.split("/")[1])//если изображение принадлежит этой галлереи то ничего не делать
                        {
                            return Promise.resolve();
                        }
                        else//изображение получено клонированием из другой галлереи, необходимо скопировать файл
                        {
                            const parts = img.image.split("/") ;
                            const info = parts[5].split(".");
                            const gidFrom = `${parts[3]}/${parts[4]}`;
                            return repo.CopyFile(gidFrom, gid, info[0], info[1])
                                .then(() => dto.imageGallery[index].image = `${config.repo.webRoot}/${gid}/${info[0]}.${info[1]}`);//подменить ссылку;
                        }
                    }
                    
                }
            )))
            .then(() => {//Пересохраняем coverImage
                if(!dto.coverImage) return true;
                if(dto.coverImage.slice(0,5) === "data:")
                {
                    const info = base64ToFile(dto.coverImage);
                    return repo.SaveFile(gid, "cover", info.ext, info.content)
                        .then(() => dto.coverImage = `${config.repo.webRoot}/${gid}/cover.${info.ext}`);
                }
                else
                {
                    if(dto.coverImage.split("/")[4] === gid.split("/")[1])//если изображение принадлежит этой галлереи то ничего не делать
                    {
                        return Promise.resolve();
                    }
                    else
                    {
                        const parts = dto.coverImage.split("/");
                        const info = parts[5].split(".");
                        const gidFrom = `${parts[3]}/${parts[4]}`;
                        return repo.CopyFile(gidFrom, gid, info[0], info[1])
                            .then(() => dto.coverImage = `${config.repo.webRoot}/${gid}/cover.${info[1]}`);//подменить ссылку;
                    }
                }
            })
            .then(() => {//Пересохраняем video (Golo)
                if(!dto.video) return;
                if(dto.video.slice(0,5) === "data:")
                {
                    const info = base64ToFile(dto.video);
                    return repo.SaveFile(gid, "cover", info.ext, info.content)
                        .then(() => dto.video = `${config.repo.webRoot}/${gid}/cover.${info.ext}`);
                }
                else
                {
                    if(dto.video.split("/")[4] === gid.split("/")[1])//если изображение принадлежит этой галлереи то ничего не делать
                    {
                        return Promise.resolve();
                    }
                    else
                    {
                        const parts = dto.video.split("/");
                        const info = parts[5].split(".");
                        const gidFrom = `${parts[3]}/${parts[4]}`;
                        return repo.CopyFile(gidFrom, gid, info[0], info[1])
                            .then(() => dto.video = `${config.repo.webRoot}/${gid}/cover.${info[1]}`);//подменить ссылку;
                    }
                }
            })
            .catch(error => {console.error(error); throw error;});
    },
    DeleteGallery: function(galleryId){
        repo.DeleteGallery(galleryId);
    },
    StoreGallery_BureauDesigner: function(galleryId, dto){
        if(!dto)
            return Promise.resolve();//Например когда меняем complex, ordinal
        const gid = galleryId.toString();
        return Promise.resolve()
            .then(() => repo.CreateEmptyGallery(gid.toString()))
            .then(() => {//Пересохраняем previewImage
                if(!dto.previewImage) return true;
                if(dto.previewImage.slice(0,5) === "data:")
                {
                    const info = base64ToFile(dto.previewImage);
                    return repo.SaveFile(gid, "preview", info.ext, info.content)
                        .then(() => dto.preview = `${config.repo.webRoot}/${gid}/preview.${info.ext}`);
                }
                else
                {
                    if(dto.previewImage.split("/")[4] === gid.split("/")[1])//если изображение принадлежит этой галлереи то ничего не делать
                    {
                        return Promise.resolve();
                    }
                    else
                    {
                        const parts = dto.previewImage.split("/");
                        const info = parts[5].split(".");
                        const gidFrom = `${parts[3]}/${parts[4]}`;
                        return repo.CopyFile(gidFrom, gid, info[0], info[1])
                            .then(() => dto.preview = `${config.repo.webRoot}/${gid}/preview.${info[1]}`);//подменить ссылку;
                    }
                }
            })
            .then(() => {//Пересохраняем logotypeImage
                if(!dto.logotypeImage) return true;
                if(dto.logotypeImage.slice(0,5) === "data:")
                {
                    const info = base64ToFile(dto.logotypeImage);
                    return repo.SaveFile(gid, "logotype", info.ext, info.content)
                        .then(() => dto.logotype = `${config.repo.webRoot}/${gid}/logotype.${info.ext}`);
                }
                else
                {
                    if(dto.logotypeImage.split("/")[4] === gid.split("/")[1])//если изображение принадлежит этой галлереи то ничего не делать
                    {
                        return Promise.resolve();
                    }
                    else
                    {
                        const parts = dto.logotypeImage.split("/");
                        const info = parts[5].split(".");
                        const gidFrom = `${parts[3]}/${parts[4]}`;
                        return repo.CopyFile(gidFrom, gid, info[0], info[1])
                            .then(() => dto.logotype = `${config.repo.webRoot}/${gid}/logotype.${info[1]}`);//подменить ссылку;
                    }
                }
            })
            .then(() => {//Пересохраняем portrait
                if(!dto.portrait) return true;
                if(dto.portrait.slice(0,5) === "data:")
                {
                    const info = base64ToFile(dto.portrait);
                    return repo.SaveFile(gid, "cover", info.ext, info.content)
                        .then(() => dto.portrait = `${config.repo.webRoot}/${gid}/cover.${info.ext}`);
                }
                else
                {
                    if(dto.portrait.split("/")[4] === gid.split("/")[1])//если изображение принадлежит этой галлереи то ничего не делать
                    {
                        return Promise.resolve();
                    }
                    else
                    {
                        const parts = dto.portrait.split("/");
                        const info = parts[5].split(".");
                        const gidFrom = `${parts[3]}/${parts[4]}`;
                        return repo.CopyFile(gidFrom, gid, info[0], info[1])
                            .then(() => dto.portrait = `${config.repo.webRoot}/${gid}/cover.${info[1]}`);//подменить ссылку;
                    }
                }
            })
            .catch(error => {console.error(error); throw error;});
    },
};