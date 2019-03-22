
var mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({
      name: String,
        description: String,
        price: {
          type : String , 
          default : '200 for Two'
        } ,
        rating: Number,
}) ; 
var restaurantsList = [
      {
        id: 1,
        name: "Restaurant 01",
        description: "Ice Cream, Desserts",
        price: "Cost ₹200 for one",
        rating: "3.5",
        
      },
      {
        id: 2,
        name: "Restaurant 02",
        description: "Pizza, Fast Food",
        price: "Cost ₹150 for one",
        rating: "4.5"
      },
      {
        id: 3,
        name: "Restaurant 03",
        description: "North Indian, Mughlai",
        price: "Cost ₹250 for one",
        rating: "4.1"
      },
      {
        id: 4,
        name: "Restaurant 04",
        description: "Healthy Food, North Indian",
        price: "Cost ₹300 for one",
        rating: "4.2"
      },
      {
        id: 5,
        name: "Restaurant 05",
        description: "Cafe, Continental, Chinese",
        price: "Cost ₹100 for one",
        rating: "4.8"
      },
      {
        id: 6,
        name: "Restaurant 06",
        description: "Cafe, Pizza, Burger",
        price: "Cost ₹150 for one",
        rating: "4.2"
      },
      {
        id: 7,
        name: "Restaurant 07",
        description: "Beverages, Fast Food",
        price: "Cost ₹200 for one",
        rating: "4.9"
      },
      {
        id: 8,
        name: "Restaurant 08",
        description: "Fast Food, Chinese",
        price: "Cost ₹100 for one",
        rating: "4.8"
      },
      {
        id: 9,
        name: "Restaurant 09",
        description: "Healthy Food, Beverages",
        price: "Cost ₹300 for one",
        rating: "3.9"
      },
      {
        id: 10,
        name: "Restaurant 10",
        description: "Fast Food, Desserts, Bakery, Cafe",
        price: "Cost ₹200 for one",
        rating: "4.1"
      }
    ] ;
var restaurant = mongoose.model('restaurant',restaurantSchema);
restaurant.find({},function(err,result){
  // console.log(result);
  if(err){
    console.log(err);
  }
  else if(!result[0]){
    restaurant.insertMany(restaurantsList,function(err,docs){
      if(err)
        console.log(err);
      else
        console.log(docs);
    })
  }
    
})

module.exports = restaurant ; 
