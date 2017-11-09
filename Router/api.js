const router = require("express").Router();
const API = require("../Controller/api.js");

const tagApi = API("exhibit");
const tupleApi = API("tuple");
const goloApi = API("golo");

//subject - это тип задаваемого вопроса к серверу из списка: [ meta, entity, all, ping]
router.route("/tag/:appid/:subject/:ensid*?")
    .get(tagApi)
    .post(tagApi);
router.route("/tuple/:appid/:subject/:ensid*?").get(tupleApi);
router.route("/golo/:appid/:subject/:ensid*?")
    .get(goloApi)
    .post(goloApi);

module.exports = router;