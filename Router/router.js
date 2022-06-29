const express = require("express");
const router = express.Router();
const controller = require("../controller/controller")
router.use(
    express.urlencoded({
        extended: true,
    })
);

router.post("/adduser", controller.adduser);
router.post("/addexperience/:id", controller.addExperience);
router.post("/addeducation/:id", controller.addEducation);
router.get("/:id", controller.Userdata);

module.exports = router;