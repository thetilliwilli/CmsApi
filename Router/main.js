"use strict";

const router = require("express").Router();
const exhibitRouter = require("./exhibit.js");
const bureauRouter = require("./bureau.js");
const designerRouter = require("./designer.js");
const tupleRouter = require("./tuple.js");
const goloRouter = require("./golo.js");
const instRouter = require("./inst.js");
const apiRouter = require("./api.js");
const authMiddleware = require("../Module/auth.js")

//API для приложений
router.use("/api", apiRouter);

router.use(authMiddleware.AuthFirewall);
//Заполнялки
router.use("/exhibit", exhibitRouter);
router.use("/bureau", bureauRouter);
router.use("/designer", designerRouter);
router.use("/tuple", tupleRouter);
router.use("/golo", goloRouter);
router.use("/inst", instRouter);

module.exports = router;