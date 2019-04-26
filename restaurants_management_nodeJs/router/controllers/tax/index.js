var express = require("express");
var router = express.Router();
var route = require("./methods");



router.post("/",route.addTax);                
router.get("/:id",route.showTaxesByRestaurant);

module.exports = router ; 