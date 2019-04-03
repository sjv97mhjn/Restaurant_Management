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
	
	//Anchor Scrole
	$scope.goTo = function(id){
		 $location.hash('menu'+id);
		 $anchorScroll();
	}

	//Initializing The Cart 
	dataService.getCart(function(err,res){
		if(err)
			console.log(err);
		else{
			 $scope.cart =  res;
			dataService.getRestaurantById($scope.restaurantId,function(err,result){
				if(err)
					console.log(err);
				else{
					console.log(result);
					$scope.cart.restaurant = result ;
					console.log($scope.cart);
				}
			})
		}
	
	});
	
	$scope.checkTotal = function(){
		if($scope.cart.totalPrice>0)
			return true ;
		else
			return false ;
	}
	$scope.increaseQuantity=function(i){
		i.quantity++;

		$scope.cart.itemPrice +=i.item.price; 
		$scope.cart.totalPrice +=calcPrice(i.item,'add'); 
	}

	$scope.decreaseQuantity=function(i){
		i.quantity--;

		$scope.cart.itemPrice -=i.item.price;
		$scope.cart.totalPrice -= calcPrice(i.item,'sub');
	}
	$scope.addToCart = function(item){
		  	console.log(item);
		  	$scope.isCartEmpty = false ;
		  	$scope.cart.items.push({
		  		quantity : 1 ,
		  		item : angular.copy(item)
		  	});
		  	$scope.cart.itemPrice = $scope.cart.itemPrice + item.price ; 
		  	$scope.cart.totalPrice = $scope.cart.totalPrice + calcPrice(item,'add') ; 
			dataService.updateCart($scope.cart);	
	}
	$scope.checkQuantity = function(val,item){
		// console.log('val is',val);
		if(val>0)
			return true ;
		else{
			//get Index ;
			Items = $scope.cart.items; 
			for(var i=0;i<Items.length;i++){
				if(Items[i]==item){
					break ;
				}
			}
			// Removing element from cart ;
			Items.splice(i,1);
			console.log($scope.cart.items);
			return false ;
		}   
	}
	function calcPrice(item,op){
	 var Price=0;
	 Price += item.price ;
	 for(var i=0;i<item.taxes.length;i++){
	 	var price ;
	 	
	 	if(item.taxes[i].percent){
	 		// console.log('Percent' ,item.taxes[i].percent)
	 		price = (item.taxes[i].percent*item.price)/100;
	 	
	 	}
	 	else if(item.taxes[i].fixed){
	 		// console.log('Fixed' , item.taxes[i].fixed);
	 		price = item.taxes[i].fixed;
	 	}
	 	Price+=price ;
	 	if(op == 'add')
	 	$scope.cart.taxes[item.taxes[i].name]+=price;
	 	else if(op == 'sub')
	 	$scope.cart.taxes[item.taxes[i].name]-=price;
	 		
	 	console.log(price);
	 	
	 }
	 console.log(Price);
	 return Price ;
	}
	$scope.customization = function(Item){
		console.log('Creating a ui bootstrap model');
		$uibModal.open({
			animation : true , 
			// appendTo : ,
			// ariaDescribedBy : 'myModal',
			scope : $scope , 
			// backdrop : false ,
			controller : 'customizationCtrl',
			resolve : {
				item : function(){
					return Item ;
				}
			},
			template :`
			<div>
			<div class="container" style="margin : 20px;">
			<form>
			<div ng-repeat=" c in item.customization">
				<h3 >{{c.label}}</h3>	
				<div ng-repeat="o in c.options">
					<input type="radio" name="{{o.label}}" ng-model="c.pricing" value="{{o.price}}">
						{{o.name}} : {{o.price}}
				</div>
			</div>
			<button class="btn btn-primary" 
			style="display: inline" ng-click="submit(item)">
			Add Item</button> 
			</form>
			</div>
			</div>
			` ,
		})
		.result.then(function(result){
			$scope.addToCart(result);
			console.log($scope.cart);
		});
	}

}]) ; 

app.controller('customizationCtrl',function($scope,dataService){

	console.log($scope);     
	$scope.item = angular.copy($scope.$resolve.item) ;
	$scope.submit = function(item){
	for(var i=0;i<item.customization.length;i++){
		var Price = Number(item.customization[i].pricing) ;
		if(Price)
		item.price+=Price;
	}
	$scope.$close(item);
	}

})