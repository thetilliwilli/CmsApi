const router = require("express").Router();
const exhibitRouter = require("./exhibit.js");


router.get("/", (req, res)=>{
    res.redirect("welcome");
});

router.get("/welcome",(req,res)=>{
    res.send("Welcome to TAG ContentManger");
});

    //Exhibit routes
    router.use("/exhibit", exhibitRouter);

module.exports = router;