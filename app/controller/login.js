app.controller('loginCtrl',['$scope','dataService','$cookies',function($scope,dataService,$cookies){
	$scope.user=
	{	name : 'Sajeev' ,
		password : '1234',
		role : ''  ,
		email:'sjv97mhjn@gmail.com'
	};
	$scope.submit = function(){
		dataService.loginUser($scope.user,function(err,res){
			if(err){
				console.log(err);
			}
			else{
				// alert(res);
				console.log(res.data.user.token);
				$cookies.put('token',res.data.user.token);
			}
		});
	}
}])