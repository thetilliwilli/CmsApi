
class ExhibitParser
{
    SelectionFilter(subject){
        switch(subject)
        {
            case "meta": return "_mt";
            case "entity": return null;
            case "all": return null;
            case "ping": return null;
            default: throw new Error(`Invalid subject ${subject}`);
        }
    }

    TransformationFunction(subject){
        let self = this;
        return function(responseJson){
            switch(subject)
            {
                case "meta": return {entities: responseJson.map(i => ({id: i._id, mt: i._mt}))};
                case "entity":return self._Form(responseJson[0]);
                case "all": return {entities: responseJson.map(i => self._Form(i))};
                case "ping": return responseJson;
                default: throw new Error(`Invalid subject ${subject}`);
            }
        };
    }

    _Form(ens){
        ens.id = ens._id;delete ens._id;
        ens.mt = ens._mt;delete ens._mt;
        delete ens.guid;
        delete ens.__v;
        return ens;
    }
}
const singleton = new ExhibitParser();
module.exports = singleton;