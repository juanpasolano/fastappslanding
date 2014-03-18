/*
#Loading spinner
This simple drective puts the template for the loading spinner

##Usage
Use this loading directive whenever you are waiting for data to arrive
In the example below the spinner will show only if the model 'news' is
undefined or null

	<div class="" ng-show="!news">
    <div mb-loading-spinner></div>
	</div>
*/

app.directive('mbLoadingSpinner',['$rootScope', '$timeout',
	function($rootScope, $timeout){
		return{
			template: '<div class="loading-dot"></div><div class="loading-dot"></div><div class="loading-dot"></div><div class="loading-dot"></div>',
			scope:true,
			link: function(scope, element, attrs){
				angular.element(element).addClass('loading-dots');
			}
		};
	}
]);