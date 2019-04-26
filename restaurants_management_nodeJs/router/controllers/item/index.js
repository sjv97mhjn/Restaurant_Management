
var express = require("express");
var router = express.Router();
var route = require("./methods");



router.get("/",route.allitems);
router.post("/",route.addItem);
router.put("/",route.updateItem);
router.delete("/",route.deleteItem);

router.get("/:id", route.itemById);
router.post("/linkItemTax",route.linkItemTax);


module.exports = router ; 