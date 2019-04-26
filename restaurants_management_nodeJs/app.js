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
var routes = require("./router/route");
app.use(cors());
app.use(bodyParser());
mongoose.connect("mongodb://localhost:27017/mydb");
app.use(express.static("../"+__dirname));

app.use("/",routes);
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

app.listen(8081, function(req, res) {
	console.log("App working on 8081");
});
