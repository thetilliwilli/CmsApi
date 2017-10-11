const router = require("express").Router();
const exhibitCtrl = require("../Controller/exhibit.js");

router.route("/:id")
    .get(exhibitCtrl.One)
    .delete(exhibitCtrl.Delete)
    .put(exhibitCtrl.Update);
    
router.route("/")
    .get(exhibitCtrl.All)
    .post(exhibitCtrl.New);


module.exports = router;