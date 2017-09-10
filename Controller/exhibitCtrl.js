const exhibitModel = require("../Model/exhibit.js");

class ExhibitCtrl
{
    constructor(){

    }

    //REST METHODS-----------------------------
    All(pReq, pRes){
        exhibitModel.find({}).select("title ctFrom ctTo cl lang").then((result)=>{pRes.json(result)});
    }

    One(pReq, pRes){
        exhibitModel.findById(pReq.params.id, (err, result)=>{
            if(err) pRes.send(err);
            else pRes.json(result);
        });
    }

    New(pReq, pRes){
        var dto = pReq.body;
        exhibitModel.create(dto, error=>{
            pRes.status(200).send(error?{error}:{message:"ok"});
        });
    }

    Delete(pReq, pRes){
        exhibitModel.findByIdAndRemove(pReq.params.id, (err)=>{
            if(err) pRes.send(err);
            else pRes.send("ok");
        });
    }

    Update(pReq, pRes){
        exhibitModel.findByIdAndUpdate(pReq.params.id, pReq.body, (err)=>{
            if(err) pRes.send(err);
            else pRes.send("ok");
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
}

module.exports = new ExhibitCtrl();