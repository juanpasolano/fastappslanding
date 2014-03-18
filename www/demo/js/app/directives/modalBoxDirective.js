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