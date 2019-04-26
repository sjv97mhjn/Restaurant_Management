app.service('adminService',function($http){
	var currentRestaurant = null ;
	this.addRestaurant = function(rest,cb){
		$http({
			url:`http://localhost:8081/restaurant`,
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
	};

	this.setRestaurant = function(rest){
		currentRestaurant = rest;
	};

	this.getRestaurant = function(){
		return currentRestaurant ;
	};

	this.addcuisine = function(cuisine,cb){
		$http({
			url:`http://localhost:8081/cuisine`,
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
			url:`http://localhost:8081/item`,
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
			url:`http://localhost:8081/item`,
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
			url:`http://localhost:8081/item/`,
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

	this.addTax = function(tax,cb){
		$http({
			url:`http://localhost:8081/tax`,
			data : tax,
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

	this.getTaxesById = function(id,cb){
		$http({
			url:`http://localhost:8081/tax/` + id,
			method : 'get',
		}).then(
		function(result){
			console.log(result);
			cb(null,result);
		},function(error){
			console.log(error);
			cb(error);
		})
	};
	this.linkItemTax = function(items,taxes,map,cb){
		$http({
			url:`http://localhost:8081/item/linkItemTax`,
			data : {
				items : items , 
				taxes : taxes , 
				map : map ,
			},
			method : 'post',
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