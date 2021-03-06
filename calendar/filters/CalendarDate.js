'use strict';

var angular = require('angular');

angular.module('calendar', []).filter('calendarDate', function(calendarHelper, calendarConfig) {
	function calendarDate(date, format, getFromConfig) {
		if (getFromConfig === true) {
			format = calendarConfig.dateFormats[format];
		};
		return calendarHelper.formatDate(date, format);
	}

	calendarDate.$stateful = true;
	return calendarDate;
});