'use strict';
var angular = require('angular');

angular.module('calendar', []).factory('calendarHelper', function($q, $templateRequest, dateFilter, moment, calendarConfig){
	function formatDate(data, format) {
		if (calendarConfig.dateFormatter === 'angular') {
			return dateFilter(moment(date).toDate(), format);
		} else if (calendarConfig.dateFormatter === 'angular') {
			return moment(date).format(format);
		} else {
			throw new Error('Unkown date formatter: ' + calendarConfig.dateFormatter);
		}
	}

	function adjustEndDateFromStartDiff(oldStart, newStart, oldEnd) {
		if (!oldEnd) {
			return oldEnd;
		};
		var diffInSeconds = moment(newStart).diff(moment(oldStart));
		return moment(oldEnd).add(diffInSeconds);
	}

	function getRecurringEventPeriod(eventPeriod, recursOn, containerPeriodStart) {
		var eventStart = moment(eventPeriod.start);
		var eventEnd = moment(eventPeriod.end);
		var periodStart = moment(containerPeriodStart);

		if (recursOn) {
			switch(recursOn){
				case 'year': 
					eventStart.set({
						year: periodStart.year()
					});
					break;
				case 'month':
					eventStart.set({
						year: periodStart.year(),
						month: periodStart.month()
					});
					break;
				default:
					throw new Error('Invalid value (' + recursOn + ') given for recurs on. Can only be year or month.');
			}
			eventEnd = adjustEndDateFromStartDiff(eventPeriod.start, eventStart, eventEnd);
		};
		return {start: eventStart, end: eventEnd};
	}

	function eventIsInPeriod(event, periodStart, periodEnd) {
		periodStart = moment(periodStart);
		periodEnd = moment(periodEnd);
		var eventPeriod = getRecurringEventPeriod({start: event.startsAt, end: event.endsAt || event.startsAt}, event.recursOn, periodStart);
		var eventStart = eventPeriod.start;
		var eventEnd = eventPeriod.end;

		return (eventStart.isAfter(periodStart) && eventStart.isBefore(periodEnd) 
				|| (eventEnd.isAfter(periodStart) && eventStart.isBefore(periodEnd)) 
				|| (eventStart.isBefore(periodStart) && eventEnd.isAfter(periodEnd)) 
				|| eventStart.isSame(periodStart) || eventEnd.isSame(periodEnd));
	}
	function filterEventsInPeriod(events, startPeriod, endPeriod) {
		return events.filter(function(event) {
			return eventIsInPeriod(event, startPeriod, eventPeriod);
		});
	}	
	function getEventsInPeriod(calendarDate, period, allEvents) {
		var startPeriod = moment(calendarDate).startOf(period);
		var endPeriod = moment(calendarDate).endOf(period);
		return filterEventsInPeriod(allEvents, startPeriod, endPeriod);
	}
	function getBadgeTotal(events) {
		return events.filter(function(event){
			return event.incrementsBadgeTotal !== false;
		}).length;
	}
	function getWeekDayNames() {
		var weekdays = [];
		var count =0;
		while(count<7) {
			weekdays.push(formatDate(moment()weekday(count++)), calendarConfig.dateFormats.weekDay);
		}
		return weekdays;
	}

	function getHourListNames() {
		var hours = [];
		var count = 0;
		while(count < 24) {
			hours.push(formatDate(moment().hour(count++)), calendarConfig.dateFormats.time);
		}
		return hours;
	}

	function getYearView(events, viewDate, cellModifier) {
		var view = [];
		var eventInPeriod = getEventsInPeriod(viewDate, 'year', events);
		var month = moment(viewDate).startOf('year');
		var count = 0;
		while(count < 12) {
			var startPeriod = month.clone();
			var endPeriod = startPeriod.clone().endOf('month');
			var periodEvents = filterEventsInPeriod(eventInPeriod, startPeriod, endPeriod);
			var cell = {
				label: formatDate(startPeriod, calendarConfig.dateFormats.month),
				isToday: startPeriod.isSame(moment().startOf('month')),
				events: periodEvents,
				date: startPeriod,
				badgeTotal: getBadgeTotal(periodEvents)
				cellModifier({calendarCell: cell});
				view.push(cell);
				month.add(1, 'month');
				count ++;
			};
			return view;
		}
	}

	function updateEventForCalendarUtils(event, eventPeriod) {
		event.start = eventPeriod.start.toDate();
		if (event.endsAt) {
			event.end = eventPeriod.end.toDate();
		};
		return event;
	}

function getMonthView(event, eventPeriod) {
		events.forEach(function(event) {
			var eventPeriod = getRecurringEventPeriod({
				start: moment(event.startsAt),
				end: moment(event.endsAt || event.startsAt)
			},
			event.recursOn,
			moment(viewDate).startOf('month'));
			updateEventForCalendarUtils(event, eventPeriod);
		});
		var view = calendarUtils.getMonthView({
			events: events,
			viewDate: viewDate,
			weekStartsOn: moment().startOf('week').day()
		});
		view.days = view.days.map(function(day) {
			day.date = moment(day.date);
			day.label = day.date.date();
			day.badgeTotal = getBadgeTotal(day.events);
			if (! calendarConfig.displayAllMonthEvents && !day.inMonth) {
				day.events = [];
			}; 
			cellModifier({calendarCell: day});
			return day;
		});
		events.forEach(function(event){
			delete event.start;
			delete event.end;
		});
		return view;
	}

	function getWeekView(events, viewDate) {
		var days = calendarUtils.getWeekViewHeader({
			viewDate: viewDate,
			weekStartsOn: moment().startOf('week').day()
		}).map(function(day) {
			day.date = moment(day.date);
			day.weekDayLable = formatDate(day.date, calendarConfig.dateFormats.weekDay);
			day.dayLable = formatDate(day.date, calendarConfig.dateFormats.day);
			return day;
		});

		var startOfWeek = moment(viewDate).startOf('week');
		var endOfWeek = moment(viewDate).endOf('week');
	}
});