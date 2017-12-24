const router = require("express").Router();
const instCtrl = require("../Controller/inst.js");

router.route("/status")
    .get(instCtrl.Status);

router.route("/:id")
    // .get(instCtrl.One)
    .delete(instCtrl.Delete)
    .put(instCtrl.Update);
    
router.route("/")
    .get(instCtrl.All);
    // .post(instCtrl.New);


module.exports = router;