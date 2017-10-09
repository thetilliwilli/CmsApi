const exhibitModel = require("../Model/exhibit.js");
const fs = require("fs");
const path = require("path");
const util = require("../Module/util.js");

class ExhibitCtrl
{
    constructor(){
        this.New = this.New.bind(this);
        this.Delete = this.Delete.bind(this);
        this.Update = this.Update.bind(this);
        this.LastUpdate = this.LastUpdate.bind(this);
    }

    //REST METHODS-----------------------------
    All(pReq, pRes){
        exhibitModel.find({}).select("id name").lean().exec().then((result)=>{
            pRes.status(200).json(result)
        });
    }

    One(pReq, pRes){
        exhibitModel.findById(pReq.params.id, (err, result)=>{
            if(err) pRes.send(err);
            else pRes.json(result);
        });
    }

    New(pReq, pRes){
        var dto = pReq.body;
        dto._mt = util.Now();//При любых изменения надо обновить modified timestamp
        let self = this;
        exhibitModel.create(dto)
            .then(() => {
                pRes.status(200).send({message:"ok"}) 
            })
            .then(() => {
                self.LastUpdate()
            })
            .catch(error=>{
                error = error instanceof Error ? error.message : error;
                pRes.status(200).send({error});
            });
    }

    Delete(pReq, pRes){
        let self = this;
        exhibitModel.findByIdAndRemove(pReq.params.id).exec()
            .then(() => pRes.status(200).send({message:"ok"}) )
            .then(()=>self.LastUpdate())
            .catch(error=>{
                error = error instanceof Error ? error.message : error;
                pRes.status(200).send({error});
            });
    }

    Update(pReq, pRes){
        var dto = pReq.body;
        dto._mt = util.Now();//При любых изменения надо обновить modified timestamp
        let self = this;
        exhibitModel.findByIdAndUpdate(pReq.params.id, dto).exec()
            .then(() => pRes.status(200).send({message:"ok"}) )
            .then(()=>self.LastUpdate())
            .catch(error => {
                error = error instanceof Error ? error.message : error;
                pRes.status(200).send({error});
            });
    }

    //UTIL METHODS--------------------------------------------
    ValidateNewExhibitData(exhibitData){
        if(!exhibitData || !exhibitData.name.ru || exhibitData.name.ru.trim() === "")
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
}

module.exports = new ExhibitCtrl();