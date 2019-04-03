var mongoose = require('mongoose');
var counter = require('./counter.js');
var customerSchema = new mongoose.Schema({
	name : String, 
	pincode :  Number,
	address : String, 
	landmark : String,
	city : String,
	email : String,
	phone : String,
});

var optionSchema = new mongoose.Schema({  
                  id : String ,
                  name:String,
                  price:Number
               }) ;
var customizationSchema = new mongoose.Schema({  
        label:String,
        type: String,
        pricing: Number,
        options:[ optionSchema]
         }) ;
var taxesSchema = new mongoose.Schema({
        id :String ,
        type : String , 
        percent : Number ,
        fixed : Number ,
        name : String 
      });
var itemSchema = new mongoose.Schema({
      restaurantId : mongoose.Types.ObjectId ,
      cuisineId : Number , 
      cuisineName :String ,
      name : String ,
      price : Number ,
      description : String ,
      taxes : [taxesSchema],
      customization : [customizationSchema]
}) ; 

var itemOrderSchema = new mongoose.Schema({
	quantity : Number , 
	item : itemSchema ,
})
var taxeSchema = new mongoose.Schema({
  CGST  : Number , 
  SGST  : Number ,
  fixed : Number 
})
var restaurantSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: {
    type : String , 
    default : '200 for Two'
  } ,
  rating: Number,
});


var orderSchema = new mongoose.Schema({
 	serial_number_univ : {
    type : Number ,
  },
 	serial_number_rest : Number,
	taxes : taxeSchema,
  customer : customerSchema,
  itemPrice : Number,
  totalPrice : Number,
	items : [itemOrderSchema],
 	restaurant : restaurantSchema,
  date : {type:Date,default:Date.now},
});    

var order = mongoose.model('orders',orderSchema)

  // var myOrder = new order({
  //         serial_number_univ : 1,
  //         serial_number_rest : 1,
  //         restaurant : {
  //           _id : "5c90c6006ca37e34b158e830" ,
  //           name : "Sajeev Da Dhabba"
  //         }
  //       });
        
  //       myOrder.save(function(err,result){
  //         if(err)
  //           console.log(err);
  //         else{
  //           console.log(result);
  //           // res.send(result);
  //         } 
  //       })   
module.exports = order ; 