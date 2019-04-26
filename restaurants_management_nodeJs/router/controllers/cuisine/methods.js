
// Models 
// var restaurant = require("../../../models/restaurant");
// var item = require("../../../models/item");
// var counter = require("../../../models/counter");
// var customer = require("../../../models/customer");
// var order = require("../../../models/order");
// var user = require("../../../models/user");
var cuisine = require("../../../models/cuisine");

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
	addcuisine : function(req,res){
	var mycuisine = new cuisine(req.body) ;
	mycuisine.save(function(err,result){
		if(err){
			console.log(err);
		}
		else{
			console.log(result);
			res.send(result);
		}

	})
},
getcuisines : function(req,res){
	cuisine.find({'restaurantId':req.query.restaurantId},function(err,result){
		if(err){
			console.log(err);
		}
		else{
			console.log(result);
			res.send(result);
		}

	})

},
}