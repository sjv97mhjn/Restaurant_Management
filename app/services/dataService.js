app.service('dataService',function($http){
  var cart = {
      restaurant : {},
    	customer : {},
		  items : [] ,
      taxes : {
          CGST : 0, 
          SGST : 0,
          fixed: 0
      } ,
      itemPrice : 0 ,
		  totalPrice : 0 
	}; 
this.getAllRestaurants = function(cb){
    $http({
      url : `http://localhost:8081/allrestaurants`, 
      method : 'GET'
    }).then(
      function(result){
        console.log(result.data);
        cb(null,result.data);
      },
      function(err){
        cb(err,null);
      })
}; 

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
this.getRestaurantById = function(id,cb){
    $http({
      url : `http://localhost:8081/restaurant/`+id, 
      method : 'GET'
    }).then(
      function(result){

        console.log('restaurant ',result.data);
        cb(null,result.data);
      },
      function(err){
        cb(err,null);
      })
}; 


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
      cb(err,null)
    }
    else{
      var items = result;
      //cb(null,items);
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

this.storeOrder = function(order,cb){
  $http({
    url : "http://localhost:8081/order/" , 
    data : order,
    method : "POST"
  })
  .then(
    function(result){
      // console.log(result);
      cb(null,result);
    },
    function(error){
      console.log(error);
      cb(error,null);
    })
}
this.getOrdersByPhone = function(phone,skip,limit,cb){
  $http({
    url : "http://localhost:8081/fetchOrdersByCustomerPhone/" , 
    params : {
      phone : phone,
      skip : skip ,
      limit : limit
    },
    method : "GET"
  })
  .then(
    function(result){
      // console.log(result);
      cb(null,result);
    },
    function(error){
      console.log(error);
      cb(error,null);
    }) 
}
this.getTotalPriceOfAllOrdersByPhone = function(phone,cb){
  $http({
    url : "http://localhost:8081/fetchTotalPriceOfOrdersByPhone/" , 
    params : {
      phone : phone
    },
    method : "GET"
  })
  .then(
    function(result){
      // console.log(result);
      cb(null,result);
    },
    function(error){
      console.log(error);
      cb(error,null);
    }) 
}
this.getTotalOrdersOfUserByPhone = function(phone,cb){
    $http({
    url : "http://localhost:8081/fetchTotalOrdersOfUserByPhone/" , 
    params : {
      phone : phone
    },
    method : "GET"
  })
  .then(
    function(result){
      // console.log(result);
      cb(null,result);
    },
    function(error){
      console.log(error);
      cb(error,null);
    }) 
}
this.getTotalItemsOfOrdersByPhone = function(phone,cb){
  $http({
    url : "http://localhost:8081/fetchTotalItemsOfOrdersByPhone/" , 
    params : {
      phone : phone
    },
    method : "GET"
  })
  .then(
    function(result){
      // console.log(result);
      cb(null,result);
    },
    function(error){
      console.log(error);
      cb(error,null);
    }) 
}

this.saveUser = function(user,cb){
 $http({
  url:"http://localhost:8081/registerUser/",
  data : user , 
  method : "POST"
 })
 .then(
  function(result){
    cb(null,result);
  },
  function(error){
    cb(error,null);
 }) 
}
this.loginUser = function(user,cb){
 $http({
  url:"http://localhost:8081/loginUser/",
  data : user , 
  method : "POST"
 })
 .then(
  function(result){
    cb(null,result);
  },
  function(error){
    cb(error,null);
 }) 
}
this.getCart = function(cb){
	// return cart ;
  cb(null,cart);
}
this.updateCart = function(ct){
	cart = ct ;
}

})