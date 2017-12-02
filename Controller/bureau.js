const bureauModel = require("../Model/bureau.js");
const fs = require("fs");
const path = require("path");
const util = require("../Module/util.js");
const repoAdapter = require("../Module/repoAdapter.js");
const OverflowHandler = require("../Module/overflowHandler.js");

class BureauCtrl
{
    constructor(){
        this.New = this.New.bind(this);
        this.Delete = this.Delete.bind(this);
        this.Update = this.Update.bind(this);
        this.LastUpdate = this.LastUpdate.bind(this);
    }

    //REST METHODS-----------------------------
    All(pReq, pRes){
        bureauModel.find({}).select("id fullName").lean().exec().then((result)=>{
            pRes.status(200).json(result)
        });
    }

    One(pReq, pRes){
        bureauModel.findById(pReq.params.id, (err, result)=>{
            if(err) pRes.send(err);
            else pRes.json(result);
        });
    }

    New(pReq, pRes){
        var dto = pReq.body;
        dto._mt = util.Now();//При любых изменения надо обновить modified timestamp
        let self = this;
        Promise.resolve()
            .then(() => this._NextIndex())
            .then(index => repoAdapter.StoreGallery_BureauDesigner("Bureau/"+index, dto))
            .then(() => bureauModel.create(dto))
            .then(() => OverflowHandler(dto))
            .then(() => self.LastUpdate())
            .then(() => pRes.status(200).send({message:"ok"}))
            .catch(error => pRes.status(200).send(self._Error(error)));
    }

    Delete(pReq, pRes){
        let self = this;
        Promise.resolve()
            .then(() => repoAdapter.DeleteGallery("Bureau/"+pReq.params.id))
            .then(() => bureauModel.findByIdAndRemove(pReq.params.id).exec())
            .then(() => self.LastUpdate())
            .then(() => pRes.status(200).send({message:"ok"}) )
            .catch(error => pRes.status(200).send(self._Error(error)));
    }

    Update(pReq, pRes){
        var dto = pReq.body;
        dto._mt = util.Now();//При любых изменения надо обновить modified timestamp
        let self = this;
        Promise.resolve()
            .then(() => repoAdapter.StoreGallery_BureauDesigner("Bureau/"+pReq.params.id, dto))
            .then(() => bureauModel.findByIdAndUpdate(pReq.params.id, dto).exec())
            .then(() => OverflowHandler(dto))
            .then(()=>self.LastUpdate())
            .then(() => pRes.status(200).send({message:"ok"}) )
            .catch(error => pRes.status(200).send(self._Error(error)));
    }

    //UTIL METHODS--------------------------------------------
    ValidateNewBureauData(bureauData){
        if(!bureauData || !bureauData.name.ru || bureauData.name.ru.trim() === "")
            return this.NewValidationError("Отсутствует название экспоната");
    }
    
    //ERROR CREATORS---------------------------------------------
    NewValidationError(message){
        return {message, type:"ValidationError"};
    }

    LastUpdate(){
        var output=(new Date()).toISOString().split(".")[0].split("-").join("").split(":").join("")+"Z";
        fs.writeFile(path.join(__dirname, "../Scripts/lastUpdate.txt"), output);
    }

    //PRIVATE
    _NextIndex(){
        return new Promise((rs,rj)=> bureauModel.nextCount((error, count)=>error?rj(error):rs(count)) );
    }

    _Error(error){
        error = error instanceof Error ? error.message : error;
        console.error(error);
        return {error};
    }
}

module.exports = new BureauCtrl();