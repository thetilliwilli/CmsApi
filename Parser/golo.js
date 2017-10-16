
class GoloParser
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
        return function(responseJson){
            switch(subject)
            {
                case "meta": return {entities: responseJson.map(i => ({id: i._id, mt: i._mt}))};
                case "entity":
                    responseJson = responseJson[0];
                    responseJson.id = responseJson._id;
                    responseJson.mt = responseJson._mt;
                    delete responseJson._id;
                    delete responseJson._mt;
                return responseJson;
                case "all": return {entities: responseJson.map(i => {
                    i.id = i._id;
                    i.mt = i._mt;
                    delete i._id;
                    delete i._mt;
                    return i;
                })};
                case "ping": return responseJson;
                default: throw new Error(`Invalid subject ${subject}`);
            }
        };
    }
}
const singleton = new GoloParser();
module.exports = singleton;