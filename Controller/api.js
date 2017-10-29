const InstModel = require("../Model/inst.js");
const util = require("../Module/util.js");
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

        this.dc = model.toLowerCase();
        this.model = require(`../Model/${model}.js`);
        this.parser = require(`../Parser/${parser}.js`);
    }

    /**
     * Задать вопрос к сервису
     * @param {*} appid Application Persistent Id
     * @param {*} subject это тип задаваемого вопроса к серверу из списка: [ meta, entity, all, ping]
     * @param {*} ensid это уникальный номер сущности, например: a0dbf8a9-5980-4e01-8793-74690f7f4b93
     */
    Ask(appid, subject, ensid, filter){
        switch(subject)
        {
            case "meta": return this.model.find(filter).select(this.parser.Projection("meta")).lean().exec().then(this.parser.Transformation("meta"));
            case "entity": return this.model.find({_id:ensid}).select(this.parser.Projection("entity")).lean().exec().then(this.parser.Transformation("entity"));
            case "all": return this.model.find(filter).select(this.parser.Projection("all")).lean().exec().then(this.parser.Transformation("all"));
            case "ping": return Promise.resolve(JSON.stringify("ok")).then(this.parser.Transformation("ping"));
            case "register": return Promise.resolve(JSON.stringify("ok"));
            default: return Promise.reject({error: {message: `Invalid subject ${subject}`}});
        }
    }

    RegApp(pAppId, subject, pMeta){
        const appid = `${this.dc}.${pAppId}`;
        const meta = subject==="register"
            ? Object.assign({}, pMeta, {id: appid, type: this.dc, uptime: util.Now()})
            : Object.assign({}, {id: appid, type: this.dc, uptime: util.Now()});//если register то тело переданного запроса содержит meta если любой другой запрос то ненадо обновлять данные
        return Promise.resolve(
            InstModel.update(
                {id: appid},
                meta,
                {upsert: true, setDefaultsOnInsert: true}
            ).exec()
        );
    }

    GenerateFilter(appid, subject){
        return this.parser.Filter(appid, subject, this.dc, InstModel);
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

        Promise.resolve()
            .then( () => api.RegApp(appid, subject, req.body))
            .then( () => api.GenerateFilter(appid, subject)).then( filter => api.Ask(appid, subject, ensid, filter) )//Должны идти друг за другом
            .then( result => res.status(200).send(result) )
            .catch( error => res.status(200).send(error) )
    };
}

module.exports = ApiControllerFabric;