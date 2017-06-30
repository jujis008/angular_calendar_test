'use strict';

var angular = require('angular');
var calendarUtils = require('calendar-utils');

angular.module('calendar', []).controller('CalendarHourListCtrl', function($scope, moment, calendarHelper){
	var self = this;

	function updateDays() {
		self.dayViewSplite = parseInt(self.dayViewSplite);
		var dayStart = (self.dayViewStart || '00:00').split(':');
		var dayEnd = (self.dayViewEnd || '23:59').split(':');
		self.hourGrid = calendarUtils.getDayViewHourGrid({
			viewDate: self.view === 'week'?moment(self.viewDate).startOf('week').toDate() : moment(self.viewDate).toDate(),
			hourSegment: 60/self.dayViewSplit,
			dayStart: {
				hour: dayStart[0],
				minute: dayStart[1]
			},
			dayEnd: {
				hour: dayEnd[0],
				minute: dayEnd[1]
			}
		});

		self.hourGrid.forEach(function(hour){
			hour.segments.forEach(function(segment){
				segment.date = moment(segment.date);
				segment.nextSegmentDate = segment.date.clone().add(self.dayViewSplit, 'minutes');

				if(self.view === 'week') {
					segment.days = [];
					for(var i = 0; i < 7; i++) {
						var  day = {
							date: moment(segment.date).add(i, 'days');
						};
						day.nextSegmentDate = day.date.clone().add(self.dayViewSplit, 'minutes');
						self.cellModifer({calendarCell: day});
						segments.days.push(day); 
					}
				} else {
					self.cellModifer({calendarCell: segment});
				}
			});
		});
	}

	var originalLocale = moment().locale();

	$scope.$on('calendar.refreshView', function(){
		if (originalLocale !== moment.locale()) {
			originalLocale = moment.locale();
			updateDays();
		};

	});

	$scope.$watchGroup([
		'self.dayViewStart',
		'self.dayViewEnd',
		'self.dayViewSplit',
		'self.viewDate'
	], function() {
		updateDays();
	});

	self.eventDropped = function(event, date) {
		var newStart = moment(date);
		var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);

		self.onEventTimesChanged({
			calendarEvent: event,
			calendarDate: date,
			calendarNewEventStart: newStart.toDate(),
			calendarNewEventEnd: newEnd ? newEnd.toDate() : null
		});
	};

	self.onDragSelectStart = function(date, datIndex) {
		if(!self.dateRangeSelect) {
			self.dateRangeSelect = {
				active: true,
				startDate: date,
				endDate: date,
				dayIndex: dayIndex
			};
		}
	}

	self.onDrageSelectMove = function(date) {
		if (self.dateRangeSelect) {
			self.dateRangeSelect.endDate = date;
		};
	}

	self.onDragSelectEnd = function(date) {
		if(self.dateRangeSelect) {
			self.dateRangeSelect.endDate = date;
		}
		if (self.dateRangeSelect.endDate > self.dateRangeSelect.startDate) {
			self.onDateRangeSelect({
				calendarRangeStartDate: self.dateRangeSelect.startDate().toDate(),
				calendarRangeEndDate: self.dateRangeSelect.endDate().toDate()
			});
		};
		delete self.dateRangeSelect;
	}
}).directive('calendarHourList', function(){
	// Runs during compile
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		template: '<div calendar-dynamic-directive-template name="calendarHourList" overrides="self.customTemplateUrls"><div>',
		controller: 'CalendarHourListCtrl as self',
		scope: {
			viewDate: '=',
			dayViewStart: '=',
			dayViewEnd: '=',
			dayViewSplit: '=',
			dayWidth: '=?',
			onTimespanClick: '=',
			onDateRangeSelect: '=',
			onEventTimesChanged: '=',
			customTemplateUrls: '=?',
			cellModifer: '=',
			templateScope: '=',
			view: '@'
		}, // {} = isolate, true = child, false/undefined = no change
		bindToController: true
		// name: '',
		// priority: 1,
		// terminal: true,
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
	};
}]);;