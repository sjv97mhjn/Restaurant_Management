var express = require("express");
var router = express.Router();
var route = require("./methods");

router.post("/register",route.auth.optional ,route.register);
router.post("/login",route.auth.optional , route.login);

router.get("/customerSummary",route.auth.required ,route.isAdmin, route.customerSummary );
router.get("/customer" ,route.auth.required ,route.isAdmin, route.fetchCustomer  );

module.exports = router ; 