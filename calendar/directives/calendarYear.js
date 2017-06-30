'use strict';

var angular = require('angular');

angular.module('calendar', []).controller('CalendarYearCtrl', function($scope, moment, calendarHelper) {
	var self = this;

	self.openMonthIndex = null;

	function toggleCell() {
		self.openRowIndex = null;
		self.openMonthIndex = null;

		if (self.cellIsOpen && self.view) {
			self.view.forEach(function(month, monthIndex){
				if(moment(self.viewDate).startOf('month').isSame(month.date)) {
					self.openMonthIndex = monthIndex;
					self.openRowIndex = Math.floor(monthIndex / 4);
				}
			});
		};
	}

	$scope.$on('calendar.refreshView', function() {
		self.view = calendarHelper.getYearView(self.events, self.viewDate, self.cellModifier);

		if(self.cellAutoOpenDisabled) {
			toggleCell();
		} else if(! self.cellAutoOpenDisabled && self.cellIsOpen && self.openMonthIndex === null) {
			//Auto open the calendar to the current day if set
			self.openMonthIndex = null;
			self.view.forEach(function(month){
				if(moment(self.viewDate).startOf('month').isSame(month.date)) {
					self.monthClicked(month, true);
				}
			});
		}
	});

	self.monthClicked = function(month, monthClickedFirstRun, $event) {
		if(!monthClickedFirstRun) {
			self.onTimespanClick({
				calendarDate: month.date.toDate(),
				calendarCell: month,
				$event: $event
			});

			if($event && $event.defaultPrevented) {
				return;
			}
		}

		if(!self.cellAutoOpenDisabled) {
			self.openRowIndex = null;
			var monthIndex = self.view.indexOf(month);
			//the month has been clicked and is already open
			if(monthIndex === self.openMonthIndex) {
				//close the open month
				self.openMonthIndex = null;
				self.cellIsOpen = false;
			} else {
				self.openMonthIndex = monthIndex;
				self.openRowIndex = Math.floor(monthIndex / 4);
				self.cellIsOpen = true;
			}
		}
	}

	self.handleEventDrop = function(event, newMonthDate) {
		var newStart = moment(event.startsAt).
		month(moment(newMonthDate).month()).
		year(moment(newMonthDate).year());
		var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);

		self.onEventTimesChanged({
			calendarEvent: event, 
			calendarDate: newMonthDate,
			calendarNewEventStart: newStart.toDate(),
			calendarNewEventEnd: newEnd ? newEnd.toDate() : null
		});
	};

	self.$onInit = function() {
		if(self.cellAutoOpenDisabled) {
			$scope.$watchGroup([
				'self.cellIsOpen',
				'self.viewDate'
				], toggleCell);
		}
	};

	if(angular.version.minor < 5) {
		self.$onInit();
	}
}).directive('calendarYear', function(){
	// Runs during compile
	return {
		template: '<div calendar-dynamic-directive-template name="calendarYearView" overrides="self.customTemplateUrls"><div>',
		controller: 'CalendarYearCtrl as self',
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		require: '^calendar', // Array = multiple requires, ? = optional, ^ = check parent elements
		scope: {
			events: '=',
			viewDate: '=',
			onEventClick: '=',
			onEventTimesChanged: '=',
			cellIsOpen: '=',
			cellAutoOpenDisabled: '=',
			onTimespanClick: '=',
			cellModifier: '=',
			slideBoxDisabled: '=',
			customTemplateUrls: '=?',
			templateScope: '='
		}, // {} = isolate, true = child, false/undefined = no change
		// name: '',
		// priority: 1,
		// terminal: true,
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, elem, attrs, calendarCtrl) {
			scope.self.calendarCtrl = calendarCtrl;
		},
		bindToController: true
	};
});