app.controller('allRestaurantsCtrl',['$scope','$rootScope','dataService',function($scope,$rootScope,dataService){
		$scope.name = 'Sajeev Mahajan';
		
		dataService.getAllRestaurants(function(err,res){
			if(err)
				console.log(err)
			else
				$scope.restaurants = res ;
		});
		
}])


app.directive('customDirective',function(){
	return {
		templateUrl : './app/templates/customDirective.html'
	}
})