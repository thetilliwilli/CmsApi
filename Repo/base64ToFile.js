"use strict";

/**
 * Преобразует входящие base64 изображения (видео) в файл
 * @param {string} img base64 encoded image
 * @returns {{ext: string, content: string}} возвращает необходимую информацию для записи в файл
 */
function Base64ToFile(img){
    const commaPos = img.indexOf(",");
    if(commaPos === -1)
        throw new Error(`Invalid base64 image`);
    const ext = img.slice(0,commaPos).split("/")[1].split(";")[0];
    const content = img.slice(commaPos+1);
    return {ext, content};
};

module.exports = Base64ToFile;