app.service('adminService',function($http){
	var currentRestaurant = null ;
	this.addRestaurant = function(rest,cb){
		$http({
			url:`http://localhost:8081/addRestaurant`,
			data : rest,
			method : 'post',
		}).then(
		function(result){
			console.log(result);
			cb(null,result);
		},function(error){
			console.log(error);
			cb(error);
		})
	} ;
	this.setRestaurant = function(rest){
		currentRestaurant = rest;
	} ;

	this.getRestaurant = function(){
		return currentRestaurant ;
	};
	this.addcuisine = function(cuisine,cb){
		$http({
			url:`http://localhost:8081/addcuisine`,
			data : cuisine,
			method : 'post',
		}).then(
		function(result){
			console.log(result);
			cb(null,result);
		},function(error){
			console.log(error);
			cb(error);
		})
	};
	this.addItem = function(item,cb){
		$http({
			url:`http://localhost:8081/addItem`,
			data : item,
			method : 'post',
		}).then(
		function(result){
			console.log(result);
			cb(null,result);
		},function(error){
			console.log(error);
			cb(error);
		})
	};

	this.deleteItem = function(itemId,cb){
		$http({
			url:`http://localhost:8081/deleteItem`,
			params :{
				itemId : itemId,
			},
			method : 'delete',
		}).then(
		function(result){
			console.log(result);
			cb(null,result);
		},function(error){
			console.log(error);
			cb(error);
		})	
	}; 
	this.updateItem = function(item,cb){
		$http({
			url:`http://localhost:8081/updateItem`,
			data :{
				item : item,
			},
			method : 'put',
		}).then(
		function(result){
			console.log(result);
			cb(null,result);
		},function(error){
			console.log(error);
			cb(error);
		})	
	}
})