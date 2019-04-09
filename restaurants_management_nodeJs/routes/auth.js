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
var authFunc = require("./routes/auth.js");
app.use(cors());
app.use(bodyParser());
mongoose.connect("mongodb://localhost:27017/mydb");
module.exports = {
	register : function(req,res){
	
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
},
login : function(req,res,next){
  
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

},


}