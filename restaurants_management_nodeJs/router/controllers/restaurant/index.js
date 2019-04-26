var express = require("express");
var router = express.Router();



var route = require("./methods");

router.get("/",route.allrestaurants);
router.get("/:id", route.restaurantById);
router.post("/" ,route.addRestaurant);

module.exports = router;