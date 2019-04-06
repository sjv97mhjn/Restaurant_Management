var express = require("express");
var app = express();
var mongoose = require("mongoose");
var restaurant = require("./models/restaurant");
var item = require("./models/item");
var counter = require("./models/counter");
var customer = require("./models/customer");
var order = require("./models/order");
var user = require("./models/user");

var path = require('path');
var cors = require("cors");
var async = require("async");
var bodyParser = require("body-parser");
var passport = require("passport");
var localStrategy = require("passport-local");
var jwt = require('express-jwt');

app.use(cors());
app.use(bodyParser());
mongoose.connect("mongodb://localhost:27017/mydb");
//====================AUTHENTICATION=========================================
passport.use(new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
    console.log('In passport strategy email is',email);
    console.log('In passport strategy password is',password);
  user.findOne({ email })
    .then((User) => {
      console.log('USER fetched in Passort findOne is ',User);
      if(!User || !User.validatePassword(password)) {
      	console.log('No user Found or Password is invalid in PLS')
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }
      console.log('Success in PlS');
      return done(null, User);
    }).catch(done);
}));

var getTokenFromHeaders = (req) => {
  var  authorization  = req.headers.authorization;
  console.log('authorization',authorization);
  if(authorization) {
    return authorization;
  }
  return null;
};
const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

app.post("/registerUser",auth.optional,function(req,res){
	
	console.log("Registering the user");
	var myUser = new user({
		email: req.body.email,
		name : req.body.name ,
		role : req.body.role,
		password :req.body.password
	});
	myUser.setPassword(req.body.password);
	// console.log(myUser);
	myUser.save(function(err,result){
		if(err)
			console.log(err);
		else{
			console.log(result);
			res.send(result);
		}
	});
})

app.post('/loginUser', auth.optional, (req, res, next) => {
  
var user  = req.body;
console.log('User in Login Is',user);

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
   console.log('error' , err);
   console.log('user' , passportUser);
   console.log('info' , info); 
    if(err) {
      return next(err);
    }
    if(passportUser) {
      console.log('User Found');
      const user = passportUser;
      user.token = passportUser.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    }
    console.log('No user Found');
    return res.status(400).info;
  })(req, res, next);

});
//=======================TESTING=============================================
app.get("/test/:id",function(req,res){
	order.count(function(err,result){
		if(err)
			res.send(err);
		else
			res.json(result);
	})
})
//===========================================================================
app.get("/allrestaurants", function(req, res) {
	// res.send("It's working");
	restaurant.find({}, function(err, result) {
		if (err) console.log(err);
		else res.json(result).status(200);
	});
});

app.get("/allitems", function(req, res) {
	// res.send("It's working");
	item.find({}, function(err, result) {
		if (err) console.log(err);
		else res.json(result).status(200);
	});
});

app.get("/restaurant/:id", function(req, res) {
	// res.send("It's working");
	console.log(req.params.id);
	restaurant.findOne({ _id: req.params.id }, function(err, result) {
		if (err) console.log(err);
		else {
			console.log(result);
			res.json(result).status(200);
		}
	});
});
app.get("/item/:id", function(req, res) {
	// res.send("It's working");
	console.log(req.params.id);
	item.find({ restaurantId: req.params.id }, function(err, result) {
		if (err) console.log(err);
		else {
			console.log(result);
			res.json(result).status(200);
		}
	});
});

app.post("/order", function(req, res) {
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
});
app.get("/fetchcustomers",auth.required , function(req, res) {
	
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
});
app.get("/fetchOrdersByCustomerPhone", function(req, res) {
	console.log(req.query.phone);
	// res.send("Okay");
	order.find({ "customer.phone": req.query.phone }, function(error, result) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			console.log(result);
			res.send(result);
		}
	});
});
app.get("/fetchTotalPriceOfOrdersByPhone" , function(req,res){

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
})
app.get("/fetchTotalItemsOfOrdersByPhone" , function(req,res){

  order.aggregate([
      {
        $match : {'customer.phone':req.query.phone}
      },
       {
        $project : {
            phone : '$customer.phone',
            total : {$sum : '$items.quantity'}
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
})


var getNextSequenceValueRest = function(callback, id) {
	order.count({ "restaurant._id": id }, function(err, c) {
		if (err) {
			console.log(err);
			callback(err, null);
		} else {
			console.log("count is ", c);
			callback(null, c);
		}
	});
};

app.get("/order/:id", function(req, res) {
	var id1;
	var id2;
	async.parallel(
		[
			function getNextSequenceValueUniv(callback) {
				order.count({}, function(err, c) {
					if (err) {
						console.log(err);
						callback(err, null);
					} else {
						console.log("count is ", c);
						callback(null, c);
					}
				});
			},
			function(callback) {
				getNextSequenceValueRest(callback, req.params.id);
			}
		],
		function(err, results) {
			if (err) console.log(err);
			else {
				var myOrder = new order({
					serial_number_univ: results[0] + 1,
					serial_number_rest: results[1] + 1,
					restaurant: {
						_id: "5c90c6006ca37e34b158e830",
						name: "Sajeev Da Dhabba " + results[0] + results[1]
					}
				});
				myOrder.save(function(err, result) {
					if (err) console.log(err);
					else {
						console.log(result);
						res.send(result);
					}
				});
			}
		}
	);
});


app.listen(8081, function(req, res) {
	console.log("App working on 8081");
});
