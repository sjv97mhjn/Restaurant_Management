app.controller('summaryCtrl',['$scope','dataService','$http',function($scope,dataService,$http){
  $scope.getOrdersCustomer = function(val) {
  return $http({
  	url : "http://localhost:8081/fetchcustomers/",
  	params : {
  		customer : val ,
  	},
  	method : 'GET'
  }).then(

  function(result){
  	var Customer = result.data ;
  	return Customer;       
  },
  function(err){
  	console.log(err);
  });
  };
  $scope.mycallback = function($item,b,c,d){
  	dataService.getOrdersByPhone($item.phone,function(error,results){
  		if(error){
  			console.log(error);
  		}
  		else{
  			console.log(results);
  			$scope.orders = results.data;
  			// console.log($scope.orders.length);
  			$scope.totalItems = $scope.orders.length;
   			console.log($scope.totalItems);
   			$scope.currentPage = 1 ;
   			$scope.itemsPerPage = 3	;
  		}
  	});
  	dataService.getTotalPriceOfAllOrdersByPhone($item.phone,function(error,result){
  		if(error){
  			console.log(error);
  		}	
  		else{
  			console.log(result);
  			$scope.totalPrice = result.data[0].total;
  		}
  	});
  	dataService.getTotalItemsOfOrdersByPhone($item.phone,function(error,result){
	if(error){
		console.log(error);
	}	
	else{
		console.log('Total Items',result);
		$scope.totalItemsOrders = result.data[0].totalItems;
	  }
	})
  }

   $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };

}])