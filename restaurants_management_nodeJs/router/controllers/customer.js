
// Models 
var restaurant = require("../../models/restaurant");
var item = require("../../models/item");
var counter = require("../../models/counter");
var customer = require("../../models/customer");
var order = require("../../models/order");
var user = require("../../models/user");

// Libraries 
var path = require('path');
var cors = require("cors");
var async = require("async");
var bodyParser = require("body-parser");
var passport = require("passport");
var localStrategy = require("passport-local");
var jwt = require('express-jwt');
var mongoose = require("mongoose");

module.exports = {
	createOrder : function(req, res) {
	var Customer = req.body.customer;
	var myOrder = new order(req.body);
	var name;
	console.log("Order Passed");
	// console.log(req.body);
	myOrder.save(function(err, result) {
		if (err) {
			console.log(err);
			res.error(err);
		} else {
			console.log("Order saved");
			// console.log(result);
			//res.json(result).status(200);
			var c = myOrder.customer;

			// console.log('customer',Customer);
			var mycustomer = new customer(Customer);
			customer.findOne({ phone: mycustomer.phone }, function(
				error,
				Result
			) {
				if (error) console.log(error);
				else {
					//console.log(result);
					// console.log(Result);
					if (!Result) {
						mycustomer.save(function(err, result2) {
							if (err) {
								console.log(err);
								res.send(err);
							} else {
								console.log("Customer Saved");
								// console.log(result2);
								res.json(result2).status(200);
							}
						});
					} else {
						console.log("Customer Present");
						res.send("Customer Present");
					}
				}
			});
		}
	});
}	
}