/*
*  ANGULAR / FOUNDATION BOILERPLATE
*  Author: Juan Pablo Solano.
*
*/
'use strict';

$(function() {
	FastClick.attach(document.body);
});

var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngTouch']);

app.controller('MainCtrl',[ '$scope', '$element', '$window', 'ConfigFactory',
	function($scope, $element, $window, ConfigFactory){
		$scope.config = ConfigFactory;

		/*This functions helps us keep track of the resize*/
		$scope.getWidth = function() {
			return $(window).width();
		};
		$scope.getHeight = function() {
			return $(window).height();
		};
		$scope.$watch($scope.getWidth, function(newValue, oldValue) {
			$scope.window_width = newValue;
		});
		$scope.$watch($scope.getHeight, function(newValue, oldValue) {
			$scope.window_height = newValue;
		});
		window.onresize = function(){
			$scope.$apply();
		};

		$scope.contentStyles = function(){
			var contentH = $scope.window_height;
			var contentTop = 0;
			if($scope.config.hasFooter){
				contentH -= $element.find('#footer').outerHeight();
			}
			if($scope.config.hasHeader){
				var headerH = $element.find('#header').outerHeight();
				contentH -= headerH;
				contentTop = headerH;
			}
			return  'height:' + contentH + 'px; top:' + contentTop + 'px';
		};

		$scope.toggleSideNav = function(){
			$element.find('#wrapper, #content .content-cover, #sideNav').toggleClass('open');
		};
		$scope.goBack = function(){
			$window.history.back();
		};
	}
	]);


app.factory('ConfigFactory', [
	function(){
		return {
			server: {
				services: 'http://192.237.180.31/dhm/public/api/',
				assets: 'http://192.237.180.31/dhm/public/'
			},
			title : 'Angular boilerplate from factory',
			hasFooter: true,
			hasHeader:false,
			hasSideNavigation: false,
			hasBackButton: false,
			hasRightButton: false
		};
	}
]);
/*
* HomeCtrl.js
*/
app.controller('HomeCtrl', ['$scope', '$rootScope', '$timeout', 'ConfigFactory',
	function($scope, $rootScope, $timeout, ConfigFactory){

		ConfigFactory.title = 'Mi titulo';
		ConfigFactory.hasHeader = true;
		ConfigFactory.hasFooter = true;
		ConfigFactory.hasSideNavigation = true;

		$scope.emitToast = function(type){
			$rootScope.$emit('makeToast', {title:'This is an emmited toast', type:type});
		};

		$scope.emitModal = function(template){
			$rootScope.$emit('makeModal', {
				options:{
					template: template,
					cancelText :'Dont fire that',
					acceptText: 'Lets rock!',
					title: 'Modal demo'
				}
			});
		};
		$scope.emitStringModal =  function(){
			$rootScope.$emit('makeModal', {
				options:{
					text: '<p>Some text</p>'
				}
			});
		};


		$scope.showLoading = function(){
			$rootScope.$emit('showLoadingPopOver',{
				text:'Loading some content.',
				filter:'blur-filter'
			});
		};

	}
]);
/*
* HomeCtrl.js
*/
app.controller('LoginCtrl',[ '$scope', '$rootScope', '$location', 'ConfigFactory',
	function($scope, $rootScope, $location, ConfigFactory){
		ConfigFactory.title = 'Login';
		ConfigFactory.hasHeader = true;
		ConfigFactory.hasFooter = false;
		ConfigFactory.hasSideNavigation = false;

		$scope.loginData = {};

		$scope.loginSubmit = function(e){
			console.log($scope.loginData);
			$location.path('/home');
		};
	}
]);
/*
* RecoverCtrl.js
*/
app.controller('RecoverCtrl',[ '$scope', '$rootScope', '$location', 'ConfigFactory',
	function($scope, $rootScope, $location, ConfigFactory){
		ConfigFactory.title = 'Recover your password';
		ConfigFactory.hasHeader = true;
		ConfigFactory.hasFooter = false;
		ConfigFactory.hasSideNavigation = false;

		$scope.mailsent = false;

		$scope.recoverSubmit = function(){
			$scope.mailsent = !$scope.mailsent;
		};
	}
]);
/*
* CalendarDirective.js

URL: http://kylestetz.github.io/CLNDR/

To implement

	<div class="calendar"
	mb-calendar="events"
	mb-calendar-options="calendarOptions">
	</div>

	mb-calendar: Array, Is the directive identifier and expects an array of events.
	mb-calendar-options: Object, you can pass more of the calendar options in this attribute.
*/

