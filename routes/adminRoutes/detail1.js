const express = require("express");
const router = express.Router();
const detailcontroller = require("../../controllers/adminControllers/detail1");
const showTaskController = require("../../controllers/adminControllers/showTask");

router.post("/details1.html", detailcontroller.detail);
router.get("/done", (req, res) => {
  res.render("adminViews/added");
});
router.get("/taskall", showTaskController.showMyData);

router.post("/taskall", showTaskController.showMyData2);
router.post("/taskSquence", showTaskController.addTaskSequence);
router.get("/taskSquence", showTaskController.showTaskSequence);

module.exports = router;
