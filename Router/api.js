const router = require("express").Router();
const API = require("../Controller/api.js");

const tagApi = API("exhibit");
const tupleApi = API("tuple");
const goloApi = API("golo");
const bureauApi = API("bureau");
const designerApi = API("designer");

//subject - это тип задаваемого вопроса к серверу из списка: [ meta, entity, all, ping]
router.route("/tag/:appid/:subject/:ensid*?")
    .get(tagApi)
    .post(tagApi);//там где нужна регистрация Устройств (этикетки)
router.route("/tuple/:appid/:subject/:ensid*?").get(tupleApi);
router.route("/golo/:appid/:subject/:ensid*?")
    .get(goloApi)
    .post(goloApi);//там где нужна регистрация Устройств (этикетки)
router.route("/bureau/:appid/:subject/:ensid*?").get(bureauApi);
router.route("/designer/:appid/:subject/:ensid*?").get(designerApi);


module.exports = router;