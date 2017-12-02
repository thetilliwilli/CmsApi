const designerModel = require("../Model/designer.js");
const fs = require("fs");
const path = require("path");
const util = require("../Module/util.js");
const repoAdapter = require("../Module/repoAdapter.js");
const OverflowHandler = require("../Module/overflowHandler.js");

class DesignerCtrl
{
    constructor(){
        this.New = this.New.bind(this);
        this.Delete = this.Delete.bind(this);
        this.Update = this.Update.bind(this);
        this.LastUpdate = this.LastUpdate.bind(this);
    }

    //REST METHODS-----------------------------
    All(pReq, pRes){
        designerModel.find({}).select("id fullName").lean().exec().then((result)=>{
            pRes.status(200).json(result)
        });
    }

    One(pReq, pRes){
        designerModel.findById(pReq.params.id, (err, result)=>{
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
            .then(index => repoAdapter.StoreGallery_BureauDesigner("Designer/"+index, dto))
            .then(() => designerModel.create(dto))
            .then(() => OverflowHandler(dto))
            .then(() => self.LastUpdate())
            .then(() => pRes.status(200).send({message:"ok"}))
            .catch(error => pRes.status(200).send(self._Error(error)));
    }

    Delete(pReq, pRes){
        let self = this;
        Promise.resolve()
            .then(() => repoAdapter.DeleteGallery("Designer/"+pReq.params.id))
            .then(() => designerModel.findByIdAndRemove(pReq.params.id).exec())
            .then(() => self.LastUpdate())
            .then(() => pRes.status(200).send({message:"ok"}) )
            .catch(error => pRes.status(200).send(self._Error(error)));
    }

    Update(pReq, pRes){
        var dto = pReq.body;
        dto._mt = util.Now();//При любых изменения надо обновить modified timestamp
        let self = this;
        Promise.resolve()
            .then(() => repoAdapter.StoreGallery_BureauDesigner("Designer/"+pReq.params.id, dto))
            .then(() => designerModel.findByIdAndUpdate(pReq.params.id, dto).exec())
            .then(() => OverflowHandler(dto))
            .then(()=>self.LastUpdate())
            .then(() => pRes.status(200).send({message:"ok"}) )
            .catch(error => pRes.status(200).send(self._Error(error)));
    }

    //UTIL METHODS--------------------------------------------
    ValidateNewDesignerData(designerData){
        if(!designerData || !designerData.name.ru || designerData.name.ru.trim() === "")
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
        return new Promise((rs,rj)=> designerModel.nextCount((error, count)=>error?rj(error):rs(count)) );
    }

    _Error(error){
        error = error instanceof Error ? error.message : error;
        console.error(error);
        return {error};
    }
}

module.exports = new DesignerCtrl();