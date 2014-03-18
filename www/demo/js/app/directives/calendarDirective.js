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