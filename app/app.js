var app = angular.module("app",['ui.router','ui.bootstrap','ngCookies']);

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
			.state('summary',{
				url:'/summary',
				templateUrl:'./app/templates/summary.html',
				controller:'summaryCtrl',
			})
			.state('customerSummary',{
				url:'/customerSummary',
				templateUrl:'./app/templates/customerSummary.html',
				controller:'customerSummaryCtrl',
			})
			.state('signup',{
				url :"/signup",
				templateUrl:'./app/templates/signup.html',
				controller : 'signupCtrl'
			})
			.state('login',{
				url :"/login",
				templateUrl:'./app/templates/login.html',
				controller : 'loginCtrl'
			})
			.state('addRestaurant',{
				url :"/addRestaurant",
				templateUrl:'./app/templates/addRestaurant.html',
				controller : 'addRestaurantCtrl'
			})
			.state('editMenu',{
				url :"/editMenu/:id",
				templateUrl:'./app/templates/editMenu.html',
				controller : 'editMenuCtrl'
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