app.directive('mbCalendar',['$rootScope',
	function($rootScope){
		//The calendar template
		var clndrTemplate = "<div class='clndr-controls row'>" +
			"<div class='clndr-control-button column small-2'>"+
			"<span class='clndr-previous-button entypo-font'>&#59237;</span>"+
			"</div>"+
			"<div class='month column small-8 tac'><%= month %> <%= year %></div>"+
			"<div class='clndr-control-button rightalign column small-2'>"+
			"<span class='clndr-next-button entypo-font tar'>&#59238;</span>"+
			"</div>" +
			"</div>" +
			"<table class='clndr-table' border='0' cellspacing='0' cellpadding='0'>" +
			"<thead>" +
			"<tr class='header-days'>" +
			"<% for(var i = 0; i < daysOfTheWeek.length; i++) { %>" +
			"<td class='header-day'><%= daysOfTheWeek[i] %></td>" +
			"<% } %>" +
			"</tr>" +
			"</thead>" +
			"<tbody>" +
			"<% for(var i = 0; i < numberOfRows; i++){ %>" +
			"<tr>" +
			"<% for(var j = 0; j < 7; j++){ %>" +
			"<% var d = j + i * 7; %>" +
			"<td class='<%= days[d].classes %>'><div class='day-contents'><%= days[d].day %>" +
			"</div></td>" +
			"<% } %>" +
			"</tr>" +
			"<% } %>" +
			"</tbody>" +
			"</table>";
		return{
			scope:{
				events: '=mbCalendar',
				options: '=mbCalendarOptions'
			},
			link: function(scope, element, attrs){

				//The dafaults for the calendar
				var defaults = {
					template: clndrTemplate,
					events: scope.events
				};
				//Extending the defaults and options into settings
				var settings = $.extend({}, defaults, scope.options);
				//init it bitch!
				var calendar = $(element).clndr(settings);

				//watching the events object of the controller to update the changes
				scope.$watch(function(){
					return scope.events.length;
				}, function(n,o){
					if(n > o) {
						calendar.addEvents([scope.events[scope.events.length-1]]);
					}else if (n < o){
						calendar.setEvents(scope.events);
					}
				}, false);
			}
		};
	}
]);
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
app.directive('mbGmap',['$rootScope','$parse',
	function( $rootScope, $parse){
		return{
			scope:{
				markers: '=',
				options: '=',
				markerClick: '='
			},

			link: function(scope, element, attrs){

				var map;
				var defaults = {
					zoom:13,
					center :{
						lat:4.582226749273246,
						lng: -74.09687547013164
					},
					clustered: true
				};
				var settings = $.extend({}, defaults, scope.options);

				var initialize = function() {
					var mapOptions = {
						zoom: settings.zoom,
						center: new google.maps.LatLng(settings.center.lat, settings.center.lng )
					};
					map = new google.maps.Map($(element).get(0),mapOptions);
				};

				initialize();



				scope.$watch('markers', function(newValue, oldValue){
					if(scope.markers){
						addMarkers();
					}
				});
				var addMarkers = function(){
					if(scope.markers.length > 0){
						var markers = [];
						for (var i = 0; i < scope.markers.length; i++) {
							if(scope.markers[i].lat && scope.markers[i].lng){
								var myLatlng = new google.maps.LatLng(scope.markers[i].lat,scope.markers[i].lng);
								var marker = new google.maps.Marker({
									position: myLatlng,
									map: map
								});
								markers.push(marker);
								addMarkerClickListener(marker);
							}
						}
						if(settings.clustered){
							var markerCluster = new MarkerClusterer(map, markers);
						}
					}
				};
				var addMarkerClickListener = function(marker){
					google.maps.event.addListener(marker, 'click', function() {
						if (typeof(scope.markerClick) == "function") {
							return scope.markerClick(marker);
						}
					});
				};


			}
		};
	}
]);
/*
* MarkdownDirective.js
*/

