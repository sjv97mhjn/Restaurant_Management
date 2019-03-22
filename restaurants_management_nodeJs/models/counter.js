let mongoose = require('mongoose');
var counterSchema = new mongoose.Schema({
	restId : String ,
	sequence_value : {
		type : Number ,
		default : 1 
	}
})
 var counter = mongoose.model('counter',counterSchema) ; 

 counter.find({},function(err,result){
  // console.log(result);
  if(err){
    console.log(err);
  }
  else if(!result[0]){
  	var c = new counter({
  		restId : 'Universal'
  	});
    c.save(function(err,docs){
      if(err)
        console.log(err);
      else
        console.log(docs);
    })

  }
    
})

module.exports = counter ;
