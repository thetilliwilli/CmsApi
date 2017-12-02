const router = require("express").Router();
const designerCtrl = require("../Controller/designer.js");

router.route("/:id")
    .get(designerCtrl.One)
    .delete(designerCtrl.Delete)
    .put(designerCtrl.Update);
    
router.route("/")
    .get(designerCtrl.All)
    .post(designerCtrl.New);


module.exports = router;