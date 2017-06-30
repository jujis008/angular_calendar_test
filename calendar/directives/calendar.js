'use strict';

var angular = require('angular');
var LOG_PREFIX = "Bootstrap calendar: ";

angular.module('calendar', []).controller('CalendarCtrl', 
	function($scope, $log, $timeout, $attrs, $locale, moment, calendarTitle, calendarHelper){
	var self = this;

	self.changeView = function(view, newDay) {
		self.view = view;
		self.viewDate = newDay;
	};

	self.dateClicked = function(date) {
		var rawDate = moment(date).toDate();

		var nextView = {
			year: 'month',
			month: 'day',
			week: 'day'
		};

		if(self.onViewChangeClick({
			calendarDate: rawDate,
			calendarNextView: nextView[self.view]
		}) !== false ){
			self.changeView(nextView[self.view], rawDate);
		}
	};

	self.$onInit = function() {
		if(self.slideBoxDisabled){
			$log.warn(LOG_PREFIX, 'The `slide-box-disabled` option is deprecated and 
				will be removed in the next release. Instead set `cell-auto-open-disabled` to true');
		}

		self.events = self.events || [];
		var previousDate = moment(self.viewDate);
		var previousView = self.view;

		function checkEventIsValid(event){
			if(! event.startsAt) {
				$log.warn(LOG_PREFIX, 'Event is missing the startsAt field', event);
			} else if(! angular.isDate(event.startsAt)) {
				$log.warn(LOG_PREFIX, 'Event startsAt should be a javascript date object. Do `new Date(event.startsAt)` to fix it.', event);
			}

			if (event.endsAt) {
				if (!angular.isDate(event.endsAt)){
					$log.warn(LOG_PREFIX, 'Event endsAt should be a javascript date object. Do `new Date(event.endsAt)` to fix it.', event);
				}
				if (moment(event.startsAt).isAfter(moment(event.endsAt))) {
					$log.warn(LOG_PREFIX, 'Event cannot start after finsihes', event);
				};
			};
		}

		function refreshCalendar() {
			if(calendarTitle[self.view] && angular.isDefined($attrs.viewTitle)) {
				self.viewTitle = calendarTitle[self.view](self.viewDate);
			}

			self.events.forEach(function(event, index){
				checkEventIsValid(event);
				event.calendarEventId = index;
			});

			//if on-timespan-click="calendarDay = calendarDate" is 
			//set then don't update the view as nothing needs to change

			var currentDate = moment(self.viewDate);
			var shouldUpdate = true;

			if(previousDate.clone().startOf(self.view).isSame(currentDate.clone().startOf(self.view)) && 
				!previousDate.isSame(currentDate) && self.view === previousView
			) {
				shouldUpdate = false;
			}

			previousDate = currentDate;
			previousView = self.view;

			if(shouldUpdate) {
				$timeout(function() {
					$scope.$broadcast('calendar.refreshView');
				});
			}
		}

		calendarHelper.loadTeplates().then(function() {
			self.templatesLoaded = true;
			var eventsWatched  = false;

			//Refresh the calendar when any of these variables change.
			$scope.$watchGroup([
				'self.viewDate',
				'self.view',
				'self.cellIsOpen',
				function() {
					//Auto update the calendar when the locale changes
					return moment.locale() + $locale.id;
				}],
				function() {
					if(!eventsWatched) {
						eventsWatched = true;
						//need to deep watch events hence why it isn't included in the watch group
						$scope.$watch('self.events', refreshCalendar, true);
					} else {
						refreshCalendar();
					}
				});
		}).catch(function(err) {
			$log.error('Could not load all calendar templates', err);
		});
	};
	if (angular.version.minor < 5) {
		self.$onInit();
	};

}).directive('calendar', function() {
	return {
		template: '<div calendar-dynamic-directive-template name="calendar" overrides="self.customTemplateUrls"><div>',
		restrict: 'E',
		scope: {
			events: '=',
			view: '=',
			viewTitle: '=?',
			viewDate: '=',
			cellIsOpen: '=?',
			cellAutoOpenDisabled: '=?',
			slideBoxDisabled: '=?',
			customTemplateUrls: '=?',
			onEventClick: '&',
			onEventTimesChanged: '&',
			onTimepanClick: '&',
			onDateRangeSelect: '&?',
			cellModifier: '&',
			dayViewStart: '@',
			dayViewEnd: '@',
			dayViewSplit: '@',
			dayViewEventChunkSize: '@',
			dayViewEvnetWidth: '@',
			templateScope: '=?',
			dayViewTimePosition: '@'
		},
		controller: 'CalendarCtrl as self',
		bindToController: true
	}
});