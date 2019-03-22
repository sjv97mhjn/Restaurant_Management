var express = require('express');
var app = express();
var mongoose = require("mongoose");
var restaurant = require("./models/restaurant");
var item = require("./models/item");
var counter = require("./models/counter");
var order = require("./models/order");
var cors = require("cors");
var async = require("async");
app.use(cors());
mongoose.connect("mongodb://localhost:27017/mydb");

app.get("/allrestaurants",function(req,res){
	// res.send("It's working");
	restaurant.find({},function(err,result){
		if(err)
			console.log(err);
		else
			res.json(result).status(200);
	})
});

app.get("/allitems",function(req,res){
	// res.send("It's working");
	item.find({},function(err,result){
		if(err)
			console.log(err);
		else
			res.json(result).status(200);
	})
});


app.get("/item/:id",function(req,res){
	// res.send("It's working");
	console.log(req.params.id);
	item.find({restaurantId : req.params.id},function(err,result){
		if(err)
			console.log(err);
		else{
			console.log(result);
			res.json(result).status(200);
	
		}
	})
});

// function getNextSequenceValue(id,cb){
// 	counter.findOneAndUpdate(
// 		{restId : id},
// 		{ $inc:{sequence_value:1} } ,
// 		{new : true},
// 		function(err,docs){
// 		if(err)
// 			console.log(err);
// 		else{
// 			if(docs){
// 				console.log(docs.sequence_value);
// 				cb(null,docs.sequence_value);
// 			}
// 			else{
// 				var newCounter = new counter({
// 					restId : id 
// 				})
// 				newCounter.save(function(err,res){
// 					if(err)
// 						console.log(err);
// 					else{
// 						console.log(1);
// 						cb(null,1);
// 					}
// 				})
// 			}
// 		}
// 	} )
//  }

function getNextSequenceValueRest(id,cb){
	order.count({'restaurant._id' : id} , function(err,c){
		if(err){
			console.log(err);
			cb(err,null);
		}
		else
		{
			console.log('count is ',c);
			cb(null,c);
		}
	})
}


function getNextSequenceValueUniv(cb){
	order.count({} , function(err,c){
		if(err){
			console.log(err);
			cb(err,null);
		}
		else
		{
			console.log('count is ',c);
			cb(null,c);
		}
	})
}

// getNextSequenceValueUniv(function(err,cb){
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(cb);
// });

app.get("/order/:id",function(req,res){
	var id1 ;
	var id2 ;
	async.parallel([
		getNextSequenceValueUniv(),
		getNextSequenceValueRest(req.params.id,cb)],
		function(err,results){
			if(err)
				console.log(err);
			else
				console.log(results);
		})
	// getNextSequenceValueUniv(function(err,id1){
	// 	if(err)
	// 		console.log(err)
	// 	else
	// 	{
	// 		getNextSequenceValueRest(req.params.id,function(err,id2){
	// 			if(err)
	// 				console.log(err);
	// 			else{

	// 			var myOrder = new order({
	// 				serial_number_univ : id1+1,
	// 				serial_number_rest : id2+1,
	// 				restaurant : {
	// 					_id : "5c90c6006ca37e34b158e830" ,
	// 					name : "Sajeev Da Dhabba"
	// 				}
	// 			});
				
	// 			myOrder.save(function(err,result){
	// 				if(err)
	// 					console.log(err);
	// 				else{
	// 					console.log(result);
	// 					res.send(result);
	// 				}	
	// 			})
				
	// 			}


	// 		})
	// 	}
	// })


})
// getNextequenceValue();
// getNextequenceValue();
// getNextequenceValue();
// getNextequenceValue();


app.listen(8081,function(req,res){
	console.log("App working on 8081");

});