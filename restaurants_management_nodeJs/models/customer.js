var mongoose = require('mongoose');
var customerSchema = new mongoose.Schema({
	name : String, 
	pincode :  Number,
	address : String, 
	landmark : String,
	city : String,
	email : String,
	phone : String,
}) ;

