const exhibitModel = require("../Model/exhibit.js");

class ExhibitCtrl
{
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
        exhibitModel.create(dto, error=>{
            error = error instanceof Error ? error.message : error;
            pRes.status(200).send(error?{error}:{message:"ok"});
        });
    }

    Delete(pReq, pRes){
        exhibitModel.findByIdAndRemove(pReq.params.id, (error)=>{
            pRes.status(200).send(error?{error}:{message:"ok"});
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