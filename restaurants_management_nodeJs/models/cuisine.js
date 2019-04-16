var mongoose = require("mongoose");

var cuisineSchema = mongoose.Schema({
	name :String ,
	restaurantId : mongoose.Types.ObjectId 
});

module.exports = mongoose.model('Cuisine',cuisineSchema);