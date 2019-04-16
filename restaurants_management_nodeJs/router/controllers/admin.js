
// Models 
var restaurant = require("../../models/restaurant");
var item = require("../../models/item");
var counter = require("../../models/counter");
var customer = require("../../models/customer");
var order = require("../../models/order");
var user = require("../../models/user");
var cuisine = require("../../models/cuisine");

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
	customerSummary : function(req,res){
	customer.aggregate([{
		$lookup : {
			from : "orders" ,
			localField : "phone",
			foreignField: "customer.phone",
			as : "Orders"
		}
	},{
		$project : {
            name : 1 ,
            _id  : 1 ,  
            totalPrice : { $sum : '$Orders.totalPrice'},
            totalOrders : { $size : '$Orders'},
            totalItems : { $sum : { $map :{
            	input : '$Orders' , 
            	as : 'o' ,
            	in : { $sum : '$$o.items.quantity'  } 
            }}  }
    }
	}],function(err,result){
		if(err)
			console.log(err);
		else{
			console.log(result);
			res.send(result);
		}
	})
},
fetchCustomer : function(req, res) {
	console.log("Payload",req.payload);
	var regexp = new RegExp("^" + req.query.customer);
	customer.find({ name: regexp }).exec(function(err, results) {
		if (err) {
			console.log(err);
			res.send(err).status(400);
		} else {
			console.log(results);
			// res.send(result);
			var names = [];
			async.each(
				results,
				function(result, cb) {
					names.push(result);
					cb(null);
				},
				function(err) {
					console.log("names", names);
					res.send(names);
				}
			);
		}
	});
},
 fetchOrdersByCustomerPhone :function(req, res) {
	console.log(req.query.phone);
	// res.send("Okay");
	var limit = Number(req.query.limit) ; 
	var skip =  Number(req.query.skip) * limit ; 
	console.log(skip);
	console.log(limit);
	order.find({ "customer.phone": req.query.phone }).skip(skip).limit(limit).exec(function(error, result) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			console.log(result);
			res.send(result);
		}
	});
},
fetchTotalPriceOfOrdersByPhone : function(req,res){

  order.aggregate([
      {
      	$match : {
      		'customer.phone' : req.query.phone 
      	}
      },
      {
        $group : {
            _id :'$customer.phone' ,
            total : {$sum : '$totalPrice'}
        } ,

      }
    ],function(err,response){
    if(err){
      console.log(err);
      res.send(err);
    }
    else
      console.log(response);
  	  res.send(response);
  })      
} ,
fetchTotalOrdersOfUserByPhone : function(req,res){
	console.log('Am I even coming here');
	order.count({'customer.phone':req.query.phone},function(err,result){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			console.log(result);
			res.json(result);
		}
	})
} ,
fetchTotalItemsOfOrdersByPhone : function(req,res){

  order.aggregate([
      {
        $match : {'customer.phone':req.query.phone}
      },
       {
        $project : {
            phone : '$customer.phone',
            total : { $sum : '$items.quantity' }
        } , 
      } ,{
        $group : {
          _id : '$phone',
          totalItems : {$sum : '$total'}
        }
      }
    ],function(err,response){
    if(err){
      console.log(err);
      res.send(err); 
    }
    else
      console.log(response);
      res.send(response);
  })      
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


}