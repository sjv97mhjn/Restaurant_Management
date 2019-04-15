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




// var getNextSequenceValueRest = function(callback, id) {
// 	order.count({ "restaurant._id": id }, function(err, c) {
// 		if (err) {
// 			console.log(err);
// 			callback(err, null);
// 		} else {
// 			console.log("count is ", c);
// 			callback(null, c);
// 		}
// 	});
// };

// app.get("/order/:id", function(req, res) {
// 	var id1;
// 	var id2;
// 	async.parallel(
// 		[
// 			function getNextSequenceValueUniv(callback) {
// 				order.count({}, function(err, c) {
// 					if (err) {
// 						console.log(err);
// 						callback(err, null);
// 					} else {
// 						console.log("count is ", c);
// 						callback(null, c);
// 					}
// 				});
// 			},
// 			function(callback) {
// 				getNextSequenceValueRest(callback, req.params.id);
// 			}
// 		],
// 		function(err, results) {
// 			if (err) console.log(err);
// 			else {
// 				var myOrder = new order({
// 					serial_number_univ: results[0] + 1,
// 					serial_number_rest: results[1] + 1,
// 					restaurant: {
// 						_id: "5c90c6006ca37e34b158e830",
// 						name: "Sajeev Da Dhabba " + results[0] + results[1]
// 					}
// 				});
// 				myOrder.save(function(err, result) {
// 					if (err) console.log(err);
// 					else {
// 						console.log(result);
// 						res.send(result);
// 					}
// 				});
// 			}
// 		}
// 	);
// });

