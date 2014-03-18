/*
* scrollFixDrivctive.js
* This small directive fixes the overflow scroll bug on ios 7 devices.
*/
app.directive('mbScrollfixer', ['$timeout',
	function($timeout){
		return{
			link: function(scope, element, attrs){
				var el =  $(element);
				el.on('touchstart', function(event){});
				$timeout(function(){
					el.css({'overflow-y': 'hidden', '-webkit-overflow-scrolling': 'none'});
					$timeout(function(){
						el.css({'overflow-y': 'scroll', '-webkit-overflow-scrolling': 'touch'});
					}, 600);
				}, 600);
			}
		};
	}
]);
