app.controller('restaurantCtrl',
				['$scope','dataService','$location','$anchorScroll','$stateParams','$uibModal',
				function($scope,dataService,$location,$anchorScroll,$stateParams,$uibModal){
	$scope.name = "Sajeev Mahajan" ;
	$scope.restaurantId = $stateParams.id;
	
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
	console.log($scope.restaurantId);
	// var allItems = dataService.getAllItems() ;
	// console.log(items); 
	 dataService.getSortedItemsById($scope.restaurantId,function(err,result){
	 	if(err)
	 		console.log(err);
	 	else{
	 		$scope.items = result ;
	 		console.log('items',$scope.items);
	 	}
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

	$scope.checkCustomization = function(item){
			if(item.customization[0]){
				$scope.customization(item);
			}
			else{
				$scope.addToCart(item);
			}

	}
	$scope.addToCart = function(item){

		  	console.log('Item being added',item);
		  	$scope.isCartEmpty = false ;
		  	$scope.cart.items.push({
		  		quantity : 1 ,
		  		item : angular.copy(item)
		  	});
		  	$scope.cart.itemPrice = $scope.cart.itemPrice + item.price ; 
		  	$scope.cart.totalPrice = $scope.cart.totalPrice + calcPrice(item,'add') ; 
			dataService.updateCart($scope.cart);
			console.log('updated cart',$scope.cart);	
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
			Items.splice(i,1);
			console.log($scope.cart.items);
			return false ;
		}   
	}
	function calcPrice(item,op){
	 console.log('item in calcPrice',item);
	 console.log('item price',item.price);
	 var Price=0;
	 Price += item.price ;
	 for(var i=0;i<item.taxes.length;i++){
	 	var price ;
	 	if(item.taxes[i].percent){
	 		console.log('Percent' ,item.taxes[i].percent)
	 		price = (item.taxes[i].percent*item.price)/100;
	 	
	 	}
	 	else if(item.taxes[i].fixed){
	 		console.log('Fixed' , item.taxes[i].fixed);
	 		price = item.taxes[i].fixed;
	 	}
	 	console.log('price',price);
	 	Price+=price ;
	 	if(!$scope.cart.taxes[item.taxes[i].name])
	 		$scope.cart.taxes[item.taxes[i].name]=0;

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
			templateUrl :'./app/templates/menuCustomization.html' ,
		})
		.result.then(function(result){
			console.log('Result Called');
			if(result){
			$scope.addToCart(result);
			console.log($scope.cart);}
		});
	}

}]) ; 

app.controller('customizationCtrl',function($scope,dataService,$uibModalInstance){

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
	$scope.close = function(){
		$uibModalInstance.close();
	}
	$scope.checkDisable = function(c,o){
		if(c.disabled&&!o.selected)
			return true ;
		else
			return false ;
	}
	$scope.manage = function(c , o){
			console.log('Called Manage');
			if(o.selected){
				c.pricing +=o.price;
				var count=0;
				for(var i=0;i<c.options.length;i++){
					if(c.options[i].selected)
						count++;
				}
				console.log(count);
				if(count>=c.max){
					console.log('Reached Max');
					c.disabled = true ;
				}
			}
			else{
				c.pricing -=o.price;
					var count=0;
				for(var i=0;i<c.options.length;i++){
					if(c.options[i].selected)
						count++;
				}
				console.log(count);
				if(count<c.max){
					console.log('Max Removed');
					c.disabled = false ;
				}
			}


	}
	$scope.validate = function(item){
		console.log('I am here');
		console.log('item',item);	
		var c = item.customization;
		console.log('customization',c);
		for(var i=0;i<c.lengh;i++){
			console.log('Y am i not here');
			var options = c[i].options ; 
			console.log('options',options)
			var count = 0;
			for(var j=0;j<options.length;j++){
				if(options[j].selected)
					count++;
			}
			console.log('i',i);
			console.log('count',count);
			if(count<c[i].min||count>c[i].max)
				return true ;
		}
		// return false ;
	}

})