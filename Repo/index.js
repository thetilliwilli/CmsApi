"use strict";
const serverConfig = require("../config.js");
const fs = require("fs");
const path = require("path");

/**
 *  Уровень абстракции для работы с указанной директорией на диске в качестве Репозитория под Медиа файлы
 * Мне нужна Сущность кая будет оперировать след категориями:
 * 1 Галлерея - Коллекция Галлерей
 * 2 МедиаФайл - Коллекция МедиаФайлов
 * 
 */
class MediaRepository
{
    constructor(root){
        if(!root || typeof(root)!=="string" || !fs.existsSync(root)) throw new Error(`Invalid root directory or non exist: ${root}`);

        this.root = root;
    }

    SafeAbs(...parts){
        const abs = path.normalize(path.join(this.root, ...parts));
        if(abs.indexOf(this.root)===-1) throw new Error("Запрашиваемый путь вышел за пределы Root Directory");
        return abs;
    }

    //GALLERY-------------------------------------------------------------------------

    /**
     * Создать Галлерею
     * @param {string} gid - уникальное имя галлереи
     */
    CreateEmptyGallery(gid){
        const abs = this.SafeAbs(gid);
        return new Promise((rs, rj)=>{
            fs.access(abs , fs.constants.R_OK | fs.constants.W_OK, err=>{
                if(!err) return rs();
                if(err.code === "ENOENT")
                    fs.mkdir(abs, fs.constants.R_OK | fs.constants.W_OK, err => {
                        if(err)
                            return rj(err);
                        else
                            return rs();
                    });
                else
                    return rj(err);
            });
        });
    }

    /**
     * Удалить галлерею
     * @param {string} gid - уникальное имя галлереи
     */
    DeleteGallery(gid){
        const abs = this.SafeAbs(gid);

        var ReadDirResolver = (RESOLVE_READDIR, REJECT_READDIR)=>{
            fs.readdir(abs, (error, files)=>error?REJECT_READDIR(error):RESOLVE_READDIR(files))
        };

        var FilesDeleteFunction = function(files){
            const allJobs = files.map(f => new Promise((RESOLVE_FILES_DELETE, REJECT_FILES_DELETE)=>{
                fs.unlink(path.join(abs, f), error=>error?REJECT_FILES_DELETE(error):RESOLVE_FILES_DELETE());
            }));
            return Promise.all(allJobs);
        };

        var RmdirResolver = (RESOLVE_RMDIR, REJECT_RMDIR)=>{
            fs.rmdir(abs, err => err?REJECT_RMDIR(err):RESOLVE_RMDIR());
        };

        return Promise.resolve()
            .then(() => new Promise(ReadDirResolver))
            .then(FilesDeleteFunction)
            .then(() => new Promise(RmdirResolver))
            .catch(error => {
                if(error.code === "ENOENT")//если нету такой папки то ничего не делать - это нормальная ситуация
                    return true;
                console.error(error);
                throw error;
            });
    }

    /**
     * Запросить информацию по списку сущностей в галлереи
     * @param {string} gid - уникальное имя галлереи
     */
    GalleryInfo(gid){

    }

    //MediaFile-------------------------------------------------------------------------

    /**
     * Сохранить файл
     * @param {string} gid - уникальное имя галлереи
     * @param {string} fid - уникальное имя файла
     * @param {string} content - контент файла
     * @param {string} fext - разрешение файла
     */
    SaveFile(gid, fid, fext, content){
        const abs = this.SafeAbs(gid, fid+"."+fext);
        return new Promise((rs,rj) => {
            fs.writeFile(abs, content, "base64", err => err?rj(err):rs());
        });
    }

    /**
     * Удалить файл
     * @param {string} gid - уникальное имя галлереи
     * @param {string} fid - уникальное имя файла
     * @param {string} fext - разрешение файла
     */
    DeleteFile(gid, fid, fext){
        const abs = this.SafeAbs(gid, fid+"."+fext);
        return new Promise((rs,rj) => {
            fs.unlink(abs, err => err?rj(err):rs());
        });
    }

    CopyFile(gidFrom, gidTo, fid, fext){
        const absFrom = this.SafeAbs(gidFrom, fid+"."+fext);
        const absTo = this.SafeAbs(gidTo, fid+"."+fext);
        return new Promise((rs,rj) => {
            const streamFrom = fs.createReadStream(absFrom);
            const streamTo = fs.createWriteStream(absTo);
            function FinilizeAndReject(error){
                streamFrom.unpipe(streamTo);
                streamTo.end();
                streamTo.destroy();
                streamFrom.destroy();
                rj(error);
            }
            streamTo.on("error", FinilizeAndReject);
            streamFrom.on("error", FinilizeAndReject);
            streamFrom.pipe(streamTo);//непосредственно момент копирования
            streamTo.on("finish", ()=>{
                rs();
            });
        });
    }

    /**
     * Получить информацию по файлу
     * @param {string} gid 
     * @param {string} fid 
     * @returns {{}} - ???
     */
    FileInfo(gid, fid){

    }

}

/**
 * Мне нужна сущность кая будет уметь:
 * 1 Создавать папку по пути к ней
 * 2 Сохранять файл в указанную папку
 * 3 Удалять файл
 */

const singleton = new MediaRepository(serverConfig.repo.root);

module.exports = singleton;