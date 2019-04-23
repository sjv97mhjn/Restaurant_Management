
var mongoose = require('mongoose');
var taxesSchema = new mongoose.Schema({
		restaurantId : mongoose.Types.ObjectId ,
		type : String , 
		percent : Number ,
		fixed : Number ,
		name : String 
	});
module.exports = mongoose.model('Taxes',taxesSchema);