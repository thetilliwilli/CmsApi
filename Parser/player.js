//REQUIRE-------------------------
const config = require("../config.js");
//SETUP---------------------------
const REPO_HOSTNAME = `http://${config.repo.host}:${config.repo.port}`;

class PlayerParser
{
    constructor(){
        this.Projection = this.Projection.bind(this);
        this.Transformation = this.Transformation.bind(this);
    }
    Projection(subject){
        switch(subject)
        {
            case "meta": return "_mt guid";
            case "entity": return null;
            case "all": return null;
            case "ping": return null;
            default: throw new Error(`Invalid subject ${subject}`);
        }
    }

    Transformation(subject){
        let self = this;
        return function(responseJson){
            switch(subject)
            {
                case "meta": return {entities: responseJson.map(i => ({id: i._id, mt: i._mt, title: i.title}))};
                case "entity": return self._Form(responseJson[0]);
                case "all": return {entities: responseJson.map(i => self._Form(i))};
                case "ping": return responseJson;
                default: throw new Error(`Invalid subject ${subject}`);
            }
        };
    }

    Filter(appid, subject, dc, instModel){
        if(dc==="exhibit" || dc==="player")
        {
            switch(subject)
            {
                case "meta":
                case "all":
                    return instModel.findOne({id: `${dc}.${appid}`}).exec().then(r => ({complex: r.complex}));
            }
        }
            
        return Promise.resolve({});
    }
    
    _Form(ens){
        ens.id = ens._id;delete ens._id;
        ens.mt = ens._mt;delete ens._mt;
        delete ens.guid;
        delete ens.__v;
        ens.mediaGallery = ens.imageGallery.map(img => ({
            image: !img.image ? "" : REPO_HOSTNAME + img.image,
            description: img.description,
        }));
            delete ens.imageGallery;
            !ens.video ? null : ens.mediaGallery.push({id:"video",video:REPO_HOSTNAME + ens.video});
            delete ens.video;
        return ens;
    }
}
const singleton = new PlayerParser();
module.exports = singleton;