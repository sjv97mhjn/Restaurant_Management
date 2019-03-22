app.controller('checkoutCtrl',['$scope','dataService',function($scope,dataService,$location,$anchorScroll){
	$scope.cart = dataService.getCart();
	$scope.address = null ;
	$scope.phone = null ; 
	$scope.showorder = function(){
		alert($scope.cart);
		console.log($scope.cart);
	}
	$scope.customer = {
		Name : 'Sajeev Mahajan' , 
		Pincode : 110051 ,
		Address : 'Krishna Nagar',
		Landmark : 'Street 11' ,
		City : 'Delhi' , 
		Email :'sjv97mhjn@gmail.com' , 
		Phone : '9711490469' 
	}
	$scope.showForm = true ;
	$scope.hideForm = function(){
		$scope.showForm = false ;
	}
}])