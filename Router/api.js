const router = require("express").Router();
const API = require("../Controller/api.js");

const tagApi = API("exhibit");
const tupleApi = API("tuple");

//subject - это тип задаваемого вопроса к серверу из списка: [ meta, entity, all, ping]
router.route("/tag/:appid/:subject/:ensid").get(tagApi);
router.route("/tuple/:appid/:subject/:ensid").get(tupleApi);

module.exports = router;