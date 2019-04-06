// function getNextSequenceValue(id,cb){
// 	counter.findOneAndUpdate(
// 		{restId : id},
// 		{ $inc:{sequence_value:1} } ,
// 		{new : true},
// 		function(err,docs){
// 		if(err)
// 			console.log(err);
// 		else{
// 			if(docs){
// 				console.log(docs.sequence_value);
// 				cb(null,docs.sequence_value);
// 			}
// 			else{
// 				var newCounter = new counter({
// 					restId : id
// 				})
// 				newCounter.save(function(err,res){
// 					if(err)
// 						console.log(err);
// 					else{
// 						console.log(1);
// 						cb(null,1);
// 					}
// 				})
// 			}
// 		}
// 	} )
//  }

// getNextSequenceValueUniv(function(err,cb){
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(cb);
// });