app.directive('mbMarkdown',[
	function(){
		var converter = new Showdown.converter();
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        if (attrs.mbMarkdown) {
          scope.$watch(attrs.mbMarkdown, function (newVal) {
            var html = newVal ? converter.makeHtml(newVal) : '';
            element.html(html);
          });
        } else {
          var html = converter.makeHtml(element.text());
          element.html(html);
        }
      }
    };
	}
]);
/*
* modalBox.js:
*
*		$rootScope.$emit('makeModal', {
*			options:{
*				template:'partials/modals/calendarModal.html',
*				text:'some text'
*				cancelText :'Yep',
*				hasCancelBtn: true,
*				acceptText: 'Ok, go.'
*				hasAcceptBtn: true,
*				data: {}
*			}
*		});
*
*		The template variable has higher priority over the text variable
*		Any other variable passed to options will get into the isolated scope, therefore you can access it in the template html
*/
app.directive('mbModalBox',['$http', '$compile', '$timeout',  '$rootScope', '$templateCache', 'ConfigFactory',
	function($http, $compile, $timeout,  $rootScope, $templateCache, ConfigFactory){
		return{
			scope:true,
			link: function(scope, element, attrs){

				var defaults = {
					cancelText : "CANCELAR",
					hasCancelBtn: true,
					acceptText : "OK",
					hasAcceptBtn: true,
					title : "Alert"
				};

				$rootScope.$on('makeModal', function(ev, options){
					makeModal(options);
				});

				var makeModal = function(attrs){
					scope.options = $.extend({}, defaults, attrs.options);
					if(scope.options.template){
						$http.get(scope.options.template, {cache: $templateCache}).success(function(tplContent){
							showModal($compile(tplContent)(scope));
						}).error(function(e){
							console.log('The modal cannot load the template you provided');
						});
					}else if(scope.options.text){
						showModal(scope.options.text);
					}else{
						console.log('The modal cannot be displayed. You have to provide a valid template or text variable');
					}
				};

				var showModal = function(content){
					ConfigFactory.wrapperIsBlured = true;
					$(element).find('.content').empty().append(content);
					$(element).addClass('show');
				};

				scope.closeModal =  function(){
					$(element).removeClass('show');
					ConfigFactory.wrapperIsBlured = false;
					console.log(scope.modalData);
				};
			}
		};
	}
]);
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


/*
* SWITCH FOR CHECKBOXES

<div  mb-switch ng-model="model" mb-switch-off="NO" mb-switch-on="YES">
	<input type="checkbox" name="" id="">
</div>

ng-model : Boolean, You can bind a model residing in the controller where the directive is located.
mb-switch-off : String, for the OFF text
mb-switch-on : String, for the ON text

It is not necesary to provide an input field since the logic is insed the directive and the model is outside.

 ng-class="{off: isChecked==false}"
* */

