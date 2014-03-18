/*
SwiperDirective.js

The swiper has the property mb-swiper-waitfor which will tell
the directive to wait for whatever object is pass to that attribute
for it to initialize the plugin. This is because most probably the images
are comming from a service.
If this attribute is not present the directive assumes the images are
present and will initialize immediatelly

##Usage
		<div mb-swiper mb-swiper-waitfor="news" ng-show="news">
			<div ng-repeat="img in news.images"><img ng-src="{{img.url}}"> </div>
		</div>

*/

app.directive('mbSwiper', ['$timeout',
	function($timeout){
		return{
			priority: 2000,
			transclude: true,
			template:'<div class="swiper-container"><div class="swiper-wrapper" ng-transclude></div></div>',
			scope: {
				waitFor: '=mbSwiperWaitfor'
			},
			link: function(scope, element, attrs){
				//default options of plugin
				var defaults = {
					loop:true,
					grabCursor: true,
				};

				var init = function() {
					//catching options with evail to avoid NonAssign Error
					scope.options = scope.$eval(attrs.mbSwiperOptions) || {};

					//extending defaults and scope.options into the settings variable
					var settings = $.extend({}, defaults, scope.options);

					//adding the swiper-slide class to all the childs of swiper-wrapper
					element.find('.swiper-wrapper > div').addClass('swiper-slide');

					//chek if pagination is set in options to create it and append it
					if(scope.options.pagination && typeof scope.options.pagination == 'string'){
						var pagsClass =  scope.options.pagination.replace('.', '');
						element.append( $('<div class="'+pagsClass+'"></div>') );
					}

					//Find the swiper DOM element where it will be initialized
					var swiperElem = element.find('.swiper-container');
					//init it bitch!
					var mySwiper = swiperElem.swiper(settings);
				};

				//we check if the directive should wait for some data to be loaded to initiate
				if(attrs.mbSwiperWaitfor){
					scope.$watch('waitFor', function(n,o){
						if(n){
							$timeout(function(){
								init();
							},100);
						}
					});
				}else{
					init();
				}

			}
		};
	}
]);

app.directive('mbSwiperScroll', [
	function(){
		return{
			template : '<div class="swiper-scrollbar swiper-scrollbar-vertical"></div>'+
				'<div class="swiper-wrapper">'+
					'<div class="swiper-slide" ng-transclude>'+
					'</div>'+
				'</div>'+
			'</div>',
			transclude :  true,
			scope : true,
			link : function(scope, element, attrs){

				var mySwiper = $(element).swiper({
					scrollContainer: true,
					mode:'vertical',
					scrollbar: {
						container: '.swiper-scrollbar'
					}
				});
			}
		};
	}
]);

