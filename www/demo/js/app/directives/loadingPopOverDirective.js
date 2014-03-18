/*
LoadingPopOver.js

This directive shows a loading widget for when content is being pulled from the server

To implement:
		<!-- Loading widget -->
		<div id="loading" mb-loading-pop-over="">
			<div class="msgBox">
				<p>{{options.text}}</p>
				<div mb-loading-spinner></div>
			</div>
		</div>

To show, import $rootScope in your controller an $emit this event

$rootScope.$emit('showLoadingPopOver',{});

*/
app.directive('mbLoadingPopOver', ['$rootScope',
	function($rootScope){
		return{
			link: function(scope, element, attrs){

				var defaults = {
					text: 'Hang in there! we are getting some nice data just for you.',
					filter: 'blur-filter'
				};

				element.on('click', function(){
					hideLoadingPopOver();
				});

				var hideLoadingPopOver =  function(){
					$('#wrapper').removeClass(scope.options.filter);
					element.removeClass('visible');
				};

				var showLoadingPopOver =  function(){
					$('#wrapper').addClass(scope.options.filter);
					element.addClass('visible');
				};

				$rootScope.$on('showLoadingPopOver', function(ev, options){
					scope.options = $.extend({}, defaults, options);
					showLoadingPopOver();
				});

				$rootScope.$on('hideLoadingPopOver', function(ev, options){
					hideLoadingPopOver();
				});
			}
		};
	}
]);
