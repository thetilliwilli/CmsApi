"use strict";

const router = require("express").Router();
const exhibitRouter = require("./exhibit.js");
const tupleRouter = require("./tuple.js");
const goloRouter = require("./golo.js");
const instRouter = require("./inst.js");
const apiRouter = require("./api.js");

//Заполнялки
router.use("/exhibit", exhibitRouter);
router.use("/tuple", tupleRouter);
router.use("/golo", goloRouter);
router.use("/inst", instRouter);
//API для приложений
router.use("/api", apiRouter);

module.exports = router;