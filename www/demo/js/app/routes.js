
app.config([ '$routeProvider',
	function($routeProvider){
		$routeProvider
		.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'LoginCtrl'
		})
		.when('/login/recover', {
			templateUrl: 'partials/recover.html',
			controller: 'RecoverCtrl'
		})
		.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		})
		.otherwise({
			redirectTo:'/login'
		});
	}
]);