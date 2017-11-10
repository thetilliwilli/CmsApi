//REQUIRE-------------------------
const config = require("../config.js");
//SETUP---------------------------
const REPO_HOSTNAME = `http://${config.repo.host}:${config.repo.port}`;

class ExhibitParser
{
    constructor(){
        this.Projection = this.Projection.bind(this);
        this.Transformation = this.Transformation.bind(this);
        this.Filter = this.Filter.bind(this);
    }

    Projection(subject){
        switch(subject)
        {
            case "meta": return "_mt";
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
                case "meta":
                    const entities = responseJson.map(i => ({id: i._id, mt: i._mt}));
                    const times = entities.map(i=>i.mt?i.mt:new Date(0));
                    const maxTime = Math.max(...times);
                    const timestamp = (new Date(maxTime)).toISOString();
                    return {entities, timestamp};
                case "entity":return self._Form(responseJson[0]);
                case "all": return {entities: responseJson.map(i => self._Form(i))};
                case "ping": return responseJson;
                default: throw new Error(`Invalid subject ${subject}`);
            }
        };
    }

    Filter(appid, subject, dc, instModel){
        if(dc==="exhibit" || dc==="golo")
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

        ens.imageGallery = ens.imageGallery.map(img => ({
            image: !img.image ? "" : REPO_HOSTNAME + img.image,//если нет изображения - то пустую строку
            description: img.description,
        }));
        ens.coverImage = !ens.coverImage ? "" : REPO_HOSTNAME + ens.coverImage;//если нет изображения - то пустую строку
        return ens;
    }
}
const singleton = new ExhibitParser();
module.exports = singleton;