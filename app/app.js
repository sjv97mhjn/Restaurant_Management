var app = angular.module("app",['ui.router','ui.bootstrap']);

	app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
		$stateProvider
			.state('allRestaurants',{
				url:'/',
				templateUrl:'./app/templates/allRestaurants.html',
				controller:'allRestaurantsCtrl',
			})
			.state('checkout',{
				url:'/checkout',
				templateUrl:'./app/templates/checkout.html',
				controller:'checkoutCtrl',
			})
			.state('restaurant',{
				url:'/:id',
				templateUrl:'./app/templates/restaurant.html',
				controller:'restaurantCtrl',
			})
			$urlRouterProvider.otherwise('/');
	}]);

	app.controller("myController",["$scope",function($scope){
		
		$scope.a=10;
		$scope.b=20;
		
	}])