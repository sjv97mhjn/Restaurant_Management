app.controller('editMenuCtrl',function($scope,dataService,adminService,$uibModal,$stateParams){
	 $scope.restaurantId = $stateParams.id;
	 $scope.myname = "Anthony";
	var getItems = function(){
		dataService.getSortedItemsById($scope.restaurantId,function(err,result1,result2){
	 	console.log('Is this even running');
	 	if(err){
	 		console.log(err);
	 	}
	 	else{
	 		console.log(result1);
	 		$scope.items = result1 ; 
	 		$scope.formattedItems = result2;
	 		$scope.mapping = new Array($scope.formattedItems.length);
	 		var arr = [];
	 		for(var i=0;i<$scope.formattedItems.length ;i++){
	 			$scope.mapping[i] = new Array();
	 		}
	 	}
	 });	
	}
	getItems();	 
	var getcuisines = function(){
		dataService.getcuisines($scope.restaurantId,function(err,result){
	 	if(err){
	 		console.log(err);
	 	}
	 	else{
	 		console.log('cuisines',result.data);
	 		$scope.cuisines = result.data;
	 	}
	 });	
	}
	getcuisines();
	var gettaxes = function(){
		adminService.getTaxesById($scope.restaurantId,function(err,result){
	 	if(err){
	 		console.log(err);
	 	}
	 	else{
	 		console.log('Taxes',result.data);
	 		$scope.taxes = result.data;
	 	}
	 });	
	}
	gettaxes();
//===================Cuisines============================================
	 $scope.showCuisineForm =false;
	 $scope.cuisine = {
	 	name : '',
	 	restaurantId : $scope.restaurantId
	 };
	 
	 $scope.showCuisine = function(){
	 	$scope.closeAll();
	 	console.log('Showing Cuisisne Form');
	 	$scope.showCuisineForm =true ;
	 	$scope.addItemForm = false ;
	 	$scope.showTaxForm = false ;
	 
	 
	 }
	 $scope.closeCuisine = function(){
	 	console.log('close Cusine');
	 	$scope.showCuisineForm =false ; 	
	 }
	 $scope.submitCuisine = function(){

			if($scope.cuisine){
						adminService.addcuisine($scope.cuisine,function(error,result){
					 		if(error)
					 			console.log(error);
					 		else{
					 			getcuisines();
					 			console.log(result);
					 		}
					 	});
				}
			$scope.closeCuisine();
	 		getcuisines();
	 }

//================Add Item==================================================
	 $scope.customizationArray = [] ;
	 $scope.taxesArray = [] ;
	 $scope.optionObject = {};
	 $scope.cuisineId = 0 ; 
	 //Validation ==============================================
	if($scope.cuisines&&$scope.cuisines.length<=0){
	 	alert("No Cusines Created Yet");
	 	$scope.$close();
	 }  
	 //=========================================================
	 else{
	 	
	 $scope.item = {
	 	name : '',
	 	restaurantId : $scope.restaurantId,
	 	price : '',
	 	description : '',
	 	cuisineId :'',
	 	cuisineName :'',
	 	customization : [],
	 	taxes : []
	};

	} 
	 
	$scope.updateCuisine = function(){
		console.log('Here to change Cuisine');
		$scope.item.cuisineId = $scope.cuisines[$scope.cuisineId]._id;
	 	$scope.item.cuisineName = $scope.cuisines[$scope.cuisineId].name;
	 	
	}
	 $scope.getNumber = function(num) {
	 console.log('num',num);
     return new Array(num);   
	}
	$scope.increaseOptionLength=function(num){
		console.log($scope.cuisineId);
		console.log($scope.item.cuisineName);
	 	$scope.optionObject[num].push($scope.optionObject[num].length);
	}
	 $scope.increaseCustomizationLength=function(){
	 	$scope.customizationArray.push($scope.customizationArray.length);
		$scope.item.customization[$scope.customizationArray.length-1]={};
	 	$scope.item.customization[$scope.customizationArray.length-1].options=[];
	 	$scope.optionObject[$scope.customizationArray.length-1]=["1"];
	 	console.log('customization Array',$scope.customizationArray);
	 	console.log('Option Object',$scope.optionObject);
	 }
	 $scope.increaseTaxesLength=function(){
	 	$scope.taxesArray.push($scope.taxesArray.length);
	 	console.log('Taxes Array',$scope.taxesArray);
	 };
	
	 $scope.isCusines = function(){
	 	if($scope.cuisines&&$scope.cuisines.length>0){
	 		return true;
	 	}
	 	else
	 		return false;
	 }
	 $scope.addItemForm = false ;
	 
	 $scope.showAddItem = function(){
	 	$scope.closeAll();
	 $scope.showTaxForm = false ;
	 $scope.showCuisineForm =false ; 
	 $scope.addItemForm = true ;
	 }
	 
	 $scope.closeAddItem = function(){
	 $scope.addItemForm = false ;
	 }

	 $scope.submitAddItem = function(){	 	
	 	console.log('Submit Addition Of Item');
			if($scope.item){
				adminService.addItem($scope.item,function(error,result){
					 		if(error)
					 			console.log(error);
					 		else{
					 			getItems();
					 			console.log(result);
					 		}
					 	});
				}

			$scope.closeAddItem();
			getItems();
	 }
	 $scope.deleteItem = function(item){
	 	console.log(item);
	 	adminService.deleteItem(item._id,function(error,result){
	 		if(error)
	 			alert("Item Can't be deleted");
	 		else{
				getItems();
	 			alert("Item Deleted");
	 		}
	 	})
	 }
	 $scope.updateForm = false;
	 $scope.showItem = function(item){

	 	console.log('Item to be updated' , item);
	 	$scope.item = item ;
	 	$scope.updateForm = true ;
	 }
	 $scope.closeItem = function(){
	 	$scope.updateForm = false;
	 	$scope.item = null ;	
	 }
	 $scope.updateItem = function(){
	 	adminService.updateItem($scope.item,function(error,result){
	 		if(error)
	 			alert("Item Can't be updated");
	 		else{
				getItems();
	 			alert("Item Updated");
	 		}
	 	})
	 $scope.closeItem();
	 }
//=============Tax=======================================================

	 $scope.showTaxForm =false;
	 $scope.tax = {
	 	name : '',
	 	restaurantId : $scope.restaurantId
	 };
	 
	 $scope.showAddTax = function(){
	 	$scope.closeAll();
	 	console.log('Showing Tax Form');
	 	$scope.showTaxForm = true ;
	 	$scope.showCuisineForm = false ;
	 	$scope.addItemForm = false ;
	 
	 }
	 $scope.closeAddTax = function(){
	 	console.log('close Taxes');
	 	$scope.showTaxForm = false ; 	
	 }
	 $scope.submitAddTax = function(){
	 		console.log($scope.tax);
			if($scope.tax){
						adminService.addTax($scope.tax,function(error,result){
					 		if(error)
					 			console.log(error);
					 		else{
					 			getcuisines();
					 			console.log(result);
					 		}
					 	});
				}
			$scope.closeAddTax();
	 		gettaxes();
	 }
 
//Link Item with  Taxes ========================================================
	// LIT Link Item With Tax 
$scope.showLITForm = false ; 
// Manipulate items


$scope.mapping = [];
 $scope.showLIT = function(){
 	$scope.closeAll();
	 	console.log('Showing Tax Form');
	 	console.log($scope.mapping);
	 	$scope.showLITForm = true ;
	 	$scope.showTaxForm = false ;
	 	$scope.showCuisineForm = false ;
	 	$scope.addItemForm = false ;
	 
}
$scope.linkItemTax = function(){
	adminService.linkItemTax($scope.formattedItems,$scope.taxes,$scope.mapping,function(error,result){
		if(error)
			console.log(error);
		else
			console.log(result);
	})
}
//==============================================================================

	$scope.closeAll = function(){
		$scope.showLITForm = false ;
		$scope.showTaxForm = false ; 
		$scope.showCuisineForm = false ; 
		$scope.addItemForm = false ; 
	}

})

//Directives ==============================================

app.directive("addCuisine",function(){
	return {
		templateUrl : "./app/templates/addCuisine.html",
	};
})

app.directive("addItem",function(){
	return {
		templateUrl : "./app/templates/addItem.html",
	};
})
app.directive("addTax",function(){
	return {
		templateUrl : "./app/templates/addTax.html",
	};
})
app.directive("linkItemTax",function(){
	return {
		templateUrl : "./app/templates/linkItemTax.html",
	};
})