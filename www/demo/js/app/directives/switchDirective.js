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
