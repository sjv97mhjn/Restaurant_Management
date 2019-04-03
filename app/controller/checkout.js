app.controller('checkoutCtrl',['$scope','dataService','$http',function($scope,dataService,$http){
	dataService.getCart(function(err,result){
		if(err)
			console.log(err);
		else
			$scope.cart = result;
	});
	$scope.address = null ;
	$scope.phone = null ; 
	$scope.showorder = function(){
		alert($scope.cart);
		console.log($scope.cart);
	}
	$scope.cart.customer = {
		name : 'Sajeev Mahajan' , 
		pincode : 110051 ,
		address : 'Krishna Nagar',
		landmark : 'Street 11' ,
		city : 'Delhi' , 
		email :'sjv97mhjn@gmail.com' , 
		phone : '9711490469' 
	}

	console.log($scope.cart);
	$scope.showForm = true ;
	$scope.hideForm = function(){
		console.log($scope.cart);
		$scope.showForm = false ;
	}
	$scope.placeOrder = function(){
		dataService.storeOrder($scope.cart,function(err,res){
		if(err){
			// console.log(err);
			// alert(err);
		}
		else{
			// console.log(res);
			// alert(res);
		}
	})

	
	
	}
}])