var express = require("express");
var router = express.Router();
var route = require("./methods");
var authRoutes = require("../user/methods")
// var authRoutes = require("")
router.get("/",authRoutes.auth.required ,authRoutes.isAdmin, route.fetchOrdersByCustomerPhone);
router.post("/",authRoutes.auth.required ,route.createOrder);

router.get("/totalPriceOfUser" ,authRoutes.auth.required ,authRoutes.isAdmin, route.fetchTotalPriceOfOrdersByPhone);
router.get("/totalOrdersOfUser",authRoutes.auth.required ,authRoutes.isAdmin,route.fetchTotalOrdersOfUserByPhone);
router.get("/totalItemsOfOrdersOfUser" ,authRoutes.auth.required ,authRoutes.isAdmin,route.fetchTotalItemsOfOrdersByPhone); 

module.exports = router ; 