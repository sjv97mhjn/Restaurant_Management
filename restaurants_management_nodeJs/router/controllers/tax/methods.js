
// Models 
// var restaurant = require("../../../models/restaurant");
// var item = require("../../../models/item");
// var counter = require("../../../models/counter");
// var customer = require("../../../models/customer");
// var order = require("../../../models/order");
// var user = require("../../../models/user");
var tax = require("../../../models/tax")
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

addTax : function(req,res){
	var myTax = new tax(req.body) ;
	myTax.save(function(err,result){
		if(err){
			console.log(err);
		}
		else{
			console.log(result);
			res.send(result);
		}

	})

},

showTaxesByRestaurant : function(req,res){
	tax.find({restaurantId : req.params.id} , function(error,result){
		if(error){
			console.log(error);
			res.sendstatus(400);
		}
		else{
			console.log(result);
			res.send(result);
		}
	})	
},
}