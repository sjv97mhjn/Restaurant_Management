app.controller('summaryCtrl',['$scope','dataService','$http','$cookies',function($scope,dataService,$http,$cookies){
  $scope.getOrdersCustomer = function(val) {

  console.log($cookies.get('token'));
  $http.defaults.headers.common['Authorization'] = $cookies.get('token');
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
      $scope.currentPage = 1 ;
      $scope.itemsPerPage = 3 ;
    $scope.phone = $item.phone ;
  	dataService.getTotalOrdersOfUserByPhone($item.phone,function(error,results){
      console.log(results.data);
      $scope.totalItems = results.data;    
    })

     dataService.getOrdersByPhone($item.phone,$scope.currentPage-1,$scope.itemsPerPage,function(error,results){
  		if(error){
  			console.log(error);
  		}
  		else{
  			console.log(results);
  			$scope.orders = results.data;
  			// console.log($scope.totalItems);
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

   $scope.pageChanged = function(num) {
    // alert(num);
     dataService.getOrdersByPhone($scope.phone,num-1,$scope.itemsPerPage,function(error,results){
      if(error){
        console.log(error);
      }
      else{
        console.log(results);
        $scope.orders = results.data;
        // console.log($scope.totalItems);
      }
    });
  };

}])