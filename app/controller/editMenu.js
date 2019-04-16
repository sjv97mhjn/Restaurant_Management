app.controller('editMenuCtrl',function($scope,dataService,adminService,$uibModal,$stateParams){
	 $scope.restaurantId = $stateParams.id;
	
	var getItems = function(){
		dataService.getSortedItemsById($scope.restaurantId,function(err,result){
	 	console.log('Is this even running');
	 	if(err){
	 		console.log(err);
	 	}
	 	else{
	 		console.log(result);
	 		$scope.items = result ;
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
	 	 
	 $scope.submitcuisine = function(){
	 	$uibModal.open({
			animation : true ,
			scope : $scope ,
			controller : 'addUIBcuisineCtrl',
			resolve : {
				restaurantId : function(){
					return $scope.restaurantId ;
				}
			},
			template : `
							<div class="container">
							<form class="form-horizontal container">
								
								<h3>Add cuisine </h3>
								
								<div class="form-group" style="max-width: 500px;">
								<label >Name</label>
								<input class="form-control" type="text" ng-model="cuisine.name">
								</div>
								
								<button class="btn btn-primary btn-lg" ng-click="submitcuisine()" style="display: inline">Submit</button>
								
								<button class="btn btn-danger btn-lg" ng-click="close()" style="display: inline ; position: absolute; right: 35px; ">Cancel</button>
								
								<br>
								<br>
							</form>
							</div>
			`, 
		})
		.result.then(function(cuisine){
			console.log('Result Called');
			if(cuisine){
						adminService.addcuisine(cuisine,function(error,result){
					 		if(error)
					 			console.log(error);
					 		else{
					 			getcuisines();
					 			console.log(result);
					 		}
					 	});
				}
		})
	 }

	 $scope.submitItem = function(){
	 	$uibModal.open({
			animation : true ,
			scope : $scope ,
			controller : 'addUIBItemCtrl',
			resolve : {
				restaurantId : function(){
					return $scope.restaurantId ;
				},
				cuisines : function(){
					return $scope.cuisines;
				}
			},
			templateUrl : './app/templates/editUIBMenu.html', 
		})
		.result.then(function(item){
			console.log('Result Called');
			if(item){
				console.log('Item in Result Callback',item);
					adminService.addItem(item,function(error,result){
					 		if(error)
					 			console.log(error);
					 		else{
					 			getItems();
					 			console.log(result);
					 		}
					 	});
				}
		})
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
	

})
app.controller('addUIBcuisineCtrl',function($scope){
	 $scope.cuisine = {
	 	name : '',
	 	restaurantId : $scope.$resolve.restaurantId
	 };
	 $scope.submitcuisine = function(){
	 	$scope.$close($scope.cuisine);
	 };
	 $scope.close = function(){
	 	$scope.$close();
	 };
})

app.controller('addUIBItemCtrl',function($scope){
	 $scope.cuisines = $scope.$resolve.cuisines;
	 $scope.customizationArray = [] ;
	 $scope.taxesArray = [] ;
	 $scope.optionObject = {};
	 console.log($scope.$resolve);
	 console.log('cuisines 2',$scope.cuisines);
	 console.log('rest 2',$scope.$resolve.restaurantId);
	 $scope.cuisineId = 0 ; 
	 $scope.item = {
	 	name : '',
	 	restaurantId : $scope.$resolve.restaurantId,
	 	price : '',
	 	description : '',
	 	cuisineId : $scope.cuisines[$scope.cuisineId]._id,
	 	cuisineName : $scope.cuisines[$scope.cuisineId].name,
	 	customization : [],
	 	taxes : []

	 };
	 $scope.getNumber = function(num) {
	 console.log('num',num);
     return new Array(num);   
	}
	$scope.increaseOptionLength=function(num){
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
	 $scope.submitItem = function(){
	 	console.log('Item',$scope.item);
	 	$scope.$close($scope.item);
	 	console.log('')
	 };
	 $scope.close = function(){
	 	$scope.$close();
	 };

})