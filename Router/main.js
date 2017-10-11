"use strict";

const router = require("express").Router();
const exhibitRouter = require("./exhibit.js");
const tupleRouter = require("./tuple.js");

//Exhibit routes
router.use("/exhibit", exhibitRouter);
router.use("/tuple", tupleRouter);

module.exports = router;