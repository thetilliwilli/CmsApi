
class TupleParser
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
                    let res = responseJson[0];
                    res.id = res._id;delete res._id;
                    res.mt = res._mt;delete res._mt;
                    delete res.guid;
                    delete res.__v;
                    res.imageGallery = res.imageGallery.map(img => ({image: img.image, description: img.description.ru}));
                    return res;
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
const singleton = new TupleParser();
module.exports = singleton;