app.service('dataService',function($http,$cookies){
  var cart = {
      restaurant : {},
    	customer : {},
		  items : [] ,
      taxes : {} ,
      itemPrice : 0 ,
		  totalPrice : 0 
	}; 
this.getAllRestaurants = function(cb){
    $http({
      url : `http://localhost:8081/restaurant`, 
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
      url : `http://localhost:8081/item` , 
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
      console.log('items from backend',items);
      //cb(null,items);
      var map = {} ; 
      for(var i = 0 ; i<items.length ; i++){
        if(!map[items[i].cuisineName]){
          map[items[i].cuisineName]=[];
        }
        map[items[i].cuisineName].push(items[i]);
      } 
       console.log(map);
        cb(null,map,items);
    }
  });
}

this.storeOrder = function(order,cb){
  $http.defaults.headers.common['Authorization'] = $cookies.get('token');
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
  $http.defaults.headers.common['Authorization'] = $cookies.get('token');
  $http({
    url : "http://localhost:8081/order/" , 
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
};
this.getTotalPriceOfAllOrdersByPhone = function(phone,cb){
  $http.defaults.headers.common['Authorization'] = $cookies.get('token');
  $http({
    url : "http://localhost:8081/order/totalPriceOfUser" , 
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
   $http.defaults.headers.common['Authorization'] = $cookies.get('token');
    $http({
    url : "http://localhost:8081/order/totalOrdersOfUser" , 
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
  $http.defaults.headers.common['Authorization'] = $cookies.get('token');
  $http({
    url : "http://localhost:8081/order/totalItemsOfOrdersOfUser" , 
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
this.getCustomerOrderDetails = function(cb){
  $http.defaults.headers.common['Authorization'] = $cookies.get('token');
  $http({
    url : "http://localhost:8081/customerSummary/" , 
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
  url:"http://localhost:8081/register/",
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
  url:"http://localhost:8081/login/",
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
this.getcuisines = function(restaurantId,cb){
    $http({
      url:`http://localhost:8081/cuisine`,
      params : {
        restaurantId : restaurantId ,
      },
      method : 'get',
    }).then(
    function(result){
      console.log(result);
      cb(null,result);
    },function(error){
      console.log(error);
      cb(error);
    })
  };
this.fetchCustomer = function(customer){
      $http({
        url : "http://localhost:8081/customer/",
        params : {
          customer : customer ,
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
  }     
})