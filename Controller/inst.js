const instModel = require("../Model/inst.js");
const fs = require("fs");
const path = require("path");
const util = require("../Module/util.js");
const repoAdapter = require("../Module/repoAdapter.js");

class InstCtrl
{
    constructor(){
        // this.New = this.New.bind(this);
        this.Delete = this.Delete.bind(this);
        this.Update = this.Update.bind(this);
        this.LastUpdate = this.LastUpdate.bind(this);
    }

    //REST METHODS-----------------------------
    All(pReq, pRes){
        instModel.find({}).select("id type hardname description complex").lean().exec().then((result)=>{
            pRes.status(200).json(result)
        });
    }

    Status(pReq, pRes){
        instModel.find({}).select("id type hardname description uptime").lean().exec().then((result)=>{
            pRes.status(200).json({
                statuses:result,
                serverTime:util.Now()
            });
        });
    }

    // One(pReq, pRes){
    //     instModel.findById(pReq.params.id, (err, result)=>{
    //         if(err) pRes.send(err);
    //         else pRes.json(result);
    //     });
    // }

    // New(pReq, pRes){
    //     var dto = pReq.body;
    //     dto._mt = util.Now();//При любых изменения надо обновить modified timestamp
    //     let self = this;
    //     Promise.resolve()
    //         .then(() => this._NextIndex())
    //         .then(index => repoAdapter.StoreGallery("Inst/"+index, dto))
    //         .then(() => instModel.create(dto))
    //         .then(() => self.LastUpdate())
    //         .then(() => pRes.status(200).send({message:"ok"}))
    //         .catch(error => pRes.status(200).send(self._Error(error)));
    // }

    Delete(pReq, pRes){
        let self = this;
        Promise.resolve()
            .then(() => repoAdapter.DeleteGallery("Inst/"+pReq.params.id))
            .then(() => instModel.findOneAndRemove({id: pReq.params.id}).exec())
            .then(() => self.LastUpdate())
            .then(() => pRes.status(200).send({message:"ok"}) )
            .catch(error => pRes.status(200).send(self._Error(error)));
    }

    Update(pReq, pRes){
        var dto = pReq.body;
        let self = this;
        Promise.resolve()
            // .then(() => repoAdapter.StoreGallery("Inst/"+pReq.params.id, dto))
            .then(() => instModel.findOneAndUpdate({id: pReq.params.id}, dto).exec())
            .then(()=>self.LastUpdate())
            .then(() => pRes.status(200).send({message:"ok"}) )
            .catch(error => pRes.status(200).send(self._Error(error)));
    }

    //UTIL METHODS--------------------------------------------
    ValidateNewInstData(instData){
        if(!instData || !instData.name.ru || instData.name.ru.trim() === "")
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
        return new Promise((rs,rj)=> instModel.nextCount((error, count)=>error?rj(error):rs(count)) );
    }

    _Error(error){
        error = error instanceof Error ? error.message : error;
        console.error(error);
        return {error};
    }
}

module.exports = new InstCtrl();