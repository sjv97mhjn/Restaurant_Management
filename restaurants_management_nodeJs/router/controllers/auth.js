
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

// Middlewares

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

// API's
module.exports = {
	auth : {
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
	} , 
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
isAdmin : function(req,res,next){
  if(req.payload.role=='admin'){
    console.log('Logged in as Admin');
    next();
  }
  else{
    error =  new Error('Not Admin');
    next(error);
  }

}

}