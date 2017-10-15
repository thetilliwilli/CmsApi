
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
                case "meta": return responseJson;
                case "entity": return responseJson;
                case "all": return responseJson;
                case "ping": return responseJson;
                default: throw new Error(`Invalid subject ${subject}`);
            }
        };
    }
}
const singleton = new GoloParser();
module.exports = singleton;