var express = require("express");
var router = express.Router();

var routes = {
	controllers: {
		auth: require("./controllers/auth"),
		general: require("./controllers/general"),
		admin: require("./controllers/admin"),
		customer: require("./controllers/customer"),
	}
}

var authRoutes = routes.controllers.auth ;
var adminRoutes = routes.controllers.admin ;
var generalRoutes =  routes.controllers.general;
var customerRoutes = routes.controllers.customer ;

//Authentication
router.post("/registerUser",authRoutes.auth.optional ,authRoutes.register);
router.post("/loginUser",authRoutes.auth.optional , authRoutes.login);

// General Routes or User Routes
router.get("/allrestaurants",generalRoutes.allrestaurants);
router.get("/allitems",generalRoutes.allitems);
router.get("/restaurant/:id", generalRoutes.restaurantById);
router.get("/item/:id", generalRoutes.itemById);

//Admin Routes
router.get("/customerSummary",authRoutes.auth.required ,authRoutes.isAdmin, adminRoutes.customerSummary );
router.get("/fetchcustomers" ,authRoutes.auth.required ,authRoutes.isAdmin, adminRoutes.fetchCustomer  );
router.get("/fetchOrdersByCustomerPhone",authRoutes.auth.required ,authRoutes.isAdmin, adminRoutes.fetchOrdersByCustomerPhone);
router.get("/fetchTotalPriceOfOrdersByPhone" ,authRoutes.auth.required ,authRoutes.isAdmin, adminRoutes.fetchTotalPriceOfOrdersByPhone);
router.get("/fetchTotalOrdersOfUserByPhone",authRoutes.auth.required ,authRoutes.isAdmin,adminRoutes.fetchTotalOrdersOfUserByPhone);
router.get("/fetchTotalItemsOfOrdersByPhone" ,authRoutes.auth.required ,authRoutes.isAdmin,adminRoutes.fetchTotalItemsOfOrdersByPhone);

//Customer Routes 
router.post("/order",authRoutes.auth.required ,customerRoutes.createOrder);

module.exports = router;