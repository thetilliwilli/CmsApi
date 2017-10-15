// const exhibitModel = require("../Model/exhibit.js");

/**
 * Класс предоставляет сервис по доступу к определенному DataChannel'y по имени
 */
class ApiController
{
    constructor(model, parser){
        if(!model)
            throw new Error("Invalid model");
        if(!parser)
            throw new Error("Invalid parser");

        this.model = require(`../Model/${model}.js`);
        this.parser = require(`../Parser/${parser}.js`);
    }

    /**
     * Задать вопрос к сервису
     * @param {*} appid Application Persistent Id
     * @param {*} subject это тип задаваемого вопроса к серверу из списка: [ meta, entity, all, ping]
     * @param {*} ensid это уникальный номер сущности, например: a0dbf8a9-5980-4e01-8793-74690f7f4b93
     */
    Ask(appid, subject, ensid){
        switch(subject)
        {
            case "meta": return this.model.find({}).select(this.parser.SelectionFilter("meta")).lean().exec().then(this.parser.TransformationFunction("meta"));
            case "entity": return this.model.find({_id:ensid}).select(this.parser.SelectionFilter("entity")).lean().exec().then(this.parser.TransformationFunction("entity"));
            case "all": return this.model.find({}).select(this.parser.SelectionFilter("all")).lean().exec().then(this.parser.TransformationFunction("all"));
            case "ping": return Promise.resolve(JSON.stringify("ok")).then(this.parser.TransformationFunction("ping"));
            default: return Promise.reject({error: true, payload: `Invalid subject ${subject}`});
        }
    }
}


/** 
 * Создает инстанс ApiController'a 
 * @param {string} dc Data channel name. Должно совпадать с именем Mongoose Model : [exhibit, tuple, golo]
 * @returns {ApiController}
 */
function ApiControllerFabric(dc){
    if(!dc || typeof(dc) !== "string")
        throw new Error("Invalid dataChannel");

    const api = new ApiController(dc, dc);

    return function (req, res){
        const appid = req.params.appid;
        const subject = req.params.subject;
        const ensid = req.params.ensid;
        api.Ask(appid, subject, ensid)
            .then( result => res.status(200).send(result) )
            .catch( error => res.status(200).send(error) )
    };
}

module.exports = ApiControllerFabric;