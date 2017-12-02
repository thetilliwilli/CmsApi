const router = require("express").Router();
const bureauCtrl = require("../Controller/bureau.js");

router.route("/:id")
    .get(bureauCtrl.One)
    .delete(bureauCtrl.Delete)
    .put(bureauCtrl.Update);
    
router.route("/")
    .get(bureauCtrl.All)
    .post(bureauCtrl.New);


module.exports = router;