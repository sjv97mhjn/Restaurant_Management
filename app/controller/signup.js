app.controller('signupCtrl',['$scope','dataService',function($scope,dataService){
	$scope.user=
	{	name : 'Sajeev' ,
		password : '1234',
		role : 'admin'  ,
		email:'sjv97mhjn@gmail.com'
	};
	$scope.submit = function(){
		dataService.saveUser($scope.user,function(err,res){
			if(err){
				console.log(err);
			}
			else{
				alert(res);
				console.log(res);
			}
		});
	}
}])