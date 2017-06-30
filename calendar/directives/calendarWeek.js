'use strict';

var angular = require('angular');

angular.module('calendar', []).controller('CalendarWeekCtrl', function($scope, moment, calendarHelper, calendarConfig, calendarEventTitle){
	var self = this;

	self.showTimes = calendarConfig.showTimeOnWeekView;
	self.calendarEventTitle = calendarEventTitle;

	$scope.$on('calendar.refreshView', function(){
		self.dayViewSplit = self.dayViewSplit || 30;
		self.dayViewHeight = calendarHelper.getDayViewHeight(self.dayViewStart, self.dayViewEnd, self.dayViewSplit);

		if(self.showTimes) {
			self.view = calendarHelper.getWeekViewWithTimes(
				self.events,
				self.viewDate,
				self.dayViewStart,
				self.dayViewEnd, 
				self.dayViewSplit
				);
		} else {
			self.view = calendarHelper.getWeekView(self.events, self.viewDate);
		}
	});

	self.weekDragged = function(event, daysDiff, minuteChunksMoved) {
		var newStart = moment(event.startsAt).add(daysDiff, 'days');
		var newEnd = moment(event.endsAt).add(daysDiff, 'days');

		if (minuteChunksMoved) {
			var minutesDiff = minuteChunksMoved * self.dayViewSplit;
			newStart = newStart.add(minutesDiff, 'minutes');
			newEnd = newEnd.add(minutesDiff, 'minutes');
		};
		delete event.tempStartsAt;

		self.onEventTimeChanged({
			calendarEvent: event,
			calendarNewEventStart: newStart.toDate(),
			calendarNewEventEnd: event.endsAt ? newEnd.toDate() : null 
		});
	};

	self.eventDropped = function(event, date) { 
		var daysDiff = moment(date).diff(moment(event.startsAt), 'days');
		self.weekDragged(event, daysDiff);
	};

	self.weekResized = function(event, edge, daysDiff) {
		var start = moment(event.startsAt);	
		var end = moment(event.endsAt);

		if(edge === 'start') {
			start.add(daysDiff, 'days');
		} else {
			end.add(daysDiff, 'days');
		}

		self.onEventTimeChanged({
			calendarEvent: event,
			calendarNewEventStart: start.toDate(),
			calendarNewEventEnd: end.toDate()
		});
	};
}).directive('calendarWeek', function(){
	// Runs during compile
	return {
		template: '<div calendar-dynamic-directive-template name="calendarWeekView" overrides="self.customTemplateUrls"><div>',
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		require: '^calendar', // Array = multiple requires, ? = optional, ^ = check parent elements
		controller: 'CalendarWeekCtrl as self',
		scope: {
			events: '=',
			viewDate: '=',
			onEventClick: '=',
			onEventTimesChanged: '=',
			dayViewStart: '=',
			dayViewEnd: '=',
			dayViewSplit: '=',
			dayViewEventChunkSize: '=',
			onTimespanClick: '=',
			onDateRangeSelect: '=',
			customTemplateUrls: '=?',
			cellModifier: '=',
			templateScope: '='
		}, // {} = isolate, true = child, false/undefined = no change
		// templateUrl: '',
		// name: '',
		// priority: 1,
		// terminal: true,
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, elem, attrs, calendarCtrl) {
			scope.self.calendarCtrl = calendarCtrl;
		},
		bindToController: true
	};
}]);;