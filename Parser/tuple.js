"use strict";
//REQUIRE-------------------------
const config = require("../config.js");
//SETUP---------------------------
const REPO_HOSTNAME = `http://${config.repo.host}:${config.repo.port}`;

const CATSUBS = [
    "ОружиеПехоты.Пистолеты",
    "ОружиеПехоты.ПистолетыПулеметы",
    "ОружиеПехоты.Пулеметы",
    "ОружиеПехоты.ПТРК",
    "ОружиеПехоты.СнайперскиеВинтовки",
    "ОружиеПехоты.АвтоматическиеВинтовки",
    "ОружиеПехоты.Гранатометы",
    "ОружиеПехоты.Револьверы",
    "ОружиеПехоты.ШтурмовыеВинтовки",

    "БоеваяТехника.АвтоматическиеПушки",
    "БоеваяТехника.РакетныеКомплексыНаКораблях",
    "БоеваяТехника.БоевыеКорабли",
    "БоеваяТехника.Бронетранспортеры",
    "БоеваяТехника.Танки",
    "БоеваяТехника.Вертолеты",
    "БоеваяТехника.ЗСУ",
    "БоеваяТехника.РСЗО",
    "БоеваяТехника.Самолеты",
    "БоеваяТехника.САУ",
    "БоеваяТехника.Минометы",
    "БоеваяТехника.БуксируемыеОрудия",
    "БоеваяТехника.БоевыеМашины",
];

const COUNTRIES = [
    "АВСТРИЯ",
    "БРИТАНИЯ",
    "ВЕЛИКОБРИТАНИЯ",
    "ГЕРМАНИЯ",
    "ИТАЛИЯ",
    "СССР",
    "РОССИЯ",
    "БЕЛЬГИЯ",
    "ФРАНЦИЯ",
    "ИЗРАИЛЬ",
    "КИТАЙ",
    "США",
    "ЯПОНИЯ",
    "ФИНЛЯНДИЯ",
    "ШВЕЙЦАРИЯ",
    "ИНДИЯ",
    "ЮЖНАЯ КОРЕЯ",
    "ЮЖНАЯ АФРИКА",
    "ПОЛЬША",
    "ЦВЕЦИЯ",
    "АРГЕНТИНА",
    "БРАЗИЛИЯ",
    "ЧЕХОСЛОВАКИЯ",
    "ГРУЗИЯ",
    "ИСПАНИЯ",
    "РУМЫНИЯ",
    "АРМЕНИЯ",
    "УКРАИНА",
    "ЮГОСЛАВИЯ",
    "ЧЕХИЯ",
    "КАЗАХСТАН",
];


class TupleParser
{
    constructor(){
        this.Projection = this.Projection.bind(this);
        this.Transformation = this.Transformation.bind(this);
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
                case "meta": return {entities: responseJson.map(i => ({id: i._id, mt: i._mt}))};
                case "entity": return self._Form(responseJson[0]);
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
        const cs = ens.catsub.split(".");
            ens.category = cs[0] === "ОружиеПехоты" ? 0 : 1;
            ens.type = CATSUBS.indexOf(ens.catsub);//смотрим по полному названию
            delete ens.catsub;
        ens.countries = ens.countries.map(c => COUNTRIES.indexOf(c));
        ens.properties = {}
            ens.fields.forEach(f => ens.properties[f.name] = f.value);
            delete ens.fields;
        ens.images = ens.imageGallery.map(img => REPO_HOSTNAME + img.image);
            delete ens.imageGallery;
        ens.cover = REPO_HOSTNAME + ens.coverImage;
            delete ens.coverImage;
        return ens;
    }
}
const singleton = new TupleParser();
module.exports = singleton;