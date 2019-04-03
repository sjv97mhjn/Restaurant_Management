var mongoose = require("mongoose");

var customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	pincode: {
		type: Number,
		required: true
	},
	address: String,
	landmark: String,
	city: String,
	email: {
		type: String,
		required: true
	},
	phone: {
		type : String ,
		validate : {
			validator : function(v){
							var Validator = /^\d{10}$/ ; 
							if(v.match(Validator)){
							 console.log('Validated'); 
							 return true ;
							}
							else {
								console.log('Not Validated');
							 	return false ;
							}
							},
		 	message: function(phone){
		 					`${phone.value} is not a valid phone number!` 
		 				}
		}
	}
});
customerSchema.pre("save", function(next) {
	// console.log("This is",this);
	 var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(re.test(String(this.email).toLowerCase()))
     	return next();
     else {
     	var error = new Error('Email is not valid !!')
     	next(error);
     }
});

// customerSchema.post("validate", function() {
// 	console.log("this gets printed second");
// });
// customerSchema.pre("save", function() {
// 	console.log("this gets printed third");
// });
// customerSchema.post("save", function() {
// 	console.log("this gets printed fourth");
// });
customer = mongoose.model("customer", customerSchema);
var myOrder = new customer({
	name: "Sajeev Mahajan",
	pincode: 110051,
	address: "Krishna Nagar",
	landmark: "Street 11",
	city: "Delhi",
	email: "sjv97mhjn@gmail.com",
	phone: "9711490469"
});

// myOrder.validateSync();
// console.log(message);
// myOrder.save(function(err,result){
//   if(err)
//     console.log(err);
//   else{
//     // console.log(result);
//     // res.send(result);
//   }
// })
module.exports = customer;
 