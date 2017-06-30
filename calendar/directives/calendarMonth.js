'use strict';

var angular = require('angular');

angular.module('calendar', []).controller('CalendarMothCtrl', 
	function($scope, moment, calendarHelper, calendarConfig, calendarEventTitle){
	var self = this;

	self.calendarConfig = calendarConfig;
	self.calendarEventTitle = calendarEventTitle;
	self.openRowIndex = null;

	function toggleCell() {
		self.openRowIndex = null;
		self.openDayIndex = null;

		if(self.cellIsOpen && self.view) {
			self.view.forEach(function(day, dayIndex){
				if(moment(self.viewDate).startOf('day').isSame(day.date)){
					self.openDayIndex = dayIndex;
					self.openRowIndex = Math.floor(dayIndex / 7);
				}
			});
		}
	}

	$scope.$on('calendar.refreshView', function() {
		self.weekDays = calendarHelper.getWeekDayNames();

		var monthView = calendarHelper.getMonthView(self.events, self.viewDate, self.cellModifier);
		self.view = monthView.days;
		self.monthOffsets = monthView.rawOffsets;

		if(self.cellAutoOpenDisabled) {
			toggleCell();
		} else if(! self.cellAutoOpenDisabled && self.cellIsOpen && self.oepnRowIndex === null){
			//Auto open the calendar to the current day if set
			self.openDayIndex = null;
			self.view.forEach(function(day) {
				if(day.inMonth && moment(self.viewDate).startOf('day').isSame(day.date)) {
					self.dayClicked(day, true);
				}
			});
		}
	});

	self.dayClicked = function(day, dayClickedFirstRun, $event) {
		if(!dayClickedFirstRun) {
			self.onTimespanClick({
				calendarDate: day.date.toDate(),
				calendarCell: day,
				$event: $event;
			});
			if ($event && $event.defaultPrevented) {
				return;
			};
		}

		if(!self.cellAutoOpenDisabled) {
			self.openRowIndex = null;
			var dayIndex = self.view.indexOf(day);
			//Auto open the calendar to the current day if set
			if(dayIndex === self.openDayIndex) {
				//close the open day
				self.openDayIndex = null;
				self.cellIsOpen = false;
			} else {
				self.openDayIndex = dayIndex;
				self.oepnRowIndex = Math.floor(dayIndex / 7);
				self.cellIsOpen = true;
			}
		}
	};

	self.highlightEvent = function(event, shouldAddClass) {
		self.view.forEach(function(day){
			delete day.highlightClass;
			delete day.backgroundColor;

			if (shouldAddClass) {
				var dayContainsEvent = day.events.indexOf(event) > -1;
				if (dayContainsEvent) {
					day.backgroundColor = event.color ? event.color.secondary : '';
				};
			};
		});
	};

	self.handleEventDrop = function(event, newDayDate, draggedFromDate) {
		var newStart = moment(event.startsAt).
		date(moment(newDayDate).date()).
		month(moment(newDayDate).month()).
		year(moment(newDayDate).year());

		var newEnd = calendarHelper.adjustEndDateFromStartDiff(evetn.startsAt, newStart, event.endsAt);

		self.onEventTimesChanged({
			calendarEvent: event,
			calendarDate: newDayDate,
			calendarNewEventStart: newStart.toDate(),
			calendarNewEventEnd: newEnd? newEnd.toDate() : null,
			calendarDraggedFromDate: draggedFromDate
		});
	};

	self.getWeekNumberLabel = function(day) {
		var weekNumber = day.date.clone().add(1, 'day').isoWeek();
		if(typeof calendarConfig.i18nStrings.weekNumber === 'function') {
			return calendarConfig.i18nStrings.weekNumber({weekNumber: weekNumber});
		} else {
			return calendarConfig.i18nStrings.weekNumber.replace('{week}', weekNumber);
		}
	};

	self.onDragSelectStart = function(day) {
		if(!self.dateRangeSelect) {
			self.dateRangeSelect = {
				startDate: day.date,
				endDate: day.date
			}
		}
	}

	self.onDragSelectMove = function(day) {
		if(self.dateRangeSelect) {
			self.dateRangeSelect.endDate = day.date;
		}
	};

	self.onDragSelectEnd = function(day) {
		self.dateRangeSelect.endDate = day.date;
		if(self.dateRangeSelect.endDate > self.dateRangeSelect.startDate) {
			self.onDateRangeSelect({
				calendarRangeStartDate: self.dateRangeSelect.startDate.clone().startOf('day').toDate(),
				calendarRangeEndDate: self.dateRangeSelect.endDate.clone().endOf('day').toDate()
			});
		}
		delete self.dateRangeSelect;
	};

	self.$onInit = function() {
		if(self.cellAutoOpenDisabled) {
			$scope.$watchGroup([
				'self.cellIsOpen',
				'self.viewDate'
				], toggleCell);
		}
	};

	if (angular.version.minor < 5) {
      vm.$onInit();
    }

}).directive('calendarMonth', function(){
	// Runs during compile
	return {
		template: '<div calendar-dynamic-directive-template name="calendarMonthView" overrides="self.customTemplateUrls"><div>',
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		require: '^calendar', // Array = multiple requires, ? = optional, ^ = check parent elements
		scope: {
			events: '=',
			viewDate: '=',
			onEventClick: '=',
			onEventTimesChanged: '=',
			onDateRangeSelect: '='
			cellIsOpen: '=',
			cellAutoOpenDisabled: '=',
			onTimespanClick: '=',
			cellModifier: '=',
			slideBoxDisabled: '=',
			customTemplateUrls: '=?',
			templateScope: '='
		}, // {} = isolate, true = child, false/undefined = no change
		controller: 'CalendarMothCtrl as self',
		// name: '',
		// priority: 1,
		// terminal: true,
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, element, attrs, calendarCtrl) {
			$scope.self.calendarCtrl = calendarCtrl;
		},
		bindToController: true
	};
});

