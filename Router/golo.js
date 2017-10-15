const router = require("express").Router();
const goloCtrl = require("../Controller/golo.js");

router.route("/:id")
    .get(goloCtrl.One)
    .delete(goloCtrl.Delete)
    .put(goloCtrl.Update);
    
router.route("/")
    .get(goloCtrl.All)
    .post(goloCtrl.New);


module.exports = router;