
// Models 
var restaurant = require("../../../models/restaurant");
// var item = require("../../../models/item");
// var counter = require("../../../models/counter");
// var customer = require("../../../models/customer");
// var order = require("../../../models/order");
// var user = require("../../../models/user");

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
	allrestaurants : function(req, res) {
	restaurant.find({}, function(err, result) {
		if (err) console.log(err);
		else res.json(result).status(200);
	});
	},
	addRestaurant : function(req,res){
	var myRestaurant = new restaurant(req.body);
	myRestaurant.save(function(err,result){
		if(err){
			console.log(err);
			res.sendstatus(400);
		}
		else{
			console.log(result);
			res.send(result);
		}
	  })
	},
	restaurantById : function(req, res) {
	// res.send("It's working");
	console.log(req.params.id);
	restaurant.findOne({ _id: req.params.id }, function(err, result) {
		if (err) console.log(err);
		else {
			console.log(result);
			res.json(result).status(200);
		}
	});
	},
}