app.directive('mbSwitch',['$rootScope', '$timeout',
	function($rootScope, $timeout){
		return{
			template:'<div class="onOffSwitch" ng-swipe-left="off()" ng-swipe-right="on()">'+
				'<div class="handle"></div>'+
				'<div class="text on" ng-class="{shown: isChecked==true}">{{onText}}</div>'+
				'<div class="text off" ng-class="{shown: isChecked==false}">{{offText}}</div>'+
				'<div class="hidden" ng-transclude>'+
				'</div>'+
			'</div>',
			transclude: true,
			scope:{
				ngModel : '=',
				mbSwitchOn: '@',
				mbSwitchOff: '@'
			},
			link: function(scope, element, attrs, ctrl, transclude){
				var checkbox = element.find('input[type=checkbox]');


				scope.isChecked = (scope.ngModel !== undefined) ? scope.ngModel : true;

				scope.onText = scope.mbSwitchOn || 'ON';
				scope.offText = scope.mbSwitchOff || 'OFF';

				scope.$watch('isChecked',function(n,o){
					checkbox.prop('checked', n);
					if(scope.ngModel !== undefined) scope.ngModel = n;
					toggleClasses(n);
				});

				var toggleClasses= function(val){
					if(val){
						$(element).find('.handle').removeClass('off');
					}else{
						$(element).find('.handle').addClass('off');
					}
				};

				scope.toggle =  function(){
					scope.$apply(function(){
						scope.isChecked =  !scope.isChecked;
					});
				};
				scope.on = function(){
					scope.isChecked =  true;
				};

				scope.off = function(){
					scope.isChecked =  false;
				};

				element.on('click', function(){
					scope.toggle();
				});
			}
		};
	}
]);

/*
* TOASTS:
* To make a new toast simply emit this event:
* $rootScope.$emit('makeToast', {title:'<string>', type:'success | error | warning'});
* You can pass 'error', 'success' or 'warning' for the type attribute. If you do not supply one the toast will be gray
* -----
* Don't forget to associate the div to this controller:
* <div id="toasts" mb-toast="">
*		<div class="toast {{m.type}}" ng-repeat="m in messages">{{m.title}}</div>
* </div>
* */

app.directive('mbToast',['$rootScope', '$timeout',
	function($rootScope, $timeout){
		return{
			scope:true,
			link: function(scope, element, attrs){
				scope.messages = [];
				function createToast(data){
					scope.messages.push(data);
					removeToast();
				}
				function removeToast(){
					$timeout(function(){
						scope.messages.splice(0,1);
					},2500);
				}
				$rootScope.$on('makeToast', function(ev, data){
					createToast(data);
				});
			}
		};
	}
]);

/*----------------
 /*FILTERS:
 /*---------------*/
app.filter('upperCase', function(){
	return function(text){
		return text.toUpperCase();
	};
});


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
//TODO: check if there is a better/proper way to do this calls and return promises
app.factory('MusicService',[ '$http', '$rootScope', 'ConfigFactory',
	function($http, $rootScope, ConfigFactory){
		return {
			getStores :  function(){
				return $http.get('http://ws.audioscrobbler.com/2.0/?method=album.search&album=red+hot+chilli&artist=red+hot+chilli&api_key=77725761af78cf82f9d7a9b304be958e&format=json')
					.error(function(){
						$rootScope.$emit('makeToast', {title:'Algo salio mal por favor vuelve a intentarlo', type:'error'});
					})
					.success(function(data){
						console.log(data);
					});
			},
			getDetail: function(id){
				return $http.get('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=red+hot+chilli+peppers&album='+id+'&api_key=77725761af78cf82f9d7a9b304be958e&format=json')
					.error(function(){
						$rootScope.$emit('makeToast', {title:'Algo salio mal por favor vuelve a intentarlo', type:'error'});
					})
					.success(function(data){
						console.log(data);
						//console.log('StoresModel:success');
					});
			}
		};
	}
]);
//TODO: check if there is a better/proper way to do this calls and return promises
app.factory('StoresModel',[ '$http', '$rootScope', 'ConfigFactory',
	function($http, $rootScope, ConfigFactory){
		return {
			getStores :  function(){
				return $http.get('http://192.237.180.31/dhm/public/api/stores?branches=true&offers=true')
					.error(function(){
						$rootScope.$emit('makeToast', {title:'Algo salio mal por favor vuelve a intentarlo', type:'error'});
					})
					.success(function(data){
						//console.log(data);
						//console.log('StoresModel:success');
					});
			}
		};
	}
]);