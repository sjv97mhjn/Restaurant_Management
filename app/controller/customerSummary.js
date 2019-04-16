app.controller('customerSummaryCtrl',function($scope,dataService){
	dataService.getCustomerOrderDetails(function(err,result){
		if(err)
			console.log(err);
		else{
		$scope.customers = result.data ;
		console.log($scope.customers);
		}
	});
})