
// Models 
// var restaurant = require("../../../models/restaurant");
var item = require("../../../models/item");
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
	allitems : function(req, res) {
	item.find({}, function(err, result) {
		if (err) console.log(err);
		else res.json(result).status(200);
	});
	} ,

	itemById : function(req, res) {
	// res.send("It's working");
	console.log(req.params.id);
	item.find({ restaurantId: req.params.id })
	.populate('taxes')
	.exec(function(err, result) {
		if (err) console.log(err);
		else {
			// console.log(result);
			res.json(result).status(200);
		}
	});
},

addItem : function(req,res){
	var myItem = new item(req.body) ;
	myItem.save(function(err,result){
		if(err){
			console.log(err);
		}
		else{
			console.log(result);
			res.send(result);
		}

	})

},


deleteItem : function(req,res){
	item.deleteOne({"_id":req.query.itemId},function(err,result){
		if(err){
			console.log(err);
			res.send(400);
		}
		else
			res.send(result);
	})
},
updateItem : function(req,res){
	var Item = req.body.item;
	console.log('Updating Item');
	console.log(Item);
	item.findByIdAndUpdate(Item._id,Item,function(err,result){
		if(err){
			console.log(err);
			res.send(400);
		}
		else{
			console.log(result);
			res.send(result);
		}
	})
},
linkItemTax : function(req,res){
	// console.log(req.body);
	// console.log('Hey');
	var items = req.body.items;
	var taxes = req.body.taxes ; 
	var map   = req.body.map;
	async.forEachOf(items,function(Item,key,callback){
		// console.log(key);
		 async.forEachOf(map[key],function(m,i,callback2){
		 	if(m){
		 		Item.taxes.push(taxes[i]._id);
		 		
		 	}
		 	callback2();
		 },function(err){
		 	item.findByIdAndUpdate(Item._id,Item,function(err,result){
		 		if(err){
		 			console.log(err);
		 			callback(err);
		 		}
		 		else{
		 			console.log(result);
		 			callback();
		 		}
		 	})
		 })
		 // for(var i=0;i<map[key].length;i++){
		 // 	if(map[key][i]){
		 // 		items[key].taxes.push(taxes[i]._id);
		 // 		console.log(items[key]);
		 // 	}
		 // }
	},function(err){
		// console.log(items);
	res.send(200);
	})
}

}