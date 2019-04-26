var express = require("express");
var router = express.Router();
var route = require("./methods");

router.post("/",route.addcuisine);
router.get("/",route.getcuisines);

module.exports = router ; 
