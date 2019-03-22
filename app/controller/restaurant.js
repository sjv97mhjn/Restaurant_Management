app.controller('restaurantCtrl',
				['$scope','dataService','$location','$anchorScroll','$stateParams','$uibModal',
				function($scope,dataService,$location,$anchorScroll,$stateParams,$uibModal){
	$scope.name = "Sajeev Mahajan" ;
	$scope.restaurantId = $stateParams.id;
	console.log($scope.restaurantId);
	// var allItems = dataService.getAllItems() ;
	// console.log(items); 
	 dataService.getSortedItemsById($scope.restaurantId,function(err,result){
	 	if(err)
	 		console.log(err);
	 	else
	 		$scope.items = result ;
	 });
	$scope.isCartEmpty = true ; 
	console.log($scope.items);
	$scope.goTo = function(id){
		// console.log(id);
		 $location.hash('menu'+id);
		 $anchorScroll();
	}
	$scope.cart = dataService.getCart();
	$scope.addToCart = function(item){
		  $scope.isCartEmpty = false ;
		  	if(!$scope.cart.items[item._id])
		  		$scope.cart.items[item._id] = [];
		  	$scope.cart.items[item._id].push(item);
		  	$scope.cart.totalPrice = $scope.cart.totalPrice + item.price ; 
			dataService.updateCart($scope.cart);	
			

	}
	$scope.customization = function(parentid , id){
		console.log('Creating a ui bootstrap model' +parentid +  id);
		$uibModal.open({
			animation : true ,
			// appendTo : ,
			// ariaDescribedBy : 'myModal',
			// scope : $scope ,  
			backdrop : false ,
			controller : 'customizationCtrl',
			resolve : {
				item : function(){
					return $scope.items[parentid+1][id] ;
				}
			},
			templateUrl : "./app/templates/customization.html" , 
		});
	}
	// return using .then


}]) ; 

app.controller('customizationCtrl',function($scope){
	console.log($scope.$resolve.item);
	// $scope.name = "Sajeev Mahajan 2";
	 $scope.item = $scope.$resolve.item ;
})