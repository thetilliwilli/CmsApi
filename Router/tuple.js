const router = require("express").Router();
const tupleCtrl = require("../Controller/tuple.js");

router.route("/:id")
    .get(tupleCtrl.One)
    .delete(tupleCtrl.Delete)
    .put(tupleCtrl.Update);

router.route("/")
    .get(tupleCtrl.All)
    .post(tupleCtrl.New);

module.exports = router;