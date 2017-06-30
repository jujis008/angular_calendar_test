'use strict';

var angular = require('angular');

angular.module('calendar', []).controller('CalendarDayCtrl', 
	function($scope, moment, calendarHelper, calendarEventTitle){
	var self = this;

	self.calendarEventTitle = calendarEventTitle;

	function refreshView() {
		self.timeHidden = self.dayViewTimePosition === 'hidden';
		self.dayViewTimePositionOffset = self.dayViewTimePosition !== 'default' ? 0 : 60;
		self.dayViewSplit = self.dayViewSplit || 30;
		self.dayViewHeight = calendarHelper.getDayViewHeight(self.dayViewStart, self.dayViewEnd, self.dayVIewSplit);

		var view = calendarHelper.getDayView(
			self.events, 
			self.viewDate, 
			self.dayViewStart, 
			self.dayViewEnd, 
			self.dayVIewSplit, 
			self.dayViewEventWidth);
		self.allDayEvents = view.allDayEvents;
		self.nonAllDayEvents = view.events;
		self.viewWidth = view.width + 62;
	}

	$scope.$on('calendar.refreshView', refreshView);
	$scope.$watchGroup([
		'self.dayViewStart',
		'self.dayViewEnd',
		'self.dayViewSplit'
		], refreshView);

	self.eventDragComplete = function(event, minuteChunksMoves) {
		var minutesDiff = minuteChunksMoves * self.dayViewSplit;
		var newStart = moment(event.startsAt).add(minutesDiff, 'minutes');
		var newEnd = moment(event.endsAt).add(minutesDiff, 'minutes');
		delete event.tempStartsAt;

		self.onEventTimesChanged({
			calendarEvent: event,
			calendarNewEventStart: newStart.toDate(),
			calendarEventEnd: event.endsAt ? newEnd.toDate() : null
		});
	}	

	self.eventDragged = function(event, minuteChunksMoved) {
		var minutesDiff = minuteChunksMoved * self.dayVIewSplit;
		event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes');
	}

	self.eventResizeComplete = function(event, edge, minuteChunksMoved) {
		var minutesDiff = minuteChunksMoved * self.dayViewSplit;
		var start = moment(event.startsAt);
		var end = moment(event.endsAt);
		if (edge === 'start') {
			start.add(minutesDiff, 'minutes');
		} else {
			end.add(minutesDiff, "minutes");
		};
		delete event.tempStartsAt;

		self.onEventTimesChanged({
			calendarEvent: event,
			calendarNewEventStart: start.toDate(),
			calendarEventEnd: end.toDate()
		});
	}

	self.eventResized = function(event, edge, minuteChunksMoved) {
		var minutesDiff = minuteChunksMoved * self.dayVIewSplit;
		if(edge === 'start') {
			event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
		}
	}

}).directive('calendarDay', function(){
	return {
		template: '<div calendar-dynamic-directive-template name="calendarDayView" overrides="self.customTemplateUrls"><div>',
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		require: '^calendar', // Array = multiple requires, ? = optional, ^ = check parent elements
		scope: {
			event: '=',
			viewDate: '=',
			onEventClick: '=',
			onEventTimesChanged: '=',
			onTimespanClick: '=',
			onDateRangeSelect: '=',
			dayViewStart: '=',
			dayViewEnd: '=',
			dayViewSplit: '=',
			dayViewEventChunkSize: '=',
			dayViewEventWidth: '=',
			customTemplateUrls: '=?',
			cellModifier: '=',
			templateScope: '=',
			dayViewTimePosition: '='
		}, // {} = isolate, true = child, false/undefined = no change
		controller: 'CalendarDayCtrl as self',
		bindToController: true
		// name: '',
		// priority: 1,
		// terminal: true,
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
	};
});