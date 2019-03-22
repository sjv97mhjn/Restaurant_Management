app.service('dataService',function($http){

	
    var cart = {
    	address : {},
		items : {} ,
		totalPrice : 0 
	} ; 
	
this.getAllRestaurants = function(cb){
    $http({
      url : `http://localhost:8081/allrestaurants` , 
      method : 'GET'
    }).then(
      function(result){
        console.log(result.data);
        cb(null,result.data);
      },
      function(err){
        cb(err,null);
      })
} ;
this.getAllItems = function(cb){
  $http({
      url : `http://localhost:8081/allitems` , 
      method : 'GET'
    }).then(
      function(result){
        console.log(result.data);
        cb(null,result.data);
      },
      function(err){
        cb(err,null);
      })
	}
this.getItemsById = function(id,cb){
  $http({
      url : `http://localhost:8081/item/`+id , 
      method : 'GET'
    }).then(
      function(result){
        console.log(result.data);
        cb(null,result.data);
      },
      function(err){
        cb(err,null);
      })
	
}

this.getSortedItemsById = function(id,cb){
	this.getItemsById(id,function(err,result){
    if(err){
      // console.log(err)
      cb(err,null)
    }
    else{
      var items = result;
      var map = {} ; 
      for(var i = 0 ; i<items.length ; i++){
        if(!map[items[i].cuisineId]){
          map[items[i].cuisineId]=[];
        }
        map[items[i].cuisineId].push(items[i]);
      } 
       console.log(map);
        cb(null,map);
    }
  });
	
}
this.getCart = function(){
	return cart ;
}
this.updateCart = function(ct){
	cart = ct ;
}

})