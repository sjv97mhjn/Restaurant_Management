app.controller('addRestaurantCtrl',function($scope,adminService,dataService,$uibModal){
	$scope.restaurant ; 
	// $scope.submit = function(){
	// 	adminService.addRestaurant($scope.restaurant,function(err,res){
	// 		if(err){
	// 			console.log(err);
	// 		}
	// 		else{
	// 			adminService.setRestaurant(res.data._id);	 	
	// 			$scope.restId = adminService.getRestaurant();
	// 		}
	// 	});
	// }
	var getAllRestaurants = function(){

		dataService.getAllRestaurants(function(err,res){
			if(err)
				console.log(err)
			else{
				console.log('restaurants are',res);
				$scope.restaurants = res ;
			}
		});	
		}
		getAllRestaurants();

	$scope.addRestaurant = function(){
		console.log('Creating a uibModal for Adding a Restaurant');
		$uibModal.open({
			animation : true ,
			scope : $scope ,
			controller : 'addUIBRestaurantCtrl',
			templateUrl : './app/templates/addUIBRestaurant.html', 
		})
		.result.then(function(restaurant){
			console.log('Result Called');
			if(restaurant){
					adminService.addRestaurant(restaurant,function(err,res){
						if(err){
							console.log(err);
						}
						else{
							adminService.setRestaurant(res.data._id);	 	
							getAllRestaurants();
							// $scope.restId = adminService.getRestaurant();
						}
						});
				}
		})
	}
})
app.controller('addUIBRestaurantCtrl',function($scope){
	console.log($scope);
	$scope.submit = function(){
		$scope.$close($scope.restaurant);
	}
	$scope.close = function(){
		$scope.$close();
	}
})